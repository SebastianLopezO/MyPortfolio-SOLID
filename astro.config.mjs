import {defineConfig} from "astro/config";
import solid from "@astrojs/solid-js";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

const buildDate = process.env.BUILD_DATE ?? new Date().toISOString().slice(0, 10);
const siteUrl = process.env.SITE_URL ?? "https://sebastianlopezo.page";

// Astro's Solid integration, with its browser renderer wrapped by one that loads an island's part before hydrating it
// (src/islands/client.ts).
const solidIslands = () => {
    const integration = solid();
    const setup = integration.hooks["astro:config:setup"];
    integration.hooks["astro:config:setup"] = (options) => setup({
        ...options,
        addRenderer: (renderer) => options.addRenderer({...renderer, clientEntrypoint: new URL("./src/islands/client.ts", import.meta.url)}),
    });
    return integration;
};

// Every page is generated at build time. The interactive parts are Solid islands that hydrate on their own, and the
// rest of each page is plain HTML that ships no JavaScript (src/islands).
export default defineConfig({
    site: siteUrl,
    output: "static",
    trailingSlash: "never",
    integrations: [solidIslands()],
    build: {
        format: "directory",
        // nginx serves /assets/ as immutable (nginx/default.conf), and the end-to-end tests block it to check the
        // pages without JavaScript.
        assets: "assets",
        // The stylesheet is small and every page needs it before the first paint, so it travels inside each page.
        inlineStylesheets: "always",
    },
    server: {host: true, port: 8080},
    devToolbar: {enabled: false},
    vite: {
        cacheDir: ".vite",
        define: {
            __BUILD_DATE__: JSON.stringify(buildDate),
            __SITE_URL__: JSON.stringify(siteUrl),
        },
        css: {transformer: "lightningcss"},
        plugins: [tailwindcss()],
        resolve: {alias: {"@": path.resolve(import.meta.dirname, "./src")}},
        build: {target: "es2022", cssMinify: "lightningcss"},
    },
});
