// What scripts/postbuild.ts needs from the site's own modules once Astro has generated the pages.
export {prerenderRoutes} from "@/lib/paths";
export {buildRobots, buildSitemap} from "@/lib/sitemap";
export {SITE_URL} from "@/content/shared/site";
export {profile} from "@/content/shared/profile";
