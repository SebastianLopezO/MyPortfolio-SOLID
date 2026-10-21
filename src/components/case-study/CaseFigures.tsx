import {For} from "solid-js";
import {formatNumber} from "@/content/shared/metrics";
import {cn} from "@/lib/utils";
import type {CaseFigureFacts} from "@/types/case-study";

const formatFigure = ({value, atLeast, unit}: CaseFigureFacts, locale: string) => {
    const number = formatNumber(value, locale);
    if (unit === "%") return locale.startsWith("es") ? `${number} %` : `${number}%`;
    return `${number}${atLeast ? "+" : ""}`;
};

interface CaseFiguresProps {
    figures: CaseFigureFacts[];
    labels: Record<string, string>;
    locale: string;
    compact?: boolean;
    class?: string;
}

export function CaseFigures(props: CaseFiguresProps) {
    return (
        <dl class={cn("grid grid-cols-2 gap-3", !props.compact && "sm:grid-cols-4", props.class)}>
            <For each={props.figures}>{(figure) => (
                <div
                    class={cn("flex flex-col-reverse rounded-lg border border-border bg-surface", props.compact ? "p-3" : "p-4")}>
                    <dt class="text-sm text-fg-muted">{props.labels[figure.id]}</dt>
                    <dd class={cn("font-display text-primary", props.compact ? "text-2xl" : "text-3xl")}>{formatFigure(figure, props.locale)}</dd>
                </div>
            )}</For>
        </dl>
    );
}
