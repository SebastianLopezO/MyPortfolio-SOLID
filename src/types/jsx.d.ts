import "solid-js";

declare module "solid-js" {
    namespace JSX {
        /** Set as DOM properties with prop:, so the prerender leaves them out of the markup. */
        interface ExplicitProperties {
            /** A textarea's value: its content attribute does not exist, so React never wrote one either. */
            value: string;
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        interface SvgSVGAttributes<T> {
            /** Keeps browsers that still honor it from putting a decorative icon in the tab order. */
            focusable?: "true" | "false";
        }
    }
}
