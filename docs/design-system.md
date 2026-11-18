# Design system

The portfolio is dark only. Every color, font, radius, shadow and motion value lives in
[`src/styles/tokens.css`](../src/styles/tokens.css) as a Tailwind v4 `@theme` token, written in OKLCH.
`--color-*: initial` removes Tailwind's default palette, so a class such as `text-blue-500` does not compile and
components can only use the tokens below.

## Brand

| Role                  | Token                        | Value                    | Hex       |
|-----------------------|------------------------------|--------------------------|-----------|
| Brand teal            | `teal-500` → `primary`       | `oklch(0.73 0.116 185)`  | `#35BFB1` |
| Hover teal            | `teal-400` → `primary-hover` | `oklch(0.79 0.12 185)`   | `#48D3C5` |
| Emerald accent (text) | `emerald-300` → `accent`     | `oklch(0.8 0.12 170)`    | `#61D7B2` |
| Emerald (fills only)  | `emerald-500`                | `oklch(0.573 0.111 172)` | `#018D71` |
| Background            | `neutral-950` → `bg`         | `oklch(0.159 0 0)`       | `#0D0D0D` |

The teal and the near-black background come from the previous palette (`#36BFB1` on `#0D0D0D`). As text, the old
secondary `#028D71` cleared WCAG AA by a hair (4.7:1) and the accent `#02745D` failed it (3.4:1); white text on the
secondary failed too (4.2:1). Both are now fill-only (`emerald-500`, `emerald-700`) and the text accent moved to
`emerald-300`.

## Semantic tokens

| Token                          | Use                                                            | Contrast on `bg`        |
|--------------------------------|----------------------------------------------------------------|-------------------------|
| `bg`                           | Page background, also `theme-color`                            | —                       |
| `surface`                      | Cards and panels                                               | —                       |
| `surface-raised`               | Hovered cards, inputs, chips                                   | —                       |
| `border`                       | Decorative dividers and card outlines                          | 1.6:1 (decorative only) |
| `border-strong`                | Input borders and controls that must be visible                | 3.6:1                   |
| `fg`                           | Headings and body text                                         | 17.9:1                  |
| `fg-muted`                     | Secondary text                                                 | 10.5:1                  |
| `fg-subtle`                    | Captions, dates, metadata                                      | 8.3:1                   |
| `primary`                      | Links, highlights, primary buttons                             | 8.6:1                   |
| `on-primary`                   | Text on `primary` buttons                                      | 8.6:1 on `primary`      |
| `accent`                       | Secondary highlights and gradients                             | 11:1                    |
| `ring`                         | Focus outline                                                  | 11.7:1                  |
| `success`, `warning`, `danger` | Status text and icons                                          | ≥ 7.8:1                 |
| `whatsapp`, `on-whatsapp`      | WhatsApp button, the only brand color from outside the palette | 9.8:1                   |

`pnpm check:contrast` ([`scripts/check-contrast.mjs`](../scripts/check-contrast.mjs)) converts every token from OKLCH
to sRGB and checks these minimums; the build pipeline fails when one drops below them:

| Pair                                                           | Minimum           |
|----------------------------------------------------------------|-------------------|
| `fg`, `fg-muted`, `fg-subtle`, `primary` on every surface      | 7:1 (AAA)         |
| `accent`, `danger`, `success`, `warning` on `bg` and `surface` | 7:1 (AAA)         |
| `on-primary` on `primary` and `primary-hover`                  | 7:1 (AAA)         |
| `border-strong` and `ring` on every surface                    | 3:1 (WCAG 1.4.11) |
| `on-whatsapp` on `whatsapp`                                    | 3:1               |
| `viz-*` on `bg` and `surface`                                  | 3:1               |
| `level-*` on `bg` and `surface`                                | 2:1               |
| `bg` on `level-2` to `level-4`, `fg` on `level-1`              | 4.5:1             |
| Label ink on each `sdg-*`                                      | 4.5:1             |

Every text color reaches AAA on the surfaces it sits on. The one exception is the number inside an SDG badge: the
badges keep the UN's own colors, on which neither light nor dark ink reaches 7:1, so the number stays at AA and the
goal's name, written beside the badge in `fg-muted` (or read out to screen readers where the badge is compact),
carries the same meaning.

## Data visualization

