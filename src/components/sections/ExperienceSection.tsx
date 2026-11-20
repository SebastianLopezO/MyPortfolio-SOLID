import {createMemo, createSignal, For, onCleanup, onMount, Show} from "solid-js";
import {ArrowRight, ChevronDown} from "@/components/ui/icons";
import {forProfile, type RoleId} from "@/content/roles";
import {EXPERIENCE_SLUG} from "@/content/shared/detail-links";
import {EXPERIENCE_PROJECTS, PROJECT_SLUG} from "@/content/shared/project-links";
import {experience} from "@/content/shared/experience";
import {PROJECT_ART} from "@/content/shared/project-art";
import {useSectionCopy} from "@/content/sections";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {Section} from "@/components/layout/Section";
import {formatDuration, formatRange, monthsBetween} from "@/lib/format";
import {buildDetailPath, buildProjectPath} from "@/lib/paths";
import {More} from "@/components/ui/More";
import {TechList} from "@/components/ui/TechList";
import {useHydrated} from "@/hooks/useHydrated";
import {withBase} from "@/lib/base";
import {setAll, watch} from "@/lib/disclosures";
import {countMatches, orderExperience, prioritize, split} from "@/lib/role-view";
import {cn} from "@/lib/utils";
import {Link} from "@/routes/Router";
import type {Bullet, ExperienceFacts} from "@/types/content";

// In a role view a job shows up to three achievements that match it; the rest, and all of them otherwise, open on demand.
const MAX_RELEVANT_BULLETS = 3;

function BulletItem(props: { bullet: Bullet; role: RoleId | null }) {
    const match = () => props.role !== null && props.bullet.roles.includes(props.role);
    return (
        <li class={cn("flex gap-3", match() && "text-fg")}>
            <span aria-hidden="true"
                  class={cn("mt-2.5 size-1.5 shrink-0 rounded-full", props.role && !match() ? "border border-fg-subtle" : "bg-fg")}
            />
            {props.bullet.text}
        </li>
    );
}

