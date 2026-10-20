/** The widest WebP variant of an image: what the full-size link opens and what crawlers are pointed to. */
export const widestVariant = (image: { base: string; widths: readonly number[] }) =>
    `${image.base}-${Math.max(...image.widths)}.webp`;

/** The widths `pnpm images` writes for a source: the usual steps, and the source's own width when it is narrower. */
export const variantWidths = (width: number, steps: readonly number[] = [480, 960, 1440]) => [
    ...steps.filter((step) => step < width),
    ...(width > steps[steps.length - 1] ? [] : [width]),
];
