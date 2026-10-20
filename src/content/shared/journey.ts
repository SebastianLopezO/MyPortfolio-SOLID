import type {
    CapabilityId,
    GoalId,
    JourneyLineId,
    Level,
    MilestoneFacts,
    RadarItemFacts,
    RadarQuadrant,
    RadarRing,
    SdgFacts,
} from "@/types/journey";
import {activityByYear, STATS_DAY, streak} from "@/content/shared/github";

export const JOURNEY_START = 2019;
export const JOURNEY_END = 2030;
export const JOURNEY_YEARS = Array.from({length: JOURNEY_END - JOURNEY_START + 1}, (_, index) => JOURNEY_START + index);

/** Top to bottom; the order matches the validated categorical palette, so neighbors stay distinguishable. */
export const JOURNEY_LINES: JourneyLineId[] = ["education", "web", "backend", "crm", "data", "devops", "security"];

export const CAPABILITIES: CapabilityId[] = ["foundations", "web", "backend", "databases", "crm", "data", "devops", "security", "ai"];

export const milestones: MilestoneFacts[] = [
    {
        id: "inem",
        start: "2019-02",
        end: "2021-11",
        kind: "education",
        lines: ["education", "web"],
        areas: ["foundations", "web"],
        anchor: "about",
        major: true
    },
    {
        id: "pascual",
        start: "2020-02",
        end: "2021-11",
        kind: "education",
        lines: ["education", "web"],
        areas: ["foundations", "databases", "web"],
        anchor: "about",
        major: true
    },
    {id: "html", start: "2020-12", kind: "certification", lines: ["web"], areas: ["web"], anchor: "certifications"},
    {
        id: "firstPython",
        start: "2021-05",
        end: "2021-12",
        kind: "certification",
        lines: ["backend"],
        areas: ["foundations", "backend"],
        anchor: "certifications"
    },
    {
        id: "sena",
        start: "2022-01",
        end: "2023-12",
        kind: "education",
        lines: ["education", "web", "backend"],
        areas: ["web", "backend", "databases"],
        anchor: "about",
        major: true
    },
    {
        id: "politecnico",
        start: "2022-02",
        end: "2027-03",
        kind: "education",
        lines: ["education"],
        areas: ["foundations", "ai", "security"],
        anchor: "about",
        major: true
    },
    {id: "firstCommit", start: "2022-02", kind: "project", lines: ["web"], areas: ["web"], anchor: "metrics"},
    {
        id: "testlab",
        start: "2022-06",
        end: "2023-06",
        kind: "project",
        lines: ["data"],
        areas: ["data", "backend"],
        anchor: "projects"
    },
    {
        id: "quipux",
        start: "2022-08",
        end: "2023-05",
        kind: "work",
        lines: ["data"],
        areas: ["data"],
        sdgs: [9],
        anchor: "experience",
        major: true
    },
    {
        id: "skillCertificates",
        start: "2022-05",
        end: "2023-03",
        kind: "certification",
        lines: ["backend", "data"],
        areas: ["foundations", "databases", "backend", "data"],
        anchor: "certifications"
    },
    {
        id: "django",
        start: "2022-12",
        end: "2023-11",
        kind: "certification",
        lines: ["web", "backend"],
        areas: ["web", "backend"],
        anchor: "certifications"
    },
    {
        id: "muvu",
        start: "2023-07",
        end: "2025-01",
        kind: "work",
        lines: ["backend", "crm", "data"],
        areas: ["data", "crm", "backend", "databases"],
        sdgs: [8],
        anchor: "experience",
        major: true
    },
    {
        id: "hacklab",
        start: "2023-08",
        kind: "certification",
        lines: ["security"],
        areas: ["security"],
        sdgs: [16],
        anchor: "certifications"
    },
    {
        id: "pythonSpecialist",
        start: "2023-11",
        kind: "certification",
        lines: ["backend"],
        areas: ["backend"],
        anchor: "certifications"
    },
    {
        id: "platziRoute",
        start: "2023-11",
        end: "2023-12",
        kind: "certification",
        lines: ["web", "devops"],
        areas: ["foundations", "web", "devops"],
        anchor: "certifications"
    },
    {
        id: "enganchaTic",
        start: "2023-12",
        kind: "certification",
        lines: ["web", "data", "security"],
        areas: ["data", "ai", "security", "web"],
        sdgs: [4],
        anchor: "certifications"
    },
    {
        id: "greenSkills",
        start: "2024-03",
        kind: "certification",
        lines: ["education"],
        areas: ["foundations"],
        sdgs: [13],
        anchor: "certifications"
    },
    {
        id: "biCertificates",
        start: "2024-06",
        end: "2024-09",
        kind: "certification",
        lines: ["data", "web"],
        areas: ["data", "web"],
        anchor: "certifications"
    },
    {
        id: "smartpot",
        start: "2024-09",
        end: null,
        kind: "project",
        lines: ["web", "backend", "data", "devops"],
        areas: ["web", "backend", "databases", "data", "devops", "ai"],
        sdgs: [2, 9],
        anchor: "projects",
        major: true
    },
    {
        id: "taurus",
        start: "2024-11",
        end: "2024-12",
        kind: "project",
        lines: ["backend", "data"],
        areas: ["data", "backend"],
        anchor: "projects"
    },
    {
        id: "adcom",
        start: "2025-02",
        end: null,
        kind: "work",
        lines: ["web", "crm"],
        areas: ["crm", "web"],
        sdgs: [4, 8],
        anchor: "experience",
        major: true
    },
    {
        id: "peppercrm",
        start: "2025-02",
        end: "2025-11",
        kind: "project",
        lines: ["backend", "crm"],
        areas: ["backend", "databases", "security"],
        sdgs: [8],
        anchor: "projects"
    },
    {
        id: "tivenos",
        start: "2025-06",
        end: null,
        kind: "work",
        lines: ["backend", "crm", "data", "devops"],
        areas: ["backend", "crm", "databases", "data", "devops"],
        sdgs: [4, 9],
        anchor: "experience",
        major: true
    },
    {
        id: "zohoToolkit",
        start: "2025-07",
        end: null,
        kind: "project",
        lines: ["crm", "data"],
        areas: ["crm", "data"],
        anchor: "projects"
    },
    {
        id: "emailAutomations",
        start: "2025-08",
        end: null,
        kind: "project",
        lines: ["backend", "data"],
        areas: ["backend", "data", "devops"],
        anchor: "projects"
    },
    {
        id: "networks",
        start: "2025-08",
        end: "2025-12",
        kind: "education",
        lines: ["education", "devops"],
        areas: ["foundations", "devops", "security"],
        sdgs: [9],
        anchor: "projects"
    },
    {
        id: "aiCourses",
        start: "2025-09",
        end: "2026-07",
        kind: "education",
        lines: ["education", "data"],
        areas: ["ai", "data"],
        anchor: "projects"
    },
    {
        id: "distributed",
        start: "2025-09",
        end: "2026-07",
        kind: "education",
        lines: ["education", "backend"],
        areas: ["backend", "foundations"],
        anchor: "projects"
    },
    {
        id: "landingPlatform",
        start: "2025-10",
        end: null,
        kind: "project",
        lines: ["web", "devops"],
        areas: ["devops", "web"],
        sdgs: [4],
        anchor: "projects"
    },
    {
        id: "gopoli",
        start: "2026-03",
        end: null,
        kind: "project",
        lines: ["web", "backend", "devops"],
        areas: ["web", "backend", "databases", "devops"],
        sdgs: [11, 4],
        anchor: "projects",
        major: true
    },
    {
        id: "observability",
        start: "2026-06",
        end: null,
        kind: "project",
        lines: ["devops"],
        areas: ["devops"],
        sdgs: [9],
        anchor: "projects"
    },
    {
        id: "realEstateSite",
        start: "2026-07",
        end: null,
        kind: "project",
        lines: ["web", "devops"],
        areas: ["web", "devops"],
        anchor: "projects"
    },
    {
        id: "emailSignatures",
        start: "2026-08",
        end: null,
        kind: "project",
        lines: ["web"],
        areas: ["web", "backend"],
        anchor: "projects"
    },
    {
        id: "cyberDiploma",
        start: "2026-09",
        end: "2026-12",
        kind: "education",
        lines: ["security"],
        areas: ["security"],
        sdgs: [16],
        anchor: "about",
        major: true
    },
    {
        id: "portfolio",
        start: "2026-10",
        kind: "project",
        lines: ["web", "devops"],
        areas: ["web", "devops"],
        anchor: "projects"
    },
    {
        id: "crmWidgets",
        start: "2026-10",
        end: null,
        kind: "project",
        lines: ["crm"],
        areas: ["crm", "web"],
        sdgs: [4],
        anchor: "projects"
    },
    {id: "graduation", start: "2027-03", kind: "goal", lines: ["education"], areas: ["foundations"], major: true},
    {
        id: "dataScience",
        start: "2027-07",
        end: "2028-06",
        kind: "goal",
        lines: ["education", "data"],
        areas: ["data", "ai"],
        sdgs: [4, 9],
        major: true
    },
    {
        id: "cybersecurity",
        start: "2028-08",
        end: "2030-06",
        kind: "goal",
        lines: ["education", "security"],
        areas: ["security"],
        sdgs: [9, 16],
        major: true
    },
    {
        id: "vision",
        start: "2030-09",
        kind: "goal",
        lines: ["backend", "data", "security"],
        areas: ["backend", "data", "security"],
        sdgs: [4, 16],
        major: true
    },
];

