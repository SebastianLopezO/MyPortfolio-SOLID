import type {Content} from "@/types/content";
import {YEARS} from "@/content/shared/profile";

const FROM = "Remote or hybrid from Medellín (UTC−5)";

export const hero: Content["hero"] = {
    availability: {
        general: `Open to backend and integration roles · ${FROM}`,
        backend: `Open to backend roles in Python or Java · ${FROM}`,
        crm: `Open to CRM, Zoho and automation roles · ${FROM}`,
        data: `Open to data and BI roles · ${FROM}`,
        devops: `Open to DevOps and platform roles · ${FROM}`,
        fullstack: `Open to full-stack roles with React and TypeScript · ${FROM}`,
    },
    location: "Medellín, Colombia",
    stackLabel: "Core stack",
    byProfile: {
        general: {
            title: "Backend & Integration Developer",
            headline: "I connect an organization's systems so its people stop copying data by hand and work with up-to-date information.",
            summary: `${YEARS} years across backend, CRM, data and DevOps. Today I run 20+ FastAPI services that connect Zoho CRM with the academic systems of 15+ institutions in Latin America and Spain, so every applicant, payment and enrollment moves from one system to the other without anyone typing it again.`,
        },
        backend: {
            title: "Backend Developer (Python · Java)",
            headline: "I design the APIs that move applicants, payments and enrollments between systems, and I answer for them in production.",
            summary: `${YEARS} years with FastAPI and Spring Boot, across REST and SOAP integrations with WS-Security, PostgreSQL, SQL Server and MongoDB, background jobs, and Docker deployments with CI/CD. When a service fails, the alert reaches me on Telegram and the OpenTelemetry traces show at which step.`,
        },
        crm: {
            title: "CRM & Integrations Engineer (Zoho)",
            headline: "I make Zoho CRM the daily tool of sales and admissions teams, with the data they need already in it.",
            summary: "Deluge automations, Zoho CRM widgets, Zoho Creator apps, Zoho Analytics dashboards, admissions forms and 90+ landing pages connected to the CRM, plus integrations with WhatsApp, Meta Ads, Google Ads and the academic systems of 15+ institutions.",
        },
        data: {
            title: "Data Analyst & BI Developer",
            headline: "I bring an organization's scattered data together into reports its teams trust when they decide.",
            summary: "SQL, Python and Power BI (DAX) for finance, sales and marketing, Zoho Analytics dashboards, bulk extracts of the CRM into PostgreSQL, and ETL routines that keep reports current without manual work.",
        },
        devops: {
            title: "DevOps & Platform Engineer",
            headline: "I ship and watch the services that admissions and marketing teams depend on.",
            summary: "Hardened Docker images in GHCR, GitHub Actions pipelines, Nginx on Linux and a Prometheus, Grafana, Loki and Tempo stack with 18 probes and 12 alert rules that reach Telegram. I also keep the automatic deployment of 100+ landing pages on a VPS running.",
        },
        fullstack: {
            title: "Full-Stack Developer (React · TypeScript)",
            headline: "I build complete products, from the database to the screen people use.",
            summary: "React, TypeScript and Next.js on top of Spring Boot and FastAPI APIs, in the SmartPot IoT platform, the GoPoli ride-sharing PWA for students at my university, Zoho CRM widgets and the admissions forms applicants fill in across several countries.",
        },
    },
    board: {
        label: "Projects on the board",
        devices: {
            crmWidgets: {
                name: "Zoho CRM Widgets",
                note: "Five widgets to build quotes, enroll and book appointments without leaving the CRM.",
            },
            observability: {
                name: "Observability Platform",
                note: "Metrics, logs, traces and alerts for the integration services, in one place.",
            },
            martech: {
                name: "University Admissions Funnel",
                note: "90+ landing pages that send every lead to Zoho CRM with the campaign that brought it.",
            },
            zohoToolkit: {
                name: "Zoho Bulk Operations Toolkit",
                note: "Python scripts that load, link, tag and sync CRM records in bulk.",
            },
            crmSnapshots: {
                name: "CRM Snapshots",
                note: "Copies Zoho CRM modules into PostgreSQL to analyze them with SQL.",
            },
            smartpot: {
                name: "SmartPot",
                note: "IoT platform that monitors and automates hydroponic crops, from sensor to app.",
            },
        },
    },
};

export const highlights: Content["highlights"] = {
    label: "Highlights",
    items: {
        years: "years of experience",
        integrations: "integration services in production",
        clients: "education institutions served in Latin America and Spain",
        landingPages: "admissions landing pages shipped",
        commits: "commits on GitHub since 2022",
        contributions: "GitHub contributions since 2022",
        prsReviewed: "dependency updates reviewed",
        streak: "days in a row with contributions",
        certifications: "certifications",
        organizations: "GitHub organizations",
        repositories: "repositories I have contributed to",
        recommendations: "recommendations from managers and teammates",
        codingHours: "hours of coding tracked in WakaTime",
        smartpotCommits: "of the commits people made to SmartPot are mine",
        apiTests: "automated tests in the SmartPot API",
        probes: "uptime probes on production services",
        alertRules: "alert rules that reach Telegram",
        widgets: "Zoho CRM widgets for sales teams",
        forms: "web admissions and scholarship forms",
    },
};
