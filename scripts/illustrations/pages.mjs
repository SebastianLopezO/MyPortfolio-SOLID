/*
 * The objects of the pages beyond the projects, drawn with the same kit on the same 400 × 400 canvas: one per service,
 * per reason to hire me, per job, per program and per GitHub organization. A job is a badge on a lanyard, a program is
 * a book with what it led to on top, an organization is a cabinet of drawers with its label (and a padlock when its
 * code is private), a service or a reason is one object that says it. Each one has a flat glyph of its own, printed
 * on a face the way a logo is pressed into a device.
 */
import {
    bars,
    cable,
    darken,
    disc,
    el,
    group,
    key,
    led,
    lens,
    lighten,
    mix,
    PALETTE as P,
    plug,
    screw,
    slab,
    textLines,
    well
} from "./kit.mjs";
import {check, leaf, pin, signal, stack} from "./scenes.mjs";

const luminance = (hex) => {
    const [r, g, b] = [1, 3, 5].map((index) => parseInt(hex.slice(index, index + 2), 16));
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
};

/** Any outline as a plate with thickness: the path's own shape, a darker side under it and the shared sheen. */
const plate = (d, color, {depth = 12, shadow = true, bevel = true, evenodd = false} = {}) => {
    const bright = luminance(color) > 0.55;
    return group([
        shadow && el("path", {
            d,
            fill: "#0d1120",
            opacity: 0.2,
            filter: "url(#soft)",
            transform: `translate(6 ${depth + 10})`
        }),
        depth > 0 && el("path", {d, fill: darken(color, bright ? 0.17 : 0.3), transform: `translate(0 ${depth})`}),
        el("path", {d, fill: color}),
        el("path", {d, fill: "url(#sheen)"}),
        bevel && el("path", {
            d,
            fill: "none",
            stroke: "#fff",
            "stroke-opacity": bright ? 0.6 : 0.16,
            "stroke-width": 1.5
        }),
    ], evenodd ? {"fill-rule": "evenodd"} : {});
};

/**
 * Flat glyphs in a 24-unit box centered on 0. A part is a filled shape unless it says stroke; `tone` paints a part in
 * another color than the glyph's, such as the vein of a leaf.
 */
const GLYPHS = {
    cap: [{d: "M-12-3L0-9 12-3 0 3Z"}, {d: "M-7 0v5.5c0 3.2 14 3.2 14 0V0L0 3Z"}, {d: "M11-2.5v7", stroke: true}],
    plug: [{d: "M-6-2h12v7a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z"}, {d: "M-4.5-10h3v8h-3zM1.5-10h3v8h-3z"}, {
        d: "M0 10v3",
        stroke: true
    }],
    megaphone: [{d: "M-11-4h5l11-7v22l-11-7h-5z"}, {d: "M-7 4l2 6", stroke: true}, {
        d: "M8-4a5 5 0 0 1 0 8",
        stroke: true
    }],
    plane: [{d: "M-12 1L12-10 5 11 0 4Z"}],
    chart: [{d: "M-10 2h5v9h-5zM-2.5-4h5v15h-5zM5-10h5v21h-5z"}],
    leaf: [{d: "M-10 10C-10-3-1-10 11-11 11 1 4 10-10 10Z"}, {
        d: "M-8 8L6-5",
        stroke: true,
        tone: "#fff",
        opacity: 0.55
    }],
    pin: [{d: "M0 12C-6 5-8 1-8-3a8 8 0 0 1 16 0c0 4-2 8-8 15ZM-3-3a3 3 0 1 0 6 0a3 3 0 1 0-6 0Z", evenodd: true}],
    pepper: [{d: "M-9 9C-11 1-5-6 4-6c5 0 7 3 5 7C6 8-2 12-9 9Z"}, {d: "M4-6c0-3 2-5 5-5", stroke: true}],
    taurus: [{d: "M-6 4a6 6 0 1 0 12 0a6 6 0 1 0-12 0", stroke: true, width: 3}, {
        d: "M-10-10c2 6 18 6 20 0",
        stroke: true,
        width: 3
    }],
    flask: [{d: "M-3-11h6v7l7 12c1 2 0 4-2 4h-16c-2 0-3-2-2-4l7-12z"}, {
        d: "M-2 6a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0-3.2 0M2 2a1 1 0 1 0 2 0a1 1 0 1 0-2 0",
        tone: "#fff",
        opacity: 0.7
    }],
    code: [{d: "M-5-7l-6 7 6 7M5-7l6 7-6 7M2-10l-4 20", stroke: true, width: 2.6}],
    pencil: [{d: "M-11 11L-10.3 6.05 5.9-10.1 10.1-5.9-6.05 10.3Z"}],
    shield: [{d: "M0-12l9 4v6c0 7-4 11-9 14-5-3-9-7-9-14v-6z"}, {d: "M-4 0l3 3 5-6", stroke: true, tone: "#fff"}],
    globe: [{
        d: "M-10 0a10 10 0 1 0 20 0a10 10 0 1 0-20 0M-10 0h20M0-10c-5 5-5 15 0 20M0-10c5 5 5 15 0 20",
        stroke: true,
        width: 2
    }],
    gear: [{d: gearPath(0, 0, 11, 8, 0) + "M-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0Z", evenodd: true}],
    lock: [{d: "M-7-1h14v11h-14z"}, {d: "M-4-1v-4a4 4 0 0 1 8 0v4", stroke: true, width: 2.6}],
    bolt: [{d: "M3-12L-8 2h7l-2 10 11-14h-7z"}],
};

/** A gear's outline: `teeth` flat teeth around a ring, the first one at `phase` radians. */
function gearPath(cx, cy, r, teeth, phase) {
    const inner = r * 0.78;
    const step = (Math.PI * 2) / teeth;
    const points = [];
    for (let index = 0; index < teeth; index++) {
        const angle = phase + index * step;
        points.push([angle - step * 0.26, inner], [angle - step * 0.15, r], [angle + step * 0.15, r], [angle + step * 0.26, inner]);
    }
    return `M${points.map(([angle, radius]) => `${(cx + radius * Math.cos(angle)).toFixed(1)} ${(cy + radius * Math.sin(angle)).toFixed(1)}`).join("L")}Z`;
}

