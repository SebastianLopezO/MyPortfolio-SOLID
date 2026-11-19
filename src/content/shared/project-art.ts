// Written by scripts/render-illustrations.mjs from scripts/illustrations; run `pnpm illustrations` to change it.
import type {SkillGroupId} from "@/types/content";
import type {ProjectId} from "@/types/project";

/** The color layer behind an illustration (tokens.css, --color-tile-*). */
export type Tile = "sky" | "mint" | "peach" | "lilac" | "butter" | "rose" | "sage" | "stone";

/** Each project's illustration in public/ and the tile it sits on. */
export const PROJECT_ART: Record<ProjectId, { file: string; tile: Tile }> = {
    smartpot: {file: "/illustrations/projects/smartpot.svg", tile: "mint"},
    gopoli: {file: "/illustrations/projects/gopoli.svg", tile: "sky"},
    peppercrm: {file: "/illustrations/projects/peppercrm.svg", tile: "rose"},
    portfolio: {file: "/illustrations/projects/portfolio.svg", tile: "lilac"},
    taurus: {file: "/illustrations/projects/taurus.svg", tile: "butter"},
    integrationPlatform: {file: "/illustrations/projects/integration-platform.svg", tile: "sky"},
    observability: {file: "/illustrations/projects/observability.svg", tile: "sage"},
    crmWidgets: {file: "/illustrations/projects/crm-widgets.svg", tile: "peach"},
    admissionsForms: {file: "/illustrations/projects/admissions-forms.svg", tile: "sky"},
    crmSnapshots: {file: "/illustrations/projects/crm-snapshots.svg", tile: "lilac"},
    emailSignatures: {file: "/illustrations/projects/email-signatures.svg", tile: "butter"},
    martech: {file: "/illustrations/projects/martech.svg", tile: "peach"},
    landingPlatform: {file: "/illustrations/projects/landing-platform.svg", tile: "sky"},
    emailAutomations: {file: "/illustrations/projects/email-automations.svg", tile: "rose"},
    zohoToolkit: {file: "/illustrations/projects/zoho-toolkit.svg", tile: "stone"},
    realEstateSite: {file: "/illustrations/projects/real-estate-site.svg", tile: "lilac"},
    collectionAutomation: {file: "/illustrations/projects/collection-automation.svg", tile: "butter"},
    engineering: {file: "/illustrations/projects/engineering.svg", tile: "sky"},
    cybersecurityLabs: {file: "/illustrations/projects/cybersecurity-labs.svg", tile: "sage"},
    technical: {file: "/illustrations/projects/technical.svg", tile: "sky"},
    vocational: {file: "/illustrations/projects/vocational.svg", tile: "peach"},
    lettuceDiseases: {file: "/illustrations/projects/lettuce-diseases.svg", tile: "sage"},
    radarImaging: {file: "/illustrations/projects/radar-imaging.svg", tile: "stone"},
    schoolServices: {file: "/illustrations/projects/school-services.svg", tile: "mint"},
    fashionLine: {file: "/illustrations/projects/fashion-line.svg", tile: "rose"},
    tddPolyglot: {file: "/illustrations/projects/tdd-polyglot.svg", tile: "sage"},
    aiTechniques: {file: "/illustrations/projects/ai-techniques.svg", tile: "lilac"},
    dataCompressor: {file: "/illustrations/projects/data-compressor.svg", tile: "butter"},
    carSpace: {file: "/illustrations/projects/car-space.svg", tile: "stone"},
    sitePersist: {file: "/illustrations/projects/site-persist.svg", tile: "sky"},
    videoToAscii: {file: "/illustrations/projects/video-to-ascii.svg", tile: "stone"},
    companyDream: {file: "/illustrations/projects/company-dream.svg", tile: "mint"},
};

/** The hero's board, and where the portrait sits in it: a box in percent of the board, its corners in percent of its width. */
export const HERO_ART = {
    file: "/illustrations/hero.svg",
    width: 800,
    height: 800,
    portrait: {left: 26.75, top: 25.5, width: 46.5, height: 46.5, radius: 13.44},
} as const;

/** The devices on the hero's board: the project each one stands for and the box it fills, in percent of the board. */
export const HERO_SPOTS = [
    {id: "crmWidgets", left: 5.13, top: 4.25, width: 17.5, height: 19.75},
    {id: "observability", left: 76.88, top: 7.25, width: 18.75, height: 16},
    {id: "martech", left: 1.88, top: 40.75, width: 15.88, height: 16.63},
    {id: "zohoToolkit", left: 81.63, top: 40.88, width: 16.75, height: 15},
    {id: "crmSnapshots", left: 5, top: 75.13, width: 20.63, height: 14.37},
    {id: "smartpot", left: 76.38, top: 72.88, width: 20.88, height: 20},
] as const satisfies readonly { id: ProjectId; left: number; top: number; width: number; height: number }[];

export type HeroDeviceId = (typeof HERO_SPOTS)[number]["id"];

/** The object that stands for each group of tools on the lab board. */
export const LAB_ART: Record<SkillGroupId, string> = {
    languages: "/illustrations/projects/vocational.svg",
    backend: "/illustrations/projects/integration-platform.svg",
    crm: "/illustrations/projects/crm-widgets.svg",
    data: "/illustrations/projects/taurus.svg",
    databases: "/illustrations/lab/databases.svg",
    frontend: "/illustrations/projects/landing-platform.svg",
    devops: "/illustrations/projects/observability.svg",
    cloud: "/illustrations/lab/cloud.svg",
    security: "/illustrations/projects/cybersecurity-labs.svg",
    networks: "/illustrations/lab/networks.svg",
    iot: "/illustrations/projects/smartpot.svg",
    ai: "/illustrations/projects/ai-techniques.svg",
    testing: "/illustrations/projects/tdd-polyglot.svg",
    tools: "/illustrations/projects/zoho-toolkit.svg",
    foundations: "/illustrations/projects/data-compressor.svg",
};
