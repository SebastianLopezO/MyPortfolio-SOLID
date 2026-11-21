import {splitProps} from "solid-js";
import {ArtTile, type ArtTileProps} from "@/components/ui/ArtTile";
import {PROJECT_ART} from "@/content/shared/project-art";
import type {ProjectId} from "@/types/project";

interface ProjectTileProps extends Omit<ArtTileProps, "art" | "keepName"> {
    id: ProjectId;
}

/**
 * A project at a glance: its illustration on its own layer of color, its name and a few words, and nothing else. The
 * whole tile is the link to its page, which tells the rest.
 */
export function ProjectTile(props: ProjectTileProps) {
    const [local, rest] = splitProps(props, ["id"]);
    return <ArtTile art={PROJECT_ART[local.id]} data-testid={`project-tile-${local.id}`} {...rest}/>;
}
