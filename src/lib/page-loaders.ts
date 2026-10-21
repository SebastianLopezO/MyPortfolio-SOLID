import {loadDetailCopy} from "@/content/detail-copy";
import {loadProjectsCopy} from "@/content/project-copy";
import {loadSectionCopy} from "@/content/sections";
import {DETAIL_SECTION_COPIES} from "@/content/shared/detail-links";
import type {Lang} from "@/types/content";

/**
 * The body of the project pages with the text it reads: its own chunk, the case studies and project pages, the cards
 * and the about section, whose degrees name the programs in the related links.
 */
export const loadProjectPage = (lang: Lang) =>
    Promise.all([
        import("@/islands/parts/project-body"),
        loadProjectsCopy(lang),
        loadSectionCopy("projects", lang),
        loadSectionCopy("about", lang),
    ]).then(([module]) => module.ProjectBodyPart);

/**
 * The body of the job, program, certification and organization pages with the text it reads. A job, program or
 * organization shows its projects' screens, whose descriptions live with the project pages.
 */
export const loadDetailPage = (lang: Lang, withProjects: boolean) =>
    Promise.all([
        import("@/islands/parts/detail-body"),
        loadDetailCopy(lang),
        ...DETAIL_SECTION_COPIES.map((key) => loadSectionCopy(key, lang)),
        withProjects && loadProjectsCopy(lang),
    ]).then(([module]) => module.DetailBodyPart);
