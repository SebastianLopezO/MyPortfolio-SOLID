/** The widest WebP variant of an image: what the full-size link opens and what crawlers are pointed to. */
export const widestVariant = (image: { base: string; widths: readonly number[] }) =>
    `${image.base}-${Math.max(...image.widths)}.webp`;
