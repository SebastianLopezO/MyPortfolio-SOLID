import {createSignal, For, Show} from "solid-js";
import {Check} from "@/components/ui/icons";
import {GOALS, milestones, sdgs} from "@/content/shared/journey";
import {useContent} from "@/context/language";
import {useJourneyCopy} from "@/hooks/useJourneyCopy";
import {formatRange, formatYearMonth} from "@/lib/format";
import {milestonesForSdg} from "@/lib/journey";
import {cn} from "@/lib/utils";
import type {MilestoneId, SdgId} from "@/types/journey";
import {SdgBadge} from "./SdgBadge";

export function Horizon(props: { onSelectMilestone: (id: MilestoneId) => void }) {
    const {ui} = useContent();
    const copy = useJourneyCopy();
    const [sdg, setSdg] = createSignal<SdgId>(4);
    const related = () => milestonesForSdg(sdg());

    return (
        <div class="space-y-10">
            <p class="max-w-3xl text-lg text-fg-muted">{copy.horizon.intro}</p>

            <div>
                <h3 class="font-mono text-xs uppercase tracking-wider text-fg-subtle">{copy.horizon.goalsLabel}</h3>
                <ol data-testid="horizon-goals" class="relative mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <For each={GOALS}>{(id, index) => {
                        const milestone = milestones.find((item) => item.id === id)!;
                        const text = copy.milestones[id];
                        const when = milestone.end ? formatRange(milestone.start, milestone.end, ui.months, ui.present) : formatYearMonth(milestone.start, ui.months);
                        return (
                            <li
                                data-testid={`horizon-goal-${id}`}
                                class="relative flex flex-col rounded-lg border border-dashed border-border-strong bg-surface p-5">
                                <span class="font-mono text-xs text-fg-subtle">
                                    {String(index() + 1).padStart(2, "0")} · {when}
                                </span>
                                <h4 class="mt-2 font-display text-title text-fg">{text.title}</h4>
                                <p class="mt-1 text-sm font-semibold text-primary">{text.place}</p>
                                <p class="mt-3 text-sm text-fg-muted">{text.summary}</p>
                                <ul class="mt-4 space-y-1.5 text-sm text-fg-muted">
                                    <For each={copy.horizon.gains[id]}>
                                        {(gain) => (
                                            <li class="flex gap-2">
                                                <Check class="mt-0.5 size-4 shrink-0 text-primary"/>
                                                {gain}
                                            </li>
                                        )}
                                    </For>
                                </ul>
                                <Show when={milestone.sdgs}>
                                    {(goals) => (
                                        <div class="mt-auto flex items-center gap-2 pt-4">
                                            <span
                                                class="font-mono text-xs text-fg-subtle">{copy.horizon.sdgShort}</span>
                                            <For each={goals()}>
                                                {(goal) => <SdgBadge id={goal} label={copy.horizon.sdgs[goal].name}
                                                                     compact/>}
                                            </For>
                                        </div>
                                    )}
                                </Show>
                            </li>
                        );
                    }}</For>
                </ol>
            </div>

            <div>
                <h3 class="text-title text-fg">{copy.horizon.sdgTitle}</h3>
                <p class="mt-2 max-w-3xl text-fg-muted">{copy.horizon.sdgIntro}</p>
                <div role="group" aria-label={copy.horizon.sdgTitle} data-testid="horizon-sdg-group" class="mt-5 flex flex-wrap gap-2">
                    <For each={sdgs}>{(goal) => (
                        <button
                            type="button"
                            data-testid={`horizon-sdg-${goal.id}`}
                            aria-pressed={goal.id === sdg()}
                            onClick={() => setSdg(goal.id)}
                            class={cn(
                                "rounded-lg border p-2 pr-3",
                                goal.id === sdg() ? "border-fg bg-surface-raised" : "border-border hover:border-border-strong",
                            )}
                        >
                            <SdgBadge id={goal.id} label={copy.horizon.sdgs[goal.id].name}/>
                        </button>
                    )}</For>
                </div>
                <div aria-live="polite" data-testid="horizon-sdg-details" class="mt-5 rounded-lg border border-border bg-surface p-5">
                    <p class="text-fg">{copy.horizon.sdgs[sdg()].contribution}</p>
                    <p class="mt-4 text-sm font-semibold text-fg-muted">{copy.horizon.related}</p>
                    <ul class="mt-2 flex flex-wrap gap-2">
                        <For each={related()}>{(id) => (
                            <li>
                                <button
                                    type="button"
                                    data-testid={`horizon-related-${id}`}
                                    onClick={() => props.onSelectMilestone(id)}
                                    class="min-h-9 rounded-full border border-border px-3 text-sm text-fg-muted hover:border-primary hover:text-fg"
                                >
                                    {copy.milestones[id].title}
                                </button>
                            </li>
                        )}</For>
                    </ul>
                </div>
            </div>
        </div>
    );
}
