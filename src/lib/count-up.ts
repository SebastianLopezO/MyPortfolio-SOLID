/**
 * Figures that run up to their value the first time the reader reaches them (islands/parts/boot.tsx starts it once the
 * page is idle). A figure that is already on screen when the page settles keeps still, and with prefers-reduced-motion,
 * or without an IntersectionObserver, nothing runs: the page says the same before, after and without this.
 */

const COUNT_MS = 1100;

export interface Figure {
    prefix: string;
    value: number;
    /** The character between thousands as the page's language writes it, or none. */
    separator: string;
    suffix: string;
}

/**
 * A figure's text as what precedes its number, the number and what follows ("20+", "28,541", "93 %"), or null when the
 * text is not a whole number: a decimal such as 97.9 stays as it is written.
 */
export const parseFigure = (text: string): Figure | null => {
    const match = /^(\D*)(\d{1,3}(?:[.,\s]\d{3})+|\d+)(\D*)$/.exec(text);
    if (!match) return null;
    const [, prefix, digits, suffix] = match;
    return {prefix, value: Number(digits.replace(/\D/g, "")), separator: /\D/.exec(digits)?.[0] ?? "", suffix};
};

/** A whole number grouped in thousands with the figure's own separator. */
export const formatFigure = (value: number, separator: string) =>
    separator ? String(value).replace(/\B(?=(\d{3})+$)/g, separator) : String(value);

/** Rewrites the figure's text node in place, so the node Solid holds stays the same, and ends on the text as written. */
function run(element: Element) {
    const node = element.firstChild;
    if (!(node instanceof Text) || element.childNodes.length !== 1) return;
    const text = node.data;
    const figure = parseFigure(text);
    if (!figure || figure.value === 0) return;
    const start = performance.now();
    const frame = (now: number) => {
        const progress = Math.min((now - start) / COUNT_MS, 1);
        // Fast at first and slow into the value.
        const eased = 1 - (1 - progress) ** 3;
        node.data = progress < 1
            ? `${figure.prefix}${formatFigure(Math.round(figure.value * eased), figure.separator)}${figure.suffix}`
            : text;
        if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
}

/** Counts up every figure marked data-count that the reader reaches after the page has settled. */
export function countUpFigures() {
    if (typeof IntersectionObserver === "undefined" || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const waiting = new WeakSet<Element>();
    const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
            if (!entry.isIntersecting) {
                // Off screen for now, also when its section has not been laid out yet (content-visibility).
                waiting.add(entry.target);
                continue;
            }
            observer.unobserve(entry.target);
            // On screen from the start means it has been read already.
            if (waiting.has(entry.target)) run(entry.target);
        }
    });
    for (const element of document.querySelectorAll("[data-count]")) observer.observe(element);
}
