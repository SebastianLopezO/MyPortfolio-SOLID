import {createMemo, createSignal, For, onCleanup, onMount} from "solid-js";
import {REASON_SLUG} from "@/content/shared/detail-links";
import {REASON_ART} from "@/content/shared/page-art";
import {benefitOrder, benefitRoles} from "@/content/shared/services";
import {testimonials} from "@/content/shared/testimonials";
import {useSectionCopy} from "@/content/sections";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {Section} from "@/components/layout/Section";
import {ArrowRight} from "@/components/ui/icons";
import {withBase} from "@/lib/base";
import {buildDetailPath} from "@/lib/paths";
import {prioritize} from "@/lib/role-view";
import {Link} from "@/routes/Router";
import type {BenefitId} from "@/types/content";

/** A number as the slides write it, with two digits. */
const ordinal = (index: number) => String(index + 1).padStart(2, "0");

/**
 * The reasons to hire me, laid out like a presentation: a slide with the reason's object, its number and the words of
 * the recommendation behind it, beside the list of every reason. Each card of the list slides in as it comes up, and
 * from 64rem the slide stays in view and turns to the reason crossing the middle of the screen. One observer marks
 * that reason; nothing else runs, and on a phone the slide shows the first reason above the list.
 */
export function ReasonsSection() {
    const {lang} = useLanguage();
    const services = useSectionCopy("services");
    const recommendations = useSectionCopy("testimonials");
    const {role, locked} = useRole();
    const ordered = createMemo(() => prioritize(benefitOrder, (id) => benefitRoles[id], role()));
    const [active, setActive] = createSignal(0);
    const page = (id: BenefitId | null = null) => buildDetailPath(lang, "reasons", {
        slug: id ? REASON_SLUG[id] : null,
        locked: locked()
    });
    const authorOf = (id: BenefitId) => testimonials.find((item) => item.id === services.benefits[id].evidence.testimonial)!;
    let list: HTMLOListElement | undefined;

    onMount(() => {
        if (typeof IntersectionObserver === "undefined" || !list) return;
        const wide = window.matchMedia("(width >= 64rem)");
        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
            }
        }, {rootMargin: "-50% 0px -50% 0px"});
        const items = list.querySelectorAll("[data-index]");
        // The slide follows the list only where it stays beside it; on a phone it keeps the first reason.
        const follow = () => {
            observer.disconnect();
            if (wide.matches) items.forEach((item) => observer.observe(item));
            else setActive(0);
        };
        follow();
        wide.addEventListener("change", follow);
        onCleanup(() => {
            observer.disconnect();
            wide.removeEventListener("change", follow);
        });
    });

    return (
        <Section id="reasons" title={services.benefitsTitle} subtitle={services.benefitsSubtitle}>
            <div class="reasons lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16">
                {/* The slide: compact horizontal highlight below 64rem so it never fills a phone/tablet screen;
                    sticky presentation stage from 64rem capped to fit 768px-tall laptops without clipping. */}
                <div data-testid="reasons-stage" class="reasons-stage grid lg:sticky lg:top-24 lg:self-start">
                    <For each={ordered()}>
                        {(id, index) => {
                            const author = authorOf(id);
                            return (
                                <figure
                                    data-testid={`reason-slide-${id}`}
                                    class="reason-slide m-0 grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-4 rounded-2xl border border-border p-4 lg:block lg:border-0 lg:p-0"
                                    data-active={index() === active() || undefined}
                                >
                                    <div aria-hidden="true"
                                         class="grid aspect-square place-items-center overflow-clip rounded-2xl lg:aspect-video"
                                         style={{background: `var(--color-tile-${REASON_ART[id].tile})`}}>
                                        <img src={withBase(REASON_ART[id].file)} alt="" width={400} height={400}
                                             loading="lazy" decoding="async"
                                             class="reason-slide-art h-[86%] w-auto object-contain"/>
                                    </div>
                                    <div class="min-w-0 lg:mt-4">
                                        <p aria-hidden="true" class="font-mono text-xs text-fg-subtle">
                                            {services.reasons.counter.replace("{current}", ordinal(index())).replace("{total}", String(ordered().length))}
                                        </p>
                                        <blockquote class="mt-2 text-base leading-snug text-fg text-pretty sm:text-lg lg:text-2xl">
                                            “{services.benefits[id].evidence.excerpt}”
                                        </blockquote>
                                        <figcaption class="mt-2 text-xs text-fg-muted sm:text-sm">
                                            {author.author} · {recommendations.items[author.id].role}
                                        </figcaption>
                                    </div>
                                </figure>
                            );
                        }}
                    </For>
                </div>

                <ol ref={list} aria-label={services.reasons.listLabel} data-testid="reasons-list" class="reasons-list mt-6 grid gap-3 lg:mt-0">
                    <For each={ordered()}>
                        {(id, index) => (
                            <li data-index={index()} data-testid={`reason-item-${id}`} data-active={index() === active() || undefined}
                                class="group/reason">
                                <Link to={page(id)}
                                      data-testid={`reason-card-${id}`}
                                      class="reason-card group grid grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-4 rounded-2xl border border-border bg-bg p-3 pr-4 hover:border-border-strong sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:p-4 lg:group-data-active/reason:border-fg">
                                    <span aria-hidden="true" class="grid aspect-square place-items-center rounded-xl"
                                          style={{background: `var(--color-tile-${REASON_ART[id].tile})`}}>
                                        <img src={withBase(REASON_ART[id].file)} alt="" width={72} height={72}
                                             loading="lazy" decoding="async" class="w-[90%]"/>
                                    </span>
                                    <span class="min-w-0">
                                        <span aria-hidden="true"
                                              class="block font-mono text-xs text-fg-subtle">{ordinal(index())}</span>
                                        <h3 class="text-base leading-snug text-fg sm:text-lg">{services.benefits[id].title}</h3>
                                        <span
                                            class="mt-1 block text-sm text-fg-muted">{services.benefits[id].description}</span>
                                    </span>
                                    <ArrowRight class="reason-arrow size-4 text-fg-subtle"/>
                                </Link>
                            </li>
                        )}
                    </For>
                </ol>
            </div>
            <Link
                to={page()}
                data-testid="reasons-all-link"
                class="mt-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-5 text-sm font-semibold text-fg transition-colors hover:bg-surface-raised"
            >
                {services.reasons.pageLink}
                <ArrowRight class="size-4"/>
            </Link>
        </Section>
    );
}
