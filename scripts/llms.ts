/**
 * llms.txt (llmstxt.org), the map of the site that language models read. It is built from the title and description
 * each page already carries, so it says nothing the pages do not, and lists the English pages; each has a Spanish twin
 * under /es.
 */
export interface LlmsPage {
    path: string;
    title: string;
    description: string;
}

export interface LlmsProfile {
    name: string;
    email: string;
    github: string;
    linkedin: string;
}

const SECTIONS = [
    {heading: "Profile", match: /^\/en(?:\/(?:backend|crm|data|devops|fullstack))?$/},
    {heading: "Projects and case studies", match: /^\/en\/projects(?:\/|$)/},
    {heading: "Experience", match: /^\/en\/experience(?:\/|$)/},
    {heading: "Education", match: /^\/en\/education(?:\/|$)/},
    {heading: "GitHub organizations", match: /^\/en\/organizations(?:\/|$)/},
    {heading: "Services", match: /^\/en\/services$/},
    {heading: "GitHub metrics", match: /^\/en\/metrics$/},
];
// The certifications are many and secondary, so they go under "Optional", the section a reader may skip.
const OPTIONAL = /^\/en\/certifications(?:\/|$)/;

const ENTITIES: Record<string, string> = {
    "&amp;": "&",
    "&quot;": '"',
    "&#x27;": "'",
    "&#39;": "'",
    "&lt;": "<",
    "&gt;": ">"
};

/** Titles and descriptions come from the page heads, escaped for HTML; llms.txt is plain Markdown. */
export const decodeEntities = (text: string) => text.replace(/&(?:amp|quot|#x27|#39|lt|gt);/g, (entity) => ENTITIES[entity]);

const RESUME = /-ATS-(Long-)?(EN|ES)\.pdf$/;

const resumeLabel = (file: string) => {
    const [, long, lang] = file.match(RESUME)!;
    return `${long ? "Long resume" : "Resume"}, ${lang === "EN" ? "English" : "Spanish"} (PDF)`;
};

export function buildLlmsTxt({site, pages, profile, resumes}: {
    site: string;
    pages: LlmsPage[];
    profile: LlmsProfile;
    resumes: string[];
}) {
    const home = pages.find((page) => page.path === "/en");
    if (!home) throw new Error("llms.txt needs the English home page");
    const links = (match: RegExp) =>
        pages.filter((page) => match.test(page.path)).map(({
                                                               path,
                                                               title,
                                                               description
                                                           }) => `- [${title}](${site}${path}): ${description}`);
    const section = (heading: string, lines: string[]) => (lines.length ? [`## ${heading}`, "", ...lines, ""] : []);
    return [
        `# ${profile.name}`,
        "",
        `> ${home.description}`,
        "",
        "Every page listed here also exists in Spanish, at the same address with /es in place of /en.",
        "",
        ...SECTIONS.flatMap(({heading, match}) => section(heading, links(match))),
        ...section("Resumes", resumes.filter((file) => RESUME.test(file)).sort().map((file) => `- [${resumeLabel(file)}](${site}/cv/${file})`)),
        ...section("Contact", [`- [Email](mailto:${profile.email})`, `- [LinkedIn](${profile.linkedin})`, `- [GitHub](${profile.github})`]),
        ...section("Optional", links(OPTIONAL)),
    ].join("\n");
}
