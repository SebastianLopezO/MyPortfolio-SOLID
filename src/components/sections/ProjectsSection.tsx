import {createComputed, createMemo, createSignal, For, on, Show} from "solid-js";
import {ArrowRight, BookOpen, ExternalLink, Lock, Star} from "@/components/ui/icons";
import {forProfile, roleConfig} from "@/content/roles";
import {useSectionCopy} from "@/content/sections";
import {ORGANIZATION_SLUG} from "@/content/shared/detail-links";
import {organizations} from "@/content/shared/organizations";
import {isCaseStudy, PROJECT_SLUG} from "@/content/shared/project-links";
import {projectById, projectImages, projectsIn} from "@/content/shared/projects";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {useHydrated} from "@/hooks/useHydrated";
import {GithubIcon} from "@/components/layout/BrandIcons";
import {Section} from "@/components/layout/Section";
import {ProjectCard, type ProjectCardLabels} from "@/components/projects/ProjectCard";
import {CaseImage, UNMASK} from "@/components/case-study/CaseImages";
import {Carousel} from "@/components/ui/Carousel";
import {More} from "@/components/ui/More";
import {TechList} from "@/components/ui/TechList";
import {formatRange} from "@/lib/format";
import {buildDetailPath, buildProjectPath} from "@/lib/paths";
import {listProjects, prioritize} from "@/lib/role-view";
import {cn} from "@/lib/utils";
import {Link} from "@/routes/Router";
import type {Bullet} from "@/types/content";
import {PROJECT_CATEGORIES, type ProjectCategory, type ProjectId} from "@/types/project";

/** The featured project shows this many achievements at first; the rest open on demand. */
const FEATURED_HIGHLIGHTS = 3;

