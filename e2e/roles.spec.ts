import {expect, gotoHydrated, test} from "./fixtures";

test("opens each role view by its address alone, with no switcher on the page", async ({page, consoleErrors}) => {
    await gotoHydrated(page, "/en/backend");
    await expect(page).toHaveTitle(/Backend Developer/);
    await expect(page.getByRole("heading", {level: 1})).toContainText("Backend Developer");
    await expect(page.getByRole("navigation", {name: "View profile as"})).toHaveCount(0);
    await gotoHydrated(page, "/en");
    await expect(page.getByRole("heading", {level: 1})).toContainText("Backend & Integration Developer");
    expect(consoleErrors).toEqual([]);
});

test("keeps the role view of a locked link in the page's links", async ({page}) => {
    await gotoHydrated(page, "/es/data?locked=true");
    await expect(page.getByRole("heading", {level: 1})).toContainText("Analista de Datos");
    await expect(page.locator('a[hreflang="en"]').first()).toHaveAttribute("href", "/en/data?locked=true");
    await expect(page.getByRole("link", {name: /Inicio/})).toHaveAttribute("href", "/es/data?locked=true");
    expect(await page.evaluate(() => window.localStorage.length)).toBe(0);
});
