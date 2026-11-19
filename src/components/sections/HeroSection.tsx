import {For, onCleanup, onMount} from "solid-js";
import {ArrowRight, Download} from "@/components/ui/icons";
import {forProfile, roleConfig} from "@/content/roles";
import {HERO_ART} from "@/content/shared/project-art";
import {profile} from "@/content/shared/profile";
import {resumeVersions} from "@/content/shared/resume";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {RoleSwitcher} from "@/components/layout/RoleSwitcher";
import {withBase} from "@/lib/base";
import profile320Avif from "@/assets/images/profile-320.avif?url";
import profile480Avif from "@/assets/images/profile-480.avif?url";
import profile640Avif from "@/assets/images/profile-640.avif?url";
import profile320Webp from "@/assets/images/profile-320.webp?url";
import profile480Webp from "@/assets/images/profile-480.webp?url";
import profile640Webp from "@/assets/images/profile-640.webp?url";

// The portrait fills about a third of the board, which is at most 34rem wide.
const PHOTO_SIZES = "(min-width: 1024px) 12rem, 34vw";

export function HeroSection() {
    const {lang, content} = useLanguage();
    const {role} = useRole();
    const {hero, ui} = content;
    const copy = () => hero.byProfile[role() ?? "general"];
    const cv = withBase(resumeVersions[0].files[lang]);
    let actions: HTMLDivElement | undefined;

    // The floating buttons take the bottom 9.5rem of a phone screen; while the hero's buttons sit there, the page flags
    // it and the floating buttons step aside (globals.css), so they never cover "Download CV" or "Contact me".
    onMount(() => {
        const element = actions;
        if (!element) return;
        const root = document.documentElement;
        let frame = 0;
        const update = () => {
            frame = 0;
            const {top, bottom} = element.getBoundingClientRect();
            root.toggleAttribute("data-hero-actions-covered", bottom > window.innerHeight - 152 && top < window.innerHeight);
        };
        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", schedule, {passive: true});
        window.addEventListener("resize", schedule);
        // The buttons also move without a scroll: when the web fonts arrive or the copy changes with the role view, the
        // text above them takes another height.
        const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(schedule);
        observer?.observe(element.closest("section") ?? element);
        void document.fonts?.ready.then(schedule);
        onCleanup(() => {
            cancelAnimationFrame(frame);
            observer?.disconnect();
            window.removeEventListener("scroll", schedule);
            window.removeEventListener("resize", schedule);
            root.removeAttribute("data-hero-actions-covered");
        });
    });

    return (
        <section id="home" aria-labelledby="hero-title" class="hero-backdrop pt-(--header-height)">
            <div
                class="container-page grid items-center gap-x-16 gap-y-12 pt-8 pb-16 md:pt-12 md:pb-24 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
                <div>
                    <p class="inline-flex items-center gap-2.5 rounded-full border border-border bg-bg px-3.5 py-1.5 text-sm text-fg-muted shadow-card">
                        <span aria-hidden="true" class="status-dot size-2 shrink-0 rounded-full bg-success"/>
                        {forProfile(hero.availability, role())}
                    </p>
                    {/* The name and the role read as one statement in two tones, the way a title card does. */}
                    <h1 id="hero-title"
                        class="mt-7 text-[clamp(2.625rem,1.4rem+3.6vw,4.75rem)] leading-[0.98] tracking-[-0.045em]">
                        <span class="block text-fg">{profile.name}</span>
                        <span class="mt-3 block text-[0.56em] leading-[1.08] tracking-[-0.035em] text-fg-subtle">{copy().title}</span>
                    </h1>
                    <p class="mt-7 max-w-xl text-xl leading-snug text-fg md:text-[1.375rem]">{copy().headline}</p>
                    <p class="mt-4 max-w-xl text-fg-muted">{copy().summary}</p>

                    <div ref={actions} class="mt-9 flex flex-wrap gap-3">
                        <a
                            href={cv}
                            download=""
                            class="inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-on-primary transition-colors hover:bg-primary-hover active:translate-y-px"
                        >
                            <Download class="size-5"/>
                            {ui.actions.downloadCv}
                        </a>
                        <a
                            href="#contact"
                            class="inline-flex h-12 items-center gap-2 rounded-full border border-border-strong px-6 font-semibold text-fg transition-colors hover:bg-surface-raised active:translate-y-px"
                        >
                            {ui.actions.contact}
                            <ArrowRight class="size-5"/>
                        </a>
                    </div>

                    <div class="mt-10">
                        <p class="sr-only">{hero.stackLabel}</p>
                        {/* The stack settles in chip by chip once the page opens (globals.css, hero-cascade). */}
                        <ul translate="no" class="hero-cascade flex flex-wrap gap-1.5">
                            <For each={roleConfig(role()).topStack}>
                                {(item, index) => (
                                    <li
                                        style={{"--i": String(index())}}
                                        class="rounded-full bg-surface-raised px-3 py-1 font-mono text-xs text-fg-muted">
                                        {item}
                                    </li>
                                )}
                            </For>
                        </ul>
                    </div>
                </div>

                <div class="grid gap-10">
                    {/* The board: the portrait sits in the socket at its middle and cables run from it to the devices of
                        the work (scripts/illustrations/hero.mjs). The portrait is the largest paint, so it is drawn at
                        once; the board around it is decoration. */}
                    <div class="hero-portrait hero-board relative mx-auto aspect-square w-full max-w-[34rem]">
                        <img
                            src={withBase(HERO_ART.file)}
                            alt=""
                            width={HERO_ART.width}
                            height={HERO_ART.height}
                            decoding="async"
                            class="absolute inset-0 size-full"
                        />
                        <picture>
                            <source
                                type="image/avif"
                                srcset={`${profile320Avif} 320w, ${profile480Avif} 480w, ${profile640Avif} 640w`}
                                sizes={PHOTO_SIZES}
                            />
                            <img
                                src={profile640Webp}
                                srcset={`${profile320Webp} 320w, ${profile480Webp} 480w, ${profile640Webp} 640w`}
                                sizes={PHOTO_SIZES}
                                alt={profile.name}
                                width={640}
                                height={640}
                                fetchpriority="high"
                                class="hero-socket absolute object-cover"
                            />
                        </picture>
                    </div>
                    <RoleSwitcher class="lg:mx-auto lg:w-full lg:max-w-[34rem]"/>
                </div>
            </div>
        </section>
    );
}
