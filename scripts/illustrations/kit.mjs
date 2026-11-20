/*
 * The drawing kit of the site's illustrations: soft hardware seen from above, slightly tilted toward the reader.
 * Every object is a few flat layers (a side that gives it thickness, a top face, a sheen and a bevel) over a blurred
 * contact shadow, so the pieces read as one family of small devices. The backgrounds are transparent: the page lays
 * each illustration on a tile of its own color (tokens.css, --color-tile-*), light or dark.
 */

export const PALETTE = {
    alu: "#f3f3f0",
    bone: "#e9e7e1",
    graphite: "#34373c",
    ink: "#15161a",
    orange: "#ff6b2c",
    cobalt: "#3a5cff",
    mint: "#2fc79a",
    butter: "#ffcd45",
    pink: "#ff8db0",
    sky: "#5bb8ff",
    red: "#ff5148",
    lilac: "#9c86ff",
    lime: "#b6e83a",
    leaf: "#43b866",
    soil: "#6e5442",
    paper: "#fbfaf6",
};

const hexToRgb = (hex) => [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16));
const rgbToHex = (rgb) => `#${rgb.map((value) => Math.round(Math.min(255, Math.max(0, value))).toString(16).padStart(2, "0")).join("")}`;

export const mix = (hex, target, amount) => {
    const a = hexToRgb(hex);
    const b = hexToRgb(target);
    return rgbToHex(a.map((value, index) => value + (b[index] - value) * amount));
};
export const lighten = (hex, amount) => mix(hex, "#ffffff", amount);
export const darken = (hex, amount) => mix(hex, "#000000", amount);
const luminance = (hex) => {
    const [r, g, b] = hexToRgb(hex);
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
};

const n = (value) => Number(value.toFixed(1));
const attrs = (object) => Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null && value !== false)
    .map(([key, value]) => `${key}="${typeof value === "number" ? n(value) : value}"`)
    .join(" ");
export const el = (tag, attributes, children = "") =>
    children ? `<${tag} ${attrs(attributes)}>${children}</${tag}>` : `<${tag} ${attrs(attributes)}/>`;
export const group = (children, attributes = {}) => el("g", attributes, [children].flat(Infinity).filter(Boolean).join(""));

/** Shared definitions: the sheen over every top face, the glare of glass and the blur of the contact shadows. */
export const defs = () => `<defs>
<linearGradient id="sheen" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".5" stop-color="#fff" stop-opacity=".06"/><stop offset="1" stop-color="#000" stop-opacity=".07"/></linearGradient>
<radialGradient id="glass" cx=".32" cy=".28" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".6"/><stop offset=".4" stop-color="#fff" stop-opacity="0"/></radialGradient>
<filter id="soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="9"/></filter>
<filter id="glow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="3"/></filter>
</defs>`;

const SHADOW = "#0d1120";

/** A rounded plate with thickness: the workhorse of the kit. */
export function slab(x, y, w, h, {r = 22, depth = 12, color = PALETTE.alu, shadow = true, bevel = true, rotate} = {}) {
    const bright = luminance(color) > 0.55;
    const parts = [
        shadow && el("rect", {
            x: x + 6,
            y: y + depth + 10,
            width: w - 12,
            height: h,
            rx: r,
            fill: SHADOW,
            opacity: 0.2,
            filter: "url(#soft)"
        }),
        depth > 0 && el("rect", {
            x,
            y: y + depth,
            width: w,
            height: h,
            rx: r,
            fill: darken(color, bright ? 0.17 : 0.3)
        }),
        el("rect", {x, y, width: w, height: h, rx: r, fill: color}),
        el("rect", {x, y, width: w, height: h, rx: r, fill: "url(#sheen)"}),
        bevel && el("rect", {
            x: x + 1,
            y: y + 1,
            width: w - 2,
            height: h - 2,
            rx: Math.max(0, r - 1),
            fill: "none",
            stroke: "#fff",
            "stroke-opacity": bright ? 0.7 : 0.16,
            "stroke-width": 1.5,
        }),
    ];
    return group(parts, rotate ? {transform: `rotate(${rotate} ${n(x + w / 2)} ${n(y + h / 2)})`} : {});
}

/** A round plate with thickness: knobs, coins, planters, dials. */
export function disc(cx, cy, r, {depth = 10, color = PALETTE.alu, shadow = true, bevel = true} = {}) {
    const bright = luminance(color) > 0.55;
    return group([
        shadow && el("circle", {cx, cy: cy + depth + 9, r: r * 0.94, fill: SHADOW, opacity: 0.2, filter: "url(#soft)"}),
        depth > 0 && el("circle", {cx, cy: cy + depth, r, fill: darken(color, bright ? 0.17 : 0.3)}),
        el("circle", {cx, cy, r, fill: color}),
        el("circle", {cx, cy, r, fill: "url(#sheen)"}),
        bevel && el("circle", {
            cx,
            cy,
            r: r - 1,
            fill: "none",
            stroke: "#fff",
            "stroke-opacity": bright ? 0.7 : 0.16,
            "stroke-width": 1.5
        }),
    ]);
}

/** A recess cut into a face: wells, slots, screens set into a body. */
export function well(x, y, w, h, {r = 12, color = PALETTE.ink} = {}) {
    return group([
        el("rect", {x, y, width: w, height: h, rx: r, fill: color}),
        el("rect", {
            x: x + 1,
            y: y + 1,
            width: w - 2,
            height: h - 2,
            rx: Math.max(0, r - 1),
            fill: "none",
            stroke: "#000",
            "stroke-opacity": 0.18,
            "stroke-width": 2
        }),
    ]);
}

