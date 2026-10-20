import type {Page} from "@playwright/test";
import {expect, gotoHydrated, test} from "./fixtures";

// How far the section sits from its place right under the header (html's scroll-padding-top).
const distanceFromHeader = (page: Page, id: string) =>
    page.locator(`#${id}`).evaluate((section) =>
        Math.abs(section.getBoundingClientRect().top - parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop)));

test("lands on the section named in the address once the page settles", async ({page}) => {
    await gotoHydrated(page, "/es#metrics");
    await expect.poll(() => distanceFromHeader(page, "metrics")).toBeLessThanOrEqual(1);
});

test("lands on the section of an in-page link across the sections not rendered yet", async ({page}) => {
    await gotoHydrated(page, "/en");
    await page.locator('#home a[href="#contact"]').click();
    await expect(page).toHaveURL(/#contact$/);
    await expect.poll(() => distanceFromHeader(page, "contact")).toBeLessThanOrEqual(1);
});
