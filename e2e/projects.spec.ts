import {expect, gotoHydrated, test} from "./fixtures";

const CASES = ["integration-platform", "smartpot", "gopoli", "martech", "email-signatures"];
const PROJECTS = [
    ...CASES,
    "observability", "crm-widgets", "admissions-forms", "crm-snapshots", "landing-platform", "email-automations", "zoho-toolkit", "real-estate-site",
    "collection-automation", "peppercrm", "portfolio", "taurus", "computer-engineering", "cybersecurity-labs",
    "programming-technician", "technical-high-school",
    "lettuce-diseases", "radar-imaging", "school-services", "fashionline", "tdd-six-languages", "artificial-intelligence", "huffman-compressor", "carspace", "sitepersist", "video-to-ascii", "the-company-dream",
];

for (const path of ["/en/projects", "/es/projects", ...PROJECTS.map((slug) => `/en/projects/${slug}`)]) {
    test(`renders and hydrates ${path}`, async ({page, consoleErrors}) => {
        await gotoHydrated(page, path);
        await expect(page.getByRole("heading", {level: 1})).toBeVisible();
        expect(consoleErrors).toEqual([]);
    });
}

test("opens a case study from the home page and keeps the locked role view on the way back", async ({
                                                                                                        page,
                                                                                                        consoleErrors
                                                                                                    }) => {
    await gotoHydrated(page, "/en/backend?locked=true");
    await page.locator("#experience").getByRole("link", {name: "Integration platform"}).click();
    await expect(page).toHaveURL(/\/en\/projects\/integration-platform\?from=backend&locked=true$/);
    await expect(page.getByRole("heading", {level: 1})).toHaveText("Education integration platform");
    await expect(page).toHaveTitle(/Integration platform/);
    const crumbs = page.getByRole("navigation", {name: "Breadcrumb"});
    await expect(crumbs.getByRole("link", {name: "Projects"})).toHaveAttribute("href", "/en/projects?locked=true");
    await expect(crumbs.getByText("Education integration platform")).toHaveAttribute("aria-current", "page");
    await expect(crumbs.getByRole("link", {name: "Home"})).toHaveAttribute("href", "/en/backend?locked=true#projects");
    await expect(page.locator('a[hreflang="es"]').first()).toHaveAttribute("href", "/es/projects/integration-platform?locked=true");
    await crumbs.getByRole("link", {name: "Home"}).click();
    await expect(page).toHaveURL(/\/en\/backend\?locked=true#projects$/);
    expect(consoleErrors).toEqual([]);
});

test("links the featured project to its case study, its live demo and its code", async ({page}) => {
    await gotoHydrated(page, "/en");
    const featured = page.locator("#projects [data-featured]");
    await expect(featured.locator("article a")).toHaveAttribute("href", "/en/projects/smartpot");
    await expect(featured.getByRole("link", {name: "Case study"})).toHaveAttribute("href", "/en/projects/smartpot");
    await expect(featured.getByRole("link", {name: "Live demo"})).toHaveAttribute("href", "https://smartpot.app");
    await expect(page.getByRole("link", {name: /All projects/})).toHaveAttribute("href", "/en/projects");
});

test("lists every project and the archive with safe external links", async ({page}) => {
    await gotoHydrated(page, "/en/projects");
    // One tile per project, each the link to its page.
    const tiles = page.locator("main .project-tile a");
    await expect(tiles).toHaveCount(PROJECTS.length);
    const hrefs = await tiles.evaluateAll((links) => links.map((link) => link.getAttribute("href")));
    expect(new Set(hrefs)).toEqual(new Set(PROJECTS.map((slug) => `/en/projects/${slug}`)));
    const rels = await page.locator('main a[target="_blank"]').evaluateAll((links) => links.map((link) => link.getAttribute("rel")));
    expect(rels.length).toBeGreaterThan(0);
    expect(new Set(rels)).toEqual(new Set(["noopener noreferrer"]));
});

test("filters the repository archive by organization", async ({page}) => {
    await gotoHydrated(page, "/en/projects");
    const archive = page.locator('section[aria-labelledby="archive"]');
    const entries = archive.locator("li");
    const total = await entries.count();
    expect(total).toBeGreaterThan(60);
    const filter = archive.getByRole("group", {name: "Filter the archive by organization"});
    await filter.and(page.locator("[data-interactive]")).waitFor({state: "attached"});
    await filter.getByRole("button", {name: /^TechnicalSebastians/}).click();
    await expect(filter.getByRole("button", {name: /^TechnicalSebastians/})).toHaveAttribute("aria-pressed", "true");
    await expect(entries).toHaveCount(4);
    for (const link of await entries.getByRole("link").all()) expect(await link.getAttribute("href")).toMatch(/^https:\/\/github\.com\/TechnicalSebastians\//);
    await filter.getByRole("button", {name: /^All/}).click();
    await expect(entries).toHaveCount(total);
});

test("tells a project without a case study, links its organization and moves to the next project", async ({
                                                                                                              page,
                                                                                                              consoleErrors
                                                                                                          }) => {
    await gotoHydrated(page, "/en/projects/computer-engineering?from=data");
    await expect(page.getByRole("heading", {level: 2, name: "Repositories"})).toBeVisible();
    await expect(page.getByRole("link", {name: "GitHub organization: EngineeringSebastian-s"})).toHaveAttribute("href", "https://github.com/EngineeringSebastian-s");
    const next = page.getByRole("link", {name: /Next project/});
    await expect(next).toHaveAttribute("href", "/en/projects/cybersecurity-labs");
    await next.click();
    await expect(page).toHaveURL(/\/en\/projects\/cybersecurity-labs\?from=data$/);
    await expect(page.getByRole("heading", {level: 1})).toHaveText("Cybersecurity Labs");
    expect(consoleErrors).toEqual([]);
});

test("links a project to its job, its organization, the certifications it uses and the other projects of the job", async ({
                                                                                                                              page,
                                                                                                                              consoleErrors
                                                                                                                          }) => {
    await gotoHydrated(page, "/en/projects/email-automations?from=backend");
    const related = page.getByRole("region", {name: "Related"});
    await expect(related.getByRole("link", {name: /ADCOM GROUP/})).toHaveAttribute("href", "/en/experience/adcom");
    await expect(related.getByRole("link", {name: /ADCOM-Group/})).toHaveAttribute("href", "/en/organizations/adcom-group");
    await expect(related.getByRole("link", {name: /IT Specialist – Python/})).toHaveAttribute("href", "/en/certifications/it-specialist-python");
    await expect(related.getByRole("heading", {name: "More projects from ADCOM GROUP"})).toBeVisible();
    const sibling = related.locator('a[href="/en/projects/real-estate-site"]');
    await sibling.click();
    await expect(page).toHaveURL(/\/en\/projects\/real-estate-site\?from=backend$/);
    await expect(page.getByRole("region", {name: "Related"}).locator('a[href="/en/projects/email-automations"]')).toHaveCount(1);
    expect(consoleErrors).toEqual([]);
});

test("shows every decision whole: its problem, its solution and its cost", async ({page, consoleErrors}) => {
    await gotoHydrated(page, "/en/projects/portfolio");
    const section = page.locator('section[aria-labelledby="project-decisions"]');
    const decisions = section.locator("ol > li");
    await expect(decisions).toHaveCount(3);
    const first = decisions.first();
    await expect(first.getByRole("heading", {level: 3, name: "Prerendering instead of a server"})).toBeVisible();
    await expect(first.getByText("An app built in the browser arrives empty until its JavaScript runs.")).toBeVisible();
    await expect(first.getByText(/^Astro generates every page at build time/)).toBeVisible();
    await expect(first.getByText("The cost: every content change needs a new build and deployment.")).toBeVisible();
    // Nothing to switch: every side of every decision is on the page at once.
    await expect(section.getByRole("tab")).toHaveCount(0);
    await expect(section.getByText(/^It answers by searching the site's own content/)).toBeVisible();
    expect(consoleErrors).toEqual([]);
});

test("lays each decision out side by side on wide screens and stacked on phones", async ({page, isMobile}) => {
    await gotoHydrated(page, "/en/projects/peppercrm");
    const first = page.locator('section[aria-labelledby="project-decisions"] ol > li').first();
    const problem = await first.getByText(/^A CRM brings together leads/).boundingBox();
    const solution = await first.getByText(/^Each part of the business is a module/).boundingBox();
    expect(problem && solution).toBeTruthy();
    if (isMobile) expect(solution!.y).toBeGreaterThan(problem!.y + problem!.height);
    else expect(solution!.x).toBeGreaterThan(problem!.x + problem!.width);
});

test("marks the section being read and folds the page index into a menu on phones", async ({page, isMobile}) => {
    await gotoHydrated(page, "/en/projects/portfolio");
    if (isMobile) {
        const menu = page.locator("details", {has: page.locator("summary", {hasText: "On this page"})});
        await menu.locator("summary").click();
        await menu.getByRole("link", {name: "Stack"}).click();
        await expect(page).toHaveURL(/#project-stack$/);
        await expect(menu).not.toHaveAttribute("open");
    } else {
        const index = page.getByRole("navigation", {name: "On this page"});
        await page.evaluate(() => document.getElementById("project-what")?.scrollIntoView({block: "start"}));
        await expect(index.getByRole("link", {name: "What it does"})).toHaveAttribute("aria-current", "location");
        await expect(index.locator('[aria-current="location"]')).toHaveCount(1);
        // The last sections are short and never reach the top third; the bottom of the page marks the last one.
        await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
        await expect(index.getByRole("link").last()).toHaveAttribute("aria-current", "location");
    }
});

test.describe("without JavaScript", () => {
    test.use({javaScriptEnabled: false});

    test("shows both sides of every decision under their labels", async ({page}) => {
        await page.goto("/en/projects/portfolio");
        const first = page.locator('section[aria-labelledby="project-decisions"] ol > li').first();
        await expect(first.getByText("Problem", {exact: true})).toBeVisible();
        await expect(first.getByText("An app built in the browser arrives empty until its JavaScript runs.")).toBeVisible();
        await expect(first.getByText("Solution", {exact: true})).toBeVisible();
        await expect(first.getByText(/^Astro generates every page at build time/)).toBeVisible();
        await expect(first.getByText(/^The cost:/)).toBeVisible();
    });
});

test("lists the other projects that use a technology of the stack", async ({page, consoleErrors}) => {
    await gotoHydrated(page, "/en/projects/integration-platform?from=backend");
    const stack = page.locator('section[aria-labelledby="case-stack"]');
    const fastapi = stack.getByRole("button", {name: "FastAPI", exact: true});
    await fastapi.click();
    await expect(fastapi).toHaveAttribute("aria-pressed", "true");
    await expect(stack.getByText(/^Projects with FastAPI \(\d+\)$/)).toBeVisible();
    await expect(stack.locator('a[href="/en/projects/crm-snapshots"]')).toBeVisible();
    await expect(stack.locator('a[href="/en/projects/integration-platform"]')).toHaveCount(0);
    await fastapi.click();
    await expect(stack.getByText(/^Projects with FastAPI/)).toHaveCount(0);
    expect(consoleErrors).toEqual([]);
});

test("shows the SmartPot screens with descriptions and the architecture as text", async ({page}) => {
    await gotoHydrated(page, "/es/projects/smartpot");
    const images = page.locator("main picture img");
    await expect(images).toHaveCount(3);
    for (const image of await images.all()) expect((await image.getAttribute("alt"))?.length).toBeGreaterThan(20);
    await expect(page.getByRole("heading", {name: "Arquitectura"})).toBeVisible();
    await expect(page.getByText("Broker Mosquitto 2.1")).toBeVisible();
});

// Lighthouse runs on a slow CPU and network, where a body that suspends during hydration swapped the prerendered text
// for an empty fallback until its chunk arrived (CLS above 1).
test("keeps the prerendered case study on screen while it hydrates on a slow device", async ({page}) => {
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Emulation.setCPUThrottlingRate", {rate: 4});
    await cdp.send("Network.emulateNetworkConditions", {
        offline: false,
        latency: 150,
        downloadThroughput: 200_000,
        uploadThroughput: 90_000
    });
    await page.addInitScript(() => {
        (window as unknown as { shifts: number }).shifts = 0;
        new PerformanceObserver((list) => {
            for (const entry of list.getEntries() as unknown as { value: number; hadRecentInput: boolean }[]) {
                if (!entry.hadRecentInput) (window as unknown as { shifts: number }).shifts += entry.value;
            }
        }).observe({type: "layout-shift", buffered: true});
    });
    await gotoHydrated(page, "/es/projects/smartpot?from=backend&locked=true");
    await page.waitForTimeout(3000);
    expect(await page.evaluate(() => (window as unknown as { shifts: number }).shifts)).toBeLessThan(0.1);
});

test("captions the recreated screens of a private project", async ({page}) => {
    await gotoHydrated(page, "/en/projects/observability");
    const figures = page.getByRole("region", {name: "Screens"}).locator("figure");
    await expect(figures).toHaveCount(2);
    for (const figure of await figures.all()) {
        expect((await figure.locator("img").getAttribute("alt"))?.startsWith("Recreation of")).toBe(true);
        await expect(figure.locator("figcaption")).toHaveText("Recreated with fictional data; the real system is private.");
    }
});

test("shows GoPoli's desktop screens on wide screens, its phone screens on phones and credits the map data", async ({
                                                                                                                        page,
                                                                                                                        isMobile
                                                                                                                    }) => {
    await gotoHydrated(page, "/en/projects/gopoli");
    const screens = page.getByRole("region", {name: "Screens"}).locator("picture img:visible");
    await expect(screens).toHaveCount(3);
    for (const image of await screens.all()) {
        expect(await image.getAttribute("alt")).toMatch(isMobile ? /on a phone/ : /in the browser/);
    }
    await expect(page.getByRole("link", {name: "© OpenStreetMap contributors"}).filter({visible: true}))
        .toHaveAttribute("href", "https://www.openstreetmap.org/copyright");
});
