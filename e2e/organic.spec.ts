import {expect, gotoHydrated, hydrateSection, test} from "./fixtures";

test.describe("Organic human-simulation suite (getByRole & sequential key-by-key interactions)", () => {
    test("navigates via keyboard Tab, Skip Link, header landmarks and Escape like a human reader", async ({page, consoleErrors}) => {
        await gotoHydrated(page, "/en");

        // First Tab focuses the skip link, Enter jumps to main content.
        await page.keyboard.press("Tab");
        const skipLink = page.getByRole("link", {name: "Skip to content"});
        await expect(skipLink).toBeFocused();
        await page.keyboard.press("Enter");
        await expect(page).toHaveURL(/#main$/);

        // Interact with the banner header menu using getByRole and keyboard keys.
        const banner = page.getByRole("banner");
        const menuButton = banner.getByRole("button", {name: "Open menu"});
        await menuButton.focus();
        await expect(menuButton).toBeFocused();
        await page.keyboard.press("Enter");

        const closeButton = banner.getByRole("button", {name: "Close menu"});
        await expect(closeButton).toHaveAttribute("aria-expanded", "true");
        const menuNav = page.locator("#site-menu").getByRole("navigation", {name: "Main navigation"});
        await expect(menuNav.getByRole("link", {name: "Projects"})).toBeVisible();

        // Dismiss with Escape and verify focus returns to the menu button.
        await page.keyboard.press("Escape");
        await expect(menuButton).toHaveAttribute("aria-expanded", "false");
        await expect(menuButton).toBeFocused();

        expect(consoleErrors).toEqual([]);
    });

    test("types into the contact form character-by-character with typo correction and validates via getByRole", async ({page, consoleErrors}) => {
        await gotoHydrated(page, "/es");
        await hydrateSection(page, "contact");

        const form = page.getByRole("form", {name: "Contáctame"});
        await expect(form).toBeVisible();

        const nameInput = form.getByRole("textbox", {name: "Nombre completo"});
        const emailInput = form.getByRole("textbox", {name: "Correo electrónico"});
        const messageInput = form.getByRole("textbox", {name: "Mensaje"});

        // Human clicks the name field, types with a typo, uses Backspace, and finishes typing key-by-key.
        await nameInput.click();
        await nameInput.pressSequentially("Ana Maríx", {delay: 15});
        await page.keyboard.press("Backspace");
        await nameInput.pressSequentially("a Gómez", {delay: 15});
        await expect(nameInput).toHaveValue("Ana María Gómez");

        // Tab to the email field and type key-by-key; first leave an invalid email to test native constraint validation.
        await page.keyboard.press("Tab");
        await expect(emailInput).toBeFocused();
        await emailInput.pressSequentially("ana.gomez", {delay: 12});
        await form.getByRole("button", {name: "Enviar por correo"}).click();
        expect(await emailInput.evaluate((el: HTMLInputElement) => el.validity.typeMismatch)).toBe(true);

        // Complete the email address key-by-key.
        await emailInput.focus();
        await emailInput.pressSequentially("@empresa.co", {delay: 12});
        await expect(emailInput).toHaveValue("ana.gomez@empresa.co");
        expect(await emailInput.evaluate((el: HTMLInputElement) => el.validity.valid)).toBe(true);

        // Tab to the message textarea and type key-by-key including a newline.
        await page.keyboard.press("Tab");
        await expect(messageInput).toBeFocused();
        await messageInput.pressSequentially("Hola Sebastián,", {delay: 10});
        await page.keyboard.press("Enter");
        await messageInput.pressSequentially("Queremos conversar sobre una integración con Zoho CRM y FastAPI.", {delay: 8});
        await expect(messageInput).toHaveValue("Hola Sebastián,\nQueremos conversar sobre una integración con Zoho CRM y FastAPI.");

        expect(consoleErrors).toEqual([]);
    });

    test("converses with the profile assistant by typing key-by-key and pressing Enter", async ({page, consoleErrors}) => {
        await gotoHydrated(page, "/en");
        await page.locator("main section").nth(1).scrollIntoViewIfNeeded();

        const launcher = page.getByRole("button", {name: "Ask about my profile"});
        await launcher.click();

        const dialog = page.getByRole("dialog", {name: "Profile assistant"});
        await expect(dialog).toBeVisible();
        const log = dialog.getByRole("log", {name: "Profile assistant"});
        await expect(log).toBeVisible();

        const input = dialog.getByRole("textbox", {name: "Your question"});
        await input.click();

        // Type character-by-character with a small correction and submit with Enter key.
        await input.pressSequentially("What did he build at TIVENOX", {delay: 14});
        await page.keyboard.press("Backspace");
        await input.pressSequentially("S?", {delay: 14});
        await expect(input).toHaveValue("What did he build at TIVENOS?");
        await page.keyboard.press("Enter");

        await expect(input).toHaveValue("");
        await expect(log).toContainText("TIVENOS");

        // Follow up organically via suggested question buttons by role.
        const suggestions = dialog.getByRole("list", {name: "Suggested questions"});
        const firstSuggestion = suggestions.getByRole("button").first();
        const suggestionText = await firstSuggestion.textContent();
        await firstSuggestion.click();
        await expect(log).toContainText(suggestionText!);

        // Close with Escape and ensure focus returns to launcher.
        await page.keyboard.press("Escape");
        await expect(dialog).toBeHidden();
        await expect(launcher).toBeFocused();

        expect(consoleErrors).toEqual([]);
    });

    test("explores project categories and journey views using roving tabindex and arrow keys", async ({page, consoleErrors}) => {
        await gotoHydrated(page, "/en");

        // Projects tablist keyboard navigation (on /en the initial selected tab is Work, index 1)
        await hydrateSection(page, "projects");
        const projectTabs = page.getByRole("tablist", {name: "Kinds of project"});
        await projectTabs.and(page.locator("[data-interactive]")).waitFor({state: "attached"});
        const firstProjectTab = projectTabs.getByRole("tab").first();
        const secondProjectTab = projectTabs.getByRole("tab").nth(1);
        const lastProjectTab = projectTabs.getByRole("tab").last();
        await secondProjectTab.focus();
        await page.keyboard.press("ArrowRight");
        await expect(lastProjectTab).toHaveAttribute("aria-selected", "true");
        await expect(lastProjectTab).toBeFocused();
        await page.keyboard.press("Home");
        await expect(firstProjectTab).toHaveAttribute("aria-selected", "true");
        await page.keyboard.press("End");
        await expect(lastProjectTab).toHaveAttribute("aria-selected", "true");

        // Journey tablist and focus radar exploration by role
        await hydrateSection(page, "journey");
        const journeyTabs = page.getByRole("tablist", {name: "Journey views"});
        await journeyTabs.and(page.locator("[data-interactive]")).waitFor({state: "attached"});
        await journeyTabs.getByRole("tab", {name: "Journey map"}).focus();
        await page.keyboard.press("ArrowRight");
        await page.keyboard.press("ArrowRight");
        const focusTab = journeyTabs.getByRole("tab", {name: "Focus radar"});
        await expect(focusTab).toHaveAttribute("aria-selected", "true");

        const focusPanel = page.getByRole("tabpanel", {name: "Focus radar"});
        const dockerBtn = focusPanel.getByRole("button", {name: /Docker/});
        await dockerBtn.focus();
        await expect(dockerBtn).toHaveAttribute("aria-pressed", "true");

        expect(consoleErrors).toEqual([]);
    });
});
