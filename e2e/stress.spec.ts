import {expect, gotoHydrated, hydrateSection, test} from "./fixtures";

test.describe("Stress suite (high-frequency interactions, rapid state transitions and boundary inputs)", () => {
    test("survives rapid consecutive theme toggles, menu toggles and tab switches without inconsistent state", async ({page, consoleErrors}) => {
        await gotoHydrated(page, "/en");

        const html = page.locator("html");
        const themeToggle = page.getByTestId("theme-toggle");
        const menuToggle = page.getByTestId("header-menu-toggle");

        // Rapidly toggle theme 12 times (even number -> returns to initial theme).
        const startTheme = (await html.getAttribute("data-theme")) ?? "dark";
        for (let i = 0; i < 12; i++) {
            await themeToggle.click();
        }
        await expect(html).toHaveAttribute("data-theme", startTheme);
        expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe(startTheme);

        // Rapidly open and close the floating site menu 10 times.
        for (let i = 0; i < 10; i++) {
            await menuToggle.click();
        }
        await expect(menuToggle).toHaveAttribute("aria-expanded", "false");
        await expect(page.getByTestId("site-menu")).toHaveCount(0);

        // Rapidly cycle through all project category tabs multiple times.
        await hydrateSection(page, "projects");
        const categories = ["product", "work", "education"] as const;
        for (let round = 0; round < 4; round++) {
            for (const category of categories) {
                await page.getByTestId(`projects-tab-${category}`).click();
            }
        }
        await expect(page.getByTestId("projects-tab-education")).toHaveAttribute("aria-selected", "true");
        await expect(page.getByTestId("projects-panel-education")).toBeVisible();
        await expect(page.locator('#projects [role="tab"][aria-selected="true"]')).toHaveCount(1);

        expect(consoleErrors).toEqual([]);
    });

    test("survives rapid 3D skills ring rotation and journey tab/filter switching", async ({page, consoleErrors}) => {
        await gotoHydrated(page, "/en");

        // Rapidly rotate skills gallery 20 steps forward and 5 steps backward.
        await hydrateSection(page, "skills");
        await page.getByTestId("skills-pause-toggle").click();
        const nextBtn = page.getByTestId("skills-next");
        const prevBtn = page.getByTestId("skills-previous");
        for (let i = 0; i < 20; i++) await nextBtn.click();
        for (let i = 0; i < 5; i++) await prevBtn.click();

        // Exactly one skill card must remain active after a full 15-card wraparound (+20 - 5 = +15).
        await expect(page.locator("#skills .skill-card[data-active='true']")).toHaveCount(1);

        // Rapidly switch journey tabs and line emphasis filters.
        await hydrateSection(page, "journey");
        const journeyTabs = ["map", "evolution", "focus", "horizon"] as const;
        for (let round = 0; round < 3; round++) {
            for (const tab of journeyTabs) {
                await page.getByTestId(`journey-tab-${tab}`).click();
            }
        }
        await page.getByTestId("journey-tab-map").click();
        const lines = ["education", "web", "backend", "crm", "data", "devops", "security"] as const;
        for (const line of lines) {
            await page.getByTestId(`journey-line-${line}`).click();
        }
        await page.getByTestId("journey-line-all").click();
        await expect(page.getByTestId("journey-line-all")).toHaveAttribute("aria-pressed", "true");

        expect(consoleErrors).toEqual([]);
    });

    test("handles burst queries and max-length boundary inputs in the profile assistant", async ({page, consoleErrors}) => {
        await gotoHydrated(page, "/en");
        await page.locator("main section").nth(1).scrollIntoViewIfNeeded();

        await page.getByTestId("assistant-launcher").click();
        const dialog = page.getByTestId("assistant-dialog");
        await expect(dialog).toBeVisible();

        const input = page.getByTestId("assistant-input");
        const send = page.getByTestId("assistant-send");

        // Whitespace-only input keeps the send button disabled.
        await input.fill("     ");
        await expect(send).toBeDisabled();

        // Over-length string (> 200 chars) is constrained by maxlength=200 on the input element.
        const longQuestion = `${"What backend and integration projects has Sebastián built with FastAPI and Python? ".repeat(4)}`;
        expect(longQuestion.length).toBeGreaterThan(200);
        await input.fill(longQuestion);
        const currentVal = await input.inputValue();
        expect(currentVal.length).toBeLessThanOrEqual(200);
        await send.click();

        // Burst of 6 rapid suggestion clicks in sequence.
        for (let i = 0; i < 6; i++) {
            const firstChip = page.getByTestId("assistant-suggestion").first();
            await firstChip.click();
        }

        // Initial welcome + 7 user questions + 7 assistant answers = 15 messages in the log.
        await expect(page.getByTestId("assistant-message-user")).toHaveCount(7);
        await expect(page.getByTestId("assistant-message-assistant")).toHaveCount(8);

        expect(consoleErrors).toEqual([]);
    });
});
