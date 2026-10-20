import type {HighlightId, MetricId, MetricImageId} from "@/types/content";
import {
    organizations as organizationCount,
    repositories,
    streaks,
    totals,
    wakatime
} from "@/content/shared/github-stats.json";
import {EXPERIENCE_YEARS} from "@/content/shared/profile";
import {CERTIFICATION_COUNT, RECOMMENDATION_COUNT} from "@/content/shared/counts";

const PROFILE_REPO = "https://raw.githubusercontent.com/SebastianLopezO/SebastianLopezO/main";
const ACCOUNT_METRICS = `${PROFILE_REPO}/metrics/account`;
// Cards the profile repository regenerates every day with GitHub Actions.
const PROFILE_CARDS = `${PROFILE_REPO}/profile`;

/** Counts since the account opened in February 2022, from the profile repository's stats (content/shared/github.ts). */
export const metricValues: Record<MetricId, number> = {
    contributions: totals.contributions,
    commits: totals.commits,
    activeDays: totals.activeDays,
    streak: streaks.current.days,
    pullRequests: totals.pullRequests,
    reviews: totals.reviews,
    repos: repositories.contributedTo,
    organizations: organizationCount.member,
};

export const metricImages: { id: MetricImageId; src: string; width: number; height: number; wide?: boolean }[] = [
    {id: "streak", src: `${PROFILE_CARDS}/streak.svg`, width: 495, height: 195},
    {id: "stats", src: `${PROFILE_CARDS}/stats.svg`, width: 467, height: 195},
    {id: "activity", src: `${PROFILE_CARDS}/activity-graph.svg`, width: 1200, height: 420, wide: true},
    {id: "wakatime", src: `${PROFILE_CARDS}/wakatime.svg`, width: 495, height: 665},
    {id: "topLangs", src: `${PROFILE_CARDS}/top-langs.svg`, width: 300, height: 450},
    {id: "account", src: `${ACCOUNT_METRICS}/github-metrics.svg`, width: 480, height: 367},
    {id: "calendar", src: `${ACCOUNT_METRICS}/metrics.isocalendar.svg`, width: 480, height: 330},
    {id: "languages", src: `${ACCOUNT_METRICS}/metrics.languages.details.svg`, width: 480, height: 161},
    {id: "followup", src: `${ACCOUNT_METRICS}/metrics.followup.svg`, width: 480, height: 326},
];

export interface HighlightValue {
    value: number;
    /** Shown as "N+" because the real figure keeps growing past it. */
    atLeast?: boolean;
    unit?: "%";
}

export const highlightValues: Record<HighlightId, HighlightValue> = {
    years: {value: EXPERIENCE_YEARS, atLeast: true},
    integrations: {value: 20, atLeast: true},
    clients: {value: 15, atLeast: true},
    landingPages: {value: 100, atLeast: true},
    commits: {value: totals.commits},
    contributions: {value: totals.contributions},
    prsReviewed: {value: totals.reviews},
    streak: {value: streaks.current.days, atLeast: true},
    certifications: {value: CERTIFICATION_COUNT},
    organizations: {value: organizationCount.member},
    repositories: {value: repositories.contributedTo},
    recommendations: {value: RECOMMENDATION_COUNT},
    codingHours: {value: Math.round(wakatime.totalSeconds / 3600)},
    // 2,273 of the 2,446 non-merge commits made by people across the 11 SmartPotTech repositories (GitHub API, 2026-10-14).
    smartpotCommits: {value: 93, unit: "%"},
    // @Test methods in SmartPot-API (2026-10-14).
    apiTests: {value: 139},
    // Blackbox probes and Grafana alert rules in the TIVENOS observability repository (2026-10-14).
    probes: {value: 18},
    alertRules: {value: 12},
    // Zoho CRM widget repositories in the TIVENOS organization, every commit Sebastián's (2026-10-15).
    widgets: {value: 5},
    // Admissions, scholarship and lead-form repositories in the TIVENOS organization with at least 7 commits of his,
    // without the proof of concept; four more hold a single upload each (2026-10-15).
    forms: {value: 8, atLeast: true},
};

/** Formats a number with the grouping of the page's locale, such as 18,581 in English and 18.581 in Spanish. */
export const formatNumber = (value: number, locale: string) => new Intl.NumberFormat(locale.replace("_", "-")).format(value);

export const formatHighlight = ({value, atLeast, unit}: HighlightValue, locale: string) =>
    `${formatNumber(value, locale)}${atLeast ? "+" : ""}${unit ? (locale.startsWith("es") ? ` ${unit}` : unit) : ""}`;
