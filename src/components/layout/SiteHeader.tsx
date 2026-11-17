import {createSignal, For, onCleanup, onMount, Show} from "solid-js";
import {Menu, X} from "@/components/ui/icons";
import {Link} from "@/routes/Router";
import {profile} from "@/content/shared/profile";
import {useContent} from "@/context/language";
import {useRole} from "@/context/role";
import {LanguageSwitcher} from "@/components/layout/LanguageSwitcher";
import {withBase} from "@/lib/base";
import {cn} from "@/lib/utils";
import type {SectionId} from "@/types/content";

const NAV_SECTIONS: SectionId[] = ["about", "journey", "experience", "skills", "projects", "testimonials", "resume", "contact"];

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

export function SiteHeader(props: SiteHeaderProps) {
    const {ui} = useContent();
    const {role, pathFor} = useRole();
    const [open, setOpen] = createSignal(false);
    const items = () => props.sections.filter((section) => NAV_SECTIONS.includes(section));
    const current = useCurrentSection(items, () => !props.homeLinks);

    // The link of the section being read says so to assistive technology and shows it with more than its color.
    const links = (onNavigate?: () => void) => (
        <For each={items()}>
            {(section) => (
                <li>
                    <a
                        href={props.homeLinks ? withBase(pathFor(role(), section)) : `#${section}`}
                        aria-current={current() === section ? "true" : undefined}
                        onClick={() => onNavigate?.()}
                        class="block rounded-md px-3 py-2 text-sm whitespace-nowrap text-fg-muted decoration-2 underline-offset-8 transition-colors hover:text-primary aria-[current=true]:text-primary aria-[current=true]:underline lg:px-2 xl:px-3"
                    >
                        {ui.nav[section]}
                    </a>
                </li>
            )}
        </For>
    );

    return (
        <header class="site-header fixed inset-x-0 top-0 z-50 h-(--header-height) border-b border-border/60 bg-bg/90">
            <div class="container-page flex h-full items-center justify-between gap-4">
                <Link to={pathFor(role())} class="flex shrink-0 items-center gap-3">
                    <span
                        aria-hidden="true"
                        class="grid size-9 place-items-center rounded-md border border-primary/40 font-display text-lg text-primary"
                    >
                        {profile.initials}
                    </span>
                    <span
                        class="hidden font-display text-lg whitespace-nowrap text-fg sm:inline lg:hidden">{profile.shortName}</span>
                    <span class="sr-only">{ui.home}</span>
                </Link>

                <nav aria-label={ui.navLabel} class="hidden lg:block">
                    <ul class="flex items-center gap-0.5 xl:gap-1">{links()}</ul>
                </nav>

                <div class="flex shrink-0 items-center gap-2">
                    <LanguageSwitcher href={props.languageHref}/>
                    <button
                        type="button"
                        class="inline-flex size-10 items-center justify-center rounded-md border border-border text-fg-muted lg:hidden"
                        aria-expanded={open()}
                        aria-controls="mobile-nav"
                        aria-label={open() ? ui.menu.close : ui.menu.open}
                        onClick={() => setOpen((value) => !value)}
                    >
                        <Show when={open()} fallback={<Menu class="size-5"/>}>
                            <X class="size-5"/>
                        </Show>
                    </button>
                </div>
            </div>

            <nav
                id="mobile-nav"
                aria-label={ui.navLabel}
                class={cn("border-b border-border bg-bg lg:hidden", open() ? "block" : "hidden")}
            >
                <ul class="container-page grid gap-1 py-3">{links(() => setOpen(false))}</ul>
            </nav>
            {/* How far down the page the reader is (globals.css, .reading-progress). */}
            <span aria-hidden="true" class="reading-progress"/>
        </header>
    );
}
