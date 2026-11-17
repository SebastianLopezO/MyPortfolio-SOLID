import type {Page} from "@playwright/test";
import {expect, gotoHydrated, test} from "./fixtures";

// On a phone the floating buttons step aside while the hero's buttons sit under them, so scroll past the hero first,
// to the strip that follows it.
const pastHero = (page: Page) => page.locator("main section").nth(1).scrollIntoViewIfNeeded();

const openAssistant = async (page: Page, lang: "en" | "es") => {
    await page.getByRole("button", {name: lang === "en" ? "Ask about my profile" : "Pregunta sobre mi perfil"}).click();
    const dialog = page.getByRole("dialog", {name: lang === "en" ? "Profile assistant" : "Asistente de perfil"});
    await expect(dialog).toBeVisible();
    return dialog;
};

test("answers questions and returns focus when closed", async ({page, consoleErrors}) => {
    await gotoHydrated(page, "/en");
    await pastHero(page);
    const launcher = page.getByRole("button", {name: "Ask about my profile"});
    const dialog = await openAssistant(page, "en");
    await dialog.getByLabel("Your question").fill("How many years of experience does he have?");
    await dialog.getByRole("button", {name: "Send", exact: true}).click();
    await expect(dialog.getByText(/Sebastián has \d\+ years of experience/)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();
    await expect(launcher).toBeFocused();
    expect(consoleErrors).toEqual([]);
});

test("never offers other role views on locked links", async ({page}) => {
    await gotoHydrated(page, "/es/crm?locked=true");
    await pastHero(page);
    const dialog = await openAssistant(page, "es");
    await dialog.getByLabel("Tu pregunta").fill("¿Encaja en un rol backend?");
    await dialog.getByRole("button", {name: "Enviar", exact: true}).click();
    await expect(dialog.getByText(/Backend es uno de sus perfiles principales/)).toBeVisible();
    // The only internal links allowed are project and detail pages that keep the locked view.
    const routes = await dialog.locator('a[href^="/es/"]').evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    expect(routes.length).toBeGreaterThan(0);
    for (const href of routes) expect(href).toMatch(/^\/es\/(projects|experience|education|certifications|organizations)\/[\w-]+\?locked=true$/);
});

test("follows an answer with questions about the same topic", async ({page, consoleErrors}) => {
    await gotoHydrated(page, "/es");
    await pastHero(page);
    const dialog = await openAssistant(page, "es");
    const suggestions = dialog.getByRole("list", {name: "Preguntas sugeridas"});
    await suggestions.getByRole("button", {name: "¿Quién es Sebastián?"}).click();
    await expect(dialog.getByText(/^Sebastián López Osorno es desarrollador backend y de integraciones/)).toBeVisible();
    // The question just asked leaves the list, and the follow-ups about his story take its place.
    await expect(suggestions.getByRole("button", {name: "¿Quién es Sebastián?"})).toHaveCount(0);
    await suggestions.getByRole("button", {name: "¿Cómo ha sido su trayectoria?"}).click();
    await expect(dialog.getByText(/^En sus palabras: «/)).toBeVisible();
    await expect(dialog.getByRole("link", {name: "Toda la experiencia"})).toHaveAttribute("href", "/es/experience");
    expect(consoleErrors).toEqual([]);
});

test("opens the catalog of questions by topic and answers one about a job", async ({page}) => {
    await gotoHydrated(page, "/es");
    await pastHero(page);
    const dialog = await openAssistant(page, "es");
    const toggle = dialog.getByRole("button", {name: "Más preguntas"});
    await toggle.click();
    await expect(dialog.getByRole("button", {name: "Menos preguntas"})).toHaveAttribute("aria-expanded", "true");
    const catalog = dialog.getByRole("region", {name: "Experiencia"});
    await expect(dialog.getByRole("heading", {level: 3})).toHaveCount(8);
    await catalog.getByRole("button", {name: "¿Qué hizo en Quipux?"}).click();
    await expect(dialog.getByText(/^Analista de Datos \(Práctica\) en Quipux S\.A\.S \(Ago 2022 – May 2023\)\./)).toBeVisible();
    await expect(dialog.getByRole("link", {name: "Quipux S.A.S"})).toHaveAttribute("href", "/es/experience/quipux");
    // Asking closes the catalog again, so the answer has the room.
    await expect(dialog.getByRole("button", {name: "Más preguntas"})).toHaveAttribute("aria-expanded", "false");
});

test("opens the page an answer links to and closes itself", async ({page, consoleErrors}) => {
    await gotoHydrated(page, "/en");
    await pastHero(page);
    const dialog = await openAssistant(page, "en");
    await dialog.getByLabel("Your question").fill("Does he have a Python certification?");
    await dialog.getByRole("button", {name: "Send", exact: true}).click();
    await expect(dialog.getByText(/^Yes\. He holds the IT Specialist – Python/)).toBeVisible();
    await dialog.getByRole("link", {name: "IT Specialist – Python"}).click();
    await expect(page).toHaveURL(/\/en\/certifications\/it-specialist-python$/);
    await expect(dialog).toBeHidden();
    await expect(page.getByRole("heading", {level: 1})).toHaveText("IT Specialist – Python");
    expect(consoleErrors).toEqual([]);
});

test("answers on a detail page and sends section links back to the profile", async ({page, consoleErrors}) => {
    await gotoHydrated(page, "/en/experience/adcom?from=data");
    const dialog = await openAssistant(page, "en");
    await dialog.getByLabel("Your question").fill("Can I download his resume?");
    await dialog.getByRole("button", {name: "Send", exact: true}).click();
    await expect(dialog.getByText(/^You can download his resume/)).toBeVisible();
    const resume = dialog.getByRole("link", {name: "Resume", exact: true});
    await expect(resume).toHaveAttribute("href", "/en/data#resume");
    await resume.click();
    await expect(page).toHaveURL(/\/en\/data#resume$/);
    expect(consoleErrors).toEqual([]);
});

test("keeps the suggested questions within the panel's width", async ({page}) => {
    await gotoHydrated(page, "/en/fullstack");
    await pastHero(page);
    const dialog = await openAssistant(page, "en");
    await dialog.getByRole("button", {name: "More questions"}).click();
    for (const list of await dialog.locator("ul").all()) {
        expect(await list.evaluate((element) => element.scrollWidth - element.clientWidth)).toBeLessThanOrEqual(0);
    }
});
