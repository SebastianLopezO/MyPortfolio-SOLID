import {expect, gotoHydrated, hydrateSection, test} from "./fixtures";
import type {Page} from "@playwright/test";

const openJourney = async (page: Page, path: string) => {
    await gotoHydrated(page, path);
    await hydrateSection(page, "journey");
    const tabs = page.locator('#journey [role="tablist"]');
    await tabs.and(page.locator("[data-interactive]")).waitFor({state: "attached"});
    return tabs;
};

test("prerenders the journey map with a stop for every milestone", async ({page}) => {
    await page.route(/\/assets\/.*\.js$/, (route) => route.abort());
    await page.goto("/en");
    await expect(page.locator("#journey .journey-station")).toHaveCount(40);
    await expect(page.getByRole("tab", {name: "Journey map"})).toHaveAttribute("aria-selected", "true");
});

test("selects a stop and shows its details", async ({page, consoleErrors, isMobile}) => {
    await openJourney(page, "/en");
    // Phones get the step-by-step view instead of the map; the list still reaches every stop.
    if (isMobile) {
        await page.getByRole("button", {name: "Show as a list"}).click();
        await page.locator("#journey-list").getByRole("button", {name: /CRM & MarTech Developer/}).click();
    } else {
        await page.getByRole("button", {name: /Feb 2025 · CRM & MarTech Developer/}).click();
    }
    await expect(page.locator("#journey-panel-map").getByRole("heading", {level: 3})).toHaveText("CRM & MarTech Developer");
    expect(consoleErrors).toEqual([]);
});

test("moves between views with the arrow keys", async ({page, isMobile}) => {
    const tabs = await openJourney(page, "/es");
    await tabs.getByRole("tab", {name: "Mapa del recorrido"}).focus();
    await page.keyboard.press("ArrowRight");
    await expect(tabs.getByRole("tab", {name: "Evolución de capacidades"})).toHaveAttribute("aria-selected", "true");
    // Phones get one year at a time instead of the table.
    await expect(isMobile ? page.getByRole("button", {name: "Año anterior"}) : page.locator("#journey-panel-evolution table")).toBeVisible();
    await page.keyboard.press("End");
    await expect(tabs.getByRole("tab", {name: "Hacia dónde voy"})).toBeFocused();
    await expect(page.locator("#journey-panel-horizon")).toContainText("Maestría en Ciberseguridad");
});

test("opens a milestone on the map from the capability evolution", async ({page, isMobile}) => {
    const tabs = await openJourney(page, "/en");
    await tabs.getByRole("tab", {name: "Capability evolution"}).click();
    // Phones show one year at a time, starting at 2026.
    if (isMobile) for (let year = 2026; year > 2022; year--) await page.getByRole("button", {name: "Previous year"}).click();
    await page.getByRole("button", {name: "Data & BI · 2022 · Practicing"}).click();
    await page.locator("#journey-panel-evolution").getByRole("button", {name: "Data Analyst (Internship)"}).click();
    await expect(tabs.getByRole("tab", {name: "Journey map"})).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#journey-panel-map").getByRole("heading", {level: 3})).toHaveText("Data Analyst (Internship)");
});

test("highlights the line of the role view", async ({page}) => {
    await openJourney(page, "/en/data");
    await expect(page.getByRole("button", {name: "Data & BI", exact: true})).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator("#journey-panel-map").getByRole("heading", {level: 3})).toHaveText("IT Manager & Backend Integration Lead");
});

test("steps through the journey on phones without scrolling sideways", async ({page, isMobile}) => {
    test.skip(!isMobile, "Phones only");
    await openJourney(page, "/en");
    const heading = page.locator("#journey-panel-map").getByRole("heading", {level: 3});
    const first = await heading.textContent();
    await page.getByRole("button", {name: "Previous stop"}).click();
    await expect(heading).not.toHaveText(first!);
    await page.getByRole("button", {name: "Next stop"}).click();
    await expect(heading).toHaveText(first!);

    await page.getByRole("button", {name: "Data & BI", exact: true}).click();
    await expect(page.getByRole("button", {name: "Previous stop"})).toBeEnabled();

    const sideways = await page.locator("#journey").evaluate((section) =>
        [...section.querySelectorAll<HTMLElement>("*")].filter((element) =>
            /(auto|scroll)/.test(getComputedStyle(element).overflowX) && element.scrollWidth > element.clientWidth + 1 && element.offsetParent !== null).length);
    expect(sideways).toBe(0);
});
