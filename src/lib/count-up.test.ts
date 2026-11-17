import {countUpFigures, formatFigure, parseFigure} from "@/lib/count-up";

// jsdom has no IntersectionObserver; this one lets a test say what came into view.
class Observer {
    static last: Observer | undefined;
    targets = new Set<Element>();

    constructor(private readonly callback: IntersectionObserverCallback) {
        Observer.last = this;
    }

    observe(target: Element) {
        this.targets.add(target);
    }

    unobserve(target: Element) {
        this.targets.delete(target);
    }

    /** Reports each element as on screen or off it, the way the browser does after a layout. */
    report(...changes: [Element, boolean][]) {
        const entries = changes.filter(([target]) => this.targets.has(target))
            .map(([target, isIntersecting]) => ({target, isIntersecting}) as IntersectionObserverEntry);
        this.callback(entries, this as unknown as IntersectionObserver);
    }
}

const reducedMotion = (reduce: boolean) =>
    vi.spyOn(window, "matchMedia").mockImplementation((query) => ({matches: reduce && query.includes("reduce")}) as MediaQueryList);

describe("parseFigure", () => {
    it("reads the number of a figure with what surrounds it", () => {
        expect(parseFigure("20+")).toEqual({prefix: "", value: 20, separator: "", suffix: "+"});
        expect(parseFigure("28,541")).toEqual({prefix: "", value: 28541, separator: ",", suffix: ""});
        expect(parseFigure("28.541")).toEqual({prefix: "", value: 28541, separator: ".", suffix: ""});
        expect(parseFigure("93 %")).toEqual({prefix: "", value: 93, separator: "", suffix: " %"});
        expect(parseFigure("1,234,567+")).toEqual({prefix: "", value: 1234567, separator: ",", suffix: "+"});
    });

    it("leaves alone a text that is not a whole number", () => {
        expect(parseFigure("97.9%")).toBeNull();
        expect(parseFigure("Native")).toBeNull();
        expect(parseFigure("2022 – 2026")).toBeNull();
        expect(parseFigure("")).toBeNull();
    });
});

describe("formatFigure", () => {
    it("groups thousands with the figure's own separator", () => {
        expect(formatFigure(28541, ",")).toBe("28,541");
        expect(formatFigure(1234567, ".")).toBe("1.234.567");
        expect(formatFigure(541, ",")).toBe("541");
        expect(formatFigure(2273, "")).toBe("2273");
    });
});

describe("countUpFigures", () => {
    const figure = (id: string) => document.getElementById(id)!;

    beforeEach(() => {
        Observer.last = undefined;
        vi.stubGlobal("IntersectionObserver", Observer);
        document.body.innerHTML = '<dl><dd id="still" data-count="true">487</dd><dd id="later" data-count="true">28,541+</dd></dl>';
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
        document.body.replaceChildren();
    });

    it("does nothing for a reader who asked for less motion", () => {
        reducedMotion(true);
        countUpFigures();
        expect(Observer.last).toBeUndefined();
    });

    it("counts a figure up only when the reader reaches it later, and ends on the text as written", () => {
        reducedMotion(false);
        const frames: FrameRequestCallback[] = [];
        vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => frames.push(callback));
        vi.spyOn(performance, "now").mockReturnValue(0);
        countUpFigures();
        const figures = Observer.last!;
        figures.report([figure("still"), true], [figure("later"), false]);
        expect(frames).toHaveLength(0);

        figures.report([figure("later"), true]);
        const text = figure("later").firstChild as Text;
        frames.shift()!(550);
        expect(text.data).toBe("24,973+");
        frames.shift()!(1100);
        expect(text.data).toBe("28,541+");
        // The same text node is still there, which is what a part hydrated later holds on to.
        expect(figure("later").firstChild).toBe(text);
        expect(frames).toHaveLength(0);
        expect(figure("still").textContent).toBe("487");
        expect(figures.targets.size).toBe(0);
    });

    it("stops counting when something else rewrites the figure", () => {
        reducedMotion(false);
        const frames: FrameRequestCallback[] = [];
        vi.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => frames.push(callback));
        vi.spyOn(performance, "now").mockReturnValue(0);
        countUpFigures();
        const figures = Observer.last!;
        figures.report([figure("later"), false]);
        figures.report([figure("later"), true]);
        const text = figure("later").firstChild as Text;
        frames.shift()!(550);
        expect(text.data).toBe("24,973+");
        // Another view of the page writes its own figure into the same node.
        text.data = "139";
        frames.shift()!(800);
        expect(text.data).toBe("139");
        expect(frames).toHaveLength(0);
    });
});
