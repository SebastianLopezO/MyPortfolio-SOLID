import {expect, gotoHydrated, hydrateSection, test} from "./fixtures";

const opacityOf = (element: Element) => Number(getComputedStyle(element).opacity);

test("folds the header as the page scrolls and marks the section being read in its menu", async ({page, consoleErrors}) => {
    await gotoHydrated(page, "/en");
    const header = page.locator(".site-header");
    await expect(header).not.toHaveAttribute("data-folded");
    await expect(page.locator('.site-header a[aria-current="true"]')).toHaveCount(0);
    await hydrateSection(page, "experience");
    await page.locator("#experience h2").scrollIntoViewIfNeeded();
    // Once the reader scrolls, the bar folds into its floating controls and the menu lists the sections.
    await expect(header).toHaveAttribute("data-folded", "true");
    await header.getByRole("button", {name: "Open menu"}).click();
    const menu = page.locator("#site-menu").getByRole("navigation", {name: "Main navigation"});
    await expect(menu.getByRole("link", {name: "Experience"})).toHaveAttribute("aria-current", "true");
    await expect(menu.locator('a[aria-current="true"]')).toHaveCount(1);
    // The mark is not color alone: the current entry carries a dot.
    const dot = menu.getByRole("link", {name: "Experience"}).locator("span[aria-hidden]");
    expect(await dot.evaluate((element) => getComputedStyle(element).backgroundColor)).not.toBe("rgba(0, 0, 0, 0)");
    // Escape closes it and gives the focus back to its button.
    await page.keyboard.press("Escape");
    await expect(page.locator("#site-menu")).toHaveCount(0);
    await expect(header.getByRole("button", {name: "Open menu"})).toBeFocused();
    expect(consoleErrors).toEqual([]);
});

test("switches the theme and remembers it", async ({page}) => {
    await gotoHydrated(page, "/en");
    const html = page.locator("html");
    const toggle = page.locator(".header-controls").getByRole("button", {name: /Switch to the (light|dark) theme/});
    const before = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const next = (await toggle.getAttribute("aria-label"))!.includes("dark") ? "dark" : "light";
    await toggle.click();
    await expect(html).toHaveAttribute("data-theme", next);
    expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).not.toBe(before);
    // The choice holds on the next page, applied before its first paint.
    await page.goto("/en/projects");
    await expect(html).toHaveAttribute("data-theme", next);
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
    expect(await portrait.locator("picture img").evaluate(animationNames)).toEqual([]);
});

test("holds the place of a screen that has not arrived and fades it in once it has", async ({page}) => {
    // The project screens are held back until the reader has seen the empty frame, as on a slow connection.
    let arrive!: () => void;
    const arrived = new Promise<void>((resolve) => (arrive = resolve));
    await page.route(/\/projects\/.+\.(avif|webp)$/, async (route) => {
        await arrived;
        await route.continue();
    });
    await gotoHydrated(page, "/en/projects/integration-platform");
    const screen = page.locator("main .screen-unmask img").last();
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
    await hydrateSection(page, "testimonials");
    const slides = page.locator("#testimonials .carousel-depth > li > *");
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

test("lets the reader move the lab's objects around and open one", async ({page, isMobile}) => {
    test.skip(isMobile, "On a phone the bench is a row swiped one object at a time");
    await gotoHydrated(page, "/en");
    const section = await hydrateSection(page, "skills");
    const modules = section.locator(".lab-module");
    expect(await modules.count()).toBeGreaterThanOrEqual(15);
    const module = modules.nth(2);
    await module.scrollIntoViewIfNeeded();
    const name = (await module.locator(".lab-label > span").first().textContent())!;
    const box = (await module.boundingBox())!;
    // A drag moves the object without opening it.
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 3);
    await page.mouse.down();
    await page.mouse.move(box.x + box.width / 2 + 60, box.y + box.height / 3 + 40, {steps: 8});
    await page.mouse.up();
    await expect(module).toHaveAttribute("aria-pressed", "false");
    const moved = (await module.boundingBox())!;
    expect(moved.x - box.x).toBeGreaterThan(40);
    // A press opens it: its tools show below the bench.
    await module.click();
    await expect(module).toHaveAttribute("aria-pressed", "true");
    await expect(section.locator("[aria-live] h3")).toHaveText(`Tools for ${name}`);
    // The arrow keys move the focused object too.
    const before = (await module.boundingBox())!;
    await module.press("ArrowLeft");
    expect((await module.boundingBox())!.x).toBeLessThan(before.x);
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
