import type {DetailCollection} from "@/content/shared/detail-links";
import type {TimelineLabels} from "@/types/timeline";
import type {EducationId, ExperienceId, OrganizationId, ServiceId, SkillGroupId, YearMonth} from "@/types/content";

export type IssuerId =
    | "certiport"
    | "platzi"
    | "udea"
    | "hackerrank"
    | "inco"
    | "sapiencia"
    | "hackermentor"
    | "camara"
    | "utp"
    | "eia"
    | "coursera";

export interface DetailSeo {
    title: string;
    description: string;
}

/** A dated step told by hand; `date` is a month (2025-06) or, when only the year is known, a year (2026). */
export interface TimelineEntry {
    date: YearMonth | `${number}`;
    text: string;
}

/** One title held at a company, in the order they came. */
export interface PositionCopy {
    title: string;
    start: YearMonth;
    end: YearMonth | null;
    text: string;
}

/** A page an institution or a company publishes about itself, which the copy draws on. */
export interface PublishedSource {
    label: string;
    href: string;
}

/** What an institution publishes about one of its programs. */
export interface ProgramCopy {
    /** Facts such as the title it awards, its code, its length and its accreditation. */
    facts: { label: string; value: string }[];
    /** The profile of its graduates as the institution words it, with its points. */
    profile: { text: string; items: string[] } | null;
    /** Semesters, modules or competencies, each with what it covers. */
    curriculum: { term: string; items: string[] }[];
    source: PublishedSource;
}

export interface ExperiencePageCopy {
    tagline: string;
    /** What the company does and what the job was about, before the details. */
    intro: string[];
    /** What the company says about itself on its own site, and how the job fit into it. */
    company?: { text: string[]; source: PublishedSource };
    positions: PositionCopy[];
    /** Steps the facts cannot date by themselves; the page adds the start, the titles, projects and recommendations. */
    timeline: TimelineEntry[];
    seo: DetailSeo;
}

export interface EducationPageCopy {
    tagline: string;
    intro: string[];
    /** The areas the program covers, each with what it took in. */
    areas: { title: string; text: string }[];
    /** Courses or competencies of the program, as the LinkedIn profile names them. */
    courses: string[];
    /** The program as its institution publishes it, when it does. */
    program?: ProgramCopy;
    timeline: TimelineEntry[];
    seo: DetailSeo;
}

export interface OrganizationPageCopy {
    tagline: string;
    intro: string[];
    /** What Sebastián does in the organization. */
    role: string;
    timeline: TimelineEntry[];
    seo: DetailSeo;
}

/** A group of tools told on its own page: what I aim at with it, what it covers and what a team gets from it. */
export interface SkillPageCopy {
    /** What I aim at with these tools, in a sentence or two. */
    focus: string;
    /** What the group covers and how it came into my work. */
    description: string[];
    /** What it is good for: what a team or a business gets from it. */
    uses: string[];
    seo: DetailSeo;
}

