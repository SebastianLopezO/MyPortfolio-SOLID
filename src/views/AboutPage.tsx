import {For, Show} from "solid-js";
import {ArrowLeft, ArrowRight, Check} from "@/components/ui/icons";
import {LinkRows, PageIndex, PageTrail, TextSection} from "@/components/page/PageParts";
import {useDetailCopy} from "@/content/detail-copy";
import {forProfile} from "@/content/roles";
import {useSectionCopy} from "@/content/sections";
import {CERTIFICATION_SLUG, REASON_SLUG} from "@/content/shared/detail-links";
import {education} from "@/content/shared/education";
import {
    ABOUT_ART,
    type Art,
    EDUCATION_ART,
    EXPERIENCE_ART,
    REASON_ART,
    SERVICE_ART
} from "@/content/shared/page-art";
import {PROJECT_ART} from "@/content/shared/project-art";
import {SKILL_ART} from "@/content/shared/skill-art";
import {testimonials} from "@/content/shared/testimonials";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {withBase} from "@/lib/base";
import {certificationById, projectById} from "@/lib/details";
import {formatYearMonth} from "@/lib/format";
import {Link} from "@/routes/Router";
import type {BenefitId, CertificationId} from "@/types/content";
import type {ProjectId} from "@/types/project";
import {ArtRows, Glance, Paragraphs, ProgramTiles, ProjectTiles, useCrumbs, useLinks} from "@/views/detail-kit";

const CURIOSITY_PROJECTS: ProjectId[] = [
    "smartpot",
    "gopoli",
    "tddPolyglot",
    "dataCompressor",
    "videoToAscii",
    "portfolio",
];

const CHOICE_CERTIFICATIONS: CertificationId[] = [
    "itSpecialistPython",
    "daxPowerBi",
    "iotProtocols",
    "greenDigitalSkills",
];

const APPROACH_REASONS: BenefitId[] = ["learning", "autonomy", "calm", "vision"];

const ordinal = (index: number) => String(index + 1).padStart(2, "0");

const PILL_OUTLINE = "inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-border-strong px-5 text-sm font-semibold text-fg transition-colors hover:bg-surface-raised active:translate-y-px";

/**
 * The dedicated /{lang}/about page: non-repeating deep dive into Sebastián's worldview, curiosity, study choices,
 * engineering approach, AI workflow and next horizon, connected organically to every inner collection of the portfolio.
 */
