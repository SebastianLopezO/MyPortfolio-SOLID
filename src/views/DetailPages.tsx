import {createSignal, For, type JSX, Match, Show, Switch, untrack} from "solid-js";
import {ArrowRight, ExternalLink, Lock} from "@/components/ui/icons";
import {forProfile} from "@/content/roles";
import {useDetailCopy} from "@/content/detail-copy";
import {useProjectsCopy} from "@/content/project-copy";
import {useSectionCopy} from "@/content/sections";
import {certifications} from "@/content/shared/certifications";
import {
    CERTIFICATION_SLUG,
    type DetailCollection,
    EDUCATION_SLUG,
    EXPERIENCE_SLUG,
    ORGANIZATION_SLUG
} from "@/content/shared/detail-links";
import {education} from "@/content/shared/education";
import {experience} from "@/content/shared/experience";
import {ACTIVITY_DATE, organizationActivity} from "@/content/shared/organization-activity";
import {organizations} from "@/content/shared/organizations";
import {isCaseStudy} from "@/content/shared/project-links";
import {projectImages} from "@/content/shared/projects";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {useHydrated} from "@/hooks/useHydrated";
import {useJourneyCopy} from "@/hooks/useJourneyCopy";
import {GithubIcon} from "@/components/layout/BrandIcons";
import {CaseImage, UNMASK} from "@/components/case-study/CaseImages";
import {Bullets, LinkRows, NeighborNavigation, TextSection} from "@/components/page/PageParts";
import {Timeline} from "@/components/page/Timeline";
import {Carousel} from "@/components/ui/Carousel";
import {SvgImage} from "@/components/ui/SvgImage";
import {TechExplorer} from "@/components/projects/TechExplorer";
import {MetricsContent} from "@/components/sections/MetricsSection";
import {AboutPage} from "@/views/AboutPage";
import {TechList} from "@/components/ui/TechList";
import {ToggleButton} from "@/components/ui/ToggleButton";
import {
    archiveOf,
    certificationBySlug,
    certificationsByIssuer,
    certificationsDuring,
    educationBySlug,
    experienceById,
    experienceBySlug,
    jobsAt,
    jobsOfOrganization,
    neighbors,
    organizationById,
    organizationBySlug,
    programsAt,
    programsOfOrganization,
    projectsOfExperience,
    projectsOfOrganization,
    projectsOfProgram,
    sameStop,
    testimonialsOfExperience,
} from "@/lib/details";
import {formatDay, formatDuration, formatRange, formatYearMonth, monthsBetween} from "@/lib/format";
import {withBase} from "@/lib/base";
import {prioritize} from "@/lib/role-view";
import {BUILD_DATE} from "@/content/shared/site";
import {cn} from "@/lib/utils";
import {Link} from "@/routes/Router";
import type {CertificationFacts, EducationFacts, OrganizationId, TestimonialFacts, WorkRef,} from "@/types/content";
import type {ProgramCopy, PublishedSource} from "@/types/detail";
import type {ProjectFacts, ProjectId, ProjectPageId} from "@/types/project";
import type {Art} from "@/content/shared/page-art";
import {EDUCATION_ART, EXPERIENCE_ART, ORGANIZATION_ART} from "@/content/shared/page-art";
import type {TimelineItem} from "@/types/timeline";
import {
    countOf,
    DetailArticle,
    fill,
    Glance,
    IndexHeader,
    Paragraphs,
    ProjectTiles,
    useLinks,
    useNumbers
} from "@/views/detail-kit";
import {ReasonPage, ReasonsIndex, ServicePage, ServicesIndex} from "@/views/OfferPages";
import {SkillPage, SkillsIndex} from "@/views/SkillPages";

/** Fills a template and puts a node where `{slot}` was, such as the large figure in "{mine} of {people} commits". */
function Filled(props: {
    template: string;
    slot: string;
    node: JSX.Element;
    values: Record<string, string | number>
}) {
    const parts = () => props.template.split(`{${props.slot}}`);
    return (
        <>
            {fill(parts()[0], props.values)}
            {props.node}
            {fill(parts()[1] ?? "", props.values)}
        </>
    );
}

/** A program is still running until its graduation, or until the end of its last year when it has none. */
const inProgress = (program: EducationFacts) =>
    program.graduation ? BUILD_DATE.slice(0, 7) < program.graduation : program.end >= Number(BUILD_DATE.slice(0, 4));

/** A project's one-line tagline, from its case study or its page, under its entry in a timeline. */
function useTaglines() {
    const {cases: {items: cases}, pages} = useProjectsCopy();
    return (id: ProjectId) => (isCaseStudy(id) ? cases[id].tagline : pages.items[id as ProjectPageId].tagline);
}

/** The steps told by hand, which the facts cannot date by themselves. */
const milestones = (entries: { date: string; text: string }[]): TimelineItem[] =>
    entries.map((entry) => ({...entry, kind: "milestone"}));

/** The page an institution or a company publishes about itself, which a section draws on. */
function SourceLink(props: { source: PublishedSource }) {
    return (
        <a href={props.source.href} target="_blank" rel="noopener noreferrer"
           class="mt-4 inline-flex min-h-9 items-center gap-1.5 font-semibold text-primary hover:text-primary-hover">
            {props.source.label}
            <ExternalLink class="size-4"/>
        </a>
    );
}

/** A program's semesters, modules or competencies, one card each: a slider on phones, a grid from 48rem. */
function Curriculum(props: { terms: ProgramCopy["curriculum"] }) {
    const {ui} = useDetailCopy();
    return (
        <Carousel
            previousLabel={ui.curriculumSlider.previous}
            nextLabel={ui.curriculumSlider.next}
            slideClass="flex basis-[85%] sm:basis-[calc((100%-1.25rem)/2)] md:basis-auto"
            trackClass="md:grid md:snap-none md:grid-cols-2 md:overflow-visible"
            controlsClass="md:hidden"
            items={props.terms}
        >
            {(term) => (
                <div class="w-full rounded-lg border border-border bg-surface p-5">
                    <h3 class="font-semibold text-fg">{term.term}</h3>
                    <ul class="mt-3 space-y-1.5 text-sm text-fg-muted">
                        <For each={term.items}>{(item) => <li>{item}</li>}</For>
                    </ul>
                </div>
            )}
        </Carousel>
    );
}

/** What an institution publishes about a program: its facts, the profile of its graduates and its curriculum. */
function ProgramSections(props: { program: ProgramCopy }) {
    const {ui} = useDetailCopy();
    return (
        <>
            <TextSection id="detail-program" title={ui.sections.program}>
                <dl class="grid border-b border-border sm:grid-cols-2 sm:gap-x-10">
                    <For each={props.program.facts}>
                        {(fact) => (
                            <div class="border-t border-border py-4">
                                <dt class="text-sm text-fg-subtle">{fact.label}</dt>
                                <dd class="mt-1 text-fg">{fact.value}</dd>
                            </div>
                        )}
                    </For>
                </dl>
                <SourceLink source={props.program.source}/>
            </TextSection>
            <Show when={props.program.profile}>
                {(profile) => (
                    <TextSection id="detail-profile" title={ui.sections.profile}>
                        <p class="max-w-[68ch] text-lg text-fg-muted">{profile().text}</p>
                        <Show when={profile().items.length > 0}>
                            <div class="mt-5 max-w-[68ch]"><Bullets items={profile().items}/></div>
                        </Show>
                    </TextSection>
                )}
            </Show>
            <Show when={props.program.curriculum.length > 0}>
                <TextSection id="detail-curriculum" title={ui.sections.curriculum}>
                    <Curriculum terms={props.program.curriculum}/>
                </TextSection>
            </Show>
        </>
    );
}

