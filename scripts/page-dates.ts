import {createHash} from "node:crypto";
import {z} from "zod";
import {decodeEntities} from "./llms.ts";

/**
 * The sitemap's lastmod says when a page last changed what it says, not when the site was built. Each build hashes a
 * page's title, description and visible text and compares the hash with page-dates.json on the live site: a page that
 * says the same keeps its date, and any other takes the build date. Without the live file (the first deploy, no
 * network, another host) every page takes the build date.
 */
export const PAGE_DATES = "page-dates.json";

const PageDates = z.record(z.string(), z.object({hash: z.string().min(1), date: z.iso.date()}));
export type PageDates = z.infer<typeof PageDates>;

const firstMatch = (html: string, pattern: RegExp) => html.match(pattern)?.[1] ?? "";

/** A page's title and description as its head carries them, HTML entities included. */
export const headMeta = (head: string) => ({
    title: firstMatch(head, /<title[^>]*>([^<]*)<\/title>/),
    description: firstMatch(head, /<meta[^>]*name="description"[^>]*content="([^"]*)"/),
});

const ESCAPES: Record<string, string> = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;"};

/**
 * The visible text escaped the way React writes it, which is how the live dates were hashed: Solid escapes only the
 * characters it must (an apostrophe stays one), so without this the move to Solid would redate every page whose words
 * did not change.
 */
const escapeLikeReact = (text: string) => decodeEntities(text).replace(/[&<>"']/g, (character) => ESCAPES[character]);

/** A tag, read past the quoted values: Solid leaves a ">" in an attribute as it is, such as xl:[&>:first-child]:mt-0. */
const TAG = /<(?:"[^"]*"|'[^']*'|[^>"'])+>/g;

/** What a reader and a crawler get from a page: markup, scripts and styles left out. */
export const pageText = (head: string, html: string) => {
    const {title, description} = headMeta(head);
    return [title, description, escapeLikeReact(html.replace(/<(script|style)\b[\s\S]*?<\/\1>/g, " ").replace(TAG, " ").replace(/\s+/g, " ").trim())].join("\n");
};

export async function fetchPageDates(url: string, {timeout = 8000} = {}): Promise<PageDates> {
    try {
        const response = await fetch(url, {signal: AbortSignal.timeout(timeout)});
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return PageDates.parse(await response.json());
    } catch (error) {
        const reason = error instanceof z.ZodError ? z.prettifyError(error) : (error as Error).message;
        console.warn(`Dating every page by this build (${url}: ${reason})`);
        return {};
    }
}

export const datePages = (texts: ReadonlyMap<string, string>, live: PageDates, today: string): PageDates =>
    Object.fromEntries([...texts].map(([path, text]) => {
        const hash = createHash("sha256").update(text).digest("base64url");
        const before = live[path];
        return [path, {hash, date: before?.hash === hash ? before.date : today}];
    }));
