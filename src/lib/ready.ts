import {onMount} from "solid-js";

/**
 * Marks `<html data-hydrated="true">` once every island the page hydrates when idle can respond to input. The page
 * lists them on its root (`<div id="root" data-islands="boot header hero">`, layouts/Page.astro); the sections below the
 * first screen hydrate as they come into view and are not waited for. The end-to-end tests wait for this flag.
 */
const ready = new Set<string>();
const waiting: (() => void)[] = [];

const expected = () => document.getElementById("root")?.dataset.islands?.split(" ").filter(Boolean) ?? [];

const flush = () => {
    if (!expected().every((name) => ready.has(name))) return;
    document.documentElement.dataset.hydrated = "true";
    for (const callback of waiting.splice(0)) callback();
};

export const whenHydrated = (callback: () => void) => {
    if (document.documentElement.dataset.hydrated === "true") callback();
    else waiting.push(callback);
};

export const markIslandReady = (name: string) => {
    ready.add(name);
    flush();
};

/** A home section marks itself too, so a section's hydration can be told apart from the rest of the page. */
export const useSectionReady = (id: string) =>
    onMount(() => {
        document.getElementById(id)?.setAttribute("data-hydrated", "true");
    });
