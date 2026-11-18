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

const animationNames = (element: Element) => element.getAnimations().map((animation) => (animation as CSSAnimation).animationName);

// The part of the journey map still hidden by its sweep, as the right inset of its clip (100 hidden, 0 drawn).
const hiddenShare = (element: Element) => parseFloat(getComputedStyle(element).clipPath.split(" ")[1] ?? "0") || 0;

test("settles the hero's stack in one chip after another and draws the portrait at once", async ({page}) => {
    await gotoHydrated(page, "/en");
    const chips = page.locator("#home ul.hero-cascade").first().locator("> li");
    expect(await chips.first().evaluate(animationNames)).toEqual(["hero-cascade"]);
    const delays = await chips.evaluateAll((items) => items.map((item) => getComputedStyle(item).animationDelay));
    expect(new Set(delays).size).toBe(delays.length);
    // The portrait is the largest paint: nothing fades it in, and it only drifts once the hero leaves.
    const portrait = page.locator("#home .hero-portrait");
    expect(await portrait.evaluate(opacityOf)).toBe(1);
    expect(await portrait.locator("img").evaluate(animationNames)).toEqual([]);
});

test("holds the place of a screen that has not arrived and fades it in once it has", async ({page}) => {
    await gotoHydrated(page, "/en");
    // The project screens are held back until the reader has seen the empty frame, as on a slow connection.
    let arrive!: () => void;
    const arrived = new Promise<void>((resolve) => (arrive = resolve));
    await page.route(/\/projects\/.+\.(avif|webp)$/, async (route) => {
        await arrived;
        await route.continue();
    });
    await hydrateSection(page, "projects");
    const screen = page.locator("#projects .screen-settle img").first();
    await screen.evaluate((element) => element.scrollIntoView({block: "center"}));
    await expect(screen).toHaveAttribute("data-loading", "");
    arrive();
    await expect(screen).toHaveAttribute("data-loaded", "");
    await expect(screen).not.toHaveAttribute("data-loading");
    await expect.poll(() => screen.evaluate(opacityOf)).toBe(1);
});

test("draws the journey map from left to right as it comes up the screen", async ({page, isMobile}) => {
    test.skip(isMobile, "The map shows from 64rem; phones go through it one stop at a time");
    await gotoHydrated(page, "/en");
    await hydrateSection(page, "journey");
    const map = page.locator(".journey-chart > svg");
    await page.evaluate(() => window.scrollTo(0, 0));
    expect(await map.evaluate(hiddenShare)).toBe(100);
    await map.evaluate((element) => element.scrollIntoView({block: "center"}));
    await expect.poll(() => map.evaluate(hiddenShare)).toBe(0);
});

test("turns the cards at a slider's edge away on a phone", async ({page, isMobile}) => {
    test.skip(!isMobile, "From 48rem every slider is a grid");
    await gotoHydrated(page, "/en");
    await hydrateSection(page, "projects");
    const slides = page.locator("#projects .carousel-depth > li > *");
    await slides.first().evaluate((element) => element.scrollIntoView({block: "center", inline: "nearest"}));
    await expect.poll(() => slides.first().evaluate(opacityOf)).toBe(1);
    expect(await slides.nth(1).evaluate(opacityOf)).toBeLessThan(1);
});

test("keeps the second layer of the home in the page and opens all of it at once", async ({page}) => {
    await gotoHydrated(page, "/es");
    await hydrateSection(page, "experience");
    const more = page.locator("#experience-jobs details.more");
    const count = await more.count();
    expect(count).toBeGreaterThan(0);
    // Closed at first, yet its achievements are in the page for search engines and find in page.
    await expect(more.first()).not.toHaveAttribute("open");
    expect(await more.first().locator("li").count()).toBeGreaterThan(0);
    await page.getByRole("button", {name: "Expandir todo"}).click();
    for (let index = 0; index < count; index++) await expect(more.nth(index)).toHaveAttribute("open", "");
    await page.getByRole("button", {name: "Contraer todo"}).click();
    await expect(more.first()).not.toHaveAttribute("open");
});

test.describe("for a reader who asks for less motion", () => {
    test.use({contextOptions: {reducedMotion: "reduce"}});

    test("keeps every part at rest and every figure still", async ({page}) => {
        await gotoHydrated(page, "/en");
        expect(await page.locator("#home .hero-cascade > li").first().evaluate(animationNames)).toEqual([]);
        expect(await page.locator("#home .status-dot").evaluate((dot) => getComputedStyle(dot, "::after").animationName)).toBe("none");
        expect(await page.locator("dl.enter-each").first().locator("> div").first().evaluate(opacityOf)).toBe(1);
        const figure = page.locator("[data-count]").first();
        const written = await figure.textContent();
        await figure.evaluate((element) => element.scrollIntoView({block: "center"}));
        await page.waitForTimeout(300);
        await expect(figure).toHaveText(written!);
        expect(await page.locator(".reading-progress").evaluate((bar) => parseFloat(getComputedStyle(bar).scale))).toBe(0);
    });
});
