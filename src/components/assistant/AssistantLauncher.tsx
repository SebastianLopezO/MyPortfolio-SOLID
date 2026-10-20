import {createSignal, Show} from "solid-js";
import {Dynamic} from "solid-js/web";
import {MessageCircleQuestionMark} from "@/components/ui/icons";
import {loadAssistantCopy, loadCaseStudyCopy, loadFullContent} from "@/content";
import {loadDetailCopy} from "@/content/detail-copy";
import {useLanguage} from "@/context/language";
import type {Lang} from "@/types/content";

/** The panel's code and everything it answers from, requested together so opening it costs one round trip. */
const loadAssistant = (lang: Lang) =>
    Promise.all([
        import("@/components/assistant/AssistantPanel"),
        loadFullContent(lang),
        loadAssistantCopy(lang),
        loadCaseStudyCopy(lang),
        loadDetailCopy(lang),
    ]).then(([module, content, copy, cases, details]) => ({Panel: module.default, content, copy, cases, details}));

type Assistant = Awaited<ReturnType<typeof loadAssistant>>;

export function AssistantLauncher() {
    const {lang, content} = useLanguage();
    const [open, setOpen] = createSignal(false);
    const [assistant, setAssistant] = createSignal<Assistant>();
    let button: HTMLButtonElement | undefined;
    let request: Promise<Assistant> | undefined;
    const label = content.ui.actions.askAssistant;

    const prefetch = () => {
        request ??= loadAssistant(lang).catch((error: unknown) => {
            // A failed download (offline, a new deploy) may be retried on the next open.
            request = undefined;
            throw error;
        });
        return request;
    };

    const show = () => {
        setOpen(true);
        prefetch().then(setAssistant, () => setOpen(false));
    };

    const close = () => {
        setOpen(false);
        button?.focus();
    };

    return (
        <>
            <button
                ref={button}
                type="button"
                aria-label={label}
                title={label}
                aria-haspopup="dialog"
                aria-expanded={open()}
                onPointerEnter={() => void prefetch().catch(() => undefined)}
                onFocus={() => void prefetch().catch(() => undefined)}
                onClick={show}
                class="floating-action fixed right-5 bottom-5 z-40 grid size-12 place-items-center rounded-full bg-primary text-on-primary shadow-glow hover:scale-105"
            >
                <MessageCircleQuestionMark class="size-6"/>
            </button>
            <Show when={open() && assistant()}>
                {(loaded) => (
                    <Dynamic
                        component={loaded().Panel}
                        onClose={close}
                        content={loaded().content}
                        copy={loaded().copy}
                        cases={loaded().cases}
                        details={loaded().details}
                    />
                )}
            </Show>
        </>
    );
}
