import en from "@/content/en";
import es from "@/content/es";
import {loadSectionCopy} from "@/content/sections";
import startupEn from "@/content/en/startup";
import startupEs from "@/content/es/startup";
import {SECTION_COPY_KEYS} from "@/types/content";

describe("section copy", () => {
    it("loads the same copy each section renders in the prerender", async () => {
        for (const content of [en, es]) {
            for (const key of SECTION_COPY_KEYS) expect(await loadSectionCopy(key, content.lang)).toBe(content[key]);
        }
    });

    it("keeps the section copy out of the startup content", () => {
        for (const startup of [startupEn, startupEs]) {
            for (const key of SECTION_COPY_KEYS) expect(startup).not.toHaveProperty(key);
        }
    });
});
