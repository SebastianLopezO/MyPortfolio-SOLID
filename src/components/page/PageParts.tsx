import {createEffect, createSignal, For, type JSX, on, onCleanup, onMount, Show} from "solid-js";
import {ArrowLeft, ArrowRight, Check, ChevronRight, Copy} from "@/components/ui/icons";
import {useLanguage} from "@/context/language";
import {cn} from "@/lib/utils";
import {Link} from "@/routes/Router";

// The pieces the project pages and the job, program, certification and organization pages share: the sections of
// the article, the page index beside it and the links to the pages before and after.

export function TextSection(props: { id: string; title: string; children: JSX.Element }) {
    return (
        <section aria-labelledby={props.id} data-testid={`section-${props.id}`} class="section-enter border-t border-border pt-10">
            <h2 id={props.id} data-testid={`section-title-${props.id}`} class="text-heading text-fg">{props.title}</h2>
            <div class="mt-6">{props.children}</div>
        </section>
    );
}

export function Bullets(props: { items: string[] }) {
    return (
        <ul class="space-y-3 text-fg-muted">
            <For each={props.items}>
                {(item) => (
                    <li class="flex gap-3">
                        <span aria-hidden="true" class="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary"/>
                        {item}
                    </li>
                )}
            </For>
        </ul>
    );
}

/** The section being read: the last of the page's headings that has passed the top third of the window. */
function useActiveSection(ids: () => string[]) {
    const [active, setActive] = createSignal<string | null>(null);
    onMount(() => {
        createEffect(on(() => ids().join(" "), (key) => {
            const headings = key.split(" ").map((id) => document.getElementById(id)).filter((heading) => heading !== null);
            let frame = 0;
            const update = () => {
                cancelAnimationFrame(frame);
                frame = requestAnimationFrame(() => {
                    // Short sections at the end never reach the top third, so the bottom of the page marks the last one.
                    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
                    const passed = headings.filter((heading) => heading.getBoundingClientRect().top <= window.innerHeight / 3);
                    setActive((bottom && passed.length > 0 ? headings : passed).at(-1)?.id ?? null);
                });
            };
            update();
            window.addEventListener("scroll", update, {passive: true});
            window.addEventListener("resize", update);
            onCleanup(() => {
                cancelAnimationFrame(frame);
                window.removeEventListener("scroll", update);
                window.removeEventListener("resize", update);
            });
        }));
    });
    return active;
}

/**
 * The sections of the page. From 80rem it sits beside the text and marks the section being read; on narrower screens it
 * folds into a menu above the article that closes once a section is picked, and opens without JavaScript too.
 */
export function PageIndex(props: { label: string; sections: { id: string; title: string }[] }) {
    const active = useActiveSection(() => props.sections.map((section) => section.id));
    const [open, setOpen] = createSignal(false);
    const links = (onPick?: () => void) => (
        <ul class="mt-3 space-y-1 border-l border-border text-sm">
            <For each={props.sections}>
                {(section) => (
                    <li>
                        <a href={`#${section.id}`} aria-current={active() === section.id ? "location" : undefined}
                           onClick={() => onPick?.()}
                           class={cn(
                               "-ml-px block border-l py-1.5 pl-4 hover:border-primary hover:text-primary",
                               active() === section.id ? "border-primary text-fg" : "border-transparent text-fg-muted",
                           )}>
                            {section.title}
                        </a>
                    </li>
                )}
            </For>
        </ul>
    );
    return (
        <>
            <details open={open()} onToggle={(event) => setOpen(event.currentTarget.open)}
                     data-testid="page-index-mobile"
                     class="mt-8 rounded-lg border border-border bg-surface xl:hidden">
                <summary
                    data-testid="page-index-summary"
                    class="cursor-pointer px-4 py-3 font-mono text-xs text-fg-subtle">{props.label}</summary>
                <nav aria-label={props.label} class="px-4 pb-4">{links(() => setOpen(false))}</nav>
            </details>
            <nav aria-label={props.label} data-testid="page-index-desktop" class="sticky top-24 mt-10 hidden xl:block">
                <p class="font-mono text-xs text-fg-subtle">{props.label}</p>
                {links()}
            </nav>
        </>
    );
}

