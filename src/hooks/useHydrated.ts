import {type Accessor, createSignal, onMount, sharedConfig} from "solid-js";
import {isServer} from "solid-js/web";

/**
 * False on the server and while the component hydrates, then true; true from the start for a component created in
 * the browser after hydration. Anything that differs from the prerendered HTML (the query, the browser's own state)
 * waits for it, so hydration always finds the markup the server wrote.
 */
export const useHydrated = (): Accessor<boolean> => {
    const fresh = !isServer && !sharedConfig.context;
    const [hydrated, setHydrated] = createSignal(fresh);
    if (!fresh) onMount(() => setHydrated(true));
    return hydrated;
};
