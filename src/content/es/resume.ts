import type {Content} from "@/types/content";

export const resume: Content["resume"] = {
    title: "Mi hoja de vida",
    subtitle: {
        general: "Elige la versión que se ajusta a tu proceso. La compacta sirve para portales de empleo, la extendida para una entrevista técnica y la diseñada para leer en pantalla",
        backend: "Para un rol backend, la extendida trae la plataforma de integraciones, las APIs de cada proyecto y sus pruebas; la compacta pasa por cualquier portal de empleo",
        crm: "Para un rol de CRM, la extendida detalla las integraciones con Zoho, los widgets y las landings de campaña; la compacta pasa por cualquier portal de empleo",
        data: "Para un rol de datos, la extendida suma los reportes de Power BI, el servicio de snapshots y las certificaciones de BI",
        devops: "Para un rol DevOps, la extendida trae cada logro de cada trabajo, con los despliegues, los contenedores y la observabilidad",
        fullstack: "Para un rol full-stack, la extendida recorre los productos web de punta a punta; la diseñada muestra el perfil en una página",
    },
    download: "Descargar PDF",
    open: "Abrir documento",
    previewAlt: "Vista previa de la primera página de la hoja de vida",
    includesTitle: "Qué incluye",
    pages: {one: "1 página", other: "{count} páginas"},
    firstPage: "Página 1 de {count}",
    updated: "Actualizada el {date}",
    versions: {
        ats: {
            label: "ATS (compacta)",
            description: "Lista para sistemas de seguimiento de candidatos.",
            format: "PDF con texto seleccionable",
            includes: [
                "Dos páginas en una sola columna con texto seleccionable",
                "Perfil, experiencia, habilidades y formación",
                "Palabras clave para roles de backend, CRM, datos y DevOps",
            ],
        },
        atsLong: {
            label: "ATS (extendida)",
            description: "Con todo el detalle de cada rol, certificación y proyecto.",
            format: "PDF con texto seleccionable",
            includes: [
                "Cinco páginas con cada rol y cada logro",
                "Proyectos, certificaciones y cursos",
                "El mismo formato plano, legible por cualquier sistema de selección",
            ],
        },
        designed: {
            label: "CV diseñado",
            description: "Versión visual para lectura directa.",
            format: "PDF diseñado en Canva",
            includes: [
                "Diseño visual hecho en Canva",
                "Pensado para leer en pantalla o imprimir",
                "Se abre en Google Drive",
            ],
        },
    },
};
