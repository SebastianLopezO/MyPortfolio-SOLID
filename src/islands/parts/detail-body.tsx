import {DetailBody} from "@/views/DetailPages";
import {parseDetailPath} from "@/lib/paths";
import type {PartProps} from "../shell";

/** The body of a job, program, certification or organization page, or of their indexes, read from its path. */
export function DetailBodyPart(props: PartProps) {
    const detail = () => parseDetailPath(props.path)!;
    return <DetailBody collection={detail().collection} slug={detail().slug}/>;
}