export const GOALS: GoalId[] = ["graduation", "dataScience", "cybersecurity", "vision"];

/** Self-assessed levels for 2019–2030; from 2027 on they are targets. */
export const capabilityLevels: Record<CapabilityId, Level[]> = {
    foundations: [1, 2, 2, 3, 3, 3, 3, 3, 4, 4, 4, 4],
    web: [1, 1, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3],
    backend: [0, 0, 1, 2, 2, 3, 4, 4, 4, 4, 4, 4],
    databases: [0, 1, 1, 2, 3, 3, 3, 3, 3, 4, 4, 4],
    crm: [0, 0, 0, 0, 2, 2, 4, 4, 4, 4, 4, 4],
    data: [0, 0, 0, 2, 3, 3, 3, 3, 4, 4, 4, 4],
    devops: [0, 0, 0, 0, 1, 2, 3, 3, 3, 3, 4, 4],
    security: [0, 0, 0, 0, 1, 1, 2, 2, 2, 3, 3, 4],
    ai: [0, 0, 0, 0, 1, 2, 2, 2, 3, 3, 3, 3],
};

/** Days with at least one contribution per year and the current streak, from the profile repository's stats. */
export const githubActivity = {
    asOf: STATS_DAY,
    years: activityByYear,
    streak: {from: streak.from, to: streak.to, days: streak.days},
};

