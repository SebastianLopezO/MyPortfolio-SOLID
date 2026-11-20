import {For, type JSX, Show} from "solid-js";
import {ArrowRight} from "@/components/ui/icons";
import {useDetailCopy} from "@/content/detail-copy";
import {useSectionCopy} from "@/content/sections";
import {type DetailCollection, EDUCATION_SLUG, EXPERIENCE_SLUG} from "@/content/shared/detail-links";
import {type Art, EDUCATION_ART, EXPERIENCE_ART} from "@/content/shared/page-art";
import {PROJECT_SLUG} from "@/content/shared/project-links";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {Breadcrumbs, type Crumb, PageIndex, PageTrail} from "@/components/page/PageParts";
import {ProjectTile} from "@/components/projects/ProjectTile";
import {ArtTile} from "@/components/ui/ArtTile";
import {withBase} from "@/lib/base";
import {buildDetailPath, buildProjectPath} from "@/lib/paths";
import {cn} from "@/lib/utils";
import {Link} from "@/routes/Router";
import type {EducationFacts, ExperienceFacts} from "@/types/content";
import type {ProjectFacts, ProjectId} from "@/types/project";

// What every detail page is made of: the article with its crumbs, header and overview, the index header, the links
// that keep the role view, and the rows of tiles that lead to other pages.

/** The home section each collection comes from, which the first breadcrumb returns to. */
export const HOME_SECTION: Record<DetailCollection, string> = {
    experience: "experience",
    education: "about",
    certifications: "certifications",
    organizations: "projects",
    services: "services",
    reasons: "reasons",
    metrics: "metrics",
};

export const fill = (template: string, values: Record<string, string | number>) =>
    template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));

export const countOf = (forms: { one: string; other: string }, count: number) =>
    fill(count === 1 ? forms.one : forms.other, {count});

/**
 * The links of a page, which carry the role view the visitor came from. The view is only known once the page is
 * hydrated (islands/shell.tsx), so the links read it when called: called inside JSX, they follow it.
 */
export function useLinks() {
    const {lang} = useLanguage();
    const {locked} = useRole();
    return {
        detail: (collection: DetailCollection, slug: string | null = null) => buildDetailPath(lang, collection, {
            slug,
            locked: locked()
        }),
        project: (id: ProjectId) => buildProjectPath(lang, {slug: PROJECT_SLUG[id], locked: locked()}),
    };
}

export function useNumbers() {
    const {content} = useLanguage();
    const locale = content.locale.replace("_", "-");
    return {
        integer: new Intl.NumberFormat(locale).format,
        percent: new Intl.NumberFormat(locale, {style: "percent", maximumFractionDigits: 0}).format,
    };
}

/** The breadcrumb of a page: the profile section it belongs to, the collection's index and, on an item, the item. */
export function useCrumbs(collection: DetailCollection, current: string | null): () => Crumb[] {
    const {content} = useLanguage();
    const {role, pathFor} = useRole();
    const {indexes} = useDetailCopy();
    const links = useLinks();
    return () => {
        const home = {label: content.ui.home, to: pathFor(role(), HOME_SECTION[collection])};
        if (current === null) return [home, {label: indexes[collection].title}];
        return [home, {label: indexes[collection].title, to: links.detail(collection)}, {label: current}];
    };
}

/** The overview beside the text: label and value pairs, and the links under them. */
export function Glance(props: { items: { label: string; value: JSX.Element }[]; children?: JSX.Element }) {
    return (
        <div class="grid content-start gap-4 rounded-lg border border-border bg-surface p-5 text-sm">
            <dl class="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
                <For each={props.items}>
                    {(item) => (
                        <div>
                            <dt class="text-fg-subtle">{item.label}</dt>
                            <dd class="mt-0.5 text-fg">{item.value}</dd>
                        </div>
                    )}
                </For>
            </dl>
            {props.children}
        </div>
    );
}

/** The illustration of a page on its tile, beside its title. */
function HeaderArt(props: { art: Art }) {
    return (
        <div aria-hidden="true"
             class="detail-art grid aspect-[2/1] place-items-center overflow-clip rounded-2xl md:aspect-square"
             style={{background: `var(--color-tile-${props.art.tile})`}}>
            <img src={withBase(props.art.file)} alt="" width={400} height={400} decoding="async"
                 class="tile-illustration h-auto w-[44%] md:w-[86%]"/>
        </div>
    );
}

interface ArticleProps {
    collection: DetailCollection;
    title: string;
    subtitle?: JSX.Element;
    lead?: JSX.Element;
    /** Names that stay as they are, such as a GitHub organization, are not translated by the browser. */
    keepTitle?: boolean;
    /** The page's object, drawn for the site, beside its title. */
    art?: Art;
    glance: JSX.Element;
    sections: { id: string; title: string }[];
    navigation: JSX.Element;
    children: JSX.Element;
}

