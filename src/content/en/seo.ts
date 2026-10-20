import type {Content} from "@/types/content";
import {YEARS} from "@/content/shared/profile";

export const seo: Content["seo"] = {
    siteName: "Sebastián López Osorno",
    ogImageAlt: "Sebastián López Osorno, backend and integration developer",
    profiles: {
        general: {
            title: "Sebastián López Osorno · Backend & Integration Developer",
            description: `Backend & integration developer from Medellín with ${YEARS} years in FastAPI, Spring Boot, Zoho CRM, data analytics and DevOps. Open to remote or hybrid roles.`,
        },
        backend: {
            title: "Sebastián López Osorno · Backend Developer (Python, Java)",
            description: `Backend developer with ${YEARS} years building FastAPI and Spring Boot services, REST and SOAP integrations, PostgreSQL and MongoDB, shipped with Docker and CI/CD.`,
        },
        crm: {
            title: "Sebastián López Osorno · Zoho CRM & Integrations Engineer",
            description: "Zoho CRM developer with Deluge automation, Zoho Creator and Analytics, and API integrations for sales, marketing and admissions teams in 15+ institutions.",
        },
        data: {
            title: "Sebastián López Osorno · Data Analyst & BI Developer",
            description: "Data analyst with SQL, Python, Power BI (DAX) and Zoho Analytics experience, building ETL automations and reports for finance, sales and marketing.",
        },
        devops: {
            title: "Sebastián López Osorno · DevOps & Platform Engineer",
            description: "DevOps engineer shipping hardened Docker images with GitHub Actions and GHCR, Nginx on Linux, and Prometheus, Grafana, Loki and Tempo observability.",
        },
        fullstack: {
            title: "Sebastián López Osorno · Full-Stack Developer (React, TS)",
            description: "Full-stack developer building React, TypeScript and Next.js interfaces on Spring Boot and FastAPI APIs, from IoT platforms to 100+ landing pages.",
        },
    },
};
