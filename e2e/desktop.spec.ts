import {expect, gotoHydrated, hydrateSection, test} from "./fixtures";

test("lays the profile out across a wide screen", async ({page, isMobile}) => {
    test.skip(isMobile, "Wide screens only");
    await page.setViewportSize({width: 1920, height: 1080});
    await gotoHydrated(page, "/en");
    const container = await page.locator("#experience .container-page").boundingBox();
    expect(container!.width).toBeGreaterThanOrEqual(1920 * 0.75);
    // Each job spans the timeline instead of half of it.
    const job = await page.locator("#experience .timeline-card").first().boundingBox();
    expect(job!.width).toBeGreaterThan(container!.width * 0.8);
});

test("shortens long recommendations and opens them on request", async ({page}) => {
    await gotoHydrated(page, "/en");
    await hydrateSection(page, "testimonials");
    const toggle = page.locator("#testimonials").getByRole("button", {name: "Show more"}).first();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    const quote = page.locator(`#${await toggle.getAttribute("aria-controls")}`);
    const clamped = await quote.evaluate((element) => element.clientHeight);
    await toggle.click();
    await expect(page.locator("#testimonials").getByRole("button", {name: "Show less"}).first()).toHaveAttribute("aria-expanded", "true");
    expect(await quote.evaluate((element) => element.clientHeight)).toBeGreaterThan(clamped);
});

test("keeps the case study overview and index beside the text on wide screens", async ({page, isMobile}) => {
    test.skip(isMobile, "Wide screens only");
    await page.setViewportSize({width: 1440, height: 900});
    await gotoHydrated(page, "/en/projects/smartpot");
    const overview = await page.getByRole("complementary", {name: "At a glance"}).boundingBox();
    const problem = await page.locator("#case-problem").boundingBox();
    expect(overview!.x).toBeGreaterThan(problem!.x + problem!.width);
    const index = page.getByRole("navigation", {name: "On this page"});
    await expect(index).toBeVisible();
    await expect(index.getByRole("link", {name: "Results"})).toHaveAttribute("href", "#case-results");
});

test("shows one recommendation at a time on phones and moves with the buttons", async ({page, isMobile}) => {
    test.skip(!isMobile, "Phones only");
    await gotoHydrated(page, "/en");
    const section = await hydrateSection(page, "testimonials");
    const track = section.locator("ul").first();
    await expect(track.locator(":scope > li")).toHaveCount(16);
    const card = await track.locator(":scope > li").first().boundingBox();
    const box = await track.boundingBox();
    expect(card!.width).toBeGreaterThan(box!.width * 0.75);
    expect(card!.width).toBeLessThan(box!.width);

    await section.getByRole("button", {name: "Next recommendations"}).click();
    await expect.poll(() => track.evaluate((element) => element.scrollLeft)).toBeGreaterThan(card!.width * 0.5);
    await expect(section.getByRole("button", {name: "Previous recommendations"})).toBeEnabled();
});
