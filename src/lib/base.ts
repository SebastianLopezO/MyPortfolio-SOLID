/*
 * The subpath the site is served from. It is "/" on the main domain (the nginx image) and the repository's path on
 * GitHub Pages (e.g. "/MyPortfolio-SOLID/"), set by Astro's `base` and read here through Vite's import.meta.env.
 * Internal links, client navigation and references to files in public/ pass through withBase so they keep working
 * under the subpath. The canonical and social URLs in lib/seo stay on the main domain (content/shared/site.ts), so a
 * GitHub Pages mirror points search engines back at the real site instead of competing with it.
 *
 * This module reads import.meta.env, so only code that Vite compiles may import it; the Node build scripts must not.
 */
const RAW = import.meta.env.BASE_URL;

/** The base without its trailing slash: "" at the root, "/MyPortfolio-SOLID" under a subpath. */
const PREFIX = RAW.replace(/\/+$/, "");

/** Prefixes an in-site absolute path with the base; hashes, queries and external URLs pass through unchanged. */
export const withBase = (path: string): string => (PREFIX && path.startsWith("/") ? `${PREFIX}${path}` : path);

/** Drops the base from a browser pathname, so the rest of the app parses and matches base-less paths. */
export const stripBase = (pathname: string): string => {
    if (!PREFIX) return pathname;
    if (pathname === PREFIX) return "/";
    return pathname.startsWith(`${PREFIX}/`) ? pathname.slice(PREFIX.length) : pathname;
};
