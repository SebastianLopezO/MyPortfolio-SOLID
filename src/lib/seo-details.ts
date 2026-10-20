import {certificateImage} from "@/content/shared/certificate-images";
import {certifications} from "@/content/shared/certifications";
import {
    CERTIFICATION_SLUG,
    type DetailCollection,
    EDUCATION_SLUG,
    EXPERIENCE_SLUG,
    ORGANIZATION_SLUG
} from "@/content/shared/detail-links";
import {education} from "@/content/shared/education";
import {experience} from "@/content/shared/experience";
import {organizations} from "@/content/shared/organizations";
import {absoluteUrl, SITE_URL} from "@/content/shared/site";
import {certificationBySlug, educationBySlug, experienceBySlug, organizationBySlug} from "@/lib/details";
import {formatYearMonth} from "@/lib/format";
import {widestVariant} from "@/lib/image-widths";
import {buildDetailPath, buildPath, detailAlternates, otherLang} from "@/lib/paths";
import {type HeadData, LOCALES} from "@/lib/seo";
import {breadcrumb, graphOf, personNode} from "@/lib/seo-graph";
import type {Content, Lang, StartupContent} from "@/types/content";
import type {DetailPagesCopy} from "@/types/detail";

// Kept apart from seo.ts, like the project pages' heads, so the startup bundle does not carry them.

/** Every job, program, certification and organization has an image of its own; the indexes share one per language. */
export const detailOgImagePath = (lang: Lang, collection: DetailCollection, slug: string | null) =>
    slug ? `/og/${collection}-${slug}-${lang}.jpg` : `/og/${collection}-${lang}.jpg`;

export interface DetailHeadInput {
    collection: DetailCollection;
    slug: string | null;
    title: string;
    description: string;
    /** The page's name in the breadcrumb and the image's alt text. */
    name: string;
    /** The schema.org node of what the page is about: the company, the program, the credential or the organization. */
    about?: object;
    /** On an index, the pages it lists. */
    items?: { slug: string; name: string }[];
}

export const buildDetailHead = (content: StartupContent, copy: DetailPagesCopy, input: DetailHeadInput): HeadData => {
    const {lang} = content;
    const {collection, slug} = input;
    const canonical = absoluteUrl(buildDetailPath(lang, collection, {slug}));
    const index = copy.indexes[collection];
    const page = input.items
        ? {
            "@type": "CollectionPage",
            "@id": `${canonical}#page`,
            url: canonical,
            name: input.title,
            description: input.description,
            inLanguage: lang,
            author: {"@id": `${SITE_URL}/#person`},
            mainEntity: {
                "@type": "ItemList",
                itemListElement: input.items.map((item, position) => ({
                    "@type": "ListItem",
                    position: position + 1,
                    name: item.name,
                    url: absoluteUrl(buildDetailPath(lang, collection, {slug: item.slug})),
                })),
            },
        }
        : {
            "@type": "WebPage",
            "@id": `${canonical}#page`,
            url: canonical,
            name: input.title,
            description: input.description,
            inLanguage: lang,
            author: {"@id": `${SITE_URL}/#person`},
            ...(input.about ? {about: input.about} : {}),
        };
    const crumbs = [
        {name: content.seo.siteName, url: absoluteUrl(buildPath(lang, null))},
        {name: index.title, url: absoluteUrl(buildDetailPath(lang, collection))},
        ...(slug ? [{name: input.name, url: canonical}] : []),
    ];
    return {
        lang,
        type: slug ? "article" : "website",
        title: input.title,
        description: input.description,
        canonical,
        alternates: detailAlternates(collection, slug),
        locale: LOCALES[lang],
        alternateLocale: LOCALES[otherLang(lang)],
        image: absoluteUrl(detailOgImagePath(lang, collection, slug)),
        imageAlt: input.name,
        siteName: content.seo.siteName,
        jsonLd: graphOf([page, personNode(), breadcrumb(crumbs)]),
    };
};

/** The text a detail page's head needs besides its own: the job titles, the degrees and the certifications. */
export interface DetailHeadTexts {
    copy: DetailPagesCopy;
    about: Content["about"];
    certifications: Content["certifications"];
}

