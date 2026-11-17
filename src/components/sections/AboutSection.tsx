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
const ASCII_STYLE = {"--ascii-cols": String(Math.max(...ASCII_ART.split("\n").map((line) => line.length)))};

const LINK = "inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover";

export function AboutSection() {
    const about = useSectionCopy("about");
    const {lang} = useLanguage();
    const {role, locked} = useRole();
    const paragraphs = () => {
        const [mindset, journey] = forProfile(about.story, role());
        return [about.intro, mindset, journey, about.versatility, ...about.ai, about.ambition, forProfile(about.closing, role())];
    };

    return (
        <Section id="about" title={about.title} subtitle={forProfile(about.subtitle, role())}>
            {/* From 64rem the story sits beside the terminal and the languages; below that everything stacks. */}
            <div class="grid gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                <div class="space-y-5 text-fg-muted">
                    <blockquote class="border-l-2 border-primary pl-4 font-display text-2xl text-fg">
                        “{about.quote}”
                    </blockquote>
                    <For each={paragraphs()}>{(paragraph) => <p class="max-w-[68ch]">{paragraph}</p>}</For>
                </div>

                <div class="enter-each space-y-12">
                    {/* The portrait and the journey log sit side by side once the terminal is 42rem wide. */}
                    <figure aria-label={about.terminal.label}
                            class="@container overflow-hidden rounded-lg border border-border bg-surface">
                        <div aria-hidden="true" class="flex items-center gap-1.5 border-b border-border px-4 py-2.5">
                            <span class="size-2.5 rounded-full bg-danger/70"/>
                            <span class="size-2.5 rounded-full bg-warning/70"/>
                            <span class="size-2.5 rounded-full bg-success/70"/>
                            <span class="ml-2 truncate font-mono text-xs text-fg-subtle">~/sebastian</span>
                        </div>
                        <div class="grid @2xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
                            <div aria-hidden="true" translate="no" class="ascii-frame px-4 py-5 sm:px-6">
                                <p class="font-mono text-xs text-fg-subtle">$ cat engineer.txt</p>
                                <pre class="ascii-art mt-4 font-mono text-primary/80"
                                     style={ASCII_STYLE}>{ASCII_ART}</pre>
                            </div>
                            <div class="border-t border-border px-4 py-5 sm:px-6 @2xl:border-t-0 @2xl:border-l">
                                <p aria-hidden="true"
                                   class="font-mono text-xs text-fg-subtle">$ {about.terminal.logCommand}</p>
                                <ol class="mt-4 space-y-2 font-mono text-[0.8125rem] leading-snug">
                                    <For each={about.terminal.entries}>
                                        {(entry) => {
                                            // A role view brightens its own steps and dims the rest; the general view shows all alike.
                                            const tone = () => {
                                                const current = role();
                                                return current === null ? "muted" : entry.roles.includes(current) ? "match" : "other";
                                            };
                                            return (
                                                <li class={cn("grid grid-cols-[3rem_1fr] gap-2", {
                                                    match: "text-fg",
                                                    muted: "text-fg-muted",
                                                    other: "text-fg-subtle"
                                                }[tone()])}>
                                                    <span
                                                        class={tone() === "other" ? "text-fg-subtle" : "text-primary"}>{entry.year}</span>
                                                    <span>{entry.text}</span>
                                                </li>
                                            );
                                        }}
                                    </For>
                                </ol>
                            </div>
                        </div>
                    </figure>

                    <div>
                        <h3 class="flex items-center gap-2 text-title text-fg">
                            <Languages class="size-5 text-primary"/>
                            {about.languagesTitle}
                        </h3>
                        <dl class="mt-4 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
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

            <div class="mt-16">
                <h3 class="flex items-center gap-2 text-title text-fg">
                    <GraduationCap class="size-5 text-primary"/>
                    {about.educationTitle}
                </h3>
                {/* A timeline on phones; from 48rem an index two across, with the degree on a row of its own. */}
                <ol class="enter-each mt-6 grid gap-x-12 border-l border-border pl-5 md:grid-cols-2 md:border-l-0 md:pl-0">
                    <For each={education}>{(item, index) => {
                        const copy = about.education[item.id];
                        return (
                            <li
                                class={cn("relative py-5 md:border-t md:border-border md:py-6", index() === 0 && "md:col-span-2")}>
                                <span aria-hidden="true"
                                      class="absolute top-7 -left-[1.6rem] size-2.5 rounded-full bg-primary md:hidden"/>
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
                                    })} class={LINK}>
                                        {about.educationPage}
                                        <ArrowRight class="size-4"/>
                                    </Link>
                                    <Show when={item.url}>
                                        {(url) => (
                                            <a href={url()} target="_blank" rel="noopener noreferrer" class={LINK}>
                                                {about.courseworkLink}
                                                <ExternalLink class="size-4"/>
                                            </a>
                                        )}
                                    </Show>
                                    <Show when={item.organization}>
                                        {(organization) => (
                                            <a href={organization().url} target="_blank" rel="noopener noreferrer"
                                               class={LINK}>
                                                <GithubIcon class="size-4"/>
                                                {about.organizationLink} · {organization().repositories} {about.repositories}
                                            </a>
                                        )}
                                    </Show>
                                </p>
                                <ul class="mt-3 flex flex-wrap gap-1.5">
                                    <For each={copy.skills}>
                                        {(skill) => (
                                            <li
                                                class="rounded border border-border px-2 py-0.5 text-xs text-fg-subtle">
                                                {skill}
                                            </li>
                                        )}
                                    </For>
                                </ul>
                            </li>
                        );
                    }}</For>
                </ol>
                <Link
                    to={buildDetailPath(lang, "education", {locked: locked()})}
                    class="mt-6 inline-flex min-h-10 items-center gap-2 rounded-md border border-border-strong px-4 text-sm font-semibold text-fg hover:border-primary hover:text-primary"
                >
                    {about.educationIndex}
                    <ArrowRight class="size-4"/>
                </Link>
            </div>
        </Section>
    );
}