The journey section draws charts, so it has its own tokens. They sit in a `@theme static` block at the end of
`tokens.css`, because the charts read them through inline `var(--color-…)` values that Tailwind cannot see, and a
plain `@theme` would drop them from the CSS. Every palette was checked with the dataviz palette validator against the
`surface` color (`#121615`) for color-vision deficiencies as well as contrast.

**Lines** (`viz-*`): one categorical hue per career line of the journey map, always in this order so that the
neighboring lanes keep the most distinct pairs. The worst adjacent pair stays apart under protanopia, deuteranopia and
tritanopia (ΔE 8.4). Colors never carry meaning alone: every lane has a text label and every station a name.

| Token           | Line                   | Hex       | On `surface` |
|-----------------|------------------------|-----------|--------------|
| `viz-education` | Education              | `#3987E5` | 5.0:1        |
| `viz-web`       | Web & full-stack       | `#D95926` | 4.7:1        |
| `viz-backend`   | Backend & integrations | `#1A9E70` | 5.4:1        |
| `viz-crm`       | CRM & automation       | `#C98500` | 6.0:1        |
| `viz-data`      | Data & BI              | `#D55181` | 4.6:1        |
| `viz-devops`    | DevOps & cloud         | `#008300` | 3.7:1        |
| `viz-security`  | Security               | `#9085E9` | 5.9:1        |

**Levels** (`level-1` … `level-4`): an ordinal teal ramp from the brand scale, dark to light, for the capability
heatmap and the rings of the focus radar. Level 0 is the empty `surface`. Numbers drawn on levels 2–4 use `bg`; on
level 1 they use `fg`.

**Sustainable Development Goals** (`sdg-*`): the official UN colors of goals 2, 4, 8, 9, 11, 13 and 16, kept exact
because they are recognizable. Their number badges use `fg` on goals 4, 8, 13 and 16 and `bg` on goals 2, 9 and 11,
whichever clears 4.5:1.

The radar's four quadrants are not colored: four hues on one chart failed the all-pairs color-vision check, so
quadrants are told apart by position and labels, and only the ring (focus level) is colored.

## Typography

| Token          | Font                    | Use                                                                             |
|----------------|-------------------------|---------------------------------------------------------------------------------|
| `font-display` | DM Serif Text 400       | `h1`–`h3`. The family has no bold, so `font-synthesis: none` prevents faux bold |
| `font-sans`    | IBM Plex Sans 400 / 600 | Body text and UI                                                                |
| `font-mono`    | Source Code Pro 400     | Tech chips, code, the ASCII art                                                 |

| Token          | Size                                                                                                                                                                          |
|----------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `text-display` | `clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem)` / 1.05                                                                                                                                |
| `text-heading` | `clamp(1.875rem, 1.4rem + 1.8vw, 2.75rem)` / 1.15                                                                                                                             |
| `text-title`   | `1.375rem` / 1.3                                                                                                                                                              |
| `text-xs`      | `0.8125rem` / 1.125rem: dates, labels and chips. Nothing that is read goes below 13px; only the axis labels inside the journey's SVG charts do, and they scale with the chart |
| Body           | `1rem` / 1.6                                                                                                                                                                  |

Only the Latin subsets are bundled, and the web fonts load with the JavaScript after the first paint
(`src/lib/fonts.ts`). Until they arrive, text uses the faces in `src/styles/fallback-fonts.css`: Arial, Times New
Roman and Courier New (or their metric twins Liberation Sans, Serif and Mono) with `size-adjust` and ascent/descent
overrides measured against each web font, so the swap does not move the layout (CLS 0). The four web fonts are loaded
with the `FontFace` API and added to `document.fonts` together once all of them have loaded, so the page lays out
again only once and no style is recalculated.

Charts that tell categories apart, such as the commit areas in the GitHub metrics, use `chart-1` to `chart-6`: the
brand teal and emerald first, then a cool blue (`oklch(0.72 0.1 235)`), a dark teal and two neutrals. They never carry
text; each bar has a labeled legend or row next to it.

## Layout, shape and motion

- `container-page`: `clamp(72rem, 80vw, 96rem)` with a fluid `clamp(1rem, 4vw, 2rem)` gutter. It stays at 72rem up
  to a 1440px viewport and then grows with the screen, so wide monitors get wider grids instead of wider margins.
  Prose keeps a reading measure inside it (`max-w-2xl` to `max-w-4xl`); case study pages, which read like
  articles, stop at 80rem.
