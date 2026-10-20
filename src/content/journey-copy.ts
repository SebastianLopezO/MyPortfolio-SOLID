import {journey as en} from "@/content/en/journey";
import {journey as es} from "@/content/es/journey";
import type {Lang} from "@/types/content";
import type {JourneyCopy} from "@/types/journey";

/**
 * The journey text lives apart from the rest of the content: only the journey components import it, so it ships in
 * their lazy chunk instead of the startup bundle.
 */
export const journeyCopy: Record<Lang, JourneyCopy> = {en, es};
