import {createMemo, Show} from "solid-js";
import {useLocation} from "@/routes/router-context";
import {useLanguage} from "@/context/language";
import {RoleProvider} from "@/context/RoleProvider";
import type {DetailCollection} from "@/content/shared/detail-links";
import type {ProjectSlug} from "@/content/shared/project-links";
import {parseDetailPath, parsePath, parseProjectPath} from "@/lib/paths";
import {HomePage} from "@/pages/HomePage";
import {NotFoundPage} from "@/pages/NotFoundPage";
import {DetailRoute} from "@/routes/DetailRoute";
import {ProjectsRoute} from "@/routes/ProjectsRoute";

type Page =
    | { kind: "home" }
    | { kind: "project"; slug: ProjectSlug | null }
    | { kind: "detail"; collection: DetailCollection; slug: string | null }
    | { kind: "missing" };

const pageKey = (page: Page) => {
    if (page.kind === "project") return `project:${page.slug}`;
    if (page.kind === "detail") return `detail:${page.collection}:${page.slug}`;
    return page.kind;
};

export function LocaleRoute() {
    const {lang} = useLanguage();
    const location = useLocation();
    const pathname = createMemo(() => location().pathname);
    const home = createMemo(() => {
        const match = parsePath(pathname());
        return match?.lang === lang ? match : null;
    });

    // Moving to another page mounts it anew; on the home page a role change only reorders it, so the sections keep
    // their state and follow the role from the provider.
    const page = createMemo<Page | undefined>(() => {
        const project = parseProjectPath(pathname());
        if (project) return project.lang === lang ? {kind: "project", slug: project.slug} : {kind: "missing"};
        const detail = parseDetailPath(pathname());
        if (detail) return detail.lang === lang ? {kind: "detail", ...detail} : {kind: "missing"};
        return home() ? {kind: "home"} : {kind: "missing"};
    }, undefined, {equals: (previous, next) => !!previous && !!next && pageKey(previous) === pageKey(next)});

    return (
        <Show when={page()} keyed>
            {(current) => {
                switch (current.kind) {
                    case "project":
                        return <ProjectsRoute slug={current.slug}/>;
                    case "detail":
                        return <DetailRoute collection={current.collection} slug={current.slug}/>;
                    case "home":
                        return (
                            <RoleProvider role={home()?.role ?? null}>
                                <HomePage/>
                            </RoleProvider>
                        );
                    default:
                        return <NotFoundPage/>;
                }
            }}
        </Show>
    );
}
