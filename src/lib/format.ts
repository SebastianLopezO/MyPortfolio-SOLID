import {BUILD_DATE} from "@/content/shared/site";
import type {Lang, YearMonth} from "@/types/content";

const parts = (value: string) => value.split("-").map(Number) as [number, number];

export const formatYearMonth = (value: YearMonth, months: readonly string[]) => {
    const [year, month] = parts(value);
    return `${months[month - 1]} ${year}`;
};

/** A day such as 2026-10-16 in words: "16 de octubre de 2026" or "October 16, 2026", or without the year. */
export const formatDay = (value: string, locale: string, {year = true} = {}) =>
    new Intl.DateTimeFormat(locale.replace("_", "-"), {
        day: "numeric",
        month: "long",
        year: year ? "numeric" : undefined,
        timeZone: "UTC"
    })
        .format(new Date(`${value}T00:00:00Z`));

export const formatRange = (start: YearMonth, end: YearMonth | null, months: readonly string[], present: string) =>
    `${formatYearMonth(start, months)} – ${end ? formatYearMonth(end, months) : present}`;

export const monthsBetween = (start: YearMonth, end: YearMonth | null) => {
    const [startYear, startMonth] = parts(start);
    const [endYear, endMonth] = parts(end ?? BUILD_DATE.slice(0, 7));
    return endYear * 12 + endMonth - (startYear * 12 + startMonth) + 1;
};

const UNITS: Record<Lang, { year: [string, string]; month: [string, string] }> = {
    en: {year: ["yr", "yrs"], month: ["mo", "mos"]},
    es: {year: ["año", "años"], month: ["mes", "meses"]},
};

export const formatDuration = (months: number, lang: Lang) => {
    const units = UNITS[lang];
    const years = Math.floor(months / 12);
    const rest = months % 12;
    const label = (count: number, [one, many]: [string, string]) => `${count} ${count === 1 ? one : many}`;
    return [years > 0 && label(years, units.year), rest > 0 && label(rest, units.month)].filter(Boolean).join(" ");
};