const glyph = (name, cx, cy, size, color) => group(GLYPHS[name].map((part) => part.stroke
        ? el("path", {
            d: part.d,
            fill: "none",
            stroke: part.tone ?? color,
            "stroke-opacity": part.opacity,
            "stroke-width": part.width ?? 2.4,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
        })
        : el("path", {
            d: part.d,
            fill: part.tone ?? color,
            opacity: part.opacity,
            "fill-rule": part.evenodd ? "evenodd" : undefined
        })),
    {transform: `translate(${cx} ${cy}) scale(${(size / 24).toFixed(3)})`});

/** A round pin-back button with a glyph, worn on a badge or stuck on a cabinet. */
const button = (cx, cy, r, color, name, ink = "#fff") => group([
    disc(cx, cy, r, {color, depth: 7}),
    glyph(name, cx, cy, r * 1.05, ink),
]);

// ─── Jobs: a badge on its lanyard ────────────────────────────────────────────────────────────────────────────────

const badge = ({band, mark, ink = "#fff", extra}) => {
    const barcode = Array.from({length: 22}, (_, index) => el("rect", {
        x: 136 + index * 6,
        y: 282,
        width: index % 3 === 0 ? 3.5 : 1.8,
        height: 20,
        fill: P.ink,
        opacity: 0.5,
    }));
    return [
        cable("M138 0C150 40 178 70 192 94", darken(band, 0.12), {width: 8}),
        cable("M262 0C250 40 222 70 208 94", darken(band, 0.12), {width: 8}),
        group([
            slab(114, 104, 172, 228, {r: 24, depth: 12, color: P.paper}),
            el("path", {d: "M114 128a24 24 0 0 1 24-24h124a24 24 0 0 1 24 24v36H114z", fill: band}),
            el("path", {d: "M114 128a24 24 0 0 1 24-24h124a24 24 0 0 1 24 24v36H114z", fill: "url(#sheen)"}),
            el("rect", {x: 182, y: 114, width: 36, height: 8, rx: 4, fill: darken(band, 0.35)}),
            glyph(mark, 200, 145, 24, ink),
            well(134, 180, 60, 66, {r: 14, color: lighten(band, 0.62)}),
            el("circle", {cx: 164, cy: 204, r: 11, fill: band}),
            el("path", {d: "M146 242c2-12 9-18 18-18s16 6 18 18z", fill: band}),
            textLines(206, 190, [58, 42, 50], {gap: 16, h: 7}),
            ...barcode,
        ], {transform: "rotate(-5 200 218)"}),
        slab(184, 86, 32, 22, {r: 8, depth: 5, color: P.graphite, shadow: false}),
        extra,
    ];
};

export const EXPERIENCE_SCENES = {
    tivenos: () => badge({band: P.cobalt, mark: "cap", extra: button(290, 292, 36, P.mint, "plug")}),
    adcom: () => badge({band: P.orange, mark: "megaphone", extra: button(290, 292, 36, P.butter, "chart", P.ink)}),
    muvu: () => badge({band: mix(P.mint, P.ink, 0.18), mark: "plane", extra: button(290, 292, 36, P.sky, "globe")}),
    quipux: () => badge({
        band: P.butter,
        mark: "chart",
        ink: P.ink,
        extra: stack(296, 312, 34, 4, P.orange, {step: 11, depth: 7})
    }),
};

// ─── Programs: a book with what it led to on top ─────────────────────────────────────────────────────────────────

/** A closed book seen from above: its cover, and its pages showing along the front edge. */
const book = (x, y, w, h, color, {rotate, depth = 16} = {}) => group([
    slab(x, y, w, h, {r: 10, depth, color}),
    el("rect", {x: x + 8, y: y + h + 2, width: w - 16, height: depth - 6, rx: 3, fill: P.paper}),
    ...[0.33, 0.66].map((at) => el("line", {
        x1: x + 10,
        x2: x + w - 10,
        y1: y + h + 2 + (depth - 6) * at,
        y2: y + h + 2 + (depth - 6) * at,
        stroke: "#000",
        "stroke-opacity": 0.12,
        "stroke-width": 1.2,
    })),
    el("rect", {x: x + 16, y, width: 10, height: h, fill: darken(color, 0.12), opacity: 0.6}),
], rotate ? {transform: `rotate(${rotate} ${x + w / 2} ${y + h / 2})`} : {});

/** A mortarboard: the square board seen at an angle, its band and the tassel. */
const mortarboard = (cx, cy, color = P.ink) => group([
    el("ellipse", {cx, cy: cy + 50, rx: 80, ry: 16, fill: "#0d1120", opacity: 0.2, filter: "url(#soft)"}),
    el("path", {d: `M${cx - 50} ${cy + 8}v28c0 16 100 16 100 0v-28l-50 18z`, fill: darken(color, 0.15)}),
    el("path", {
        d: `M${cx} ${cy - 34}L${cx + 92} ${cy}L${cx} ${cy + 34}L${cx - 92} ${cy}Z`,
        fill: darken(color, 0.4),
        transform: "translate(0 7)"
    }),
    el("path", {d: `M${cx} ${cy - 34}L${cx + 92} ${cy}L${cx} ${cy + 34}L${cx - 92} ${cy}Z`, fill: color}),
    el("path", {d: `M${cx} ${cy - 34}L${cx + 92} ${cy}L${cx} ${cy + 34}L${cx - 92} ${cy}Z`, fill: "url(#sheen)"}),
    el("path", {
        d: `M${cx} ${cy}L${cx + 76} ${cy + 6}V${cy + 46}`,
        fill: "none",
        stroke: P.orange,
        "stroke-width": 4,
        "stroke-linecap": "round"
    }),
    disc(cx + 76, cy + 52, 8, {color: P.orange, depth: 3, shadow: false}),
    disc(cx, cy, 7, {color: P.orange, depth: 2, shadow: false}),
]);

