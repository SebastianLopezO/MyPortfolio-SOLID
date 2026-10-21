import {readdir, readFile, rm, writeFile} from "node:fs/promises";
import {dirname, extname, join} from "node:path";
import {promisify} from "node:util";
import {brotliCompress, constants, gzipSync} from "node:zlib";
import {fileURLToPath, pathToFileURL} from "node:url";
import {buildLlmsTxt, decodeEntities, type LlmsPage, type LlmsProfile} from "./llms.ts";
import {datePages, fetchPageDates, headMeta, PAGE_DATES, pageText} from "./page-dates.ts";

interface BuildData {
    prerenderRoutes: { path: string; lang: string }[];
    buildSitemap: (lastmod: (path: string) => string) => string;
    buildRobots: () => string;
    SITE_URL: string;
    profile: LlmsProfile;
}

// Astro has written every page (src/pages); what is built from all of them together comes here: the dates the sitemap
// gives each page, the sitemap, robots.txt and llms.txt, the root's language redirect and the precompressed copies.
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const data: BuildData = await import(pathToFileURL(join(root, "dist-ssr", "build-data.js")).href);

/** The head and what the root renders: the text a page carries, as the dates and llms.txt read it. */
const parts = (html: string) => {
    const head = html.slice(html.indexOf("<head>"), html.indexOf("</head>"));
    const body = html.slice(html.indexOf('<div id="root"'), html.lastIndexOf("</body>"));
    return {head, body};
};

const check = (path: string, html: string) => {
    const required = [
        /<title data-head="title">[^<]+<\/title>/,
        /<link data-head="canonical" rel="canonical" href="https?:\/\/[^"]+">/,
        /hreflang="x-default"/,
        /<script data-head="jsonld" type="application\/ld\+json">\{/,
        /<div id="root"[^>]*><[a-z]/,
    ];
    for (const pattern of required) {
        if (!pattern.test(html)) throw new Error(`Generated ${path} is missing ${pattern}`);
    }
    if ((html.match(/rel="alternate" hreflang=/g) ?? []).length !== 3) throw new Error(`Generated ${path} needs 3 hreflang links`);
};

const texts = new Map<string, string>();
const described: LlmsPage[] = [];
for (const route of data.prerenderRoutes) {
    const html = await readFile(join(dist, route.path.slice(1), "index.html"), "utf8");
    check(route.path, html);
    const {head, body} = parts(html);
    texts.set(route.path, pageText(head, body));
    const {title, description} = headMeta(head);
    described.push({path: route.path, title: decodeEntities(title), description: decodeEntities(description)});
}
const dates = datePages(texts, await fetchPageDates(`${data.SITE_URL}/${PAGE_DATES}`), process.env.BUILD_DATE ?? new Date().toISOString().slice(0, 10));
await writeFile(join(dist, PAGE_DATES), `${JSON.stringify(dates)}\n`);

await writeFile(
    join(dist, "index.html"),
    [
        "<!doctype html>",
        '<html lang="en">',
        "<head>",
        '    <meta charset="UTF-8">',
        "    <title>Sebastián López Osorno</title>",
        '    <meta name="robots" content="noindex">',
        `    <link rel="canonical" href="${data.SITE_URL}/en">`,
        '    <meta http-equiv="refresh" content="0; url=/en">',
        '    <script>location.replace((navigator.language || "").toLowerCase().startsWith("es") ? "/es" : "/en")</script>',
        "</head>",
        '<body><a href="/en" hreflang="en">English</a> · <a href="/es" hreflang="es">Español</a></body>',
        "</html>",
        "",
    ].join("\n"),
);
await writeFile(join(dist, "sitemap.xml"), data.buildSitemap((path) => dates[path].date));
await writeFile(join(dist, "robots.txt"), data.buildRobots());
await writeFile(join(dist, "llms.txt"), buildLlmsTxt({
    site: data.SITE_URL,
    pages: described,
    profile: data.profile,
    resumes: await readdir(join(dist, "cv")),
}));
await rm(join(root, "dist-ssr"), {recursive: true, force: true});

// Every text file gets a .gz for nginx's gzip_static and a .br for brotli_static (Dockerfile), at the highest level of
// each: the work happens once per build, and Brotli is about a quarter smaller than gzip on the pages. The Brotli
// compressions run in parallel on libuv's thread pool.
const COMPRESSIBLE = new Set([".html", ".js", ".css", ".svg", ".xml", ".txt", ".json", ".webmanifest"]);
const brotli = promisify(brotliCompress);
const compress = async (file: string) => {
    const data = await readFile(file);
    if (data.length < 1024) return false;
    const gzip = gzipSync(data, {level: 9});
    if (gzip.length >= data.length) return false;
    const br = await brotli(data, {
        params: {
            [constants.BROTLI_PARAM_QUALITY]: constants.BROTLI_MAX_QUALITY,
            [constants.BROTLI_PARAM_SIZE_HINT]: data.length
        },
    });
    await writeFile(`${file}.gz`, gzip);
    if (br.length < gzip.length) await writeFile(`${file}.br`, br);
    return true;
};
const textFiles = (await readdir(dist, {recursive: true, withFileTypes: true}))
    .filter((entry) => entry.isFile() && COMPRESSIBLE.has(extname(entry.name)))
    .map((entry) => join(entry.parentPath, entry.name));
const compressed = (await Promise.all(textFiles.map(compress))).filter(Boolean).length;

console.log(`Dated ${data.prerenderRoutes.length} pages and precompressed ${compressed} files`);
