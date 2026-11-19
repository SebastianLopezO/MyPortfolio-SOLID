import {readFileSync} from "node:fs";
import {fileURLToPath} from "node:url";
import {contrastRatio, parseColor, rgbToHex} from "./lib/color.mjs";

const TOKENS_PATH = fileURLToPath(new URL("../src/styles/tokens.css", import.meta.url));

// Every text color meets WCAG AAA (7:1) on the surfaces it sits on, in the light theme and in the dark one. The SDG
// badges keep the UN's own colors, which no text color reaches 7:1 on, so their numbers stay at AA in a fixed ink or
// paper; the goal's name beside the badge carries the same meaning.
export const CONTRAST_PAIRS = [
    ["fg", ["bg", "surface", "surface-raised"], 7],
    ["fg-muted", ["bg", "surface", "surface-raised"], 7],
    ["fg-subtle", ["bg", "surface", "surface-raised"], 7],
    ["primary", ["bg", "surface", "surface-raised"], 7],
    ["accent", ["bg", "surface"], 7],
    ["on-primary", ["primary", "primary-hover"], 7],
    ["danger", ["bg", "surface"], 7],
    ["success", ["bg", "surface"], 7],
    ["warning", ["bg", "surface"], 7],
    ["border-strong", ["bg", "surface", "surface-raised"], 3],
    ["ring", ["bg", "surface"], 3],
    ["on-whatsapp", ["whatsapp"], 3],
    // A project tile carries its name and its few words on its own layer of color.
    ...["sky", "mint", "peach", "lilac", "butter", "rose", "sage", "stone"].flatMap((tile) => [["fg", [`tile-${tile}`], 7], ["fg-muted", [`tile-${tile}`], 7]]),
    ...["education", "web", "backend", "crm", "data", "devops", "security"].map((line) => [`viz-${line}`, ["bg", "surface"], 3]),
    ...[1, 2, 3, 4].map((level) => [`level-${level}`, ["bg", "surface"], 2]),
    ["bg", ["level-2", "level-3", "level-4"], 4.5],
    ["fg", ["level-1"], 4.5],
    ...[4, 8, 13, 16].map((goal) => ["paper", [`sdg-${goal}`], 4.5]),
    ...[2, 9, 11].map((goal) => ["ink", [`sdg-${goal}`], 4.5]),
];

export const THEMES = ["light", "dark"];

/** A token written as light-dark(light, dark) resolves to one half per theme; any other value serves both. */
const pick = (value, theme) => {
    const match = value.match(/^light-dark\(\s*(.+?)\s*,\s*(.+)\s*\)$/);
    return match ? match[theme === "dark" ? 2 : 1].trim() : value;
};

export function readTokens(css = readFileSync(TOKENS_PATH, "utf8"), theme = "light") {
    const declarations = new Map();
    for (const match of css.matchAll(/--color-([\w-]+):\s*([^;]+);/g)) {
        if (match[1] !== "*") declarations.set(match[1], match[2].trim());
    }
    const resolve = (name, depth = 0) => {
        const value = declarations.get(name);
        if (value === undefined) throw new Error(`Unknown token: ${name}`);
        const alias = value.match(/^var\(--color-([\w-]+)\)$/);
        if (alias && depth < 10) return resolve(alias[1], depth + 1);
        return pick(value, theme);
    };
    return Object.fromEntries([...declarations.keys()].map((name) => [name, resolve(name)]));
}

export function checkContrast(css = readFileSync(TOKENS_PATH, "utf8")) {
    const results = [];
    for (const theme of THEMES) {
        const tokens = readTokens(css, theme);
        for (const [foreground, backgrounds, minimum] of CONTRAST_PAIRS) {
            for (const background of backgrounds) {
                const ratio = contrastRatio(tokens[foreground], tokens[background]);
                results.push({theme, foreground, background, minimum, ratio, pass: ratio >= minimum, tokens});
            }
        }
    }
    return results;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
    const results = checkContrast();
    console.table(
        results.map(({theme, foreground, background, minimum, ratio, pass, tokens}) => ({
            pair: `${theme}: ${foreground} / ${background}`,
            colors: `${rgbToHex(parseColor(tokens[foreground]))} / ${rgbToHex(parseColor(tokens[background]))}`,
            ratio: ratio.toFixed(2),
            minimum,
            result: pass ? "pass" : "FAIL",
        })),
    );
    const failures = results.filter((result) => !result.pass);
    if (failures.length > 0) {
        console.error(`${failures.length} contrast pair(s) below the minimum`);
        process.exit(1);
    }
}
