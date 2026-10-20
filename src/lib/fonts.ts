import dmSerifText400 from "@fontsource/dm-serif-text/files/dm-serif-text-latin-400-normal.woff2?url";
import ibmPlexSans400 from "@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-normal.woff2?url";
import ibmPlexSans600 from "@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-600-normal.woff2?url";
import sourceCodePro400 from "@fontsource/source-code-pro/files/source-code-pro-latin-400-normal.woff2?url";

const WEB_FONTS = [
    {family: "IBM Plex Sans", weight: "400", url: ibmPlexSans400},
    {family: "IBM Plex Sans", weight: "600", url: ibmPlexSans600},
    {family: "DM Serif Text", weight: "400", url: dmSerifText400},
    {family: "Source Code Pro", weight: "400", url: sourceCodePro400},
] as const;

// The faces are registered together once all of them have loaded, so the text is laid out again only once and
// no style is recalculated.
export function loadWebFonts() {
    const faces = WEB_FONTS.map(({
                                     family,
                                     weight,
                                     url
                                 }) => new FontFace(family, `url(${url}) format("woff2")`, {weight}));
    return Promise.all(faces.map((face) => face.load()))
        .then(() => faces.forEach((face) => document.fonts.add(face)))
        .catch(() => undefined);
}