/** A shield plate with thickness. */
const shield = (cx, cy, s, color, mark = "lock") => {
    const d = `M${cx} ${cy - s}l${s * 0.8} ${s * 0.34}v${s * 0.5}c0 ${s * 0.62}-${s * 0.36} ${s * 0.96}-${s * 0.8} ${s * 1.2}c-${s * 0.44}-${s * 0.24}-${s * 0.8}-${s * 0.58}-${s * 0.8}-${s * 1.2}v-${s * 0.5}z`;
    return group([plate(d, color, {depth: 12}), glyph(mark, cx, cy + s * 0.08, s * 0.9, "#fff")]);
};

export const EDUCATION_SCENES = {
    politecnico: () => [
        book(84, 240, 232, 58, P.cobalt),
        book(112, 196, 176, 46, P.butter, {rotate: -4, depth: 14}),
        mortarboard(200, 152),
    ],
    cyberDiploma: () => [
        group([
            slab(80, 84, 214, 172, {r: 14, depth: 8, color: P.paper}),
            el("rect", {
                x: 96,
                y: 100,
                width: 182,
                height: 140,
                rx: 8,
                fill: "none",
                stroke: P.leaf,
                "stroke-opacity": 0.5,
                "stroke-width": 2
            }),
            el("rect", {x: 138, y: 118, width: 98, height: 10, rx: 5, fill: P.leaf, opacity: 0.8}),
            textLines(118, 148, [138, 112, 126], {gap: 16, h: 6}),
            disc(126, 212, 16, {color: P.red, depth: 4, shadow: false}),
        ], {transform: "rotate(-6 187 170)"}),
        shield(262, 248, 70, P.leaf),
    ],
    sena: () => [
        book(84, 252, 232, 52, P.orange),
        slab(112, 112, 176, 132, {r: 22, depth: 14, color: P.graphite}),
        well(128, 128, 144, 82, {r: 12}),
        glyph("code", 164, 169, 40, P.mint),
        textLines(196, 150, [56, 40, 48], {gap: 15, h: 6, color: P.orange, opacity: 0.85}),
        key(130, 220, 40, 14, P.alu, {depth: 3}),
        key(178, 220, 92, 14, P.alu, {depth: 3}),
        led(266, 226, P.mint, {r: 3.2, pulse: true}),
    ],
    pascual: () => [
        slab(112, 84, 176, 128, {r: 16, depth: 8, color: P.graphite}),
        well(124, 96, 152, 102, {r: 8, color: P.paper}),
        el("rect", {x: 134, y: 106, width: 132, height: 28, rx: 6, fill: lighten(P.lilac, 0.45)}),
        ...[0, 1, 2].map((index) => el("rect", {
            x: 134 + index * 46,
            y: 142,
            width: 40,
            height: 46,
            rx: 6,
            fill: lighten([P.sky, P.mint, P.butter][index], 0.4)
        })),
        slab(80, 220, 240, 46, {r: 14, depth: 12, color: P.alu}),
        well(166, 232, 68, 22, {r: 8, color: darken(P.alu, 0.1)}),
        slab(286, 252, 42, 60, {r: 21, depth: 8, color: P.graphite}),
        el("line", {
            x1: 307,
            x2: 307,
            y1: 258,
            y2: 276,
            stroke: "#fff",
            "stroke-opacity": 0.25,
            "stroke-width": 2,
            "stroke-linecap": "round"
        }),
    ],
    inem: () => [
        group([
            slab(104, 88, 176, 228, {r: 14, depth: 10, color: P.paper}),
            ...Array.from({length: 8}, (_, index) => el("line", {
                x1: 132,
                x2: 262,
                y1: 128 + index * 22,
                y2: 128 + index * 22,
                stroke: P.sky,
                "stroke-opacity": 0.35,
                "stroke-width": 1.5,
            })),
            ...Array.from({length: 7}, (_, index) => disc(110, 112 + index * 30, 6, {
                color: P.graphite,
                depth: 2,
                shadow: false,
                bevel: false
            })),
            el("rect", {
                x: 166,
                y: 112,
                width: 60,
                height: 26,
                rx: 13,
                fill: "none",
                stroke: P.cobalt,
                "stroke-width": 3
            }),
            el("path", {
                d: "M196 138v14M196 152l26 22-26 22-26-22z",
                fill: "none",
                stroke: P.cobalt,
                "stroke-width": 3,
                "stroke-linejoin": "round"
            }),
            el("path", {
                d: "M196 196v16M166 212h60v26h-60z",
                fill: "none",
                stroke: P.cobalt,
                "stroke-width": 3,
                "stroke-linejoin": "round"
            }),
        ], {transform: "rotate(-6 192 202)"}),
        group([
            slab(214, 254, 124, 22, {r: 6, depth: 6, color: P.butter}),
            slab(200, 254, 18, 22, {r: 5, depth: 6, color: P.pink, shadow: false}),
            el("path", {d: "M338 254l26 11-26 11z", fill: P.bone}),
            el("path", {d: "M356 261.5l8 3.5-8 3.5z", fill: P.graphite}),
        ], {transform: "rotate(-32 282 265)"}),
    ],
};

// ─── Organizations: a cabinet of drawers ─────────────────────────────────────────────────────────────────────────

const cabinet = ({color, mark, privateCode = false, ink}) => {
    const drawer = lighten(color, 0.1);
    return [
        slab(104, 92, 192, 228, {r: 26, depth: 16, color}),
        ...[0, 1, 2].map((index) => group([
            slab(122, 110 + index * 68, 156, 56, {r: 14, depth: 5, color: drawer, shadow: false}),
            key(176, 150 + index * 68, 48, 10, P.graphite, {depth: 3}),
        ])),
        el("rect", {x: 136, y: 120, width: 64, height: 24, rx: 6, fill: P.paper}),
        textLines(146, 129, [44], {h: 6}),
        led(262, 126, P.mint, {r: 3.6, pulse: true}),
        privateCode && group([
            el("path", {
                d: "M200 166v18a12 12 0 0 0 24 0v-6",
                fill: "none",
                stroke: P.graphite,
                "stroke-width": 5,
                "stroke-linecap": "round"
            }),
            slab(196, 188, 46, 40, {r: 9, depth: 7, color: P.butter, shadow: false}),
            el("circle", {cx: 219, cy: 205, r: 4.5, fill: darken(P.butter, 0.5)}),
            el("rect", {x: 217.5, y: 206, width: 3, height: 10, rx: 1.5, fill: darken(P.butter, 0.5)}),
        ]),
        button(292, 286, 38, P.paper, mark, ink ?? color),
    ];
};

