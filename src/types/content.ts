import type {ProfileKey, RoleId} from "@/content/roles";
import type {CommitAreaId} from "@/content/shared/github";
import type {HeroDeviceId} from "@/content/shared/project-art";
import type {IssuerId} from "@/types/detail";
import type {MilestoneId} from "@/types/journey";
import type {ProjectCardCopy, ProjectCategory, ProjectId} from "@/types/project";

export type Lang = "en" | "es";

export type YearMonth = `${number}-${"01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12"}`;

export type SectionId =
    | "about"
    | "journey"
    | "services"
    | "experience"
    | "skills"
    | "projects"
    | "certifications"
    | "metrics"
    | "resume"
    | "testimonials"
    | "contact";

export type ExperienceId = "tivenos" | "adcom" | "muvu" | "quipux";
export type EducationId = "cyberDiploma" | "politecnico" | "sena" | "pascual" | "inem";
export type OrganizationId =
    | "tivenos"
    | "adcom"
    | "smartpot"
    | "gopoli"
    | "peppertech"
    | "engineering"
    | "technical"
    | "vocational"
    | "taurus"
    | "testlabdata";
export type SkillGroupId =
    | "languages"
    | "backend"
    | "crm"
    | "data"
    | "databases"
    | "frontend"
    | "devops"
    | "cloud"
    | "security"
    | "networks"
    | "iot"
    | "ai"
    | "testing"
    | "tools"
    | "foundations";
export type HighlightId =
    | "years"
    | "integrations"
    | "clients"
    | "landingPages"
    | "commits"
    | "contributions"
    | "prsReviewed"
    | "streak"
    | "certifications"
    | "organizations"
    | "repositories"
    | "recommendations"
    | "codingHours"
    | "smartpotCommits"
    | "apiTests"
    | "probes"
    | "alertRules"
    | "widgets"
    | "forms";
export type MetricId =
    "contributions"
    | "commits"
    | "activeDays"
    | "streak"
    | "pullRequests"
    | "reviews"
    | "repos"
    | "organizations";
export type MetricImageId =
    "streak"
    | "stats"
    | "activity"
    | "wakatime"
    | "topLangs"
    | "account"
    | "calendar"
    | "languages"
    | "followup";
export type ServiceId =
    "crm"
    | "integration"
    | "web"
    | "data"
    | "automation"
    | "infra"
    | "observability"
    | "consulting";
export type BenefitId =
    | "vision"
    | "costs"
    | "integration"
    | "autonomy"
    | "versatility"
    | "calm"
    | "business"
    | "learning"
    | "detail"
    | "team"
    | "initiative";
export type RelationshipId = "directSupervisor" | "seniorPosition" | "sameTeam" | "differentTeam" | "classmate";
export type ResumeId = "ats" | "atsLong" | "designed";
export type WorkMode = "remote" | "hybrid" | "onsite";
export type Employment = "fullTime" | "freelance" | "internship";

export type CertificationId =
    | "itSpecialistPython"
    | "daxPowerBi"
    | "powerBiAnalysis"
    | "excelMastery"
    | "excelDataAnalysis"
    | "searchConsoleSeo"
    | "greenDigitalSkills"
    | "dataScienceAi"
    | "cybersecurity"
    | "dataVisualization"
    | "webProgramming"
    | "iotProtocols"
    | "gitGithub"
    | "softwareEngineering"
    | "djangoTwo"
    | "practicalJavascript"
    | "basicProgramming"
    | "pythonFundamentals"
    | "hacklab"
    | "problemSolving"
    | "javaBasic"
    | "css"
    | "pythonDjango"
    | "pythonBasic"
    | "excelProfessional"
    | "sqlBasic"
    | "programmingFundamentals"
    | "pythonEia"
    | "html";

export type TestimonialId =
    | "paulaVega"
    | "cesarPedrolini"
    | "lautaroBordoni"
    | "rodrigoSanchez"
    | "felipeCamacho"
    | "danielRodriguez"
    | "valentinaQuiroz"
    | "mateoLondono"
    | "danielaBolivar"
    | "kellyMejia"
    | "darwinCastano"
    | "jenniferTuso"
    | "tatianaDiaz"
    | "emmanuelBerrio"
    | "franciscoCadavid"
    | "lauraGarcia";

