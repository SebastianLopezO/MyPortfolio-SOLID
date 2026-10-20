import {ROLE_IDS, type RoleId, ROLES} from "@/content/roles";
import {tokenize} from "@/lib/assistant/normalize";
import type {EducationId, ExperienceId} from "@/types/content";
import type {ProjectId} from "@/types/project";
import type {IntentId} from "@/types/assistant";

interface Pattern {
    all: string[];
    none?: string[];
}

const any = (...tokens: string[]): Pattern[] => tokens.map((token) => ({all: [token]}));

/** The order is the priority: a question that matches several rules gets the first two answers. */
const RULES: { id: Exclude<IntentId, "roleFit" | "greeting" | "company" | "program">; patterns: Pattern[] }[] = [
    {id: "salary", patterns: any("salary")},
    {id: "site", patterns: any("thissite", "assistantself")},
    {id: "about", patterns: any("aboutperson")},
    {id: "whyHire", patterns: [{all: ["why", "hire"]}, {all: ["reason", "hire"]}, ...any("strength")]},
    {id: "workStyle", patterns: any("mindset")},
    {id: "journey", patterns: any("trajectory")},
    // "Leads" are also what a CRM captures, so a question about them is not about leading people.
    {
        id: "leadership",
        patterns: [{all: ["lead"], none: ["crm", "zoho", "campaign", "landing", "form", "capture", "contact"]}]
    },
    {
        id: "experienceYears",
        patterns: [
            {all: ["year"], none: ["graduation", "education", "degree", "university"]},
            {all: ["seniority"]},
            {all: ["howmany", "experience"]},
        ],
    },
    {
        id: "currentRole",
        patterns: [
            {all: ["current"], none: ["available", "open", "opportunity", "year"]},
            {all: ["company"]},
            {all: ["where", "work"]},
        ],
    },
    {
        id: "availability",
        patterns: [...any("available", "open", "opportunity", "contact", "email", "phone", "whatsapp", "freelance"), {
            all: ["hire"],
            none: ["why", "reason"]
        }],
    },
    {
        id: "location",
        patterns: [
            ...any("location", "live", "city", "country", "remote", "hybrid", "onsite", "relocate", "timezone", "medellin", "colombia"),
            {all: ["where"], none: ["work", "education", "university", "degree", "cv", "project"]},
        ],
    },
    {
        id: "plans",
        patterns: [...any("plan", "goal", "master", "specialization", "sdg"), {all: ["cybersecurity", "education"]}]
    },
    {id: "security", patterns: [{all: ["cybersecurity"], none: ["plan", "goal", "master", "specialization"]}]},
    {
        id: "education",
        patterns: any("education", "university", "degree", "graduation", "engineering", "semester", "sena", "school", "highschool", "diploma")
    },
    {
        id: "languages",
        patterns: [
            ...any("idioma", "english", "spanish", "speak", "bilingual"),
            {all: ["language"], none: ["programming", "use", "stack"]},
        ],
    },
    {id: "projects", patterns: any("project", "smartpot", "gopoli", "peppercrm", "taurus")},
    {id: "certifications", patterns: any("certification")},
    {id: "testimonials", patterns: any("recommendation", "colleague")},
    {id: "resume", patterns: any("cv")},
    {id: "clients", patterns: any("client")},
    {id: "industries", patterns: any("industry")},
    {
        id: "services",
        patterns: [...any("offer"), {
            all: ["service"],
            none: ["deploy", "integration", "run", "operate", "observability", "web"]
        }]
    },
    {id: "organizations", patterns: any("organization")},
    {id: "coding", patterns: any("hour", "editor")},
    {id: "ai", patterns: any("ai", "ml")},
    {
        id: "githubStats",
        patterns: [{
            all: ["github"],
            none: ["organization"]
        }, ...any("commit", "repository", "contribution", "streak", "metric", "opensource")],
    },
    {
        id: "stack",
        patterns: [...any("stack", "skill", "framework"), {all: ["programming", "language"]}, {all: ["language", "use"]}],
    },
];

const GREETINGS = new Set(["hello", "good", "morning", "afternoon", "evening", "there", "tarde", "noche", "dia"]);

/** Projects a question can name, by the token their name leaves after normalizing. */
const PROJECT_TOKENS: Partial<Record<string, ProjectId>> = {
    smartpot: "smartpot",
    gopoli: "gopoli",
    peppercrm: "peppercrm",
    taurus: "taurus",
    widget: "crmWidgets",
    snapshot: "crmSnapshots",
    signature: "emailSignatures",
    martech: "martech",
    embudo: "martech",
    funnel: "martech",
    cumpleano: "emailAutomations",
    birthday: "emailAutomations",
    inmobiliaria: "realEstateSite",
    inmueble: "realEstateSite",
    estate: "realEstateSite",
    wasi: "realEstateSite",
    toolkit: "zohoToolkit",
    recaudo: "collectionAutomation",
};

