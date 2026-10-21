import {hydrate, render} from "solid-js/web";
import {BrowserRouter} from "@/routes/Router";
import App from "@/App";
import {loadContent} from "@/content";
import {preloadSectionCopies} from "@/content/sections";
import {preloadSections} from "@/components/sections/section-loaders";
import {keepAnchorsInPlace} from "@/lib/anchors";
import {loadWebFonts} from "@/lib/fonts";
import {scheduleAnalytics} from "@/lib/analytics";
import {registerDetailBody} from "@/lib/detail-body";
import {loadDetailPage, loadProjectPage} from "@/lib/page-loaders";
import {DEFAULT_LANG, parseDetailPath, parsePath, parseProjectPath} from "@/lib/paths";
import {registerProjectBody} from "@/lib/project-body";
import "@/styles/globals.css";

declare global {
    // Solid's hydration reads the state its HydrationScript leaves on the page.
    var _$HY: { events: unknown[]; completed: WeakSet<Element>; r: Record<string, unknown>; fe: () => void } | undefined;
}

keepAnchorsInPlace(loadWebFonts());

const {pathname} = window.location;
const project = parseProjectPath(pathname);
const detail = parseDetailPath(pathname);
const home = parsePath(pathname);
const lang = home?.lang ?? project?.lang ?? detail?.lang ?? DEFAULT_LANG;
// The home sections hydrate as their chunks arrive; asking for all of them now keeps the requests in parallel.
if (home) {
    preloadSections(lang);
    preloadSectionCopies(lang);
}
// A project or detail page hydrates with its body and its text loaded, so it renders in place at once
// (see lib/project-body.ts and lib/detail-body.ts).
const [content] = await Promise.all([
    loadContent(lang),
    project && loadProjectPage(lang).then((ProjectBody) => registerProjectBody((slug) => <ProjectBody slug={slug}/>)),
    detail && loadDetailPage(lang, Boolean(detail.slug) && detail.collection !== "certifications")
        .then((DetailBody) => registerDetailBody((collection, slug) => <DetailBody collection={collection} slug={slug}/>)),
]);
const root = document.getElementById("root")!;
const app = () => (
    <BrowserRouter>
        <App content={content}/>
    </BrowserRouter>
);

// The dev server serves index.html with only its <!--app-html--> placeholder in the root, which is not a page to hydrate.
if (root.firstElementChild) {
    // The prerender ships no HydrationScript: the CSP would have to allow its inline code, and a page that works
    // without JavaScript needs none of the events it replays. Hydration starts from the empty state it would leave.
    globalThis._$HY ??= {events: [], completed: new WeakSet(), r: {}, fe() {}};
    hydrate(app, root);
} else render(app, root);

if (import.meta.env.PROD) scheduleAnalytics();
