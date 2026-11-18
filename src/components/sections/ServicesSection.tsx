import {createMemo, For, Show} from "solid-js";
import {forProfile} from "@/content/roles";
import {PROJECT_SLUG} from "@/content/shared/project-links";
import {benefitOrder, benefitRoles, SERVICE_IDS, serviceProjects, serviceRoles} from "@/content/shared/services";
import {testimonials} from "@/content/shared/testimonials";
import {useSectionCopy} from "@/content/sections";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {Section} from "@/components/layout/Section";
import {ArrowRight} from "@/components/ui/icons";
import {Carousel} from "@/components/ui/Carousel";
import {buildDetailPath, buildProjectPath} from "@/lib/paths";
import {prioritize} from "@/lib/role-view";
import {cn} from "@/lib/utils";
import {Link} from "@/routes/Router";
import type {ServiceId} from "@/types/content";

/** Where a service sits on the services page, so the home's list can lead straight to it. */
export const serviceAnchor = (id: ServiceId) => `service-${id}`;

/**
 * The home names each service, with the role views it serves, and leads to the services page; every detail, the
 * projects that prove each service and the reasons to hire me live there (ServicesContent).
 */
export function ServicesSection() {
    const {lang, content: {ui}} = useLanguage();
    const services = useSectionCopy("services");
    const {role, locked} = useRole();
    const ordered = createMemo(() => prioritize(SERVICE_IDS, (id) => serviceRoles[id], role()));
    const page = (hash = "") => buildDetailPath(lang, "services", {locked: locked(), hash});

    return (
        <Section id="services" title={services.title} subtitle={forProfile(services.subtitle, role())} tone="raised">
            <ul class="enter-each grid gap-x-10 sm:grid-cols-2 xl:grid-cols-4">
                <For each={ordered()}>
                    {(id) => (
                        <li class="border-t border-border py-5">
                            <p class="font-mono text-xs tracking-wider text-accent uppercase">
                                {serviceRoles[id].map((serviceRole) => ui.roleSwitcher.roles[serviceRole]).join(" · ")}
                            </p>
                            <h3 class="mt-2 text-title text-fg">
                                <Link to={page(serviceAnchor(id))} class="hover:text-primary">{services.items[id].title}</Link>
                            </h3>
                        </li>
                    )}
                </For>
            </ul>
            <Link
                to={page()}
                class="mt-8 inline-flex min-h-10 items-center gap-2 rounded-md border border-border-strong px-4 text-sm font-semibold text-fg hover:border-primary hover:text-primary"
            >
                {services.pageLink}
                <ArrowRight class="size-4"/>
            </Link>
        </Section>
    );
}

/** Every service with its points and the projects that prove it, then the reasons to hire me: the services page. */
export function ServicesContent() {
    const {lang, content: {ui}} = useLanguage();
    const services = useSectionCopy("services");
    const recommendations = useSectionCopy("testimonials");
    const projects = useSectionCopy("projects");
    const {role, locked} = useRole();
    const ordered = createMemo(() => prioritize(SERVICE_IDS, (id) => serviceRoles[id], role()));
    const reasons = createMemo(() => prioritize(benefitOrder, (id) => benefitRoles[id], role()));

    return (
        <>
            {/* A slider on phones, one service at a time; from 48rem the same list is a grid, four across from 80rem. */}
            <Carousel
                previousLabel={services.slider.previousService}
                nextLabel={services.slider.nextService}
                slideClass="flex basis-[85%] sm:basis-[calc((100%-1.25rem)/2)] md:basis-auto"
                trackClass="md:grid md:snap-none md:grid-cols-2 md:overflow-visible xl:grid-cols-4"
                controlsClass="md:hidden"
                items={ordered()}
            >
                {(id) => {
                    const service = services.items[id];
                    return (
                        <article id={serviceAnchor(id)}
                                 class="flex w-full flex-col rounded-lg border border-border bg-surface p-6 shadow-card">
                            <p class="font-mono text-xs tracking-wider text-accent uppercase">
                                {serviceRoles[id].map((serviceRole) => ui.roleSwitcher.roles[serviceRole]).join(" · ")}
                            </p>
                            <h3 class="mt-3 text-title text-fg">{service.title}</h3>
                            <p class="mt-2 text-sm text-fg">{service.description}</p>
                            <ul class="mt-3 flex-1 space-y-2 text-sm text-fg-muted">
                                <For each={service.points}>
                                    {(point) => (
                                        <li class="flex gap-2">
                                            <span aria-hidden="true"
                                                  class="mt-2 size-1.5 shrink-0 rounded-full bg-accent"/>
                                            {point}
                                        </li>
                                    )}
                                </For>
                            </ul>
                            <p class="mt-5 border-t border-border pt-4 text-xs text-fg-subtle">
                                {services.evidence}:{" "}
                                <For each={serviceProjects[id]}>
                                    {(project, index) => (
                                        <span>
                                            {index() > 0 && " · "}
                                            <Link
                                                to={buildProjectPath(lang, {
                                                    slug: PROJECT_SLUG[project],
                                                    locked: locked()
                                                })}
                                                class="inline-flex min-h-6 items-center font-semibold text-primary hover:text-primary-hover"
                                            >
                                                {projects.items[project].name}
                                            </Link>
                                        </span>
                                    )}
                                </For>
                            </p>
                        </article>
                    );
                }}
            </Carousel>

            <div class="mt-16">
                <h3 class="text-heading text-fg">{services.benefitsTitle}</h3>
                <p class="mt-2 text-fg-muted">{services.benefitsSubtitle}</p>
                <div class="mt-8">
                    {/* A slider on phones; from 48rem a grid where the role's first reason takes two columns. */}
                    <Carousel
                        previousLabel={services.slider.previousBenefit}
                        nextLabel={services.slider.nextBenefit}
                        slideClass="flex basis-[85%] sm:basis-[calc((100%-1.25rem)/2)] md:basis-auto"
                        trackClass="md:grid md:snap-none md:grid-cols-2 md:overflow-visible lg:grid-cols-3"
                        controlsClass="md:hidden"
                        items={reasons()}
                        itemClass={(_, index) => cn(index === 0 && "md:col-span-2")}
                    >
                        {(id) => {
                            const benefit = services.benefits[id];
                            const author = testimonials.find((item) => item.id === benefit.evidence.testimonial);
                            return (
                                <article class="flex w-full flex-col rounded-lg border border-border p-6">
                                    <h4 class="font-semibold text-fg">{benefit.title}</h4>
                                    <p class="mt-2 text-sm text-fg-muted">{benefit.description}</p>
                                    <figure class="mt-4 flex-1 border-l-2 border-primary/50 pl-3 text-sm">
                                        <blockquote class="text-fg">“{benefit.evidence.excerpt}”</blockquote>
                                        <Show when={author}>
                                            {(found) => (
                                                <figcaption class="mt-2 text-xs text-fg-subtle">
                                                    {found().author} · {recommendations.items[found().id].role}
                                                    {recommendations.translatedNote && ` · ${recommendations.translatedNote}`}
                                                </figcaption>
                                            )}
                                        </Show>
                                    </figure>
                                </article>
                            );
                        }}
                    </Carousel>
                </div>
            </div>
        </>
    );
}
