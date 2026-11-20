import {createHash} from "node:crypto";
import {existsSync, readdirSync, readFileSync} from "node:fs";
import {join} from "node:path";
import {brotliDecompressSync, gunzipSync, gzipSync} from "node:zlib";
import {describe, expect, it} from "vitest";

const DIST = join(import.meta.dirname, "../../dist");
const SITE = (process.env.SITE_URL ?? "https://sebastianlopezo.page").replace(/\/$/, "");
const ROLES = ["backend", "crm", "data", "devops", "fullstack"];
const PAGES = ["en", "es"].flatMap((lang) => [`/${lang}`, ...ROLES.map((role) => `/${lang}/${role}`)]);
const CASES = ["integration-platform", "smartpot", "gopoli", "martech", "email-signatures"];
const PROJECTS = [
    ...CASES,
    "observability", "crm-widgets", "admissions-forms", "crm-snapshots", "landing-platform", "email-automations", "zoho-toolkit", "real-estate-site",
    "collection-automation", "peppercrm", "portfolio", "taurus", "computer-engineering", "cybersecurity-labs",
    "programming-technician", "technical-high-school",
    "lettuce-diseases", "radar-imaging", "school-services", "fashionline", "tdd-six-languages", "artificial-intelligence", "huffman-compressor", "carspace", "sitepersist", "video-to-ascii", "the-company-dream",
];
const PROJECT_PAGES = ["en", "es"].flatMap((lang) => [`/${lang}/projects`, ...PROJECTS.map((slug) => `/${lang}/projects/${slug}`)]);
// Case studies keep their original image names; the other project pages have their own prefix.
const ogImage = (slug: string, lang: string) => `og/${CASES.includes(slug) ? "case" : "project"}-${slug}-${lang}.jpg`;
const DETAILS: Record<string, string[]> = {
    about: [],
    experience: ["tivenos", "adcom", "muv-u", "quipux"],
    education: ["computer-engineering", "cybersecurity-diploma", "programming-technician", "pascual-bravo", "inem"],
    certifications: [
        "it-specialist-python", "dax-power-bi", "power-bi-analysis", "data-science-ai", "cybersecurity", "problem-solving", "excel-mastery",
        "excel-data-analysis", "search-console-seo", "green-digital-skills", "data-visualization", "web-programming", "iot-protocols", "git-github",
        "software-engineering", "django-two", "practical-javascript", "basic-programming", "python-fundamentals", "hacklab", "java-basic", "css",
        "python-django", "python-basic", "excel-professional", "sql-basic", "programming-fundamentals", "python-eia", "html",
    ],
    skills: [
        "backend-and-apis", "crm-and-automation", "data-and-business-intelligence", "devops-and-observability", "databases",
        "frontend", "cloud-and-hosting", "testing-and-quality", "programming-languages", "security", "machine-learning-and-ai",
        "iot-and-embedded", "networking", "developer-tools", "computer-science-foundations",
    ],
    organizations: [
        "tivenoseducation", "adcom-group", "smartpottech", "gopoli", "peppertechdev", "engineeringsebastian-s", "taurussebastian-s", "testlabdata",
        "technicalsebastians", "vocationalsebastian-s",
    ],
    services: [
        "integrations-and-backend", "zoho-crm", "web-and-landing-pages", "business-intelligence-and-data",
        "process-automation", "infrastructure-and-deployment", "observability-and-reliability", "technical-consulting",
    ],
    reasons: [
        "from-business-to-architecture", "less-manual-work", "connected-data", "from-question-to-production",
        "marketing-finance-and-it", "calm-when-something-breaks", "technology-that-serves-the-business", "learns-fast-and-teaches",
        "careful-with-data", "shares-what-he-knows", "delivers-more-than-asked",
    ],
    metrics: [],
};
// The about page and the metrics are single pages, not lists of pages.
const SINGLE_PAGES = ["about", "metrics"];
const DETAIL_PAGES = ["en", "es"].flatMap((lang) =>
    Object.entries(DETAILS).flatMap(([collection, slugs]) => [`/${lang}/${collection}`, ...slugs.map((slug) => `/${lang}/${collection}/${slug}`)]),
);
// Every job, program, certification and organization has an image of its own; the indexes share one per collection.
const detailImage = (collection: string, slug: string | undefined, lang: string) =>
    slug ? `og/${collection}-${slug}-${lang}.jpg` : `og/${collection}-${lang}.jpg`;
