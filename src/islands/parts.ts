import type {Component} from "solid-js";
import {loadSection} from "@/components/sections/section-loaders";
import {loadContent} from "@/content";
import {loadDetailPage, loadProjectPage} from "@/lib/page-loaders";
import {parseDetailPath} from "@/lib/paths";
import type {Lang, SectionId, StartupContent} from "@/types/content";
import type {PartProps} from "./shell";

/** The parts a page is made of; the static ones never reach the browser as code. */
export type PartName =
    | "boot" | "header" | "hero" | "assistant" | "projectBody" | "detailBody"
    | `section:${SectionId}`
    | "skip" | "highlights" | "footer" | "whatsapp" | "notFound";

type Loader = (lang: Lang, path: string) => Promise<Component<PartProps>>;

/**
 * How the browser gets each interactive part: its code in a chunk of its own and the copy it reads, together, so the
 * part renders, and hydrates, without waiting for anything else.
 */
const LOADERS: Record<string, Loader> = {
    boot: () => import("./parts/boot").then((module) => module.Boot),
    header: () => import("./parts/header").then((module) => module.HeaderPart),
    hero: () => import("@/components/sections/HeroSection").then((module) => module.HeroSection),
    assistant: () => import("@/components/assistant/AssistantLauncher").then((module) => module.AssistantLauncher),
    projectBody: (lang) => loadProjectPage(lang),
    detailBody: (lang, path) => {
        const detail = parseDetailPath(path);
        return loadDetailPage(lang, Boolean(detail?.slug) && detail?.collection !== "certifications");
    },
};

const loaderOf = (part: string): Loader => {
    if (part.startsWith("section:")) {
        const id = part.slice("section:".length) as SectionId;
        return (lang) => loadSection(id, lang).then((module) => module.default);
    }
    const loader = LOADERS[part];
    if (!loader) throw new Error(`The ${part} part does not hydrate`);
    return loader;
};

/** A part's code and copy with the page's startup copy, which the shell around it provides. */
export const loadPart = (part: string, lang: Lang, path: string): Promise<[Component<PartProps>, StartupContent]> =>
    Promise.all([loaderOf(part)(lang, path), loadContent(lang)]);
