import {For, mergeProps, Show} from "solid-js";
import {Dynamic} from "solid-js/web";
import {ArrowRight, ExternalLink, Lock} from "@/components/ui/icons";
import type {RoleId} from "@/content/roles";
import {isCaseStudy} from "@/content/shared/project-links";
import {projectImages} from "@/content/shared/projects";
import {CaseImage, SETTLE} from "@/components/case-study/CaseImages";
import {GithubIcon} from "@/components/layout/BrandIcons";
import {TechList} from "@/components/ui/TechList";
import {formatRange} from "@/lib/format";
import {prioritize} from "@/lib/role-view";
import {cn} from "@/lib/utils";
import {Link} from "@/routes/Router";
import type {ProjectCardCopy, ProjectFacts} from "@/types/project";

export interface ProjectCardLabels {
    readProject: string;
    readCaseStudy: string;
    liveDemo: string;
    viewCode: string;
    privateCode: string;
    /** The note on a recreated screen. */
    recreation: string;
    months: readonly string[];
    present: string;
}

interface ProjectCardProps {
    project: ProjectFacts;
    copy: ProjectCardCopy;
    href: string;
    role: RoleId | null;
    labels: ProjectCardLabels;
    /** How many achievements the card lists; its page lists them all. */
    limit?: number;
    headingLevel?: "h3" | "h4";
    /** The first card on screen when the page opens: its screen loads at once (CaseImage). */
    eager?: boolean;
}

/**
 * A project as a card: where it was built, what it is, its main achievements (the role view's first, brightened)
 * and its stack, with links to its page, its demo and its code.
 */
export function ProjectCard(rawProps: ProjectCardProps) {
    const props = mergeProps({limit: 4, headingLevel: "h3" as const, eager: false}, rawProps);
    const highlights = () => prioritize(props.copy.highlights, (item) => item.roles, props.role).slice(0, props.limit);
    const screen = () => projectImages(props.project)[0];

    return (
        // The whole card answers a pointer: its outline brightens, its screen comes closer and the arrow of its page
        // link leans forward (globals.css, hover-card).
        <article
            class="hover-card group flex w-full flex-col rounded-lg border border-border bg-surface p-6 transition-colors duration-200 hover:border-border-strong">
            {/* The main screen fills the top of the card; a recreated one says so on its corner. It settles into the
                frame as the card comes up and comes a little closer while the pointer is on the card. */}
            <Show when={props.copy.screen ? screen() : undefined}>
                {(image) => (
                    <Link to={props.href} tabindex={-1}
                          class="relative -mx-6 -mt-6 mb-5 block overflow-clip rounded-t-lg border-b border-border">
                        <CaseImage
                            image={image()}
                            alt={props.copy.screen!}
                            sizes="(min-width: 80rem) 24rem, (min-width: 48rem) 45vw, 85vw"
                            bare
                            eager={props.eager}
                            frameClass={SETTLE}
                            class={cn(
                                "aspect-[16/9] motion-safe:transition-transform motion-safe:duration-400 motion-safe:ease-standard motion-safe:group-hover:scale-[1.03]",
                                image().height > image().width ? "object-contain" : "object-cover object-top",
                            )}
                        />
                        <Show when={image().recreation}>
                            <span
                                class="absolute bottom-2 left-2 rounded bg-bg/85 px-2 py-0.5 font-mono text-xs text-fg-muted">{props.labels.recreation}</span>
                        </Show>
                    </Link>
                )}
            </Show>
            <p class="font-mono text-xs tracking-wider text-accent uppercase">{props.copy.context}</p>
            <Dynamic component={props.headingLevel} class="mt-2 text-title text-fg">
                <Link to={props.href} class="hover:text-primary">{props.copy.name}</Link>
            </Dynamic>
            <p class="mt-1 text-sm text-fg-subtle">{formatRange(props.project.start, props.project.end ?? null, props.labels.months, props.labels.present)}</p>
            <p class="mt-3 text-fg-muted">{props.copy.summary}</p>
            <ul class="mt-4 flex-1 space-y-2 text-sm text-fg-muted">
                <For each={highlights()}>
                    {(item) => {
                        const match = () => props.role !== null && item.roles.includes(props.role);
                        return (
                            <li class={cn("flex gap-2", match() && "text-fg")}>
                                <span aria-hidden="true"
                                      class={cn("mt-2 size-1.5 shrink-0 rounded-full", props.role && !match() ? "border border-fg-subtle" : "bg-accent")}/>
                                {item.text}
                            </li>
                        );
                    }}
                </For>
            </ul>
            <TechList tech={props.project.tech} role={props.role} limit={10} class="mt-5"/>
            <div class="mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-semibold">
                <Link to={props.href}
                      class="inline-flex min-h-9 items-center gap-1.5 text-primary hover:text-primary-hover">
                    {isCaseStudy(props.project.id) ? props.labels.readCaseStudy : props.labels.readProject}
                    <ArrowRight class="size-4"/>
                </Link>
                <Show when={props.project.links.demo}>
                    {(demo) => (
                        <a href={demo()} target="_blank" rel="noopener noreferrer"
                           class="inline-flex min-h-9 items-center gap-1.5 text-primary hover:text-primary-hover">
                            {props.labels.liveDemo}
                            <ExternalLink class="size-4"/>
                        </a>
                    )}
                </Show>
                <Show when={props.project.links.code} fallback={
                    <span class="inline-flex min-h-9 items-center gap-1.5 font-normal text-fg-subtle">
                        <Lock class="size-4"/>
                        {props.labels.privateCode}
                    </span>
                }>
                    {(code) => (
                        <a href={code()} target="_blank" rel="noopener noreferrer"
                           class="inline-flex min-h-9 items-center gap-1.5 text-primary hover:text-primary-hover">
                            <GithubIcon class="size-4"/>
                            {props.labels.viewCode}
                        </a>
                    )}
                </Show>
            </div>
        </article>
    );
}
