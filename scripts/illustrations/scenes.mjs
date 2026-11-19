/*
 * One object per project, drawn with the kit on a 400 × 400 canvas. Each one hints at what the project does without
 * picturing its screens: a hub with cables for the integrations, a camera that takes snapshots of the CRM, a planter
 * with a probe for SmartPot. They are representative, never literal.
 */
import {
    bars,
    cable,
    darken,
    disc,
    el,
    grill,
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
    well,
} from "./kit.mjs";

/** A leaf from (x, y), pointing at the angle, with its midrib. */
const leaf = (x, y, angle, scale = 1, color = P.leaf) => group([
    el("path", {d: "M0 0C18-24 56-30 84-6C56 10 22 12 0 0Z", fill: color}),
    el("path", {d: "M0 0C18-24 56-30 84-6C56 10 22 12 0 0Z", fill: "url(#sheen)"}),
    el("path", {d: "M4 -1C30-8 54-10 78-6", fill: "none", stroke: "#fff", "stroke-opacity": 0.45, "stroke-width": 2, "stroke-linecap": "round"}),
], {transform: `translate(${x} ${y}) rotate(${angle}) scale(${scale})`});

/** Concentric arcs that leave a point: a signal. */
const signal = (x, y, color, {angle = -45, radii = [14, 26, 38]} = {}) => group(radii.map((r, index) => el("path", {
    d: `M${-r * 0.7} ${-r * 0.7}A${r} ${r} 0 0 1 ${r * 0.7} ${-r * 0.7}`,
    fill: "none",
    stroke: color,
    "stroke-width": 5,
    "stroke-linecap": "round",
    opacity: 1 - index * 0.25,
})), {transform: `translate(${x} ${y}) rotate(${angle + 45})`});

/** A map pin. */
const pin = (x, y, color) => group([
    el("ellipse", {cx: x, cy: y + 2, rx: 9, ry: 4, fill: "#000", opacity: 0.18}),
    el("path", {d: `M${x} ${y}c-10-14-18-22-18-32a18 18 0 0 1 36 0c0 10-8 18-18 32z`, fill: color}),
    el("circle", {cx: x, cy: y - 32, r: 7, fill: "#fff"}),
]);

/** A check mark. */
const check = (x, y, size, color = "#fff") => el("path", {
    d: `M${x - size * 0.45} ${y}l${size * 0.3} ${size * 0.3} ${size * 0.6}-${size * 0.62}`,
    fill: "none",
    stroke: color,
    "stroke-width": size * 0.22,
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
});

/** An envelope seen from the front. */
const envelope = (x, y, w, h, {color = P.paper, rotate, stamp} = {}) => group([
    slab(x, y, w, h, {r: 12, depth: 7, color}),
    el("path", {
        d: `M${x + 10} ${y + 10}L${x + w / 2} ${y + h * 0.55}L${x + w - 10} ${y + 10}`,
        fill: "none",
        stroke: darken(color, 0.16),
        "stroke-width": 3,
        "stroke-linejoin": "round"
    }),
    stamp && el("rect", {x: x + w - 38, y: y + h - 34, width: 24, height: 20, rx: 4, fill: stamp}),
], rotate ? {transform: `rotate(${rotate} ${x + w / 2} ${y + h / 2})`} : {});

/** A hexagonal plate with thickness. */
const hexagon = (cx, cy, r, color, depth = 9) => {
    const points = (oy) => Array.from({length: 6}, (_, index) => {
        const angle = (Math.PI / 3) * index + Math.PI / 6;
        return `${(cx + r * Math.cos(angle)).toFixed(1)},${(cy + oy + r * Math.sin(angle)).toFixed(1)}`;
    }).join(" ");
    return group([
        el("polygon", {points: points(depth + 9), fill: "#0d1120", opacity: 0.2, filter: "url(#soft)"}),
        el("polygon", {points: points(depth), fill: darken(color, 0.2), "stroke-linejoin": "round"}),
        el("polygon", {points: points(0), fill: color}),
        el("polygon", {points: points(0), fill: "url(#sheen)"}),
    ]);
};

/** A stack of discs: coins, a database, a funnel. */
const stack = (cx, cy, r, count, color, {step = 12, depth = 8} = {}) => group(
    Array.from({length: count}, (_, index) => disc(cx, cy - index * step, r, {
        color: index % 2 ? lighten(color, 0.08) : color,
        depth,
        shadow: index === 0,
    })),
);

