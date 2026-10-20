import {createSignal, type JSX, onCleanup, onMount, type ParentProps, splitProps, useContext} from "solid-js";
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
    // eslint-disable-next-line solid/reactivity
    const [location, setLocation] = createSignal(parseUrl(props.initialUrl));
    const navigate = (to: string) => setLocation(parseUrl(to));
    return <RouterContext.Provider value={{location, navigate}}>{props.children}</RouterContext.Provider>;
}

export function StaticRouter(props: ParentProps<{ url: string }>) {
    const location = () => parseUrl(props.url);
    return <RouterContext.Provider value={{location, navigate: () => undefined}}>{props.children}</RouterContext.Provider>;
}

type LinkProps = Omit<JSX.AnchorHTMLAttributes<HTMLAnchorElement>, "onClick"> & {
    to: string;
    onClick?: (event: MouseEvent) => void;
};

export function Link(props: LinkProps) {
    const router = useContext(RouterContext);
    const [local, rest] = splitProps(props, ["to", "onClick"]);

    const handleClick = (event: MouseEvent) => {
        local.onClick?.(event);
        if (!router || event.defaultPrevented || event.button !== 0) return;
        if (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey) return;
        event.preventDefault();
        router.navigate(local.to);
    };

    return <a href={local.to} onClick={handleClick} {...rest}/>;
}

export function Navigate(props: { to: string }) {
    const router = useContext(RouterContext);
    onMount(() => router?.navigate(props.to, {replace: true}));
    return null;
}