export interface DetailPagesUi {
    breadcrumb: string;
    eyebrow: Record<DetailCollection, string>;
    all: Record<DetailCollection, string>;
    onThisPage: string;
    atAGlance: string;
    sections: {
        overview: string;
        positions: string;
        achievements: string;
        timeline: string;
        projects: string;
        recommendations: string;
        meanwhile: string;
        stack: string;
        activity: string;
        areas: string;
        courses: string;
        skills: string;
        learned: string;
        /** An education page's program as the institution publishes it, its graduates and its curriculum. */
        program: string;
        profile: string;
        curriculum: string;
        /** An experience page's company as its own site presents it. */
        company: string;
        /** How a certification was earned: the exam, test or course and its hours. */
        earned: string;
        /** What was built during a course, when a repository shows it. */
        built: string;
        adds: string;
        applied: string;
        context: string;
        issuer: string;
        sameStop: string;
        role: string;
        related: string;
        repositories: string;
        metrics: string;
        /** A service's page: what it covers, the projects that prove it, the jobs it was done in and the reasons. */
        scope: string;
        provenIn: string;
        jobs: string;
        whyMe: string;
        /** A reason's page: the recommendation it quotes, where it shows, the programs and the services it serves. */
        quote: string;
        practice: string;
        studies: string;
        services: string;
        /** A skill's page: what I aim at, what it is, what it is good for, its tools, and the studies behind it. */
        focus: string;
        description: string;
        uses: string;
        tools: string;
        education: string;
    };
    facts: {
        title: string;
        company: string;
        program: string;
        school: string;
        period: string;
        place: string;
        status: string;
        graduation: string;
        issuer: string;
        date: string;
        stop: string;
        visibility: string;
        repositories: string;
        members: string;
        organization: string;
        duration: string;
        /** The role views a service serves, and who wrote the recommendation a reason quotes. */
        roles: string;
        quotedBy: string;
        relationship: string;
        /** How many tools a skill groups. */
        tools: string;
    };
    /** `{hours}`: the length of a course as its certificate states it. */
    hours: string;
    /** The buttons of the curriculum slider on phones. */
    curriculumSlider: { previous: string; next: string };
    status: { current: string; finished: string; inProgress: string };
    visibility: { public: string; private: string };
    /** Shown instead of the GitHub link when the organization's code is private. */
    privateCode: string;
    activity: {
        /** `{mine}` and `{people}`: Sebastián's commits and all the commits made by people. */
        commits: string;
        /** `{percent}`: his share of them. */
        share: string;
        /** `{count}` and `{total}`: repositories with commits of his, out of all of them. */
        repositories: string;
        byYear: string;
        /** `{date}`: the day the counts were read. */
        note: string;
    };
    /** Dated entries the page builds from the facts; `{…}` are replaced with names, titles and dates. */
    events: {
        joined: string;
        position: string;
        left: string;
        project: string;
        recommendation: string;
        programStart: string;
        programEnd: string;
        graduation: string;
        certification: string;
    };
    /** The timeline's filter: its group label, the button that shows everything, one name per kind of entry, and the
     * sentence read out when the filter changes ({count}: the entries left). */
    timeline: TimelineLabels;
    /** `{count}`: projects, recommendations, certifications or repositories listed; `one` is used for a single one. */
    counts: Record<"projects" | "recommendations" | "certifications" | "repositories" | "jobs" | "programs", {
        one: string;
        other: string
    }>;
    actions: {
        credential: string;
        openRepository: string;
        openOrganization: string;
        readPage: string;
        previous: string;
        next: string;
        /** A service's call to talk about it, and the link from the services to the reasons. */
        talk: string;
        seeReasons: string;
        /** A skill's call to talk about work that needs it. */
        talkSkill: string;
    };
    /** Names of the pages linked from a certification: a project or a job. */
    workKinds: { project: string; experience: string };
    /** Lead-in of the jobs and programs active when a certification was earned. */
    contextIntro: string;
    /** The buttons of the certifications index that group it by issuer or by year. */
    certificationGroups: { label: string; issuer: string; year: string };
    /** The certificate's own image on its page; {issuer} and {title} are filled in. */
    certificate: { title: string; caption: string; redacted: string; alt: string; enlarge: string; seoTail: string };
    /** Added to a reason's search description when it is short; {author} wrote the recommendation it quotes. */
    reasonSeoTail: string;
}

export interface DetailIndexCopy {
    title: string;
    subtitle: string;
    seo: DetailSeo;
}

export interface DetailPagesCopy {
    ui: DetailPagesUi;
    indexes: Record<DetailCollection, DetailIndexCopy>;
    experience: Record<ExperienceId, ExperiencePageCopy>;
    education: Record<EducationId, EducationPageCopy>;
    organizations: Record<OrganizationId, OrganizationPageCopy>;
    /** Each group of tools: what I aim at, what it is, what it is good for and what a search result says about it. */
    skills: Record<SkillGroupId, SkillPageCopy>;
    /** What a search result says about each service's page. */
    services: Record<ServiceId, { seo: DetailSeo }>;
    /** Who issues each certification, in a sentence or two. */
    issuers: Record<IssuerId, { name: string; text: string }>;
}

/** Commits read from the GitHub API for each organization (organization-activity.ts says how). */
export interface OrganizationActivity {
    repositories: number;
    /** Repositories with at least one of his commits. */
    withMine: number;
    /** Commits by Sebastián, whatever Git identity he used then, and by every person. */
    mine: number;
    people: number;
    /** Sebastián's commits per year. */
    years: Partial<Record<number, number>>;
}
