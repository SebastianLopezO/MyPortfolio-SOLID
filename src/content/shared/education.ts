import type {EducationFacts} from "@/types/content";

const ENGINEERING = {
    name: "EngineeringSebastian-s",
    url: "https://github.com/EngineeringSebastian-s",
    repositories: 37
};
// The technical high school programs of Pascual Bravo and INEM share one organization.
const VOCATIONAL = {name: "VocationalSebastian-s", url: "https://github.com/VocationalSebastian-s", repositories: 8};

/** The degree first, then the diploma that complements it, then the earlier programs from newest to oldest. */
export const education: EducationFacts[] = [
    {
        id: "politecnico",
        school: "Politécnico Colombiano Jaime Isaza Cadavid",
        start: 2022,
        end: 2026,
        graduation: "2027-03",
        organization: ENGINEERING,
        organizationId: "engineering",
        project: "engineering",
        projects: ["smartpot", "gopoli"],
    },
    {
        id: "cyberDiploma",
        school: "Politécnico Colombiano Jaime Isaza Cadavid",
        start: 2026,
        end: 2026,
        url: "https://github.com/EngineeringSebastian-s/Cybersecurity",
        organizationId: "engineering",
        project: "cybersecurityLabs",
    },
    {
        id: "sena",
        school: "SENA – Institución Universitaria Salazar y Herrera (IUSH)",
        start: 2022,
        end: 2023,
        organization: {name: "TechnicalSebastians", url: "https://github.com/TechnicalSebastians", repositories: 4},
        organizationId: "technical",
        project: "technical",
    },
    {
        id: "pascual",
        school: "Institución Educativa Pascual Bravo",
        start: 2020,
        end: 2021,
        organization: VOCATIONAL,
        organizationId: "vocational",
        project: "vocational"
    },
    {
        id: "inem",
        school: "I.E. INEM José Félix de Restrepo",
        start: 2019,
        end: 2021,
        organization: VOCATIONAL,
        organizationId: "vocational",
        project: "vocational"
    },
];
