# Profile assistant

A small question-answering panel that runs entirely in the browser. It does not call any AI or third-party
service: every answer is assembled from the same typed content modules that render the page, so it can never
contradict the portfolio.

## Loading

| Piece                                                                             | Where                                                             | Size (gzip) |
|-----------------------------------------------------------------------------------|-------------------------------------------------------------------|-------------|
| `AssistantLauncher`                                                               | an island that hydrates when the page is idle                     | ~1.3 KB     |
| `AssistantPanel` + engine (`lib/assistant/*`)                                     | lazy chunk                                                        | ~12 KB      |
| `content/{en,es}/assistant.ts` copy, with the suggestions, follow-ups and catalog | lazy chunk per language                                           | ~5 KB       |
| Section copy (`content/{en,es}/*.ts`)                                             | the chunks the home sections already load (`content/sections.ts`) | shared      |
| `content/case-studies/{en,es}.ts` copy                                            | lazy chunk per language, shared with the project pages            | ~8.5 KB     |
| `content/detail-pages/{en,es}.ts` copy                                            | lazy chunk per language, shared with the detail pages             | ~9 KB       |

The launcher prefetches the lazy chunks on hover or focus, so the panel usually opens instantly. A click requests
whatever is still missing in one batch and opens the panel once its code and every copy it answers from have arrived;
if a download fails, the next click tries again.
The panel is a native `<dialog>` opened with `showModal()`: it traps focus, closes with Esc or a backdrop click,
makes the page inert and returns focus to the launcher.

## Pipeline

```
question ─► normalize ─► detect intents ─► compose answer
                 │                │
                 └─► terms ──► BM25 search over facts (details, examples, fallback)
```

1. **`normalize.ts`** lowercases, strips accents and joins compound terms (`C#`, `CI/CD`, `Node.js`, `Power BI`,
   `hoja de vida`, `full stack`). Whole phrases that carry an intent become one token first, in both languages ("who
   is", "por qué", "cómo trabaja", "this site", "MUV-U"), so the stopwords cannot erase them. `tokenize` keeps every
   word for intent rules; `terms` drops stopwords for retrieval.
   Words are stemmed lightly (plurals) and mapped through **`synonyms.ts`**, so Spanish and English land on the same
   canonical token (`certificaciones` and `certifications` → `certification`).
2. **`intents.ts`** matches token patterns in priority order and returns at most two of about thirty intents: who he
   is, years and current jobs, each job by name, each program by name, education and plans, security, languages,
   projects (and ten of them by name), certifications, recommendations, the resume, GitHub figures and organizations,
   coding time, AI, clients, industries, services, reasons to hire, how he works, his trajectory, leadership, this
   site and the role fit. Salary questions always win and are redirected to a direct conversation. Role keywords from
   `content/roles.ts` detect the role a question is about, with ties going to the role currently on screen; the role
   fit answer only comes when the question asks for nothing more specific.
3. **`knowledge.ts`** turns the content into 331 facts: experience summaries, bullets and titles, projects, skills,
   certifications, programs with their areas and courses, organizations, about, services and testimonials, each
   tagged with roles, plus the summary and approach of every case study. 276 of them link to a page of their own (a
   project, job, program, certification or organization) instead of a section of the profile.
4. **`retrieval.ts`** ranks facts with BM25 (`k1 = 1.2`, `b = 0.75`) and boosts facts tagged with the active or
   detected role by 25 %. Hits below half of the best score are discarded.
5. **`answer.ts`** fills the localized templates from `content/{en,es}/assistant.ts` with live facts (years of
   experience, current jobs, counts, the GitHub and WakaTime snapshot, the organizations' commits, the page count),
   quotes a real experience bullet for role questions and the recommendations behind each reason to hire, matches
   certifications by the title first and by what they covered second, and adds links to the pages that tell more,
   the page sections, the role view, the ATS PDF, WhatsApp or email. Text Sebastián wrote in the first person (a
   project's summary, how he works) is quoted as his own words.
6. Every answer brings **follow-up questions** about its topic. The panel shows four of them, without the questions
   already asked, and a **catalog** behind "More questions" lists every question the assistant was built for, by
   topic. A unit test asks all of them, in both languages, and fails if any falls back to "I don't have that".

When the page is opened with `?locked=true`, answers never link to another role view, and the links to project and
detail pages carry the role and the lock (`/en/projects/gopoli?from=backend&locked=true`) so the way back returns to
the same view. On a project or detail page, links to a section open the profile at that section.

## Extending

- **New question type:** add the id to `IntentId` (`types/assistant.ts`), a rule in `intents.ts`, a template in both
  copy files, its follow-ups, a catalog entry and a fixture in `assistant.test.ts`. The content test fails if the two
  copies drift apart, and the catalog test fails if the new question is not understood.
- **New vocabulary:** add variants to a group in `synonyms.ts`; both questions and facts use it.
- **New facts:** add them to the content modules. `buildKnowledgeBase` indexes them automatically.

## Possible next step

If free-form answers are ever needed, the same `buildKnowledgeBase` output can feed a serverless endpoint as
retrieval context for an LLM. The current panel would keep its UI and only swap `createAssistant` for a fetch call,
keeping the local engine as the offline fallback.
