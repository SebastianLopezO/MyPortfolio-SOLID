import type {Content} from "@/types/content";

export const skills: Content["skills"] = {
    title: "Habilidades técnicas",
    subtitle: {
        general: "Las herramientas con las que trabajo en backend, CRM, datos, infraestructura y web, y las que vienen de la carrera",
        backend: "Las herramientas con las que construyo y opero servicios, empezando por el backend, sus bases de datos y su despliegue",
        crm: "Las herramientas con las que conecto el CRM con todo lo demás, de Zoho y la automatización a las campañas y las APIs",
        data: "Las herramientas con las que extraigo, limpio y explico datos, entre SQL, Python, BI y modelos",
        devops: "Las herramientas con las que despliego, vigilo y aseguro, desde contenedores y CI/CD hasta observabilidad, nube y redes",
        fullstack: "Las herramientas con las que llevo un producto web de la interfaz a la base de datos",
    },
    groups: {
        languages: "Lenguajes",
        backend: "Backend & APIs",
        crm: "CRM & Automatización",
        data: "Datos & BI",
        databases: "Bases de Datos",
        frontend: "Frontend",
        devops: "DevOps & Observabilidad",
        cloud: "Nube & Hosting",
        security: "Seguridad",
        networks: "Redes",
        iot: "IoT & Embebidos",
        ai: "Machine Learning & IA",
        testing: "Testing & Calidad",
        tools: "Herramientas",
        foundations: "Fundamentos de Computación",
    },
    count: "{count} herramientas",
    moreTitle: "Todas las herramientas por grupo",
    lab: {
        label: "Banco de trabajo",
        hint: "Cada módulo es un grupo de herramientas. Muévelos por el banco y abre uno para ver lo que contiene.",
        keys: "Enter lo abre; las flechas lo mueven por el banco.",
        toolsOf: "Herramientas de {group}",
        tidy: "Ordenar el banco",
    },
};