/** A database: a cylinder of three bands seen from the front. */
const database = (cx, top, r, color, bands = 3) => {
    const ry = r * 0.36;
    const band = r * 0.62;
    const parts = [el("ellipse", {
        cx,
        cy: top + bands * band + ry + 12,
        rx: r * 0.9,
        ry: ry * 0.8,
        fill: "#0d1120",
        opacity: 0.22,
        filter: "url(#soft)"
    })];
    for (let index = bands - 1; index >= 0; index--) {
        const y = top + index * band;
        parts.push(
            el("path", {
                d: `M${cx - r} ${y}v${band - 6}a${r} ${ry} 0 0 0 ${2 * r} 0v-${band - 6}z`,
                fill: darken(color, 0.12 + index * 0.02)
            }),
            el("ellipse", {cx, cy: y, rx: r, ry, fill: index === 0 ? color : darken(color, 0.06)}),
            el("ellipse", {
                cx,
                cy: y,
                rx: r - 1,
                ry: ry - 1,
                fill: "none",
                stroke: "#fff",
                "stroke-opacity": 0.35,
                "stroke-width": 1.5
            }),
        );
    }
    parts.push(led(cx + r * 0.55, top + band * 0.55 + ry * 0.4, P.mint, {r: 3.5, pulse: true}));
    return group(parts);
};

