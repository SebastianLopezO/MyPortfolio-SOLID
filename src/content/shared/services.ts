import type {BenefitId, EducationId, ExperienceId, RoleId, ServiceId} from "@/types/content";
import type {ProjectId} from "@/types/project";

export const SERVICE_IDS: ServiceId[] = ["integration", "crm", "web", "data", "automation", "infra", "observability", "consulting"];

export const serviceRoles: Record<ServiceId, RoleId[]> = {
    crm: ["crm"],
    integration: ["backend", "crm", "fullstack"],
    web: ["fullstack", "crm"],
    data: ["data"],
    automation: ["crm", "data", "devops"],
    infra: ["devops", "backend"],
    observability: ["devops", "backend"],
    consulting: ["crm", "data", "backend"],
};

/** The projects that show each service done, linked under it. */
export const serviceProjects: Record<ServiceId, ProjectId[]> = {
    crm: ["crmWidgets", "zohoToolkit", "admissionsForms"],
    integration: ["integrationPlatform", "peppercrm", "gopoli"],
    web: ["gopoli", "realEstateSite", "martech", "portfolio"],
    data: ["crmSnapshots", "collectionAutomation", "taurus"],
    automation: ["emailAutomations", "emailSignatures", "zohoToolkit"],
    infra: ["landingPlatform", "portfolio", "smartpot"],
    observability: ["observability", "landingPlatform"],
    consulting: ["integrationPlatform", "martech"],
};

/** The reasons to hire me that matter most for each service, linked from its page. */
export const serviceReasons: Record<ServiceId, BenefitId[]> = {
    integration: ["integration", "vision", "autonomy"],
    crm: ["costs", "versatility", "detail"],
    web: ["business", "autonomy", "initiative"],
    data: ["detail", "integration", "business"],
    automation: ["costs", "initiative", "calm"],
    infra: ["autonomy", "calm", "initiative"],
    observability: ["calm", "initiative", "learning"],
    consulting: ["vision", "versatility", "team"],
};

export const benefitOrder: BenefitId[] = ["vision", "costs", "integration", "autonomy", "versatility", "calm", "business", "learning", "detail", "team", "initiative"];

/** The reasons each role view lists first. */
export const benefitRoles: Record<BenefitId, RoleId[]> = {
    vision: ["crm", "data", "backend"],
    costs: ["crm", "data"],
    integration: ["crm", "data", "backend"],
    autonomy: ["devops", "backend", "fullstack"],
    versatility: ["crm", "fullstack"],
    calm: ["devops", "backend"],
    business: ["fullstack", "crm"],
    learning: ["data", "fullstack", "backend"],
    detail: ["data", "crm"],
    team: ["fullstack", "backend", "devops"],
    initiative: ["devops", "data", "crm"],
};

/**
 * Where each reason shows in the work: the projects, jobs and programs its page links, which its `practice` text
 * (content/{en,es}/services.ts) may name and nothing else.
 */
export const benefitWork: Record<BenefitId, { projects: ProjectId[]; experience: ExperienceId[]; education: EducationId[] }> = {
    vision: {projects: ["integrationPlatform", "martech", "smartpot"], experience: ["adcom", "tivenos"], education: ["politecnico"]},
    costs: {projects: ["zohoToolkit", "emailAutomations", "collectionAutomation", "admissionsForms"], experience: ["adcom", "tivenos", "quipux"], education: []},
    integration: {projects: ["integrationPlatform", "crmSnapshots", "admissionsForms", "realEstateSite"], experience: ["tivenos", "adcom"], education: []},
    autonomy: {projects: ["observability", "landingPlatform", "smartpot", "portfolio"], experience: ["tivenos", "adcom"], education: ["politecnico"]},
    versatility: {projects: ["martech", "emailAutomations", "collectionAutomation"], experience: ["adcom", "muvu", "quipux"], education: []},
    calm: {projects: ["observability", "landingPlatform", "cybersecurityLabs"], experience: ["tivenos"], education: ["cyberDiploma"]},
    business: {projects: ["martech", "realEstateSite", "landingPlatform", "crmSnapshots"], experience: ["adcom", "tivenos"], education: []},
    learning: {projects: ["aiTechniques", "tddPolyglot", "lettuceDiseases", "observability"], experience: ["tivenos"], education: ["politecnico", "cyberDiploma", "sena"]},
    detail: {projects: ["crmSnapshots", "zohoToolkit", "collectionAutomation", "taurus"], experience: ["tivenos", "adcom", "quipux"], education: []},
    team: {projects: ["smartpot", "peppercrm", "gopoli"], experience: ["tivenos"], education: ["politecnico", "sena"]},
    initiative: {projects: ["observability", "emailSignatures", "crmWidgets"], experience: ["tivenos", "adcom"], education: []},
};
