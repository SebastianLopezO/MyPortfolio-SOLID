// Written by scripts/render-illustrations.mjs from scripts/illustrations/pages.mjs; run `pnpm illustrations` to change it.
import type {Tile} from "@/content/shared/project-art";
import type {BenefitId, EducationId, ExperienceId, OrganizationId, ServiceId} from "@/types/content";

/** An illustration in public/ and the tile it sits on. */
export interface Art {
    file: string;
    tile: Tile;
}

/** The dedicated About page object, in public/, and the tile it sits on. */
export const ABOUT_ART: Art = {file: "/illustrations/about.svg", tile: "mint"};

/** Each service's object, in public/, and the tile it sits on. */
export const SERVICE_ART: Record<ServiceId, Art> = {
    integration: {file: "/illustrations/services/integration.svg", tile: "sky"},
    crm: {file: "/illustrations/services/crm.svg", tile: "peach"},
    web: {file: "/illustrations/services/web.svg", tile: "lilac"},
    data: {file: "/illustrations/services/data.svg", tile: "butter"},
    automation: {file: "/illustrations/services/automation.svg", tile: "rose"},
    infra: {file: "/illustrations/services/infra.svg", tile: "stone"},
    observability: {file: "/illustrations/services/observability.svg", tile: "sage"},
    consulting: {file: "/illustrations/services/consulting.svg", tile: "mint"},
};

/** Each reason to hire me and its object, in public/, and the tile it sits on. */
export const REASON_ART: Record<BenefitId, Art> = {
    vision: {file: "/illustrations/reasons/vision.svg", tile: "sky"},
    costs: {file: "/illustrations/reasons/costs.svg", tile: "mint"},
    integration: {file: "/illustrations/reasons/integration.svg", tile: "lilac"},
    autonomy: {file: "/illustrations/reasons/autonomy.svg", tile: "peach"},
    versatility: {file: "/illustrations/reasons/versatility.svg", tile: "stone"},
    calm: {file: "/illustrations/reasons/calm.svg", tile: "sage"},
    business: {file: "/illustrations/reasons/business.svg", tile: "rose"},
    learning: {file: "/illustrations/reasons/learning.svg", tile: "butter"},
    detail: {file: "/illustrations/reasons/detail.svg", tile: "sky"},
    team: {file: "/illustrations/reasons/team.svg", tile: "lilac"},
    initiative: {file: "/illustrations/reasons/initiative.svg", tile: "peach"},
};

/** Each job's badge, in public/, and the tile it sits on. */
export const EXPERIENCE_ART: Record<ExperienceId, Art> = {
    tivenos: {file: "/illustrations/experience/tivenos.svg", tile: "sky"},
    adcom: {file: "/illustrations/experience/adcom.svg", tile: "peach"},
    muvu: {file: "/illustrations/experience/muvu.svg", tile: "mint"},
    quipux: {file: "/illustrations/experience/quipux.svg", tile: "butter"},
};

/** Each program's book and what it led to, in public/, and the tile it sits on. */
export const EDUCATION_ART: Record<EducationId, Art> = {
    politecnico: {file: "/illustrations/education/politecnico.svg", tile: "sky"},
    cyberDiploma: {file: "/illustrations/education/cyber-diploma.svg", tile: "sage"},
    sena: {file: "/illustrations/education/sena.svg", tile: "peach"},
    pascual: {file: "/illustrations/education/pascual.svg", tile: "lilac"},
    inem: {file: "/illustrations/education/inem.svg", tile: "butter"},
};

/** Each GitHub organization's cabinet, in public/, and the tile it sits on. */
export const ORGANIZATION_ART: Record<OrganizationId, Art> = {
    tivenos: {file: "/illustrations/organizations/tivenos.svg", tile: "sky"},
    adcom: {file: "/illustrations/organizations/adcom.svg", tile: "peach"},
    smartpot: {file: "/illustrations/organizations/smartpot.svg", tile: "mint"},
    gopoli: {file: "/illustrations/organizations/gopoli.svg", tile: "sky"},
    peppertech: {file: "/illustrations/organizations/peppertech.svg", tile: "rose"},
    engineering: {file: "/illustrations/organizations/engineering.svg", tile: "stone"},
    taurus: {file: "/illustrations/organizations/taurus.svg", tile: "butter"},
    testlabdata: {file: "/illustrations/organizations/testlabdata.svg", tile: "lilac"},
    technical: {file: "/illustrations/organizations/technical.svg", tile: "sage"},
    vocational: {file: "/illustrations/organizations/vocational.svg", tile: "rose"},
};
