import type {Content} from "@/types/content";

export const services: Content["services"] = {
    title: "Servicios que ofrezco",
    subtitle: {
        general: "Trabajo que puedo asumir como empleado, contratista o independiente, cada uno con el proyecto donde ya lo hice",
        backend: "Lo que puedo construir y operar del lado del servidor, con el proyecto donde ya lo hice",
        crm: "Lo que puedo hacer con el CRM y alrededor de él, con el proyecto donde ya lo hice",
        data: "Lo que puedo hacer con los datos de un equipo, con el proyecto donde ya lo hice",
        devops: "Lo que puedo desplegar, vigilar y automatizar, con el proyecto donde ya lo hice",
        fullstack: "Lo que puedo llevar de la interfaz a la base de datos, con el proyecto donde ya lo hice",
    },
    evidence: "Lo hice en",
    slider: {
        previousService: "Servicio anterior",
        nextService: "Servicio siguiente",
        previousBenefit: "Razón anterior",
        nextBenefit: "Razón siguiente"
    },
    items: {
        integration: {
            title: "Ingeniería de integraciones y backend",
            description: "Conecto el CRM con los sistemas que ya existen, para que nadie vuelva a digitar un dato.",
            points: [
                "APIs REST a medida en Python (FastAPI) y Java (Spring Boot)",
                "Integración con sistemas académicos y legados por REST, SOAP, SQL Server o archivos en FTP",
                "Trabajos en segundo plano con reintentos, idempotencia y estado consultable",
                "Webhooks y conectores para WhatsApp, Meta Ads, Google Ads y formularios",
                "Documentación OpenAPI y pruebas automatizadas",
            ],
        },
        crm: {
            title: "Desarrollo y automatización de CRM (Zoho)",
            description: "Configuro Zoho para que el proceso comercial viva en el CRM y no en hojas de cálculo.",
            points: [
                "Implementación y personalización de módulos, campos, layouts y flujos de Zoho CRM",
                "Funciones en Deluge y widgets dentro del registro con Zoho Extension Toolkit",
                "Aplicaciones en Zoho Creator y tableros en Zoho Analytics",
                "Cargas, vínculos y limpiezas masivas con la Bulk API",
                "Formularios web conectados al CRM, con UTM y validaciones",
            ],
        },
        web: {
            title: "Desarrollo web y landing pages",
            description: "Construyo sitios y aplicaciones web rápidos, bilingües y medibles, conectados al CRM.",
            points: [
                "Aplicaciones en React, Next.js y Vite con TypeScript y Tailwind CSS",
                "Landing pages de campaña con captura de UTM, formularios y eventos de conversión",
                "Sitios prerenderizados con SEO completo, Open Graph y datos estructurados",
                "PWA con mapas (Leaflet y OSRM) y chat de grupo",
                "Accesibilidad y rendimiento medidos con Lighthouse",
            ],
        },
        data: {
            title: "Inteligencia de negocios y datos",
            description: "Saco los datos de donde estén, los limpio y los convierto en tableros y reportes que se actualizan solos.",
            points: [
                "Auditoría, limpieza y deduplicación de bases de datos",
                "Snapshots del CRM en PostgreSQL para analizarlo con SQL",
                "Tableros en Power BI (DAX) y Zoho Analytics",
                "Notebooks en Python y Pandas para análisis y seguimiento de campañas",
                "Reportes operativos automatizados",
            ],
        },
        automation: {
            title: "Automatización de procesos",
            description: "Convierto tareas repetitivas en procesos programados que avisan cuando algo falla.",
            points: [
                "Flujos en n8n, Zapier y Power Automate, y funciones de Deluge",
                "Scripts en Python programados con cron o GitHub Actions",
                "Correos masivos con plantillas Jinja2 y Amazon SES",
                "Documentos generados, como PDF de cotizaciones y firmas de correo",
                "Reintentos y avisos cuando una fuente de datos llega tarde",
            ],
        },
        infra: {
            title: "Infraestructura y despliegue",
            description: "Dejo cada servicio en contenedores, con despliegue automático y un servidor seguro.",
            points: [
                "Administración de VPS Linux, Nginx, SSL y puertos",
                "Imágenes Docker, Compose y CI/CD con GitHub Actions",
                "Despliegues sin reinicio para flotas de sitios estáticos",
                "Usuarios de despliegue restringidos y llaves de host fijadas",
                "Imágenes en GHCR con Dependabot y CodeQL",
            ],
        },
        observability: {
            title: "Observabilidad y confiabilidad",
            description: "Instrumento los servicios para saber qué falla antes de que alguien lo reporte.",
            points: [
                "Métricas con Prometheus y tableros en Grafana",
                "Logs centralizados con Loki y trazas con OpenTelemetry y Tempo",
                "Sondas de disponibilidad, vencimiento de certificados y reglas de alerta",
                "Alertas a Telegram y monitores diarios que abren issues",
                "Revisiones periódicas de rendimiento con Lighthouse",
            ],
        },
        consulting: {
            title: "Consultoría técnica y soporte",
            description: "Acompaño a equipos de negocio y de TI a decidir, documentar y operar la tecnología que usan.",
            points: [
                "Diagnóstico de procesos y propuesta de arquitectura",
                "Documentación técnica, estándares y buenas prácticas",
                "Estándares de logs, seguridad y despliegue para servicios nuevos",
                "Mesa de ayuda y soporte a los usuarios del CRM",
                "Coordinación entre desarrollo, mercadeo y analítica",
            ],
        },
    },
    pageLink: "Ver cada servicio y por qué contratarme",
    benefitsTitle: "¿Por qué contratarme?",
    benefitsSubtitle: "Once razones, cada una con lo que un jefe o un compañero escribió sobre trabajar conmigo",
    benefits: {
        vision: {
            title: "De la necesidad del negocio a la arquitectura",
            description: "Parto de la decisión o el proceso que un equipo necesita cambiar, y desde ahí elijo la arquitectura y la divido en tareas.",
            evidence: {
                testimonial: "felipeCamacho",
                excerpt: "Traduce necesidades de negocio en arquitectura y tareas concretas, anticipa riesgos y prioriza con criterio.",
            },
        },
        costs: {
            title: "Menos trabajo manual",
            description: "Automatizo la digitación y los reportes repetitivos con flujos de CRM, n8n y scripts.",
            evidence: {
                testimonial: "jenniferTuso",
                excerpt: "Es muy dado a las personas y a ser un facilitador en la mejora continua tanto de los procesos individuales como los del equipo.",
            },
        },
        integration: {
            title: "Datos conectados",
            description: "Reúno los datos dispersos entre hojas de cálculo, el CRM y formularios web, para que cada área trabaje con los mismos registros.",
            evidence: {
                testimonial: "tatianaDiaz",
                excerpt: "Asimismo, tiene grandes habilidades para el análisis de datos, lo que permite llevar una adecuada trazabilidad y seguimiento de la información.",
            },
        },
        autonomy: {
            title: "De la pregunta a producción",
            description: "Llevo un problema desde la primera pregunta hasta producción y lo mantengo funcionando, y aprendo la herramienta que el problema necesite.",
            evidence: {
                testimonial: "lautaroBordoni",
                excerpt: "Es alguien confiable, que trabaja de forma constante y puede avanzar con sus tareas sin necesidad de mucho seguimiento.",
            },
        },
        versatility: {
            title: "Hablo el idioma de mercadeo, finanzas y TI",
            description: "Trabajo con cada equipo en sus propios términos, algo útil cuando un proyecto los cruza a los tres.",
            evidence: {
                testimonial: "kellyMejia",
                excerpt: "Es un profesional diligente, propositivo y con una gran capacidad para aportar soluciones que suplen las necesidades de cada área.",
            },
        },
        calm: {
            title: "Calma cuando algo se rompe",
            description: "Cuando un servicio falla, busco la causa en los logs, las trazas y las métricas, lo arreglo y dejo una alerta para verlo antes la próxima vez.",
            evidence: {
                testimonial: "rodrigoSanchez",
                excerpt: "su forma de encarar problemas: sin dramas, con tranquilidad y siempre buscando soluciones",
            },
        },
        business: {
            title: "Tecnología que sirve al negocio",
            description: "Mido una solución por lo que cambia para el negocio, ya sean leads que llegan completos al CRM, reportes que ya no se arman a mano o páginas que cargan rápido.",
            evidence: {
                testimonial: "danielRodriguez",
                excerpt: "combinar un excelente dominio técnico en desarrollo web con una visión estratégica",
            },
        },
        learning: {
            title: "Aprendo rápido y enseño lo que aprendo",
            description: "Aprendo la herramienta que el problema pide, de Deluge a OpenTelemetry o la API de un sistema académico, y la dejo documentada para el equipo.",
            evidence: {
                testimonial: "darwinCastano",
                excerpt: "Siempre tiene una insaciable curiosidad por aprender cosas nuevas y nos guía en el proceso.",
            },
        },
        detail: {
            title: "Cuidado con los datos",
            description: "Valido, quito duplicados y dejo registro antes de cargar o sincronizar datos, porque un registro mal cruzado cuesta más que la revisión.",
            evidence: {
                testimonial: "emmanuelBerrio",
                excerpt: "Su enfoque meticuloso y atención a los detalles han sido fundamentales para el éxito de nuestro equipo.",
            },
        },
        team: {
            title: "Comparto lo que sé",
            description: "Reviso código, explico mis decisiones y escribo la documentación que me habría gustado encontrar.",
            evidence: {
                testimonial: "paulaVega",
                excerpt: "destaco su disposición para ayudar a los demás y compartir su experiencia",
            },
        },
        initiative: {
            title: "Entrego más de lo que se pidió",
            description: "Al cerrar una tarea miro lo que la rodea, como el monitoreo que faltaba, la prueba que no existía o el paso manual que se puede automatizar.",
            evidence: {
                testimonial: "danielaBolivar",
                excerpt: "tu lanzas un balón y el te devuelve tres",
            },
        },
    },
};
