import {createSignal, For, Show} from "solid-js";
import {RADAR_QUADRANTS, RADAR_RINGS, radarItems} from "@/content/shared/journey";
import {useJourneyCopy} from "@/hooks/useJourneyCopy";
import {cn} from "@/lib/utils";
import type {RadarItemId, RadarQuadrant, RadarRing} from "@/types/journey";

const SIZE = 520;
const CENTER = SIZE / 2;
const RING_OUTER: Record<RadarRing, number> = {core: 82, growing: 148, exploring: 208, paused: 252};
const RING_INNER: Record<RadarRing, number> = {core: 0, growing: 82, exploring: 148, paused: 208};
const RING_FILL: Record<RadarRing, string> = {
    core: "var(--color-level-4)",
    growing: "var(--color-level-3)",
    exploring: "var(--color-level-2)",
    paused: "var(--color-level-1)",
};
// Screen angles (clockwise from the positive x axis) that each quadrant's items spread over. The ring labels run
// along the vertical axis inside the data quadrant, so its items start a little later and sit on the outer half of
// their band first.
const QUADRANT_ARC: Record<RadarQuadrant, [number, number]> = {
    build: [180, 270],
    data: [284, 360],
    platforms: [0, 90],
    security: [90, 180]
};

const ordered = RADAR_QUADRANTS.flatMap((quadrant) =>
    RADAR_RINGS.flatMap((ring) => radarItems.filter((item) => item.quadrant === quadrant && item.ring === ring)),
);

const positions = new Map(
    RADAR_QUADRANTS.flatMap((quadrant) =>
        RADAR_RINGS.flatMap((ring) => {
            const items = radarItems.filter((item) => item.quadrant === quadrant && item.ring === ring);
            return items.map((item, index) => {
                const [from, to] = QUADRANT_ARC[quadrant];
                const angle = ((from + ((index + 1) * (to - from)) / (items.length + 1)) * Math.PI) / 180;
                const band = RING_OUTER[ring] - RING_INNER[ring];
                const outer = (index + (quadrant === "data" ? 1 : 0)) % 2 === 1;
                const radius = ring === "core" ? 48 + (index % 2) * 18 : RING_INNER[ring] + band / 2 + (outer ? band * 0.16 : -band * 0.16);
                return [item.id, {x: CENTER + radius * Math.cos(angle), y: CENTER + radius * Math.sin(angle)}] as const;
            });
        }),
    ),
);

