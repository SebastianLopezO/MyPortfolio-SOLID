import {For, Show} from "solid-js";
import {Link} from "@/routes/Router";
import {ROLE_IDS, type RoleId} from "@/content/roles";
import {useContent} from "@/context/language";
import {useRole} from "@/context/role";
import {cn} from "@/lib/utils";

const OPTIONS: (RoleId | null)[] = [null, ...ROLE_IDS];

export function RoleSwitcher(props: { class?: string }) {
    const {ui} = useContent();
    const {role, locked, pathFor} = useRole();

    return (
        <Show when={!locked()}>
            <nav aria-label={ui.roleSwitcher.label} data-role-switcher="true" class={props.class}>
                <p class="mb-3 font-mono text-xs tracking-widest text-fg-subtle uppercase">{ui.roleSwitcher.label}</p>
                <ul class="flex flex-wrap gap-2">
                    <For each={OPTIONS}>
                        {(option) => {
                            const active = () => option === role();
                            return (
                                <li>
                                    <Link
                                        to={pathFor(option)}
                                        aria-current={active() ? "page" : undefined}
                                        class={cn(
                                            "inline-flex min-h-9 items-center rounded-full border px-4 text-sm transition-colors",
                                            active()
                                                ? "border-primary bg-primary text-on-primary"
                                                : "border-border bg-surface text-fg-muted hover:border-primary hover:text-primary",
                                        )}
                                    >
                                        {option ? ui.roleSwitcher.roles[option] : ui.roleSwitcher.general}
                                    </Link>
                                </li>
                            );
                        }}
                    </For>
                </ul>
            </nav>
        </Show>
    );
}
