import {describe, expect, it} from "vitest";
import {capabilityLevels, JOURNEY_LINES, JOURNEY_YEARS, milestones, radarItems} from "@/content/shared/journey";
import {journeyCopy} from "@/content/journey-copy";
import {
    evidenceFor,
    isFuture,
    layoutStations,
    lineSpans,
    MAP,
    milestonesForSdg,
    STATION_SPACE,
    stationRadius,
    stepsAround,
    TAG_HEIGHT,
    tagLayout,
    xFor
} from "@/lib/journey";

describe("journey map", () => {
    it("moves forward in time from left to right inside the plot", () => {
        const xs = ["2019-01", "2021-06", "2022-01", "2024-07", "2026-10", "2030-12"].map((date) => xFor(date));
        expect(xs).toEqual([...xs].sort((a, b) => a - b));
        expect(xs[0]).toBeGreaterThanOrEqual(MAP.plotLeft);
        expect(xs[xs.length - 1]).toBeLessThanOrEqual(MAP.plotRight);
    });

    it("keeps stations that share a line apart", () => {
        const stations = layoutStations();
        for (const line of JOURNEY_LINES) {
            const marks = milestones
                .filter((milestone) => milestone.lines.includes(line))
                .map((milestone) => ({x: stations.find((station) => station.id === milestone.id)!.x, r: stationRadius(milestone)}))
                .sort((a, b) => a.x - b.x);
            marks.slice(1).forEach((mark, index) => expect(mark.x - mark.r - (marks[index].x + marks[index].r)).toBeGreaterThanOrEqual(STATION_SPACE - 1e-9));
        }
    });

    it("never pushes a stop that has happened past today", () => {
        const today = "2026-11-19";
        const stations = layoutStations();
        for (const milestone of milestones.filter((item) => !isFuture(item, today))) {
            expect(stations.find((station) => station.id === milestone.id)!.x).toBeLessThanOrEqual(xFor(today));
        }
    });

    it("runs every line from its first to its last station, and on to today while it is still active", () => {
        const today = "2026-10-05";
        const stations = layoutStations();
        const spans = lineSpans(stations, today);
        expect(spans.map((span) => span.line)).toEqual(JOURNEY_LINES);
        for (const span of spans) {
            expect(span.to).toBeGreaterThanOrEqual(span.from);
            const ongoing = milestones.some((item) => item.lines.includes(span.line) && item.end === null && !isFuture(item, today));
            if (ongoing) expect(span.to).toBeGreaterThanOrEqual(xFor(today));
        }
    });

    it("keeps the tag of any stop inside the map and between two lanes", () => {
        const stations = layoutStations();
        for (const copy of Object.values(journeyCopy)) {
            for (const station of stations) {
                const tag = tagLayout(station, `Sep 2026 · ${copy.milestones[station.id].title}`);
                expect(tag.x - tag.width / 2).toBeGreaterThanOrEqual(0);
                expect(tag.x + tag.width / 2).toBeLessThanOrEqual(MAP.width);
                expect(tag.y - TAG_HEIGHT / 2).toBeGreaterThan(station.bottom + 6);
                expect(tag.y + TAG_HEIGHT / 2).toBeLessThan(Math.min(station.bottom + MAP.laneGap - 6, MAP.gridBottom));
            }
        }
    });

    it("steps through every stop in date order, or only through one line's stops", () => {
        const stations = layoutStations();
        const middle = stations[5].id;
        const all = stepsAround(stations, middle, null);
        expect(all.order).toHaveLength(milestones.length);
        expect([all.previous?.id, all.next?.id]).toEqual([stations[4].id, stations[6].id]);
        expect(stepsAround(stations, stations[0].id, null).previous).toBeUndefined();
        expect(stepsAround(stations, stations.at(-1)!.id, null).next).toBeUndefined();

        const onData = stepsAround(stations, middle, "data");
        expect(onData.order.every(({id}) => milestones.find((item) => item.id === id)!.lines.includes("data"))).toBe(true);
    });

    it("finds the nearest stops on a line when the selected stop is not on it", () => {
        const stations = layoutStations();
        const offLine = milestones.find((milestone) => !milestone.lines.includes("crm") && milestone.start > "2024-01" && milestone.start < "2026-01")!;
        const steps = stepsAround(stations, offLine.id, "crm");
        const date = (id: string) => milestones.find((item) => item.id === id)!.start;
        expect(steps.index).toBe(-1);
        if (steps.previous) expect(date(steps.previous.id) < offLine.start).toBe(true);
        if (steps.next) expect(date(steps.next.id) > offLine.start).toBe(true);
        expect(steps.previous ?? steps.next).toBeDefined();
    });

    it("marks only planned milestones as future", () => {
        const future = milestones.filter((milestone) => isFuture(milestone, "2026-10-05")).map((milestone) => milestone.id);
        expect(future).toEqual(["graduation", "dataScience", "cybersecurity", "vision"]);
    });
});

describe("journey data", () => {
    it("gives every capability a level for every year", () => {
        for (const levels of Object.values(capabilityLevels)) expect(levels).toHaveLength(JOURNEY_YEARS.length);
    });

    it("backs current capabilities with milestones", () => {
        expect(evidenceFor("backend", 2026, "2026-10-05")).toEqual(expect.arrayContaining(["tivenos", "gopoli", "smartpot"]));
        expect(evidenceFor("crm", 2019, "2026-10-05")).toEqual([]);
    });

    it("links every goal of the 2030 Agenda to at least one milestone", () => {
        for (const sdg of [2, 4, 8, 9, 11, 13, 16] as const) expect(milestonesForSdg(sdg).length).toBeGreaterThan(0);
    });

    it("labels every major milestone and radar item in both languages", () => {
        for (const copy of Object.values(journeyCopy)) {
            for (const milestone of milestones.filter((item) => item.major)) expect(copy.milestones[milestone.id].short).toBeTruthy();
            for (const item of radarItems) expect(copy.radar.items[item.id].name).toBeTruthy();
        }
    });
});
