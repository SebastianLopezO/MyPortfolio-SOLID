import {renderToString} from "solid-js/web";
import {StaticRouter} from "@/routes/Router";
import en from "@/content/en";
import {LanguageProvider} from "@/context/LanguageProvider";
import {RoleProvider} from "@/context/RoleProvider";
import {useRole} from "@/context/role";

function Probe() {
    const {locked, pathFor} = useRole();
    return <p>{`|${locked()}|${pathFor("data")}`}</p>;
}

describe("RoleProvider on the server", () => {
    it("renders unlocked even with the lock query, since the prerender cannot see it", () => {
        const html = renderToString(() => (
            <StaticRouter url="/en/backend?locked=true">
                <LanguageProvider content={en}>
                    <RoleProvider role="backend">
                        <Probe/>
                    </RoleProvider>
                </LanguageProvider>
            </StaticRouter>
        ));
        expect(html).toContain("|false|/en/data");
    });
});
