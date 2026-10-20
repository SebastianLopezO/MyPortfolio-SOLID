import type {JourneyLineId} from "@/types/journey";

export function LineKey(props: { line: JourneyLineId }) {
    return <span aria-hidden="true" class="inline-block h-1 w-4 rounded-full"
                 style={{background: `var(--color-viz-${props.line})`}}/>;
}
