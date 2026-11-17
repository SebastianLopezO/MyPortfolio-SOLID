import {expect, gotoHydrated, hydrateSection, test} from "./fixtures";

const opacityOf = (element: Element) => Number(getComputedStyle(element).opacity);

test("marks the section being read in the header", async ({page, isMobile, consoleErrors}) => {
    test.skip(isMobile, "The header lists the sections from 64rem");
    await gotoHydrated(page, "/en");
    const nav = page.getByRole("navigation", {name: "Main navigation"});
    await expect(nav.locator('a[aria-current="true"]')).toHaveCount(0);
    await hydrateSection(page, "experience");
    await page.locator("#experience h2").scrollIntoViewIfNeeded();
    await expect(nav.getByRole("link", {name: "Experience"})).toHaveAttribute("aria-current", "true");
    await expect(nav.locator('a[aria-current="true"]')).toHaveCount(1);
    // The mark is not color alone.
    expect(await nav.getByRole("link", {name: "Experience"}).evaluate((link) => getComputedStyle(link).textDecorationLine)).toBe("underline");
    expect(consoleErrors).toEqual([]);
});

test("raises the parts of a section as they enter the screen", async ({page}) => {
    await gotoHydrated(page, "/en");
    const figure = page.locator("dl.enter-each").first().locator("> div").first();
    // Below the first screen a part waits faded, and at rest once it is well inside.
    expect(await figure.evaluate(opacityOf)).toBe(0);
    await figure.evaluate((element) => element.scrollIntoView({block: "center"}));
    await expect.poll(() => figure.evaluate(opacityOf)).toBe(1);
});

test("counts a figure up to the text it was written with", async ({page}) => {
    await gotoHydrated(page, "/en");
    const figure = page.locator("[data-count]").first();
    const written = await figure.textContent();
    expect(written).toMatch(/^\d+\+$/);
    await figure.evaluate((element) => element.scrollIntoView({block: "center"}));
    await expect.poll(() => figure.textContent(), {intervals: [40]}).not.toBe(written);
    await expect(figure).toHaveText(written!);
});

test("draws the reading progress on the header as the page scrolls", async ({page}) => {
    await gotoHydrated(page, "/en");
    const progress = () => page.locator(".reading-progress").evaluate((bar) => parseFloat(getComputedStyle(bar).scale));
    expect(await progress()).toBe(0);
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight / 2));
    await expect.poll(progress).toBeGreaterThan(0.2);
});

test.describe("for a reader who asks for less motion", () => {
    test.use({contextOptions: {reducedMotion: "reduce"}});

    test("keeps every part at rest and every figure still", async ({page}) => {
        await gotoHydrated(page, "/en");
        expect(await page.locator("dl.enter-each").first().locator("> div").first().evaluate(opacityOf)).toBe(1);
        const figure = page.locator("[data-count]").first();
        const written = await figure.textContent();
        await figure.evaluate((element) => element.scrollIntoView({block: "center"}));
        await page.waitForTimeout(300);
        await expect(figure).toHaveText(written!);
        expect(await page.locator(".reading-progress").evaluate((bar) => parseFloat(getComputedStyle(bar).scale))).toBe(0);
    });
});
