import {createMemo, For, Show} from "solid-js";
import {ArrowRight, Check} from "@/components/ui/icons";
import {NeighborNavigation, TextSection} from "@/components/page/PageParts";
import {useDetailCopy} from "@/content/detail-copy";
import {useSectionCopy} from "@/content/sections";
import {EXPERIENCE_SLUG, REASON_SLUG, SERVICE_SLUG} from "@/content/shared/detail-links";
import {REASON_ART, SERVICE_ART} from "@/content/shared/page-art";
import {
    benefitOrder,
    benefitRoles,
    benefitWork,
    SERVICE_IDS,
    serviceReasons,
    serviceRoles
} from "@/content/shared/services";
import {testimonials} from "@/content/shared/testimonials";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {
    educationById,
    experienceById,
    jobsOfService,
    neighbors,
    projectById,
    projectsOfService,
    reasonBySlug,
    serviceBySlug,
    servicesWithReason
} from "@/lib/details";
import {formatYearMonth} from "@/lib/format";
import {prioritize} from "@/lib/role-view";
import {withBase} from "@/lib/base";
import {Link} from "@/routes/Router";
import type {BenefitId, ServiceId} from "@/types/content";
import {
    ArtRows,
    countOf,
    DetailArticle,
    Glance,
    IndexHeader,
    JobTiles,
    ProgramTiles,
    ProjectTiles,
    useLinks
} from "@/views/detail-kit";

// The pages of what I offer: every service and every reason to hire me, each with an index and a page of its own.

/** A number as the slides write it, with two digits. */
const ordinal = (index: number) => String(index + 1).padStart(2, "0");

/** The recommendation a reason quotes, its author and the words the reason takes from it. */
function useQuote(id: BenefitId) {
    const copy = useSectionCopy("services");
    const recommendations = useSectionCopy("testimonials");
    const {evidence} = copy.benefits[id];
    const facts = testimonials.find((item) => item.id === evidence.testimonial)!;
    const local = recommendations.items[facts.id];
    return {facts, local, excerpt: evidence.excerpt, quote: local.quote ?? facts.quote, original: local.quote === null};
}

/** A quote with the words a reason takes from it marked on the reason's own color. */
function Marked(props: { quote: string; excerpt: string; tile: string }) {
    const parts = () => {
        const at = props.quote.indexOf(props.excerpt);
        return at < 0 ? [props.quote, "", ""] : [props.quote.slice(0, at), props.excerpt, props.quote.slice(at + props.excerpt.length)];
    };
    return (
        <>
            {parts()[0]}
            <mark class="rounded px-0.5 text-fg [box-decoration-break:clone]"
                  style={{background: `var(--color-tile-${props.tile})`}}>{parts()[1]}</mark>
            {parts()[2]}
        </>
    );
}

/** Every service by its object, its name, its few words and its sentence; each leads to its page. */
export function ServicesIndex() {
    const {content: {ui: siteUi}} = useLanguage();
    const {role} = useRole();
    const {ui} = useDetailCopy();
    const copy = useSectionCopy("services");
    const links = useLinks();
    const ordered = createMemo(() => prioritize(SERVICE_IDS, (id) => serviceRoles[id], role()));

    return (
        <div class="container-page py-12 md:py-16">
            <IndexHeader collection="services"/>
            <ul class="enter-each mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2">
                <For each={ordered()}>{(id) => (
                    <li>
                        <Link to={links.detail("services", SERVICE_SLUG[id])}
                              class="service-entry group grid grid-cols-[6rem_minmax(0,1fr)] items-start gap-5 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-7">
                            <span aria-hidden="true"
                                  class="service-icon grid aspect-square place-items-center rounded-3xl"
                                  style={{background: `var(--color-tile-${SERVICE_ART[id].tile})`}}>
                                <img src={withBase(SERVICE_ART[id].file)} alt="" width={128} height={128} loading="lazy"
                                     decoding="async" class="w-[88%]"/>
                            </span>
                            <span class="min-w-0">
                                <span class="block font-mono text-xs text-fg-subtle">
                                    {serviceRoles[id].map((serviceRole) => siteUi.roleNames[serviceRole]).join(" · ")}
                                </span>
                                <h2 class="mt-2 text-title text-fg">{copy.items[id].title}</h2>
                                <span class="mt-1 block text-lg text-fg">{copy.items[id].tagline}</span>
                                <span class="mt-2 block text-fg-muted">{copy.items[id].description}</span>
                                <span class="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-fg">
                                    {ui.actions.readPage}
                                    <ArrowRight class="service-arrow size-4"/>
                                </span>
                            </span>
                        </Link>
                    </li>
                )}</For>
            </ul>
            <Link to={links.detail("reasons")}
                  class="mt-16 inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-5 text-sm font-semibold text-fg transition-colors hover:bg-surface-raised">
                {ui.actions.seeReasons}
                <ArrowRight class="size-4"/>
            </Link>
        </div>
    );
}

