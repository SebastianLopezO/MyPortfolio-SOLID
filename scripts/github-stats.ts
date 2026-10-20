import {readFile, writeFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import {z} from "zod";

/**
 * The profile repository regenerates metrics/stats.json every day with the owner's token, so private contributions
 * count. The portfolio keeps a trimmed copy in src/content/shared/github-stats.json: `pnpm metrics` refreshes it, and
 * CI builds (and the Docker image) refresh it before building, so every deploy shows the latest figures.
 */
export const STATS_URL = "https://raw.githubusercontent.com/SebastianLopezO/SebastianLopezO/main/metrics/stats.json";
export const SNAPSHOT = fileURLToPath(new URL("../src/content/shared/github-stats.json", import.meta.url));

const count = z.number().int().nonnegative();
const day = z.iso.date();
const span = z.object({days: count, from: day, to: day});
const duration = z.object({name: z.string().min(1), seconds: z.number().nonnegative()});

/**
 * The parts of the profile repository's stats.json the portfolio reads, in the order the snapshot keeps them. The
 * file comes from another repository, so a renamed, missing or mistyped field fails the refresh and the committed
 * snapshot stays, instead of the site showing NaN. Keys not listed here are dropped.
 */
const RawStats = z.object({
    generatedAt: z.iso.datetime(),
    github: z.object({
        since: day,
        totals: z.object({
            contributions: count,
            commits: count.min(1),
            pullRequests: count,
            reviews: count,
            issues: count,
            repositoriesCreated: count,
            activeDays: count,
            days: count,
        }),
        years: z.array(z.object({
            year: z.number().int().min(2000),
            contributions: count,
            commits: count,
            pullRequests: count,
            reviews: count,
            activeDays: count,
            days: count,
        })).min(1),
        streaks: z.object({longest: span, current: span}),
        bestDay: z.object({date: day, contributions: count}),
        weekdays: z.array(count).length(7),
        repositories: z.object({owned: count, contributedTo: count, private: count}),
        organizations: z.object({member: count, contributedTo: count}),
        languagesByCommits: z.array(z.object({
            name: z.string().min(1),
            commits: count,
            share: z.number().min(0).max(100)
        })),
    }),
    wakatime: z.object({
        totalSeconds: z.number().positive(),
        languages: z.array(duration),
        editors: z.array(duration).default([]),
    }),
});

export function trimStats(raw: unknown) {
    const {generatedAt, github, wakatime} = RawStats.parse(raw);
    return {generatedAt, ...github, wakatime};
}

/** Downloads the latest figures; on any failure the committed snapshot stays as it is. */
export async function refreshGithubStats({timeout = 8000} = {}) {
    try {
        const response = await fetch(STATS_URL, {signal: AbortSignal.timeout(timeout)});
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const next = trimStats(await response.json());
        const current = JSON.parse(await readFile(SNAPSHOT, "utf8"));
        if (next.generatedAt < current.generatedAt) throw new Error(`remote stats (${next.generatedAt}) are older than the snapshot`);
        await writeFile(SNAPSHOT, `${JSON.stringify(next, null, 2)}\n`);
        console.log(`GitHub stats from ${next.generatedAt}`);
    } catch (error) {
        const reason = error instanceof z.ZodError ? z.prettifyError(error) : (error as Error).message;
        console.warn(`Keeping the committed GitHub stats: ${reason}`);
    }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) await refreshGithubStats();
