import {createMemo, createSignal, For, onMount, Show} from "solid-js";
import {githubActivity, JOURNEY_LINES, JOURNEY_YEARS, milestones} from "@/content/shared/journey";
import {BUILD_DATE} from "@/content/shared/site";
import {useContent} from "@/context/language";
import {useJourneyCopy} from "@/hooks/useJourneyCopy";
import {formatYearMonth} from "@/lib/format";
import {isFuture, laneY, layoutLabels, layoutStations, lineSpans, MAP, stepsAround, xFor} from "@/lib/journey";
import {cn} from "@/lib/utils";
import type {JourneyLineId, MilestoneId} from "@/types/journey";
import {JourneySteps, SwipeArea} from "./JourneySteps";
import {LineKey} from "./LineKey";
import {MilestoneDetails} from "./MilestoneDetails";

const STATIONS = layoutStations();
const SPANS = lineSpans(STATIONS, BUILD_DATE);
const BY_ID = new Map(milestones.map((milestone) => [milestone.id, milestone]));
const TODAY_X = xFor(BUILD_DATE);
const ACTIVITY_BASE = MAP.activityTop + MAP.activityHeight;
const color = (line: JourneyLineId) => `var(--color-viz-${line})`;
const GRID = JOURNEY_YEARS.map((year) => `M${xFor(year)} 36V${ACTIVITY_BASE}`).join("");

// A column with a 4px rounded data end and a square base.
const column = (x: number, top: number, width: number) => {
    const r = Math.min(4, (ACTIVITY_BASE - top) / 2);
    return `M${x} ${ACTIVITY_BASE}V${top + r}Q${x} ${top} ${x + r} ${top}H${x + width - r}Q${x + width} ${top} ${x + width} ${top + r}V${ACTIVITY_BASE}Z`;
};

interface JourneyMapProps {
    selected: MilestoneId;
    onSelect: (id: MilestoneId) => void;
    emphasis: JourneyLineId | null;
    onEmphasis: (line: JourneyLineId | null) => void;
}

