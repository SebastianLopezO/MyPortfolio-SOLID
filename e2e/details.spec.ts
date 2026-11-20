import {expect, gotoHydrated, test} from "./fixtures";

const DETAILS: Record<string, string[]> = {
    experience: ["tivenos", "adcom", "muv-u", "quipux"],
    education: ["computer-engineering", "cybersecurity-diploma", "programming-technician", "pascual-bravo", "inem"],
    certifications: [
        "it-specialist-python", "dax-power-bi", "power-bi-analysis", "data-science-ai", "cybersecurity", "problem-solving", "excel-mastery",
        "excel-data-analysis", "search-console-seo", "green-digital-skills", "data-visualization", "web-programming", "iot-protocols", "git-github",
        "software-engineering", "django-two", "practical-javascript", "basic-programming", "python-fundamentals", "hacklab", "java-basic", "css",
        "python-django", "python-basic", "excel-professional", "sql-basic", "programming-fundamentals", "python-eia", "html",
    ],
    organizations: [
        "tivenoseducation", "adcom-group", "smartpottech", "gopoli", "peppertechdev", "engineeringsebastian-s", "taurussebastian-s", "testlabdata",
        "technicalsebastians", "vocationalsebastian-s",
    ],
    skills: [
        "backend-and-apis", "crm-and-automation", "data-and-business-intelligence", "devops-and-observability", "databases",
        "frontend", "cloud-and-hosting", "testing-and-quality", "programming-languages", "security", "machine-learning-and-ai",
        "iot-and-embedded", "networking", "developer-tools", "computer-science-foundations",
    ],
};

// Every English page and both languages' indexes; the Spanish pages share the components and are checked below.
const PATHS = [
    ...Object.entries(DETAILS).flatMap(([collection, slugs]) => [`/en/${collection}`, ...slugs.map((slug) => `/en/${collection}/${slug}`)]),
    ...Object.keys(DETAILS).map((collection) => `/es/${collection}`),
];

for (const path of PATHS) {
    test(`renders and hydrates ${path}`, async ({page, consoleErrors}) => {
        await gotoHydrated(page, path);
        await expect(page.getByRole("heading", {level: 1})).toBeVisible();
        await expect(page.getByRole("navigation", {name: "Breadcrumb"}).or(page.getByRole("navigation", {name: "Ruta de navegación"}))).toBeVisible();
        expect(consoleErrors).toEqual([]);
    });
}

test("opens a job page from the home page and keeps the locked role view", async ({page, consoleErrors}) => {
    await gotoHydrated(page, "/en/backend?locked=true");
    await page.locator("#experience").getByRole("link", {name: "Read the full experience"}).first().click();
    await expect(page).toHaveURL(/\/en\/experience\/[a-z-]+\?from=backend&locked=true$/);
    await expect(page.getByRole("heading", {level: 2, name: "What I did"})).toBeVisible();
    const breadcrumb = page.getByRole("navigation", {name: "Breadcrumb"});
    await expect(breadcrumb.getByRole("link", {name: "Home"})).toHaveAttribute("href", "/en/backend?locked=true#experience");
    await expect(breadcrumb.getByRole("link", {name: "Professional experience"})).toHaveAttribute("href", "/en/experience?locked=true");
    await breadcrumb.getByRole("link", {name: "Professional experience"}).click();
    await expect(page).toHaveURL(/\/en\/experience\?from=backend&locked=true$/);
    await expect(page.getByRole("heading", {level: 1})).toHaveText("Professional experience");
    expect(consoleErrors).toEqual([]);
});

