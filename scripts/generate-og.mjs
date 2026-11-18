import {existsSync} from "node:fs";
import {mkdir, readFile, writeFile} from "node:fs/promises";
import {fileURLToPath, pathToFileURL} from "node:url";
import {chromium} from "@playwright/test";
import sharp from "sharp";
import * as enCases from "../src/content/case-studies/en.ts";
import * as esCases from "../src/content/case-studies/es.ts";
import {projects as enCards} from "../src/content/en/projects.ts";
import {projects as esCards} from "../src/content/es/projects.ts";
import {projectPages as enPages} from "../src/content/project-pages/en.ts";
import {projectPages as esPages} from "../src/content/project-pages/es.ts";
import {PROJECT_SLUG} from "../src/content/shared/project-links.ts";
import {detailPages as enDetails} from "../src/content/detail-pages/en.ts";
import {detailPages as esDetails} from "../src/content/detail-pages/es.ts";
import {journey as enJourney} from "../src/content/en/journey.ts";
import {journey as esJourney} from "../src/content/es/journey.ts";
import {ui as enUi} from "../src/content/en/ui.ts";
import {ui as esUi} from "../src/content/es/ui.ts";
import {
    CERTIFICATION_SLUG,
    DETAIL_COLLECTIONS,
    EDUCATION_SLUG,
    EXPERIENCE_SLUG,
    ORGANIZATION_SLUG
} from "../src/content/shared/detail-links.ts";
import {certifications} from "../src/content/shared/certifications.ts";
import {education} from "../src/content/shared/education.ts";
import {experience} from "../src/content/shared/experience.ts";
import {organizations} from "../src/content/shared/organizations.ts";

const root = fileURLToPath(new URL("..", import.meta.url));
const template = await readFile(`${root}scripts/og/template.html`, "utf8");
const photo = `data:image/webp;base64,${(await readFile(`${root}assets-src/profile.webp`)).toString("base64")}`;
const portrait = `<div class="photo"><img alt="" src="${photo}"></div>`;

// A certification's card shows the certificate itself when there is a copy of it (assets-src/certificates).
const sheets = new Map();
for (const item of certifications) {
    const source = `${root}assets-src/certificates/${item.id}.webp`;
    if (existsSync(source)) sheets.set(item.id, `<div class="sheet"><img alt="" src="data:image/webp;base64,${(await readFile(source)).toString("base64")}"></div>`);
}

const NAME = "Sebastián López Osorno";

const variants = {
    en: {
        bodyClass: "",
        eyebrow: "Open to new opportunities",
        heading: NAME,
        subheading: "Backend & Integration Developer",
        tagline: "FastAPI · Spring Boot · Zoho CRM · Data · DevOps",
        location: "Medellín · Remote or hybrid",
    },
    es: {
        bodyClass: "",
        eyebrow: "Abierto a nuevas oportunidades",
        heading: NAME,
        subheading: "Desarrollador Backend & Integraciones",
        tagline: "FastAPI · Spring Boot · Zoho CRM · Datos · DevOps",
        location: "Medellín · Remoto o híbrido",
    },
};

// One image per case study and language, shown when a case study link is shared.
for (const [lang, cases] of Object.entries({en: enCases, es: esCases})) {
    for (const [id, copy] of Object.entries(cases.items)) {
        variants[`case-${PROJECT_SLUG[id]}-${lang}`] = {
            bodyClass: "case",
            eyebrow: cases.ui.eyebrow,
            heading: copy.name,
            subheading: NAME,
            tagline: copy.tagline,
            location: copy.status,
        };
    }
}

// One image per project page and language, headed by the place the project was built.
for (const [lang, {cards, pages}] of Object.entries({
    en: {cards: enCards, pages: enPages},
    es: {cards: esCards, pages: esPages}
})) {
    for (const [id, page] of Object.entries(pages.items)) {
        const card = cards.items[id];
        variants[`project-${PROJECT_SLUG[id]}-${lang}`] = {
            bodyClass: "case",
            eyebrow: card.context.split(" · ")[0],
            heading: card.name,
            subheading: NAME,
            tagline: page.tagline,
            location: page.status,
        };
    }
}

