import {useLanguage} from "@/context/language";
import type {CaseStudiesUi, CaseStudyCopy, CaseStudyId} from "@/types/case-study";
import type {Lang} from "@/types/content";
import type {ProjectPagesCopy} from "@/types/project";

/** The text of the project pages in one language: the case studies and the lighter project pages. */
export interface ProjectsCopy {
    cases: { ui: CaseStudiesUi; items: Record<CaseStudyId, CaseStudyCopy> };
    pages: ProjectPagesCopy;
}

const LOADERS: Record<Lang, () => Promise<ProjectsCopy>> = {
    es: () => Promise.all([import("./case-studies/es"), import("./project-pages/es")])
        .then(([cases, pages]) => ({cases: {ui: cases.ui, items: cases.items}, pages: pages.projectPages})),
    en: () => Promise.all([import("./case-studies/en"), import("./project-pages/en")])
        .then(([cases, pages]) => ({cases: {ui: cases.ui, items: cases.items}, pages: pages.projectPages})),
};

const loaded = new Map<Lang, ProjectsCopy>();
const requests = new Map<Lang, Promise<ProjectsCopy>>();

/** One chunk per language, shared with the assistant's case studies; a page downloads only its own language. */
export const loadProjectsCopy = (lang: Lang): Promise<ProjectsCopy> => {
    let request = requests.get(lang);
    if (!request) {
        request = LOADERS[lang]().then((copy) => {
            loaded.set(lang, copy);
            return copy;
        });
        requests.set(lang, request);
    }
    return request;
};

/** The prerender registers both languages up front, so a project page never suspends on the server. */
export const registerProjectsCopy = (lang: Lang, copy: ProjectsCopy) => {
    loaded.set(lang, copy);
};

/** Reads the copy loaded before the page rendered: the prerender registers it, the browser waits for it first. */
export function useProjectsCopy(): ProjectsCopy {
    const {lang} = useLanguage();
    const copy = loaded.get(lang);
    if (!copy) throw new Error(`The page copy in ${lang} was rendered before it loaded`);
    return copy;
}
