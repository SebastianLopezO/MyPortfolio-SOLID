import type {OrganizationFacts} from "@/types/content";

const metrics = (file: string, height: number) => ({
    src: `https://raw.githubusercontent.com/SebastianLopezO/SebastianLopezO/main/metrics/orgs/${file}.svg`,
    width: 480,
    height,
});

export const organizations: OrganizationFacts[] = [
    {
        id: "tivenos",
        name: "TivenosEducation",
        url: "https://github.com/TivenosEducation",
        repositories: 54,
        members: 5,
        visibility: "private",
        metricsImage: metrics("metrics.tivenoseducation", 217),
        roles: ["backend", "crm", "devops", "data"]
    },
    {
        id: "adcom",
        name: "ADCOM-Group",
        url: "https://github.com/ADCOM-Group",
        repositories: 121,
        members: 3,
        visibility: "private",
        metricsImage: metrics("metrics.adcom-group", 197),
        roles: ["crm", "fullstack", "backend"]
    },
    {
        id: "smartpot",
        name: "SmartPotTech",
        url: "https://github.com/SmartPotTech",
        repositories: 11,
        members: 3,
        visibility: "public",
        metricsImage: metrics("metrics.smartpottech", 217),
        roles: ["backend", "devops", "fullstack", "data"]
    },
    {
        id: "gopoli",
        name: "GoPoli",
        url: "https://github.com/GoPoli",
        repositories: 5,
        members: 2,
        visibility: "public",
        roles: ["fullstack", "backend", "devops"]
    },
    {
        id: "peppertech",
        name: "PepperTechDev",
        url: "https://github.com/PepperTechDev",
        repositories: 6,
        members: 4,
        visibility: "public",
        metricsImage: metrics("metrics.peppertechdev", 197),
        roles: ["backend", "crm"]
    },
    {
        id: "engineering",
        name: "EngineeringSebastian-s",
        url: "https://github.com/EngineeringSebastian-s",
        repositories: 37,
        visibility: "public",
        metricsImage: metrics("metrics.engineeringsebastians", 197),
        roles: ["backend", "data"]
    },
    {
        id: "taurus",
        name: "TaurusSebastian-s",
        url: "https://github.com/TaurusSebastian-s",
        repositories: 4,
        visibility: "public",
        metricsImage: metrics("metrics.taurussebastians", 197),
        roles: ["data", "fullstack"]
    },
    {
        id: "testlabdata",
        name: "TestLabData",
        url: "https://github.com/TestLabData",
        repositories: 18,
        visibility: "private",
        metricsImage: metrics("metrics.testlabdata", 197),
        roles: ["data"]
    },
    {
        id: "technical",
        name: "TechnicalSebastians",
        url: "https://github.com/TechnicalSebastians",
        repositories: 4,
        members: 2,
        visibility: "public",
        metricsImage: metrics("metrics.technicalsebastians", 217),
        roles: ["fullstack"]
    },
    {
        id: "vocational",
        name: "VocationalSebastian-s",
        url: "https://github.com/VocationalSebastian-s",
        repositories: 8,
        members: 3,
        visibility: "public",
        metricsImage: metrics("metrics.vocationalsebastians", 197),
        roles: ["fullstack"]
    },
];
