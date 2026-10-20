import {isCaseStudy, projectIdBySlug, type ProjectSlug} from "@/content/shared/project-links";
import {absoluteUrl, SITE_URL} from "@/content/shared/site";
import {widestVariant} from "@/lib/image-widths";
import {buildPath, buildProjectPath, projectAlternates} from "@/lib/paths";
import {type HeadData, LOCALES, ogImagePath} from "@/lib/seo";
import {breadcrumb, graphOf, personNode} from "@/lib/seo-graph";
import type {CaseImageFacts, CaseStudiesUi, CaseStudyCopy, CaseStudyFacts} from "@/types/case-study";
import type {Lang, StartupContent} from "@/types/content";
import type {ProjectCardCopy, ProjectFacts, ProjectPageCopy} from "@/types/project";

// Kept apart from seo.ts so the startup bundle, which builds the profile heads, does not carry the project pages' heads.

/** Case studies keep their original image names; the other project pages use their own prefix. */
export const projectOgImagePath = (lang: Lang, slug: ProjectSlug) =>
    `/og/${isCaseStudy(projectIdBySlug(slug)) ? "case" : "project"}-${slug}-${lang}.jpg`;

/** The share image first, then each screen of the project with its alt text as the caption. */
const imagesOf = (share: string, screens: CaseImageFacts[], alts: Record<string, string>) => [
    share,
    ...screens.map((screen) => ({
        "@type": "ImageObject",
        contentUrl: absoluteUrl(widestVariant(screen)),
        caption: alts[screen.id]
    })),
];

/** Head of the projects index: every project as an item list. */
export const buildProjectsHead = (content: StartupContent, ui: CaseStudiesUi, items: {
    slug: ProjectSlug;
    name: string
}[]): HeadData => {
    const canonical = absoluteUrl(buildProjectPath(content.lang));
    const alternateLang: Lang = content.lang === "en" ? "es" : "en";
    const home = absoluteUrl(buildPath(content.lang, null));
    return {
        lang: content.lang,
        type: "website",
        title: ui.indexSeo.title,
        description: ui.indexSeo.description,
        canonical,
        alternates: projectAlternates(null),
        locale: LOCALES[content.lang],
        alternateLocale: LOCALES[alternateLang],
        image: absoluteUrl(ogImagePath(content.lang)),
        imageAlt: content.seo.ogImageAlt,
        siteName: content.seo.siteName,
        jsonLd: graphOf([
            {
                "@type": "CollectionPage",
                "@id": `${canonical}#page`,
                url: canonical,
                name: ui.indexSeo.title,
                description: ui.indexSeo.description,
                inLanguage: content.lang,
                author: {"@id": `${SITE_URL}/#person`},
                mainEntity: {
                    "@type": "ItemList",
                    itemListElement: items.map((item, index) => ({
                        "@type": "ListItem",
                        position: index + 1,
                        name: item.name,
                        url: absoluteUrl(buildProjectPath(content.lang, {slug: item.slug})),
                    })),
                },
            },
            personNode(),
            breadcrumb([{name: content.seo.siteName, url: home}, {name: ui.indexTitle, url: canonical}]),
        ]),
    };
};

/** Head of one case study, shared as an article written by the person behind the site. */
export const buildCaseStudyHead = (content: StartupContent, ui: CaseStudiesUi, slug: ProjectSlug, copy: CaseStudyCopy, facts: CaseStudyFacts): HeadData => {
    const canonical = absoluteUrl(buildProjectPath(content.lang, {slug}));
    const alternateLang: Lang = content.lang === "en" ? "es" : "en";
    const image = absoluteUrl(projectOgImagePath(content.lang, slug));
    return {
        lang: content.lang,
        type: "article",
        title: copy.seo.title,
        description: copy.seo.description,
        canonical,
        alternates: projectAlternates(slug),
        locale: LOCALES[content.lang],
        alternateLocale: LOCALES[alternateLang],
        image,
        imageAlt: copy.name,
        siteName: content.seo.siteName,
        jsonLd: graphOf([
            {
                "@type": "CreativeWork",
                "@id": `${canonical}#case`,
                url: canonical,
                name: copy.name,
                headline: copy.seo.title,
                description: copy.seo.description,
                abstract: copy.summary,
                inLanguage: content.lang,
                image: imagesOf(image, facts.images, copy.images),
                dateCreated: facts.start,
                keywords: facts.tech.join(", "),
                author: {"@id": `${SITE_URL}/#person`},
                ...(facts.links.code ? {codeRepository: facts.links.code} : {}),
            },
            personNode(),
            breadcrumb([
                {name: content.seo.siteName, url: absoluteUrl(buildPath(content.lang, null))},
                {name: ui.indexTitle, url: absoluteUrl(buildProjectPath(content.lang))},
                {name: copy.name, url: canonical},
            ]),
        ]),
    };
};

/** Head of a project page without a full case study, shared as a creative work like the case studies. */
export const buildProjectPageHead = (
    content: StartupContent,
    ui: CaseStudiesUi,
    slug: ProjectSlug,
    card: ProjectCardCopy,
    page: ProjectPageCopy,
    facts: ProjectFacts,
): HeadData => {
    const canonical = absoluteUrl(buildProjectPath(content.lang, {slug}));
    const alternateLang: Lang = content.lang === "en" ? "es" : "en";
    const image = absoluteUrl(projectOgImagePath(content.lang, slug));
    return {
        lang: content.lang,
        type: "article",
        title: page.seo.title,
        description: page.seo.description,
        canonical,
        alternates: projectAlternates(slug),
        locale: LOCALES[content.lang],
        alternateLocale: LOCALES[alternateLang],
        image,
        imageAlt: card.name,
        siteName: content.seo.siteName,
        jsonLd: graphOf([
            {
                "@type": "CreativeWork",
                "@id": `${canonical}#project`,
                url: canonical,
                name: card.name,
                headline: page.seo.title,
                description: page.seo.description,
                abstract: card.summary,
                inLanguage: content.lang,
                image: imagesOf(image, facts.images ?? [], page.images),
                dateCreated: facts.start,
                keywords: facts.tech.join(", "),
                author: {"@id": `${SITE_URL}/#person`},
                ...(facts.links.code ? {codeRepository: facts.links.code} : {}),
            },
            personNode(),
            breadcrumb([
                {name: content.seo.siteName, url: absoluteUrl(buildPath(content.lang, null))},
                {name: ui.indexTitle, url: absoluteUrl(buildProjectPath(content.lang))},
                {name: card.name, url: canonical},
            ]),
        ]),
    };
};
