import {defineConfig} from "vitest/config";
import solid from "vite-plugin-solid";
import {resolve} from "node:path";

export default defineConfig({
    plugins: [solid({ssr: true})],
    define: {
        __BUILD_DATE__: JSON.stringify("2026-10-03"),
        __SITE_URL__: JSON.stringify("https://sebastianlopezo.page"),
    },
    test: {
        environment: "jsdom",
        globals: true,
        setupFiles: ["./src/test/setup.ts"],
        include: ["src/**/*.{test,spec}.{ts,tsx}", "scripts/**/*.test.ts"],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: ['node_modules/', 'src/test/setup.ts'],
        },
    },
    resolve: {
        alias: {
            "@": resolve(import.meta.dirname, "./src"),
        },
    },
});
