import {roleConfig, type RoleId} from "@/content/roles";
import {experience} from "@/content/shared/experience";
import {education} from "@/content/shared/education";
import {profile, socialLinks} from "@/content/shared/profile";
import {absoluteUrl, BUILD_DATE, SITE_URL} from "@/content/shared/site";
import {alternates, buildPath} from "@/lib/paths";
import type {Lang, StartupContent} from "@/types/content";

export interface HeadData {
    lang: Lang;
    /** The Open Graph type: profile for the role views, article for the case studies, website for the index. */
    type?: "profile" | "article" | "website";
    title: string;
    description: string;
    canonical: string;
    alternates: { hreflang: string; href: string }[];
    locale: string;
    alternateLocale: string;
    image: string;
    imageAlt: string;
    siteName: string;
    jsonLd: string;
}

export const LOCALES: Record<Lang, string> = {en: "en_US", es: "es_CO"};

const OG_IMAGE_SIZE = {width: 1200, height: 630};

export const ogImagePath = (lang: Lang) => `/og/og-${lang}.jpg`;

const structuredData = (content: StartupContent, role: RoleId | null, canonical: string) => {
    const copy = content.hero.byProfile[role ?? "general"];
    const seo = content.seo.profiles[role ?? "general"];
    const website = `${SITE_URL}/#website`;
    const person = `${SITE_URL}/#person`;
    const graph = [
        {
            "@type": "WebSite",
            "@id": website,
            url: `${SITE_URL}/`,
            name: content.seo.siteName,
            inLanguage: ["en", "es"],
        },
        {
            "@type": "ProfilePage",
            "@id": `${canonical}#page`,
            url: canonical,
            name: seo.title,
            description: seo.description,
            inLanguage: content.lang,
            isPartOf: {"@id": website},
            mainEntity: {"@id": person},
            dateModified: BUILD_DATE,
        },
        {
            "@type": "Person",
            "@id": person,
            name: profile.name,
            givenName: profile.givenName,
            familyName: profile.familyName,
            jobTitle: copy.title,
            description: copy.headline,
            url: `${SITE_URL}/`,
            image: absoluteUrl(ogImagePath(content.lang)),
            email: `mailto:${profile.email}`,
            telephone: profile.phone.e164,
            address: {
                "@type": "PostalAddress",
                addressLocality: profile.location.city,
                addressRegion: profile.location.region,
                addressCountry: profile.location.countryCode,
            },
            alumniOf: [...new Set(education.map((item) => item.school))]
                .slice(0, 2)
                .map((name) => ({"@type": "EducationalOrganization", name})),
            worksFor: experience
                .filter((item) => item.end === null)
                .map((item) => ({"@type": "Organization", name: item.company})),
            knowsAbout: roleConfig(role).topStack,
            knowsLanguage: ["es", "en"],
            sameAs: socialLinks.map((link) => link.href),
        },
    ];
    return JSON.stringify({"@context": "https://schema.org", "@graph": graph}).replace(/</g, "\\u003c");
};

export const buildHead = (content: StartupContent, role: RoleId | null): HeadData => {
    const seo = content.seo.profiles[role ?? "general"];
    const canonical = absoluteUrl(buildPath(content.lang, role));
    const alternateLang: Lang = content.lang === "en" ? "es" : "en";
    return {
        lang: content.lang,
        title: seo.title,
        description: seo.description,
        canonical,
        alternates: alternates(role),
        locale: LOCALES[content.lang],
        alternateLocale: LOCALES[alternateLang],
        image: absoluteUrl(ogImagePath(content.lang)),
        imageAlt: content.seo.ogImageAlt,
        siteName: content.seo.siteName,
        jsonLd: structuredData(content, role, canonical),
    };
};

const escape = (value: string) =>
    value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const meta = (key: string, attribute: "name" | "property", name: string, value: string) =>
    `<meta data-head="${key}" ${attribute}="${name}" content="${escape(value)}">`;

export const renderHeadTags = (head: HeadData) =>
    [
        `<title data-head="title">${escape(head.title)}</title>`,
        meta("description", "name", "description", head.description),
        `<link data-head="canonical" rel="canonical" href="${escape(head.canonical)}">`,
        ...head.alternates.map(
            (alternate) =>
                `<link data-head="alternate-${alternate.hreflang}" rel="alternate" hreflang="${alternate.hreflang}" href="${escape(alternate.href)}">`,
        ),
        meta("og-type", "property", "og:type", head.type ?? "profile"),
        meta("og-site-name", "property", "og:site_name", head.siteName),
        meta("og-title", "property", "og:title", head.title),
        meta("og-description", "property", "og:description", head.description),
        meta("og-url", "property", "og:url", head.canonical),
        meta("og-image", "property", "og:image", head.image),
        meta("og-image-type", "property", "og:image:type", "image/jpeg"),
        meta("og-image-width", "property", "og:image:width", String(OG_IMAGE_SIZE.width)),
        meta("og-image-height", "property", "og:image:height", String(OG_IMAGE_SIZE.height)),
        meta("og-image-alt", "property", "og:image:alt", head.imageAlt),
        meta("og-locale", "property", "og:locale", head.locale),
        meta("og-locale-alternate", "property", "og:locale:alternate", head.alternateLocale),
        ...((head.type ?? "profile") === "profile"
            ? [
                meta("profile-first-name", "property", "profile:first_name", profile.givenName),
                meta("profile-last-name", "property", "profile:last_name", profile.familyName),
            ]
            : []),
        meta("twitter-card", "name", "twitter:card", "summary_large_image"),
        meta("twitter-site", "name", "twitter:site", profile.twitter),
        meta("twitter-title", "name", "twitter:title", head.title),
        meta("twitter-description", "name", "twitter:description", head.description),
        meta("twitter-image", "name", "twitter:image", head.image),
        meta("twitter-image-alt", "name", "twitter:image:alt", head.imageAlt),
        `<script data-head="jsonld" type="application/ld+json">${head.jsonLd}</script>`,
    ].join("\n    ");
