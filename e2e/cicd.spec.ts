import {expect, gotoHydrated, hydrateSection, test} from "./fixtures";

test.describe("CI/CD deterministic suite (data-testid standard)", () => {
    test("verifies the core application shell, landmarks and header controls via data-testid", async ({page, consoleErrors}) => {
        await gotoHydrated(page, "/en");

        await expect(page.getByTestId("app-root")).toBeAttached();
        await expect(page.getByTestId("skip-link")).toHaveAttribute("href", "#main");
        await expect(page.getByTestId("site-header")).toBeVisible();
        await expect(page.getByTestId("header-brand")).toHaveAttribute("href", "/en");
        await expect(page.getByTestId("header-controls")).toBeVisible();
        await expect(page.getByTestId("header-language-switcher")).toHaveAttribute("href", "/es");
        await expect(page.getByTestId("theme-toggle")).toBeVisible();
        await expect(page.getByTestId("header-menu-toggle")).toHaveAttribute("aria-expanded", "false");
        await expect(page.getByTestId("reading-progress")).toBeAttached();
        await expect(page.getByTestId("main-content")).toBeVisible();
        await expect(page.getByTestId("site-footer")).toBeVisible();
        await expect(page.getByTestId("floating-whatsapp")).toHaveAttribute("href", /^https:\/\/wa\.me\//);
        await expect(page.getByTestId("assistant-launcher")).toBeVisible();

        // Open and close the navigation menu deterministically via test IDs.
        await page.getByTestId("header-menu-toggle").click();
        await expect(page.getByTestId("site-menu")).toBeVisible();
        await expect(page.getByTestId("site-menu-nav")).toBeVisible();
        await expect(page.getByTestId("site-menu-link-experience")).toHaveAttribute("href", "#experience");
        await expect(page.getByTestId("site-menu-language-switcher")).toHaveAttribute("href", "/es");
        await page.getByTestId("header-menu-toggle").click();
        await expect(page.getByTestId("site-menu")).toHaveCount(0);

        expect(consoleErrors).toEqual([]);
    });

    test("verifies hero section structure and interactive project board spots via data-testid", async ({page, consoleErrors}) => {
        await gotoHydrated(page, "/en");

        await expect(page.getByTestId("section-home")).toBeVisible();
        await expect(page.getByTestId("hero-title")).toBeVisible();
        await expect(page.getByTestId("hero-name")).toHaveText("Sebastián López Osorno");
        await expect(page.getByTestId("hero-role")).toContainText("Backend & Integration Developer");
        await expect(page.getByTestId("hero-headline")).not.toBeEmpty();
        await expect(page.getByTestId("hero-summary")).not.toBeEmpty();
        await expect(page.getByTestId("hero-download-cv")).toHaveAttribute("download", "");
        await expect(page.getByTestId("hero-contact-cta")).toHaveAttribute("href", "#contact");
        await expect(page.getByTestId("hero-board")).toBeVisible();
        await expect(page.getByTestId("hero-portrait-img")).toBeVisible();
        await expect(page.getByTestId("hero-board-spots").locator("> li")).toHaveCount(6);
        await expect(page.getByTestId("hero-device-observability")).toHaveAttribute("href", "/en/projects/observability");

        expect(consoleErrors).toEqual([]);
    });

    test("verifies home sections, tabs, disclosures and interactive widgets via data-testid", async ({page, consoleErrors}) => {
        await gotoHydrated(page, "/en");

        // About section
        const about = await hydrateSection(page, "about");
        await expect(about).toHaveAttribute("data-testid", "section-about");
        await expect(page.getByTestId("about-terminal")).toBeVisible();
        await expect(page.getByTestId("about-ascii-art")).toBeVisible();
        await expect(page.getByTestId("about-read-story")).toHaveAttribute("href", "/en/about");
        await expect(page.getByTestId("about-languages")).toBeVisible();
        await expect(page.getByTestId("about-education-list")).toBeVisible();
        await expect(page.getByTestId("about-education-index")).toHaveAttribute("href", "/en/education");

        // Experience section
        await hydrateSection(page, "experience");
        await expect(page.getByTestId("experience-jobs")).toBeVisible();
        await expect(page.getByTestId("experience-item-tivenos")).toBeVisible();
        await expect(page.getByTestId("experience-toggle-all")).toHaveAttribute("aria-expanded", "false");
        await page.getByTestId("experience-toggle-all").click();
        await expect(page.getByTestId("experience-toggle-all")).toHaveAttribute("aria-expanded", "true");
        await expect(page.getByTestId("experience-more-tivenos")).toHaveAttribute("open", "");
        await page.getByTestId("experience-toggle-all").click();
        await expect(page.getByTestId("experience-more-tivenos")).not.toHaveAttribute("open");

        // Projects section
        await hydrateSection(page, "projects");
        await expect(page.getByTestId("projects-featured")).toBeVisible();
        await expect(page.getByTestId("projects-featured-cta")).toHaveAttribute("href", "/en/projects/smartpot");
        await expect(page.getByTestId("projects-tablist")).toBeVisible();
        await page.getByTestId("projects-tab-education").click();
        await expect(page.getByTestId("projects-tab-education")).toHaveAttribute("aria-selected", "true");
        await expect(page.getByTestId("projects-panel-education")).toBeVisible();
        await expect(page.getByTestId("projects-organizations-list").locator("> li")).toHaveCount(10);

        // Skills section
        await hydrateSection(page, "skills");
        await expect(page.getByTestId("skills-gallery")).toBeVisible();
        await page.getByTestId("skills-pause-toggle").click();
        const beforeCounter = await page.getByTestId("skills-counter").textContent();
        await page.getByTestId("skills-next").click();
        await expect(page.getByTestId("skills-counter")).not.toHaveText(beforeCounter!);
        await expect(page.getByTestId("skills-all-link")).toHaveAttribute("href", "/en/skills");

        // Services & Reasons sections
        await hydrateSection(page, "services");
        await expect(page.getByTestId("services-list").locator("> li")).toHaveCount(8);
        await expect(page.getByTestId("services-all-link")).toHaveAttribute("href", "/en/services");

        await hydrateSection(page, "reasons");
        await expect(page.getByTestId("reasons-stage")).toBeVisible();
        await expect(page.getByTestId("reasons-list").locator("> li")).toHaveCount(11);
        await expect(page.getByTestId("reasons-all-link")).toHaveAttribute("href", "/en/reasons");

        // Journey section
        await hydrateSection(page, "journey");
        await expect(page.getByTestId("journey-tablist")).toBeVisible();
        await page.getByTestId("journey-tab-focus").click();
        await expect(page.getByTestId("journey-panel-focus")).toBeVisible();
        await expect(page.getByTestId("focus-radar-svg")).toBeVisible();
        await page.getByTestId("focus-radar-item-sql").click();
        await expect(page.getByTestId("focus-radar-active-name")).toHaveText("SQL");

        // Certifications, Metrics, Resume, Testimonials & Contact sections
        await hydrateSection(page, "certifications");
        await expect(page.getByTestId("certifications-list").locator("> li")).toHaveCount(6);
        await page.getByTestId("certifications-toggle").click();
        await expect(page.getByTestId("certifications-list").locator("> li")).toHaveCount(29);

        await hydrateSection(page, "metrics");
        await expect(page.getByTestId("metrics-figures")).toBeVisible();
        await expect(page.getByTestId("metric-value-commits")).not.toBeEmpty();

        await hydrateSection(page, "resume");
        await expect(page.getByTestId("resume-versions")).toBeVisible();
        await page.getByTestId("resume-version-atsLong").click();
        await expect(page.getByTestId("resume-version-atsLong")).toHaveAttribute("aria-pressed", "true");
        await expect(page.getByTestId("resume-download")).toHaveAttribute("href", /ATS-Long-EN\.pdf$/);

        await hydrateSection(page, "testimonials");
        await expect(page.getByTestId("testimonials-stats")).toBeVisible();
        await expect(page.getByTestId("section-testimonials").getByTestId("carousel-track")).toBeVisible();

        await hydrateSection(page, "contact");
        await expect(page.getByTestId("contact-form")).toBeVisible();
        await expect(page.getByTestId("contact-name-input")).toBeVisible();
        await expect(page.getByTestId("contact-email-input")).toBeVisible();
        await expect(page.getByTestId("contact-message-input")).toBeVisible();
        await expect(page.getByTestId("contact-submit-whatsapp")).toBeVisible();
        await expect(page.getByTestId("contact-submit-email")).toBeVisible();

        expect(consoleErrors).toEqual([]);
    });

    test("verifies project, detail and index pages via data-testid", async ({page, consoleErrors}) => {
        // Case study page
        await gotoHydrated(page, "/en/projects/integration-platform");
        await expect(page.getByTestId("project-article-integrationPlatform")).toBeVisible();
        await expect(page.getByTestId("breadcrumbs")).toBeVisible();
        await expect(page.getByTestId("copy-link-button")).toBeVisible();
        await expect(page.getByTestId("project-title")).toHaveText("Education integration platform");
        await expect(page.getByTestId("project-glance")).toBeVisible();
        await expect(page.getByTestId("case-figures")).toBeVisible();
        await expect(page.getByTestId("layered-diagram")).toBeVisible();
        await expect(page.getByTestId("decisions-list")).toBeVisible();
        await expect(page.getByTestId("tech-explorer")).toBeVisible();
        await page.getByTestId("tech-chip-FastAPI").click();
        await expect(page.getByTestId("tech-explorer-results")).toContainText("FastAPI");
        await expect(page.getByTestId("neighbor-nav")).toBeVisible();

        // Projects index & archive filter
        await gotoHydrated(page, "/en/projects");
        await expect(page.getByTestId("projects-index")).toBeVisible();
        await expect(page.getByTestId("projects-archive")).toBeVisible();
        await page.getByTestId("archive-filter").and(page.locator("[data-interactive]")).waitFor({state: "attached"});
        await page.getByTestId("archive-filter-SmartPotTech").click();
        await expect(page.getByTestId("archive-filter-SmartPotTech")).toHaveAttribute("aria-pressed", "true");

        // Experience detail & timeline filter
        await gotoHydrated(page, "/es/experience/muv-u");
        await expect(page.getByTestId("detail-article-experience")).toBeVisible();
        await page.getByTestId("timeline-filter").and(page.locator("[data-interactive]")).waitFor({state: "attached"});
        await page.getByTestId("timeline-filter-certification").click();
        await expect(page.getByTestId("timeline-filter-certification")).toHaveAttribute("aria-pressed", "true");

        // Certifications index grouping
        await gotoHydrated(page, "/en/certifications");
        await expect(page.getByTestId("certifications-index")).toBeVisible();
        await page.getByTestId("certifications-grouping").and(page.locator("[data-interactive]")).waitFor({state: "attached"});
        await page.getByTestId("certifications-group-year").click();
        await expect(page.getByTestId("certifications-group-year")).toHaveAttribute("aria-pressed", "true");

        expect(consoleErrors).toEqual([]);
    });

    test("verifies bilingual 404 page structure via data-testid", async ({page}) => {
        const response = await page.goto("/en/unknown-route-404");
        expect(response?.status()).toBe(404);
        await expect(page.getByTestId("not-found-main")).toBeVisible();
        await expect(page.getByTestId("not-found-code")).toHaveText("404");
        await expect(page.getByTestId("not-found-section-en")).toBeVisible();
        await expect(page.getByTestId("not-found-section-es")).toBeVisible();
        await expect(page.getByTestId("not-found-home-en")).toHaveAttribute("href", "/en");
        await expect(page.getByTestId("not-found-home-es")).toHaveAttribute("href", "/es");
    });
});