export function FocusRadar() {
    const {radar} = useJourneyCopy();
    const [active, setActive] = createSignal<RadarItemId>("fastapi");
    const activeItem = () => radarItems.find((item) => item.id === active())!;

    return (
        <div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start">
            <div>
                <svg viewBox={`0 0 ${SIZE} ${SIZE}`} class="mx-auto block h-auto w-full max-w-130 font-sans"
                     aria-hidden="true">
                    <For each={[...RADAR_RINGS].reverse()}>
                        {(ring) => (
                            <circle cx={CENTER} cy={CENTER} r={RING_OUTER[ring]} fill="var(--color-surface)"
                                    stroke="var(--color-border)" stroke-width={1}/>
                        )}
                    </For>
                    <line x1={CENTER - RING_OUTER.paused} x2={CENTER + RING_OUTER.paused} y1={CENTER} y2={CENTER}
                          stroke="var(--color-border)" stroke-width={1}/>
                    <line x1={CENTER} x2={CENTER} y1={CENTER - RING_OUTER.paused} y2={CENTER + RING_OUTER.paused}
                          stroke="var(--color-border)" stroke-width={1}/>
                    <For each={RADAR_RINGS}>
                        {(ring) => (
                            <text x={CENTER + 6} y={CENTER - RING_OUTER[ring] + 14}
                                  class="fill-fg-subtle text-[11px]">
                                {radar.rings[ring].label}
                            </text>
                        )}
                    </For>
                    <text x={8} y={18}
                          class="fill-fg-muted text-[13px] font-semibold">{radar.quadrants.build}</text>
                    <text x={SIZE - 8} y={18} text-anchor="end"
                          class="fill-fg-muted text-[13px] font-semibold">{radar.quadrants.data}</text>
                    <text x={SIZE - 8} y={SIZE - 8} text-anchor="end"
                          class="fill-fg-muted text-[13px] font-semibold">{radar.quadrants.platforms}</text>
                    <text x={8} y={SIZE - 8}
                          class="fill-fg-muted text-[13px] font-semibold">{radar.quadrants.security}</text>
                    <For each={ordered}>{(item, index) => {
                        const point = positions.get(item.id)!;
                        const selected = () => item.id === active();
                        return (
                            <g class="cursor-pointer" onPointerEnter={() => setActive(item.id)}
                               onClick={() => setActive(item.id)}>
                                <circle cx={point.x} cy={point.y} r={16} fill="transparent"/>
                                <circle
                                    cx={point.x}
                                    cy={point.y}
                                    r={selected() ? 13 : 11}
                                    fill={RING_FILL[item.ring]}
                                    stroke={selected() ? "var(--color-fg)" : "var(--color-surface)"}
                                    stroke-width={2}
                                />
                                <text
                                    x={point.x}
                                    y={point.y + 3.5}
                                    text-anchor="middle"
                                    class={cn("pointer-events-none font-mono text-[10px] font-semibold", item.ring === "paused" ? "fill-fg" : "fill-bg")}
                                >
                                    {index() + 1}
                                </text>
                            </g>
                        );
                    }}</For>
                </svg>
                <p class="mt-3 text-center text-xs text-fg-subtle">{radar.caption}</p>
            </div>

            <div class="space-y-6">
                <div aria-live="polite" class="rounded-lg border border-border bg-surface p-5">
                    <p class="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                        {radar.quadrants[activeItem().quadrant]} · {radar.rings[activeItem().ring].label}
                    </p>
                    <p class="mt-1 text-title text-fg">{radar.items[active()].name}</p>
                    <p class="mt-2 text-fg-muted">{radar.items[active()].note}</p>
                    <p class="mt-2 text-sm text-fg-subtle">{radar.rings[activeItem().ring].description}</p>
                </div>
                <div class="grid gap-5 sm:grid-cols-2">
                    <For each={RADAR_QUADRANTS}>{(quadrant) => (
                        <div>
                            <h3 class="font-semibold text-fg">{radar.quadrants[quadrant]}</h3>
                            <ol class="mt-2 space-y-1">
                                <For each={ordered}>{(item, index) => (
                                    <Show when={item.quadrant === quadrant}>
                                        <li>
                                            <button
                                                type="button"
                                                aria-pressed={item.id === active()}
                                                onClick={() => setActive(item.id)}
                                                onFocus={() => setActive(item.id)}
                                                onPointerEnter={() => setActive(item.id)}
                                                class={cn(
                                                    "flex min-h-8 w-full items-center gap-2 rounded-md px-2 text-left text-sm",
                                                    item.id === active() ? "bg-surface-raised text-fg" : "text-fg-muted hover:text-fg",
                                                )}
                                            >
                                                <span aria-hidden="true"
                                                      class={cn(
                                                          "grid size-5 shrink-0 place-items-center rounded-full font-mono text-[10px] font-semibold",
                                                          item.ring === "paused" ? "text-fg" : "text-bg",
                                                      )}
                                                      style={{background: RING_FILL[item.ring]}}
                                                >
                                                    {index() + 1}
                                                </span>
                                                <span class="flex-1">{radar.items[item.id].name}</span>
                                                <span class="sr-only">{radar.rings[item.ring].label}</span>
                                            </button>
                                        </li>
                                    </Show>
                                )}</For>
                            </ol>
                        </div>
                    )}</For>
                </div>
                <ul class="flex flex-wrap gap-x-4 gap-y-2 text-xs text-fg-muted">
                    <For each={RADAR_RINGS}>
                        {(ring) => (
                            <li class="inline-flex items-center gap-1.5">
                                <span aria-hidden="true" class="size-3 rounded-full"
                                      style={{background: RING_FILL[ring]}}/>
                                {radar.rings[ring].label}
                            </li>
                        )}
                    </For>
                </ul>
            </div>
        </div>
    );
}
