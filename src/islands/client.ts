import hydrate from "@astrojs/solid-js/client.js";
import type {PartProps} from "./shell";

interface Island {
    preload?: (props: PartProps) => Promise<void>;
}

/**
 * Astro's Solid renderer with one step first: the island's part, its code and copy, loads before Solid hydrates it.
 * Solid keeps the nodes left to hydrate in one registry per page, which each island's hydration starts afresh, so an
 * island that waited for a chunk halfway through would find its nodes gone if another island began meanwhile. Loaded
 * first, every island hydrates in one synchronous pass.
 */
export default (element: HTMLElement) =>
    async (Component: Island, props: PartProps, slotted: Record<string, string>, options: { client: string }) => {
        await Component.preload?.(props);
        hydrate(element)(Component, props, slotted, options);
    };
