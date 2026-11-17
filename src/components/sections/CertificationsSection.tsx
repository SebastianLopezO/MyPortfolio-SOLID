import {createMemo, createSignal, For, Show} from "solid-js";
import {ArrowRight, ExternalLink} from "@/components/ui/icons";
import {forProfile} from "@/content/roles";
import {certifications} from "@/content/shared/certifications";
import {CERTIFICATION_SLUG} from "@/content/shared/detail-links";
import {milestones} from "@/content/shared/journey";
import {useSectionCopy} from "@/content/sections";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {useJourneyCopy} from "@/hooks/useJourneyCopy";
import {Section} from "@/components/layout/Section";
import {LineKey} from "@/components/journey/LineKey";
import {formatYearMonth} from "@/lib/format";
import {buildDetailPath} from "@/lib/paths";
import {prioritize, split} from "@/lib/role-view";
import {Link} from "@/routes/Router";

const VISIBLE_CERTIFICATIONS = 6;
const STOPS = new Map(milestones.map((milestone) => [milestone.id, milestone]));

export function CertificationsSection() {
    const {lang, content: {ui}} = useLanguage();
    const copy = useSectionCopy("certifications");
    const journey = useJourneyCopy();
    const {role, locked} = useRole();
    const [expanded, setExpanded] = createSignal(false);
    const ordered = createMemo(() => prioritize(certifications, (item) => item.roles, role()));
    const parts = createMemo(() => split(ordered(), VISIBLE_CERTIFICATIONS));
    const items = () => (expanded() ? ordered() : parts().visible);

    return (
        <Section id="certifications" title={copy.title} subtitle={forProfile(copy.subtitle, role())} tone="raised">
            {/* Rows of an index split by hairlines, two across from 48rem; the full list of 29 reads the same way. */}
            <ul class="enter-each grid border-b border-border md:grid-cols-2 md:gap-x-12">
                <For each={items()}>{(item) => {
                    const text = copy.items[item.id];
                    const stop = STOPS.get(item.milestone)!;
                    return (
                        <li class="flex gap-4 border-t border-border py-6">
                            <div class="min-w-0 flex-1">
                                <h3 class="text-fg">
                                    <Link to={buildDetailPath(lang, "certifications", {
                                        slug: CERTIFICATION_SLUG[item.id],
                                        from: role(),
                                        locked: locked()
                                    })} class="hover:text-primary">
                                        {item.title}
                                    </Link>
                                </h3>
                                <p class="text-sm text-fg-subtle">
                                    {item.issuer} · {formatYearMonth(item.date, ui.months)}
                                </p>
                                <p class="mt-2 text-sm text-fg-muted">{text.learned}</p>
                                <p class="mt-2 text-sm text-fg">
                                    <span class="font-semibold text-primary">{copy.labels.adds}: </span>
                                    {text.adds}
                                </p>
                                <p class="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-fg-subtle">
                                    <span>{copy.labels.stop}:</span>
                                    <a href="#journey"
                                       class="inline-flex min-h-6 items-center font-semibold text-fg-muted hover:text-primary">
                                        {journey.milestones[stop.id].title}
                                    </a>
                                    <span class="inline-flex items-center gap-1.5">
                                        <For each={stop.lines}>{(line) => <LineKey line={line}/>}</For>
                                        <span
                                            class="sr-only">{stop.lines.map((line) => journey.lines[line]).join(", ")}</span>
                                    </span>
                                </p>
                                <Show when={item.url}>{(url) => (
                                    <a
                                        href={url()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="mt-1 inline-flex min-h-9 items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover"
                                    >
                                        {ui.actions.viewCredential}
                                        <ExternalLink class="size-4"/>
                                    </a>
                                )}</Show>
                            </div>
                        </li>
                    );
                }}</For>
            </ul>
            <div class="mt-6 flex flex-wrap gap-3">
                <Show when={parts().hidden.length > 0}>
                    <button
                        type="button"
                        aria-expanded={expanded()}
                        onClick={() => setExpanded((value) => !value)}
                        class="inline-flex min-h-10 items-center rounded-md border border-border-strong px-4 text-sm font-semibold text-fg hover:border-primary hover:text-primary"
                    >
                        {expanded() ? ui.actions.showFewer : `${ui.actions.showAll} (${ordered().length})`}
                    </button>
                </Show>
                <Link
                    to={buildDetailPath(lang, "certifications", {from: role(), locked: locked()})}
                    class="inline-flex min-h-10 items-center gap-2 rounded-md px-2 text-sm font-semibold text-primary hover:text-primary-hover"
                >
                    {copy.labels.index}
                    <ArrowRight class="size-4"/>
                </Link>
            </div>
        </Section>
    );
}
