import hydrate from "@astrojs/solid-js/client.js";
import {sharedConfig} from "solid-js";
import type {PartProps} from "./shell";

interface Island {
    preload?: (props: PartProps) => Promise<void>;
}

/** What Solid's hydration script leaves on the page (the HydrationScript Astro adds before the first island). */
declare global {
    var _$HY: { done?: boolean } | undefined;
}

/**
 * Astro's Solid renderer with two steps first.
 *
 * The island's part, its code and copy, loads before Solid hydrates it. Solid keeps the nodes left to hydrate in one
 * registry per page, which each island's hydration starts afresh, so an island that waited for a chunk halfway through
 * would find its nodes gone if another island began meanwhile. Loaded first, every island hydrates in one synchronous
 * pass.
 *
 * And Solid takes the first event it handles as the end of the page's hydration, as it is for an app with one root:
 * from then on it would render every island that comes near the screen afresh, replacing its HTML. Each island starts
 * its own hydration instead.
 */
export default (element: HTMLElement) =>
    async (Component: Island, props: PartProps, slotted: Record<string, string>, options: { client: string }) => {
        await Component.preload?.(props);
        sharedConfig.done = false;
        if (globalThis._$HY) globalThis._$HY.done = false;
        hydrate(element)(Component, props, slotted, options);
    };
