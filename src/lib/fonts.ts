import geist400 from "@fontsource/geist-sans/files/geist-sans-latin-400-normal.woff2?url";
import geist600 from "@fontsource/geist-sans/files/geist-sans-latin-600-normal.woff2?url";
import geistMono400 from "@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff2?url";

const WEB_FONTS = [
    {family: "Geist", weight: "400", url: geist400},
    {family: "Geist", weight: "600", url: geist600},
    {family: "Geist Mono", weight: "400", url: geistMono400},
] as const;

// The faces are registered together once all of them have loaded, so the text is laid out again only once and
// no style is recalculated. `display: "swap"` keeps the metric-matched fallback visible until then (it never
// blocks on the download), which is also what Lighthouse's font-display audit asks for.
export function loadWebFonts() {
    const faces = WEB_FONTS.map(({
                                     family,
                                     weight,
                                     url
                                 }) => new FontFace(family, `url(${url}) format("woff2")`, {weight, display: "swap"}));
    return Promise.all(faces.map((face) => face.load()))
        .then(() => faces.forEach((face) => document.fonts.add(face)))
        .catch(() => undefined);
}