export const ORGANIZATION_SCENES = {
    tivenos: () => cabinet({color: P.cobalt, mark: "cap", privateCode: true}),
    adcom: () => cabinet({color: P.orange, mark: "megaphone", privateCode: true}),
    smartpot: () => [...cabinet({
        color: P.leaf,
        mark: "leaf"
    }), leaf(286, 96, -60, 0.7, lighten(P.leaf, 0.1)), leaf(286, 96, -120, 0.55, darken(P.leaf, 0.08))],
    gopoli: () => cabinet({color: P.sky, mark: "pin", ink: P.cobalt}),
    peppertech: () => cabinet({color: P.red, mark: "pepper"}),
    engineering: () => cabinet({color: P.graphite, mark: "gear"}),
    taurus: () => cabinet({color: P.butter, mark: "taurus", ink: darken(P.butter, 0.45)}),
    testlabdata: () => cabinet({color: P.lilac, mark: "flask", privateCode: true}),
    technical: () => cabinet({color: P.mint, mark: "code", ink: darken(P.mint, 0.45)}),
    vocational: () => cabinet({color: P.pink, mark: "pencil", ink: darken(P.pink, 0.45)}),
};

// ─── Services: one object each ───────────────────────────────────────────────────────────────────────────────────

/** A speech bubble: a rounded box with its tail at the bottom left or right. */
const bubble = (x, y, w, h, tail, color) => {
    const r = 26;
    const tx = tail === "left" ? x + 46 : x + w - 46;
    const tip = tail === "left" ? -22 : 22;
    const d = `M${x + r} ${y}h${w - 2 * r}a${r} ${r} 0 0 1 ${r} ${r}v${h - 2 * r}a${r} ${r} 0 0 1-${r} ${r}`
        + (tail === "left"
            ? `H${tx + 16}l${tip} 26v-26H${x + r}`
            : `H${tx + 8}v26l${tip - 30}-26H${x + r}`)
        + `a${r} ${r} 0 0 1-${r}-${r}v-${h - 2 * r}a${r} ${r} 0 0 1 ${r}-${r}z`;
    return plate(d, color, {depth: 10});
};

/** A gear plate with thickness and its hub. */
const gear = (cx, cy, r, teeth, color, phase = 0) => group([
    plate(gearPath(cx, cy, r, teeth, phase), color, {depth: 12}),
    disc(cx, cy, r * 0.42, {color: P.alu, depth: 5, shadow: false}),
    el("circle", {cx, cy, r: r * 0.16, fill: P.ink}),
]);

/** A donut chart: arcs of a ring, each a share of the whole. */
const donut = (cx, cy, r, shares, width = 18) => {
    const length = 2 * Math.PI * r;
    let offset = 0;
    return group(shares.map(([share, color]) => {
        const arc = el("circle", {
            cx, cy, r, fill: "none", stroke: color, "stroke-width": width,
            "stroke-dasharray": `${(share * length - 3).toFixed(1)} ${length.toFixed(1)}`,
            "stroke-dashoffset": (-offset * length).toFixed(1),
            transform: `rotate(-90 ${cx} ${cy})`,
        });
        offset += share;
        return arc;
    }));
};

