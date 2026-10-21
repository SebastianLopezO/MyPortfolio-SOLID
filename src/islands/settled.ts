import type {ClientDirective} from "astro";

interface SettledOptions {
    /** Also wait until the island comes this close to the screen. */
    rootMargin?: string;
}

declare module "astro" {
    interface AstroClientDirectives {
        "client:settled"?: SettledOptions | boolean;
    }
}

/**
 * Hydrates an island once the page has settled, as the single-page editions did: after the load event and the first
 * paint, in the next idle period (at most 1.5 s later), or 3 s after the load event if the browser reports no paint.
 * Nothing then competes with the first paint for the network or the main thread. With a rootMargin the island also
 * waits until it comes that close to the screen, so the sections far down load only as the reader nears them.
 *
 * Astro writes this directive into the page as an inline script, which the CSP allows by its hash
 * (nginx/security-headers.conf).
 */
const settled: ClientDirective = (load, options, element) => {
    const {rootMargin} = (typeof options.value === "object" ? options.value : {}) as SettledOptions;
    let started = false;
    let waited = false;

    const hydrate = async () => {
        if (started) return;
        started = true;
        await (await load())();
    };

    const whenNear = () => {
        if (waited) return;
        waited = true;
        if (!rootMargin) return void hydrate();
        // The island is display: contents, so its children are what comes into view.
        const observer = new IntersectionObserver((entries) => {
            if (!entries.some((entry) => entry.isIntersecting)) return;
            observer.disconnect();
            void hydrate();
        }, {rootMargin});
        for (const child of element.children) observer.observe(child);
    };

    const idle = () => {
        if ("requestIdleCallback" in window) requestIdleCallback(whenNear, {timeout: 1500});
        else setTimeout(whenNear, 1);
    };

    const afterPaint = () => {
        if (performance.getEntriesByName("first-contentful-paint").length) return idle();
        try {
            new PerformanceObserver((_, observer) => {
                observer.disconnect();
                idle();
            }).observe({type: "paint"});
        } catch {
            idle();
        }
        setTimeout(whenNear, 3000);
    };

    if (document.readyState === "complete") afterPaint();
    else addEventListener("load", afterPaint, {once: true});
};

export default settled;
