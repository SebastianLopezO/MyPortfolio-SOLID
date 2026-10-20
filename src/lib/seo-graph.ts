import {profile} from "@/content/shared/profile";
import {SITE_URL} from "@/content/shared/site";

// The JSON-LD pieces every page after the profile shares: the person behind the site, the breadcrumb and the graph.

export const personNode = () => ({
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: profile.name,
    url: `${SITE_URL}/`
});

export const breadcrumb = (items: { name: string; url: string }[]) => ({
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url
    })),
});

export const graphOf = (nodes: object[]) => JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes
}).replace(/</g, "\u003c");
