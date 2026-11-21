import {For, Show} from "solid-js";
import {ArrowRight, ExternalLink, GraduationCap, Languages} from "@/components/ui/icons";
import {forProfile} from "@/content/roles";
import {EDUCATION_SLUG} from "@/content/shared/detail-links";
import {education} from "@/content/shared/education";
import {useSectionCopy} from "@/content/sections";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {GithubIcon} from "@/components/layout/BrandIcons";
import {Section} from "@/components/layout/Section";
import {buildDetailPath} from "@/lib/paths";
import {cn} from "@/lib/utils";
import {Link} from "@/routes/Router";

const RAW_ASCII_ART = String.raw`
                               \\\\\\\
                              \\\\\\\\\\\\
                            \\\\\\\\\\\\\\\
    -----------,-|           |C>   // )\\\\|
             ,','|          /    || ,'/////|
  ---------,','  |         (,    ||   /////
           ||    |          \\  ||||//''''|
           ||    |           |||||||     _|
           ||    |______      ${"`````"}\____/ \
           ||    |     ,|         _/_____/ \
           ||  ,'    ,' |        /          |
           ||,'    ,'   |       |         \  |
  _________|/    ,'     |      /           | |
  _____________,'      ,',_____|      |    | |
               |     ,','      |      |    | |
               |   ,','    ____|_____/    /  |
               | ,','  __/ |             /   |
  _____________|','   ///_/-------------/   |
                |===========,'`;

const asciiLines = RAW_ASCII_ART.replace(/^\n/, "").split("\n");
const asciiIndent = Math.min(...asciiLines.filter((line) => line.trim()).map((line) => line.length - line.trimStart().length));
const ASCII_ART = asciiLines.map((line) => line.slice(asciiIndent).trimEnd()).join("\n");
// Its widest line sizes the font to the frame; its number of lines lets it print one line at a time (globals.css).
const ASCII_STYLE = {
    "--ascii-cols": String(Math.max(...ASCII_ART.split("\n").map((line) => line.length))),
    "--ascii-rows": String(ASCII_ART.split("\n").length),
};

const LINK = "inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover";

function AboutTerminal(props: { class?: string }) {
    const about = useSectionCopy("about");

    return (
        <figure aria-label={about.terminal.label}
                data-testid="about-terminal"
                class={cn("@container flex flex-col overflow-clip rounded-lg border border-border bg-surface", props.class)}>
            <div aria-hidden="true" class="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
                <span class="size-2.5 rounded-full bg-danger/70"/>
                <span class="size-2.5 rounded-full bg-warning/70"/>
                <span class="size-2.5 rounded-full bg-success/70"/>
                <span class="ml-2 truncate font-mono text-xs text-fg-subtle">~/sebastian</span>
            </div>
            <div aria-hidden="true" translate="no"
                 class="ascii-frame flex flex-1 flex-col justify-center px-4 py-5 sm:px-6">
                <p class="font-mono text-xs text-fg-subtle">$ cat engineer.txt</p>
                <pre data-testid="about-ascii-art" class="ascii-art my-auto pt-3 font-mono text-primary/80"
                     style={ASCII_STYLE}>{ASCII_ART}</pre>
            </div>
        </figure>
    );
}

const HOME_EDUCATION_CHIPS = 5;

