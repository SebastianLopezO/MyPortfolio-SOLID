import type {Content} from "@/types/content";

export const experience: Content["experience"] = {
    title: "Experiencia profesional",
    subtitle: {
        general: "Lo que he construido y operado en producción desde 2022",
        backend: "Los servicios, APIs e integraciones que he construido y opero desde 2022",
        crm: "CRM, automatización e integraciones en cuatro empresas desde 2022",
        data: "De la práctica de datos a los tableros y extracciones que mantengo hoy",
        devops: "Los servidores, despliegues y sistemas de monitoreo que he tenido a cargo",
        fullstack: "Productos, interfaces y APIs que he construido desde 2022",
    },
    current: "Actual",
    relevanceNote: "Ordenada por relevancia para el perfil {role}; los logros que coinciden aparecen resaltados.",
    matches: "{count} de {total} relevantes",
    projects: "Proyectos en esta empresa",
    detail: "Ver la experiencia completa",
    items: {
        tivenos: {
            title: "IT Manager & Líder de Integraciones Backend",
            summary: {
                general: "Líder backend y de integraciones en un aliado de tecnología educativa que opera Zoho CRM para universidades de Latinoamérica y España.",
                backend: "Diseño y opero los servicios en FastAPI que conectan Zoho CRM con los sistemas académicos de más de 15 instituciones, desde el contrato con cada sistema hasta su despliegue y su monitoreo.",
                crm: "Soy el puente técnico entre Zoho CRM y los sistemas académicos de más de 15 universidades, con integraciones, widgets, formularios y tableros para sus equipos de admisiones.",
                data: "Mantengo los datos de admisiones de más de 15 instituciones sincronizados entre Zoho CRM y sus sistemas académicos, y los llevo a tableros de Zoho Analytics y a PostgreSQL para analizarlos.",
                devops: "Publico más de 20 servicios como imágenes en GHCR, los despliego con GitHub Actions en servidores Linux y una VM de Azure, y los vigilo con Prometheus, Grafana, Loki y Tempo.",
                fullstack: "Además de los servicios, construyo lo que usan las personas, como widgets de Zoho CRM, formularios de admisión y becas para los sitios de las instituciones y el servicio de firmas de correo.",
            },
            bullets: [
                {
                    text: "Opero más de 20 servicios de integración en FastAPI (Python, uv, PostgreSQL) que mantienen Zoho CRM sincronizado con los sistemas académicos de más de 15 clientes educativos de Latinoamérica y España, para que aspirantes, pagos y matrículas pasen de un lado al otro sin digitación manual.",
                    roles: ["backend", "crm"],
                },
                {
                    text: "Integro sistemas académicos y plataformas heredadas mediante REST, SOAP/WS-Security (Zeep), lectores de SQL Server sobre VPN, intercambios por FTP y webhooks, usando OAuth y la Bulk API de Zoho. Las sincronizaciones largas corren como trabajos en segundo plano que responden 202 Accepted y dejan un registro de cada corrida en el CRM.",
                    roles: ["backend", "crm"],
                },
                {
                    text: "Las APIs de integración leen archivos, exponen la jerarquía académica de cada institución (unidades, niveles, modalidades y programas), reciben formularios con adjuntos y sincronizan Zoho WorkDrive, CRM y Forms.",
                    roles: ["backend", "crm"],
                },
                {
                    text: "Publico cada servicio como una imagen Docker endurecida en GHCR, desplegada con Docker Compose mediante GitHub Actions en servidores Linux, entre ellos una VM de Azure, detrás de Nginx con SSL.",
                    roles: ["devops", "backend"],
                },
                {
                    text: "Construí el stack de observabilidad, con trazas de OpenTelemetry desde los servicios FastAPI hasta Tempo, métricas en Prometheus, logs en Loki y Grafana con 4 tableros, 18 sondas de disponibilidad y 12 reglas de alerta que llegan a Telegram.",
                    roles: ["devops"],
                },
                {
                    text: "Construí cinco widgets de Zoho CRM con JavaScript, React y el SDK de widgets de Zoho. Hay un cotizador que calcula las cuotas y genera el PDF del plan de inversión, un asistente que lleva la matrícula por los cinco pasos de PeopleSoft, la captura de prospectos con carga masiva, la gestión de citas y el cambio de programa.",
                    roles: ["crm", "fullstack"],
                },
                {
                    text: "Construí formularios web de admisión, becas y relaciones familiares que las instituciones publican en sus sitios. Crean el prospecto, actualizan la oportunidad, suben los documentos a través de los servicios de integración y cargan la oferta académica en cascada.",
                    roles: ["fullstack", "crm"],
                },
                {
                    text: "Escribí el servicio de snapshots que copia en bloque los módulos de Zoho CRM a PostgreSQL con la Bulk API, para analizarlos fuera del CRM.",
                    roles: ["data", "backend"],
                },
                {
                    text: "Construí el servicio de firmas de correo (FastAPI y Jinja2) para las cinco marcas del grupo, con un diseño estándar que se ve igual en Outlook, Gmail y Apple Mail.",
                    roles: ["fullstack", "backend"],
                },
                {
                    text: "Diseño tableros de Zoho Analytics escritos en SQL y automatizaciones en Deluge para los equipos de admisiones y ventas.",
                    roles: ["data", "crm"],
                },
                {
                    text: "Gestiono la operación de TI y la mesa de ayuda del equipo (tickets, depuración y soporte), y definí los estándares de código, seguridad y despliegue que comparten los servicios.",
                    roles: ["devops", "backend"],
                },
            ],
        },
        adcom: {
            title: "Desarrollador CRM & MarTech",
            summary: {
                general: "Desarrollador de CRM y MarTech en una agencia de marketing enfocada en educación superior y marcas de consumo. Entré en febrero de 2025 como desarrollador de CRM y web, y desde junio de 2025 también administro los servidores donde corren las herramientas internas y las landing pages de la agencia.",
                backend: "Escribo los servicios que respaldan las campañas de la agencia, como las APIs de resultados en Spring Boot, las automatizaciones de correo (los resultados de cada noche, la bienvenida y el cumpleaños), un receptor de eventos de entrega y automatizaciones sobre la API de Zoho.",
                crm: "Automatizo Zoho CRM y Zoho Creator para los clientes de la agencia y conecto sus embudos, para que las landing pages, los formularios, WhatsApp, Meta Ads y Google Ads lleguen al CRM con su origen.",
                data: "Preparo las cargas masivas y la limpieza de datos de cada cliente en Zoho, mido los envíos de correo en PostgreSQL y llevo a cada lead al CRM con el origen que mercadeo necesita para comparar canales.",
                devops: "Administro el VPS de la agencia y la plataforma que despliega más de 100 landing pages, con un Nginx por cliente, despliegues por GitHub Actions y rsync, monitoreo diario y una medición semanal con Lighthouse.",
                fullstack: "Construí y mantengo más de 90 landing pages de admisiones en React y TypeScript, sus formularios conectados a Zoho y la plataforma que las publica.",
            },
            bullets: [
                {
                    text: "Configuro módulos, flujos de trabajo y funciones personalizadas en Deluge sobre Zoho CRM para automatizar la operación comercial y de admisiones.",
                    roles: ["crm"],
                },
                {
                    text: "Construí más de 90 landing pages y micrositios de admisiones para campañas de educación superior, conectados a Zoho Forms y Zoho CRM para capturar y enrutar leads.",
                    roles: ["fullstack", "crm"],
                },
                {
                    text: "Construí la plataforma que publica las landing pages. Un workflow reutilizable de GitHub Actions compila cada una, verifica su ruta, comprime los archivos y los sube por rsync al VPS, donde un Nginx por cliente la sirve sin reconstruir imágenes ni reiniciar nada.",
                    roles: ["devops", "fullstack"],
                },
                {
                    text: "Mantengo los más de 100 repositorios de landing pages con scripts que aplican un mismo cambio a todos, un monitor diario que revisa el estado HTTP, Google Tag Manager, la compresión, la caché, los despliegues pendientes y los certificados, y una medición semanal con Lighthouse de las landings principales.",
                    roles: ["devops"],
                },
                {
                    text: "Integro WhatsApp, Meta Ads, Google Ads, Typeform y Shopify con Zoho CRM mediante APIs REST y webhooks, además de automatizaciones serverless sobre la API de Zoho.",
                    roles: ["crm", "backend"],
                },
                {
                    text: "Escribí las herramientas de operación masiva sobre la API de Zoho, con cargas por lotes que se pueden retomar, vínculos, etiquetas y borrados desde CSV, y la sincronización de clientes entre la base Oracle de un cliente y su CRM.",
                    roles: ["crm", "data", "backend"],
                },
                {
                    text: "Desarrollé APIs de resultados y un generador de plantillas HTML con Spring Boot y Thymeleaf para marcas nacionales de lotería.",
                    roles: ["backend", "fullstack"],
                },
                {
                    text: "Automaticé los correos de las marcas de lotería. El de resultados de cada noche lo arma un script en Python con Jinja2 desde la API de resultados y lo envía Amazon SES cuando están todos los sorteos, y los de bienvenida y cumpleaños llevan el nombre y el segmento de quien los recibe.",
                    roles: ["backend", "data"],
                },
                {
                    text: "Construí un receptor en FastAPI que guarda en PostgreSQL los eventos de entrega de los correos de resultados (Amazon SNS), para medir cada envío.",
                    roles: ["backend", "data"],
                },
                {
                    text: "Construí la landing de captación de una inmobiliaria. Un workflow de GitHub Actions publica cada madrugada el inventario de su cuenta de Wasi, y las solicitudes de asesoría, contacto y visita quedan en Supabase.",
                    roles: ["fullstack", "devops"],
                },
                {
                    text: "Automaticé el contacto de leads con agentes de IA en Dapta y construí aplicaciones internas en Zoho Creator.",
                    roles: ["crm"],
                },
                {
                    text: "Administro un VPS con Docker, Nginx, SSL, Prometheus, Nagios y n8n que aloja herramientas internas y automatizaciones.",
                    roles: ["devops"],
                },
                {
                    text: "Asesoro a los equipos de desarrollo, mercadeo y analítica en integraciones por API, flujos de automatización y arquitectura de datos.",
                    roles: ["crm", "data"],
                },
            ],
        },
        muvu: {
            title: "Desarrollador Backend & Analista de Datos",
            summary: {
                general: "Trabajo de datos, CRM y backend para los equipos comerciales y de operaciones de una agencia de estudios en el exterior.",
                backend: "Desarrollé componentes e integraciones para la web principal de una agencia de estudios en el exterior y diseñé cómo entraban sus datos al CRM.",
                crm: "Fui analista de CRM y del ecosistema Zoho de una agencia de estudios en el exterior. Depuré sus datos y automaticé el trabajo repetitivo del equipo comercial.",
                data: "Construí los reportes de Power BI con los que finanzas, ventas y mercadeo de una agencia de estudios en el exterior tomaban decisiones, a partir de datos del CRM que yo mismo depuraba.",
                devops: "Además del trabajo de datos y CRM, administré los servidores y la infraestructura de TI de una agencia de estudios en el exterior y di soporte a sus usuarios.",
                fullstack: "Desarrollé componentes para el sitio web de una agencia de estudios en el exterior e integraciones de servicios, junto al trabajo de datos y CRM.",
            },
            bullets: [
                {
                    text: "Construí informes en Power BI con DAX para las áreas financiera, comercial y de mercadeo, que apoyaron sus decisiones estratégicas.",
                    roles: ["data"],
                },
                {
                    text: "Audité, limpié y validé los datos del CRM para habilitar análisis comerciales confiables.",
                    roles: ["data", "crm"],
                },
                {
                    text: "Lideré la automatización de operaciones repetitivas del CRM para reducir la carga manual del equipo comercial.",
                    roles: ["crm"],
                },
                {
                    text: "Diseñé la arquitectura de datos entrante para capturar, normalizar y transformar la información dentro del CRM.",
                    roles: ["data", "backend"],
                },
                {
                    text: "Desarrollé componentes web e integraciones de servicios para la plataforma web principal de la empresa, que mejoraron su experiencia de uso y su rendimiento.",
                    roles: ["fullstack", "backend"],
                },
                {
                    text: "Pasé de analista de datos a analista de CRM y del ecosistema Zoho, y después también a analista de TI.",
                    roles: ["crm", "devops"],
                },
                {
                    text: "Administré la infraestructura de servidores de la empresa y di soporte a los usuarios internos.",
                    roles: ["devops"],
                },
            ],
        },
        quipux: {
            title: "Analista de Datos (Práctica)",
            summary: {
                general: "Práctica de análisis de datos en el equipo de automatización del recaudo.",
                backend: "Mi primera práctica, con scripts en Python y SQL que limpiaban, cruzaban y cargaban datos para el equipo de automatización del recaudo.",
                crm: "Práctica de datos en la que preparé las bases y las campañas de contacto del área de recaudo, con sus listas de exclusión de correo y SMS.",
                data: "Práctica de análisis de datos con rutinas ETL, tableros de KPI, notebooks de seguimiento y reportes automáticos para el recaudo y la movilidad.",
                devops: "Práctica de datos en la que automaticé descargas y procesos repetitivos con Python y scripts por lotes.",
                fullstack: "Práctica de análisis de datos en el área de recaudo, mi primer trabajo en tecnología, entre limpieza, ETL y tableros.",
            },
            bullets: [
                {
                    text: "Construí rutinas ETL para limpiar, transformar y cargar datos destinados a informes gerenciales.",
                    roles: ["data"],
                },
                {
                    text: "Automaticé procesos de datos y reportes periódicos con scripts en Python y herramientas de BI.",
                    roles: ["data", "backend"],
                },
                {
                    text: "Diseñé tableros para el seguimiento de KPIs en los procesos de recaudo y movilidad.",
                    roles: ["data"],
                },
                {
                    text: "Implementé rutinas de extracción y limpieza de datos con SQL sobre bases de datos relacionales.",
                    roles: ["data"],
                },
                {
                    text: "Escribí notebooks en Python con Pandas para el seguimiento diario de las campañas del área en varias ciudades y para depurar las bases de datos compradas.",
                    roles: ["data"],
                },
                {
                    text: "Mantuve las listas de exclusión de correo y SMS de las campañas y automaticé descargas, filtros y cruces de archivos para generarlas sin trabajo manual.",
                    roles: ["data", "crm"],
                },
            ],
        },
    },
};
