import {
    type Accessor,
    createEffect,
    createSignal,
    createUniqueId,
    For,
    type JSX,
    on,
    onCleanup,
    onMount,
    Show
} from "solid-js";
import {ChevronLeft, ChevronRight} from "@/components/ui/icons";
import {cn} from "@/lib/utils";

interface CarouselProps<T> {
    items: readonly T[];
    /** Draws one slide; it runs once per item and moves with it when the order changes. */
    children: (item: T, index: Accessor<number>) => JSX.Element;
    /** Classes for an item's list element, such as a grid span once the carousel becomes a grid. */
    itemClass?: (item: T, index: number) => string | undefined;
    previousLabel: string;
    nextLabel: string;
    /** Width of each slide per breakpoint, e.g. "basis-[85%] sm:basis-[calc((100%-1.25rem)/2)]". */
    slideClass: string;
    /** Extra classes for the track, e.g. "md:grid md:grid-cols-2" to turn it into a plain grid from a breakpoint. */
    trackClass?: string;
    /** Extra classes for the buttons row, e.g. "md:hidden" when the track is a grid from that breakpoint. */
    controlsClass?: string;
}

interface Position {
    index: number;
    perView: number;
}

const samePosition = (a: Position, b: Position) => a.index === b.index && a.perView === b.perView;

/**
 * A row of slides that scrolls sideways with snap points, so a phone swipes through it one card at a time and a wide
 * screen sees several. All slides stay in the page (and the prerendered HTML); the buttons and the counter only move
 * the scroll position, so a screen reader reads the list as a plain list.
 */
export function Carousel<T>(props: CarouselProps<T>) {
    const trackId = createUniqueId();
    let track: HTMLUListElement | undefined;
    const [position, setPosition] = createSignal<Position>({index: 0, perView: 1}, {equals: samePosition});

    const step = () => {
        const slides = track?.children;
        if (!slides || slides.length < 2) return track?.clientWidth ?? 1;
        return (slides[1] as HTMLElement).offsetLeft - (slides[0] as HTMLElement).offsetLeft || 1;
    };

    onMount(() => {
        const element = track!;
        let frame = 0;
        const measure = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(() => {
                const width = step();
                // A track that scrolls takes keyboard focus, so arrow keys can move it; as a plain grid it stays out of the tab order.
                element.tabIndex = element.scrollWidth > element.clientWidth + 1 ? 0 : -1;
                const perView = Math.max(1, Math.round(element.clientWidth / width));
                const atEnd = element.scrollLeft + element.clientWidth >= element.scrollWidth - 2;
                const index = atEnd ? Math.max(0, props.items.length - perView) : Math.round(element.scrollLeft / width);
                setPosition({index, perView});
            });
        };
        measure();
        // Slides added after hydration lengthen the track without resizing it.
        createEffect(on(() => props.items.length, measure, {defer: true}));
        element.addEventListener("scroll", measure, {passive: true});
        const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
        observer?.observe(element);
        onCleanup(() => {
            cancelAnimationFrame(frame);
            element.removeEventListener("scroll", measure);
            observer?.disconnect();
        });
    });

    // The track's CSS scroll-behavior animates the move, and the reduced-motion rule in globals.css turns it off.
    const go = (direction: 1 | -1) => {
        if (!track) return;
        const {index, perView} = position();
        const target = Math.min(Math.max(index + direction * perView, 0), props.items.length - 1);
        track.scrollTo({left: target * step()});
    };

    const last = () => Math.min(position().index + position().perView, props.items.length);
    const range = () => (position().perView > 1 ? `${position().index + 1}–${last()}` : `${position().index + 1}`);

    return (
        <div>
            {/* As a grid, each card rises as it enters the screen (globals.css, .enter-each); as a slider on a phone,
                the cards at its edges turn away and dim (carousel-depth). */}
            <ul
                id={trackId}
                ref={track}
                class={cn(
                    "enter-each carousel-depth scrollbar-none -mx-4 flex snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto scroll-smooth px-4 sm:mx-0 sm:scroll-px-0 sm:px-0",
                    props.trackClass,
                )}
            >
                <For each={props.items}>
                    {(item, index) => (
                        <li class={cn("shrink-0 snap-start", props.slideClass, props.itemClass?.(item, index()))}>
                            {props.children(item, index)}
                        </li>
                    )}
                </For>
            </ul>
            {/* Centered, so on phones the buttons stay clear of the floating WhatsApp and assistant buttons on the right. */}
            <Show when={props.items.length > 1}>
                <div class={cn("mt-5 flex items-center justify-center gap-5", props.controlsClass)}>
                    <button
                        type="button"
                        aria-label={props.previousLabel}
                        aria-controls={trackId}
                        disabled={position().index === 0}
                        onClick={() => go(-1)}
                        class="grid size-11 place-items-center rounded-full border border-border-strong text-fg transition-colors hover:bg-surface-raised active:translate-y-px disabled:opacity-40"
                    >
                        <ChevronLeft class="size-5"/>
                    </button>
                    <p aria-hidden="true" class="min-w-16 text-center font-mono text-sm text-fg-muted tabular-nums">
                        <span class="text-fg">{range()}</span> / {props.items.length}
                    </p>
                    <button
                        type="button"
                        aria-label={props.nextLabel}
                        aria-controls={trackId}
                        disabled={last() >= props.items.length}
                        onClick={() => go(1)}
                        class="grid size-11 place-items-center rounded-full border border-border-strong text-fg transition-colors hover:bg-surface-raised active:translate-y-px disabled:opacity-40"
                    >
                        <ChevronRight class="size-5"/>
                    </button>
                </div>
            </Show>
        </div>
    );
}
