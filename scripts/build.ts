import {build as buildPages} from "astro";
import {build} from "vite";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";
import {refreshGithubStats} from "./github-stats.ts";

process.env.BUILD_DATE ??= new Date().toISOString().slice(0, 10);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// CI and the Docker image build with the latest GitHub figures; a local build keeps the committed snapshot.
if (process.env.CI) await refreshGithubStats();

// Astro generates every page; scripts/postbuild.ts then writes what is built from all of them together.
await buildPages({root, logLevel: "warn"});
// The routes, the sitemap and robots builders and the profile come from the same modules as the pages.
await build({
    root,
    configFile: false,
    logLevel: "warn",
    define: {
        __BUILD_DATE__: JSON.stringify(process.env.BUILD_DATE),
        __SITE_URL__: JSON.stringify(process.env.SITE_URL ?? "https://sebastianlopezo.page"),
    },
    resolve: {alias: {"@": join(root, "src")}},
    build: {ssr: "src/build-data.ts", outDir: "dist-ssr", copyPublicDir: false, emptyOutDir: true},
});
await import("./postbuild.ts");
