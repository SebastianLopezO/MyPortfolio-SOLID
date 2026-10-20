import {createMemo, type ParentProps} from "solid-js";
import {useLocation, useNavigate} from "@/routes/router-context";
import type {RoleId} from "@/content/roles";
import {useLanguage} from "@/context/language";
import {RoleContext} from "@/context/role";
import {useHydrated} from "@/hooks/useHydrated";
import {buildPath, isLockedSearch} from "@/lib/paths";

export function RoleProvider(props: ParentProps<{ role: RoleId | null }>) {
    const {lang} = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();
    const hydrated = useHydrated();
    // The prerender cannot see the query, so the lock applies once the page is hydrated.
    const locked = createMemo(() => hydrated() && isLockedSearch(location().search));
    const role = () => props.role;

    const pathFor = (next: RoleId | null, hash?: string) => buildPath(lang, next, {locked: locked(), hash});

    const setRole = (next: RoleId | null) => {
        if (locked() || next === props.role) return;
        navigate(buildPath(lang, next, {hash: location().hash}));
    };

    return <RoleContext.Provider value={{role, locked, setRole, pathFor}}>{props.children}</RoleContext.Provider>;
}
