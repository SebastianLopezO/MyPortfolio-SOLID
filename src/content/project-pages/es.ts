import type {ProjectPagesCopy} from "@/types/project";

export const projectPages: ProjectPagesCopy = {
    ui: {
        eyebrow: {product: "Producto", work: "Proyecto de trabajo", education: "Proyecto de formación"},
        whatItDoes: "Qué hace",
        overview: "De qué se trata",
        howItWorks: "Cómo funciona",
        decisions: "Decisiones y sus costos",
        repositories: "Repositorios",
        repositoriesNote: "Cada repositorio público del proyecto, con lo que contiene.",
        stack: "Stack",
        screens: "Pantallas",
        organization: "Organización en GitHub",
        previous: "Proyecto anterior",
        next: "Proyecto siguiente",
        archiveFilter: "Filtrar el archivo por organización",
        archiveAll: "Todos",
        related: {
            title: "Relacionado",
            places: "Dónde se hizo",
            experience: "Experiencia",
            program: "Programa",
            organization: "Organización en GitHub",
            certifications: "Certificaciones que se aplican aquí",
            siblings: "Más proyectos de {place}",
        },
    },
    items: {
        peppercrm: {
            tagline: "Un CRM modular para leads, tareas y comunicaciones, hecho en equipo",
            role: "Desarrollador backend principal",
            status: "Terminado en 2025",
            overview: [
                "PepperCRM es un CRM modular para gestionar clientes, ventas y oportunidades. Registra leads, los mueve por etapas en un tablero, asigna tareas y guarda los comentarios, archivos y correos de cada cliente. Lo construimos cuatro personas en la organización PepperTechDev entre febrero y noviembre de 2025.",
                "Escribí casi todo el backend, desde la API en Spring Boot y su seguridad hasta su integración con MongoDB y Redis y su despliegue.",
            ],
            decisions: [
                {
                    title: "Un módulo por cada parte del negocio",
                    problem: "Un CRM reúne leads, tareas, comentarios, archivos y correos, y cada parte tenía que poder probarse y cambiarse por separado.",
                    solution: "Cada parte del negocio es un módulo con su controlador, su servicio, su validador y su mapeador.",
                    tradeoff: "agregar una función obliga a tocar más archivos.",
                },
                {
                    title: "Límite de tasa en la API",
                    problem: "Un cliente mal configurado podía saturar la API.",
                    solution: "Un filtro limita cuántas peticiones acepta la API, además de JWT y CORS por entorno.",
                },
            ],
            figures: {modules: "módulos de negocio en la API", apiCommits: "commits míos en la API"},
            diagram: {
                title: "Cómo se arma PepperCRM",
                caption: "La app web habla con la API, que guarda en MongoDB, cachea en Redis y envía correos; la fila de abajo es la entrega.",
                labels: {
                    web: "Web",
                    react: "React y Vite",
                    kanban: "Tablero kanban de leads",
                    forms: "Formularios y tareas",
                    api: "API",
                    spring: "Spring Boot con Java 17",
                    security: "Spring Security, JWT y límite de tasa",
                    modules: "Módulos de negocio",
                    data: "Datos",
                    mongo: "MongoDB Atlas",
                    redis: "Caché en Redis",
                    mail: "Servicio de correo asíncrono",
                    delivery: "Entrega",
                    images: "Imágenes en Docker Hub",
                    render: "Despliegue en Render",
                    kubernetes: "Manifiestos de Kubernetes",
                },
            },
            images: {
                kanban: "El frontend real de PepperCRM con los datos de ejemplo de su repositorio, que muestra el tablero de tareas en columnas Por hacer, En progreso y Hecho, y el menú de leads, contactos, negocios, productos, proveedores y cotizaciones.",
            },
            seo: {
                title: "PepperCRM, un CRM en Spring Boot, React y MongoDB · Proyecto",
                description: "Un CRM hecho en equipo, con una API en Spring Boot con JWT y límite de tasa, MongoDB Atlas, Redis, React con tablero kanban y despliegue en Render.",
            },
        },
        portfolio: {
            tagline: "Un portafolio bilingüe, prerenderizado y con una vista para cada rol",
            role: "Único desarrollador",
            status: "En vivo en sebastianlopezo.page",
            overview: [
                "Este sitio es mi hoja de vida en forma de producto. Cada vista por rol es una URL prerenderizada con su propio texto, su orden de secciones y sus cifras, para que quien lo lea encuentre primero lo que busca.",
                "Todo lo que dice tiene una fuente. Las cifras salen del código, de GitHub o de la configuración de los sistemas, y docs/content.md registra cómo y cuándo se midió cada una.",
            ],
            decisions: [
                {
                    title: "Prerenderizar en vez de un servidor",
                    problem: "Una aplicación de una sola página que se arma en el navegador llega vacía hasta que corre su JavaScript.",
                    solution: "Cada página se prerenderiza en el build, así que llega completa sin JavaScript y Nginx la sirve como archivo estático.",
                    tradeoff: "cada cambio de contenido exige un nuevo build y un despliegue.",
                },
                {
                    title: "Cada sección en su propio chunk",
                    problem: "Con todas las secciones en un solo archivo, el JavaScript de arranque se pasaría de su presupuesto.",
                    solution: "El hero hidrata primero y el resto llega por partes, lo que mantiene el JavaScript de arranque dentro de su presupuesto.",
                    tradeoff: "una espera corta antes de que cada sección responda.",
                },
                {
                    title: "Un asistente sin servicios externos",
                    problem: "Un asistente conectado a un servicio externo podría contradecir la página y le enviaría las preguntas a terceros.",
                    solution: "Responde buscando en el mismo contenido del sitio, así que nunca contradice la página ni envía las preguntas a terceros.",
                    tradeoff: "solo sabe lo que la página sabe.",
                },
                {
                    title: "SolidJS en vez de React",
                    problem: "El runtime de React era la mayor parte del JavaScript de arranque, e hidratar volvía a ejecutar cada componente antes de que la página pudiera responder.",
                    solution: "SolidJS compila cada vista a actualizaciones directas del DOM e hidrata el HTML prerenderizado en su lugar, así que el script de arranque pasó de 63 KB a menos de 10 KB comprimido y un cambio de rol solo toca lo que depende de él.",
                    tradeoff: "cada elemento hidratado lleva una clave pequeña, lo que hace el HTML algo más pesado.",
                },
            ],
            figures: {views: "vistas por rol", languages: "idiomas"},
            diagram: {
                title: "Del contenido a la página",
                caption: "El contenido tipado se prerenderiza en el build; el navegador hidrata cada sección por separado.",
                labels: {
                    content: "Contenido",
                    facts: "Datos con su fuente",
                    copy: "Texto en español e inglés por rol",
                    stats: "Estadísticas diarias de GitHub",
                    build: "Build",
                    vite: "Vite y TypeScript",
                    prerender: "Prerenderizado de cada ruta",
                    budgets: "Presupuestos de JavaScript, CSS y HTML",
                    browser: "Navegador",
                    sections: "Secciones que cargan por separado",
                    roles: "Seis vistas por rol",
                    assistant: "Asistente local",
                    delivery: "Entrega",
                    image: "Imagen de Nginx sin privilegios en GHCR",
                    deploy: "Docker Compose en el servidor",
                    checks: "Playwright y Lighthouse contra producción",
                },
            },
            images: {
                home: "La portada real de este portafolio en la vista full-stack, con la disponibilidad, el nombre, el rol, el resumen y el selector de perfiles.",
                project: "Una página de proyecto real de este portafolio, la del detector de enfermedades de lechuga, con su tablero de métricas, su ficha y sus cifras.",
            },
            seo: {
                title: "MyPortfolio, este portafolio en SolidJS y TypeScript · Proyecto",
                description: "Un portafolio bilingüe prerenderizado con vistas por rol, una página por proyecto, cifras de GitHub al día en cada build y un asistente local.",
            },
        },
        taurus: {
            tagline: "De archivos CSV a una API de métricas y un tablero interactivo",
            role: "Único desarrollador",
            status: "Terminada en 2024",
            overview: [
                "Una prueba técnica de datos que resolví en tres repositorios, uno por capa, para la carga y el análisis de los archivos CSV, una API de métricas y un tablero para explorarlas.",
            ],
            decisions: [
                {
                    title: "Una capa por repositorio",
                    problem: "La prueba técnica tenía tres partes, la carga y el análisis de los archivos CSV, una API de métricas y un tablero.",
                    solution: "Cada capa vive en su propio repositorio, así que cada parte se pudo probar por su cuenta.",
                    tradeoff: "coordinar tres repositorios en una prueba corta.",
                },
            ],
            figures: {repositories: "repositorios"},
            diagram: {
                title: "De los archivos al tablero",
                caption: "Los datos van de izquierda a derecha, del CSV a la base, de la base a la API y de la API al tablero.",
                labels: {
                    data: "Datos",
                    csv: "Archivos CSV de la prueba",
                    mysql: "MySQL y MariaDB",
                    notebook: "Análisis exploratorio en Pandas",
                    api: "API",
                    fastapi: "FastAPI con SQLAlchemy asíncrono",
                    queries: "Consultas por cliente, agente y estado",
                    ui: "Tablero",
                    react: "React y TypeScript",
                    grid: "Grilla de AG Grid",
                    charts: "Gráficas de Plotly.js",
                },
            },
            images: {
                tables: "El frontend real de Taurus con datos de ejemplo, que muestra las tablas agregadas de AG Grid con cotizaciones, negocios nuevos, conversión y primas por tenant y por agente.",
                charts: "Las gráficas reales de Plotly.js de Taurus con datos de ejemplo, que muestran la tasa de conversión de cotizaciones por tenant, por agente y por región.",
            },
            seo: {
                title: "Prueba técnica Taurus: de CSV a un tablero · Proyecto",
                description: "Carga de CSV a MySQL, análisis en Pandas, una API de métricas en FastAPI y un tablero en React con AG Grid y Plotly.",
            },
        },
        observability: {
            tagline: "Métricas, logs, trazas, sondas y alertas para más de 20 servicios",
            role: "Único desarrollador",
            status: "En producción",
            overview: [
                "Con más de 20 servicios de integración en producción, necesitaba enterarme cuando alguno fallara sin esperar a que un equipo lo reportara. Este repositorio reúne todo lo necesario para eso, desde qué se mide y dónde se guarda hasta cómo se ve y a quién le avisa.",
                "Lo construí en junio de 2026 y corre junto a los servicios que vigila.",
            ],
            decisions: [
                {
                    title: "Sondas desde afuera además de métricas desde adentro",
                    problem: "Las métricas de un servicio no dicen nada si el servicio está caído o su dominio no responde.",
                    solution: "Las 18 sondas revisan cada servicio desde afuera, como lo haría un usuario.",
                    tradeoff: "más configuración que mantener cada vez que llega un servicio nuevo.",
                },
                {
                    title: "El socket de Docker detrás de un proxy",
                    problem: "Promtail necesita descubrir los contenedores, pero el socket de Docker completo le daría control sobre el servidor.",
                    solution: "Un proxy de solo lectura le deja ver los contenedores sin poder cambiar nada.",
                },
                {
                    title: "Alertas a Telegram",
                    problem: "Las alertas tenían que llegar al teléfono sin pagar un servicio de guardias.",
                    solution: "Un bot envía las alertas a un chat de Telegram.",
                    tradeoff: "depender de un bot y de un chat que hay que cuidar.",
                },
            ],
            figures: {
                jobs: "jobs de Prometheus",
                probes: "sondas de disponibilidad",
                alerts: "reglas de alerta",
                dashboards: "tableros de Grafana"
            },
            diagram: {
                title: "De la señal al aviso",
                caption: "Las señales van de izquierda a derecha; la fila de abajo es cómo corre el stack.",
                labels: {
                    targets: "Qué se vigila",
                    services: "Servicios en FastAPI instrumentados",
                    probes: "Sondas de Blackbox Exporter",
                    hosts: "Contenedores, máquinas y Nginx",
                    collection: "Recolección",
                    prometheus: "Prometheus con 26 jobs",
                    loki: "Loki con Promtail",
                    tempo: "Tempo con OpenTelemetry",
                    people: "Quién se entera",
                    dashboards: "4 tableros de Grafana",
                    rules: "12 reglas de alerta",
                    telegram: "Avisos en Telegram",
                    operation: "Operación",
                    compose: "Docker Compose junto a los servicios",
                    proxy: "Proxy de solo lectura del socket de Docker",
                    retention: "15 días de retención",
                },
            },
            images: {
                dashboard: "Recreación del tablero de Grafana de los servicios de integración, con 26 jobs de Prometheus, 18 sondas de disponibilidad, 12 reglas de alerta, peticiones y latencia por servicio, el estado de cada sonda y los logs recientes de Loki.",
                trace: "Recreación de una traza en Tempo de una petición POST /leads, con la validación, las credenciales, la respuesta 429 del CRM con su reintento a los 400 ms, la consulta al sistema académico y el job guardado en PostgreSQL.",
            },
            seo: {
                title: "Plataforma de observabilidad para servicios en producción · Proyecto",
                description: "Prometheus con 26 jobs, 18 sondas de disponibilidad, Loki, Tempo y Grafana con 4 tableros y 12 reglas de alerta que llegan a Telegram.",
            },
        },
        crmWidgets: {
            tagline: "Cinco procesos comerciales dentro del registro de Zoho CRM donde ocurren",
            role: "Único desarrollador",
            status: "En uso",
            overview: [
                "Cada widget lleva un proceso comercial a un botón dentro del registro de Zoho CRM donde ocurre, como la cotización y la matrícula en la oportunidad, la captura de prospectos en la campaña y las citas en su lista de eventos.",
                "Todos se empaquetan con Zoho Extension Toolkit y hablan con el CRM a través de su SDK; los que necesitan más lógica se escriben en React con Vite.",
            ],
            decisions: [
                {
                    title: "Calcular en el navegador y escribir al final",
                    problem: "Probar escenarios de cotización contra el CRM dejaría registros a medias.",
                    solution: "El cotizador hace todos los cálculos en el navegador y solo escribe en el CRM cuando el asesor confirma.",
                    tradeoff: "replicar en JavaScript reglas que también viven en el CRM.",
                },
                {
                    title: "Crear antes de cerrar",
                    problem: "Si un cambio de programa falla a mitad de camino, la oportunidad se puede perder.",
                    solution: "El widget crea la nueva oportunidad, luego cierra la original y al final deja el registro.",
                },
                {
                    title: "Ante la duda, bloquear",
                    problem: "Si el widget de citas no puede confirmar un rol, un campus o un alcance, podría asignar mal una oportunidad.",
                    solution: "Bloquea la acción y muestra el motivo en pantalla.",
                },
            ],
            figures: {widgets: "widgets", steps: "pasos de matrícula en PeopleSoft"},
            diagram: {
                title: "Dónde viven los widgets y con qué hablan",
                caption: "Cada widget se abre desde un registro del CRM y trabaja a través del SDK, de funciones en Deluge o del sistema académico.",
                labels: {
                    crm: "Dónde viven",
                    deals: "Oportunidades",
                    campaigns: "Campañas",
                    events: "Citas (eventos del CRM)",
                    widgets: "Widgets",
                    pricing: "Cotizador con PDF",
                    enrollment: "Asistente de matrícula",
                    capture: "Captura de prospectos",
                    appointments: "Gestión de citas",
                    change: "Cambio de programa",
                    backends: "Con qué hablan",
                    sdk: "SDK de widgets de Zoho",
                    deluge: "Funciones en Deluge",
                    sis: "PeopleSoft Campus Solutions",
                    delivery: "Entrega",
                    zet: "Zoho Extension Toolkit",
                    vite: "Vite con certificado local",
                    qa: "Pruebas con jsdom",
                },
            },
            images: {
                quoter: "Recreación del cotizador de precios dentro de una oportunidad del CRM, con plan de pagos, beca, convenio y una promoción recortada por el tope del 80 %, el desglose de cada pago y los botones para el PDF y para aplicar la cotización.",
                enrollment: "Recreación del widget de matrícula, con las páginas de verificación, ejecución y resultado, los cinco pasos contra el sistema académico con su tiempo y un ejemplo de error traducido con acceso al texto original.",
            },
            seo: {
                title: "Widgets de Zoho CRM para cotizar, matricular y agendar · Proyecto",
                description: "Cinco widgets dentro de Zoho CRM, con un cotizador con PDF, un asistente de matrícula para PeopleSoft, captura de prospectos, citas y cambio de programa.",
            },
        },
        admissionsForms: {
            tagline: "Del sitio de la institución al CRM, sin digitar la solicitud dos veces",
            role: "Único desarrollador",
            status: "En uso",
            overview: [
                "Para inscribirse, un aspirante llena formularios en el sitio de la institución. Estos formularios crean su registro en Zoho CRM, actualizan la oportunidad con la solicitud completa y suben sus documentos, a través de los servicios de integración de cada institución.",
                "Cada institución tiene los suyos, con su oferta académica, sus campos y su marca, y el script común resuelve lo que todos repiten, que son los parámetros UTM y la oferta en cascada.",
            ],
            decisions: [
                {
                    title: "Pasar por el servicio de integración",
                    problem: "Cada institución tiene sus propias reglas para validar y guardar una solicitud.",
                    solution: "Los formularios llaman a la API de la institución, que valida, normaliza y guarda en el CRM. Las reglas de cada institución viven en un solo lugar.",
                    tradeoff: "una pieza más que mantener.",
                },
                {
                    title: "La oferta sale de la API",
                    problem: "Con listas escritas en el HTML, cada programa nuevo obligaría a tocar el formulario.",
                    solution: "Los selects se llenan con la jerarquía académica del servicio, así que un programa nuevo aparece solo.",
                },
            ],
            figures: {forms: "formularios web", institutions: "instituciones con formularios"},
            diagram: {
                title: "Del formulario al CRM",
                caption: "El formulario llama al servicio de integración de la institución, que escribe en Zoho.",
                labels: {
                    site: "Sitio de la institución",
                    steps: "Registro y solicitud en varias páginas",
                    documents: "Carga de documentos",
                    global: "Script común de los formularios del CRM",
                    services: "Servicios de integración",
                    api: "API de cada institución",
                    hierarchy: "Jerarquía académica",
                    files: "Recepción de archivos",
                    crm: "Zoho",
                    leads: "Prospectos",
                    deals: "Oportunidades",
                    workdrive: "Documentos en Zoho WorkDrive",
                },
            },
            images: {
                program: "Recreación del paso Programa de un formulario de admisión, con seis listas en cascada (unidad, nivel, modalidad, periodicidad, ciclo y programa) y el resumen de la solicitud con el celular verificado.",
                documents: "Recreación del último paso del formulario, con documentos subidos, uno en curso y uno pendiente, y lo que pasa al enviar, que es la carpeta de la solicitud, la oportunidad actualizada y la página de agradecimiento.",
            },
            seo: {
                title: "Formularios web de admisión y becas conectados al CRM · Proyecto",
                description: "Formularios en varias páginas que registran al aspirante, completan su solicitud y suben sus documentos a Zoho a través de los servicios de integración.",
            },
        },
        crmSnapshots: {
            tagline: "Los módulos de Zoho CRM en PostgreSQL, listos para analizar",
            role: "Único desarrollador",
            status: "En producción",
            overview: [
                "Para analizar el CRM con SQL, el servicio exporta cada módulo con la Bulk Read API de Zoho y lo carga en PostgreSQL. Cada corrida vacía la tabla del módulo y la vuelve a llenar, así que la base tiene siempre la copia más reciente.",
                "Empezó en 2025 como un script por módulo y en 2026 pasó a ser un servicio en FastAPI con autenticación y métricas.",
            ],
            decisions: [
                {
                    title: "Exportaciones masivas en vez de consultas",
                    problem: "La API normal obliga a paginar un módulo registro por registro.",
                    solution: "La Bulk Read API entrega un módulo entero en un archivo.",
                    tradeoff: "esperar a que Zoho prepare la exportación.",
                },
                {
                    title: "Un registro por corrida",
                    problem: "Sin un registro, saber qué tan reciente es cada copia obliga a revisar los logs.",
                    solution: "Cada exportación deja su fila con el módulo, la fecha y el estado.",
                },
            ],
            figures: {modules: "módulos de una institución"},
            diagram: {
                title: "Del CRM a PostgreSQL",
                caption: "Los datos van de Zoho al servicio y del servicio a PostgreSQL.",
                labels: {
                    zoho: "Zoho CRM",
                    bulk: "Bulk Read API por módulo",
                    zip: "Exportaciones en ZIP con CSV",
                    service: "Servicio",
                    api: "API en FastAPI",
                    auth: "Autenticación por clave",
                    metrics: "Métricas para Prometheus",
                    warehouse: "PostgreSQL",
                    postgres: "Tablas por módulo",
                    log: "Registro de cada corrida",
                    analysis: "Consultas y tableros",
                },
            },
            images: {
                sql: "Recreación de un cliente SQL sobre la base de snapshots, con una tabla por módulo del CRM, una consulta al registro de corridas y otra de oportunidades por etapa, con el último snapshot de cada módulo completado.",
            },
            seo: {
                title: "Snapshots de Zoho CRM en PostgreSQL · Proyecto",
                description: "Un servicio en FastAPI que exporta los módulos de Zoho CRM con la Bulk Read API y los carga en PostgreSQL para analizarlos, con un registro de cada corrida.",
            },
        },
        landingPlatform: {
            tagline: "Un push a una landing, y la página en vivo sin reiniciar nada",
            role: "Único desarrollador",
            status: "En producción",
            overview: [
                "La agencia publica las landing pages de sus clientes bajo el dominio de cada uno, una ruta por programa o campaña. Esta plataforma es todo lo que hay entre un push a una landing y la página en vivo, del build y la publicación al servidor y la vigilancia.",
                "Las landings se editan con un constructor visual o a mano, y los dos caminos terminan en el mismo workflow.",
            ],
            decisions: [
                {
                    title: "Publicar archivos en vez de imágenes",
                    problem: "Si cada landing viajara dentro de una imagen, publicarla obligaría a reconstruirla y a reiniciar el contenedor.",
                    solution: "Cada landing se sube como archivos estáticos a una carpeta que el Nginx del cliente ya monta.",
                    tradeoff: "un cambio de configuración de Nginx sí pasa por git y por una recarga.",
                },
                {
                    title: "Un usuario de despliegue encerrado",
                    problem: "La credencial con la que CI despliega se podría filtrar.",
                    solution: "El usuario de CI no tiene shell y rrsync lo limita a su carpeta, así que una credencial filtrada no abre el servidor.",
                },
                {
                    title: "El HTML nunca se precomprime",
                    problem: "Google Tag Manager se inyecta en el servidor con sub_filter, que no funciona sobre archivos ya comprimidos.",
                    solution: "Solo se precomprimen JS, CSS, SVG y JSON, y el HTML se deja sin precomprimir.",
                },
            ],
            figures: {repositories: "repositorios de landing pages", gateways: "gateways de Nginx por cliente"},
            diagram: {
                title: "Del push a la página en vivo",
                caption: "Cada cambio va del repositorio a GitHub Actions y de ahí al VPS; la fila de abajo vigila todo.",
                labels: {
                    repos: "Repositorios",
                    landings: "106 landing pages en React y Vite",
                    builder: "Cambios desde un constructor visual o a mano",
                    caller: "Un workflow mínimo en cada landing",
                    ci: "GitHub Actions",
                    build: "Instalación, build y ruta base",
                    compress: "gzip y WebP",
                    rsync: "rsync en dos fases con usuario restringido",
                    server: "VPS",
                    gateways: "Un Nginx por cliente en Docker",
                    readonly: "Landings montadas en solo lectura",
                    tags: "Google Tag Manager inyectado en el servidor",
                    watch: "Vigilancia",
                    monitor: "Monitor diario que abre issues",
                    lighthouse: "Lighthouse semanal",
                    rollback: "Rutas de reversión documentadas",
                },
            },
            images: {
                deploy: "Recreación de una ejecución del workflow de despliegue de una landing, con instalación, build, verificación, compresión, SSH con la llave del host fijada, rsync en dos fases y la comprobación de que el sitio público sirve el commit.",
                monitor: "Recreación del issue del monitor diario, con una landing con Google Tag Manager duplicado y otra con un despliegue pendiente, qué revisar en cada caso y los comentarios de días anteriores.",
            },
            seo: {
                title: "Plataforma de despliegue para más de 100 landing pages · Proyecto",
                description: "Un workflow reutilizable, rsync con usuario restringido, un Nginx por cliente, monitoreo diario y Lighthouse semanal para 106 repositorios de landing pages.",
            },
        },
        emailAutomations: {
            tagline: "Correos que salen solos, con el nombre y el segmento de cada suscriptor",
            role: "Único desarrollador",
            status: "En producción",
            overview: [
                "Estas automatizaciones arman y envían los correos de las marcas de lotería que atiende la agencia, el de resultados de cada noche por Amazon SES y los que dispara un evento del suscriptor, como la bienvenida o el cumpleaños.",
                "El de resultados se arma desde la API oficial y espera los sorteos que se publican tarde. Los destinatarios salen de Zoho Analytics, cada correo lleva el nombre y el segmento de la persona y los eventos de entrega vuelven a PostgreSQL. Los resultados también se exponen en una API de Spring Boot con plantillas Thymeleaf.",
            ],
            decisions: [
                {
                    title: "Esperar los sorteos tardíos, con un límite",
                    problem: "La API publica algunos sorteos con más de una hora de retraso.",
                    solution: "El script compara con semanas anteriores para saber qué falta y el pipeline reintenta durante hora y media; después envía lo publicado en vez de retrasar el correo.",
                },
                {
                    title: "Plantillas que solo tienen variables",
                    problem: "Un cambio de diseño no puede alterar una cifra, y un formateador del IDE ya rompió una plantilla una vez.",
                    solution: "El diseño vive en la plantilla y los datos llegan del script. La plantilla tiene marcas que apagan el formateador, y el script avisa con la línea exacta si algo se daña.",
                },
                {
                    title: "Un asunto con fecha",
                    problem: "Con un asunto fijo, Gmail agrupa los envíos de todos los días en una sola conversación.",
                    solution: "El asunto lleva la fecha, así que cada día llega como un correo nuevo.",
                },
                {
                    title: "Una plantilla al día, los datos de cada persona al enviar",
                    problem: "Cada correo lleva el nombre de quien lo recibe.",
                    solution: "La plantilla deja el nombre como variable y Amazon SES lo reemplaza con el dato de cada destinatario al enviar, así que el HTML se arma una sola vez al día.",
                },
            ],
            figures: {brands: "marcas de lotería con correo de resultados", attempts: "intentos antes de enviar"},
            diagram: {
                title: "De la API al buzón",
                caption: "El pipeline nocturno lee la API, toma los destinatarios de Zoho Analytics y envía; los eventos de entrega vuelven a PostgreSQL.",
                labels: {
                    source: "Fuente",
                    api: "API oficial de resultados",
                    history: "Historial paginado de días anteriores",
                    analytics: "Destinatarios desde Zoho Analytics",
                    pipeline: "Pipeline nocturno",
                    cron: "Cron en el servidor",
                    template: "Plantilla Jinja2 que solo tiene variables",
                    retries: "Reintentos cada 10 minutos",
                    delivery: "Entrega y medición",
                    ses: "Amazon SES",
                    events: "Eventos de entrega por Amazon SNS",
                    postgres: "PostgreSQL",
                },
            },
            images: {
                email: "Recreación del correo diario de resultados de una lotería ficticia en un buzón, con un correo por día, la fecha en el asunto y los resultados de ocho sorteos.",
            },
            seo: {
                title: "Correo hiperpersonalizado a escala · Proyecto",
                description: "Correos de resultados por Amazon SES que esperan los sorteos tardíos, y correos de bienvenida y cumpleaños, con el nombre y el segmento de cada suscriptor.",
            },
        },
        zohoToolkit: {
            tagline: "Cargas, vínculos y sincronizaciones masivas en el CRM de cada cliente",
            role: "Único desarrollador",
            status: "En uso",
            overview: [
                "Cada cliente de la agencia tiene en Zoho CRM grandes volúmenes de registros que a veces hay que cargar, corregir, vincular o borrar de una vez. Esta caja de herramientas reúne los scripts y notebooks que lo hacen por cliente, sobre la API masiva de Zoho.",
                "También incluye integraciones pequeñas que un cliente necesitó, como sincronizar su base Oracle con el CRM o llevar las fotos de sus inmuebles a otra plataforma.",
            ],
            decisions: [
                {
                    title: "Trabajos que se pueden retomar",
                    problem: "Una carga grande se puede cortar a mitad de camino.",
                    solution: "La carga se parte en lotes y cada trabajo se consulta hasta que termina; si algo se corta, se retoma desde el último lote en vez de empezar de nuevo.",
                },
                {
                    title: "Una carpeta por cliente",
                    problem: "Un cambio para un cliente no puede tocar los datos de otro.",
                    solution: "Cada cliente tiene su carpeta con sus propios scripts.",
                    tradeoff: "repetir algo de código entre carpetas.",
                },
            ],
            figures: {clients: "clientes con su caja de herramientas"},
            diagram: {
                title: "De un CSV al CRM de un cliente",
                caption: "Las entradas pasan por trabajos masivos que se pueden retomar antes de llegar a su destino.",
                labels: {
                    inputs: "Entradas",
                    csv: "Archivos CSV de cada cliente",
                    oracle: "Base Oracle de un cliente",
                    notebooks: "Notebooks de preparación",
                    jobs: "Operaciones",
                    bulk: "Bulk Write API por lotes",
                    resume: "Trabajos que se retoman",
                    links: "Vínculos, etiquetas y borrados",
                    targets: "Destinos",
                    crm: "Zoho CRM de cada cliente",
                    sms: "Envíos de SMS con códigos",
                    realEstate: "Plataforma inmobiliaria de un cliente",
                },
            },
            images: {
                notebook: "Recreación de un notebook de Jupyter que carga leads en bloque. Limpia un CSV, crea el trabajo en la Bulk Write API, espera con un punto de reanudación, resume creados, actualizados y fallidos, y vincula y etiqueta los registros.",
            },
            seo: {
                title: "Herramientas de operación masiva para Zoho CRM · Proyecto",
                description: "Scripts y notebooks en Python sobre la Bulk Write API de Zoho, con cargas que se retoman, vínculos, etiquetas, borrados por CSV y sincronizaciones.",
            },
        },
        realEstateSite: {
            tagline: "El inventario que la inmobiliaria ya tiene en Wasi, publicado cada madrugada en su propio sitio",
            role: "Único desarrollador; interfaz construida con Lovable",
            status: "En producción",
            overview: [
                "Una inmobiliaria con la mayor parte de su inventario en Bogotá y municipios cercanos lleva sus inmuebles en Wasi, su software inmobiliario. Este sitio los muestra con filtros y una página por inmueble, y recibe las solicitudes de asesoría, contacto y visita.",
                "La interfaz, los simuladores y el registro de solicitudes se construyeron con Lovable. La sincronización con la API de Wasi y los workflows que la programan y despliegan el sitio son código aparte, en el mismo repositorio. Las fotos llegan a Wasi desde Zoho CRM con un servicio de las herramientas de Zoho.",
            ],
            decisions: [
                {
                    title: "Un índice para el listado, un archivo por inmueble",
                    problem: "El listado y los filtros solo necesitan 25 campos de cada inmueble.",
                    solution: "El script escribe un índice con las llaves una sola vez y deja el registro completo de cada inmueble en su propio archivo, que el sitio pide al abrir el detalle.",
                },
                {
                    title: "Publicar solo lo disponible",
                    problem: "En Wasi, un inmueble vendido o arrendado sigue activo mientras nadie lo despublique.",
                    solution: "La sincronización pide solo los disponibles y vuelve a filtrar por si la API ignora el parámetro.",
                },
                {
                    title: "Desplegar solo si algo cambió",
                    problem: "La sincronización corre cada madrugada, aunque el inventario no haya cambiado, y un push hecho con el token del propio workflow no dispara el despliegue.",
                    solution: "El workflow compara el índice, las amenidades y la carpeta de detalles y solo hace commit si algo cambió; en ese caso lanza el despliegue por su cuenta.",
                },
            ],
            figures: {properties: "inmuebles disponibles en octubre de 2026", calculators: "simuladores financieros"},
            diagram: {
                title: "De Wasi al sitio",
                caption: "La sincronización de cada madrugada escribe los datos que lee el sitio; las solicitudes van a Supabase.",
                labels: {
                    source: "Fuente",
                    wasi: "API de Wasi",
                    zoho: "Fotos que llegan desde Zoho CRM",
                    sync: "Sincronización diaria",
                    schedule: "Workflow de GitHub Actions a las 3 a. m.",
                    index: "Índice columnar de 25 campos",
                    details: "Un archivo por inmueble",
                    site: "Sitio",
                    listing: "Listado con filtros",
                    detail: "Página de cada inmueble",
                    tools: "Simuladores de hipoteca, compra y rentabilidad",
                    leads: "Solicitudes",
                    forms: "Asesoría, contacto y visita",
                    edge: "Edge Function de Supabase",
                    postgres: "PostgreSQL",
                },
            },
            images: {
                listing: "Recreación del listado de una inmobiliaria ficticia, con filtros por operación, tipo, ciudad y precio, tarjetas con insignias y el resumen de la última sincronización con Wasi.",
                detail: "Recreación de la página de un inmueble ficticio con su galería, sus datos, el simulador de crédito y el formulario para agendar una visita.",
            },
            seo: {
                title: "Landing inmobiliaria con inventario sincronizado desde Wasi · Proyecto",
                description: "Un sitio de captación que publica cada madrugada el inventario de Wasi de una inmobiliaria, con filtros, simuladores y solicitudes guardadas en Supabase.",
            },
        },
        collectionAutomation: {
            tagline: "Seguimiento de campañas y depuración de bases en la práctica de datos",
            role: "Practicante de análisis de datos",
            status: "Archivado en 2023",
            overview: [
                "En la práctica en Quipux trabajé en el equipo de automatización del recaudo. Estos 18 repositorios reúnen lo que escribí para ese trabajo diario, entre seguimiento de campañas, depuración de bases y listas de exclusión.",
                "Son privados y están archivados desde 2023.",
            ],
            decisions: [
                {
                    title: "Un repositorio por tarea",
                    problem: "El trabajo diario dejaba muchos scripts distintos de seguimiento de campañas, depuración de bases y listas de exclusión.",
                    solution: "Cada script vive en su propio repositorio, fácil de encontrar y de correr por separado.",
                    tradeoff: "no compartir código entre ellos.",
                },
            ],
            figures: {repositories: "repositorios de la práctica"},
            diagram: {
                title: "De los archivos a la campaña",
                caption: "Los archivos de entrada pasan por notebooks y scripts que producen el seguimiento, las exclusiones y los archivos de cada campaña.",
                labels: {
                    inputs: "Entradas",
                    downloads: "Descargas automáticas",
                    purchased: "Bases de datos compradas",
                    lists: "Estados de los envíos",
                    notebooks: "Procesamiento",
                    pandas: "Notebooks en Pandas",
                    filters: "Filtros y separadores",
                    joins: "Cruces y concatenaciones",
                    outputs: "Salidas",
                    tracking: "Seguimiento diario por ciudad",
                    exclusions: "Listas de exclusión de correo y SMS",
                    campaigns: "Archivos de cada campaña",
                },
            },
            images: {
                notebook: "Recreación de un notebook de seguimiento de campañas de recaudo que cruza una base comprada con las listas de exclusión de correo y SMS, cuenta los contactables y resume por campaña cuántos pagaron.",
            },
            seo: {
                title: "Automatización de campañas de recaudo en Python · Proyecto",
                description: "Notebooks en Pandas y scripts por lotes de mi práctica en Quipux, con seguimiento diario de campañas, depuración de bases y listas de exclusión de correo y SMS.",
            },
        },
        engineering: {
            tagline: "La carrera completa, un repositorio por materia",
            role: "Estudiante",
            status: "Último semestre, grado en marzo de 2027",
            overview: [
                "Desde el primer semestre guardo cada materia en un repositorio de la organización EngineeringSebastian-s. No están conectados entre sí, porque cada uno resuelve el problema de su materia, y juntos cuentan la ruta de la carrera, del pseudocódigo en PSeInt a sistemas distribuidos, redes con routers Cisco reales e inteligencia artificial.",
                "Los repositorios más recientes son portafolios con su README, sus módulos por evaluación y la forma de correrlos.",
            ],
            decisions: [],
            figures: {
                repositories: "repositorios, uno por materia o proyecto",
                commits: "commits míos en la organización"
            },
            diagram: {
                title: "Las áreas de la carrera",
                caption: "Cada área agrupa las materias cuyos repositorios aparecen más abajo.",
                labels: {
                    foundations: "Fundamentos",
                    algorithms: "Algoritmos y maratones",
                    structures: "Estructuras de datos",
                    automata: "Autómatas y compiladores",
                    systems: "Sistemas",
                    os: "Sistemas operativos",
                    networks: "Redes con equipos Cisco",
                    distributed: "Programación distribuida y paralela",
                    software: "Software",
                    databases: "Bases de datos SQL y NoSQL",
                    testing: "Pruebas y TDD",
                    patterns: "Patrones de diseño",
                    ai: "IA y datos",
                    learning: "Machine learning e IA simbólica",
                    vision: "Visión por computador",
                    simulation: "Modelos y simulación",
                },
            },
            images: {
                vision: "La matriz de confusión real del detector de enfermedades de lechuga, de la materia de visión por computador, junto a sus métricas por clase.",
                radar: "Tres salidas reales de la guía de radar, con la imagen de Sentinel-1 sin filtrar, con el filtro de Lee y agrupada con K-Means.",
            },
            seo: {
                title: "Ingeniería Informática, materia por materia en GitHub · Proyecto",
                description: "37 repositorios de la carrera, entre sistemas distribuidos, redes Cisco, IA, visión por computador, pruebas con TDD, bases de datos y estructuras de datos.",
            },
        },
        cybersecurityLabs: {
            tagline: "Del reconocimiento a los controles, en entornos controlados",
            role: "Estudiante",
            status: "En curso, hasta diciembre de 2026",
            overview: [
                "El diplomado en ciberseguridad del Politécnico, de septiembre a diciembre de 2026, se evalúa con informes de laboratorio. Cada uno documenta un entorno controlado y autorizado, lo que se hizo paso a paso y los controles que lo habrían evitado.",
                "Los informes están en Markdown, Word y PDF, con diagramas en Mermaid y las capturas numeradas de cada paso.",
            ],
            decisions: [
                {
                    title: "Solo entornos autorizados",
                    problem: "Cada laboratorio aplica técnicas de ataque, y solo pueden correr donde hay autorización.",
                    solution: "Cada prueba corre contra una máquina del laboratorio, aislada en una red de Docker o en localhost, y se detiene cuando hay evidencia suficiente, sin persistencia ni movimiento lateral.",
                },
            ],
            figures: {labs: "laboratorios", evidence: "capturas en los informes"},
            diagram: {
                title: "Los tres laboratorios",
                caption: "Cada laboratorio pasa del reconocimiento o el análisis a los controles defensivos.",
                labels: {
                    lab1: "Laboratorio 1",
                    recon: "Reconocimiento con Nmap",
                    ftp: "vsftpd 2.3.4 y su puerta trasera",
                    safety: "Red aislada y reglas de seguridad",
                    lab2: "Laboratorio 2",
                    incident: "Caso de phishing y ransomware",
                    cia: "Confidencialidad, integridad y disponibilidad",
                    access: "Control de acceso por roles y nube segura",
                    lab3: "Laboratorio 3",
                    ctf: "CTF del reconocimiento al acceso inicial",
                    escalation: "Escalada de privilegios",
                    availability: "Prueba controlada de disponibilidad",
                },
            },
            images: {
                recon: "La terminal real del primer laboratorio, con el escaneo de Nmap de los 65.535 puertos que encuentra el puerto 21 abierto con vsftpd 2.3.4.",
                incident: "El resumen visual real del segundo laboratorio, con la cadena del ataque de una empresa ficticia, del phishing al ransomware, y su impacto en confidencialidad, integridad y disponibilidad.",
            },
            seo: {
                title: "Laboratorios de ciberseguridad con Kali Linux · Proyecto",
                description: "Tres informes del diplomado, sobre el reconocimiento con Nmap, un CTF hasta la escalada de privilegios y el análisis de un ataque de ransomware con su plan de respuesta.",
            },
        },
        technical: {
            tagline: "Un sistema de reservas para la universidad, en un equipo de dos",
            role: "Desarrollador en equipo",
            status: "Terminado en 2023",
            overview: [
                "En el técnico en programación de software (SENA con la Institución Universitaria Salazar y Herrera) construí, en un equipo de dos, SitePersist, un sistema web para reservar los espacios y equipos de la universidad.",
                "Su README documenta el problema, los objetivos, el alcance, el estado del arte y la propuesta. La organización también guarda dos herramientas en C#.",
            ],
            decisions: [],
            figures: {repositories: "repositorios"},
            diagram: {
                title: "Cómo funciona SitePersist",
                caption: "La comunidad pide, el administrador gestiona y todo queda en MySQL.",
                labels: {
                    people: "Usuarios",
                    community: "Comunidad académica y personas externas",
                    admin: "Administradores",
                    app: "SitePersist",
                    requests: "Solicitudes de reserva",
                    gallery: "Galería de espacios",
                    inventory: "Inventario de equipos",
                    data: "Datos y despliegue",
                    mysql: "MySQL",
                    hosting: "PHP con Composer en Heroku",
                },
            },
            images: {
                sitepersist: "La portada real de SitePersist servida localmente con PHP, con los botones para iniciar sesión como usuario o administrador.",
                ascii: "Dos cuadros reales de las animaciones de VideoToAscii junto a los tres pasos del video a la consola.",
            },
            seo: {
                title: "SitePersist y los proyectos del técnico en programación · Proyecto",
                description: "Un sistema web en PHP y MySQL para reservar espacios de la universidad, con su sitio de administración, y herramientas en C# del técnico SENA – IUSH.",
            },
        },
        vocational: {
            tagline: "Los primeros proyectos, en PHP, Excel, Java y Python",
            role: "Estudiante en equipo",
            status: "Terminado en 2021",
            overview: [
                "Mis primeros proyectos de programación, del bachillerato técnico entre la I.E. INEM José Félix de Restrepo y la Institución Educativa Pascual Bravo. Los subí en 2021 y 2022 a una organización que comparto con mis compañeros de equipo.",
                "Son sitios en PHP, macros de Excel y los primeros programas en Java y Python.",
            ],
            decisions: [],
            figures: {repositories: "repositorios"},
            images: {
                company: "La portada real de The Company Dream servida localmente con PHP, que muestra el menú y la promesa de una nómina digital gratuita para emprender.",
            },
            seo: {
                title: "Proyectos del bachillerato técnico · Proyecto",
                description: "Los primeros proyectos, con sitios web en PHP, un bingo y un conversor de colores en Excel con macros, una calculadora para Android y programas en Python.",
            },
        },
        lettuceDiseases: {
            tagline: "Lechugas sanas, maleza y seis enfermedades, y una evaluación que no esconde las clases pequeñas",
            role: "Único desarrollador",
            status: "Terminado en julio de 2026",
            overview: [
                "La quinta guía de Visión por computador e Inteligencia Artificial pedía un clasificador de imágenes. Lo hice sobre el dataset Lettuce Diseases de Kaggle, porque SmartPot cultiva lechuga en hidroponía y un modelo así puede avisar cuando una hoja enferma.",
                "El modelo parte de MobileNetV2 preentrenado y entrena una cabeza nueva para las ocho clases. El repositorio guarda el historial de entrenamiento, la matriz de confusión, el reporte por clase y las métricas de evaluación."
            ],
            decisions: [
                {
                    title: "Transferencia de aprendizaje en vez de una red desde cero",
                    problem: "Algunas enfermedades tienen pocas imágenes, y una red entrenada desde cero no tenía de dónde aprender sus rasgos.",
                    solution: "MobileNetV2 ya trae filtros entrenados en millones de fotos y es lo bastante liviana para pensar en correrla cerca del cultivo; el modelo solo entrena una cabeza nueva para las ocho clases.",
                },
                {
                    title: "Reportar el recall por clase junto a la exactitud",
                    problem: "La exactitud de 97,9 % la sostienen las dos clases grandes, con más de 1.100 imágenes cada una.",
                    solution: "El reporte por clase deja a la vista que con las enfermedades el modelo todavía se equivoca a menudo, que es lo que importa para un cultivo.",
                }
            ],
            figures: {
                accuracy: "exactitud en 2.337 imágenes de prueba",
                recall: "recall promedio por clase"
            },
            images: {
                board: "La matriz de confusión real del modelo junto a sus métricas, con 97,9 % de exactitud, 65,7 % de recall promedio por clase y el recall de cada una de las ocho clases."
            },
            seo: {
                title: "Detector de enfermedades de lechuga con MobileNetV2 · Proyecto",
                description: "Un clasificador de imágenes para SmartPot con 97,9 % de exactitud sobre 2.337 imágenes, y un recall por clase que muestra cuánto le falta con las enfermedades."
            }
        },
        radarImaging: {
            tagline: "Del ruido del radar a un dataset, y dos modelos que no superaron a la entrada",
            role: "Único desarrollador",
            status: "Terminado en mayo de 2026",
            overview: [
                "Las guías tres y cuatro de Visión por computador trabajan con radar de apertura sintética. Un radar ve a través de las nubes, pero sus imágenes traen speckle, un ruido multiplicativo que dificulta separar el agua, la vegetación y las construcciones.",
                "En la guía tres preparé diez imágenes de Sentinel-1 de una zona portuaria. Las reescalé, las filtré con Lee, las agrupé con K-Means y armé un dataset de pares con ruido y referencia. En la guía cuatro comparé redes para clasificar escenas y probé dos modelos de restauración sobre esos pares."
            ],
            decisions: [
                {
                    title: "Una referencia hecha con las mismas imágenes",
                    problem: "No existe una versión sin ruido de una imagen de radar contra la cual medir.",
                    solution: "Alinear y promediar diez fechas del mismo lugar baja el speckle, porque cambia entre tomas y el terreno no, y deja una referencia.",
                },
                {
                    title: "Publicar que la restauración no funcionó",
                    problem: "El autoencoder bajó el PSNR de 25,80 a 22,66 dB y SwinIR, preentrenado con fotos ópticas, de 19,91 a 19,64 dB.",
                    solution: "El informe deja esas cifras en vez de elegir solo las imágenes que se ven mejor.",
                }
            ],
            figures: {
                images: "imágenes de Sentinel-1 en la serie",
                accuracy: "exactitud de ResNet50 al clasificar escenas"
            },
            images: {
                filtering: "Tres salidas reales de la guía, que son la imagen de radar reescalada, la misma con el filtro de Lee y el agrupamiento K-Means con tres clases que separa el agua, la vegetación y las construcciones.",
                restoration: "Un parche real con ruido, su referencia promediada y la salida de SwinIR, junto a las métricas PSNR, SSIM y ENL del autoencoder y de SwinIR, que quedaron por debajo de la entrada."
            },
            seo: {
                title: "Radar Sentinel-1: filtrado, agrupamiento y restauración · Proyecto",
                description: "Filtro de Lee, K-Means y un dataset de parches sobre diez imágenes de Sentinel-1, y dos modelos de restauración cuyas métricas quedaron por debajo de la entrada."
            }
        },
        schoolServices: {
            tagline: "Un mismo modelo de datos servido por REST y por GraphQL",
            role: "Desarrollador en un equipo de tres",
            status: "Terminado en diciembre de 2025",
            overview: [
                "Programación distribuida y paralela pidió un sistema web para la planta física y el personal de un colegio. El modelo tiene áreas, oficinas, salones y empleados, y distingue a los administrativos de los profesores de planta y contratistas.",
                "El núcleo es una API REST en Spring Boot. Encima va un servicio en FastAPI con Strawberry que ofrece los mismos datos como GraphQL, y un frontend en React consume la API REST."
            ],
            decisions: [
                {
                    title: "GraphQL como capa encima, sin tocar la API",
                    problem: "Si el servicio GraphQL leyera la base, la lógica y las validaciones quedarían en dos lugares.",
                    solution: "El servicio GraphQL llama a la API REST con httpx, así que la lógica y las validaciones viven en un solo lugar.",
                    tradeoff: "una llamada HTTP más en cada consulta.",
                },
                {
                    title: "H2 en memoria",
                    problem: "La API tenía que levantarse sin instalar nada para la demostración.",
                    solution: "Una base H2 en memoria.",
                    tradeoff: "los datos se pierden al reiniciar, lo cual sirve para una entrega de curso y no para un colegio real.",
                }
            ],
            figures: {
                resources: "recursos con CRUD completo",
                commits: "de los 22 commits del proyecto"
            },
            images: {
                employees: "El frontend real del proyecto con datos de ejemplo, que muestra la lista de empleados del colegio con su documento, área, oficina, tipo de empleado y tipo de profesor.",
                report: "El reporte de empleados por área en el frontend real, con datos de ejemplo, que suma totales, profesores de planta y contratistas, y administrativos."
            },
            seo: {
                title: "Colegio Cambridge con Spring Boot, GraphQL y React · Proyecto",
                description: "Una API REST en Spring Boot para la gestión de un colegio, una capa GraphQL en FastAPI y Strawberry encima, y un frontend en React 19."
            }
        },
        fashionLine: {
            tagline: "Una tienda en tres contenedores, la API con JWT, MongoDB y React",
            role: "Único desarrollador",
            status: "Terminado en diciembre de 2024",
            overview: [
                "El segundo parcial de Bases de datos NoSQL pidió una aplicación completa sobre MongoDB. FashionLine maneja el inventario de una tienda de ropa, con productos que tienen descripción, precio, existencias, categoría y talla.",
                "La API está en Spring Boot con seguridad por JWT, el frontend en React y TypeScript, y cada parte tiene su Dockerfile y su guía de despliegue en el repositorio."
            ],
            decisions: [
                {
                    title: "Una imagen propia para la base local",
                    problem: "Para tener datos en el entorno local habría que restaurar respaldos.",
                    solution: "La imagen de MongoDB copia un script de inicialización que crea la base con datos de prueba.",
                },
                {
                    title: "Variables de entorno en vez de propiedades fijas",
                    problem: "La misma API tenía que correr contra la base local y contra Atlas.",
                    solution: "La API compila con un perfil que ignora el archivo .env y lee la conexión del entorno, así que la misma imagen sirve para las dos.",
                    tradeoff: "el build se salta las pruebas que esperaban la configuración fija.",
                }
            ],
            figures: {
                images: "imágenes de Docker en Docker Hub"
            },
            images: {
                products: "El frontend real de FashionLine con datos de ejemplo, que muestra la tabla de productos con precio, categoría, talla, existencias y los botones para editar y borrar.",
                home: "La página de inicio real de FashionLine, con su ícono y la descripción de la tienda."
            },
            seo: {
                title: "FashionLine: Spring Boot, JWT, MongoDB y React en Docker · Proyecto",
                description: "El inventario de una tienda de moda, con una API en Spring Boot con JWT sobre MongoDB Atlas, un frontend en React y tres imágenes de Docker."
            }
        },
        tddPolyglot: {
            tagline: "Escribir la prueba primero, seis veces",
            role: "Desarrollador principal, con 31 de los 33 commits de la práctica",
            status: "Terminado en septiembre de 2026",
            overview: [
                "La primera práctica de Pruebas y gestión de la configuración pedía los ejercicios de JUnit 5, un ejercicio de pruebas unitarias y un CRUD con TDD en tres lenguajes distintos de Java y Kotlin. Entregué seis, los tres obligatorios en C#, Python y React, y además PHP, Rust y Go.",
                "Como los seis resuelven el mismo problema, lo único que cambia entre ellos es el lenguaje y su ecosistema de pruebas. En total son ocho proyectos y 137 casos de prueba, 111 de ellos en los CRUD."
            ],
            decisions: [
                {
                    title: "Fijar el problema para comparar lenguajes",
                    problem: "Seis implementaciones no se pueden comparar si cada una resuelve algo distinto.",
                    solution: "Las seis comparten el mismo modelo y los mismos nombres de prueba (deberia_comportamiento_condición), así que una prueba de Rust se puede leer al lado de su equivalente en Python, caso por caso.",
                },
                {
                    title: "Docker para no depender del equipo de la exposición",
                    problem: "Instalar seis SDK en el computador del salón era el riesgo más grande.",
                    solution: "Con Docker Compose cada suite corre en la imagen oficial de su lenguaje, y la presentación muestra las corridas registradas si no hay servidor.",
                }
            ],
            figures: {
                tests: "casos de prueba",
                languages: "suites en contenedores"
            },
            images: {
                results: "La página real de la práctica, con la tabla de casos de prueba por proyecto, de las calculadoras en JUnit 5 a los CRUD en C#, Python, React, PHP, Rust y Go.",
                model: "La sección del CRUD en seis lenguajes de la página real, con el modelo funcional común y el botón para correr cada suite en local o en Docker."
            },
            seo: {
                title: "TDD en seis lenguajes con Docker · Proyecto",
                description: "Un CRUD escrito con TDD en C#, Python, React, PHP, Rust y Go, más JUnit 5 en Java y Kotlin, con ocho suites y 137 casos que corren en Docker."
            }
        },
        aiTechniques: {
            tagline: "Cuatro maneras de que un programa decida, del sistema experto al agente",
            role: "En pareja en los talleres; único desarrollador del agente",
            status: "Terminado en abril de 2026",
            overview: [
                "El repositorio de Inteligencia artificial reúne los cuatro quices de la materia, cada uno con un paradigma, que son la IA simbólica, la computación evolutiva, el aprendizaje supervisado y los agentes. Los dos primeros los hice en pareja.",
                "Los dos últimos usan SmartPot como caso, con modelos que deciden cuándo ventilar o corregir el pH y un agente reactivo que mira la lectura actual de los sensores y responde con acciones, sin memoria de lecturas anteriores."
            ],
            decisions: [
                {
                    title: "Reglas en una base de conocimiento aparte",
                    problem: "Si los rangos de cada cultivo vivieran en la lógica del agente, agregar un cultivo obligaría a cambiarla.",
                    solution: "Los rangos ideales de cada cultivo viven en un diccionario de configuración y el agente solo los compara; agregar un cultivo es agregar sus rangos.",
                },
                {
                    title: "Un tablero para probar al agente",
                    problem: "Probar al agente exigía tener los sensores conectados.",
                    solution: "Los sliders del tablero simulan los sensores, así que se puede llevar la temperatura o el pH fuera de rango y ver al instante qué acciones dispara.",
                }
            ],
            figures: {
                modules: "módulos, uno por paradigma"
            },
            images: {
                agent: "El tablero real del agente en Streamlit con la lechuga elegida, que muestra tres anomalías detectadas y las acciones que dispara, como encender ventiladores y el enfriador de agua y diluir la solución.",
                rules: "La parte inferior del tablero real, con el estado del cultivo, las acciones del agente y la temperatura y la humedad comparadas con su rango ideal."
            },
            seo: {
                title: "Inteligencia artificial: del sistema experto al agente · Proyecto",
                description: "Los cuatro módulos de la materia, con CLIPS y lógica difusa para velas japonesas, algoritmos genéticos, modelos para SmartPot y un agente reactivo en Streamlit."
            }
        },
        dataCompressor: {
            tagline: "Comprimir con un árbol y volver al mismo texto",
            role: "Único desarrollador",
            status: "Terminado en junio de 2024",
            overview: [
                "Uno de los proyectos de Arquitectura de hardware fue un compresor de datos. DataCompressor implementa la codificación de Huffman en Python, con una interfaz de escritorio en PyQt5 y el árbol de cada archivo dibujado con Graphviz.",
                "El formato .slo guarda el árbol junto a los datos codificados, así que el mismo programa descomprime sin otra información y el resultado coincide byte a byte con el original."
            ],
            decisions: [
                {
                    title: "Guardar el árbol dentro del archivo",
                    problem: "Sin el árbol no hay forma de leer los códigos.",
                    solution: "El árbol va al inicio del .slo, así que cada archivo es autosuficiente.",
                    tradeoff: "unos bytes más en archivos pequeños.",
                },
                {
                    title: "Compararlo con 7-Zip y RAR",
                    problem: "Huffman solo acorta los caracteres frecuentes, y eso no se ve sin un punto de comparación.",
                    solution: "El mismo texto queda en 23.219 bytes con 7-Zip y en 25.136 con RAR, porque el texto de relleno repite frases y esos formatos guardan cada repetición una vez. La comparación deja claro el límite de Huffman.",
                }
            ],
            figures: {
                ratio: "del tamaño original con Huffman"
            },
            images: {
                board: "El árbol de Huffman real que el programa dibujó con Graphviz, junto a los tamaños del mismo texto original, comprimido con Huffman, con RAR y con 7-Zip, y descomprimido."
            },
            seo: {
                title: "Compresor de Huffman en Python con PyQt5 y Graphviz · Proyecto",
                description: "Una aplicación de escritorio que comprime texto con Huffman al 53,3 % de su tamaño, dibuja el árbol y descomprime idéntico, comparada con 7-Zip y RAR."
            }
        },
        carSpace: {
            tagline: "Un parqueadero que se reserva desde el navegador",
            role: "Desarrollador del prototipo",
            status: "Terminado en diciembre de 2022",
            overview: [
                "CarSpace fue el proyecto de un curso de los primeros semestres, el prototipo de una aplicación para encontrar y reservar puesto en un parqueadero.",
                "Es un sitio estático. Las pantallas muestran el flujo completo, de la portada al mapa de puestos y las estadísticas de la zona, sin un servidor que guarde las reservas."
            ],
            decisions: [
                {
                    title: "Partes compartidas con jQuery",
                    problem: "Ocho archivos del sitio llevan el mismo encabezado, el mismo pie y los mismos metadatos.",
                    solution: "Esas partes viven en archivos aparte que jQuery inserta en cada página, así que un cambio en el menú se hace una vez.",
                }
            ],
            figures: {
                spots: "puestos en el mapa de reservas",
                pages: "pantallas del prototipo"
            },
            images: {
                home: "La portada real de CarSpace, servida localmente, que muestra el menú, el botón de inicio de sesión y la foto aérea de un parqueadero junto al mar.",
                reservations: "La pantalla real de reservas, con los 32 puestos de A-1 a D-8 y la ubicación, la fecha y el tiempo estimado a la izquierda."
            },
            seo: {
                title: "CarSpace, prototipo de reservas de parqueadero · Proyecto",
                description: "Un prototipo web en HTML, CSS, JavaScript y Bootstrap para reservar uno de 32 puestos de parqueadero y ver las estadísticas de cada zona."
            }
        },
        sitePersist: {
            tagline: "Reservar un salón o un equipo de la universidad desde cualquier dispositivo",
            role: "Desarrollador en un equipo de dos",
            status: "Terminado en noviembre de 2022",
            overview: [
                "El proyecto del técnico en programación del SENA con la IUSH partió de un problema de la universidad, cuyo sistema de reservas de espacios era difícil de usar para la comunidad y para las personas externas.",
                "SitePersist es el sitio donde la comunidad consulta los espacios y equipos y hace sus solicitudes; AdminSitePersist es donde el personal las gestiona. Los dos comparten la base MySQL."
            ],
            decisions: [
                {
                    title: "Dos sitios en vez de uno con roles",
                    problem: "Un cambio en la administración no debía arriesgar el sitio que usa la comunidad.",
                    solution: "La administración es un sitio aparte, AdminSitePersist, y los dos comparten la base MySQL; cada uno se publica y se cambia sin arriesgar el otro.",
                    tradeoff: "repetir la conexión y parte de los estilos en los dos repositorios.",
                }
            ],
            figures: {
                commits: "de los 306 commits de los dos repositorios"
            },
            images: {
                home: "La portada real de SitePersist servida localmente con PHP, que explica qué es el sistema, con los botones para iniciar sesión como usuario o administrador y una foto de la sede de la universidad."
            },
            seo: {
                title: "SitePersist, reservas de espacios en PHP y MySQL · Proyecto",
                description: "Un sistema web en PHP y MySQL para reservar espacios y equipos de la IUSH, con su sitio de administración, publicado en Heroku con MySQL en Azure."
            }
        },
        videoToAscii: {
            tagline: "Un video convertido en texto que se mueve en la consola",
            role: "Único desarrollador",
            status: "Terminado en diciembre de 2022",
            overview: [
                "VideoToAscii es uno de los proyectos de la organización del técnico. Une tres piezas pequeñas, dos en Python y una en C#.",
                "Python hace el trabajo de imagen, separar los cuadros y convertirlos en caracteres. La consola en C# solo lee el archivo de texto y muestra un cuadro tras otro."
            ],
            decisions: [
                {
                    title: "Un archivo de texto entre las dos partes",
                    problem: "Python y C# no comparten código.",
                    solution: "El conversor escribe los cuadros en un .txt separados por break y la consola lo lee. Cualquier conversor puede producir una animación que la consola entienda.",
                }
            ],
            figures: {
                animations: "animaciones convertidas"
            },
            images: {
                board: "Dos cuadros reales de las animaciones del repositorio, Saturno con ascii_wizard y la figura que corre con ascii_magic, junto a los tres pasos del video a la consola."
            },
            seo: {
                title: "VideoToAscii: de video a animación ASCII con Python y C# · Proyecto",
                description: "Python con OpenCV separa los cuadros de un video y los pasa a ASCII; una consola en C# sobre .NET 6 los reproduce como animación."
            }
        },
        companyDream: {
            tagline: "Una nómina gratuita para que un emprendimiento empiece",
            role: "Desarrollador en un equipo de tres",
            status: "Terminado en noviembre de 2021",
            overview: [
                "The Company Dream fue un proyecto del bachillerato técnico en el Pascual Bravo, una empresa ficticia que le ofrece a quien empieza un negocio una nómina digital gratuita.",
                "El sitio presenta la empresa en español y en inglés, y detrás del inicio de sesión tiene el formulario para registrar la nómina de cada persona."
            ],
            decisions: [
                {
                    title: "Una carpeta por idioma",
                    problem: "El sitio tenía que estar en español y en inglés.",
                    solution: "Cada idioma es una copia del sitio en su propia carpeta, lo más simple de publicar.",
                    tradeoff: "cada cambio se hace dos veces.",
                }
            ],
            figures: {
                commits: "de los 278 commits del proyecto",
                languages: "idiomas del sitio"
            },
            images: {
                home: "La portada real de The Company Dream servida localmente con PHP, que muestra el menú y la promesa de una nómina digital gratuita para emprender.",
                login: "La pantalla real de inicio de sesión, con el formulario de correo y contraseña y el enlace para inscribirse."
            },
            seo: {
                title: "The Company Dream, nómina digital en PHP y MySQL · Proyecto",
                description: "Un proyecto del bachillerato técnico, un sitio en español e inglés con registro y una calculadora de nómina en PHP y MySQL, en Heroku."
            }
        },
    },
};
