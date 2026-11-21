import {For, Show} from "solid-js";
import {ArrowDownUp, ArrowLeftRight} from "@/components/ui/icons";
import type {DiagramFacts} from "@/types/case-study";

interface LayeredDiagramProps {
    diagram: DiagramFacts;
    labels: Record<string, string>;
    title: string;
    caption: string;
}

/**
 * An architecture drawn as columns of boxes in plain HTML: the markup is the accessible version, columns stack on
 * phones, and the arrows between neighbors are decoration because the caption states how data flows.
 */
export function LayeredDiagram(props: LayeredDiagramProps) {
    return (
        <figure data-testid="layered-diagram" class="rounded-xl border border-border bg-surface/60 p-4 sm:p-6">
            <figcaption class="mb-6">
                <p class="font-semibold text-fg">{props.title}</p>
                <p class="mt-1 text-sm text-fg-subtle">{props.caption}</p>
            </figcaption>
            <ol class="grid gap-10 lg:auto-cols-fr lg:grid-flow-col lg:gap-12">
                <For each={props.diagram.layers}>{(layer, index) => (
                    <li class="relative rounded-lg border border-primary/30 bg-bg/60 p-4">
                        <Show when={index() > 0}>
                            <span aria-hidden="true"
                                  class="absolute -top-8 left-1/2 -translate-x-1/2 text-primary lg:top-1/2 lg:-left-9 lg:translate-x-0 lg:-translate-y-1/2">
                                <ArrowDownUp class="size-5 lg:hidden"/>
                                <ArrowLeftRight class="hidden size-5 lg:block"/>
                            </span>
                        </Show>
                        <p class="font-mono text-xs text-fg-subtle">{props.labels[layer.id]}</p>
                        <ul class="mt-3 space-y-2">
                            <For each={layer.nodes}>{(node) => (
                                <li
                                    class="rounded-md border border-border bg-surface px-3 py-2 text-sm text-fg">
                                    {props.labels[node]}
                                </li>
                            )}</For>
                        </ul>
                    </li>
                )}</For>
            </ol>
            <Show when={props.diagram.base}>{(base) => (
                <div class="mt-6 rounded-lg border border-dashed border-border-strong p-4">
                    <p class="font-mono text-xs text-fg-subtle">{props.labels[base().id]}</p>
                    <ul class="mt-3 flex flex-wrap gap-2">
                        <For each={base().nodes}>{(node) => (
                            <li
                                class="rounded-full border border-border px-3 py-1.5 text-sm text-fg-muted">
                                {props.labels[node]}
                            </li>
                        )}</For>
                    </ul>
                </div>
            )}</Show>
        </figure>
    );
}
