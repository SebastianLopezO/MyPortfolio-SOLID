import {createMemo, createSignal, For, type JSX, Match, Show, Switch} from "solid-js";
import {ExternalLink, Lock} from "@/components/ui/icons";
import {useProjectsCopy} from "@/content/project-copy";
import {useSectionCopy} from "@/content/sections";
import {
    archive,
    type ArchiveEntry,
    archiveOf,
    type ArchiveOrg,
    archiveOrgUrl,
    archiveUrl
} from "@/content/shared/archive";
import {caseStudyById} from "@/content/shared/case-studies";
import {certifications} from "@/content/shared/certifications";
import {CERTIFICATION_SLUG, EDUCATION_SLUG, EXPERIENCE_SLUG, ORGANIZATION_SLUG} from "@/content/shared/detail-links";
import {education} from "@/content/shared/education";
import {experience} from "@/content/shared/experience";
import {organizations} from "@/content/shared/organizations";
import {isCaseStudy, PROJECT_SLUG, projectIdBySlug, type ProjectSlug} from "@/content/shared/project-links";
import {projectById, projectImages, projects, projectsIn} from "@/content/shared/projects";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {useHydrated} from "@/hooks/useHydrated";
import {GithubIcon} from "@/components/layout/BrandIcons";
import {Bullets, LinkRows, NeighborNavigation, PageIndex, PageTrail, TextSection} from "@/components/page/PageParts";
import {CaseFigures} from "@/components/case-study/CaseFigures";
import {Decisions} from "@/components/case-study/Decisions";
import {CaseImage, CaseImages, SETTLE} from "@/components/case-study/CaseImages";
import {LayeredDiagram} from "@/components/case-study/LayeredDiagram";
import {ProjectCard, type ProjectCardLabels} from "@/components/projects/ProjectCard";
import {Carousel} from "@/components/ui/Carousel";
import {TechExplorer} from "@/components/projects/TechExplorer";
import {ToggleButton} from "@/components/ui/ToggleButton";
import {formatRange, formatYearMonth} from "@/lib/format";
import {buildDetailPath, buildProjectPath} from "@/lib/paths";
import {cn} from "@/lib/utils";
import {Link} from "@/routes/Router";
import type {CaseStudyFacts} from "@/types/case-study";
import {PROJECT_CATEGORIES, type ProjectFacts, type ProjectId, type ProjectPageId} from "@/types/project";

/** Home, the projects index and, on a project, the project; the same trail the page's structured data declares. */
function ProjectCrumbs(props: { current?: string }) {
    const {lang, content} = useLanguage();
    const {role, locked, pathFor} = useRole();
    const {cases: {ui}} = useProjectsCopy();
    const items = () => {
        const home = {label: content.ui.home, to: pathFor(role(), "projects")};
        return props.current
            ? [home, {
                label: ui.indexTitle,
                to: buildProjectPath(lang, {locked: locked()})
            }, {label: props.current}]
            : [home, {label: ui.indexTitle}];
    };
    return <PageTrail label={ui.breadcrumb} items={items()}/>;
}

