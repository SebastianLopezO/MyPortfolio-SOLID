import type {BenefitId, RoleId, ServiceId} from "@/types/content";
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
