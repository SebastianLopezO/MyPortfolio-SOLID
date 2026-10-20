import en from "@/content/en";
import es from "@/content/es";
import {experience} from "@/content/shared/experience";
import {projectImages, projects} from "@/content/shared/projects";
import {certifications} from "@/content/shared/certifications";
import {testimonials} from "@/content/shared/testimonials";
import {EXPERIENCE_YEARS, profile, YEARS, yearsBetween} from "@/content/shared/profile";
import {formatHighlight, highlightValues, metricValues} from "@/content/shared/metrics";
import {ROLE_IDS} from "@/content/roles";
import {assistant as enAssistant} from "@/content/en/assistant";
import {assistant as esAssistant} from "@/content/es/assistant";
import {journeyCopy} from "@/content/journey-copy";
import {caseStudyCopy} from "@/content/case-studies";
import {caseStudies} from "@/content/shared/case-studies";
import {archive} from "@/content/shared/archive";
import {projectPages as enPages} from "@/content/project-pages/en";
import {projectPages as esPages} from "@/content/project-pages/es";
import {isCaseStudy} from "@/content/shared/project-links";
import {detailPages as enDetails} from "@/content/detail-pages/en";
import {detailPages as esDetails} from "@/content/detail-pages/es";
import {CERTIFICATION_IDS} from "@/content/shared/detail-links";
import {education} from "@/content/shared/education";
import {organizationActivity} from "@/content/shared/organization-activity";
import {organizations} from "@/content/shared/organizations";

const projectPages = {en: enPages, es: esPages};
const detailPages = {en: enDetails, es: esDetails};

type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

const shape = (value: unknown): Json => {
    if (Array.isArray(value)) return value.map(shape);
    if (value && typeof value === "object") {
        return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, shape(item)]));
    }
    if (typeof value === "function") return "fn";
    return typeof value === "string" || value === null ? "text" : (value as Json);
};

const strings = (value: unknown): string[] => {
    if (typeof value === "string") return [value];
    if (Array.isArray(value)) return value.flatMap(strings);
    if (value && typeof value === "object") return Object.values(value).flatMap(strings);
    return [];
};

const CLIENT_HASHES = new Set([
    "352e9c41a5ba5319", "36cbe45bd38e69c1", "e1a1a41d168ac594", "047065b7965323d5", "1574ad62d48a37f8",
    "1934632badbdf6b3", "dca128ee0c3da7f0", "87ea149d5624b368", "38f3b60c2b5a947f", "5380d2190245826c",
    "8a6fb0e4fb513ea3", "b5bdc0c2670d7b49", "2049eab422ec24fd", "110f5a1cba43a5c2", "e865a30c844851d2",
    "8273ef957736e504", "ee7ead7c97c393d5", "8904b3f9cc66782d", "fa9815ece94d7e27", "7c6c590346212cd3",
    "da8b7f5581d0760e", "a82f16a8fedcf1b5", "7161fb76c764e6a5", "688ec40b341ea0f6", "1cd170e652610e8c",
    "b1e93e2187a868aa", "fc760dc32fd30214", "5cf8c0c5fbe5b7ec", "8a229104773fc92e", "f295cd5bd1aa03f8",
    "9154c0cf3c369972", "1b438c38e220069d",
]);

const hash = async (token: string) => {
    const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(token));
    return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("").slice(0, 16);
};

