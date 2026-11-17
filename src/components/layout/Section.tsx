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
}

// Heights in px measured on the Spanish home at 390px and 1440px wide. A section off screen is not laid out
// (globals.css, .section) and takes this height until it renders, so they only need to be close.
const HEIGHT: Record<SectionId, readonly [phone: number, desktop: number]> = {
    about: [5700, 2800],
    journey: [1300, 1400],
    services: [1600, 3200],
    experience: [5200, 3100],
    skills: [2200, 1300],
    projects: [6300, 7000],
    certifications: [2100, 1200],
    metrics: [4200, 2200],
    resume: [1400, 1000],
    testimonials: [950, 950],
    contact: [1300, 900],
};

export function Section(props: SectionProps) {
    // A section keeps its id for its whole life: the home page keys each slot by it.
    // eslint-disable-next-line solid/reactivity
    useSectionReady(props.id);
    return (
        // A link of the header jumps here: the section takes the focus, so the next Tab continues inside it, and as it
        // is no control it shows no ring.
        <section
            id={props.id}
            aria-labelledby={`${props.id}-title`}
            tabindex={-1}
            class={cn("section focus-visible:outline-none", props.tone === "raised" && "bg-surface/60", props.class)}
            style={{
                "--section-height": `${HEIGHT[props.id][0]}px`,
                "--section-height-lg": `${HEIGHT[props.id][1]}px`,
            }}
        >
            <div class="container-page">
                {/* The heading rises into place as the section enters (globals.css, section-enter). */}
                <header class="section-enter mb-10 max-w-3xl md:mb-14">
                    <h2 id={`${props.id}-title`} class="text-heading text-gradient">
                        {props.title}
                    </h2>
                    <Show when={props.subtitle}>
                        <p class="mt-3 text-lg text-fg-muted">{props.subtitle}</p>
                    </Show>
                </header>
                {props.children}
            </div>
        </section>
    );
}
