import {expect, type Page, test as base} from "@playwright/test";

const THIRD_PARTY = /googletagmanager\.com|google-analytics\.com|raw\.githubusercontent\.com/;

export const test = base.extend<{ consoleErrors: string[] }>({
    consoleErrors: async ({page}, use) => {
        const errors: string[] = [];
        await page.route(THIRD_PARTY, (route) => route.abort());
        page.on("console", (message) => {
            if (message.type() === "error" && !message.text().includes("net::ERR_FAILED")) errors.push(message.text());
        });
        page.on("pageerror", (error) => errors.push(error.message));
        await use(errors);
    },
});

export {expect};

export const ROLES = ["backend", "crm", "data", "devops", "fullstack"] as const;

export const PAGES = ["en", "es"].flatMap((lang) => [`/${lang}`, ...ROLES.map((role) => `/${lang}/${role}`)]);

export const gotoHydrated = async (page: Page, path: string) => {
    await page.goto(path);
    await page.locator('html[data-hydrated="true"]').waitFor({state: "attached"});
};

/**
 * A home section is an island that hydrates as it comes near the screen: this brings it there and waits until it
 * responds, as a reader scrolling to it would find it.
 */
export const hydrateSection = async (page: Page, id: string) => {
    const section = page.locator(`section#${id}`);
    await section.scrollIntoViewIfNeeded();
    await page.locator(`section#${id}[data-hydrated="true"]`).waitFor({state: "attached"});
    return section;
};
