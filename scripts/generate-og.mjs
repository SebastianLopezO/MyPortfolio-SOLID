import {mkdir, readFile, rm, writeFile} from "node:fs/promises";
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
import {services as enServices} from "../src/content/en/services.ts";
import {services as esServices} from "../src/content/es/services.ts";
import {skills as enSkills} from "../src/content/en/skills.ts";
import {skills as esSkills} from "../src/content/es/skills.ts";
import {ui as enUi} from "../src/content/en/ui.ts";
import {ui as esUi} from "../src/content/es/ui.ts";
import {
    CERTIFICATION_SLUG,
    DETAIL_COLLECTIONS,
    EDUCATION_SLUG,
    EXPERIENCE_SLUG,
    ORGANIZATION_SLUG,
    REASON_SLUG,
    SERVICE_SLUG,
    SKILL_SLUG
} from "../src/content/shared/detail-links.ts";
import {
    EDUCATION_ART,
    EXPERIENCE_ART,
    ORGANIZATION_ART,
    REASON_ART,
    SERVICE_ART
} from "../src/content/shared/page-art.ts";
import {HERO_ART, PROJECT_ART} from "../src/content/shared/project-art.ts";
import {SKILL_ART} from "../src/content/shared/skill-art.ts";
import {certifications} from "../src/content/shared/certifications.ts";
import {education} from "../src/content/shared/education.ts";
import {experience} from "../src/content/shared/experience.ts";
import {organizations} from "../src/content/shared/organizations.ts";
import {benefitOrder, SERVICE_IDS, serviceRoles} from "../src/content/shared/services.ts";
import {SKILL_IDS, skillGroups} from "../src/content/shared/skills.ts";
import {testimonials} from "../src/content/shared/testimonials.ts";

const root = fileURLToPath(new URL("..", import.meta.url));
const template = await readFile(`${root}scripts/og/template.html`, "utf8");
const portraitUrl = pathToFileURL(`${root}src/assets/images/profile-640.webp`).href;
const svgCache = new Map();
const inlineSvg = async (file, className) => {
    const key = `${className}:${file}`;
    if (!svgCache.has(key)) {
        const raw = await readFile(`${root}public${file}`, "utf8");
        svgCache.set(
            key,
            raw
                .replace(/<style>[\s\S]*?<\/style>\s*/, "")
                .replace("<svg ", `<svg class="${className}" `),
        );
    }
    return svgCache.get(key);
};

const {left, top, width, height, radius} = HERO_ART.portrait;
const heroBoard = `<div class="tile board">${await inlineSvg(HERO_ART.file, "board-svg")}<img class="socket" alt="" src="${portraitUrl}" style="left:${left}%;top:${top}%;width:${width}%;height:${height}%;border-radius:${radius}%"></div>`;
const artTile = async ({file, tile}) => `<div class="tile" style="background:var(--tile-${tile})">${await inlineSvg(file, "illustration")}</div>`;

const INDEX_ART = {
    about: REASON_ART.vision,
    experience: EXPERIENCE_ART.tivenos,
    education: EDUCATION_ART.politecnico,
    certifications: EDUCATION_ART.cyberDiploma,
    skills: SKILL_ART.backend,
    organizations: ORGANIZATION_ART.smartpot,
    services: SERVICE_ART.integration,
    reasons: REASON_ART.vision,
    metrics: SERVICE_ART.data,
};

const CERTIFICATION_ART = {
    itSpecialistPython: SKILL_ART.languages,
    daxPowerBi: SKILL_ART.data,
    powerBiAnalysis: SKILL_ART.data,
    dataScienceAi: SKILL_ART.ai,
    cybersecurity: EDUCATION_ART.cyberDiploma,
    problemSolving: SKILL_ART.foundations,
    excelMastery: SKILL_ART.data,
    excelDataAnalysis: SKILL_ART.data,
    searchConsoleSeo: SKILL_ART.frontend,
    greenDigitalSkills: ORGANIZATION_ART.smartpot,
    dataVisualization: SKILL_ART.data,
    webProgramming: SKILL_ART.frontend,
    iotProtocols: SKILL_ART.iot,
    gitGithub: SKILL_ART.tools,
    softwareEngineering: SKILL_ART.foundations,
    djangoTwo: SKILL_ART.backend,
    practicalJavascript: SKILL_ART.frontend,
    basicProgramming: SKILL_ART.foundations,
    pythonFundamentals: SKILL_ART.languages,
    hacklab: EDUCATION_ART.cyberDiploma,
    javaBasic: SKILL_ART.languages,
    css: SKILL_ART.frontend,
    pythonDjango: SKILL_ART.backend,
    pythonBasic: SKILL_ART.languages,
    excelProfessional: SKILL_ART.data,
    sqlBasic: SKILL_ART.databases,
    programmingFundamentals: SKILL_ART.foundations,
    pythonEia: SKILL_ART.languages,
    html: SKILL_ART.frontend,
};

