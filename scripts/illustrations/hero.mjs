/*
 * The hero's board: the portrait sits whole in a square socket at the middle, and cables run from it to six of the
 * devices of the work (the CRM, its snapshots, the monitoring, a planter, a funnel and the bulk tools). It says what the
 * work is, connecting systems, before a word is read. The page lays the portrait over the socket (HERO.socket) and a
 * link over each device (HERO.spots), which names the project the device stands for and opens its page.
 */
import {cable, group, PALETTE as P, plug, slab} from "./kit.mjs";
import {SCENES} from "./scenes.mjs";

const WIDTH = 800;
const HEIGHT = 800;

/*
 * The socket is a square plate as wide as the room between the devices allows, so the photo, which is square, shows
 * whole and as large as it can. The portrait goes in its face, 14 units in from each edge, with corners that follow
 * the plate's.
 */
const PLATE = {x: 200, y: 190, size: 400, radius: 64};
const INSET = 14;

/** Where the portrait goes, in the board's units; the hero places the photo with these as percentages. */
export const SOCKET = {
    x: PLATE.x + INSET,
    y: PLATE.y + INSET,
    width: PLATE.size - INSET * 2,
    height: PLATE.size - INSET * 2,
    radius: PLATE.radius - INSET,
};

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

/*
 * The cables, in the devices' order: [the plug on the socket's edge (x, y), the curve to the device, color]. Each one
 * leaves a side of the plate and ends under its device, which is drawn over it.
 */
const LINKS = [
    [[200, 268], "M200 268C150 268 150 205 122 176", P.orange],
    [[600, 260], "M600 260C652 260 652 192 682 160", P.mint],
    [[200, 398], "M200 398C160 398 128 390 92 400", P.pink],
    [[600, 408], "M600 408C648 408 690 396 716 400", P.butter],
    [[200, 528], "M200 528C152 532 156 598 140 640", P.lilac],
    [[600, 520], "M600 520C648 524 646 598 660 640", P.cobalt],
];

const percent = (value, total) => Number((value / total * 100).toFixed(2));

export const HERO = {
    width: WIDTH,
    height: HEIGHT,
    socket: SOCKET,
    /** The socket as percentages of the board, its corners as a percentage of its own width. */
    portrait: {
        left: percent(SOCKET.x, WIDTH),
        top: percent(SOCKET.y, HEIGHT),
        width: percent(SOCKET.width, WIDTH),
        height: percent(SOCKET.height, HEIGHT),
        radius: percent(SOCKET.radius, SOCKET.width),
    },
    /** Each device's box as percentages of the board, the way the page lays a link over it. */
    spots: DEVICES.map(([id, , , , [x, y, width, height]]) => ({
        id,
        left: percent(x, WIDTH),
        top: percent(y, HEIGHT),
        width: percent(width, WIDTH),
        height: percent(height, HEIGHT),
    })),
    body: () => group([
        ...LINKS.map(([, d, color]) => cable(d, color, {width: 8})),
        ...DEVICES.map(([id, x, y, scale]) => place(id, x, y, scale)),
        slab(PLATE.x, PLATE.y, PLATE.size, PLATE.size, {r: PLATE.radius, depth: 20, color: P.alu}),
        ...LINKS.map(([[x, y], , color]) => plug(x, y, color, {w: 22, h: 28, rotate: x < WIDTH / 2 ? 90 : -90})),
    ]),
};
