import {PROJECT_SLUG} from "@/content/shared/project-links";
import type {CaseStudyFacts} from "@/types/case-study";

/**
 * Case studies in reading order. Figures come from the repositories, the GitHub API and the observability
 * configuration; docs/content.md records where and when each one was read. Clients stay anonymous.
 */
export const caseStudies: CaseStudyFacts[] = [
    {
        id: "integrationPlatform",
        start: "2025-06",
        end: null,
        team: null,
        links: {},
        tech: ["Python", "FastAPI", "Pydantic", "uv", "PostgreSQL", "SQL Server", "SOAP", "Zeep", "Zoho CRM", "Deluge", "Docker", "GHCR", "GitHub Actions", "Nginx", "OpenTelemetry", "Prometheus", "Loki", "Tempo", "Grafana"],
        figures: [
            {id: "services", value: 20, atLeast: true},
            {id: "institutions", value: 15, atLeast: true},
            {id: "probes", value: 18},
            {id: "alerts", value: 12},
        ],
        diagram: {
            layers: [
                {id: "sources", nodes: ["sis", "sqlServer", "ftp", "rest"]},
                {id: "services", nodes: ["perClient", "jobs", "runLog"]},
                {id: "crm", nodes: ["oauth", "bulk", "coql"]},
            ],
            base: {id: "operations", nodes: ["delivery", "telemetry", "alerts"]},
        },
        images: [
            {
                id: "api",
                base: "/projects/integration-api-docs",
                widths: [480, 960, 1440],
                width: 1440,
                height: 714,
                recreation: true
            },
        ],
    },
    {
        id: "smartpot",
        start: "2024-09",
        end: null,
        team: 5,
        links: {demo: "https://smartpot.app", code: "https://github.com/SmartPotTech"},
        tech: ["Java 21", "Spring Boot 4", "MongoDB", "Redis", "MQTT", "Mosquitto", "FastAPI", "scikit-learn", "MicroPython", "ESP32", "React 19", "TypeScript", "Vite", "Tailwind CSS", "Docker", "GitHub Actions", "Kubernetes"],
        figures: [
            {id: "commits", value: 93, unit: "%"},
            {id: "apiTests", value: 139},
            {id: "e2e", value: 35},
            {id: "repositories", value: 11},
        ],
        diagram: {
            layers: [
                {id: "field", nodes: ["firmware", "simulator"]},
                {id: "messaging", nodes: ["broker", "tls", "dynsec"]},
                {id: "platform", nodes: ["api", "storage", "ai"]},
                {id: "people", nodes: ["pwa", "telegram"]},
            ],
            base: {id: "delivery", nodes: ["images", "deploy", "kubernetes"]},
        },
        images: [
            {id: "panel", base: "/projects/smartpot-panel", widths: [480, 960, 1440], width: 1440, height: 714},
            {id: "crop", base: "/projects/smartpot-crop", widths: [480, 960, 1440], width: 1440, height: 714},
            {id: "alerts", base: "/projects/smartpot-alerts", widths: [480, 960, 1440], width: 1440, height: 714},
        ],
    },
    {
        id: "gopoli",
        start: "2026-03",
        end: null,
        team: 4,
        links: {demo: "https://gopoli-web.sebastianlopezo.page", code: "https://github.com/GoPoli"},
        tech: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Leaflet", "OSRM", "Spring Boot 4", "Java 17", "PostgreSQL 16", "JWT", "Docker", "GitHub Actions"],
        figures: [
            {id: "apiTests", value: 41},
            {id: "webTests", value: 18},
            {id: "smoke", value: 31},
        ],
        diagram: {
            layers: [
                {id: "browser", nodes: ["pwa", "maps", "routes"]},
                {id: "edge", nodes: ["nginx"]},
                {id: "services", nodes: ["api", "database"]},
            ],
            base: {id: "delivery", nodes: ["images", "deploy", "health"]},
        },
        // The web app at desktop width, from the local demo stack; phones get its phone screens instead.
        images: [
            {
                id: "route",
                base: "/projects/gopoli-route-desktop",
                widths: [480, 960, 1440],
                width: 1440,
                height: 714,
                credit: {text: "© OpenStreetMap contributors", href: "https://www.openstreetmap.org/copyright"}
            },
            {id: "group", base: "/projects/gopoli-group-desktop", widths: [480, 960, 1440], width: 1440, height: 714},
            {id: "chat", base: "/projects/gopoli-chat-desktop", widths: [480, 960, 1440], width: 1440, height: 714},
        ],
        phoneImages: [
            {
                id: "routePhone",
                base: "/projects/gopoli-route",
                widths: [320, 480, 780],
                width: 780,
                height: 1560,
                credit: {text: "© OpenStreetMap contributors", href: "https://www.openstreetmap.org/copyright"}
            },
            {id: "groupPhone", base: "/projects/gopoli-group", widths: [320, 480, 780], width: 780, height: 1560},
            {id: "chatPhone", base: "/projects/gopoli-chat", widths: [320, 480, 780], width: 780, height: 1560},
        ],
    },
    {
        id: "martech",
        start: "2025-02",
        end: null,
        team: null,
        links: {},
        tech: ["React", "TypeScript", "Vite", "Zoho CRM", "Zoho Forms", "Zoho Creator", "Deluge", "Google Tag Manager", "Docker", "Nginx", "n8n"],
        figures: [
            {id: "landings", value: 90, atLeast: true},
            {id: "institutions", value: 5},
        ],
        diagram: {
            layers: [
                {id: "channels", nodes: ["landings", "whatsapp", "ads"]},
                {id: "capture", nodes: ["forms", "webhooks", "gtm"]},
                {id: "crm", nodes: ["deluge", "creator", "dapta"]},
            ],
        },
        images: [
            {
                id: "landing",
                base: "/projects/martech-landing",
                widths: [480, 960, 1440],
                width: 1440,
                height: 714,
                recreation: true
            },
        ],
    },
    {
        id: "emailSignatures",
        start: "2026-08",
        end: null,
        team: 1,
        links: {},
        tech: ["Python", "FastAPI", "Jinja2", "HTML email", "Docker", "Prometheus"],
        figures: [
            {id: "brands", value: 5},
            {id: "themes", value: 3},
        ],
        diagram: {
            layers: [
                {id: "input", nodes: ["form", "csv"]},
                {id: "service", nodes: ["rules", "wordmark", "audit"]},
                {id: "output", nodes: ["clipboard", "htm", "zip"]},
                {id: "clients", nodes: ["hosted", "outlook", "blocked"]},
            ],
        },
        images: [
            {
                id: "signature",
                base: "/projects/email-signature",
                widths: [480, 960, 1440],
                width: 1440,
                height: 714,
                recreation: true
            },
        ],
    },
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((item) => PROJECT_SLUG[item.id] === slug);

export const caseStudyById = (id: CaseStudyFacts["id"]) => caseStudies.find((item) => item.id === id)!;
