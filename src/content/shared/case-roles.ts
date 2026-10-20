import type {RoleId} from "@/content/roles";
import type {CaseStudyId} from "@/types/case-study";

/** Role views each case study belongs to, for the assistant; kept apart from the case study facts to stay small. */
export const caseStudyRoles: Record<CaseStudyId, RoleId[]> = {
    integrationPlatform: ["backend", "crm", "devops"],
    smartpot: ["backend", "devops", "fullstack", "data"],
    gopoli: ["fullstack", "backend", "devops"],
    martech: ["crm", "fullstack"],
    emailSignatures: ["fullstack", "backend"],
};
