# Maintenance

The site is only as good as its facts, so it needs a short routine: a checklist before every release and a monthly
pass over the figures, credentials and text.

## Before each release

1. `pnpm lint && pnpm typecheck && pnpm test && pnpm check:contrast && pnpm build && pnpm test:dist && pnpm test:e2e`
2. `pnpm check:links` loads the content modules, adds the repository links the archive builds, and requests every
   external URL, two at a time per site. A 404, a 5xx or a network error fails the run. Sites that block scripts
   (LinkedIn answers 999, Stack Overflow and CodePen answer 403) are listed as unverifiable: open them in a browser.
3. After the deploy, open the home page in both languages, one role view with `?locked=true`, the projects index and
   one case study, and check that the **Production Checks** workflow (Lighthouse) stays in its usual range.

## Every month

1. **Figures.** The GitHub totals and the WakaTime time come from `SebastianLopezO/SebastianLopezO`'s `stats.json`
   and refresh on every CI build; run `pnpm metrics` to commit a newer snapshot. Count the commits by area again
   (`src/content/shared/github.ts`), measure the case study figures the way `docs/content.md` describes (GitHub API,
   `grep` on the tests, the observability config), update `src/content/shared/case-studies.ts` and change the dates
   in `docs/content.md`.
2. **Credentials and recommendations.** Compare a fresh LinkedIn export (`Certifications.csv`,
   `Recommendations_Received.csv`) with `certifications.ts` and `testimonials.ts`. A new certificate needs the page
   that verifies it; a new recommendation is quoted word for word, with its English translation in
   `en/testimonials.ts`.
3. **Profiles.** Check that LinkedIn, HackerRank, freeCodeCamp and Replit show the same headline, current jobs and
   dates as the site, and that the profiles linked from it are public.
4. **Dependencies.** Review Dependabot alerts and pull requests, and `pnpm outdated`.
5. **Review.** Run the recruiter and hiring-manager reviews over the rendered English text. Every sentence that
   changes goes through the humanizer and the Deep fact-check described in `docs/content.md`.

The years of experience need nothing: they are computed from the first job at build time.

## Screenshots

Take product screens only from the local demo stacks with their seed accounts (`docs/content.md` lists how each set
was taken). Put the sources in `assets-src/projects/` and run `pnpm images`. The AVIF encoder is not deterministic, so
the run also rewrites images that did not change; restore them with
`git checkout -- public/cv/previews src/assets/images` before committing.

## Budgets

`pnpm test:dist` enforces them, gzipped: 110 KiB of JavaScript before hydration, 32 KiB per lazy chunk, 12 KiB per
stylesheet, 24 KiB for everything the first paint needs (the head with its inlined styles, the hero and its figures,
which then arrive within two TCP round trips) and 96 KiB per prerendered page (three round trips). Only the hero and the
figures under it hydrate with the startup bundle:
every other home section loads its code and its copy in chunks of its own (`components/sections/SectionSlot.tsx`,
`content/sections.ts`), as the assistant and the project pages do. When a chunk crosses its budget, split it the
same way.

A section reads its copy synchronously, so its lazy chunk resolves only once that copy has arrived:
`components/sections/section-loaders.ts` lists the copy each section reads, its own and the ones it borrows. A section
that starts reading another section's copy must add it there, or it throws when it renders after navigation. Solid keeps
a section's prerendered HTML in place until its chunk arrives and then hydrates it without re-creating the DOM.
