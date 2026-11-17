import {carryRole} from "@/lib/role-links";

const linkTo = (href: string) => {
    const link = document.createElement("a");
    link.href = href;
    document.body.append(link);
    return link;
};

// jsdom does not navigate; the test reads the link as the browser would follow it.
const follow = (link: HTMLAnchorElement, type: "click" | "auxclick" | "contextmenu" = "click") => {
    document.addEventListener(type, (event) => event.preventDefault(), {once: true});
    link.dispatchEvent(new MouseEvent(type, {bubbles: true, cancelable: true, button: type === "auxclick" ? 1 : 0}));
    return link.getAttribute("href");
};

describe("carryRole", () => {
    let controller: AbortController;

    beforeEach(() => {
        // Each test starts its own listeners; the ones of the test before are dropped with the controller.
        controller = new AbortController();
        const add = document.addEventListener.bind(document);
        vi.spyOn(document, "addEventListener").mockImplementation((type, listener, options) =>
            add(type, listener, {...(typeof options === "object" ? options : {capture: options}), signal: controller.signal}));
    });

    afterEach(() => {
        controller.abort();
        vi.restoreAllMocks();
        document.body.replaceChildren();
    });

    it("adds the role view of a home page to the project and detail pages a visitor opens", () => {
        window.history.replaceState(null, "", "/en/backend");
        carryRole();
        expect(follow(linkTo("/en/projects/smartpot"))).toBe("http://localhost:3000/en/projects/smartpot?from=backend");
        expect(follow(linkTo("/en/experience/tivenos#detail-applied"), "auxclick"))
            .toBe("http://localhost:3000/en/experience/tivenos?from=backend#detail-applied");
        expect(follow(linkTo("/en/projects"), "contextmenu")).toBe("http://localhost:3000/en/projects?from=backend");
    });

    it("writes the view first, before the lock", () => {
        window.history.replaceState(null, "", "/en/backend?locked=true");
        carryRole();
        expect(follow(linkTo("/en/projects/gopoli?locked=true"))).toBe("http://localhost:3000/en/projects/gopoli?from=backend&locked=true");
    });

    it("keeps the view of a project page on the pages opened from it", () => {
        window.history.replaceState(null, "", "/en/projects/smartpot?from=data");
        carryRole();
        expect(follow(linkTo("/es/projects/smartpot"))).toBe("http://localhost:3000/es/projects/smartpot?from=data");
        expect(follow(linkTo("/en/certifications/power-bi-analysis"))).toBe("http://localhost:3000/en/certifications/power-bi-analysis?from=data");
    });

    it("leaves the other links alone", () => {
        window.history.replaceState(null, "", "/en/backend");
        carryRole();
        expect(follow(linkTo("/en/data"))).toBe("/en/data");
        expect(follow(linkTo("/resume-en.pdf"))).toBe("/resume-en.pdf");
        expect(follow(linkTo("https://github.com/sebastianlopezo"))).toBe("https://github.com/sebastianlopezo");
        expect(follow(linkTo("/en/projects/smartpot?from=crm"))).toBe("/en/projects/smartpot?from=crm");
    });

    it("does nothing on a page without a view", () => {
        window.history.replaceState(null, "", "/en");
        carryRole();
        expect(follow(linkTo("/en/projects/smartpot"))).toBe("/en/projects/smartpot");
    });
});
