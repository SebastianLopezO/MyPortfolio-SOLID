import {createSignal, onMount} from "solid-js";
import {Moon, Sun} from "@/components/ui/icons";
import {useContent} from "@/context/language";
import {cn} from "@/lib/utils";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
// The browser's bar takes the page's background in each theme.
const BAR_COLORS: Record<Theme, string> = {light: "#fbfcfd", dark: "#0d0d0d"};

/** The theme the page shows: the one the reader pinned (Page.astro sets it before the first paint) or dark by default. */
const currentTheme = (): Theme => {
    const pinned = document.documentElement.dataset.theme;
    return pinned === "light" ? "light" : "dark";
};

/**
 * Switches between the dark (default) and the light theme and remembers the choice for the next visit.
 */
export function ThemeToggle(props: { class?: string }) {
    const {ui} = useContent();
    const [theme, setTheme] = createSignal<Theme>("dark");

    onMount(() => {
        setTheme(currentTheme());
    });

    const toggle = () => {
        const next: Theme = theme() === "dark" ? "light" : "dark";
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
            {theme() === "dark" ? <Sun class="size-[1.125rem]"/> : <Moon class="size-[1.125rem]"/>}
        </button>
    );
}
