import {forProfile, roleConfig, type RoleId, ROLES} from "@/content/roles";
import {certifications} from "@/content/shared/certifications";
import {type DetailCollection, EDUCATION_SLUG, EXPERIENCE_SLUG} from "@/content/shared/detail-links";
import {education} from "@/content/shared/education";
import {experience} from "@/content/shared/experience";
import {codingHours, githubStats, hours, STATS_DAY} from "@/content/shared/github";
import {formatHighlight, highlightValues, metricValues} from "@/content/shared/metrics";
import {organizationActivity} from "@/content/shared/organization-activity";
import {organizations} from "@/content/shared/organizations";
import {profile, YEARS} from "@/content/shared/profile";
import {EXPERIENCE_PROJECTS, PROJECT_SLUG, type ProjectSlug} from "@/content/shared/project-links";
import {resumeVersions} from "@/content/shared/resume";
import {benefitOrder, benefitRoles, SERVICE_IDS, serviceRoles} from "@/content/shared/services";
import {testimonials} from "@/content/shared/testimonials";
import {detect} from "@/lib/assistant/intents";
import {buildKnowledgeBase, shortCompany} from "@/lib/assistant/knowledge";
import {terms, tokenize} from "@/lib/assistant/normalize";
import {createIndex, type Hit, search} from "@/lib/assistant/retrieval";
import {formatRange} from "@/lib/format";
import {buildDetailPath, buildPath, buildProjectPath, prerenderRoutes} from "@/lib/paths";
import {prioritize} from "@/lib/role-view";
import type {
    Answer,
    AnswerFacts,
    AnswerLink,
    AssistantCopy,
    Fact,
    FollowUpKey,
    IntentId,
    PlainIntent
} from "@/types/assistant";
import type {Content, SectionId} from "@/types/content";
import type {CaseStudyCopy, CaseStudyId} from "@/types/case-study";
import type {DetailPagesCopy} from "@/types/detail";

const MIN_SCORE = 1.5;
const MAX_LINKS = 4;
/** WakaTime counts these as languages; the answer about coding time names programming languages only. */
const NOT_PROGRAMMING = new Set(["Markdown", "YAML", "JSON", "Text", "Other", "XML", "TOML", "INI"]);

export interface AskOptions {
    role: RoleId | null;
    locked: boolean;
}

const INTENT_SECTIONS: Partial<Record<IntentId, SectionId>> = {
    about: "about",
    experienceYears: "experience",
    currentRole: "experience",
    roleFit: "experience",
    availability: "contact",
    location: "contact",
    education: "about",
    plans: "journey",
    languages: "about",
    certifications: "certifications",
    testimonials: "testimonials",
    resume: "resume",
    githubStats: "metrics",
    coding: "metrics",
    clients: "experience",
    industries: "experience",
    services: "services",
    whyHire: "services",
    workStyle: "about",
    journey: "journey",
    stack: "skills",
    ai: "skills",
    security: "skills",
    salary: "contact",
};

/** A page beyond the profile: an index when there is no slug. */
interface PageRef {
    collection: DetailCollection | "projects";
    slug?: string;
}

/** Pages beyond the profile that an answer links to, besides its section. */
const INTENT_PAGES: Partial<Record<IntentId, PageRef[]>> = {
    experienceYears: [{collection: "experience"}],
    education: [{collection: "education"}],
    certifications: [{collection: "certifications"}],
    githubStats: [{collection: "organizations"}],
    organizations: [{collection: "organizations"}],
    industries: [{collection: "experience"}],
    journey: [{collection: "experience"}],
    projects: [{collection: "projects"}],
    leadership: [{collection: "experience", slug: EXPERIENCE_SLUG.tivenos}, {
        collection: "projects",
        slug: PROJECT_SLUG.smartpot
    }],
    security: [
        {collection: "education", slug: EDUCATION_SLUG.cyberDiploma},
        {collection: "projects", slug: PROJECT_SLUG.cybersecurityLabs},
        {collection: "certifications", slug: "hacklab"},
    ],
    ai: [{collection: "projects", slug: PROJECT_SLUG.smartpot}, {
        collection: "education",
        slug: EDUCATION_SLUG.politecnico
    }],
    site: [{collection: "projects", slug: PROJECT_SLUG.portfolio}],
};

