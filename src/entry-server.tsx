import {renderToString} from "solid-js/web";
import {StaticRouter} from "@/routes/Router";
import App from "@/App";
import {AboutSection} from "@/components/sections/AboutSection";
import {CertificationsSection} from "@/components/sections/CertificationsSection";
import {ContactSection} from "@/components/sections/ContactSection";
import {ExperienceSection} from "@/components/sections/ExperienceSection";
import {JourneySection} from "@/components/sections/JourneySection";
import {MetricsSection} from "@/components/sections/MetricsSection";
import {ProjectsSection} from "@/components/sections/ProjectsSection";
import {ResumeSection} from "@/components/sections/ResumeSection";
import {ServicesSection} from "@/components/sections/ServicesSection";
import {SkillsSection} from "@/components/sections/SkillsSection";
import {TestimonialsSection} from "@/components/sections/TestimonialsSection";
import {registerServerSections} from "@/lib/server-sections";
import {registerSectionCopies} from "@/content/sections";
import {ProjectBody} from "@/pages/ProjectPages";
import {DetailBody} from "@/pages/DetailPages";
import {registerProjectBody} from "@/lib/project-body";
import {registerDetailBody} from "@/lib/detail-body";
import en from "@/content/en";
import es from "@/content/es";
import {caseStudyCopy} from "@/content/case-studies";
import {registerProjectsCopy} from "@/content/project-copy";
import {registerDetailCopy} from "@/content/detail-copy";
import {detailPages as enDetails} from "@/content/detail-pages/en";
import {detailPages as esDetails} from "@/content/detail-pages/es";
import {projectPages as enPages} from "@/content/project-pages/en";
import {projectPages as esPages} from "@/content/project-pages/es";
import {isCaseStudy, PROJECT_SLUG, projectIdBySlug} from "@/content/shared/project-links";
import {caseStudyById} from "@/content/shared/case-studies";
import {projectById, projects} from "@/content/shared/projects";
import {parseDetailPath, parsePath, parseProjectPath} from "@/lib/paths";
import {buildHead, renderHeadTags} from "@/lib/seo";
import {buildCaseStudyHead, buildProjectPageHead, buildProjectsHead} from "@/lib/seo-projects";
import {detailHead} from "@/lib/seo-details";
import type {Content} from "@/types/content";

export {prerenderRoutes} from "@/lib/paths";
export {buildRobots, buildSitemap} from "@/lib/sitemap";
export {SITE_URL} from "@/content/shared/site";
export {profile} from "@/content/shared/profile";

registerServerSections({
    about: AboutSection,
    journey: JourneySection,
    services: ServicesSection,
    experience: ExperienceSection,
    skills: SkillsSection,
    projects: ProjectsSection,
    certifications: CertificationsSection,
    metrics: MetricsSection,
    resume: ResumeSection,
    testimonials: TestimonialsSection,
    contact: ContactSection,
});
registerSectionCopies(en);
registerSectionCopies(es);
registerProjectsCopy("en", {cases: caseStudyCopy.en, pages: enPages});
registerProjectsCopy("es", {cases: caseStudyCopy.es, pages: esPages});
registerProjectBody((slug) => <ProjectBody slug={slug}/>);
registerDetailCopy("en", enDetails);
registerDetailCopy("es", esDetails);
registerDetailBody((collection, slug) => <DetailBody collection={collection} slug={slug}/>);

const headFor = (url: string, content: Content) => {
    const project = parseProjectPath(url);
    if (project) {
        const {ui, items} = caseStudyCopy[content.lang];
        const cards = content.projects.items;
        if (!project.slug) {
            const listed = projects.map((facts) => ({slug: PROJECT_SLUG[facts.id], name: cards[facts.id].name}));
            return renderHeadTags(buildProjectsHead(content, ui, listed));
        }
        const id = projectIdBySlug(project.slug);
        if (isCaseStudy(id)) return renderHeadTags(buildCaseStudyHead(content, ui, project.slug, items[id], caseStudyById(id)));
        const pages = content.lang === "es" ? esPages : enPages;
        return renderHeadTags(buildProjectPageHead(content, ui, project.slug, cards[id], pages.items[id], projectById(id)));
    }
    const detail = parseDetailPath(url);
    if (detail) {
        const copy = content.lang === "es" ? esDetails : enDetails;
        return renderHeadTags(detailHead(content, {
            copy,
            about: content.about,
            certifications: content.certifications
        }, detail.collection, detail.slug));
    }
    const match = parsePath(url);
    return match ? renderHeadTags(buildHead(content, match.role)) : "";
};

export function render(url: string) {
    const lang = parsePath(url)?.lang ?? parseProjectPath(url)?.lang ?? parseDetailPath(url)?.lang;
    const content = lang === "es" ? es : en;
    const html = renderToString(() => (
        <StaticRouter url={url}>
            <App content={content}/>
        </StaticRouter>
    ));
    const head = lang ? headFor(url, content) : "";
    return {html, head, lang: content.lang, status: lang ? 200 : 404};
}
