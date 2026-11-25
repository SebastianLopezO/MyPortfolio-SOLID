# Memoria de la migración React → SolidJS (local, NO se comitea)

Excluido vía `.git/info/exclude`. Sesión privada: no guardar nada en la memoria global de Claude.

## Reglas del usuario

- Commits en inglés, título que empieza con verbo, sin `Co-Authored-By`; solo la autoría de git configurada
  (Sebastián López O). No hacer push.
- Migrar de a poco, commits pequeños y coherentes, hasta culminar.
- Objetivo: rendimiento, peso y seguridad (mejora continua).

- RESTRICCIÓN FUERTE (usuario): migración transparente; NO perder ni modificar funcionalidad ni contenido.
  Mejoras pequeñas permitidas solo si funcional/visualmente no son drásticas (el portfolio debe seguir reconocible).
  → Revertido el commit que describía el portfolio como SolidJS (textos/decisión nueva). Proponer al final, como
  opción, el ajuste mínimo factual ("Built with React" → SolidJS) sin aplicarlo.
- Despliegue: no preocuparse; dejar los .yml tal cual.

## Fase 2 (pedido 2): Docker + Astro

- Comparar en Docker React vs Solid+Vite (tiempos, peso, rendimiento). Luego migrar Vite→Astro (islas, el usuario
  escribió "astra") y comparar MyPortfolio(React) vs Astro, citando Solid+Vite solo como dato; conclusiones en chat.
