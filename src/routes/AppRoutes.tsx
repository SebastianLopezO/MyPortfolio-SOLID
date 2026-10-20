import {Show} from "solid-js";
import {DEFAULT_LANG} from "@/lib/paths";
import {LocaleRoute} from "@/routes/LocaleRoute";
import {Navigate} from "@/routes/Router";
import {useLocation} from "@/routes/router-context";

export function AppRoutes() {
    const location = useLocation();
    return (
        <Show when={location().pathname !== "/"} fallback={<Navigate to={`/${DEFAULT_LANG}`}/>}>
            <LocaleRoute/>
        </Show>
    );
}
