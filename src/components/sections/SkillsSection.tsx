import {createMemo, createSignal, For, Show} from "solid-js";
import {forProfile} from "@/content/roles";
import {skillGroups} from "@/content/shared/skills";
import {useSectionCopy} from "@/content/sections";
import {useContent} from "@/context/language";
import {useRole} from "@/context/role";
import {Section} from "@/components/layout/Section";
import {ChevronDown} from "@/components/ui/icons";
import {isFocusTech, orderSkillGroups, orderTech, split} from "@/lib/role-view";
import {cn} from "@/lib/utils";

const VISIBLE_GROUPS = 6;

export function SkillsSection() {
    const {ui} = useContent();
    const skills = useSectionCopy("skills");
    const {role} = useRole();
    const [expanded, setExpanded] = createSignal(false);
    const ordered = createMemo(() => split(orderSkillGroups(skillGroups, role()), VISIBLE_GROUPS));
    const groups = () => (expanded() ? [...ordered().visible, ...ordered().hidden] : ordered().visible);

    return (
        <Section id="skills" title={skills.title} subtitle={forProfile(skills.subtitle, role())} tone="raised">
            {/* Groups two across from 48rem and three from 80rem, so the tools fill the width instead of a narrow column. */}
            <ul class="enter-each grid gap-x-10 md:grid-cols-2 xl:grid-cols-3">
                <For each={groups()}>{(group) => (
                    <li class="border-t border-border py-6">
                        <div class="flex items-baseline justify-between gap-3">
                            <h3 class="text-title text-fg">{skills.groups[group.id]}</h3>
                            <span
                                class="shrink-0 font-mono text-xs text-fg-subtle">{skills.count.replace("{count}", String(group.items.length))}</span>
                        </div>
                        <ul translate="no" class="mt-4 flex flex-wrap content-start gap-2">
                            <For each={orderTech(group.items, role())}>{(item) => (
                                <li
                                    class={cn(
                                        "rounded-full border px-3 py-1 font-mono text-xs",
                                        !role() || isFocusTech(item, role())
                                            ? "border-primary/30 bg-primary/10 text-primary"
                                            : "border-border text-fg-subtle",
                                    )}
                                >
                                    {item}
                                </li>
                            )}</For>
                        </ul>
                    </li>
                )}</For>
            </ul>
            <Show when={ordered().hidden.length > 0}>
                <button
                    type="button"
                    aria-expanded={expanded()}
                    onClick={() => setExpanded((value) => !value)}
                    class="mt-6 inline-flex min-h-10 items-center gap-2 rounded-md border border-border-strong px-4 text-sm font-semibold text-fg hover:border-primary hover:text-primary"
                >
                    {expanded() ? ui.actions.showFewer : `${skills.moreTitle} (${ordered().hidden.length})`}
                    {/* Points where the rows go: down to open them, up once they are open. */}
                    <ChevronDown
                        class={cn("size-4 motion-safe:transition-transform motion-safe:duration-400 motion-safe:ease-emphasized", expanded() && "rotate-180")}/>
                </button>
            </Show>
        </Section>
    );
}
