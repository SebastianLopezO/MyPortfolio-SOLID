// @vitest-environment node
import {describe, expect, it} from "vitest";
import {datePages, pageText} from "./page-dates.ts";

const head = '<title data-head="title">Projects · Sebastián</title>\n<meta data-head="description" name="description" content="What I built.">';

describe("pageText", () => {
    it("keeps the title, the description and the visible text, without markup, scripts or styles", () => {
        const html = '<main><h1 class="a">Projects</h1><style>.a{color:red}</style><p>Built   with\n<b>FastAPI</b></p><script>var x = 1</script></main>';
        expect(pageText(head, html)).toBe("Projects · Sebastián\nWhat I built.\nProjects Built with FastAPI");
    });

    it("ignores changes that only touch markup", () => {
        expect(pageText(head, '<p class="mt-4">Same words</p>')).toBe(pageText(head, '<div><span>Same</span> words</div>'));
    });
});

describe("datePages", () => {
    const texts = new Map([["/en", "Hello"], ["/es", "Hola"], ["/en/projects", "New page"]]);
    const first = datePages(texts, {}, "2026-10-01");

    it("dates every page by the build when the live site has no dates", () => {
        expect(Object.values(first).map(({date}) => date)).toEqual(["2026-10-01", "2026-10-01", "2026-10-01"]);
    });

    it("keeps the date of a page whose text did not change and moves the others to the build", () => {
        const next = datePages(new Map([...texts, ["/es", "Hola de nuevo"]]), first, "2026-10-19");
        expect(next["/en"]).toEqual(first["/en"]);
        expect(next["/es"].date).toBe("2026-10-19");
        expect(next["/es"].hash).not.toBe(first["/es"].hash);
    });
});
