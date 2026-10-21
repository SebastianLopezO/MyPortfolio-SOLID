import type {Component} from "solid-js";
import type {Lang, StartupContent} from "@/types/content";
import type {PartProps} from "./shell";

type Loaded = [Component<PartProps>, StartupContent];

let serverParts: Record<string, Component<PartProps>> | null = null;
let serverContents: Record<Lang, StartupContent> | null = null;
const loaded = new Map<string, Loaded>();

/**
 * The build registers every part and both languages' copy up front (islands/server.tsx), so a page renders every part
 * in place without loading a chunk.
 */
export const registerServerParts = (registered: Record<string, Component<PartProps>>, startup: Record<Lang, StartupContent>) => {
    serverParts = registered;
    serverContents = startup;
};

/** The browser registers an island's part once its chunk and copy have loaded (PageIsland.preload). */
export const registerPart = (part: string, lang: Lang, value: Loaded) => loaded.set(`${part}:${lang}`, value);

export const registeredPart = (part: string, lang: Lang): Loaded | null =>
    serverParts?.[part] && serverContents ? [serverParts[part], serverContents[lang]] : loaded.get(`${part}:${lang}`) ?? null;