export function ServicePage(props: { slug: string }) {
    // The route mounts a new page for every slug.
    // eslint-disable-next-line solid/reactivity
    const {slug} = props;
    const {content: {ui: siteUi}} = useLanguage();
    const {role, pathFor} = useRole();
    const {ui} = useDetailCopy();
    const copy = useSectionCopy("services");
    const recommendations = useSectionCopy("testimonials");
    const links = useLinks();
    const id = serviceBySlug(slug)!;
    const service = copy.items[id];
    const projectsHere = projectsOfService(id);
    const jobsHere = jobsOfService(id);
    const {previous, next} = neighbors(SERVICE_IDS, SERVICE_IDS.indexOf(id));
    const sections = [
        {id: "detail-scope", title: ui.sections.scope},
        {id: "detail-projects", title: ui.sections.provenIn},
        ...(jobsHere.length > 0 ? [{id: "detail-jobs", title: ui.sections.jobs}] : []),
        {id: "detail-reasons", title: ui.sections.whyMe},
    ];
    const serviceLink = (other: ServiceId) => ({
        to: links.detail("services", SERVICE_SLUG[other]),
        label: copy.items[other].title
    });

    return (
        <DetailArticle
            collection="services"
            title={service.title}
            subtitle={service.tagline}
            lead={service.description}
            art={SERVICE_ART[id]}
            sections={sections}
            glance={
                <Glance items={[{
                    label: ui.facts.roles,
                    value: serviceRoles[id].map((serviceRole) => siteUi.roleNames[serviceRole]).join(" · ")
                }]}>
                    <p class="text-fg-muted">
                        {countOf(ui.counts.projects, projectsHere.length)} · {countOf(ui.counts.jobs, jobsHere.length)}
                    </p>
                    <Link to={pathFor(role(), "contact")}
                          class="inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-primary px-5 font-semibold text-on-primary transition-colors hover:bg-primary-hover">
                        {ui.actions.talk}
                        <ArrowRight class="size-4"/>
                    </Link>
                </Glance>
            }
            navigation={
                <NeighborNavigation
                    label={ui.all.services}
                    previous={serviceLink(previous)}
                    next={serviceLink(next)}
                    previousLabel={ui.actions.previous}
                    nextLabel={ui.actions.next}
                    all={{to: links.detail("services"), label: ui.all.services}}
                />
            }
        >
            <TextSection id="detail-scope" title={ui.sections.scope}>
                <ul class="enter-each grid gap-x-8 gap-y-4 sm:grid-cols-2">
                    <For each={service.points}>{(point) => (
                        <li class="flex gap-3 text-fg">
                            <span aria-hidden="true"
                                  class="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full"
                                  style={{background: `var(--color-tile-${SERVICE_ART[id].tile})`}}>
                                <Check class="size-3.5"/>
                            </span>
                            {point}
                        </li>
                    )}</For>
                </ul>
            </TextSection>
            <TextSection id="detail-projects" title={ui.sections.provenIn}>
                <ProjectTiles items={projectsHere}/>
            </TextSection>
            <Show when={jobsHere.length > 0}>
                <TextSection id="detail-jobs" title={ui.sections.jobs}>
                    <JobTiles items={jobsHere}/>
                </TextSection>
            </Show>
            <TextSection id="detail-reasons" title={ui.sections.whyMe}>
                <ArtRows items={serviceReasons[id].map((reason) => {
                    const author = testimonials.find((item) => item.id === copy.benefits[reason].evidence.testimonial)!;
                    return {
                        key: reason,
                        art: REASON_ART[reason],
                        to: links.detail("reasons", REASON_SLUG[reason]),
                        name: copy.benefits[reason].title,
                        text: `${author.author} · ${recommendations.items[author.id].role}`,
                    };
                })}/>
            </TextSection>
        </DetailArticle>
    );
}

