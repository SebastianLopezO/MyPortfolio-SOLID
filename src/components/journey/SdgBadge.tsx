import {sdgs} from "@/content/shared/journey";
import {cn} from "@/lib/utils";
import type {SdgId} from "@/types/journey";

/** The goal number on its official color, with the ink that clears contrast; the name always travels with it. */
export function SdgBadge(props: { id: SdgId; label: string; compact?: boolean }) {
    const goal = () => sdgs.find((item) => item.id === props.id)!;
    return (
        <span class={cn("inline-flex items-center gap-2", props.compact ? "text-xs" : "text-sm")}
              title={props.compact ? props.label : undefined}>
            <span
                class={cn(
                    "grid shrink-0 place-items-center rounded-sm font-mono font-semibold",
                    props.compact ? "size-6 text-xs" : "size-8 text-sm",
                    // The badge colors are fixed, so their ink is too: it does not follow the theme.
                    goal().onColor === "light" ? "text-paper" : "text-ink",
                )}
                style={{background: goal().color}}
            >
                {props.id}
            </span>
            <span class={props.compact ? "sr-only" : "text-fg-muted"}>{props.label}</span>
        </span>
    );
}