function ExperienceItem(props: { facts: ExperienceFacts; role: RoleId | null }) {
    const {lang, content: {ui}} = useLanguage();
    const copy = useSectionCopy("experience");
    const {locked} = useRole();
    const projectCopy = useSectionCopy("projects");
    const related = () => EXPERIENCE_PROJECTS[props.facts.id] ?? [];
    const item = () => copy.items[props.facts.id];
    const matches = () => countMatches(item().bullets, props.role);
    // In a role view the achievements that match it lead, and the first of them stay in view; the rest fold away.
    const bullets = createMemo(() => {
        const ordered = prioritize(item().bullets, (bullet) => bullet.roles, props.role);
        return split(ordered, props.role ? Math.min(matches(), MAX_RELEVANT_BULLETS) : 0);
    });
    const meta = () => [ui.workMode[props.facts.workMode], props.facts.employment && ui.employment[props.facts.employment]].filter(Boolean).join(" · ");
    const detail = () => buildDetailPath(lang, "experience", {slug: EXPERIENCE_SLUG[props.facts.id], locked: locked()});

    return (
        // One job is one row of the index: its dates, its title and company with a sentence, and what it is now. Its
        // achievements, stack and projects open in place; its page tells the whole story.
        <li class="timeline-card grid gap-x-10 gap-y-3 border-t border-border py-8 md:grid-cols-[11rem_minmax(0,1fr)] md:py-10">
            <div class="font-mono text-xs leading-relaxed text-fg-subtle">
                <p>{formatRange(props.facts.start, props.facts.end, ui.months, ui.present)}</p>
                <p>{formatDuration(monthsBetween(props.facts.start, props.facts.end), lang)}</p>
            </div>
            <div class="min-w-0">
                <div class="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                    <div>
                        <h3 class="text-title text-fg">
                            <Link to={detail()} class="hover:text-fg-muted">{item().title}</Link>
                        </h3>
                        <p class="mt-1 text-fg-muted">
                            {props.facts.company}
                            <span class="text-fg-subtle"> · {props.facts.location} · {meta()}</span>
                        </p>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <Show when={props.role && matches() > 0}>
                            <span class="rounded-full bg-surface-raised px-3 py-1 font-mono text-xs text-fg">
                                {copy.matches.replace("{count}", String(matches())).replace("{total}", String(item().bullets.length))}
                            </span>
                        </Show>
                        <Show when={props.facts.end === null}>
                            <span
                                class="inline-flex items-center gap-1.5 rounded-full bg-surface-raised px-3 py-1 font-mono text-xs text-fg">
                                <span aria-hidden="true" class="size-1.5 rounded-full bg-success"/>
                                {copy.current}
                            </span>
                        </Show>
                    </div>
                </div>
                <p class="mt-4 max-w-3xl text-fg-muted">{forProfile(item().summary, props.role)}</p>

                <Show when={bullets().visible.length > 0}>
                    <ul class="mt-4 max-w-3xl space-y-2 text-fg-muted">
                        <For each={bullets().visible}>{(bullet) => <BulletItem bullet={bullet}
                                                                               role={props.role}/>}</For>
                    </ul>
                </Show>

                <More class="mt-3" label={`${ui.actions.showMore} (${bullets().hidden.length})`}
                      openLabel={ui.actions.showLess}>
                    <div class="mt-4 grid gap-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
                        <ul class="space-y-2 text-fg-muted">
                            <For each={bullets().hidden}>{(bullet) => <BulletItem bullet={bullet}
                                                                                  role={props.role}/>}</For>
                        </ul>
                        {/* The first ten tools, the role view's first; the job's page lists them all. */}
                        <TechList tech={props.facts.tech} role={props.role} limit={10} class="content-start"/>
                    </div>
                </More>

                <Show when={related().length > 0}>
                    <div class="mt-5">
                        <p class="text-sm text-fg-subtle">{copy.projects}</p>
                        <ul class="mt-2 flex flex-wrap gap-2">
                            <For each={related()}>
                                {(id) => (
                                    <li>
                                        <Link
                                            to={buildProjectPath(lang, {slug: PROJECT_SLUG[id], locked: locked()})}
                                            class="inline-flex min-h-11 items-center gap-2.5 rounded-full border border-border py-1 pr-4 pl-1 text-sm text-fg transition-colors hover:border-border-strong hover:bg-surface"
                                        >
                                            <span class="grid size-9 shrink-0 place-items-center rounded-full"
                                                  style={{background: `var(--color-tile-${PROJECT_ART[id].tile})`}}>
                                                <img src={withBase(PROJECT_ART[id].file)} alt="" width={32} height={32}
                                                     loading="lazy" decoding="async" class="size-8"/>
                                            </span>
                                            {projectCopy.items[id].name}
                                        </Link>
                                    </li>
                                )}
                            </For>
                        </ul>
                    </div>
                </Show>

                {/* Titles, timeline, every achievement and the recommendations of this job live on its own page. */}
                <Link
                    to={detail()}
                    class="mt-4 inline-flex min-h-10 items-center gap-1.5 rounded-full bg-surface-raised px-4 text-sm font-semibold text-fg transition-colors hover:bg-border"
                >
                    {copy.detail}
                    <ArrowRight class="size-4"/>
                </Link>
            </div>
        </li>
    );
}

export function ExperienceSection() {
    const {ui} = useLanguage().content;
    const copy = useSectionCopy("experience");
    const {role} = useRole();
    const jobs = createMemo(() => orderExperience(experience, (job) => copy.items[job.id].bullets, role()));
    const interactive = useHydrated();
    const [everything, setEverything] = createSignal(false);
    let list: HTMLOListElement | undefined;
    onMount(() => onCleanup(watch(list!, setEverything)));

    return (
        <Section id="experience" title={copy.title} subtitle={forProfile(copy.subtitle, role())}>
            <Show when={role()}>
                {(current) => (
                    <p class="-mt-4 mb-8 max-w-3xl text-sm text-fg-subtle">
                        {copy.relevanceNote.replace("{role}", ui.roleNames[current()])}
                    </p>
                )}
            </Show>
            {/* For a reader who wants every achievement at once; it only appears once the page can open them. */}
            <Show when={interactive()}>
                <div class="-mt-4 mb-6 flex justify-end">
                    <button
                        type="button"
                        aria-controls="experience-jobs"
                        onClick={() => setAll(list!, !everything())}
                        class="inline-flex min-h-10 items-center gap-2 rounded-full border border-border-strong px-4 text-sm font-semibold text-fg transition-colors hover:bg-surface-raised active:translate-y-px"
                    >
                        {everything() ? ui.actions.collapseAll : ui.actions.expandAll}
                        <ChevronDown
                            class={cn("size-4 motion-safe:transition-transform motion-safe:duration-400", everything() && "rotate-180")}/>
                    </button>
                </div>
            </Show>
            <ol ref={list} id="experience-jobs" class="enter-each border-b border-border">
                <For each={jobs()}>{(facts) => <ExperienceItem facts={facts} role={role()}/>}</For>
            </ol>
        </Section>
    );
}
