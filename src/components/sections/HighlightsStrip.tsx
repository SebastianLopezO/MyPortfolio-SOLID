import {For} from "solid-js";
import {roleConfig} from "@/content/roles";
import {formatHighlight, highlightValues} from "@/content/shared/metrics";
import {useContent} from "@/context/language";
import {useRole} from "@/context/role";

export function HighlightsStrip() {
    const {highlights, locale} = useContent();
    const {role} = useRole();

    return (
        <section aria-label={highlights.label} class="border-y border-border bg-surface/60">
            <dl class="container-page grid grid-cols-2 gap-x-6 gap-y-8 py-10 md:grid-cols-4">
                <For each={roleConfig(role()).highlights}>
                    {(id) => (
                        <div class="flex flex-col-reverse justify-end gap-1">
                            <dt class="text-sm text-fg-muted">{highlights.items[id]}</dt>
                            <dd class="font-display text-4xl text-primary">{formatHighlight(highlightValues[id], locale)}</dd>
                        </div>
                    )}
                </For>
            </dl>
        </section>
    );
}