function EducationList(props: { compact?: boolean }) {
    const about = useSectionCopy("about");
    const {lang} = useLanguage();
    const {locked} = useRole();

    return (
        <>
            <h3 data-testid="about-education-heading" class="flex items-center gap-2 text-title text-fg">
                <GraduationCap class="size-5 text-primary"/>
                {about.educationTitle}
            </h3>
            {/* A timeline on phones; from 48rem an index two across, with the degree on a row of its own. */}
            <ol data-testid="about-education-list" class="enter-each mt-5 grid gap-x-10 border-l border-border pl-5 md:grid-cols-2 md:border-l-0 md:pl-0">
                <For each={education}>{(item, index) => {
                    const copy = about.education[item.id];
                    const chips = () => (props.compact ? copy.skills.slice(0, HOME_EDUCATION_CHIPS) : copy.skills);
                    const overflow = () => (props.compact ? Math.max(0, copy.skills.length - HOME_EDUCATION_CHIPS) : 0);
                    return (
                        <li
                            data-testid={`education-item-${item.id}`}
                            class={cn("relative py-4 md:border-t md:border-border md:py-5", index() === 0 && "md:col-span-2")}>
                            <span aria-hidden="true"
                                  class="absolute top-6 -left-[1.6rem] size-2.5 rounded-full bg-primary md:hidden"/>
                            <p class="font-mono text-xs text-fg-subtle">
                                {item.start === item.end ? item.start : `${item.start} – ${item.end}`}
                            </p>
                            <p class="mt-1 font-semibold text-fg">{copy.degree}</p>
                            <p class="text-sm text-fg-muted">{item.school}</p>
                            <Show when={copy.note}>
                                <p class="mt-2 w-fit rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">{copy.note}</p>
                            </Show>
                            <p class="mt-1 flex flex-wrap gap-x-5">
                                <Link to={buildDetailPath(lang, "education", {
                                    slug: EDUCATION_SLUG[item.id],
                                    locked: locked()
                                })} data-testid={`education-link-${item.id}`} class={LINK}>
                                    {about.educationPage}
                                    <ArrowRight class="size-4"/>
                                </Link>
                                <Show when={item.url}>
                                    {(url) => (
                                        <a href={url()} target="_blank" rel="noopener noreferrer" data-testid={`education-coursework-${item.id}`} class={LINK}>
                                            {about.courseworkLink}
                                            <ExternalLink class="size-4"/>
                                        </a>
                                    )}
                                </Show>
                                <Show when={item.organization}>
                                    {(organization) => (
                                        <a href={organization().url} target="_blank" rel="noopener noreferrer"
                                           data-testid={`education-org-${item.id}`}
                                           class={LINK}>
                                            <GithubIcon class="size-4"/>
                                            {about.organizationLink} · {organization().repositories} {about.repositories}
                                        </a>
                                    )}
                                </Show>
                            </p>
                            <ul class="mt-2.5 flex flex-wrap gap-1.5">
                                <For each={chips()}>
                                    {(skill) => (
                                        <li
                                            class="rounded border border-border px-2 py-0.5 text-xs text-fg-subtle">
                                            {skill}
                                        </li>
                                    )}
                                </For>
                                <Show when={overflow() > 0}>
                                    <li class="rounded border border-border bg-surface px-2 py-0.5 font-mono text-xs text-fg-muted">
                                        +{overflow()}
                                    </li>
                                </Show>
                            </ul>
                        </li>
                    );
                }}</For>
            </ol>
            <Link
                to={buildDetailPath(lang, "education", {locked: locked()})}
                data-testid="about-education-index"
                class="mt-5 inline-flex min-h-10 w-fit items-center gap-2 rounded-full border border-border-strong px-4 text-sm font-semibold text-fg hover:border-primary hover:text-primary"
            >
                {about.educationIndex}
                <ArrowRight class="size-4"/>
            </Link>
        </>
    );
}

