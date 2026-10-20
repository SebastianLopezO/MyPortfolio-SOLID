import {expect, gotoHydrated, test} from "./fixtures";

test("switches role views without reloading and supports back navigation", async ({page, consoleErrors}) => {
    await gotoHydrated(page, "/en");
    const switcher = page.getByRole("navigation", {name: "View profile as"});
    await switcher.getByRole("link", {name: "Backend"}).click();
    await expect(page).toHaveURL(/\/en\/backend$/);
    await expect(page).toHaveTitle(/Backend Developer/);
    await expect(page.getByRole("heading", {level: 1})).toContainText("Backend Developer");
    await page.goBack();
    await expect(page).toHaveURL(/\/en$/);
    await expect(page.getByRole("heading", {level: 1})).toContainText("Backend & Integration Developer");
    expect(consoleErrors).toEqual([]);
});

test("locks the role view when requested by the link", async ({page}) => {
    await gotoHydrated(page, "/es/data?locked=true");
    await expect(page.getByRole("heading", {level: 1})).toContainText("Analista de Datos");
    await expect(page.locator("[data-role-switcher]")).toHaveCount(0);
    await expect(page.locator('a[hreflang="en"]').first()).toHaveAttribute("href", "/en/data?locked=true");
    await expect(page.getByRole("link", {name: /Inicio/})).toHaveAttribute("href", "/es/data?locked=true");
    expect(await page.evaluate(() => window.localStorage.length)).toBe(0);
});

test("hides the role switcher before hydration on locked links", async ({page}) => {
    await page.route(/\/assets\/.*\.js$/, (route) => route.abort());
    await page.goto("/en/devops?locked=true");
    await expect(page.locator("html")).toHaveAttribute("data-locked", "true");
    await expect(page.locator("[data-role-switcher]")).toBeHidden();
});

test("shows the role switcher on unlocked links", async ({page}) => {
    await gotoHydrated(page, "/en/devops");
    await expect(page.locator("[data-role-switcher]")).toBeVisible();
});
