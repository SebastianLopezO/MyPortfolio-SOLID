# MyPortfolio · SolidJS

[![CI](https://github.com/SebastianLopezO/MyPortfolio-SOLID/actions/workflows/ci.yml/badge.svg)](https://github.com/SebastianLopezO/MyPortfolio-SOLID/actions/workflows/ci.yml)
[![Publish Docker Image](https://github.com/SebastianLopezO/MyPortfolio-SOLID/actions/workflows/packaging.yml/badge.svg)](https://github.com/SebastianLopezO/MyPortfolio-SOLID/actions/workflows/packaging.yml)
[![Production Checks](https://github.com/SebastianLopezO/MyPortfolio-SOLID/actions/workflows/production.yml/badge.svg)](https://github.com/SebastianLopezO/MyPortfolio-SOLID/actions/workflows/production.yml)
[![PageSpeed Insights](https://img.shields.io/badge/PageSpeed-check-36BFB1)](https://pagespeed.web.dev/analysis?url=https://sebastianlopezo.page/en)

Bilingual portfolio of **Sebastián López Osorno**, backend and integration developer, live at
[sebastianlopezo.page](https://sebastianlopezo.page). This repository is its SolidJS edition, migrated from the React
one with the same pages, content, design, tests and deployment (see [Migration from React](#migration-from-react)).

- Prerendered pages in English and Spanish (`/en`, `/es`), hydrated with SolidJS.
- One general profile plus five role views that reorder and emphasize the same content.
- Thirty-two project pages: five full case studies (integration platform, SmartPot, GoPoli, MarTech, email
  signatures) and twenty-seven lighter pages for the other work, product and education projects, each with its
  achievements, architecture, figures and repositories, its decisions told as a problem and a solution in small tabs,
  and links to the job, program, organization and certifications behind it; a projects index by category and a
  filterable archive of public repositories.
- A page for every job, program, certification and GitHub organization (4, 5, 29 and 10, each collection with its
  index): titles and role changes, a timeline built from the facts that filters by kind and groups by year, projects,
  recommendations, courses, each certificate as its issuer publishes it and where it shows in the work, and the
  commits in each organization.
- Shareable role links that can be locked so the visitor stays on that view.
- Complete SEO per page: titles and descriptions that fit a search result (a build test checks them), canonical and
  `hreflang` links, an Open Graph image for every project, job, program, certification and organization, JSON-LD with
  each project's screens and each certificate, a sitemap with image entries that dates each page by the day its
  text last changed, robots, and an `llms.txt` that maps the English pages, the resumes and the contact for language
  models from the titles and descriptions the pages already carry.
- An interactive journey: a transit-style SVG map of education and work from 2019 to the 2030 goals, a capability
  heatmap per year, a focus radar of what is core, growing, exploring or paused, and the next steps (data science
  specialization, cybersecurity master's) tied to the UN 2030 Agenda goals.
- A client-side profile assistant that answers from the portfolio content, with no AI service: about thirty kinds of
  question (each job, program and project by name, certifications by topic, services, reasons to hire, GitHub
  activity, availability), each answer linking to the page that tells more, with follow-up questions and a catalog of
  the 42 questions it was built for.
- Dark design system with WCAG AA contrast checked in CI.
- Shipped as a ~30 MB unprivileged nginx image on GHCR and deployed with Docker Compose.

Lighthouse CI holds every build to 100 in accessibility and SEO, 95 or more in best practices and warns under 90 in
performance (`lighthouserc.json`); the **Production Checks** workflow runs it again against production after every
deploy. Performance varies with the runner.

## Role links

Use these links in applications. Add `?locked=true` to hide the role switcher, so the recruiter only sees the
view you sent.

| Profile    | English                                                      | Spanish                                                      |
|------------|--------------------------------------------------------------|--------------------------------------------------------------|
| General    | [`/en`](https://sebastianlopezo.page/en)                     | [`/es`](https://sebastianlopezo.page/es)                     |
| Backend    | [`/en/backend`](https://sebastianlopezo.page/en/backend)     | [`/es/backend`](https://sebastianlopezo.page/es/backend)     |
| CRM & Zoho | [`/en/crm`](https://sebastianlopezo.page/en/crm)             | [`/es/crm`](https://sebastianlopezo.page/es/crm)             |
| Data & BI  | [`/en/data`](https://sebastianlopezo.page/en/data)           | [`/es/data`](https://sebastianlopezo.page/es/data)           |
| DevOps     | [`/en/devops`](https://sebastianlopezo.page/en/devops)       | [`/es/devops`](https://sebastianlopezo.page/es/devops)       |
| Full-Stack | [`/en/fullstack`](https://sebastianlopezo.page/en/fullstack) | [`/es/fullstack`](https://sebastianlopezo.page/es/fullstack) |

Example of a locked link: `https://sebastianlopezo.page/en/backend?locked=true`.

A role view never hides information. It changes the hero title, summary and stack, the order of the sections, the
highlighted numbers, and which experience bullets, skills, projects, certifications and recommendations come first.

## Projects

| Page                                   | English                                                                                              | Spanish                                                                                              |
|----------------------------------------|------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------|
| Projects index and archive             | [`/en/projects`](https://sebastianlopezo.page/en/projects)                                           | [`/es/projects`](https://sebastianlopezo.page/es/projects)                                           |
| Integration platform                   | [`/en/projects/integration-platform`](https://sebastianlopezo.page/en/projects/integration-platform) | [`/es/projects/integration-platform`](https://sebastianlopezo.page/es/projects/integration-platform) |
| SmartPot                               | [`/en/projects/smartpot`](https://sebastianlopezo.page/en/projects/smartpot)                         | [`/es/projects/smartpot`](https://sebastianlopezo.page/es/projects/smartpot)                         |
| GoPoli                                 | [`/en/projects/gopoli`](https://sebastianlopezo.page/en/projects/gopoli)                             | [`/es/projects/gopoli`](https://sebastianlopezo.page/es/projects/gopoli)                             |
| Admissions funnels and lottery results | [`/en/projects/martech`](https://sebastianlopezo.page/en/projects/martech)                           | [`/es/projects/martech`](https://sebastianlopezo.page/es/projects/martech)                           |
| Email signatures                       | [`/en/projects/email-signatures`](https://sebastianlopezo.page/en/projects/email-signatures)         | [`/es/projects/email-signatures`](https://sebastianlopezo.page/es/projects/email-signatures)         |

The other fifteen pages follow the same pattern, `/en/projects/<slug>`: `observability`, `crm-widgets`,
`admissions-forms`, `crm-snapshots`, `landing-platform`, `email-automations`, `zoho-toolkit`, `collection-automation`,
`peppercrm`, `portfolio`, `taurus`, `computer-engineering`, `cybersecurity-labs`, `programming-technician` and
`technical-high-school`.

Links to a project page from a role view carry `?from=<role>`, and the lock when it is on, so "Back to the profile"
returns to the same view. Clients stay anonymous; the pages about work for clients do not link to code.

## Experience, education, certifications and organizations

| Collection           | English                                                                | Spanish                                                                | Pages                                                                                              |
|----------------------|------------------------------------------------------------------------|------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------|
| Experience           | [`/en/experience`](https://sebastianlopezo.page/en/experience)         | [`/es/experience`](https://sebastianlopezo.page/es/experience)         | `tivenos`, `adcom`, `muv-u`, `quipux`                                                              |
| Education            | [`/en/education`](https://sebastianlopezo.page/en/education)           | [`/es/education`](https://sebastianlopezo.page/es/education)           | `computer-engineering`, `cybersecurity-diploma`, `programming-technician`, `pascual-bravo`, `inem` |
| Certifications       | [`/en/certifications`](https://sebastianlopezo.page/en/certifications) | [`/es/certifications`](https://sebastianlopezo.page/es/certifications) | one per certification, such as `it-specialist-python`                                              |
| GitHub organizations | [`/en/organizations`](https://sebastianlopezo.page/en/organizations)   | [`/es/organizations`](https://sebastianlopezo.page/es/organizations)   | the organization's name in lowercase, such as `smartpottech`                                       |

The home sections, the journey map and the footer link to them, and they carry the role view the same way the
project pages do.

## Stack

SolidJS 1.9 · TypeScript (strict) · Vite 8 · Tailwind CSS 4 · Vitest · Solid Testing Library · Playwright · nginx · Docker ·
GitHub Actions

## Getting started

Requirements: Node.js 22.18 or newer and pnpm 10 (`corepack enable`).

```bash
pnpm install
pnpm dev        # http://localhost:8080
pnpm build      # prerendered site in dist/
pnpm preview    # serves dist/ with the same rules as production on http://127.0.0.1:4173
```

| Script                         | Purpose                                                                                                                                              |
|--------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| `pnpm lint` / `pnpm typecheck` | ESLint and TypeScript checks                                                                                                                         |
| `pnpm test`                    | Unit tests (content parity, paths, role views, SEO, assistant)                                                                                       |
| `pnpm test:dist`               | Checks the built pages, crawler files and size budgets                                                                                               |
| `pnpm test:e2e`                | Playwright tests on desktop and mobile against `dist/`                                                                                               |
| `pnpm check:contrast`          | Verifies WCAG contrast of the design tokens                                                                                                          |
| `pnpm check:links`             | Requests every external link in the content and reports broken ones (run before a release)                                                           |
| `pnpm images`                  | Regenerates AVIF/WebP variants from `assets-src/`                                                                                                    |
| `pnpm metrics`                 | Copies the latest GitHub and WakaTime figures from the profile repository into `src/content/shared/github-stats.json` (CI builds do it on their own) |
| `pnpm og`                      | Regenerates the Open Graph images and the Apple touch icon                                                                                           |
| `pnpm resumes`                 | Renders the resume PDFs and their previews from the OhMyCV sources in the `SebastianLopezO` repository; previews need poppler, or Docker to run it   |

## How it works

```
src/
  main.tsx              client entry: loads the page language and hydrates with Solid
  entry-server.tsx      server entry used by the prerender
  components/
    layout/             header, footer, language and role switchers
    sections/           one component per page section; below the hero each loads in its own chunk
    assistant/          launcher (main bundle) and lazy panel
    journey/            journey map, capability heatmap, focus radar and horizon (lazy chunk)
    case-study/         layered architecture diagram, figures and screenshots (lazy chunk)
    projects/           project card shared by the home section and the projects index
    page/               article parts shared by the project and detail pages: sections, page index, breadcrumb
    ui/                 form controls, carousel, toggle and the Lucide icons as static templates
  content/
    shared/             language-neutral facts: dates, tech, links, counts, role tags, projects, archive
    case-studies/       case study text in both languages (lazy chunk)
    project-pages/      text of the other project pages in both languages (lazy chunk)
    detail-pages/       text of the job, program, certification and organization pages (lazy chunk)
    en/, es/            localized text, checked against the Content type; startup.ts is what hydrates first
    roles.ts            section order, stack and priorities of each role view
  context/              language and role providers (accessors, so a role change updates in place)
  lib/                  paths, SEO head, sitemap, role ordering, formatting, assistant engine
  routes/               minimal history router on a location signal
  styles/               design tokens and global styles
scripts/                build, prerender, image, OG and resume generators, static server
nginx/                  production server config
e2e/, tests/            browser and build output tests
```

**Rendering.** `pnpm build` runs the client build, a server build of `entry-server.tsx`, and
`scripts/prerender.ts`, which writes the 182 pages (12 profile views, 2 project indexes, 64 project pages, 8 detail
indexes and 96 detail pages), `404.html`, `sitemap.xml`, `robots.txt` and `llms.txt`, inlines the CSS,
hashes each page's text into `page-dates.json` (a page keeps the `lastmod` the live site gave it until its text
changes),
and pre-compresses everything with Brotli and gzip. The pages are complete without JavaScript, so Solid loads and
hydrates in
the first idle period after both the `load` event and the first paint, and the web fonts arrive with it. The first paint
uses fallback faces
with matching metrics, so the swap does not move the layout and nothing competes with the first paint.

**Content.** Facts live once in `content/shared`; text lives in `content/en` and `content/es`. Collections are keyed
by id, so a missing translation is a type error, and a unit test fails if both languages drift apart. The years of
experience are computed from the first job (August 2022) at build time.

**Sections.** The page hydrates with `content/{en,es}/startup.ts` (head, header, hero and figures) and the main
bundle. Every section below them is prerendered in place, but in the browser its component and its copy load in
chunks of their own (`components/sections/SectionSlot.tsx`, `content/sections.ts`); Solid keeps the server HTML of
each section until its chunks arrive and then hydrates it in place. A section's chunk resolves only with the copy it
reads (`components/sections/section-loaders.ts`), so its components read the copy synchronously. `<html data-hydrated="true">` appears once every section
on the page has hydrated (`lib/ready.ts`).

**Projects.** Every project has its facts in `content/shared/projects.ts` (category, dates, stack, links, figures,
diagram and the archive organization that holds its repositories) and its card text in `content/{en,es}/projects.ts`.
Five of them are full case studies, with facts in `content/shared/case-studies.ts` and text in
`content/case-studies/{en,es}.ts`; the other fifteen pages take their text from `content/project-pages/{en,es}.ts`.
The slugs, and the projects each job links to, live in `content/shared/project-links.ts`. The project pages are
prerendered like the profile pages; their header and footer come from the main bundle and their body and text load
in a separate chunk (`content/project-copy.ts`), with the head builders in `lib/seo-projects.ts`. Each page has its
own Open Graph image, generated by `pnpm og` (`case-*.jpg` for the case studies, `project-*.jpg` for the rest).

**Detail pages.** The jobs, programs, certifications and organizations reuse their facts in `content/shared` and the
home sections' text; what only their pages tell (positions, intros, areas, courses, issuers) lives in
`content/detail-pages/{en,es}.ts`, and the commits per organization in `content/shared/organization-activity.ts`.
`lib/details.ts` relates them (the projects of a job, the recommendations from it, the certifications earned while it
lasted, the jobs and programs going on when a certification was earned), so a page never states a link the facts do
not hold, and the timelines are built from the same facts. The slugs live in `content/shared/detail-links.ts`; the
pages render like the project pages (`routes/DetailRoute.tsx`, `pages/DetailPages.tsx`, `lib/detail-body.ts`), with
their heads in `lib/seo-details.ts`. Every job, program, certification and organization has an Open
Graph image of its own (`experience-*.jpg`, `education-*.jpg`, `certifications-*.jpg`, `organizations-*.jpg`); a
certification's image shows the certificate when the page has a copy of it.

**Journey.** Milestones, capability levels, the radar and the GitHub activity per year live in
`content/shared/journey.ts`; planned dates and future levels are targets and are drawn dashed. The section is
prerendered with the page, and like every section its code and its text (`content/journey-copy.ts`) load in their own
chunk, so they do not count against the startup budget.

**Role lock.** The role comes from the URL path and the lock from `?locked=true`. An inline script marks the
document before the first paint so the switcher never flashes, and every internal link keeps the lock. Nothing is
stored in the browser.

## Migration from React

The SolidJS edition keeps the React edition's markup, classes, content, routes, prerender and tests; the components
were ported one by one. Comparing the prerendered HTML of all 182 pages and the 404 element by element against the React
build (ignoring only Solid's `data-hk` keys, generated ids and hashed asset names) finds no difference in the head, the
structured data, the text, the links or the attributes, and `page-dates.json` hashes every page as before, so the
sitemap keeps its dates. The unit, build and end-to-end suites pass unchanged in what they check. What changed:

- **Rendering.** `renderToString` from `solid-js/web` prerenders the pages and `hydrate` resumes them. Solid's
  `lazy` keeps a section's prerendered HTML until its chunk arrives, like React's Suspense did. The client entry sets
  the empty hydration state itself, so no `HydrationScript` reaches the page and the CSP is unchanged.
- **Reactivity.** Components run once. The router keeps the location in a signal and the providers hand out accessors:
  a role change reorders the home sections and updates their emphasis without re-running them, and the `?from=` view a
  project or detail page learns after hydration reaches every link because links read it inside JSX.
- **Dependencies.** `react`, `react-dom`, `lucide-react` and `clsx` are gone: the 31 icons are static templates in
  `components/ui/icons.tsx` and `cn()` is a local helper. The runtime dependencies are `solid-js` and the three font
  packages; `eslint-plugin-solid` replaces the React hooks rules and Vitest runs a jsdom project and a Node project for
  the server render.

Measured on the same content (`pnpm build`, gzip level 9):

| Measure                                         | React 19 | SolidJS |
|-------------------------------------------------|---------:|--------:|
| Entry script                                    |  63.3 KB |  9.6 KB |
| JavaScript before hydration on `/en`            |  91.3 KB | 39.8 KB |
| Every JavaScript chunk                          | 359.2 KB | 326.6 KB |
| First paint on `/en` (HTML up to the first section) | 17.0 KB | 17.2 KB |
| Whole `/en` page                                |  59.7 KB | 67.4 KB |
| Project page (`/en/projects/smartpot`)          |  23.2 KB | 24.6 KB |
| `node_modules`                                  |   523 MB |   56 MB |

Lighthouse (mobile, median of five local runs) moved from 96 to 97 on `/en` and from 94 to 99 on `/es/backend`, with
total blocking time on the latter down from 292 to 86 ms; accessibility, best practices and SEO stay at 100.

The pages grow because Solid marks every hydratable element with a `data-hk` key; the first paint barely does, and the
JavaScript that has to download, parse and run before the page responds is less than half of what it was. Part of that
saving is outside Solid: the hero's figures count the certifications and recommendations from
`content/shared/counts.ts` instead of importing both lists, which a test keeps in step.

## Documentation

- [Content](docs/content.md): writing rules, the source of every fact and the figures with the date they were read.
- [Design system](docs/design-system.md): palette, tokens, contrast ratios and usage rules.
- [DESIGN.md](DESIGN.md): the same system described for screen generators such as Google Stitch.
- [Profile assistant](docs/assistant.md): architecture and how to extend it.
- [Deployment](docs/deployment.md): image, nginx rules, server setup, secrets and rollback.
- [Maintenance](docs/maintenance.md): the checklist before each release and the monthly pass over figures and text.
