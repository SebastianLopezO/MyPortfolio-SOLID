/*
 * Draws the site's illustrations into public/illustrations as static SVG files, one per project plus the hero's
 * board, and writes the map the components read (src/content/shared/project-art.ts). The files are committed: run
 * `pnpm illustrations` after changing a scene (scripts/illustrations) and commit what it writes. With --sheet it
 * also writes a contact sheet of every illustration on its tile, in both themes, to review them side by side.
 */
import {mkdirSync, writeFileSync} from "node:fs";
import {dirname, join} from "node:path";
import {fileURLToPath} from "node:url";
import {group, svg} from "./illustrations/kit.mjs";
import {SCENES, TILES} from "./illustrations/scenes.mjs";
import {HERO} from "./illustrations/hero.mjs";
import {LAB, LAB_SCENES} from "./illustrations/lab.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public", "illustrations");
const kebab = (id) => id.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

mkdirSync(join(OUT, "projects"), {recursive: true});
mkdirSync(join(OUT, "lab"), {recursive: true});

const files = {};
for (const [id, scene] of Object.entries(SCENES)) {
    const file = `projects/${kebab(id)}.svg`;
    writeFileSync(join(OUT, file), svg("", group(scene())));
    files[id] = file;
}
writeFileSync(join(OUT, "hero.svg"), svg("", HERO.body(), {width: HERO.width, height: HERO.height}));
for (const [id, scene] of Object.entries(LAB_SCENES)) writeFileSync(join(OUT, "lab", `${id}.svg`), svg("", group(scene())));

const art = `// Written by scripts/render-illustrations.mjs from scripts/illustrations; run \`pnpm illustrations\` to change it.
import type {SkillGroupId} from "@/types/content";
import type {ProjectId} from "@/types/project";

/** The color layer behind an illustration (tokens.css, --color-tile-*). */
export type Tile = "sky" | "mint" | "peach" | "lilac" | "butter" | "rose" | "sage" | "stone";

/** Each project's illustration in public/ and the tile it sits on. */
export const PROJECT_ART: Record<ProjectId, { file: string; tile: Tile }> = {
${Object.keys(SCENES).map((id) => `    ${id}: {file: "/illustrations/${files[id]}", tile: "${TILES[id]}"},`).join("\n")}
};

export const HERO_ART = {file: "/illustrations/hero.svg", width: ${HERO.width}, height: ${HERO.height}} as const;

/** The devices on the hero's board: the project each one stands for and the box it fills, in percent of the board. */
export const HERO_SPOTS = [
${HERO.spots.map(({id, left, top, width, height}) => `    {id: "${id}", left: ${left}, top: ${top}, width: ${width}, height: ${height}},`).join("\n")}
] as const satisfies readonly { id: ProjectId; left: number; top: number; width: number; height: number }[];

export type HeroDeviceId = (typeof HERO_SPOTS)[number]["id"];

/** The object that stands for each group of tools on the lab board. */
export const LAB_ART: Record<SkillGroupId, string> = {
${Object.entries(LAB).map(([id, file]) => `    ${id}: "/illustrations/${file}.svg",`).join("\n")}
};
`;
writeFileSync(join(ROOT, "src", "content", "shared", "project-art.ts"), art);

if (process.argv.includes("--sheet")) {
    const tiles = {
        light: {
            sky: "oklch(0.93 0.035 240)",
            mint: "oklch(0.93 0.04 170)",
            peach: "oklch(0.93 0.04 55)",
            lilac: "oklch(0.93 0.035 300)",
            butter: "oklch(0.95 0.05 95)",
            rose: "oklch(0.93 0.035 10)",
            sage: "oklch(0.93 0.03 135)",
            stone: "oklch(0.935 0.006 250)"
        },
        dark: {
            sky: "oklch(0.27 0.035 240)",
            mint: "oklch(0.27 0.035 170)",
            peach: "oklch(0.28 0.035 55)",
            lilac: "oklch(0.27 0.035 300)",
            butter: "oklch(0.29 0.035 95)",
            rose: "oklch(0.27 0.035 10)",
            sage: "oklch(0.27 0.03 135)",
            stone: "oklch(0.25 0.004 250)"
        },
    };
    const cells = (theme) => Object.keys(SCENES).map((id) =>
        `<figure><div style="background:${tiles[theme][TILES[id]]}"><img src="file:///${join(OUT, files[id]).replaceAll("\\", "/")}"></div><figcaption>${id}</figcaption></figure>`).join("");
    const page = `<!doctype html><meta charset="utf-8"><style>body{margin:0;font:13px system-ui;padding:24px}section{display:grid;grid-template-columns:repeat(8,1fr);gap:14px;padding:20px;border-radius:24px}figure{margin:0}div{aspect-ratio:1;border-radius:22px;display:grid;place-items:center}img{width:86%}figcaption{margin-top:6px;opacity:.7}</style>
<section style="background:#fbfcfd;color:#141619">${cells("light")}</section><section style="background:#0d0d0d;color:#f5f5f5;margin-top:24px">${cells("dark")}</section>
<div style="aspect-ratio:auto;margin-top:24px;background:#fbfcfd;padding:20px"><img style="width:100%;max-width:720px" src="file:///${join(OUT, "hero.svg").replaceAll("\\", "/")}"></div>`;
    const sheet = process.env.SHEET_PATH ?? join(ROOT, "illustrations-sheet.html");
    writeFileSync(sheet, page);
    console.log(`Contact sheet: ${sheet}`);
}
console.log(`Wrote ${Object.keys(files).length} project illustrations and the hero board to public/illustrations`);
