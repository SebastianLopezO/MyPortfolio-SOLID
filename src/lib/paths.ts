import {isRoleId, ROLE_IDS, type RoleId} from "@/content/roles";
import {
    DETAIL_COLLECTIONS,
    type DetailCollection,
    detailSlugs,
    isDetailCollection,
    isDetailSlug
} from "@/content/shared/detail-links";
import {isProjectSlug, PROJECT_SLUGS, type ProjectSlug} from "@/content/shared/project-links";
import {absoluteUrl} from "@/content/shared/site";
import type {Lang} from "@/types/content";

export const LANGS = ["en", "es"] as const satisfies readonly Lang[];

export const DEFAULT_LANG: Lang = "en";

export const LOCK_PARAM = "locked";

/** Carries the role view a visitor came from into the project pages, so links back keep it. */
export const FROM_PARAM = "from";

export const PROJECTS_SEGMENT = "projects";

export const isLang = (value: unknown): value is Lang => LANGS.includes(value as Lang);

export const otherLang = (lang: Lang): Lang => (lang === "en" ? "es" : "en");

export interface PathOptions {
    locked?: boolean;
    hash?: string;
}

const fragment = (hash: string) => (hash ? (hash.startsWith("#") ? hash : `#${hash}`) : "");

export const buildPath = (lang: Lang, role: RoleId | null, {locked = false, hash = ""}: PathOptions = {}) => {
    const path = role ? `/${lang}/${role}` : `/${lang}`;
    const query = locked ? `?${LOCK_PARAM}=true` : "";
    return `${path}${query}${fragment(hash)}`;
};

export const parsePath = (pathname: string): { lang: Lang; role: RoleId | null } | null => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0 || segments.length > 2) return null;
    const [lang, role] = segments;
    if (!isLang(lang)) return null;
    if (role === undefined) return {lang, role: null};
    return isRoleId(role) ? {lang, role} : null;
};

export interface ProjectPathOptions extends PathOptions {
    slug?: ProjectSlug | null;
    from?: RoleId | null;
}

export const buildProjectPath = (lang: Lang, {
    slug = null,
    from = null,
    locked = false,
    hash = ""
}: ProjectPathOptions = {}) => {
    const path = slug ? `/${lang}/${PROJECTS_SEGMENT}/${slug}` : `/${lang}/${PROJECTS_SEGMENT}`;
    const params = [from && `${FROM_PARAM}=${from}`, locked && `${LOCK_PARAM}=true`].filter(Boolean);
    const query = params.length ? `?${params.join("&")}` : "";
    return `${path}${query}${fragment(hash)}`;
};

export const parseProjectPath = (pathname: string): { lang: Lang; slug: ProjectSlug | null } | null => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length < 2 || segments.length > 3) return null;
    const [lang, section, slug] = segments;
    if (!isLang(lang) || section !== PROJECTS_SEGMENT) return null;
    if (slug === undefined) return {lang, slug: null};
    return isProjectSlug(slug) ? {lang, slug} : null;
};

export interface DetailPathOptions extends PathOptions {
    slug?: string | null;
    from?: RoleId | null;
}

/** A job, program, certification or organization page, or with no slug the collection's index. */
export const buildDetailPath = (lang: Lang, collection: DetailCollection, {
    slug = null,
    from = null,
    locked = false,
    hash = ""
}: DetailPathOptions = {}) => {
    const path = slug ? `/${lang}/${collection}/${slug}` : `/${lang}/${collection}`;
    const params = [from && `${FROM_PARAM}=${from}`, locked && `${LOCK_PARAM}=true`].filter(Boolean);
    const query = params.length ? `?${params.join("&")}` : "";
    return `${path}${query}${fragment(hash)}`;
};

export const parseDetailPath = (pathname: string): {
    lang: Lang;
    collection: DetailCollection;
    slug: string | null
} | null => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length < 2 || segments.length > 3) return null;
    const [lang, collection, slug] = segments;
    if (!isLang(lang) || !isDetailCollection(collection)) return null;
    if (slug === undefined) return {lang, collection, slug: null};
    return isDetailSlug(collection, slug) ? {lang, collection, slug} : null;
};

export const isLockedSearch = (search: string) => new URLSearchParams(search).get(LOCK_PARAM) === "true";

export const roleFromSearch = (search: string): RoleId | null => {
    const value = new URLSearchParams(search).get(FROM_PARAM);
    return isRoleId(value) ? value : null;
};

export const alternates = (role: RoleId | null) => [
    ...LANGS.map((lang) => ({hreflang: lang as string, href: absoluteUrl(buildPath(lang, role))})),
    {hreflang: "x-default", href: absoluteUrl(buildPath(DEFAULT_LANG, role))},
];

export const projectAlternates = (slug: ProjectSlug | null) => [
    ...LANGS.map((lang) => ({hreflang: lang as string, href: absoluteUrl(buildProjectPath(lang, {slug}))})),
    {hreflang: "x-default", href: absoluteUrl(buildProjectPath(DEFAULT_LANG, {slug}))},
];

export const detailAlternates = (collection: DetailCollection, slug: string | null) => [
    ...LANGS.map((lang) => ({hreflang: lang as string, href: absoluteUrl(buildDetailPath(lang, collection, {slug}))})),
    {hreflang: "x-default", href: absoluteUrl(buildDetailPath(DEFAULT_LANG, collection, {slug}))},
];

export type Route =
    | { kind: "profile"; lang: Lang; role: RoleId | null; path: string }
    | { kind: "projects"; lang: Lang; slug: ProjectSlug | null; path: string }
    | { kind: "detail"; lang: Lang; collection: DetailCollection; slug: string | null; path: string };

export const prerenderRoutes: Route[] = [
    ...LANGS.flatMap((lang) => [null, ...ROLE_IDS].map((role) => ({
        kind: "profile" as const,
        lang,
        role,
        path: buildPath(lang, role)
    }))),
    ...LANGS.flatMap((lang) => [null, ...PROJECT_SLUGS].map((slug) => ({
        kind: "projects" as const,
        lang,
        slug,
        path: buildProjectPath(lang, {slug})
    }))),
    ...LANGS.flatMap((lang) =>
        DETAIL_COLLECTIONS.flatMap((collection) =>
            [null, ...detailSlugs(collection)].map((slug) => ({
                kind: "detail" as const,
                lang,
                collection,
                slug,
                path: buildDetailPath(lang, collection, {slug})
            })),
        ),
    ),
];

export const routeAlternates = (route: Route) => {
    if (route.kind === "profile") return alternates(route.role);
    if (route.kind === "projects") return projectAlternates(route.slug);
    return detailAlternates(route.collection, route.slug);
};
