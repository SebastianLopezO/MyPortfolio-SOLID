import {defineConfig} from "vitest/config";
import solid from "vite-plugin-solid";
import {resolve} from "node:path";

const SERVER_TESTS = "src/**/*.server.test.{ts,tsx}";

export default defineConfig({
    define: {
        __BUILD_DATE__: JSON.stringify("2026-10-03"),
        __SITE_URL__: JSON.stringify("https://sebastianlopezo.page"),
    },
    test: {
        globals: true,
        setupFiles: ["./src/test/setup.ts"],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules/', 'src/test/setup.ts'],
        },
        // Solid ships a browser build and a server build: components render in jsdom with the first, and the
        // *.server.test files render to strings in Node with the second, as the prerender does. Tests render once,
        // so neither needs hot reload.
        projects: [
            {
                extends: true,
                plugins: [solid({hot: false})],
                test: {
                    name: "browser",
                    environment: "jsdom",
                    include: ["src/**/*.{test,spec}.{ts,tsx}", "scripts/**/*.test.ts"],
                    exclude: [SERVER_TESTS],
                },
            },
            {
                extends: true,
                plugins: [solid({ssr: true, hot: false})],
                test: {
                    name: "server",
                    environment: "node",
                    include: [SERVER_TESTS],
                },
            },
        ],
    },
    resolve: {
        alias: {
            "@": resolve(import.meta.dirname, "./src"),
        },
    },
});
