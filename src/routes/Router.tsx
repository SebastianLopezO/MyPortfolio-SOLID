import {createSignal, type JSX, type ParentProps, useContext} from "solid-js";
import {isServer} from "solid-js/web";
import {withBase} from "@/lib/base";
import {parseUrl, RouterContext} from "@/routes/router-context";

/**
 * The location of a generated page. Every page is its own document, so the location never changes while an island
 * lives: the prerender knows the path, and the browser adds the query and the hash, which an island reads only once
 * it is hydrated (hooks/useHydrated.ts). Moving to another page loads that page.
 */
export function PageRouter(props: ParentProps<{ path: string }>) {
    const location = () => (isServer ? parseUrl(props.path) : parseUrl(window.location.href));
    // The caller passes a base-less path; the browser needs it under the subpath the site is served from.
    const navigate = (to: string, {replace = false}: { replace?: boolean } = {}) => {
        if (replace) window.location.replace(withBase(to));
        else window.location.assign(withBase(to));
    };
    return <RouterContext.Provider value={{location, navigate, soft: false}}>{props.children}</RouterContext.Provider>;
}

export function MemoryRouter(props: ParentProps<{ initialUrl: string }>) {
    // The initial URL seeds the router once, like a browser's address bar on load.
    const [location, setLocation] = createSignal(parseUrl(props.initialUrl));
    const navigate = (to: string) => setLocation(parseUrl(to));
    return <RouterContext.Provider value={{location, navigate, soft: true}}>{props.children}</RouterContext.Provider>;
}

export function StaticRouter(props: ParentProps<{ url: string }>) {
    const location = () => parseUrl(props.url);
    return <RouterContext.Provider
        value={{location, navigate: () => undefined, soft: false}}>{props.children}</RouterContext.Provider>;
}

interface LinkProps {
    to: string;
    class?: string;
    onClick?: (event: MouseEvent) => void;
    tabindex?: number;
    translate?: "yes" | "no";
    "data-testid"?: string;
    "aria-label"?: string;
    "aria-current"?: JSX.AnchorHTMLAttributes<HTMLAnchorElement>["aria-current"];
    "aria-hidden"?: "true";
    "aria-labelledby"?: string;
    "aria-describedby"?: string;
    children?: JSX.Element;
}

/**
 * An internal link that moves without reloading. Its attributes are listed rather than spread, so each one compiles
 * to a direct update and the prerendered tag carries only the ones set.
 */
export function Link(props: LinkProps) {
    const router = useContext(RouterContext);

    const handleClick = (event: MouseEvent) => {
        props.onClick?.(event);
        // Between generated pages the browser follows the link itself; only an in-memory router moves without it.
        if (!router?.soft || event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return;
        event.preventDefault();
        router.navigate(props.to);
    };

    return (
        <a
            href={withBase(props.to)}
            onClick={handleClick}
            class={props.class}
            tabindex={props.tabindex}
            translate={props.translate}
            data-testid={props["data-testid"]}
            aria-label={props["aria-label"]}
            aria-current={props["aria-current"]}
            aria-hidden={props["aria-hidden"]}
            aria-labelledby={props["aria-labelledby"]}
            aria-describedby={props["aria-describedby"]}
        >
            {props.children}
        </a>
    );
}
