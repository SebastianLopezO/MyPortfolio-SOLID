import type {YearMonth} from "@/types/content";

export type CaseStudyId = "integrationPlatform" | "smartpot" | "gopoli" | "martech" | "emailSignatures";

export interface CaseFigureFacts {
    id: string;
    value: number;
    /** Shown as "N+" because the real figure keeps growing past it. */
    atLeast?: boolean;
    unit?: "%";
}

export interface CaseImageFacts {
    id: string;
    /** Base path of the AVIF and WebP variants, without the width suffix. */
    base: string;
    widths: number[];
    width: number;
    height: number;
    /** Attribution the image needs, such as the map data under a screenshot. */
    credit?: { text: string; href: string };
    /** A screen of a private system redrawn with fictional data (assets-src/mockups), captioned as such. */
    recreation?: boolean;
}

export interface DiagramFacts {
    /** Columns from left to right; data flows both ways between neighbors. */
    layers: { id: string; nodes: string[] }[];
    /** An optional row under the columns, such as delivery or operations. */
    base?: { id: string; nodes: string[] };
}

export interface CaseStudyFacts {
    id: CaseStudyId;
    start: YearMonth;
    end: YearMonth | null;
    team: number | null;
    links: { demo?: string; code?: string };
    tech: string[];
    figures: CaseFigureFacts[];
    diagram: DiagramFacts;
    images: CaseImageFacts[];
    /** The same screens as a phone shows them, used instead of `images` below 48rem. */
    phoneImages?: CaseImageFacts[];
}

/** A decision told as the problem it answers, what was done and, when there was one, what it cost. */
export interface DecisionCopy {
    title: string;
    problem: string;
    solution: string;
    /** Read after the "The cost:" label, so it starts in lowercase. */
    tradeoff?: string;
}

/** The labels of the two sides of a decision and of its cost. */
export interface DecisionLabels {
    problem: string;
    solution: string;
    tradeoff: string;
}

export interface CaseStudyCopy {
    name: string;
    tagline: string;
    organization: string;
    role: string;
    status: string;
    summary: string;
    problem: string[];
    constraints: string[];
    approach: string[];
    decisions: DecisionCopy[];
    results: string[];
    next: string[];
    figures: Record<string, string>;
    diagram: { title: string; caption: string; labels: Record<string, string> };
    images: Record<string, string>;
    seo: { title: string; description: string };
}

export interface CaseStudiesUi {
    eyebrow: string;
    indexTitle: string;
    indexSubtitle: string;
    indexSeo: { title: string; description: string };
    /** Label of the breadcrumb trail above each project page. */
    breadcrumb: string;
    allProjects: string;
    readCaseStudy: string;
    liveDemo: string;
    viewCode: string;
    privateCode: string;
    overview: { role: string; organization: string; period: string; team: string; status: string; people: string };
    /** Label of the column that holds the overview and figures beside the text on wide screens. */
    atAGlance: string;
    onThisPage: string;
    sections: {
        problem: string;
        constraints: string;
        approach: string;
        architecture: string;
        decisions: string;
        results: string;
        next: string;
        stack: string;
        screens: string
    };
    otherProjects: string;
    archiveTitle: string;
    archiveSubtitle: string;
    archiveColumns: { year: string; project: string; organization: string; stack: string; link: string };
    more: string;
    /** Caption under a recreated screen of a private system. */
    recreation: string;
    /** Hidden text of the link that opens a screen at full size. */
    enlarge: string;
    decisionLabels: DecisionLabels;
}
