// Checks every external link the site shows: the URLs in the content modules plus the repository links the
// archive builds. Sites behind bot protection answer scripts with 401, 403, 429 or 999; those count as
// unverifiable, not broken, and are worth opening by hand. Exits with 1 when a link is broken.
import {readdirSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {createServer} from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const SITE = new URL(process.env.SITE_URL ?? "https://sebastianlopezo.page").host;
const UNVERIFIABLE = new Set([401, 403, 429, 999]);
const PER_HOST = 2;
const TIMEOUT = 15_000;
const HEADERS = {
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36",
    accept: "text/html,application/xhtml+xml,image/*,*/*;q=0.8",
};

const collect = (value, found, seen = new Set()) => {
    if (typeof value === "string") {
        for (const [url] of value.matchAll(/https?:\/\/[^\s"'<>)]+/g)) found.add(url.split("#")[0]);
        return;
    }
    if (!value || typeof value !== "object" || seen.has(value)) return;
    seen.add(value);
    for (const item of Array.isArray(value) ? value : Object.values(value)) collect(item, found, seen);
};

const loadUrls = async () => {
    const vite = await createServer({
        root,
        logLevel: "error",
        appType: "custom",
        server: {middlewareMode: true, hmr: false}
    });
    try {
        const found = new Set();
        const modules = readdirSync(`${root}src/content`, {recursive: true})
            .map((file) => file.replaceAll("\\", "/"))
            .filter((file) => file.endsWith(".ts") && !file.endsWith(".test.ts"));
        for (const file of modules) collect(await vite.ssrLoadModule(`/src/content/${file}`), found);
        const {archive, archiveUrl} = await vite.ssrLoadModule("/src/content/shared/archive.ts");
        for (const entry of archive) found.add(archiveUrl(entry));
        return [...found].filter((url) => new URL(url).host !== SITE).sort();
    } finally {
        await vite.close();
    }
};

const check = async (url, attempt = 1) => {
    try {
        const response = await fetch(url, {redirect: "follow", headers: HEADERS, signal: AbortSignal.timeout(TIMEOUT)});
        await response.body?.cancel();
        if (response.ok) return {url, status: response.status, verdict: "ok"};
        return {url, status: response.status, verdict: UNVERIFIABLE.has(response.status) ? "unverifiable" : "broken"};
    } catch (error) {
        if (attempt < 2) return check(url, attempt + 1);
        return {
            url,
            status: error.name === "TimeoutError" ? "timeout" : (error.cause?.code ?? error.message),
            verdict: "broken"
        };
    }
};

// A few requests at a time per host, so no site sees a burst from one run.
const checkAll = async (urls) => {
    const byHost = Map.groupBy(urls, (url) => new URL(url).host);
    const results = [];
    await Promise.all([...byHost.values()].map(async (queue) => {
        const workers = Array.from({length: Math.min(PER_HOST, queue.length)}, async () => {
            for (let url = queue.shift(); url; url = queue.shift()) results.push(await check(url));
        });
        await Promise.all(workers);
    }));
    return results.sort((a, b) => a.url.localeCompare(b.url));
};

const urls = await loadUrls();
console.log(`Checking ${urls.length} external links…`);
const results = await checkAll(urls);
for (const verdict of ["broken", "unverifiable"]) {
    const list = results.filter((result) => result.verdict === verdict);
    if (list.length === 0) continue;
    console.log(`\n${verdict === "broken" ? "Broken" : "Unverifiable (open by hand)"}:`);
    for (const {url, status} of list) console.log(`  ${status}  ${url}`);
}
const count = (verdict) => results.filter((result) => result.verdict === verdict).length;
console.log(`\n${results.length} links: ${count("ok")} ok, ${count("unverifiable")} unverifiable, ${count("broken")} broken`);
process.exitCode = count("broken") > 0 ? 1 : 0;
