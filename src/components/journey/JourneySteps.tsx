import {For, type JSX, Show} from "solid-js";
import {ChevronLeft, ChevronRight} from "@/components/ui/icons";
import {JOURNEY_END, JOURNEY_START, milestones} from "@/content/shared/journey";
import {BUILD_DATE} from "@/content/shared/site";
import {useContent} from "@/context/language";
import {useJourneyCopy} from "@/hooks/useJourneyCopy";
import {formatYearMonth} from "@/lib/format";
import {isFuture, type StationLayout, type Steps} from "@/lib/journey";
import {cn} from "@/lib/utils";
import type {JourneyLineId, MilestoneId} from "@/types/journey";

const BY_ID = new Map(milestones.map((milestone) => [milestone.id, milestone]));
const SWIPE = 48;

interface JourneyStepsProps {
    stations: StationLayout[];
    steps: Steps;
    selected: MilestoneId;
    onSelect: (id: MilestoneId) => void;
    emphasis: JourneyLineId | null;
    class?: string;
}

/**
 * The journey for screens too narrow for the map: a strip with one dot per stop, in date order, and buttons that move
 * one stop at a time. With a line selected, the steps only visit that line's stops and the other dots fade.
 */
export function JourneySteps(props: JourneyStepsProps) {
    const {ui} = useContent();
    const copy = useJourneyCopy();
    const current = () => BY_ID.get(props.selected)!;
    const todayAt = () => {
        const firstPlanned = props.stations.findIndex(({id}) => isFuture(BY_ID.get(id)!, BUILD_DATE));
        return firstPlanned > 0 ? ((firstPlanned - 0.5) / (props.stations.length - 1)) * 100 : null;
    };
    const button =
        "grid size-11 place-items-center rounded-full border border-border-strong text-fg transition-colors hover:border-primary hover:text-primary active:translate-y-px disabled:opacity-40";

    return (
        <div class={cn("rounded-lg border border-border bg-surface/60 p-4", props.class)}>
            <div aria-hidden="true" class="relative">
                <div class="flex justify-between font-mono text-[11px] text-fg-subtle">
                    <span>{JOURNEY_START}</span>
                    <span>{JOURNEY_END}</span>
                </div>
                {/* Each dot sits at its share of the strip, so any number of stops fits the width; they may touch. */}
                <div class="relative mt-3 h-4">
                    <span class="absolute inset-x-0 top-1/2 h-px bg-border"/>
                    <Show when={todayAt() !== null}>
                        <span style={{left: `${todayAt()}%`}} class="absolute -top-2 -bottom-2 w-px bg-fg-subtle"/>
                    </Show>
                    <For each={props.stations}>
                        {({id}, index) => {
                            const milestone = BY_ID.get(id)!;
                            const future = isFuture(milestone, BUILD_DATE);
                            const color = () => {
                                const emphasis = props.emphasis;
                                return `var(--color-viz-${emphasis && milestone.lines.includes(emphasis) ? emphasis : milestone.lines[0]})`;
                            };
                            return (
                                <span
                                    style={{
                                        left: `${(index() / (props.stations.length - 1)) * 100}%`,
                                        "border-color": color(),
                                        "background-color": future ? "var(--color-surface)" : color()
                                    }}
                                    class={cn(
                                        "absolute top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2",
                                        future && "border-dashed",
                                        id === props.selected ? "z-10 size-3.5 ring-2 ring-fg ring-offset-2 ring-offset-surface" : "size-2",
                                        props.emphasis !== null && !milestone.lines.includes(props.emphasis) && "opacity-30",
                                    )}
                                />
                            );
                        }}
                    </For>
                </div>
                {/* "Today" sits under the strip, where it cannot collide with the year at either end. */}
                <Show when={todayAt() !== null}>
                    <div class="relative mt-2 h-4">
                        <span style={{left: `${todayAt()}%`}}
                              class="absolute top-0 -translate-x-1/2 text-[11px] font-semibold text-fg">
                            {copy.today}
                        </span>
                    </div>
                </Show>
            </div>

            <div class="mt-4 flex items-center justify-center gap-5">
                <button
                    type="button"
                    aria-label={copy.map.previousStop}
                    disabled={!props.steps.previous}
                    onClick={() => {
                        const previous = props.steps.previous;
                        if (previous) props.onSelect(previous.id);
                    }}
                    class={button}
                >
                    <ChevronLeft class="size-5"/>
                </button>
                <p class="min-w-20 text-center">
                    <span
                        class="block font-mono text-xs text-fg-subtle">{formatYearMonth(current().start, ui.months)}</span>
                    <span aria-hidden="true" class="font-mono text-sm text-fg-muted tabular-nums">
                        <span
                            class="text-fg">{props.steps.index >= 0 ? props.steps.index + 1 : "–"}</span> / {props.steps.order.length}
                    </span>
                </p>
                <button
                    type="button"
                    aria-label={copy.map.nextStop}
                    disabled={!props.steps.next}
                    onClick={() => {
                        const next = props.steps.next;
                        if (next) props.onSelect(next.id);
                    }}
                    class={button}
                >
                    <ChevronRight class="size-5"/>
                </button>
            </div>
        </div>
    );
}

/**
 * Lets a sideways swipe on touch screens move to the previous or next stop. `touch-action: pan-y pinch-zoom` keeps
 * vertical scrolling and zoom native; a mouse drag is left alone, so text in the details can still be selected.
 */
export function SwipeArea(props: {
    onPrevious: () => void;
    onNext: () => void;
    children: JSX.Element
}) {
    let start: { x: number; y: number } | null = null;

    const onPointerDown = (event: PointerEvent) => {
        start = event.pointerType === "touch" ? {x: event.clientX, y: event.clientY} : null;
    };
    const onPointerUp = (event: PointerEvent) => {
        const from = start;
        start = null;
        if (!from) return;
        const dx = event.clientX - from.x;
        if (Math.abs(dx) < SWIPE || Math.abs(dx) < Math.abs(event.clientY - from.y)) return;
        if (dx < 0) props.onNext();
        else props.onPrevious();
    };

    return (
        <div onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerCancel={() => (start = null)}
             class="touch-pan-y touch-pinch-zoom">
            {props.children}
        </div>
    );
}