export type {ProfileKey, RoleId};

export interface ExperienceFacts {
    id: ExperienceId;
    company: string;
    start: YearMonth;
    end: YearMonth | null;
    location: string;
    workMode: WorkMode;
    employment?: Employment;
    tech: string[];
    /** The GitHub organization that holds the work, when there is one. */
    organization?: OrganizationId;
}

export interface EducationFacts {
    id: EducationId;
    school: string;
    start: number;
    end: number;
    graduation?: YearMonth;
    /** Public evidence of the coursework, such as a repository with the lab reports. */
    url?: string;
    /** The GitHub organization that holds the work of the program, one repository per course or project. */
    organization?: { name: string; url: string; repositories: number };
    /** The same organization as an id, for its page. */
    organizationId?: OrganizationId;
    /** The project page that tells the program's coursework, and the products built during it. */
    project?: ProjectId;
    projects?: ProjectId[];
}

export interface MetricsImage {
    src: string;
    width: number;
    height: number;
}

export interface OrganizationFacts {
    id: OrganizationId;
    name: string;
    url: string;
    repositories: number;
    members?: number;
    visibility: "public" | "private";
    metricsImage?: MetricsImage;
    roles: RoleId[];
}

export interface CertificationFacts {
    id: CertificationId;
    title: string;
    issuer: string;
    date: YearMonth;
    url?: string;
    tech: string[];
    roles: RoleId[];
    /** The stop on the journey map that groups it. */
    milestone: MilestoneId;
    issuerId: IssuerId;
    /** The projects and jobs where what it covered shows up, linked from its page. */
    applied: WorkRef[];
    /** The length of the course, when the certificate states it. */
    hours?: number;
    /** A public repository with what was built during the course. */
    repository?: string;
}

/** A link to a project or a job page, from a certification, an organization or another page. */
export type WorkRef = { kind: "project"; id: ProjectId } | { kind: "experience"; id: ExperienceId };

export interface SkillGroupFacts {
    id: SkillGroupId;
    items: string[];
}

export interface TestimonialFacts {
    id: TestimonialId;
    author: string;
    relationship: RelationshipId;
    date: YearMonth;
    quote: string;
    roles: RoleId[];
    /** The job they worked with Sebastián in, when the recommendation or its author's profile says so. */
    experience?: ExperienceId;
}

export interface Bullet {
    text: string;
    roles: RoleId[];
}

export interface ProfileCopy {
    title: string;
    headline: string;
    summary: string;
}

/** Sections below the hero whose copy loads in its own chunk, apart from the startup bundle. */
export const SECTION_COPY_KEYS = ["about", "experience", "services", "skills", "projects", "certifications", "testimonials", "resume", "metrics", "contact"] as const;

export type SectionCopyKey = (typeof SECTION_COPY_KEYS)[number];

export type SectionCopies = Pick<Content, SectionCopyKey>;

/** What the page needs before it hydrates: the head, the header, the hero and the figures under it. */
export type StartupContent = Omit<Content, SectionCopyKey>;

