import type {JSX} from "solid-js";
import type {DetailCollection} from "@/content/shared/detail-links";

let render: ((collection: DetailCollection, slug: string | null) => JSX.Element) | null = null;

/**
 * Registers the body of the job, program, certification and organization pages so it renders as soon as the page
 * hydrates, for the same reason as the project pages (lib/project-body.ts): the server entry does it for the
 * prerender, and the client before hydrating one of these pages.
 */
export const registerDetailBody = (next: (collection: DetailCollection, slug: string | null) => JSX.Element) => {
    render = next;
};

export const renderDetailBody = (collection: DetailCollection, slug: string | null) => render?.(collection, slug) ?? null;
