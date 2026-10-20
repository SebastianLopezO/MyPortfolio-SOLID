import {createSignal, type JSX, onCleanup, onMount, type ParentProps, useContext} from "solid-js";
import {parseUrl, RouterContext, type RouterLocation} from "@/routes/router-context";

const currentLocation = (): RouterLocation => ({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
});

export function BrowserRouter(props: ParentProps) {
    const [location, setLocation] = createSignal(currentLocation());

    const sync = () => setLocation(currentLocation());
    window.addEventListener("popstate", sync);
    onCleanup(() => window.removeEventListener("popstate", sync));

    const navigate = (to: string, {replace = false}: { replace?: boolean } = {}) => {
        if (replace) window.history.replaceState(null, "", to);
        else window.history.pushState(null, "", to);
        setLocation(currentLocation());
    };

    return <RouterContext.Provider value={{location, navigate}}>{props.children}</RouterContext.Provider>;
}

export function MemoryRouter(props: ParentProps<{ initialUrl: string }>) {
    // The initial URL seeds the router once, like a browser's address bar on load.
    const [location, setLocation] = createSignal(parseUrl(props.initialUrl));
    const navigate = (to: string) => setLocation(parseUrl(to));
    return <RouterContext.Provider value={{location, navigate}}>{props.children}</RouterContext.Provider>;
}

export function StaticRouter(props: ParentProps<{ url: string }>) {
    const location = () => parseUrl(props.url);
    return <RouterContext.Provider value={{location, navigate: () => undefined}}>{props.children}</RouterContext.Provider>;
}

interface LinkProps {
    to: string;
    class?: string;
    onClick?: (event: MouseEvent) => void;
    tabindex?: number;
    translate?: "yes" | "no";
    "aria-current"?: JSX.AnchorHTMLAttributes<HTMLAnchorElement>["aria-current"];
    "aria-hidden"?: "true";
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
        if (!router || event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return;
        event.preventDefault();
        router.navigate(props.to);
    };

    return (
        <a
            href={props.to}
            onClick={handleClick}
            class={props.class}
            tabindex={props.tabindex}
            translate={props.translate}
            aria-current={props["aria-current"]}
            aria-hidden={props["aria-hidden"]}
        >
            {props.children}
        </a>
    );
}

export function Navigate(props: { to: string }) {
    const router = useContext(RouterContext);
    onMount(() => router?.navigate(props.to, {replace: true}));
    return null;
}
