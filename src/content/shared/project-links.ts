import type {CaseStudyId} from "@/types/case-study";
import type {ExperienceId} from "@/types/content";
import type {ProjectId} from "@/types/project";

/**
 * The URL segment of every project page. The router and the startup bundle need only these strings; the projects'
 * facts and text load with the sections and pages that show them.
 */
export const PROJECT_SLUG = {
    integrationPlatform: "integration-platform",
    smartpot: "smartpot",
    gopoli: "gopoli",
    martech: "martech",
    emailSignatures: "email-signatures",
    observability: "observability",
    crmWidgets: "crm-widgets",
    admissionsForms: "admissions-forms",
    crmSnapshots: "crm-snapshots",
    landingPlatform: "landing-platform",
    emailAutomations: "email-automations",
    zohoToolkit: "zoho-toolkit",
    realEstateSite: "real-estate-site",
    collectionAutomation: "collection-automation",
    peppercrm: "peppercrm",
    portfolio: "portfolio",
    taurus: "taurus",
    engineering: "computer-engineering",
    cybersecurityLabs: "cybersecurity-labs",
    technical: "programming-technician",
    vocational: "technical-high-school",
    lettuceDiseases: "lettuce-diseases",
    radarImaging: "radar-imaging",
    schoolServices: "school-services",
    fashionLine: "fashionline",
    tddPolyglot: "tdd-six-languages",
    aiTechniques: "artificial-intelligence",
    dataCompressor: "huffman-compressor",
    carSpace: "carspace",
    sitePersist: "sitepersist",
    videoToAscii: "video-to-ascii",
    companyDream: "the-company-dream",
} as const satisfies Record<ProjectId, string>;

export type ProjectSlug = (typeof PROJECT_SLUG)[ProjectId];

export const PROJECT_SLUGS = Object.values(PROJECT_SLUG) as ProjectSlug[];

export const isProjectSlug = (value: unknown): value is ProjectSlug => PROJECT_SLUGS.includes(value as ProjectSlug);

export const projectIdBySlug = (slug: ProjectSlug) =>
    (Object.keys(PROJECT_SLUG) as ProjectId[]).find((id) => PROJECT_SLUG[id] === slug)!;

/** The projects told as a full case study: problem, constraints, approach, decisions and results. */
export const CASE_STUDY_IDS = ["integrationPlatform", "smartpot", "gopoli", "martech", "emailSignatures"] as const satisfies readonly CaseStudyId[];

export const isCaseStudy = (id: ProjectId): id is CaseStudyId => (CASE_STUDY_IDS as readonly string[]).includes(id);

/** The projects each job card links to on the home page, the case studies first. */
export const EXPERIENCE_PROJECTS: Partial<Record<ExperienceId, ProjectId[]>> = {
    tivenos: ["integrationPlatform", "emailSignatures", "observability", "crmWidgets", "admissionsForms", "crmSnapshots"],
    adcom: ["martech", "landingPlatform", "emailAutomations", "zohoToolkit", "realEstateSite"],
    quipux: ["collectionAutomation"],
};