- Commit de referencia Solid+Vite: 807ba1c (antes de Astro). Imagen local `myportfolio-cmp:solid-vite`.
- Docker Desktop: DNS intermitente → `docker build`/`pull` fuera del sandbox con reintentos (scratchpad/cmp/*.sh).
  Etapa brotli cacheada compartida entre imágenes. Bench: scratchpad/cmp/bench-all.sh <tag> → results-<tag>.json.
- Build en Docker (paso pnpm build): React 34,0 s; Solid+Vite 61,3 s (cliente Babel 6,5 s vs SWC 1,2 s).
- Astro: usar 7.3.8 (7.4 exige Node ≥22.22; host 22.18). Probe en scratchpad/astro-probe: con pnpm 10.33 global falló
  `#shiki-engine` (Node resolve); con npm funcionó. Verificar con pnpm 10.32.1 del repo.
- Astro emite inline: style astro-island, script idle, script astro-island runtime, HydrationScript de Solid, script
  visible → hashes CSP. Islas Solid: server renderToStringAsync+Suspense; estáticos con NoHydration (sin data-hk).
- Diseño: página catch-all `[...path].astro` (getStaticPaths de prerenderRoutes); islas `PageIsland` genéricas
  (part, lang, role, path) con lazy por parte + registro síncrono en server; estáticos (Highlights, Footer, SkipLink,
  WhatsApp, 404) sin directiva; secciones `client:visible` con rootMargin; header/hero/assistant/body/boot
  `client:idle`.

### Resultados Docker React vs Solid+Vite (scratchpad/cmp, report.mjs react solid-vite)

- Imagen 44,1 vs 44,7 MB; sitio 56,8 vs 59,6 MB; listo /health 3,1 s vs 1,2 s; RAM ~7,5→9,5 MiB ambos.
- HTML br /en 44,2→49,3 KB; JS+CSS+fuentes estáticos /en 86,2 KB·25 → 34,2 KB·19 (br).
- Throughput /en 1434 vs 1372 req/s (0,5 CPU nginx, igual). TTFB ~1 ms ambos.
- Lighthouse mediana 5 (contenedor): /en 91→92, /es/backend 88→92, smartpot 88→95; TBT 391→358, 449→342, 465→247;
  boot-up JS 719→509, 810→489, 355→230 ms; bytes 428→375, 431→377, 380→318 KB. a11y/bp/seo 100.
- Navegador (CPU 4x real, Playwright): script JS 3-6x menor en Solid; TBT/task variables entre rondas (ruido),
  en reposo /en TBT 513→314, task 2326→2025; layout ~740 ms ambos (dominante, del DOM/CSS).
- Build en Docker: React 34 s vs Solid+Vite 61 s.

## Origen

- `C:\Users\Sebastian-EDU\Documents\GitHub\MyPortfolio` (React 19 + Vite 8 + TS + Tailwind 4, pnpm 10, Node 22.18).
- 182 páginas prerenderizadas (es/en), hidratación tras `load` + idle, secciones en chunks perezosos.
- CSP con hashes de scripts inline (nginx/security-headers.conf) — cualquier script inline nuevo exige hash.
- Baseline build original: entry `index-*.js` 208 KB raw / 64,8 KB gzip; presupuesto test: startup JS ≤ 110 KB gzip,
  chunk perezoso ≤ 32 KB gzip, CSS ≤ 12,5 KB gzip, HTML ≤ 96 KB gzip, primer pintado ≤ 24 KB gzip antes de la 1ª
  sección.

## Decisiones

- Iconos lucide: ~30 iconos inline generados localmente (sin dependencia runtime).
- `_$HY` de Solid se inicializa en el entry del cliente (no `HydrationScript` inline) para no tocar la CSP.

## Técnica de port

- Copiado el original a `src/` sin comitear; codemod en scratchpad (`codemod.py`: className→class, atributos SVG
  kebab, quita `key`, iconos lucide → `@/components/ui/icons`, `aria-hidden` desnudo → `"true"`). Luego lógica a mano.
- Solo se hace `git add` de archivos ya portados. Archivos aún React = sin trackear.
- Hidratación: `lazy` de Solid mantiene el HTML del server y difiere los efectos hasta que cargan todos los chunks.
  `useHydrated()` = señal por componente (false en server/hidratando, true en render cliente).
- `useSectionCopy` es síncrono; `section-loaders.ts` declara qué copias necesita cada sección (COPIES).
- Carousel: props renombradas `slideClass`, `trackClass`, `controlsClass`, item `class`.
- `expectSections` se llama en `createRenderEffect` (antes que los onMount) para no marcar hidratado antes de tiempo.

## Progreso

- [x] Tooling, assets, contenido/lib/tipos, estilos, router/providers/shells, layout/UI (commits hechos)
- [x] Secciones home, journey, case-study, projects, page parts, ProjectPages, DetailPages, assistant
- [x] entry-server + scripts + nginx + tests dist (379 OK). Build OK: 182 páginas.
- [x] Verificado en navegador (preview `.claude/launch.json`, excluido): hidrata in situ, rol, pestañas, asistente,
  navegación cliente a proyecto, detalle con ?from&locked. Sin errores de consola.
- Medidas 1er build: entry 63,3→9,6 KB gz; startup JS 91,3→45,3 KB gz; HTML /en 59,7→67,2 KB gz (data-hk).
- [x] tests unitarios (2 proyectos vitest: jsdom + node *.server.test), e2e (386 OK), docs/CI/Docker, README.
- [x] Paridad: script scratchpad `compare-dist.mjs` → 0 diferencias en 183 páginas vs build React (normalizando data-hk,
  ids generados, hashes, orden de clases; book-open: dist de React local es anterior a lucide 1.58.0 del HEAD).
  page-dates.json: 182 hashes idénticos (pageText escapa como React y respeta comillas en atributos).
- [x] Fix dev: hidratar solo si `root.firstElementChild` (el comentario `<!--app-html-->` rompía `pnpm dev`).
- Medidas finales: entry 63,3→9,6 KB gz; arranque 91,3→39,8; HTML /en 59,7→67,4; Lighthouse mediana 5 runs
  /en 96→97, /es/backend 94→99 (TBT 292→86 ms). node_modules 523→56 MB. 28 commits locales, sin push.
- Pendiente solo si el usuario lo pide: texto "Built with React" (footer, tarjeta/página del proyecto portfolio,
  respuesta del asistente) — se dejó tal cual por la restricción de contenido.
- [ ] Contenido: describir el portfolio como SolidJS (ui.footer.builtWith, proyecto portfolio, decisiones)
- [ ] Ajustar tests de dist: marcador `<!--$-->` de React y regex `<div id="root"><a href="#main"` (Solid añade data-hk)

### Astro (estado 2026-10-21)

- El usuario hizo 2 commits propios durante la pausa: 3960179 "Migrate portfolio to Astro islands" (estado intermedio,
  con clientEntrypoint como URL → el build lo descartaba) y 420ec7b "Update Router.tsx" (formato). Además pusheó hasta
  807ba1c (origin/main). Yo NO pusheo nunca.
- Bugs resueltos encima (commits a905f93..752ba91, 10 commits):
    1. Carrera de hidratación: Solid usa UN registry global por página y cada hydrate() lo reinicia; con `lazy` dentro
       de
       la isla, una isla que esperaba un chunk perdía sus nodos (error "t is not a function"/Hydration Mismatch en
       /en/projects). Fix: renderer cliente propio `src/islands/client.ts` que llama `PageIsland.preload(props)` (carga
       parte+copy y registra en `islands/registry.ts`) antes de `hydrate` → hidratación síncrona. astro.config envuelve
       solid() y cambia clientEntrypoint a string (path absoluto con /), Astro build ignora URL.
    2. Solid marca `sharedConfig.done=_$HY.done=true` en el primer evento delegado → islas posteriores hacen render (DOM
       nuevo, se pierde tamaño recordado de content-visibility y el ancla). Fix: reset done=false antes de cada hydrate.
       (Replay de eventos de Solid NO funciona: composedPath() vacío tras dispatch; no intentar restaurar events.)
    3. Links de secciones no hidratadas sin ?locked → `src/lib/lock.ts` carryLock() en Boot (capture click).
- e2e: secciones client:visible → tests usan hydrateSection(page,id); `#home + section` → `main section` nth(1).
- Verificado: lint 0, astro check 0, 200 unit, 379 dist, 386 e2e (6 skip); paridad DOM 0 dif en 183 páginas con
  BUILD_DATE=2026-10-19; sitemap/robots/llms/index/page-dates idénticos.
- Medidas gzip9 Astro: JS islas idle /en 36,7 KB (sin visibles; con about 46,0), todos los chunks 327,0 KB (94
  archivos), primer pintado 19,6, /en 70,7, smartpot 27,0 (JS antes de hidratar smartpot 115,4), node_modules 320 MB.
- Siguiente: imagen Docker myportfolio-cmp:astro, bench (bench-all.sh / bench-rerun.sh), report.mjs react solid-vite
  astro,
  conclusiones en chat; luego añadir Lighthouse/Docker al README en commit aparte.

### Cierre (2026-10-21)

- Usuario: commits propios ab80e21 "Update header.tsx" y 37694bc "reformat code" (00:27), ya en origin. Mis commits
  encima: 6f3a828 (client:settled), 072c3cd (docs), e85f281 (README Docker). ahead 3, sin push.
- client:settled (src/islands/settled.ts, integración en astro.config.mjs): espera load + primer pintado + idle (como el
  loader de React/Solid-Vite); con rootMargin además espera a estar cerca. Motivo: client:idle pedía ~25 módulos antes
  del FCP → Lighthouse (Lantern) FCP 2,0 s. CSP: 5 hashes (lock, settled, runtime isla, HydrationScript, redirect raíz).
- Benchmark final (scratchpad/cmp, report.mjs react solid-vite astro; navegador = media de las 2 centrales de 4 rondas):
  LH perf /en·/es/backend·smartpot: React 92·92·93, Solid+Vite 88·93·95, Astro 99·98·96. TBT LH /en 337/466/133.
  FCP navegador /en 832/632/474. JS /en sin scroll 196,1/151,4/42,1 KB br; con scroll 196,1/151,4/152,6. Script /en
  1002/174/40 ms. Heap 6,1/6,24/2,59 MB. Build en imagen 16,5–18,0 / 19,9–30,2 / 21,3–35,4 s. Imagen 44,1/44,7/46,1 MB.
  HTML /en br 44,2/49,3/51,7 KB. Throughput /en 1434/1372/1921 req/s. Proyecto/detalle: Astro ≈ Solid+Vite.
- report.mjs: regex de rondas sin backslashes (`[0-9]+[.]json`), en Git Bash los \ se pierden.
