const GTM_ID = "GTM-KQTK5XZH";
const INTERACTIONS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
const FALLBACK_DELAY = 8000;

declare global {
    interface Window {
        dataLayer?: unknown[];
    }
}

export function scheduleAnalytics() {
    let loaded = false;

    const load = () => {
        if (loaded) return;
        loaded = true;
        for (const event of INTERACTIONS) window.removeEventListener(event, load);
        window.dataLayer = window.dataLayer ?? [];
        window.dataLayer.push({"gtm.start": Date.now(), event: "gtm.js"});
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
        document.head.appendChild(script);
    };

    for (const event of INTERACTIONS) window.addEventListener(event, load, {once: true, passive: true});
    window.setTimeout(() => {
        if ("requestIdleCallback" in window) window.requestIdleCallback(load);
        else load();
    }, FALLBACK_DELAY);
}