const isBullet = (fact: Fact) => fact.section === "experience" && /^experience\.\w+\.\d+$/.test(fact.id);

export const formatFact = (fact: Fact) => `${fact.label}: ${fact.text}`;

export const createAssistant = (content: Content, copy: AssistantCopy, cases?: Record<CaseStudyId, CaseStudyCopy>, details?: DetailPagesCopy) => {
    const facts = buildKnowledgeBase(content, cases, details);
    const index = createIndex(facts);
    const certificationIndex = createIndex(facts.filter((fact) => fact.id.startsWith("certifications.")));
    const tag = content.locale.replace("_", "-");
    const number = new Intl.NumberFormat(tag).format;
    const base: Omit<AnswerFacts, "topStack" | "services"> = {
        years: YEARS,
        currentJobs: experience
            .filter((job) => job.end === null)
            .map((job) => ({title: content.experience.items[job.id].title, company: shortCompany(job.company)})),
        certifications: certifications.length,
        issuers: new Set(certifications.map((item) => item.issuerId)).size,
        testimonials: testimonials.length,
        contributions: metricValues.contributions.toLocaleString(tag),
        commits: metricValues.commits.toLocaleString(tag),
        repositories: metricValues.repos,
        organizations: organizations.length,
        streak: metricValues.streak,
        asOf: new Intl.DateTimeFormat(tag, {
            month: "long",
            year: "numeric",
            timeZone: "UTC"
        }).format(new Date(`${STATS_DAY}T12:00:00Z`)),
        integrations: formatHighlight(highlightValues.integrations, tag),
        clients: formatHighlight(highlightValues.clients, tag),
        landingPages: formatHighlight(highlightValues.landingPages, tag),
        codingHours: number(codingHours),
        topLanguages: githubStats.wakatime.languages
            .filter((language) => !NOT_PROGRAMMING.has(language.name))
            .slice(0, 3)
            .map((language) => `${language.name} (${number(hours(language.seconds))} h)`),
        pages: prerenderRoutes.length,
    };
    const sectionLink = (id: SectionId): AnswerLink => ({kind: "section", label: copy.links[id], href: `#${id}`});
    const cvLink: AnswerLink = {
        kind: "download",
        label: copy.links.downloadCv,
        href: resumeVersions[0].files[content.lang]
    };
    const whatsappLink: AnswerLink = {
        kind: "external",
        label: copy.links.whatsapp,
        href: `https://wa.me/${profile.phone.whatsapp}?text=${encodeURIComponent(content.ui.whatsapp.message)}`,
    };
    const emailLink: AnswerLink = {kind: "external", label: copy.links.email, href: `mailto:${profile.email}`};

    return (query: string, {role: activeRole, locked}: AskOptions): Answer => {
        const detection = detect(query, activeRole);
        const services = prioritize(SERVICE_IDS, (id) => serviceRoles[id], activeRole).map((id) => content.services.items[id].title);
        const known: AnswerFacts = {...base, topStack: roleConfig(activeRole).topStack, services};
        const from = activeRole;
        const pageHref = (page: PageRef) =>
            page.collection === "projects"
                ? buildProjectPath(content.lang, {slug: (page.slug ?? null) as ProjectSlug | null, from, locked})
                : buildDetailPath(content.lang, page.collection, {slug: page.slug ?? null, from, locked});
        // A page's link reads as the page's name, taken from the fact that links to it.
        const labelOf = (page: PageRef) =>
            (page.slug && facts.find((fact) => fact.page?.collection === page.collection && fact.page.slug === page.slug)?.label) || copy.pages[page.collection];
        const pageLink = (page: PageRef, label?: string): AnswerLink => ({
            kind: "route",
            label: label ?? labelOf(page),
            href: pageHref(page)
        });
        const factLink = (fact: Fact): AnswerLink => (fact.page ? pageLink(fact.page, fact.label) : sectionLink(fact.section));
        const queryTerms = terms(query);
        const texts: string[] = [];
        const notes: string[] = [];
        const links: AnswerLink[] = [];
        let followUp: FollowUpKey = detection.intents[0] ?? "search";

        for (const intent of detection.intents) {
            if (intent === "roleFit" && detection.role) {
                const role = detection.role;
                const ofRole = (hit: Hit) => hit.fact.roles.includes(role);
                const hits = search(index, queryTerms, [role], 6).filter(ofRole);
                const example = hits.find((hit) => isBullet(hit.fact))?.fact
                    ?? search(index, ROLES[role].keywords.flatMap(tokenize), [role], 6).filter(ofRole).find((hit) => isBullet(hit.fact))?.fact
                    ?? index.facts.find((fact) => isBullet(fact) && fact.roles.includes(role));
                if (!example) continue;
                texts.push(copy.answers.roleFit({
                    ...known,
                    role: content.ui.roleSwitcher.roles[role],
                    stack: ROLES[role].topStack,
                    company: example.label,
                    example: example.text,
                }));
                notes.push(...supporting(hits, example));
                if (!locked && role !== activeRole) links.push({
                    kind: "route",
                    label: copy.links.roleView,
                    href: buildPath(content.lang, role)
                });
                const projectHit = hits.find((hit) => hit.fact.page?.collection === "projects");
                if (projectHit) links.push(factLink(projectHit.fact));
                if (example.page) links.push(factLink(example));
                links.push(sectionLink("experience"));
                continue;
            }
            if (intent === "company" && detection.company) {
                const job = experience.find((item) => item.id === detection.company)!;
                const item = content.experience.items[job.id];
                const company = shortCompany(job.company);
                texts.push(copy.answers.company({
                    ...known,
                    company,
                    title: item.title,
                    period: formatRange(job.start, job.end, content.ui.months, content.ui.present),
                    summary: forProfile(item.summary, activeRole),
                }));
                notes.push(...prioritize(item.bullets, (bullet) => bullet.roles, activeRole).slice(0, 3).map((bullet) => bullet.text));
                links.push(pageLink({collection: "experience", slug: EXPERIENCE_SLUG[job.id]}, company));
                for (const id of (EXPERIENCE_PROJECTS[job.id] ?? []).slice(0, 2)) links.push(pageLink({
                    collection: "projects",
                    slug: PROJECT_SLUG[id]
                }, content.projects.items[id].name));
                continue;
            }
            if (intent === "program" && detection.program) {
                const program = education.find((item) => item.id === detection.program)!;
                const degree = content.about.education[program.id].degree;
                const page = details?.education[program.id];
                texts.push(copy.answers.program({
                    ...known,
                    degree,
                    school: program.school,
                    period: program.start === program.end ? String(program.start) : `${program.start} – ${program.end}`,
                    tagline: page?.tagline ?? content.about.education[program.id].skills.slice(0, 4).join(", "),
                }));
                notes.push(...(page && page.areas.length > 0
                    ? page.areas.slice(0, 3).map((area) => `${area.title}: ${area.text}`)
                    : [content.about.education[program.id].skills.join(", ")]));
                links.push(pageLink({collection: "education", slug: EDUCATION_SLUG[program.id]}, degree));
                if (program.project) links.push(pageLink({
                    collection: "projects",
                    slug: PROJECT_SLUG[program.project]
                }, content.projects.items[program.project].name));
                continue;
            }
            if (intent === "projects" && detection.project) {
                const project = content.projects.items[detection.project];
                texts.push(copy.answers.project({...known, name: project.name, summary: project.summary}));
                notes.push(...prioritize(project.highlights, (bullet) => bullet.roles, activeRole).slice(0, 3).map((bullet) => bullet.text));
                links.push(pageLink({
                    collection: "projects",
                    slug: PROJECT_SLUG[detection.project]
                }, project.name), pageLink({collection: "projects"}));
                followUp = "project";
                continue;
            }
            if (intent === "certifications") {
                const topic = queryTerms.filter((term) => term !== "certification");
                // A certification named after the topic comes first, in the profile's order (the industry one leads);
                // otherwise the search over what each one covered decides.
                const named = certificationIndex.facts.filter((fact) => terms(fact.label).some((term) => topic.includes(term)));
                const matched = named.length > 0 ? named.slice(0, 4) : topic.length > 0 ? search(certificationIndex, topic, [activeRole], 4).map((hit) => hit.fact) : [];
                if (matched.length > 0) {
                    texts.push(copy.answers.certificationMatch({...known, titles: matched.map((fact) => fact.label)}));
                    notes.push(...matched.map(formatFact));
                    links.push(...matched.slice(0, 3).map(factLink), pageLink({collection: "certifications"}));
                    continue;
                }
            }
            if (intent === "roleFit") continue;
            texts.push(intent === "workStyle" || intent === "journey"
                ? copy.inHisWords(forProfile(content.about.story, activeRole)[intent === "workStyle" ? 0 : 1])
                : copy.answers[intent as PlainIntent](known));
            notes.push(...detailsFor(intent, content, activeRole, number));
            if (intent === "availability" || intent === "salary") links.push(whatsappLink);
            if (intent === "availability") links.push(emailLink);
            if (intent === "resume" || intent === "experienceYears" || intent === "about") links.push(cvLink);
            if (intent === "whyHire") links.push(sectionLink("testimonials"));
            if (intent === "currentRole") {
                for (const job of experience.filter((item) => item.end === null)) links.push(pageLink({
                    collection: "experience",
                    slug: EXPERIENCE_SLUG[job.id]
                }, shortCompany(job.company)));
            }
            for (const page of INTENT_PAGES[intent] ?? []) links.push(pageLink(page));
            const section = INTENT_SECTIONS[intent];
            if (section) links.push(sectionLink(section));
        }

        const followUps = (key: FollowUpKey) => (copy.followUps[key] ?? copy.followUps.fallback ?? []).filter((question) => question !== query.trim());

        if (texts.length > 0) {
            return {
                intents: detection.intents,
                text: texts.join(" "),
                details: notes.slice(0, 3),
                links: unique(links),
                followUps: followUps(followUp)
            };
        }

        const hits = search(index, queryTerms, [activeRole, detection.role]);
        if (hits.length > 0 && hits[0].score >= MIN_SCORE) {
            return {
                intents: ["search"],
                text: copy.answers.search(known),
                details: hits.map((hit) => formatFact(hit.fact)),
                links: unique(hits.map((hit) => factLink(hit.fact))),
                followUps: followUps("search"),
            };
        }

        return {
            intents: ["fallback"],
            text: copy.answers.fallback(known),
            details: [],
            links: [sectionLink("contact"), whatsappLink],
            followUps: followUps("fallback"),
        };
    };
};

