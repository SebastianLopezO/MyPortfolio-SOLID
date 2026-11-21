import {createSignal, For, onCleanup, onMount, Show} from "solid-js";
import {Menu, X} from "@/components/ui/icons";
import {Link} from "@/routes/Router";
import {profile} from "@/content/shared/profile";
import {useContent} from "@/context/language";
import {useRole} from "@/context/role";
import {LanguageSwitcher} from "@/components/layout/LanguageSwitcher";
import {ThemeToggle} from "@/components/layout/ThemeToggle";
import {withBase} from "@/lib/base";
import type {SectionId} from "@/types/content";

/** How far the page scrolls before the header folds into its floating name and controls. */
const FOLD_AT = 48;

/**
 * Primary sections shown in the horizontal desktop bar so it always stays on a single clean line across every
 * breakpoint (1280px through 2560px); all twelve sections remain accessible from the menu button panel.
 */
const PRIMARY_NAV = new Set<SectionId>(["about", "experience", "projects", "skills", "services", "contact"]);

interface SiteHeaderProps {
    sections: SectionId[];
    /** Pages other than the home page link each section back to the home page of the current role view. */
    homeLinks?: boolean;
    languageHref?: string;
}

/**
 * Tells which section of the home page is being read, for the link that marks it: the one that crosses the middle of
 * the screen, and none while the hero is there. Browsers that track the links of a list themselves
 * (scroll-target-group) always keep one link current, which here would mark the first section from the top of the
 * page, so every browser gets the same observer.
 */
function useCurrentSection(sections: () => SectionId[], enabled: () => boolean) {
    const [current, setCurrent] = createSignal<SectionId | null>(null);
    onMount(() => {
        if (!enabled() || typeof IntersectionObserver === "undefined") return;
        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) setCurrent(entry.target.id as SectionId);
                else setCurrent((id) => (id === entry.target.id ? null : id));
            }
        }, {rootMargin: "-50% 0px -50% 0px"});
        for (const id of sections()) {
            const section = document.getElementById(id);
            if (section) observer.observe(section);
        }
        onCleanup(() => observer.disconnect());
    });
    return current;
}

/**
 * The header. At the top of a page it is a quiet bar: the name, the sections and the controls. Once the reader
 * scrolls, the bar folds away and leaves two small floating pieces, so the page has the screen: the name at the left,
 * so whose page this is never leaves the screen, and at the right a capsule with the theme and a round menu button
 * whose panel lists every section, the one being read marked. Below 80rem the sections always live in that panel.
 */