export function AboutSection() {
    const about = useSectionCopy("about");
    const {lang, content: {ui}} = useLanguage();
    const {role, locked} = useRole();
    const leadStory = () => forProfile(about.story, role())[0];

    return (
        <Section
            id="about"
            title={about.title}
            subtitle={forProfile(about.subtitle, role())}
        >
            {/* From 64rem the summary + languages and the terminal stretch to the same height side by side. */}
            <div class="grid gap-x-12 gap-y-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.85fr)] lg:items-stretch xl:gap-x-16">
                <div class="flex flex-col justify-between gap-7 text-fg-muted">
                    <div class="space-y-4">
                        <blockquote data-testid="about-quote" class="border-l-2 border-primary pl-4 font-display text-xl text-fg md:text-2xl">
                            “{about.quote}”
                        </blockquote>
                        <p data-testid="about-intro" class="max-w-[68ch]">{about.intro}</p>
                        <p data-testid="about-lead-story" class="max-w-[68ch]">{leadStory()}</p>
                        <Link
                            to={buildDetailPath(lang, "about", {locked: locked()})}
                            data-testid="about-read-story"
                            class="inline-flex min-h-10 w-fit items-center gap-2 rounded-full border border-border-strong px-4 text-sm font-semibold text-fg transition-colors hover:border-primary hover:text-primary"
                        >
                            {ui.actions.readStory}
                            <ArrowRight class="size-4"/>
                        </Link>
                    </div>
                    <div>
                        <h3 class="flex items-center gap-2 text-title text-fg">
                            <Languages class="size-5 text-primary"/>
                            {about.languagesTitle}
                        </h3>
                        <dl data-testid="about-languages" class="mt-3 grid grid-cols-3 gap-2">
                            <For each={about.languages}>
                                {(language) => (
                                    <div class="rounded-lg border border-border bg-surface p-3">
                                        <dt class="text-sm font-semibold text-fg sm:text-base">{language.name}</dt>
                                        <dd class="mt-0.5 text-xs leading-snug text-fg-muted sm:text-sm">{language.level}</dd>
                                    </div>
                                )}
                            </For>
                        </dl>
                    </div>
                </div>

                <div class="enter-each flex flex-col">
                    <AboutTerminal class="lg:h-full"/>
                </div>
            </div>

            <div class="mt-12 border-t border-border pt-10 md:mt-16 md:pt-12">
                <EducationList compact/>
            </div>
        </Section>
    );
}

/** The full story, AI engineering trajectory, terminal and education on the dedicated /{lang}/about page. */
export function AboutContent() {
    const about = useSectionCopy("about");
    const {role} = useRole();
    const story = () => forProfile(about.story, role());
    const closing = () => forProfile(about.closing, role());

    return (
        <div data-testid="about-page-content" class="space-y-14">
            <div class="grid gap-x-12 gap-y-10 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,0.85fr)] lg:items-stretch xl:gap-x-16">
                <div class="space-y-5 text-lg text-fg-muted">
                    <blockquote data-testid="about-quote" class="border-l-2 border-primary pl-4 font-display text-2xl text-fg">
                        “{about.quote}”
                    </blockquote>
                    <p data-testid="about-intro" class="max-w-[68ch] text-fg">{about.intro}</p>
                    <For each={story()}>
                        {(paragraph) => <p class="max-w-[68ch]">{paragraph}</p>}
                    </For>
                    <p data-testid="about-versatility" class="max-w-[68ch]">{about.versatility}</p>
                </div>

                <div class="flex flex-col justify-between gap-8">
                    <AboutTerminal class="lg:flex-1"/>
                    <div>
                        <h2 class="flex items-center gap-2 text-title text-fg">
                            <Languages class="size-5 text-primary"/>
                            {about.languagesTitle}
                        </h2>
                        <dl data-testid="about-languages" class="mt-3 grid gap-3 sm:grid-cols-3">
                            <For each={about.languages}>
                                {(language) => (
                                    <div class="rounded-lg border border-border bg-surface p-4">
                                        <dt class="font-semibold text-fg">{language.name}</dt>
                                        <dd class="text-sm text-fg-muted">{language.level}</dd>
                                    </div>
                                )}
                            </For>
                        </dl>
                    </div>
                </div>
            </div>

            <section data-testid="about-ai-section" class="section-enter rounded-2xl border border-border bg-surface p-6 sm:p-8">
                <div class="max-w-4xl space-y-4 text-fg-muted">
                    <For each={about.ai}>
                        {(paragraph) => <p class="max-w-[68ch]">{paragraph}</p>}
                    </For>
                </div>
            </section>

            <section data-testid="about-vision-section" class="section-enter grid gap-6 md:grid-cols-2">
                <div class="rounded-2xl border border-border bg-surface p-6">
                    <p class="max-w-[68ch] text-fg-muted">{about.ambition}</p>
                </div>
                <div class="rounded-2xl border border-border bg-surface p-6">
                    <p class="max-w-[68ch] text-fg">{closing()}</p>
                </div>
            </section>

            <section data-testid="about-education-section" class="section-enter">
                <EducationList/>
            </section>
        </div>
    );
}
