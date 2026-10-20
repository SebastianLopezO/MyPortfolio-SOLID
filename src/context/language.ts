import {createContext, useContext} from "solid-js";
import type {Lang, StartupContent} from "@/types/content";

/** A page renders in one language for its whole life: switching languages loads the other language's page. */
export interface LanguageContextValue {
    lang: Lang;
    alternateLang: Lang;
    content: StartupContent;
}

export const LanguageContext = createContext<LanguageContextValue>();

export const useLanguage = () => {
    const value = useContext(LanguageContext);
    if (!value) throw new Error("useLanguage must be used inside LanguageProvider");
    return value;
};

export const useContent = () => useLanguage().content;