/** The sections a program's page adds to the index when the institution publishes the program. */
const programSections = (program: ProgramCopy | undefined, ui: {
    program: string;
    profile: string;
    curriculum: string
}) =>
    program
        ? [
            {id: "detail-program", title: ui.program},
            ...(program.profile ? [{id: "detail-profile", title: ui.profile}] : []),
            ...(program.curriculum.length > 0 ? [{id: "detail-curriculum", title: ui.curriculum}] : []),
        ]
        : [];

/** The main screen of each project that has one, linked to its page; recreated screens say so under the name. */
function ProjectScreens(props: { items: ProjectFacts[] }) {
    const {cases: {ui, items: cases}, pages} = useProjectsCopy();
    const cards = useSectionCopy("projects");
    const links = useLinks();
    const screens = () => {
        const perProject = props.items.length === 1 ? 4 : 1;
        return props.items.flatMap((project) => {
            const images = projectImages(project).slice(0, perProject);
            const alts = isCaseStudy(project.id) ? cases[project.id].images : pages.items[project.id as ProjectPageId].images;
            return images.map((image) => ({project, image, alt: alts[image.id]}));
        });
    };
    return (
        <Show when={screens().length > 0}>
            {/* One screen per view on phones, two across from 48rem, like the other rows of cards. */}
            <div>
                <Carousel
                    previousLabel={cards.slider.previous}
                    nextLabel={cards.slider.next}
                    slideClass="flex basis-[85%] sm:basis-[calc((100%-1.25rem)/2)] md:basis-auto"
                    trackClass="md:grid md:snap-none md:grid-cols-2 md:overflow-visible"
                    controlsClass="md:hidden"
                    items={screens()}
                >
                    {(screen) => (
                        <Link to={links.project(screen.project.id)} class="group block w-full">
                            <CaseImage
                                image={screen.image}
                                alt={screen.alt}
                                frameClass={UNMASK}
                                sizes="(min-width: 80rem) 25rem, (min-width: 48rem) 45vw, 85vw"
                                class={cn("aspect-[16/10] group-hover:border-primary", screen.image.height > screen.image.width ? "object-contain" : "object-cover object-top")}
                            />
                            <span
                                class="mt-2 block font-semibold text-fg group-hover:text-primary">{cards.items[screen.project.id].name}</span>
                            <Show when={screen.image.recreation}>
                                <span class="block text-xs text-fg-subtle">{ui.recreation}</span>
                            </Show>
                        </Link>
                    )}
                </Carousel>
            </div>
        </Show>
    );
}

/** The projects as tiles; a single project also shows several of its screens. */
function ProjectsBlock(props: { items: ProjectFacts[] }) {
    return (
        <>
            <ProjectTiles items={props.items}/>
            <Show when={props.items.length === 1}>
                <div class="mt-6">
                    <ProjectScreens items={props.items}/>
                </div>
            </Show>
        </>
    );
}

function Recommendations(props: { items: TestimonialFacts[] }) {
    const {content: {ui}} = useLanguage();
    const copy = useSectionCopy("testimonials");
    return (
        // One recommendation per view on phones and two from 40rem, like the slider of the home page.
        <Carousel
            previousLabel={copy.previous}
            nextLabel={copy.next}
            slideClass="flex basis-[85%] sm:basis-[calc((100%-1.25rem)/2)] md:basis-auto"
            trackClass="md:grid md:snap-none md:grid-cols-2 md:overflow-visible"
            controlsClass="md:hidden"
            items={props.items}
        >
            {(item) => {
                const local = copy.items[item.id];
                return (
                    <figure class="flex w-full flex-col rounded-lg border border-border bg-surface p-6">
                        <blockquote class="flex-1 text-fg-muted" lang={local.quote ? undefined : "es"}>
                            <p>“{local.quote ?? item.quote}”</p>
                        </blockquote>
                        <Show when={local.quote && copy.translatedNote}>
                            <details class="mt-3 text-sm">
                                <summary class="cursor-pointer text-fg-subtle">
                                    {copy.translatedNote} · {copy.showOriginal}
                                </summary>
                                <p lang="es" class="mt-2 text-fg-subtle">“{item.quote}”</p>
                            </details>
                        </Show>
                        <figcaption class="mt-5 border-t border-border pt-4">
                            <p class="font-semibold text-fg">{item.author}</p>
                            <p class="text-sm text-fg-muted">{local.role} · {local.context}</p>
                            <p class="mt-1 text-xs text-fg-subtle">
                                {copy.relationships[item.relationship]} · {formatYearMonth(item.date, ui.months)}
                            </p>
                        </figcaption>
                    </figure>
                );
            }}
        </Carousel>
    );
}

/** Sebastián's commits in an organization: the total, the share, the repositories and a bar per year. */
function Activity(props: { id: OrganizationId; withLink?: boolean }) {
    const {content} = useLanguage();
    const {ui} = useDetailCopy();
    const links = useLinks();
    const numbers = useNumbers();
    // A page shows the activity of one organization for its whole life.
    // eslint-disable-next-line solid/reactivity
    const {id} = props;
    const activity = organizationActivity[id];
    const organization = organizationById(id);
    const years = Object.entries(activity.years).map(([year, commits]) => ({year, commits: commits ?? 0}));
    const busiest = Math.max(...years.map((entry) => entry.commits));

    return (
        <div>
            <p class="text-lg text-fg">
                <Filled
                    template={ui.activity.commits}
                    slot="mine"
                    node={<span class="font-display text-3xl text-primary">{numbers.integer(activity.mine)}</span>}
                    values={{people: numbers.integer(activity.people)}}
                />
            </p>
            <p class="mt-1 text-fg-muted">
                {fill(ui.activity.share, {percent: numbers.percent(activity.mine / activity.people)})} ·{" "}
                {fill(ui.activity.repositories, {count: activity.withMine, total: activity.repositories})}
            </p>
            <h3 class="mt-6 text-sm font-semibold text-fg">{ui.activity.byYear}</h3>
            <dl class="mt-3 grid gap-2">
                <For each={years}>{({year, commits}) => (
                    <div class="grid grid-cols-[3rem_minmax(0,1fr)_4.5rem] items-center gap-3 text-sm">
                        <dt class="font-mono text-xs text-fg-subtle">{year}</dt>
                        <div aria-hidden="true" class="h-2.5 rounded-full bg-surface-raised">
                            <div class="bar-grow h-full origin-left rounded-full bg-chart-1"
                                 style={{width: `${Math.max(2, (commits / busiest) * 100)}%`}}/>
                        </div>
                        <dd class="text-right font-mono text-xs text-fg">{numbers.integer(commits)}</dd>
                    </div>
                )}</For>
            </dl>
            <p class="mt-4 max-w-[68ch] text-sm text-fg-subtle">{fill(ui.activity.note, {date: formatDay(ACTIVITY_DATE, content.locale)})}</p>
            <Show when={props.withLink}>
                <Link to={links.detail("organizations", ORGANIZATION_SLUG[id])}
                      class="mt-3 inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover">
                    <GithubIcon class="size-4"/>
                    <span translate="no">{organization.name}</span>
                    <ArrowRight class="size-4"/>
                </Link>
            </Show>
        </div>
    );
}