export const SCENES = {
    smartpot: () => [
        disc(200, 196, 122, {color: P.bone, depth: 18}),
        el("circle", {cx: 200, cy: 196, r: 98, fill: P.soil}),
        el("circle", {cx: 200, cy: 196, r: 98, fill: "none", stroke: "#000", "stroke-opacity": 0.2, "stroke-width": 4}),
        grill(150, 150, 6, 6, {gap: 18, r: 2.4, color: "#fff", opacity: 0.12}),
        leaf(200, 200, -140, 1.05, darken(P.leaf, 0.08)),
        leaf(200, 200, -40, 1.15, P.leaf),
        leaf(200, 200, 70, 0.8, lighten(P.leaf, 0.12)),
        disc(200, 200, 9, {color: darken(P.leaf, 0.2), depth: 3, shadow: false}),
        cable("M300 98C330 70 350 60 380 52", P.graphite, {width: 7}),
        slab(272, 92, 38, 84, {r: 12, depth: 8, color: P.alu, rotate: 32}),
        led(286, 122, P.mint, {pulse: true}),
        signal(330, 170, P.mint, {angle: 20, radii: [12, 22, 32]}),
    ],

    gopoli: () => [
        slab(124, 52, 152, 292, {r: 34, depth: 12, color: P.graphite}),
        well(136, 66, 128, 264, {r: 24, color: "#e8f1ea"}),
        el("path", {d: "M136 150H264M136 238H264M180 66V330M232 66V330", stroke: "#fff", "stroke-width": 9}),
        el("path", {
            d: "M168 300C168 250 214 250 214 210S180 150 210 112",
            fill: "none",
            stroke: P.cobalt,
            "stroke-width": 6,
            "stroke-linecap": "round",
            "stroke-dasharray": "2 12"
        }),
        pin(210, 116, P.cobalt),
        disc(168, 300, 10, {color: P.orange, depth: 4, shadow: false}),
        key(184, 60, 32, 8, P.ink, {depth: 0}),
        key(150, 282, 46, 18, P.orange),
    ],

    peppercrm: () => [
        slab(64, 108, 272, 178, {r: 30, depth: 14, color: P.alu}),
        well(80, 124, 240, 146, {r: 20, color: darken(P.alu, 0.1)}),
        ...[[P.red, 92], [P.mint, 168], [P.butter, 244]].map(([color, x], index) => group([
            slab(x, 132 + (index === 0 ? -14 : 0), 64, 126, {r: 16, depth: 9, color}),
            textLines(x + 12, 160 + (index === 0 ? -14 : 0), [36, 26, 32], {color: "#000", opacity: 0.18}),
            led(x + 32, 236 + (index === 0 ? -14 : 0), "#fff", {r: 3.5}),
        ])),
        el("path", {
            d: "M124 118c0-14 6-22 18-26",
            fill: "none",
            stroke: P.leaf,
            "stroke-width": 7,
            "stroke-linecap": "round"
        }),
        leaf(140, 94, -30, 0.38, P.leaf),
    ],

    portfolio: () => [
        slab(64, 72, 272, 200, {r: 26, depth: 14, color: P.alu}),
        well(80, 88, 240, 150, {r: 14, color: P.paper}),
        ...[[P.sky, P.mint, P.butter], [P.pink, P.lilac, P.orange]].flatMap((row, rowIndex) => row.map((color, index) =>
            el("rect", {
                x: 92 + index * 74,
                y: 100 + rowIndex * 66,
                width: 66,
                height: 58,
                rx: 10,
                fill: lighten(color, 0.45)
            }))),
        disc(122, 129, 14, {color: P.cobalt, depth: 4, shadow: false}),
        slab(146, 290, 108, 38, {r: 19, depth: 8, color: P.graphite}),
        disc(234, 309, 14, {color: P.alu, depth: 4, shadow: false}),
        led(166, 309, P.mint, {r: 3.5}),
    ],

    taurus: () => [
        group([
            slab(60, 92, 136, 176, {r: 14, depth: 8, color: P.paper}),
            ...Array.from({length: 6}, (_, row) => el("line", {
                x1: 74,
                x2: 182,
                y1: 120 + row * 24,
                y2: 120 + row * 24,
                stroke: "#000",
                "stroke-opacity": 0.1,
                "stroke-width": 2
            })),
            el("line", {x1: 112, x2: 112, y1: 106, y2: 254, stroke: "#000", "stroke-opacity": 0.1, "stroke-width": 2}),
            el("line", {x1: 150, x2: 150, y1: 106, y2: 254, stroke: "#000", "stroke-opacity": 0.1, "stroke-width": 2}),
        ], {transform: "rotate(-9 128 180)"}),
        cable("M186 220C220 240 222 200 250 206", P.orange, {width: 7}),
        slab(222, 110, 136, 176, {r: 22, depth: 12, color: P.graphite}),
        well(236, 124, 108, 100, {r: 10}),
        bars(248, 0, [26, 44, 34, 62, 52], {w: 12, gap: 7, color: P.orange, base: 212}),
        key(240, 240, 46, 22, P.orange),
        key(296, 240, 34, 22, P.alu),
    ],

    integrationPlatform: () => [
        cable("M150 214C120 260 70 250 30 300", P.cobalt),
        cable("M250 188C290 120 330 110 380 90", P.orange),
        cable("M206 228C210 290 230 320 236 390", P.mint),
        slab(96, 120, 208, 136, {r: 28, depth: 16, color: P.graphite}),
        ...[0, 1, 2, 3].flatMap((col) => [0, 1].map((row) => well(118 + col * 44, 160 + row * 42, 32, 30, {r: 8}))),
        ...[P.mint, P.mint, P.butter, P.mint].map((color, index) => led(134 + index * 44, 140, color, {
            r: 3.6,
            pulse: index === 2
        })),
        plug(150, 214, P.cobalt, {w: 24, h: 30}),
        plug(250, 174, P.orange, {w: 24, h: 30}),
        plug(206, 216, P.mint, {w: 24, h: 30}),
        screw(112, 136), screw(288, 136), screw(112, 240), screw(288, 240),
    ],

    observability: () => [
        slab(66, 92, 268, 200, {r: 28, depth: 14, color: P.alu}),
        disc(156, 192, 70, {color: P.ink, depth: 0, shadow: false, bevel: false}),
        ...Array.from({length: 11}, (_, index) => {
            const angle = Math.PI * (0.8 + index * 0.14);
            return el("line", {
                x1: 156 + Math.cos(angle) * 52,
                y1: 192 + Math.sin(angle) * 52,
                x2: 156 + Math.cos(angle) * 60,
                y2: 192 + Math.sin(angle) * 60,
                stroke: index > 8 ? P.orange : "#fff",
                "stroke-opacity": index > 8 ? 1 : 0.6,
                "stroke-width": 3,
                "stroke-linecap": "round"
            });
        }),
        group([el("line", {
            x1: 156,
            y1: 192,
            x2: 196,
            y2: 160,
            stroke: P.orange,
            "stroke-width": 5,
            "stroke-linecap": "round"
        })], {class: "sweep"}),
        disc(156, 192, 9, {color: P.alu, depth: 3, shadow: false}),
        well(240, 120, 78, 76, {r: 12}),
        el("polyline", {
            points: "248,176 262,166 274,172 286,146 298,156 310,136",
            fill: "none",
            stroke: P.mint,
            "stroke-width": 4,
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        }),
        led(254, 226, P.mint), led(279, 226, P.mint), led(304, 226, P.butter, {pulse: true}),
        key(242, 248, 74, 20, P.graphite),
    ],

    crmWidgets: () => [
        slab(78, 64, 214, 262, {r: 24, depth: 12, color: P.paper}),
        el("rect", {x: 96, y: 84, width: 120, height: 14, rx: 7, fill: P.orange, opacity: 0.85}),
        textLines(96, 116, [170, 140, 156, 120], {gap: 18, h: 7}),
        well(96, 196, 98, 94, {r: 14, color: darken(P.paper, 0.06)}),
        bars(108, 0, [24, 40, 30, 56], {w: 12, gap: 8, color: P.orange, base: 278}),
        disc(276, 222, 34, {color: P.graphite, depth: 9}),
        el("line", {x1: 276, y1: 222, x2: 276, y2: 196, stroke: P.orange, "stroke-width": 5, "stroke-linecap": "round"}),
        slab(244, 286, 82, 34, {r: 17, depth: 7, color: P.mint}),
        disc(306, 303, 12, {color: "#fff", depth: 3, shadow: false}),
    ],

    admissionsForms: () => [
        slab(100, 64, 200, 272, {r: 22, depth: 12, color: P.bone}),
        slab(158, 50, 84, 34, {r: 12, depth: 8, color: P.graphite}),
        well(116, 96, 168, 222, {r: 12, color: P.paper}),
        ...[0, 1, 2, 3].map((row) => group([
            row < 3
                ? group([el("rect", {
                    x: 130,
                    y: 118 + row * 48,
                    width: 26,
                    height: 26,
                    rx: 7,
                    fill: P.mint
                }), check(143, 131 + row * 48, 18)])
                : el("rect", {
                    x: 131,
                    y: 119 + row * 48,
                    width: 24,
                    height: 24,
                    rx: 7,
                    fill: "none",
                    stroke: "#000",
                    "stroke-opacity": 0.25,
                    "stroke-width": 2.5
                }),
            textLines(168, 122 + row * 48, [96, 70], {gap: 11, h: 6}),
        ])),
        cable("M300 300C330 300 340 330 372 340", P.cobalt, {width: 7}),
    ],

    crmSnapshots: () => [
        slab(56, 116, 204, 156, {r: 28, depth: 14, color: P.alu}),
        slab(78, 98, 54, 26, {r: 9, depth: 6, color: P.graphite}),
        key(206, 100, 34, 18, P.orange),
        lens(156, 196, 46, {ring: P.lilac}),
        led(232, 136, P.mint, {r: 3.5, pulse: true}),
        grill(212, 236, 3, 2, {gap: 10, r: 2.2}),
        database(310, 136, 44, P.lilac),
    ],

    emailSignatures: () => [
        envelope(66, 104, 250, 176),
        el("path", {
            d: "M96 246c14-22 22-22 26-6s14 14 24-6 18-14 22 2 12 10 22-8",
            fill: "none",
            stroke: P.cobalt,
            "stroke-width": 5,
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        }),
        group([
            slab(0, -10, 170, 20, {r: 10, depth: 7, color: P.graphite}),
            el("path", {d: "M170 -10L206 0L170 10Z", fill: P.butter}),
            el("rect", {x: 130, y: -10, width: 10, height: 20, fill: P.butter}),
        ], {transform: "translate(180 300) rotate(-32)"}),
    ],

    martech: () => [
        disc(200, 214, 132, {color: lighten(P.orange, 0.78), depth: 14}),
        disc(200, 200, 98, {color: lighten(P.orange, 0.55), depth: 12, shadow: false}),
        disc(200, 188, 64, {color: lighten(P.orange, 0.25), depth: 10, shadow: false}),
        disc(200, 178, 30, {color: P.orange, depth: 8, shadow: false}),
        ...[[100, 170, P.sky], [128, 120, P.lilac], [292, 140, P.mint], [310, 230, P.pink], [96, 262, P.butter], [262, 300, P.sky]]
            .map(([x, y, color]) => disc(x, y, 9, {color, depth: 4, shadow: false})),
        ...[[160, 214, P.pink], [246, 196, P.mint]].map(([x, y, color]) => disc(x, y, 8, {
            color,
            depth: 3,
            shadow: false
        })),
        disc(200, 174, 9, {color: "#fff", depth: 3, shadow: false}),
    ],

    landingPlatform: () => [
        slab(52, 70, 276, 214, {r: 22, depth: 14, color: P.alu}),
        el("rect", {x: 52, y: 70, width: 276, height: 34, rx: 22, fill: darken(P.alu, 0.06)}),
        el("rect", {x: 52, y: 92, width: 276, height: 12, fill: darken(P.alu, 0.06)}),
        led(76, 87, P.red, {r: 4}), led(94, 87, P.butter, {r: 4}), led(112, 87, P.mint, {r: 4}),
        el("rect", {x: 70, y: 118, width: 240, height: 74, rx: 12, fill: lighten(P.cobalt, 0.72)}),
        textLines(86, 138, [120, 84], {gap: 16, h: 8, color: P.cobalt, opacity: 0.55}),
        el("rect", {x: 70, y: 204, width: 114, height: 62, rx: 12, fill: darken(P.alu, 0.05)}),
        el("rect", {x: 196, y: 204, width: 114, height: 62, rx: 12, fill: darken(P.alu, 0.05)}),
        disc(316, 286, 42, {color: P.cobalt, depth: 10}),
        el("path", {
            d: "M316 304V270M302 284l14-14 14 14",
            fill: "none",
            stroke: "#fff",
            "stroke-width": 6,
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        }),
    ],

    emailAutomations: () => [
        envelope(84, 130, 200, 138, {rotate: -14}),
        envelope(104, 116, 200, 138, {rotate: 4, color: lighten(P.pink, 0.75)}),
        envelope(116, 146, 200, 138, {rotate: 14, stamp: P.pink}),
        disc(300, 112, 40, {color: P.graphite, depth: 9}),
        el("path", {
            d: "M300 92V112L314 122",
            fill: "none",
            stroke: P.pink,
            "stroke-width": 5,
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        }),
    ],

    zohoToolkit: () => [
        slab(60, 84, 280, 222, {r: 28, depth: 16, color: P.graphite}),
        ...[0, 1, 2, 3].map((index) => group([
            well(92 + index * 46, 108, 14, 150, {r: 7}),
            slab(80 + index * 46, [196, 132, 218, 160][index], 38, 26, {r: 8, depth: 6, color: P.alu, shadow: false}),
            el("rect", {x: 86 + index * 46, y: [207, 143, 229, 171][index], width: 26, height: 3, rx: 1.5, fill: P.orange}),
        ])),
        key(266, 112, 50, 50, P.orange, {depth: 7}),
        key(266, 176, 50, 50, P.alu, {depth: 7}),
        led(291, 250, P.mint, {pulse: true}),
        screw(80, 102), screw(320, 102), screw(80, 284), screw(320, 284),
    ],

    realEstateSite: () => [
        el("path", {d: "M100 64a30 30 0 1 0 24 48a24 24 0 1 1-24-48z", fill: P.butter}),
        ...[[150, 70], [320, 96], [270, 58]].map(([x, y]) => el("circle", {cx: x, cy: y, r: 3, fill: P.butter})),
        slab(108, 176, 184, 150, {r: 10, depth: 12, color: P.bone}),
        el("path", {d: "M96 186L200 104L304 186Z", fill: darken(P.graphite, 0.05), "stroke-linejoin": "round"}),
        el("path", {d: "M96 186L200 104L304 186", fill: "none", stroke: P.graphite, "stroke-width": 12, "stroke-linejoin": "round", "stroke-linecap": "round"}),
        ...[[128, 200], [236, 200]].map(([x, y]) => group([well(x, y, 40, 40, {r: 6, color: P.butter}), el("rect", {
            x: x + 18,
            y,
            width: 4,
            height: 40,
            fill: P.bone
        }), el("rect", {x, y: y + 18, width: 40, height: 4, fill: P.bone})])),
        well(180, 258, 40, 68, {r: 8, color: P.orange}),
        el("circle", {cx: 210, cy: 294, r: 3, fill: "#fff"}),
    ],

    collectionAutomation: () => [
        stack(120, 260, 42, 5, P.butter, {step: 13}),
        stack(196, 262, 42, 8, P.butter, {step: 13}),
        stack(272, 258, 42, 3, P.butter, {step: 13}),
        disc(300, 108, 44, {color: P.alu, depth: 10}),
        el("circle", {cx: 300, cy: 108, r: 34, fill: "none", stroke: "#000", "stroke-opacity": 0.12, "stroke-width": 3}),
        el("path", {
            d: "M300 82V108L320 116",
            fill: "none",
            stroke: P.graphite,
            "stroke-width": 5,
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        }),
        led(300, 64, P.red, {r: 3.5, pulse: true}),
    ],

    engineering: () => [
        slab(52, 96, 296, 212, {r: 26, depth: 16, color: P.graphite}),
        ...Array.from({length: 12}, (_, index) => {
            const col = index % 4;
            const row = Math.floor(index / 4);
            const lit = {1: P.sky, 6: P.mint, 8: P.butter, 11: P.cobalt}[index];
            return group([
                key(72 + col * 66, 116 + row * 62, 56, 50, lit ? lighten(lit, 0.2) : P.alu, {depth: 6}),
                textLines(84 + col * 66, 132 + row * 62, [22, 14], {gap: 9, h: 4, opacity: 0.22}),
            ]);
        }),
    ],

    cybersecurityLabs: () => [
        el("path", {
            d: "M156 190V146a44 44 0 0 1 88 0v44",
            fill: "none",
            stroke: darken(P.alu, 0.2),
            "stroke-width": 26,
            "stroke-linecap": "round",
            transform: "translate(0 4)"
        }),
        el("path", {
            d: "M156 190V146a44 44 0 0 1 88 0v44",
            fill: "none",
            stroke: P.alu,
            "stroke-width": 22,
            "stroke-linecap": "round"
        }),
        slab(122, 176, 156, 142, {r: 26, depth: 14, color: P.graphite}),
        el("circle", {cx: 200, cy: 232, r: 13, fill: P.ink}),
        el("rect", {x: 194, y: 236, width: 12, height: 34, rx: 6, fill: P.ink}),
        led(200, 296, P.mint, {r: 4, pulse: true}),
        slab(40, 236, 70, 92, {r: 14, depth: 9, color: P.alu, rotate: -10}),
        ...Array.from({length: 6}, (_, index) => el("circle", {
            cx: 60 + (index % 2) * 28,
            cy: 262 + Math.floor(index / 2) * 22,
            r: 6,
            fill: P.graphite,
            opacity: 0.6,
            transform: "rotate(-10 75 282)"
        })),
    ],

    // Two terminals wired together: the program's software was built by a team of two.
    technical: () => [
        cable("M150 200C190 250 214 160 252 206", P.cobalt, {width: 8}),
        ...[[48, 92, -6, P.mint], [212, 128, 6, P.orange]].map(([x, y, angle, color]) => group([
            slab(x, y, 140, 150, {r: 20, depth: 12, color: P.graphite}),
            well(x + 14, y + 14, 112, 78, {r: 10}),
            el("path", {
                d: `M${x + 28} ${y + 34}l12 9-12 9`,
                fill: "none",
                stroke: color,
                "stroke-width": 5,
                "stroke-linecap": "round",
                "stroke-linejoin": "round"
            }),
            textLines(x + 28, y + 62, [62, 40], {gap: 12, h: 5, color, opacity: 0.45}),
            key(x + 16, y + 106, 50, 24, color),
            key(x + 74, y + 106, 50, 24, P.alu),
        ], {transform: `rotate(${angle} ${x + 70} ${y + 75})`})),
    ],

    // A terminal with a key for each of the first languages: PHP, Excel, Java and Python.
    vocational: () => [
        slab(56, 82, 288, 220, {r: 26, depth: 16, color: P.graphite}),
        well(76, 102, 248, 132, {r: 14}),
        el("path", {
            d: "M98 132l18 14-18 14",
            fill: "none",
            stroke: P.mint,
            "stroke-width": 6,
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        }),
        el("rect", {x: 128, y: 154, width: 20, height: 8, rx: 2, fill: P.mint, class: "pulse"}),
        textLines(98, 186, [150, 110], {gap: 16, h: 7, color: P.mint, opacity: 0.4}),
        ...[P.lilac, P.mint, P.orange, P.butter].map((color, index) => key(80 + index * 62, 250, 52, 30, color)),
    ],

    lettuceDiseases: () => [
        ...[0, 60, 120, 180, 240, 300].map((angle) => leaf(200, 200, angle, 1.05, mix(P.leaf, P.lime, 0.35))),
        ...[30, 90, 150, 210, 270, 330].map((angle) => leaf(200, 200, angle, 0.72, P.leaf)),
        disc(200, 200, 18, {color: lighten(P.lime, 0.3), depth: 4, shadow: false}),
        el("circle", {cx: 262, cy: 236, r: 9, fill: "#8a5a2b", opacity: 0.85}),
        el("rect", {
            x: 240,
            y: 214,
            width: 44,
            height: 44,
            rx: 6,
            fill: "none",
            stroke: P.red,
            "stroke-width": 3.5,
            "stroke-dasharray": "7 6"
        }),
        ...[[70, 70, 1, 1], [330, 70, -1, 1], [70, 330, 1, -1], [330, 330, -1, -1]].map(([x, y, sx, sy]) => el("path", {
            d: `M${x} ${y + sy * 34}V${y}H${x + sx * 34}`,
            fill: "none",
            stroke: P.cobalt,
            "stroke-width": 6,
            "stroke-linecap": "round",
            "stroke-linejoin": "round"
        })),
    ],

    radarImaging: () => [
        disc(200, 196, 130, {color: P.graphite, depth: 16}),
        el("circle", {cx: 200, cy: 196, r: 108, fill: P.ink}),
        ...[36, 72, 106].map((r) => el("circle", {
            cx: 200,
            cy: 196,
            r,
            fill: "none",
            stroke: P.mint,
            "stroke-opacity": 0.28,
            "stroke-width": 2
        })),
        el("path", {d: "M92 196H308M200 88V304", stroke: P.mint, "stroke-opacity": 0.2, "stroke-width": 2}),
        group([el("path", {d: "M200 196L200 90A106 106 0 0 1 292 143Z", fill: P.mint, opacity: 0.35})], {class: "sweep"}),
        ...[[230, 140], [250, 170], [158, 230], [176, 150], [266, 236], [140, 176], [214, 262], [244, 120]].map(([x, y], index) => el("circle", {
            cx: x,
            cy: y,
            r: index % 3 ? 2.5 : 4,
            fill: P.mint,
            opacity: index % 2 ? 0.55 : 0.95
        })),
        disc(200, 196, 7, {color: P.mint, depth: 2, shadow: false}),
    ],

    schoolServices: () => [
        cable("M180 196C130 220 110 250 106 290", P.orange),
        cable("M220 196C270 220 292 250 296 290", P.pink),
        slab(140, 104, 120, 112, {r: 24, depth: 16, color: P.alu}),
        textLines(160, 132, [80, 56, 70], {gap: 16, h: 7}),
        led(240, 124, P.mint, {r: 3.5}),
        slab(66, 284, 80, 64, {r: 14, depth: 10, color: P.orange}),
        hexagon(296, 314, 42, P.pink),
    ],

    fashionLine: () => [
        ...[["#8d929a", 9, 2], [P.alu, 6, 0]].map(([stroke, width, dy]) => el("path", {
            d: "M200 70a16 16 0 1 1 16 16c-10 0-16 6-16 14v8L110 150h180l-90-42",
            fill: "none",
            stroke,
            "stroke-width": width,
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            transform: `translate(0 ${dy})`,
        })),
        ...[[P.sky, 172], [P.mint, 230], [P.pink, 288]].map(([color, y]) => group([
            slab(92, y, 216, 48, {r: 10, depth: 9, color}),
            ...Array.from({length: 7}, (_, index) => el("rect", {
                x: 112 + index * 28,
                y: y + 10,
                width: 6,
                height: 28,
                rx: 3,
                fill: "#000",
                opacity: 0.1
            })),
        ])),
    ],

    tddPolyglot: () => [
        slab(150, 54, 100, 254, {r: 34, depth: 16, color: P.graphite}),
        disc(200, 106, 30, {color: darken(P.red, 0.45), depth: 0, shadow: false, bevel: false}),
        disc(200, 180, 30, {color: darken(P.butter, 0.5), depth: 0, shadow: false, bevel: false}),
        el("circle", {cx: 200, cy: 254, r: 44, fill: P.mint, opacity: 0.4, filter: "url(#glow)"}),
        disc(200, 254, 30, {color: P.mint, depth: 0, shadow: false}),
        check(200, 252, 30),
        ...[P.lilac, P.sky, P.orange, P.butter, P.red, P.mint].map((color, index) => disc(100 + index * 40, 352, 10, {
            color,
            depth: 4,
            shadow: false
        })),
    ],

    aiTechniques: () => [
        ...Array.from({length: 5}, (_, index) => [
            el("rect", {x: 150 + index * 24, y: 96, width: 10, height: 26, rx: 4, fill: darken(P.alu, 0.2)}),
            el("rect", {x: 150 + index * 24, y: 280, width: 10, height: 26, rx: 4, fill: darken(P.alu, 0.2)}),
            el("rect", {x: 96, y: 150 + index * 24, width: 26, height: 10, rx: 4, fill: darken(P.alu, 0.2)}),
            el("rect", {x: 280, y: 150 + index * 24, width: 26, height: 10, rx: 4, fill: darken(P.alu, 0.2)}),
        ]).flat(),
        slab(114, 110, 172, 172, {r: 26, depth: 14, color: P.graphite}),
        well(136, 132, 128, 128, {r: 14}),
        el("path", {
            d: "M164 162L200 196L236 162M200 196V236M164 162L236 162",
            fill: "none",
            stroke: P.lilac,
            "stroke-opacity": 0.7,
            "stroke-width": 3.5,
            "stroke-linecap": "round"
        }),
        ...[[164, 162, P.lilac], [236, 162, P.sky], [200, 196, "#fff"], [200, 236, P.mint]].map(([x, y, color]) => el("circle", {
            cx: x,
            cy: y,
            r: 9,
            fill: color
        })),
        led(200, 236, P.mint, {r: 4, pulse: true}),
    ],

    dataCompressor: () => [
        el("path", {
            d: "M200 96L136 170M200 96L264 170M136 170L100 246M136 170L172 246M264 170L300 246",
            fill: "none",
            stroke: "#8d929a",
            "stroke-width": 5,
            "stroke-linecap": "round"
        }),
        disc(200, 96, 24, {color: P.graphite, depth: 7}),
        disc(136, 170, 20, {color: P.alu, depth: 6}),
        disc(264, 170, 20, {color: P.alu, depth: 6}),
        ...[[100, 246, P.butter], [172, 246, P.orange], [300, 246, P.sky]].map(([x, y, color]) => disc(x, y, 18, {
            color,
            depth: 6
        })),
        slab(176, 300, 48, 40, {r: 10, depth: 8, color: P.butter}),
        el("path", {d: "M200 300v40", stroke: "#000", "stroke-opacity": 0.15, "stroke-width": 3, "stroke-dasharray": "4 4"}),
    ],

    carSpace: () => [
        slab(52, 70, 296, 252, {r: 26, depth: 14, color: "#585d66"}),
        ...[0, 1, 2, 3, 4].map((index) => el("rect", {
            x: 78 + index * 60,
            y: 88,
            width: 5,
            height: 96,
            rx: 2.5,
            fill: "#fff",
            opacity: 0.75
        })),
        el("rect", {x: 78, y: 210, width: 244, height: 5, rx: 2.5, fill: "#fff", opacity: 0.35}),
        el("rect", {
            x: 207,
            y: 94,
            width: 50,
            height: 84,
            rx: 8,
            fill: P.mint,
            opacity: 0.25,
            stroke: P.mint,
            "stroke-width": 3
        }),
        check(232, 136, 26, P.mint),
        group([
            slab(0, 0, 46, 82, {r: 14, depth: 7, color: P.cobalt, shadow: false}),
            el("rect", {x: 7, y: 14, width: 32, height: 16, rx: 5, fill: P.ink, opacity: 0.8}),
            el("rect", {x: 7, y: 56, width: 32, height: 12, rx: 4, fill: P.ink, opacity: 0.6}),
        ], {transform: "translate(91 96)"}),
        group([
            slab(0, 0, 46, 82, {r: 14, depth: 7, color: P.orange, shadow: false}),
            el("rect", {x: 7, y: 14, width: 32, height: 16, rx: 5, fill: P.ink, opacity: 0.8}),
            el("rect", {x: 7, y: 56, width: 32, height: 12, rx: 4, fill: P.ink, opacity: 0.6}),
        ], {transform: "translate(268 236) rotate(90 23 41)"}),
    ],

    sitePersist: () => [
        slab(80, 74, 220, 232, {r: 22, depth: 14, color: P.paper}),
        el("path", {d: "M80 96a22 22 0 0 1 22-22h176a22 22 0 0 1 22 22v28H80z", fill: P.red}),
        ...[124, 176, 228, 256].map((x) => el("rect", {x: x - 4, y: 60, width: 8, height: 30, rx: 4, fill: P.graphite})),
        ...Array.from({length: 20}, (_, index) => {
            const col = index % 5;
            const row = Math.floor(index / 5);
            return el("rect", {
                x: 100 + col * 38,
                y: 144 + row * 38,
                width: 28,
                height: 28,
                rx: 7,
                fill: index === 12 ? P.mint : "#000",
                opacity: index === 12 ? 1 : 0.07
            });
        }),
        check(190, 234, 18),
        slab(244, 254, 104, 66, {r: 12, depth: 8, color: P.cobalt, rotate: -14}),
        el("rect", {x: 258, y: 270, width: 26, height: 20, rx: 4, fill: P.butter, transform: "rotate(-14 296 287)"}),
    ],

    videoToAscii: () => [
        slab(42, 112, 150, 176, {r: 18, depth: 12, color: P.graphite}),
        ...[0, 1, 2, 3, 4, 5].flatMap((index) => [
            el("rect", {x: 54, y: 126 + index * 26, width: 12, height: 14, rx: 3, fill: P.ink}),
            el("rect", {x: 168, y: 126 + index * 26, width: 12, height: 14, rx: 3, fill: P.ink}),
        ]),
        el("rect", {x: 76, y: 128, width: 82, height: 144, rx: 8, fill: lighten(P.sky, 0.2)}),
        el("circle", {cx: 117, cy: 178, r: 20, fill: P.butter}),
        el("path", {d: "M76 250l30-36 22 22 14-14 16 18v32H76z", fill: P.leaf}),
        ...Array.from({length: 48}, (_, index) => {
            const col = index % 6;
            const row = Math.floor(index / 6);
            const value = Math.abs(Math.sin(index * 1.7 + row)) * 0.8 + 0.12;
            return el("rect", {
                x: 222 + col * 22,
                y: 112 + row * 22,
                width: 14,
                height: 16,
                rx: 3,
                fill: "#8d929a",
                opacity: Math.max(0.3, value).toFixed(2)
            });
        }),
        el("path", {
            d: "M196 200h18",
            stroke: "#8d929a",
            "stroke-width": 4,
            "stroke-linecap": "round",
            "stroke-dasharray": "2 6"
        }),
    ],

    companyDream: () => [
        group([
            el("path", {
                d: "M146 70h108v150H146z",
                fill: P.paper
            }),
            el("path", {
                d: "M146 70l9-10 9 10 9-10 9 10 9-10 9 10 9-10 9 10 9-10 9 10 9-10 9 10",
                fill: P.paper
            }),
            textLines(162, 92, [76, 56, 66, 44], {gap: 18, h: 6}),
            el("rect", {x: 162, y: 172, width: 76, height: 10, rx: 5, fill: P.mint}),
        ]),
        slab(92, 196, 216, 124, {r: 26, depth: 16, color: P.alu}),
        well(132, 210, 136, 14, {r: 7}),
        key(118, 262, 46, 34, P.mint),
        key(176, 262, 46, 34, P.alu),
        key(234, 262, 46, 34, P.butter),
        led(284, 238, P.mint, {r: 3.5, pulse: true}),
    ],
};

/** The color layer each illustration sits on, by family: the page reads it to paint the tile. */
export const TILES = {
    smartpot: "mint",
    gopoli: "sky",
    peppercrm: "rose",
    portfolio: "lilac",
    taurus: "butter",
    integrationPlatform: "sky",
    observability: "sage",
    crmWidgets: "peach",
    admissionsForms: "sky",
    crmSnapshots: "lilac",
    emailSignatures: "butter",
    martech: "peach",
    landingPlatform: "sky",
    emailAutomations: "rose",
    zohoToolkit: "stone",
    realEstateSite: "lilac",
    collectionAutomation: "butter",
    engineering: "sky",
    cybersecurityLabs: "sage",
    technical: "sky",
    vocational: "peach",
    lettuceDiseases: "sage",
    radarImaging: "stone",
    schoolServices: "mint",
    fashionLine: "rose",
    tddPolyglot: "sage",
    aiTechniques: "lilac",
    dataCompressor: "butter",
    carSpace: "stone",
    sitePersist: "sky",
    videoToAscii: "stone",
    companyDream: "mint",
};
