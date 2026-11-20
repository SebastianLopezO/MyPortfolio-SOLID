import {expect, gotoHydrated, hydrateSection, test} from "./fixtures";

const opacityOf = (element: Element) => Number(getComputedStyle(element).opacity);

test("folds the header as the page scrolls and marks the section being read in its menu", async ({
                                                                                                     page,
                                                                                                     consoleErrors
                                                                                                 }) => {
    await gotoHydrated(page, "/en");
    const header = page.locator(".site-header");
    await expect(header).not.toHaveAttribute("data-folded");
    await expect(page.locator('.site-header a[aria-current="true"]')).toHaveCount(0);
    await hydrateSection(page, "experience");
    await page.locator("#experience h2").scrollIntoViewIfNeeded();
    // Once the reader scrolls, the bar folds into the floating name and controls capsule, and the menu lists the sections.
    await expect(header).toHaveAttribute("data-folded", "true");
    await expect(header.getByRole("link", {name: /Sebastián/})).toBeVisible();
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
    expect(written).toMatch(/^[\d,]+\+?$/);
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

test("draws the portrait at once", async ({page}) => {
    await gotoHydrated(page, "/en");
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

test("brings the journey map in as one piece as it comes up the screen", async ({page, isMobile}) => {
    test.skip(isMobile, "The map shows from 64rem; phones go through it one stop at a time");
    await gotoHydrated(page, "/en");
    await hydrateSection(page, "journey");
    const map = page.locator(".journey-chart");
    await page.evaluate(() => window.scrollTo(0, 0));
    expect(await map.evaluate(opacityOf)).toBe(0);
    // Nothing inside it is clipped or held back: the whole map is there once the frame is.
    expect(await map.locator("svg").evaluate((element) => getComputedStyle(element).clipPath)).toBe("none");
    await map.evaluate((element) => element.scrollIntoView({block: "center"}));
    await expect.poll(() => map.evaluate(opacityOf)).toBe(1);
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

test("turns the skills gallery one card at a time, and stops when asked", async ({page, consoleErrors}) => {
    await gotoHydrated(page, "/en");
    const section = await hydrateSection(page, "skills");
    const gallery = section.getByRole("region", {name: "Technical skills gallery"});
    const cards = gallery.locator(".skill-card");
    await expect(cards).toHaveCount(15);
    await expect(cards.first()).toHaveAttribute("aria-label", "1 of 15");
    await gallery.locator(".skill-stage").scrollIntoViewIfNeeded();
    // In view it turns by itself, one card per step.
    await expect(cards.nth(1)).toHaveAttribute("data-active", "true", {timeout: 8000});
    await expect(gallery.locator(".skill-card[data-active]")).toHaveCount(1);
    // Paused, it stays; the button then offers to resume.
    await gallery.getByRole("button", {name: "Pause the gallery"}).click();
    const resume = gallery.getByRole("button", {name: "Resume the gallery"});
    await expect(resume).toBeVisible();
    const held = await gallery.locator(".skill-ring").evaluate((ring) => (ring as HTMLElement).style.getPropertyValue("--turn"));
    await page.mouse.move(0, 0);
    await page.waitForTimeout(4500);
    expect(await gallery.locator(".skill-ring").evaluate((ring) => (ring as HTMLElement).style.getPropertyValue("--turn"))).toBe(held);
    // The buttons turn it either way, wrapping around the ring, and tell a screen reader where it stands.
    const active = () => gallery.locator(".skill-card[data-active]").getAttribute("aria-label");
    const before = Number((await active())!.split(" ")[0]);
    await gallery.getByRole("button", {name: "Next skill"}).click();
    await expect.poll(active).toBe(`${(before % 15) + 1} of 15`);
    await gallery.getByRole("button", {name: "Previous skill"}).click();
    await gallery.getByRole("button", {name: "Previous skill"}).click();
    await expect.poll(active).toBe(`${((before - 2 + 15) % 15) + 1} of 15`);
    await expect(gallery.getByRole("status")).toContainText("of 15");
    expect(consoleErrors).toEqual([]);
});

test("brings a side card of the skills gallery to the front before opening it", async ({page, isMobile}) => {
    await gotoHydrated(page, "/en");
    const section = await hydrateSection(page, "skills");
    const gallery = section.getByRole("region", {name: "Technical skills gallery"});
    await gallery.getByRole("button", {name: "Pause the gallery"}).click();
    const stage = gallery.locator(".skill-stage");
    await stage.scrollIntoViewIfNeeded();
    const front = gallery.locator(".skill-card[data-active]");
    const first = await front.getAttribute("aria-label");
    if (isMobile) {
        // A swipe to the left turns the next card to the front.
        const box = (await stage.boundingBox())!;
        await page.mouse.move(box.x + box.width * 0.7, box.y + box.height / 2);
        await page.mouse.down();
        await page.mouse.move(box.x + box.width * 0.2, box.y + box.height / 2, {steps: 6});
        await page.mouse.up();
        await expect(front).not.toHaveAttribute("aria-label", first!);
        return;
    }
    // A click on the card to the right of the front turns it to the front instead of leaving the page.
    const neighbors = await gallery.locator(".skill-card").evaluateAll((cards) => cards
        .filter((card) => (card as HTMLElement).style.getPropertyValue("--d").trim() === "1")
        .map((card) => ({label: card.getAttribute("aria-label"), x: card.getBoundingClientRect().x})));
    expect(neighbors).toHaveLength(2);
    const side = neighbors.sort((a, b) => b.x - a.x)[0];
    const card = gallery.locator(`.skill-card[aria-label="${side.label}"] a`);
    await card.click();
    await expect(page).toHaveURL(/\/en$/);
    await expect(front).toHaveAttribute("aria-label", side.label!);
    // At the front, the same click opens its page.
    await card.click();
    await expect(page).toHaveURL(/\/en\/skills\/[a-z-]+$/);
    await expect(page.getByRole("heading", {level: 2, name: "Focus"})).toBeVisible();
});

test("tracks the active reason in the slide as its card crosses the screen", async ({page, isMobile}) => {
    test.skip(isMobile, "From 64rem the slide stays beside the list");
    await gotoHydrated(page, "/en");
    const section = await hydrateSection(page, "reasons");
    const third = section.locator(".reasons-list > li").nth(2);
    await third.evaluate((element) => element.scrollIntoView({block: "center"}));
    await expect(section.locator(".reason-slide").nth(2)).toHaveAttribute("data-active", "true");
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

    test("leaves the skills gallery paused until the reader starts it", async ({page}) => {
        await gotoHydrated(page, "/en");
        const section = await hydrateSection(page, "skills");
        await section.locator(".skill-stage").scrollIntoViewIfNeeded();
        await expect(section.getByRole("button", {name: "Resume the gallery"})).toBeVisible();
        await page.waitForTimeout(4500);
        await expect(section.locator(".skill-card").first()).toHaveAttribute("data-active", "true");
    });
});
