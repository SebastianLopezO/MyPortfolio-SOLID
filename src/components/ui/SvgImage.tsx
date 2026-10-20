import {cn} from "@/lib/utils";

interface SvgImageProps {
    src: string;
    width: number;
    height: number;
    label: string;
    class?: string;
}

export function SvgImage(props: SvgImageProps) {
    return (
        // Never wider than the card's own size, so small cards are not blown up next to wide ones.
        <svg
            role="img"
            aria-label={props.label}
            viewBox={`0 0 ${props.width} ${props.height}`}
            style={{"max-width": `${props.width}px`}}
            class={cn("block h-auto w-full", props.class)}
        >
            <image href={props.src} width={props.width} height={props.height}/>
        </svg>
    );
}
