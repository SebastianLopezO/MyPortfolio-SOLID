import en from "@/content/en";
import es from "@/content/es";
import {ROLE_IDS} from "@/content/roles";
import {caseStudyCopy} from "@/content/case-studies";
import {projectPages as enPages} from "@/content/project-pages/en";
import {projectPages as esPages} from "@/content/project-pages/es";
import {isCaseStudy, PROJECT_SLUG} from "@/content/shared/project-links";
import {caseStudyById} from "@/content/shared/case-studies";
import {projects} from "@/content/shared/projects";
import {buildHead, renderHeadTags} from "@/lib/seo";
import {buildCaseStudyHead, buildProjectPageHead, buildProjectsHead} from "@/lib/seo-projects";

describe("seo", () => {
    it("builds a unique head for every language and role", () => {
        const titles = new Set<string>();
        for (const content of [en, es]) {
            for (const role of [null, ...ROLE_IDS]) {
                const head = buildHead(content, role);
                titles.add(head.title);
                expect(head.canonical).toBe(`https://sebastianlopezo.page/${content.lang}${role ? `/${role}` : ""}`);
                expect(head.alternates.map((alternate) => alternate.hreflang)).toEqual(["en", "es", "x-default"]);
                expect(head.image).toBe(`https://sebastianlopezo.page/og/og-${content.lang}.jpg`);
            }
        }
        expect(titles.size).toBe(12);
    });

    it("emits valid structured data for the person behind the page", () => {
        const data = JSON.parse(buildHead(es, "devops").jsonLd);
        const types = data["@graph"].map((node: { "@type": string }) => node["@type"]);
        expect(types).toEqual(["WebSite", "ProfilePage", "Person"]);
        const person = data["@graph"][2];
        expect(person.jobTitle).toBe(es.hero.byProfile.devops.title);
        expect(person.telephone).toBe("+573002329213");
        expect(person.worksFor).toHaveLength(2);
        const schools = person.alumniOf.map((school: { name: string }) => school.name);
        expect(new Set(schools).size).toBe(schools.length);
    });

    it("renders escaped head tags with locale alternates", () => {
        const html = renderHeadTags(buildHead(en, "crm"));
        expect(html).toContain('<link data-head="canonical" rel="canonical" href="https://sebastianlopezo.page/en/crm">');
        expect(html).toContain('hreflang="x-default" href="https://sebastianlopezo.page/en/crm"');
        expect(html).toContain('property="og:locale" content="en_US"');
        expect(html).toContain('property="og:locale:alternate" content="es_CO"');
        expect(html).toContain("Zoho CRM &amp; Integrations Engineer");
        expect(html).not.toContain("</script><");
    });

    it("builds a unique article head for every project page and a list for the index", () => {
        const titles = new Set<string>();
        for (const content of [en, es]) {
            const {ui, items} = caseStudyCopy[content.lang];
            const pages = content.lang === "es" ? esPages : enPages;
            const cards = content.projects.items;
            const index = buildProjectsHead(content, ui, projects.map((facts) => ({
                slug: PROJECT_SLUG[facts.id],
                name: cards[facts.id].name
            })));
            expect(index.canonical).toBe(`https://sebastianlopezo.page/${content.lang}/projects`);
            const graph = JSON.parse(index.jsonLd)["@graph"];
            expect(graph.map((node: {
                "@type": string
            }) => node["@type"])).toEqual(["CollectionPage", "Person", "BreadcrumbList"]);
            expect(graph[0].mainEntity.itemListElement).toHaveLength(projects.length);
            titles.add(index.title);
            for (const facts of projects) {
                const id = facts.id;
                const slug = PROJECT_SLUG[id];
                const head = isCaseStudy(id)
                    ? buildCaseStudyHead(content, ui, slug, items[id], caseStudyById(id))
                    : buildProjectPageHead(content, ui, slug, cards[id], pages.items[id], facts);
                titles.add(head.title);
                expect(head.type).toBe("article");
                expect(head.canonical).toBe(`https://sebastianlopezo.page/${content.lang}/projects/${slug}`);
                expect(head.image).toBe(`https://sebastianlopezo.page/og/${isCaseStudy(id) ? "case" : "project"}-${slug}-${content.lang}.jpg`);
                expect(head.description.length).toBeGreaterThanOrEqual(70);
                expect(head.description.length).toBeLessThanOrEqual(170);
                const html = renderHeadTags(head);
                expect(html).toContain('property="og:type" content="article"');
                expect(html).not.toContain("profile:first_name");
            }
        }
        expect(titles.size).toBe(2 * (projects.length + 1));
    });
});
