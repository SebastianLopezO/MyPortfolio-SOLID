import type {RoleId} from "@/content/roles";
import {JOURNEY_END, JOURNEY_LINES, JOURNEY_START, milestones} from "@/content/shared/journey";
import type {YearMonth} from "@/types/content";
import type {CapabilityId, JourneyLineId, MilestoneFacts, MilestoneId, SdgId} from "@/types/journey";

export const ROLE_LINE: Record<RoleId, JourneyLineId> = {
    backend: "backend",
    crm: "crm",
    data: "data",
    devops: "devops",
    fullstack: "web",
};

export const ROLE_AREAS: Record<RoleId, CapabilityId[]> = {
    backend: ["backend", "databases"],
    crm: ["crm"],
    data: ["data", "ai"],
    devops: ["devops"],
    fullstack: ["web", "backend"],
};

/** Decimal year of the first day of a month, e.g. 2024-07 -> 2024.5. */
export const yearFraction = (value: YearMonth | string) => {
    const [year, month = "1", day = "1"] = value.split("-");
    return Number(year) + (Number(month) - 1) / 12 + (Number(day) - 1) / 365;
};

export const isFuture = (milestone: MilestoneFacts, today: string) => milestone.start > today.slice(0, 7);

export const milestoneEnd = (milestone: MilestoneFacts, today: string) =>
    milestone.end === undefined ? milestone.start : (milestone.end ?? today.slice(0, 7));

/** Milestones active during a year that worked on a capability, newest first. */
export const evidenceFor = (area: CapabilityId, year: number, today: string) =>
    milestones
        .filter((milestone) => milestone.areas.includes(area))
        .filter((milestone) => Number(milestone.start.slice(0, 4)) <= year && Number(milestoneEnd(milestone, today).slice(0, 4)) >= year)
        .sort((a, b) => b.start.localeCompare(a.start))
        .map((milestone) => milestone.id);

export const milestonesForSdg = (sdg: SdgId) => milestones.filter((milestone) => milestone.sdgs?.includes(sdg)).map((milestone) => milestone.id);

export interface MapGeometry {
    width: number;
    height: number;
    plotLeft: number;
    plotRight: number;
    laneTop: number;
    laneGap: number;
    activityTop: number;
    activityHeight: number;
}

export const MAP: MapGeometry = {
    width: 1120,
    height: 452,
    plotLeft: 184,
    plotRight: 1096,
    laneTop: 72,
    laneGap: 44,
    activityTop: 392,
    activityHeight: 40,
};

// Recent years hold most milestones, so they get more width than the early school years and the planned ones.
const YEAR_WEIGHT = (year: number) => (year < 2022 ? 0.55 : year <= 2026 ? 1.35 : 0.75);
const TOTAL_WEIGHT = Array.from({length: JOURNEY_END + 1 - JOURNEY_START}, (_, index) => YEAR_WEIGHT(JOURNEY_START + index)).reduce((a, b) => a + b, 0);

export const xFor = (value: YearMonth | string | number) => {
    const year = Math.min(Math.max(typeof value === "number" ? value : yearFraction(value), JOURNEY_START), JOURNEY_END + 1);
    let offset = 0;
    for (let current = JOURNEY_START; current < Math.floor(year); current += 1) offset += YEAR_WEIGHT(current);
    offset += (year - Math.floor(year)) * YEAR_WEIGHT(Math.floor(year));
    return MAP.plotLeft + (offset / TOTAL_WEIGHT) * (MAP.plotRight - MAP.plotLeft);
};

export const laneY = (line: JourneyLineId) => MAP.laneTop + JOURNEY_LINES.indexOf(line) * MAP.laneGap;

const STATION_GAP = 18;

export interface StationLayout {
    id: MilestoneId;
    x: number;
    top: number;
    bottom: number;
    lanes: number[];
}

/** Places stations by date and nudges them right when they would overlap a station on a shared lane. */
export function layoutStations(items: MilestoneFacts[] = milestones): StationLayout[] {
    const lastX = new Map<JourneyLineId, number>();
    return [...items]
        .sort((a, b) => a.start.localeCompare(b.start))
        .map((milestone) => {
            const minimum = Math.max(...milestone.lines.map((line) => (lastX.get(line) ?? -Infinity) + STATION_GAP));
            const x = Math.max(xFor(milestone.start), minimum);
            for (const line of milestone.lines) lastX.set(line, x);
            const lanes = milestone.lines.map(laneY).sort((a, b) => a - b);
            return {id: milestone.id, x, top: lanes[0], bottom: lanes[lanes.length - 1], lanes};
        });
}

export interface Steps {
    /** Stops that the steps visit: every stop, or only those of the selected line. */
    order: StationLayout[];
    /** Position of the selected stop in that order, or -1 when it is not on the selected line. */
    index: number;
    previous?: StationLayout;
    next?: StationLayout;
}

/** The stops before and after the selected one; off the selected line, the nearest ones on it by date. */
export function stepsAround(stations: StationLayout[], selected: MilestoneId, line: JourneyLineId | null): Steps {
    const byId = new Map(milestones.map((milestone) => [milestone.id, milestone]));
    const order = stations.filter(({id}) => line === null || byId.get(id)!.lines.includes(line));
    const index = order.findIndex(({id}) => id === selected);
    if (index >= 0) return {order, index, previous: order[index - 1], next: order[index + 1]};
    const start = byId.get(selected)!.start;
    return {
        order,
        index,
        previous: order.filter(({id}) => byId.get(id)!.start < start).at(-1),
        next: order.find(({id}) => byId.get(id)!.start > start),
    };
}

export interface LineSpan {
    line: JourneyLineId;
    from: number;
    to: number;
    todayX: number;
}

/** Each line runs from its first to its last station; the part after today is drawn as a projection. */
export function lineSpans(stations: StationLayout[], today: string): LineSpan[] {
    const byId = new Map(stations.map((station) => [station.id, station]));
    const todayX = xFor(today);
    return JOURNEY_LINES.map((line) => {
        const xs = milestones.filter((milestone) => milestone.lines.includes(line)).map((milestone) => byId.get(milestone.id)!.x);
        return {line, from: Math.min(...xs), to: Math.max(...xs), todayX};
    });
}

export interface LabelLayout {
    id: MilestoneId;
    x: number;
    y: number;
}

/** Puts each short label above its station, or below it, wherever it overlaps no other label or station. */
export function layoutLabels(stations: StationLayout[], labels: Partial<Record<MilestoneId, string>>): LabelLayout[] {
    const boxes = stations.map((station) => ({
        left: station.x - 10,
        right: station.x + 10,
        top: station.top - 10,
        bottom: station.bottom + 10
    }));
    const result: LabelLayout[] = [];
    for (const station of stations) {
        const text = labels[station.id];
        if (!text) continue;
        const half = (text.length * 6.2) / 2 + 3;
        for (const y of [station.top - 16, station.bottom + 24, station.top - 30, station.bottom + 38]) {
            const box = {left: station.x - half, right: station.x + half, top: y - 10, bottom: y + 3};
            const free = boxes.every((other) => other.right < box.left || other.left > box.right || other.bottom < box.top || other.top > box.bottom);
            if (free) {
                boxes.push(box);
                result.push({id: station.id, x: station.x, y});
                break;
            }
        }
    }
    return result;
}
