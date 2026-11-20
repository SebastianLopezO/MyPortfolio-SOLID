import {createSignal, onCleanup, onMount, Show} from "solid-js";
import {Moon, Sun} from "@/components/ui/icons";
import {useContent} from "@/context/language";
import {cn} from "@/lib/utils";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const SYSTEM_DARK = "(prefers-color-scheme: dark)";
// The browser's bar takes the page's background in each theme (Page.astro names both for the system's choice).
const BAR_COLORS: Record<Theme, string> = {light: "#fbfcfd", dark: "#0d0d0d"};

/** The theme the page shows: the one the reader pinned (Page.astro sets it before the first paint) or the system's. */
const currentTheme = (): Theme => {
    const pinned = document.documentElement.dataset.theme;
    if (pinned === "light" || pinned === "dark") return pinned;
    return window.matchMedia(SYSTEM_DARK).matches ? "dark" : "light";
};

/**
 * Switches between the light and the dark theme and remembers the choice for the next visit. The page renders in the
 * system's theme until it hydrates, so the button shows its icon only once it knows which one is on; its name always
 * says what it switches to.
 */
export function ThemeToggle(props: { class?: string }) {
    const {ui} = useContent();
    const [theme, setTheme] = createSignal<Theme | null>(null);

    onMount(() => {
        setTheme(currentTheme());
        // Without a pinned choice the page follows the system as it changes.
        const media = window.matchMedia(SYSTEM_DARK);
        const follow = () => {
            if (!document.documentElement.dataset.theme) setTheme(currentTheme());
        };
        media.addEventListener("change", follow);
        onCleanup(() => media.removeEventListener("change", follow));
    });

    const toggle = () => {
        const next: Theme = (theme() ?? currentTheme()) === "dark" ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        for (const meta of document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]')) meta.content = BAR_COLORS[next];
        try {
            localStorage.setItem(STORAGE_KEY, next);
        } catch {
            // Storage may be off (a private window): the choice then lasts for this page only.
        }
        setTheme(next);
    };

    return (
        <button
            type="button"
            onClick={toggle}
            aria-label={theme() === "dark" ? ui.theme.toLight : ui.theme.toDark}
            class={cn(
                "inline-flex size-10 items-center justify-center rounded-full text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg",
                props.class,
            )}
        >
            <Show when={theme()}
                  fallback={<span aria-hidden="true" class="size-4 rounded-full border-2 border-current"/>}>
                {(current) => (current() === "dark" ? <Sun class="size-[1.125rem]"/> : <Moon class="size-[1.125rem]"/>)}
            </Show>
        </button>
    );
}
