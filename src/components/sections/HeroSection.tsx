import {For, onCleanup, onMount} from "solid-js";
import {ArrowRight, Download} from "@/components/ui/icons";
import {forProfile, roleConfig} from "@/content/roles";
import {profile} from "@/content/shared/profile";
import {resumeVersions} from "@/content/shared/resume";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {RoleSwitcher} from "@/components/layout/RoleSwitcher";
import profile320Avif from "@/assets/images/profile-320.avif?url";
import profile480Avif from "@/assets/images/profile-480.avif?url";
import profile640Avif from "@/assets/images/profile-640.avif?url";
import profile320Webp from "@/assets/images/profile-320.webp?url";
import profile480Webp from "@/assets/images/profile-480.webp?url";
import profile640Webp from "@/assets/images/profile-640.webp?url";

const PHOTO_SIZES = "(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 16rem";

export function HeroSection() {
    const {lang, content} = useLanguage();
    const {role} = useRole();
    const {hero, ui} = content;
    const copy = () => hero.byProfile[role() ?? "general"];
    const cv = resumeVersions[0].files[lang];
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
            {/* Availability, name, role, pitch and the two actions fit in the first 900px of a 1440px screen. */}
            {/* From 64rem the role switcher moves under the photo, into the space the photo column leaves empty. */}
            <div
                class="container-page grid items-start gap-x-12 gap-y-10 py-12 md:py-20 lg:grid-cols-[1.4fr_1fr] lg:grid-rows-[auto_1fr]">
                <div class="lg:row-span-2">
                    <p class="inline-flex items-center gap-2 rounded-full border border-success/40 bg-success/10 px-3 py-1 text-sm text-success">
                        <span aria-hidden="true" class="size-2 shrink-0 rounded-full bg-success"/>
                        {forProfile(hero.availability, role())}
                    </p>
                    <h1 id="hero-title" class="mt-6">
                        <span class="block text-display text-fg">{profile.name}</span>
                        <span class="mt-3 block text-heading text-gradient">{copy().title}</span>
                    </h1>
                    <p class="mt-6 max-w-2xl text-xl text-fg">{copy().headline}</p>
                    <p class="mt-4 max-w-2xl text-fg-muted">{copy().summary}</p>

                    <div ref={actions} class="mt-8 flex flex-wrap gap-3">
                        <a
                            href={cv}
                            download=""
                            class="inline-flex h-12 items-center gap-2 rounded-md bg-primary px-6 font-semibold text-on-primary transition-colors hover:bg-primary-hover active:translate-y-px"
                        >
                            <Download class="size-5"/>
                            {ui.actions.downloadCv}
                        </a>
                        <a
                            href="#contact"
                            class="inline-flex h-12 items-center gap-2 rounded-md border border-border-strong px-6 font-semibold text-fg transition-colors hover:border-primary hover:text-primary active:translate-y-px"
                        >
                            {ui.actions.contact}
                            <ArrowRight class="size-5"/>
                        </a>
                    </div>

                    <div class="mt-8">
                        <p class="sr-only">{hero.stackLabel}</p>
                        <ul translate="no" class="flex flex-wrap gap-2">
                            <For each={roleConfig(role()).topStack}>
                                {(item) => (
                                    <li
                                        class="rounded-md border border-border bg-surface px-3 py-1 font-mono text-sm text-fg-muted">
                                        {item}
                                    </li>
                                )}
                            </For>
                        </ul>
                    </div>

                </div>

                <div class="relative mx-auto w-64 sm:w-80 lg:mt-6 lg:w-full lg:max-w-sm">
                    <div class="hex-frame relative aspect-square bg-linear-to-br from-primary to-emerald-500 p-1.5">
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
                                class="hex-frame size-full object-cover"
                            />
                        </picture>
                    </div>
                </div>

                <RoleSwitcher class="lg:mx-auto lg:w-full lg:max-w-sm"/>
            </div>
        </section>
    );
}
