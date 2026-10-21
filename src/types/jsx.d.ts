import "solid-js";

declare module "solid-js" {
    namespace JSX {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        interface SvgSVGAttributes<T> {
            /** Keeps browsers that still honor it from putting a decorative icon in the tab order. */
            focusable?: "true" | "false";
        }
    }
}
