import type {StartupContent} from "@/types/content";
import {hero, highlights} from "./hero";
import {seo} from "./seo";
import {ui} from "./ui";

/** The copy the page hydrates with; the sections below the hero load theirs on their own (content/sections.ts). */
const startup = {
    lang: "en",
    locale: "en_US",
    seo,
    ui,
    hero,
    highlights,
} satisfies StartupContent;

export default startup;
