import {type JSX, Show} from "solid-js";
import {useSectionReady} from "@/lib/ready";
import {cn} from "@/lib/utils";
import type {SectionId} from "@/types/content";

interface SectionProps {
    id: SectionId;
    title: string;
    subtitle?: string;
    children: JSX.Element;
    class?: string;
    tone?: "plain" | "raised";
    /**
     * How the heading sits. "wide" puts it above content that needs the whole row (grids, charts, timelines); "split"
     * keeps it in a narrow column at the left that stays in view while the list beside it scrolls, so a section of
     * rows reads like an index; "pair" gives the heading and what it carries (intro) the left half and the content the
     * right half, its top level with the title. Below 64rem they all stack.
     */
    layout?: "wide" | "split" | "pair";
    /** What the heading carries under its subtitle in a "pair" layout, such as the ways to reach me. */
    intro?: JSX.Element;
    /** Additional 100dvh snap boxes that belong to the same section when its content spans more than one viewport. */
    screens?: JSX.Element;
}

// Safe heights in px measured across mobile (390px) and desktop (1440px). Off-screen sections on phones reserve this
// height under content-visibility: auto; keeping estimates at or slightly above actual height prevents off-screen
// bounding boxes from overlapping the following section during accessibility audits.
const HEIGHT: Record<SectionId, readonly [phone: number, desktop: number]> = {
    about: [2200, 1200],
    journey: [1300, 960],
    services: [1250, 760],
    reasons: [2200, 1500],
    experience: [2400, 1600],
    skills: [900, 820],
    projects: [3100, 1700],
    certifications: [1750, 960],
    metrics: [720, 560],
    resume: [1300, 840],
    testimonials: [920, 760],
    contact: [1200, 760],
};

export function Section(props: SectionProps) {
    // A section keeps its id for its whole life: the home page keys each slot by it.
    // eslint-disable-next-line solid/reactivity
    useSectionReady(props.id);
    const split = () => props.layout === "split";
    const pair = () => props.layout === "pair";
    return (
        // A link of the header jumps here: the section takes the focus, so the next Tab continues inside it, and as it
        // is no control it shows no ring.
        <section
            id={props.id}
            data-testid={`section-${props.id}`}
            aria-labelledby={`${props.id}-title`}
            tabindex={-1}
            class={cn("section focus-visible:outline-none", props.tone === "raised" && "bg-surface", props.class)}
            style={{
                "--section-height": `${HEIGHT[props.id][0]}px`,
                "--section-height-lg": `${HEIGHT[props.id][1]}px`,
            }}
        >
            <div
                class={cn("container-page", split() && "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,2.15fr)] lg:gap-16",
                    pair() && "lg:grid lg:grid-cols-2 lg:gap-16")}>
                <Show when={!split() && !pair()} fallback={
                    <>
                        <header
                            class={cn("section-enter mb-8 md:mb-10", split() ? "lg:sticky lg:top-28 lg:mb-0 lg:self-start" : "lg:mb-0")}>
                            <h2 id={`${props.id}-title`} data-testid={`section-title-${props.id}`} class="text-heading text-fg">
                                {props.title}
                            </h2>
                            <Show when={props.subtitle}>
                                <p data-testid={`section-subtitle-${props.id}`} class={cn("mt-3 text-fg-muted", split() ? "text-base lg:text-lg" : "text-base sm:text-lg")}>{props.subtitle}</p>
                            </Show>
                            {props.intro}
                        </header>
                        <div class="min-w-0">{props.children}</div>
                    </>
                }>
                    <div class="min-w-0">
                        {/* The heading rises into place as the section enters (globals.css, section-enter). */}
                        <header class="section-enter mb-8 max-w-3xl md:mb-10">
                            <h2 id={`${props.id}-title`} data-testid={`section-title-${props.id}`} class="text-heading text-fg">
                                {props.title}
                            </h2>
                            <Show when={props.subtitle}>
                                <p data-testid={`section-subtitle-${props.id}`} class="mt-3 text-base text-fg-muted sm:text-lg">{props.subtitle}</p>
                            </Show>
                            {props.intro}
                        </header>
                        <div class="min-w-0">{props.children}</div>
                    </div>
                    {props.screens}
                </Show>
            </div>
        </section>
    );
}
