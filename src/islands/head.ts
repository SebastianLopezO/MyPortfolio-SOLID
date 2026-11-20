import {caseStudyCopy} from "@/content/case-studies";
import {detailPages as enDetails} from "@/content/detail-pages/en";
import {detailPages as esDetails} from "@/content/detail-pages/es";
import en from "@/content/en";
import es from "@/content/es";
import {projectPages as enPages} from "@/content/project-pages/en";
import {projectPages as esPages} from "@/content/project-pages/es";
import {caseStudyById} from "@/content/shared/case-studies";
import {isCaseStudy, PROJECT_SLUG, projectIdBySlug} from "@/content/shared/project-links";
import {projectById, projects} from "@/content/shared/projects";
import type {Route} from "@/lib/paths";
import {buildHead, renderHeadTags} from "@/lib/seo";
import {detailHead} from "@/lib/seo-details";
import {buildCaseStudyHead, buildProjectPageHead, buildProjectsHead} from "@/lib/seo-projects";
import type {Content} from "@/types/content";

export const contentOf = (lang: string): Content => (lang === "es" ? es : en);

/** The head tags of a generated page: title, description, canonical, alternates, social tags and structured data. */
export const headFor = (route: Route) => {
    const content = contentOf(route.lang);
    if (route.kind === "projects") {
        const {ui, items} = caseStudyCopy[content.lang];
        const cards = content.projects.items;
        if (!route.slug) {
            const listed = projects.map((facts) => ({slug: PROJECT_SLUG[facts.id], name: cards[facts.id].name}));
            return renderHeadTags(buildProjectsHead(content, ui, listed));
        }
        const id = projectIdBySlug(route.slug);
        if (isCaseStudy(id)) return renderHeadTags(buildCaseStudyHead(content, ui, route.slug, items[id], caseStudyById(id)));
        const pages = content.lang === "es" ? esPages : enPages;
        return renderHeadTags(buildProjectPageHead(content, ui, route.slug, cards[id], pages.items[id], projectById(id)));
    }
    if (route.kind === "detail") {
        const copy = content.lang === "es" ? esDetails : enDetails;
        return renderHeadTags(detailHead(content, {
            copy,
            about: content.about,
            certifications: content.certifications,
            services: content.services,
            skills: content.skills,
        }, route.collection, route.slug));
    }
    return renderHeadTags(buildHead(content, route.role));
};
