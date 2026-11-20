import {type JSX, Show} from "solid-js";
import {useContent} from "@/context/language";
import {useSectionReady} from "@/lib/ready";
import {cn, sectionPath} from "@/lib/utils";
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
}

// Heights in px measured on the Spanish home at 390px and 1440px wide. A section off screen is not laid out
// (globals.css, .section) and takes this height until it renders, so they only need to be close.
const HEIGHT: Record<SectionId, readonly [phone: number, desktop: number]> = {
    about: [3600, 2000],
    journey: [1300, 1400],
    services: [1500, 1000],
    reasons: [2700, 1900],
    experience: [4300, 2750],
    skills: [900, 820],
    projects: [2600, 2300],
    certifications: [2100, 1200],
    metrics: [870, 690],
    resume: [1400, 1000],
    testimonials: [950, 900],
    contact: [1300, 900],
};

export function Section(props: SectionProps) {
    const {ui} = useContent();
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
                {/* The heading rises into place as the section enters (globals.css, section-enter). */}
                <header
                    class={cn("section-enter mb-10 md:mb-14", split() ? "lg:sticky lg:top-28 lg:mb-0 lg:self-start" : pair() ? "lg:mb-0" : "max-w-3xl")}>
                    <p aria-hidden="true"
                       class="mb-4 font-mono text-xs text-fg-subtle">{sectionPath(ui.nav[props.id])}</p>
                    <h2 id={`${props.id}-title`} class="text-heading text-fg">
                        {props.title}
                    </h2>
                    <Show when={props.subtitle}>
                        <p class={cn("mt-4 text-fg-muted", split() ? "text-base lg:text-lg" : "text-lg")}>{props.subtitle}</p>
                    </Show>
                    {props.intro}
                </header>
                {/* Beside a "pair" heading the content starts level with the title, under the eyebrow's line (1rem) and
                    its margin (1rem). */}
                <div class={cn("min-w-0", pair() && "lg:pt-8")}>{props.children}</div>
            </div>
        </section>
    );
}
