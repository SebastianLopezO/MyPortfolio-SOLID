import {type Component, lazy} from "solid-js";
import {loadDetailCopy} from "@/content/detail-copy";
import {loadProjectsCopy} from "@/content/project-copy";
import {loadSectionCopy} from "@/content/sections";
import {type DetailCollection, DETAIL_SECTION_COPIES} from "@/content/shared/detail-links";
import type {ProjectSlug} from "@/content/shared/project-links";
import type {Lang} from "@/types/content";

/**
 * The body of the project pages with the text it reads: its own chunk, the case studies and project pages, the cards
 * and the about section, whose degrees name the programs in the related links.
 */
export const loadProjectPage = (lang: Lang) =>
    Promise.all([
        import("@/pages/ProjectPages"),
        loadProjectsCopy(lang),
        loadSectionCopy("projects", lang),
        loadSectionCopy("about", lang),
    ]).then(([module]) => module.ProjectBody);

/**
 * The body of the job, program, certification and organization pages with the text it reads. A job, program or
 * organization shows its projects' screens, whose descriptions live with the project pages.
 */
export const loadDetailPage = (lang: Lang, withProjects: boolean) =>
    Promise.all([
        import("@/pages/DetailPages"),
        loadDetailCopy(lang),
        ...DETAIL_SECTION_COPIES.map((key) => loadSectionCopy(key, lang)),
        withProjects && loadProjectsCopy(lang),
    ]).then(([module]) => module.DetailBody);

type ProjectBodyProps = { slug: ProjectSlug | null };
type DetailBodyProps = { collection: DetailCollection; slug: string | null };

const projectBodies = new Map<Lang, Component<ProjectBodyProps>>();
const detailBodies = new Map<Lang, Component<DetailBodyProps>>();

/** The project body for navigation from another page, created once per language. */
export const lazyProjectBody = (lang: Lang) => {
    let body = projectBodies.get(lang);
    if (!body) {
        body = lazy(() => loadProjectPage(lang).then((ProjectBody) => ({default: ProjectBody})));
        projectBodies.set(lang, body);
    }
    return body;
};

/** The detail body for navigation from another page, with the project text any of them may show. */
export const lazyDetailBody = (lang: Lang) => {
    let body = detailBodies.get(lang);
    if (!body) {
        body = lazy(() => loadDetailPage(lang, true).then((DetailBody) => ({default: DetailBody})));
        detailBodies.set(lang, body);
    }
    return body;
};
