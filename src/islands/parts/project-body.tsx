import {ProjectBody} from "@/views/ProjectPages";
import {parseProjectPath} from "@/lib/paths";
import type {PartProps} from "../shell";

/** The body of a project page or of the projects index, read from its path. */
export function ProjectBodyPart(props: PartProps) {
    return <ProjectBody slug={parseProjectPath(props.path)?.slug ?? null}/>;
}
