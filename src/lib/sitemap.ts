import {certificateImage} from "@/content/shared/certificate-images";
import {projectIdBySlug} from "@/content/shared/project-links";
import {projectById, projectImages} from "@/content/shared/projects";
import {absoluteUrl, BUILD_DATE, SITE_URL} from "@/content/shared/site";
import {certificationBySlug} from "@/lib/details";
import {widestVariant} from "@/lib/image-widths";
import {prerenderRoutes, type Route} from "@/lib/paths";

const priority = (route: Route) => {
    if (route.kind === "profile") return route.role ? "0.8" : "1.0";
    if (route.kind === "projects") return route.slug ? "0.7" : "0.9";
    return route.slug ? "0.6" : "0.8";
};

/** The pictures a page shows of its own subject: a project's screens, or a certification's certificate. */
const imagesOf = (route: Route) => {
    if (route.kind === "projects" && route.slug) return projectImages(projectById(projectIdBySlug(route.slug)));
    if (route.kind === "detail" && route.collection === "certifications" && route.slug) {
        const item = certificationBySlug(route.slug);
        const image = item && certificateImage(item.id);
        return image ? [image] : [];
    }
    return [];
};

/**
 * `lastmod` gives the day a page last changed what it says (scripts/page-dates.ts); the build date otherwise.
 * `hreflang` alternates live in each page's `<head>`: emitting `<xhtml:link>` here makes Chromium treat the file as
 * XHTML+XML and disable its XML tree viewer, rendering the sitemap as unstyled inline text.
 */
export const buildSitemap = (lastmod: (path: string) => string = () => BUILD_DATE) => {
    const urls = prerenderRoutes.map((route) => {
        const images = imagesOf(route).map((image) => `    <image:image><image:loc>${absoluteUrl(widestVariant(image))}</image:loc></image:image>`);
        return [
            "  <url>",
            `    <loc>${absoluteUrl(route.path)}</loc>`,
            `    <lastmod>${lastmod(route.path)}</lastmod>`,
            "    <changefreq>monthly</changefreq>",
            `    <priority>${priority(route)}</priority>`,
            ...images,
            "  </url>",
        ].join("\n");
    });
    return [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
        ...urls,
        "</urlset>",
        "",
    ].join("\n");
};

export const buildRobots = () => ["User-agent: *", "Allow: /", "", `Sitemap: ${SITE_URL}/sitemap.xml`, ""].join("\n");
