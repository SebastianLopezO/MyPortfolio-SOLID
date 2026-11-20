import {whenHydrated} from "@/lib/ready";

/*
 * In-page jumps. Sections off screen on phones take an estimated height until they render (globals.css, .section), and
 * the web fonts and each section's hydration can reflow text on the way. A click on a link to a part of the page
 * therefore travels there itself: it lays every section out (data-traveling, data-traveled) while turning scroll-snap
 * off so the browser's snap engine never hijacks the trip midway, scrolls smoothly to the target's exact frame (top 0
 * for 100dvh snap boxes on desktop, or under the header on smaller screens and detail pages), holds the target locked
 * in place for a few frames after arrival, and then re-enables scroll-snap. Any input from the reader ends the trip's
 * corrections at once.
 */
const FRAMES = 14;
/** How long a trip may take before it is taken as over, for browsers without the scrollend event. */
const TRIP_LIMIT = 2500;
const INPUT = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

let generation = 0;
let stopCurrentTrip: (() => void) | null = null;

const headerOffset = (target: HTMLElement) => {
    const margin = parseFloat(getComputedStyle(target).scrollMarginTop);
    if (margin > 0) return margin;
    return parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
};

const targetOf = (hash: string) => {
    const id = decodeURIComponent(hash.slice(1));
    return id ? document.getElementById(id) : null;
};

const offsetOf = (target: HTMLElement) => target.getBoundingClientRect().top - headerOffset(target);

function hold(target: HTMLElement, onDone?: () => void) {
    const current = generation;
    let frames = 0;
    const step = () => {
        if (current !== generation || !target.isConnected) {
            onDone?.();
            return;
        }
        const delta = offsetOf(target);
        if (Math.abs(delta) >= 1) window.scrollBy({top: delta, behavior: "instant"});
        if (++frames < FRAMES) requestAnimationFrame(step);
        else onDone?.();
    };
    step();
}

function travel(target: HTMLElement) {
    stopCurrentTrip?.();
    const root = document.documentElement;
    const current = generation;
    root.dataset.traveling = "true";
    root.dataset.traveled = "true";
    let timer = 0;
    let finished = false;

    const cleanup = () => {
        if (finished) return;
        finished = true;
        window.removeEventListener("scrollend", arrive);
        window.clearTimeout(timer);
        if (stopCurrentTrip === cancel) stopCurrentTrip = null;
    };

    const releaseSnap = () => {
        if (current === generation) delete root.dataset.traveling;
    };

    const cancel = () => {
        cleanup();
        delete root.dataset.traveling;
    };

    const arrive = () => {
        cleanup();
        if (current === generation) hold(target, releaseSnap);
        else delete root.dataset.traveling;
    };

    stopCurrentTrip = cancel;
    const distance = offsetOf(target);
    if (Math.abs(distance) < 1) {
        arrive();
        return;
    }
    window.addEventListener("scrollend", arrive);
    timer = window.setTimeout(arrive, TRIP_LIMIT);
    const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollBy({top: distance, behavior: smooth ? "smooth" : "instant"});
}

function onClick(event: MouseEvent) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!(link instanceof HTMLAnchorElement) || !link.hash) return;
    if (link.origin !== location.origin || link.pathname !== location.pathname || link.search !== location.search) return;
    const target = targetOf(link.hash);
    if (!target) return;
    // The page travels itself instead of letting the browser jump. The address still names the target, and the target
    // takes the focus the way a jump would give it, so the next Tab continues from there.
    event.preventDefault();
    if (location.hash !== link.hash) history.pushState(history.state, "", link.hash);
    target.focus({preventScroll: true});
    travel(target);
}

export function keepAnchorsInPlace(fonts: Promise<unknown>) {
    for (const event of INPUT) {
        window.addEventListener(
            event,
            () => {
                generation++;
                stopCurrentTrip?.();
            },
            {capture: true, passive: true},
        );
    }
    // Bubbling, so a click that a part of the page handles itself (and prevents) never travels.
    document.addEventListener("click", onClick);

    const {hash} = location;
    const target = targetOf(hash);
    if (!target) return;
    document.documentElement.dataset.traveled = "true";
    const loaded = generation;
    hold(target);
    void Promise.all([fonts, new Promise<void>((resolve) => whenHydrated(resolve))]).then(() => {
        if (generation === loaded && location.hash === hash) hold(targetOf(hash) ?? target);
    });
}
