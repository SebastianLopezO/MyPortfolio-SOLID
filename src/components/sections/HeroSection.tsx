import {createSignal, For, onCleanup, onMount} from "solid-js";
import {ArrowRight, Download} from "@/components/ui/icons";
import {HERO_ART, HERO_SPOTS} from "@/content/shared/project-art";
import {PROJECT_SLUG} from "@/content/shared/project-links";
import {profile} from "@/content/shared/profile";
import {resumeVersions} from "@/content/shared/resume";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {withBase} from "@/lib/base";
import {buildProjectPath} from "@/lib/paths";
import {Link} from "@/routes/Router";
import profile480Avif from "@/assets/images/profile-480.avif?url";
import profile640Avif from "@/assets/images/profile-640.avif?url";
import profile480Webp from "@/assets/images/profile-480.webp?url";
import profile640Webp from "@/assets/images/profile-640.webp?url";

// Kept at the portrait's full measure so 1x and 1.25x screens load at least the 480px variant instead of a soft thumbnail.
const PHOTO_SIZES = "(min-width: 1024px) 24rem, (min-width: 640px) 20rem, 16rem";

export function HeroSection() {
    const {lang, content} = useLanguage();
    const {role, locked} = useRole();
    const {hero, ui} = content;
    const copy = () => hero.byProfile[role() ?? "general"];
    const cv = withBase(resumeVersions[0].files[lang]);
    let actions: HTMLDivElement | undefined;
    // Escape puts away a device's label without moving the pointer or the focus (WCAG 1.4.13); the next device the
    // pointer or the focus reaches shows its own again.
    const [quiet, setQuiet] = createSignal(false);

    onMount(() => {
        const dismiss = (event: KeyboardEvent) => {
            if (event.key === "Escape") setQuiet(true);
        };
        document.addEventListener("keydown", dismiss);
        onCleanup(() => document.removeEventListener("keydown", dismiss));
    });

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
                class="container-page grid items-center gap-x-12 gap-y-8 pt-8 pb-12 md:py-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:py-8 xl:gap-x-16">
                <div class="hero-copy">
                    {/* The name and the role read as one statement in two tones, the way a title card does. */}
                    <h1 id="hero-title"
                        class="text-display tracking-tight">
                        <span class="block text-fg">{profile.name}</span>
                        <span
                            class="mt-2.5 block text-[0.56em] leading-tight tracking-tight text-fg-subtle">{copy().title}</span>
                    </h1>
                    <p class="mt-5 max-w-xl text-lg leading-snug text-fg md:text-xl">{copy().headline}</p>
                    <p class="mt-3 max-w-xl text-sm leading-relaxed text-fg-muted sm:text-base">{copy().summary}</p>

                    <div ref={actions} class="mt-6 flex flex-wrap gap-3 md:mt-8">
                        <a
                            href={cv}
                            download=""
                            class="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-on-primary transition-colors hover:bg-primary-hover active:translate-y-px sm:text-base"
                        >
                            <Download class="size-5"/>
                            {ui.actions.downloadCv}
                        </a>
                        <a
                            href="#contact"
                            class="inline-flex h-11 items-center gap-2 rounded-full border border-border-strong px-5 text-sm font-semibold text-fg transition-colors hover:bg-surface-raised active:translate-y-px sm:text-base"
                        >
                            {ui.actions.contact}
                            <ArrowRight class="size-5"/>
                        </a>
                    </div>
                </div>

                {/* The board: the portrait sits in the socket at its middle and cables run from it to the devices of
                    the work (scripts/illustrations/hero.mjs). The portrait is the largest paint, so it is drawn at
                    once; the drawing around it is decoration, and the links over its devices carry its meaning. The
                    role views have no switcher: each one is reached by its address (/en/backend, /es/data...). */}
                <div class="hero-portrait hero-board relative mx-auto aspect-square w-full max-w-xs sm:max-w-sm lg:max-w-lg">
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
                            srcset={`${profile480Avif} 480w, ${profile640Avif} 640w`}
                            sizes={PHOTO_SIZES}
                        />
                        <img
                            src={profile640Webp}
                            srcset={`${profile480Webp} 480w, ${profile640Webp} 640w`}
                            sizes={PHOTO_SIZES}
                            alt={profile.name}
                            width={640}
                            height={640}
                            fetchpriority="high"
                            style={{
                                left: `${HERO_ART.portrait.left}%`,
                                top: `${HERO_ART.portrait.top}%`,
                                width: `${HERO_ART.portrait.width}%`,
                                height: `${HERO_ART.portrait.height}%`,
                                "border-radius": `${HERO_ART.portrait.radius}%`,
                            }}
                            class="hero-socket absolute object-cover"
                        />
                    </picture>
                    {/* Each device links to the project it stands for. A pointer resting on it, or the keyboard
                        reaching it, brings up the project's name and a line about it (globals.css, board-spot);
                        the box each link covers comes from the drawing itself (HERO_SPOTS). */}
                    <ul
                        aria-label={hero.board.label}
                        class="board-spots"
                        data-quiet={quiet() ? "" : undefined}
                        onPointerLeave={() => setQuiet(false)}
                        onFocusIn={() => setQuiet(false)}
                    >
                        <For each={HERO_SPOTS}>
                            {(spot) => {
                                const device = hero.board.devices[spot.id];
                                const id = `hero-device-${spot.id}`;
                                return (
                                    <li
                                        style={{
                                            left: `${spot.left}%`,
                                            top: `${spot.top}%`,
                                            width: `${spot.width}%`,
                                            height: `${spot.height}%`,
                                        }}
                                        data-side={spot.left + spot.width / 2 < 50 ? "start" : "end"}
                                        data-tip={spot.top + spot.height / 2 < 60 ? "below" : "above"}
                                        onPointerEnter={() => setQuiet(false)}
                                    >
                                        <Link
                                            to={buildProjectPath(lang, {slug: PROJECT_SLUG[spot.id], locked: locked()})}
                                            class="board-spot"
                                            aria-labelledby={`${id}-name`}
                                            aria-describedby={`${id}-note`}
                                        >
                                            <span class="board-tip">
                                                <span id={`${id}-name`}
                                                      class="flex items-center gap-1.5 font-semibold text-fg">
                                                    {device.name}
                                                    <ArrowRight class="size-4 shrink-0"/>
                                                </span>
                                                <span id={`${id}-note`}
                                                      class="mt-1 block text-fg-muted">{device.note}</span>
                                            </span>
                                        </Link>
                                    </li>
                                );
                            }}
                        </For>
                    </ul>
                </div>
            </div>
        </section>
    );
}
