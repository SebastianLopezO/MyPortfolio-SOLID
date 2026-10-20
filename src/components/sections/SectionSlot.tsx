import {type Component, lazy} from "solid-js";
import {Dynamic} from "solid-js/web";
import {useLanguage} from "@/context/language";
import {serverSection} from "@/lib/server-sections";
import type {Lang, SectionId} from "@/types/content";
import {loadSection} from "./section-loaders";

const LAZY = new Map<string, Component>();

const lazySection = (id: SectionId, lang: Lang) => {
    const key = `${lang}:${id}`;
    let section = LAZY.get(key);
    if (!section) {
        section = lazy(() => loadSection(id, lang));
        LAZY.set(key, section);
    }
    return section;
};

// Each section is prerendered, but its code and copy load in their own chunks. While they download, Solid leaves the
// server HTML of the section in place and hydrates it once they arrive, so the startup bundle carries only the hero.
export function SectionSlot(props: { id: SectionId }) {
    const {lang} = useLanguage();
    return <Dynamic component={serverSection(props.id) ?? lazySection(props.id, lang)}/>;
}
