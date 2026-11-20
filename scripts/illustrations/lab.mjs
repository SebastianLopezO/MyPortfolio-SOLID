/*
 * The modules of the lab board (components/sections/SkillsSection.tsx): one object per group of tools. Most groups
 * borrow the object of the project that put those tools to work; databases, cloud and networks get objects of their own.
 */
import {cable, darken, disc, el, grill, group, led, lighten, PALETTE as P, slab, well} from "./kit.mjs";

/** A database: three stacked cylinders seen from the front, with a light on each band. */
const databases = () => {
    const parts = [el("ellipse", {
        cx: 200,
        cy: 318,
        rx: 104,
        ry: 26,
        fill: "#0d1120",
        opacity: 0.2,
        filter: "url(#soft)"
    })];
    for (let index = 2; index >= 0; index--) {
        const y = 118 + index * 62;
        const color = [P.cobalt, lighten(P.cobalt, 0.18), lighten(P.cobalt, 0.32)][index];
        parts.push(
            el("path", {d: `M100 ${y}v52a100 34 0 0 0 200 0v-52z`, fill: darken(color, 0.18)}),
            el("ellipse", {cx: 200, cy: y, rx: 100, ry: 34, fill: color}),
            el("ellipse", {
                cx: 200,
                cy: y,
                rx: 99,
                ry: 33,
                fill: "none",
                stroke: "#fff",
                "stroke-opacity": 0.4,
                "stroke-width": 1.5
            }),
            led(262, y + 46, index === 0 ? P.mint : P.butter, {r: 4, pulse: index === 0}),
        );
    }
    return parts;
};

/** The cloud: a rounded cloud plate with a row of server lights. */
const cloud = () => {
    const outline = "M118 270a62 62 0 0 1-8-123 86 86 0 0 1 164-18 70 70 0 0 1 22 141z";
    return [
        el("path", {d: outline, fill: "#0d1120", opacity: 0.2, filter: "url(#soft)", transform: "translate(0 22)"}),
        el("path", {d: outline, fill: darken(P.alu, 0.17), transform: "translate(0 14)"}),
        el("path", {d: outline, fill: P.alu}),
        el("path", {d: outline, fill: "url(#sheen)"}),
        well(132, 206, 136, 34, {r: 17}),
        ...[P.mint, P.mint, P.sky, P.butter].map((color, index) => led(152 + index * 32, 223, color, {
            r: 4,
            pulse: index === 3
        })),
        cable("M200 284C200 316 236 330 268 348", P.sky, {width: 7}),
    ];
};

/** Networks: a router with two antennas and a row of ports. */
const networks = () => [
    ...[[128, -12], [272, 12]].map(([x, angle]) => group([
        el("rect", {x: x - 7, y: 64, width: 14, height: 110, rx: 7, fill: P.graphite}),
        el("rect", {x: x - 4, y: 70, width: 4, height: 90, rx: 2, fill: "#fff", opacity: 0.15}),
    ], {transform: `rotate(${angle} ${x} 170)`})),
    slab(64, 160, 272, 118, {r: 26, depth: 16, color: P.graphite}),
    ...[0, 1, 2, 3, 4].map((index) => well(90 + index * 44, 208, 32, 26, {r: 6})),
    ...[P.mint, P.mint, P.butter, P.mint, P.lilac].map((color, index) => led(106 + index * 44, 186, color, {
        r: 3.6,
        pulse: index === 2
    })),
    grill(92, 254, 12, 1, {gap: 18, r: 2.4, color: "#fff", opacity: 0.14}),
    disc(200, 112, 18, {color: P.sky, depth: 5}),
];

export const LAB_SCENES = {databases, cloud, networks};

/** Each group of tools and the object that stands for it on the board. */
export const LAB = {
    languages: "projects/vocational",
    backend: "projects/integration-platform",
    crm: "projects/crm-widgets",
    data: "projects/taurus",
    databases: "lab/databases",
    frontend: "projects/landing-platform",
    devops: "projects/observability",
    cloud: "lab/cloud",
    security: "projects/cybersecurity-labs",
    networks: "lab/networks",
    iot: "projects/smartpot",
    ai: "projects/ai-techniques",
    testing: "projects/tdd-polyglot",
    tools: "projects/zoho-toolkit",
    foundations: "projects/data-compressor",
};
