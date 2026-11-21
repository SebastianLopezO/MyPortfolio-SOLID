import {createSignal, For, Show, untrack} from "solid-js";
import {ChevronLeft, ChevronRight} from "@/components/ui/icons";
import {CAPABILITIES, capabilityLevels, githubActivity, JOURNEY_YEARS} from "@/content/shared/journey";
import {BUILD_DATE, BUILD_YEAR} from "@/content/shared/site";
import {useJourneyCopy} from "@/hooks/useJourneyCopy";
import {useRole} from "@/context/role";
import {evidenceFor, ROLE_AREAS} from "@/lib/journey";
import {cn} from "@/lib/utils";
import type {CapabilityId, Level, MilestoneId} from "@/types/journey";

const LEVEL_FILL: Record<Level, string> = {
    0: "transparent",
    1: "var(--color-level-1)",
    2: "var(--color-level-2)",
    3: "var(--color-level-3)",
    4: "var(--color-level-4)",
};

const activityByYear = new Map(githubActivity.years.map((item) => [item.year, item]));
const MAX_DAYS = 366;

interface Focus {
    area: CapabilityId;
    year: number;
}

export function EvolutionGrid(props: { onSelectMilestone: (id: MilestoneId) => void }) {
    const copy = useJourneyCopy();
    const {role} = useRole();
    const [focus, setFocus] = createSignal<Focus>(untrack(() => {
        const current = role();
        return {area: current ? ROLE_AREAS[current][0] : "backend", year: Math.min(BUILD_YEAR, 2026)};
    }));
    const highlighted = (): readonly CapabilityId[] => {
        const current = role();
        return current ? ROLE_AREAS[current] : [];
    };
    const yearIndex = () => JOURNEY_YEARS.indexOf(focus().year);
    const level = () => capabilityLevels[focus().area][yearIndex()];
    const evidence = () => evidenceFor(focus().area, focus().year, BUILD_DATE);
    const target = () => focus().year > BUILD_YEAR;
    const activity = () => activityByYear.get(focus().year);
    const moveYear = (step: 1 | -1) => setFocus({area: focus().area, year: JOURNEY_YEARS[yearIndex() + step]});
    const activeDays = () => {
        const year = activity();
        return year ? `${copy.evolution.activeDays}: ${year.activeDays}${year.partial ? "*" : ""}` : undefined;
    };
    const yearButton =
        "grid size-11 place-items-center rounded-full border border-border-strong text-fg transition-colors hover:border-primary hover:text-primary active:translate-y-px disabled:opacity-40";
    const label = (area: CapabilityId, year: number, value: Level) =>
        `${copy.areas[area]} · ${year} · ${year > BUILD_YEAR ? `${copy.evolution.target}: ` : ""}${copy.levels[value]}`;

    return (
        <div class="space-y-5">
            {/* Below 64rem the twelve years do not fit side by side, so the grid shows one year at a time. */}
            <div class="space-y-3 lg:hidden">
                <div
                    class="flex items-center justify-center gap-5 rounded-lg border border-border bg-surface/60 p-3">
                    <button type="button" data-testid="evolution-previous-year" aria-label={copy.evolution.previousYear} disabled={yearIndex() === 0}
                            onClick={() => moveYear(-1)} class={yearButton}>
                        <ChevronLeft class="size-5"/>
                    </button>
                    <p class="min-w-40 text-center">
                        <span data-testid="evolution-current-year" class="block font-display text-3xl text-fg">{focus().year}</span>
                        <span class="block text-xs text-fg-subtle">
                            {target() ? copy.evolution.target : activeDays()}
                        </span>
                    </p>
                    <button
                        type="button"
                        data-testid="evolution-next-year"
                        aria-label={copy.evolution.nextYear}
                        disabled={yearIndex() === JOURNEY_YEARS.length - 1}
                        onClick={() => moveYear(1)}
                        class={yearButton}
                    >
                        <ChevronRight class="size-5"/>
                    </button>
                </div>
                <ul class="space-y-2">
                    <For each={CAPABILITIES}>{(area) => {
                        const value = () => capabilityLevels[area][yearIndex()];
                        return (
                            <li>
                                <button
                                    type="button"
                                    data-testid={`evolution-mobile-area-${area}`}
                                    aria-pressed={focus().area === area}
                                    aria-label={label(area, focus().year, value())}
                                    onClick={() => setFocus({area, year: focus().year})}
                                    class={cn(
                                        "flex min-h-11 w-full items-center justify-between gap-3 rounded-full border px-3 py-2 text-left text-sm",
                                        focus().area === area ? "border-fg" : "border-border hover:border-border-strong",
                                    )}
                                >
                                    <span
                                        class={cn("text-fg", highlighted().includes(area) && "font-semibold")}>{copy.areas[area]}</span>
                                    <span class="inline-flex shrink-0 items-center gap-2 text-xs text-fg-muted">
                                        {copy.levels[value()]}
                                        <span aria-hidden="true"
                                              class={cn("size-6 rounded-sm", value() === 0 && "border border-border", target() && value() > 0 && "journey-target")}
                                              style={{"background-color": LEVEL_FILL[value()]}}
                                        />
                                    </span>
                                </button>
                            </li>
                        );
                    }}</For>
                </ul>
            </div>

            <div class="hidden overflow-x-auto rounded-lg border border-border bg-surface/60 lg:block">
                <table data-testid="evolution-table" class="w-full min-w-[48rem] border-separate border-spacing-1 p-2 text-sm">
                    <caption class="px-2 pb-2 text-left text-xs text-fg-subtle">{copy.evolution.caption}</caption>
                    <thead>
                    <tr>
                        <th scope="col"
                            class="sticky left-0 z-10 bg-surface px-2 text-left font-semibold text-fg-muted">{copy.evolution.capability}</th>
                        <For each={JOURNEY_YEARS}>{(year) => (
                            <th scope="col"
                                class={cn("px-1 font-mono text-xs font-normal", year > BUILD_YEAR ? "text-fg-subtle" : "text-fg-muted")}>
                                {year}
                                <Show when={year === BUILD_YEAR + 1}>
                                    <span
                                        class="block text-[10px] uppercase tracking-wider">{copy.evolution.target}</span>
                                </Show>
                            </th>
                        )}</For>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <th scope="row"
                            class="sticky left-0 z-10 bg-surface px-2 text-left text-xs font-normal text-fg-subtle">{copy.evolution.activeDays}</th>
                        <For each={JOURNEY_YEARS}>{(year) => (
                            <td class="h-10 px-1 align-bottom">
                                <Show when={activityByYear.get(year)}>
                                    {(activity) => (
                                        <div class="flex h-full flex-col items-center justify-end gap-0.5">
                                            <span
                                                class="font-mono text-[10px] text-fg-muted">{activity().activeDays}{activity().partial ? "*" : ""}</span>
                                            <span aria-hidden="true"
                                                  class="block w-3 rounded-t bg-primary"
                                                  style={{height: `${Math.max(2, (activity().activeDays / MAX_DAYS) * 22)}px`}}
                                            />
                                        </div>
                                    )}
                                </Show>
                            </td>
                        )}</For>
                    </tr>
                    <For each={CAPABILITIES}>{(area) => (
                        <tr>
                            <th
                                scope="row"
                                class={cn(
                                    "sticky left-0 z-10 bg-surface px-2 text-left whitespace-nowrap",
                                    highlighted().includes(area) ? "font-semibold text-fg" : "font-normal text-fg-muted",
                                )}
                            >
                                {copy.areas[area]}
                            </th>
                            {/* One cell per year, in the years' order, so each cell keeps its position. */}
                            <For each={JOURNEY_YEARS}>{(year, index) => {
                                const value = capabilityLevels[area][untrack(index)];
                                const active = () => focus().area === area && focus().year === year;
                                const future = year > BUILD_YEAR;
                                return (
                                    <td class="p-0">
                                        <button
                                            type="button"
                                            data-testid={`evolution-cell-${area}-${year}`}
                                            aria-pressed={active()}
                                            aria-label={label(area, year, value)}
                                            onClick={() => setFocus({area, year})}
                                            onFocus={() => setFocus({area, year})}
                                            class={cn(
                                                "block h-8 w-full min-w-9 rounded-sm border-2",
                                                active() ? "border-fg" : value === 0 ? "border-border" : "border-transparent",
                                                future && value > 0 && "journey-target",
                                            )}
                                            style={{"background-color": LEVEL_FILL[value]}}
                                        />
                                    </td>
                                );
                            }}</For>
                        </tr>
                    )}</For>
                    </tbody>
                </table>
            </div>

            <div class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-fg-muted">
                <span class="font-semibold">{copy.evolution.legend}</span>
                <For each={copy.levels}>{(label, value) => (
                    <span class="inline-flex items-center gap-1.5">
                        <span aria-hidden="true"
                              class={cn("size-3.5 rounded-sm", value() === 0 && "border border-border")}
                              style={{"background-color": LEVEL_FILL[value() as Level]}}
                        />
                        {label}
                    </span>
                )}</For>
                <span class="text-fg-subtle">* {copy.evolution.activeDaysNote}</span>
            </div>

            <div aria-live="polite" data-testid="evolution-details" class="rounded-lg border border-border bg-surface p-5">
                <p class="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                    {focus().year}
                    {target() && ` · ${copy.evolution.target}`}
                </p>
                <p class="mt-1 text-title text-fg">
                    {copy.areas[focus().area]} · <span class="text-primary">{copy.levels[level()]}</span>
                </p>
                <p class="mt-3 text-sm font-semibold text-fg-muted">{copy.evolution.evidence}</p>
                <Show when={evidence().length}
                      fallback={<p class="mt-2 text-sm text-fg-subtle">{copy.evolution.noEvidence}</p>}>
                    <ul class="mt-2 flex flex-wrap gap-2">
                        <For each={evidence()}>{(id) => (
                            <li>
                                <button
                                    type="button"
                                    data-testid={`evolution-evidence-${id}`}
                                    onClick={() => props.onSelectMilestone(id)}
                                    class="min-h-9 rounded-full border border-border px-3 text-sm text-fg-muted hover:border-primary hover:text-fg"
                                >
                                    {copy.milestones[id].title}
                                </button>
                            </li>
                        )}</For>
                    </ul>
                </Show>
            </div>
        </div>
    );
}
