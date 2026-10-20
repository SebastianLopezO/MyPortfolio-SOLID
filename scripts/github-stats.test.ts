// @vitest-environment node
import {readFileSync} from "node:fs";
import {describe, expect, it} from "vitest";
import {SNAPSHOT, trimStats} from "./github-stats.ts";

// The committed snapshot shaped back into the profile repository's stats.json, with fields the portfolio does not read.
const snapshot = JSON.parse(readFileSync(SNAPSHOT, "utf8"));
const {generatedAt, wakatime, ...github} = snapshot;
const remote = () => structuredClone({
    generatedAt,
    github: {...github, calendar: [{date: "2026-10-15", count: 3}]},
    wakatime: {...wakatime, dailyAverage: 3600},
});

describe("trimStats", () => {
    it("keeps what the snapshot holds, in its order, and drops the rest", () => {
        expect(JSON.stringify(trimStats(remote()))).toBe(JSON.stringify(snapshot));
    });

    it("rejects figures that changed shape, so the committed snapshot stays", () => {
        const shortWeek = remote();
        shortWeek.github.weekdays.pop();
        expect(() => trimStats(shortWeek)).toThrow(/weekdays/);

        const textCount = remote();
        (textCount.github.totals as Record<string, unknown>).commits = "28541";
        expect(() => trimStats(textCount)).toThrow(/commits/);
    });

    it("reads stats from before WakaTime reported editors", () => {
        const withoutEditors = remote();
        delete (withoutEditors.wakatime as Partial<typeof wakatime>).editors;
        expect(trimStats(withoutEditors).wakatime.editors).toEqual([]);
    });
});
