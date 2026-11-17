import {SiteHeader} from "@/components/layout/SiteHeader";
import {useLanguage} from "@/context/language";
import {useRole} from "@/context/role";
import {buildDetailPath, buildProjectPath, parseDetailPath, parseProjectPath} from "@/lib/paths";
import {sectionOrder} from "@/lib/role-view";
import type {PartProps} from "../shell";

/**
 * The header of any page. Away from the home page its section links lead back to the home page of the role view, and
 * the language link keeps the page, the view and the lock.
 */
export function HeaderPart(props: PartProps) {
    const {alternateLang} = useLanguage();
    const {role, locked} = useRole();
    // A page keeps its path for its whole life.
    // eslint-disable-next-line solid/reactivity
    const {path} = props;
    const project = parseProjectPath(path);
    const detail = parseDetailPath(path);
    const languageHref = () => {
        if (project) return buildProjectPath(alternateLang, {slug: project.slug, locked: locked()});
        if (detail) return buildDetailPath(alternateLang, detail.collection, {
            slug: detail.slug,
            locked: locked()
        });
        return undefined;
    };
    return <SiteHeader sections={sectionOrder(role())} homeLinks={Boolean(project || detail)}
                       languageHref={languageHref()}/>;
}
