import {createMemo, createSignal, For, onMount, Show} from "solid-js";
import {JOURNEY_END, JOURNEY_LINES, JOURNEY_YEARS, milestones} from "@/content/shared/journey";
import {BUILD_DATE} from "@/content/shared/site";
import {useContent} from "@/context/language";
import {useJourneyCopy} from "@/hooks/useJourneyCopy";
import {formatYearMonth} from "@/lib/format";
import {
    isFuture,
    laneY,
    layoutStations,
    lineSpans,
    MAP,
    stationRadius,
    stepsAround,
    TAG_HEIGHT,
    tagLayout,
    xFor
} from "@/lib/journey";
import {cn} from "@/lib/utils";
import type {JourneyLineId, MilestoneId} from "@/types/journey";
import {JourneySteps, SwipeArea} from "./JourneySteps";
import {LineKey} from "./LineKey";
import {MilestoneDetails} from "./MilestoneDetails";

const STATIONS = layoutStations();
const STATION_BY_ID = new Map(STATIONS.map((station) => [station.id, station]));
const SPANS = lineSpans(STATIONS, BUILD_DATE);
const BY_ID = new Map(milestones.map((milestone) => [milestone.id, milestone]));
const TODAY_X = xFor(BUILD_DATE);
const color = (line: JourneyLineId) => `var(--color-viz-${line})`;
const GRID = JOURNEY_YEARS.map((year) => `M${xFor(year)} ${MAP.gridTop}V${MAP.gridBottom}`).join("");
const RAILS = JOURNEY_LINES.map((line) => `M${MAP.plotLeft} ${laneY(line)}H${MAP.plotRight}`).join("");
const LINE_OPACITY = 0.6;

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
    // The stop under the pointer or the keyboard focus names itself in the tag; otherwise the selected one does.
    const [pointed, setPointed] = createSignal<MilestoneId | null>(null);
    let scroller: HTMLDivElement | undefined;

    // The map only shows from 64rem, where it fits; if large text still makes it wider than its box, start near today.
    onMount(() => {
        const element = scroller;
        if (element && element.scrollWidth > element.clientWidth) {
            element.scrollLeft = (element.scrollWidth * TODAY_X) / MAP.width - element.clientWidth * 0.65;
        }
    });

    const dimmed = (lines: JourneyLineId[]) => props.emphasis !== null && !lines.includes(props.emphasis);
    const steps = createMemo(() => stepsAround(STATIONS, props.selected, props.emphasis));
    const tag = createMemo(() => {
        const id = pointed() ?? props.selected;
        const text = `${formatYearMonth(BY_ID.get(id)!.start, ui.months)} · ${copy.milestones[id].title}`;
        return {text, ...tagLayout(STATION_BY_ID.get(id)!, text)};
    });
    const leave = (id: MilestoneId) => {
        if (pointed() === id) setPointed(null);
    };
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

            {/* The map rises into place as one piece, like the other blocks of the page (globals.css, section-enter). */}
            <div ref={scroller}
                 class="journey-chart section-enter hidden overflow-x-auto rounded-lg border border-border bg-surface/60 lg:flex">
                {/* Lane names, short since the chips above carry the full ones, stay pinned to the left edge if large
                    text makes the map scroll. */}
                <div aria-hidden="true" class="pointer-events-none sticky left-0 z-10 w-0 shrink-0">
                    <For each={JOURNEY_LINES}>{(line) => (
                        <span
                            style={{top: `${(laneY(line) / MAP.height) * 100}%`}}
                            class={cn(
                                "absolute left-3 inline-flex -translate-y-1/2 items-center gap-2 text-xs leading-4 whitespace-nowrap transition-colors",
                                props.emphasis === line ? "font-semibold text-fg" : dimmed([line]) ? "text-fg-subtle" : "text-fg-muted",
                            )}
                        >
                            <span class="size-2 shrink-0 rounded-full" style={{background: color(line)}}/>
                            {copy.linesShort[line]}
                        </span>
                    )}</For>
                </div>
                <svg viewBox={`0 0 ${MAP.width} ${MAP.height}`}
                     class="block h-auto w-full min-w-[56rem] shrink-0 font-sans" role="group"
                     aria-label={copy.tabs.map.label}>
                    {/* The years ahead are a tinted zone, so a plan never reads as a fact. */}
                    <g aria-hidden="true">
                        <rect x={TODAY_X} y={MAP.gridTop} width={MAP.width - 8 - TODAY_X}
                              height={MAP.gridBottom - MAP.gridTop} rx={6} fill="var(--color-fg)" fill-opacity={0.02}/>
                        <path d={GRID} stroke="var(--color-border)" stroke-width={1} stroke-dasharray="2 4"/>
                        <For each={JOURNEY_YEARS}>{(year) => (
                            <text x={(xFor(year) + xFor(Math.min(year + 1, JOURNEY_END + 1))) / 2} y={MAP.axisY}
                                  text-anchor="middle" class="fill-fg-subtle font-mono text-[11px]">{year}</text>
                        )}</For>
                        <line x1={TODAY_X} x2={TODAY_X} y1={MAP.gridTop} y2={MAP.gridBottom}
                              stroke="var(--color-fg-subtle)" stroke-width={1}/>
                        <text x={TODAY_X} y={MAP.height - 8} text-anchor="middle"
                              class="fill-fg font-mono text-[11px] font-semibold">{copy.today}</text>
                        <path d={RAILS} stroke="var(--color-border)" stroke-width={1}/>
                    </g>

                    <g aria-hidden="true">
                        <For each={SPANS}>{(span) => {
                            const y = laneY(span.line);
                            const solidEnd = Math.min(span.to, span.todayX);
                            const style = () => ({opacity: dimmed([span.line]) ? 0.12 : LINE_OPACITY});
                            return (
                                <>
                                    <Show when={span.from < solidEnd}>
                                        <path d={`M${span.from} ${y}H${solidEnd}`} style={style()}
                                              class="transition-opacity" stroke={color(span.line)} stroke-width={3}
                                              stroke-linecap="round"/>
                                    </Show>
                                    <Show when={span.to > span.todayX}>
                                        <path d={`M${Math.max(span.from, span.todayX)} ${y}H${span.to}`}
                                              style={style()} class="transition-opacity" stroke={color(span.line)}
                                              stroke-width={2} stroke-dasharray="5 5"/>
                                    </Show>
                                </>
                            );
                        }}</For>
                    </g>

                    <For each={STATIONS}>{(station) => {
                        const milestone = BY_ID.get(station.id)!;
                        const future = isFuture(milestone, BUILD_DATE);
                        const height = station.bottom - station.top;
                        return (
                            <g
                                role="button"
                                tabindex={0}
                                aria-pressed={station.id === props.selected}
                                aria-label={`${formatYearMonth(milestone.start, ui.months)} · ${copy.milestones[station.id].title}`}
                                onClick={() => props.onSelect(station.id)}
                                onKeyDown={(event) => onStationKey(event, station.id)}
                                onPointerEnter={() => setPointed(station.id)}
                                onPointerLeave={() => leave(station.id)}
                                onFocus={() => setPointed(station.id)}
                                onBlur={() => leave(station.id)}
                                style={{opacity: dimmed(milestone.lines) ? 0.2 : 1}}
                                class="journey-station cursor-pointer transition-opacity"
                            >
                                <rect class="journey-station-ring" x={station.x - 12} y={station.top - 12} width={24}
                                      height={height + 24} rx={12} fill="transparent"/>
                                {/* The stop's lanes are joined and ringed only while it is selected or pointed at. */}
                                <g class="journey-halo">
                                    <Show when={height > 0}>
                                        <line x1={station.x} x2={station.x} y1={station.top} y2={station.bottom}
                                              stroke="var(--color-fg-subtle)" stroke-width={1.5}/>
                                    </Show>
                                    <For each={milestone.lines}>{(line) => (
                                        <circle cx={station.x} cy={laneY(line)} r={10} fill="none"
                                                stroke={color(line)} stroke-width={1.5}/>
                                    )}</For>
                                </g>
                                {/* A main milestone is a ring; a smaller step on the way, a dot. */}
                                <For each={milestone.lines}>{(line) => milestone.major ? (
                                    <circle cx={station.x} cy={laneY(line)} r={stationRadius(milestone)}
                                            fill="var(--color-surface)" stroke={color(line)} stroke-width={2.5}
                                            stroke-dasharray={future ? "2.5 2" : undefined}/>
                                ) : (
                                    <circle cx={station.x} cy={laneY(line)} r={stationRadius(milestone)}
                                            fill={color(line)}/>
                                )}</For>
                            </g>
                        );
                    }}</For>

                    <g aria-hidden="true" class="pointer-events-none">
                        <rect x={tag().x - tag().width / 2} y={tag().y - TAG_HEIGHT / 2} width={tag().width}
                              height={TAG_HEIGHT} rx={TAG_HEIGHT / 2} fill="var(--color-bg)"
                              stroke="var(--color-border-strong)" stroke-width={1}/>
                        <text x={tag().x} y={tag().y + 4} text-anchor="middle"
                              class="fill-fg font-mono text-[11px]">{tag().text}</text>
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
                                            "flex w-full items-start gap-3 rounded-full border px-3 py-2 text-left text-sm",
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