export const SERVICE_SCENES = {
    integration: () => [
        ...[[92, 104, P.cobalt], [308, 104, P.orange], [92, 300, P.mint], [308, 300, P.butter]].map(([x, y, color]) =>
            cable(`M200 ${y < 200 ? 176 : 224}C${x < 200 ? 160 : 240} ${y < 200 ? 140 : 260} ${x} ${y < 200 ? 150 : 250} ${x} ${y}`, color, {width: 8})),
        ...[[92, 104, P.cobalt, "chart"], [308, 104, P.orange, "megaphone"], [92, 300, P.mint, "cap"], [308, 300, P.butter, "flask"]].map(([x, y, color, mark]) =>
            button(x, y, 32, color, mark, color === P.butter ? P.ink : "#fff")),
        disc(200, 196, 64, {color: P.graphite, depth: 14}),
        ...Array.from({length: 8}, (_, index) => {
            const angle = (Math.PI / 4) * index;
            return led(200 + Math.cos(angle) * 44, 196 + Math.sin(angle) * 44, index === 2 ? P.butter : P.mint, {
                r: 3.4,
                pulse: index === 2
            });
        }),
        disc(200, 196, 22, {color: P.alu, depth: 5, shadow: false}),
        glyph("plug", 200, 196, 22, P.graphite),
    ],
    crm: () => [
        slab(96, 120, 196, 132, {r: 16, depth: 4, color: P.bone, rotate: -9}),
        slab(108, 116, 196, 132, {r: 16, depth: 4, color: lighten(P.sky, 0.55), rotate: 6}),
        el("rect", {x: 118, y: 120, width: 58, height: 26, rx: 8, fill: P.orange}),
        slab(100, 134, 200, 138, {r: 16, depth: 6, color: P.paper}),
        disc(150, 186, 26, {color: lighten(P.orange, 0.5), depth: 0, shadow: false, bevel: false}),
        el("circle", {cx: 150, cy: 180, r: 9, fill: P.orange}),
        el("path", {d: "M134 204c2-9 8-13 16-13s14 4 16 13z", fill: P.orange}),
        textLines(188, 172, [86, 64, 76], {gap: 16, h: 7}),
        ...[0, 1, 2].map((index) => el("circle", {
            cx: 192 + index * 16,
            cy: 236,
            r: 5,
            fill: index < 2 ? P.butter : darken(P.paper, 0.12)
        })),
        slab(78, 240, 244, 70, {r: 22, depth: 14, color: P.graphite}),
        el("rect", {x: 168, y: 262, width: 64, height: 24, rx: 6, fill: P.paper, opacity: 0.9}),
        textLines(178, 270, [44], {h: 6}),
    ],
    web: () => [
        slab(64, 82, 272, 220, {r: 24, depth: 14, color: P.alu}),
        led(92, 106, P.red, {r: 4.5}), led(112, 106, P.butter, {r: 4.5}), led(132, 106, P.mint, {r: 4.5}),
        well(150, 96, 164, 20, {r: 10, color: darken(P.alu, 0.08)}),
        well(84, 128, 232, 154, {r: 12, color: P.paper}),
        el("rect", {x: 98, y: 142, width: 204, height: 58, rx: 10, fill: lighten(P.lilac, 0.4)}),
        textLines(114, 158, [112, 74], {gap: 14, h: 7, color: P.ink, opacity: 0.3}),
        el("rect", {x: 114, y: 184, width: 54, height: 10, rx: 5, fill: P.cobalt}),
        ...[P.sky, P.mint, P.butter].map((color, index) => el("rect", {
            x: 98 + index * 71,
            y: 212,
            width: 62,
            height: 56,
            rx: 10,
            fill: lighten(color, 0.4)
        })),
        el("path", {
            d: "M258 226l0 52 13-12 9 20 9-4-9-20 18-1z",
            fill: P.ink,
            stroke: "#fff",
            "stroke-width": 2.5,
            "stroke-linejoin": "round"
        }),
    ],
    data: () => [
        slab(56, 96, 288, 206, {r: 26, depth: 14, color: P.graphite}),
        well(74, 114, 252, 170, {r: 14}),
        donut(142, 199, 44, [[0.46, P.butter], [0.32, P.orange], [0.22, P.mint]]),
        bars(208, 0, [42, 66, 54, 92], {w: 18, gap: 10, color: P.butter, base: 262}),
        el("polyline", {
            points: "214,196 242,172 270,182 300,140",
            fill: "none",
            stroke: P.mint,
            "stroke-width": 4,
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        }),
        disc(300, 140, 6, {color: P.mint, depth: 0, shadow: false}),
    ],
    automation: () => [
        gear(158, 222, 84, 10, P.orange, 0.15),
        gear(276, 138, 54, 8, P.cobalt, 0.2),
        el("path", {
            d: "M300 230a64 64 0 0 1-30 64",
            fill: "none",
            stroke: P.mint,
            "stroke-width": 9,
            "stroke-linecap": "round"
        }),
        el("path", {d: "M252 290l22 14 6-26z", fill: P.mint}),
        led(318, 96, P.mint, {r: 4, pulse: true}),
    ],
    infra: () => [
        ...[0, 1, 2].map((index) => group([
            slab(64, 86 + index * 72, 216, 58, {r: 16, depth: 10, color: P.graphite}),
            ...[0, 1, 2, 3].map((bay) => well(82 + bay * 36, 100 + index * 72, 28, 30, {r: 6})),
            led(232, 115 + index * 72, P.mint, {r: 3.6, pulse: index === 1}),
            led(254, 115 + index * 72, index === 2 ? P.butter : P.mint, {r: 3.6}),
        ])),
        slab(244, 244, 112, 76, {r: 10, depth: 12, color: P.cobalt}),
        ...Array.from({length: 7}, (_, index) => el("rect", {
            x: 256 + index * 13,
            y: 254,
            width: 5,
            height: 56,
            rx: 2.5,
            fill: "#fff",
            opacity: 0.18
        })),
        el("rect", {x: 250, y: 236, width: 100, height: 8, rx: 4, fill: darken(P.cobalt, 0.25)}),
    ],
    observability: () => [
        slab(56, 100, 236, 176, {r: 24, depth: 14, color: P.alu}),
        well(74, 118, 200, 124, {r: 12}),
        ...[0, 1, 2].map((row) => el("line", {
            x1: 84,
            x2: 264,
            y1: 148 + row * 32,
            y2: 148 + row * 32,
            stroke: "#fff",
            "stroke-opacity": 0.07,
            "stroke-width": 1.5
        })),
        el("polyline", {
            points: "86,186 126,186 142,152 160,220 178,170 194,186 262,186",
            fill: "none",
            stroke: P.mint,
            "stroke-width": 4.5,
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        }),
        led(90, 260, P.mint, {r: 3.6}), led(110, 260, P.mint, {r: 3.6}),
        plate("M306 190c-26 0-40 20-40 46v26l-12 14h104l-12-14v-26c0-26-14-46-40-46z", P.butter, {depth: 10}),
        disc(306, 186, 8, {color: P.butter, depth: 3, shadow: false}),
        disc(306, 296, 10, {color: P.orange, depth: 4, shadow: false}),
        signal(342, 210, P.orange, {angle: 10, radii: [12, 22]}),
    ],
    consulting: () => {
        const panels = [
            "M64 132L152 112V300L64 320Z",
            "M152 112L248 132V320L152 300Z",
            "M248 132L336 112V300L248 320Z",
        ];
        return [
            el("ellipse", {cx: 200, cy: 330, rx: 150, ry: 18, fill: "#0d1120", opacity: 0.2, filter: "url(#soft)"}),
            ...panels.map((d, index) => el("path", {d, fill: index === 1 ? P.bone : P.paper})),
            ...panels.map((d) => el("path", {d, fill: "url(#sheen)"})),
            el("path", {
                d: "M90 290C120 250 130 210 176 196S270 180 296 150",
                fill: "none",
                stroke: P.cobalt,
                "stroke-width": 4,
                "stroke-dasharray": "2 10",
                "stroke-linecap": "round"
            }),
            pin(300, 156, P.red),
            disc(188, 236, 64, {color: P.alu, depth: 12}),
            el("circle", {cx: 188, cy: 236, r: 50, fill: P.ink}),
            ...Array.from({length: 12}, (_, index) => {
                const angle = (Math.PI / 6) * index;
                return el("line", {
                    x1: 188 + Math.cos(angle) * 40, y1: 236 + Math.sin(angle) * 40,
                    x2: 188 + Math.cos(angle) * 46, y2: 236 + Math.sin(angle) * 46,
                    stroke: "#fff", "stroke-opacity": 0.5, "stroke-width": 2.5, "stroke-linecap": "round",
                });
            }),
            group([
                el("path", {d: "M188 200l10 36h-20z", fill: P.red}),
                el("path", {d: "M188 272l10-36h-20z", fill: P.alu}),
            ], {class: "sweep"}),
            disc(188, 236, 7, {color: P.alu, depth: 2, shadow: false}),
        ];
    },
};

