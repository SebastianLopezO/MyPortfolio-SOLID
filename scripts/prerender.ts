import {mkdir, readdir, readFile, rm, writeFile} from "node:fs/promises";
import {dirname, extname, join} from "node:path";
import {promisify} from "node:util";
import {brotliCompress, constants, gzipSync} from "node:zlib";
import {fileURLToPath, pathToFileURL} from "node:url";
import {buildLlmsTxt, decodeEntities, type LlmsPage, type LlmsProfile} from "./llms.ts";
import {datePages, fetchPageDates, headMeta, PAGE_DATES, pageText} from "./page-dates.ts";

interface RenderResult {
    html: string;
    head: string;
    lang: string;
    status: number;
}

interface ServerEntry {
    render: (url: string) => RenderResult;
    prerenderRoutes: { path: string; lang: string }[];
    buildSitemap: (lastmod: (path: string) => string) => string;
    buildRobots: () => string;
    SITE_URL: string;
    profile: LlmsProfile;
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const server: ServerEntry = await import(pathToFileURL(join(root, "dist-ssr", "entry-server.js")).href);
const inlineStyles = async (html: string) => {
    const match = html.match(/<link rel="stylesheet" crossorigin href="\/(assets\/[^"]+\.css)">/);
    if (!match) throw new Error("Missing stylesheet link in index.html");
    const css = await readFile(join(dist, match[1]), "utf8");
    return html.replace(match[0], () => `<style>${css}</style>`);
};
const hydrateAfterLoad = (html: string) => {
    const entry = html.match(/<script type="module" crossorigin src="(\/assets\/[^"]+\.js)"><\/script>/);
    if (!entry) throw new Error("Missing entry script in index.html");
    const hydrate = `var d=0;function h(){if(d)return;d=1;var s=document.createElement("script");s.type="module";s.src=e;document.head.appendChild(s)}`;
    const idle = `function g(){window.requestIdleCallback?requestIdleCallback(h,{timeout:1500}):setTimeout(h,1)}`;
    const afterPaint = `if(performance.getEntriesByName("first-contentful-paint").length)g();else{try{new PerformanceObserver(function(l,o){o.disconnect();g()}).observe({type:"paint"})}catch(e){g()}setTimeout(h,3000)}`;
    // The entry's hashed name travels in an attribute, so the script is the same in every build and the
    // Content-Security-Policy allows it by its hash (nginx/security-headers.conf).
    const loader = `(function(e){addEventListener("load",function(){${hydrate}${idle}${afterPaint}},{once:true})})(document.currentScript.dataset.entry)`;
    return html.replace(/\s*<link rel="modulepreload"[^>]*>/g, "").replace(entry[0], () => `<script data-entry="${entry[1]}">${loader}</script>`);
};

const template = hydrateAfterLoad(await inlineStyles(await readFile(join(dist, "index.html"), "utf8")));

const page = ({html, head, lang}: RenderResult) =>
    template
        .replace('<html lang="en">', `<html lang="${lang}">`)
        .replace("<!--app-head-->", head)
        .replace("<!--app-html-->", html);

const check = (path: string, html: string) => {
    const required = [
        /<title data-head="title">[^<]+<\/title>/,
        /<link data-head="canonical" rel="canonical" href="https?:\/\/[^"]+">/,
        /hreflang="x-default"/,
        /<script data-head="jsonld" type="application\/ld\+json">\{/,
        /<div id="root"><[a-z]/,
    ];
    for (const pattern of required) {
        if (!pattern.test(html)) throw new Error(`Prerendered ${path} is missing ${pattern}`);
    }
    if ((html.match(/rel="alternate" hreflang=/g) ?? []).length !== 3) throw new Error(`Prerendered ${path} needs 3 hreflang links`);
};

const texts = new Map<string, string>();
const described: LlmsPage[] = [];
for (const route of server.prerenderRoutes) {
    const result = server.render(route.path);
    const html = page(result);
    check(route.path, html);
    texts.set(route.path, pageText(result.head, result.html));
    const {title, description} = headMeta(result.head);
    described.push({path: route.path, title: decodeEntities(title), description: decodeEntities(description)});
    const file = join(dist, route.path.slice(1), "index.html");
    await mkdir(dirname(file), {recursive: true});
    await writeFile(file, html);
}
const dates = datePages(texts, await fetchPageDates(`${server.SITE_URL}/${PAGE_DATES}`), process.env.BUILD_DATE ?? new Date().toISOString().slice(0, 10));
await writeFile(join(dist, PAGE_DATES), `${JSON.stringify(dates)}\n`);

const notFound = server.render("/404");
const notFoundHead = [
    "<title>404 · Page not found · Página no encontrada</title>",
    '<meta name="description" content="Page not found · Página no encontrada">',
].join("\n    ");
await writeFile(
    join(dist, "404.html"),
    page({
        ...notFound,
        head: notFoundHead
    }).replace('content="index, follow, max-image-preview:large"', 'content="noindex"'),
);

await writeFile(
    join(dist, "index.html"),
    [
        "<!doctype html>",
        '<html lang="en">',
        "<head>",
        '    <meta charset="UTF-8">',
        "    <title>Sebastián López Osorno</title>",
        '    <meta name="robots" content="noindex">',
        `    <link rel="canonical" href="${server.SITE_URL}/en">`,
        '    <meta http-equiv="refresh" content="0; url=/en">',
        '    <script>location.replace((navigator.language || "").toLowerCase().startsWith("es") ? "/es" : "/en")</script>',
        "</head>",
        '<body><a href="/en" hreflang="en">English</a> · <a href="/es" hreflang="es">Español</a></body>',
        "</html>",
        "",
    ].join("\n"),
);
await writeFile(join(dist, "sitemap.xml"), server.buildSitemap((path) => dates[path].date));
await writeFile(join(dist, "robots.txt"), server.buildRobots());
await writeFile(join(dist, "llms.txt"), buildLlmsTxt({
    site: server.SITE_URL,
    pages: described,
    profile: server.profile,
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

console.log(`Prerendered ${server.prerenderRoutes.length} pages and precompressed ${compressed} files`);
