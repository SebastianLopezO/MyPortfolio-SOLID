import {formatDuration, formatRange, formatYearMonth, monthsBetween} from "@/lib/format";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

describe("format", () => {
    it("formats months and ranges with an en dash", () => {
        expect(formatYearMonth("2022-08", MONTHS)).toBe("Aug 2022");
        expect(formatRange("2023-07", "2025-01", MONTHS, "Present")).toBe("Jul 2023 – Jan 2025");
        expect(formatRange("2025-06", null, MONTHS, "Present")).toBe("Jun 2025 – Present");
    });

    it("counts inclusive months up to the build date", () => {
        expect(monthsBetween("2023-07", "2025-01")).toBe(19);
        expect(monthsBetween("2025-06", null)).toBe(17);
    });

    it("formats durations in both languages", () => {
        expect(formatDuration(19, "en")).toBe("1 yr 7 mos");
        expect(formatDuration(12, "es")).toBe("1 año");
        expect(formatDuration(10, "es")).toBe("10 meses");
        expect(formatDuration(25, "es")).toBe("2 años 1 mes");
    });
});