// ─── Reasons to hire me: one object each ─────────────────────────────────────────────────────────────────────────

export const REASON_SCENES = {
    vision: () => [
        group([
            slab(64, 84, 252, 196, {r: 14, depth: 8, color: "#2f5bd8"}),
            ...Array.from({length: 11}, (_, index) => el("line", {
                x1: 64 + 22 * (index + 1),
                x2: 64 + 22 * (index + 1),
                y1: 92,
                y2: 272,
                stroke: "#fff",
                "stroke-opacity": 0.12,
                "stroke-width": 1
            })),
            ...Array.from({length: 8}, (_, index) => el("line", {
                x1: 72,
                x2: 308,
                y1: 84 + 22 * (index + 1),
                y2: 84 + 22 * (index + 1),
                stroke: "#fff",
                "stroke-opacity": 0.12,
                "stroke-width": 1
            })),
            ...[[96, 112], [216, 112], [156, 196]].map(([x, y]) => el("rect", {
                x,
                y,
                width: 66,
                height: 40,
                rx: 6,
                fill: "none",
                stroke: "#fff",
                "stroke-width": 3,
                opacity: 0.9
            })),
            el("path", {
                d: "M162 132h54M129 152v24h60v20M249 152v24h-60",
                fill: "none",
                stroke: "#fff",
                "stroke-width": 3,
                opacity: 0.9,
                "stroke-linejoin": "round"
            }),
        ], {transform: "rotate(-4 190 182)"}),
        plate("M206 332H346V192ZM252 312H318V246Z", P.butter, {depth: 9, evenodd: true}),
    ],
    costs: () => [
        slab(184, 58, 32, 26, {r: 7, depth: 6, color: P.graphite}),
        slab(270, 84, 22, 30, {r: 6, depth: 5, color: P.graphite, rotate: 40}),
        disc(200, 214, 118, {color: P.alu, depth: 16}),
        el("circle", {cx: 200, cy: 214, r: 98, fill: P.paper}),
        el("circle", {
            cx: 200, cy: 214, r: 74, fill: "none", stroke: P.mint, "stroke-width": 24, opacity: 0.45,
            "stroke-dasharray": `${(2 * Math.PI * 74 * 0.32).toFixed(1)} 999`, transform: "rotate(-90 200 214)",
        }),
        ...Array.from({length: 12}, (_, index) => {
            const angle = (Math.PI / 6) * index;
            return el("line", {
                x1: 200 + Math.cos(angle) * 84, y1: 214 + Math.sin(angle) * 84,
                x2: 200 + Math.cos(angle) * 92, y2: 214 + Math.sin(angle) * 92,
                stroke: P.ink, "stroke-opacity": 0.45, "stroke-width": 3, "stroke-linecap": "round",
            });
        }),
        group([el("line", {
            x1: 200,
            y1: 214,
            x2: 254,
            y2: 168,
            stroke: P.orange,
            "stroke-width": 6,
            "stroke-linecap": "round"
        })], {class: "sweep"}),
        disc(200, 214, 11, {color: P.graphite, depth: 3, shadow: false}),
    ],
    integration: () => [
        group([
            plate("M64 124H196V164C210 156 234 162 234 189S210 222 196 214V254H64Z", P.cobalt, {depth: 14}),
            textLines(88, 156, [80, 60, 72, 50], {gap: 18, h: 7, color: "#fff", opacity: 0.4}),
        ]),
        group([
            plate("M206 132H338V262H206V222C220 230 244 224 244 197S220 164 206 172Z", P.orange, {depth: 14}),
            glyph("chart", 290, 197, 52, "#fff"),
        ]),
        led(94, 232, P.mint, {r: 4, pulse: true}),
    ],
    autonomy: () => [
        el("path", {d: "M174 268c0 30 12 52 26 72 14-20 26-42 26-72z", fill: P.orange}),
        el("path", {d: "M188 268c0 18 5 32 12 44 7-12 12-26 12-44z", fill: P.butter}),
        plate("M150 214l-36 44v28l36-16z", P.red, {depth: 8}),
        plate("M250 214l36 44v28l-36-16z", P.red, {depth: 8}),
        plate("M200 60c34 26 52 72 52 120v80H148v-80c0-48 18-94 52-120z", P.alu, {depth: 12}),
        lens(200, 150, 24, {ring: P.sky}),
        slab(172, 244, 56, 18, {r: 6, depth: 6, color: P.graphite, shadow: false}),
        ...[[96, 110, 5], [318, 150, 4], [300, 74, 3.5], [86, 210, 3]].map(([x, y, r]) => el("circle", {
            cx: x,
            cy: y,
            r,
            fill: P.butter
        })),
    ],
    versatility: () => [
        cable("M150 128C150 80 112 54 70 40", P.cobalt, {width: 8}),
        cable("M206 120C206 72 214 40 230 0", P.orange, {width: 8}),
        cable("M262 128C262 82 300 60 344 52", P.mint, {width: 8}),
        plug(150, 136, P.cobalt, {w: 26, h: 34}),
        plug(206, 128, P.orange, {w: 26, h: 34}),
        plug(262, 136, P.mint, {w: 26, h: 34}),
        slab(104, 176, 204, 126, {r: 28, depth: 18, color: P.alu}),
        well(132, 214, 36, 36, {r: 18}),
        el("circle", {cx: 143, cy: 232, r: 3.5, fill: "#fff", opacity: 0.4}), el("circle", {
            cx: 157,
            cy: 232,
            r: 3.5,
            fill: "#fff",
            opacity: 0.4
        }),
        well(188, 214, 36, 36, {r: 8}),
        well(252, 210, 16, 44, {r: 8}),
        led(280, 276, P.mint, {r: 3.6, pulse: true}),
    ],
    calm: () => [
        slab(48, 170, 304, 76, {r: 20, depth: 16, color: P.butter}),
        key(60, 184, 26, 48, P.graphite),
        key(314, 184, 26, 48, P.graphite),
        well(146, 186, 108, 44, {r: 22, color: lighten(P.mint, 0.3)}),
        el("line", {x1: 184, x2: 184, y1: 190, y2: 226, stroke: P.ink, "stroke-opacity": 0.45, "stroke-width": 2.5}),
        el("line", {x1: 216, x2: 216, y1: 190, y2: 226, stroke: P.ink, "stroke-opacity": 0.45, "stroke-width": 2.5}),
        el("ellipse", {cx: 200, cy: 206, rx: 15, ry: 11, fill: "#fff", opacity: 0.9}),
        screw(112, 208), screw(288, 208),
        el("path", {
            d: "M80 300h240",
            stroke: P.ink,
            "stroke-opacity": 0.18,
            "stroke-width": 3,
            "stroke-linecap": "round",
            "stroke-dasharray": "2 12"
        }),
    ],
    business: () => [
        disc(186, 218, 112, {color: P.paper, depth: 16}),
        el("circle", {cx: 186, cy: 218, r: 90, fill: P.red}),
        el("circle", {cx: 186, cy: 218, r: 68, fill: P.paper}),
        el("circle", {cx: 186, cy: 218, r: 46, fill: P.red}),
        el("circle", {cx: 186, cy: 218, r: 24, fill: P.paper}),
        el("circle", {cx: 186, cy: 218, r: 9, fill: P.red}),
        el("line", {x1: 190, y1: 214, x2: 312, y2: 92, stroke: P.ink, "stroke-width": 6, "stroke-linecap": "round"}),
        el("path", {d: "M300 104l26-34 8 18 18 8-34 26z", fill: P.cobalt}),
        el("path", {d: "M300 104l26-34 8 18 18 8-34 26z", fill: "url(#sheen)"}),
    ],
    learning: () => [
        el("ellipse", {cx: 200, cy: 316, rx: 140, ry: 16, fill: "#0d1120", opacity: 0.2, filter: "url(#soft)"}),
        el("path", {
            d: "M200 312c-34-16-80-18-128-8V200c48-10 94-8 128 8 34-16 80-18 128-8v104c-48-10-94-8-128 8z",
            fill: darken(P.cobalt, 0.2)
        }),
        el("path", {d: "M200 296c-30-14-72-16-114-8v-96c42-8 84-6 114 8z", fill: P.paper}),
        el("path", {d: "M200 296c30-14 72-16 114-8v-96c-42-8-84-6-114 8z", fill: darken(P.paper, 0.04)}),
        el("path", {d: "M200 200v96", stroke: "#000", "stroke-opacity": 0.12, "stroke-width": 2}),
        ...[0, 1, 2, 3].map((row) => el("path", {
            d: `M100 ${214 + row * 18}c26-5 54-4 82 4M218 ${218 + row * 18}c28-8 56-9 82-4`,
            fill: "none",
            stroke: "#000",
            "stroke-opacity": 0.14,
            "stroke-width": 4,
            "stroke-linecap": "round"
        })),
        el("circle", {cx: 200, cy: 112, r: 52, fill: P.butter, opacity: 0.35, filter: "url(#glow)"}),
        disc(200, 112, 38, {color: P.butter, depth: 0}),
        el("circle", {cx: 200, cy: 112, r: 38, fill: "url(#glass)"}),
        slab(184, 146, 32, 24, {r: 6, depth: 6, color: P.graphite, shadow: false}),
        ...[[-62, 0], [62, 0], [-46, -44], [46, -44], [0, -64]].map(([dx, dy]) => el("line", {
            x1: 200 + dx * 0.78, y1: 112 + dy * 0.78, x2: 200 + dx, y2: 112 + dy,
            stroke: P.orange, "stroke-width": 5, "stroke-linecap": "round",
        })),
    ],
    detail: () => [
        group([
            slab(70, 92, 216, 196, {r: 14, depth: 8, color: P.paper}),
            ...Array.from({length: 5}, (_, row) => el("line", {
                x1: 84,
                x2: 272,
                y1: 128 + row * 30,
                y2: 128 + row * 30,
                stroke: "#000",
                "stroke-opacity": 0.1,
                "stroke-width": 2
            })),
            ...[132, 184, 230].map((x) => el("line", {
                x1: x,
                x2: x,
                y1: 106,
                y2: 274,
                stroke: "#000",
                "stroke-opacity": 0.1,
                "stroke-width": 2
            })),
            el("rect", {x: 186, y: 190, width: 42, height: 26, rx: 4, fill: P.mint, opacity: 0.8}),
        ], {transform: "rotate(-6 178 190)"}),
        group([slab(296, 250, 28, 96, {r: 14, depth: 8, color: P.graphite})], {transform: "rotate(-45 310 298)"}),
        disc(236, 212, 64, {color: P.graphite, depth: 10}),
        el("circle", {cx: 236, cy: 212, r: 50, fill: lighten(P.sky, 0.7)}),
        el("rect", {x: 206, y: 196, width: 60, height: 34, rx: 6, fill: P.mint}),
        check(236, 213, 26),
        el("circle", {cx: 236, cy: 212, r: 50, fill: "url(#glass)"}),
    ],
    team: () => [
        bubble(56, 88, 196, 124, "left", P.alu),
        textLines(84, 120, [104, 136, 88], {gap: 20, h: 8, color: P.cobalt, opacity: 0.55}),
        el("rect", {x: 84, y: 180, width: 46, height: 8, rx: 4, fill: P.orange, opacity: 0.8}),
        bubble(156, 186, 188, 112, "right", P.cobalt),
        check(206, 240, 34),
        textLines(238, 222, [76, 58, 68], {gap: 16, h: 7, color: "#fff", opacity: 0.5}),
    ],
    initiative: () => [
        el("path", {
            d: "M40 290C80 280 120 250 150 222",
            fill: "none",
            stroke: P.ink,
            "stroke-opacity": 0.28,
            "stroke-width": 4,
            "stroke-dasharray": "2 12",
            "stroke-linecap": "round"
        }),
        disc(64, 280, 22, {color: P.alu, depth: 6}),
        ...[[178, 210, 236, 112], [178, 210, 312, 206], [178, 210, 240, 296]].map(([x1, y1, x2, y2]) => el("path", {
            d: `M${x1} ${y1}Q${(x1 + x2) / 2} ${(y1 + y2) / 2 - 24} ${x2} ${y2}`,
            fill: "none",
            stroke: P.ink,
            "stroke-opacity": 0.28,
            "stroke-width": 4,
            "stroke-dasharray": "2 12",
            "stroke-linecap": "round",
        })),
        disc(178, 214, 16, {color: P.graphite, depth: 5}),
        ...[[236, 112, 40, P.orange], [312, 206, 36, P.cobalt], [240, 296, 34, P.mint]].map(([x, y, r, color]) => group([
            disc(x, y, r, {color, depth: 9}),
            el("path", {
                d: `M${x - r * 0.9} ${y - r * 0.2}C${x - r * 0.3} ${y + r * 0.4} ${x + r * 0.3} ${y + r * 0.4} ${x + r * 0.9} ${y - r * 0.2}`,
                fill: "none",
                stroke: "#fff",
                "stroke-opacity": 0.55,
                "stroke-width": 3
            }),
        ])),
        led(332, 108, P.butter, {r: 4, pulse: true}),
    ],
};

