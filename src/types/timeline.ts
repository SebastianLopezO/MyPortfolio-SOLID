export const TIMELINE_KINDS = ["job", "program", "project", "recommendation", "certification", "milestone"] as const;

/** What a timeline entry is about, which picks its icon and the filter that keeps it. */
export type TimelineKind = (typeof TIMELINE_KINDS)[number];

export interface TimelineItem {
    /** A month (2025-06) or, when only the year is known, a year (2026). */
    date: string;
    kind: TimelineKind;
    text: string;
    to?: string;
    /** A line under the entry, such as a project's tagline or a certificate's issuer. */
    note?: string;
}

export interface TimelineLabels {
    filter: string;
    all: string;
    kinds: Record<TimelineKind, string>;
    /** `{count}`: the entries left on screen, announced when the filter changes. */
    showing: string;
}
