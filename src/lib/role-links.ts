import {stripBase} from "@/lib/base";
import {FROM_PARAM, parseDetailPath, parsePath, parseProjectPath, roleFromSearch} from "@/lib/paths";

/**
 * The links to the project and detail pages are written without the role view they are followed from, so a search
 * engine finds one address per page instead of one per view. The view rides along only when a visitor follows a link:
 * on a click (also with a modifier or the keyboard), a middle click or the context menu that opens it in a new tab, the
 * link gets `?from=` with the view of this page, first in the query as the pages have always written it.
 */
export function carryRole() {
    const role = parsePath(stripBase(location.pathname))?.role ?? roleFromSearch(location.search);
    if (!role) return;
    const carry = (event: Event) => {
        const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
        if (!(link instanceof HTMLAnchorElement) || link.origin !== location.origin) return;
        const path = stripBase(link.pathname);
        if (!parseProjectPath(path) && !parseDetailPath(path)) return;
        const params = new URLSearchParams(link.search);
        if (params.has(FROM_PARAM)) return;
        link.search = new URLSearchParams([[FROM_PARAM, role], ...params]).toString();
    };
    for (const type of ["click", "auxclick", "contextmenu"]) document.addEventListener(type, carry, {capture: true});
}
