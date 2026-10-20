import {For, Show} from "solid-js";
import {ArrowRight} from "@/components/ui/icons";
import {certifications} from "@/content/shared/certifications";
import {CERTIFICATION_SLUG, EDUCATION_SLUG, EXPERIENCE_SLUG} from "@/content/shared/detail-links";
import {milestones} from "@/content/shared/journey";
import {BUILD_DATE} from "@/content/shared/site";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {useJourneyCopy} from "@/hooks/useJourneyCopy";
import {formatRange, formatYearMonth} from "@/lib/format";
import {isFuture} from "@/lib/journey";
import {buildDetailPath} from "@/lib/paths";
import {Link} from "@/routes/Router";
import type {MilestoneId} from "@/types/journey";
import {LineKey} from "./LineKey";
import {SdgBadge} from "./SdgBadge";

/** The job and program stops have a page of their own. */
const detailOf = (id: MilestoneId) => {
    if (id in EXPERIENCE_SLUG) return {
        collection: "experience" as const,
        slug: EXPERIENCE_SLUG[id as keyof typeof EXPERIENCE_SLUG]
    };
    if (id in EDUCATION_SLUG) return {
        collection: "education" as const,
        slug: EDUCATION_SLUG[id as keyof typeof EDUCATION_SLUG]
    };
    return null;
};

/** One stop's text and links; the details panel draws it anew for each stop it shows. */
function MilestoneContent(props: { id: MilestoneId }) {
    const {lang, content: {ui}} = useLanguage();
    const {role, locked} = useRole();
    const journey = useJourneyCopy();
    // The panel keys this content by stop, so the id is fixed for its life.
    // eslint-disable-next-line solid/reactivity
    const {id} = props;
    const detail = detailOf(id);
    const milestone = milestones.find((item) => item.id === id)!;
    const text = journey.milestones[id];
    const certificates = certifications.filter((certification) => certification.milestone === id);
    const when = milestone.end === undefined
        ? formatYearMonth(milestone.start, ui.months)
        : formatRange(milestone.start, milestone.end, ui.months, ui.present);

    return (
        <>
            <p class="font-mono text-xs uppercase tracking-wider text-fg-subtle">
                {journey.kinds[milestone.kind]} · {when}
                {isFuture(milestone, BUILD_DATE) && ` · ${journey.planned}`}
            </p>
            <h3 class="mt-2 text-title text-fg">{text.title}</h3>
            <p class="mt-1 font-semibold text-primary">{text.place}</p>
            <p class="mt-3 max-w-4xl text-fg-muted">{text.summary}</p>
            <Show when={certificates.length > 0}>
                <div class="mt-4">
                    <p class="font-mono text-xs uppercase tracking-wider text-fg-subtle">{journey.map.certificates}</p>
                    <ul class="mt-2 flex flex-wrap gap-2">
                        <For each={certificates}>
                            {(certification) => (
                                <li>
                                    <Link
                                        to={buildDetailPath(lang, "certifications", {
                                            slug: CERTIFICATION_SLUG[certification.id],
                                            from: role(),
                                            locked: locked()
                                        })}
                                        class="inline-flex min-h-8 items-center rounded-full border border-border px-3 py-1 text-xs text-fg-muted hover:border-primary hover:text-primary"
                                    >
                                        {certification.title} · {certification.issuer}
                                    </Link>
                                </li>
                            )}
                        </For>
                    </ul>
                </div>
            </Show>
            <ul class="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-fg-muted">
                <For each={milestone.lines}>
                    {(line) => (
                        <li class="inline-flex items-center gap-2">
                            <LineKey line={line}/>
                            {journey.lines[line]}
                        </li>
                    )}
                </For>
            </ul>
            <Show when={milestone.sdgs?.length || milestone.anchor}>
                <div class="mt-4 flex flex-wrap items-center gap-3">
                    <Show when={milestone.sdgs && milestone.sdgs.length > 0}>
                        <span class="font-mono text-xs text-fg-subtle">{journey.horizon.sdgShort}</span>
                    </Show>
                    <For each={milestone.sdgs}>
                        {(sdg) => <SdgBadge id={sdg} label={journey.horizon.sdgs[sdg].name} compact/>}
                    </For>
                    <span class="ml-auto flex flex-wrap gap-x-4">
                        <Show when={detail}>
                            {(page) => (
                                <Link
                                    to={buildDetailPath(lang, page().collection, {
                                        slug: page().slug,
                                        from: role(),
                                        locked: locked()
                                    })}
                                    class="inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover"
                                >
                                    {journey.map.detail}
                                    <ArrowRight class="size-4"/>
                                </Link>
                            )}
                        </Show>
                        <Show when={milestone.anchor}>
                            {(anchor) => (
                                <a href={`#${anchor()}`}
                                   class="inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover">
                                    {journey.map.goTo}
                                    <ArrowRight class="size-4"/>
                                </a>
                            )}
                        </Show>
                    </span>
                </div>
            </Show>
        </>
    );
}

/** The live region stays in place while the stop it shows changes, so screen readers announce each new stop. */
export function MilestoneDetails(props: { id: MilestoneId }) {
    return (
        <div aria-live="polite" class="rounded-lg border border-border bg-surface p-5 md:p-6">
            <Show when={props.id} keyed>{(id) => <MilestoneContent id={id}/>}</Show>
        </div>
    );
}