export function SiteHeader(props: SiteHeaderProps) {
    const {ui} = useContent();
    const {role, pathFor} = useRole();
    const [open, setOpen] = createSignal(false);
    const [folded, setFolded] = createSignal(false);
    const items = () => props.sections;
    const primaryItems = () => props.sections.filter((section) => PRIMARY_NAV.has(section));
    const current = useCurrentSection(items, () => !props.homeLinks);
    let panel: HTMLDivElement | undefined;
    let toggle: HTMLButtonElement | undefined;

    onMount(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            setFolded(window.scrollY > FOLD_AT);
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", schedule, {passive: true});
        // The panel closes with Escape, which hands the focus back to its button, or with a press anywhere outside it.
        const onKey = (event: KeyboardEvent) => {
            if (event.key !== "Escape" || !open()) return;
            setOpen(false);
            toggle?.focus();
        };
        const onPointer = (event: PointerEvent) => {
            const target = event.target as Node;
            if (open() && !panel?.contains(target) && !toggle?.contains(target)) setOpen(false);
        };
        document.addEventListener("keydown", onKey);
        document.addEventListener("pointerdown", onPointer);
        onCleanup(() => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", schedule);
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("pointerdown", onPointer);
        });
    });

    const hrefOf = (section: SectionId) => (props.homeLinks ? withBase(pathFor(role(), section)) : `#${section}`);

    return (
        <header
            data-testid="site-header"
            class="site-header fixed inset-x-0 top-0 z-50"
            data-folded={folded() || undefined}
            data-open={open() || undefined}
        >
            <span aria-hidden="true" class="header-backdrop"/>
            <div class="container-page relative flex h-(--header-height) items-center justify-between gap-3 sm:gap-6">
                {/* The whole name at every width: folded, it is the pill that keeps whose page this is in sight. */}
                <Link to={pathFor(role())}
                      data-testid="header-brand"
                      class="header-brand shrink-0 rounded-full text-sm leading-tight tracking-tight whitespace-nowrap text-fg hover:text-fg-muted sm:text-lg">
                    {profile.name}
                    <span class="sr-only"> · {ui.home}</span>
                </Link>

                {/* Primary sections in a strictly single-line bar; the full list of sections stays in the menu panel. */}
                <nav aria-label={ui.navLabel} data-testid="header-nav" class="header-nav hidden min-w-0 flex-1 xl:block">
                    <ul class="flex flex-nowrap items-center justify-center gap-x-1.5">
                        <For each={primaryItems()}>
                            {(section) => (
                                <li class="shrink-0">
                                    <a
                                        href={hrefOf(section)}
                                        data-testid={`header-nav-${section}`}
                                        aria-current={current() === section ? "true" : undefined}
                                        class="block rounded-full px-3 py-1.5 text-sm whitespace-nowrap text-fg-muted decoration-1 underline-offset-[0.35rem] transition-colors hover:text-fg aria-[current=true]:text-fg aria-[current=true]:underline"
                                    >
                                        {ui.nav[section]}
                                    </a>
                                </li>
                            )}
                        </For>
                    </ul>
                </nav>

                <div data-testid="header-controls" class="header-controls flex shrink-0 items-center gap-1 rounded-full p-1">
                    <LanguageSwitcher href={props.languageHref} data-testid="header-language-switcher" class="header-language"/>
                    <ThemeToggle data-testid="theme-toggle"/>
                    <button
                        ref={toggle}
                        type="button"
                        data-testid="header-menu-toggle"
                        class="header-menu-button inline-flex size-10 items-center justify-center rounded-full bg-primary text-on-primary transition-colors hover:bg-primary-hover"
                        aria-expanded={open()}
                        aria-controls="site-menu"
                        aria-label={open() ? ui.menu.close : ui.menu.open}
                        onClick={() => setOpen((value) => !value)}
                    >
                        <Show when={open()} fallback={<Menu class="size-[1.125rem]"/>}>
                            <X class="size-[1.125rem]"/>
                        </Show>
                    </button>
                </div>
            </div>

            {/* The panel exists only while open: it needs the button, so the prerendered page leaves it out. */}
            <Show when={open()}>
                <div
                    ref={panel}
                    id="site-menu"
                    data-testid="site-menu"
                    class="site-menu appear"
                >
                    <nav aria-label={ui.navLabel} data-testid="site-menu-nav">
                        <ul class="grid gap-0.5">
                            <For each={items()}>
                                {(section) => (
                                    <li>
                                        <a
                                            href={hrefOf(section)}
                                            data-testid={`site-menu-link-${section}`}
                                            aria-current={current() === section ? "true" : undefined}
                                            onClick={() => setOpen(false)}
                                            class="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg aria-[current=true]:text-fg"
                                        >
                                        <span aria-hidden="true"
                                              class="size-1.5 rounded-full bg-transparent group-aria-[current=true]:bg-accent"/>
                                            {ui.nav[section]}
                                        </a>
                                    </li>
                                )}
                            </For>
                        </ul>
                    </nav>
                    <div class="mt-2 border-t border-border px-3 pt-3 pb-1">
                        <LanguageSwitcher href={props.languageHref} data-testid="site-menu-language-switcher" class="w-full justify-center"/>
                    </div>
                </div>
            </Show>
            {/* How far down the page the reader is (globals.css, .reading-progress). */}
            <span aria-hidden="true" data-testid="reading-progress" class="reading-progress"/>
        </header>
    );
}
