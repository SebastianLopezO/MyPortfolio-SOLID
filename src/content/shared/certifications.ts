import type {CertificationFacts} from "@/types/content";

const PLATZI_2023 = "https://platzi.com/p/SebastianLopezO";
// The 2024 courses were taken with a second Platzi account, so their diplomas live under its profile.
const PLATZI_2024 = "https://platzi.com/p/sebastian.lopez361";
const HACKERRANK = "https://www.hackerrank.com/certificates";
const drive = (id: string) => `https://drive.google.com/file/d/${id}/view`;

/**
 * Credential links come from the LinkedIn export (October 2026) and every one was opened; license numbers are kept in
 * docs/content.md instead of the bundle, because the page never shows them.
 * The general view shows the first six, so the list starts with the industry certification and the programs that
 * carry the most weight, and continues newest first.
 */
export const certifications: CertificationFacts[] = [
    {
        id: "itSpecialistPython",
        title: "IT Specialist – Python",
        issuer: "Certiport – Pearson VUE",
        date: "2023-11",
        url: drive("1GdKEiDLO-GTGggoSf8my_1qbYWEqK1_s"),
        tech: ["Python"],
        roles: ["backend", "data"],
        milestone: "pythonSpecialist",
        issuerId: "certiport",
        applied: [{kind: "project", id: "integrationPlatform"}, {
            kind: "project",
            id: "emailAutomations"
        }, {kind: "project", id: "zohoToolkit"}]
    },
    {
        id: "daxPowerBi",
        title: "Curso de DAX para Power BI",
        issuer: "Platzi",
        date: "2024-09",
        url: `${PLATZI_2024}/curso/8121-course/diploma/detalle/`,
        tech: ["Power BI", "DAX"],
        roles: ["data"],
        milestone: "biCertificates",
        issuerId: "platzi",
        hours: 19,
        applied: [{kind: "experience", id: "muvu"}]
    },
    {
        id: "powerBiAnalysis",
        title: "Curso de Análisis de Datos con Power BI",
        issuer: "Platzi",
        date: "2024-08",
        url: `${PLATZI_2024}/curso/2676-course/diploma/detalle/`,
        tech: ["Power BI", "Data Analysis"],
        roles: ["data"],
        milestone: "biCertificates",
        issuerId: "platzi",
        hours: 20,
        applied: [{kind: "experience", id: "muvu"}]
    },
    {
        id: "dataScienceAi",
        title: "Data Science & AI – Engancha TIC 2.0",
        issuer: "Universidad de Antioquia",
        date: "2023-12",
        url: drive("1FKIQk7D_rlRZkoNFIb0Yrh8KOCCEOZzH"),
        tech: ["Python", "Data Science", "AI"],
        roles: ["data"],
        milestone: "enganchaTic",
        issuerId: "udea",
        applied: [{kind: "project", id: "smartpot"}, {kind: "project", id: "engineering"}]
    },
    {
        id: "cybersecurity",
        title: "Ciberseguridad – Engancha TIC 2.0",
        issuer: "Universidad de Antioquia",
        date: "2023-12",
        url: drive("1prv7zEoXMN-OZ2XAN1XjjNbzkYSNH7mo"),
        tech: ["Cybersecurity"],
        roles: ["devops"],
        milestone: "enganchaTic",
        issuerId: "udea",
        applied: [{kind: "project", id: "cybersecurityLabs"}]
    },
    {
        id: "problemSolving",
        title: "Problem Solving (Basic)",
        issuer: "HackerRank",
        date: "2023-03",
        url: `${HACKERRANK}/a9436f491d0f`,
        tech: ["Algorithms"],
        roles: ["backend"],
        milestone: "skillCertificates",
        issuerId: "hackerrank",
        applied: [{kind: "project", id: "engineering"}]
    },
    {
        id: "excelMastery",
        title: "Domina Excel",
        issuer: "Platzi",
        date: "2024-07",
        url: `${PLATZI_2024}/ruta/8292-domina-excel/diploma/detalle/`,
        tech: ["Excel", "VBA", "Dashboards"],
        roles: ["data"],
        milestone: "biCertificates",
        issuerId: "platzi",
        applied: [{kind: "experience", id: "muvu"}]
    },
    {
        id: "excelDataAnalysis",
        title: "Curso de Excel Avanzado para Análisis de Datos",
        issuer: "Platzi",
        date: "2024-06",
        url: `${PLATZI_2024}/curso/4822-course/diploma/detalle/`,
        tech: ["Excel", "Data Analysis"],
        roles: ["data"],
        milestone: "biCertificates",
        issuerId: "platzi",
        hours: 14,
        applied: [{kind: "experience", id: "muvu"}]
    },
    {
        id: "searchConsoleSeo",
        title: "Curso de Fundamentos de Google Search Console para SEO",
        issuer: "Platzi",
        date: "2024-06",
        url: `${PLATZI_2024}/curso/2121-course/diploma/detalle/`,
        tech: ["SEO", "Google Search Console"],
        roles: ["fullstack"],
        milestone: "biCertificates",
        issuerId: "platzi",
        hours: 12,
        applied: [{kind: "project", id: "portfolio"}]
    },
    {
        id: "greenDigitalSkills",
        title: "Green Digital Skills Certificate",
        issuer: "INCO Academy",
        date: "2024-03",
        url: "https://learning.inco-group.co/admin/tool/certificate/index.php?code=4365637690SL",
        tech: ["Sustainability", "Digital Skills"],
        roles: [],
        milestone: "greenSkills",
        issuerId: "inco",
        hours: 24,
        applied: []
    },
    {
        id: "dataVisualization",
        title: "Visualización de Datos – Engancha TIC 2.0",
        issuer: "Universidad de Antioquia",
        date: "2023-12",
        url: drive("1aXXhr1SUkGWbrmzJIISwUg_KurkbgzX4"),
        tech: ["Data Visualization", "Analytics"],
        roles: ["data"],
        milestone: "enganchaTic",
        issuerId: "udea",
        applied: [{kind: "experience", id: "muvu"}, {kind: "project", id: "taurus"}, {kind: "project", id: "portfolio"}]
    },
    {
        id: "webProgramming",
        title: "Programación Web – Engancha TIC 2.0",
        issuer: "Universidad de Antioquia",
        date: "2023-12",
        url: drive("1YNHfhDBgU6WNPpw8_741iHZCP_jsbnsh"),
        tech: ["JavaScript", "Java", "Responsive Design"],
        roles: ["fullstack"],
        milestone: "enganchaTic",
        issuerId: "udea",
        applied: [{kind: "project", id: "martech"}, {kind: "project", id: "admissionsForms"}, {
            kind: "project",
            id: "portfolio"
        }]
    },
    {
        id: "iotProtocols",
        title: "Curso de IoT: Protocolos de Comunicación",
        issuer: "Platzi",
        date: "2023-12",
        url: `${PLATZI_2023}/curso/1555-iot-protocolos/diploma/detalle/`,
        tech: ["IoT", "MQTT", "Embedded Systems"],
        roles: ["devops"],
        milestone: "platziRoute",
        issuerId: "platzi",
        applied: [{kind: "project", id: "smartpot"}]
    },
    {
        id: "gitGithub",
        title: "Curso Profesional de Git y GitHub",
        issuer: "Platzi",
        date: "2023-11",
        url: `${PLATZI_2023}/curso/1557-git-github/diploma/detalle/`,
        tech: ["Git", "GitHub"],
        roles: ["devops", "fullstack", "backend"],
        milestone: "platziRoute",
        issuerId: "platzi",
        applied: [{kind: "project", id: "landingPlatform"}, {kind: "project", id: "smartpot"}, {
            kind: "project",
            id: "portfolio"
        }]
    },
    {
        id: "softwareEngineering",
        title: "Fundamentos de Ingeniería de Software",
        issuer: "Platzi",
        date: "2023-11",
        url: `${PLATZI_2023}/curso/1098-ingenieria/diploma/detalle/`,
        tech: ["Software Engineering", "SDLC"],
        roles: ["backend"],
        milestone: "platziRoute",
        issuerId: "platzi",
        applied: [{kind: "project", id: "gopoli"}, {kind: "project", id: "peppercrm"}]
    },
    {
        id: "djangoTwo",
        title: "Python Django 2",
        issuer: "Sapiencia · Comfenalco Antioquia",
        date: "2023-11",
        url: drive("12VYcGPI-q7rqtlsLjVzlqrYxIaod-7VR"),
        tech: ["Python", "Django"],
        roles: ["backend"],
        milestone: "django",
        issuerId: "sapiencia",
        hours: 120,
        applied: []
    },
    {
        id: "practicalJavascript",
        title: "Curso Práctico de JavaScript",
        issuer: "Platzi",
        date: "2023-11",
        url: `${PLATZI_2023}/curso/3271-javascript-practico/diploma/detalle/`,
        tech: ["JavaScript"],
        roles: ["fullstack"],
        milestone: "platziRoute",
        issuerId: "platzi",
        applied: [{kind: "project", id: "admissionsForms"}, {kind: "project", id: "crmWidgets"}]
    },
    {
        id: "basicProgramming",
        title: "Curso de Programación Básica",
        issuer: "Platzi",
        date: "2023-11",
        url: `${PLATZI_2023}/curso/3208-programacion-basica/diploma/detalle/`,
        tech: ["Programming"],
        roles: [],
        milestone: "platziRoute",
        issuerId: "platzi",
        hours: 29,
        applied: []
    },
    {
        id: "pythonFundamentals",
        title: "Curso de Fundamentos de Python",
        issuer: "Platzi",
        date: "2023-11",
        url: `${PLATZI_2023}/curso/4227-python/diploma/detalle/`,
        tech: ["Python"],
        roles: ["backend", "data"],
        milestone: "platziRoute",
        issuerId: "platzi",
        applied: [{kind: "project", id: "zohoToolkit"}, {kind: "project", id: "emailAutomations"}]
    },
    {
        id: "hacklab",
        title: "Hacking Ético Gamificado HACKLAB",
        issuer: "HackerMentor",
        date: "2023-08",
        url: "https://credsverse.com/credentials/d61a7018-0d32-4ee4-8b88-13dc95f6002d",
        tech: ["Ethical Hacking", "Cybersecurity"],
        roles: ["devops"],
        milestone: "hacklab",
        issuerId: "hackermentor",
        hours: 6,
        applied: [{kind: "project", id: "cybersecurityLabs"}]
    },
    {
        id: "javaBasic",
        title: "Java (Basic)",
        issuer: "HackerRank",
        date: "2023-02",
        url: `${HACKERRANK}/af888d4eded1`,
        tech: ["Java"],
        roles: ["backend"],
        milestone: "skillCertificates",
        issuerId: "hackerrank",
        applied: [{kind: "project", id: "smartpot"}, {kind: "project", id: "gopoli"}, {
            kind: "project",
            id: "peppercrm"
        }]
    },
    {
        id: "css",
        title: "CSS",
        issuer: "HackerRank",
        date: "2023-02",
        url: `${HACKERRANK}/0d308cbf0361`,
        tech: ["CSS", "HTML"],
        roles: ["fullstack"],
        milestone: "skillCertificates",
        issuerId: "hackerrank",
        applied: [{kind: "project", id: "martech"}, {kind: "project", id: "admissionsForms"}, {
            kind: "project",
            id: "portfolio"
        }]
    },
    {
        id: "pythonDjango",
        title: "Python-Django",
        issuer: "Sapiencia · Comfenalco Antioquia",
        date: "2022-12",
        url: drive("1naNA8eTZZGgScfYDf9_BqQehsDpB-gzL"),
        tech: ["Python", "Django", "Bootstrap"],
        roles: ["backend"],
        milestone: "django",
        issuerId: "sapiencia",
        hours: 120,
        repository: "https://github.com/SebastianLopezO/PythonDjango",
        applied: []
    },
    {
        id: "pythonBasic",
        title: "Python (Basic)",
        issuer: "HackerRank",
        date: "2022-08",
        url: `${HACKERRANK}/241fdd9f762a`,
        tech: ["Python"],
        roles: ["backend", "data"],
        milestone: "skillCertificates",
        issuerId: "hackerrank",
        applied: [{kind: "experience", id: "quipux"}]
    },
    {
        id: "excelProfessional",
        title: "Introducción al Excel Profesional",
        issuer: "Cámara de Comercio y Educación",
        date: "2022-06",
        url: drive("1lFewG4RxUMx5f0n3BSi4tTYPlFZ05qVP"),
        tech: ["Excel"],
        roles: ["data"],
        milestone: "skillCertificates",
        issuerId: "camara",
        applied: [{kind: "experience", id: "quipux"}]
    },
    {
        id: "sqlBasic",
        title: "SQL (Basic)",
        issuer: "HackerRank",
        date: "2022-05",
        url: `${HACKERRANK}/bccad0666378`,
        tech: ["SQL"],
        roles: ["data", "backend"],
        milestone: "skillCertificates",
        issuerId: "hackerrank",
        applied: [{kind: "project", id: "crmSnapshots"}, {kind: "experience", id: "muvu"}]
    },
    {
        id: "programmingFundamentals",
        title: "Fundamentos de Programación 1 & 2",
        issuer: "Universidad Tecnológica de Pereira",
        date: "2021-12",
        url: drive("1PvgTryuqTw11m14kUYl77UdDvt27wAff"),
        tech: ["Programming", "Programming Logic"],
        roles: [],
        milestone: "firstPython",
        issuerId: "utp",
        applied: []
    },
    {
        id: "pythonEia",
        title: "Introducción a la Programación en Python",
        issuer: "Universidad EIA",
        date: "2021-05",
        url: drive("1-c9z0xppRtGtwiR_ikCdRQXdiMmylGu4"),
        tech: ["Python"],
        roles: [],
        milestone: "firstPython",
        issuerId: "eia",
        hours: 4.5,
        applied: [{kind: "project", id: "vocational"}]
    },
    {
        id: "html",
        title: "Introduction to HTML",
        issuer: "Coursera",
        date: "2020-12",
        url: "https://www.coursera.org/account/accomplishments/verify/MYNLFHGXDWG3",
        tech: ["HTML"],
        roles: ["fullstack"],
        milestone: "html",
        issuerId: "coursera",
        applied: [{kind: "project", id: "vocational"}]
    },
];
