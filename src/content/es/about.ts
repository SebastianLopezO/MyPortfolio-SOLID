import type {Content} from "@/types/content";
import {EXPERIENCE_YEARS} from "@/content/shared/profile";

const SEEKING = "en remoto o híbrido";

export const about: Content["about"] = {
    title: "La mentalidad del ingeniero",
    subtitle: {
        general: "De analista de datos en 2022 a líder de integraciones hoy",
        backend: "De scripts de datos en 2022 a más de 20 servicios en producción",
        crm: "De depurar un CRM en 2023 a construir sus widgets e integraciones",
        data: "De rutinas ETL en 2022 a tableros y extracciones del CRM hoy",
        devops: "De administrar servidores en 2023 a vigilar más de 20 servicios hoy",
        fullstack: "De sitios en PHP en el colegio a PWAs en React y Next.js",
    },
    quote: "La ingeniería es el arte de entender sistemas complejos.",
    intro: `Soy Sebastián López Osorno, estudiante de último semestre de Ingeniería Informática y desarrollador de Medellín, Colombia. Llevo más de ${EXPERIENCE_YEARS} años logrando que sistemas que no se hablan entre sí compartan datos en los que la gente puede confiar.`,
    story: {
        general: [
            "Empecé a programar en 2019, en el INEM, y en el bachillerato técnico, entre el INEM y el Pascual Bravo, hice sitios en PHP y macros en Excel. En 2022 entré a la universidad y ese mismo año llegó mi primer trabajo en tecnología, la práctica de datos en Quipux. De ahí me quedó la costumbre de revisar, antes de construir una integración, qué decisión depende de sus datos.",
            "En MUV-U el cargo fue creciendo conmigo. Empecé depurando el CRM y armando los reportes de Power BI, y terminé a cargo del ecosistema Zoho, de los servidores y del soporte a los usuarios. En 2025 llegaron ADCOM y TIVENOS. En TIVENOS soy hoy IT Manager y llevo las integraciones que conectan Zoho CRM con los sistemas académicos de más de 15 instituciones, y buena parte de lo que uso ahí, como SOAP con WS-Security o Prometheus y Grafana, lo aprendí cuando un problema concreto lo pidió.",
        ],
        backend: [
            "Mi backend empezó con scripts de Python que limpiaban datos de recaudo en Quipux. En MUV-U pasé a integrar servicios con la web de la empresa, y después llegaron las APIs de producto, como la de SmartPot en Spring Boot, con más de 130 pruebas, y casi todo el backend de PepperCRM en un equipo de cuatro.",
            "Hoy opero más de 20 servicios en FastAPI en TIVENOS, y casi todo el trabajo está en los sistemas del otro lado. Uno que solo hablaba SOAP con WS-Security me llevó a aprender Zeep, y un catálogo que tardaba minutos en sincronizar terminó como un trabajo en segundo plano que responde 202 Accepted y deja el registro de cada corrida en el CRM.",
        ],
        crm: [
            "Llegué al CRM por los datos. En MUV-U me tocó depurarlo para que los análisis comerciales fueran confiables, y de ahí pasé a automatizar sus tareas repetitivas. En ADCOM me metí de lleno en Zoho CRM, con Deluge, Zoho Creator y las landings de admisiones que dejan cada lead en el CRM con la campaña que lo trajo.",
            "En TIVENOS integro Zoho CRM con los sistemas académicos de más de 15 instituciones y construyo sus widgets. El trabajo empieza por el proceso, por saber con quién habla el asesor, qué dato le falta y en qué momento lo necesita. A veces la respuesta es una función en Deluge; otras, un widget como el cotizador que calcula las cuotas en el navegador, o una integración con el sistema académico.",
        ],
        data: [
            "Empecé en datos como practicante en Quipux, con rutinas ETL, reportes automáticos y tableros de KPI para el recaudo, y con scripts de Python para hacer seguimiento a campañas y depurar bases. En MUV-U construí los reportes de Power BI de finanzas, ventas y mercadeo, y después diseñé cómo entran los datos al CRM.",
            "Antes de construir un tablero quiero saber qué decisión va a apoyar y de dónde sale cada cifra. En TIVENOS escribo tableros de Zoho Analytics en SQL y saco extracciones masivas del CRM a PostgreSQL para analizarlo fuera de él. El siguiente paso es formalizarlo con una especialización en ciencia de datos.",
        ],
        devops: [
            "Mi lado de infraestructura empezó en MUV-U, con los servidores de la empresa y el soporte a sus usuarios. En ADCOM configuré un VPS con Docker, Nginx y SSL, y después el despliegue de las landing pages, con un usuario sin shell que sube los archivos por rsync sin reiniciar nada.",
            "En TIVENOS publico más de 20 servicios en GHCR. Como necesitaba enterarme de una falla antes de que un equipo la reportara, construí el stack que los vigila, con métricas en Prometheus, logs en Loki, trazas en Tempo y alertas de Grafana que llegan a Telegram.",
        ],
        fullstack: [
            "Empecé con sitios en HTML y PHP en el Pascual Bravo y aplicaciones con PHP y MySQL en el SENA. En la universidad pasé a Spring Boot y React, y desde 2024 lidero SmartPot, donde escribí la API, la PWA y buena parte de la infraestructura; en 2026 llegó GoPoli, con Next.js.",
            "Me importa que quien usa un producto no tenga que pensar en cómo funciona por dentro, así que trabajo los dos lados, la API con su base de datos y la pantalla con sus estados de carga y su accesibilidad. En GoPoli eso fue un mapa con rutas y un chat por viaje; en SmartPot, una PWA que muestra lo que mide cada sensor y deja actuar al asistente.",
        ],
    },
    versatility: "Por ese camino pasé por casi todos los lados de un equipo de tecnología, desde los datos, el CRM y el backend hasta el frontend, los servidores y, en TIVENOS, la coordinación técnica. Me sirve para entender lo que piden mercadeo, finanzas o TI sin que nadie tenga que traducírmelo, y para convertirlo en tareas concretas.",
    ai: [
        "Con la inteligencia artificial hice el mismo recorrido, de construirla a dirigirla. En la carrera hice, en pareja, un sistema experto en CLIPS, lógica difusa con scikit-fuzzy y algoritmos genéticos, y por mi cuenta un agente reactivo que decide qué actuadores encender; en SmartPot, un asistente con reglas expertas, lógica difusa y modelos de scikit-learn que pronostica cuándo un cultivo se sale de rango y propone acciones que se aplican en bloque; y en ADCOM, el contacto de leads con agentes de IA en Dapta.",
        "Con los modelos de lenguaje trabajo en las dos escalas. En los pequeños, ajusté Qwen2.5-1.5B con LoRA y armé un pipeline RAG con Qwen2-0.5B cuantizado y un índice FAISS, pensado para correr en equipos modestos. En los grandes, construí un agente en n8n que responde con Claude y consulta tres servidores MCP que escribí en Python, y he trabajado con GPT, con Gemini y con modelos abiertos en local a través de Ollama.",
        "En el desarrollo diario dirijo agentes de código, entre ellos Claude Code, con criterio de ingeniería. Antes de delegar fijo por escrito las reglas de cada proyecto, desde la autoría de los commits hasta lo que nunca se toca en producción; después reviso cada propuesta y la paso por las mismas pruebas y la misma CI que cualquier otro cambio. Haber construido estos sistemas por dentro es lo que me permite decidir qué delegar, detectar cuándo una respuesta no se sostiene y usar la IA para ahorrar trabajo sin ceder el diseño.",
    ],
    ambition: "Lo que sigue es llevar esos modelos de lenguaje a los datos que hoy integro, con asistentes que respondan sobre la información de cada organización. En lo académico, termino el diplomado en ciberseguridad en diciembre de 2026, me gradúo en marzo de 2027 y después vienen una especialización en ciencia de datos y una maestría en ciberseguridad.",
    closing: {
        general: `Lo que más me importa de este trabajo es quitarles horas de digitación a los equipos de admisiones, ventas y finanzas, y que el CRM refleje lo que de verdad pasó. Busco un rol de backend o integraciones donde eso cuente, ${SEEKING}.`,
        backend: `Lo que más me importa es que los datos lleguen completos y a tiempo de un sistema a otro, para que nadie tenga que copiarlos a mano. Busco un rol de backend en Python o Java donde diseñe los servicios y también responda por ellos en producción, ${SEEKING}.`,
        crm: `Lo que más me importa es que cada asesor vea en el CRM lo que de verdad pasó con su aspirante o su cliente, sin digitarlo dos veces. Busco un rol de CRM, Zoho o automatización donde el CRM sea el centro de la operación comercial, ${SEEKING}.`,
        data: `Lo que más me importa es que finanzas, ventas y mercadeo decidan con la misma cifra. Busco un rol de datos o BI donde el análisis termine en una decisión, ${SEEKING}.`,
        devops: `Lo que más me importa es que los equipos que dependen de un servicio no sean los primeros en enterarse de que se cayó. Busco un rol de DevOps o plataforma, ${SEEKING}.`,
        fullstack: `Lo que más me importa es que el producto funcione igual de bien para quien lo usa que para quien lo mantiene. Busco un rol full-stack con React y TypeScript, ${SEEKING}.`,
    },
    terminal: {
        label: "Retrato en ASCII y trayectoria en la terminal",
        logCommand: "cat trayectoria.log",
        entries: [
            {year: "2019", text: "INEM: primeros algoritmos y diseño web", roles: ["fullstack"]},
            {year: "2020", text: "Pascual Bravo: técnico en desarrollo de software", roles: ["fullstack", "backend"]},
            {
                year: "2022",
                text: "Politécnico y SENA: ingeniería y técnico en programación",
                roles: ["backend", "fullstack"]
            },
            {year: "2022", text: "Quipux: práctica de análisis de datos", roles: ["data"]},
            {year: "2023", text: "MUV-U: CRM, Power BI y servidores", roles: ["crm", "data", "devops"]},
            {
                year: "2024",
                text: "SmartPot: desarrollador líder de la plataforma IoT",
                roles: ["backend", "fullstack", "devops"]
            },
            {year: "2025", text: "ADCOM: CRM, MarTech y más de 100 landing pages", roles: ["crm", "fullstack"]},
            {
                year: "2025",
                text: "TIVENOS: IT Manager y líder de integraciones",
                roles: ["backend", "crm", "data", "devops"]
            },
            {year: "2026", text: "GoPoli: PWA de viajes compartidos", roles: ["fullstack", "backend"]},
            {year: "2026", text: "Diplomado en ciberseguridad", roles: ["devops"]},
        ],
    },
    educationTitle: "Educación",
    educationPage: "Ver el programa",
    educationIndex: "Toda la educación, con sus materias y proyectos",
    courseworkLink: "Laboratorios en GitHub",
    organizationLink: "Organización en GitHub",
    repositories: "repositorios",
    languagesTitle: "Idiomas",
    languages: [
        {name: "Español", level: "Nativo"},
        {name: "Inglés", level: "Competencia profesional de trabajo"},
        {name: "Portugués", level: "Básico"},
    ],
    education: {
        cyberDiploma: {
            degree: "Diplomado en Ciberseguridad",
            note: "En curso · Sep – Dic 2026",
            skills: ["Kali Linux", "Nmap", "Hacking ético", "Análisis de vulnerabilidades", "CTF", "Escalada de privilegios", "Respuesta a incidentes", "Control de acceso por roles"],
        },
        politecnico: {
            degree: "Ingeniería Informática",
            note: "Último semestre · Grado en marzo de 2027",
            skills: [
                "Ingeniería de software",
                "Inteligencia artificial",
                "Machine learning",
                "Visión por computador",
                "Computación evolutiva",
                "Web semántica y agentes",
                "Programación distribuida y paralela",
                "Redes Cisco e IPv6",
                "Sistemas operativos",
                "Arquitectura de hardware",
                "Compiladores y autómatas",
                "Estructuras de datos",
                "Bases de datos SQL y NoSQL",
                "Pruebas y TDD",
                "Modelos y simulación",
                "Investigación de operaciones",
                "Análisis numérico",
                "Estadística aplicada",
                "Gestión de proyectos TI",
            ],
        },
        sena: {
            degree: "Técnico en Programación de Software",
            skills: [
                "Análisis de software",
                "Arquitectura de sistemas",
                "Diseño de software",
                "Desarrollo web",
                "PHP y MySQL",
                "C#",
                "Objetos de bases de datos",
                "Modelado de datos",
                "Control de versiones",
                "Instalación de sistemas operativos",
            ],
        },
        pascual: {
            degree: "Técnico Auxiliar en Desarrollo de Software",
            skills: ["Lógica de programación", "Estructuras de datos", "Bases de datos relacionales", "PHP", "HTML y CSS", "Visual Basic .NET", "Excel con VBA", "Java", "Python"],
        },
        inem: {
            degree: "Bachiller con Especialización en Informática",
            skills: ["Fundamentos de computación", "Algoritmia", "Diseño web"],
        },
    },
};
