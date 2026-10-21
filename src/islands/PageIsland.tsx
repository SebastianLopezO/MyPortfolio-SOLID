import {Dynamic} from "solid-js/web";
import {loadPart} from "./parts";
import {registeredPart, registerPart} from "./registry";
import {type PartProps, shell} from "./shell";

/**
 * One part of a page. Without a client directive it is plain HTML; with one it is an island: the prerender renders it
 * in place, and in the browser its code and copy load in a chunk of their own (preload) before Solid hydrates its HTML
 * in one pass. Its props stay small (the part's name, the page's language, path and view), since Astro writes them into
 * the page.
 */
export default function PageIsland(props: PartProps) {
    const resolved = () => {
        const registered = registeredPart(props.part, props.lang);
        if (!registered) throw new Error(`The ${props.part} part hydrates before it loads`);
        return shell(...registered);
    };
    return <Dynamic component={resolved()} part={props.part} lang={props.lang} path={props.path} role={props.role}/>;
}

/** Loads a part before its island hydrates (islands/client.ts), from the props Astro wrote into the page. */
PageIsland.preload = async ({part, lang, path}: PartProps) => {
    if (!registeredPart(part, lang)) registerPart(part, lang, await loadPart(part, lang, path));
};
