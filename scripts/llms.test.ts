// @vitest-environment node
import {describe, expect, it} from "vitest";
import {buildLlmsTxt, decodeEntities} from "./llms.ts";

const site = "https://example.com";
const profile = {
    name: "Ana Pérez",
    email: "ana@example.com",
    github: "https://github.com/ana",
    linkedin: "https://linkedin.com/in/ana"
};
const page = (path: string, title: string) => ({path, title, description: `About ${title}.`});
const pages = [
    page("/en", "Ana"),
    page("/es", "Ana en español"),
    page("/en/backend", "Backend"),
    page("/en/projects", "Projects"),
    page("/en/projects/shop", "Shop"),
    page("/en/certifications/css", "CSS"),
    page("/en/experience/acme", "Acme"),
];
const text = buildLlmsTxt({
    site,
    pages,
    profile,
    resumes: ["Ana-ATS-ES.pdf", "Ana-ATS-EN.pdf", "Ana-ATS-Long-EN.pdf", "notes.txt"]
});

describe("buildLlmsTxt", () => {
    it("opens with the name and the home page's description", () => {
        expect(text.startsWith("# Ana Pérez\n\n> About Ana.\n")).toBe(true);
    });

    it("lists the English pages by section and leaves the Spanish ones out", () => {
        expect(text).toContain("## Profile\n\n- [Ana](https://example.com/en): About Ana.\n- [Backend](https://example.com/en/backend): About Backend.\n");
        expect(text).toContain("## Projects and case studies\n\n- [Projects](https://example.com/en/projects): About Projects.\n- [Shop]");
        expect(text).toContain("## Experience\n\n- [Acme](https://example.com/en/experience/acme)");
        expect(text).not.toContain("https://example.com/es");
        expect(text).not.toContain("## Education");
    });

    it("links the resumes and the contact, and leaves the certifications for last as optional", () => {
        expect(text).toContain("- [Resume, English (PDF)](https://example.com/cv/Ana-ATS-EN.pdf)\n- [Resume, Spanish (PDF)](https://example.com/cv/Ana-ATS-ES.pdf)\n- [Long resume, English (PDF)]");
        expect(text).not.toContain("notes.txt");
        expect(text).toContain("- [Email](mailto:ana@example.com)");
        expect(text.trimEnd().endsWith("## Optional\n\n- [CSS](https://example.com/en/certifications/css): About CSS.")).toBe(true);
    });
});

describe("decodeEntities", () => {
    it("turns the head's HTML escapes back into text", () => {
        expect(decodeEntities("Backend &amp; Integration &#x27;Dev&#x27; &lt;3 &quot;x&quot;")).toBe("Backend & Integration 'Dev' <3 \"x\"");
    });
});
