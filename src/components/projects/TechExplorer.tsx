import {createMemo, createSignal, createUniqueId, For, Show} from "solid-js";
import type {RoleId} from "@/content/roles";
import {useSectionCopy} from "@/content/sections";
import {PROJECT_SLUG} from "@/content/shared/project-links";
import {projects} from "@/content/shared/projects";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {buildProjectPath} from "@/lib/paths";
import {isFocusTech, orderTech} from "@/lib/role-view";
import {cn} from "@/lib/utils";
import {Link} from "@/routes/Router";
import type {ProjectId} from "@/types/project";

interface TechExplorerProps {
    tech: readonly string[];
    role: RoleId | null;
    /** The project whose page this is, left out of the lists. */
    exclude?: ProjectId;
    /** Projects listed before the rest, such as the ones of the job whose page this is. */
    first?: readonly ProjectId[];
}

/**
 * A stack where each technology is a button that lists the projects using it, with a link to each. The chips are in the
 * prerendered page; the lists appear once it is interactive.
 */
export function TechExplorer(props: TechExplorerProps) {
    const {lang} = useLanguage();
    const {locked} = useRole();
    const cards = useSectionCopy("projects");
    const labels = cards.techExplorer;
    const panel = createUniqueId();
    const [picked, setPicked] = createSignal<string | null>(null);
    const listed = createMemo(() => {
        const tech = picked();
        const first = props.first ?? [];
        const using = tech ? projects.filter((project) => project.id !== props.exclude && project.tech.includes(tech)) : [];
        return [...using.filter((project) => first.includes(project.id)), ...using.filter((project) => !first.includes(project.id))];
    });
    const empty = () => (props.exclude ? labels.noOther : labels.none);

    return (
        <div>
            <p class="mb-3 text-sm text-fg-subtle">{labels.hint}</p>
            <ul translate="no" class="flex flex-wrap gap-1.5">
                <For each={orderTech(props.tech, props.role)}>
                    {(item) => (
                        <li>
                            <button
                                type="button"
                                aria-pressed={picked() === item}
                                aria-controls={panel}
                                onClick={() => setPicked(picked() === item ? null : item)}
                                class={cn(
                                    "rounded border px-2 py-1 font-mono text-xs transition-colors",
                                    picked() === item
                                        ? "border-primary bg-primary text-on-primary"
                                        : cn("hover:border-primary hover:text-primary", isFocusTech(item, props.role) ? "border-primary/50 text-primary" : "border-border text-fg-subtle"),
                                )}
                            >
                                {item}
                            </button>
                        </li>
                    )}
                </For>
            </ul>
            <div id={panel} aria-live="polite">
                <Show when={picked()}>
                    {(tech) => (
                        <div class="mt-4 rounded-lg border border-border bg-surface p-4">
                            <p class="font-semibold text-fg">
                                {(listed().length > 0 ? labels.usedIn : empty()).replace("{tech}", tech()).replace("{count}", String(listed().length))}
                            </p>
                            <Show when={listed().length > 0}>
                                <ul class="mt-2 space-y-1.5">
                                    <For each={listed()}>
                                        {(project) => (
                                            <li>
                                                <Link to={buildProjectPath(lang, {
                                                    slug: PROJECT_SLUG[project.id],
                                                    from: props.role,
                                                    locked: locked()
                                                })}
                                                      class="font-semibold text-primary hover:text-primary-hover">
                                                    {cards.items[project.id].name}
                                                </Link>
                                                <span
                                                    class="text-sm text-fg-subtle"> · {cards.items[project.id].context}</span>
                                            </li>
                                        )}
                                    </For>
                                </ul>
                            </Show>
                        </div>
                    )}
                </Show>
            </div>
        </div>
    );
}
