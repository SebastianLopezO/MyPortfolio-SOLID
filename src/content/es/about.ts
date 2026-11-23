import type {Content} from "@/types/content";
import {EXPERIENCE_YEARS} from "@/content/shared/profile";

const SEEKING = "en remoto o híbrido";

export const about: Content["about"] = {
    title: "Sobre mí",
    subtitle: {
        general: "Curiosidad práctica, autonomía y el gusto de construir sistemas desde adentro",
        backend: "Curiosidad por lo que pasa debajo de cada petición, cada cola y cada base de datos",
        crm: "Curiosidad por cómo trabajan los equipos y cómo quitarles fricción sin estorbar",
        data: "Curiosidad por de dónde sale cada dato antes de confiar en una cifra",
        devops: "Curiosidad por cómo corre, falla y se recupera un sistema en producción",
        fullstack: "Curiosidad por unir la lógica interna con lo que una persona toca en pantalla",
    },
    quote: "En el mundo digital podemos diseñar las reglas desde cero y bajar tan hondo como pida el problema.",
    intro: `Llevo unos siete años programando desde Medellín y más de ${EXPERIENCE_YEARS} trabajando en tecnología, movido casi siempre por la misma inquietud: entender cómo funciona algo por dentro antes de usarlo. Aceptar una herramienta como caja negra me aburre, y ver a alguien copiar los mismos datos a mano cuando un sistema podría resolverlo me incomoda. Por eso aprendo de forma autónoma, metiendo las manos en problemas reales hasta ver con claridad qué ocurre en cada capa.`,
    homePillars: [
        {
            title: "Curiosidad práctica",
            text: "Aprendo directo sobre un problema real, abriendo la documentación y probando hasta entender la mecánica interna.",
        },
        {
            title: "Un mundo sin casillas",
            text: "En el software creamos nuestras propias reglas, así que bajo a la capa que cada caso pida sin encerrarme en una sola etiqueta.",
        },
        {
            title: "Autonomía con criterio",
            text: "Cuando falta una pieza investigo, pruebo en local y llevo la solución hasta que funciona sola en producción.",
        },
        {
            title: "Adaptación natural",
            text: "Cambiar de lenguaje, industria o herramienta cuesta mucho menos cuando conoces los fundamentos que viven debajo.",
        },
    ],
    story: {
        general: [
            "Para mí la tecnología funciona como un espacio sin fronteras rígidas: uno puede inventar sus propias herramientas, cruzar entre disciplinas y profundizar en cada elemento según lo que pida el caso. Cuando algo se resiste, desarmo el proceso, leo el protocolo y pruebo en local hasta dominarlo. Esa costumbre me deja adaptarme rápido a lenguajes, sectores y equipos distintos sin perder criterio técnico.",
            `Empecé a programar en 2019 en el bachillerato técnico y en 2022 entré a la universidad y a mi primer trabajo en análisis de datos. Desde entonces pasé por BI, CRM, backend, desarrollo web, infraestructura y liderazgo de integraciones, aprendiendo cada tecnología nueva cuando un problema real la pedía.`,
        ],
        backend: [
            "Cuando aparece un problema detrás de una API o una sincronización, me gusta bajar al detalle real: contratos, estados, reintentos y qué ocurre si una red falla a mitad de camino. Aprender lenguajes o protocolos nuevos por mi cuenta se volvió parte natural de mi oficio, porque los fundamentos del servidor se repiten aunque cambie la sintaxis.",
            "Mi trabajo del lado del servidor comenzó limpiando datos con scripts en Python y creció hacia integraciones con sistemas externos, APIs de producto en Spring Boot y más de 20 servicios en FastAPI en producción, combinando REST, SOAP con WS-Security, colas en segundo plano e idempotencia.",
        ],
        crm: [
            "Cuando entro a un proceso comercial o académico, empiezo escuchando a quien atiende a las personas todos los días. Me interesa saber qué dato falta, dónde se repite trabajo y qué automatización quita pasos en lugar de sumar pantallas. El CRM tiene sentido cuando acompaña la operación real sin estorbar.",
            "Llegué al CRM limpiando bases para que los reportes comerciales fueran confiables, luego pasé a automatizar flujos en Deluge y construir landing pages con atribución de campaña, y hoy integro Zoho CRM con sistemas académicos de más de 15 instituciones y desarrollo widgets dentro del propio registro.",
        ],
        data: [
            "Me cuesta confiar en un número si no vi de dónde salió. Antes de armar un tablero o un modelo, reviso las fuentes originales, busco duplicados y entiendo qué decisión depende de esa cifra. Prefiero aprender la consulta, la métrica o el lenguaje que haga falta para que los datos cuenten la verdad.",
            "Empecé en datos con rutinas ETL, reportes automáticos en Python y tableros de KPI para recaudo; después pasé a construir informes de Power BI para finanzas, ventas y mercadeo, y hoy combino SQL en Zoho Analytics con extracciones masivas del CRM a PostgreSQL.",
        ],
        devops: [
            "Me tranquiliza saber cómo se despliega algo, dónde quedan sus logs y cómo avisa si falla a las tres de la mañana. Cuando una pieza de infraestructura se siente opaca, la estudio en local y la dejo automatizada y repetible para que el equipo no viva apagando incendios.",
            "Mi lado de infraestructura nació administrando servidores y soporte interno, siguió con un VPS en Docker, Nginx y despliegues de más de 100 landing pages sin reiniciar nada, y hoy incluye imágenes endurecidas en GHCR y un stack propio de Prometheus, Loki, Tempo y Grafana con alertas a Telegram.",
        ],
        fullstack: [
            "Me gusta recorrer el camino entero entre la base de datos y la pantalla, porque un atajo en un extremo siempre se cobra en el otro. Disfruto cuidar la arquitectura interna tanto como la velocidad, los estados de carga y los detalles que nota quien abre una aplicación por primera vez.",
            "Arranqué construyendo aplicaciones web en PHP y MySQL en el bachillerato y el técnico, pasé a Spring Boot y React en la universidad, y desde 2024 lidero la plataforma IoT SmartPot y contribuyo en GoPoli con Next.js, además de formularios y widgets en producción.",
        ],
    },
    versatility: "Moverme entre datos, CRM, backend, frontend, servidores y seguridad me permite hablar con mercadeo, finanzas, admisiones o TI sin traductores y convertir necesidades ambiguas en tareas claras.",
    ai: [
        "Con la inteligencia artificial recorrí el camino completo, desde armarla por piezas hasta dirigirla en el trabajo diario. En la carrera construí, en pareja, un sistema experto en CLIPS, lógica difusa con scikit-fuzzy y algoritmos genéticos, y por mi cuenta un agente reactivo para controlar actuadores. Después llevé reglas expertas y modelos de scikit-learn a SmartPot para anticipar desviaciones de cultivo, y trabajé con agentes conversacionales en Dapta para automatizar el contacto de leads.",
        "Con modelos de lenguaje me muevo en las dos escalas. En modelos pequeños ajusté Qwen2.5-1.5B con LoRA y armé un pipeline RAG local con Qwen2-0.5B cuantizado e índice FAISS para correr en hardware modesto sin salir de la máquina. En modelos grandes construí un agente en n8n sobre Claude conectado a tres servidores MCP propios en Python, además de trabajar con GPT, Gemini y modelos abiertos en Ollama.",
        "En mi flujo diario dirijo agentes de código, entre ellos Claude Code, con reglas de ingeniería por escrito: convenciones, límites de arquitectura y pruebas obligatorias. Cada propuesta pasa por revisión humana y por la misma CI que cualquier cambio manual. Haber construido sistemas de IA desde adentro es lo que me permite saber qué delegar, detectar rápido cuando una salida flojea y mantener siempre el control del diseño.",
    ],
    ambition: "Lo que quiero construir ahora une dos mundos que ya trabajo a diario: llevar modelos de lenguaje y flujos RAG seguros a los datos reales de cada organización, con privacidad, trazabilidad y controles claros desde el diseño. En lo académico, cierro el diplomado en ciberseguridad en diciembre de 2026 y me gradúo como Ingeniero Informático en marzo de 2027; después siguen una especialización en ciencia de datos y una maestría en ciberseguridad.",
    closing: {
        general: `Me mueve quitarles horas de digitación a los equipos y lograr que los datos reflejen lo que de verdad pasó. Busco un rol de backend o integraciones donde ese criterio cuente, ${SEEKING}.`,
        backend: `Me importa que los datos lleguen completos y a tiempo de un sistema a otro, sin copias manuales en el medio. Busco un rol de backend en Python o Java donde diseñe los servicios y responda por ellos en producción, ${SEEKING}.`,
        crm: `Me importa que cada asesor vea en el CRM lo que de verdad pasó con su aspirante o cliente, sin digitarlo dos veces. Busco un rol de CRM, Zoho o automatización donde el CRM sostenga la operación comercial, ${SEEKING}.`,
        data: `Me importa que finanzas, ventas y mercadeo decidan sobre la misma cifra verificable. Busco un rol de datos o BI donde el análisis termine en una decisión concreta, ${SEEKING}.`,
        devops: `Me importa que el equipo que depende de un servicio nunca sea el primero en enterarse de que se cayó. Busco un rol de DevOps o plataforma, ${SEEKING}.`,
        fullstack: `Me importa que un producto funcione igual de bien para quien lo usa y para quien lo mantiene meses después. Busco un rol full-stack con React y TypeScript, ${SEEKING}.`,
    },
    page: {
        lead: "El resto del portafolio ya muestra fechas, cargos, proyectos y repositorios. Esta página explica qué hay detrás: cómo pienso, qué me despierta curiosidad, por qué elegí cada estudio o certificado y hacia dónde quiero llevar mi trabajo.",
        glance: {
            baseLabel: "Desde",
            base: "Medellín, Colombia (UTC−5)",
            spanLabel: "Recorrido",
            span: `~7 años programando · ${EXPERIENCE_YEARS}+ trabajando`,
            driveLabel: "Motor",
            drive: "Curiosidad práctica y aprendizaje autónomo",
            focusLabel: "Próxima frontera",
            focus: "Datos confiables, IA aplicada y seguridad",
            lensLabel: "Enfoque activo",
            generalLens: "Ver enfoque general",
            talkCta: "Conversemos",
            resumeCta: "Ver hoja de vida",
            backHomeCta: "Volver al resumen en el inicio",
        },
        sections: {
            worldview: "Crear nuestro propio mundo digital",
            curiosity: "Curiosidad, gustos y cómo aprendo",
            choices: "Por qué elegí mis estudios y certificados",
            approach: "Cómo trabajo, me adapto y uso la IA",
            horizon: "Qué me mueve y qué quiero aprender",
            explore: "Explora el resto del portafolio",
        },
        worldview: {
            paragraphs: [
                "Algo que me atrapó desde que escribí mis primeras líneas de código es que el mundo digital obedece a reglas distintas a las del mundo físico. Afuera casi todo viene dado; dentro de un computador somos pequeños dioses capaces de diseñar nuestro propio mundo desde cero, con sus estructuras, sus reglas, sus interfaces y sus conexiones. Cada sistema que existe salió primero de la cabeza de alguien, así que también puede abrirse, entenderse a fondo y volverse a construir.",
                "Tener delante un espacio de posibilidades abiertas es lo que me mantiene en movimiento. Por eso me cuesta encerrarme en un solo campo de especialización: los problemas reales cruzan capas todo el tiempo, y en lo digital siempre se puede bajar a estudiar cada elemento hasta dominarlo. Un día la raíz de una falla está en un formulario, otro día en el modelo de datos, en un servidor saturado o en una regla de permisos. Poder bajar justo hasta ahí me da una libertad que disfruto mucho.",
                "Elegir ese camino tiene un precio claro: cuando no te escondes detrás de un solo título, toca demostrar profundidad real en cada área donde te metes. Me parece un trato justo. Prefiero leer una especificación difícil un sábado antes que pasar meses repitiendo la misma plantilla sin entender qué corre debajo.",
            ],
            principles: [
                {
                    title: "Sin cajas negras",
                    text: "Cuando una librería, un protocolo o un modelo importa para el resultado, abro la tapa hasta entender cómo decide.",
                },
                {
                    title: "Lo simple aguanta más",
                    text: "Uso las capacidades nativas del sistema y extiendo lo que funciona antes de sumar capas por moda.",
                },
                {
                    title: "Profundidad por demanda",
                    text: "La amplitud sirve cuando sabes bajar al detalle del caso concreto que tienes delante.",
                },
                {
                    title: "Cero trabajo mecánico",
                    text: "Si una persona repite los mismos clics cada mañana, ahí hay un proceso pidiendo automatización.",
                },
            ],
            skillsTitle: "Quince grupos de herramientas",
            skillsText: "Cómo se traduce esta amplitud en tecnologías reales, con su enfoque y los proyectos que la prueban.",
            metricsTitle: "Mi ritmo de código en cifras",
            metricsText: "Cómo se reparten mis commits por área, año, días activos y horas medidas.",
        },
        curiosity: {
            paragraphs: [
                "Mi forma de aprender siempre ha sido pragmática y autónoma. Leer cien páginas en abstracto me duerme rápido; aprendo cuando tengo una pregunta concreta o algo que quiero ver andando. Si me pica la curiosidad por cómo comprime un archivo un algoritmo clásico, programo mi propio compresor de Huffman y comparo el resultado byte a byte contra formatos reales. Si quiero sentir cómo responde cada lenguaje frente a las pruebas, escribo el mismo CRUD en seis lenguajes distintos bajo TDD para ver dónde estorba cada uno y dónde encaja mejor.",
                "También disfruto mezclar mundos que a veces se miran de lejos: electrónica y sensores con aplicaciones web, estadística sobre conjuntos reales de datos, o modelos cuantizados corriendo en local para comprobar hasta dónde llegan con menos de un gigabyte de memoria. Trabajando desde Medellín entre un portátil diario y un equipo de escritorio donde monto experimentos, buena parte de lo que sé salió de quedarme probando ideas por puro gusto hasta que dejaron de parecer magia.",
                "Con el tiempo identifiqué qué problemas me dan energía de verdad: lograr que sistemas aislados compartan información confiable, ver un sensor físico reportar lecturas en vivo a una pantalla, o diseñar una interfaz tranquila que esconda la complejidad que corre detrás. Casi cada proyecto propio o universitario de este portafolio nació de una de esas preguntas.",
            ],
            projectsHeading: "Proyectos nacidos de esa curiosidad",
            projectsCta: "Ver todos los proyectos",
            organizationsCta: "Ver las 10 organizaciones en GitHub",
        },
        choices: {
            paragraphs: [
                "Nunca vi estudiar como coleccionar cartones para colgar en la pared. Cada programa y cada certificación que hice respondió a una necesidad real o a una duda que quería entender con método. En el colegio elegí la media técnica porque quería escribir software antes de pisar la universidad, y luego cursé un técnico en programación al mismo tiempo que el primer año de Ingeniería Informática para mantener la práctica pegada a la teoría.",
                "Elegí Ingeniería Informática en una universidad pública de Medellín por las bases pesadas que casi ningún tutorial corto cubre: estructuras de datos, compiladores, sistemas operativos, redes sobre routers físicos, inteligencia artificial y matemáticas aplicadas. Esa base es la que me deja abrir documentación densa de un sistema desconocido y ubicarme rápido.",
                "Con los certificados apliqué el mismo filtro. Tomé SQL, Python, Excel avanzado, Power BI y DAX justo cuando limpiaba bases reales y armaba tableros sobre los que se tomaban decisiones financieras y comerciales; protocolos de IoT cuando empecé a conectar placas ESP32 y sensores; SEO cuando empecé a publicar sitios propios; y habilidades digitales verdes porque quería medir el impacto ambiental de la infraestructura que operamos. En el último semestre sumé el diplomado en ciberseguridad por responsabilidad práctica: si diseñamos APIs, servidores e integraciones que mueven datos de miles de personas, saber cómo se auditan y se rompen cambia por completo la manera de construirlos desde el primer día.",
            ],
            programsHeading: "Los cinco programas detrás de mi formación",
            certsHeading: "Cuatro certificados y el porqué de cada uno",
            certsIntro: "Cada credencial se eligió para cerrar una brecha concreta o profundizar un interés real; en su página se ve qué cubrió y dónde se aplicó.",
            educationCta: "Ver toda la educación y materias",
            certsCta: "Ver las 29 certificaciones",
        },
        approach: {
            paragraphs: [
                "Mi enfoque de trabajo parte de una pregunta directa: qué dolor real tiene la persona del otro lado. Me siento cómodo conversando con equipos de mercadeo, finanzas, admisiones o infraestructura, bajando lo que piden a pasos claros y dejando sistemas que sigan andando sin supervisión constante. Cuando algo falla en producción, bajo el ruido, miro logs, métricas y trazas con calma y dejo una alerta o una prueba para que no vuelva a sorprendernos.",
                "Adaptarme rápido tiene menos de talento raro y más de método: busco qué patrón conocido vive debajo de la herramienta nueva, armo un entorno pequeño donde equivocarse sale barato y documento lo que encuentro para que al equipo le cueste la mitad. Quienes trabajaron conmigo suelen describir esa combinación de tranquilidad bajo presión, autonomía e iniciativa para compartir lo aprendido.",
            ],
            aiHeading: "Con la inteligencia artificial: de construirla a dirigirla",
            reasonsHeading: "Cómo lo ven quienes trabajaron conmigo",
            experienceCta: "Ver dónde apliqué esto en producción",
            servicesCta: "Ver los servicios que ofrezco",
        },
        horizon: {
            paragraphs: [
                "Lo que más me mueve sigue siendo tangible: devolverle horas a la gente eliminando tareas repetitivas, hacer que los datos con los que decide una organización sean confiables y dejar código limpio que otra persona pueda mantener sin sufrir. También me motiva enseñar y documentar; buena parte de lo que sé llegó gracias a personas que se sentaron a explicar cómo funcionaba algo.",
            ],
            learningHeading: "Lo que quiero profundizar ahora",
            learningItems: [
                "Asistentes y pipelines RAG sobre datos institucionales con control de acceso y trazabilidad clara",
                "Arquitecturas orientadas a eventos, colas y servicios distribuidos pensados para picos reales de carga",
                "Seguridad defensiva, modelado de amenazas (OWASP) y operación de clústeres en Kubernetes",
                "Ciencia de datos aplicada y MLOps para llevar modelos de experimentos locales a producción estable",
            ],
        },
        explore: {
            intro: "Si quieres pasar de cómo pienso a la evidencia concreta, cada puerta lleva a una parte distinta del trabajo.",
            items: [
                {
                    key: "experience",
                    title: "Experiencia profesional",
                    description: "Cargos, cronología, proyectos y logros donde puse este enfoque a prueba en producción.",
                },
                {
                    key: "projects",
                    title: "Proyectos y casos de estudio",
                    description: "Productos propios, trabajo y laboratorios con sus decisiones técnicas y pantallas.",
                },
                {
                    key: "journey",
                    title: "Trayectoria y horizonte 2030",
                    description: "El mapa completo desde 2019, evolución de capacidades, radar tecnológico y metas.",
                },
                {
                    key: "skills",
                    title: "Habilidades técnicas",
                    description: "Quince grupos de herramientas con su enfoque, para qué sirven y dónde los usé.",
                },
                {
                    key: "education",
                    title: "Educación y materias",
                    description: "El plan de estudios completo, programas técnicos y repositorios de la carrera.",
                },
                {
                    key: "services",
                    title: "Servicios",
                    description: "Los ocho frentes que puedo asumir en un equipo o como consultor técnico.",
                },
                {
                    key: "reasons",
                    title: "Once razones para contratarme",
                    description: "Cada rasgo respaldado palabra por palabra por recomendaciones de jefes y compañeros.",
                },
                {
                    key: "metrics",
                    title: "Métricas de GitHub",
                    description: "Actividad verificada por área, año, días activos, racha y horas programadas.",
                },
            ],
        },
    },
    terminal: {
        label: "Retrato en ASCII en la terminal",
        command: "$ cat mindset.txt",
        logCommand: "cat trayectoria.log",
        entries: [
            {year: "2019", text: "INEM: primeros algoritmos y diseño web", roles: ["fullstack"]},
            {year: "2020", text: "Pascual Bravo: técnico en desarrollo de software", roles: ["fullstack", "backend"]},
            {
                year: "2022",
                text: "Politécnico y SENA: ingeniería y técnico en programación",
                roles: ["backend", "fullstack"],
            },
            {year: "2022", text: "Quipux: práctica de análisis de datos", roles: ["data"]},
            {year: "2023", text: "MUV-U: CRM, Power BI y servidores", roles: ["crm", "data", "devops"]},
            {
                year: "2024",
                text: "SmartPot: desarrollador líder de la plataforma IoT",
                roles: ["backend", "fullstack", "devops"],
            },
            {year: "2025", text: "ADCOM: CRM, MarTech y más de 100 landing pages", roles: ["crm", "fullstack"]},
            {
                year: "2025",
                text: "TIVENOS: IT Manager y líder de integraciones",
                roles: ["backend", "crm", "data", "devops"],
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
