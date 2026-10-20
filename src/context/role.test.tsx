import {fireEvent, render, screen} from "@solidjs/testing-library";
import {MemoryRouter} from "@/routes/Router";
import {useLocation} from "@/routes/router-context";
import en from "@/content/en";
import {LanguageProvider} from "@/context/LanguageProvider";
import {RoleProvider} from "@/context/RoleProvider";
import {useRole} from "@/context/role";
import type {RoleId} from "@/content/roles";

function Probe() {
    const {locked, pathFor, setRole} = useRole();
    const location = useLocation();
    return (
        <>
            <p data-testid="state">{`${location().pathname}${location().search}${location().hash}|${locked()}|${pathFor("data")}`}</p>
            <button onClick={() => setRole("crm")}>crm</button>
            <button onClick={() => setRole(null)}>general</button>
        </>
    );
}

const tree = (url: string, role: RoleId | null) => () => (
    <MemoryRouter initialUrl={url}>
        <LanguageProvider content={en}>
            <RoleProvider role={role}>
                <Probe/>
            </RoleProvider>
        </LanguageProvider>
    </MemoryRouter>
);

// The server render, where the lock waits for hydration, is covered by role.server.test.tsx.
describe("RoleProvider", () => {
    beforeEach(() => localStorage.clear());

    it("locks in the browser and keeps the query in generated links", () => {
        render(tree("/en/backend?locked=true", "backend"));
        expect(screen.getByTestId("state").textContent).toBe("/en/backend?locked=true|true|/en/data?locked=true");
    });

    it("ignores role changes while locked", () => {
        render(tree("/en/backend?locked=true#experience", "backend"));
        fireEvent.click(screen.getByText("crm"));
        expect(screen.getByTestId("state").textContent).toContain("/en/backend?locked=true#experience|true");
    });

    it("switches roles when unlocked and keeps the hash", () => {
        render(tree("/en/backend#skills", "backend"));
        fireEvent.click(screen.getByText("crm"));
        expect(screen.getByTestId("state").textContent).toContain("/en/crm#skills|false");
    });

    it("never writes to local storage", () => {
        render(tree("/en/backend?locked=true", "backend"));
        fireEvent.click(screen.getByText("general"));
        expect(localStorage.length).toBe(0);
    });
});
