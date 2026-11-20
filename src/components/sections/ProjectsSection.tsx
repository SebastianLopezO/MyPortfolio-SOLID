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

/** How many project tiles fit comfortably in one 100dvh viewport box (two rows on a desktop, up to two on 2xl). */
const TILES_PER_SCREEN = 6;

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
    const firstPage = createMemo(() => listed().slice(0, TILES_PER_SCREEN));
    const extraPages = createMemo(() => {
        const rest = listed().slice(TILES_PER_SCREEN);
        const pages: (typeof rest)[] = [];
        for (let index = 0; index < rest.length; index += TILES_PER_SCREEN) {
            pages.push(rest.slice(index, index + TILES_PER_SCREEN));
        }
        return pages;
    });

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

    const AllProjectsLink = () => (
        <Link
            to={buildProjectPath(lang, {locked: locked()})}
            class="mt-8 inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-surface-raised px-5 text-sm font-semibold text-fg transition-colors hover:bg-border"
        >
            {ui.actions.allProjects}
            <ArrowRight class="size-4"/>
        </Link>
    );

    const TileBatch = (batchProps: { items: readonly { id: ProjectId }[] }) => (
        <ul class="enter-each grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-5 2xl:grid-cols-3">
            <For each={batchProps.items}>{(project) => (
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
    );

    return (
        <Section
            id="projects"
            title={copy.title}
            subtitle={forProfile(copy.subtitle, role())}
            layout="wide"
            screens={
                <>
                    {/* The featured project fills the first 100dvh screen; the categories and their first batch of
                        tiles start the next one (globals.css, screen-break), and any extra batch gets its own 100dvh
                        box so no viewport ever overflows. */}
                    <div class="screen-break mt-14 md:mt-20">
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
                                 hidden={category() !== id} tabindex={0}
                                 class="appear mt-6 focus-visible:outline-offset-8">
                                {/* Only the open category is rendered, which keeps the prerendered page small. */}
                                <Show when={category() === id}>
                                    <p class="mb-6 max-w-2xl text-fg-muted">{copy.categories[id].description}</p>
                                    <TileBatch items={firstPage()}/>
                                    <Show when={extraPages().length === 0}>
                                        <AllProjectsLink/>
                                    </Show>
                                </Show>
                            </div>
                        )}</For>
                    </div>

                    <For each={extraPages()}>
                        {(batch, pageIndex) => (
                            <div class="screen-break mt-8">
                                <TileBatch items={batch}/>
                                <Show when={pageIndex() === extraPages().length - 1}>
                                    <AllProjectsLink/>
                                </Show>
                            </div>
                        )}
                    </For>

                    {/* The organizations get a dedicated 100dvh snap box at the close of the projects section. */}
                    <div class="screen-break mt-16">
                        <div class="grid gap-6 border-t border-border pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-16">
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
                    </div>
                </>
            }
        >
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
        </Section>
    );
}
