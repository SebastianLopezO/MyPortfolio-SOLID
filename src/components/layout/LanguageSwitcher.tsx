import {Languages} from "@/components/ui/icons";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {withBase} from "@/lib/base";
import {buildPath} from "@/lib/paths";
import {cn} from "@/lib/utils";

/** On the project pages `href` points to the same page in the other language. */
export function LanguageSwitcher(props: { class?: string; href?: string }) {
    const {alternateLang, content} = useLanguage();
    const {role, locked} = useRole();
    const href = () => props.href ?? buildPath(alternateLang, role(), {locked: locked()});

    const keepHash = (event: MouseEvent) => {
        if (!window.location.hash || event.metaKey || event.ctrlKey || event.shiftKey) return;
        event.preventDefault();
        window.location.assign(withBase(`${href()}${window.location.hash}`));
    };

    return (
        <a
            href={withBase(href())}
            hreflang={alternateLang}
            lang={alternateLang}
            onClick={keepHash}
            class={cn(
                "inline-flex h-10 items-center gap-2 rounded-md border border-border px-3 font-mono text-sm text-fg-muted transition-colors hover:border-primary hover:text-primary",
                props.class,
            )}
        >
            <Languages class="size-4"/>
            {/* The name read aloud starts with the visible code (WCAG 2.5.3, label in name). */}
            {alternateLang.toUpperCase()}
            <span class="sr-only"> · {content.ui.language.switchTo}</span>
        </a>
    );
}