// Every job, program, certification and organization page has an image of its own; the indexes share one per collection.
for (const [lang, {details, journey, cards, months}] of Object.entries({
    en: {details: enDetails, journey: enJourney, cards: enCards, months: enUi.months},
    es: {details: esDetails, journey: esJourney, cards: esCards, months: esUi.months},
})) {
    const {ui, indexes} = details;
    const issuers = new Set(certifications.map((item) => item.issuerId)).size;
    const totals = {
        en: {
            experience: `${experience.length} companies since 2022`,
            education: `${education.length} programs since 2019`,
            certifications: `${certifications.length} certifications · ${issuers} issuers`,
            organizations: `${organizations.length} organizations`,
            services: "Integrations, CRM, data and DevOps",
            metrics: "GitHub activity in numbers",
        },
        es: {
            experience: `${experience.length} empresas desde 2022`,
            education: `${education.length} programas desde 2019`,
            certifications: `${certifications.length} certificaciones · ${issuers} emisores`,
            organizations: `${organizations.length} organizaciones`,
            services: "Integraciones, CRM, datos y DevOps",
            metrics: "La actividad en GitHub en cifras",
        },
    }[lang];
    for (const collection of DETAIL_COLLECTIONS) {
        variants[`${collection}-${lang}`] = {
            bodyClass: "case",
            eyebrow: lang === "es" ? "Portafolio" : "Portfolio",
            heading: indexes[collection].title,
            subheading: NAME,
            tagline: indexes[collection].seo.description,
            location: totals[collection],
        };
    }
    for (const job of experience) {
        const page = details.experience[job.id];
        variants[`experience-${EXPERIENCE_SLUG[job.id]}-${lang}`] = {
            bodyClass: "case",
            eyebrow: ui.eyebrow.experience,
            heading: job.company,
            subheading: NAME,
            tagline: page.tagline,
            location: page.positions.at(-1).title.split(" · ")[0],
        };
    }
    for (const program of education) {
        variants[`education-${EDUCATION_SLUG[program.id]}-${lang}`] = {
            bodyClass: "case",
            eyebrow: ui.eyebrow.education,
            heading: journey.milestones[program.id].title,
            subheading: NAME,
            tagline: details.education[program.id].tagline,
            location: program.school.split(" – ")[0],
        };
    }
    for (const item of certifications) {
        const [year, month] = item.date.split("-").map(Number);
        variants[`certifications-${CERTIFICATION_SLUG[item.id]}-${lang}`] = {
            bodyClass: sheets.has(item.id) ? "case certificate" : "case",
            eyebrow: ui.eyebrow.certifications,
            heading: item.title,
            subheading: NAME,
            tagline: item.issuer,
            location: `${months[month - 1]} ${year}`,
            ...(sheets.has(item.id) ? {aside: sheets.get(item.id)} : {}),
        };
    }
    for (const organization of organizations) {
        variants[`organizations-${ORGANIZATION_SLUG[organization.id]}-${lang}`] = {
            bodyClass: "case",
            eyebrow: ui.eyebrow.organizations,
            heading: organization.name,
            subheading: NAME,
            tagline: details.organizations[organization.id].tagline,
            location: `${organization.repositories} ${cards.repositories} · ${organization.visibility === "private" ? ui.visibility.private : ui.visibility.public}`,
        };
    }
}

// `pnpm og detail` renders only the images whose names contain one of the words given.
const filters = process.argv.slice(2);

await mkdir(`${root}public/og`, {recursive: true});
const browser = await chromium.launch();
const page = await browser.newPage({viewport: {width: 1200, height: 630}});

for (const [name, copy] of Object.entries(variants)) {
    if (filters.length > 0 && !filters.some((filter) => name.includes(filter))) continue;
    const html = Object.entries({aside: portrait, ...copy, fonts: pathToFileURL(`${root}node_modules`).href}).reduce(
        (result, [key, value]) => result.replaceAll(`{{${key}}}`, value),
        template,
    );
    const file = `${root}scripts/og/.render-${name}.html`;
    await writeFile(file, html);
    await page.goto(pathToFileURL(file).href);
    await page.evaluate(() => document.fonts.ready);
    const png = await page.screenshot({type: "png"});
    const output = /^(en|es)$/.test(name) ? `public/og/og-${name}.jpg` : `public/og/${name}.jpg`;
    await sharp(png).jpeg({quality: 84, mozjpeg: true}).toFile(`${root}${output}`);
    console.log(output);
}

await browser.close();

if (filters.length === 0) {
    const icon = await readFile(`${root}public/icon.svg`);
    await sharp(icon).resize(180, 180).png().toFile(`${root}public/apple-touch-icon.png`);
    console.log("public/apple-touch-icon.png");
}