/** The dedicated About page object: a modular drafting slate where digital rules and layers connect from scratch. */
export const ABOUT_SCENE = () => [
    // Main graphite drafting slate seen slightly angled
    slab(56, 78, 288, 232, {r: 28, depth: 16, color: P.graphite}),
    // Recessed blueprint / digital world canvas inside the slate
    well(76, 98, 176, 152, {r: 14, color: P.ink}),
    // Fine technical grid inside the canvas
    ...[0, 1, 2, 3, 4].map((col) => el("line", {
        x1: 104 + col * 30,
        x2: 104 + col * 30,
        y1: 108,
        y2: 240,
        stroke: "#fff",
        "stroke-opacity": 0.08,
        "stroke-width": 1.2,
    })),
    ...[0, 1, 2, 3].map((row) => el("line", {
        x1: 86,
        x2: 242,
        y1: 126 + row * 32,
        y2: 126 + row * 32,
        stroke: "#fff",
        "stroke-opacity": 0.08,
        "stroke-width": 1.2,
    })),
    // Connecting signal paths linking layers inside the digital canvas
    el("path", {
        d: "M114 142C146 142 150 176 184 176M114 206C150 206 154 176 184 176M184 176C202 176 206 140 220 140",
        fill: "none",
        stroke: P.mint,
        "stroke-width": 3.5,
        "stroke-linecap": "round",
    }),
    el("path", {
        d: "M184 176C202 176 206 212 220 212",
        fill: "none",
        stroke: P.sky,
        "stroke-width": 3.5,
        "stroke-linecap": "round",
    }),
    // Layered modular blocks/nodes placed on the canvas
    slab(94, 124, 38, 36, {r: 9, depth: 5, color: P.cobalt, shadow: false}),
    slab(94, 188, 38, 36, {r: 9, depth: 5, color: P.orange, shadow: false}),
    disc(184, 176, 17, {color: P.mint, depth: 4, shadow: false}),
    el("circle", {cx: 184, cy: 176, r: 6, fill: P.paper}),
    disc(220, 140, 11, {color: P.butter, depth: 3, shadow: false}),
    disc(220, 212, 11, {color: P.lilac, depth: 3, shadow: false}),
    // Right control column: precision compass/curiosity dial + tactile keys
    disc(294, 142, 34, {color: P.alu, depth: 8, shadow: false}),
    el("circle", {cx: 294, cy: 142, r: 24, fill: P.ink}),
    ...Array.from({length: 8}, (_, index) => {
        const angle = (Math.PI / 4) * index;
        return el("line", {
            x1: 294 + Math.cos(angle) * 18,
            y1: 142 + Math.sin(angle) * 18,
            x2: 294 + Math.cos(angle) * 21,
            y2: 142 + Math.sin(angle) * 21,
            stroke: "#fff",
            "stroke-opacity": 0.45,
            "stroke-width": 2,
            "stroke-linecap": "round",
        });
    }),
    group([
        el("path", {d: "M294 123l5.5 19h-11z", fill: P.orange}),
        el("path", {d: "M294 161l5.5-19h-11z", fill: P.alu}),
    ], {class: "sweep"}),
    disc(294, 142, 4.5, {color: P.paper, depth: 1, shadow: false}),
    // Tactile keys under the dial
    key(268, 198, 52, 18, P.butter, {depth: 4}),
    key(268, 228, 52, 18, P.alu, {depth: 4}),
    // Bottom toolbar keys + status lights
    key(78, 266, 64, 22, P.alu, {depth: 5}),
    key(154, 266, 44, 22, P.cobalt, {depth: 5}),
    key(210, 266, 44, 22, P.alu, {depth: 5}),
    led(278, 277, P.mint, {r: 4.5, pulse: true}),
    led(300, 277, P.butter, {r: 4}),
    led(320, 277, P.sky, {r: 4}),
    screw(70, 92),
    screw(330, 92),
];

