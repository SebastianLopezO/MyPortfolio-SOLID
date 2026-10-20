import {defineConfig} from "vite";
import solid from "vite-plugin-solid";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

const buildDate = process.env.BUILD_DATE ?? new Date().toISOString().slice(0, 10);
const siteUrl = process.env.SITE_URL ?? "https://sebastianlopezo.page";

export default defineConfig({
    cacheDir: ".vite",
    define: {
        __BUILD_DATE__: JSON.stringify(buildDate),
        __SITE_URL__: JSON.stringify(siteUrl),
    },
    server: {
        host: "::",
        port: 8080,
        hmr: {
            overlay: false,
        },
    },
    css: {
        transformer: "lightningcss",
    },
    plugins: [
        tailwindcss(),
        // The pages are prerendered (scripts/prerender.ts) and hydrated, so the client build emits hydratable code and
        // the server build the string renderer.
        solid({ssr: true}),
    ],
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "./src"),
        },
    },
    build: {
        target: "es2022",
        sourcemap: false,
        cssMinify: "lightningcss",
    },
});
