import {describe, expect, it} from "vitest";
import {capabilityLevels, JOURNEY_LINES, JOURNEY_YEARS, milestones, radarItems} from "@/content/shared/journey";
import {journeyCopy} from "@/content/journey-copy";
import {
    evidenceFor,
    isFuture,
    layoutLabels,
    layoutStations,
    lineSpans,
    MAP,
    milestonesForSdg,
    stepsAround,
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
            const xs = milestones
                .filter((milestone) => milestone.lines.includes(line))
                .map((milestone) => stations.find((station) => station.id === milestone.id)!.x)
                .sort((a, b) => a - b);
            xs.slice(1).forEach((x, index) => expect(x - xs[index]).toBeGreaterThanOrEqual(18));
        }
    });

    it("runs every line from its first to its last station", () => {
        const spans = lineSpans(layoutStations(), "2026-10-05");
        expect(spans.map((span) => span.line)).toEqual(JOURNEY_LINES);
        for (const span of spans) expect(span.to).toBeGreaterThanOrEqual(span.from);
    });

    it("never lets two labels overlap", () => {
        const stations = layoutStations();
        const labels = layoutLabels(stations, Object.fromEntries(milestones.filter((item) => item.major).map((item) => [item.id, journeyCopy.en.milestones[item.id].short])));
        for (const [index, a] of labels.entries()) {
            for (const b of labels.slice(index + 1)) {
                const sameRow = Math.abs(a.y - b.y) < 12;
                const width = ((journeyCopy.en.milestones[a.id].short!.length + journeyCopy.en.milestones[b.id].short!.length) * 6.2) / 2 + 6;
                expect(sameRow && Math.abs(a.x - b.x) < width).toBe(false);
            }
        }
        expect(labels.length).toBeGreaterThanOrEqual(10);
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
