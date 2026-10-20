import {whenHydrated} from "@/lib/ready";

/*
 * A jump to #id is measured once, but the page keeps changing above the target afterwards: sections off screen take
 * an estimated height until they render (globals.css, .section), and the fonts and each section's hydration reflow
 * the text. So for a few frames after every in-page jump, and once more when the page has settled after loading with
 * a fragment, the target is put back under the header. Any input from the reader ends the correction.
 */
const FRAMES = 12;
const INPUT = ["wheel", "touchstart", "keydown", "pointerdown"] as const;

let generation = 0;

const headerOffset = () => parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;

const targetOf = (hash: string) => {
    const id = decodeURIComponent(hash.slice(1));
    return id ? document.getElementById(id) : null;
};

function hold(target: HTMLElement) {
    const current = generation;
    let frames = 0;
    const step = () => {
        if (current !== generation || !target.isConnected) return;
        const delta = target.getBoundingClientRect().top - headerOffset();
        if (Math.abs(delta) >= 1) window.scrollBy({top: delta, behavior: "instant"});
        if (++frames < FRAMES) requestAnimationFrame(step);
    };
    step();
}

function onClick(event: MouseEvent) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (!(link instanceof HTMLAnchorElement) || !link.hash) return;
    if (link.origin !== location.origin || link.pathname !== location.pathname || link.search !== location.search) return;
    // The browser jumps right after this handler; the correction starts on the next frame.
    requestAnimationFrame(() => {
        const target = targetOf(link.hash);
        if (target) hold(target);
    });
}

export function keepAnchorsInPlace(fonts: Promise<unknown>) {
    for (const event of INPUT) window.addEventListener(event, () => generation++, {capture: true, passive: true});
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
