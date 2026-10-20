import * as en from "@/content/case-studies/en";
import * as es from "@/content/case-studies/es";
import type {CaseStudiesUi, CaseStudyCopy, CaseStudyId} from "@/types/case-study";
import type {Lang} from "@/types/content";

/**
 * Case study text lives apart from the rest of the content: only the project pages and the server entry import it,
 * so it ships in the project pages' chunk instead of the startup bundle.
 */
export const caseStudyCopy: Record<Lang, { ui: CaseStudiesUi; items: Record<CaseStudyId, CaseStudyCopy> }> = {en, es};