const caseClass = (heading) =>
    heading.length > 44 ? "case xlong" : heading.length > 30 ? "case long" : "case";

const NAME = "Sebastián López Osorno";

const variants = {
    en: {
        bodyClass: "",
        eyebrow: "Open to new opportunities",
        heading: NAME,
        subheading: "Backend & Integration Developer",
        tagline: "FastAPI · Spring Boot · Zoho CRM · Data · DevOps",
        location: "Medellín · Remote or hybrid",
        aside: heroBoard,
    },
    es: {
        bodyClass: "",
        eyebrow: "Abierto a nuevas oportunidades",
        heading: NAME,
        subheading: "Desarrollador Backend & Integraciones",
        tagline: "FastAPI · Spring Boot · Zoho CRM · Datos · DevOps",
        location: "Medellín · Remoto o híbrido",
        aside: heroBoard,
    },
};

// One image per case study and language, shown when a case study link is shared.
for (const [lang, cases] of Object.entries({en: enCases, es: esCases})) {
    for (const [id, copy] of Object.entries(cases.items)) {
        variants[`case-${PROJECT_SLUG[id]}-${lang}`] = {
            bodyClass: caseClass(copy.name),
            eyebrow: cases.ui.eyebrow,
            heading: copy.name,
            subheading: NAME,
            tagline: copy.tagline,
            location: copy.status,
            aside: await artTile(PROJECT_ART[id]),
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
            bodyClass: caseClass(card.name),
            eyebrow: card.context.split(" · ")[0],
            heading: card.name,
            subheading: NAME,
            tagline: page.tagline,
            location: page.status,
            aside: await artTile(PROJECT_ART[id]),
        };
    }
}

