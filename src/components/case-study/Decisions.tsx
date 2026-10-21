import {createMemo, createSignal, createUniqueId, For, Show, untrack} from "solid-js";
import {ToggleButton} from "@/components/ui/ToggleButton";
import {useHydrated} from "@/hooks/useHydrated";
import {cn} from "@/lib/utils";
import type {DecisionCopy, DecisionLabels} from "@/types/case-study";

const VIEWS = ["problem", "solution"] as const;
type View = (typeof VIEWS)[number];

/**
 * Each decision as a card with two small tabs, the problem it answers and the solution, plus two buttons that turn every
 * card at once. The problems show first; the solutions are in the prerendered HTML too, hidden with the `hidden` class
 * rather than the attribute: Tailwind's preflight hides [hidden] with a layered !important that the style the layout
 * (layouts/Page.astro) adds for pages without JavaScript could not beat.
 */
export function Decisions(props: { items: DecisionCopy[]; labels: DecisionLabels }) {
    const base = createUniqueId();
    const interactive = useHydrated();
    // A page shows one list of decisions for its whole life.
    // eslint-disable-next-line solid/reactivity
    const [views, setViews] = createSignal<View[]>(props.items.map(() => "problem"));
    const tabs: HTMLButtonElement[] = [];
    const every = createMemo(() => VIEWS.find((view) => views().every((value) => value === view)) ?? null);
    const show = (index: number, view: View) => setViews((current) => current.map((value, at) => (at === index ? view : value)));

    // Two tabs: either arrow moves to the other one, Home and End to the first and the last.
    const onTabKey = (index: number) => (event: KeyboardEvent) => {
        const other: View = views()[index] === "problem" ? "solution" : "problem";
        const next = ({
            ArrowRight: other,
            ArrowLeft: other,
            Home: "problem",
            End: "solution"
        } as Record<string, View>)[event.key];
        if (!next) return;
        event.preventDefault();
        show(index, next);
        tabs[index * VIEWS.length + VIEWS.indexOf(next)]?.focus();
    };

    return (
        <div>
            <Show when={props.items.length > 1}>
                <div role="group" aria-label={props.labels.switchAll} data-interactive={interactive() || undefined}
                     data-decision-tabs="true" class="mb-5 flex flex-wrap gap-2">
                    <For each={VIEWS}>
                        {(view) => (
                            <ToggleButton pressed={every() === view}
                                          onClick={() => setViews(props.items.map(() => view))}>
                                {view === "problem" ? props.labels.allProblems : props.labels.allSolutions}
                            </ToggleButton>
                        )}
                    </For>
                </div>
            </Show>
            <ol class="grid gap-4">
                <For each={props.items}>{(decision, position) => {
                    // The decisions never reorder, so each keeps its position.
                    const index = untrack(position);
                    const id = `${base}-${index}`;
                    const view = () => views()[index];
                    return (
                        <li
                            class="section-enter rounded-lg border border-border bg-surface p-5">
                            <h3 id={`${id}-title`} class="font-semibold text-fg">{decision.title}</h3>
                            <div role="tablist" aria-labelledby={`${id}-title`} onKeyDown={onTabKey(index)}
                                 data-decision-tabs="true"
                                 class="mt-3 inline-flex rounded-md border border-border bg-bg p-1">
                                <For each={VIEWS}>{(value, at) => (
                                    <button
                                        ref={(element) => {
                                            tabs[index * VIEWS.length + at()] = element;
                                        }}
                                        type="button"
                                        role="tab"
                                        id={`${id}-${value}-tab`}
                                        aria-selected={view() === value}
                                        aria-controls={`${id}-${value}`}
                                        tabindex={view() === value ? 0 : -1}
                                        onClick={() => show(index, value)}
                                        class={cn(
                                            "min-h-9 rounded-sm px-3 text-sm font-semibold transition-colors",
                                            view() !== value && "text-fg-muted hover:text-fg",
                                            view() === value && (value === "problem" ? "bg-warning text-on-primary" : "bg-primary text-on-primary"),
                                        )}
                                    >
                                        {props.labels[value]}
                                    </button>
                                )}</For>
                            </div>
                            <div role="tabpanel" id={`${id}-problem`} aria-labelledby={`${id}-problem-tab`}
                                 tabindex={0} data-decision-panel="true" data-label={props.labels.problem}
                                 class={cn("mt-4 border-l-2 border-warning pl-4 text-fg-muted", view() !== "problem" && "hidden")}>
                                <p class="max-w-[68ch]">{decision.problem}</p>
                            </div>
                            <div role="tabpanel" id={`${id}-solution`} aria-labelledby={`${id}-solution-tab`}
                                 tabindex={0} data-decision-panel="true" data-label={props.labels.solution}
                                 class={cn("mt-4 border-l-2 border-primary pl-4 text-fg-muted", view() !== "solution" && "hidden")}>
                                <p class="max-w-[68ch]">{decision.solution}</p>
                                <Show when={decision.tradeoff}>
                                    <p class="mt-3 text-sm">
                                        <span
                                            class="font-semibold text-fg">{props.labels.tradeoff}:</span> {decision.tradeoff}
                                    </p>
                                </Show>
                            </div>
                        </li>
                    );
                }}</For>
            </ol>
        </div>
    );
}
