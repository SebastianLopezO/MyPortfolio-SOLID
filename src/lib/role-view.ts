import {roleConfig, type RoleId} from "@/content/roles";
import type {Bullet, SectionId, SkillGroupId} from "@/types/content";
import type {ProjectFacts} from "@/types/project";

export const sectionOrder = (role: RoleId | null): SectionId[] => roleConfig(role).sectionOrder;

export const prioritize = <T>(items: readonly T[], rolesOf: (item: T) => readonly RoleId[], role: RoleId | null): T[] => {
    if (!role) return [...items];
    const matching = items.filter((item) => rolesOf(item).includes(role));
    const rest = items.filter((item) => !rolesOf(item).includes(role));
    return [...matching, ...rest];
};

export const orderByIds = <T extends { id: string }>(items: readonly T[], ids: readonly string[]): T[] => {
    const rank = (item: T) => {
        const index = ids.indexOf(item.id);
        return index === -1 ? ids.length : index;
    };
    return items
        .map((item, index) => ({item, index}))
        .sort((a, b) => rank(a.item) - rank(b.item) || a.index - b.index)
        .map(({item}) => item);
};

export const orderSkillGroups = <T extends { id: SkillGroupId }>(groups: readonly T[], role: RoleId | null): T[] =>
    orderByIds(groups, roleConfig(role).skillGroupOrder);

/** The projects a category lists in a role view: the role's own first, without the featured one above them. */
export const listProjects = (projects: readonly ProjectFacts[], role: RoleId | null): ProjectFacts[] =>
    prioritize(projects.filter((project) => project.id !== roleConfig(role).featuredProject), (project) => project.roles, role);

export const split = <T>(items: readonly T[], visible: number) => ({
    visible: items.slice(0, visible),
    hidden: items.slice(visible),
});

export const isFocusTech = (tech: string, role: RoleId | null) => {
    if (!role) return false;
    const name = tech.toLowerCase();
    return roleConfig(role).focusTech.some((focus) => {
        const key = focus.toLowerCase();
        return name === key || name.startsWith(`${key} `) || name.startsWith(`${key}/`);
    });
};

export const orderTech = (techs: readonly string[], role: RoleId | null): string[] =>
    [...techs.filter((tech) => isFocusTech(tech, role)), ...techs.filter((tech) => !isFocusTech(tech, role))];

export const countMatches = (bullets: readonly Bullet[], role: RoleId | null) =>
    role ? bullets.filter((bullet) => bullet.roles.includes(role)).length : 0;

export const relevance = (bullets: readonly Bullet[], role: RoleId | null) => {
    const matches = countMatches(bullets, role);
    return bullets.length ? matches + matches / bullets.length : 0;
};

export const orderExperience = <T extends {
    start: string
}>(jobs: readonly T[], bulletsOf: (job: T) => readonly Bullet[], role: RoleId | null): T[] =>
    role
        ? [...jobs].sort((a, b) => relevance(bulletsOf(b), role) - relevance(bulletsOf(a), role) || b.start.localeCompare(a.start))
        : [...jobs];
