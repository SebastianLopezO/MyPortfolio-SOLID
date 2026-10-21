import {carryLock} from "@/lib/lock";

// Builds an island the way Astro writes it: `ssr` until it hydrates.
const linkIn = (href: string, {hydrated = false} = {}) => {
    const island = document.createElement("astro-island");
    if (!hydrated) island.setAttribute("ssr", "");
    const link = document.createElement("a");
    link.href = href;
    island.append(link);
    document.body.append(island);
    return link;
};

const follow = (link: HTMLAnchorElement) => {
    // jsdom does not navigate; the test reads the link as the browser would follow it.
    document.addEventListener("click", (event) => event.preventDefault(), {once: true});
    link.click();
    return link.getAttribute("href");
};

describe("carryLock", () => {
    afterEach(() => {
        document.body.replaceChildren();
    });

    it("leaves the links alone when the page is not locked", () => {
        window.history.replaceState(null, "", "/en/backend");
        carryLock();
        expect(follow(linkIn("/en/projects/smartpot?from=backend"))).toBe("/en/projects/smartpot?from=backend");
    });

    it("carries the lock on the links of the parts not hydrated yet", () => {
        window.history.replaceState(null, "", "/en/backend?locked=true");
        carryLock();
        expect(follow(linkIn("/en/experience/tivenos?from=backend"))).toBe("http://localhost:3000/en/experience/tivenos?from=backend&locked=true");
        expect(follow(linkIn("/en/backend#projects"))).toBe("http://localhost:3000/en/backend?locked=true#projects");
        expect(follow(linkIn("/en/projects?from=backend", {hydrated: true}))).toBe("/en/projects?from=backend");
        expect(follow(linkIn("/en/projects?from=backend&locked=true"))).toBe("/en/projects?from=backend&locked=true");
        expect(follow(linkIn("https://github.com/sebastianlopezo"))).toBe("https://github.com/sebastianlopezo");
    });
});