function FeaturedProject(props: { id: ProjectId; href: string; labels: ProjectCardLabels }) {
    const copy = useSectionCopy("projects");
    const {content: {ui}} = useLanguage();
    const {role} = useRole();
    // The section mounts a new one when the role view features another project.
    // eslint-disable-next-line solid/reactivity
    const {id} = props;
    const project = projectById(id);
    const item = copy.items[id];
    const highlights = () => prioritize(item.highlights, (bullet) => bullet.roles, role());
    const shown = () => highlights().slice(0, FEATURED_HIGHLIGHTS);
    const more = () => highlights().slice(FEATURED_HIGHLIGHTS);
    const bullet = (entry: Bullet) => {
        const match = () => {
            const current = role();
            return current !== null && entry.roles.includes(current);
        };
        return (
            <li class={cn("flex gap-3", match() && "text-fg")}>
                <span aria-hidden="true"
                      class={cn("mt-2.5 size-1.5 shrink-0 rounded-full", role() && !match() ? "border border-fg-subtle" : "bg-primary")}/>
                {entry.text}
            </li>
        );
    };
    const screen = projectImages(project)[0];

    return (
        <article class="section-enter rounded-xl border border-primary/40 bg-surface p-6 shadow-glow md:p-10 xl:flow-root">
            <Show when={screen && item.screen}>
                <figure class="mb-8 xl:float-right xl:mb-6 xl:ml-10 xl:w-[30rem]">
                    {/* A phone screen keeps its shape at a phone's width; a wide one is cropped from the top. */}
                    <Link to={props.href} tabindex={-1}
                          class={cn("block", screen.height > screen.width && "mx-auto max-w-[15rem]")}>
                        <CaseImage
                            image={screen}
                            alt={item.screen!}
                            frameClass={UNMASK}
                            sizes={screen.height > screen.width ? "15rem" : "(min-width: 80rem) 30rem, 90vw"}
                            class={screen.height > screen.width ? undefined : "aspect-[16/10] object-cover object-top"}
                        />
                    </Link>
                    <Show when={screen.recreation}>
                        <figcaption class="mt-1.5 text-xs text-fg-subtle">{copy.recreation}</figcaption>
                    </Show>
                </figure>
            </Show>
            {/* A block, not inline: beside the floated screen it narrows and wraps instead of dropping below it. */}
            <p class="flex items-center gap-2 font-mono text-xs tracking-widest text-accent uppercase">
                <Star class="size-4"/>
                {copy.featured} · {item.context}
            </p>
            <h3 class="mt-3 text-heading text-fg">{item.name}</h3>
            <p class="mt-1 text-sm text-fg-subtle">{formatRange(project.start, project.end ?? null, props.labels.months, props.labels.present)}</p>
            <p class="mt-4 max-w-3xl text-lg text-fg-muted">{item.summary}</p>
            <ul class="mt-6 grid gap-x-8 gap-y-2 text-fg-muted md:grid-cols-2 xl:clear-both">
                <For each={shown()}>{bullet}</For>
            </ul>
            <Show when={more().length > 0}>
                <More class="mt-3" label={`${ui.actions.showMore} (${more().length})`} openLabel={ui.actions.showLess}>
                    <ul class="mt-2 grid gap-x-8 gap-y-2 text-fg-muted md:grid-cols-2">
                        <For each={more()}>{bullet}</For>
                    </ul>
                </More>
            </Show>
            <TechList tech={project.tech} role={role()} class="mt-6"/>
            <div class="mt-6 flex flex-wrap gap-3">
                <Link
                    to={props.href}
                    class="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 font-semibold text-on-primary hover:bg-primary-hover active:translate-y-px"
                >
                    <BookOpen class="size-5"/>
                    {isCaseStudy(id) ? props.labels.readCaseStudy : props.labels.readProject}
                </Link>
                <Show when={project.links.demo}>
                    <a
                        href={project.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex h-11 items-center gap-2 rounded-md border border-border-strong px-5 font-semibold text-fg hover:border-primary hover:text-primary active:translate-y-px"
                    >
                        <ExternalLink class="size-5"/>
                        {props.labels.liveDemo}
                    </a>
                </Show>
                <Show when={project.links.code}>
                    <a
                        href={project.links.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex h-11 items-center gap-2 rounded-md border border-border-strong px-5 font-semibold text-fg hover:border-primary hover:text-primary active:translate-y-px"
                    >
                        <GithubIcon class="size-5"/>
                        {props.labels.viewCode}
                    </a>
                </Show>
            </div>
        </article>
    );
}

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
    const labels: ProjectCardLabels = {
        readProject: copy.readProject,
        readCaseStudy: ui.actions.readCaseStudy,
        liveDemo: ui.actions.liveDemo,
        viewCode: ui.actions.viewCode,
        privateCode: copy.privateCode,
        recreation: copy.recreation,
        months: ui.months,
        present: ui.present,
        achievements: ui.actions.achievements,
        hideAchievements: ui.actions.hideAchievements,
    };
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
        <Section id="projects" title={copy.title} subtitle={forProfile(copy.subtitle, role())}>
            <Show when={config().featuredProject} keyed>
                {(id) => <FeaturedProject id={id} href={hrefOf(id)} labels={labels}/>}
            </Show>

            <div class="mt-16">
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
                                "min-h-10 rounded-md border px-4 py-2 text-sm font-semibold transition-colors",
                                category() === id ? "border-primary bg-primary text-on-primary" : "border-border text-fg-muted hover:border-primary hover:text-primary",
                            )}
                        >
                            {copy.categories[id].label} <span
                            class={cn("font-mono text-xs", category() === id ? "text-on-primary/80" : "text-fg-subtle")}>{projectsIn(id).length}</span>
                        </button>
                    )}</For>
                </div>
                <For each={PROJECT_CATEGORIES}>{(id) => (
                    <div role="tabpanel" id={`projects-panel-${id}`} aria-labelledby={`projects-tab-${id}`}
                         hidden={category() !== id} tabindex={0} class="appear mt-6">
                        {/* Only the open category is rendered, which keeps the prerendered page small. */}
                        <Show when={category() === id}>
                            <p class="mb-6 max-w-3xl text-fg-muted">{copy.categories[id].description}</p>
                            {/* One card per view on phones, two from 40rem, and from 64rem a reel: the current project
                                in the middle, its neighbours turned toward it, moved by drag, arrows or the buttons. */}
                            <Carousel
                                reel
                                previousLabel={copy.slider.previous}
                                nextLabel={copy.slider.next}
                                slideClass="flex basis-[85%] sm:basis-[calc((100%-1.25rem)/2)] lg:basis-(--reel-card) lg:snap-center"
                                trackClass="[--reel-card:clamp(22rem,34vw,32rem)] lg:scroll-px-0 lg:px-[calc(50%_-_var(--reel-card)/2)] lg:py-4"
                                items={listed()}
                            >
                                {(project) => (
                                    <ProjectCard project={project} copy={copy.items[project.id]}
                                                 href={hrefOf(project.id)} role={role()} labels={labels}/>
                                )}
                            </Carousel>
                        </Show>
                    </div>
                )}</For>
            </div>

            <Link
                to={buildProjectPath(lang, {locked: locked()})}
                class="mt-8 inline-flex min-h-10 items-center gap-2 rounded-md border border-border-strong px-4 text-sm font-semibold text-fg hover:border-primary hover:text-primary"
            >
                {ui.actions.allProjects}
                <ArrowRight class="size-4"/>
            </Link>

            {/* The organizations get a line each on their index; here, their names lead there. */}
            <div class="mt-16">
                <h3 class="text-heading text-fg">{copy.organizationsTitle}</h3>
                <p class="mt-2 max-w-3xl text-fg-muted">{copy.organizationsSubtitle}</p>
                <ul translate="no" class="mt-6 flex flex-wrap gap-2">
                    <For each={prioritize(organizations, (organization) => organization.roles, role())}>
                        {(organization) => (
                            <li>
                                <Link
                                    to={buildDetailPath(lang, "organizations", {
                                        slug: ORGANIZATION_SLUG[organization.id],
                                        locked: locked()
                                    })}
                                    class="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border px-3 text-sm text-fg-muted transition-colors hover:border-primary hover:text-primary"
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
                    class="mt-6 inline-flex min-h-10 items-center gap-2 rounded-md border border-border-strong px-4 text-sm font-semibold text-fg hover:border-primary hover:text-primary"
                >
                    {copy.organizationsIndex}
                    <ArrowRight class="size-4"/>
                </Link>
            </div>
        </Section>
    );
}
