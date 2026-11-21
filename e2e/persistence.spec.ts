import type {Page} from "@playwright/test";
import {expect, gotoHydrated, hydrateSection, test} from "./fixtures";

/** Switches language via the header controls when visible, or opens the folded menu on phones where controls fold. */
const switchLanguage = async (page: Page) => {
    const headerSwitcher = page.getByTestId("header-language-switcher");
    if (await headerSwitcher.isVisible()) {
        await headerSwitcher.click();
    } else {
        await page.getByTestId("header-menu-toggle").click();
        await page.getByTestId("site-menu-language-switcher").click();
    }
    await page.locator('html[data-hydrated="true"]').waitFor({state: "attached"});
};

test.describe("Persistence suite (state, theme, role lock, history and hash anchors)", () => {
    test("persists the selected theme across page reloads, route transitions and language switches", async ({page, consoleErrors}) => {
        await gotoHydrated(page, "/en");
        const html = page.locator("html");
        const toggle = page.getByTestId("theme-toggle");

        const initialLabel = await toggle.getAttribute("aria-label");
        const targetTheme = initialLabel?.includes("dark") ? "dark" : "light";
        await toggle.click();

        await expect(html).toHaveAttribute("data-theme", targetTheme);
        expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe(targetTheme);

        // Reload the current page and verify theme is applied before paint and retained.
        await page.reload();
        await page.locator('html[data-hydrated="true"]').waitFor({state: "attached"});
        await expect(html).toHaveAttribute("data-theme", targetTheme);

        // Navigate to a project page and switch language; theme must remain pinned.
        await page.getByTestId("hero-device-observability").click();
        await expect(page).toHaveURL(/\/en\/projects\/observability$/);
        await page.locator('html[data-hydrated="true"]').waitFor({state: "attached"});
        await expect(html).toHaveAttribute("data-theme", targetTheme);

        await switchLanguage(page);
        await expect(page).toHaveURL(/\/es\/projects\/observability$/);
        await expect(html).toHaveAttribute("data-theme", targetTheme);
        expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe(targetTheme);

        expect(consoleErrors).toEqual([]);
    });

    test("persists locked role view and ?from= role context across multi-hop journeys without polluting localStorage", async ({page, consoleErrors}) => {
        await gotoHydrated(page, "/es/devops?locked=true");
        expect(await page.evaluate(() => window.localStorage.length)).toBe(0);

        // Hop 1: Home (devops, locked) -> Experience detail page
        await hydrateSection(page, "experience");
        await page.getByTestId("experience-detail-link-tivenos").click();
        await expect(page).toHaveURL(/\/es\/experience\/tivenos\?from=devops&locked=true$/);
        await page.locator('html[data-hydrated="true"]').waitFor({state: "attached"});

        // Hop 2: Experience detail -> Neighbor job page via Next
        await page.getByTestId("neighbor-next").click();
        await expect(page).toHaveURL(/\/es\/experience\/adcom\?from=devops&locked=true$/);
        await page.locator('html[data-hydrated="true"]').waitFor({state: "attached"});

        // Hop 3: Switch language on detail page -> preserves role context and locked=true
        await switchLanguage(page);
        await expect(page).toHaveURL(/\/en\/experience\/adcom\?(?:from=devops&)?locked=true$/);

        // Hop 4: Return to home via header brand -> lands on /en/devops with locked=true preserved
        await page.getByTestId("header-brand").click();
        await expect(page).toHaveURL(/\/en(?:\/devops)?\?locked=true$/);
        expect(await page.evaluate(() => window.localStorage.length)).toBe(0);

        expect(consoleErrors).toEqual([]);
    });

    test("persists URL hash fragment across language switching and browser back/forward history", async ({page, consoleErrors}) => {
        await gotoHydrated(page, "/en");
        await page.getByTestId("hero-contact-cta").click();
        await expect(page).toHaveURL(/\/en#contact$/);

        // Switching language while at #contact keeps the #contact fragment on the Spanish page.
        await switchLanguage(page);
        await expect(page).toHaveURL(/\/es#contact$/);

        // Navigate to metrics page, then go back in browser history.
        await hydrateSection(page, "metrics");
        await page.getByTestId("metrics-all-link").click();
        await expect(page).toHaveURL(/\/es\/metrics$/);

        await page.goBack();
        await expect(page).toHaveURL(/\/es#contact$/);

        await page.goForward();
        await expect(page).toHaveURL(/\/es\/metrics$/);

        expect(consoleErrors).toEqual([]);
    });
});
