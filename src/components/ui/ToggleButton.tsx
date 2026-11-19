import {type JSX, Show} from "solid-js";
import {cn} from "@/lib/utils";

/** A button that stays pressed while its option is on, as in the filters and groupings of the project and detail pages. */
export function ToggleButton(props: {
    pressed: boolean;
    onClick: () => void;
    /** How many items the option shows, after the label. */
    count?: number;
    children: JSX.Element;
}) {
    return (
        <button
            type="button"
            aria-pressed={props.pressed}
            onClick={() => props.onClick()}
            class={cn(
                "min-h-10 rounded-full border px-3 py-2 text-sm font-semibold transition-colors",
                props.pressed ? "border-primary bg-primary text-on-primary" : "border-border text-fg-muted hover:border-primary hover:text-primary",
            )}
        >
            {props.children}
            <Show when={props.count !== undefined}>
                {" "}
                <span
                    class={cn("font-mono text-xs", props.pressed ? "text-on-primary/80" : "text-fg-subtle")}>{props.count}</span>
            </Show>
        </button>
    );
}
