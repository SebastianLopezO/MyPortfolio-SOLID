import {archive, type ArchiveOrg} from "@/content/shared/archive";
import {certifications} from "@/content/shared/certifications";
import {
    CERTIFICATION_SLUG,
    EDUCATION_SLUG,
    EXPERIENCE_SLUG,
    ORGANIZATION_SLUG,
    REASON_SLUG,
    SERVICE_SLUG
} from "@/content/shared/detail-links";
import {education} from "@/content/shared/education";
import {experience} from "@/content/shared/experience";
import {organizations} from "@/content/shared/organizations";
import {EXPERIENCE_PROJECTS} from "@/content/shared/project-links";
import {projects} from "@/content/shared/projects";
import {benefitOrder, SERVICE_IDS, serviceProjects, serviceReasons} from "@/content/shared/services";
import {testimonials} from "@/content/shared/testimonials";
import type {
    BenefitId,
    CertificationFacts,
    CertificationId,
    EducationId,
    ExperienceId,
    OrganizationFacts,
    OrganizationId,
    ServiceId,
    YearMonth
} from "@/types/content";
import type {ProjectFacts, ProjectId} from "@/types/project";

// How the jobs, programs, certifications, organizations, projects and recommendations relate. Everything here is
// read from the facts, so a page never states a link the facts do not hold.

export const experienceBySlug = (slug: string) => experience.find((item) => EXPERIENCE_SLUG[item.id] === slug);
export const educationBySlug = (slug: string) => education.find((item) => EDUCATION_SLUG[item.id] === slug);
export const certificationBySlug = (slug: string) => certifications.find((item) => CERTIFICATION_SLUG[item.id] === slug);
export const organizationBySlug = (slug: string) => organizations.find((item) => ORGANIZATION_SLUG[item.id] === slug);
export const serviceBySlug = (slug: string) => SERVICE_IDS.find((id) => SERVICE_SLUG[id] === slug);
export const reasonBySlug = (slug: string) => benefitOrder.find((id) => REASON_SLUG[id] === slug);

export const experienceById = (id: ExperienceId) => experience.find((item) => item.id === id)!;
export const educationById = (id: EducationId) => education.find((item) => item.id === id)!;
export const certificationById = (id: CertificationId) => certifications.find((item) => item.id === id)!;
export const organizationById = (id: OrganizationId) => organizations.find((item) => item.id === id)!;

/** The items before and after one in its list, wrapping around at both ends. */
export const neighbors = <T>(items: readonly T[], index: number) => ({
    previous: items[(index - 1 + items.length) % items.length],
    next: items[(index + 1) % items.length],
});

/** Whether a month falls within a period that may still be open; "2025-06" compares as text. */
export const within = (date: YearMonth, start: YearMonth, end: YearMonth | null) => date >= start && (end === null || date <= end);

const yearOf = (date: YearMonth) => Number(date.slice(0, 4));

export const projectsOfExperience = (id: ExperienceId): ProjectFacts[] =>
    (EXPERIENCE_PROJECTS[id] ?? []).map((projectId) => projects.find((project) => project.id === projectId)!);

export const testimonialsOfExperience = (id: ExperienceId) => testimonials.filter((item) => item.experience === id);

/** Certifications earned while a job or a program lasted, oldest first. */
export const certificationsDuring = (start: YearMonth, end: YearMonth | null) =>
    certifications.filter((item) => within(item.date, start, end)).sort((a, b) => a.date.localeCompare(b.date));

/** The jobs held and the programs being studied in the month a certification was earned. */
export const jobsAt = (date: YearMonth) => experience.filter((job) => within(date, job.start, job.end));
export const programsAt = (date: YearMonth) => education.filter((program) => yearOf(date) >= program.start && yearOf(date) <= program.end);

export const projectsOfOrganization = (id: OrganizationId) => projects.filter((project) => project.organization === id);
export const jobsOfOrganization = (id: OrganizationId) => experience.filter((job) => job.organization === id);
export const programsOfOrganization = (id: OrganizationId) => education.filter((program) => program.organizationId === id);

/** The program's own coursework page first, then the products built while studying it. */
export const projectsOfProgram = (id: EducationId) => {
    const program = education.find((item) => item.id === id)!;
    // The program's own project and its listed ones first, then every coursework project filed under it.
    const listed = [program.project, ...(program.projects ?? [])].filter((value) => value !== undefined);
    const filed = projects.filter((project) => project.education === id && !listed.includes(project.id)).map((project) => project.id);
    return [...listed, ...filed].map((projectId) => projects.find((project) => project.id === projectId)!);
};

export const sameStop = (certification: CertificationFacts) =>
    certifications.filter((item) => item.milestone === certification.milestone && item.id !== certification.id);

const ARCHIVE_ORGS = new Set<string>(archive.map((entry) => entry.org));

/** The public repositories of an organization listed one by one in the archive; private ones list none. */
export const archiveOf = (organization: OrganizationFacts) =>
    ARCHIVE_ORGS.has(organization.name) ? archive.filter((entry) => entry.org === (organization.name as ArchiveOrg)) : [];

/** Certifications grouped by who issued them, the issuer with the most first. */
export const certificationsByIssuer = () => {
    const groups = new Map<CertificationFacts["issuerId"], CertificationFacts[]>();
    for (const item of certifications) groups.set(item.issuerId, [...(groups.get(item.issuerId) ?? []), item]);
    return [...groups.entries()]
        .map(([issuer, items]) => ({issuer, items: [...items].sort((a, b) => b.date.localeCompare(a.date))}))
        .sort((a, b) => b.items.length - a.items.length);
};

export const projectById = (id: ProjectId) => projects.find((project) => project.id === id)!;

/** The jobs whose cards link one of these projects, in the order of the jobs. */
export const jobsOfProjects = (ids: readonly ProjectId[]) =>
    experience.filter((job) => (EXPERIENCE_PROJECTS[job.id] ?? []).some((id) => ids.includes(id)));

/** A service's projects, and the jobs it was done in. */
export const projectsOfService = (id: ServiceId) => serviceProjects[id].map(projectById);
export const jobsOfService = (id: ServiceId) => jobsOfProjects(serviceProjects[id]);

/** The services whose page names a reason among its own. */
export const servicesWithReason = (id: BenefitId) => SERVICE_IDS.filter((service) => serviceReasons[service].includes(id));
