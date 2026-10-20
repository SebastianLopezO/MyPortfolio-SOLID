import {createEffect} from "solid-js";
import type {HeadData} from "@/lib/seo";

// Unchanged values are not written again: setting the same `lang` on <html> still recalculates every style.
const setAttribute = (element: Element | null, name: string, value: string) => {
    if (element && element.getAttribute(name) !== value) element.setAttribute(name, value);
};

const setContent = (key: string, value: string) =>
    setAttribute(document.head.querySelector(`[data-head="${key}"]`), "content", value);

const setHref = (key: string, value: string) =>
    setAttribute(document.head.querySelector(`[data-head="${key}"]`), "href", value);

/** Keeps the prerendered head in step with the page as the visitor navigates without reloading. */
export function useDocumentHead(head: () => HeadData) {
    createEffect(() => {
        const {title, lang, description, canonical, type, image, imageAlt, alternates, jsonLd} = head();
        if (document.title !== title) document.title = title;
        setAttribute(document.documentElement, "lang", lang);
        for (const key of ["description", "og-description", "twitter-description"]) setContent(key, description);
        for (const key of ["og-title", "twitter-title"]) setContent(key, title);
        setContent("og-url", canonical);
        setContent("og-type", type ?? "profile");
        setContent("og-image", image);
        setContent("twitter-image", image);
        setContent("og-image-alt", imageAlt);
        setContent("twitter-image-alt", imageAlt);
        setHref("canonical", canonical);
        for (const alternate of alternates) setHref(`alternate-${alternate.hreflang}`, alternate.href);
        const script = document.head.querySelector('[data-head="jsonld"]');
        if (script && script.textContent !== jsonLd) script.textContent = jsonLd;
    });
}