export function AboutPage() {
    const {lang, content: {ui: siteUi}} = useLanguage();
    const {role, locked, pathFor} = useRole();
    const {ui, indexes} = useDetailCopy();
    const about = useSectionCopy("about");
    const certCopy = useSectionCopy("certifications");
    const serviceCopy = useSectionCopy("services");
    const recommendations = useSectionCopy("testimonials");
    const links = useLinks();
    const crumbs = useCrumbs("about", null);
    const page = () => about.page;
    const closing = () => forProfile(about.closing, role());

    const sections = () => [
        {id: "about-worldview", title: page().sections.worldview},
        {id: "about-curiosity", title: page().sections.curiosity},
        {id: "about-choices", title: page().sections.choices},
        {id: "about-approach", title: page().sections.approach},
        {id: "about-horizon", title: page().sections.horizon},
        {id: "about-explore", title: page().sections.explore},
    ];

    const exploreArt: Record<typeof about.page.explore.items[number]["key"], Art> = {
        experience: EXPERIENCE_ART.tivenos,
        projects: PROJECT_ART.smartpot,
        journey: SERVICE_ART.consulting,
        skills: SKILL_ART.backend,
        education: EDUCATION_ART.politecnico,
        services: SERVICE_ART.integration,
        reasons: REASON_ART.learning,
        metrics: SERVICE_ART.data,
    };

    const exploreHref = (key: typeof about.page.explore.items[number]["key"]) => {
        if (key === "projects") return links.projectsIndex();
        if (key === "journey") return pathFor(role(), "journey");
        return links.detail(key);
    };

    return (
        <article data-testid="about-index" class="container-page py-10 md:py-14 xl:max-w-[80rem]">
            <PageTrail label={ui.breadcrumb} items={crumbs()}/>

            <header class="mt-6 grid gap-6 md:grid-cols-[minmax(0,1fr)_13rem] md:items-center md:gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-16">
                <div class="max-w-4xl">
                    <p class="font-mono text-xs text-fg-subtle">{ui.eyebrow.about}</p>
                    <h1 class="mt-3 text-heading text-fg xl:text-display">{indexes.about.title}</h1>
                    <p class="mt-4 max-w-[68ch] text-xl text-fg">{indexes.about.subtitle}</p>
                    <p class="mt-4 max-w-[68ch] text-fg-muted">{page().lead}</p>
                </div>
                <div aria-hidden="true"
                     class="detail-art grid aspect-[2/1] place-items-center overflow-clip rounded-2xl md:aspect-square"
                     style={{background: `var(--color-tile-${ABOUT_ART.tile})`}}>
                    <img src={withBase(ABOUT_ART.file)} alt="" width={400} height={400} decoding="async"
                         class="tile-illustration h-auto w-[44%] md:w-[86%]"/>
                </div>
            </header>

            <div class="mt-10 xl:grid xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-x-16">
                <aside aria-label={ui.atAGlance} class="xl:col-start-2 xl:row-start-1">
                    <Glance
                        items={[
                            ...(role()
                                ? [{
                                    label: page().glance.lensLabel,
                                    value: (
                                        <span class="flex flex-wrap items-center gap-x-2 gap-y-1">
                                            <span class="font-semibold text-fg">{siteUi.roleNames[role()!]}</span>
                                            <Show when={!locked()}>
                                                <Link to={`/${lang}/about`}
                                                      class="text-xs font-semibold text-primary hover:text-primary-hover">
                                                    ({page().glance.generalLens})
                                                </Link>
                                            </Show>
                                        </span>
                                    ),
                                }]
                                : []),
                            {label: page().glance.baseLabel, value: page().glance.base},
                            {label: page().glance.spanLabel, value: page().glance.span},
                            {label: page().glance.driveLabel, value: page().glance.drive},
                            {
                                label: about.languagesTitle,
                                value: about.languages.map((item) => `${item.name} (${item.level})`).join(" · "),
                            },
                            {label: page().glance.focusLabel, value: page().glance.focus},
                        ]}
                    >
                        <div class="flex flex-wrap gap-3">
                            <Link to={pathFor(role(), "contact")}
                                  class="inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover active:translate-y-px">
                                {page().glance.talkCta}
                                <ArrowRight class="size-4"/>
                            </Link>
                            <Link to={pathFor(role(), "resume")}
                                  class="inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-border-strong px-4 text-sm font-semibold text-fg transition-colors hover:bg-surface-raised">
                                {page().glance.resumeCta}
                            </Link>
                        </div>
                    </Glance>
                    <PageIndex label={ui.onThisPage} sections={sections()}/>
                </aside>

                <div class="mt-12 max-w-4xl space-y-12 xl:col-start-1 xl:row-start-1 xl:mt-0">
                    {/* 1. Digital world philosophy and non-siloed principles */}
                    <TextSection id="about-worldview" title={page().sections.worldview}>
                        <Paragraphs items={page().worldview.paragraphs}/>
                        <ol class="enter-each mt-8 grid gap-x-8 gap-y-6 border-b border-border pb-6 sm:grid-cols-2">
                            <For each={page().worldview.principles}>
                                {(principle, index) => (
                                    <li class="border-t border-border pt-4">
                                        <p class="font-mono text-xs text-fg-subtle">{ordinal(index())}</p>
                                        <h3 class="mt-1.5 font-sans text-base font-semibold text-fg">{principle.title}</h3>
                                        <p class="mt-1.5 text-sm leading-relaxed text-fg-muted">{principle.text}</p>
                                    </li>
                                )}
                            </For>
                        </ol>
                        <div class="mt-8">
                            <ArtRows
                                items={[
                                    {
                                        key: "skills",
                                        art: SKILL_ART.backend,
                                        to: links.detail("skills"),
                                        name: page().worldview.skillsTitle,
                                        text: page().worldview.skillsText,
                                    },
                                    {
                                        key: "metrics",
                                        art: SERVICE_ART.data,
                                        to: links.detail("metrics"),
                                        name: page().worldview.metricsTitle,
                                        text: page().worldview.metricsText,
                                    },
                                ]}
                            />
                        </div>
                    </TextSection>

                    {/* 2. Practical curiosity, personal tastes and exploratory builds */}
                    <TextSection id="about-curiosity" title={page().sections.curiosity}>
                        <Paragraphs items={page().curiosity.paragraphs}/>
                        <h3 class="mt-8 text-title text-fg">{page().curiosity.projectsHeading}</h3>
                        <div class="mt-4">
                            <ProjectTiles items={CURIOSITY_PROJECTS.map(projectById)}/>
                        </div>
                        <div class="mt-6 flex flex-wrap gap-3">
                            <Link to={links.projectsIndex()} class={PILL_OUTLINE}>
                                {page().curiosity.projectsCta}
                                <ArrowRight class="size-4"/>
                            </Link>
                            <Link to={links.detail("organizations")} class={PILL_OUTLINE}>
                                {page().curiosity.organizationsCta}
                                <ArrowRight class="size-4"/>
                            </Link>
                        </div>
                    </TextSection>

                    {/* 3. Why I chose each study program, diploma and certification */}
                    <TextSection id="about-choices" title={page().sections.choices}>
                        <Paragraphs items={page().choices.paragraphs}/>
                        <h3 class="mt-8 text-title text-fg">{page().choices.programsHeading}</h3>
                        <div class="mt-4">
                            <ProgramTiles items={education}/>
                        </div>
                        <h3 class="mt-8 text-title text-fg">{page().choices.certsHeading}</h3>
                        <p class="mt-2 max-w-[68ch] text-sm text-fg-muted">{page().choices.certsIntro}</p>
                        <div class="mt-4">
                            <LinkRows
                                items={CHOICE_CERTIFICATIONS.map((id) => {
                                    const item = certificationById(id);
                                    return {
                                        key: id,
                                        to: links.detail("certifications", CERTIFICATION_SLUG[id]),
                                        label: `${formatYearMonth(item.date, siteUi.months)} · ${item.issuer}`,
                                        name: item.title,
                                        text: certCopy.items[id].adds,
                                    };
                                })}
                            />
                        </div>
                        <div class="mt-6 flex flex-wrap gap-3">
                            <Link to={links.detail("education")} class={PILL_OUTLINE}>
                                {page().choices.educationCta}
                                <ArrowRight class="size-4"/>
                            </Link>
                            <Link to={links.detail("certifications")} class={PILL_OUTLINE}>
                                {page().choices.certsCta}
                                <ArrowRight class="size-4"/>
                            </Link>
                        </div>
                    </TextSection>

                    {/* 4. Work approach, adaptability, AI engineering and colleague voices */}
                    <TextSection id="about-approach" title={page().sections.approach}>
                        <Paragraphs items={page().approach.paragraphs}/>
                        <div class="mt-8 rounded-2xl border border-border bg-surface p-6 sm:p-8">
                            <h3 class="text-title text-fg">{page().approach.aiHeading}</h3>
                            <div class="mt-4 max-w-[68ch] space-y-4 text-fg-muted">
                                <For each={about.ai}>{(paragraph) => <p>{paragraph}</p>}</For>
                            </div>
                        </div>
                        <h3 class="mt-8 text-title text-fg">{page().approach.reasonsHeading}</h3>
                        <div class="mt-4">
                            <ArtRows
                                items={APPROACH_REASONS.map((id) => {
                                    const benefit = serviceCopy.benefits[id];
                                    const author = testimonials.find((item) => item.id === benefit.evidence.testimonial)!;
                                    return {
                                        key: id,
                                        art: REASON_ART[id],
                                        to: links.detail("reasons", REASON_SLUG[id]),
                                        name: benefit.title,
                                        text: `${author.author} · ${recommendations.items[author.id].role}`,
                                    };
                                })}
                            />
                        </div>
                        <div class="mt-6 flex flex-wrap gap-3">
                            <Link to={links.detail("experience")} class={PILL_OUTLINE}>
                                {page().approach.experienceCta}
                                <ArrowRight class="size-4"/>
                            </Link>
                            <Link to={links.detail("services")} class={PILL_OUTLINE}>
                                {page().approach.servicesCta}
                                <ArrowRight class="size-4"/>
                            </Link>
                        </div>
                    </TextSection>

                    {/* 5. Motivations, what I want to learn next and role-aware focus */}
                    <TextSection id="about-horizon" title={page().sections.horizon}>
                        <Paragraphs items={[...page().horizon.paragraphs, about.ambition]}/>
                        <h3 class="mt-8 text-title text-fg">{page().horizon.learningHeading}</h3>
                        <ul class="enter-each mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                            <For each={page().horizon.learningItems}>
                                {(item) => (
                                    <li class="flex gap-3 text-fg">
                                        <span aria-hidden="true"
                                              class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full"
                                              style={{background: `var(--color-tile-${ABOUT_ART.tile})`}}>
                                            <Check class="size-3.5"/>
                                        </span>
                                        <span>{item}</span>
                                    </li>
                                )}
                            </For>
                        </ul>
                        <div class="mt-8 rounded-2xl border border-border bg-surface p-6">
                            <p class="max-w-[68ch] text-lg text-fg">{closing()}</p>
                        </div>
                    </TextSection>

                    {/* 6. Organic visual compass to every internal section */}
                    <TextSection id="about-explore" title={page().sections.explore}>
                        <p class="max-w-[68ch] text-fg-muted">{page().explore.intro}</p>
                        <div class="mt-6">
                            <ArtRows
                                items={page().explore.items.map((item) => ({
                                    key: item.key,
                                    art: exploreArt[item.key],
                                    to: exploreHref(item.key),
                                    name: item.title,
                                    text: item.description,
                                }))}
                            />
                        </div>
                    </TextSection>
                </div>
            </div>

            <nav aria-label={ui.all.about} class="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
                <Link to={pathFor(role(), "about")}
                      class="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary hover:text-primary-hover">
                    <ArrowLeft class="size-4"/>
                    {page().glance.backHomeCta}
                </Link>
                <Link to={pathFor(role(), "contact")}
                      class="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover active:translate-y-px">
                    {page().glance.talkCta}
                    <ArrowRight class="size-4"/>
                </Link>
            </nav>
        </article>
    );
}
