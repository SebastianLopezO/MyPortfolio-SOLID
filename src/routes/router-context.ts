import {type Accessor, createContext, useContext} from "solid-js";

export interface RouterLocation {
    pathname: string;
    search: string;
    hash: string;
}

export interface RouterValue {
    location: Accessor<RouterLocation>;
    navigate: (to: string, options?: { replace?: boolean }) => void;
    /** Whether links move inside the page (an in-memory router) instead of loading the next document. */
    soft: boolean;
}

export const RouterContext = createContext<RouterValue>();

export const parseUrl = (url: string): RouterLocation => {
    const parsed = new URL(url, "http://localhost");
    return {pathname: parsed.pathname, search: parsed.search, hash: parsed.hash};
};

const useRouter = () => {
    const value = useContext(RouterContext);
    if (!value) throw new Error("Router hooks must be used inside a router");
    return value;
};

/** The current location, as an accessor: reading it inside JSX or a computation tracks navigation. */
export const useLocation = () => useRouter().location;

export const useNavigate = () => useRouter().navigate;