/** Every reason with its object, its sentence and the words of the recommendation behind it. */
export function ReasonsIndex() {
    const {role} = useRole();
    const copy = useSectionCopy("services");
    const recommendations = useSectionCopy("testimonials");
    const links = useLinks();
    const ordered = createMemo(() => prioritize(benefitOrder, (id) => benefitRoles[id], role()));

    return (
        <div class="container-page py-12 md:py-16">
            <IndexHeader collection="reasons"/>
            <ol class="mt-14 grid gap-4">
                <For each={ordered()}>{(id, index) => {
                    const benefit = copy.benefits[id];
                    const author = testimonials.find((item) => item.id === benefit.evidence.testimonial)!;
                    return (
                        <li class="reason-row">
                            <Link to={links.detail("reasons", REASON_SLUG[id])}
                                  class="group grid gap-5 rounded-2xl border border-border p-4 transition-colors hover:border-border-strong sm:grid-cols-[9rem_minmax(0,1fr)] sm:p-5 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8">
                                <span aria-hidden="true"
                                      class="grid aspect-[2/1] place-items-center rounded-xl sm:aspect-square"
                                      style={{background: `var(--color-tile-${REASON_ART[id].tile})`}}>
                                    <img src={withBase(REASON_ART[id].file)} alt="" width={192} height={192}
                                         loading="lazy"
                                         decoding="async"
                                         class="tile-illustration h-full max-h-40 w-auto sm:h-auto sm:w-[86%]"/>
                                </span>
                                <span class="min-w-0 self-center">
                                    <span class="block font-mono text-xs text-fg-subtle">{ordinal(index())}</span>
                                    <h2 class="mt-1 text-title text-fg">{benefit.title}</h2>
                                    <span class="mt-2 block max-w-[68ch] text-fg-muted">{benefit.description}</span>
                                    <span class="mt-4 block border-l-2 border-fg/20 pl-3 text-sm">
                                        <span class="block text-fg">“{benefit.evidence.excerpt}”</span>
                                        <span
                                            class="mt-1 block text-fg-subtle">{author.author} · {recommendations.items[author.id].role}</span>
                                    </span>
                                </span>
                            </Link>
                        </li>
                    );
                }}</For>
            </ol>
        </div>
    );
}