function Chips(props: { items: string[] }) {
    return (
        <ul class="flex flex-wrap gap-1.5">
            <For each={props.items}>
                {(item) => <li class="rounded border border-border px-2 py-0.5 text-sm text-fg-muted">{item}</li>}
            </For>
        </ul>
    );
}

function ExperiencePage(props: { slug: string }) {
    // The route mounts a new page for every slug.
    // eslint-disable-next-line solid/reactivity
    const {slug} = props;
    const {lang, content: {ui: siteUi}} = useLanguage();
    const {role} = useRole();
    const {ui, experience: pages} = useDetailCopy();
    const jobs = useSectionCopy("experience");
    const cards = useSectionCopy("projects");
    const journey = useJourneyCopy();
    const links = useLinks();
    const facts = experienceBySlug(slug)!;
    const item = jobs.items[facts.id];
    const page = pages[facts.id];
    const short = journey.milestones[facts.id].short ?? facts.company;
    const projectsHere = projectsOfExperience(facts.id);
    const quotes = testimonialsOfExperience(facts.id);
    const studied = certificationsDuring(facts.start, facts.end);
    const bullets = () => prioritize(item.bullets, (bullet) => bullet.roles, role());
    const index = experience.findIndex((job) => job.id === facts.id);
    const {previous, next} = neighbors(experience, index);
    const taglineOf = useTaglines();

    const timeline = (): TimelineItem[] => [
        {
            date: facts.start,
            kind: "job",
            text: fill(ui.events.joined, {company: short, title: page.positions[0].title})
        },
        ...page.positions.slice(1).map((position): TimelineItem => ({
            date: position.start,
            kind: "job",
            text: fill(ui.events.position, {title: position.title})
        })),
        ...projectsHere.map((project): TimelineItem => ({
            date: project.start,
            kind: "project",
            text: fill(ui.events.project, {name: cards.items[project.id].name}),
            to: links.project(project.id),
            note: taglineOf(project.id),
        })),
        ...quotes.map((quote): TimelineItem => ({
            date: quote.date,
            kind: "recommendation",
            text: fill(ui.events.recommendation, {author: quote.author})
        })),
        ...studied.map((certification): TimelineItem => ({
            date: certification.date,
            kind: "certification",
            text: fill(ui.events.certification, {title: certification.title}),
            to: links.detail("certifications", CERTIFICATION_SLUG[certification.id]),
            note: certification.issuer,
        })),
        ...milestones(page.timeline),
        ...(facts.end ? [{date: facts.end, kind: "job" as const, text: fill(ui.events.left, {company: short})}] : []),
    ];
    const sections = [
        {id: "detail-overview", title: ui.sections.overview},
        ...(page.company ? [{id: "detail-company", title: ui.sections.company}] : []),
        {id: "detail-positions", title: ui.sections.positions},
        {id: "detail-achievements", title: ui.sections.achievements},
        {id: "detail-timeline", title: ui.sections.timeline},
        ...(projectsHere.length > 0 ? [{id: "detail-projects", title: ui.sections.projects}] : []),
        ...(quotes.length > 0 ? [{id: "detail-recommendations", title: ui.sections.recommendations}] : []),
        ...(studied.length > 0 ? [{id: "detail-meanwhile", title: ui.sections.meanwhile}] : []),
        ...(facts.organization ? [{id: "detail-activity", title: ui.sections.activity}] : []),
        {id: "detail-stack", title: ui.sections.stack},
    ];
    const place = [facts.location, siteUi.workMode[facts.workMode], facts.employment && siteUi.employment[facts.employment]].filter(Boolean).join(" · ");

    return (
        <DetailArticle
            collection="experience"
            title={facts.company}
            art={EXPERIENCE_ART[facts.id]}
            subtitle={item.title}
            lead={page.tagline}
            sections={sections}
            glance={
                <Glance
                    items={[
                        {label: ui.facts.title, value: <span class="font-semibold">{item.title}</span>},
                        {
                            label: ui.facts.period,
                            value: `${formatRange(facts.start, facts.end, siteUi.months, siteUi.present)} · ${formatDuration(monthsBetween(facts.start, facts.end), lang)}`
                        },
                        {label: ui.facts.place, value: place},
                        {label: ui.facts.status, value: facts.end === null ? ui.status.current : ui.status.finished},
                        ...(facts.organization
                            ? [{
                                label: ui.facts.organization,
                                value: (
                                    <Link to={links.detail("organizations", ORGANIZATION_SLUG[facts.organization])}
                                          translate="no"
                                          class="font-semibold text-primary hover:text-primary-hover">
                                        {organizationById(facts.organization).name}
                                    </Link>
                                ),
                            }]
                            : []),
                    ]}
                >
                    <p class="text-fg-muted">
                        {countOf(ui.counts.projects, projectsHere.length)} · {countOf(ui.counts.recommendations, quotes.length)}
                    </p>
                </Glance>
            }
            navigation={
                <NeighborNavigation
                    label={ui.all.experience}
                    previous={{to: links.detail("experience", EXPERIENCE_SLUG[previous.id]), label: previous.company}}
                    next={{to: links.detail("experience", EXPERIENCE_SLUG[next.id]), label: next.company}}
                    previousLabel={ui.actions.previous}
                    nextLabel={ui.actions.next}
                    all={{to: links.detail("experience"), label: ui.all.experience}}
                />
            }
        >
            <TextSection id="detail-overview" title={ui.sections.overview}>
                {/* The intro already tells the general story; a role view leads with what the job means for that role. */}
                <Paragraphs lead={role() ? forProfile(item.summary, role()) : undefined} items={page.intro}/>
            </TextSection>
            <Show when={page.company}>
                {(company) => (
                    <TextSection id="detail-company" title={ui.sections.company}>
                        <Paragraphs items={company().text}/>
                        <SourceLink source={company().source}/>
                    </TextSection>
                )}
            </Show>
            <TextSection id="detail-positions" title={ui.sections.positions}>
                <ol class="divide-y divide-border">
                    <For each={page.positions}>
                        {(position) => (
                            <li class="py-5 first:pt-0 last:pb-0">
                                <p class="font-mono text-xs text-fg-subtle">{formatRange(position.start, position.end, siteUi.months, siteUi.present)}</p>
                                <h3 class="mt-1 font-semibold text-fg">{position.title}</h3>
                                <p class="mt-2 text-fg-muted">{position.text}</p>
                            </li>
                        )}
                    </For>
                </ol>
            </TextSection>
            <TextSection id="detail-achievements" title={ui.sections.achievements}>
                <ul class="space-y-3 text-fg-muted">
                    <For each={bullets()}>
                        {(bullet) => {
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
                        }}
                    </For>
                </ul>
            </TextSection>
            <TextSection id="detail-timeline" title={ui.sections.timeline}>
                <Timeline items={timeline()} labels={ui.timeline}/>
            </TextSection>
            <Show when={projectsHere.length > 0}>
                <TextSection id="detail-projects" title={ui.sections.projects}>
                    <ProjectsBlock items={projectsHere}/>
                </TextSection>
            </Show>
            <Show when={quotes.length > 0}>
                <TextSection id="detail-recommendations" title={ui.sections.recommendations}>
                    <Recommendations items={quotes}/>
                </TextSection>
            </Show>
            <Show when={studied.length > 0}>
                <TextSection id="detail-meanwhile" title={ui.sections.meanwhile}>
                    <LinkRows
                        items={studied.map((certification) => ({
                            key: certification.id,
                            to: links.detail("certifications", CERTIFICATION_SLUG[certification.id]),
                            label: `${formatYearMonth(certification.date, siteUi.months)} · ${certification.issuer}`,
                            name: certification.title,
                        }))}
                    />
                </TextSection>
            </Show>
            <Show when={facts.organization}>
                {(organization) => (
                    <TextSection id="detail-activity" title={ui.sections.activity}>
                        <Activity id={organization()} withLink/>
                    </TextSection>
                )}
            </Show>
            <TextSection id="detail-stack" title={ui.sections.stack}>
                <TechExplorer tech={facts.tech} role={role()} first={projectsHere.map((project) => project.id)}/>
            </TextSection>
        </DetailArticle>
    );
}

