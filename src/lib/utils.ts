export type ClassValue = string | false | null | undefined | 0;

/**
 * Joins class names, skipping the falsy ones a condition leaves behind. It does not resolve conflicts between
 * utilities: a component and its caller never set the same property, and conditional branches carry the whole value
 * (font-normal on one side, font-semibold on the other).
 */
export function cn(...inputs: ClassValue[]) {
    let classes = "";
    for (const input of inputs) {
        if (input) classes = classes ? `${classes} ${input}` : input;
    }
    return classes;
}
