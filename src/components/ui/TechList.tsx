import {For, Show} from "solid-js";
import type {RoleId} from "@/content/roles";
import {isFocusTech, orderTech} from "@/lib/role-view";
import {cn} from "@/lib/utils";

interface TechListProps {
    tech: readonly string[];
    role: RoleId | null;
    limit?: number;
    class?: string;
}

/**
 * A stack as small chips, the role view's own first. With a limit it shows that many and says how many more there are,
 * which the page the card leads to lists in full.
 */
export function TechList(props: TechListProps) {
    const rest = () => (props.limit === undefined ? 0 : Math.max(props.tech.length - props.limit, 0));
    return (
        <ul translate="no" class={cn("flex flex-wrap gap-1.5", props.class)}>
            <For each={orderTech(props.tech, props.role).slice(0, props.limit)}>
                {(item) => (
                    <li
                        class={cn(
                            "rounded border px-2 py-0.5 font-mono text-xs",
                            isFocusTech(item, props.role) ? "border-primary/50 text-primary" : "border-border text-fg-subtle",
                        )}
                    >
                        {item}
                    </li>
                )}
            </For>
            <Show when={rest() > 0}>
                <li class="rounded border border-dashed border-border px-2 py-0.5 font-mono text-xs text-fg-subtle">+{rest()}</li>
            </Show>
        </ul>
    );
}
