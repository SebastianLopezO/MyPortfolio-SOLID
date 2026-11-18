import {createSignal, For, Show} from "solid-js";
import {forProfile, type RoleId} from "@/content/roles";
import {
    activityByYear,
    codingHours,
    COMMIT_AREAS_DAY,
    type CommitAreaId,
    commitAreas,
    dependabotReviews,
    githubStats,
    hours,
    STATS_DAY
} from "@/content/shared/github";
import {formatNumber, metricImages, metricValues} from "@/content/shared/metrics";
import {useSectionCopy} from "@/content/sections";
import {useContent, useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {Section} from "@/components/layout/Section";
import {ArrowRight} from "@/components/ui/icons";
import {SvgImage} from "@/components/ui/SvgImage";
import {formatDay} from "@/lib/format";
import {buildDetailPath} from "@/lib/paths";
import {cn} from "@/lib/utils";
import {Link} from "@/routes/Router";
import type {MetricId} from "@/types/content";

const METRICS: MetricId[] = ["contributions", "commits", "activeDays", "streak", "pullRequests", "reviews", "repos", "organizations"];

/** The commit areas each role view brightens; the rest stay in the bar, dimmed. */
const AREA_ROLES: Record<CommitAreaId, RoleId[]> = {
    landings: ["crm", "fullstack", "devops"],
    integrations: ["backend", "crm", "devops", "data"],
    smartpot: ["fullstack", "backend", "devops", "data"],
    coursework: ["data", "backend"],
    signatures: ["fullstack", "backend"],
    other: [],
};

const AREA_COLORS: Record<CommitAreaId, string> = {
    landings: "bg-chart-1",
    integrations: "bg-chart-2",
    smartpot: "bg-chart-3",
    coursework: "bg-chart-4",
    signatures: "bg-chart-5",
    other: "bg-chart-6",
};

/** The same language under GitHub's name and WakaTime's. */
const LANGUAGES = [
    {name: "Python", commits: "Python", hours: "Python"},
    {name: "TypeScript", commits: "TypeScript", hours: "TypeScript"},
    {name: "Java", commits: "Java", hours: "Java"},
    {name: "JavaScript", commits: "JavaScript", hours: "JavaScript"},
    {name: "Jupyter", commits: "Jupyter Notebook", hours: "Jupyter"},
    {name: "HTML", commits: "HTML", hours: "HTML"},
    {name: "Shell", commits: "Shell", hours: "Bash"},
].map(({name, commits, hours: hoursName}) => ({
    name,
    commits: githubStats.languagesByCommits.find((language) => language.name === commits)?.share ?? 0,
    hours: ((githubStats.wakatime.languages.find((language) => language.name === hoursName)?.seconds ?? 0) / githubStats.wakatime.totalSeconds) * 100,
}));

const areaTotals = commitAreas.reduce((total, area) => ({
    commits: total.commits + area.commits,
    repositories: total.repositories + area.repositories
}), {commits: 0, repositories: 0});
const maxYear = Math.max(...activityByYear.map((year) => year.contributions));
const maxWeekday = Math.max(...githubStats.weekdays);
const editorSeconds = githubStats.wakatime.editors.reduce((total, editor) => total + editor.seconds, 0);

const fill = (template: string, values: Record<string, string>) => template.replace(/\{(\w+)}/g, (match, key: string) => values[key] ?? match);

const percent = (value: number, locale: string) =>
    new Intl.NumberFormat(locale.replace("_", "-"), {
        style: "percent",
        maximumFractionDigits: value < 10 ? 1 : 0
    }).format(value / 100);

/** The headline figures, each counting up the first time the reader reaches it (lib/count-up.ts). */
function Figures() {
    const {locale} = useContent();
    const metrics = useSectionCopy("metrics");
    return (
        <dl class="enter-each grid grid-cols-2 gap-x-6 sm:gap-x-8 lg:grid-cols-4">
            <For each={METRICS}>{(id) => (
                <div class="flex flex-col-reverse justify-end gap-1 border-t border-border py-5">
                    <dt class="text-sm text-fg-muted">{metrics.labels[id]}</dt>
                    <dd data-count="true"
                        class="font-display text-4xl text-primary tabular-nums">{formatNumber(metricValues[id], locale)}</dd>
                </div>
            )}</For>
        </dl>
    );
}

/**
 * The home keeps the figures and leads to the metrics page, where the areas, the years, the habits and the charts
 * explain them (MetricsContent).
 */
export function MetricsSection() {
    const {lang, content: {locale}} = useLanguage();
    const metrics = useSectionCopy("metrics");
    const {role, locked} = useRole();
    return (
        <Section id="metrics" title={metrics.title} subtitle={forProfile(metrics.subtitle, role())}>
            <Figures/>
            <p class="mt-4 font-mono text-xs text-fg-subtle">{fill(metrics.asOf, {date: formatDay(STATS_DAY, locale)})}</p>
            <Link
                to={buildDetailPath(lang, "metrics", {locked: locked()})}
                class="mt-6 inline-flex min-h-10 items-center gap-2 rounded-md border border-border-strong px-4 text-sm font-semibold text-fg hover:border-primary hover:text-primary"
            >
                {metrics.pageLink}
                <ArrowRight class="size-4"/>
            </Link>
        </Section>
    );
}

/** Every figure with what it tells: where the commits went, the years, the habits and the charts. The metrics page. */
export function MetricsContent() {
    const {locale} = useContent();
    const metrics = useSectionCopy("metrics");
    const {role} = useRole();
    const [loaded, setLoaded] = createSignal(false);
    const number = (value: number) => formatNumber(value, locale);
    const muted = (area: CommitAreaId) => {
        const current = role();
        return current !== null && !AREA_ROLES[area].includes(current);
    };

    return (
        <>
            <p class="max-w-3xl text-lg text-fg-muted">{forProfile(metrics.intro, role())}</p>
            <p class="mt-3 mb-6 font-mono text-xs text-fg-subtle">{fill(metrics.asOf, {date: formatDay(STATS_DAY, locale)})}</p>

            <Figures/>

            <div class="enter-each mt-10 grid gap-6 lg:grid-cols-2">
                <section aria-labelledby="metrics-areas" class="rounded-lg border border-border bg-surface p-6">
                    <h3 id="metrics-areas" class="font-semibold text-fg">{metrics.areas.title}</h3>
                    <p class="mt-1 text-sm text-fg-subtle">
                        {fill(metrics.areas.note, {
                            date: formatDay(COMMIT_AREAS_DAY, locale),
                            commits: number(areaTotals.commits),
                            repositories: number(areaTotals.repositories),
                        })}
                    </p>
                    <div aria-hidden="true" class="mt-5 flex h-3 overflow-hidden rounded-full bg-surface-raised">
                        <For each={commitAreas}>{(area) => (
                            <span
                                class={cn("h-full", AREA_COLORS[area.id], muted(area.id) && "opacity-40")}
                                style={{width: `${(area.commits / areaTotals.commits) * 100}%`}}
                            />
                        )}</For>
                    </div>
                    <ul class="mt-5 space-y-4">
                        <For each={commitAreas}>{(area) => {
                            const copy = metrics.areas.items[area.id];
                            return (
                                // Areas outside the role view only lose their color swatch's strength, never text contrast.
                                <li class="grid grid-cols-[0.75rem_1fr] gap-3">
                                    <span aria-hidden="true"
                                          class={cn("mt-1.5 size-3 rounded-sm", AREA_COLORS[area.id], muted(area.id) && "opacity-40")}/>
                                    <div>
                                        <p class="flex flex-wrap items-baseline justify-between gap-x-3">
                                            <span
                                                class={cn("font-semibold", muted(area.id) ? "text-fg-muted" : "text-fg")}>{copy.name}</span>
                                            <span class="font-mono text-xs text-fg-subtle">
                                                {number(area.commits)} {metrics.areas.commits} · {number(area.repositories)} {metrics.areas.repositories}
                                            </span>
                                        </p>
                                        <p class="mt-0.5 text-sm text-fg-muted">{copy.detail}</p>
                                    </div>
                                </li>
                            );
                        }}</For>
                    </ul>
                </section>

                <section aria-labelledby="metrics-languages" class="rounded-lg border border-border bg-surface p-6">
                    <h3 id="metrics-languages" class="font-semibold text-fg">{metrics.languages.title}</h3>
                    <p class="mt-1 text-sm text-fg-subtle">{fill(metrics.languages.note, {hours: number(codingHours)})}</p>
                    <p class="mt-4 flex gap-5 text-xs text-fg-muted">
                        <span class="inline-flex items-center gap-2"><span aria-hidden="true"
                                                                           class="h-2 w-5 rounded-full bg-primary"/>{metrics.languages.byCommits}</span>
                        <span class="inline-flex items-center gap-2"><span aria-hidden="true"
                                                                           class="h-2 w-5 rounded-full bg-chart-3"/>{metrics.languages.byHours}</span>
                    </p>
                    <ul class="mt-4 space-y-3.5">
                        <For each={LANGUAGES}>{(language) => (
                            <li class="grid grid-cols-[6rem_1fr] items-center gap-3 text-sm">
                                <span translate="no" class="font-mono text-fg-muted">{language.name}</span>
                                <div class="space-y-1.5">
                                    <For
                                        each={[["commits", language.commits, "bg-primary"], ["hours", language.hours, "bg-chart-3"]] as const}>{([kind, value, color]) => (
                                        <div class="grid grid-cols-[1fr_3.25rem] items-center gap-2">
                                            <span aria-hidden="true"
                                                  class="h-2 overflow-hidden rounded-full bg-surface-raised">
                                                <span class={cn("block h-full rounded-full", color)}
                                                      style={{width: `${Math.max(value, 0.5)}%`}}/>
                                            </span>
                                            <span class="text-right font-mono text-xs text-fg-subtle">
                                                <span
                                                    class="sr-only">{kind === "commits" ? metrics.languages.byCommits : metrics.languages.byHours}: </span>
                                                {percent(value, locale)}
                                            </span>
                                        </div>
                                    )}</For>
                                </div>
                            </li>
                        )}</For>
                    </ul>
                    <p class="mt-5 border-t border-border pt-4 text-sm text-fg-muted">{metrics.languages.why}</p>
                </section>
            </div>

            <section aria-labelledby="metrics-years" class="section-enter mt-6 rounded-lg border border-border bg-surface p-6">
                <h3 id="metrics-years" class="font-semibold text-fg">{metrics.years.title}</h3>
                <p class="mt-1 text-sm text-fg-subtle">{metrics.years.note}</p>
                {/* Rows with horizontal bars on phones and tablets; from 64rem, one column per year. */}
                <ol class="mt-6 grid gap-4 lg:grid-cols-5 lg:gap-x-4">
                    <For each={activityByYear}>{(year) => {
                        const share = Math.max((year.contributions / maxYear) * 100, 1.5);
                        return (
                            <li
                                class="grid grid-cols-[3.25rem_1fr] items-center gap-x-3 lg:flex lg:flex-col lg:items-stretch">
                                <div aria-hidden="true"
                                     class="hidden h-28 items-end rounded-md bg-surface-raised lg:flex">
                                    <span class="w-full rounded-md bg-linear-to-t from-primary to-accent"
                                          style={{height: `${share}%`}}/>
                                </div>
                                <p class="font-mono text-sm text-fg lg:mt-2">{year.year}</p>
                                <div class="min-w-0">
                                    <div aria-hidden="true"
                                         class="h-2.5 overflow-hidden rounded-full bg-surface-raised lg:hidden">
                                        <span
                                            class="block h-full rounded-full bg-linear-to-r from-primary to-accent"
                                            style={{width: `${share}%`}}/>
                                    </div>
                                    <p class="mt-1 flex flex-wrap items-baseline gap-x-2 lg:mt-0 lg:block">
                                        <span
                                            class="font-display text-2xl text-primary">{number(year.contributions)}</span>
                                        <span class="block text-xs text-fg-subtle">
                                            {fill(metrics.years.activeDays, {
                                                active: number(year.activeDays),
                                                days: number(year.days)
                                            })}
                                            {year.partial && ` · ${fill(metrics.years.partial, {date: formatDay(STATS_DAY, locale, {year: false})})}`}
                                        </span>
                                    </p>
                                    <div aria-hidden="true"
                                         class="mt-1.5 h-1 overflow-hidden rounded-full bg-surface-raised">
                                        <span class="block h-full rounded-full bg-fg-subtle"
                                              style={{width: `${(year.activeDays / year.days) * 100}%`}}/>
                                    </div>
                                </div>
                            </li>
                        );
                    }}</For>
                </ol>
            </section>

            <div class="enter-each mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                <section aria-labelledby="metrics-weekdays" class="rounded-lg border border-border bg-surface p-6">
                    <h3 id="metrics-weekdays" class="font-semibold text-fg">{metrics.habits.weekdaysTitle}</h3>
                    <ol class="mt-5 grid grid-cols-7 gap-2">
                        <For each={githubStats.weekdays}>{(count, index) => (
                            <li class="flex flex-col items-center gap-1.5">
                                <div aria-hidden="true" class="flex h-24 w-full items-end rounded bg-surface-raised">
                                    <span
                                        class={cn("w-full rounded", count === maxWeekday ? "bg-primary" : "bg-primary/45")}
                                        style={{height: `${(count / maxWeekday) * 100}%`}}/>
                                </div>
                                <span class="text-xs text-fg-muted">{metrics.habits.weekdays[index()]}</span>
                                <span class="font-mono text-[0.6875rem] text-fg-subtle">{number(count)}</span>
                            </li>
                        )}</For>
                    </ol>
                </section>

                <section aria-labelledby="metrics-editors" class="rounded-lg border border-border bg-surface p-6">
                    <h3 id="metrics-editors" class="font-semibold text-fg">{metrics.habits.editorsTitle}</h3>
                    <ul class="mt-5 space-y-3">
                        <For each={githubStats.wakatime.editors}>{(editor) => (
                            <li
                                class="grid grid-cols-[7.5rem_1fr_3rem] items-center gap-3 text-sm">
                                <span translate="no" class="truncate font-mono text-fg-muted">{editor.name}</span>
                                <span aria-hidden="true" class="h-2 overflow-hidden rounded-full bg-surface-raised">
                                    <span class="block h-full rounded-full bg-linear-to-r from-primary to-accent"
                                          style={{width: `${(editor.seconds / editorSeconds) * 100}%`}}/>
                                </span>
                                <span
                                    class="text-right font-mono text-xs text-fg-subtle">{number(hours(editor.seconds))} h</span>
                            </li>
                        )}</For>
                    </ul>
                </section>

                <section
                    class="space-y-4 rounded-lg border border-border bg-surface p-6 text-sm text-fg-muted md:col-span-2 xl:col-span-1">
                    <p>
                        {fill(metrics.habits.repositories, {
                            contributed: number(githubStats.repositories.contributedTo),
                            private: number(githubStats.repositories.private),
                        })}
                    </p>
                    <p>{fill(metrics.habits.reviews, {
                        reviews: number(githubStats.totals.reviews),
                        dependabot: number(dependabotReviews)
                    })}</p>
                    <p>{fill(metrics.habits.more, {
                        created: number(githubStats.totals.repositoriesCreated),
                        issues: number(githubStats.totals.issues)
                    })}</p>
                </section>
            </div>

            <Show when={loaded()} fallback={
                <button
                    type="button"
                    onClick={() => setLoaded(true)}
                    class="mt-8 inline-flex min-h-10 items-center rounded-md border border-border-strong px-4 text-sm font-semibold text-fg hover:border-primary hover:text-primary"
                >
                    {metrics.load}
                </button>
            }>
                <div class="mt-10">
                    <h3 class="font-semibold text-fg">{metrics.imagesTitle}</h3>
                    <ul class="mt-5 grid gap-5 md:grid-cols-2">
                        <For each={metricImages}>{({wide, ...image}) => (
                            <li
                                class={cn("rounded-lg border border-border bg-surface p-3", wide && "md:col-span-2")}>
                                <SvgImage {...image} label={metrics.imageAlts[image.id]} class="mx-auto"/>
                            </li>
                        )}</For>
                    </ul>
                </div>
            </Show>
        </>
    );
}
