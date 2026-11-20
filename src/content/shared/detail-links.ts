import type {
    BenefitId,
    CertificationId,
    EducationId,
    ExperienceId,
    OrganizationId,
    SectionCopyKey,
    ServiceId,
    SkillGroupId
} from "@/types/content";

/**
 * The collections that get a page per item besides the projects: each job, program, certification, group of tools,
 * GitHub organization, service and reason to hire me, with its index at /{lang}/{collection}. The metrics are an index
 * alone: the home keeps the headline figures and links to its page. The router and the startup bundle need only these
 * strings; the pages' text and facts load with the pages.
 */
export const DETAIL_COLLECTIONS = ["experience", "education", "certifications", "skills", "organizations", "services", "reasons", "metrics"] as const;

export type DetailCollection = (typeof DETAIL_COLLECTIONS)[number];

export const isDetailCollection = (value: unknown): value is DetailCollection => DETAIL_COLLECTIONS.includes(value as DetailCollection);

/**
 * The home sections whose text the detail pages reuse: job titles, degrees, certificates, the names of the groups of
 * tools, project names and quotes.
 */
export const DETAIL_SECTION_COPIES = ["experience", "about", "certifications", "skills", "projects", "testimonials", "services", "metrics"] as const satisfies readonly SectionCopyKey[];

export const EXPERIENCE_SLUG = {
    tivenos: "tivenos",
    adcom: "adcom",
    muvu: "muv-u",
    quipux: "quipux",
} as const satisfies Record<ExperienceId, string>;

export const EDUCATION_SLUG = {
    politecnico: "computer-engineering",
    cyberDiploma: "cybersecurity-diploma",
    sena: "programming-technician",
    pascual: "pascual-bravo",
    inem: "inem",
} as const satisfies Record<EducationId, string>;

export const ORGANIZATION_SLUG = {
    tivenos: "tivenoseducation",
    adcom: "adcom-group",
    smartpot: "smartpottech",
    gopoli: "gopoli",
    peppertech: "peppertechdev",
    engineering: "engineeringsebastian-s",
    taurus: "taurussebastian-s",
    testlabdata: "testlabdata",
    technical: "technicalsebastians",
    vocational: "vocationalsebastian-s",
} as const satisfies Record<OrganizationId, string>;

/** Each service's page, named with the words people search for it. */
export const SERVICE_SLUG = {
    integration: "integrations-and-backend",
    crm: "zoho-crm",
    web: "web-and-landing-pages",
    data: "business-intelligence-and-data",
    automation: "process-automation",
    infra: "infrastructure-and-deployment",
    observability: "observability-and-reliability",
    consulting: "technical-consulting",
} as const satisfies Record<ServiceId, string>;

/** Each group of tools, named with the words people search for it, in the order the general view shows them. */
export const SKILL_SLUG = {
    backend: "backend-and-apis",
    crm: "crm-and-automation",
    data: "data-and-business-intelligence",
    devops: "devops-and-observability",
    databases: "databases",
    frontend: "frontend",
    cloud: "cloud-and-hosting",
    testing: "testing-and-quality",
    languages: "programming-languages",
    security: "security",
    ai: "machine-learning-and-ai",
    iot: "iot-and-embedded",
    networks: "networking",
    tools: "developer-tools",
    foundations: "computer-science-foundations",
} as const satisfies Record<SkillGroupId, string>;

/** Each reason to hire me, named after what it claims. */
export const REASON_SLUG = {
    vision: "from-business-to-architecture",
    costs: "less-manual-work",
    integration: "connected-data",
    autonomy: "from-question-to-production",
    versatility: "marketing-finance-and-it",
    calm: "calm-when-something-breaks",
    business: "technology-that-serves-the-business",
    learning: "learns-fast-and-teaches",
    detail: "careful-with-data",
    team: "shares-what-he-knows",
    initiative: "delivers-more-than-asked",
} as const satisfies Record<BenefitId, string>;

/** Every certification, in the order the facts list them; a unit test keeps this list in step with the facts. */
export const CERTIFICATION_IDS = [
    "itSpecialistPython", "daxPowerBi", "powerBiAnalysis", "dataScienceAi", "cybersecurity", "problemSolving", "excelMastery",
    "excelDataAnalysis", "searchConsoleSeo", "greenDigitalSkills", "dataVisualization", "webProgramming", "iotProtocols",
    "gitGithub", "softwareEngineering", "djangoTwo", "practicalJavascript", "basicProgramming", "pythonFundamentals", "hacklab",
    "javaBasic", "css", "pythonDjango", "pythonBasic", "excelProfessional", "sqlBasic", "programmingFundamentals", "pythonEia",
    "html",
] as const satisfies readonly CertificationId[];

/** itSpecialistPython becomes it-specialist-python. */
export const CERTIFICATION_SLUG = Object.fromEntries(
    CERTIFICATION_IDS.map((id) => [id, id.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)]),
) as Record<CertificationId, string>;

const SLUGS: Record<DetailCollection, Record<string, string>> = {
    experience: EXPERIENCE_SLUG,
    education: EDUCATION_SLUG,
    certifications: CERTIFICATION_SLUG,
    skills: SKILL_SLUG,
    organizations: ORGANIZATION_SLUG,
    services: SERVICE_SLUG,
    reasons: REASON_SLUG,
    metrics: {},
};

export const detailSlugs = (collection: DetailCollection): string[] => Object.values(SLUGS[collection]);

export const isDetailSlug = (collection: DetailCollection, value: unknown) => detailSlugs(collection).includes(value as string);

/** The item a slug names in its collection, such as "muv-u" in experience, which is muvu. */
export const detailIdBySlug = (collection: DetailCollection, slug: string) =>
    Object.entries(SLUGS[collection]).find(([, value]) => value === slug)?.[0];