/** The supporting lines under an answer that come straight from the content: reasons, services, organizations. */
const detailsFor = (intent: IntentId, content: Content, role: RoleId | null, number: (value: number) => string): string[] => {
    if (intent === "whyHire") {
        return prioritize(benefitOrder, (id) => benefitRoles[id], role).slice(0, 3).map((id) => {
            const benefit = content.services.benefits[id];
            const author = testimonials.find((item) => item.id === benefit.evidence.testimonial)!.author;
            return `${benefit.title}: “${benefit.evidence.excerpt}” (${author})`;
        });
    }
    if (intent === "services") {
        return prioritize(SERVICE_IDS, (id) => serviceRoles[id], role).slice(0, 3).map((id) => `${content.services.items[id].title}: ${content.services.items[id].description}`);
    }
    if (intent === "organizations") {
        return [...organizations]
            .sort((a, b) => organizationActivity[b.id].mine - organizationActivity[a.id].mine)
            .slice(0, 3)
            .map((organization) => `${organization.name}: ${number(organizationActivity[organization.id].mine)} / ${number(organizationActivity[organization.id].people)} commits`);
    }
    if (intent === "testimonials") {
        return prioritize(testimonials, (item) => item.roles, role).slice(0, 3).map((item) => {
            const copy = content.testimonials.items[item.id];
            return `${item.author} (${copy.role}): ${copy.highlight}`;
        });
    }
    return [];
};

const SUPPORTING_SECTIONS: SectionId[] = ["projects", "skills", "services", "experience"];

const supporting = (hits: Hit[], example: Fact) =>
    hits
        .filter((hit) => hit.fact !== example && !isBullet(hit.fact) && SUPPORTING_SECTIONS.includes(hit.fact.section))
        .slice(0, 2)
        .map((hit) => formatFact(hit.fact));

const unique = (links: AnswerLink[]) =>
    links.filter((link, position) => links.findIndex((other) => other.href === link.href) === position).slice(0, MAX_LINKS);
