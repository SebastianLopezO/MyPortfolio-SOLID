import {createMemo, For, Show} from "solid-js";
import {forProfile} from "@/content/roles";
import {LAB_ART, type Tile} from "@/content/shared/project-art";
import {skillGroups} from "@/content/shared/skills";
import {useSectionCopy} from "@/content/sections";
import {useRole} from "@/context/role";
import {Section} from "@/components/layout/Section";
import {More} from "@/components/ui/More";
import {withBase} from "@/lib/base";
import {isFocusTech, orderSkillGroups, orderTech} from "@/lib/role-view";
import {cn} from "@/lib/utils";
import type {SkillGroupId} from "@/types/content";

/** How many tools a group's tile shows; the disclosure under the grid lists them all. */
const SHOWN = 6;

/** The layer of color behind each group's object, from the same family as the project tiles. */
const GROUP_TILE: Record<SkillGroupId, Tile> = {
    languages: "peach",
    backend: "sky",
    crm: "peach",
    data: "butter",
    databases: "lilac",
    frontend: "sky",
    devops: "sage",
    cloud: "sky",
    security: "sage",
    networks: "stone",
    iot: "mint",
    ai: "lilac",
    testing: "sage",
    tools: "stone",
    foundations: "butter",
};

/** The tools of one group as chips; in a role view its own come first and stand out. */
function Tools(props: { items: readonly string[]; class?: string; cascade?: boolean }) {
    const {role} = useRole();
    return (
        <ul translate="no" class={cn("flex flex-wrap content-start gap-1.5", props.class)}>
            <For each={props.items}>{(item, index) => (
                <li
                    class={cn(
                        "rounded-full px-3 py-1 font-mono text-xs",
                        props.cascade && "skill-chip",
                        !role() || isFocusTech(item, role()) ? "bg-surface-raised text-fg" : "text-fg-subtle ring-1 ring-border ring-inset",
                    )}
                    style={props.cascade ? {"--i": String(index())} : undefined}
                >
                    {item}
                </li>
            )}</For>
        </ul>
    );
}

/**
 * Every group of tools as a tile: its object, its name, how many tools it holds and the first of them, the role's own
 * first. The scroll position draws the transitions (globals.css, skill-tile): each tile rises into place, its object
 * lifts onto its layer and its tools print one after another, so nothing runs a script and nothing waits for a press.
 */
export function SkillsSection() {
    const skills = useSectionCopy("skills");
    const {role} = useRole();
    const ordered = createMemo(() => orderSkillGroups(skillGroups, role()));

    return (
        <Section id="skills" title={skills.title} subtitle={forProfile(skills.subtitle, role())}>
            <ul class="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                <For each={ordered()}>{(group) => {
                    const tools = () => orderTech(group.items, role());
                    return (
                        <li class="skill-tile flex flex-col rounded-2xl border border-border bg-surface p-4 sm:p-5">
                            <div class="flex items-center gap-4">
                                <span aria-hidden="true" class="grid size-16 shrink-0 place-items-center rounded-xl"
                                      style={{background: `var(--color-tile-${GROUP_TILE[group.id]})`}}>
                                    <img src={withBase(LAB_ART[group.id])} alt="" width={56} height={56} loading="lazy"
                                         decoding="async" class="skill-art size-14"/>
                                </span>
                                <div class="min-w-0">
                                    <h3 class="text-base font-semibold text-fg">{skills.groups[group.id]}</h3>
                                    <p class="mt-0.5 font-mono text-xs text-fg-subtle">
                                        {skills.count.replace("{count}", String(group.items.length))}
                                    </p>
                                </div>
                            </div>
                            <Tools items={tools().slice(0, SHOWN)} class="mt-4" cascade/>
                            <Show when={group.items.length > SHOWN}>
                                <p class="mt-3 text-xs text-fg-subtle">
                                    {skills.others.replace("{count}", String(group.items.length - SHOWN))}
                                </p>
                            </Show>
                        </li>
                    );
                }}</For>
            </ul>

            {/* Every group at once, for a reader who wants the whole list; it stays in the page for search engines. */}
            <More class="mt-8" label={`${skills.moreTitle} (${ordered().length})`} openLabel={skills.moreTitle}>
                <ul class="mt-4 grid gap-x-10 md:grid-cols-2 xl:grid-cols-3">
                    <For each={ordered()}>{(group) => (
                        <li class="border-t border-border py-5">
                            <div class="flex items-baseline justify-between gap-3">
                                <h3 class="text-base font-semibold text-fg">{skills.groups[group.id]}</h3>
                                <span class="shrink-0 font-mono text-xs text-fg-subtle">
                                    {skills.count.replace("{count}", String(group.items.length))}
                                </span>
                            </div>
                            <Tools items={orderTech(group.items, role())} class="mt-3"/>
                        </li>
                    )}</For>
                </ul>
            </More>
        </Section>
    );
}
