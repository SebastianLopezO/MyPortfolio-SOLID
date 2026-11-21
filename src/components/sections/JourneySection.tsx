import {createComputed, createMemo, createSignal, For, Match, on, Show, Switch} from "solid-js";
import {forProfile} from "@/content/roles";
import {useJourneyCopy} from "@/hooks/useJourneyCopy";
import {useRole} from "@/context/role";
import {useHydrated} from "@/hooks/useHydrated";
import {Section} from "@/components/layout/Section";
import {EvolutionGrid} from "@/components/journey/EvolutionGrid";
import {FocusRadar} from "@/components/journey/FocusRadar";
import {Horizon} from "@/components/journey/Horizon";
import {JourneyMap} from "@/components/journey/JourneyMap";
import {milestones} from "@/content/shared/journey";
import {BUILD_DATE} from "@/content/shared/site";
import {isFuture, ROLE_LINE} from "@/lib/journey";
import {cn} from "@/lib/utils";
import type {JourneyLineId, JourneyTab, MilestoneId} from "@/types/journey";

const TABS: JourneyTab[] = ["map", "evolution", "focus", "horizon"];

/** The most recent milestone that has already happened, on the given line when there is one. */
const latestMilestone = (line: JourneyLineId | null): MilestoneId =>
    milestones
        .filter((item) => item.major && !isFuture(item, BUILD_DATE) && (line === null || item.lines.includes(line)))
        .sort((a, b) => b.start.localeCompare(a.start))[0].id;

export function JourneySection() {
    const journey = useJourneyCopy();
    const {role} = useRole();
    const interactive = useHydrated();
    const roleLine = createMemo(() => {
        const current = role();
        return current ? ROLE_LINE[current] : null;
    });
    const [tab, setTab] = createSignal<JourneyTab>("map");
    const [emphasis, setEmphasis] = createSignal<JourneyLineId | null>(roleLine());
    const [selected, setSelected] = createSignal<MilestoneId>(latestMilestone(roleLine()));
    const tabs: Partial<Record<JourneyTab, HTMLButtonElement>> = {};

    // A role switch happens without a reload, so the map follows the new role's line.
    createComputed(on(roleLine, (line) => {
        setEmphasis(line);
        setSelected(latestMilestone(line));
    }, {defer: true}));

    // Picking a line moves to its latest stop when the selected one is not on it, so the details match the line.
    const emphasize = (line: JourneyLineId | null) => {
        setEmphasis(line);
        if (line !== null && !milestones.find((item) => item.id === selected())!.lines.includes(line)) setSelected(latestMilestone(line));
    };

    const showMilestone = (id: MilestoneId) => {
        setSelected(id);
        setTab("map");
        tabs.map?.focus();
    };

    const onTabKey = (event: KeyboardEvent) => {
        const index = TABS.indexOf(tab());
        const next = {ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: TABS.length - 1}[event.key];
        if (next === undefined) return;
        event.preventDefault();
        const target = TABS[(next + TABS.length) % TABS.length];
        setTab(target);
        tabs[target]?.focus();
    };

    return (
        <Section id="journey" title={journey.title} subtitle={forProfile(journey.subtitle, role())}>
            <div
                role="tablist"
                aria-label={journey.tabsLabel}
                data-testid="journey-tablist"
                data-interactive={interactive() || undefined}
                onKeyDown={onTabKey}
                class="mb-6 grid grid-cols-2 gap-2 sm:flex sm:flex-wrap"
            >
                <For each={TABS}>
                    {(id) => (
                        <button
                            ref={(element) => {
                                tabs[id] = element;
                            }}
                            type="button"
                            role="tab"
                            id={`journey-tab-${id}`}
                            data-testid={`journey-tab-${id}`}
                            aria-selected={tab() === id}
                            aria-controls={`journey-panel-${id}`}
                            tabindex={tab() === id ? 0 : -1}
                            onClick={() => setTab(id)}
                            class={cn(
                                "min-h-10 rounded-full border px-3 py-2 text-sm leading-tight font-semibold transition-colors sm:px-4",
                                tab() === id ? "border-primary bg-primary text-on-primary" : "border-border text-fg-muted hover:border-primary hover:text-primary",
                            )}
                        >
                            {journey.tabs[id].label}
                        </button>
                    )}
                </For>
            </div>

            <For each={TABS}>
                {(id) => (
                    <div role="tabpanel" id={`journey-panel-${id}`} data-testid={`journey-panel-${id}`} aria-labelledby={`journey-tab-${id}`}
                         hidden={tab() !== id} tabindex={0} class="appear">
                        {/* Only the open view is rendered, which keeps the prerendered HTML and the DOM small. */}
                        <Show when={tab() === id}>
                            <p class="mb-6 max-w-3xl text-fg-muted">{journey.tabs[id].description}</p>
                            <Switch>
                                <Match when={id === "map"}>
                                    <JourneyMap selected={selected()} onSelect={setSelected} emphasis={emphasis()}
                                                onEmphasis={emphasize}/>
                                </Match>
                                <Match when={id === "evolution"}>
                                    <EvolutionGrid onSelectMilestone={showMilestone}/>
                                </Match>
                                <Match when={id === "focus"}>
                                    <FocusRadar/>
                                </Match>
                                <Match when={id === "horizon"}>
                                    <Horizon onSelectMilestone={showMilestone}/>
                                </Match>
                            </Switch>
                        </Show>
                    </div>
                )}
            </For>
        </Section>
    );
}
