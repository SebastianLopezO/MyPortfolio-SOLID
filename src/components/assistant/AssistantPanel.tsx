import {createEffect, createMemo, createSignal, createUniqueId, For, Match, on, onMount, Show, Switch} from "solid-js";
import {ArrowUpRight, ChevronDown, Download, SendHorizontal, X} from "@/components/ui/icons";
import {useRole} from "@/context/role";
import {Input} from "@/components/ui/input";
import {createAssistant} from "@/lib/assistant/answer";
import {withBase} from "@/lib/base";
import {parsePath} from "@/lib/paths";
import {cn} from "@/lib/utils";
import {Link} from "@/routes/Router";
import {useLocation} from "@/routes/router-context";
import type {Answer, AnswerLink, AssistantCopy} from "@/types/assistant";
import type {CaseStudyCopy, CaseStudyId} from "@/types/case-study";
import type {Content} from "@/types/content";
import type {DetailPagesCopy} from "@/types/detail";

interface Message {
    id: number;
    from: "user" | "assistant";
    text: string;
    answer?: Answer;
}

const MAX_LENGTH = 200;
/** Chips shown under the conversation; the rest of the questions live in the catalog. */
const MAX_SUGGESTIONS = 4;

const CHIP_CLASS =
    "min-h-9 rounded-full border border-border bg-surface px-3 text-left text-sm text-fg-muted transition-colors hover:border-primary hover:text-primary";

const LINK_CLASS =
    "inline-flex min-h-9 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-sm text-fg-muted transition-colors hover:border-primary hover:text-primary";

export interface AssistantPanelProps {
    onClose: () => void;
    content: Content;
    copy: AssistantCopy;
    cases: Record<CaseStudyId, CaseStudyCopy>;
    details: DetailPagesCopy;
}

