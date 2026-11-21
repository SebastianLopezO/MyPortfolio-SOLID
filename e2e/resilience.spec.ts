import {expect, gotoHydrated, hydrateSection, test} from "./fixtures";

test.describe("Resilience and resistance suite (fault tolerance, restricted APIs, progressive enhancement)", () => {
    test("degrades gracefully when localStorage throws SecurityError in strict private browsing", async ({page, consoleErrors}) => {
        await page.addInitScript(() => {
            const deny = () => {
                throw new DOMException("Storage disabled", "SecurityError");
            };
            Object.defineProperty(window, "localStorage", {
                configurable: true,
                get: deny,
            });
        });

        await gotoHydrated(page, "/en");
        const html = page.locator("html");
        const toggle = page.getByTestId("theme-toggle");

        // Even with localStorage throwing on access, the theme toggle still switches the page theme in memory.
        const initialTheme = (await html.getAttribute("data-theme")) ?? "dark";
        const expectedNext = initialTheme === "dark" ? "light" : "dark";
        await toggle.click();
        await expect(html).toHaveAttribute("data-theme", expectedNext);

        expect(consoleErrors).toEqual([]);
    });

    test("handles clipboard API rejection cleanly using fallback selection copy or status feedback", async ({page, consoleErrors}) => {
        await page.addInitScript(() => {
            Object.defineProperty(navigator, "clipboard", {
                configurable: true,
                value: {
                    writeText: () => Promise.reject(new DOMException("NotAllowedError", "NotAllowedError")),
                },
            });
        });

        // On detail pages CopyLink falls back to document.execCommand("copy") without throwing.
        await gotoHydrated(page, "/en/projects/smartpot");
        await page.getByTestId("copy-link-button").click();
        await expect(page.getByTestId("copy-link-status")).toHaveText(/Link copied|Could not copy/);

        // On the home contact section, copyEmail announces the state cleanly without uncaught errors.
        await gotoHydrated(page, "/en");
        await hydrateSection(page, "contact");
        await page.getByTestId("contact-copy-email").click();
        await expect(page.getByTestId("contact-copy-status")).not.toBeEmpty();

        expect(consoleErrors).toEqual([]);
    });

    test("ignores malformed query parameters and keeps navigation functional", async ({page, consoleErrors}) => {
        await gotoHydrated(page, "/en?from=nonexistent_role&locked=invalid&utm_source=test");
        await expect(page.getByTestId("hero-name")).toHaveText("Sebastián López Osorno");
        await expect(page.getByTestId("hero-role")).toContainText("Backend & Integration Developer");
        await expect(page.getByTestId("header-language-switcher")).toHaveAttribute("href", "/es");

        expect(consoleErrors).toEqual([]);
    });

    test.describe("progressive enhancement with JavaScript disabled", () => {
        test.use({javaScriptEnabled: false});

        test("renders full readable content, navigation links, disclosures and case study architecture without JS", async ({page}) => {
            await page.goto("/en");
            await expect(page.getByTestId("hero-name")).toHaveText("Sebastián López Osorno");
            await expect(page.getByTestId("section-about")).toBeVisible();
            await expect(page.getByTestId("section-experience")).toBeVisible();
            await expect(page.getByTestId("section-projects")).toBeVisible();
            await expect(page.getByTestId("section-contact")).toBeVisible();

            // Native <details> disclosure works without JavaScript.
            const disclosure = page.getByTestId("experience-more-tivenos");
            await expect(disclosure).not.toHaveAttribute("open");
            await page.getByTestId("experience-more-tivenos-summary").click();
            await expect(disclosure).toHaveAttribute("open", "");

            // Case study page renders figures, architecture diagram and decisions in full static HTML.
            await page.goto("/en/projects/smartpot");
            await expect(page.getByTestId("project-title")).toHaveText("SmartPot");
            await expect(page.getByTestId("case-figures")).toBeVisible();
            await expect(page.getByTestId("layered-diagram")).toBeVisible();
            await expect(page.getByTestId("decisions-list").locator("> li")).toHaveCount(3);
        });
    });
});