const ALL_PAGES = [...PAGES, ...PROJECT_PAGES, ...DETAIL_PAGES];
const KB = 1024;
// The root lists the islands the page hydrates once it settles; the skip link is static HTML, the first thing in it.
const ROOT_RENDERED = /<div id="root"[^>]*><a (?:data-hk="\w+" )?href="#main"/;
// The home sections render through the Section component, whose root carries the "section" class.
const FIRST_SECTION = /<section\b[^>]*\sclass="section[\s"]/;

const read = (path: string) => readFileSync(join(DIST, path), "utf8");
const page = (path: string) => read(`${path}/index.html`);
const attr = (html: string, pattern: RegExp) => html.match(pattern)?.[1];
const gzipSize = (path: string) => gzipSync(readFileSync(join(DIST, path)), {level: 9}).length;

describe("prerendered pages", () => {
    it.each(PAGES)("%s has a complete head and rendered body", (path) => {
        const html = page(path);
        const lang = path.split("/")[1];
        expect(html).toMatch(new RegExp(`<html lang="${lang}"`));
        expect(attr(html, /<title[^>]*>([^<]+)<\/title>/)).toMatch(/^Sebastián López Osorno · /);
        expect(attr(html, /<meta[^>]+name="description" content="([^"]+)"/)?.length).toBeGreaterThanOrEqual(70);
        expect(attr(html, /<link[^>]+rel="canonical" href="([^"]+)"/)).toBe(`${SITE}${path}`);
        expect(html.match(/rel="alternate" hreflang="(en|es|x-default)"/g)).toHaveLength(3);
        expect(attr(html, /property="og:image" content="([^"]+)"/)).toBe(`${SITE}/og/og-${lang}.jpg`);
        expect(html).toContain('property="og:image:width" content="1200"');
        expect(html).toContain('property="og:image:height" content="630"');
        const jsonLd = JSON.parse(attr(html, /<script[^>]+type="application\/ld\+json">(.+?)<\/script>/) ?? "{}");
        expect(jsonLd["@graph"].map((node: {
            "@type": string
        }) => node["@type"])).toEqual(["WebSite", "ProfilePage", "Person"]);
        expect(html).toMatch(ROOT_RENDERED);
        expect(html).toMatch(/<h1[\s>]/);
        expect(existsSync(join(DIST, `${path}/index.html.gz`))).toBe(true);
        expect(existsSync(join(DIST, `${path}/index.html.br`))).toBe(true);
    });

    it.each(PROJECT_PAGES)("%s has a complete head, an article or list schema and a rendered body", (path) => {
        const html = page(path);
        const [, lang, , slug] = path.split("/");
        expect(html).toMatch(new RegExp(`<html lang="${lang}"`));
        expect(attr(html, /<link[^>]+rel="canonical" href="([^"]+)"/)).toBe(`${SITE}${path}`);
        expect(html.match(/rel="alternate" hreflang="(en|es|x-default)"/g)).toHaveLength(3);
        expect(attr(html, /property="og:image" content="([^"]+)"/)).toBe(slug ? `${SITE}/${ogImage(slug, lang)}` : `${SITE}/og/og-${lang}.jpg`);
        expect(attr(html, /property="og:type" content="([^"]+)"/)).toBe(slug ? "article" : "website");
        const jsonLd = JSON.parse(attr(html, /<script[^>]+type="application\/ld\+json">(.+?)<\/script>/) ?? "{}");
        expect(jsonLd["@graph"].map((node: {
            "@type": string
        }) => node["@type"])).toEqual([slug ? "CreativeWork" : "CollectionPage", "Person", "BreadcrumbList"]);
        expect(html).toMatch(ROOT_RENDERED);
        expect(html).toMatch(/<h1[\s>]/);
        expect(existsSync(join(DIST, `${path}/index.html.gz`))).toBe(true);
        expect(existsSync(join(DIST, `${path}/index.html.br`))).toBe(true);
        if (slug) expect(existsSync(join(DIST, ogImage(slug, lang)))).toBe(true);
    });

    it.each(DETAIL_PAGES)("%s has a complete head, a page or list schema and a rendered body", (path) => {
        const html = page(path);
        const [, lang, collection, slug] = path.split("/");
        expect(html).toMatch(new RegExp(`<html lang="${lang}"`));
        expect(attr(html, /<meta[^>]+name="description" content="([^"]+)"/)?.length).toBeGreaterThanOrEqual(70);
        expect(attr(html, /<link[^>]+rel="canonical" href="([^"]+)"/)).toBe(`${SITE}${path}`);
        expect(html.match(/rel="alternate" hreflang="(en|es|x-default)"/g)).toHaveLength(3);
        expect(attr(html, /property="og:image" content="([^"]+)"/)).toBe(`${SITE}/${detailImage(collection, slug, lang)}`);
        expect(attr(html, /property="og:type" content="([^"]+)"/)).toBe(slug ? "article" : "website");
        const jsonLd = JSON.parse(attr(html, /<script[^>]+type="application\/ld\+json">(.+?)<\/script>/) ?? "{}");
        expect(jsonLd["@graph"].map((node: {
            "@type": string
        }) => node["@type"])).toEqual([slug || SINGLE_PAGES.includes(collection) ? "WebPage" : "CollectionPage", "Person", "BreadcrumbList"]);
        expect(html).toMatch(ROOT_RENDERED);
        expect(html).toMatch(/<h1[\s>]/);
        expect(html).toMatch(/<nav (?:data-hk="\w+" )?aria-label="(Breadcrumb|Ruta de navegación)"/);
        expect(existsSync(join(DIST, `${path}/index.html.gz`))).toBe(true);
        expect(existsSync(join(DIST, `${path}/index.html.br`))).toBe(true);
        expect(existsSync(join(DIST, detailImage(collection, slug, lang)))).toBe(true);
    });

    it("gives every page a unique title", () => {
        const titles = ALL_PAGES.map((path) => attr(page(path), /<title[^>]*>([^<]+)<\/title>/));
        expect(new Set(titles).size).toBe(ALL_PAGES.length);
    });

    it("does not preload fonts and inlines the stylesheet", () => {
        for (const path of PAGES) {
            const html = page(path);
            expect(html).not.toMatch(/rel="preload" as="font"/);
            expect(html).not.toMatch(/rel="stylesheet"/);
            expect(html).toMatch(/<style>/);
        }
    });

    it("hydrates islands once the page has loaded and painted, so scripts never compete with the first paint", () => {
        for (const path of ALL_PAGES) {
            const html = page(path);
            // No script blocks parsing: islands load their code through dynamic imports.
            expect(html, path).not.toMatch(/<script\b(?![^>]*\btype="application\/ld\+json")[^>]*\ssrc=/);
            expect(html, path).not.toMatch(/rel="modulepreload"/);
            const islands = [...html.matchAll(/<astro-island\b[^>]*>/g)].map((match) => match[0]);
            expect(islands.length, path).toBeGreaterThan(0);
            for (const island of islands) expect(island, path).toMatch(/\sclient="settled"/);
            // On a home page the sections also wait until they come near the screen.
            const near = islands.filter((island) => island.includes("rootMargin")).length;
            if (PAGES.includes(path)) expect(near, path).toBeGreaterThan(0);
            else expect(near, path).toBe(0);
        }
    });

    it("waits for the first screen before the first paint and prefetches the page a link is about to open", () => {
        for (const path of ALL_PAGES) {
            const html = page(path);
            // The hero closes the first screen of a home page; the breadcrumb opens every other page.
            const firstScreen = PAGES.includes(path) ? "home" : "trail";
            expect(html, path).toContain(`<link rel="expect" href="#${firstScreen}" blocking="render">`);
            expect(html.split(` id="${firstScreen}"`).length - 1, path).toBe(1);
            const rules = JSON.parse(attr(html, /<script type="speculationrules">(.+?)<[/]script>/) ?? "{}");
            expect(rules.prefetch, path).toHaveLength(1);
            expect(rules.prefetch[0].eagerness, path).toBe("moderate");
            // A click may add the role view or the lock; the prefetched page serves that visit too.
            expect(rules.prefetch[0].expects_no_vary_search, path).toBe('params=("from" "locked")');
            expect(rules.prerender, path).toBeUndefined();
        }
    });

    it("links every page by its one address, without the role view a visitor follows it from", () => {
        // ?from= is added on the click (lib/role-links.ts); written in the links, it made search engines crawl a copy of
        // each project and detail page per role view, all pointing their canonical back at the plain address.
        for (const path of ALL_PAGES) expect(page(path), path).not.toMatch(/href="[^"]*[?&]from=/);
    });

    it("keeps the startup JavaScript, CSS and HTML within budget", () => {
        const html = page("/en");
        const assets = readdirSync(join(DIST, "assets")).map((file) => `assets/${file}`);
        const scripts = new Set<string>();
        const visit = (file: string) => {
            if (scripts.has(file)) return;
            scripts.add(file);
            for (const match of read(file).matchAll(/(?:from|import)\s*["']\.\/([^"']+\.js)["']/g)) visit(`assets/${match[1]}`);
        };
        // What the islands that hydrate once the page settles need: the renderer, the island root and the parts of the
        // first screen.
        for (const [, url] of html.matchAll(/(?:component|renderer)-url="\/(assets\/[^"]+\.js)"/g)) visit(url);
        const part = (marker: string) => assets.find((file) => file.endsWith(".js") && read(file).includes(marker));
        for (const marker of ["hero-backdrop", "site-menu", "aria-haspopup", "en_US"]) {
            const file = part(marker);
            expect(file, marker).toBeDefined();
            visit(file!);
        }
        const javascript = [...scripts].reduce((sum, script) => sum + gzipSize(script), 0);
        expect(javascript).toBeLessThanOrEqual(110 * KB);
        // The sections arrive as they come near the screen, one chunk each; none may grow into a second startup bundle.
        const lazy = assets.filter((file) => file.endsWith(".js") && !scripts.has(file));
        for (const file of lazy) expect(gzipSize(file), file).toBeLessThanOrEqual(32 * KB);
        // The CSS is inlined into every page, so the first-paint budget below is what binds it; this one catches a jump.
        // The <noscript> block in the head carries a few rules of its own, which are not the stylesheet.
        const styles = [...html.replace(/<noscript>[\s\S]*?<\/noscript>/g, "").matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)]
            .map((match) => match[1]).join("\n");
        expect(styles.length).toBeGreaterThan(20 * KB);
        // 17 KB since the redesign: every color answers in two themes (light-dark(), which Tailwind also writes as lab()
        // and hex for browsers without OKLCH), and the folding header, the tiles, the skill grid and the reasons joined.
        // 17.25 KB since the skill grid became the turning gallery of skills (about 240 bytes of its own).
        expect(gzipSync(styles, {level: 9}).length).toBeLessThanOrEqual(17.25 * KB);
        // Each page carries its inlined CSS. What the first paint needs (the head, the styles, the hero and its figures,
        // everything before the first lazy section) must arrive within the first two TCP round trips (14 KB + 28 KB), so
        // the sections below never delay it; the whole page stays within three (+ 56 KB). 26 KB since the two themes.
        for (const path of PAGES) {
            const html = read(`${path}/index.html`);
            const firstSection = html.search(FIRST_SECTION);
            expect(firstSection, path).toBeGreaterThan(0);
            expect(gzipSync(html.slice(0, firstSection), {level: 9}).length, path).toBeLessThanOrEqual(26 * KB);
        }
        for (const path of ALL_PAGES) expect(gzipSize(`${path}/index.html`), path).toBeLessThanOrEqual(96 * KB);
    });
});