export default function AssistantPanel(props: AssistantPanelProps) {
    const {role, locked, pathFor} = useRole();
    const location = useLocation();
    // The launcher loads the copy before it opens the panel, so it is fixed for the panel's life.
    // eslint-disable-next-line solid/reactivity
    const {content, copy, cases, details} = props;
    const ask = createAssistant(content, copy, cases, details);
    // Section links point at the profile page; away from it, they open the profile at that section.
    const onProfile = () => parsePath(location().pathname) !== null;
    const catalogId = createUniqueId();
    const [catalogOpen, setCatalogOpen] = createSignal(false);
    let dialog: HTMLDialogElement | undefined;
    let input: HTMLInputElement | undefined;
    let end: HTMLDivElement | undefined;
    let nextId = 1;
    const [query, setQuery] = createSignal("");
    const [messages, setMessages] = createSignal<Message[]>([{id: 0, from: "assistant", text: copy.welcome}]);

    onMount(() => {
        if (!dialog || dialog.open) return;
        dialog.showModal();
        if (window.matchMedia("(pointer: fine)").matches) input?.focus();
    });

    createEffect(on(messages, () => end?.scrollIntoView({block: "end"})));

    const close = () => dialog?.close();

    const send = (text: string) => {
        const question = text.trim().slice(0, MAX_LENGTH);
        if (!question) return;
        const answer = ask(question, {role: role(), locked: locked()});
        const id = nextId;
        nextId += 2;
        setMessages((current) => [
            ...current,
            {id, from: "user", text: question},
            {id: id + 1, from: "assistant", text: answer.text, answer},
        ]);
        setQuery("");
        setCatalogOpen(false);
    };

    const submit = (event: SubmitEvent) => {
        event.preventDefault();
        send(query());
    };

    const AnswerLinkView = (linkProps: { link: AnswerLink }) => (
        <Switch fallback={
            <Show when={onProfile()} fallback={
                <Link to={pathFor(role(), linkProps.link.href.slice(1))} onClick={close} class={LINK_CLASS}>
                    {linkProps.link.label}
                </Link>
            }>
                <a href={linkProps.link.href} onClick={close} class={LINK_CLASS}>
                    {linkProps.link.label}
                </a>
            </Show>
        }>
            <Match when={linkProps.link.kind === "route"}>
                <Link to={linkProps.link.href} onClick={close} class={LINK_CLASS}>
                    {linkProps.link.label}
                </Link>
            </Match>
            <Match when={linkProps.link.kind === "download"}>
                <a href={withBase(linkProps.link.href)} download="" class={LINK_CLASS}>
                    <Download class="size-4"/>
                    {linkProps.link.label}
                </a>
            </Match>
            <Match when={linkProps.link.kind === "external"}>
                <a href={linkProps.link.href} target="_blank" rel="noopener noreferrer" class={LINK_CLASS}>
                    {linkProps.link.label}
                    <ArrowUpRight class="size-4"/>
                </a>
            </Match>
        </Switch>
    );

    const offered = createMemo(() => {
        const all = messages();
        const asked = new Set(all.filter((message) => message.from === "user").map((message) => message.text));
        const lastAnswer = [...all].reverse().find((message) => message.answer)?.answer;
        return [...(lastAnswer?.followUps ?? []), ...copy.suggestions[role() ?? "general"]]
            .filter((question, index, list) => !asked.has(question) && list.indexOf(question) === index)
            .slice(0, MAX_SUGGESTIONS);
    });

    return (
        <dialog
            ref={dialog}
            data-testid="assistant-dialog"
            aria-labelledby="assistant-title"
            onClose={() => props.onClose()}
            onClick={(event) => event.target === event.currentTarget && close()}
            class="fixed inset-0 m-0 ml-auto h-dvh max-h-none w-full max-w-none border-border bg-surface p-0 text-fg shadow-card backdrop:bg-bg/70 sm:max-w-md sm:border-l"
        >
            <div class="flex h-full flex-col">
                <header class="flex items-start justify-between gap-4 border-b border-border px-5 py-4">
                    <div>
                        <h2 id="assistant-title" data-testid="assistant-title" class="font-display text-title">{copy.title}</h2>
                        <p data-testid="assistant-subtitle" class="mt-1 text-sm text-fg-subtle">{copy.subtitle}</p>
                    </div>
                    <button
                        type="button"
                        data-testid="assistant-close"
                        onClick={close}
                        aria-label={copy.close}
                        class="grid size-10 shrink-0 place-items-center rounded-md text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg"
                    >
                        <X class="size-5"/>
                    </button>
                </header>

                <div role="log" aria-live="polite" aria-labelledby="assistant-title" data-testid="assistant-log"
                     class="flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-5">
                    <For each={messages()}>{(message) => (
                        <div
                            data-testid={`assistant-message-${message.from}`}
                            class={message.from === "user" ? "flex justify-end" : "flex justify-start"}>
                            <div
                                class={
                                    message.from === "user"
                                        ? "max-w-[85%] rounded-lg rounded-br-sm bg-primary px-4 py-2.5 text-on-primary"
                                        : "max-w-[92%] rounded-lg rounded-bl-sm border border-border bg-surface-raised px-4 py-3"
                                }
                            >
                                <p class="sr-only">{message.from === "user" ? copy.you : copy.assistant}:</p>
                                <p data-testid="assistant-message-text" class="leading-relaxed">{message.text}</p>
                                <Show when={message.answer && message.answer.details.length > 0}>
                                    <ul data-testid="assistant-answer-details" class="mt-3 list-disc space-y-1.5 ps-5 text-sm text-fg-muted">
                                        <For each={message.answer!.details}>{(detail) => <li>{detail}</li>}</For>
                                    </ul>
                                </Show>
                                <Show when={message.answer && message.answer.links.length > 0}>
                                    <ul data-testid="assistant-answer-links" class="mt-3 flex flex-wrap gap-2">
                                        <For each={message.answer!.links}>{(link) => <li><AnswerLinkView link={link}/>
                                        </li>}</For>
                                    </ul>
                                </Show>
                            </div>
                        </div>
                    )}</For>
                    <div ref={end}/>
                </div>

                <div class="border-t border-border px-5 pt-3">
                    {/* Every question the assistant knows, by topic; it opens above the suggestions and scrolls on its own. */}
                    <Show when={catalogOpen()}>
                        <div id={catalogId} data-testid="assistant-catalog"
                             class="mb-3 max-h-[40dvh] space-y-4 overflow-y-auto overscroll-contain border-b border-border pb-3">
                            <For each={copy.catalog.groups}>{(group) => (
                                <section aria-label={group.title} data-testid="assistant-catalog-group">
                                    <h3 class="font-mono text-xs text-fg-subtle">{group.title}</h3>
                                    <ul class="mt-2 flex flex-wrap gap-2">
                                        <For each={group.questions}>{(question) => (
                                            <li>
                                                <button type="button" data-testid="assistant-catalog-question" onClick={() => send(question)}
                                                        class={CHIP_CLASS}>
                                                    {question}
                                                </button>
                                            </li>
                                        )}</For>
                                    </ul>
                                </section>
                            )}</For>
                        </div>
                    </Show>
                    <div class="mb-2 flex items-center justify-between gap-3">
                        <p id="assistant-suggestions"
                           class="font-mono text-xs text-fg-subtle">
                            {copy.suggestionsLabel}
                        </p>
                        <button
                            type="button"
                            data-testid="assistant-catalog-toggle"
                            aria-expanded={catalogOpen()}
                            aria-controls={catalogId}
                            onClick={() => setCatalogOpen((value) => !value)}
                            class="inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover"
                        >
                            {catalogOpen() ? copy.catalog.close : copy.catalog.open}
                            <ChevronDown class={cn("size-4 transition-transform", catalogOpen() && "rotate-180")}/>
                        </button>
                    </div>
                    {/* The questions wrap instead of scrolling sideways, so a phone never gets a horizontal scrollbar. */}
                    <ul aria-labelledby="assistant-suggestions" data-testid="assistant-suggestions-list" class="flex flex-wrap gap-2 pb-1">
                        <For each={offered()}>{(suggestion) => (
                            <li>
                                <button type="button" data-testid="assistant-suggestion" onClick={() => send(suggestion)} class={CHIP_CLASS}>
                                    {suggestion}
                                </button>
                            </li>
                        )}</For>
                    </ul>
                </div>

                <form onSubmit={submit} aria-label={copy.inputLabel} data-testid="assistant-form" class="flex gap-2 px-5 pt-3 pb-5">
                    <label for="assistant-input" class="sr-only">{copy.inputLabel}</label>
                    <Input
                        ref={input}
                        id="assistant-input"
                        data-testid="assistant-input"
                        value={query()}
                        onInput={(event) => setQuery(event.currentTarget.value)}
                        placeholder={copy.placeholder}
                        maxlength={MAX_LENGTH}
                        autocomplete="off"
                        enterkeyhint="send"
                    />
                    <button
                        type="submit"
                        data-testid="assistant-send"
                        aria-label={copy.send}
                        disabled={!query().trim()}
                        class="grid size-11 shrink-0 place-items-center rounded-full bg-primary text-on-primary transition-colors hover:bg-primary-hover disabled:opacity-50"
                    >
                        <SendHorizontal class="size-5"/>
                    </button>
                </form>
            </div>
        </dialog>
    );
}
