import {createComputed, createMemo, createSignal, For, on, Show} from "solid-js";
import {ArrowRight, ExternalLink, Lock} from "@/components/ui/icons";
import {GithubIcon} from "@/components/layout/BrandIcons";
import {forProfile, roleConfig} from "@/content/roles";
import {useSectionCopy} from "@/content/sections";
import {ORGANIZATION_SLUG} from "@/content/shared/detail-links";
import {organizations} from "@/content/shared/organizations";
import {isCaseStudy, PROJECT_SLUG} from "@/content/shared/project-links";
import {projectById, projectsIn} from "@/content/shared/projects";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {useHydrated} from "@/hooks/useHydrated";
import {Section} from "@/components/layout/Section";
import {ProjectTile} from "@/components/projects/ProjectTile";
import {buildDetailPath, buildProjectPath} from "@/lib/paths";
import {listProjects, prioritize} from "@/lib/role-view";
import {cn} from "@/lib/utils";
import {Link} from "@/routes/Router";
import {PROJECT_CATEGORIES, type ProjectCategory, type ProjectId} from "@/types/project";

/** The years a project ran, as a tile's corner shows them: 2024, 2022 – 2023 or 2024 –. */
export const projectYears = (id: ProjectId) => {
    const project = projectById(id);
    const start = project.start.slice(0, 4);
    if (project.end === null) return `${start} –`;
    const end = (project.end ?? project.start).slice(0, 4);
    return end === start ? start : `${start} – ${end}`;
};

