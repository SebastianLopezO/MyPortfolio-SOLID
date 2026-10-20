import {onMount} from "solid-js";

/**
 * Marks `<html data-hydrated="true">` once the page and every section it shows can respond to input. The sections
 * hydrate one by one as their chunks arrive, so the root alone hydrating is not enough; the end-to-end tests and the
 * styles wait for this flag.
 */
let rootReady = false;
let expected: readonly string[] = [];
const ready = new Set<string>();
const waiting: (() => void)[] = [];

const flush = () => {
    if (!rootReady || !expected.every((id) => ready.has(id))) return;
    document.documentElement.dataset.hydrated = "true";
    for (const callback of waiting.splice(0)) callback();
};

export const whenHydrated = (callback: () => void) => {
    if (document.documentElement.dataset.hydrated === "true") callback();
    else waiting.push(callback);
};

export const markRootReady = () => {
    rootReady = true;
    flush();
};

/** The home page lists the sections it renders; other pages expect none. */
export const expectSections = (ids: readonly string[]) => {
    expected = ids;
    flush();
};

export const useSectionReady = (id: string) =>
    onMount(() => {
        ready.add(id);
        flush();
    });
