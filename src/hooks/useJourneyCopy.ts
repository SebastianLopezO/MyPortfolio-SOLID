import {journeyCopy} from "@/content/journey-copy";
import {useLanguage} from "@/context/language";

export const useJourneyCopy = () => journeyCopy[useLanguage().lang];
