import type {OrganizationId} from "@/types/content";
import type {OrganizationActivity} from "@/types/detail";

/** The day the counts below were read from the GitHub API. */
export const ACTIVITY_DATE = "2026-10-17";

/**
 * Commits on the default branch of every repository of each organization, merges included and bots left out
 * (Dependabot, the visual site builder's bot, Claude). Sebastián's commits add up every Git identity he used:
 * his account, the work account of the internship and the names his older commits carry. docs/content.md records
 * how they were read.
 */
export const organizationActivity: Record<OrganizationId, OrganizationActivity> = {
    tivenos: {repositories: 54, withMine: 47, mine: 5398, people: 6879, years: {2025: 574, 2026: 4824}},
    adcom: {repositories: 121, withMine: 121, mine: 9671, people: 9671, years: {2025: 2162, 2026: 7509}},
    smartpot: {repositories: 11, withMine: 11, mine: 2629, people: 2836, years: {2024: 301, 2025: 589, 2026: 1739}},
    gopoli: {repositories: 5, withMine: 5, mine: 74, people: 129, years: {2026: 74}},
    peppertech: {repositories: 6, withMine: 6, mine: 305, people: 492, years: {2025: 305}},
    engineering: {
        repositories: 37,
        withMine: 37,
        mine: 1666,
        people: 1712,
        years: {2022: 179, 2023: 232, 2024: 302, 2025: 180, 2026: 773}
    },
    taurus: {repositories: 4, withMine: 4, mine: 19, people: 19, years: {2024: 19}},
    testlabdata: {repositories: 18, withMine: 17, mine: 128, people: 146, years: {2022: 18, 2023: 110}},
    technical: {repositories: 4, withMine: 4, mine: 293, people: 316, years: {2022: 293}},
    vocational: {repositories: 8, withMine: 8, mine: 278, people: 320, years: {2021: 233, 2022: 44, 2024: 1}},
};
