import {createEffect, createMemo, createSignal, For, onCleanup, onMount} from "solid-js";
import {SKILL_SLUG} from "@/content/shared/detail-links";
import {SKILL_ART} from "@/content/shared/skill-art";
import {skillGroups} from "@/content/shared/skills";
import {forProfile} from "@/content/roles";
import {useSectionCopy} from "@/content/sections";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {Section} from "@/components/layout/Section";
import {ArrowRight, ChevronLeft, ChevronRight, Pause, Play} from "@/components/ui/icons";
import {withBase} from "@/lib/base";
import {buildDetailPath} from "@/lib/paths";
import {orderSkillGroups} from "@/lib/role-view";
import {Link} from "@/routes/Router";

/** How long each card faces the reader, its turn included (globals.css, .skill-ring, turns in 1.1 s). */
const STEP_MS = 3600;

/** A horizontal swipe longer than this turns the gallery; a shorter one is a tap. */
const SWIPE_PX = 40;

/** The round buttons of the other sliders (components/ui/Carousel.tsx). */
const BUTTON = "grid size-11 place-items-center rounded-full border border-border-strong text-fg transition-colors hover:bg-surface-raised active:translate-y-px";

/** A number as the gallery writes it, with two digits. */
const ordinal = (index: number) => String(index + 1).padStart(2, "0");

const fill = (template: string, values: Record<string, string | number>) =>
    template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));

/**
 * Every group of tools as a card on a ring that turns, one card at a time, while the section is in view. Each card is a
 * link to the group's page, which tells its focus, what it is good for and where it shows. The ring is CSS
 * (globals.css, skill-stage): the script only counts turns, and the prerendered page shows it at rest.
 *
 * It stops while the pointer rests on it, while anything inside it has the focus, while it is off screen and when the
 * reader pauses it, and a reader who asks for less motion gets it paused. The focus on the pause button does not hold
 * it, so pressing it to resume resumes at once. Tabbing to a card, clicking one at the side or swiping brings that card
 * to the front; the buttons come first so a keyboard reaches them before the cards.
 */
