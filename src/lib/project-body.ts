import type {JSX} from "solid-js";
import type {ProjectSlug} from "@/content/shared/project-links";

let render: ((slug: ProjectSlug | null) => JSX.Element) | null = null;

/**
 * Registers the body of the project pages so it renders as soon as the page hydrates. The server entry does it for
 * the prerender, and the client does it before hydrating a project page: a lazy body would hold back the page's
 * effects until its chunk arrived. The lazy body only serves navigation from another page.
 */
export const registerProjectBody = (next: (slug: ProjectSlug | null) => JSX.Element) => {
    render = next;
};

export const renderProjectBody = (slug: ProjectSlug | null) => render?.(slug) ?? null;