export function ReasonPage(props: { slug: string }) {
    // The route mounts a new page for every slug.
    // eslint-disable-next-line solid/reactivity
    const {slug} = props;
    const {content: {ui: siteUi}} = useLanguage();
    const {role, pathFor} = useRole();
    const {ui} = useDetailCopy();
    const copy = useSectionCopy("services");
    const recommendations = useSectionCopy("testimonials");
    const links = useLinks();
    const id = reasonBySlug(slug)!;
    const benefit = copy.benefits[id];
    const art = REASON_ART[id];
    const {facts, local, excerpt, quote, original} = useQuote(id);
    const work = benefitWork[id];
    const projectsHere = work.projects.map(projectById);
    const jobsHere = work.experience.map(experienceById);
    const programsHere = work.education.map(educationById);
    const services = servicesWithReason(id);
    const {previous, next} = neighbors(benefitOrder, benefitOrder.indexOf(id));
    const sections = [
        {id: "detail-quote", title: ui.sections.quote},
        {id: "detail-practice", title: ui.sections.practice},
        {id: "detail-projects", title: ui.sections.projects},
        ...(jobsHere.length > 0 ? [{id: "detail-jobs", title: ui.sections.jobs}] : []),
        ...(programsHere.length > 0 ? [{id: "detail-studies", title: ui.sections.studies}] : []),
        ...(services.length > 0 ? [{id: "detail-services", title: ui.sections.services}] : []),
    ];
    const reasonLink = (other: BenefitId) => ({
        to: links.detail("reasons", REASON_SLUG[other]),
        label: copy.benefits[other].title
    });

    return (
        <DetailArticle
            collection="reasons"
            title={benefit.title}
            subtitle={benefit.description}
            art={art}
            sections={sections}
            glance={
                <Glance items={[
                    {label: ui.facts.quotedBy, value: <span class="font-semibold">{facts.author}</span>},
                    {
                        label: ui.facts.relationship,
                        value: `${recommendations.relationships[facts.relationship]} · ${formatYearMonth(facts.date, siteUi.months)}`
                    },
                    ...(facts.experience
                        ? [{
                            label: ui.facts.company,
                            value: (
                                <Link to={links.detail("experience", EXPERIENCE_SLUG[facts.experience])}
                                      class="font-semibold text-primary hover:text-primary-hover">
                                    {experienceById(facts.experience).company.split(" – ")[0]}
                                </Link>
                            ),
                        }]
                        : []),
                ]}>
                    <p class="text-fg-muted">
                        {countOf(ui.counts.projects, projectsHere.length)} · {countOf(ui.counts.jobs, jobsHere.length)}
                        {programsHere.length > 0 && ` · ${countOf(ui.counts.programs, programsHere.length)}`}
                    </p>
                    <Link to={pathFor(role(), "contact")}
                          class="inline-flex min-h-11 w-fit items-center gap-2 rounded-full bg-primary px-5 font-semibold text-on-primary transition-colors hover:bg-primary-hover">
                        {siteUi.actions.contact}
                        <ArrowRight class="size-4"/>
                    </Link>
                </Glance>
            }
            navigation={
                <NeighborNavigation
                    label={ui.all.reasons}
                    previous={reasonLink(previous)}
                    next={reasonLink(next)}
                    previousLabel={ui.actions.previous}
                    nextLabel={ui.actions.next}
                    all={{to: links.detail("reasons"), label: ui.all.reasons}}
                />
            }
        >
            <TextSection id="detail-quote" title={ui.sections.quote}>
                <figure class="max-w-[68ch]">
                    <blockquote class="text-xl leading-relaxed text-fg-muted" lang={original ? "es" : undefined}>
                        <p>“<Marked quote={quote} excerpt={excerpt} tile={art.tile}/>”</p>
                    </blockquote>
                    <figcaption class="mt-5 border-t border-border pt-4">
                        <p class="font-semibold text-fg">{facts.author}</p>
                        <p class="text-sm text-fg-muted">{local.role} · {local.context}</p>
                        <Show when={!original && recommendations.translatedNote}>
                            <p class="mt-1 text-xs text-fg-subtle">{recommendations.translatedNote}</p>
                        </Show>
                    </figcaption>
                </figure>
            </TextSection>
            <TextSection id="detail-practice" title={ui.sections.practice}>
                <p class="max-w-[68ch] text-lg text-fg">{benefit.practice}</p>
            </TextSection>
            <TextSection id="detail-projects" title={ui.sections.projects}>
                <ProjectTiles items={projectsHere}/>
            </TextSection>
            <Show when={jobsHere.length > 0}>
                <TextSection id="detail-jobs" title={ui.sections.jobs}>
                    <JobTiles items={jobsHere}/>
                </TextSection>
            </Show>
            <Show when={programsHere.length > 0}>
                <TextSection id="detail-studies" title={ui.sections.studies}>
                    <ProgramTiles items={programsHere}/>
                </TextSection>
            </Show>
            <Show when={services.length > 0}>
                <TextSection id="detail-services" title={ui.sections.services}>
                    <ArtRows items={services.map((service) => ({
                        key: service,
                        art: SERVICE_ART[service],
                        to: links.detail("services", SERVICE_SLUG[service]),
                        name: copy.items[service].title,
                        text: copy.items[service].tagline,
                    }))}/>
                </TextSection>
            </Show>
        </DetailArticle>
    );
}

