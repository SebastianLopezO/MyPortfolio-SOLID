# Design System: Sebastián López Osorno, portfolio

This file describes the look of the site in the words a screen generator such as Google Stitch reads (it follows the
`stitch-design-taste` format). The values come from [`src/styles/tokens.css`](src/styles/tokens.css), which stays the
source of truth, and [`docs/design-system.md`](docs/design-system.md) keeps the contrast table and the rules for
components. When the two disagree, the code wins and this file gets fixed.

## 0. Where it comes from

The redesign of November 2026 answers one problem: the site said everything in words, so cards grew long, the dark
teal theme tired the eye and a project read as a wall of text before anyone saw what it was. Two portfolios set the
direction.

- **[gabrielvaldivia.com](https://www.gabrielvaldivia.com/work).** A work index of square tiles, each an image on its
  own field, a name and three or four words; the whole tile is the link, and it grows 2.5% under the pointer. Filters
  are pills. Inner pages open with the name set very large, a paragraph beside a small table of facts (team, services,
  date), then large media panels separated by short sections whose title sits in a left column. Long lists (talks,
  clients, notes) are quiet rows: a title and a muted descriptor. The header folds into one round button once the page
  scrolls, and its menu is a floating panel that marks the current page with a dot.
- **[blunar.cz](https://www.blunar.cz/).** White and very light grey layers over a fine technical grid, a grotesk in
  several weights, eyebrows written as paths (`/about`, `/experiments`), an indexed list whose items carry small
  colored squares for their category, skills drawn as the dials of a device, and the `/experiments` board: objects
  lying on a grid, a little turned, that the reader drags around. On a phone the board becomes a row seen one object at
  a time.

What the site takes is the method, not the look of either: images say what a project is before words do, a tile
carries a name and a few words, and the details live one click away. Since there are few photographs of the work, the
images are illustrations drawn for the site (section 4, Illustrations).

## 1. Visual Theme & Atmosphere

A bench of small devices on clean paper. The interface is monochrome, ink on paper in the light theme and paper on ink
in the dark one; color appears only in layers: the soft field behind each illustration, the objects themselves, the
charts. Pages read like a product designer's case files: a large name, a sentence, a table of facts, a picture.

- **Density 3, Gallery Airy.** The first glance carries a name and a few words per item; everything else opens in
  place or lives on its own page.
- **Variance 5, controlled asymmetry.** The hero splits text and board; the reasons to hire me are a slide beside a
  list; lists are strict index rows.
- **Motion 6, Fluid CSS.** Illustrations rise onto their tiles as they come up, the page settles at the start of each
  screen, the skills turn on a ring one card at a time and the reasons slide in beside their slide. The browser
  draws nearly all of it from CSS; the one thing that moves on its own for more than five seconds, the skills ring,
  has a pause button, and `prefers-reduced-motion` turns the rest off and leaves the ring paused.

## 2. Color Palette & Roles

Every token is `light-dark(light, dark)` in OKLCH; the page follows the system and the header's button pins a theme
(`<html data-theme>`, remembered in `localStorage`). Hex values below are the sRGB conversions, light / dark.

- **Paper / Night** (#FBFCFD / #0D0D0D, `bg`): page background and `theme-color`. Never pure white or pure black.
- **Mist / Graphite** (#F2F4F5 / #161616, `surface`): panels, the skill cards, raised sections.
- **Fog / Smoke** (#E7EAEC / #202020, `surface-raised`): chips, quiet buttons, the menu's hover.
- **Hairline** (#DCDEE0 / #2E2E2E, `border`): dividers between index rows. Decoration only.
- **Control Edge** (#7D8185 / #747474, `border-strong`): borders that must be seen: inputs, outline buttons (3:1+).
- **Ink / Paper** (#141619 / #F5F5F5, `fg`): headings and body text (17.6:1 / 17.8:1).
- **Graphite text / Silver** (#3D4044 / #CACACA, `fg-muted`): summaries, briefs, descriptions (AAA on every surface
  and tile).
- **Slate / Ash** (#484A4F / #B4B4B4, `fg-subtle`): captions, dates, eyebrows (at least 7:1 everywhere).
- **Primary = Ink** (`primary`): the action color is the text color. A primary button is an ink pill with paper text;
  a link darkens to ink.
- **Cobalt** (#1745C2 / #9DBDFF, `accent`): one small highlight: the dot of the current menu entry, focus rings
  (`ring`), the first chart series.
- **Status Green** (`success`): the present, as a dot.
- **Tiles** (`tile-sky`, `tile-mint`, `tile-peach`, `tile-lilac`, `tile-butter`, `tile-rose`, `tile-sage`,
  `tile-stone`): the layers behind illustrations. Pastel paper in light (L 0.93), the same hue sunk to L 0.27 in dark.
  Ink and muted text keep AAA on every tile in both themes.

Chart colors (`viz-*`, `level-*`, `chart-*`, `sdg-*`) live in their own validated block. `pnpm check:contrast` checks
every pair in both themes.

## 3. Typography Rules

- **Three voices:** DM Serif Text (400) for display headings, IBM Plex Sans (400 and 600) for body text and UI, and
  Source Code Pro (400) for tools, dates, eyebrows and figures. Metric-matched local fallbacks keep the layout still
  while the faces load.
- **Headings:** `text-display` clamp(2.125rem → 4.25rem), leading 1.05, for the name and each project's title;
  `text-heading` clamp(1.75rem → 2.5rem), leading 1.15, for section titles; `text-title` 1.25rem, leading 1.3, for
  rows and tiles. Weight stays 400: hierarchy comes from size and tone, never from bold.
- **Two tones in a heading:** the hero writes the name in ink and the role under it in `fg-subtle`, the way a title
  card does.
- **Banned:** Inter, gradient text, all-caps beyond the smallest labels, faux bold.

## 4. Component Stylings

- **Project tiles** (`ProjectTile`): one layer of color with the project's illustration on a 4:3 field, then its name
  and a brief of two to five words, all inside the same rounded tile (1.25rem on phones, 1.75rem from 48rem). The whole
  tile is the link; under a pointer it grows 1.5%, lifts its illustration 8px and leans its arrow (always pinned to the
  tile's bottom-right corner). Two across on a phone, three at 64rem, four from 80rem. A featured project spans the row
  with its illustration beside its name, brief and one sentence.
- **Illustrations:** soft hardware seen from above, slightly tilted toward the reader: rounded plates with a darker
  side for thickness, a sheen and a bevel, lenses, lights, keys, screens and cables, over a blurred contact shadow.
  Each one hints at a project without picturing its screens: a hub with three cables for the integrations, a camera
  beside a database for the CRM snapshots, a planter with a probe for SmartPot. They are static SVG files drawn by
  `scripts/render-illustrations.mjs` from `scripts/illustrations`, with transparent backgrounds so the tile gives them
  their color; a light may pulse three times, a dial sweeps once, and nothing loops. The pages beyond the projects
  have objects of the same family (`scripts/illustrations/pages.mjs`): a job is a badge on its lanyard with a button of
  what it was about, a program is a book with what it led to on top (a mortarboard, a shield, a laptop), a GitHub
  organization is a cabinet of drawers with its sticker and a padlock when its code is private, the dedicated about page
  has a modular drafting slate with a compass dial and connected layer nodes (`about.svg` on `tile-mint`), and each service and
  each reason to hire me is one object that says it (a hub of cables, a stopwatch, a spirit level, one ball thrown in
  and three coming back). A flat glyph pressed into a face, the way a logo is, tells the objects of one kind apart.
- **The hero:** the name, the role, a sentence, a summary and two buttons beside the board; nothing that reads as a
  plea (no availability pill), no stack chips (the skills section has the tools) and no role switcher (a role view is
  reached by its address).
- **The hero board:** the portrait sits whole in a square socket at the middle of a board, as large as the room
  between the devices allows, and cables run from the socket's sides to six devices of the work. It says "I connect
  systems" before a word is read. The portrait is the largest paint and is drawn at
  once. Each device is a link to the project it stands for: with a pointer on the board a dashed outline marks every
  device, and the one under the pointer, or reached with the keyboard, shows a label with the project's name and a
  line about it, opening toward the middle of the board. Escape puts the label away.
- **Skills gallery** (`SkillsSection`): every group of tools is a Mist card on a 3D ring, with its object on a layer
  of color, how many tools it holds, its name and a short line. The ring turns one card at a time while it is in
  view and stops under a pointer, on focus, off screen or with its pause button; the cards at the sides fade and turn
  away. Each card leads to the group's page (`/skills/{slug}`), which tells its focus, what it is, what it is good for,
  all its tools and the projects, jobs, studies and services where it shows.
- **Services** (`ServicesSection`): no cards and no lists of points on the home. Each service is its object on a
  rounded layer, its name with an arrow and a few words, and the whole of it leads to the service's page, which tells
  what it covers, the projects that prove it, the jobs it was done in and the reasons that go with it.
- **The reasons to hire me** (`ReasonsSection`): a presentation. A slide holds the reason's object on a tile, its
  number (`03 de 11`) and the words of the recommendation behind it; beside it, the list of every reason, one bordered
  card each (object, number, title, sentence), sliding in from the side as it comes up. From 64rem the slide stays in
  view (`aspect-[16/10]`, capped at `40svh` so it never clips on 768px laptops) and turns to the reason whose card
  crosses the middle of the screen, which takes an ink border; below 64rem the active reason renders as a compact
  horizontal highlight card above the list instead of taking a full screen. Every reason has a page with the whole
  recommendation, the quoted words marked on the reason's color, where it shows in the work, and the projects, jobs,
  programs and services it links.
- **Header:** at the top of a page a strictly single-line quiet frosted bar: the whole name in ink, six primary
  sections (`about`, `experience`, `projects`, `skills`, `services`, `contact`) with the one being read underlined,
  and the controls capsule (language, theme and the round ink menu button that always opens the full twelve-section
  floating panel). Once the reader scrolls it folds into two high-contrast frosted floating pieces (94% opacity): the
  name pill at the left and the controls capsule at the right. The floating panel lists all twelve sections and marks
  the active one with a cobalt dot; below 80rem the navigation lives entirely inside that panel. A 2px line along the
  top edge draws the reading progress.
- **Section rhythm:** from 64rem wide and 40rem tall, the hero opens as a calm centered frame capped at
  `min(100dvh, 54rem)` so tall monitors never stretch empty space. Every section below flows naturally with fluid
  vertical rhythm (`clamp(3.5rem, 2.5rem + 3.2vw, 6rem)`) and `overflow-x: clip`, avoiding forced `100dvh` traps per
  card or empty vertical voids. Clicking any `#section` link smoothly aligns the target right beneath the fixed header
  (`scroll-padding-top: var(--header-height)`).
- **Buttons:** pills. Primary: ink fill, paper text, 48px in the hero, 44px elsewhere. Secondary: a Control Edge
  outline or a Fog fill. Pressing moves them down 1px. At most one primary button per view.
- **Chips:** pills in Source Code Pro, never below 13px, on Fog; outside the role view's focus they turn into a hairline
  outline.
- **Index rows:** jobs, certifications, skill groups, repositories. A row is a date column in mono, a title, its place
  and one sentence, separated by hairlines; its details open in place (`More`) and its page tells the rest.
- **Project pages:** the crumbs, the title at display size, then the tagline and summary beside a table of facts (role,
  place, period, team, status) with mono labels, then the illustration on its tile across the page (21:9 on a desktop),
  then screens, figures and sections.
- **Decisions** (`Decisions`): every decision of a project shown whole, never behind a tab. A row is a number in mono
  and a title, then a short flow: the problem on a Mist panel, a round joint with an arrow laid over the edges of both,
  and the solution on the project's own tile color, wider (2:3) since it says more, with its cost below a dashed line
  like the stub of a receipt. Side by side from 48rem, stacked on a phone with the arrow pointing down. As a row comes
  up the problem rises, the joint grows, the solution follows from the problem's side and the cost prints from left to
  right; under a pointer the joint fills with ink.
- **Disclosures:** a native `details` whose summary says what it opens ("Show more (9)"), with a chevron that turns;
  its text stays in the prerendered page.
- **Inputs:** label above, paper fill, Control Edge border, 0.75rem corners, cobalt ring on focus.
- **Open Graph cards** (`scripts/generate-og.mjs`, `scripts/og/template.html`): 1200 × 630 cards on Paper (`#FBFCFD`)
  with the hero's fine technical grid, an eyebrow in Source Code Pro with a status or cobalt dot, a two-tone heading in
  DM Serif Text 400 (title in ink, subtitle in slate), an ink pill for `sebastianlopezo.page` beside a Fog pill for the
  context, and a 460 × 460 rounded square tile on the right holding the page's illustration on its `tile-*` color (or
  the hero board with the portrait in its socket on the home card). Certifications link out to their credentials on
  Google Drive and issuer verification pages rather than embedding scanned documents on the site or in social cards.

## 5. Layout Principles

- **The home is the first glance, not the archive.** Each section keeps its claim and its best proof; the rest opens in
  place or lives on its own page. About on the home focuses on identity and mindset (quote, two short paragraphs, four
  hairline pillars, ASCII terminal, languages and a quiet hairline education index) and leads to `/about`, which opens
  into non-repeating deep chapters (digital worldview, curiosity, study choices, engineering approach and AI, horizon)
  with organic illustrated links to projects, programs, certifications, reasons, services, skills, experience and metrics.
  Both views follow Jakob Nielsen's 10 usability heuristics: live scroll/section status (`PageIndex`, `CopyLink` polite
  feedback, active role-lens indicator), real-world hardware objects and plain language, explicit exit/reset paths,
  strict token and component consistency, touch-target and external-link error prevention, recognition over recall via
  inline illustrated tiles and a sticky `Glance` card, two-speed scanning and role accelerators, minimalist density
  without repeated prose, graceful clipboard/404 recovery and contextual lead-ins before every interactive directory.
  Every job, project, certification and organization has a page, and so do the services, the reasons to hire me and the
  GitHub metrics.
- **Three section layouts:** `wide`, the heading above content that needs the whole row (the projects, the skills, the
  journey); `split`, the heading in a left column that stays in view beside a list; `pair`, the heading and what it
  carries in the left half and the content in the right half, its top level with the title (the contact: the ways to
  reach me under the title, the form beside it). All stack below 64rem.
- CSS Grid for every multi-column layout; nothing scrolls sideways except the sliders.
- `container-page` is 72rem up to a 1440px viewport, then 82% of it up to 96rem. Full-height blocks use `100dvh`.

## 6. Motion & Interaction

- Durations of 120, 200 and 400ms on `ease-standard`, `ease-emphasized` and `ease-spring` (a settle with a touch of
  spring for what lands: a tile, a lifted object, the header). Transitions list their properties.
- **Scroll-driven:** section headings, rows and tiles rise into place as they enter; a tile's illustration rises onto
  its layer; screens paint in from their top edge; a decision flows from its problem to its solution; the journey map
  rises in as one piece; a reason's card slides in from the side of
  its slide; bars grow; figures count up once. Browsers without scroll-driven animations get the page at rest.
- **On load:** the illustrations' own lights pulse three times. Under five seconds in all.
- **Hover:** a tile grows and lifts its illustration; a service's object lifts; an arrow leans the way it leads. Only
  for pointers that hover.
- Following a link cross-fades between pages with the header held in place; a link to a part of the page scrolls
  there smoothly, so the sections on the way play their entrances.
- `prefers-reduced-motion: reduce` turns every animation and transition off.

## 7. Anti-Patterns (Banned)

- No emoji in the interface, no Inter, no serif display, no faux bold, no gradient text.
- No accent color on text blocks: color lives in the layers and the illustrations.
- No pure black (#000000) or pure white (#FFFFFF) surfaces, no neon glow.
- No long cards: a tile is an illustration, a name and a few words; a row is a date, a title and a sentence.
- No stock photographs or AI renders standing in for the work: the illustrations are drawn for the site, one family.
- No endless loops: nothing moves on its own for more than five seconds (WCAG 2.2.2), and no spinners.
- No invented figures: every number has a source and a date (`docs/content.md`).
- No stock phrases ("elevate", "seamless", "next-gen", "passionate").
- No client names of TIVENOS or ADCOM anywhere (enforced by `src/content/content.test.ts`).
