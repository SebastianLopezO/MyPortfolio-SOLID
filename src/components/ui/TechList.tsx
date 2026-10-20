import {For} from "solid-js";
import type {RoleId} from "@/content/roles";
import {isFocusTech, orderTech} from "@/lib/role-view";
import {cn} from "@/lib/utils";

interface TechListProps {
    tech: readonly string[];
    role: RoleId | null;
    limit?: number;
    class?: string;
}

export function TechList(props: TechListProps) {
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
        </ul>
    );
}
