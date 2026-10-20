import {readdirSync} from "node:fs";
import {fileURLToPath} from "node:url";
import sharp from "sharp";
import {CERTIFICATION_SLUG} from "../src/content/shared/detail-links.ts";
import {variantWidths} from "../src/lib/image-widths.ts";
import {writeVariants} from "./lib/images.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const source = (file) => `${root}assets-src/${file}`;

const jobs = [
    {
        input: source("profile.webp"),
        output: `${root}src/assets/images/profile`,
        widths: [320, 480, 640],
        headroom: 0.14
    },
    {input: source("designed-cv-en.webp"), output: `${root}public/cv/previews/designed-en`, widths: [480, 960]},
    {input: source("designed-cv-es.webp"), output: `${root}public/cv/previews/designed-es`, widths: [480, 960]},
    ...["panel", "crop", "alerts"].map((id) => ({
        input: source(`projects/smartpot-${id}.webp`),
        output: `${root}public/projects/smartpot-${id}`,
        widths: [480, 960, 1440],
    })),
    // Phone screens from the local demo stack, shown three across on phones, and the same screens at desktop width.
    ...["route", "group", "chat"].map((id) => ({
        input: source(`projects/gopoli-${id}.webp`),
        output: `${root}public/projects/gopoli-${id}`,
        widths: [320, 480, 780],
    })),
    ...["route", "group", "chat"].map((id) => ({
        input: source(`projects/gopoli-${id}-desktop.webp`),
        output: `${root}public/projects/gopoli-${id}-desktop`,
        widths: [480, 960, 1440],
    })),
    // Screens of private projects redrawn with fictional data (`pnpm mockups` renders the sources).
    ...[
        "admissions-form-documents", "admissions-form-program", "collection-notebook", "crm-snapshots-sql", "crm-widgets-enrollment",
        "crm-widgets-quoter", "email-signature", "integration-api-docs", "landing-platform-deploy", "landing-platform-monitor", "martech-landing",
        "observability-dashboard", "observability-trace", "real-estate-detail", "real-estate-listing", "results-email", "zoho-toolkit-notebook",
    ].map((name) => ({
        input: source(`projects/${name}.webp`),
        output: `${root}public/projects/${name}`,
        widths: [480, 960, 1440],
    })),
    // Screens of public projects: captures of the running apps and boards of their real outputs.
    ...[
        "lettuce-diseases",
        "radar-filtering",
        "radar-restoration",
        "school-employees",
        "school-report",
        "fashionline-products",
        "fashionline-home",
        "tdd-results",
        "tdd-model",
        "ai-agent",
        "ai-agent-rules",
        "huffman-compressor",
        "carspace-home",
        "carspace-reservations",
        "sitepersist-home",
        "video-ascii",
        "company-dream-home",
        "company-dream-login",
        "cybersecurity-nmap", "cybersecurity-incident",
        "peppercrm-kanban", "portfolio-home", "portfolio-project", "taurus-tables", "taurus-charts",
    ].map((name) => ({
        input: source(`projects/${name}.webp`),
        output: `${root}public/projects/${name}`,
        widths: [480, 960, 1440],
    })),
    // Certificates as their issuers publish them, never enlarged past their source.
    ...readdirSync(source("certificates")).filter((file) => file.endsWith(".webp")).map((file) => ({
        input: source(`certificates/${file}`),
        output: `${root}public/certificates/${CERTIFICATION_SLUG[file.replace(/\.webp$/, "")]}`,
        widths: "source",
    })),
];

// `pnpm images` writes every variant; `pnpm images smartpot observability` only the jobs whose output names match.
const filters = process.argv.slice(2);
const selected = filters.length > 0 ? jobs.filter((job) => filters.some((filter) => job.output.includes(filter))) : jobs;

for (const job of selected) {
    const widths = job.widths === "source" ? variantWidths((await sharp(job.input).metadata()).width) : job.widths;
    const results = await writeVariants(job.input, job.output, widths, {crop: job.crop, headroom: job.headroom});
    for (const {width, avif, webp} of results) {
        console.log(`${job.output.replace(root, "")}-${width}: avif ${(avif / 1024).toFixed(1)} KB, webp ${(webp / 1024).toFixed(1)} KB`);
    }
}
