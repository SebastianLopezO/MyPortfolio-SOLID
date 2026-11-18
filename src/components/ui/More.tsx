import type {JSX} from "solid-js";
import {ChevronDown} from "@/components/ui/icons";
import {cn} from "@/lib/utils";

/**
 * The second layer of a part of the page: a "Show more" that opens what the first glance leaves out. It is a native
 * details element, so the text stays in the prerendered page for search engines, find in page opens it on a match, it
 * works before the page is interactive, and a reader on assistive technology hears a disclosure. "Expand all" opens
 * every one in its section (lib/disclosures.ts).
 */
export function More(props: {
    /** What the summary says while closed, such as "Show more (4)". */
    label: string;
    /** What it says once open. */
    openLabel: string;
    children: JSX.Element;
    class?: string;
    summaryClass?: string;
}) {
    return (
        <details class={cn("more", props.class)}>
            <summary
                class={cn("inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover", props.summaryClass)}>
                <span class="more-closed">{props.label}</span>
                <span class="more-open">{props.openLabel}</span>
                <ChevronDown class="more-chevron size-4"/>
            </summary>
            {props.children}
        </details>
    );
}
