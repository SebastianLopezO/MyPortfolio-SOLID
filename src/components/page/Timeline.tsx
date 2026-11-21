import {type Component, createMemo, createSignal, For, Show} from "solid-js";
import {Dynamic} from "solid-js/web";
import {Award, Briefcase, Flag, FolderGit2, GraduationCap, type IconProps, Quote} from "@/components/ui/icons";
import {useLanguage} from "@/context/language";
import {useHydrated} from "@/hooks/useHydrated";
import {ToggleButton} from "@/components/ui/ToggleButton";
import {Link} from "@/routes/Router";
import {TIMELINE_KINDS, type TimelineItem, type TimelineKind, type TimelineLabels} from "@/types/timeline";

const ICONS: Record<TimelineKind, Component<IconProps>> = {
    job: Briefcase,
    program: GraduationCap,
    project: FolderGit2,
    recommendation: Quote,
    certification: Award,
    milestone: Flag,
};

/**
 * Dated entries grouped by year, oldest first, with a filter by kind when there is more than one. Every entry is in the
 * prerendered HTML; the filter only hides entries once the page is interactive.
 */
export function Timeline(props: { items: TimelineItem[]; labels: TimelineLabels }) {
    const {content: {ui}} = useLanguage();
    const interactive = useHydrated();
    const [kind, setKind] = createSignal<TimelineKind | null>(null);
    const sorted = createMemo(() => [...props.items].sort((a, b) => a.date.localeCompare(b.date)));
    const kinds = () => TIMELINE_KINDS.filter((value) => sorted().some((item) => item.kind === value));
    const shown = createMemo(() => {
        const current = kind();
        return current ? sorted().filter((item) => item.kind === current) : sorted();
    });
    const years = () => [...new Set(shown().map((item) => item.date.slice(0, 4)))];
    const countOf = (value: TimelineKind | null) => (value ? sorted().filter((item) => item.kind === value).length : sorted().length);

    return (
        <div data-testid="timeline">
            <Show when={kinds().length > 1}>
                <div role="group" aria-label={props.labels.filter} data-testid="timeline-filter" data-interactive={interactive() || undefined}
                     class="mb-8 flex flex-wrap gap-2">
                    <For each={[null, ...kinds()]}>
                        {(value) => (
                            <ToggleButton
                                data-testid={`timeline-filter-${value ?? "all"}`}
                                pressed={kind() === value}
                                onClick={() => setKind(value)}
                                count={countOf(value)}>
                                {value ? props.labels.kinds[value] : props.labels.all}
                            </ToggleButton>
                        )}
                    </For>
                </div>
            </Show>
            <ol data-testid="timeline-years" class="space-y-8">
                <For each={years()}>{(year) => (
                    <li class="section-enter sm:grid sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-6">
                        {/* The year stays in view beside its entries while they scroll past. */}
                        <h3 class="font-mono text-sm font-semibold text-fg sm:sticky sm:top-24 sm:self-start">{year}</h3>
                        <ol class="mt-3 ml-3 space-y-5 border-l border-border pl-7 sm:mt-0">
                            <For each={shown().filter((item) => item.date.startsWith(year))}>{(item) => {
                                const month = item.date.length === 7 ? ui.months[Number(item.date.slice(5, 7)) - 1] : null;
                                return (
                                    <li class="relative">
                                        <span aria-hidden="true"
                                              class="absolute top-0 -left-[2.6rem] grid size-6 place-items-center rounded-full border border-border bg-surface text-primary">
                                            <Dynamic component={ICONS[item.kind]} class="size-3.5"/>
                                        </span>
                                        <Show when={month}>
                                            <p class="font-mono text-xs text-fg-subtle">{month}</p>
                                        </Show>
                                        <p class="text-fg">
                                            <Show when={item.to} fallback={item.text}>
                                                {(to) => (
                                                    <Link to={to()}
                                                          class="font-semibold text-primary hover:text-primary-hover">{item.text}</Link>
                                                )}
                                            </Show>
                                        </p>
                                        <Show when={item.note}>
                                            <p class="mt-0.5 text-sm text-fg-muted">{item.note}</p>
                                        </Show>
                                    </li>
                                );
                            }}</For>
                        </ol>
                    </li>
                )}</For>
            </ol>
            <p aria-live="polite"
               class="sr-only">{kind() ? props.labels.showing.replace("{count}", String(shown().length)) : ""}</p>
        </div>
    );
}