- `section`: vertical rhythm of `clamp(4rem, 3rem + 4vw, 7rem)`. A home section off screen skips style and layout
  (`content-visibility: auto`) and takes a measured height until it renders (`components/layout/Section.tsx`), and
  `lib/anchors.ts` puts the target of an in-page jump back under the header while the page settles.
- Radii: `sm` 0.375rem, `md` 0.5rem (buttons), `lg` 0.75rem (cards), `xl` 1rem (panels).
- Shadows: `shadow-card` for elevation, `shadow-glow` for the brand glow on focus and hover.
- Motion: `--duration-fast` 120ms, `--duration-base` 200ms, `--duration-slow` 400ms, `ease-standard`,
  `ease-emphasized`. Nothing that can be the largest paint animates its opacity (on the home that is the hero's
  portrait), so the LCP is never delayed, nothing moves on its own for more than five seconds, and
  `prefers-reduced-motion: reduce` turns every animation and transition off. The new rules below sit inside
  `@media (prefers-reduced-motion: no-preference)`, so they are never declared for that reader at all.
- Opening the page: the core stack and the role views of the hero settle in one after another (`hero-cascade`, each
  part's place given as `--i`, 45ms apart), and the availability dot sends out three pulses (`status-dot`, 4.8s in
  all). As the hero leaves the screen, its portrait drifts up 2.5rem and dims (`hero-portrait`, the exit range of its
  view timeline).
