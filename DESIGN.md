# Design System: Sebastián López Osorno, portfolio

This file describes the look of the site in the words a screen generator such as Google Stitch reads (it follows the
`stitch-design-taste` format). The values come from [`src/styles/tokens.css`](src/styles/tokens.css), which stays the
source of truth, and [`docs/design-system.md`](docs/design-system.md) keeps the contrast table and the rules for
components. When the two disagree, the code wins and this file gets fixed.

## 1. Visual Theme & Atmosphere

A dark engineering notebook. One near-black canvas, one teal accent, serif headings over a plain sans and monospace
for every tool name. It reads like a technical dossier written by its owner: indexed lists, captions, dates and
figures with a source.

- **Density 5, Daily App Balanced.** Long sections (experience, case studies, recommendations) carry a lot of text, so
  space goes into the rhythm between sections.
- **Variance 4, restrained asymmetry.** The hero is an offset split, the experience timeline splits each job in two,
  and list-like content becomes indexed rows. Nothing is rotated, overlapped or scattered.
- **Motion 5, Fluid CSS.** Parts rise into place as they enter the screen, figures count up once, the header draws the
  reading progress and pages fade into each other; a hover moves an arrow or a screen a few pixels and a button
  presses 1px. The browser draws all of it from CSS, nothing loops, and `prefers-reduced-motion` turns it off.

## 2. Color Palette & Roles

The site has one theme, dark. Every color is an OKLCH token; the hex values below are their sRGB conversions.

