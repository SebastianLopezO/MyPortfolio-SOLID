/*
 * The hero's board: the portrait sits in a socket at the middle, and cables run from it to six of the devices of the
 * work (the CRM, its snapshots, the monitoring, a planter, a funnel and the bulk tools). It says what the work is,
 * connecting systems, before a word is read. The page lays the portrait over the socket (HeroSection, --socket-*) and
 * a link over each device (HERO.spots), which names the project the device stands for and opens its page.
 */
import {cable, group, PALETTE as P, plug, slab} from "./kit.mjs";
import {SCENES} from "./scenes.mjs";

const WIDTH = 800;
const HEIGHT = 800;

/** Where the portrait goes, in the board's units; the hero places the photo with these as percentages. */
export const SOCKET = {x: 262, y: 192, width: 276, height: 416, radius: 138};

/*
 * The devices, in reading order: [the project, where it sits, its scale, the box the drawn device fills on the board].
 * The box is the device's measured outline with a little room around it (x, y, width, height); it is what the page's
 * link covers, so it moves with the device when a device moves or is redrawn.
 */
const DEVICES = [
    ["crmWidgets", 10, 10, 0.5, [41, 34, 140, 158]],
    ["observability", 590, 20, 0.5, [615, 58, 150, 128]],
    ["martech", -6, 300, 0.42, [15, 326, 127, 133]],
    ["zohoToolkit", 636, 300, 0.42, [653, 327, 134, 120]],
    ["crmSnapshots", 20, 560, 0.5, [40, 601, 165, 115]],
    ["smartpot", 580, 566, 0.5, [611, 583, 167, 160]],
];

const place = (id, x, y, scale) => group(SCENES[id](), {transform: `translate(${x} ${y}) scale(${scale})`});

const LINKS = [
    // [from on the socket, the curve, the device's end, color]
    ["M250 290C190 290 170 200 130 170", P.orange],
    ["M550 280C620 280 640 190 680 160", P.mint],
    ["M250 400C170 400 120 380 92 400", P.pink],
    ["M550 410C640 410 690 380 716 400", P.butter],
    ["M262 540C200 560 170 600 150 640", P.lilac],
    ["M538 540C600 560 630 600 650 640", P.cobalt],
];

const percent = (value, total) => Number((value / total * 100).toFixed(2));

export const HERO = {
    width: WIDTH,
    height: HEIGHT,
    socket: SOCKET,
    /** Each device's box as percentages of the board, the way the page lays a link over it. */
    spots: DEVICES.map(([id, , , , [x, y, width, height]]) => ({
        id,
        left: percent(x, WIDTH),
        top: percent(y, HEIGHT),
        width: percent(width, WIDTH),
        height: percent(height, HEIGHT),
    })),
    body: () => group([
        ...LINKS.map(([d, color]) => cable(d, color, {width: 8})),
        ...DEVICES.map(([id, x, y, scale]) => place(id, x, y, scale)),
        slab(250, 180, 300, 440, {r: 150, depth: 20, color: P.alu}),
        ...[[250, 290, 90], [550, 280, -90], [250, 400, 90], [550, 410, -90], [262, 540, 70], [538, 540, -70]]
            .map(([x, y, angle], index) => plug(x, y, LINKS[index][1], {w: 22, h: 28, rotate: angle})),
    ]),
};
