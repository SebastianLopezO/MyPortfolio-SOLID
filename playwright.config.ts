import {defineConfig, devices} from "@playwright/test";

const PORT = 4173;
const BASE_URL = process.env.BASE_URL;

export default defineConfig({
    testDir: "e2e",
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    reporter: process.env.CI ? [["github"], ["list"], ["html", {open: "never"}]] : "list",
    use: {
        baseURL: BASE_URL ?? `http://127.0.0.1:${PORT}`,
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
    },
    projects: [
        {name: "desktop", use: {...devices["Desktop Chrome"]}},
        {name: "mobile", use: {...devices["Pixel 7"]}},
    ],
    webServer: BASE_URL
        ? undefined
        : {
            command: "node scripts/serve-dist.mjs",
            url: `http://127.0.0.1:${PORT}/health`,
            env: {PORT: String(PORT)},
            reuseExistingServer: !process.env.CI,
        },
});
