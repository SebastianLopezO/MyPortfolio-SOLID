import type {RoleId} from "@/content/roles";
import type {ArchiveOrg} from "@/content/shared/archive";
import type {CaseFigureFacts, CaseImageFacts, CaseStudyId, DecisionCopy, DiagramFacts} from "@/types/case-study";
import type {Bullet, EducationId, ExperienceId, OrganizationId, YearMonth} from "@/types/content";

export const PROJECT_CATEGORIES = ["product", "work", "education"] as const;

/** Products built in a team, work done for employers (clients stay anonymous) and the coursework of each program. */
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export type ProjectId =
    | "smartpot"
    | "gopoli"
    | "peppercrm"
    | "portfolio"
    | "taurus"
    | "integrationPlatform"
    | "observability"
    | "crmWidgets"
    | "admissionsForms"
    | "crmSnapshots"
    | "emailSignatures"
    | "martech"
    | "landingPlatform"
    | "emailAutomations"
    | "zohoToolkit"
    | "realEstateSite"
    | "collectionAutomation"
    | "engineering"
    | "cybersecurityLabs"
    | "technical"
    | "vocational"
    | "lettuceDiseases"
    | "radarImaging"
    | "schoolServices"
    | "fashionLine"
    | "tddPolyglot"
    | "aiTechniques"
    | "dataCompressor"
    | "carSpace"
    | "sitePersist"
    | "videoToAscii"
    | "companyDream";

/** Projects without a full case study get a lighter page of their own. */
export type ProjectPageId = Exclude<ProjectId, CaseStudyId>;

export interface ProjectFacts {
    id: ProjectId;
    category: ProjectCategory;
    /** The job or the program the project belongs to. */
    experience?: ExperienceId;
    education?: EducationId;
    /** The GitHub organization that holds its repositories, when there is one. */
    organization?: OrganizationId;
    start: YearMonth;
    end?: YearMonth | null;
    team?: number | null;
    links: { code?: string; demo?: string };
    tech: string[];
    roles: RoleId[];
    figures?: CaseFigureFacts[];
    diagram?: DiagramFacts;
    images?: CaseImageFacts[];
    /** The public repositories its page lists one by one, from the archive, such as each course of the degree. */
    repositories?: { org: ArchiveOrg; only?: string[]; except?: string[] };
}

/** What a project card shows on the home page and on the projects index. */
export interface ProjectCardCopy {
    name: string;
    /** Two to five words under the name on a tile: what the project is at a glance. Its page tells the rest. */
    brief: string;
    /** Where it was built, without naming clients, such as "TIVENOS · internal tool". */
    context: string;
    summary: string;
    /** At least four, each tagged with the role views it matters to. */
    highlights: Bullet[];
    /** The alt text of the project's main screen, the same as on its page, for the projects that have one. */
    screen?: string;
}

export interface ProjectPageCopy {
    tagline: string;
    role: string;
    status: string;
    overview: string[];
    decisions: DecisionCopy[];
    figures: Record<string, string>;
    diagram?: { title: string; caption: string; labels: Record<string, string> };
    images: Record<string, string>;
    seo: { title: string; description: string };
}

export interface ProjectPagesUi {
    eyebrow: Record<ProjectCategory, string>;
    whatItDoes: string;
    overview: string;
    howItWorks: string;
    decisions: string;
    repositories: string;
    repositoriesNote: string;
    stack: string;
    screens: string;
    /** Label of the link to the GitHub organization that holds the repositories. */
    organization: string;
    previous: string;
    next: string;
    /** The archive's filter: its group label and the button that shows every repository. */
    archiveFilter: string;
    archiveAll: string;
    /** Links from a project to the rest of the site; {place} is the job's company or the program's name. */
    related: {
        title: string;
        places: string;
        experience: string;
        program: string;
        organization: string;
        certifications: string;
        siblings: string;
    };
}

export interface ProjectPagesCopy {
    ui: ProjectPagesUi;
    items: Record<ProjectPageId, ProjectPageCopy>;
}
