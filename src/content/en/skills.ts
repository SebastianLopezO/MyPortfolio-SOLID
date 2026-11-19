import type {Content} from "@/types/content";

export const skills: Content["skills"] = {
    title: "Technical Skills",
    subtitle: {
        general: "The tools I work with across backend, CRM, data, infrastructure and the web, and the ones from my degree",
        backend: "The tools I build and run services with, starting with the backend, its databases and its deployment",
        crm: "The tools I connect the CRM to everything else with, from Zoho and automation to campaigns and APIs",
        data: "The tools I extract, clean and explain data with, across SQL, Python, BI and models",
        devops: "The tools I deploy, watch and secure with, from containers and CI/CD to observability, cloud and networks",
        fullstack: "The tools I take a web product from the interface to the database with",
    },
    groups: {
        languages: "Languages",
        backend: "Backend & APIs",
        crm: "CRM & Automation",
        data: "Data & BI",
        databases: "Databases",
        frontend: "Frontend",
        devops: "DevOps & Observability",
        cloud: "Cloud & Hosting",
        security: "Security",
        networks: "Networks",
        iot: "IoT & Embedded",
        ai: "Machine Learning & AI",
        testing: "Testing & Quality",
        tools: "Tools",
        foundations: "Computer Science Foundations",
    },
    count: "{count} tools",
    moreTitle: "Every tool by group",
    lab: {
        label: "Workbench",
        hint: "Each module is a group of tools. Move them around the bench and open one to see what it holds.",
        keys: "Enter opens it; the arrow keys move it around the bench.",
        toolsOf: "Tools for {group}",
        tidy: "Tidy the bench",
    },
};
