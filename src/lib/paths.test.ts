import {
    alternates,
    buildDetailPath,
    buildPath,
    buildProjectPath,
    detailAlternates,
    isLockedSearch,
    parseDetailPath,
    parsePath,
    parseProjectPath,
    prerenderRoutes,
    projectAlternates,
    roleFromSearch,
} from "@/lib/paths";

describe("paths", () => {
    it("builds language, role, lock and hash combinations", () => {
        expect(buildPath("en", null)).toBe("/en");
        expect(buildPath("es", "backend")).toBe("/es/backend");
        expect(buildPath("en", "data", {locked: true})).toBe("/en/data?locked=true");
        expect(buildPath("es", null, {hash: "experience"})).toBe("/es#experience");
        expect(buildPath("en", "crm", {locked: true, hash: "#contact"})).toBe("/en/crm?locked=true#contact");
    });

    it("parses valid paths and rejects the rest", () => {
        expect(parsePath("/en")).toEqual({lang: "en", role: null});
        expect(parsePath("/es/devops")).toEqual({lang: "es", role: "devops"});
        expect(parsePath("/es/devops/")).toEqual({lang: "es", role: "devops"});
        expect(parsePath("/")).toBeNull();
        expect(parsePath("/fr")).toBeNull();
        expect(parsePath("/EN")).toBeNull();
        expect(parsePath("/en/manager")).toBeNull();
        expect(parsePath("/en/backend/extra")).toBeNull();
    });

    it("detects the lock only with locked=true", () => {
        expect(isLockedSearch("?locked=true")).toBe(true);
        expect(isLockedSearch("?locked=1")).toBe(false);
        expect(isLockedSearch("")).toBe(false);
    });

    it("builds and parses the project pages", () => {
        expect(buildProjectPath("en")).toBe("/en/projects");
        expect(buildProjectPath("es", {slug: "smartpot"})).toBe("/es/projects/smartpot");
        // The view a visitor came from is added when a link is followed (lib/role-links.ts), never written in it.
        expect(buildProjectPath("en", {slug: "gopoli", locked: true})).toBe("/en/projects/gopoli?locked=true");
        expect(parseProjectPath("/en/projects")).toEqual({lang: "en", slug: null});
        expect(parseProjectPath("/es/projects/integration-platform/")).toEqual({
            lang: "es",
            slug: "integration-platform"
        });
        expect(parseProjectPath("/en/projects/unknown")).toBeNull();
        expect(parseProjectPath("/en/backend")).toBeNull();
        expect(parsePath("/en/projects")).toBeNull();
        expect(roleFromSearch("?from=crm&locked=true")).toBe("crm");
        expect(roleFromSearch("?from=manager")).toBeNull();
    });

    it("builds and parses the job, program, certification and organization pages", () => {
        expect(buildDetailPath("en", "experience")).toBe("/en/experience");
        expect(buildDetailPath("es", "experience", {slug: "muv-u"})).toBe("/es/experience/muv-u");
        expect(buildDetailPath("en", "certifications", {
            slug: "it-specialist-python",
            locked: true,
            hash: "detail-applied"
        }))
            .toBe("/en/certifications/it-specialist-python?locked=true#detail-applied");
        expect(parseDetailPath("/es/education")).toEqual({lang: "es", collection: "education", slug: null});
        expect(parseDetailPath("/en/organizations/smartpottech/")).toEqual({
            lang: "en",
            collection: "organizations",
            slug: "smartpottech"
        });
        expect(parseDetailPath("/en/certifications/power-bi-analysis")).toEqual({
            lang: "en",
            collection: "certifications",
            slug: "power-bi-analysis"
        });
        expect(parseDetailPath("/en/experience/unknown")).toBeNull();
        expect(parseDetailPath("/en/education/muv-u")).toBeNull();
        expect(parseDetailPath("/fr/experience")).toBeNull();
        expect(parseDetailPath("/en/projects")).toBeNull();
        expect(parsePath("/en/experience")).toBeNull();
        expect(parseProjectPath("/en/experience")).toBeNull();
    });

    it("lists the twelve profile pages, the sixty-six project pages and the hundred and forty-eight detail pages", () => {
        const slugs = [
            "integration-platform", "smartpot", "gopoli", "martech", "email-signatures", "observability", "crm-widgets", "admissions-forms",
            "crm-snapshots", "landing-platform", "email-automations", "zoho-toolkit", "real-estate-site", "collection-automation", "peppercrm", "portfolio", "taurus",
            "computer-engineering", "cybersecurity-labs", "programming-technician", "technical-high-school",
            "lettuce-diseases", "radar-imaging", "school-services", "fashionline", "tdd-six-languages", "artificial-intelligence", "huffman-compressor", "carspace", "sitepersist", "video-to-ascii", "the-company-dream",
        ];
        const details = {
            about: [],
            experience: ["tivenos", "adcom", "muv-u", "quipux"],
            education: ["computer-engineering", "cybersecurity-diploma", "programming-technician", "pascual-bravo", "inem"],
            certifications: [
                "it-specialist-python", "dax-power-bi", "power-bi-analysis", "data-science-ai", "cybersecurity", "problem-solving", "excel-mastery",
                "excel-data-analysis", "search-console-seo", "green-digital-skills", "data-visualization", "web-programming", "iot-protocols",
                "git-github", "software-engineering", "django-two", "practical-javascript", "basic-programming", "python-fundamentals", "hacklab",
                "java-basic", "css", "python-django", "python-basic", "excel-professional", "sql-basic", "programming-fundamentals", "python-eia",
                "html",
            ],
            skills: [
                "backend-and-apis", "crm-and-automation", "data-and-business-intelligence", "devops-and-observability", "databases",
                "frontend", "cloud-and-hosting", "testing-and-quality", "programming-languages", "security", "machine-learning-and-ai",
                "iot-and-embedded", "networking", "developer-tools", "computer-science-foundations",
            ],
            organizations: [
                "tivenoseducation", "adcom-group", "smartpottech", "gopoli", "peppertechdev", "engineeringsebastian-s", "taurussebastian-s",
                "testlabdata", "technicalsebastians", "vocationalsebastian-s",
            ],
            services: [
                "integrations-and-backend", "zoho-crm", "web-and-landing-pages", "business-intelligence-and-data",
                "process-automation", "infrastructure-and-deployment", "observability-and-reliability", "technical-consulting",
            ],
            reasons: [
                "from-business-to-architecture", "less-manual-work", "connected-data", "from-question-to-production",
                "marketing-finance-and-it", "calm-when-something-breaks", "technology-that-serves-the-business", "learns-fast-and-teaches",
                "careful-with-data", "shares-what-he-knows", "delivers-more-than-asked",
            ],
            // The metrics are an index alone, with no page under it.
            metrics: [],
        };
        expect(prerenderRoutes.map((route) => route.path)).toEqual([
            "/en", "/en/backend", "/en/crm", "/en/data", "/en/devops", "/en/fullstack",
            "/es", "/es/backend", "/es/crm", "/es/data", "/es/devops", "/es/fullstack",
            ...["en", "es"].flatMap((lang) => [`/${lang}/projects`, ...slugs.map((slug) => `/${lang}/projects/${slug}`)]),
            ...["en", "es"].flatMap((lang) =>
                Object.entries(details).flatMap(([collection, items]) => [`/${lang}/${collection}`, ...items.map((slug) => `/${lang}/${collection}/${slug}`)]),
            ),
        ]);
        expect(prerenderRoutes).toHaveLength(260);
    });

    it("links every page to both languages and an English default", () => {
        expect(alternates("crm")).toEqual([
            {hreflang: "en", href: "https://sebastianlopezo.page/en/crm"},
            {hreflang: "es", href: "https://sebastianlopezo.page/es/crm"},
            {hreflang: "x-default", href: "https://sebastianlopezo.page/en/crm"},
        ]);
        expect(projectAlternates("martech")).toEqual([
            {hreflang: "en", href: "https://sebastianlopezo.page/en/projects/martech"},
            {hreflang: "es", href: "https://sebastianlopezo.page/es/projects/martech"},
            {hreflang: "x-default", href: "https://sebastianlopezo.page/en/projects/martech"},
        ]);
        expect(detailAlternates("organizations", "gopoli")).toEqual([
            {hreflang: "en", href: "https://sebastianlopezo.page/en/organizations/gopoli"},
            {hreflang: "es", href: "https://sebastianlopezo.page/es/organizations/gopoli"},
            {hreflang: "x-default", href: "https://sebastianlopezo.page/en/organizations/gopoli"},
        ]);
    });
});