export const ABOUT_TILE = "mint";

/** Every collection's objects and the tile each one sits on (tokens.css, --color-tile-*). */
export const PAGE_ART = {
    services: {
        scenes: SERVICE_SCENES,
        tiles: {
            integration: "sky",
            crm: "peach",
            web: "lilac",
            data: "butter",
            automation: "rose",
            infra: "stone",
            observability: "sage",
            consulting: "mint"
        },
    },
    reasons: {
        scenes: REASON_SCENES,
        tiles: {
            vision: "sky", costs: "mint", integration: "lilac", autonomy: "peach", versatility: "stone", calm: "sage",
            business: "rose", learning: "butter", detail: "sky", team: "lilac", initiative: "peach",
        },
    },
    experience: {
        scenes: EXPERIENCE_SCENES,
        tiles: {tivenos: "sky", adcom: "peach", muvu: "mint", quipux: "butter"},
    },
    education: {
        scenes: EDUCATION_SCENES,
        tiles: {politecnico: "sky", cyberDiploma: "sage", sena: "peach", pascual: "lilac", inem: "butter"},
    },
    organizations: {
        scenes: ORGANIZATION_SCENES,
        tiles: {
            tivenos: "sky", adcom: "peach", smartpot: "mint", gopoli: "sky", peppertech: "rose", engineering: "stone",
            taurus: "butter", testlabdata: "lilac", technical: "sage", vocational: "rose",
        },
    },
};

