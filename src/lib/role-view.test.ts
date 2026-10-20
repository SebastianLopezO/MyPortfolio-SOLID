import {experience} from "@/content/shared/experience";
import {projects} from "@/content/shared/projects";
import {skillGroups} from "@/content/shared/skills";
import en from "@/content/en";
import {GENERAL, ROLE_IDS, ROLES} from "@/content/roles";
import {
    countMatches,
    isFocusTech,
    listProjects,
    orderExperience,
    orderSkillGroups,
    orderTech,
    prioritize,
    sectionOrder,
    split
} from "@/lib/role-view";

describe("role view", () => {
    it("uses the general order without a role", () => {
        expect(sectionOrder(null)).toEqual(GENERAL.sectionOrder);
    });

    it("keeps every section reachable in every role", () => {
        const sections = [...GENERAL.sectionOrder].sort();
        for (const role of ROLE_IDS) expect([...ROLES[role].sectionOrder].sort()).toEqual(sections);
    });

    it("moves role bullets first without dropping any", () => {
        const bullets = en.experience.items.tivenos.bullets;
        const ordered = prioritize(bullets, (bullet) => bullet.roles, "devops");
        expect(ordered).toHaveLength(bullets.length);
        expect(ordered[0].roles).toContain("devops");
        expect(new Set(ordered)).toEqual(new Set(bullets));
    });

    it("keeps the original order when no role is active", () => {
        const bullets = en.experience.items.adcom.bullets;
        expect(prioritize(bullets, (bullet) => bullet.roles, null)).toEqual(bullets);
    });

    it("never reorders the jobs", () => {
        expect(experience.map((item) => item.id)).toEqual(["tivenos", "adcom", "muvu", "quipux"]);
    });

    it("orders skill groups and projects by role", () => {
        expect(orderSkillGroups(skillGroups, "data")[0].id).toBe("data");
        expect(orderSkillGroups(skillGroups, "data")).toHaveLength(skillGroups.length);
        const work = projects.filter((project) => project.category === "work");
        expect(listProjects(work, "data")[0].roles).toContain("data");
        expect(listProjects(work, "crm").map((project) => project.id)).not.toContain("martech");
        expect(listProjects(work, null)).toHaveLength(work.length);
    });

    it("splits visible and hidden items", () => {
        expect(split([1, 2, 3, 4], 3)).toEqual({visible: [1, 2, 3], hidden: [4]});
    });
});

describe("role relevance", () => {
    it("matches focus technologies by whole name", () => {
        expect(isFocusTech("Spring Boot 4", "backend")).toBe(true);
        expect(isFocusTech("SOAP/WSDL (Zeep)", "backend")).toBe(true);
        expect(isFocusTech("Java 21", "backend")).toBe(true);
        expect(isFocusTech("JavaScript", "backend")).toBe(false);
        expect(isFocusTech("Docker", null)).toBe(false);
    });

    it("moves the role's technologies first without dropping any", () => {
        const tech = ["React", "Docker", "FastAPI", "Prometheus"];
        expect(orderTech(tech, "devops")).toEqual(["Docker", "Prometheus", "React", "FastAPI"]);
        expect(orderTech(tech, null)).toEqual(tech);
    });

    it("orders jobs by relevance in role views and chronologically otherwise", () => {
        const bulletsOf = (job: (typeof experience)[number]) => en.experience.items[job.id].bullets;
        const ids = (role: Parameters<typeof orderExperience>[2]) => orderExperience(experience, bulletsOf, role).map((job) => job.id);
        expect(ids(null)).toEqual(experience.map((job) => job.id));
        expect(ids("data")[0]).toBe("quipux");
        // Both current jobs carry most of the CRM and full-stack achievements; the share of matches decides between them.
        expect(ids("crm").slice(0, 2).sort()).toEqual(["adcom", "tivenos"]);
        expect(ids("fullstack").slice(0, 2).sort()).toEqual(["adcom", "tivenos"]);
        expect(new Set(ids("data"))).toEqual(new Set(ids(null)));
    });

    it("counts the bullets tagged with a role", () => {
        const bullets = en.experience.items.quipux.bullets;
        expect(countMatches(bullets, "data")).toBe(bullets.length);
        expect(countMatches(bullets, null)).toBe(0);
    });
});