export function JourneyMap(props: JourneyMapProps) {
    const {ui} = useContent();
    const copy = useJourneyCopy();
    const [showList, setShowList] = createSignal(false);
    let scroller: HTMLDivElement | undefined;
    const labels = layoutLabels(STATIONS, Object.fromEntries(milestones.filter((item) => item.major).map((item) => [item.id, copy.milestones[item.id].short])));

    // The map only shows from 64rem, where it fits; if large text still makes it wider than its box, start near today.
    onMount(() => {
        const element = scroller;
        if (element && element.scrollWidth > element.clientWidth) {
            element.scrollLeft = (element.scrollWidth * TODAY_X) / MAP.width - element.clientWidth * 0.65;
        }
    });

    const dimmed = (lines: JourneyLineId[]) => props.emphasis !== null && !lines.includes(props.emphasis);
    const steps = createMemo(() => stepsAround(STATIONS, props.selected, props.emphasis));
    const onStationKey = (event: KeyboardEvent, id: MilestoneId) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            props.onSelect(id);
        }
    };

    return (
        <div class="space-y-5">
            <div role="group" aria-label={copy.map.emphasisHint} class="flex flex-wrap gap-2">
                <button
                    type="button"
                    aria-pressed={props.emphasis === null}
                    onClick={() => props.onEmphasis(null)}
                    class={cn("min-h-9 shrink-0 rounded-full border px-3 text-sm whitespace-nowrap", props.emphasis === null ? "border-primary text-fg" : "border-border text-fg-muted hover:text-fg")}
                >
                    {copy.map.allLines}
                </button>
                <For each={JOURNEY_LINES}>{(line) => (
                    <button
                        type="button"
                        aria-pressed={props.emphasis === line}
                        aria-label={copy.lines[line]}
                        onClick={() => props.onEmphasis(props.emphasis === line ? null : line)}
                        class={cn(
                            "inline-flex min-h-9 shrink-0 items-center gap-2 rounded-full border px-3 text-sm whitespace-nowrap",
                            props.emphasis === line ? "border-primary text-fg" : "border-border text-fg-muted hover:text-fg",
                        )}
                    >
                        <LineKey line={line}/>
                        {/* Phones get the one-word names so the chips take two rows instead of five. */}
                        <span class="sm:hidden">{copy.linesShort[line]}</span>
                        <span class="hidden sm:inline">{copy.lines[line]}</span>
                    </button>
                )}</For>
            </div>

            {/* The map draws itself from left to right as it comes up the screen (globals.css, journey-chart). */}
            <div ref={scroller}
                 class="journey-chart hidden overflow-x-auto rounded-lg border border-border bg-surface/60 lg:flex">
                {/* Lane names stay pinned to the left edge if large text makes the map scroll. */}
                <div aria-hidden="true" class="pointer-events-none sticky left-0 z-10 w-0 shrink-0">
                    <For each={JOURNEY_LINES}>{(line) => (
                        <span
                            style={{top: `${(laneY(line) / MAP.height) * 100}%`}}
                            class={cn(
                                "absolute left-1.5 -translate-y-1/2 rounded-sm bg-surface px-1 text-xs leading-4 whitespace-nowrap",
                                props.emphasis === line ? "font-semibold text-fg" : dimmed([line]) ? "text-fg-subtle" : "text-fg-muted",
                            )}
                        >
                            {copy.lines[line]}
                        </span>
                    )}</For>
                    <span
                        style={{top: `${(MAP.activityTop / MAP.height) * 100}%`}}
                        class="absolute left-1.5 translate-y-1/2 rounded-sm bg-surface px-1 text-xs leading-4 whitespace-nowrap text-fg-subtle"
                    >
                        {copy.map.activityLabel}
                    </span>
                </div>
                <svg viewBox={`0 0 ${MAP.width} ${MAP.height}`}
                     class="block h-auto w-full min-w-[56rem] shrink-0 font-sans" role="group"
                     aria-label={copy.tabs.map.label}>
                    <g aria-hidden="true">
                        <path d={GRID} stroke="var(--color-border)" stroke-width={1}/>
                        <For each={JOURNEY_YEARS}>{(year) => (
                            <text x={xFor(year) + 5} y={30}
                                  class="fill-fg-subtle font-mono text-[11px]">{year}</text>
                        )}</For>
                    </g>

                    <g aria-hidden="true">
                        <line x1={TODAY_X} x2={TODAY_X} y1={20} y2={ACTIVITY_BASE} stroke="var(--color-fg-subtle)"
                              stroke-width={1}/>
                        <text x={TODAY_X} y={14} text-anchor="middle"
                              class="fill-fg text-[11px] font-semibold">{copy.today}</text>
                    </g>

                    <g aria-hidden="true">
                        <For each={SPANS}>{(span) => {
                            const y = laneY(span.line);
                            const solidEnd = Math.min(span.to, span.todayX);
                            const opacity = () => (dimmed([span.line]) ? 0.2 : 1);
                            return (
                                <>
                                    <Show when={span.from < solidEnd}>
                                        <path d={`M${span.from} ${y}H${solidEnd}`}
                                              opacity={opacity()} stroke={color(span.line)} stroke-width={5}
                                              stroke-linecap="round"/>
                                    </Show>
                                    <Show when={span.to > span.todayX}>
                                        <path
                                            d={`M${Math.max(span.from, span.todayX)} ${y}H${span.to}`}
                                            opacity={opacity()}
                                            stroke={color(span.line)}
                                            stroke-width={3}
                                            stroke-dasharray="1 7"
                                            stroke-linecap="round"
                                        />
                                    </Show>
                                </>
                            );
                        }}</For>
                    </g>

                    <For each={STATIONS}>{(station) => {
                        const milestone = BY_ID.get(station.id)!;
                        const future = isFuture(milestone, BUILD_DATE);
                        const active = () => station.id === props.selected;
                        const height = station.bottom - station.top;
                        return (
                            <g
                                role="button"
                                tabindex={0}
                                aria-pressed={active()}
                                aria-label={`${formatYearMonth(milestone.start, ui.months)} · ${copy.milestones[station.id].title}`}
                                onClick={() => props.onSelect(station.id)}
                                onKeyDown={(event) => onStationKey(event, station.id)}
                                opacity={dimmed(milestone.lines) ? 0.3 : 1}
                                style={{"--x": (station.x / MAP.width).toFixed(3)}}
                                class="journey-station cursor-pointer"
                            >
                                <rect
                                    class="journey-station-ring"
                                    x={station.x - 13}
                                    y={station.top - 13}
                                    width={26}
                                    height={height + 26}
                                    rx={13}
                                    fill="transparent"
                                    stroke={active() ? "var(--color-fg)" : "transparent"}
                                    stroke-width={2}
                                />
                                <Show when={height > 0}>
                                    <line x1={station.x} x2={station.x} y1={station.top} y2={station.bottom}
                                          stroke="var(--color-fg-muted)" stroke-width={2}/>
                                </Show>
                                <For each={milestone.lines}>{(line) => (
                                    <circle
                                        cx={station.x}
                                        cy={laneY(line)}
                                        r={6}
                                        fill="var(--color-surface)"
                                        stroke={color(line)}
                                        stroke-width={3}
                                        stroke-dasharray={future ? "3 2" : undefined}
                                    />
                                )}</For>
                            </g>
                        );
                    }}</For>

                    <For each={labels}>{(label) => (
                        <text
                            x={label.x}
                            y={label.y}
                            text-anchor="middle" aria-hidden="true"
                            class={cn("pointer-events-none text-[11px] font-semibold", label.id === props.selected ? "fill-fg" : "fill-fg-muted")}
                        >
                            {copy.milestones[label.id].short}
                        </text>
                    )}</For>

                    <g aria-hidden="true">
                        <line
                            x1={xFor(githubActivity.streak.from)}
                            x2={xFor(githubActivity.streak.to)}
                            y1={MAP.activityTop - 14}
                            y2={MAP.activityTop - 14}
                            stroke="var(--color-accent)"
                            stroke-width={2}
                            stroke-linecap="round"
                        />
                        <text x={xFor(githubActivity.streak.from)} y={MAP.activityTop - 20}
                              class="fill-fg-muted text-[10px]">
                            {copy.map.streakLabel.replace("{days}", String(githubActivity.streak.days))}
                        </text>
                        <For each={githubActivity.years}>{({year, activeDays}) => {
                            const top = ACTIVITY_BASE - (activeDays / 366) * MAP.activityHeight;
                            const center = (xFor(year) + xFor(year + 1)) / 2;
                            return (
                                <g>
                                    <path d={column(center - 12, top, 24)} fill="var(--color-primary)"/>
                                    <text x={center} y={top - 4} text-anchor="middle"
                                          class="fill-fg-muted text-[10px]">{activeDays}</text>
                                </g>
                            );
                        }}</For>
                    </g>
                </svg>
            </div>
            <JourneySteps stations={STATIONS} steps={steps()} selected={props.selected} onSelect={props.onSelect}
                          emphasis={props.emphasis} class="lg:hidden"/>

            <SwipeArea onPrevious={() => {
                const previous = steps().previous;
                if (previous) props.onSelect(previous.id);
            }} onNext={() => {
                const next = steps().next;
                if (next) props.onSelect(next.id);
            }}>
                <MilestoneDetails id={props.selected}/>
            </SwipeArea>

            <div>
                <button
                    type="button"
                    aria-expanded={showList()}
                    aria-controls="journey-list"
                    onClick={() => setShowList((value) => !value)}
                    class="inline-flex min-h-9 items-center text-sm font-semibold text-primary hover:text-primary-hover"
                >
                    {showList() ? copy.map.listToggle.hide : copy.map.listToggle.show}
                </button>
                <Show when={showList()}>
                    <ol id="journey-list" class="appear mt-3 grid gap-2 sm:grid-cols-2">
                        <For each={STATIONS}>{({id}) => {
                            const milestone = BY_ID.get(id)!;
                            return (
                                <li>
                                    <button
                                        type="button"
                                        aria-pressed={id === props.selected}
                                        onClick={() => props.onSelect(id)}
                                        class={cn(
                                            "flex w-full items-start gap-3 rounded-md border px-3 py-2 text-left text-sm",
                                            id === props.selected ? "border-primary bg-surface-raised" : "border-border hover:border-border-strong",
                                        )}
                                    >
                                    <span
                                        class="w-20 shrink-0 font-mono text-xs text-fg-subtle">{formatYearMonth(milestone.start, ui.months)}</span>
                                        <span class="text-fg">{copy.milestones[id].title}</span>
                                    </button>
                                </li>
                            );
                        }}</For>
                    </ol>
                </Show>
            </div>
        </div>
    );
}
