import {onMount} from "solid-js";
import {scheduleAnalytics} from "@/lib/analytics";
import {keepAnchorsInPlace} from "@/lib/anchors";
import {loadWebFonts} from "@/lib/fonts";
import {countUpFigures} from "@/lib/count-up";
import {carryLock} from "@/lib/lock";

/**
 * What every page starts once it is idle and has nothing to draw: the web fonts (the first paint uses metric-matched
 * fallbacks), the correction that keeps a #fragment's target in place while the page settles, the lock on the links
 * of the parts not hydrated yet, the figures that count up as the reader reaches them, and analytics.
 */
export function Boot() {
    onMount(() => {
        keepAnchorsInPlace(loadWebFonts());
        carryLock();
        countUpFigures();
        if (import.meta.env.PROD) scheduleAnalytics();
    });
    return null;
}