// Every job, program, certification, group of tools, organization, service and reason page has an image of its own; the indexes share one per collection.
for (const [lang, {details, journey, cards, months, servicesCopy, skillsCopy, siteUi}] of Object.entries({
    en: {
        details: enDetails,
        journey: enJourney,
        cards: enCards,
        months: enUi.months,
        servicesCopy: enServices,
        skillsCopy: enSkills,
        siteUi: enUi
    },
    es: {
        details: esDetails,
        journey: esJourney,
        cards: esCards,
        months: esUi.months,
        servicesCopy: esServices,
        skillsCopy: esSkills,
        siteUi: esUi
    },
})) {
    const {ui, indexes} = details;
    const issuers = new Set(certifications.map((item) => item.issuerId)).size;
    const totals = {
        en: {
            about: "Medellín · Remote or hybrid",
            experience: `${experience.length} companies since 2022`,
            education: `${education.length} programs since 2019`,
            certifications: `${certifications.length} certifications · ${issuers} issuers`,
            skills: `${SKILL_IDS.length} groups · ${new Set(skillGroups.flatMap((group) => group.items)).size} tools`,
            organizations: `${organizations.length} organizations`,
            services: "Integrations, CRM, data and DevOps",
            reasons: `${benefitOrder.length} reasons`,
            metrics: "GitHub activity in numbers",
        },
        es: {
            about: "Medellín · Remoto o híbrido",
            experience: `${experience.length} empresas desde 2022`,
            education: `${education.length} programas desde 2019`,
            certifications: `${certifications.length} certificaciones · ${issuers} emisores`,
            skills: `${SKILL_IDS.length} grupos · ${new Set(skillGroups.flatMap((group) => group.items)).size} herramientas`,
            organizations: `${organizations.length} organizaciones`,
            services: "Integraciones, CRM, datos y DevOps",
            reasons: `${benefitOrder.length} razones`,
            metrics: "La actividad en GitHub en cifras",
        },
    }[lang];
    for (const collection of DETAIL_COLLECTIONS) {
        const heading = indexes[collection].title;
        variants[`${collection}-${lang}`] = {
            bodyClass: caseClass(heading),
            eyebrow: lang === "es" ? "Portafolio" : "Portfolio",
            heading,
            subheading: NAME,
            tagline: indexes[collection].seo.description,
            location: totals[collection],
            aside: await artTile(INDEX_ART[collection]),
        };
    }
    for (const job of experience) {
        const page = details.experience[job.id];
        variants[`experience-${EXPERIENCE_SLUG[job.id]}-${lang}`] = {
            bodyClass: caseClass(job.company),
            eyebrow: ui.eyebrow.experience,
            heading: job.company,
            subheading: NAME,
            tagline: page.tagline,
            location: page.positions.at(-1).title.split(" · ")[0],
            aside: await artTile(EXPERIENCE_ART[job.id]),
        };
    }
    for (const program of education) {
        const heading = journey.milestones[program.id].title;
        variants[`education-${EDUCATION_SLUG[program.id]}-${lang}`] = {
            bodyClass: caseClass(heading),
            eyebrow: ui.eyebrow.education,
            heading,
            subheading: NAME,
            tagline: details.education[program.id].tagline,
            location: program.school.split(" – ")[0],
            aside: await artTile(EDUCATION_ART[program.id]),
        };
    }
    for (const item of certifications) {
        const [year, month] = item.date.split("-").map(Number);
        variants[`certifications-${CERTIFICATION_SLUG[item.id]}-${lang}`] = {
            bodyClass: caseClass(item.title),
            eyebrow: ui.eyebrow.certifications,
            heading: item.title,
            subheading: NAME,
            tagline: item.issuer,
            location: `${months[month - 1]} ${year}`,
            aside: await artTile(CERTIFICATION_ART[item.id] ?? EDUCATION_ART.cyberDiploma),
        };
    }
    for (const id of SKILL_IDS) {
        const group = skillGroups.find((item) => item.id === id);
        const heading = skillsCopy.groups[id];
        variants[`skills-${SKILL_SLUG[id]}-${lang}`] = {
            bodyClass: caseClass(heading),
            eyebrow: ui.eyebrow.skills,
            heading,
            subheading: NAME,
            tagline: skillsCopy.taglines[id],
            location: group.items.slice(0, 3).join(" · "),
            aside: await artTile(SKILL_ART[id]),
        };
    }
    for (const organization of organizations) {
        variants[`organizations-${ORGANIZATION_SLUG[organization.id]}-${lang}`] = {
            bodyClass: caseClass(organization.name),
            eyebrow: ui.eyebrow.organizations,
            heading: organization.name,
            subheading: NAME,
            tagline: details.organizations[organization.id].tagline,
            location: `${organization.repositories} ${cards.repositories} · ${organization.visibility === "private" ? ui.visibility.private : ui.visibility.public}`,
            aside: await artTile(ORGANIZATION_ART[organization.id]),
        };
    }
    for (const id of SERVICE_IDS) {
        const service = servicesCopy.items[id];
        variants[`services-${SERVICE_SLUG[id]}-${lang}`] = {
            bodyClass: caseClass(service.title),
            eyebrow: ui.eyebrow.services,
            heading: service.title,
            subheading: NAME,
            tagline: service.tagline,
            location: serviceRoles[id].map((role) => siteUi.roleNames[role]).join(" · "),
            aside: await artTile(SERVICE_ART[id]),
        };
    }
    for (const id of benefitOrder) {
        const benefit = servicesCopy.benefits[id];
        const author = testimonials.find((item) => item.id === benefit.evidence.testimonial);
        variants[`reasons-${REASON_SLUG[id]}-${lang}`] = {
            bodyClass: caseClass(benefit.title),
            eyebrow: ui.eyebrow.reasons,
            heading: benefit.title,
            subheading: NAME,
            tagline: benefit.description,
            location: author.author,
            aside: await artTile(REASON_ART[id]),
        };
    }
}

// `pnpm og detail` renders only the images whose names contain one of the words given.
const filters = process.argv.slice(2);

await mkdir(`${root}public/og`, {recursive: true});
const browser = await chromium.launch();
const page = await browser.newPage({
    viewport: {width: 1200, height: 630},
    colorScheme: "dark",
    reducedMotion: "reduce",
});

for (const [name, copy] of Object.entries(variants)) {
    if (filters.length > 0 && !filters.some((filter) => name.includes(filter))) continue;
    const html = Object.entries({aside: heroBoard, ...copy, fonts: pathToFileURL(`${root}node_modules`).href}).reduce(
        (result, [key, value]) => result.replaceAll(`{{${key}}}`, value),
        template,
    );
    const file = `${root}scripts/og/.render-${name}.html`;
    await writeFile(file, html);
    try {
        await page.goto(pathToFileURL(file).href);
        await page.evaluate(() => document.fonts.ready);
        const png = await page.screenshot({type: "png"});
        const output = /^(en|es)$/.test(name) ? `public/og/og-${name}.jpg` : `public/og/${name}.jpg`;
        await sharp(png).jpeg({quality: 84, mozjpeg: true}).toFile(`${root}${output}`);
        console.log(output);
    } finally {
        await rm(file, {force: true});
    }
}

await browser.close();

if (filters.length === 0) {
    const icon = await readFile(`${root}public/icon.svg`);
    await sharp(icon).resize(180, 180).png().toFile(`${root}public/apple-touch-icon.png`);
    console.log("public/apple-touch-icon.png");
}
