import {createSignal, For} from "solid-js";
import {createStore} from "solid-js/store";
import {LAB_ART} from "@/content/shared/project-art";
import {withBase} from "@/lib/base";
import {cn} from "@/lib/utils";
import type {SkillGroupId} from "@/types/content";

/**
 * Where each module rests on the board, as the center of the module in percent of the board's width and height, and
 * the small turn it lies at. Five columns of three, nudged off the grid so the bench looks used, not filed.
 */
const SPOTS: readonly { x: number; y: number; turn: number }[] = [
    {x: 11, y: 20, turn: -4}, {x: 30, y: 17, turn: 3}, {x: 50, y: 21, turn: -2}, {x: 70, y: 16, turn: 4}, {x: 89, y: 21, turn: -3},
    {x: 13, y: 52, turn: 2}, {x: 32, y: 55, turn: -3}, {x: 51, y: 50, turn: 3}, {x: 69, y: 55, turn: -2}, {x: 88, y: 51, turn: 2},
    {x: 10, y: 79, turn: -2}, {x: 29, y: 81, turn: 4}, {x: 49, y: 78, turn: -4}, {x: 70, y: 81, turn: 2}, {x: 90, y: 78, turn: -3},
];

/** How far a press has to travel before it is a drag rather than a tap that opens the module. */
const DRAG_THRESHOLD = 6;
/** How far an arrow key moves the focused module, and with Shift. */
const STEP = 16;
const LONG_STEP = 48;

interface LabBoardProps {
    groups: readonly { id: SkillGroupId; count: number }[];
    names: Record<SkillGroupId, string>;
    /** The count under a module's name; {count} is how many tools it holds. */
    countLabel: string;
    label: string;
    keys: string;
    tidy: string;
    selected: SkillGroupId;
    onSelect: (id: SkillGroupId) => void;
}

/**
 * The lab bench: each group of tools is an object on a technical grid. From 48rem the objects can be dragged anywhere
 * on the board, or moved with the arrow keys, and pressing one opens its tools below; the last one moved lies on top.
 * On a phone the bench is a row the reader swipes through, one object at a time, and a tap opens it. Nothing moves
 * by itself, and the board renders at rest before the page is interactive.
 */
export function LabBoard(props: LabBoardProps) {
    const [offsets, setOffsets] = createStore<Partial<Record<SkillGroupId, { x: number; y: number }>>>({});
    const [lifted, setLifted] = createStore<Partial<Record<SkillGroupId, number>>>({});
    const [dragging, setDragging] = createSignal<SkillGroupId | null>(null);
    let top = 1;
    let board: HTMLDivElement | undefined;
    let press: { id: SkillGroupId; x: number; y: number; from: { x: number; y: number }; moved: boolean } | null = null;
    // The module just dropped: the click the browser sends after the drag must not open it.
    let dropped: SkillGroupId | null = null;

    const offsetOf = (id: SkillGroupId) => offsets[id] ?? {x: 0, y: 0};
    const canDrag = () => typeof window !== "undefined" && window.matchMedia("(width >= 48rem)").matches;

    /** Keeps a module's center on the board, whatever the offset asked for. */
    const clamp = (index: number, x: number, y: number) => {
        if (!board) return {x, y};
        const {width, height} = board.getBoundingClientRect();
        const spot = SPOTS[index % SPOTS.length];
        const cx = (spot.x / 100) * width;
        const cy = (spot.y / 100) * height;
        const margin = 40;
        return {
            x: Math.min(width - margin - cx, Math.max(margin - cx, x)),
            y: Math.min(height - margin - cy, Math.max(margin - cy, y)),
        };
    };

    const lift = (id: SkillGroupId) => setLifted(id, ++top);

    const onPointerDown = (event: PointerEvent, id: SkillGroupId) => {
        if (event.button !== 0 || !canDrag()) return;
        (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
        press = {id, x: event.clientX, y: event.clientY, from: offsetOf(id), moved: false};
        lift(id);
    };

    const onPointerMove = (event: PointerEvent, id: SkillGroupId, index: number) => {
        if (!press || press.id !== id) return;
        const dx = event.clientX - press.x;
        const dy = event.clientY - press.y;
        if (!press.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
        press.moved = true;
        setDragging(id);
        setOffsets(id, clamp(index, press.from.x + dx, press.from.y + dy));
    };

    const onPointerUp = () => {
        if (press?.moved) {
            dropped = press.id;
            // The click comes in the same task as the release; past it, a press opens the module again.
            setTimeout(() => (dropped = null));
        }
        press = null;
        setDragging(null);
    };

    const onClick = (id: SkillGroupId) => {
        if (dropped === id) return;
        props.onSelect(id);
    };

    const onKeyDown = (event: KeyboardEvent, id: SkillGroupId, index: number) => {
        const step = event.shiftKey ? LONG_STEP : STEP;
        const move = {ArrowLeft: [-step, 0], ArrowRight: [step, 0], ArrowUp: [0, -step], ArrowDown: [0, step]}[event.key];
        if (!move || !canDrag()) return;
        event.preventDefault();
        const current = offsetOf(id);
        lift(id);
        setOffsets(id, clamp(index, current.x + move[0], current.y + move[1]));
    };

    const tidy = () => {
        setOffsets(Object.fromEntries(props.groups.map((group) => [group.id, {x: 0, y: 0}])));
    };

    return (
        <div class="lab">
            <div
                ref={board}
                role="group"
                aria-label={props.label}
                class="lab-board grid-field scrollbar-none"
            >
                <For each={props.groups}>
                    {(group, index) => {
                        const spot = () => SPOTS[index() % SPOTS.length];
                        const selected = () => props.selected === group.id;
                        return (
                            <button
                                type="button"
                                aria-pressed={selected()}
                                aria-describedby="lab-keys"
                                data-dragging={dragging() === group.id || undefined}
                                onPointerDown={(event) => onPointerDown(event, group.id)}
                                onPointerMove={(event) => onPointerMove(event, group.id, index())}
                                onPointerUp={onPointerUp}
                                onPointerCancel={onPointerUp}
                                onClick={() => onClick(group.id)}
                                onKeyDown={(event) => onKeyDown(event, group.id, index())}
                                class={cn("lab-module group", selected() && "is-selected")}
                                style={{
                                    "--x": `${spot().x}%`,
                                    "--y": `${spot().y}%`,
                                    "--dx": `${offsetOf(group.id).x}px`,
                                    "--dy": `${offsetOf(group.id).y}px`,
                                    "--turn": `${spot().turn}deg`,
                                    "z-index": String(lifted[group.id] ?? (selected() ? 1 : 0)),
                                }}
                            >
                                <img src={withBase(LAB_ART[group.id])} alt="" width={160} height={160} loading="lazy"
                                     decoding="async" draggable={false} class="lab-object"/>
                                <span class="lab-label">
                                    <span class="block font-semibold">{props.names[group.id]}</span>
                                    <span class="block font-mono text-xs opacity-70">
                                        {props.countLabel.replace("{count}", String(group.count))}
                                    </span>
                                </span>
                            </button>
                        );
                    }}
                </For>
            </div>
            <div class="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p id="lab-keys" class="text-sm text-fg-subtle max-md:sr-only">{props.keys}</p>
                <button
                    type="button"
                    onClick={tidy}
                    class="hidden min-h-9 items-center rounded-full px-3 text-sm text-fg-muted transition-colors hover:bg-surface-raised hover:text-fg md:inline-flex"
                >
                    {props.tidy}
                </button>
            </div>
        </div>
    );
}
