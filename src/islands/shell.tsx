import {type Component, onMount, type ParentProps} from "solid-js";
import type {RoleId} from "@/content/roles";
import {LanguageProvider} from "@/context/LanguageProvider";
import {RoleProvider} from "@/context/RoleProvider";
import {useHydrated} from "@/hooks/useHydrated";
import {roleFromSearch} from "@/lib/paths";
import {markIslandReady} from "@/lib/ready";
import {PageRouter} from "@/routes/Router";
import {useLocation} from "@/routes/router-context";
import type {Lang, StartupContent} from "@/types/content";

/** What every part of a page receives: which part it is, the page's language and path and, on a home page, its view. */
export interface PartProps {
    part: string;
    lang: Lang;
    path: string;
    /** The role view of a home page. A project or detail page has none: it learns the view from ?from= once hydrated. */
    role?: RoleId | null;
}

function PageRole(props: ParentProps<{ role?: RoleId | null }>) {
    const location = useLocation();
    const hydrated = useHydrated();
    const role = () => (props.role !== undefined ? props.role : hydrated() ? roleFromSearch(location().search) : null);
    return <RoleProvider role={role()}>{props.children}</RoleProvider>;
}

/**
 * Wraps a part in what the old single-page app provided once for the whole page: the location, the language with its
 * startup copy, and the role view. Each island gets its own, since islands share no Solid context.
 */
export const shell = (Part: Component<PartProps>, content: StartupContent): Component<PartProps> => (props) => {
    onMount(() => markIslandReady(props.part));
    return (
        <PageRouter path={props.path}>
            <LanguageProvider content={content}>
                <PageRole role={props.role}>
                    <Part {...props}/>
                </PageRole>
            </LanguageProvider>
        </PageRouter>
    );
};