function EducationPage(props: { slug: string }) {
    // The route mounts a new page for every slug.
    // eslint-disable-next-line solid/reactivity
    const {slug} = props;
    const {content: {ui: siteUi}} = useLanguage();
    const {ui, education: pages} = useDetailCopy();
    const about = useSectionCopy("about");
    const cards = useSectionCopy("projects");
    const links = useLinks();
    const facts = educationBySlug(slug)!;
    const program = about.education[facts.id];
    const page = pages[facts.id];
    const projectsHere = projectsOfProgram(facts.id);
    const running = inProgress(facts);
    const index = education.findIndex((item) => item.id === facts.id);
    const {previous, next} = neighbors(education, index);
    const taglineOf = useTaglines();

    const timeline = (): TimelineItem[] => [
        {date: String(facts.start), kind: "program", text: fill(ui.events.programStart, {degree: program.degree})},
        ...projectsHere.map((project): TimelineItem => ({
            date: project.start,
            kind: "project",
            text: fill(ui.events.project, {name: cards.items[project.id].name}),
            to: links.project(project.id),
            note: taglineOf(project.id),
        })),
        ...milestones(page.timeline),
        ...(facts.graduation ? [{date: facts.graduation, kind: "program" as const, text: ui.events.graduation}] : []),
        ...(!running && !facts.graduation ? [{
            date: String(facts.end),
            kind: "program" as const,
            text: fill(ui.events.programEnd, {degree: program.degree})
        }] : []),
    ];
    const sections = [
        {id: "detail-overview", title: ui.sections.overview},
        ...programSections(page.program, ui.sections),
        ...(page.areas.length > 0 ? [{id: "detail-areas", title: ui.sections.areas}] : []),
        ...(page.courses.length > 0 ? [{id: "detail-courses", title: ui.sections.courses}] : []),
        {id: "detail-skills", title: ui.sections.skills},
        ...(projectsHere.length > 0 ? [{id: "detail-projects", title: ui.sections.projects}] : []),
        {id: "detail-timeline", title: ui.sections.timeline},
        ...(facts.organizationId ? [{id: "detail-activity", title: ui.sections.activity}] : []),
    ];

    return (
        <DetailArticle
            collection="education"
            title={program.degree}
            art={EDUCATION_ART[facts.id]}
            subtitle={facts.school}
            lead={page.tagline}
            sections={sections}
            glance={
                <Glance
                    items={[
                        {label: ui.facts.program, value: <span class="font-semibold">{program.degree}</span>},
                        {label: ui.facts.school, value: facts.school},
                        {
                            label: ui.facts.period,
                            value: facts.start === facts.end ? String(facts.start) : `${facts.start} – ${facts.end}`
                        },
                        {label: ui.facts.status, value: running ? ui.status.inProgress : ui.status.finished},
                        ...(facts.graduation ? [{
                            label: ui.facts.graduation,
                            value: formatYearMonth(facts.graduation, siteUi.months)
                        }] : []),
                        ...(facts.organizationId
                            ? [{
                                label: ui.facts.organization,
                                value: (
                                    <Link to={links.detail("organizations", ORGANIZATION_SLUG[facts.organizationId])}
                                          translate="no"
                                          class="font-semibold text-primary hover:text-primary-hover">
                                        {organizationById(facts.organizationId).name}
                                    </Link>
                                ),
                            }]
                            : []),
                    ]}
                >
                    <Show when={facts.url}>
                        <a href={facts.url} target="_blank" rel="noopener noreferrer"
                           class="inline-flex min-h-9 items-center gap-1.5 font-semibold text-primary hover:text-primary-hover">
                            {about.courseworkLink}
                            <ExternalLink class="size-4"/>
                        </a>
                    </Show>
                </Glance>
            }
            navigation={
                <NeighborNavigation
                    label={ui.all.education}
                    previous={{
                        to: links.detail("education", EDUCATION_SLUG[previous.id]),
                        label: about.education[previous.id].degree
                    }}
                    next={{
                        to: links.detail("education", EDUCATION_SLUG[next.id]),
                        label: about.education[next.id].degree
                    }}
                    previousLabel={ui.actions.previous}
                    nextLabel={ui.actions.next}
                    all={{to: links.detail("education"), label: ui.all.education}}
                />
            }
        >
            <TextSection id="detail-overview" title={ui.sections.overview}>
                <Paragraphs items={page.intro}/>
            </TextSection>
            <Show when={page.program}>{(published) => <ProgramSections program={published()}/>}</Show>
            <Show when={page.areas.length > 0}>
                <TextSection id="detail-areas" title={ui.sections.areas}>
                    <dl class="grid border-b border-border md:grid-cols-2 md:gap-x-10">
                        <For each={page.areas}>
                            {(area) => (
                                <div class="border-t border-border py-5">
                                    <dt class="font-semibold text-fg">{area.title}</dt>
                                    <dd class="mt-1 text-fg-muted">{area.text}</dd>
                                </div>
                            )}
                        </For>
                    </dl>
                </TextSection>
            </Show>
            <Show when={page.courses.length > 0}>
                <TextSection id="detail-courses" title={ui.sections.courses}>
                    <ul class="grid gap-x-8 gap-y-2 text-fg-muted sm:grid-cols-2 lg:grid-cols-3">
                        <For each={page.courses}>
                            {(course) => (
                                <li class="flex gap-3">
                                    <span aria-hidden="true" class="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary"/>
                                    {course}
                                </li>
                            )}
                        </For>
                    </ul>
                </TextSection>
            </Show>
            <TextSection id="detail-skills" title={ui.sections.skills}>
                <Chips items={program.skills}/>
            </TextSection>
            <Show when={projectsHere.length > 0}>
                <TextSection id="detail-projects" title={ui.sections.projects}>
                    <ProjectsBlock items={projectsHere}/>
                </TextSection>
            </Show>
            <TextSection id="detail-timeline" title={ui.sections.timeline}>
                <Timeline items={timeline()} labels={ui.timeline}/>
            </TextSection>
            <Show when={facts.organizationId}>
                {(organization) => (
                    <TextSection id="detail-activity" title={ui.sections.activity}>
                        <Activity id={organization()} withLink/>
                    </TextSection>
                )}
            </Show>
        </DetailArticle>
    );
}

