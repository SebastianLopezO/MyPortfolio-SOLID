import {createSignal, For, Show} from "solid-js";
import {Check, Download, ExternalLink, FileText} from "@/components/ui/icons";
import {forProfile} from "@/content/roles";
import {resumeVersions} from "@/content/shared/resume";
import {useSectionCopy} from "@/content/sections";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {Section} from "@/components/layout/Section";
import {withBase} from "@/lib/base";
import {formatDay} from "@/lib/format";
import {cn} from "@/lib/utils";
import type {ResumeId} from "@/types/content";

/** Sheets drawn behind the preview, one per extra page, so the stack shows how long the document is. */
const MAX_SHEETS = 4;
const SHEET_OFFSET = 10;
/** A length in px, with zero written bare as the stylesheet would. */
const px = (value: number) => (value === 0 ? "0" : `${value}px`);

export function ResumeSection() {
    const {lang, content} = useLanguage();
    const resume = useSectionCopy("resume");
    const {role} = useRole();
    const [selected, setSelected] = createSignal<ResumeId>("ats");
    const version = () => resumeVersions.find((item) => item.id === selected()) ?? resumeVersions[0];
    // PDFs and preview images live in public/; under a subpath they need the base. External resumes keep their URL.
    const file = () => withBase(version().files[lang]);
    const preview = () => withBase(version().preview[lang]);
    const copy = () => resume.versions[selected()];
    const pages = () => (version().pages === 1 ? resume.pages.one : resume.pages.other).replace("{count}", String(version().pages));
    const sheets = () => Math.min(version().pages - 1, MAX_SHEETS);

    return (
        <Section id="resume" title={resume.title} subtitle={forProfile(resume.subtitle, role())} tone="raised">
            {/* Two columns of fixed measure, centered together, so the choices and the preview sit side by side. */}
            <div
                class="enter-each grid gap-12 lg:grid-cols-[minmax(0,34rem)_minmax(0,28rem)] lg:justify-center lg:gap-16">
                <div class="lg:sticky lg:top-24 lg:self-start">
                    <div role="group" aria-label={resume.title} class="flex flex-wrap gap-2">
                        <For each={resumeVersions}>{(item) => (
                            <button
                                type="button"
                                aria-pressed={item.id === selected()}
                                onClick={() => setSelected(item.id)}
                                class={cn(
                                    "min-h-10 rounded-md border px-4 text-sm font-semibold transition-colors",
                                    item.id === selected()
                                        ? "border-primary bg-primary text-on-primary"
                                        : "border-border text-fg-muted hover:border-primary hover:text-primary",
                                )}
                            >
                                {resume.versions[item.id].label}
                            </button>
                        )}</For>
                    </div>
                    <p class="mt-6 text-lg text-fg-muted">{copy().description}</p>
                    <ul class="mt-6 flex flex-wrap gap-x-6 gap-y-2 border-y border-border py-4 text-sm text-fg-muted">
                        <li class="flex items-center gap-2 font-semibold text-fg">
                            <FileText class="size-4 text-primary"/>
                            {pages()}
                        </li>
                        <li>{copy().format}</li>
                        <Show when={version().updated}>
                            {(updated) =>
                                <li>{resume.updated.replace("{date}", formatDay(updated(), content.locale))}</li>}
                        </Show>
                    </ul>
                    <h3 class="mt-6 font-mono text-xs uppercase tracking-wider text-fg-subtle">{resume.includesTitle}</h3>
                    <ul class="mt-3 space-y-2.5">
                        <For each={copy().includes}>
                            {(item) => (
                                <li class="flex gap-3 text-fg-muted">
                                    <Check class="mt-1 size-4 shrink-0 text-primary"/>
                                    {item}
                                </li>
                            )}
                        </For>
                    </ul>
                    <div class="mt-8 flex flex-wrap gap-3">
                        <Show when={!version().external} fallback={
                            <a
                                href={file()}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 font-semibold text-on-primary hover:bg-primary-hover active:translate-y-px"
                            >
                                <ExternalLink class="size-5"/>
                                {resume.open}
                            </a>
                        }>
                            <a
                                href={file()}
                                download=""
                                class="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 font-semibold text-on-primary hover:bg-primary-hover active:translate-y-px"
                            >
                                <Download class="size-5"/>
                                {resume.download}
                            </a>
                            <a
                                href={file()}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex h-11 items-center gap-2 rounded-full border border-border-strong px-5 font-semibold text-fg hover:border-primary hover:text-primary active:translate-y-px"
                            >
                                <ExternalLink class="size-5"/>
                                {resume.open}
                            </a>
                        </Show>
                    </div>
                </div>

                <a
                    href={file()}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="relative mx-auto block w-full max-w-[28rem]"
                    style={{
                        "padding-right": px(sheets() * SHEET_OFFSET),
                        "padding-bottom": px(sheets() * SHEET_OFFSET),
                    }}
                >
                    {/* The other pages, stacked behind the first one. */}
                    <For each={Array.from({length: sheets()}, (_, index) => sheets() - index)}>
                        {(depth) => (
                            <span aria-hidden="true"
                                  class="absolute rounded-lg border border-border-strong bg-fg shadow-card"
                                  style={{
                                      opacity: 0.85 - depth * 0.12,
                                      top: px(depth * SHEET_OFFSET),
                                      left: px(depth * SHEET_OFFSET),
                                      right: px((sheets() - depth) * SHEET_OFFSET),
                                      bottom: px((sheets() - depth) * SHEET_OFFSET),
                                  }}
                            />
                        )}
                    </For>
                    <picture class="relative block">
                        <source type="image/avif" srcset={`${preview()}-480.avif 480w, ${preview()}-960.avif 960w`}
                                sizes="(min-width: 1024px) 28rem, 92vw"/>
                        <img
                            src={`${preview()}-960.webp`}
                            srcset={`${preview()}-480.webp 480w, ${preview()}-960.webp 960w`}
                            sizes="(min-width: 1024px) 28rem, 92vw"
                            alt={`${resume.previewAlt} · ${copy().label}`}
                            width={960}
                            height={version().previewHeight}
                            loading="lazy"
                            decoding="async"
                            class="h-auto w-full rounded-lg border border-border bg-fg shadow-card"
                        />
                    </picture>
                    <span class="absolute -bottom-7 left-0 font-mono text-xs text-fg-subtle">
                        {resume.firstPage.replace("{count}", String(version().pages))}
                    </span>
                </a>
            </div>
        </Section>
    );
}
