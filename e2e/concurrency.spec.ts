import {expect, gotoHydrated, hydrateSection, test} from "./fixtures";

test.describe("Concurrency suite (parallel multi-context and multi-tab isolated sessions)", () => {
    test("serves concurrent isolated visitors with different languages, themes and locked roles without state bleed", async ({browser}) => {
        const sessions = [
            {path: "/en/backend?locked=true", lang: "en", theme: "dark", roleHeading: "Backend Developer", locked: true},
            {path: "/es/crm?locked=true", lang: "es", theme: "light", roleHeading: "Ingeniero de CRM", locked: true},
            {path: "/en/data", lang: "en", theme: "light", roleHeading: "Data Analyst", locked: false},
            {path: "/es/devops", lang: "es", theme: "dark", roleHeading: "Ingeniero DevOps", locked: false},
        ] as const;

        const contexts = await Promise.all(sessions.map(() => browser.newContext()));

        try {
            await Promise.all(sessions.map(async (session, index) => {
                const context = contexts[index];
                const page = await context.newPage();
                const errors: string[] = [];
                page.on("pageerror", (err) => errors.push(err.message));

                await page.addInitScript((theme) => {
                    localStorage.setItem("theme", theme);
                }, session.theme);

                await gotoHydrated(page, session.path);

                await expect(page.locator("html")).toHaveAttribute("lang", session.lang);
                await expect(page.locator("html")).toHaveAttribute("data-theme", session.theme);
                await expect(page.getByTestId("hero-role")).toContainText(session.roleHeading);

                // Concurrent interaction: hydrate experience, expand disclosures, and check language link isolation.
                await hydrateSection(page, "experience");
                await page.getByTestId("experience-toggle-all").click();
                await expect(page.getByTestId("experience-toggle-all")).toHaveAttribute("aria-expanded", "true");

                const langSwitcher = page.getByTestId("header-language-switcher");
                if (session.locked) {
                    await expect(langSwitcher).toHaveAttribute("href", /\?locked=true$/);
                } else {
                    await expect(langSwitcher).not.toHaveAttribute("href", /locked=true/);
                }

                expect(errors).toEqual([]);
            }));
        } finally {
            await Promise.all(contexts.map((ctx) => ctx.close()));
        }
    });

    test("handles concurrent multi-tab navigation and assistant queries within the same browser context", async ({context}) => {
        const [homeTab, projectTab, detailTab] = await Promise.all([
            context.newPage(),
            context.newPage(),
            context.newPage(),
        ]);

        await Promise.all([
            gotoHydrated(homeTab, "/en"),
            gotoHydrated(projectTab, "/en/projects/smartpot"),
            gotoHydrated(detailTab, "/es/experience/tivenos"),
        ]);

        await Promise.all([
            // Tab 1: Ask the assistant on the English home page
            (async () => {
                await homeTab.locator("main section").nth(1).scrollIntoViewIfNeeded();
                await homeTab.getByTestId("assistant-launcher").click();
                await expect(homeTab.getByTestId("assistant-dialog")).toBeVisible();
                await homeTab.getByTestId("assistant-suggestion").first().click();
                await expect(homeTab.getByTestId("assistant-message-assistant")).toHaveCount(2);
            })(),
            // Tab 2: Explore technologies on the SmartPot case study page
            (async () => {
                await expect(projectTab.getByTestId("project-title")).toHaveText("SmartPot");
                await projectTab.getByTestId("tech-chip-FastAPI").click();
                await expect(projectTab.getByTestId("tech-explorer-results")).toContainText("FastAPI");
            })(),
            // Tab 3: Filter the timeline on the Spanish TIVENOS experience page
            (async () => {
                await expect(detailTab.getByTestId("detail-title")).toContainText("TIVENOS");
                await detailTab.getByTestId("timeline-filter").and(detailTab.locator("[data-interactive]")).waitFor({state: "attached"});
                await detailTab.getByTestId("timeline-filter-project").click();
                await expect(detailTab.getByTestId("timeline-filter-project")).toHaveAttribute("aria-pressed", "true");
            })(),
        ]);

        await Promise.all([homeTab.close(), projectTab.close(), detailTab.close()]);
    });
});
