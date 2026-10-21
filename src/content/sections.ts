import {useLanguage} from "@/context/language";
import {type Content, type Lang, SECTION_COPY_KEYS, type SectionCopies, type SectionCopyKey} from "@/types/content";

type Loaders = { [K in SectionCopyKey]: Record<Lang, () => Promise<SectionCopies[K]>> };

// One chunk per section and language: a page downloads only the copy of its own language.
const LOADERS: Loaders = {
    about: {
        en: () => import("./en/about").then((module) => module.about),
        es: () => import("./es/about").then((module) => module.about)
    },
    experience: {
        en: () => import("./en/experience").then((module) => module.experience),
        es: () => import("./es/experience").then((module) => module.experience),
    },
    services: {
        en: () => import("./en/services").then((module) => module.services),
        es: () => import("./es/services").then((module) => module.services)
    },
    skills: {
        en: () => import("./en/skills").then((module) => module.skills),
        es: () => import("./es/skills").then((module) => module.skills)
    },
    projects: {
        en: () => import("./en/projects").then((module) => module.projects),
        es: () => import("./es/projects").then((module) => module.projects)
    },
    certifications: {
        en: () => import("./en/certifications").then((module) => module.certifications),
        es: () => import("./es/certifications").then((module) => module.certifications),
    },
    testimonials: {
        en: () => import("./en/testimonials").then((module) => module.testimonials),
        es: () => import("./es/testimonials").then((module) => module.testimonials),
    },
    resume: {
        en: () => import("./en/resume").then((module) => module.resume),
        es: () => import("./es/resume").then((module) => module.resume)
    },
    metrics: {
        en: () => import("./en/metrics").then((module) => module.metrics),
        es: () => import("./es/metrics").then((module) => module.metrics)
    },
    contact: {
        en: () => import("./en/contact").then((module) => module.contact),
        es: () => import("./es/contact").then((module) => module.contact)
    },
};

const loaded = new Map<string, unknown>();
const requests = new Map<string, Promise<unknown>>();
const idOf = (key: SectionCopyKey, lang: Lang) => `${lang}:${key}`;

export const loadSectionCopy = <K extends SectionCopyKey>(key: K, lang: Lang): Promise<SectionCopies[K]> => {
    const id = idOf(key, lang);
    let request = requests.get(id) as Promise<SectionCopies[K]> | undefined;
    if (!request) {
        request = LOADERS[key][lang]().then((copy) => {
            loaded.set(id, copy);
            return copy;
        });
        requests.set(id, request);
    }
    return request;
};

/** The prerender registers the full content up front, so rendering a section never suspends on the server. */
export const registerSectionCopies = (content: Content) => {
    for (const key of SECTION_COPY_KEYS) loaded.set(idOf(key, content.lang), content[key]);
};

/** Waits for the copy of several sections; a lazy section resolves only once the copy it reads has arrived. */
export const loadSectionCopies = (keys: readonly SectionCopyKey[], lang: Lang) =>
    Promise.all(keys.map((key) => loadSectionCopy(key, lang)));

/**
 * The copy of one section in the page's language. It reads what is already loaded: the server registers every copy
 * up front, and in the browser the code that renders a section waits for its copy first (section-loaders.ts,
 * main.tsx), so asking for a copy that has not arrived is a bug in that list, not a state to render.
 */
export function useSectionCopy<K extends SectionCopyKey>(key: K): SectionCopies[K] {
    const {lang} = useLanguage();
    const copy = loaded.get(idOf(key, lang)) as SectionCopies[K] | undefined;
    if (!copy) throw new Error(`The ${key} copy in ${lang} was rendered before it loaded`);
    return copy;
}
