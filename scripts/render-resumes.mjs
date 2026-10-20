import {execFile} from "node:child_process";
import {mkdir, readFile, rm} from "node:fs/promises";
import {join, resolve} from "node:path";
import {fileURLToPath} from "node:url";
import {promisify} from "node:util";
import {chromium} from "@playwright/test";
import MarkdownIt from "markdown-it";
import deflist from "markdown-it-deflist";
import ic from "@iconify-json/ic/icons.json" with {type: "json"};
import tabler from "@iconify-json/tabler/icons.json" with {type: "json"};
import {writeVariants} from "./lib/images.mjs";

const run = promisify(execFile);
const root = fileURLToPath(new URL("..", import.meta.url));
const sourceArg = process.argv.indexOf("--source");
const source = resolve(sourceArg > -1 ? process.argv[sourceArg + 1] : join(root, "../SebastianLopezO/resume/OhMyCV"));
const output = join(root, "public/cv");
const previews = join(output, "previews");
const sets = {ic, tabler};

const resumes = [
    {
        file: "ATS-EN.md",
        pdf: "Sebastian-Lopez-Osorno-ATS-EN.pdf",
        preview: "ats-en",
        title: "Sebastián López Osorno · Resume (ATS)"
    },
    {
        file: "ATS-ES.md",
        pdf: "Sebastian-Lopez-Osorno-ATS-ES.pdf",
        preview: "ats-es",
        title: "Sebastián López Osorno · Hoja de vida (ATS)"
    },
    {
        file: "ATS-LONG-EN.md",
        pdf: "Sebastian-Lopez-Osorno-ATS-Long-EN.pdf",
        preview: "ats-long-en",
        title: "Sebastián López Osorno · Resume (ATS, extended)"
    },
    {
        file: "ATS-LONG-ES.md",
        pdf: "Sebastian-Lopez-Osorno-ATS-Long-ES.pdf",
        preview: "ats-long-es",
        title: "Sebastián López Osorno · Hoja de vida (ATS, extendida)"
    },
];

const icon = (_, prefix, name) => {
    const set = sets[prefix];
    const data = set?.icons[name];
    if (!data) throw new Error(`Unknown icon ${prefix}:${name}`);
    const width = data.width ?? set.width ?? 24;
    const height = data.height ?? set.height ?? 24;
    return `<svg class="iconify" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 ${width} ${height}">${data.body}</svg>`;
};

const markdown = new MarkdownIt({html: true}).use(deflist);
const styles = await readFile(join(source, "style.css"), "utf8");

const documentFor = (body, title, lang) => `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
@page { size: Letter; margin: 11mm 12mm 11mm 12mm; }
html, body { margin: 0; }
h2, dt { break-after: avoid; }
li, dl { break-inside: avoid; }
${styles}
</style>
</head>
<body>
<div id="resume-preview"><div data-scope="vue-smart-pages" data-part="page">${body}</div></div>
</body>
</html>`;

// The first page of each PDF becomes its preview through poppler (pdftoppm, pdfinfo). Where poppler is not
// installed, as on most Windows machines, the same commands run in a throwaway Debian container.
const POPPLER_IMAGE = "debian:bookworm-slim";
const hasPoppler = () => run("pdfinfo", ["-v"]).then(() => true, () => false);

const popplerInDocker = async (commands) => {
    const script = ["apt-get update -qq", "apt-get install -y -qq poppler-utils > /dev/null", ...commands].join(" && ");
    const {stdout} = await run("docker", ["run", "--rm", "-v", `${output}:/cv`, POPPLER_IMAGE, "sh", "-c", script], {maxBuffer: 1 << 24});
    return stdout;
};

await mkdir(previews, {recursive: true});
const browser = await chromium.launch();
const page = await browser.newPage();

for (const resume of resumes) {
    const text = await readFile(join(source, resume.file), "utf8");
    const body = markdown
        .render(text)
        .replace(/<span class="iconify" data-icon="([\w-]+):([\w-]+)"><\/span>/g, icon)
        .replace(/<\/dd>\s*<dt>/g, "</dd>\n</dl>\n<dl>\n<dt>");
    const lang = resume.file.includes("-ES") ? "es" : "en";
    await page.setContent(documentFor(body, resume.title, lang), {waitUntil: "load"});
    await page.pdf({
        path: join(output, resume.pdf),
        format: "Letter",
        scale: 0.9,
        printBackground: true,
        preferCSSPageSize: true
    });
}

await browser.close();

const pages = {};
if (await hasPoppler()) {
    for (const resume of resumes) {
        const pdf = join(output, resume.pdf);
        await run("pdftoppm", ["-png", "-r", "150", "-f", "1", "-l", "1", "-singlefile", pdf, join(previews, resume.preview)]);
        pages[resume.pdf] = (await run("pdfinfo", [pdf])).stdout.match(/Pages:\s+(\d+)/)?.[1];
    }
} else {
    console.log(`poppler is not installed; running it in ${POPPLER_IMAGE} with Docker…`);
    const stdout = await popplerInDocker(resumes.flatMap(({pdf, preview}) => [
        `pdftoppm -png -r 150 -f 1 -l 1 -singlefile '/cv/${pdf}' '/cv/previews/${preview}'`,
        `printf '%s %s\\n' '${pdf}' "$(pdfinfo '/cv/${pdf}' | sed -n 's/^Pages: *//p')"`,
    ]));
    for (const line of stdout.trim().split("\n")) {
        const [pdf, count] = line.trim().split(" ");
        pages[pdf] = count;
    }
}

for (const resume of resumes) {
    const png = join(previews, `${resume.preview}.png`);
    await writeVariants(png, join(previews, resume.preview), [480, 960]);
    await rm(png);
    console.log(`${resume.pdf}: ${pages[resume.pdf]} page(s)`);
}
