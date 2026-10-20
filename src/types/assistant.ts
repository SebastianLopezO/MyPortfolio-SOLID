import type {ProfileKey, RoleId} from "@/content/roles";
import type {DetailCollection} from "@/content/shared/detail-links";
import type {ProjectSlug} from "@/content/shared/project-links";
import type {SectionId} from "@/types/content";

export type IntentId =
    | "greeting"
    | "about"
    | "salary"
    | "experienceYears"
    | "currentRole"
    | "company"
    | "roleFit"
    | "availability"
    | "location"
    | "education"
    | "program"
    | "plans"
    | "security"
    | "languages"
    | "projects"
    | "certifications"
    | "testimonials"
    | "resume"
    | "githubStats"
    | "organizations"
    | "coding"
    | "clients"
    | "industries"
    | "services"
    | "whyHire"
    | "workStyle"
    | "journey"
    | "leadership"
    | "ai"
    | "site"
    | "stack";

/** A page beyond the profile that a fact can link to: a project, or a job, program, certification or organization. */
export type FactPage = { collection: "projects"; slug: ProjectSlug } | { collection: DetailCollection; slug: string };

export interface Fact {
    id: string;
    section: SectionId;
    label: string;
    text: string;
    terms: string[];
    roles: RoleId[];
    /** Facts from a case study or a detail page link to that page instead of a section. */
    page?: FactPage;
}

export type AnswerLinkKind = "section" | "route" | "download" | "external";

export interface AnswerLink {
    kind: AnswerLinkKind;
    label: string;
    href: string;
}

export interface Answer {
    intents: (IntentId | "search" | "fallback")[];
    text: string;
    details: string[];
    links: AnswerLink[];
    /** Questions worth asking next, from the topic of this answer. */
    followUps: string[];
}

export interface CurrentJob {
    title: string;
    company: string;
}

export interface AnswerFacts {
    years: string;
    currentJobs: CurrentJob[];
    topStack: string[];
    certifications: number;
    issuers: number;
    testimonials: number;
    contributions: string;
    commits: string;
    repositories: number;
    organizations: number;
    streak: number;
    asOf: string;
    integrations: string;
    clients: string;
    landingPages: string;
    codingHours: string;
    topLanguages: string[];
    services: string[];
    pages: number;
}

export interface RoleFitFacts extends AnswerFacts {
    role: string;
    stack: string[];
    company: string;
    example: string;
}

export interface ProjectFacts extends AnswerFacts {
    name: string;
    summary: string;
}

export interface CompanyFacts extends AnswerFacts {
    company: string;
    title: string;
    period: string;
    summary: string;
}

export interface ProgramFacts extends AnswerFacts {
    degree: string;
    school: string;
    period: string;
    tagline: string;
}

export interface MatchFacts extends AnswerFacts {
    /** The certifications that match the question, by title. */
    titles: string[];
}

type AnswerCopy = (facts: AnswerFacts) => string;

/**
 * The intents with a plain answer: everything but the ones that need the matched role, project, job or program, and
 * the two told with the about text (how he works, and how he got here).
 */
export type PlainIntent = Exclude<IntentId, "roleFit" | "company" | "program" | "workStyle" | "journey">;

/** Where the follow-up questions come from: an intent, or the kind of thing the answer was about. */
export type FollowUpKey = IntentId | "project" | "search" | "fallback";

export interface AssistantCopy {
    title: string;
    subtitle: string;
    close: string;
    placeholder: string;
    send: string;
    inputLabel: string;
    you: string;
    assistant: string;
    welcome: string;
    suggestionsLabel: string;
    /** Quotes Sebastián's own first-person text inside an answer told in the third person. */
    inHisWords: (text: string) => string;
    /** The first questions offered, for each view. */
    suggestions: Record<ProfileKey, string[]>;
    /** The questions offered after an answer, by its topic. */
    followUps: Partial<Record<FollowUpKey, string[]>>;
    /** Every question the assistant knows how to answer, grouped by topic, behind a "more questions" toggle. */
    catalog: { open: string; close: string; groups: { title: string; questions: string[] }[] };
    links: Record<SectionId | "roleView" | "downloadCv" | "whatsapp" | "email", string>;
    /** Labels of the links to the indexes of the pages beyond the profile. */
    pages: Record<DetailCollection | "projects", string>;
    answers: Record<PlainIntent, AnswerCopy> & {
        roleFit: (facts: RoleFitFacts) => string;
        project: (facts: ProjectFacts) => string;
        company: (facts: CompanyFacts) => string;
        program: (facts: ProgramFacts) => string;
        certificationMatch: (facts: MatchFacts) => string;
        search: AnswerCopy;
        fallback: AnswerCopy;
    };
}
