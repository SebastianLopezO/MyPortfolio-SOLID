import {expect, gotoHydrated, hydrateSection, test} from "./fixtures";

test("copies the email address and announces it", async ({page, context, consoleErrors}) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await gotoHydrated(page, "/en");
    const contact = await hydrateSection(page, "contact");
    const address = await contact.locator('a[href^="mailto:"]').textContent();
    await contact.getByRole("button", {name: "Copy email address"}).click();
    await expect(contact.getByRole("status")).toHaveText("Email address copied");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(address);
    expect(consoleErrors).toEqual([]);
});

test("moves the floating buttons aside while the contact section is on a phone screen", async ({page, isMobile}) => {
    test.skip(!isMobile, "Wide screens leave a margin beside the content");
    await gotoHydrated(page, "/en");
    const whatsapp = page.locator('a[aria-label="Chat on WhatsApp"]');
    const assistant = page.locator('button[aria-label="Ask about my profile"]');
    // The buttons also step aside while the hero's buttons sit under them, so start past the hero.
    const pastHero = page.locator("main section").nth(1);
    await pastHero.scrollIntoViewIfNeeded();
    await expect(whatsapp).toBeVisible();
    await page.locator("#contact form").scrollIntoViewIfNeeded();
    await expect(whatsapp).toBeHidden();
    await expect(assistant).toBeHidden();
    await pastHero.scrollIntoViewIfNeeded();
    await expect(whatsapp).toBeVisible();
    await expect(assistant).toBeVisible();
});

test("keeps the floating buttons off the hero's buttons on a phone", async ({page, isMobile}) => {
    test.skip(!isMobile, "Wide screens keep the hero's buttons on the left");
    const actions = page.getByRole("link", {name: "Contact me"});
    const whatsapp = page.locator('a[aria-label="Chat on WhatsApp"]');
    for (const height of [640, 740, 915]) {
        await page.setViewportSize({width: 393, height});
        await gotoHydrated(page, "/en");
        const fab = await whatsapp.elementHandle();
        // The button fades out over 200ms and only turns hidden at the end, so wait for it to settle.
        await expect.poll(() => actions.evaluate((link, button) => {
            const a = link.getBoundingClientRect();
            const b = button!.getBoundingClientRect();
            return getComputedStyle(button!).visibility !== "hidden" && a.top < b.bottom && a.bottom > b.top && a.left < b.right && a.right > b.left;
        }, fab), {message: `393x${height}`}).toBe(false);
    }
});

test("checks the required fields before opening WhatsApp or the mail app", async ({page}) => {
    await gotoHydrated(page, "/es");
    const contact = page.locator("#contact");
    await expect(contact.getByRole("button", {name: "Enviar por WhatsApp"})).toBeVisible();
    await contact.getByRole("button", {name: "Enviar por correo"}).click();
    expect(await page.locator("#contact-name").evaluate((input: HTMLInputElement) => input.validity.valueMissing)).toBe(true);
    await expect(page).toHaveURL(/\/es$/);
});
