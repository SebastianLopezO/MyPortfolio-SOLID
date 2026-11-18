/**
 * "Expand all" and "Collapse all" for the disclosures of one part of the page (components/ui/More.tsx), so a recruiter
 * who wants everything gets it in one press. `watch` reports whether every one is open after any of them changes,
 * including when find in page opens one.
 */

const disclosures = (root: Element) => [...root.querySelectorAll<HTMLDetailsElement>("details.more")];

export const allOpen = (root: Element) => {
    const all = disclosures(root);
    return all.length > 0 && all.every((details) => details.open);
};

export const setAll = (root: Element, open: boolean) => {
    for (const details of disclosures(root)) details.open = open;
};

/** Calls back with allOpen(root) whenever one of root's disclosures opens or closes; returns the way to stop. */
export const watch = (root: Element, callback: (open: boolean) => void) => {
    // A details element's toggle event does not bubble, so it is caught on the way down.
    const listener = () => callback(allOpen(root));
    root.addEventListener("toggle", listener, true);
    return () => root.removeEventListener("toggle", listener, true);
};
