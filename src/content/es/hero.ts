import type {Content} from "@/types/content";
import {EXPERIENCE_YEARS} from "@/content/shared/profile";

export const hero: Content["hero"] = {
    location: "Medellín, Colombia",
    byProfile: {
        general: {
            title: "Desarrollador Backend & Integraciones",
            headline: "Conecto los sistemas de una organización para que su gente deje de copiar datos a mano y trabaje con información al día.",
            summary: `Llevo más de ${EXPERIENCE_YEARS} años entre backend, CRM, datos y DevOps. Hoy opero más de 20 servicios en FastAPI que conectan Zoho CRM con los sistemas académicos de más de 15 instituciones de Latinoamérica y España, para que cada aspirante, pago y matrícula pase de un sistema al otro sin que nadie lo vuelva a digitar.`,
        },
        backend: {
            title: "Desarrollador Backend (Python · Java)",
            headline: "Diseño las APIs que mueven aspirantes, pagos y matrículas entre sistemas, y respondo por ellas en producción.",
            summary: `Más de ${EXPERIENCE_YEARS} años con FastAPI y Spring Boot, entre integraciones REST y SOAP con WS-Security, PostgreSQL, SQL Server y MongoDB, trabajos en segundo plano y despliegues en Docker con CI/CD. Cuando un servicio falla, la alerta me llega a Telegram y las trazas de OpenTelemetry muestran en qué paso.`,
        },
        crm: {
            title: "Ingeniero de CRM & Integraciones (Zoho)",
            headline: "Hago de Zoho CRM la herramienta diaria de los equipos de ventas y admisiones, con los datos que necesitan sin digitarlos.",
            summary: "Automatizaciones en Deluge, widgets de Zoho CRM, apps en Zoho Creator, tableros en Zoho Analytics, formularios de admisión y más de 90 landing pages conectadas al CRM, además de integraciones con WhatsApp, Meta Ads, Google Ads y los sistemas académicos de más de 15 instituciones.",
        },
        data: {
            title: "Analista de Datos & Desarrollador BI",
            headline: "Reúno los datos dispersos de una organización en reportes en los que sus equipos confían para decidir.",
            summary: "SQL, Python y Power BI (DAX) para finanzas, ventas y mercadeo, tableros en Zoho Analytics, extracciones masivas del CRM a PostgreSQL y rutinas ETL que mantienen los reportes al día sin trabajo manual.",
        },
        devops: {
            title: "Ingeniero DevOps & Plataforma",
            headline: "Publico y vigilo los servicios de los que dependen los equipos de admisiones y mercadeo.",
            summary: "Imágenes Docker endurecidas en GHCR, pipelines de GitHub Actions, Nginx sobre Linux y un stack de Prometheus, Grafana, Loki y Tempo con 18 sondas y 12 reglas de alerta que llegan a Telegram. También mantengo el despliegue automático de más de 100 landing pages en un VPS.",
        },
        fullstack: {
            title: "Desarrollador Full-Stack (React · TypeScript)",
            headline: "Construyo productos completos, desde la base de datos hasta la pantalla que usa la gente.",
            summary: "React, TypeScript y Next.js sobre APIs en Spring Boot y FastAPI, en la plataforma IoT SmartPot, la PWA de viajes compartidos GoPoli para estudiantes de mi universidad, widgets de Zoho CRM y los formularios de admisión que llenan aspirantes de varios países.",
        },
    },
    board: {
        label: "Proyectos del tablero",
        devices: {
            crmWidgets: {
                name: "Widgets de Zoho CRM",
                note: "Cinco widgets para cotizar, matricular y agendar citas sin salir del CRM.",
            },
            observability: {
                name: "Plataforma de observabilidad",
                note: "Métricas, logs, trazas y alertas de los servicios de integración, en un mismo lugar.",
            },
            martech: {
                name: "Embudo de admisiones universitarias",
                note: "Más de 90 landing pages que envían cada lead a Zoho CRM con la campaña que lo trajo.",
            },
            zohoToolkit: {
                name: "Herramientas de operación masiva en Zoho",
                note: "Scripts en Python que cargan, vinculan, etiquetan y sincronizan registros del CRM en bloque.",
            },
            crmSnapshots: {
                name: "Snapshots del CRM",
                note: "Copia los módulos de Zoho CRM a PostgreSQL para analizarlos con SQL.",
            },
            smartpot: {
                name: "SmartPot",
                note: "Plataforma IoT que monitorea y automatiza cultivos hidropónicos, del sensor a la app.",
            },
        },
    },
};

export const highlights: Content["highlights"] = {
    label: "Cifras destacadas",
    items: {
        years: "años de experiencia",
        integrations: "servicios de integración en producción",
        clients: "instituciones educativas atendidas en Latinoamérica y España",
        landingPages: "landing pages de admisiones publicadas",
        commits: "commits en GitHub desde 2022",
        contributions: "contribuciones en GitHub desde 2022",
        prsReviewed: "actualizaciones de dependencias revisadas",
        streak: "días seguidos con contribuciones",
        certifications: "certificaciones",
        organizations: "organizaciones en GitHub",
        repositories: "repositorios con contribuciones mías",
        recommendations: "recomendaciones de jefes y compañeros",
        codingHours: "horas programando registradas en WakaTime",
        smartpotCommits: "de los commits que personas hicieron en SmartPot son míos",
        apiTests: "pruebas automatizadas en la API de SmartPot",
        probes: "sondas de disponibilidad sobre servicios en producción",
        alertRules: "reglas de alerta que llegan a Telegram",
        widgets: "widgets de Zoho CRM para equipos comerciales",
        forms: "formularios web de admisión y becas",
    },
};
