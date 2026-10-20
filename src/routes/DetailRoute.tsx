import {createMemo} from "solid-js";
import {Dynamic} from "solid-js/web";
import type {DetailCollection} from "@/content/shared/detail-links";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {RoleProvider} from "@/context/RoleProvider";
import {useHydrated} from "@/hooks/useHydrated";
import {AssistantLauncher} from "@/components/assistant/AssistantLauncher";
import {SiteFooter} from "@/components/layout/SiteFooter";
import {SiteHeader} from "@/components/layout/SiteHeader";
import {SkipLink} from "@/components/layout/SkipLink";
import {WhatsAppButton} from "@/components/layout/WhatsAppButton";
import {renderDetailBody} from "@/lib/detail-body";
import {lazyDetailBody} from "@/lib/page-loaders";
import {buildDetailPath, roleFromSearch} from "@/lib/paths";
import {sectionOrder} from "@/lib/role-view";
import {useLocation} from "@/routes/router-context";

interface DetailRouteProps {
    collection: DetailCollection;
    slug: string | null;
}

function DetailShell(props: DetailRouteProps) {
    const {lang, alternateLang} = useLanguage();
    const {role, locked} = useRole();
    return (
        <>
            <SkipLink/>
            <SiteHeader sections={sectionOrder(role())} homeLinks
                        languageHref={buildDetailPath(alternateLang, props.collection, {
                            slug: props.slug,
                            from: role(),
                            locked: locked()
                        })}/>
            <main id="main" class="pt-(--header-height)">
                {renderDetailBody(props.collection, props.slug) ??
                    <Dynamic component={lazyDetailBody(lang)} collection={props.collection} slug={props.slug}/>}
            </main>
            <SiteFooter/>
            <WhatsAppButton/>
            <AssistantLauncher/>
        </>
    );
}

// Like the project pages (routes/ProjectsRoute.tsx): prerendered, with their text and components in their own chunk,
// and the role view the visitor came from read from the query once the page is hydrated.
export function DetailRoute(props: DetailRouteProps) {
    const location = useLocation();
    const hydrated = useHydrated();
    const from = createMemo(() => (hydrated() ? roleFromSearch(location().search) : null));

    return (
        <RoleProvider role={from()}>
            <DetailShell collection={props.collection} slug={props.slug}/>
        </RoleProvider>
    );
}
