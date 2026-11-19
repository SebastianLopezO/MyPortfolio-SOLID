import type {Content} from "@/types/content";

export const projects: Content["projects"] = {
    title: "Proyectos y organizaciones",
    subtitle: {
        general: "Productos, trabajo y formación, con lo que he construido y dónde vive el código",
        backend: "Las APIs, integraciones y servicios que he construido, de producción a la universidad",
        crm: "Embudos, widgets y automatizaciones de CRM, y los productos que los respaldan",
        data: "Pipelines, extracciones y análisis de datos, en el trabajo y en la universidad",
        devops: "Las plataformas de despliegue, observabilidad e infraestructura que construí y opero",
        fullstack: "Productos completos, de la base de datos a la pantalla",
    },
    featured: "Proyecto destacado",
    categoriesLabel: "Tipos de proyecto",
    categories: {
        product: {
            label: "Productos",
            description: "Productos construidos en equipo o por mi cuenta, con su código y, cuando la hay, su demo."
        },
        work: {
            label: "Trabajo",
            description: "Lo que construí en las empresas donde trabajo y trabajé. El código es privado y los clientes quedan en el anonimato; cada página cuenta la arquitectura."
        },
        education: {
            label: "Formación",
            description: "La carrera, el diplomado, el técnico y el bachillerato, con cada repositorio por separado."
        },
    },
    slider: {previous: "Proyecto anterior", next: "Proyecto siguiente"},
    readProject: "Ver el proyecto",
    privateCode: "Código privado",
    recreation: "Recreación con datos ficticios",
    organizationsTitle: "Organizaciones en GitHub",
    organizationsSubtitle: "Donde vive mi código, entre el trabajo, los productos y la formación",
    organizationPage: "Ver actividad",
    organizationsIndex: "Todas las organizaciones, con mis commits en cada una",
    repositories: "repositorios",
    members: "miembros",
    private: "Privada",
    showMetrics: "Ver métricas",
    techExplorer: {
        hint: "Elige una tecnología para ver qué proyectos la usan.",
        usedIn: "Proyectos con {tech} ({count})",
        noOther: "Ningún otro proyecto del portafolio usa {tech}.",
        none: "Ningún proyecto del portafolio usa {tech}.",
    },
    items: {
        smartpot: {
            name: "SmartPot",
            brief: "Cultivos que se vigilan solos",
            context: "SmartPotTech · proyecto universitario en equipo",
            summary: "Plataforma IoT que monitorea y automatiza cultivos hidropónicos, organizada en 11 repositorios y construida por un equipo de cinco en el que soy el desarrollador líder.",
            screen: "Panel general de SmartPot con la salud promedio de los cultivos, los cultivos en línea, las alertas y las acciones que el asistente sugiere para todos",
            highlights: [
                {
                    text: "Firmware para ESP32 en MicroPython que publica las lecturas de los sensores por MQTT sobre TLS, y un simulador que alimenta la demo con clima real sin hardware.",
                    roles: ["backend", "devops"]
                },
                {
                    text: "API en Spring Boot 4 con Java 21, MongoDB, Redis, JWT y OpenAPI, con más de 130 pruebas JUnit, que verifica la propiedad de cada cultivo y de cada dispositivo.",
                    roles: ["backend"]
                },
                {
                    text: "Asistente en FastAPI y scikit-learn que diagnostica cada cultivo con un sistema experto, lógica difusa y modelos que pronostican cuándo una variable va a salir de su rango.",
                    roles: ["data", "backend"]
                },
                {
                    text: "PWA en React 19 y TypeScript, construida con Vite 8 y Tailwind 4, que muestra cada lectura frente a su rango ideal y deja actuar al asistente.",
                    roles: ["fullstack"]
                },
                {
                    text: "Imágenes endurecidas en GHCR, manifiestos de Kubernetes y un despliegue a producción con Docker Compose y GitHub Actions; en septiembre de 2026 reconstruí la plataforma después de que producción se cayera.",
                    roles: ["devops"]
                },
                {
                    text: "Escribí 2.273 de los 2.446 commits no automatizados de los 11 repositorios (93 %).",
                    roles: ["backend", "fullstack"]
                },
            ],
        },
        gopoli: {
            name: "GoPoli",
            brief: "Viajes compartidos en la U",
            context: "GoPoli · proyecto universitario en equipo",
            summary: "Plataforma de viajes compartidos para estudiantes del Politécnico Colombiano Jaime Isaza Cadavid, donde soy el principal contribuidor.",
            screen: "GoPoli en el navegador durante un viaje, con la ruta trazada sobre el mapa de Medellín y el panel del viaje en curso junto al menú lateral",
            highlights: [
                {
                    text: "PWA en Next.js 16 con mapas en Leaflet, rutas de OSRM que caen a una línea recta si el enrutador falla, y un chat por cada viaje.",
                    roles: ["fullstack"]
                },
                {
                    text: "API REST en Spring Boot 4 con JWT y BCrypt, con las reglas de negocio en clases de políticas pequeñas y probadas.",
                    roles: ["backend"]
                },
                {
                    text: "Una imagen de PostgreSQL 16 dueña del esquema, contra la que se valida la API, que no arranca si algo no coincide.",
                    roles: ["backend"]
                },
                {
                    text: "Separé el repositorio original en uno por componente, conservando la historia de cada uno, y revisé toda la historia en busca de secretos filtrados.",
                    roles: ["devops", "backend"]
                },
                {
                    text: "Cada imagen sale a GHCR con SBOM y procedencia, y un workflow central despliega por SSH y verifica /health desde afuera, junto a CI, CodeQL y Dependabot.",
                    roles: ["devops"]
                },
                {
                    text: "41 pruebas en la API, 18 en la app web y una prueba de humo de 31 pasos.",
                    roles: ["backend", "fullstack"]
                },
            ],
        },
        peppercrm: {
            name: "PepperCRM",
            brief: "Un CRM hecho por módulos",
            context: "PepperTechDev · producto en equipo",
            summary: "Un CRM construido por un equipo de cuatro para gestionar leads, tareas y comunicaciones, donde escribí casi todo el backend.",
            screen: "El frontend real de PepperCRM con los datos de ejemplo de su repositorio, que muestra el tablero de tareas en columnas Por hacer, En progreso y Hecho, y el menú de leads, contactos, negocios, productos, proveedores y cotizaciones.",
            highlights: [
                {
                    text: "API en Spring Boot con Java 17 organizada por módulos de negocio, como usuarios, leads, tareas, etiquetas, comentarios, archivos, mensajes y correos.",
                    roles: ["backend", "crm"]
                },
                {
                    text: "Seguridad con Spring Security y JWT, un filtro que limita la tasa de peticiones y CORS configurado por entorno.",
                    roles: ["backend"]
                },
                {
                    text: "MongoDB Atlas como base de datos, Redis como caché y un servicio de correo asíncrono para las notificaciones.",
                    roles: ["backend"]
                },
                {
                    text: "Frontend en React y Vite con un tablero kanban para mover los leads entre etapas y la gestión de tareas.",
                    roles: ["fullstack", "crm"]
                },
                {
                    text: "Documentación con Swagger, imágenes en Docker Hub desplegadas en Render con un deploy hook, y manifiestos de Kubernetes en desarrollo.",
                    roles: ["devops"]
                },
                {text: "Escribí 152 de los 154 commits hechos por personas en la API.", roles: ["backend"]},
            ],
        },
        portfolio: {
            name: "MyPortfolio",
            brief: "Una vista para cada rol",
            context: "Proyecto personal",
            summary: "Este sitio es un portafolio bilingüe en Astro, SolidJS y TypeScript con páginas prerenderizadas, una vista por rol, una página para cada proyecto y un asistente que responde en el navegador.",
            screen: "La portada real de este portafolio en la vista full-stack, con la disponibilidad, el nombre, el rol, el resumen y el selector de perfiles.",
            highlights: [
                {
                    text: "Prerenderizado estático de cada vista y cada proyecto, con SEO por ruta, datos estructurados, sitemap e imágenes de Open Graph.",
                    roles: ["fullstack"]
                },
                {
                    text: "Cada sección carga su código y su texto por separado, con presupuestos que CI verifica para el JavaScript de arranque, el peso de cada chunk y lo que necesita el primer pintado.",
                    roles: ["fullstack", "devops"]
                },
                {
                    text: "Seis vistas por rol que reescriben el texto, reordenan las secciones y resaltan lo que importa a cada perfil.",
                    roles: ["fullstack"]
                },
                {
                    text: "Las cifras de GitHub salen, en cada build de CI, de las estadísticas que mi repositorio de perfil genera a diario.",
                    roles: ["devops", "data"]
                },
                {
                    text: "Imagen de Nginx sin privilegios en GHCR, desplegada con Docker Compose, y verificaciones de producción con Playwright y Lighthouse después de cada despliegue.",
                    roles: ["devops"]
                },
                {
                    text: "Un asistente que responde preguntas sobre mi perfil buscando en el mismo contenido del sitio, sin llamar a ningún servicio externo.",
                    roles: ["fullstack"]
                },
            ],
        },
        taurus: {
            name: "Prueba técnica Taurus",
            brief: "De CSV a tablero",
            context: "TaurusSebastian-s · prueba técnica",
            summary: "Una prueba técnica de datos que llevé de archivos CSV a una API de métricas y un tablero interactivo.",
            screen: "El frontend real de Taurus con datos de ejemplo, que muestra las tablas agregadas de AG Grid con cotizaciones, negocios nuevos, conversión y primas por tenant y por agente.",
            highlights: [
                {
                    text: "Carga de los archivos CSV a MySQL y MariaDB, con un análisis exploratorio en Pandas dentro de un notebook.",
                    roles: ["data"]
                },
                {
                    text: "API de métricas en FastAPI con SQLAlchemy asíncrono, que agrupa los datos por cliente, agente y estado.",
                    roles: ["backend", "data"]
                },
                {
                    text: "Tablero en React y TypeScript con una grilla de AG Grid para explorar los registros.",
                    roles: ["fullstack"]
                },
                {text: "Gráficas en Plotly.js para comparar las métricas de cada grupo.", roles: ["data", "fullstack"]},
            ],
        },
        integrationPlatform: {
            name: "Plataforma de integraciones",
            brief: "Zoho CRM, conectado a todo",
            context: "TIVENOS · tecnología educativa",
            summary: "Más de 20 servicios en FastAPI que mantienen Zoho CRM sincronizado con los sistemas académicos de más de 15 instituciones de Latinoamérica y España.",
            screen: "Recreación de la documentación OpenAPI de un servicio de integración, con las rutas de formularios y CRM, la oferta académica, los catálogos y los trabajos en segundo plano, y un ejemplo de respuesta 202 con su clave de idempotencia.",
            highlights: [
                {
                    text: "Un servicio por institución sobre un estándar común, con routers sin lógica, controladores que normalizan los datos y una sola capa de acceso por cada sistema externo.",
                    roles: ["backend"]
                },
                {
                    text: "Conecta PeopleSoft Campus Solutions por SOAP con WS-Security, bases SQL Server detrás de una VPN, archivos CSV por FTP, APIs REST y webhooks.",
                    roles: ["backend", "crm"]
                },
                {
                    text: "Las sincronizaciones largas responden 202 Accepted, corren en segundo plano y dejan en el CRM un registro de cada corrida con su resultado y su duración.",
                    roles: ["backend", "crm"]
                },
                {
                    text: "Los servicios recientes usan claves de idempotencia, reintentos escalonados cuando Zoho responde 429, trabajos persistidos en PostgreSQL y secretos cifrados con AES-256-GCM.",
                    roles: ["backend", "devops"]
                },
                {
                    text: "Cada servicio sale como imagen endurecida en GHCR y queda vigilado con trazas, métricas, logs y alertas que llegan a Telegram.",
                    roles: ["devops"]
                },
            ],
        },
        observability: {
            name: "Plataforma de observabilidad",
            brief: "Veinte servicios a la vista",
            context: "TIVENOS · infraestructura",
            summary: "El stack que vigila los servicios de integración y los servidores donde corren, con métricas, logs, trazas, sondas y alertas en un mismo lugar.",
            screen: "Recreación del tablero de Grafana de los servicios de integración, con 26 jobs de Prometheus, 18 sondas de disponibilidad, 12 reglas de alerta, peticiones y latencia por servicio, el estado de cada sonda y los logs recientes de Loki.",
            highlights: [
                {
                    text: "Prometheus recoge 26 jobs entre los servicios en FastAPI instrumentados, los contenedores con cAdvisor, las máquinas con Node Exporter y Nginx con su exportador.",
                    roles: ["devops"]
                },
                {
                    text: "18 sondas de Blackbox Exporter revisan desde afuera que cada servicio y cada dominio respondan, y que sus certificados TLS no estén por vencer.",
                    roles: ["devops"]
                },
                {
                    text: "Promtail lleva los logs de los contenedores a Loki a través de un proxy de solo lectura del socket de Docker, y Tempo recibe las trazas de OpenTelemetry de los servicios.",
                    roles: ["devops", "backend"]
                },
                {
                    text: "Grafana reúne 4 tableros (Docker, FastAPI, máquina y Nginx) y 12 reglas de alerta, entre ellas errores 500 en las integraciones, contenedores que reinician en bucle, disco y CPU, que llegan a Telegram.",
                    roles: ["devops"]
                },
                {
                    text: "Todo corre en Docker Compose junto a los servicios, con 15 días de retención en Prometheus.",
                    roles: ["devops"]
                },
            ],
        },
        crmWidgets: {
            name: "Widgets de Zoho CRM",
            brief: "Procesos dentro del CRM",
            context: "TIVENOS · herramientas para equipos comerciales",
            summary: "Cinco widgets que viven dentro de Zoho CRM para cotizar, matricular, capturar prospectos, agendar citas y cambiar de programa sin salir del registro.",
            screen: "Recreación del cotizador de precios dentro de una oportunidad del CRM, con plan de pagos, beca, convenio y una promoción recortada por el tope del 80 %, el desglose de cada pago y los botones para el PDF y para aplicar la cotización.",
            highlights: [
                {
                    text: "Un cotizador que simula el plan de pagos en el navegador, aplica los descuentos con su tope, genera el PDF del plan de inversión y solo escribe en el CRM al confirmar.",
                    roles: ["crm", "fullstack"]
                },
                {
                    text: "Un asistente de matrícula en React que ejecuta en orden las cinco funciones en Deluge que hablan con PeopleSoft Campus Solutions, valida los datos antes de cada paso y traduce los errores del sistema académico.",
                    roles: ["crm", "fullstack", "backend"]
                },
                {
                    text: "La captura de prospectos desde una campaña, uno por uno o en carga masiva con plantilla, mapeo de columnas y revisión antes de importar.",
                    roles: ["crm"]
                },
                {
                    text: "La gestión de citas sobre los eventos del CRM para crear, reagendar, cancelar y registrar el resultado, con permisos de negocio que bloquean la acción cuando no pueden confirmar un rol.",
                    roles: ["crm"]
                },
                {
                    text: "El cambio de programa crea la nueva oportunidad antes de cerrar la anterior y deja su registro, con reintentos escalonados ante los límites de la API.",
                    roles: ["crm", "backend"]
                },
            ],
        },
        admissionsForms: {
            name: "Formularios web de admisión y becas",
            brief: "Del sitio al CRM sin digitar",
            context: "TIVENOS · formularios para sitios institucionales",
            summary: "Formularios que las instituciones publican en sus sitios para que un aspirante se registre, complete su solicitud y suba sus documentos, conectados al CRM por los servicios de integración.",
            screen: "Recreación del paso Programa de un formulario de admisión, con seis listas en cascada (unidad, nivel, modalidad, periodicidad, ciclo y programa) y el resumen de la solicitud con el celular verificado.",
            highlights: [
                {
                    text: "Un flujo en varias páginas que va del registro del prospecto a la solicitud completa que actualiza la oportunidad, la carga de documentos y una página de agradecimiento.",
                    roles: ["fullstack", "crm"]
                },
                {
                    text: "Selects en cascada que cargan la oferta de cada institución (unidad, nivel, modalidad, periodicidad, ciclo y programa) desde la API de jerarquía académica.",
                    roles: ["fullstack", "backend"]
                },
                {
                    text: "Un script común para los formularios web del CRM que guarda los parámetros UTM en campos ocultos y preselecciona el programa desde la URL.",
                    roles: ["crm", "data"]
                },
                {
                    text: "Versiones para pregrado, posgrado y educación continua, y formularios de becas y de relaciones familiares para los procesos que los piden.",
                    roles: ["crm", "fullstack"]
                },
                {
                    text: "Validaciones en el navegador, mensajes claros con SweetAlert2 y búsqueda en listas largas con Select2.",
                    roles: ["fullstack"]
                },
            ],
        },
        crmSnapshots: {
            name: "Snapshots del CRM",
            brief: "El CRM, listo para analizar",
            context: "TIVENOS · datos",
            summary: "Un servicio que copia en bloque los módulos de Zoho CRM a PostgreSQL para analizarlos con SQL fuera del CRM, y deja registro de cada corrida.",
            screen: "Recreación de un cliente SQL sobre la base de snapshots, con una tabla por módulo del CRM, una consulta al registro de corridas y otra de oportunidades por etapa, con el último snapshot de cada módulo completado.",
            highlights: [
                {
                    text: "Usa la Bulk Read API de Zoho para pedir la exportación de cada módulo, esperar el archivo ZIP, descomprimirlo y cargar el CSV en PostgreSQL.",
                    roles: ["data", "backend"]
                },
                {
                    text: "Cubre los módulos que necesita el análisis de una institución, entre ellos leads, oportunidades, contactos, campañas, notas y usuarios.",
                    roles: ["data", "crm"]
                },
                {
                    text: "Cada corrida queda en una tabla de registro con el módulo, la fecha, el cliente y su estado.",
                    roles: ["data"]
                },
                {
                    text: "La versión actual es una API en FastAPI con autenticación por clave y métricas para Prometheus, desplegada en Docker.",
                    roles: ["backend", "devops"]
                },
            ],
        },
        emailSignatures: {
            name: "Firmas de correo",
            brief: "Firmas que no se rompen",
            context: "TIVENOS · herramienta interna",
            summary: "Un generador de firmas para las cinco marcas del grupo que se ve igual en Outlook, Gmail y Apple Mail.",
            screen: "Recreación del generador de firmas con una marca y una persona ficticias, con el formulario a la izquierda y la firma dentro de un correo, el logotipo de texto, los datos de contacto y la insignia.",
            highlights: [
                {
                    text: "Un servicio en FastAPI y Jinja2 con un formulario, un catálogo por marca y tema, la descarga de un .htm para Outlook y un modo por lotes que convierte un CSV en un ZIP con una firma por persona.",
                    roles: ["fullstack", "backend"]
                },
                {
                    text: "Cada logotipo sale dos veces, como imagen alojada para los clientes modernos y como el nombre de la marca en texto para Outlook de escritorio, que renderiza con Word.",
                    roles: ["fullstack"]
                },
                {
                    text: "El nombre de respaldo se mide con una tabla de anchos de Arial Bold y baja de a un píxel hasta caber en su columna.",
                    roles: ["fullstack"]
                },
                {
                    text: "Una auditoría renderiza cada combinación de marca, tema e insignia y falla ante cualquier cosa que un cliente de correo rompería.",
                    roles: ["backend"]
                },
            ],
        },
        martech: {
            name: "Embudo de admisiones universitarias",
            brief: "Admisiones de punta a punta",
            context: "ADCOM · agencia de marketing",
            summary: "Más de 90 landing pages de admisiones para cinco instituciones de educación superior que envían cada lead a Zoho CRM con la campaña que lo trajo.",
            screen: "Recreación de una landing de admisiones de una universidad ficticia con su formulario, junto a los campos UTM que viajan con el lead, el envío a Zoho Forms, el evento de conversión y la redirección a la página de gracias.",
            highlights: [
                {
                    text: "Landing pages en React, TypeScript y Vite que capturan los parámetros UTM, bloquean el doble envío, publican en Zoho Forms y envían el evento de conversión a Google Tag Manager.",
                    roles: ["fullstack", "crm"]
                },
                {
                    text: "WhatsApp, Meta Ads y Google Ads conectados al CRM por webhooks y REST, con funciones en Deluge y apps en Zoho Creator para los equipos comerciales.",
                    roles: ["crm"]
                },
                {text: "Contacto de leads con agentes de IA en Dapta.", roles: ["crm"]},
                {
                    text: "En los posgrados, el formulario pregunta el nivel de estudios del aspirante y la respuesta llega al CRM con el lead.",
                    roles: ["crm", "fullstack"]
                },
                {
                    text: "Un gateway de Nginx por cliente sirve la página de cada programa bajo su propia ruta, en el dominio de la institución.",
                    roles: ["fullstack"]
                },
            ],
        },
        landingPlatform: {
            name: "Plataforma de despliegue de landing pages",
            brief: "Un push, la página en vivo",
            context: "ADCOM · infraestructura",
            summary: "La infraestructura que publica, vigila y mantiene más de 100 landing pages de varios clientes en un solo VPS, sin reiniciar nada en cada despliegue.",
            screen: "Recreación de una ejecución del workflow de despliegue de una landing, con instalación, build, verificación, compresión, SSH con la llave del host fijada, rsync en dos fases y la comprobación de que el sitio público sirve el commit.",
            highlights: [
                {
                    text: "Cada landing llama a un workflow reutilizable de GitHub Actions que instala, compila, verifica la ruta base, comprime los archivos con gzip, genera WebP de las imágenes y sube el resultado por rsync en dos fases.",
                    roles: ["devops", "fullstack"]
                },
                {
                    text: "El despliegue entra con un usuario sin shell, encerrado con rrsync y con la huella del servidor fijada, y el Nginx de cada cliente monta sus landings en solo lectura.",
                    roles: ["devops"]
                },
                {
                    text: "Un solo bloque de Nginx sirve cualquier landing registrada, con assets inmutables por un año, HTML sin caché, WebP por negociación y las etiquetas de Google Tag Manager inyectadas en el servidor.",
                    roles: ["devops", "fullstack"]
                },
                {
                    text: "Scripts que aplican un mismo cambio a los 106 repositorios (workflow de despliegue, política de Dependabot, archivos de entorno) y generan la configuración de Nginx de cada cliente.",
                    roles: ["devops"]
                },
                {
                    text: "Un monitor diario revisa el estado HTTP, el HTML, que haya una sola etiqueta de Google Tag Manager, la compresión, la caché, los despliegues pendientes y los certificados, y abre un issue si algo falla; Lighthouse mide las landings principales cada semana.",
                    roles: ["devops"]
                },
                {
                    text: "Marcadores en el commit para subir sin desplegar y rutas de reversión documentadas para una landing, para el Nginx de un cliente y para la historia de los repositorios.",
                    roles: ["devops"]
                },
            ],
        },
        emailAutomations: {
            name: "Correo hiperpersonalizado a escala",
            brief: "Correos uno a uno, a escala",
            context: "ADCOM · marcas de lotería",
            summary: "Los resultados de cada noche para dos marcas de lotería y correos de bienvenida y cumpleaños, cada uno con el nombre y el segmento de quien lo recibe.",
            screen: "Recreación del correo diario de resultados de una lotería ficticia en un buzón, con un correo por día, la fecha en el asunto y los resultados de ocho sorteos.",
            highlights: [
                {
                    text: "Un script en Python consulta la API de resultados, llena una plantilla Jinja2 que solo tiene variables y escribe el HTML listo para la plantilla de Amazon SES.",
                    roles: ["backend"]
                },
                {
                    text: "Correos que dispara un evento del suscriptor, como la bienvenida y el saludo de cumpleaños.",
                    roles: ["crm", "backend"]
                },
                {
                    text: "Los destinatarios salen de una vista de Zoho Analytics por su API de exportación masiva; cada correo lleva el nombre y el segmento de la persona, y una columna del archivo puede asignarle otra plantilla.",
                    roles: ["data", "crm"]
                },
                {
                    text: "Si un sorteo todavía no se publica, el script sale con un código propio y el pipeline reintenta cada 10 minutos, hasta 9 veces, antes de enviar lo publicado.",
                    roles: ["backend", "devops"]
                },
                {
                    text: "El envío reparte los correos entre varios workers con un límite por segundo y, cuando Amazon SES pide ir más despacio, espera un tiempo aleatorio que crece en cada intento.",
                    roles: ["backend"]
                },
                {
                    text: "Detecta cuando la paginación del historial devuelve filas repetidas y vuelve a pedir el día con otros tamaños de página hasta completarlo.",
                    roles: ["backend", "data"]
                },
                {
                    text: "El correo pesa entre 55 y 75 KB, por debajo del límite en el que Gmail lo recorta, y el asunto lleva la fecha para que Gmail no agrupe los envíos de todos los días.",
                    roles: ["fullstack"]
                },
                {
                    text: "Un receptor en FastAPI con asyncpg guarda en PostgreSQL los eventos de entrega que Amazon SNS reporta por cada correo.",
                    roles: ["backend", "data"]
                },
                {
                    text: "Una API en Spring Boot con Thymeleaf expone los mismos resultados en JSON y como plantilla HTML.",
                    roles: ["backend"]
                },
            ],
        },
        zohoToolkit: {
            name: "Herramientas de operación masiva en Zoho",
            brief: "Operaciones masivas en el CRM",
            context: "ADCOM · automatización de CRM",
            summary: "Scripts y notebooks en Python que mueven grandes volúmenes de registros en el Zoho CRM de cada cliente, entre cargas, vínculos, etiquetas, borrados y sincronizaciones.",
            screen: "Recreación de un notebook de Jupyter que carga leads en bloque. Limpia un CSV, crea el trabajo en la Bulk Write API, espera con un punto de reanudación, resume creados, actualizados y fallidos, y vincula y etiqueta los registros.",
            highlights: [
                {
                    text: "Parte los CSV, los sube como ZIP a la Bulk Write API, crea los trabajos, consulta su estado y los retoma si algo se corta.",
                    roles: ["crm", "data", "backend"]
                },
                {
                    text: "Vincula, etiqueta y borra registros en masa desde un CSV, y prepara las importaciones en notebooks de Jupyter.",
                    roles: ["crm", "data"]
                },
                {
                    text: "Sincroniza los clientes de la base Oracle de un cliente con su CRM.",
                    roles: ["crm", "backend"]
                },
                {
                    text: "Asigna códigos y prepara los envíos de SMS de una campaña, y analiza los segmentos antes de cada envío.",
                    roles: ["crm", "data"]
                },
                {
                    text: "Un servicio en Flask copia las fotos de cada inmueble desde Zoho CRM a la plataforma inmobiliaria de un cliente.",
                    roles: ["crm", "backend"]
                },
            ],
        },
        realEstateSite: {
            name: "Landing inmobiliaria con inventario sincronizado",
            brief: "Inventario publicado cada madrugada",
            context: "ADCOM · inmobiliaria",
            summary: "El sitio de captación de una inmobiliaria, que muestra los inmuebles que la empresa ya tiene en Wasi, sincronizados cada madrugada, y recibe solicitudes de asesoría, contacto y visita.",
            screen: "Recreación del listado de una inmobiliaria ficticia, con filtros por operación, tipo, ciudad y precio, tarjetas con insignias y el resumen de la última sincronización con Wasi.",
            highlights: [
                {
                    text: "Cada madrugada, un workflow de GitHub Actions descarga el inventario de la API de Wasi, publica solo los inmuebles disponibles y, si algo cambió, hace commit y lanza el despliegue.",
                    roles: ["devops", "backend"]
                },
                {
                    text: "El listado y sus filtros leen un índice columnar de 25 campos por inmueble; el registro completo de cada uno queda en su propio archivo y se pide al abrir el detalle.",
                    roles: ["fullstack", "backend"]
                },
                {
                    text: "Cuando un inmueble sale de Wasi, la siguiente sincronización borra su archivo de detalle.",
                    roles: ["backend"]
                },
                {
                    text: "Las solicitudes de asesoría, contacto y visita llegan a una Edge Function de Supabase que valida los datos y los guarda en PostgreSQL.",
                    roles: ["fullstack", "backend"]
                },
                {
                    text: "Simuladores de hipoteca y de capacidad de compra con la cuota fija del sistema francés, y uno de rentabilidad que descuenta del arriendo la vacancia y la administración.",
                    roles: ["fullstack"]
                },
                {
                    text: "Sale al VPS de la agencia con el mismo workflow de despliegue de las landing pages de admisiones.",
                    roles: ["devops"]
                },
            ],
        },
        collectionAutomation: {
            name: "Automatización de campañas de recaudo",
            brief: "Campañas de recaudo al día",
            context: "Quipux · práctica de datos",
            summary: "Los scripts y notebooks que escribí en la práctica para hacer seguimiento a las campañas del área de recaudo y depurar sus bases de datos.",
            screen: "Recreación de un notebook de seguimiento de campañas de recaudo que cruza una base comprada con las listas de exclusión de correo y SMS, cuenta los contactables y resume por campaña cuántos pagaron.",
            highlights: [
                {
                    text: "Notebooks en Pandas para el seguimiento diario de las campañas de varias ciudades.",
                    roles: ["data"]
                },
                {
                    text: "Limpieza y cruce de las bases de datos compradas antes de usarlas en una campaña.",
                    roles: ["data"]
                },
                {text: "Listas de exclusión de correo y SMS que se actualizan con cada envío.", roles: ["data", "crm"]},
                {
                    text: "Descargas automáticas, filtros y separadores de archivos con Python y scripts por lotes, y la generación y corrección de los archivos de cada campaña.",
                    roles: ["data", "devops"]
                },
                {text: "El análisis de los pagos de la gestión de 2023.", roles: ["data"]},
            ],
        },
        engineering: {
            name: "Ingeniería Informática",
            brief: "Un repositorio por materia",
            context: "Politécnico Colombiano Jaime Isaza Cadavid · 2022 – 2027",
            summary: "La carrera completa en una organización de GitHub, con un repositorio por materia, del primer pseudocódigo a sistemas distribuidos, redes con equipos Cisco, inteligencia artificial y visión por computador.",
            screen: "La matriz de confusión real del detector de enfermedades de lechuga, de la materia de visión por computador, junto a sus métricas por clase.",
            highlights: [
                {
                    text: "En programación distribuida y paralela, un bingo multijugador por sockets TCP con hilos, un sistema escolar en Spring Boot con una capa GraphQL en FastAPI y React, y un Sudoku que resuelve por RMI.",
                    roles: ["backend", "fullstack"]
                },
                {
                    text: "En inteligencia artificial y datos, un sistema experto en CLIPS, lógica difusa, algoritmos genéticos, clasificadores de música, vinos e imágenes, y detección de enfermedades en lechuga con visión por computador.",
                    roles: ["data"]
                },
                {
                    text: "En redes y sistemas, routers Cisco reales con OSPF, EIGRP e IPv6, monitoreo por SNMP, algoritmos de memoria y de planificación en Linux, y ensamblador ARM.",
                    roles: ["devops"]
                },
                {
                    text: "En ingeniería de software, pruebas con TDD en seis lenguajes (111 pruebas), patrones de diseño, bases de datos SQL y NoSQL, y una tienda full-stack con Spring Boot, React y MongoDB en Docker Compose.",
                    roles: ["backend", "fullstack"]
                },
                {
                    text: "En los fundamentos, algoritmos, estructuras de datos (listas, árboles, grafos y matrices dispersas), autómatas dibujados con Graphviz y maratones de programación.",
                    roles: ["backend"]
                },
            ],
        },
        cybersecurityLabs: {
            name: "Laboratorios de ciberseguridad",
            brief: "Del reconocimiento al control",
            context: "Diplomado en Ciberseguridad · Politécnico JIC · 2026",
            summary: "Tres informes de laboratorio del diplomado, del reconocimiento con Nmap a la escalada de privilegios, y el análisis de un ciberataque con su plan de respuesta.",
            screen: "La terminal real del primer laboratorio, con el escaneo de Nmap de los 65.535 puertos que encuentra el puerto 21 abierto con vsftpd 2.3.4.",
            highlights: [
                {
                    text: "Laboratorio 1: el reconocimiento de una máquina vulnerable en una red aislada de Docker, con escaneos de Nmap de menos a más detalle hasta identificar vsftpd 2.3.4 y la investigación de su puerta trasera.",
                    roles: ["devops"]
                },
                {
                    text: "Laboratorio 2: el análisis de un phishing que termina en ransomware con doble extorsión, sus amenazas y vulnerabilidades, los principios de confidencialidad, integridad y disponibilidad, una matriz de control de acceso por roles y una arquitectura de nube segura.",
                    roles: ["devops"]
                },
                {
                    text: "Laboratorio 3: un CTF completo, del reconocimiento y la fuga de información a la fuerza bruta autorizada con Hydra y la escalada de privilegios, y una prueba controlada de disponibilidad sobre WordPress con ApacheBench y wrk.",
                    roles: ["devops", "backend"]
                },
                {
                    text: "Controles alineados con ISO/IEC 27001, el NIST CSF y las guías SP 800-61 y SP 800-34, y con la ley colombiana de protección de datos.",
                    roles: ["devops"]
                },
                {
                    text: "Cada informe documenta sus condiciones de seguridad, su entorno y su evidencia con capturas numeradas; el tercero verifica sus salidas con SHA-256.",
                    roles: ["devops"]
                },
            ],
        },
        technical: {
            name: "Técnico en Programación de Software",
            brief: "Software en equipo de dos",
            context: "SENA – IUSH · 2022 – 2023",
            summary: "Los proyectos del técnico, hechos en un equipo de dos, entre un sistema web de reservas de espacios para la universidad y herramientas en C#.",
            screen: "La portada real de SitePersist servida localmente con PHP, con los botones para iniciar sesión como usuario o administrador.",
            highlights: [
                {
                    text: "SitePersist, un sistema web en PHP y MySQL para reservar los espacios y equipos de la IUSH desde cualquier dispositivo, con galería e inventario.",
                    roles: ["fullstack", "backend"]
                },
                {
                    text: "Su sitio de administración, donde se gestionan las solicitudes y el inventario, publicado en Heroku.",
                    roles: ["fullstack"]
                },
                {
                    text: "La documentación del problema, los objetivos, el estado del arte y la propuesta del sistema.",
                    roles: ["fullstack"]
                },
                {
                    text: "VideoToAscii, que convierte un video en una animación de caracteres ASCII, y una calculadora de consola en C# sobre .NET 6.",
                    roles: ["backend"]
                },
            ],
        },
        vocational: {
            name: "Bachillerato técnico",
            brief: "Los primeros proyectos",
            context: "Pascual Bravo e INEM · 2019 – 2021",
            summary: "Los primeros proyectos, hechos en equipo en el bachillerato técnico, con sitios web en PHP, macros de Excel y pequeños programas en Java y Python.",
            screen: "La portada real de The Company Dream servida localmente con PHP, que muestra el menú y la promesa de una nómina digital gratuita para emprender.",
            highlights: [
                {
                    text: "Sitios web en PHP, HTML y CSS, entre ellos el de una empresa ficticia hecho en equipo y uno con inicio de sesión y un panel para administrar precios.",
                    roles: ["fullstack"]
                },
                {
                    text: "Un bingo y un conversor de colores de mapas de bits construidos en Excel con macros de Visual Basic.",
                    roles: ["data"]
                },
                {
                    text: "Una calculadora para Android en Java y un programa en Python que calcula los movimientos de un caballo de ajedrez.",
                    roles: ["fullstack", "backend"]
                },
                {text: "Una guía de Python en un notebook de Jupyter.", roles: ["data"]},
            ],
        },
        lettuceDiseases: {
            name: "Detector de enfermedades de lechuga",
            brief: "Visión para la huerta",
            context: "Ingeniería Informática · Visión por computador · 2026",
            summary: "Un clasificador de imágenes con MobileNetV2 que distingue lechugas sanas, maleza y seis enfermedades, pensado para SmartPot, con una evaluación que muestra dónde falla.",
            screen: "La matriz de confusión real del modelo junto a sus métricas, con 97,9 % de exactitud, 65,7 % de recall promedio por clase y el recall de cada una de las ocho clases.",
            highlights: [
                {
                    text: "MobileNetV2 con transferencia de aprendizaje sobre el dataset Lettuce Diseases de Kaggle, con ocho clases.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "Exactitud de 97,9 % sobre 2.337 imágenes de prueba, con la matriz de confusión y el reporte por clase guardados en el repositorio.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "El recall promedio por clase es 65,7 %, porque las seis enfermedades tienen entre 6 y 30 imágenes de prueba y el modelo acierta entre un tercio y dos tercios de ellas.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "Un paquete de Python con scripts de entrenamiento, evaluación y predicción, configuración con uv y pruebas de la configuración y del dataset.",
                    roles: [
                        "data",
                        "backend"
                    ]
                },
                {
                    text: "Exporta el modelo y sus artefactos para conectarlo después a los cultivos de SmartPot.",
                    roles: [
                        "data"
                    ]
                }
            ]
        },
        radarImaging: {
            name: "Imágenes de radar Sentinel-1",
            brief: "Del ruido del radar al dataset",
            context: "Ingeniería Informática · Visión por computador · 2026",
            summary: "Diez imágenes de radar de una zona costera, filtradas, agrupadas con K-Means y convertidas en un dataset, y dos modelos de restauración que no lograron mejorar la entrada.",
            screen: "Tres salidas reales de la guía, que son la imagen de radar reescalada, la misma con el filtro de Lee y el agrupamiento K-Means con tres clases que separa el agua, la vegetación y las construcciones.",
            highlights: [
                {
                    text: "Diez imágenes mensuales de Sentinel-1 en polarización VV, de mayo de 2025 a febrero de 2026, reescaladas y filtradas con un filtro de Lee de 7 × 7.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "K-Means con k = 3 y k = 4 sobre las imágenes con y sin filtro, y una binarización de agua y no agua a partir de los grupos.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "Las diez fechas, alineadas y promediadas, forman una referencia sin ruido; de cada par se cortan parches de 512 × 512 para entrenar.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "En la clasificación de escenas, ResNet50 con transferencia de aprendizaje llegó a 99,58 % de exactitud, mientras una CNN secuencial desde cero se sobreajustó y colapsó a una sola clase.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "Un autoencoder y SwinIR para reducir el speckle, que bajaron el PSNR y el SSIM respecto a la entrada, y el informe lo reporta así.",
                    roles: [
                        "data"
                    ]
                }
            ]
        },
        schoolServices: {
            name: "Colegio Cambridge: REST, GraphQL y React",
            brief: "Un modelo, REST y GraphQL",
            context: "Ingeniería Informática · Programación distribuida · 2025",
            summary: "La gestión de áreas, oficinas, salones y empleados de un colegio en una API de Spring Boot, con una capa GraphQL en FastAPI encima y un frontend en React.",
            screen: "El frontend real del proyecto con datos de ejemplo, que muestra la lista de empleados del colegio con su documento, área, oficina, tipo de empleado y tipo de profesor.",
            highlights: [
                {
                    text: "Una API REST en Spring Boot 3 con Java 21, JPA y H2: CRUD de áreas, oficinas, salones y empleados, y un reporte de empleados por área.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "Cada empleado pertenece a un área y tiene una oficina; puede ser administrativo o profesor, y el profesor, de planta o contratista.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "Una capa GraphQL con FastAPI y Strawberry que consulta la API REST con httpx y expone consultas y mutaciones sobre los mismos datos.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "Un frontend en React 19 y Vite con listas, formularios y el reporte, conectado a la API con Axios.",
                    roles: [
                        "fullstack"
                    ]
                },
                {
                    text: "Hecho en un equipo de tres, en el que 18 de los 22 commits del proyecto son míos.",
                    roles: [
                        "backend",
                        "fullstack"
                    ]
                }
            ]
        },
        fashionLine: {
            name: "FashionLine: inventario con MongoDB",
            brief: "Una tienda en contenedores",
            context: "Ingeniería Informática · Bases de datos NoSQL · 2024",
            summary: "El inventario de una tienda de moda, con una API en Spring Boot con JWT sobre MongoDB, un frontend en React y las tres piezas empaquetadas en imágenes de Docker.",
            screen: "El frontend real de FashionLine con datos de ejemplo, que muestra la tabla de productos con precio, categoría, talla, existencias y los botones para editar y borrar.",
            highlights: [
                {
                    text: "Una API REST en Spring Boot con Spring Data MongoDB, documentada con Swagger, con búsqueda de productos por nombre, talla y categoría.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "Inicio de sesión con Spring Security y JWT; el frontend guarda el token, lo verifica al abrir y lo envía en cada petición.",
                    roles: [
                        "backend",
                        "fullstack"
                    ]
                },
                {
                    text: "Un frontend en React, TypeScript y Vite con la tabla de productos y su creación, edición y borrado.",
                    roles: [
                        "fullstack"
                    ]
                },
                {
                    text: "Tres imágenes de Docker publicadas en Docker Hub, para la API, la base de MongoDB con un script que carga datos iniciales y el frontend.",
                    roles: [
                        "devops"
                    ]
                },
                {
                    text: "En producción, la base en MongoDB Atlas, la API en Render y el frontend en Netlify.",
                    roles: [
                        "devops"
                    ]
                }
            ]
        },
        tddPolyglot: {
            name: "TDD en seis lenguajes",
            brief: "La prueba primero, seis veces",
            context: "Ingeniería Informática · Pruebas y gestión de la configuración · 2026",
            summary: "El mismo CRUD escrito prueba por prueba en C#, Python, React, PHP, Rust y Go, más los ejercicios de JUnit 5: ocho suites y 137 casos que corren en Docker.",
            screen: "La página real de la práctica, con la tabla de casos de prueba por proyecto, de las calculadoras en JUnit 5 a los CRUD en C#, Python, React, PHP, Rust y Go.",
            highlights: [
                {
                    text: "Un CRUD de listas de reproducción con TDD en seis lenguajes, que son C# con xUnit, Python con pytest, React con Vitest, PHP con PHPUnit, y Rust y Go con sus herramientas de prueba.",
                    roles: [
                        "backend",
                        "fullstack"
                    ]
                },
                {
                    text: "Los seis comparten el modelo, con una entidad validada, un repositorio en memoria, identificadores asignados por el repositorio y dos clases de error, y pruebas que se llaman igual en todos.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "Los ejercicios de la guía de JUnit 5 en Java y Kotlin, y pruebas unitarias frente a integración con Mockito.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "Un docker-compose con un servicio por lenguaje que corre las ocho suites sin instalar ningún SDK.",
                    roles: [
                        "devops"
                    ]
                },
                {
                    text: "Una página de presentación con el código, las pruebas y sus corridas, que también ejecuta cada suite en vivo, local o en Docker.",
                    roles: [
                        "fullstack",
                        "devops"
                    ]
                }
            ]
        },
        aiTechniques: {
            name: "Inteligencia artificial: de las reglas al agente",
            brief: "De las reglas al agente",
            context: "Ingeniería Informática · Inteligencia artificial · 2025 – 2026",
            summary: "Los cuatro módulos de la materia, con un sistema experto y uno difuso para velas japonesas, algoritmos genéticos, modelos para SmartPot y un agente reactivo con su tablero.",
            screen: "El tablero real del agente en Streamlit con la lechuga elegida, que muestra tres anomalías detectadas y las acciones que dispara, como encender ventiladores y el enfriador de agua y diluir la solución.",
            highlights: [
                {
                    text: "Un sistema experto en CLIPS, llamado desde Python con clipspy y con interfaz en Tkinter, que reconoce patrones envolventes alcistas y bajistas en dos velas japonesas.",
                    roles: [
                        "data",
                        "backend"
                    ]
                },
                {
                    text: "Un sistema de lógica difusa con scikit-fuzzy que, con el tamaño de las velas y el envolvimiento, recomienda invertir poco, normal o mucho.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "Algoritmos genéticos que reconstruyen el color de una imagen a partir de su versión en gris, y que optimizan el salto de un paracaidista para caer en el punto pedido.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "Para SmartPot, una regresión logística que controla los ventiladores y una red neuronal que dosifica el pH, con versión de escritorio y en Streamlit.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "Un agente reactivo con un tablero en Streamlit que compara cada lectura con los rangos del cultivo, tomate o lechuga, y decide qué actuadores encender.",
                    roles: [
                        "data",
                        "backend"
                    ]
                }
            ]
        },
        dataCompressor: {
            name: "Compresor de Huffman",
            brief: "Comprimir con un árbol",
            context: "Ingeniería Informática · Arquitectura de hardware · 2024",
            summary: "Una aplicación de escritorio que comprime texto con codificación de Huffman, dibuja el árbol con Graphviz y devuelve el archivo idéntico al descomprimir.",
            screen: "El árbol de Huffman real que el programa dibujó con Graphviz, junto a los tamaños del mismo texto original, comprimido con Huffman, con RAR y con 7-Zip, y descomprimido.",
            highlights: [
                {
                    text: "Una ventana en PyQt5 donde se suelta un archivo .txt para comprimirlo o un .slo para descomprimirlo.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "Cuenta la frecuencia de cada carácter, arma el árbol de Huffman, genera los códigos y escribe el resultado en binario con el árbol dentro del archivo.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "Dibuja el árbol de cada archivo con Graphviz, y un instalador incluye los binarios de Graphviz y los agrega al PATH.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "Con un texto de 3.215.616 bytes, el .slo pesa 1.712.850 (53,3 %) y al descomprimirlo vuelve idéntico al original.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "El repositorio de la materia también tiene prácticas en ESP32 con MicroPython, simulaciones en Wokwi y ensamblador ARM en QtARMSim.",
                    roles: [
                        "backend"
                    ]
                }
            ]
        },
        carSpace: {
            name: "CarSpace: reservas de parqueadero",
            brief: "Parqueadero desde el navegador",
            context: "Ingeniería Informática · Primeros semestres · 2022",
            summary: "El prototipo web de una app de parqueaderos, con portada, inicio de sesión, un mapa de 32 puestos para reservar y estadísticas de cada zona.",
            screen: "La portada real de CarSpace, servida localmente, que muestra el menú, el botón de inicio de sesión y la foto aérea de un parqueadero junto al mar.",
            highlights: [
                {
                    text: "Un sitio en HTML, CSS y JavaScript con Bootstrap 5 y jQuery, con encabezados y pies compartidos que se cargan en cada página.",
                    roles: [
                        "fullstack"
                    ]
                },
                {
                    text: "Una pantalla de reservas con 32 puestos, de A-1 a D-8, la ubicación, la fecha y el tiempo estimado.",
                    roles: [
                        "fullstack"
                    ]
                },
                {
                    text: "Estadísticas por zona sobre qué tan concurrida está, la congestión vial, su puntuación y los comentarios de los usuarios.",
                    roles: [
                        "fullstack"
                    ]
                },
                {
                    text: "Páginas de características, configuración, usuario y equipo, además de la portada y el inicio de sesión.",
                    roles: [
                        "fullstack"
                    ]
                }
            ]
        },
        sitePersist: {
            name: "SitePersist: reservas de espacios",
            brief: "Salones y equipos en reserva",
            context: "Técnico en Programación · SENA – IUSH · 2022",
            summary: "Un sistema web en PHP y MySQL para reservar los espacios y equipos de la Institución Universitaria Salazar y Herrera, con un sitio de administración aparte.",
            screen: "La portada real de SitePersist servida localmente con PHP, que explica qué es el sistema, con los botones para iniciar sesión como usuario o administrador y una foto de la sede de la universidad.",
            highlights: [
                {
                    text: "Un sitio para la comunidad con registro, inicio de sesión, los espacios por bloque, los equipos y las solicitudes de reserva y préstamo.",
                    roles: [
                        "fullstack"
                    ]
                },
                {
                    text: "Un sitio de administración aparte, AdminSitePersist, con sus páginas de CRUD y de historial.",
                    roles: [
                        "fullstack",
                        "backend"
                    ]
                },
                {
                    text: "PHP con Composer y MySQL; en local con XAMPP y en la nube con Heroku y una base MySQL en Azure.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "Un README que documenta el problema, los objetivos, el alcance, el estado del arte y la propuesta, y un diagrama del flujo de trabajo con Git y del despliegue.",
                    roles: [
                        "fullstack"
                    ]
                },
                {
                    text: "Hecho en un equipo de dos, en el que 282 de los 306 commits de los dos repositorios son míos.",
                    roles: [
                        "fullstack"
                    ]
                }
            ]
        },
        videoToAscii: {
            name: "VideoToAscii",
            brief: "Video convertido en texto",
            context: "Técnico en Programación · SENA – IUSH · 2022",
            summary: "Convierte un video en una animación de caracteres. Python separa los cuadros y los pasa a ASCII, y una consola en C# los reproduce.",
            screen: "Dos cuadros reales de las animaciones del repositorio, Saturno con ascii_wizard y la figura que corre con ascii_magic, junto a los tres pasos del video a la consola.",
            highlights: [
                {
                    text: "Un script con OpenCV que abre el video y guarda cada cuadro como imagen.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "Dos conversores, con ascii_wizard y con ascii_magic, que pasan cada cuadro a texto de 150 columnas y los separan con una línea break.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "Una consola en C# sobre .NET 6 que pide el archivo y los milisegundos por cuadro, y lo reproduce en bucle limpiando la pantalla.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "Diecisiete animaciones convertidas en el repositorio, de 4 a 211 cuadros, entre ellas Saturno, una dona y un cohete.",
                    roles: [
                        "backend"
                    ]
                }
            ]
        },
        companyDream: {
            name: "The Company Dream: nómina digital",
            brief: "Nómina gratis para emprender",
            context: "Bachillerato técnico · Pascual Bravo · 2021",
            summary: "El sitio de una empresa ficticia que ofrece una nómina digital gratuita a emprendedores, en español e inglés, con registro y una calculadora de nómina en PHP y MySQL.",
            screen: "La portada real de The Company Dream servida localmente con PHP, que muestra el menú y la promesa de una nómina digital gratuita para emprender.",
            highlights: [
                {
                    text: "Un sitio en PHP, HTML, CSS y JavaScript con versión en español y en inglés.",
                    roles: [
                        "fullstack"
                    ]
                },
                {
                    text: "Registro e inicio de sesión de usuarios sobre MySQL con PDO.",
                    roles: [
                        "backend",
                        "fullstack"
                    ]
                },
                {
                    text: "Un formulario de nómina con salario base, días trabajados, salud, pensión y turnos extra, nocturnos y festivos, que se guarda en la tabla de nóminas.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "Publicado en Heroku con Composer y Apache.",
                    roles: [
                        "fullstack"
                    ]
                },
                {
                    text: "Hecho en un equipo de tres, en el que 236 de los 278 commits son míos, la mayoría entre septiembre y noviembre de 2021.",
                    roles: [
                        "fullstack"
                    ]
                }
            ]
        },
    },
    organizations: {
        tivenos: "Servicios de integración, observabilidad, widgets de Zoho CRM, formularios de admisión, snapshots del CRM y firmas de correo de un aliado de tecnología educativa.",
        adcom: "Landing pages de admisiones y la plataforma que las despliega, automatizaciones en Zoho, servicios de resultados y métricas de correo para los clientes de la agencia.",
        smartpot: "Plataforma IoT para cultivos hidropónicos, con firmware, broker, API, asistente de IA, PWA e infraestructura.",
        gopoli: "Plataforma de viajes compartidos para universitarios, con PWA, API y base de datos.",
        peppertech: "PepperCRM, un producto CRM construido con Spring Boot, React y MongoDB.",
        engineering: "La carrera de Ingeniería Informática materia por materia, con IA, visión por computador, redes, sistemas operativos, sistemas distribuidos y estructuras de datos.",
        taurus: "Prueba técnica de datos con FastAPI, Pandas y React.",
        testlabdata: "Automatizaciones de datos en Python de la práctica en Quipux, para campañas y reportes (2022 – 2023).",
        technical: "Proyectos del Técnico en Programación de Software (SENA – IUSH), con aplicaciones web y herramientas en PHP, MySQL y C#.",
        vocational: "Proyectos del bachillerato técnico (Pascual Bravo e INEM) con HTML, PHP, VB.NET, Java y Python.",
    },
};