function CertificationPage(props: { slug: string }) {
    // The route mounts a new page for every slug.
    // eslint-disable-next-line solid/reactivity
    const {slug} = props;
    const {content: {ui: siteUi}} = useLanguage();
    const {role} = useRole();
    const {ui, issuers} = useDetailCopy();
    const copy = useSectionCopy("certifications");
    const about = useSectionCopy("about");
    const cards = useSectionCopy("projects");
    const journey = useJourneyCopy();
    const links = useLinks();
    const numbers = useNumbers();
    const facts = certificationBySlug(slug)!;
    const text = copy.items[facts.id];
    const issuer = issuers[facts.issuerId];
    const jobs = jobsAt(facts.date);
    const programs = programsAt(facts.date);
    const siblings = sameStop(facts);
    const index = certifications.findIndex((item) => item.id === facts.id);
    const {previous, next} = neighbors(certifications, index);

    const workLink = (ref: WorkRef) =>
        ref.kind === "project"
            ? {
                key: ref.id,
                to: links.project(ref.id),
                label: ui.workKinds.project,
                name: cards.items[ref.id].name,
                text: cards.items[ref.id].context
            }
            : {
                key: ref.id,
                to: links.detail("experience", EXPERIENCE_SLUG[ref.id]),
                label: ui.workKinds.experience,
                name: experienceById(ref.id).company
            };
    const sections = [
        {id: "detail-earned", title: ui.sections.earned},
        {id: "detail-learned", title: ui.sections.learned},
        ...(text.built ? [{id: "detail-built", title: ui.sections.built}] : []),
        {id: "detail-adds", title: ui.sections.adds},
        ...(facts.applied.length > 0 ? [{id: "detail-applied", title: ui.sections.applied}] : []),
        ...(jobs.length + programs.length > 0 ? [{id: "detail-context", title: ui.sections.context}] : []),
        {id: "detail-issuer", title: ui.sections.issuer},
        ...(siblings.length > 0 ? [{id: "detail-same-stop", title: ui.sections.sameStop}] : []),
        {id: "detail-stack", title: ui.sections.stack},
    ];

    return (
        <DetailArticle
            collection="certifications"
            title={facts.title}
            subtitle={`${facts.issuer} · ${formatYearMonth(facts.date, siteUi.months)}`}
            sections={sections}
            glance={
                <Glance
                    items={[
                        {label: ui.facts.issuer, value: <span class="font-semibold">{facts.issuer}</span>},
                        {label: ui.facts.date, value: formatYearMonth(facts.date, siteUi.months)},
                        ...(facts.hours ? [{
                            label: ui.facts.duration,
                            value: fill(ui.hours, {hours: numbers.integer(facts.hours)})
                        }] : []),
                        {label: ui.facts.stop, value: journey.milestones[facts.milestone].title},
                    ]}
                >
                    <Show when={facts.url}>
                        <a
                            href={facts.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex h-11 w-fit items-center gap-2 rounded-full bg-primary px-5 font-semibold text-on-primary hover:bg-primary-hover"
                        >
                            {ui.actions.credential}
                            <ExternalLink class="size-4"/>
                        </a>
                    </Show>
                </Glance>
            }
            navigation={
                <NeighborNavigation
                    label={ui.all.certifications}
                    previous={{
                        to: links.detail("certifications", CERTIFICATION_SLUG[previous.id]),
                        label: previous.title
                    }}
                    next={{to: links.detail("certifications", CERTIFICATION_SLUG[next.id]), label: next.title}}
                    previousLabel={ui.actions.previous}
                    nextLabel={ui.actions.next}
                    all={{to: links.detail("certifications"), label: ui.all.certifications}}
                />
            }
        >
            <TextSection id="detail-earned" title={ui.sections.earned}>
                <p class="max-w-[68ch] text-lg text-fg-muted">{text.earned}</p>
            </TextSection>
            <TextSection id="detail-learned" title={ui.sections.learned}>
                <p class="max-w-[68ch] text-lg text-fg">{text.learned}</p>
                <Show when={text.topics}>
                    {(topics) => <div class="mt-5 max-w-[68ch]"><Bullets items={topics()}/></div>}
                </Show>
            </TextSection>
            <Show when={text.built}>
                <TextSection id="detail-built" title={ui.sections.built}>
                    <p class="max-w-[68ch] text-lg text-fg-muted">{text.built}</p>
                    <Show when={facts.repository}>
                        <a href={facts.repository} target="_blank" rel="noopener noreferrer"
                           class="mt-4 inline-flex min-h-9 items-center gap-1.5 font-semibold text-primary hover:text-primary-hover">
                            <GithubIcon class="size-4"/>
                            {ui.actions.openRepository}
                        </a>
                    </Show>
                </TextSection>
            </Show>
            <TextSection id="detail-adds" title={ui.sections.adds}>
                <p class="max-w-[68ch] text-lg text-fg">{text.adds}</p>
            </TextSection>
            <Show when={facts.applied.length > 0}>
                <TextSection id="detail-applied" title={ui.sections.applied}>
                    <LinkRows items={facts.applied.map(workLink)}/>
                </TextSection>
            </Show>
            <Show when={jobs.length + programs.length > 0}>
                <TextSection id="detail-context" title={ui.sections.context}>
                    <p class="mb-4 max-w-[68ch] text-fg-muted">{ui.contextIntro}</p>
                    <LinkRows
                        items={[
                            ...jobs.map((job) => ({
                                key: job.id,
                                to: links.detail("experience", EXPERIENCE_SLUG[job.id]),
                                label: formatRange(job.start, job.end, siteUi.months, siteUi.present),
                                name: job.company,
                            })),
                            ...programs.map((program) => ({
                                key: program.id,
                                to: links.detail("education", EDUCATION_SLUG[program.id]),
                                label: program.start === program.end ? String(program.start) : `${program.start} – ${program.end}`,
                                name: about.education[program.id].degree,
                                text: program.school,
                            })),
                        ]}
                    />
                </TextSection>
            </Show>
            <TextSection id="detail-issuer" title={ui.sections.issuer}>
                <h3 class="font-semibold text-fg">{issuer.name}</h3>
                <p class="mt-2 max-w-[68ch] text-fg-muted">{issuer.text}</p>
            </TextSection>
            <Show when={siblings.length > 0}>
                <TextSection id="detail-same-stop" title={ui.sections.sameStop}>
                    <p class="mb-4 text-fg-muted">{journey.milestones[facts.milestone].title}</p>
                    <LinkRows
                        items={siblings.map((item) => ({
                            key: item.id,
                            to: links.detail("certifications", CERTIFICATION_SLUG[item.id]),
                            label: `${formatYearMonth(item.date, siteUi.months)} · ${item.issuer}`,
                            name: item.title,
                        }))}
                    />
                </TextSection>
            </Show>
            <TextSection id="detail-stack" title={ui.sections.stack}>
                <TechList tech={facts.tech} role={role()}/>
            </TextSection>
        </DetailArticle>
    );
}

function OrganizationPage(props: { slug: string }) {
    // The route mounts a new page for every slug.
    // eslint-disable-next-line solid/reactivity
    const {slug} = props;
    const {lang, content: {ui: siteUi}} = useLanguage();
    const {ui, organizations: pages, experience: jobPages} = useDetailCopy();
    const cards = useSectionCopy("projects");
    const about = useSectionCopy("about");
    const journey = useJourneyCopy();
    const links = useLinks();
    const numbers = useNumbers();
    const facts = organizationBySlug(slug)!;
    const page = pages[facts.id];
    const projectsHere = projectsOfOrganization(facts.id);
    const jobsHere = jobsOfOrganization(facts.id);
    const programsHere = programsOfOrganization(facts.id);
    const repositories = archiveOf(facts);
    const index = organizations.findIndex((item) => item.id === facts.id);
    const {previous, next} = neighbors(organizations, index);
    const taglineOf = useTaglines();

    const timeline = (): TimelineItem[] => [
        ...jobsHere.flatMap((job): TimelineItem[] => [
            {
                date: job.start,
                kind: "job",
                text: fill(ui.events.joined, {
                    company: journey.milestones[job.id].short ?? job.company,
                    title: jobPages[job.id].positions[0].title
                }),
                to: links.detail("experience", EXPERIENCE_SLUG[job.id]),
            },
            ...(job.end ? [{
                date: job.end,
                kind: "job" as const,
                text: fill(ui.events.left, {company: journey.milestones[job.id].short ?? job.company})
            }] : []),
        ]),
        ...programsHere.map((program): TimelineItem => ({
            date: String(program.start),
            kind: "program",
            text: fill(ui.events.programStart, {degree: about.education[program.id].degree}),
            to: links.detail("education", EDUCATION_SLUG[program.id]),
        })),
        ...projectsHere.map((project): TimelineItem => ({
            date: project.start,
            kind: "project",
            text: fill(ui.events.project, {name: cards.items[project.id].name}),
            to: links.project(project.id),
            note: taglineOf(project.id),
        })),
        ...milestones(page.timeline),
    ];
    const related = () => [
        ...jobsHere.map((job) => ({
            key: job.id,
            to: links.detail("experience", EXPERIENCE_SLUG[job.id]),
            label: formatRange(job.start, job.end, siteUi.months, siteUi.present),
            name: job.company,
        })),
        ...programsHere.map((program) => ({
            key: program.id,
            to: links.detail("education", EDUCATION_SLUG[program.id]),
            label: program.start === program.end ? String(program.start) : `${program.start} – ${program.end}`,
            name: about.education[program.id].degree,
            text: program.school,
        })),
    ];
    // The links in these lists follow the role view; how many entries they hold does not.
    const hasRelated = untrack(related).length > 0;
    const hasTimeline = untrack(timeline).length > 1;
    const sections = [
        {id: "detail-overview", title: ui.sections.overview},
        {id: "detail-role", title: ui.sections.role},
        {id: "detail-activity", title: ui.sections.activity},
        ...(projectsHere.length > 0 ? [{id: "detail-projects", title: ui.sections.projects}] : []),
        ...(hasRelated ? [{id: "detail-related", title: ui.sections.related}] : []),
        ...(hasTimeline ? [{id: "detail-timeline", title: ui.sections.timeline}] : []),
        ...(repositories.length > 0 ? [{id: "detail-repositories", title: ui.sections.repositories}] : []),
        ...(facts.metricsImage ? [{id: "detail-metrics", title: ui.sections.metrics}] : []),
    ];

    return (
        <DetailArticle
            collection="organizations"
            title={facts.name}
            keepTitle
            art={ORGANIZATION_ART[facts.id]}
            subtitle={page.tagline}
            lead={cards.organizations[facts.id]}
            sections={sections}
            glance={
                <Glance
                    items={[
                        {
                            label: ui.facts.visibility,
                            value: facts.visibility === "private" ? ui.visibility.private : ui.visibility.public
                        },
                        {
                            label: ui.facts.repositories,
                            value: numbers.integer(organizationActivity[facts.id].repositories)
                        },
                        ...(facts.members ? [{label: ui.facts.members, value: String(facts.members)}] : []),
                    ]}
                >
                    <Show when={facts.visibility === "public"} fallback={
                        <p class="inline-flex items-center gap-2 text-fg-subtle">
                            <Lock class="size-4"/>
                            {ui.privateCode}
                        </p>
                    }>
                        <a href={facts.url} target="_blank" rel="noopener noreferrer"
                           class="inline-flex min-h-9 items-center gap-1.5 font-semibold text-primary hover:text-primary-hover">
                            <GithubIcon class="size-4"/>
                            {ui.actions.openOrganization}
                        </a>
                    </Show>
                </Glance>
            }
            navigation={
                <NeighborNavigation
                    label={ui.all.organizations}
                    previous={{to: links.detail("organizations", ORGANIZATION_SLUG[previous.id]), label: previous.name}}
                    next={{to: links.detail("organizations", ORGANIZATION_SLUG[next.id]), label: next.name}}
                    previousLabel={ui.actions.previous}
                    nextLabel={ui.actions.next}
                    all={{to: links.detail("organizations"), label: ui.all.organizations}}
                />
            }
        >
            <TextSection id="detail-overview" title={ui.sections.overview}>
                <Paragraphs items={page.intro}/>
            </TextSection>
            <TextSection id="detail-role" title={ui.sections.role}>
                <p class="max-w-[68ch] text-lg text-fg">{page.role}</p>
            </TextSection>
            <TextSection id="detail-activity" title={ui.sections.activity}>
                <Activity id={facts.id}/>
            </TextSection>
            <Show when={projectsHere.length > 0}>
                <TextSection id="detail-projects" title={ui.sections.projects}>
                    <ProjectsBlock items={projectsHere}/>
                </TextSection>
            </Show>
            <Show when={hasRelated}>
                <TextSection id="detail-related" title={ui.sections.related}>
                    <LinkRows items={related()}/>
                </TextSection>
            </Show>
            <Show when={hasTimeline}>
                <TextSection id="detail-timeline" title={ui.sections.timeline}>
                    <Timeline items={timeline()} labels={ui.timeline}/>
                </TextSection>
            </Show>
            <Show when={repositories.length > 0}>
                <TextSection id="detail-repositories" title={ui.sections.repositories}>
                    <ul class="divide-y divide-border rounded-lg border border-border bg-surface">
                        <For each={[...repositories].sort((a, b) => b.year - a.year)}>{(entry) => (
                            <li
                                class="grid grid-cols-[minmax(0,1fr)] gap-1 p-4 md:grid-cols-[4rem_minmax(0,1fr)] md:gap-4">
                                <span class="font-mono text-xs text-fg-subtle">{entry.year}</span>
                                <div>
                                    <a
                                        href={`https://github.com/${entry.org}/${entry.name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        translate="no"
                                        class="font-semibold [overflow-wrap:anywhere] text-fg hover:text-primary"
                                    >
                                        {entry.name}
                                    </a>
                                    <p class="mt-1 max-w-[68ch] text-fg-muted">{entry.note[lang]}</p>
                                </div>
                            </li>
                        )}</For>
                    </ul>
                </TextSection>
            </Show>
            <Show when={facts.metricsImage}>
                {(metrics) => (
                    <TextSection id="detail-metrics" title={ui.sections.metrics}>
                        <SvgImage {...metrics()} label={`${facts.name} · ${ui.sections.metrics}`}
                                  class="max-w-120 rounded-md border border-border bg-bg"/>
                    </TextSection>
                )}
            </Show>
        </DetailArticle>
    );
}

function ExperienceIndex() {
    const {content: {ui: siteUi}} = useLanguage();
    const {role} = useRole();
    const {ui} = useDetailCopy();
    const jobs = useSectionCopy("experience");
    const links = useLinks();

    return (
        <div data-testid="experience-index" class="container-page py-12 md:py-16">
            <IndexHeader collection="experience"/>
            <ol data-testid="experience-index-list" class="mt-12 border-b border-border">
                <For each={experience}>{(job) => {
                    const item = jobs.items[job.id];
                    return (
                        <li
                            data-testid={`experience-index-item-${job.id}`}
                            class="section-enter grid grid-cols-[5rem_minmax(0,1fr)] gap-x-5 gap-y-2 border-t border-border py-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-10">
                            <IndexArt art={EXPERIENCE_ART[job.id]}
                                      to={links.detail("experience", EXPERIENCE_SLUG[job.id])}/>
                            <div class="max-w-3xl">
                                <p class="font-mono text-xs text-fg-subtle">{formatRange(job.start, job.end, siteUi.months, siteUi.present)}</p>
                                <h2 class="text-title text-fg">
                                    <Link to={links.detail("experience", EXPERIENCE_SLUG[job.id])}
                                          data-testid={`experience-index-link-${job.id}`}
                                          class="hover:text-primary">{job.company}</Link>
                                </h2>
                                <p class="mt-1 font-semibold text-primary">{item.title}</p>
                                <p class="mt-3 text-fg-muted">{forProfile(item.summary, role())}</p>
                                <p class="mt-3 text-sm text-fg-subtle">
                                    {countOf(ui.counts.projects, projectsOfExperience(job.id).length)} · {countOf(ui.counts.recommendations, testimonialsOfExperience(job.id).length)}
                                </p>
                                <Link to={links.detail("experience", EXPERIENCE_SLUG[job.id])}
                                      class="mt-2 inline-flex min-h-9 items-center gap-1.5 font-semibold text-primary hover:text-primary-hover">
                                    {ui.actions.readPage}
                                    <ArrowRight class="size-4"/>
                                </Link>
                            </div>
                        </li>
                    );
                }}</For>
            </ol>
        </div>
    );
}

function EducationIndex() {
    const {ui} = useDetailCopy();
    const about = useSectionCopy("about");
    const links = useLinks();

    return (
        <div data-testid="education-index" class="container-page py-12 md:py-16">
            <IndexHeader collection="education"/>
            <ol data-testid="education-index-list" class="mt-12 border-b border-border">
                <For each={education}>{(program) => {
                    const copy = about.education[program.id];
                    return (
                        <li
                            data-testid={`education-index-item-${program.id}`}
                            class="section-enter grid grid-cols-[5rem_minmax(0,1fr)] gap-x-5 gap-y-2 border-t border-border py-8 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-x-10">
                            <IndexArt art={EDUCATION_ART[program.id]}
                                      to={links.detail("education", EDUCATION_SLUG[program.id])}/>
                            <div class="max-w-3xl">
                                <p class="font-mono text-xs text-fg-subtle">{program.start === program.end ? program.start : `${program.start} – ${program.end}`}</p>
                                <h2 class="text-title text-fg">
                                    <Link to={links.detail("education", EDUCATION_SLUG[program.id])}
                                          data-testid={`education-index-link-${program.id}`}
                                          class="hover:text-primary">{copy.degree}</Link>
                                </h2>
                                <p class="mt-1 text-fg-muted">{program.school}</p>
                                <Show when={copy.note}>
                                    <p class="mt-2 w-fit rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">{copy.note}</p>
                                </Show>
                                <Link to={links.detail("education", EDUCATION_SLUG[program.id])}
                                      class="mt-2 inline-flex min-h-9 items-center gap-1.5 font-semibold text-primary hover:text-primary-hover">
                                    {ui.actions.readPage}
                                    <ArrowRight class="size-4"/>
                                </Link>
                            </div>
                        </li>
                    );
                }}</For>
            </ol>
        </div>
    );
}

/** Issuers with at least this many certifications get a section across the page. */
const MAJOR_ISSUER = 3;

function IssuerHeading(props: { id: CertificationFacts["issuerId"]; count: number; small?: boolean }) {
    const {issuers} = useDetailCopy();
    return (
        <div class="flex items-baseline gap-3">
            <h2 id={`issuer-${props.id}`}
                class={cn("text-fg", props.small ? "text-title" : "text-heading")}>{issuers[props.id].name}</h2>
            <span class="font-mono text-base text-fg-subtle">{props.count}</span>
        </div>
    );
}

function CertificationRow(props: { item: CertificationFacts }) {
    const {content: {ui: siteUi}} = useLanguage();
    const copy = useSectionCopy("certifications");
    const links = useLinks();
    const to = () => links.detail("certifications", CERTIFICATION_SLUG[props.item.id]);
    return (
        <li class="border-t border-border py-5">
            <p class="font-mono text-xs text-fg-subtle">{formatYearMonth(props.item.date, siteUi.months)}</p>
            <h3 class="mt-1 font-semibold text-fg">
                <Link to={to()} class="hover:text-primary">{props.item.title}</Link>
            </h3>
            <p class="mt-1 text-sm text-fg-muted">{copy.items[props.item.id].learned}</p>
        </li>
    );
}

const GROUPINGS = ["issuer", "year"] as const;

/** The certifications by year, newest first, each year's newest first. */
const certificationsByYear = () => {
    const newest = [...certifications].sort((a, b) => b.date.localeCompare(a.date));
    return [...new Set(newest.map((item) => item.date.slice(0, 4)))].map((year) => ({
        year,
        items: newest.filter((item) => item.date.startsWith(year)),
    }));
};

function CertificationsIndex() {
    const {ui, indexes, issuers} = useDetailCopy();
    const interactive = useHydrated();
    const [grouping, setGrouping] = createSignal<(typeof GROUPINGS)[number]>("issuer");
    const groups = certificationsByIssuer();

    return (
        <div data-testid="certifications-index" class="container-page py-12 md:py-16">
            <IndexHeader collection="certifications" subtitle={fill(indexes.certifications.subtitle, {
                count: certifications.length,
                issuers: groups.length
            })}/>
            {/* The prerendered page groups by issuer; the other grouping only exists once the page is interactive. */}
            <div role="group" aria-label={ui.certificationGroups.label} data-testid="certifications-grouping" data-interactive={interactive() || undefined}
                 class="mt-8 flex flex-wrap gap-2">
                <For each={GROUPINGS}>
                    {(value) => (
                        <ToggleButton
                            data-testid={`certifications-group-${value}`}
                            pressed={grouping() === value}
                            onClick={() => setGrouping(value)}>
                            {ui.certificationGroups[value]}
                        </ToggleButton>
                    )}
                </For>
            </div>
            <Show when={grouping() === "year"}>
                <For each={certificationsByYear()}>{({year, items}) => (
                    <section aria-labelledby={`year-${year}`} class="mt-14">
                        <div class="flex items-baseline gap-3">
                            <h2 id={`year-${year}`} class="text-heading text-fg">{year}</h2>
                            <span class="font-mono text-base text-fg-subtle">{items.length}</span>
                        </div>
                        <ul class="mt-6 grid border-b border-border md:grid-cols-2 md:gap-x-12">
                            <For each={items}>{(item) => <CertificationRow item={item}/>}</For>
                        </ul>
                    </section>
                )}</For>
            </Show>
            <Show when={grouping() === "issuer"}>
                <For each={groups.filter(({items}) => items.length >= MAJOR_ISSUER)}>{({issuer, items}) => (
                    <section aria-labelledby={`issuer-${issuer}`} class="section-enter mt-14">
                        <IssuerHeading id={issuer} count={items.length}/>
                        <p class="mt-2 max-w-[68ch] text-fg-muted">{issuers[issuer].text}</p>
                        <ul class="mt-6 grid border-b border-border md:grid-cols-2 md:gap-x-12">
                            <For each={items}>{(item) => <CertificationRow item={item}/>}</For>
                        </ul>
                    </section>
                )}</For>
                <div class="mt-14 grid gap-x-12 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
                    <For each={groups.filter(({items}) => items.length < MAJOR_ISSUER)}>{({issuer, items}) => (
                        <section aria-labelledby={`issuer-${issuer}`} class="section-enter">
                            <IssuerHeading id={issuer} count={items.length} small/>
                            <p class="mt-2 text-fg-muted">{issuers[issuer].text}</p>
                            <ul class="mt-4 border-b border-border">
                                <For each={items}>{(item) => <CertificationRow item={item}/>}</For>
                            </ul>
                        </section>
                    )}</For>
                </div>
            </Show>
            <p class="mt-10 text-sm text-fg-subtle">{countOf(ui.counts.certifications, certifications.length)}</p>
        </div>
    );
}

function OrganizationsIndex() {
    const {ui} = useDetailCopy();
    const cards = useSectionCopy("projects");
    const links = useLinks();
    const numbers = useNumbers();

    return (
        <div data-testid="organizations-index" class="container-page py-12 md:py-16">
            <IndexHeader collection="organizations"/>
            <ul data-testid="organizations-index-list" class="mt-12 grid border-b border-border md:grid-cols-2 md:gap-x-12">
                <For each={organizations}>{(organization) => {
                    const activity = organizationActivity[organization.id];
                    return (
                        <li data-testid={`organization-index-item-${organization.id}`} class="section-enter grid grid-cols-[4.5rem_minmax(0,1fr)] gap-x-5 border-t border-border py-6">
                            <IndexArt art={ORGANIZATION_ART[organization.id]}
                                      to={links.detail("organizations", ORGANIZATION_SLUG[organization.id])}/>
                            <div>
                                <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                    <h2 class="text-title text-fg" translate="no">
                                        <Link to={links.detail("organizations", ORGANIZATION_SLUG[organization.id])}
                                              data-testid={`organization-index-link-${organization.id}`}
                                              class="[overflow-wrap:anywhere] hover:text-primary">
                                            {organization.name}
                                        </Link>
                                    </h2>
                                    <span class="text-xs text-fg-subtle">
                                    {organization.visibility === "private" ? ui.visibility.private : ui.visibility.public}
                                </span>
                                </div>
                                <p class="mt-2 text-fg-muted">{cards.organizations[organization.id]}</p>
                                <p class="mt-3 font-mono text-xs text-fg-subtle">
                                    {countOf(ui.counts.repositories, activity.repositories)} ·{" "}
                                    {fill(ui.activity.commits, {
                                        mine: numbers.integer(activity.mine),
                                        people: numbers.integer(activity.people)
                                    })}
                                </p>
                            </div>
                        </li>
                    );
                }}</For>
            </ul>
        </div>
    );
}

/** A row's object on its tile, a second way into the page its title already links, so it is left unannounced. */
function IndexArt(props: { art: Art; to: string }) {
    return (
        <Link to={props.to} tabindex={-1} aria-hidden="true"
              class="tile-surface grid aspect-square place-items-center self-start overflow-clip rounded-xl md:row-span-2 md:rounded-2xl">
            <span class="grid size-full place-items-center"
                  style={{background: `var(--color-tile-${props.art.tile})`}}>
                <img src={withBase(props.art.file)} alt="" width={176} height={176} loading="lazy" decoding="async"
                     class="tile-illustration h-auto w-[86%]"/>
            </span>
        </Link>
    );
}

/** The dedicated /{lang}/about page; the home section keeps a simplified non-repeating introduction. */
function AboutIndex() {
    return <AboutPage/>;
}

/** Every GitHub figure with what it tells; the home keeps the headline figures. */
function MetricsIndex() {
    return (
        <div data-testid="metrics-index" class="container-page py-12 md:py-16">
            <IndexHeader collection="metrics"/>
            <div class="mt-12">
                <MetricsContent/>
            </div>
        </div>
    );
}

// Keyed by slug, like the project pages: the next job or program starts with its own timeline filter and stack pick.
export function DetailBody(props: { collection: DetailCollection; slug: string | null }): JSX.Element {
    return (
        <Switch>
            <Match when={props.collection === "about"}>
                <AboutIndex/>
            </Match>
            <Match when={props.collection === "experience"}>
                <Show when={props.slug} keyed fallback={<ExperienceIndex/>}>{(slug) => <ExperiencePage
                    slug={slug}/>}</Show>
            </Match>
            <Match when={props.collection === "education"}>
                <Show when={props.slug} keyed fallback={<EducationIndex/>}>{(slug) => <EducationPage
                    slug={slug}/>}</Show>
            </Match>
            <Match when={props.collection === "certifications"}>
                <Show when={props.slug} keyed fallback={<CertificationsIndex/>}>
                    {(slug) => <CertificationPage slug={slug}/>}
                </Show>
            </Match>
            <Match when={props.collection === "skills"}>
                <Show when={props.slug} keyed fallback={<SkillsIndex/>}>{(slug) => <SkillPage slug={slug}/>}</Show>
            </Match>
            <Match when={props.collection === "organizations"}>
                <Show when={props.slug} keyed fallback={<OrganizationsIndex/>}>
                    {(slug) => <OrganizationPage slug={slug}/>}
                </Show>
            </Match>
            <Match when={props.collection === "services"}>
                <Show when={props.slug} keyed fallback={<ServicesIndex/>}>{(slug) => <ServicePage slug={slug}/>}</Show>
            </Match>
            <Match when={props.collection === "reasons"}>
                <Show when={props.slug} keyed fallback={<ReasonsIndex/>}>{(slug) => <ReasonPage slug={slug}/>}</Show>
            </Match>
            <Match when={props.collection === "metrics"}>
                <MetricsIndex/>
            </Match>
        </Switch>
    );
}
