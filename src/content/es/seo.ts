import type {Content} from "@/types/content";
import {YEARS} from "@/content/shared/profile";

export const seo: Content["seo"] = {
    siteName: "Sebastián López Osorno",
    ogImageAlt: "Sebastián López Osorno, desarrollador backend y de integraciones",
    profiles: {
        general: {
            title: "Sebastián López Osorno · Backend e Integraciones",
            description: `Desarrollador backend y de integraciones en Medellín, con ${YEARS} años en FastAPI, Spring Boot, Zoho CRM, datos y DevOps. Abierto a roles remotos o híbridos.`,
        },
        backend: {
            title: "Sebastián López Osorno · Desarrollador Backend (Python, Java)",
            description: `Desarrollador backend con ${YEARS} años construyendo servicios en FastAPI y Spring Boot, integraciones REST y SOAP, PostgreSQL y MongoDB, con Docker y CI/CD.`,
        },
        crm: {
            title: "Sebastián López Osorno · Ingeniero Zoho CRM & Integraciones",
            description: "Desarrollador Zoho CRM con automatización en Deluge, Zoho Creator y Analytics, e integraciones por API para ventas, mercadeo y admisiones en 15+ instituciones.",
        },
        data: {
            title: "Sebastián López Osorno · Analista de Datos & BI",
            description: "Analista de datos con experiencia en SQL, Python, Power BI (DAX) y Zoho Analytics, construyendo automatizaciones ETL y reportes para finanzas, ventas y mercadeo.",
        },
        devops: {
            title: "Sebastián López Osorno · Ingeniero DevOps & Plataforma",
            description: "Ingeniero DevOps que publica imágenes Docker endurecidas con GitHub Actions y GHCR, Nginx sobre Linux y observabilidad con Prometheus, Grafana, Loki y Tempo.",
        },
        fullstack: {
            title: "Sebastián López Osorno · Desarrollador Full-Stack (React, TS)",
            description: "Desarrollador full-stack que construye interfaces en React, TypeScript y Next.js sobre APIs en Spring Boot y FastAPI, desde IoT hasta 100+ landing pages.",
        },
    },
};