export const RADAR_QUADRANTS: RadarQuadrant[] = ["build", "data", "platforms", "security"];
export const RADAR_RINGS: RadarRing[] = ["core", "growing", "exploring", "paused"];

export const radarItems: RadarItemFacts[] = [
    {id: "fastapi", quadrant: "build", ring: "core"},
    {id: "zoho", quadrant: "build", ring: "core"},
    {id: "integrations", quadrant: "build", ring: "core"},
    {id: "spring", quadrant: "build", ring: "growing"},
    {id: "react", quadrant: "build", ring: "growing"},
    {id: "jobs", quadrant: "build", ring: "growing"},
    {id: "events", quadrant: "build", ring: "exploring"},
    {id: "graphql", quadrant: "build", ring: "exploring"},
    {id: "php", quadrant: "build", ring: "paused"},
    {id: "dotnet", quadrant: "build", ring: "paused"},
    {id: "sql", quadrant: "data", ring: "core"},
    {id: "pandas", quadrant: "data", ring: "core"},
    {id: "bi", quadrant: "data", ring: "core"},
    {id: "ml", quadrant: "data", ring: "growing"},
    {id: "pipelines", quadrant: "data", ring: "growing"},
    {id: "warehouse", quadrant: "data", ring: "growing"},
    {id: "mlops", quadrant: "data", ring: "exploring"},
    {id: "llm", quadrant: "data", ring: "growing"},
    {id: "vba", quadrant: "data", ring: "paused"},
    {id: "docker", quadrant: "platforms", ring: "core"},
    {id: "actions", quadrant: "platforms", ring: "core"},
    {id: "observability", quadrant: "platforms", ring: "growing"},
    {id: "linux", quadrant: "platforms", ring: "growing"},
    {id: "networks", quadrant: "platforms", ring: "growing"},
    {id: "iot", quadrant: "platforms", ring: "growing"},
    {id: "kubernetes", quadrant: "platforms", ring: "exploring"},
    {id: "cloud", quadrant: "platforms", ring: "exploring"},
    {id: "hardening", quadrant: "security", ring: "core"},
    {id: "auth", quadrant: "security", ring: "core"},
    {id: "secrets", quadrant: "security", ring: "core"},
    {id: "testing", quadrant: "security", ring: "growing"},
    {id: "scanning", quadrant: "security", ring: "growing"},
    {id: "appsec", quadrant: "security", ring: "exploring"},
    {id: "hacking", quadrant: "security", ring: "growing"},
    {id: "governance", quadrant: "security", ring: "exploring"},
];

export const sdgs: SdgFacts[] = [
    {id: 2, color: "var(--color-sdg-2)", onColor: "dark"},
    {id: 4, color: "var(--color-sdg-4)", onColor: "light"},
    {id: 8, color: "var(--color-sdg-8)", onColor: "light"},
    {id: 9, color: "var(--color-sdg-9)", onColor: "dark"},
    {id: 11, color: "var(--color-sdg-11)", onColor: "dark"},
    {id: 13, color: "var(--color-sdg-13)", onColor: "light"},
    {id: 16, color: "var(--color-sdg-16)", onColor: "light"},
];
