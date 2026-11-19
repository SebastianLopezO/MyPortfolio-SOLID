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

const NAV_SECTIONS: SectionId[] = ["about", "journey", "experience", "skills", "projects", "testimonials", "resume", "contact"];

/** How far the page scrolls before the header folds into its floating controls. */
const FOLD_AT = 48;

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
    const [current, setCurrent] = createSignal<string | null>(null);
    onMount(() => {
        if (!enabled() || typeof IntersectionObserver === "undefined") return;
        const observer = new IntersectionObserver((entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) setCurrent(entry.target.id);
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
 * scrolls it folds away into a floating capsule at the right, the theme and a round menu button, so the page has the
 * whole screen; the menu opens a panel with every section, the current one marked. Below 80rem the sections always
 * live in that panel.
 */
export function SiteHeader(props: SiteHeaderProps) {
    const {ui} = useContent();
    const {role, pathFor} = useRole();
    const [open, setOpen] = createSignal(false);
    const [folded, setFolded] = createSignal(false);
    const items = () => props.sections.filter((section) => NAV_SECTIONS.includes(section));
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
            class="site-header fixed inset-x-0 top-0 z-50"
            data-folded={folded() || undefined}
            data-open={open() || undefined}
        >
            <span aria-hidden="true" class="header-backdrop"/>
            <div class="container-page relative flex h-(--header-height) items-center justify-between gap-6">
                <Link to={pathFor(role())} class="header-brand shrink-0 text-lg tracking-tight text-fg-muted hover:text-fg">
                    <span class="sm:hidden">{profile.shortName}</span>
                    <span class="hidden sm:inline">{profile.name}</span>
                    <span class="sr-only"> · {ui.home}</span>
                </Link>

                {/* The link of the section being read says so to assistive technology and shows it with more than its
                    color: an underline here, a dot in the panel. */}
                <nav aria-label={ui.navLabel} class="header-nav hidden xl:block">
                    <ul class="flex items-center gap-1">
                        <For each={items()}>
                            {(section) => (
                                <li>
                                    <a
                                        href={hrefOf(section)}
                                        aria-current={current() === section ? "true" : undefined}
                                        class="block rounded-full px-3 py-2 text-sm whitespace-nowrap text-fg-muted decoration-1 underline-offset-[0.4rem] transition-colors hover:text-fg aria-[current=true]:text-fg aria-[current=true]:underline"
                                    >
                                        {ui.nav[section]}
                                    </a>
                                </li>
                            )}
                        </For>
                    </ul>
                </nav>

                <div class="header-controls flex shrink-0 items-center gap-1 rounded-full p-1">
                    <LanguageSwitcher href={props.languageHref} class="header-language"/>
                    <ThemeToggle/>
                    <button
                        ref={toggle}
                        type="button"
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
                class="site-menu appear"
            >
                <nav aria-label={ui.navLabel}>
                    <ul class="grid gap-0.5">
                        <For each={items()}>
                            {(section) => (
                                <li>
                                    <a
                                        href={hrefOf(section)}
                                        aria-current={current() === section ? "true" : undefined}
                                        onClick={() => setOpen(false)}
                                        class="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg aria-[current=true]:text-fg"
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
                    <LanguageSwitcher href={props.languageHref} class="w-full justify-center"/>
                </div>
            </div>
            </Show>
            {/* How far down the page the reader is (globals.css, .reading-progress). */}
            <span aria-hidden="true" class="reading-progress"/>
        </header>
    );
}