export function SkillsSection() {
    const skills = useSectionCopy("skills");
    const {lang} = useLanguage();
    const {role, locked} = useRole();
    const ordered = createMemo(() => orderSkillGroups(skillGroups, role()));
    const count = () => ordered().length;
    // The turns since the start, unbounded, so the ring always turns the short way and never spins back.
    const [turn, setTurn] = createSignal(0);
    const [paused, setPaused] = createSignal(false);
    const [hovered, setHovered] = createSignal(false);
    const [focused, setFocused] = createSignal(false);
    const [inView, setInView] = createSignal(false);
    const [shown, setShown] = createSignal(true);
    const [status, setStatus] = createSignal("");
    const active = () => ((turn() % count()) + count()) % count();
    /** How many places a card is from the front, negative to the left. */
    const offset = (index: number) => {
        const steps = (((index - active()) % count()) + count()) % count();
        return steps > count() / 2 ? steps - count() : steps;
    };
    const page = (slug: string | null = null) => buildDetailPath(lang, "skills", {slug, locked: locked()});
    const announce = () => {
        const group = ordered()[active()];
        setStatus(`${skills.groups[group.id]}, ${fill(skills.gallery.slide, {index: active() + 1, count: count()})}`);
    };
    const move = (steps: number) => {
        setTurn((value) => value + steps);
        announce();
    };
    let root: HTMLDivElement | undefined;
    let toggle: HTMLButtonElement | undefined;
    let swiped = false;
    let start: { x: number; y: number } | null = null;

    onMount(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPaused(true);
        const visibility = () => setShown(document.visibilityState === "visible");
        document.addEventListener("visibilitychange", visibility);
        const observer = typeof IntersectionObserver === "undefined"
            ? null
            : new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {threshold: 0.35});
        if (observer && root) observer.observe(root);
        else setInView(true);
        onCleanup(() => {
            observer?.disconnect();
            document.removeEventListener("visibilitychange", visibility);
        });
    });

    // One timer at a time: each turn, and each change of what holds the ring, starts it again.
    createEffect(() => {
        turn();
        if (paused() || hovered() || focused() || !inView() || !shown()) return;
        const timer = setTimeout(() => setTurn((value) => value + 1), STEP_MS);
        onCleanup(() => clearTimeout(timer));
    });

    const onPointerDown = (event: PointerEvent) => {
        start = event.isPrimary ? {x: event.clientX, y: event.clientY} : null;
    };
    const onPointerUp = (event: PointerEvent) => {
        if (!start) return;
        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        start = null;
        if (Math.abs(dx) < SWIPE_PX || Math.abs(dx) < Math.abs(dy)) return;
        // The click that ends a swipe over a card must not open it.
        swiped = true;
        setTimeout(() => (swiped = false));
        move(dx < 0 ? 1 : -1);
    };

    return (
        <Section id="skills" title={skills.title} subtitle={forProfile(skills.subtitle, role())}>
            <div
                ref={root}
                role="region"
                aria-roledescription="carousel"
                aria-label={skills.gallery.label}
                onFocusIn={(event) => setFocused(event.target !== toggle)}
                onFocusOut={(event) => {
                    if (!root?.contains(event.relatedTarget as Node | null)) setFocused(false);
                }}
            >
                <div class="flex items-center justify-between gap-4">
                    <p aria-hidden="true" class="min-w-0 truncate font-mono text-sm text-fg-muted tabular-nums">
                        <span class="text-fg">{ordinal(active())}</span> / {String(count()).padStart(2, "0")}
                        <span class="ml-3 hidden text-fg-subtle sm:inline">{skills.groups[ordered()[active()].id]}</span>
                    </p>
                    <div class="flex shrink-0 items-center gap-2">
                        <button type="button" aria-label={skills.gallery.previous} onClick={() => move(-1)}
                                class={BUTTON}>
                            <ChevronLeft class="size-5"/>
                        </button>
                        {/* Its name says what it does next, so it carries no pressed state. */}
                        <button ref={toggle} type="button"
                                aria-label={paused() ? skills.gallery.play : skills.gallery.pause}
                                onClick={() => setPaused((value) => !value)} class={BUTTON}>
                            {paused() ? <Play class="size-4"/> : <Pause class="size-4"/>}
                        </button>
                        <button type="button" aria-label={skills.gallery.next} onClick={() => move(1)}
                                class={BUTTON}>
                            <ChevronRight class="size-5"/>
                        </button>
                    </div>
                </div>

                <div
                    class="skill-stage relative mt-6 touch-pan-y overflow-clip py-4"
                    style={{"--count": String(count())}}
                    onPointerEnter={(event) => event.pointerType === "mouse" && setHovered(true)}
                    onPointerLeave={() => setHovered(false)}
                    onPointerDown={onPointerDown}
                    onPointerUp={onPointerUp}
                    onPointerCancel={() => (start = null)}
                >
                    <div class="skill-ring relative mx-auto h-full" style={{"--turn": String(turn())}}>
                        <For each={ordered()}>{(group, index) => {
                            const distance = () => Math.abs(offset(index()));
                            return (
                                <div
                                    role="group"
                                    aria-roledescription="slide"
                                    aria-label={fill(skills.gallery.slide, {index: index() + 1, count: count()})}
                                    class="skill-card absolute inset-0"
                                    style={{"--i": String(index()), "--d": String(distance())}}
                                    data-active={distance() === 0 ? "true" : undefined}
                                    data-edge={distance() === 2 ? "" : undefined}
                                    data-far={distance() > 2 ? "" : undefined}
                                    aria-hidden={distance() > 2 ? "true" : undefined}
                                >
                                    <a
                                        href={withBase(page(SKILL_SLUG[group.id]))}
                                        draggable={false}
                                        tabindex={distance() > 2 ? -1 : undefined}
                                        class="art-row flex h-full flex-col rounded-2xl border border-border bg-surface p-4 transition-colors hover:border-border-strong"
                                        onFocus={(event) => {
                                            // The keyboard brings a card to the front; a click decides below.
                                            if (event.currentTarget.matches(":focus-visible")) setTurn((value) => value + offset(index()));
                                        }}
                                        onClick={(event) => {
                                            if (swiped) event.preventDefault();
                                            // A click on a card at the side turns it to the front; one at the front, or
                                            // from the keyboard or a screen reader (detail 0), opens its page.
                                            else if (event.detail > 0 && offset(index()) !== 0) {
                                                event.preventDefault();
                                                move(offset(index()));
                                            }
                                        }}
                                    >
                                        <span aria-hidden="true"
                                              class="grid aspect-[4/3] shrink-0 place-items-center rounded-xl"
                                              style={{background: `var(--color-tile-${SKILL_ART[group.id].tile})`}}>
                                            <img src={withBase(SKILL_ART[group.id].file)} alt="" width={96}
                                                 height={96} loading="lazy" decoding="async" draggable={false}
                                                 class="art-row-icon size-20"/>
                                        </span>
                                        <span class="mt-3.5 font-mono text-xs text-fg-subtle">
                                            {skills.count.replace("{count}", String(group.items.length))}
                                        </span>
                                        <h3 class="mt-1 text-base leading-snug font-semibold text-fg sm:text-lg">{skills.groups[group.id]}</h3>
                                        <p class="mt-1 text-sm text-fg-muted">{skills.taglines[group.id]}</p>
                                        <span class="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-semibold text-fg">
                                            {skills.gallery.open}
                                            <ArrowRight class="art-row-arrow size-4"/>
                                        </span>
                                    </a>
                                </div>
                            );
                        }}</For>
                    </div>
                </div>

                <p role="status" class="sr-only">{status()}</p>
            </div>

            <Link to={page()}
                  class="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full border border-border-strong px-5 text-sm font-semibold text-fg transition-colors hover:bg-surface-raised">
                {fill(skills.all, {count: count()})}
                <ArrowRight class="size-4"/>
            </Link>
        </Section>
    );
}