const indexInput = (texts: DetailHeadTexts, collection: DetailCollection, items: {
    slug: string;
    name: string
}[]): DetailHeadInput => {
    const index = texts.copy.indexes[collection];
    return {
        collection,
        slug: null,
        title: index.seo.title,
        description: index.seo.description,
        name: index.title,
        items
    };
};

const experienceInput = (texts: DetailHeadTexts, slug: string | null): DetailHeadInput => {
    if (!slug) return indexInput(texts, "experience", experience.map((job) => ({
        slug: EXPERIENCE_SLUG[job.id],
        name: job.company
    })));
    const job = experienceBySlug(slug)!;
    const {seo} = texts.copy.experience[job.id];
    return {
        collection: "experience",
        slug, ...seo,
        name: job.company,
        about: {"@type": "Organization", name: job.company}
    };
};

const educationInput = (texts: DetailHeadTexts, slug: string | null): DetailHeadInput => {
    if (!slug) return indexInput(texts, "education", education.map((program) => ({
        slug: EDUCATION_SLUG[program.id],
        name: texts.about.education[program.id].degree
    })));
    const program = educationBySlug(slug)!;
    const {seo} = texts.copy.education[program.id];
    const degree = texts.about.education[program.id].degree;
    return {
        collection: "education",
        slug,
        ...seo,
        name: degree,
        about: {
            "@type": "EducationalOccupationalProgram",
            name: degree,
            provider: {"@type": "EducationalOrganization", name: program.school}
        },
    };
};

const certificationInput = (texts: DetailHeadTexts, slug: string | null, months: readonly string[]): DetailHeadInput => {
    if (!slug) return indexInput(texts, "certifications", certifications.map((item) => ({
        slug: CERTIFICATION_SLUG[item.id],
        name: item.title
    })));
    const item = certificationBySlug(slug)!;
    const text = texts.certifications.items[item.id];
    const image = certificateImage(item.id);
    // Certificate titles are the same in both languages, so the collection's name keeps each title unique. Search results
    // cut a title past about 65 characters, so a long one leaves the issuer to the description.
    const eyebrow = texts.copy.ui.eyebrow.certifications;
    const withIssuer = `${item.title} (${item.issuer}) · ${eyebrow}`;
    const lead = `${item.issuer}, ${formatYearMonth(item.date, months)}. ${text.learned}`;
    const full = `${lead} ${text.adds}`;
    const description = full.length <= 160 ? full : lead;
    const tailed = `${description} ${texts.copy.ui.certificate.seoTail}`;
    return {
        collection: "certifications",
        slug,
        title: withIssuer.length <= 65 ? withIssuer : `${item.title} · ${eyebrow}`,
        description: description.length < 110 && tailed.length <= 165 ? tailed : description,
        name: item.title,
        about: {
            "@type": "EducationalOccupationalCredential",
            name: item.title,
            credentialCategory: "certificate",
            dateCreated: item.date,
            recognizedBy: {"@type": "Organization", name: item.issuer},
            ...(item.url ? {url: item.url} : {}),
            ...(image ? {image: absoluteUrl(widestVariant(image))} : {}),
        },
    };
};

const organizationInput = (texts: DetailHeadTexts, slug: string | null): DetailHeadInput => {
    if (!slug) return indexInput(texts, "organizations", organizations.map((item) => ({
        slug: ORGANIZATION_SLUG[item.id],
        name: item.name
    })));
    const item = organizationBySlug(slug)!;
    const {seo} = texts.copy.organizations[item.id];
    return {
        collection: "organizations",
        slug, ...seo,
        name: item.name,
        about: {"@type": "Organization", name: item.name, url: item.url}
    };
};

const INPUTS: Record<DetailCollection, (texts: DetailHeadTexts, slug: string | null, months: readonly string[]) => DetailHeadInput> = {
    experience: experienceInput,
    education: educationInput,
    certifications: certificationInput,
    organizations: organizationInput,
};

/** The head of any detail page or index, the same on the server and after hydration. */
export const detailHead = (content: StartupContent, texts: DetailHeadTexts, collection: DetailCollection, slug: string | null) =>
    buildDetailHead(content, texts.copy, INPUTS[collection](texts, slug, content.ui.months));