test("tells a job with its titles, timeline, projects and recommendations", async ({page}) => {
    await gotoHydrated(page, "/en/experience/adcom");
    await expect(page.getByRole("heading", {level: 1})).toHaveText("ADCOM GROUP");
    const titles = page.locator('section[aria-labelledby="detail-positions"] li');
    await expect(titles).toHaveCount(2);
    await expect(titles.first()).toContainText("Feb 2025 – Jun 2025");
    const timeline = page.locator('section[aria-labelledby="detail-timeline"]');
    await expect(timeline).toContainText("Became CRM Developer · MarTech Developer · CRM & Cloud Solutions Engineer");
    await expect(timeline.getByRole("link", {name: "Hyper-Personalized Email at Scale begins"})).toHaveAttribute("href", "/en/projects/email-automations");
    // Each project appears as its illustrated tile, linking to its project page.
    const projects = page.locator('section[aria-labelledby="detail-projects"]');
    await expect(projects.locator("a:has(img)")).toHaveCount(5);
    await expect(page.locator('section[aria-labelledby="detail-recommendations"] figure')).toHaveCount(2);
    await expect(page.getByRole("link", {name: "ADCOM-Group"}).first()).toHaveAttribute("href", "/en/organizations/adcom-group");
});

test("lists what was studied during a job", async ({page}) => {
    await gotoHydrated(page, "/es/experience/muv-u");
    const studied = page.locator('section[aria-labelledby="detail-meanwhile"]');
    await expect(studied.getByRole("heading", {name: "Lo que estudiaba mientras tanto"})).toBeVisible();
    await expect(studied.getByRole("link", {name: /IT Specialist – Python/})).toHaveAttribute("href", "/es/certifications/it-specialist-python");
    expect(await studied.getByRole("link").count()).toBeGreaterThan(10);
});

test("copies a page's link with its role view", async ({page, context, consoleErrors}) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await gotoHydrated(page, "/en/experience/adcom?from=crm");
    await page.getByRole("button", {name: "Copy link"}).click();
    await expect(page.getByRole("button", {name: "Link copied"})).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(new URL("/en/experience/adcom?from=crm", page.url()).href);
    expect(consoleErrors).toEqual([]);
});

test("groups the certifications by issuer or by year", async ({page, consoleErrors}) => {
    await gotoHydrated(page, "/en/certifications");
    const grouping = page.getByRole("group", {name: "Group the certifications"});
    await grouping.and(page.locator("[data-interactive]")).waitFor({state: "attached"});
    await expect(page.getByRole("heading", {level: 2, name: "Platzi"})).toBeVisible();
    await grouping.getByRole("button", {name: "By year"}).click();
    await expect(grouping.getByRole("button", {name: "By year"})).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByRole("heading", {level: 2, name: "2024"})).toBeVisible();
    await expect(page.getByRole("heading", {level: 2, name: "Platzi"})).toHaveCount(0);
    await expect(page.locator('section[aria-labelledby^="year-"] li h3')).toHaveCount(29);
    await grouping.getByRole("button", {name: "By issuer"}).click();
    await expect(page.getByRole("heading", {level: 2, name: "Platzi"})).toBeVisible();
    expect(consoleErrors).toEqual([]);
});

test("filters a job's timeline by kind and groups it by year", async ({page, consoleErrors}) => {
    await gotoHydrated(page, "/es/experience/muv-u");
    const timeline = page.locator('section[aria-labelledby="detail-timeline"]');
    const filter = timeline.getByRole("group", {name: "Filtrar la cronología"});
    await filter.and(page.locator("[data-interactive]")).waitFor({state: "attached"});
    const entries = timeline.locator("ol ol > li");
    const total = await entries.count();
    await expect(timeline.getByRole("heading", {level: 3, name: "2023"})).toBeVisible();
    await filter.getByRole("button", {name: /^Certificaciones/}).click();
    await expect(filter.getByRole("button", {name: /^Certificaciones/})).toHaveAttribute("aria-pressed", "true");
    const certificates = await entries.count();
    expect(certificates).toBeGreaterThan(10);
    expect(certificates).toBeLessThan(total);
    await expect(timeline.getByRole("link", {name: "Obtuve la certificación IT Specialist – Python"})).toHaveAttribute("href", "/es/certifications/it-specialist-python");
    await filter.getByRole("button", {name: /^Todo/}).click();
    await expect(entries).toHaveCount(total);
    expect(consoleErrors).toEqual([]);
});

