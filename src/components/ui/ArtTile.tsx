import {mergeProps, Show} from "solid-js";
import {Dynamic} from "solid-js/web";
import {ArrowUpRight} from "@/components/ui/icons";
import type {Art} from "@/content/shared/page-art";
import {withBase} from "@/lib/base";
import {cn} from "@/lib/utils";
import {Link} from "@/routes/Router";

export interface ArtTileProps {
    art: Art;
    name: string;
    /** Two to five words under the name. */
    brief: string;
    href: string;
    /** A short mark in the corner, such as "Case study" or the years. */
    tag?: string;
    headingLevel?: "h2" | "h3" | "h4";
    /** The tile spans the row: the illustration sits beside the text instead of above it. */
    wide?: boolean;
    /** What a wide tile adds under the brief: one sentence of summary. */
    summary?: string;
    /** The first tiles on screen when the page opens load their illustration at once. */
    eager?: boolean;
    /** Names that stay as they are, such as a GitHub organization, are not translated by the browser. */
    keepName?: boolean;
    class?: string;
    "data-testid"?: string;
}

/**
 * Something at a glance: its illustration on its own layer of color, its name and a few words, and nothing else. The
 * whole tile is the link to its page, which tells the rest. Hovering lifts the illustration and leans the arrow. A
 * project, a job, a program, an organization, a service and a reason all use it.
 */
export function ArtTile(rawProps: ArtTileProps) {
    const props = mergeProps({headingLevel: "h3" as const, wide: false, eager: false}, rawProps);

    return (
        <article data-testid={props["data-testid"]} class={cn("project-tile group h-full", props.class)}>
            <Link
                to={props.href}
                data-testid={props["data-testid"] ? `${props["data-testid"]}-link` : undefined}
                class={cn(
                    "tile-surface relative flex h-full flex-col overflow-clip rounded-xl text-fg md:rounded-2xl",
                    props.wide && "md:grid md:grid-cols-[1fr_1.15fr] md:items-stretch",
                )}
            >
                <span
                    aria-hidden="true"
                    class="absolute inset-0 -z-10 rounded-[inherit]"
                    style={{background: `var(--color-tile-${props.art.tile})`}}
                />
                <div
                    class={cn(
                        "tile-art relative grid place-items-center",
                        props.wide ? "aspect-video md:order-2 md:aspect-auto md:min-h-64" : "aspect-[4/3]",
                    )}>
                    <img
                        src={withBase(props.art.file)}
                        alt=""
                        width={400}
                        height={400}
                        loading={props.eager ? "eager" : "lazy"}
                        decoding="async"
                        class={cn(
                            "tile-illustration h-auto object-contain",
                            props.wide ? "w-1/2 max-w-56 md:w-2/3 md:max-w-72" : "max-h-48 w-2/3",
                        )}
                    />
                </div>
                <div
                    class={cn(
                        "relative flex flex-1 flex-col px-4 pb-4 sm:px-5 sm:pb-5",
                        props.wide ? "pr-11 md:justify-center md:p-8" : "pr-10 sm:pr-11",
                    )}>
                    <Show when={props.tag}>
                        <span
                            class="tile-tag absolute top-0 right-4 -translate-y-[calc(100%+0.75rem)] rounded-full bg-bg/80 px-2.5 py-0.5 font-mono text-xs text-fg-muted backdrop-blur md:static md:mb-3 md:translate-y-0 md:self-start">
                            {props.tag}
                        </span>
                    </Show>
                    <Dynamic
                        component={props.headingLevel}
                        translate={props.keepName ? "no" : undefined}
                        class={cn("tracking-tight text-pretty [overflow-wrap:anywhere]", props.wide ? "text-heading" : "text-base leading-snug sm:text-lg")}
                    >
                        {props.name}
                    </Dynamic>
                    <p class={cn("mt-1 text-fg-muted", props.wide ? "mt-2 text-base sm:text-lg" : "text-xs leading-snug sm:text-sm")}>{props.brief}</p>
                    <Show when={props.wide && props.summary}>
                        <p class="mt-3 hidden max-w-xl text-sm leading-relaxed text-fg-muted md:block">{props.summary}</p>
                    </Show>
                </div>
                <ArrowUpRight
                    class="tile-arrow absolute right-4 bottom-4 size-5 text-fg-muted"/>
            </Link>
        </article>
    );
}
