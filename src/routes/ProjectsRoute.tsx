import {createMemo} from "solid-js";
import {Dynamic} from "solid-js/web";
import type {ProjectSlug} from "@/content/shared/project-links";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {RoleProvider} from "@/context/RoleProvider";
import {useHydrated} from "@/hooks/useHydrated";
import {AssistantLauncher} from "@/components/assistant/AssistantLauncher";
import {SiteFooter} from "@/components/layout/SiteFooter";
import {SiteHeader} from "@/components/layout/SiteHeader";
import {SkipLink} from "@/components/layout/SkipLink";
import {WhatsAppButton} from "@/components/layout/WhatsAppButton";
import {lazyProjectBody} from "@/lib/page-loaders";
import {buildProjectPath, roleFromSearch} from "@/lib/paths";
import {renderProjectBody} from "@/lib/project-body";
import {sectionOrder} from "@/lib/role-view";
import {useLocation} from "@/routes/router-context";

function ProjectsShell(props: { slug: ProjectSlug | null }) {
    const {lang, alternateLang} = useLanguage();
    const {role, locked} = useRole();
    return (
        <>
            <SkipLink/>
            <SiteHeader sections={sectionOrder(role())} homeLinks
                        languageHref={buildProjectPath(alternateLang, {slug: props.slug, from: role(), locked: locked()})}/>
            <main id="main" class="pt-(--header-height)">
                {renderProjectBody(props.slug) ?? <Dynamic component={lazyProjectBody(lang)} slug={props.slug}/>}
            </main>
            <SiteFooter/>
            <WhatsAppButton/>
            <AssistantLauncher/>
        </>
    );
}

// The project pages are prerendered, but their text and components load in their own chunk; the header and footer
// come from the main bundle. A page opened directly hydrates with its body registered (lib/project-body.ts); the lazy
// body only serves navigation from another page. The role view the visitor came from travels in the query, which
// the prerender cannot see, so it is read only after hydration.
export function ProjectsRoute(props: { slug: ProjectSlug | null }) {
    const location = useLocation();
    const hydrated = useHydrated();
    const from = createMemo(() => (hydrated() ? roleFromSearch(location().search) : null));

    return (
        <RoleProvider role={from()}>
            <ProjectsShell slug={props.slug}/>
        </RoleProvider>
    );
}