describe("precompressed files", () => {
    it("writes a Brotli and a gzip copy of every text file that decode to the file", () => {
        const copies = readdirSync(DIST, {recursive: true, encoding: "utf8"}).filter((file) => file.endsWith(".gz"));
        expect(copies.length).toBeGreaterThan(200);
        for (const copy of copies) {
            const file = copy.slice(0, -".gz".length);
            const original = readFileSync(join(DIST, file));
            expect(gunzipSync(readFileSync(join(DIST, copy))).equals(original), copy).toBe(true);
            expect(brotliDecompressSync(readFileSync(join(DIST, `${file}.br`))).equals(original), `${file}.br`).toBe(true);
        }
    });
});

describe("content security policy", () => {
    const policy = readFileSync(join(import.meta.dirname, "../../nginx/security-headers.conf"), "utf8")
        .match(/Content-Security-Policy "([^"]+)"/)?.[1] ?? "";
    const scriptSrc = policy.split(";").map((directive) => directive.trim()).find((directive) => directive.startsWith("script-src ")) ?? "";

    it("runs no inline script the policy does not name by its hash", () => {
        expect(scriptSrc).toMatch(/^script-src 'self' /);
        expect(scriptSrc).not.toMatch(/'unsafe-inline'|'unsafe-eval'/);
        for (const file of ["index.html", "404.html", ...ALL_PAGES.map((path) => `${path}/index.html`)]) {
            for (const [, attributes, code] of read(file).matchAll(/<script(?![^>]*\ssrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
                if (attributes.includes("application/ld+json")) continue;
                const hash = `'sha256-${createHash("sha256").update(code).digest("base64")}'`;
                expect(scriptSrc, `${file} has an inline script the policy blocks; allow ${hash} in nginx/security-headers.conf`).toContain(hash);
            }
        }
    });
});

describe("crawler files", () => {
    it("lists every page in the sitemap without XHTML elements", () => {
        const sitemap = read("sitemap.xml");
        const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
        expect(locations.sort()).toEqual(ALL_PAGES.map((path) => `${SITE}${path}`).sort());
        expect(sitemap).not.toContain("http://www.w3.org/1999/xhtml");
    });

    it("dates each page in the sitemap by the day its text last changed", () => {
        const dates: Record<string, { hash: string; date: string }> = JSON.parse(read("page-dates.json"));
        expect(Object.keys(dates).sort()).toEqual([...ALL_PAGES].sort());
        const sitemap = read("sitemap.xml");
        for (const entry of sitemap.split("<url>").slice(1)) {
            const path = attr(entry, /<loc>([^<]+)<\/loc>/)!.slice(SITE.length);
            expect(attr(entry, /<lastmod>([^<]+)<\/lastmod>/), path).toBe(dates[path].date);
        }
    });

    it("maps every English page, the resumes and the contact in llms.txt", () => {
        const llms = read("llms.txt");
        expect(llms.startsWith("# Sebastián López Osorno\n\n> ")).toBe(true);
        const links = [...llms.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((match) => match[1]).filter((href) => href.startsWith(SITE));
        const paths = links.map((href) => href.slice(SITE.length));
        expect(paths.filter((path) => !path.startsWith("/cv/")).sort()).toEqual(ALL_PAGES.filter((path) => path.startsWith("/en")).sort());
        for (const path of paths.filter((path) => path.startsWith("/cv/"))) expect(existsSync(join(DIST, path)), path).toBe(true);
        expect(llms).not.toMatch(/&amp;|&#x27;|&quot;/);
    });

    it("points robots.txt to the sitemap", () => {
        expect(read("robots.txt")).toContain(`Sitemap: ${SITE}/sitemap.xml`);
    });

    it("serves a bilingual 404 page that is not indexed", () => {
        const html = read("404.html");
        // Any attribute order: the layout writes the tag (layouts/Page.astro).
        expect(html).toMatch(/<meta(?=[^>]*\sname="robots")(?=[^>]*\scontent="noindex")[^>]*>/);
        expect(html).not.toMatch(/content="index, follow/);
        expect(html).toMatch(/Page not found/);
        expect(html).toMatch(/Página no encontrada/);
    });

    it("ships the resume PDFs and Open Graph images", () => {
        for (const lang of ["EN", "ES"]) {
            expect(existsSync(join(DIST, `cv/Sebastian-Lopez-Osorno-ATS-${lang}.pdf`))).toBe(true);
            expect(existsSync(join(DIST, `cv/Sebastian-Lopez-Osorno-ATS-Long-${lang}.pdf`))).toBe(true);
            expect(existsSync(join(DIST, `og/og-${lang.toLowerCase()}.jpg`))).toBe(true);
        }
    });
});

describe("decisions", () => {
    it("prerenders every side of every decision, with nothing hidden behind a tab", () => {
        const html = page("/en/projects/portfolio");
        const section = html.match(/<section[^>]* aria-labelledby="project-decisions"[\s\S]*?<\/section>/)?.[0] ?? "";
        expect(section).toContain("An app built in the browser arrives empty until its JavaScript runs.");
        expect(section).toContain("Astro generates every page at build time");
        expect(section).toContain("every content change needs a new build and deployment.");
        expect(section).not.toMatch(/role="tab|class="(?:[^"]*\s)?hidden[\s"]/);
        // The solution sits on the project's own color, the layer behind its illustration.
        expect(section).toMatch(/class="decision-solution[^"]*"[^>]*style="background:\s*var\(--color-tile-lilac\)/);
    });
});

describe("search snippets", () => {
    const decode = (text: string) => text.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'").replaceAll("&#39;", "'");

    it.each(ALL_PAGES)("%s has a title and a description that fit a search result", (path) => {
        const html = page(path);
        expect(decode(attr(html, /<title[^>]*>([^<]+)<\/title>/) ?? "").length).toBeLessThanOrEqual(70);
        expect(decode(attr(html, /<meta[^>]+name="description" content="([^"]+)"/) ?? "").length).toBeLessThanOrEqual(170);
    });

    it("lists each project's screens in the image sitemap", () => {
        const sitemap = read("sitemap.xml");
        const images = [...sitemap.matchAll(/<image:loc>https:\/\/sebastianlopezo\.page(\/[^<]+)<\/image:loc>/g)].map((match) => match[1]);
        expect(images.length).toBeGreaterThan(80);
        for (const image of new Set(images)) expect(existsSync(join(DIST, image)), image).toBe(true);
    });
});
