import type {ProfileKey, SectionId, YearMonth} from "@/types/content";

export type JourneyTab = "map" | "evolution" | "focus" | "horizon";

export type JourneyLineId = "education" | "web" | "backend" | "crm" | "data" | "devops" | "security";

export type CapabilityId =
    "foundations"
    | "web"
    | "backend"
    | "databases"
    | "crm"
    | "data"
    | "devops"
    | "security"
    | "ai";

export type MilestoneKind = "education" | "work" | "project" | "certification" | "goal";

export type MilestoneId =
    | "inem"
    | "pascual"
    | "html"
    | "firstPython"
    | "sena"
    | "politecnico"
    | "firstCommit"
    | "testlab"
    | "quipux"
    | "skillCertificates"
    | "django"
    | "muvu"
    | "hacklab"
    | "pythonSpecialist"
    | "platziRoute"
    | "enganchaTic"
    | "greenSkills"
    | "biCertificates"
    | "smartpot"
    | "taurus"
    | "adcom"
    | "peppercrm"
    | "tivenos"
    | "zohoToolkit"
    | "emailAutomations"
    | "networks"
    | "aiCourses"
    | "distributed"
    | "landingPlatform"
    | "gopoli"
    | "observability"
    | "emailSignatures"
    | "cyberDiploma"
    | "portfolio"
    | "crmWidgets"
    | "realEstateSite"
    | "graduation"
    | "dataScience"
    | "cybersecurity"
    | "vision";

export type SdgId = 2 | 4 | 8 | 9 | 11 | 13 | 16;

export interface MilestoneFacts {
    id: MilestoneId;
    start: YearMonth;
    end?: YearMonth | null;
    kind: MilestoneKind;
    lines: JourneyLineId[];
    areas: CapabilityId[];
    sdgs?: SdgId[];
    anchor?: SectionId;
    major?: boolean;
}

/** Self-assessed level per year: 0 none, 1 learning, 2 practicing, 3 professional, 4 leading. */
export type Level = 0 | 1 | 2 | 3 | 4;

export type RadarItemId =
    | "fastapi"
    | "zoho"
    | "integrations"
    | "spring"
    | "react"
    | "events"
    | "php"
    | "dotnet"
    | "sql"
    | "pandas"
    | "bi"
    | "ml"
    | "pipelines"
    | "mlops"
    | "llm"
    | "vba"
    | "docker"
    | "actions"
    | "observability"
    | "linux"
    | "kubernetes"
    | "cloud"
    | "hardening"
    | "auth"
    | "testing"
    | "scanning"
    | "appsec"
    | "hacking"
    | "governance"
    | "graphql"
    | "jobs"
    | "warehouse"
    | "networks"
    | "iot"
    | "secrets";

export type RadarRing = "core" | "growing" | "exploring" | "paused";

export type RadarQuadrant = "build" | "data" | "platforms" | "security";

export interface RadarItemFacts {
    id: RadarItemId;
    quadrant: RadarQuadrant;
    ring: RadarRing;
}

export type GoalId = "graduation" | "dataScience" | "cybersecurity" | "vision";

export interface SdgFacts {
    id: SdgId;
    color: string;
    onColor: "light" | "dark";
}

export interface JourneyCopy {
    title: string;
    subtitle: Record<ProfileKey, string>;
    tabsLabel: string;
    tabs: Record<JourneyTab, { label: string; description: string }>;
    lines: Record<JourneyLineId, string>;
    /** One-word line names for the line chips on phones. */
    linesShort: Record<JourneyLineId, string>;
    areas: Record<CapabilityId, string>;
    kinds: Record<MilestoneKind, string>;
    levels: [string, string, string, string, string];
    today: string;
    planned: string;
    milestones: Record<MilestoneId, { title: string; place: string; summary: string; short?: string }>;
    map: {
        /** The link from a job or a program's stop to its own page. */
        detail: string;
        legendLabel: string;
        emphasisHint: string;
        allLines: string;
        previousStop: string;
        nextStop: string;
        listToggle: { show: string; hide: string };
        activityLabel: string;
        streakLabel: string;
        goTo: string;
        /** Heading of the certificates a certification stop groups. */
        certificates: string;
    };
    evolution: {
        caption: string;
        capability: string;
        target: string;
        evidence: string;
        noEvidence: string;
        activeDays: string;
        activeDaysNote: string;
        legend: string;
        previousYear: string;
        nextYear: string;
    };
    radar: {
        caption: string;
        rings: Record<RadarRing, { label: string; description: string }>;
        quadrants: Record<RadarQuadrant, string>;
        items: Record<RadarItemId, { name: string; note: string }>;
    };
    horizon: {
        intro: string;
        goalsLabel: string;
        gains: Record<GoalId, string[]>;
        sdgTitle: string;
        sdgIntro: string;
        sdgShort: string;
        sdgs: Record<SdgId, { name: string; contribution: string }>;
        related: string;
    };
}
