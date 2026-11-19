import {whenHydrated} from "@/lib/ready";

/*
 * In-page jumps. Sections off screen take an estimated height until they render (globals.css, .section), so the
 * distance to a section measured before the trip is not the real one, and the fonts and each section's hydration
 * reflow the text on the way. A click on a link to a part of the page therefore travels there itself: it lays every
 * section out for a moment (data-traveling), so the distance is the real one, scrolls there smoothly (at once for a
 * reader who asks for less motion), so the sections on the way play their entrances instead of being skipped, and once
 * it arrives puts the target exactly under the header and keeps it there for a few frames. Loading a page with a
 * fragment keeps the target in place the same way once the page has settled. Any input from the reader ends the trip's
 * corrections: the reader is in charge again.
 */
const FRAMES = 12;
/** How long a trip may take before it is taken as over, for browsers without the scrollend event. */
const TRIP_LIMIT = 2500;
const INPUT = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

let generation = 0;

const headerOffset = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;

const targetOf = (hash: string) => {
    const id = decodeURIComponent(hash.slice(1));
    return id ? document.getElementById(id) : null;
};

const offsetOf = (target: HTMLElement) => target.getBoundingClientRect().top - headerOffset();

function hold(target: HTMLElement) {
    const current = generation;
    let frames = 0;
    const step = () => {
        if (current !== generation || !target.isConnected) return;
        const delta = offsetOf(target);
        if (Math.abs(delta) >= 1) window.scrollBy({top: delta, behavior: "instant"});
        if (++frames < FRAMES) requestAnimationFrame(step);
    };
    step();
}

function travel(target: HTMLElement) {
    const root = document.documentElement;
    const current = generation;
    root.dataset.traveling = "true";
    let timer = 0;
    const arrive = () => {
        window.removeEventListener("scrollend", arrive);
        window.clearTimeout(timer);
        delete root.dataset.traveling;
        if (current === generation) hold(target);
    };
    const distance = offsetOf(target);
    if (Math.abs(distance) < 1) return arrive();
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
    for (const event of INPUT) window.addEventListener(event, () => generation++, {capture: true, passive: true});
    // Bubbling, so a click that a part of the page handles itself (and prevents) never travels.
    document.addEventListener("click", onClick);

    const {hash} = location;
    const target = targetOf(hash);
    if (!target) return;
    const loaded = generation;
    hold(target);
    void Promise.all([fonts, new Promise<void>((resolve) => whenHydrated(resolve))]).then(() => {
        if (generation === loaded && location.hash === hash) hold(targetOf(hash) ?? target);
    });
}
