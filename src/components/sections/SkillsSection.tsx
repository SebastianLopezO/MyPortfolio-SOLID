import {createComputed, createMemo, createSignal, For, on} from "solid-js";
import {forProfile} from "@/content/roles";
import {LAB_ART} from "@/content/shared/project-art";
import {skillGroups} from "@/content/shared/skills";
import {useSectionCopy} from "@/content/sections";
import {useRole} from "@/context/role";
import {Section} from "@/components/layout/Section";
import {LabBoard} from "@/components/sections/LabBoard";
import {More} from "@/components/ui/More";
import {withBase} from "@/lib/base";
import {isFocusTech, orderSkillGroups, orderTech} from "@/lib/role-view";
import {cn} from "@/lib/utils";
import type {SkillGroupId} from "@/types/content";

/** The tools of one group as chips; in a role view its own come first and stand out. */
function Tools(props: { items: readonly string[]; class?: string }) {
    const {role} = useRole();
    return (
        <ul translate="no" class={cn("flex flex-wrap content-start gap-1.5", props.class)}>
            <For each={orderTech(props.items, role())}>{(item) => (
                <li
                    class={cn(
                        "rounded-full px-3 py-1 font-mono text-xs",
                        !role() || isFocusTech(item, role()) ? "bg-surface-raised text-fg" : "text-fg-subtle ring-1 ring-border ring-inset",
                    )}
                >
                    {item}
                </li>
            )}</For>
        </ul>
    );
}

export function SkillsSection() {
    const skills = useSectionCopy("skills");
    const {role} = useRole();
    const ordered = createMemo(() => orderSkillGroups(skillGroups, role()));
    const [selected, setSelected] = createSignal<SkillGroupId>(ordered()[0].id);
    // A role switch happens without a reload, so the bench opens on the new role's first group.
    createComputed(on(ordered, (groups) => setSelected(groups[0].id), {defer: true}));
    const open = () => ordered().find((group) => group.id === selected()) ?? ordered()[0];

    return (
        <Section id="skills" title={skills.title} subtitle={forProfile(skills.subtitle, role())}>
            <p class="-mt-6 mb-8 max-w-2xl text-fg-muted md:-mt-8">{skills.lab.hint}</p>
            <LabBoard
                groups={ordered().map((group) => ({id: group.id, count: group.items.length}))}
                names={skills.groups}
                countLabel={skills.count}
                label={skills.lab.label}
                keys={skills.lab.keys}
                tidy={skills.lab.tidy}
                selected={selected()}
                onSelect={setSelected}
            />

            {/* The open module: its object, its name and every tool it holds. */}
            <div aria-live="polite"
                 class="mt-8 grid gap-6 rounded-2xl border border-border p-5 sm:grid-cols-[6rem_minmax(0,1fr)] sm:p-7">
                <div class="hidden size-24 place-items-center rounded-xl bg-surface sm:grid">
                    <img src={withBase(LAB_ART[open().id])} alt="" width={96} height={96} loading="lazy"
                         decoding="async" class="size-24"/>
                </div>
                <div>
                    <h3 class="text-title text-fg">{skills.lab.toolsOf.replace("{group}", skills.groups[open().id])}</h3>
                    <p class="mt-1 font-mono text-xs text-fg-subtle">{skills.count.replace("{count}", String(open().items.length))}</p>
                    <Tools items={open().items} class="mt-4"/>
                </div>
            </div>

            {/* Every group at once, for a reader who wants the whole list; it stays in the page for search engines. */}
            <More class="mt-6" label={`${skills.moreTitle} (${ordered().length})`} openLabel={skills.moreTitle}>
                <ul class="mt-4 grid gap-x-10 md:grid-cols-2 xl:grid-cols-3">
                    <For each={ordered()}>{(group) => (
                        <li class="border-t border-border py-5">
                            <div class="flex items-baseline justify-between gap-3">
                                <h3 class="text-base font-semibold text-fg">{skills.groups[group.id]}</h3>
                                <span class="shrink-0 font-mono text-xs text-fg-subtle">
                                    {skills.count.replace("{count}", String(group.items.length))}
                                </span>
                            </div>
                            <Tools items={group.items} class="mt-3"/>
                        </li>
                    )}</For>
                </ul>
            </More>
        </Section>
    );
}
