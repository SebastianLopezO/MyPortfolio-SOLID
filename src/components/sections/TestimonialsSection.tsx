import {createEffect, createMemo, createSignal, For, on, onCleanup, Show} from "solid-js";
import {ChevronDown, Quote} from "@/components/ui/icons";
import {forProfile} from "@/content/roles";
import {testimonials} from "@/content/shared/testimonials";
import {useSectionCopy} from "@/content/sections";
import {useContent} from "@/context/language";
import {useRole} from "@/context/role";
import {useHydrated} from "@/hooks/useHydrated";
import {Section} from "@/components/layout/Section";
import {Carousel} from "@/components/ui/Carousel";
import {formatYearMonth} from "@/lib/format";
import {prioritize} from "@/lib/role-view";
import {cn} from "@/lib/utils";

// The prerendered page carries the first three, as the old pager did, to keep the page within the HTML budget
// (tests/build/build-output.test.ts); the slider gets the rest once the page is interactive.
const PRERENDERED = 3;

/**
 * A long recommendation shows its first lines and a toggle, so one long quote does not stretch the whole row of
 * cards. The full text stays in the page; the toggle appears only when the clamp actually cuts it at this width.
 */
function ClampedQuote(props: {
    id: string;
    text: string;
    lang?: string;
    more: string;
    less: string
}) {
    let quote: HTMLParagraphElement | undefined;
    const [open, setOpen] = createSignal(false);
    const [clipped, setClipped] = createSignal(false);

    // Measured after mount and again whenever the quote closes or its text changes.
    createEffect(on([open, () => props.text], ([isOpen]) => {
        const element = quote;
        if (!element || isOpen) return;
        const measure = () => setClipped(element.scrollHeight > element.clientHeight + 1);
        measure();
        if (typeof ResizeObserver === "undefined") return;
        const observer = new ResizeObserver(measure);
        observer.observe(element);
        onCleanup(() => observer.disconnect());
    }));

    return (
        <div class="flex-1">
            <blockquote class="text-fg-muted" lang={props.lang}>
                <p id={props.id} ref={quote} class={cn(!open() && "line-clamp-6")}>“{props.text}”</p>
            </blockquote>
            <Show when={clipped() || open()}>
                <button
                    type="button"
                    aria-expanded={open()}
                    aria-controls={props.id}
                    onClick={() => setOpen((value) => !value)}
                    class="mt-2 inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover"
                >
                    {open() ? props.less : props.more}
                    <ChevronDown class={cn("size-4 transition-transform", open() && "rotate-180")}/>
                </button>
            </Show>
        </div>
    );
}

export function TestimonialsSection() {
    const {ui} = useContent();
    const copy = useSectionCopy("testimonials");
    const {role} = useRole();
    const hydrated = useHydrated();
    const ordered = createMemo(() => prioritize(testimonials, (item) => item.roles, role()));
    const shown = createMemo(() => (hydrated() ? ordered() : ordered().slice(0, PRERENDERED)));
    const supervisors = testimonials.filter((item) => item.relationship === "directSupervisor" || item.relationship === "seniorPosition").length;
    const stats = [
        [copy.stats.total, testimonials.length],
        [copy.stats.supervisors, supervisors],
        [copy.stats.teammates, testimonials.length - supervisors],
    ] as const;

    return (
        <Section id="testimonials" title={copy.title} subtitle={forProfile(copy.subtitle, role())}>
            {/* Compact horizontal strip of figures across every screen width so stats never bloat mobile vertical space. */}
            <dl class="enter-each mb-8 grid max-w-3xl grid-cols-3 gap-0">
                <For each={stats}>
                    {([label, value], index) => (
                        <div
                            class={cn(
                                "flex flex-col-reverse items-start justify-end gap-1",
                                index() === 0 ? "pr-3 sm:pr-8" : "border-l border-border px-3 sm:px-8",
                            )}
                        >
                            <dt class="text-xs leading-snug text-fg-muted sm:text-sm">{label}</dt>
                            <dd data-count="true"
                                class="font-display text-3xl text-primary tabular-nums md:text-4xl">{value}</dd>
                        </div>
                    )}
                </For>
            </dl>

            {/* One recommendation per view on phones, two on tablets/laptops and three on wide desktop screens. */}
            <Carousel
                previousLabel={copy.previous}
                nextLabel={copy.next}
                slideClass="flex basis-[85%] sm:basis-[calc((100%-1.25rem)/2)] xl:basis-[calc((100%-2.5rem)/3)]"
                items={shown()}
            >
                {(item) => {
                    const local = copy.items[item.id];
                    return (
                        <article class="flex w-full flex-col rounded-lg border border-border bg-surface p-6">
                            <div class="flex items-center justify-between gap-3">
                                <Quote class="size-6 text-primary"/>
                                <span
                                    class="rounded-full border border-accent/40 px-3 py-0.5 text-xs text-accent">{local.highlight}</span>
                            </div>
                            <figure class="mt-4 flex flex-1 flex-col">
                                <ClampedQuote
                                    id={`testimonial-${item.id}`}
                                    text={local.quote ?? item.quote}
                                    lang={local.quote ? undefined : "es"}
                                    more={ui.actions.showMore}
                                    less={ui.actions.showLess}
                                />
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
                                    <p class="text-sm text-fg-muted">
                                        {local.role} · {local.context}
                                    </p>
                                    <p class="mt-1 text-xs text-fg-subtle">
                                        {copy.relationships[item.relationship]} · {formatYearMonth(item.date, ui.months)}
                                    </p>
                                </figcaption>
                            </figure>
                        </article>
                    );
                }}
            </Carousel>
        </Section>
    );
}
