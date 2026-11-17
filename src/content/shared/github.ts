import stats from "@/content/shared/github-stats.json";
import type {YearMonth} from "@/types/content";

/**
 * GitHub and WakaTime figures from the profile repository's metrics/stats.json, rendered every day with the owner's
 * token, so private contributions count. `pnpm metrics` refreshes the snapshot and CI builds refresh it before
 * building (scripts/github-stats.ts).
 */
export const githubStats = stats;

/** The day the figures were read, such as 2026-10-15. */
export const STATS_DAY = stats.generatedAt.slice(0, 10);

export const STATS_MONTH = STATS_DAY.slice(0, 7) as YearMonth;

export const hours = (seconds: number) => Math.round(seconds / 3600);

export const codingHours = hours(stats.wakatime.totalSeconds);

/** Days with at least one contribution in each year; the current year counts up to the day of the figures. */
export const activityByYear = stats.years.map(({year, contributions, activeDays, days}) => ({
    year,
    contributions,
    activeDays,
    partial: year === Number(STATS_DAY.slice(0, 4)),
    days,
}));

export const streak = stats.streaks.current;

export type CommitAreaId = "landings" | "integrations" | "smartpot" | "coursework" | "signatures" | "other";

/**
 * Commits on the default branch of every repository Sebastián can see, by area, counted with the GitHub REST API
 * (`author=SebastianLopezO`) on 2026-10-15: 21,731 commits in the 269 repositories with at least one of his. GitHub's
 * contribution count is higher, although it also counts only default branches. docs/content.md lists which
 * repositories fall in each area; client names stay out of the bundle.
 */
export const commitAreas: { id: CommitAreaId; commits: number; repositories: number }[] = [
    {id: "landings", commits: 8898, repositories: 106},
    {id: "integrations", commits: 4047, repositories: 23},
    {id: "smartpot", commits: 2629, repositories: 11},
    {id: "coursework", commits: 1663, repositories: 37},
    {id: "signatures", commits: 904, repositories: 1},
    {id: "other", commits: 3590, repositories: 91},
];

export const COMMIT_AREAS_DAY = "2026-10-15";

/** Of the 569 pull requests he reviewed, 561 were dependency updates opened by Dependabot (GitHub search, 2026-11-17). */
export const dependabotReviews = 561;