// Tokens are stemmed: "tivenos" loses its final s.
const COMPANY_TOKENS: Partial<Record<string, ExperienceId>> = {
    tiveno: "tivenos",
    adcom: "adcom",
    muvu: "muvu",
    quipux: "quipux"
};

const PROGRAM_TOKENS: Partial<Record<string, EducationId>> = {
    sena: "sena",
    inem: "inem",
    pascual: "pascual",
    diploma: "cyberDiploma",
    highschool: "inem"
};

const ROLE_KEYWORDS: Record<RoleId, Set<string>> = Object.fromEntries(
    ROLE_IDS.map((role) => [role, new Set(ROLES[role].keywords.flatMap(tokenize))]),
) as Record<RoleId, Set<string>>;

/** What the answer about a named job already tells, so those intents do not answer a second time. */
const COMPANY_COVERS = new Set<IntentId>(["currentRole", "projects", "experienceYears"]);

/** The intents that leave room for a role fit answer: a question that asks for something else gets that instead. */
const ROLE_FRIENDLY = new Set<IntentId>(["experienceYears", "currentRole", "stack"]);

export interface Detection {
    intents: IntentId[];
    role: RoleId | null;
    project: ProjectId | null;
    company: ExperienceId | null;
    program: EducationId | null;
}

const matches = (tokens: Set<string>, {all, none = []}: Pattern) =>
    all.every((token) => tokens.has(token)) && !none.some((token) => tokens.has(token));

export const detectRole = (tokens: string[], preferred: RoleId | null): RoleId | null => {
    let best: RoleId | null = null;
    let bestScore = 0;
    for (const role of ROLE_IDS) {
        const score = tokens.filter((token) => ROLE_KEYWORDS[role].has(token)).length;
        if (score > bestScore || (score === bestScore && score > 0 && role === preferred)) {
            best = role;
            bestScore = score;
        }
    }
    return best;
};

const firstOf = <T>(tokens: string[], table: Partial<Record<string, T>>): T | null => tokens.map((token) => table[token]).find(Boolean) ?? null;

export const detect = (query: string, activeRole: RoleId | null): Detection => {
    const tokens = tokenize(query);
    const set = new Set(tokens);
    const project = firstOf(tokens, PROJECT_TOKENS);
    const company = firstOf(tokens, COMPANY_TOKENS);
    const program = firstOf(tokens, PROGRAM_TOKENS);
    const none = {project: null, company: null, program: null};

    if (tokens.length > 0 && tokens.every((token) => GREETINGS.has(token))) {
        return {intents: ["greeting"], role: null, ...none};
    }

    const role = detectRole(tokens, activeRole) ?? (set.has("fit") || set.has("role") ? activeRole : null);
    const matched: IntentId[] = RULES.filter((rule) => rule.patterns.some((pattern) => matches(set, pattern))).map((rule) => rule.id);

    if (matched.includes("salary")) return {intents: ["salary"], role, project, company: null, program: null};

    // A named job or program answers first; a named project brings the projects intent with it.
    if (company) {
        const rest = matched.filter((intent) => !COMPANY_COVERS.has(intent));
        return {intents: (["company", ...rest] as IntentId[]).slice(0, 2), role, project, company, program: null};
    }
    if (program) {
        const rest = matched.filter((intent) => intent !== "education");
        return {intents: (["program", ...rest] as IntentId[]).slice(0, 2), role, project: null, company: null, program};
    }
    if (project && !matched.includes("projects")) matched.unshift("projects");

    const roleFits = role !== null && !project && matched.every((intent) => ROLE_FRIENDLY.has(intent));
    const intents = roleFits ? insertRoleFit(matched) : matched;
    if (!role && (set.has("fit") || set.has("role")) && !intents.includes("stack")) intents.push("stack");
    return {intents: intents.slice(0, 2), role, project, company: null, program: null};
};

const insertRoleFit = (matched: IntentId[]): IntentId[] => {
    const rest = matched.filter((intent) => intent !== "stack");
    const index = rest.findIndex((intent) => intent !== "experienceYears" && intent !== "currentRole");
    return index === -1 ? [...rest, "roleFit"] : [...rest.slice(0, index), "roleFit", ...rest.slice(index)];
};
