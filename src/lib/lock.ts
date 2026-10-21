import {isLockedSearch, LOCK_PARAM} from "@/lib/paths";

/**
 * A part of the page hydrates as it comes near the screen, and until then its links are the prerendered ones, which
 * cannot see the page's query. On a locked link, a link followed before its part hydrates carries the lock on to the
 * next page, as the hydrated link would.
 */
export function carryLock() {
    if (!isLockedSearch(location.search)) return;
    document.addEventListener("click", (event) => {
        const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
        if (!(link instanceof HTMLAnchorElement) || link.origin !== location.origin || !link.closest("astro-island[ssr]")) return;
        if (isLockedSearch(link.search)) return;
        const url = new URL(link.href);
        url.searchParams.set(LOCK_PARAM, "true");
        link.href = url.href;
    }, {capture: true});
}