/** A camera lens: a dark barrel, a colored inner ring and the glare of the glass. */
export function lens(cx, cy, r, {ring = PALETTE.cobalt, body = PALETTE.ink} = {}) {
    return group([
        el("circle", {cx, cy, r: r + 6, fill: darken(PALETTE.alu, 0.12)}),
        el("circle", {cx, cy, r, fill: body}),
        el("circle", {cx, cy, r: r * 0.62, fill: mix(body, ring, 0.35)}),
        el("circle", {cx, cy, r: r * 0.36, fill: body}),
        el("circle", {cx, cy, r, fill: "url(#glass)"}),
        el("ellipse", {cx: cx - r * 0.3, cy: cy - r * 0.34, rx: r * 0.16, ry: r * 0.1, fill: "#fff", opacity: 0.75}),
    ]);
}

/** A screw head with its slot at an angle. */
export function screw(cx, cy, {r = 5, angle = 35} = {}) {
    const dx = Math.cos((angle * Math.PI) / 180) * r * 0.7;
    const dy = Math.sin((angle * Math.PI) / 180) * r * 0.7;
    return group([
        el("circle", {cx, cy, r, fill: "#dcdbd5", stroke: "#b8b6ae", "stroke-width": 1}),
        el("line", {
            x1: cx - dx,
            y1: cy - dy,
            x2: cx + dx,
            y2: cy + dy,
            stroke: "#8f8d86",
            "stroke-width": 1.6,
            "stroke-linecap": "round"
        }),
    ]);
}

/** A status light with its halo; the class lets a page animate it (pulse). */
export function led(cx, cy, color, {r = 4.5, pulse = false} = {}) {
    return group([
        el("circle", {cx, cy, r: r * 2.2, fill: color, opacity: 0.35, filter: "url(#glow)"}),
        el("circle", {cx, cy, r, fill: color, class: pulse ? "pulse" : undefined}),
        el("circle", {cx: cx - r * 0.3, cy: cy - r * 0.35, r: r * 0.35, fill: "#fff", opacity: 0.8}),
    ]);
}

/** A pill-shaped key with a little travel. */
export function key(x, y, w, h, color, {depth = 5} = {}) {
    return slab(x, y, w, h, {r: Math.min(w, h) / 2, depth, color, shadow: false});
}

/** Rows of round holes: a speaker or a vent. */
export function grill(x, y, cols, rows, {gap = 12, r = 2.6, color = "#000", opacity = 0.28} = {}) {
    const dots = [];
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) dots.push(el("circle", {
            cx: x + col * gap,
            cy: y + row * gap,
            r,
            fill: color,
            opacity
        }));
    }
    return group(dots);
}

/** A thick cable that follows a path, with a darker under-stroke for depth. */
export function cable(d, color, {width = 9} = {}) {
    return group([
        el("path", {
            d,
            fill: "none",
            stroke: darken(color, 0.28),
            "stroke-width": width + 3,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            transform: "translate(0 3)"
        }),
        el("path", {
            d,
            fill: "none",
            stroke: color,
            "stroke-width": width,
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        }),
        el("path", {
            d,
            fill: "none",
            stroke: "#fff",
            "stroke-opacity": 0.35,
            "stroke-width": width * 0.28,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            transform: `translate(${-width * 0.15} ${-width * 0.2})`
        }),
    ]);
}

/** A plug at the end of a cable, seen from above. */
export function plug(cx, cy, color, {w = 26, h = 34, rotate = 0} = {}) {
    return group([
        slab(cx - w / 2, cy - h / 2, w, h, {r: 7, depth: 5, color, shadow: false}),
        el("rect", {x: cx - w * 0.22, y: cy - h / 2 + 5, width: w * 0.44, height: 4, rx: 2, fill: darken(color, 0.3)}),
    ], rotate ? {transform: `rotate(${rotate} ${cx} ${cy})`} : {});
}

/** Lines of text as soft bars, for papers and screens. */
export function textLines(x, y, widths, {gap = 13, h = 5, color = "#000", opacity = 0.16} = {}) {
    return group(widths.map((width, index) => el("rect", {
        x,
        y: y + index * gap,
        width,
        height: h,
        rx: h / 2,
        fill: color,
        opacity
    })));
}

/** A small bar chart on a screen. */
export function bars(x, y, heights, {w = 10, gap = 6, color = PALETTE.mint, base} = {}) {
    const bottom = base ?? y;
    return group(heights.map((height, index) => el("rect", {
        x: x + index * (w + gap),
        y: bottom - height,
        width: w,
        height,
        rx: 2.5,
        fill: color
    })));
}

/** The whole illustration: a square canvas with a transparent background. */
export function svg(title, body, {size = 400, width = size, height = size} = {}) {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${title}">
<style>@media (prefers-reduced-motion:no-preference){.pulse{animation:pulse 1.4s ease-in-out 3 both}.rise{animation:rise .9s cubic-bezier(.32,.72,0,1) both}.sweep{transform-origin:center;transform-box:fill-box;animation:sweep 2.4s cubic-bezier(.3,0,0,1) 1 both}}@keyframes pulse{50%{opacity:.25}}@keyframes rise{from{opacity:0;transform:translateY(14px)}}@keyframes sweep{from{transform:rotate(-120deg)}}</style>
${defs()}
<g class="rise">${body}</g>
</svg>
`;
}
