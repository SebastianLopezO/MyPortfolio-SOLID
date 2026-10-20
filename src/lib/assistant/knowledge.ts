import {ROLE_IDS, type RoleId} from "@/content/roles";
import {PROJECT_SLUG} from "@/content/shared/project-links";
import {caseStudyRoles} from "@/content/shared/case-roles";
import {certifications} from "@/content/shared/certifications";
import {CERTIFICATION_SLUG, EDUCATION_SLUG, EXPERIENCE_SLUG, ORGANIZATION_SLUG} from "@/content/shared/detail-links";
import {education} from "@/content/shared/education";
import {experience} from "@/content/shared/experience";
import {organizations} from "@/content/shared/organizations";
import {projects} from "@/content/shared/projects";
import {serviceRoles} from "@/content/shared/services";
import {skillGroups} from "@/content/shared/skills";
import {testimonials} from "@/content/shared/testimonials";
import {terms} from "@/lib/assistant/normalize";
import type {Fact, FactPage} from "@/types/assistant";
import type {CaseStudyCopy, CaseStudyId} from "@/types/case-study";
import type {Content, SectionId, ServiceId, SkillGroupId} from "@/types/content";
import type {DetailPagesCopy} from "@/types/detail";

const SKILL_ROLES: Record<SkillGroupId, RoleId[]> = {
    languages: ["backend", "data"],
    backend: ["backend"],
    crm: ["crm"],
    data: ["data"],
    databases: ["backend", "data"],
    frontend: ["fullstack"],
    devops: ["devops"],
    cloud: ["devops", "backend"],
    security: ["devops", "backend"],
    networks: ["devops"],
    iot: ["fullstack", "backend"],
    ai: ["data"],
    testing: ["backend", "devops"],
    tools: [],
    foundations: [],
};

export const shortCompany = (company: string) => company.split(" – ")[0];

/**
 * Everything the assistant can search: jobs, projects, skills, certifications, programs, the about text, services,
 * recommendations, the case studies and, when their text is loaded, the job, program and organization pages. A fact
 * that has a page of its own links there instead of to a section of the profile.
 */
export const buildKnowledgeBase = (content: Content, cases?: Record<CaseStudyId, CaseStudyCopy>, details?: DetailPagesCopy): Fact[] => {
    const facts: Fact[] = [];
    const add = (id: string, section: SectionId, label: string, text: string, roles: RoleId[], extra = "", page?: FactPage) =>
        facts.push({
            id,
            section,
            label,
            text,
            roles,
            terms: terms(`${label} ${text} ${extra}`), ...(page ? {page} : {})
        });

    for (const job of experience) {
        const copy = content.experience.items[job.id];
        const label = shortCompany(job.company);
        const page: FactPage = {collection: "experience", slug: EXPERIENCE_SLUG[job.id]};
        add(`experience.${job.id}`, "experience", label, `${copy.title}. ${copy.summary.general}`, [...new Set(copy.bullets.flatMap((bullet) => bullet.roles))], job.tech.join(" "), page);
        for (const role of ROLE_IDS) add(`experience.${job.id}.summary.${role}`, "experience", label, copy.summary[role], [role], "", page);
        copy.bullets.forEach((bullet, index) => add(`experience.${job.id}.${index}`, "experience", label, bullet.text, bullet.roles, "", page));
        details?.experience[job.id].positions.forEach((position, index) =>
            add(`experience.${job.id}.position.${index}`, "experience", label, `${position.title}. ${position.text}`, [], "", page),
        );
    }

    for (const project of projects) {
        const copy = content.projects.items[project.id];
        const page: FactPage = {collection: "projects", slug: PROJECT_SLUG[project.id]};
        add(`projects.${project.id}`, "projects", copy.name, `${copy.context}. ${copy.summary}`, project.roles, project.tech.join(" "), page);
        copy.highlights.forEach((bullet, index) => add(`projects.${project.id}.${index}`, "projects", copy.name, bullet.text, bullet.roles, "", page));
    }

    for (const group of skillGroups) {
        add(`skills.${group.id}`, "skills", content.skills.groups[group.id], group.items.join(", "), SKILL_ROLES[group.id]);
    }

    for (const certification of certifications) {
        const text = `${certification.issuer} (${certification.date.slice(0, 4)})`;
        const copy = content.certifications.items[certification.id];
        const extra = `${copy.learned} ${copy.adds} ${certification.tech.join(" ")}`;
        const page: FactPage = {collection: "certifications", slug: CERTIFICATION_SLUG[certification.id]};
        add(`certifications.${certification.id}`, "certifications", certification.title, text, certification.roles, extra, page);
    }

    for (const school of education) {
        const copy = content.about.education[school.id];
        const page: FactPage = {collection: "education", slug: EDUCATION_SLUG[school.id]};
        const extra = [...copy.skills, ...(details?.education[school.id].courses ?? [])].join(" ");
        add(`education.${school.id}`, "about", copy.degree, `${school.school}${copy.note ? ` · ${copy.note}` : ""}`, [], extra, page);
        details?.education[school.id].areas.forEach((area, index) =>
            add(`education.${school.id}.area.${index}`, "about", copy.degree, `${area.title}: ${area.text}`, [], "", page),
        );
    }

    for (const organization of organizations) {
        const page: FactPage = {collection: "organizations", slug: ORGANIZATION_SLUG[organization.id]};
        const text = details ? `${details.organizations[organization.id].tagline}. ${details.organizations[organization.id].role}` : content.projects.organizations[organization.id];
        add(`organizations.${organization.id}`, "projects", organization.name, text, organization.roles, content.projects.organizations[organization.id], page);
    }

    [content.about.intro, ...content.about.story.general, content.about.versatility, ...content.about.ai, content.about.ambition, content.about.closing.general].forEach((paragraph, index) =>
        add(`about.${index}`, "about", content.ui.nav.about, paragraph, []),
    );
    for (const role of ROLE_IDS) {
        content.about.story[role].forEach((paragraph, index) => add(`about.${role}.${index}`, "about", content.ui.nav.about, paragraph, [role]));
    }

    for (const id of Object.keys(serviceRoles) as ServiceId[]) {
        const service = content.services.items[id];
        add(`services.${id}`, "services", service.title, `${service.points.join("; ")}.`, serviceRoles[id]);
    }

    for (const testimonial of testimonials) {
        const copy = content.testimonials.items[testimonial.id];
        add(
            `testimonials.${testimonial.id}`,
            "testimonials",
            testimonial.author,
            `${copy.role} · ${copy.highlight}. ${copy.context}`,
            testimonial.roles,
            copy.quote ?? testimonial.quote,
        );
    }

    for (const [id, copy] of Object.entries(cases ?? {}) as [CaseStudyId, CaseStudyCopy][]) {
        const page: FactPage = {collection: "projects", slug: PROJECT_SLUG[id]};
        const roles = caseStudyRoles[id];
        facts.push({
            id: `cases.${id}`,
            section: "projects",
            label: copy.name,
            text: copy.summary,
            roles,
            page,
            terms: terms(`${copy.name} ${copy.tagline} ${copy.summary}`)
        });
        copy.approach.forEach((text, index) =>
            facts.push({
                id: `cases.${id}.${index}`,
                section: "projects",
                label: copy.name,
                text,
                roles,
                page,
                terms: terms(`${copy.name} ${text}`)
            }),
        );
    }

    return facts;
};