- **Notebook Black** (#0D0D0D, `bg`): Page background and `theme-color`. Never pure black.
- **Graphite Surface** (#121615, `surface`): Cards, panels, the raised band behind alternate sections.
- **Raised Graphite** (#1A1F1F, `surface-raised`): Inputs, the selected entry in the journey lists, the assistant's
  replies and the tracks of the language bars.
- **Hairline** (#233937, `border`): Card outlines and the dividers between index rows. Meant for decoration (1.6:1).
- **Control Edge** (#556F6C, `border-strong`): Borders that must be seen: inputs, outline buttons (3.6:1).
- **Paper White** (#F1F6F7, `fg`): Headings and body text (17.9:1).
- **Fog** (#B0C2C0, `fg-muted`): Secondary text, summaries, descriptions (10.5:1).
- **Ash** (#9FADAB, `fg-subtle`): Captions, dates, issuers, metadata (8.3:1, and at least 7:1 on every surface).
- **Signal Teal** (#35BFB1, `primary`): The single accent: links, primary buttons, focus, figures (8.6:1).
- **Bright Teal** (#48D3C5, `primary-hover`): Hover state of everything teal.
- **Mint** (#61D7B2, `accent`): Teal's lighter partner, used as the end of the teal gradients (section titles, the
  experience timeline, the language bars) and for small secondary highlights. It never fills a button.
- **Status Green** (#59D38C, `success`): Availability and the present: the "open to roles" pill, the badge of the
  current job and one of the three window dots above the ASCII art.
- **WhatsApp Green** (#25D366, `whatsapp`): The WhatsApp button, the only color from outside the palette.

The teal is 57% saturated in HSL. Chart colors (`viz-*`, `level-*`, `sdg-*`) live in their own validated block and
appear only inside the journey charts.

## 3. Typography Rules

- **Display:** DM Serif Text 400 for `h1` to `h3`. The family has no bold, so `font-synthesis: none` forbids faux bold;
  hierarchy comes from size and color. Section titles use a teal-to-mint gradient so close in hue that it reads as
  one color. This serif comes from the previous version of the site and is kept on purpose: the Stitch skill would
  pick a serif such as Fraunces or Instrument Serif, and switching would break the brand.
- **Body:** IBM Plex Sans 400 and 600, 1rem with 1.6 leading, measured to 42 to 56rem per paragraph.
- **Mono:** Source Code Pro 400 for tool and technology names, dates in captions, eyebrows and the ASCII art.
- **Scale:** `text-display` clamp(2.5rem, 1.6rem + 3.6vw, 4.5rem) for the name, the title of each project page and the
  404; `text-heading` clamp(1.875rem,
  1.4rem + 1.8vw, 2.75rem) for section titles; `text-title` 1.375rem for card titles.
- **Banned:** Inter, generic serifs (Times New Roman, Georgia, Garamond) as visible faces, gradient text on body copy,
  numbers or the name, all-caps outside small eyebrows.

## 4. Component Stylings

- **Buttons:** 48px tall in the hero and the contact form (`h-12`), 44px elsewhere (`h-11`), 0.5rem corners.
  Primary: Signal Teal fill with Notebook Black text. Secondary: transparent with a Control Edge outline that turns
  teal on hover. Pressing moves them down 1px. No glow, no gradient fill, at most one primary button per view.
- **Chips:** monospace and small, never below 13px. The hero's core stack and the tech lists inside cards have small
  square corners;
  skill tags are pills. Tags of the selected role view are tinted teal; the rest stay Ash on a Hairline outline.
- **Cards:** one object per card: a job, a project, a recommendation, a service, a language, the contact form.
  Graphite Surface, Hairline outline, 0.75rem corners. Jobs, services, the resume preview and the contact form sit on
  a soft `shadow-card`; the featured project gets the teal `shadow-glow`. A card opens with information, never with a
  decorative icon: a service names the role views it serves, a reason to hire starts with its title.
- **Index rows:** lists of many similar items (certifications, the repository archive) are rows separated by Hairline
  rules. Skill groups are open blocks on the same rules, two to three across. No box around each item.
- **Charts:** bars only, rounded ends, each with its number in text beside it; categories use the six chart tokens,
  never color alone to carry meaning.
- **Sliders:** repeated cards on phones (recommendations, services, reasons to hire) show one at a time with the
  next one peeking at the edge, and move by swipe or by the buttons under them, with a "4 / 16" counter. No dots, no
  autoplay, no visible scrollbar.
- **Figures:** a number in DM Serif Text and Signal Teal over a short label, laid out as an open strip. The number
  always comes from a source listed in `docs/content.md`.
- **Inputs:** label above, Raised Graphite fill, Control Edge border, teal ring on focus. Placeholders show what to
  write.
- **Loading and empty states:** the site is static and prerendered; images reserve their size, nothing spins.

## 5. Layout Principles

- One container, `clamp(72rem, 80vw, 96rem)` with a `clamp(1rem, 4vw, 2rem)` gutter: wide screens get wider grids
  instead of wider margins.
- Section rhythm `clamp(4rem, 3rem + 4vw, 7rem)`, alternating Notebook Black and a raised Graphite band.
- **Hero:** an offset split (text 1.4fr, portrait 1fr) with the hexagonal portrait on the right, level with the name.
  The text column reads availability, name, role, one-sentence headline, summary, then the two actions, which must sit
  inside the first 900px of a 1440px screen. The core stack (eight chips) comes after the actions; from 64rem the role
  views sit under the portrait, in the space the portrait column leaves empty, and on phones they follow the portrait.
  The headline speaks about the people the work serves and the summary carries the stack and the proof, rewritten for
  each role view.
- CSS Grid for every multi-column layout. Content collapses to one column below 48rem; only short figure strips keep
  two or three columns. Nothing scrolls sideways except the sliders, which move by swipe or buttons; the
  assistant's suggested questions wrap. The journey map and the capability heatmap switch to one stop or one year at a
  time
  below 64rem.
- Full-height blocks use `100dvh`, never `100vh`.

## 6. Motion & Interaction

- Durations of 120, 200 and 400ms on `ease-standard` and `ease-emphasized` curves; transitions list their properties.
- Animations use `transform`, `translate`, `scale`, `opacity` and colors; the exceptions are the active page dot of
  the recommendations, which widens, and the rows under "Show more", which open to their height. Nothing above the
  fold fades in, so the largest paint is never delayed.
- Scroll-driven animations (`animation-timeline: view()`) fill the experience timeline and slide its cards in, raise
  each section heading, each card, row and figure of the home sections and each section of the article pages into
  place, and grow the bars of commits per year. In a row each part settles a little after the one before it, a
  cascade tied to the scroll. A scroll timeline draws the reading progress along the header's lower edge. Browsers
  without them get the static layout.
- Figures count up from zero the first time they come into view, once, and end on the number as written.
- Following a link cross-fades between pages with the header held in place, and what a control opens (more rows, a
  tab, the phone menu) eases in instead of popping.
- Hover: the arrow of a link moves 3px the way it leads, the icon of an outward link lifts, and a project card
  brightens its outline and brings its screen 3% closer. Only for pointers that hover.
- The header marks the section being read with teal and an underline, never with color alone.
- `prefers-reduced-motion: reduce` turns every animation and transition off.

## 7. Anti-Patterns (Banned)

- No emoji in the interface.
- No Inter, no generic serif, no faux bold.
- No pure black (#000000) and no neon glow; the soft teal glow only marks focus and hover.
- No accent outside the teal family and no purple or blue gradients.
- No three equal cards in a row for list-like content; use index rows.
- No boxed stat tiles in a row of three; figures sit in an open strip.
- No filler such as "scroll to explore", bouncing arrows or custom cursors.
- No invented figures and no round placeholders like "99.9%": every number has a source and a date.
- No stock phrases ("elevate", "seamless", "next-gen", "passionate").
- No client names of TIVENOS or ADCOM anywhere (enforced by `src/content/content.test.ts`).
