import {For, type JSX, Match, Show, Switch} from "solid-js";
import {widestVariant} from "@/lib/image-widths";
import {cn} from "@/lib/utils";
import type {CaseImageFacts} from "@/types/case-study";

const srcSet = (image: CaseImageFacts, format: "avif" | "webp") =>
    image.widths.map((width) => `${image.base}-${width}.${format} ${width}w`).join(", ");

/**
 * `bare` drops the frame (corners and outline) for a screen that fills the top of a card that already has one.
 * `eager` is for the screen a page opens with: it loads at once and ahead of the others.
 */
export function CaseImage(props: {
    image: CaseImageFacts;
    alt: string;
    sizes: string;
    eager?: boolean;
    bare?: boolean;
    class?: string;
}) {
    const fallback = () => `${props.image.base}-${props.image.widths[Math.min(1, props.image.widths.length - 1)]}.webp`;
    return (
        <picture>
            <source type="image/avif" srcset={srcSet(props.image, "avif")} sizes={props.sizes}/>
            <img
                src={fallback()}
                srcset={srcSet(props.image, "webp")}
                sizes={props.sizes}
                alt={props.alt}
                width={props.image.width}
                height={props.image.height}
                loading={props.eager ? "eager" : "lazy"}
                fetchpriority={props.eager ? "high" : undefined}
                decoding="async"
                class={cn("h-auto w-full bg-surface", !props.bare && "rounded-lg border border-border", props.class)}
            />
        </picture>
    );
}

/** What a screen needs under it: the attribution of its data, or the note that it is a recreation. */
function Caption(props: { image: CaseImageFacts; recreationLabel: string }) {
    return (
        <Show when={props.image.credit} fallback={
            <Show when={props.image.recreation}>
                <figcaption class="mt-1.5 text-xs text-fg-subtle">{props.recreationLabel}</figcaption>
            </Show>
        }>
            {(credit) => (
                <figcaption class="mt-1.5 text-xs text-fg-subtle">
                    <a href={credit().href} target="_blank" rel="noopener noreferrer"
                       class="inline-flex min-h-6 items-center hover:text-primary">
                        {credit().text}
                    </a>
                </figcaption>
            )}
        </Show>
    );
}

interface CaseImagesProps {
    images: CaseImageFacts[];
    /** The same screens as a phone shows them, shown instead of `images` below 48rem. */
    phoneImages?: CaseImageFacts[];
    alts: Record<string, string>;
    recreationLabel: string;
    enlargeLabel: string;
}

/** Each screen links to its largest variant, so its text can be read on a phone or a narrow column. */
function Enlargeable(props: { image: CaseImageFacts; label: string; children: JSX.Element }) {
    return (
        <a href={widestVariant(props.image)} target="_blank" rel="noopener noreferrer"
           class="block rounded-lg hover:opacity-90">
            {props.children}
            <span class="sr-only"> ({props.label})</span>
        </a>
    );
}

export function CaseImages(props: CaseImagesProps) {
    const first = () => props.images[0];
    const rest = () => props.images.slice(1);
    return (
        <Switch>
            <Match when={props.phoneImages && props.phoneImages.length > 0 && props.phoneImages}>
                {(phoneImages) => (
                    // Both blocks are in the page; the hidden one's lazy images never load.
                    <>
                        <div class="hidden md:block">
                            <CaseImages images={props.images} alts={props.alts} recreationLabel={props.recreationLabel}
                                        enlargeLabel={props.enlargeLabel}/>
                        </div>
                        <div class="md:hidden">
                            <CaseImages images={phoneImages()} alts={props.alts} recreationLabel={props.recreationLabel}
                                        enlargeLabel={props.enlargeLabel}/>
                        </div>
                    </>
                )}
            </Match>
            {/* Phone screens sit three across; a wide first screen gets the full width. */}
            <Match when={first() && first().height > first().width}>
                <div class="grid grid-cols-3 gap-2 sm:mx-auto sm:max-w-3xl sm:gap-6">
                    <For each={props.images}>
                        {(image) => (
                            <figure>
                                <Enlargeable image={image} label={props.enlargeLabel}>
                                    <CaseImage image={image} alt={props.alts[image.id]}
                                               sizes="(min-width: 640px) 15rem, 30vw"/>
                                </Enlargeable>
                                <Caption image={image} recreationLabel={props.recreationLabel}/>
                            </figure>
                        )}
                    </For>
                </div>
            </Match>
            <Match when={first()}>
                {(image) => (
                    <div class="space-y-4">
                        <figure>
                            <Enlargeable image={image()} label={props.enlargeLabel}>
                                <CaseImage image={image()} alt={props.alts[image().id]}
                                           sizes="(min-width: 1440px) 80vw, (min-width: 1152px) 72rem, 100vw"/>
                            </Enlargeable>
                            <Caption image={image()} recreationLabel={props.recreationLabel}/>
                        </figure>
                        {/* A lone second screen keeps the full width, so its text stays as legible as the first one's. */}
                        <Show when={rest().length > 0}>
                            <div class={cn("grid gap-4", rest().length > 1 && "md:grid-cols-2")}>
                                <For each={rest()}>
                                    {(image) => (
                                        <figure>
                                            <Enlargeable image={image} label={props.enlargeLabel}>
                                                <CaseImage
                                                    image={image}
                                                    alt={props.alts[image.id]}
                                                    sizes={rest().length > 1 ? "(min-width: 1440px) 40vw, (min-width: 768px) 36rem, 100vw" : "(min-width: 1440px) 80vw, (min-width: 1152px) 72rem, 100vw"}
                                                />
                                            </Enlargeable>
                                            <Caption image={image} recreationLabel={props.recreationLabel}/>
                                        </figure>
                                    )}
                                </For>
                            </div>
                        </Show>
                    </div>
                )}
            </Match>
        </Switch>
    );
}
