import {type JSX, splitProps} from "solid-js";
import {cn} from "@/lib/utils";

export function Textarea(props: JSX.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    const [local, rest] = splitProps(props, ["class"]);
    return (
        <textarea
            class={cn(
                "min-h-28 w-full rounded-xl border border-border-strong bg-bg px-3 py-2 text-base text-fg placeholder:text-fg-subtle focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none disabled:opacity-50",
                local.class,
            )}
            {...rest}
        />
    );
}
