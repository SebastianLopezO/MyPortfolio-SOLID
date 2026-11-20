import type {Art} from "./page-art.ts";
import {LAB_ART, type Tile} from "./project-art.ts";
import {SKILL_IDS} from "./skills.ts";
import type {SkillGroupId} from "../../types/content.ts";

// Apart from the facts of the groups (skills.ts), which the scripts read without the site's import aliases.

/** The layer of color behind each group's object, from the same family as the project tiles. */
const SKILL_TILE: Record<SkillGroupId, Tile> = {
    languages: "peach",
    backend: "sky",
    crm: "peach",
    data: "butter",
    databases: "lilac",
    frontend: "sky",
    devops: "sage",
    cloud: "sky",
    security: "sage",
    networks: "stone",
    iot: "mint",
    ai: "lilac",
    testing: "sage",
    tools: "stone",
    foundations: "butter",
};

/** Each group's object on its tile, on its card in the gallery and at the head of its page. */
export const SKILL_ART = Object.fromEntries(
    SKILL_IDS.map((id) => [id, {file: LAB_ART[id], tile: SKILL_TILE[id]}]),
) as Record<SkillGroupId, Art>;