export function ProjectsSection() {
    const {lang, content: {ui}} = useLanguage();
    const copy = useSectionCopy("projects");
    const {role, locked} = useRole();
    const config = createMemo(() => roleConfig(role()));
    const interactive = useHydrated();
    const [category, setCategory] = createSignal<ProjectCategory>(config().projectCategory);
    const tabs: Partial<Record<ProjectCategory, HTMLButtonElement>> = {};

    // A role switch happens without a reload, so the tabs open on the new role's category.
    createComputed(on(config, (current) => setCategory(current.projectCategory), {defer: true}));

    const hrefOf = (id: ProjectId) => buildProjectPath(lang, {slug: PROJECT_SLUG[id], locked: locked()});
    // The featured project already opens the section, so its category lists the rest.
    const listed = createMemo(() => listProjects(projectsIn(category()), role()));

    const onTabKey = (event: KeyboardEvent) => {
        const index = PROJECT_CATEGORIES.indexOf(category());
        const next = {
            ArrowRight: index + 1,
            ArrowLeft: index - 1,
            Home: 0,
            End: PROJECT_CATEGORIES.length - 1
        }[event.key];
        if (next === undefined) return;
        event.preventDefault();
        const target = PROJECT_CATEGORIES[(next + PROJECT_CATEGORIES.length) % PROJECT_CATEGORIES.length];
        setCategory(target);
        tabs[target]?.focus();
    };

    return (
        <Section id="projects" title={copy.title} subtitle={forProfile(copy.subtitle, role())} layout="wide">
            {/* The role view's featured project spans the row: its illustration beside its name, a few words and one
                sentence. Like every tile, the whole of it leads to its page. */}
            <Show when={config().featuredProject} keyed>
                {(id) => (
                    <div data-featured="true" class="section-enter">
                        <ProjectTile
                            id={id}
                            name={copy.items[id].name}
                            brief={copy.items[id].brief}
                            summary={copy.items[id].summary}
                            tag={`${copy.featured} · ${projectYears(id)}`}
                            href={hrefOf(id)}
                            wide
                        />
                        <div class="mt-4 flex flex-wrap gap-2">
                            <Link to={hrefOf(id)}
                                  class="inline-flex min-h-10 items-center gap-2 rounded-full bg-primary px-4 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover">
                                {isCaseStudy(id) ? ui.actions.readCaseStudy : copy.readProject}
                                <ArrowRight class="size-4"/>
                            </Link>
                            <Show when={projectById(id).links.demo}>
                                {(demo) => (
                                    <a href={demo()} target="_blank" rel="noopener noreferrer"
                                       class="inline-flex min-h-10 items-center gap-2 rounded-full border border-border-strong px-4 text-sm font-semibold text-fg transition-colors hover:bg-surface-raised">
                                        {ui.actions.liveDemo}
                                        <ExternalLink class="size-4"/>
                                    </a>
                                )}
                            </Show>
                            <Show when={projectById(id).links.code}>
                                {(code) => (
                                    <a href={code()} target="_blank" rel="noopener noreferrer"
                                       class="inline-flex min-h-10 items-center gap-2 rounded-full border border-border-strong px-4 text-sm font-semibold text-fg transition-colors hover:bg-surface-raised">
                                        <GithubIcon class="size-4"/>
                                        {ui.actions.viewCode}
                                    </a>
                                )}
                            </Show>
                        </div>
                    </div>
                )}
            </Show>

            <div class="mt-14 md:mt-20">
                {/* The categories filter the tiles below; each is a tab, moved with the arrow keys. */}
                <div
                    role="tablist"
                    aria-label={copy.categoriesLabel}
                    data-interactive={interactive() || undefined}
                    onKeyDown={onTabKey}
                    class="flex flex-wrap gap-2"
                >
                    <For each={PROJECT_CATEGORIES}>{(id) => (
                        <button
                            ref={(element) => {
                                tabs[id] = element;
                            }}
                            type="button"
                            role="tab"
                            id={`projects-tab-${id}`}
                            aria-selected={category() === id}
                            aria-controls={`projects-panel-${id}`}
                            tabindex={category() === id ? 0 : -1}
                            onClick={() => setCategory(id)}
                            class={cn(
                                "inline-flex min-h-10 items-center gap-2 rounded-full px-4 text-sm transition-colors duration-200",
                                category() === id ? "bg-primary text-on-primary" : "bg-surface-raised text-fg-muted hover:text-fg",
                            )}
                        >
                            {copy.categories[id].label}
                            <span
                                class={cn("font-mono text-xs", category() === id ? "text-on-primary/70" : "text-fg-subtle")}>{projectsIn(id).length}</span>
                        </button>
                    )}</For>
                </div>
                <For each={PROJECT_CATEGORIES}>{(id) => (
                    <div role="tabpanel" id={`projects-panel-${id}`} aria-labelledby={`projects-tab-${id}`}
                         hidden={category() !== id} tabindex={0} class="appear mt-6 focus-visible:outline-offset-8">
                        {/* Only the open category is rendered, which keeps the prerendered page small. */}
                        <Show when={category() === id}>
                            <p class="mb-8 max-w-2xl text-fg-muted">{copy.categories[id].description}</p>
                            {/* Two tiles a row on a phone, three on a desktop and four on a wide screen: a tile is an
                                illustration, a name and a few words, so it stays small without losing anything. */}
                            <ul class="enter-each grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5 2xl:grid-cols-4">
                                <For each={listed()}>{(project) => (
                                    <li>
                                        <ProjectTile
                                            id={project.id}
                                            name={copy.items[project.id].name}
                                            brief={copy.items[project.id].brief}
                                            href={hrefOf(project.id)}
                                        />
                                    </li>
                                )}</For>
                            </ul>
                        </Show>
                    </div>
                )}</For>
            </div>

            <Link
                to={buildProjectPath(lang, {locked: locked()})}
                class="mt-10 inline-flex min-h-11 items-center gap-2 rounded-full bg-surface-raised px-5 text-sm font-semibold text-fg transition-colors hover:bg-border"
            >
                {ui.actions.allProjects}
                <ArrowRight class="size-4"/>
            </Link>

            {/* The organizations get a line each on their index; here, their names lead there. */}
            <div class="mt-20 grid gap-6 border-t border-border pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
                <div>
                    <h3 class="text-title text-fg">{copy.organizationsTitle}</h3>
                    <p class="mt-2 text-fg-muted">{copy.organizationsSubtitle}</p>
                </div>
                <div>
                    <ul translate="no" class="flex flex-wrap gap-2">
                        <For each={prioritize(organizations, (organization) => organization.roles, role())}>
                            {(organization) => (
                                <li>
                                    <Link
                                        to={buildDetailPath(lang, "organizations", {
                                            slug: ORGANIZATION_SLUG[organization.id],
                                            locked: locked()
                                        })}
                                        class="inline-flex min-h-10 items-center gap-1.5 rounded-full border border-border px-4 text-sm text-fg-muted transition-colors hover:border-fg-subtle hover:text-fg"
                                    >
                                        {organization.name}
                                        <Show when={organization.visibility === "private"}>
                                            <Lock class="size-3.5"/>
                                            <span class="sr-only"> ({copy.private})</span>
                                        </Show>
                                    </Link>
                                </li>
                            )}
                        </For>
                    </ul>
                    <Link
                        to={buildDetailPath(lang, "organizations", {locked: locked()})}
                        class="mt-5 inline-flex min-h-10 items-center gap-2 text-sm font-semibold text-fg hover:text-fg-muted"
                    >
                        {copy.organizationsIndex}
                        <ArrowRight class="size-4"/>
                    </Link>
                </div>
            </div>
        </Section>
    );
}