test("shows a certification's credential, where it shows in the work and the stop it shares", async ({
                                                                                                         page,
                                                                                                         consoleErrors
                                                                                                     }) => {
    await gotoHydrated(page, "/en/certifications/dax-power-bi");
    await expect(page.getByRole("heading", {level: 1})).toHaveText("Curso de DAX para Power BI");
    await expect(page.getByRole("link", {name: "View credential"})).toHaveAttribute("href", /^https:\/\/platzi\.com\/p\/sebastian\.lopez361\//);
    await expect(page.getByRole("link", {name: "View credential"})).toHaveAttribute("rel", "noopener noreferrer");
    await expect(page.locator('section[aria-labelledby="detail-applied"]').getByRole("link", {name: /MUV-U S\.A\.S/})).toHaveAttribute("href", "/en/experience/muv-u");
    const context = page.locator('section[aria-labelledby="detail-context"]');
    await expect(context.getByRole("link", {name: /Bachelor's in Computer Engineering/})).toHaveAttribute("href", "/en/education/computer-engineering");
    const siblings = page.locator('section[aria-labelledby="detail-same-stop"]').getByRole("link");
    await expect(siblings).toHaveCount(4);
    await siblings.first().click();
    await expect(page).toHaveURL(/\/en\/certifications\/[a-z-]+$/);
    await expect(page.getByRole("heading", {level: 2, name: "What I learned"})).toBeVisible();
    expect(consoleErrors).toEqual([]);
});

test("tells how a certification was earned, what it covered and what was built in the course", async ({
                                                                                                          page,
                                                                                                          consoleErrors
                                                                                                      }) => {
    await gotoHydrated(page, "/es/certifications/python-django");
    await expect(page.locator('section[aria-labelledby="detail-earned"]')).toContainText("120 horas");
    await expect(page.locator("dl")).toContainText("120 horas");
    const built = page.locator('section[aria-labelledby="detail-built"]');
    await expect(built).toContainText("Django");
    await expect(built.getByRole("link", {name: "Abrir el repositorio"})).toHaveAttribute("href", "https://github.com/SebastianLopezO/PythonDjango");

    await gotoHydrated(page, "/en/certifications/sql-basic");
    await expect(page.locator('section[aria-labelledby="detail-learned"] li')).toHaveCount(5);
    await expect(page.locator('section[aria-labelledby="detail-built"]')).toHaveCount(0);
    expect(consoleErrors).toEqual([]);
});

test("shows a program as its institution publishes it, with its curriculum", async ({page, consoleErrors}) => {
    await gotoHydrated(page, "/en/education/computer-engineering");
    const program = page.locator('section[aria-labelledby="detail-program"]');
    await expect(program).toContainText("Ingeniero Informático");
    await expect(program.getByRole("link", {name: "The program on politecnicojic.edu.co"})).toHaveAttribute("href", /politecnicojic\.edu\.co\/profesionales\/75-ingenieria-informatica$/);
    await expect(page.locator('section[aria-labelledby="detail-curriculum"] h3')).toHaveCount(10);
    await expect(page.locator('section[aria-labelledby="detail-profile"] li').first()).toBeVisible();

    await gotoHydrated(page, "/es/education/programming-technician");
    await expect(page.locator('section[aria-labelledby="detail-program"]')).toContainText("233104");
    expect(consoleErrors).toEqual([]);
});

test("describes the company from its own site on a job's page", async ({page, consoleErrors}) => {
    await gotoHydrated(page, "/es/experience/quipux");
    const company = page.locator('section[aria-labelledby="detail-company"]');
    await expect(company).toContainText("gobierno electrónico");
    await expect(company.getByRole("link", {name: "Quipux en quipux.com"})).toHaveAttribute("href", "https://www.quipux.com/");
    expect(consoleErrors).toEqual([]);
});

test("groups the certifications by issuer", async ({page}) => {
    await gotoHydrated(page, "/es/certifications");
    await expect(page.getByRole("heading", {level: 2, name: /^Platzi/})).toBeVisible();
    await expect(page.getByRole("heading", {level: 2})).toHaveCount(11);
    await expect(page.locator("main h3 a")).toHaveCount(29);
    await expect(page.getByText("29 certificaciones de 11 emisores")).toBeVisible();
});

test("shows an organization's activity, projects and public repositories", async ({page}) => {
    await gotoHydrated(page, "/en/organizations/smartpottech");
    const activity = page.locator('section[aria-labelledby="detail-activity"]');
    await expect(activity).toContainText("2,629 of 2,836 commits");
    await expect(activity).toContainText("93% of the commits made by people");
    await expect(activity.locator("dt")).toHaveText(["2024", "2025", "2026"]);
    // A single project shows its tile and several of its screens, each linking to its page.
    const projects = page.locator('section[aria-labelledby="detail-projects"]');
    await expect(projects.locator("a:has(img)")).toHaveCount(4);
    for (const link of await projects.locator("a:has(img)").all()) expect(await link.getAttribute("href")).toBe("/en/projects/smartpot");
    const repositories = page.locator('section[aria-labelledby="detail-repositories"] a');
    expect(await repositories.count()).toBeGreaterThan(5);
    for (const link of await repositories.all()) expect(await link.getAttribute("href")).toMatch(/^https:\/\/github\.com\/SmartPotTech\//);
    await expect(page.getByRole("link", {name: "Open on GitHub"})).toHaveAttribute("href", "https://github.com/SmartPotTech");
});

test("keeps a private organization's code out of reach and links its job", async ({page}) => {
    await gotoHydrated(page, "/es/organizations/tivenoseducation");
    await expect(page.getByText("Su código es privado")).toBeVisible();
    await expect(page.locator('main a[href^="https://github.com/TivenosEducation"]')).toHaveCount(0);
    await expect(page.locator('section[aria-labelledby="detail-related"]').getByRole("link", {name: /TIVENOS/})).toHaveAttribute("href", "/es/experience/tivenos");
});

test("moves between programs and switches language on the same page", async ({page, consoleErrors}) => {
    await gotoHydrated(page, "/en/education/computer-engineering?from=data");
    await expect(page.locator('section[aria-labelledby="detail-courses"] li')).toHaveCount(36);
    const next = page.getByRole("link", {name: /^Next/});
    await expect(next).toHaveAttribute("href", "/en/education/cybersecurity-diploma");
    await next.click();
    await expect(page).toHaveURL(/\/en\/education\/cybersecurity-diploma\?from=data$/);
    await expect(page.getByRole("heading", {level: 1})).toHaveText("Diploma in Cybersecurity");
    await expect(page.locator('a[hreflang="es"]').first()).toHaveAttribute("href", "/es/education/cybersecurity-diploma");
    expect(consoleErrors).toEqual([]);
});

test("links the detail pages from the home sections and the footer", async ({page}) => {
    await gotoHydrated(page, "/es");
    await expect(page.locator("#about").getByRole("link", {name: "Leer la historia completa"})).toHaveAttribute("href", "/es/about");
    await expect(page.locator("#about").getByRole("link", {name: "Ver el programa"}).first()).toHaveAttribute("href", "/es/education/computer-engineering");
    await expect(page.locator("#about").getByRole("link", {name: /Toda la educación/})).toHaveAttribute("href", "/es/education");
    await expect(page.locator("#certifications h3").getByRole("link", {name: "IT Specialist – Python"})).toHaveAttribute("href", "/es/certifications/it-specialist-python");
    await expect(page.locator("#certifications").getByRole("link", {name: /Todas las certificaciones/})).toHaveAttribute("href", "/es/certifications");
    // Each organization is named on the home and leads to its page.
    await expect(page.locator('#projects a[href^="/es/organizations/"]')).toHaveCount(10);
    await expect(page.locator("#services").getByRole("link", {name: /Ver cada servicio/})).toHaveAttribute("href", /^\/es\/services/);
    await expect(page.locator("#reasons").getByRole("link", {name: /Ver las once razones/})).toHaveAttribute("href", /^\/es\/reasons/);
    await expect(page.locator("#metrics").getByRole("link", {name: /Ver todas las métricas/})).toHaveAttribute("href", /^\/es\/metrics/);
    const explore = page.getByRole("navigation", {name: "Explora el portafolio"});
    await expect(page.locator("#skills").getByRole("link", {name: /Ver las 15 habilidades/})).toHaveAttribute("href", "/es/skills");
    await expect(explore.getByRole("link")).toHaveText(["Proyectos", "Sobre mí", "Experiencia", "Educación", "Certificaciones", "Habilidades técnicas", "Organizaciones en GitHub", "Servicios", "Por qué contratarme", "Métricas de GitHub"]);
    await expect(explore.getByRole("link", {name: "Organizaciones en GitHub"})).toHaveAttribute("href", "/es/organizations");
});

test("gives each service, reason and the metrics its own page", async ({page, consoleErrors}) => {
    await gotoHydrated(page, "/es/services");
    await expect(page.getByRole("heading", {level: 1})).toHaveText("Servicios");
    await page.getByRole("link", {name: /Ingeniería de integraciones y backend/}).click();
    await expect(page).toHaveURL(/\/es\/services\/integrations-and-backend$/);
    await expect(page.getByRole("heading", {level: 1})).toHaveText("Ingeniería de integraciones y backend");
    await expect(page.locator("#detail-scope")).toBeVisible();
    await gotoHydrated(page, "/es/reasons");
    await expect(page.getByRole("heading", {level: 1})).toHaveText("¿Por qué contratarme?");
    await page.getByRole("link", {name: /De la necesidad del negocio a la arquitectura/}).click();
    await expect(page).toHaveURL(/\/es\/reasons\/from-business-to-architecture$/);
    await expect(page.locator('section[aria-labelledby="detail-quote"] mark')).toBeVisible();
    await gotoHydrated(page, "/es/metrics");
    await expect(page.getByRole("heading", {level: 1})).toHaveText("Métricas de GitHub");
    await expect(page.locator("#metrics-areas")).toBeVisible();
    expect(consoleErrors).toEqual([]);
});

test("tells each skill's focus, use and work, and moves between skills", async ({page, consoleErrors}) => {
    await gotoHydrated(page, "/es/skills");
    await expect(page.getByRole("heading", {level: 1})).toHaveText("Habilidades técnicas");
    await expect(page.getByRole("heading", {level: 2})).toHaveCount(15);
    await page.getByRole("link", {name: /Backend & APIs/}).click();
    await expect(page).toHaveURL(/\/es\/skills\/backend-and-apis$/);
    await expect(page.getByRole("heading", {level: 1})).toHaveText("Backend & APIs");
    for (const heading of ["Enfoque", "Qué es", "Para qué sirve", "Herramientas", "Proyectos", "En qué empleos", "Educación y certificaciones", "Servicios donde se nota"]) {
        await expect(page.getByRole("heading", {level: 2, name: heading})).toBeVisible();
    }
    await expect(page.locator('section[aria-labelledby="detail-tools"] li')).toHaveCount(20);
    await expect(page.locator('section[aria-labelledby="detail-projects"] a[href="/es/projects/integration-platform"]')).toBeVisible();
    // Each job names the tools of the group it used.
    await expect(page.locator('section[aria-labelledby="detail-jobs"] a[href="/es/experience/tivenos"]')).toContainText("FastAPI");
    await expect(page.locator('section[aria-labelledby="detail-education"] a[href="/es/certifications/django-two"]')).toBeVisible();
    await expect(page.locator('section[aria-labelledby="detail-services"] a[href="/es/services/integrations-and-backend"]')).toBeVisible();
    const next = page.getByRole("link", {name: /^Siguiente/});
    await expect(next).toHaveAttribute("href", "/es/skills/crm-and-automation");
    // A group without jobs behind it leaves that section out.
    await gotoHydrated(page, "/es/skills/machine-learning-and-ai");
    await expect(page.locator("#detail-jobs")).toHaveCount(0);
    await expect(page.locator("#detail-education")).toBeVisible();
    expect(consoleErrors).toEqual([]);
});

test("answers an unknown detail page with the 404 page", async ({page}) => {
    const response = await page.goto("/en/experience/unknown");
    expect(response?.status()).toBe(404);
    await expect(page.getByText("Page not found")).toBeVisible();
});