describe("bilingual content", () => {
    it("has the same shape in English and Spanish", () => {
        const {lang: _en, locale: _enLocale, ...english} = en;
        const {lang: _es, locale: _esLocale, ...spanish} = es;
        expect(shape(spanish)).toEqual(shape(english));
        expect(shape(esAssistant)).toEqual(shape(enAssistant));
        expect(shape(journeyCopy.es)).toEqual(shape(journeyCopy.en));
    });

    it("offers five assistant suggestions per profile and the same questions in both languages", () => {
        for (const copy of [enAssistant, esAssistant]) {
            for (const suggestions of Object.values(copy.suggestions)) expect(suggestions).toHaveLength(5);
        }
        expect(Object.keys(esAssistant.followUps).sort()).toEqual(Object.keys(enAssistant.followUps).sort());
        for (const key of Object.keys(enAssistant.followUps) as (keyof typeof enAssistant.followUps)[]) {
            expect(esAssistant.followUps[key]!.length, key).toBe(enAssistant.followUps[key]!.length);
        }
        expect(esAssistant.catalog.groups.map((group) => group.questions.length)).toEqual(enAssistant.catalog.groups.map((group) => group.questions.length));
    });

    it("has no empty strings", () => {
        for (const content of [en, es, journeyCopy.en, journeyCopy.es]) {
            for (const text of strings(content)) expect(text.trim().length).toBeGreaterThan(0);
        }
    });

    it("never mentions the outdated three years of experience", () => {
        for (const text of [...strings(en), ...strings(es), ...strings(journeyCopy)]) {
            expect(text).not.toMatch(/\b3\+/);
            expect(text).not.toMatch(/\b3 (years|años)\b/i);
        }
    });

    it("uses the current phone number only", () => {
        const all = [...strings(en), ...strings(es)].join(" ");
        expect(all).not.toMatch(/321\s?877/);
        expect(profile.phone.e164).toBe("+573002329213");
    });

    it("computes the years of experience from the first job", () => {
        expect(yearsBetween("2022-08", "2026-10-03")).toBe(4);
        expect(yearsBetween("2022-08", "2027-07-31")).toBe(4);
        expect(yearsBetween("2022-08", "2027-08-01")).toBe(5);
        expect(YEARS).toBe(`${EXPERIENCE_YEARS}+`);
        expect(en.hero.byProfile.general.summary).toContain(YEARS);
        expect(es.hero.byProfile.general.summary).toContain(`${EXPERIENCE_YEARS} años`);
    });

    it("translates every testimonial in English and keeps the originals in Spanish", () => {
        for (const item of testimonials) {
            expect(en.testimonials.items[item.id].quote).toBeTruthy();
            expect(es.testimonials.items[item.id].quote).toBeNull();
        }
    });

    it("keeps facts and localized collections in sync", () => {
        expect(Object.keys(en.experience.items).sort()).toEqual(experience.map((item) => item.id).sort());
        expect(Object.keys(en.projects.items).sort()).toEqual(projects.map((item) => item.id).sort());
        expect(Object.keys(en.certifications.items).sort()).toEqual(certifications.map((item) => item.id).sort());
    });

    it("links every certification to a page where it can be verified", () => {
        for (const item of certifications) {
            expect(item.url, item.id).toMatch(/^https:\/\//);
            expect(item.url, item.id).not.toMatch(/platzi\.com\/p\/[^/]+\/?$/);
        }
    });

    it("formats figures with the number grouping of each language", () => {
        expect(formatHighlight({value: metricValues.commits}, en.locale)).toBe(metricValues.commits.toLocaleString("en-US"));
        expect(formatHighlight(highlightValues.smartpotCommits, es.locale)).toBe("93 %");
        expect(formatHighlight(highlightValues.smartpotCommits, en.locale)).toBe("93%");
        expect(formatHighlight({value: 18581}, es.locale)).toBe("18.581");
        expect(formatHighlight({value: 2200, atLeast: true}, es.locale)).toBe("2.200+");
        expect(formatHighlight(highlightValues.years, en.locale)).toBe(YEARS);
    });

    it("quotes every benefit word for word from a recommendation", () => {
        for (const benefit of Object.values(es.services.benefits)) {
            expect(testimonials.find((item) => item.id === benefit.evidence.testimonial)?.quote).toContain(benefit.evidence.excerpt);
        }
        for (const benefit of Object.values(en.services.benefits)) {
            expect(en.testimonials.items[benefit.evidence.testimonial].quote).toContain(benefit.evidence.excerpt);
        }
    });

    it("rewrites the about story and its closing for every role view", () => {
        for (const content of [en, es]) {
            const {story, closing, subtitle} = content.about;
            for (const role of ROLE_IDS) {
                expect(story[role][0]).not.toBe(story.general[0]);
                expect(story[role][1]).not.toBe(story.general[1]);
                expect(closing[role]).not.toBe(closing.general);
                expect(subtitle[role]).not.toBe(subtitle.general);
            }
            // The AI paragraph tells the path from rule systems to language models, then the work with coding agents.
            expect(content.about.ai.join(" ")).toMatch(/CLIPS[\s\S]+Dapta[\s\S]+Qwen2[\s\S]+Claude Code/);
        }
    });

    it("tags every experience bullet with valid roles", () => {
        for (const content of [en, es]) {
            for (const item of Object.values(content.experience.items)) {
                for (const bullet of item.bullets) {
                    expect(bullet.roles.length).toBeGreaterThan(0);
                    for (const role of bullet.roles) expect(ROLE_IDS).toContain(role);
                }
            }
        }
    });

    it("keeps SEO titles unique and descriptions within search snippet length", () => {
        for (const content of [en, es]) {
            const titles = Object.values(content.seo.profiles).map((profileSeo) => profileSeo.title);
            expect(new Set(titles).size).toBe(titles.length);
            for (const {description} of Object.values(content.seo.profiles)) {
                expect(description.length).toBeGreaterThanOrEqual(70);
                expect(description.length).toBeLessThanOrEqual(170);
            }
        }
    });

    it("does not name clients", async () => {
        for (const content of [en, es]) {
            const exposed = [
                content.hero, content.about, content.experience, content.services, content.projects, content.seo, journeyCopy[content.lang],
                caseStudyCopy[content.lang], projectPages[content.lang], detailPages[content.lang], content.certifications,
                archive.map((entry) => [entry.name, entry.stack, entry.note[content.lang]]),
            ];
            const tokens = new Set(strings(exposed).join(" ").toLowerCase().split(/[^\p{L}\p{N}]+/u));
            // Hashing every token at once keeps the check well under the test timeout as the content grows.
            const hashes = await Promise.all([...tokens].map(hash));
            [...tokens].forEach((token, index) => expect(CLIENT_HASHES.has(hashes[index]), token).toBe(false));
        }
    }, 30_000);

    it("tells every case study in both languages with the same shape", () => {
        expect(shape(caseStudyCopy.es)).toEqual(shape(caseStudyCopy.en));
        for (const {items} of Object.values(caseStudyCopy)) {
            for (const text of strings(items)) expect(text.trim().length).toBeGreaterThan(0);
            expect(Object.keys(items).sort()).toEqual(caseStudies.map((item) => item.id).sort());
        }
    });

    it("labels every diagram node, figure and image of the case studies", () => {
        for (const {items} of Object.values(caseStudyCopy)) {
            for (const facts of caseStudies) {
                const copy = items[facts.id];
                const ids = [...facts.diagram.layers.flatMap((layer) => [layer.id, ...layer.nodes]), ...(facts.diagram.base ? [facts.diagram.base.id, ...facts.diagram.base.nodes] : [])];
                for (const id of ids) expect(copy.diagram.labels[id], `${facts.id}.${id}`).toBeTruthy();
                for (const figure of facts.figures) expect(copy.figures[figure.id], `${facts.id}.${figure.id}`).toBeTruthy();
                for (const image of facts.images) expect(copy.images[image.id], `${facts.id}.${image.id}`).toBeTruthy();
            }
        }
    });

    it("tells every other project page in both languages with the same shape", () => {
        expect(shape(projectPages.es)).toEqual(shape(projectPages.en));
        const pageIds = projects.filter((item) => !isCaseStudy(item.id)).map((item) => item.id).sort();
        for (const {items} of Object.values(projectPages)) {
            for (const text of strings(items)) expect(text.trim().length).toBeGreaterThan(0);
            expect(Object.keys(items).sort()).toEqual(pageIds);
        }
    });

    it("labels every diagram node, figure and image of the project pages", () => {
        for (const {items} of Object.values(projectPages)) {
            for (const facts of projects) {
                if (isCaseStudy(facts.id)) continue;
                const copy = items[facts.id];
                if (facts.diagram) {
                    expect(copy.diagram, facts.id).toBeTruthy();
                    const {layers, base} = facts.diagram;
                    const ids = [...layers.flatMap((layer) => [layer.id, ...layer.nodes]), ...(base ? [base.id, ...base.nodes] : [])];
                    for (const id of ids) expect(copy.diagram?.labels[id], `${facts.id}.${id}`).toBeTruthy();
                }
                for (const figure of facts.figures ?? []) expect(copy.figures[figure.id], `${facts.id}.${figure.id}`).toBeTruthy();
                for (const image of facts.images ?? []) expect(copy.images[image.id], `${facts.id}.${image.id}`).toBeTruthy();
            }
        }
    });

    it("gives every project at least four achievements, each tagged with a role", () => {
        for (const content of [en, es]) {
            for (const facts of projects) {
                const {highlights} = content.projects.items[facts.id];
                expect(highlights.length, facts.id).toBeGreaterThanOrEqual(4);
                for (const bullet of highlights) expect(bullet.roles.length, bullet.text).toBeGreaterThan(0);
            }
        }
    });

    it("describes each project's main screen on its card with the same words as on its page", () => {
        for (const [lang, content] of [["en", en], ["es", es]] as const) {
            for (const project of projects) {
                const image = projectImages(project)[0];
                const card = content.projects.items[project.id];
                if (!image) {
                    expect(card.screen, project.id).toBeUndefined();
                    continue;
                }
                const alts = isCaseStudy(project.id)
                    ? caseStudyCopy[lang].items[project.id as keyof (typeof caseStudyCopy)["en"]["items"]].images
                    : projectPages[lang].items[project.id as keyof (typeof projectPages)["en"]["items"]].images;
                expect(card.screen, `${lang} ${project.id}`).toBe(alts[image.id]);
            }
        }
    });

    it("describes every archived repository in both languages", () => {
        const names = archive.map((entry) => `${entry.org}/${entry.name}`);
        expect(new Set(names).size).toBe(names.length);
        for (const entry of archive) {
            expect(entry.note.en.trim()).not.toBe("");
            expect(entry.note.es.trim()).not.toBe("");
        }
    });

    it("tells the job, program, organization and issuer pages in both languages with the same shape", () => {
        expect(shape(detailPages.es)).toEqual(shape(detailPages.en));
        for (const copy of Object.values(detailPages)) {
            for (const text of strings(copy)) expect(text.trim().length, text).toBeGreaterThan(0);
            expect(Object.keys(copy.experience).sort()).toEqual(experience.map((item) => item.id).sort());
            expect(Object.keys(copy.education).sort()).toEqual(education.map((item) => item.id).sort());
            expect(Object.keys(copy.organizations).sort()).toEqual(organizations.map((item) => item.id).sort());
            expect(Object.keys(copy.issuers).sort()).toEqual([...new Set(certifications.map((item) => item.issuerId))].sort());
            // Search results cut descriptions longer than this, and the build checks the shortest ones.
            for (const {seo} of [...Object.values(copy.experience), ...Object.values(copy.education), ...Object.values(copy.organizations)]) {
                expect(seo.description.length, seo.description).toBeGreaterThanOrEqual(70);
                expect(seo.description.length, seo.description).toBeLessThanOrEqual(180);
            }
        }
    });

    it("dates every title within its job, in order, from the start to the end of the job", () => {
        for (const copy of Object.values(detailPages)) {
            for (const job of experience) {
                const {positions} = copy.experience[job.id];
                expect(positions[0].start, job.id).toBe(job.start);
                expect(positions.at(-1)!.end, job.id).toBe(job.end);
                positions.slice(1).forEach((position, index) => expect(position.start, job.id).toBe(positions[index].end));
            }
        }
    });

    it("keeps the certification pages in step with the facts", () => {
        expect([...CERTIFICATION_IDS]).toEqual(certifications.map((item) => item.id));
        const ends: Record<string, string | null | undefined> = {
            ...Object.fromEntries(projects.map((project) => [`project:${project.id}`, project.end])),
            ...Object.fromEntries(experience.map((job) => [`experience:${job.id}`, job.end])),
        };
        // "Where it shows in my work" points only at work that was still going on when the certificate was earned.
        for (const item of certifications) {
            for (const ref of item.applied) {
                const key = `${ref.kind}:${ref.id}`;
                expect(key in ends, key).toBe(true);
                const end = ends[key];
                if (end) expect(end >= item.date, `${item.id} → ${key}`).toBe(true);
            }
        }
    });

    it("links the recommendations only to jobs that exist", () => {
        const jobs = new Set(experience.map((job) => job.id));
        for (const item of testimonials) if (item.experience) expect(jobs.has(item.experience), item.id).toBe(true);
        expect(testimonials.filter((item) => item.experience).length).toBe(7);
    });

    it("counts each organization's activity consistently", () => {
        for (const organization of organizations) {
            const activity = organizationActivity[organization.id];
            expect(activity.repositories, organization.id).toBe(organization.repositories);
            expect(activity.withMine).toBeLessThanOrEqual(activity.repositories);
            expect(activity.mine).toBeLessThanOrEqual(activity.people);
            expect(Object.values(activity.years).reduce((sum, value) => sum! + value!, 0), organization.id).toBe(activity.mine);
        }
    });
});