export interface Content {
    lang: Lang;
    locale: "en_US" | "es_CO";
    seo: {
        siteName: string;
        ogImageAlt: string;
        profiles: Record<ProfileKey, { title: string; description: string }>;
    };
    ui: {
        nav: Record<SectionId, string>;
        home: string;
        /** The button above each project and detail page that copies its address, role view included. */
        copyLink: { copy: string; copied: string; failed: string };
        navLabel: string;
        skipLink: string;
        menu: { open: string; close: string };
        /** The button that pins the theme, named by what it switches to. */
        theme: { toLight: string; toDark: string };
        language: { label: string; switchTo: string; names: Record<Lang, string> };
        roleSwitcher: { label: string; general: string; roles: Record<RoleId, string> };
        present: string;
        months: readonly string[];
        workMode: Record<WorkMode, string>;
        employment: Record<Employment, string>;
        actions: {
            downloadCv: string;
            contact: string;
            showMore: string;
            showLess: string;
            showAll: string;
            showFewer: string;
            viewCode: string;
            viewCredential: string;
            viewOrganization: string;
            openMenu: string;
            askAssistant: string;
            readCaseStudy: string;
            liveDemo: string;
            allProjects: string;
            /** The disclosures of a part of the page, all at once (lib/disclosures.ts). */
            expandAll: string;
            collapseAll: string;
            /** A card's achievements behind a disclosure; {count} is how many. */
            achievements: string;
            hideAchievements: string;
            /** The rest of a story behind a disclosure. */
            readStory: string;
            hideStory: string;
        };
        footer: {
            rights: string;
            builtWith: string;
            elsewhere: string;
            /** The pages beyond the profile: the projects and the job, program, certification and organization pages. */
            explore: string;
            pages: Record<"projects" | "experience" | "education" | "certifications" | "organizations" | "services" | "metrics", string>;
        };
        whatsapp: { label: string; message: string };
    };
    hero: {
        /** The roles each view says Sebastián is open to. */
        availability: Record<ProfileKey, string>;
        location: string;
        stackLabel: string;
        byProfile: Record<ProfileKey, ProfileCopy>;
        /** The devices on the board around the portrait: what the list of them is, and the project each one stands for,
         * by name and one line about it. Each device links to its project's page. */
        board: { label: string; devices: Record<HeroDeviceId, { name: string; note: string }> };
    };
    highlights: { label: string; items: Record<HighlightId, string> };
    about: {
        title: string;
        subtitle: Record<ProfileKey, string>;
        quote: string;
        intro: string;
        /** How the mindset shows in practice, then how the trajectory went, told for each view. */
        story: Record<ProfileKey, [string, string]>;
        versatility: string;
        /** The path with artificial intelligence: rule systems, models and agents, language models at both scales, and
         * how coding agents are directed. */
        ai: string[];
        ambition: string;
        closing: Record<ProfileKey, string>;
        /** The terminal under the text: the ASCII portrait and the trajectory as a log, one line per step. */
        terminal: {
            label: string;
            logCommand: string;
            entries: { year: string; text: string; roles: RoleId[] }[];
        };
        educationTitle: string;
        /** The link from each program to its own page, and to the page that lists them all. */
        educationPage: string;
        educationIndex: string;
        courseworkLink: string;
        organizationLink: string;
        repositories: string;
        languagesTitle: string;
        languages: { name: string; level: string }[];
        education: Record<EducationId, { degree: string; note?: string; skills: string[] }>;
    };
    experience: {
        title: string;
        subtitle: Record<ProfileKey, string>;
        current: string;
        relevanceNote: string;
        matches: string;
        projects: string;
        /** The link from each job to its own page. */
        detail: string;
        /** Each job's summary is told for every view; the bullets stay the same and the role view highlights them. */
        items: Record<ExperienceId, { title: string; summary: Record<ProfileKey, string>; bullets: Bullet[] }>;
    };
    services: {
        title: string;
        subtitle: Record<ProfileKey, string>;
        /** Label of the projects linked under each service as proof. */
        evidence: string;
        items: Record<ServiceId, { title: string; description: string; points: string[] }>;
        benefitsTitle: string;
        benefitsSubtitle: string;
        /** The home lists the services by name; this link leads to their page with every detail. */
        pageLink: string;
        /** Each benefit quotes a recommendation; the excerpt must appear word for word in that quote. */
        benefits: Record<BenefitId, {
            title: string;
            description: string;
            evidence: { testimonial: TestimonialId; excerpt: string }
        }>;
        /** Labels of the slider buttons that phones get for the services and the reasons to hire. */
        slider: { previousService: string; nextService: string; previousBenefit: string; nextBenefit: string };
    };
    skills: {
        title: string;
        subtitle: Record<ProfileKey, string>;
        groups: Record<SkillGroupId, string>;
        /** `{count}` is replaced with how many tools a group lists. */
        count: string;
        moreTitle: string;
        /** The lab board: each group of tools as an object that can be moved around and opened. */
        lab: {
            label: string;
            hint: string;
            /** Read to assistive technology on each module: how to open it and how to move it. */
            keys: string;
            /** The heading over the tools of the open module; {group} is its name. */
            toolsOf: string;
            tidy: string;
        };
    };
    projects: {
        title: string;
        subtitle: Record<ProfileKey, string>;
        featured: string;
        categoriesLabel: string;
        categories: Record<ProjectCategory, { label: string; description: string }>;
        /** Labels of the slider buttons phones get for the cards of a category. */
        slider: { previous: string; next: string };
        readProject: string;
        privateCode: string;
        /** Shown on a recreated screen: the system is private, so the screen was redrawn with fictional data. */
        recreation: string;
        organizationsTitle: string;
        organizationsSubtitle: string;
        /** The link from each organization to its own page, and to the page that lists them all. */
        organizationPage: string;
        organizationsIndex: string;
        repositories: string;
        members: string;
        private: string;
        showMetrics: string;
        /** The stack of a project or a job page, where each technology lists the projects using it ({tech}, {count}). */
        techExplorer: { hint: string; usedIn: string; noOther: string; none: string };
        items: Record<ProjectId, ProjectCardCopy>;
        organizations: Record<OrganizationId, string>;
    };
    certifications: {
        title: string;
        subtitle: Record<ProfileKey, string>;
        labels: { adds: string; stop: string; index: string };
        /**
         * What each one covered, how it was earned and what it adds to the profile today. `topics` come from the
         * certificate itself or from the issuer's syllabus for the same version (docs/content.md lists the sources);
         * `built` describes the course's repository.
         */
        items: Record<CertificationId, {
            learned: string;
            topics?: string[];
            earned: string;
            built?: string;
            adds: string;
        }>;
    };
    testimonials: {
        title: string;
        subtitle: Record<ProfileKey, string>;
        translatedNote: string | null;
        showOriginal: string | null;
        previous: string;
        next: string;
        stats: { total: string; supervisors: string; teammates: string };
        relationships: Record<RelationshipId, string>;
        items: Record<TestimonialId, { role: string; context: string; highlight: string; quote: string | null }>;
    };
    resume: {
        title: string;
        /** Which version suits each role view's process. */
        subtitle: Record<ProfileKey, string>;
        download: string;
        open: string;
        previewAlt: string;
        includesTitle: string;
        /** `{count}` is replaced with the number of pages; `one` is used for a single page. */
        pages: { one: string; other: string };
        /** Shown on the preview: the first page out of `{count}`. */
        firstPage: string;
        /** `{date}` is replaced with the day the PDF was rendered. */
        updated: string;
        versions: Record<ResumeId, { label: string; description: string; format: string; includes: string[] }>;
    };
    metrics: {
        title: string;
        subtitle: Record<ProfileKey, string>;
        /** What the figures say about the work each role view cares about. */
        intro: Record<ProfileKey, string>;
        /** `{date}` is replaced with the day the figures were read. */
        asOf: string;
        /** The home keeps the figures; this link leads to the page with every chart. */
        pageLink: string;
        labels: Record<MetricId, string>;
        areas: {
            title: string;
            /** `{commits}`, `{repositories}` and `{date}` are replaced with the counts on default branches and their day. */
            note: string;
            commits: string;
            repositories: string;
            items: Record<CommitAreaId, { name: string; detail: string }>;
        };
        languages: {
            title: string;
            /** `{hours}` is replaced with the coding time WakaTime tracked. */
            note: string;
            byCommits: string;
            byHours: string;
            why: string;
        };
        years: {
            title: string;
            note: string;
            /** `{active}` and `{days}` are replaced with the active days and the days of the year counted. */
            activeDays: string;
            /** Marks the current year, counted up to `{date}`. */
            partial: string;
        };
        habits: {
            weekdaysTitle: string;
            /** Short day names, Sunday first. */
            weekdays: string[];
            editorsTitle: string;
            /** `{reviews}` and `{dependabot}` are replaced with the reviewed pull requests and the dependency updates among them. */
            reviews: string;
            /** `{contributed}` and `{private}` are replaced with the repositories with commits and the private ones among them. */
            repositories: string;
            /** `{created}` and `{issues}` are replaced with the repositories created and the issues opened. */
            more: string;
        };
        load: string;
        imagesTitle: string;
        imageAlts: Record<MetricImageId, string>;
    };
    contact: {
        title: string;
        subtitle: Record<ProfileKey, string>;
        connect: string;
        description: string;
        labels: { location: string; phone: string; email: string; linkedin: string };
        form: { name: string; email: string; message: string; send: string; sendEmail: string; note: string };
        placeholders: { name: string; email: string; message: string };
        whatsappIntro: string;
        emailSubject: string;
        copyEmail: { label: string; done: string; failed: string };
    };
}
