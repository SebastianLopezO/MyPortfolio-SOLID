import {For, Show} from "solid-js";
import {ArrowRight} from "@/components/ui/icons";
import type {Tile} from "@/content/shared/project-art";
import type {DecisionCopy, DecisionLabels} from "@/types/case-study";

/**
 * Every decision whole, read as a short flow: its number and title, the problem on the page's quiet layer, a joint that
 * points on, and the solution on the project's own color with its cost under a dashed line, the stub of a receipt. Side
 * by side from 48rem, the solution wider since it carries more; one under the other on a phone. Nothing waits on a
 * click or a script: the prerendered page holds it all, and the scroll draws each flow in (globals.css, .decision-*).
 */
export function Decisions(props: { items: DecisionCopy[]; labels: DecisionLabels; tile: Tile }) {
    const label = "flex items-center gap-2 font-mono text-xs text-fg-subtle";
    return (
        <ol class="grid gap-10">
            <For each={props.items}>{(decision, index) => (
                <li class="group grid border-t border-border pt-8 first:border-t-0 first:pt-0 md:grid-cols-[3.5rem_minmax(0,1fr)] md:gap-x-6">
                    {/* The list already numbers its items for a screen reader. */}
                    <span aria-hidden="true" class="font-mono text-sm leading-7 text-fg-subtle md:row-span-2">
                        {String(index() + 1).padStart(2, "0")}
                    </span>
                    <h3 class="mt-1 text-title text-fg md:mt-0">{decision.title}</h3>
                    <div
                        class="mt-5 grid gap-y-2 md:col-start-2 md:grid-cols-[minmax(0,2fr)_0_minmax(0,3fr)] md:gap-x-2 md:gap-y-0">
                        <div class="decision-problem rounded-2xl bg-surface p-5 md:p-6">
                            <p class={label}>
                                <span aria-hidden="true" class="size-2 rounded-full border border-current"/>
                                {props.labels.problem}
                            </p>
                            <p class="mt-3 text-fg-muted">{decision.problem}</p>
                        </div>
                        {/* The joint takes no room of its own: its negative margins lay it over the edges of both. */}
                        <span aria-hidden="true"
                              class="decision-joint relative z-1 -my-5 grid size-10 place-items-center place-self-center rounded-full border border-border bg-bg text-fg transition-colors duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-on-primary md:-mx-5 md:my-0">
                            <ArrowRight class="size-4 rotate-90 md:rotate-0"/>
                        </span>
                        <div class="decision-solution flex flex-col rounded-2xl p-5 md:p-6"
                             style={{background: `var(--color-tile-${props.tile})`}}>
                            <p class={label}>
                                <span aria-hidden="true" class="size-2 rounded-full bg-current"/>
                                {props.labels.solution}
                            </p>
                            <p class="mt-3 text-fg">{decision.solution}</p>
                            <Show when={decision.tradeoff}>
                                <div class="decision-cost mt-auto pt-5">
                                    <p class="border-t border-dashed border-fg-subtle/40 pt-4 text-sm text-fg-muted">
                                        <span class="font-semibold text-fg">{props.labels.tradeoff}:</span> {decision.tradeoff}
                                    </p>
                                </div>
                            </Show>
                        </div>
                    </div>
                </li>
            )}</For>
        </ol>
    );
}
