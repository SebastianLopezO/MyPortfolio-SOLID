import {onMount} from "solid-js";
import {scheduleAnalytics} from "@/lib/analytics";
import {keepAnchorsInPlace} from "@/lib/anchors";
import {loadWebFonts} from "@/lib/fonts";

/**
 * What every page starts once it is idle and has nothing to draw: the web fonts (the first paint uses metric-matched
 * fallbacks), the correction that keeps a #fragment's target in place while the page settles, and analytics.
 */
export function Boot() {
    onMount(() => {
        keepAnchorsInPlace(loadWebFonts());
        if (import.meta.env.PROD) scheduleAnalytics();
    });
    return null;
}