function ProjectLinks(props: { links: { demo?: string; code?: string }; privateLabel: string }) {
    const {cases: {ui}} = useProjectsCopy();
    return (
        <Show when={props.links.demo || props.links.code} fallback={
            <p class="inline-flex items-center gap-2 text-sm text-fg-subtle">
                <Lock class="size-4"/>
                {props.privateLabel}
            </p>
        }>
            <div class="flex flex-wrap gap-3">
                <Show when={props.links.demo}>
                    <a
                        href={props.links.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 font-semibold text-on-primary hover:bg-primary-hover"
                    >
                        <ExternalLink class="size-4"/>
                        {ui.liveDemo}
                    </a>
                </Show>
                <Show when={props.links.code}>
                    <a
                        href={props.links.code}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex h-11 items-center gap-2 rounded-md border border-border-strong px-5 font-semibold text-fg hover:border-primary hover:text-primary"
                    >
                        <GithubIcon class="size-4"/>
                        {ui.viewCode}
                    </a>
                </Show>
            </div>
        </Show>
    );
}

/** The overview column: role, place, period, team and status, the links and the figures. */
function AtAGlance(props: {
    facts: {
        start: CaseStudyFacts["start"];
        end?: CaseStudyFacts["end"];
        team?: number | null;
        links: { demo?: string; code?: string }
    };
    role: string;
    place: string;
    status: string;
    figures: CaseStudyFacts["figures"];
    figureLabels: Record<string, string>;
}) {
    const {content} = useLanguage();
    const {cases: {ui}} = useProjectsCopy();
    return (
        <div class="grid gap-8 lg:grid-cols-[1fr_1.4fr] xl:grid-cols-1">
            <div class="grid content-start gap-4 rounded-lg border border-border bg-surface p-5 text-sm">
                <dl class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                    <div>
                        <dt class="text-fg-subtle">{ui.overview.role}</dt>
                        <dd class="mt-0.5 font-semibold text-fg">{props.role}</dd>
                    </div>
                    <div>
                        <dt class="text-fg-subtle">{ui.overview.organization}</dt>
                        <dd class="mt-0.5 text-fg">{props.place}</dd>
                    </div>
                    <div>
                        <dt class="text-fg-subtle">{ui.overview.period}</dt>
                        <dd class="mt-0.5 text-fg">{formatRange(props.facts.start, props.facts.end ?? null, content.ui.months, content.ui.present)}</dd>
                    </div>
                    <Show when={props.facts.team && props.facts.team > 1}>
                        <div>
                            <dt class="text-fg-subtle">{ui.overview.team}</dt>
                            <dd class="mt-0.5 text-fg">{props.facts.team} {ui.overview.people}</dd>
                        </div>
                    </Show>
                    <div>
                        <dt class="text-fg-subtle">{ui.overview.status}</dt>
                        <dd class="mt-0.5 text-fg">{props.status}</dd>
                    </div>
                </dl>
                <ProjectLinks links={props.facts.links} privateLabel={ui.privateCode}/>
            </div>
            <Show when={props.figures.length > 0}>
                <CaseFigures figures={props.figures} labels={props.figureLabels} locale={content.locale} compact
                             class="content-start sm:grid-cols-2"/>
            </Show>
        </div>
    );
}

/** A project title stays within two lines: phones get the heading size, and names past 48 characters keep it on wide
 * screens too, as the detail pages do with long certificate titles. */
const titleSize = (name: string) => (name.length > 48 ? "text-heading" : "text-heading md:text-display");

/** The other projects of the same job or program, most relevant to the role view first. */
const siblingsOf = (facts: ProjectFacts) =>
    projects.filter((project) => project.id !== facts.id && (
        (facts.experience !== undefined && project.experience === facts.experience)
        || (facts.education !== undefined && project.education === facts.education)
    ));

const certificationsIn = (id: ProjectId) =>
    certifications.filter((item) => item.applied.some((ref) => ref.kind === "project" && ref.id === id));

const hasRelated = (id: ProjectId) => {
    const facts = projectById(id);
    return Boolean(facts.experience || facts.education || facts.organization) || certificationsIn(id).length > 0;
};

/** Where the project sits in the rest of the site: its job, program and organization pages, the certifications that
 * show in it and the other projects of the same job or program. */
function Related(props: { id: ProjectId; sectionId: string }) {
    const {lang, content} = useLanguage();
    const {locked} = useRole();
    const {pages} = useProjectsCopy();
    const cards = useSectionCopy("projects");
    const about = useSectionCopy("about");
    const ui = pages.ui.related;
    // The page mounts anew for every project, so the id is fixed for its life.
    // eslint-disable-next-line solid/reactivity
    const {id} = props;
    const facts = projectById(id);
    const detail = (collection: "experience" | "education" | "organizations" | "certifications", slug: string) =>
        buildDetailPath(lang, collection, {slug, locked: locked()});
    const job = experience.find((item) => item.id === facts.experience);
    const program = education.find((item) => item.id === facts.education);
    const organization = organizations.find((item) => item.id === facts.organization);
    const places = () => [
        ...(job ? [{
            key: job.id, to: detail("experience", EXPERIENCE_SLUG[job.id]), label: ui.experience, name: job.company,
            text: formatRange(job.start, job.end, content.ui.months, content.ui.present)
        }] : []),
        ...(program ? [{
            key: program.id, to: detail("education", EDUCATION_SLUG[program.id]), label: ui.program,
            name: about.education[program.id].degree, text: program.school
        }] : []),
        ...(organization ? [{
            key: organization.id, to: detail("organizations", ORGANIZATION_SLUG[organization.id]),
            label: ui.organization, name: organization.name
        }] : []),
    ];
    const certified = certificationsIn(id);
    const siblings = siblingsOf(facts);
    // A program's own page reuses screens of its projects, so a card shows the first screen this page does not.
    const shown = new Set(projectImages(facts).map((image) => image.base));
    const place = job?.company ?? (program ? about.education[program.id].degree : "");

    return (
        <Show when={places().length > 0 || certified.length > 0}>
            <TextSection id={props.sectionId} title={ui.title}>
                <div class="space-y-10">
                    <Show when={places().length > 0}>
                        <div>
                            <h3 class="mb-4 font-semibold text-fg">{ui.places}</h3>
                            <LinkRows items={places()}/>
                        </div>
                    </Show>
                    <Show when={certified.length > 0}>
                        <div>
                            <h3 class="mb-4 font-semibold text-fg">{ui.certifications}</h3>
                            <LinkRows items={certified.map((item) => ({
                                key: item.id,
                                to: detail("certifications", CERTIFICATION_SLUG[item.id]),
                                label: `${formatYearMonth(item.date, content.ui.months)} · ${item.issuer}`,
                                name: item.title,
                            }))}/>
                        </div>
                    </Show>
                    <Show when={siblings.length > 0 && place}>
                        <div>
                            <h3 class="mb-4 font-semibold text-fg">{ui.siblings.replace("{place}", place)}</h3>
                            {/* Like the index: one card per view on phones, a grid from 48rem. */}
                            <Carousel
                                previousLabel={cards.slider.previous}
                                nextLabel={cards.slider.next}
                                slideClass="flex basis-[85%] sm:basis-[calc((100%-1.25rem)/2)] md:basis-auto"
                                trackClass="md:grid md:snap-none md:grid-cols-2 md:overflow-visible xl:grid-cols-3"
                                controlsClass="md:hidden"
                                items={siblings}
                            >
                                {(sibling) => {
                                    const screens = projectImages(sibling);
                                    const screen = screens.find((image) => !shown.has(image.base)) ?? screens[0];
                                    return (
                                        <Link
                                            to={buildProjectPath(lang, {
                                                slug: PROJECT_SLUG[sibling.id],
                                                locked: locked()
                                            })}
                                            class="group block w-full overflow-clip rounded-lg border border-border bg-surface hover:border-primary"
                                        >
                                            <Show when={screen}>
                                                <CaseImage image={screen} alt="" bare frameClass={SETTLE}
                                                           sizes="(min-width: 80rem) 16rem, (min-width: 48rem) 45vw, 85vw"
                                                           class={cn("aspect-[16/9]", screen.height > screen.width ? "object-contain" : "object-cover object-top")}/>
                                            </Show>
                                            <div class="p-4">
                                                <p class="font-semibold text-fg group-hover:text-primary">{cards.items[sibling.id].name}</p>
                                                <p class="mt-1 text-sm text-fg-muted">{cards.items[sibling.id].context}</p>
                                            </div>
                                        </Link>
                                    );
                                }}
                            </Carousel>
                        </div>
                    </Show>
                </div>
            </TextSection>
        </Show>
    );
}

/** The links under every project page: the projects before and after it in the list, and back to the index. */
function ProjectNavigation(props: { id: ProjectId }) {
    const {lang} = useLanguage();
    const {locked} = useRole();
    const {cases: {ui}, pages} = useProjectsCopy();
    const cards = useSectionCopy("projects");
    const index = () => projects.findIndex((project) => project.id === props.id);
    const previous = () => projects[(index() - 1 + projects.length) % projects.length];
    const next = () => projects[(index() + 1) % projects.length];
    const linkTo = (project: ProjectFacts) => ({
        to: buildProjectPath(lang, {slug: PROJECT_SLUG[project.id], locked: locked()}),
        label: cards.items[project.id].name,
    });

    return (
        <NeighborNavigation
            label={ui.allProjects}
            previous={linkTo(previous())}
            next={linkTo(next())}
            previousLabel={pages.ui.previous}
            nextLabel={pages.ui.next}
            all={{to: buildProjectPath(lang, {locked: locked()}), label: ui.allProjects}}
        />
    );
}

function RepositoryList(props: { entries: ArchiveEntry[]; note?: string }) {
    const {lang} = useLanguage();
    return (
        <>
            <Show when={props.note}>
                <p class="mb-6 text-fg-muted">{props.note}</p>
            </Show>
            <ul class="divide-y divide-border rounded-lg border border-border bg-surface">
                <For each={props.entries}>{(entry) => (
                    <li
                        class="grid grid-cols-[minmax(0,1fr)] gap-1 p-4 md:grid-cols-[4rem_minmax(0,1fr)_auto] md:items-baseline md:gap-4">
                        <span class="font-mono text-xs text-fg-subtle">{entry.year}</span>
                        <div>
                            {/* Name and organization wrap apart, so a long repository name never widens the page. */}
                            <p class="flex flex-wrap items-baseline gap-x-2">
                                <a href={archiveUrl(entry)} target="_blank" rel="noopener noreferrer" translate="no"
                                   class="font-semibold [overflow-wrap:anywhere] text-fg hover:text-primary">
                                    {entry.name}
                                </a>
                                <span translate="no" class="text-xs text-fg-subtle">{entry.org}</span>
                            </p>
                            <p class="mt-1 text-sm text-fg-muted">{entry.note[lang]}</p>
                        </div>
                        <span translate="no"
                              class="font-mono text-xs text-fg-subtle md:text-right">{entry.stack}</span>
                    </li>
                )}</For>
            </ul>
        </>
    );
}

function CaseStudy(props: { slug: ProjectSlug }) {
    const {role} = useRole();
    const {cases: {ui, items}, pages} = useProjectsCopy();
    // The route mounts a new page for every slug.
    // eslint-disable-next-line solid/reactivity
    const {slug} = props;
    const id = projectIdBySlug(slug) as CaseStudyFacts["id"];
    const facts = caseStudyById(id);
    const copy = items[id];
    const related = hasRelated(id);
    const sections = [
        {id: "case-problem", title: ui.sections.problem},
        {id: "case-constraints", title: ui.sections.constraints},
        {id: "case-approach", title: ui.sections.approach},
        {id: "case-architecture", title: ui.sections.architecture},
        {id: "case-decisions", title: ui.sections.decisions},
        {id: "case-results", title: ui.sections.results},
        ...(copy.next.length > 0 ? [{id: "case-next", title: ui.sections.next}] : []),
        {id: "case-stack", title: ui.sections.stack},
        ...(related ? [{id: "case-related", title: pages.ui.related.title}] : []),
    ];

    return (
        // A case study reads like an article: past 80rem the text and its side column keep their width instead of drifting apart.
        <article class="container-page py-12 md:py-16 xl:max-w-[80rem]">
            <ProjectCrumbs current={copy.name}/>
            <header class="mt-6 max-w-4xl">
                <p class="font-mono text-xs tracking-widest text-accent uppercase">{ui.eyebrow}</p>
                <h1 class={cn("mt-3 text-fg", titleSize(copy.name))}>{copy.name}</h1>
                <p class="mt-4 text-xl text-fg">{copy.tagline}</p>
                <p class="mt-4 text-fg-muted">{copy.summary}</p>
            </header>

            {/* On wide screens the overview, the figures and the page index sit beside the text instead of above it. */}
            <div class="mt-10 xl:grid xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-x-16">
                <aside aria-label={ui.atAGlance} class="xl:col-start-2 xl:row-start-1">
                    <AtAGlance facts={facts} role={copy.role} place={copy.organization} status={copy.status}
                               figures={facts.figures} figureLabels={copy.figures}/>
                    <PageIndex label={ui.onThisPage} sections={sections}/>
                </aside>

                <div class="xl:col-start-1 xl:row-start-1 xl:[&>:first-child]:mt-0">
                    <Show when={facts.images.length > 0}>
                        <section aria-label={ui.sections.screens} class="mt-12">
                            <CaseImages images={facts.images} phoneImages={facts.phoneImages} alts={copy.images}
                                        recreationLabel={ui.recreation}
                                        enlargeLabel={ui.enlarge}/>
                        </section>
                    </Show>

                    <div class="mt-12 max-w-4xl space-y-12">
                        <TextSection id="case-problem" title={ui.sections.problem}>
                            <div class="max-w-[68ch] space-y-4 text-lg text-fg-muted">
                                <For each={copy.problem}>{(paragraph) => <p>{paragraph}</p>}</For>
                            </div>
                        </TextSection>
                        <TextSection id="case-constraints" title={ui.sections.constraints}>
                            <Bullets items={copy.constraints}/>
                        </TextSection>
                        <TextSection id="case-approach" title={ui.sections.approach}>
                            <Bullets items={copy.approach}/>
                        </TextSection>
                    </div>

                    <section aria-labelledby="case-architecture" class="mt-12 border-t border-border pt-10">
                        <h2 id="case-architecture" class="text-heading text-fg">{ui.sections.architecture}</h2>
                        <div class="mt-6">
                            <LayeredDiagram diagram={facts.diagram} labels={copy.diagram.labels}
                                            title={copy.diagram.title} caption={copy.diagram.caption}/>
                        </div>
                    </section>

                    <div class="mt-12 max-w-4xl space-y-12">
                        <TextSection id="case-decisions" title={ui.sections.decisions}>
                            <Decisions items={copy.decisions} labels={ui.decisionTabs}/>
                        </TextSection>
                        <TextSection id="case-results" title={ui.sections.results}>
                            <Bullets items={copy.results}/>
                        </TextSection>
                        <Show when={copy.next.length > 0}>
                            <TextSection id="case-next" title={ui.sections.next}>
                                <Bullets items={copy.next}/>
                            </TextSection>
                        </Show>
                        <TextSection id="case-stack" title={ui.sections.stack}>
                            <TechExplorer tech={facts.tech} role={role()} exclude={id}/>
                        </TextSection>
                        <Related id={id} sectionId="case-related"/>
                    </div>
                </div>
            </div>

            <ProjectNavigation id={id}/>
        </article>
    );
}

const repositoriesOf = (facts: ProjectFacts) => {
    if (!facts.repositories) return [];
    const {org, only, except} = facts.repositories;
    return archiveOf(org).filter((entry) => (!only || only.includes(entry.name)) && !except?.includes(entry.name));
};

/** A project without a full case study: what it is, what it does, how it works, its decisions and its repositories. */
function ProjectPage(props: { slug: ProjectSlug }) {
    const {role} = useRole();
    const {cases: {ui}, pages} = useProjectsCopy();
    const cards = useSectionCopy("projects");
    // The route mounts a new page for every slug.
    // eslint-disable-next-line solid/reactivity
    const {slug} = props;
    const id = projectIdBySlug(slug) as ProjectPageId;
    const facts = projectById(id);
    const card = cards.items[id];
    const page = pages.items[id];
    const repositories = repositoriesOf(facts);
    const related = hasRelated(id);
    const sections = [
        {id: "project-overview", title: pages.ui.overview},
        {id: "project-what", title: pages.ui.whatItDoes},
        ...(facts.diagram && page.diagram ? [{id: "project-architecture", title: pages.ui.howItWorks}] : []),
        ...(page.decisions.length > 0 ? [{id: "project-decisions", title: pages.ui.decisions}] : []),
        ...(repositories.length > 0 ? [{id: "project-repositories", title: pages.ui.repositories}] : []),
        {id: "project-stack", title: pages.ui.stack},
        ...(related ? [{id: "project-related", title: pages.ui.related.title}] : []),
    ];

    return (
        <article class="container-page py-12 md:py-16 xl:max-w-[80rem]">
            <ProjectCrumbs current={card.name}/>
            <header class="mt-6 max-w-4xl">
                <p class="font-mono text-xs tracking-widest text-accent uppercase">{pages.ui.eyebrow[facts.category]}</p>
                <h1 class={cn("mt-3 text-fg", titleSize(card.name))}>{card.name}</h1>
                <p class="mt-4 text-xl text-fg">{page.tagline}</p>
                <p class="mt-4 text-fg-muted">{card.summary}</p>
            </header>

            <div class="mt-10 xl:grid xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-x-16">
                <aside aria-label={ui.atAGlance} class="xl:col-start-2 xl:row-start-1">
                    <AtAGlance facts={facts} role={page.role} place={card.context} status={page.status}
                               figures={facts.figures ?? []} figureLabels={page.figures}/>
                    <PageIndex label={ui.onThisPage} sections={sections}/>
                </aside>

                <div class="xl:col-start-1 xl:row-start-1 xl:[&>:first-child]:mt-0">
                    <Show when={facts.images && facts.images.length > 0 && facts.images}>
                        {(images) => (
                            <section aria-label={pages.ui.screens} class="mt-12">
                                <CaseImages images={images()} alts={page.images} recreationLabel={ui.recreation}
                                            enlargeLabel={ui.enlarge}/>
                            </section>
                        )}
                    </Show>

                    <div class="mt-12 max-w-4xl space-y-12">
                        <TextSection id="project-overview" title={pages.ui.overview}>
                            <div class="max-w-[68ch] space-y-4 text-lg text-fg-muted">
                                <For each={page.overview}>{(paragraph) => <p>{paragraph}</p>}</For>
                            </div>
                        </TextSection>
                        <TextSection id="project-what" title={pages.ui.whatItDoes}>
                            <ul class="space-y-3 text-fg-muted">
                                <For each={card.highlights}>{(bullet) => {
                                    const match = () => {
                                        const current = role();
                                        return current !== null && bullet.roles.includes(current);
                                    };
                                    return (
                                        <li class={cn("flex gap-3", match() && "text-fg")}>
                                            <span aria-hidden="true"
                                                  class={cn("mt-2.5 size-1.5 shrink-0 rounded-full", role() && !match() ? "border border-fg-subtle" : "bg-primary")}/>
                                            {bullet.text}
                                        </li>
                                    );
                                }}</For>
                            </ul>
                        </TextSection>
                    </div>

                    <Show when={facts.diagram && page.diagram ? {facts: facts.diagram, copy: page.diagram} : undefined}>
                        {(diagram) => (
                            <section aria-labelledby="project-architecture" class="mt-12 border-t border-border pt-10">
                                <h2 id="project-architecture" class="text-heading text-fg">{pages.ui.howItWorks}</h2>
                                <div class="mt-6">
                                    <LayeredDiagram diagram={diagram().facts} labels={diagram().copy.labels}
                                                    title={diagram().copy.title} caption={diagram().copy.caption}/>
                                </div>
                            </section>
                        )}
                    </Show>

                    <div class="mt-12 max-w-4xl space-y-12">
                        <Show when={page.decisions.length > 0}>
                            <TextSection id="project-decisions" title={pages.ui.decisions}>
                                <Decisions items={page.decisions} labels={ui.decisionTabs}/>
                            </TextSection>
                        </Show>
                        <Show when={repositories.length > 0 && facts.repositories}>
                            {(source) => (
                                <TextSection id="project-repositories" title={pages.ui.repositories}>
                                    <RepositoryList entries={repositories} note={pages.ui.repositoriesNote}/>
                                    <a
                                        href={archiveOrgUrl(source().org)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="mt-4 inline-flex min-h-9 items-center gap-2 text-sm font-semibold text-primary hover:text-primary-hover"
                                    >
                                        <GithubIcon class="size-4"/>
                                        {pages.ui.organization}: {source().org}
                                    </a>
                                </TextSection>
                            )}
                        </Show>
                        <TextSection id="project-stack" title={pages.ui.stack}>
                            <TechExplorer tech={facts.tech} role={role()} exclude={id}/>
                        </TextSection>
                        <Related id={id} sectionId="project-related"/>
                    </div>
                </div>
            </div>

            <ProjectNavigation id={id}/>
        </article>
    );
}

const newestFirst = [...archive].sort((a, b) => b.year - a.year);
const archiveOrgs = [...new Set(newestFirst.map((entry) => entry.org))];

/** Every archived repository, newest first, with a filter by the organization that holds it. */
function Archive() {
    const {cases: {ui}, pages} = useProjectsCopy();
    const interactive = useHydrated();
    const [org, setOrg] = createSignal<ArchiveOrg | null>(null);
    const shown = createMemo(() => {
        const current = org();
        return current ? newestFirst.filter((entry) => entry.org === current) : newestFirst;
    });

    return (
        <section aria-labelledby="archive" class="mt-16">
            <div class="flex items-baseline gap-3">
                <h2 id="archive" class="text-heading text-fg">{ui.archiveTitle}</h2>
                <span class="font-mono text-base text-fg-subtle">{archive.length}</span>
            </div>
            <p class="mt-2 text-fg-muted">{ui.archiveSubtitle}</p>
            <div role="group" aria-label={pages.ui.archiveFilter} data-interactive={interactive() || undefined}
                 class="mt-6 flex flex-wrap gap-2">
                <For each={[null, ...archiveOrgs]}>
                    {(value) => (
                        <ToggleButton pressed={org() === value} onClick={() => setOrg(value)}
                                      count={value ? archiveOf(value).length : archive.length}>
                            <span translate={value ? "no" : undefined}>{value ?? pages.ui.archiveAll}</span>
                        </ToggleButton>
                    )}
                </For>
            </div>
            <div class="mt-6">
                <RepositoryList entries={shown()}/>
            </div>
        </section>
    );
}

function ProjectsIndex() {
    const {lang, content} = useLanguage();
    const {role, locked} = useRole();
    const {cases: {ui}} = useProjectsCopy();
    const cards = useSectionCopy("projects");
    const labels: ProjectCardLabels = {
        readProject: cards.readProject,
        readCaseStudy: content.ui.actions.readCaseStudy,
        liveDemo: content.ui.actions.liveDemo,
        viewCode: content.ui.actions.viewCode,
        privateCode: cards.privateCode,
        recreation: cards.recreation,
        months: content.ui.months,
        present: content.ui.present,
        achievements: content.ui.actions.achievements,
        hideAchievements: content.ui.actions.hideAchievements,
    };
    return (
        <div class="container-page py-12 md:py-16">
            <ProjectCrumbs/>
            <header class="mt-6 max-w-3xl">
                <h1 class="text-display text-fg">{ui.indexTitle}</h1>
                <p class="mt-4 text-lg text-fg-muted">{ui.indexSubtitle}</p>
            </header>

            <For each={PROJECT_CATEGORIES}>{(category, categoryIndex) => (
                <section aria-labelledby={`projects-${category}`} class="mt-16">
                    <div class="flex items-baseline gap-3">
                        <h2 id={`projects-${category}`}
                            class="text-heading text-fg">{cards.categories[category].label}</h2>
                        <span class="font-mono text-base text-fg-subtle">{projectsIn(category).length}</span>
                    </div>
                    <p class="mt-2 max-w-3xl text-fg-muted">{cards.categories[category].description}</p>
                    {/* Like the home page: one card per view on phones, a grid from 48rem. */}
                    <div class="mt-8">
                        <Carousel
                            previousLabel={cards.slider.previous}
                            nextLabel={cards.slider.next}
                            slideClass="flex basis-[85%] sm:basis-[calc((100%-1.25rem)/2)] md:basis-auto"
                            trackClass="md:grid md:snap-none md:grid-cols-2 md:overflow-visible xl:grid-cols-3"
                            controlsClass="md:hidden"
                            items={projectsIn(category)}
                        >
                            {(project, index) => (
                                <ProjectCard
                                    project={project}
                                    copy={cards.items[project.id]}
                                    href={buildProjectPath(lang, {
                                        slug: PROJECT_SLUG[project.id],
                                        locked: locked()
                                    })}
                                    role={role()}
                                    labels={labels}
                                    eager={categoryIndex() === 0 && index() === 0}
                                />
                            )}
                        </Carousel>
                    </div>
                </section>
            )}</For>

            <Archive/>
        </div>
    );
}

// Keyed by slug: moving to the next project on the client starts its tabs, filters and picks fresh instead of keeping
// the ones of the page before, whose lists may have a different length.
export function ProjectBody(props: { slug: ProjectSlug | null }): JSX.Element {
    return (
        <Switch fallback={<ProjectsIndex/>}>
            <Match when={props.slug && isCaseStudy(projectIdBySlug(props.slug)) && props.slug} keyed>
                {(slug) => <CaseStudy slug={slug}/>}
            </Match>
            <Match when={props.slug} keyed>
                {(slug) => <ProjectPage slug={slug}/>}
            </Match>
        </Switch>
    );
}
