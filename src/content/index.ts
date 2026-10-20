import type {AssistantCopy} from "@/types/assistant";
import type {CaseStudyCopy, CaseStudyId} from "@/types/case-study";
import type {Content, Lang, StartupContent} from "@/types/content";

/** The copy the page hydrates with: head, header, hero and figures. */
export const loadContent = async (lang: Lang): Promise<StartupContent> =>
    lang === "es" ? (await import("./es/startup")).default : (await import("./en/startup")).default;

const fullContents = new Map<Lang, Promise<Content>>();

/** Every piece of copy, for the assistant; its section modules are the chunks the sections load themselves. */
export const loadFullContent = (lang: Lang): Promise<Content> => {
    let content = fullContents.get(lang);
    if (!content) {
        content = lang === "es" ? import("./es").then((module) => module.default) : import("./en").then((module) => module.default);
        fullContents.set(lang, content);
    }
    return content;
};

const assistantCopies = new Map<Lang, Promise<AssistantCopy>>();

export const loadAssistantCopy = (lang: Lang): Promise<AssistantCopy> => {
    let copy = assistantCopies.get(lang);
    if (!copy) {
        copy = lang === "es"
            ? import("./es/assistant").then((module) => module.assistant)
            : import("./en/assistant").then((module) => module.assistant);
        assistantCopies.set(lang, copy);
    }
    return copy;
};

const caseStudyCopies = new Map<Lang, Promise<Record<CaseStudyId, CaseStudyCopy>>>();

/** Case study text for the assistant; it shares the chunk the project pages load. */
export const loadCaseStudyCopy = (lang: Lang): Promise<Record<CaseStudyId, CaseStudyCopy>> => {
    let copy = caseStudyCopies.get(lang);
    if (!copy) {
        copy = lang === "es"
            ? import("./case-studies/es").then((module) => module.items)
            : import("./case-studies/en").then((module) => module.items);
        caseStudyCopies.set(lang, copy);
    }
    return copy;
};
