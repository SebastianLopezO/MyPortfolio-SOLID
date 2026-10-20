import {useLanguage} from "@/context/language";
import type {Lang} from "@/types/content";
import type {DetailPagesCopy} from "@/types/detail";

const LOADERS: Record<Lang, () => Promise<DetailPagesCopy>> = {
    es: () => import("./detail-pages/es").then((module) => module.detailPages),
    en: () => import("./detail-pages/en").then((module) => module.detailPages),
};

const loaded = new Map<Lang, DetailPagesCopy>();
const requests = new Map<Lang, Promise<DetailPagesCopy>>();

/** The text of the job, program, certification and organization pages: one chunk per language. */
export const loadDetailCopy = (lang: Lang): Promise<DetailPagesCopy> => {
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

/** The prerender registers both languages up front, so a detail page never suspends on the server. */
export const registerDetailCopy = (lang: Lang, copy: DetailPagesCopy) => {
    loaded.set(lang, copy);
};

/** Reads the copy loaded before the page rendered: the prerender registers it, the browser waits for it first. */
export function useDetailCopy(): DetailPagesCopy {
    const {lang} = useLanguage();
    const copy = loaded.get(lang);
    if (!copy) throw new Error(`The page copy in ${lang} was rendered before it loaded`);
    return copy;
}
