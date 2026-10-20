import {readdir} from "node:fs/promises";
import {fileURLToPath, pathToFileURL} from "node:url";
import {chromium} from "@playwright/test";
import sharp from "sharp";

// Captures the recreated screens of private projects (assets-src/mockups/*.html) and the boards that lay out the real
// outputs of public ones (assets-src/boards/*.html) as sources for `pnpm images`.
// Usage: pnpm mockups [name ...] renders every screen, or only the ones named.
const root = fileURLToPath(new URL("..", import.meta.url));
const folders = [`${root}assets-src/mockups/`, `${root}assets-src/boards/`];
const only = process.argv.slice(2);

const browser = await chromium.launch();
// 1440x714 CSS pixels at a 4/3 scale give a 1920px-wide source, the size of the real screenshots.
const page = await browser.newPage({viewport: {width: 1440, height: 714}, deviceScaleFactor: 4 / 3});

for (const folder of folders) for (const file of (await readdir(folder)).filter((name) => name.endsWith(".html")).sort()) {
    const name = file.replace(/\.html$/, "");
    if (only.length > 0 && !only.includes(name)) continue;
    await page.goto(pathToFileURL(`${folder}${file}`).href);
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot({type: "png"});
    await sharp(png).webp({quality: 92}).toFile(`${root}assets-src/projects/${name}.webp`);
    console.log(`assets-src/projects/${name}.webp`);
}

await browser.close();