export function DetailArticle(props: ArticleProps) {
    const {ui} = useDetailCopy();
    // A page keeps its collection and title for its whole life.
    // eslint-disable-next-line solid/reactivity
    const crumbs = useCrumbs(props.collection, props.title);
    return (
        <article class="container-page py-12 md:py-16 xl:max-w-[80rem]">
            <PageTrail label={ui.breadcrumb} items={crumbs()}/>
            <header class={cn("mt-6", props.art
                ? "grid gap-6 md:grid-cols-[minmax(0,1fr)_13rem] md:items-center md:gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-16"
                : "max-w-4xl")}>
                <div class="max-w-4xl">
                    <p class="font-mono text-xs text-fg-subtle">{ui.eyebrow[props.collection]}</p>
                    {/* A title stays within two lines at every width: up to 40 characters it grows to the display size
                        from 48rem, and up to 28 beside an illustration from 80rem; longer ones (most certificates) keep
                        the heading size. */}
                    <h1 translate={props.keepTitle ? "no" : undefined}
                        class={cn("mt-3 text-fg [overflow-wrap:anywhere]", props.title.length > (props.art ? 28 : 40) ? "text-heading" : props.art ? "text-heading xl:text-display" : "text-heading md:text-display")}>
                        {props.title.replaceAll(" – ", " – ")}
                    </h1>
                    <Show when={props.subtitle}>
                        <p class="mt-4 max-w-[68ch] text-xl text-fg">{props.subtitle}</p>
                    </Show>
                    <Show when={props.lead}>
                        <p class="mt-4 max-w-[68ch] text-fg-muted">{props.lead}</p>
                    </Show>
                </div>
                <Show when={props.art}>{(art) => <HeaderArt art={art()}/>}</Show>
            </header>

            {/* As on the project pages: on wide screens the overview and the page index sit beside the text. */}
            <div class="mt-10 xl:grid xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-x-16">
                <aside aria-label={ui.atAGlance} class="xl:col-start-2 xl:row-start-1">
                    {props.glance}
                    <PageIndex label={ui.onThisPage} sections={props.sections}/>
                </aside>
                <div class="mt-12 max-w-4xl space-y-12 xl:col-start-1 xl:row-start-1 xl:mt-0">{props.children}</div>
            </div>

            {props.navigation}
        </article>
    );
}

export function IndexHeader(props: { collection: DetailCollection; subtitle?: string }) {
    const {ui, indexes} = useDetailCopy();
    // An index keeps its collection for its whole life.
    // eslint-disable-next-line solid/reactivity
    const crumbs = useCrumbs(props.collection, null);
    return (
        <>
            <Breadcrumbs label={ui.breadcrumb} items={crumbs()}/>
            <header class="mt-6 max-w-3xl">
                <h1 class="text-display text-fg">{indexes[props.collection].title}</h1>
                <p class="mt-4 text-lg text-fg-muted">{props.subtitle ?? indexes[props.collection].subtitle}</p>
            </header>
        </>
    );
}

export function Paragraphs(props: { items: string[]; lead?: string }) {
    return (
        <div class="max-w-[68ch] space-y-4 text-lg text-fg-muted">
            <Show when={props.lead}>
                <p class="text-fg">{props.lead}</p>
            </Show>
            <For each={props.items}>{(paragraph) => <p>{paragraph}</p>}</For>
        </div>
    );
}

/** A grid of tiles: two across on a phone, three from 64rem, each one rising into place as it comes up. */
export function TileGrid(props: { children: JSX.Element; class?: string }) {
    return <ul
        class={cn("enter-each grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3", props.class)}>{props.children}</ul>;
}

/** Each project as its tile, its illustration on its color, linked to its page. */
export function ProjectTiles(props: { items: ProjectFacts[] }) {
    const cards = useSectionCopy("projects");
    const links = useLinks();
    return (
        <TileGrid>
            <For each={props.items}>{(project) => (
                <li>
                    <ProjectTile id={project.id} name={cards.items[project.id].name}
                                 brief={cards.items[project.id].brief}
                                 href={links.project(project.id)}/>
                </li>
            )}</For>
        </TileGrid>
    );
}

/** Each job as its badge, with the title held there. */
export function JobTiles(props: { items: ExperienceFacts[] }) {
    const jobs = useSectionCopy("experience");
    const links = useLinks();
    return (
        <TileGrid>
            <For each={props.items}>{(job) => (
                <li>
                    <ArtTile art={EXPERIENCE_ART[job.id]} name={job.company.split(" – ")[0]}
                             brief={jobs.items[job.id].title.split(" · ")[0]}
                             href={links.detail("experience", EXPERIENCE_SLUG[job.id])}/>
                </li>
            )}</For>
        </TileGrid>
    );
}

/** Each program as its book, with the institution that gives it. */
export function ProgramTiles(props: { items: EducationFacts[] }) {
    const about = useSectionCopy("about");
    const links = useLinks();
    return (
        <TileGrid>
            <For each={props.items}>{(program) => (
                <li>
                    <ArtTile art={EDUCATION_ART[program.id]} name={about.education[program.id].degree}
                             brief={program.school.split(" – ")[0]}
                             href={links.detail("education", EDUCATION_SLUG[program.id])}/>
                </li>
            )}</For>
        </TileGrid>
    );
}

/** Rows that lead to other pages, each with its object on a small tile, a name and a line. */
export function ArtRows(props: { items: { key: string; art: Art; to: string; name: string; text?: string }[] }) {
    return (
        <ul class="enter-each grid gap-3 sm:grid-cols-2">
            <For each={props.items}>{(item) => (
                <li>
                    <Link to={item.to}
                          class="art-row group grid h-full grid-cols-[4rem_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-border p-3 pr-4 transition-colors hover:border-border-strong">
                        <span aria-hidden="true" class="grid size-16 place-items-center rounded-xl"
                              style={{background: `var(--color-tile-${item.art.tile})`}}>
                            <img src={withBase(item.art.file)} alt="" width={56} height={56} loading="lazy"
                                 decoding="async" class="art-row-icon size-14"/>
                        </span>
                        <span class="min-w-0">
                            <span class="block font-semibold text-fg">{item.name}</span>
                            <Show when={item.text}>
                                <span class="mt-0.5 block text-sm text-fg-muted">{item.text}</span>
                            </Show>
                        </span>
                        <ArrowRight class="art-row-arrow size-4 text-fg-subtle"/>
                    </Link>
                </li>
            )}</For>
        </ul>
    );
}