- Screens: a screen the reader reaches before it has arrived is marked `data-loading` by `CaseImage` and pulses in
  Raised Graphite (four beats at most); on arrival it is marked `data-loaded` and fades in. One that arrives before it
  is reached, or the one a page opens with (`eager`), shows as it is. Around the image, the `picture` carries the
  reveal: the screen at the top of a card starts at 1.12 and settles into its frame (`screen-settle`), and a screen on
  a project or detail page paints in from its top edge (`screen-unmask`, a `clip-path` on the picture, never on the
  link, so the link's focus ring stays whole). A frame that clips them uses `overflow: clip`: `overflow: hidden` would
  make it a scroll container, and the view timeline would follow it instead of the page.
- Charts: the journey map is plotted from left to right (`journey-chart`, a named view timeline on its frame, which
  scrolls sideways itself) and each station settles as the sweep reaches it (`--x`, its place from 0 to 1). The focus
  radar powers on when its tab opens: rings grow from the center (`radar-ring`), then each technology flies out from
  the center (`radar-blip`, `--dx` and `--dy`). The terminal prints its ASCII art one line at a time
  (`ascii-print`, `steps(--ascii-rows)`).
- Sliders on phones: below 48rem the cards at a slider's edges turn away 16° and dim to 0.4 as they enter and leave
  (`carousel-depth`, a `view(inline)` timeline over the track); the card in view is at rest.
- Section entrance: the heading of every home section, the sections of the project and detail pages, the rows of the
  detail indexes and the previous/next cards rise 1.5rem into place as they enter (`section-enter`, a scroll-driven
  animation over the first 40% of their entry). The cards, rows and figures of the home sections do the same: their
  list or grid carries `enter-each`, each part rests after 7rem of scroll, and in a row each one settles 3rem after
  the one before it. One already on screen when the page loads is past that range, so it never starts faded. The bars
  of commits per year grow from the left the same way (`bar-grow`). These rules sit behind
  `@supports ((animation-timeline: view()) and (animation-range: entry))` and take the timeline's own duration
  (`auto`); a slide inside a carousel that scrolls sideways keeps still, since its timeline is the carousel's.
- Figures: the figures under the hero, of the GitHub metrics and of the recommendations (`data-count`) count up from
  zero the first time the reader reaches them (`lib/count-up.ts`). One already on screen when the page settles keeps
  still, and the text ends exactly as it was prerendered.
- Header: its lower edge fills with the teal gradient as the page scrolls (`reading-progress`, a scroll timeline, no
  script), and the link of the section that crosses the middle of the screen is teal and underlined and carries
  `aria-current`; none is marked while the hero is there.
- Between pages: following a link fades from one page to the next where the browser has cross-document view
  transitions, and the header keeps its place (`view-transition-name: site-header`).
- What a control brings in: a tab panel, the list of milestones, an organization's metrics card and the phone menu
  ease in from `@starting-style` (`appear`), and a "Show more" opens to its height where the browser eases to `auto`
  (`.more::details-content`, `interpolate-size`).
- Home layers: the home shows what a recruiter scans in a minute and opens the rest on demand. A job shows two
  achievements (three that match the role view) and its first ten tools with a "+N" chip; a project card shows its
  screen, context, name, dates, summary and stack, with its achievements behind "Achievements (n)"; the featured
  project shows three; About shows the quote and the first paragraph, with "Read the full story". Each of these is a
  native `details` (`components/ui/More.tsx`): find in page opens it, search engines read it, it works before
  hydration. "Expand all" above the experience opens every one at once (`lib/disclosures.ts`). Services and GitHub
  metrics have a page each (`/services`, `/metrics`, an index with nothing under it and a `WebPage` schema); the home
  keeps the services as a list of names linking to each one's anchor and the metrics as the strip of figures. The
  organizations are named on the home and described on their index.
- Pointer: the arrow of a link moves 3px the way it leads, the icon of a link that leaves the site lifts, a download
  drops, and a project card brightens its outline, scales its screen to 1.03 and leans the arrow of its page link
  forward wherever the pointer rests on it (`hover-card`), only under `(hover: hover)`. The "Show more" chevron of
  the skills turns to point where the rows go.
- Experience timeline: on screens of 64rem and wider each job spans the width beside a line on the left, and the
  card splits in two: context, stack and case studies on the left, achievements on the right. The DOM keeps the
  order phones read (summary, achievements, stack, case studies) and grid placement does the rest. The line fills
  and the cards slide in with scroll-driven animations (`animation-timeline: view()`) that only move them
  (`translate`, `transform`), so contrast checks never see half-transparent text. Browsers without scroll-driven
  animations, and visitors who prefer reduced motion, get the static layout.
- About: from 64rem the story sits beside the terminal and the languages. The terminal holds the ASCII portrait and
  the trajectory as a `cat` of a log, side by side once the terminal itself is 42rem wide (a container query) and
  stacked below that, so the portrait never floats in an empty box. A role view brightens its own steps of the log and
  dims the rest. Education is a timeline on phones and an index two across from 48rem, with the degree on a row of its
  own; each program links to its GitHub organization.
- Skill groups: open blocks split by hairlines, the group name and its tool count above its tags, two across from
  48rem and three from 80rem, so the 15 groups fill the width instead of leaving the right side empty. No box around
  each group. Certifications are index rows two per row from 48rem, so the full list of 29 reads as one index; each
  says what it covered, what it adds today (in teal) and the journey stop that groups it, with that stop's line keys.
- Figures (the highlights under the hero, the recommendation counts and the GitHub metrics): open strips with no box
  around each number, the number above its label. The strip under the hero shows eight figures chosen per role view,
  four across from 48rem and two on phones. Each column stacks from the top, so the numbers stay on one line
  when a label wraps. On phones the recommendation counts read as lines ("16 Recommendations").
- GitHub metrics: the figure strip, then two panels side by side from 64rem (where the commits are, as one stacked
  bar in `chart-1` to `chart-6` with a legend row per area; and hours versus commits, two thin bars per language),
  then the years as columns from 64rem and as rows with horizontal bars below it, then the weekdays, the editors and
  the notes on repositories and reviews. Every bar has its number in text beside it.
- Resume: the choices and the preview are two columns of fixed measure (34rem and 28rem) centered together. One
  sheet is drawn behind the preview for every extra page (up to four), offset 10px each, with "Page 1 of N" under
  the stack, so the length of each version shows at a glance.
- Services: each card ends with "Done in" and links to the project pages that show the service, so every promise
  points to evidence.
- Floating buttons (WhatsApp and the assistant): on phones they step aside while the hero's two buttons sit in the
  bottom 9.5rem of the screen, where they would cover them, and while the contact section is on screen.
- Recommendations: a quote longer than six lines at the card's width shows a "Show more" toggle; the full text
  stays in the page, word for word.
- Sliders (`Carousel`): the recommendations show one card per view on phones, two on tablets and three from 64rem;
  the services and the reasons to hire are sliders below 48rem and grids above. The track scrolls sideways with snap
  points, so a swipe moves one card, and the buttons below it do the same with a counter ("4 / 16"). The track hides
  its scrollbar, takes keyboard focus while it scrolls, and keeps every card in the page, so a screen reader reads a
  plain list. The prerendered HTML carries the first three recommendations and the rest arrive with the JavaScript,
  which keeps the page within the HTML budgets checked in `tests/build/build-output.test.ts`.
- Journey charts: nothing scrolls sideways. From 64rem the map is an SVG with the lane names on its left edge;
  below that, a strip with one dot per stop and previous and next buttons (or a swipe on the details) move one stop
  at a time, and the line chips use one-word names. Picking a line moves to its latest stop when the selected one is
  not on it. The capability heatmap is a table from 64rem and one year at a time below it. Past spans are solid;
  planned ones are dotted, planned stations have dashed outlines and planned heatmap cells are hatched, so the
  difference between fact and plan does
  not depend on color. Every chart has an accessible alternative: stations are
  focusable buttons with the date and title as their name, the map has a list view, the heatmap is a table, and the
  radar is mirrored by lists of buttons.

- Case study diagrams (`LayeredDiagram`): plain HTML, not SVG. Columns of boxes left to right on wide screens and
  stacked on phones, with decorative arrows between neighbors; the caption states how data flows, so the markup is
  the accessible version. An optional dashed row underneath holds what runs under every column, such as delivery.
- Project pages (case studies and the lighter pages alike): from 80rem (1280px) on, the overview, the figures and an
  "On this page" index sit in a 20rem column beside the text; the index stays in view while reading. Below that the
  overview comes first. Every page ends with the previous and next project, as two cards, and a link to the index.
  The count beside a heading (projects in a category, certifications of an issuer) sits next to it, outside the
  `h2`, so a heading keeps one typeface.
- Detail pages (jobs, programs, certifications, organizations) share that layout (`components/page/PageParts.tsx`)
  and add a breadcrumb above the title: the profile section they come from, the collection's index and the page.
  Titles longer than 28 characters take the heading size instead of the display size, and a dash between two names
  stays with the word before it. Timelines are a vertical hairline with a dot per step, oldest first, and steps that
  have a page of their own are links. Up to 40 characters a title takes the display size from 48rem; longer ones
  keep the heading size. Running text keeps a 68-character measure. A job, program or organization shows the main
  screen of each of its projects (or up to four screens when it has one project), each linking to the project and
  captioned when it is a recreation; they slide on phones and sit two across from 48rem, like the recommendations.
  Certifications are grouped by issuer: an issuer with three or more gets a section across the page, the rest share a
  grid. Commits per year are horizontal bars in `chart-1` on a `surface-raised` track,
  with the number beside each bar, so the figure never depends on the bar. Lists of related pages are index rows in a
  bordered surface, each row a link with its label, name and one line of context; recommendations reuse the slider.
- Project screens: a project card opens with its main screen when the project has one, filling the top of the card (a
  recreated screen says so on its corner), and the featured project shows its screen beside the text from 80rem and
  under the summary before. Phone screens keep their shape instead of being cropped. The alt text of each main screen
  lives with the card copy, the same words as on the project's page (a content test compares them), so the home page
  does not load the project pages' text.
- Projects on the home page: the role view's featured project spans the section, then tabs by category (products,
  work, education) open the role's own category. Only the open tab is rendered, which keeps the prerendered page
  small; its cards are a slider on phones, two across from 48rem and three from 80rem. The projects index lists the
  three categories the same way, and its archive of repositories filters by GitHub organization with toggle buttons
  (`aria-pressed`); the prerendered page lists them all.
- Project screens (`CaseImages`): a wide first screenshot spans the page and the rest go two across, or full width when
  only one follows; phone screenshots (taller than wide) go three across at any width, centered within 48rem. An image
  that needs attribution, such as map data, carries a `credit` that renders as a linked caption, and a recreated
  screen of a private project carries `recreation`, captioned as fictional data.

## Rules

1. Use semantic tokens (`text-fg-muted`, `bg-surface`), never scale steps, in components.
2. Text never sits on `emerald-500`, `emerald-700` or `border`.
3. Every interactive element shows the `ring` focus outline and has a touch target of at least 24px.
4. New colors go through `tokens.css` and `CONTRAST_PAIRS` in the check script.
5. `cn()` (`src/lib/utils.ts`) joins class names and skips the falsy ones a condition leaves; it does not resolve
   conflicts. A component and the `class` its caller passes never set the same property, and each conditional branch
   carries its whole value (`font-normal` on one side, `font-semibold` on the other). Dropping `tailwind-merge` took
   8.6 KB off the startup JavaScript, and the local helper replaces `clsx`.
