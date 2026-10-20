import type {ParentProps} from "solid-js";
import {LanguageContext} from "@/context/language";
import {otherLang} from "@/lib/paths";
import type {StartupContent} from "@/types/content";

export function LanguageProvider(props: ParentProps<{ content: StartupContent }>) {
    // The content is fixed for the page's life (context/language.ts), so it is read once.
    // eslint-disable-next-line solid/reactivity
    const {content} = props;
    const value = {lang: content.lang, alternateLang: otherLang(content.lang), content};
    return <LanguageContext.Provider value={value}>{props.children}</LanguageContext.Provider>;
}
