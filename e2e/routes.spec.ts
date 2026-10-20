import {expect, PAGES, test} from "./fixtures";

for (const path of PAGES) {
    test(`renders and hydrates ${path}`, async ({page, consoleErrors}) => {
        const response = await page.goto(path);
        expect(response?.status()).toBe(200);
        await expect(page.locator("html")).toHaveAttribute("lang", path.split("/")[1]);
        await expect(page.getByRole("heading", {level: 1})).toContainText("Sebastián López Osorno");
        await page.locator('html[data-hydrated="true"]').waitFor({state: "attached"});
        await page.waitForLoadState("networkidle");
        expect(consoleErrors).toEqual([]);
    });
}

test("redirects the root by browser language and keeps the query", async ({request}) => {
    const spanish = await request.get("/?locked=true", {
        headers: {"Accept-Language": "es-CO,es;q=0.9"},
        maxRedirects: 0
    });
    expect(spanish.status()).toBe(302);
    expect(spanish.headers().location).toMatch(/\/es\?locked=true$/);
    const english = await request.get("/", {headers: {"Accept-Language": "en-US"}, maxRedirects: 0});
    expect(english.headers().location).toMatch(/\/en$/);
});

test("removes trailing slashes with a permanent redirect", async ({request}) => {
    const response = await request.get("/es/backend/?locked=true", {maxRedirects: 0});
    expect(response.status()).toBe(301);
    expect(response.headers().location).toMatch(/\/es\/backend\?locked=true$/);
});

test("answers unknown paths with a bilingual 404", async ({page}) => {
    const response = await page.goto("/en/frontend");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("Page not found")).toBeVisible();
    await expect(page.getByText("Página no encontrada")).toBeVisible();
});