/** Copies with the selection command, for browsers without the clipboard API or with its permission denied. */
const copyBySelection = (text: string) => {
    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.className = "fixed opacity-0";
    document.body.append(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    return copied;
};

/** Copies the page's address, role view included, and says for a moment whether it worked. */
export function CopyLink() {
    const {content: {ui}} = useLanguage();
    const [result, setResult] = createSignal<"copied" | "failed" | null>(null);
    createEffect(on(result, (current) => {
        if (!current) return;
        const timer = window.setTimeout(() => setResult(null), 2500);
        onCleanup(() => window.clearTimeout(timer));
    }, {defer: true}));
    const copy = async () => {
        const url = window.location.href;
        try {
            await navigator.clipboard.writeText(url);
            setResult("copied");
        } catch {
            setResult(copyBySelection(url) ? "copied" : "failed");
        }
    };
    const label = () => {
        const current = result();
        return current ? ui.copyLink[current] : ui.copyLink.copy;
    };
    return (
        <button type="button" data-testid="copy-link-button" onClick={copy}
                class="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border px-3 text-sm font-semibold text-fg-muted hover:border-primary hover:text-primary">
            <Show when={result() === "copied"} fallback={<Copy class="size-4"/>}>
                <Check class="size-4"/>
            </Show>
            <span aria-live="polite" data-testid="copy-link-status">{label()}</span>
        </button>
    );
}

/** The breadcrumb trail of a project or detail page, with the copy link button at its end. */
export function PageTrail(props: { label: string; items: Crumb[] }) {
    return (
        <div data-testid="page-trail" class="flex flex-wrap items-center justify-between gap-3">
            <Breadcrumbs label={props.label} items={props.items}/>
            <CopyLink/>
        </div>
    );
}

export interface Crumb {
    label: string;
    to?: string;
}

/**
 * Where the page sits: the profile, the collection and the page itself, which is not a link. It opens every project
 * and detail page, so its id is what those pages wait for before their first paint (layouts/Page.astro).
 */
export function Breadcrumbs(props: { label: string; items: Crumb[] }) {
    return (
        <nav aria-label={props.label} id="trail" data-testid="breadcrumbs">
            <ol class="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm">
                <For each={props.items}>
                    {(item, index) => (
                        <li class="inline-flex min-w-0 items-center gap-1.5">
                            <Show when={index() > 0}>
                                <ChevronRight class="size-3.5 shrink-0 text-fg-subtle"/>
                            </Show>
                            <Show when={item.to} fallback={
                                <span aria-current="page"
                                      data-testid="breadcrumb-current"
                                      class="text-fg-muted [overflow-wrap:anywhere]">{item.label}</span>
                            }>
                                {(to) => (
                                    <Link to={to()}
                                          data-testid={`breadcrumb-link-${index()}`}
                                          class="inline-flex min-h-9 items-center font-semibold text-primary hover:text-primary-hover">
                                        {item.label}
                                    </Link>
                                )}
                            </Show>
                        </li>
                    )}
                </For>
            </ol>
        </nav>
    );
}

export interface NeighborLink {
    to: string;
    label: string;
}

/** The pages before and after this one in its list, and the way back to the whole list. */
export function NeighborNavigation(props: {
    label: string;
    previous: NeighborLink;
    next: NeighborLink;
    previousLabel: string;
    nextLabel: string;
    all: NeighborLink;
}) {
    const card = "section-enter group flex min-h-20 flex-col justify-center rounded-lg border border-border bg-surface p-4 hover:border-primary";
    return (
        <nav aria-label={props.label} data-testid="neighbor-nav" class="mt-16 border-t border-border pt-8">
            <div class="grid gap-4 sm:grid-cols-2">
                <Link to={props.previous.to} data-testid="neighbor-previous" class={card}>
                    <span class="inline-flex items-center gap-1.5 text-sm text-fg-subtle">
                        <ArrowLeft class="size-4"/>
                        {props.previousLabel}
                    </span>
                    <span class="mt-1 font-semibold text-fg group-hover:text-primary">{props.previous.label}</span>
                </Link>
                <Link to={props.next.to} data-testid="neighbor-next" class={cn(card, "sm:items-end sm:text-right")}>
                    <span class="inline-flex items-center gap-1.5 text-sm text-fg-subtle">
                        {props.nextLabel}
                        <ArrowRight class="size-4"/>
                    </span>
                    <span class="mt-1 font-semibold text-fg group-hover:text-primary">{props.next.label}</span>
                </Link>
            </div>
            <Link to={props.all.to}
                  data-testid="neighbor-all"
                  class="mt-6 inline-flex min-h-9 items-center gap-1.5 font-semibold text-primary hover:text-primary-hover">
                <ArrowLeft class="size-4"/>
                {props.all.label}
            </Link>
        </nav>
    );
}

/** Index rows that link to other pages: a small label, the name and a line under it. */
export function LinkRows(props: {
    items: { key: string; to: string; label?: string; name: string; text?: string; external?: boolean }[]
}) {
    return (
        <ul class="divide-y divide-border rounded-lg border border-border bg-surface">
            <For each={props.items}>
                {(item) => (
                    <li>
                        <Link to={item.to} class="group flex items-start gap-4 p-4 hover:bg-surface-raised">
                            <div class="min-w-0 flex-1">
                                <Show when={item.label}>
                                    <p class="font-mono text-xs text-fg-subtle">{item.label}</p>
                                </Show>
                                <p class="font-semibold text-fg group-hover:text-primary">{item.name}</p>
                                <Show when={item.text}>
                                    <p class="mt-1 max-w-[68ch] text-sm text-fg-muted">{item.text}</p>
                                </Show>
                            </div>
                            <ArrowRight class="mt-1 size-4 shrink-0 text-fg-subtle group-hover:text-primary"/>
                        </Link>
                    </li>
                )}
            </For>
        </ul>
    );
}
