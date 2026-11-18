import {createMemo, createSignal, For, onCleanup, onMount, Show} from "solid-js";
import {ArrowRight, Briefcase, ChevronDown, MapPin} from "@/components/ui/icons";
import {forProfile, type RoleId} from "@/content/roles";
import {EXPERIENCE_SLUG} from "@/content/shared/detail-links";
import {EXPERIENCE_PROJECTS, PROJECT_SLUG} from "@/content/shared/project-links";
import {experience} from "@/content/shared/experience";
import {useSectionCopy} from "@/content/sections";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {Section} from "@/components/layout/Section";
import {formatDuration, formatRange, monthsBetween} from "@/lib/format";
import {buildDetailPath, buildProjectPath} from "@/lib/paths";
import {More} from "@/components/ui/More";
import {TechList} from "@/components/ui/TechList";
import {useHydrated} from "@/hooks/useHydrated";
import {setAll, watch} from "@/lib/disclosures";
import {countMatches, orderExperience, prioritize, split} from "@/lib/role-view";
import {cn} from "@/lib/utils";
import {Link} from "@/routes/Router";
import type {Bullet, ExperienceFacts} from "@/types/content";

// A job shows its first two achievements, or up to three that match the role view; the rest open on demand.
const VISIBLE_BULLETS = 2;
const MAX_RELEVANT_BULLETS = 3;

function BulletItem(props: { bullet: Bullet; role: RoleId | null }) {
    const match = () => props.role !== null && props.bullet.roles.includes(props.role);
    return (
        <li class={cn("flex gap-3", match() && "text-fg")}>
            <span aria-hidden="true"
                  class={cn("mt-2.5 size-1.5 shrink-0 rounded-full", props.role && !match() ? "border border-fg-subtle" : "bg-primary")}
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
    const bullets = createMemo(() => {
        const ordered = prioritize(item().bullets, (bullet) => bullet.roles, props.role);
        return split(ordered, props.role ? Math.min(matches(), MAX_RELEVANT_BULLETS) : VISIBLE_BULLETS);
    });
    const meta = () => [ui.workMode[props.facts.workMode], props.facts.employment && ui.employment[props.facts.employment]].filter(Boolean).join(" · ");

    return (
        <li class="timeline-card relative rounded-lg border border-border bg-surface p-6 shadow-card md:p-8">
            <span aria-hidden="true"
                  class="absolute top-9 -left-12 hidden size-4 rounded-full border-4 border-bg bg-primary lg:block"/>

            <div class="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <h3 class="text-title text-fg">{item().title}</h3>
                    <p class="mt-1 flex items-center gap-2 font-semibold text-primary">
                        <Briefcase class="size-4"/>
                        {props.facts.company}
                    </p>
                </div>
                <div class="flex flex-wrap gap-2">
                    <Show when={props.role && matches() > 0}>
                        <span
                            class="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                            {copy.matches.replace("{count}", String(matches())).replace("{total}", String(item().bullets.length))}
                        </span>
                    </Show>
                    <Show when={props.facts.end === null}>
                        <span
                            class="rounded-full border border-success/40 bg-success/10 px-3 py-1 text-xs font-semibold text-success">
                            {copy.current}
                        </span>
                    </Show>
                </div>
            </div>

            <p class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-fg-subtle">
                <span>
                    {formatRange(props.facts.start, props.facts.end, ui.months, ui.present)} · {formatDuration(monthsBetween(props.facts.start, props.facts.end), lang)}
                </span>
                <span class="inline-flex items-center gap-1">
                    <MapPin class="size-3.5"/>
                    {props.facts.location} · {meta()}
                </span>
            </p>

            {/* Wide screens put the achievements in a column of their own; the DOM keeps the order phones read. */}
            <div
                class="lg:mt-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:grid-rows-[auto_auto_1fr] lg:gap-x-12">
                <p class="mt-4 text-fg-muted lg:col-start-1 lg:row-start-1 lg:mt-0">{forProfile(item().summary, props.role)}</p>

                <Show when={bullets().visible.length + bullets().hidden.length > 0}>
                    <div class="lg:col-start-2 lg:row-span-3 lg:row-start-1">
                        <Show when={bullets().visible.length > 0}>
                            <ul class="mt-4 space-y-2 text-fg-muted lg:mt-0">
                                <For each={bullets().visible}>{(bullet) => <BulletItem bullet={bullet}
                                                                                       role={props.role}/>}</For>
                            </ul>
                        </Show>
                        <Show when={bullets().hidden.length > 0}>
                            <More class="mt-2" label={`${ui.actions.showMore} (${bullets().hidden.length})`}
                                  openLabel={ui.actions.showLess}>
                                <ul class="mt-2 space-y-2 text-fg-muted">
                                    <For each={bullets().hidden}>{(bullet) => <BulletItem bullet={bullet}
                                                                                          role={props.role}/>}</For>
                                </ul>
                            </More>
                        </Show>
                    </div>
                </Show>

                {/* The first ten tools, the role view's first; the job's page lists them all. */}
                <TechList tech={props.facts.tech} role={props.role} limit={10}
                          class="mt-5 lg:col-start-1 lg:row-start-2 lg:self-start"/>

                <div class="mt-4 text-sm lg:col-start-1 lg:row-start-3 lg:self-start">
                    <Show when={related().length > 0}>
                        <p class="text-fg-subtle">{copy.projects}</p>
                        <ul class="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                            <For each={related()}>
                                {(id) => (
                                    <li>
                                        <Link
                                            to={buildProjectPath(lang, {
                                                slug: PROJECT_SLUG[id],
                                                locked: locked()
                                            })}
                                            class="inline-flex min-h-9 items-center gap-1 font-semibold text-primary hover:text-primary-hover"
                                        >
                                            {projectCopy.items[id].name}
                                            <ArrowRight class="size-4"/>
                                        </Link>
                                    </li>
                                )}
                            </For>
                        </ul>
                    </Show>
                    {/* Titles, timeline, every achievement and the recommendations of this job live on its own page. */}
                    <Link
                        to={buildDetailPath(lang, "experience", {
                            slug: EXPERIENCE_SLUG[props.facts.id],
                            locked: locked()
                        })}
                        class="mt-2 inline-flex min-h-9 items-center gap-1.5 rounded-md border border-border-strong px-3 font-semibold text-fg hover:border-primary hover:text-primary"
                    >
                        {copy.detail}
                        <ArrowRight class="size-4"/>
                    </Link>
                </div>
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
                        {copy.relevanceNote.replace("{role}", ui.roleSwitcher.roles[current()])}
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
                        class="inline-flex min-h-10 items-center gap-2 rounded-md border border-border-strong px-4 text-sm font-semibold text-fg transition-colors hover:border-primary hover:text-primary active:translate-y-px"
                    >
                        {everything() ? ui.actions.collapseAll : ui.actions.expandAll}
                        <ChevronDown class={cn("size-4 motion-safe:transition-transform motion-safe:duration-400", everything() && "rotate-180")}/>
                    </button>
                </div>
            </Show>
            <ol ref={list} id="experience-jobs" class="timeline relative space-y-6 lg:space-y-8 lg:pl-12">
                <For each={jobs()}>{(facts) => <ExperienceItem facts={facts} role={role()}/>}</For>
            </ol>
        </Section>
    );
}
