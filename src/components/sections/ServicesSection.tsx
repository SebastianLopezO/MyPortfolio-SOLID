import {createMemo, For} from "solid-js";
import {forProfile} from "@/content/roles";
import {SERVICE_SLUG} from "@/content/shared/detail-links";
import {SERVICE_ART} from "@/content/shared/page-art";
import {SERVICE_IDS, serviceRoles} from "@/content/shared/services";
import {useSectionCopy} from "@/content/sections";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {Section} from "@/components/layout/Section";
import {ArrowRight, ArrowUpRight} from "@/components/ui/icons";
import {withBase} from "@/lib/base";
import {buildDetailPath} from "@/lib/paths";
import {prioritize} from "@/lib/role-view";
import {Link} from "@/routes/Router";

/**
 * The home names each service by its object, its name and a few words, with no list of points: each one leads to its
 * own page, which tells what it covers, the projects that prove it and the jobs it was done in.
 */
export function ServicesSection() {
    const {lang} = useLanguage();
    const services = useSectionCopy("services");
    const {role, locked} = useRole();
    const ordered = createMemo(() => prioritize(SERVICE_IDS, (id) => serviceRoles[id], role()));
    const page = (slug: string | null = null) => buildDetailPath(lang, "services", {slug, locked: locked()});

    return (
        <Section id="services" title={services.title} subtitle={forProfile(services.subtitle, role())} tone="raised">
            <ul data-testid="services-list" class="enter-each grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-4 md:gap-8">
                <For each={ordered()}>
                    {(id) => (
                        <li data-testid={`service-item-${id}`}>
                            <Link to={page(SERVICE_SLUG[id])}
                                  data-testid={`service-card-${id}`}
                                  class="service-entry group flex h-full flex-col items-start">
                                <span aria-hidden="true"
                                      class="service-icon grid size-16 place-items-center rounded-2xl md:size-20"
                                      style={{background: `var(--color-tile-${SERVICE_ART[id].tile})`}}>
                                    <img src={withBase(SERVICE_ART[id].file)} alt="" width={96} height={96}
                                         loading="lazy" decoding="async" class="w-[88%]"/>
                                </span>
                                <h3 class="mt-4 flex items-start gap-1.5 text-base leading-snug text-fg text-pretty sm:text-lg">
                                    {services.items[id].title}
                                    <ArrowUpRight class="service-arrow mt-1 size-4 shrink-0 text-fg-subtle"/>
                                </h3>
                                <p class="mt-1.5 text-xs leading-relaxed text-fg-muted sm:text-sm">{services.items[id].tagline}</p>
                            </Link>
                        </li>
                    )}
                </For>
            </ul>
            <Link
                to={page()}
                data-testid="services-all-link"
                class="mt-10 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover"
            >
                {services.pageLink}
                <ArrowRight class="size-4"/>
            </Link>
        </Section>
    );
}
