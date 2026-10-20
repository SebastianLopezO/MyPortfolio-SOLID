import type {JourneyCopy} from "@/types/journey";

export const journey: JourneyCopy = {
    title: "Mi trayectoria",
    subtitle: {
        general: "De los proyectos del colegio a sistemas en producción, y hacia dónde voy",
        backend: "De los primeros programas en Python y Java a una plataforma de integraciones en producción, y hacia dónde voy",
        crm: "Del análisis de datos a llevar el CRM de varias instituciones y campañas, y hacia dónde voy",
        data: "De las primeras hojas de cálculo a snapshots, tableros y modelos, y hacia la especialización en ciencia de datos",
        devops: "De subir archivos a mano a flotas que se despliegan y se vigilan solas, y hacia la maestría en ciberseguridad",
        fullstack: "De las primeras páginas en HTML a productos web completos en equipo, y hacia dónde voy",
    },
    tabsLabel: "Vistas de la trayectoria",
    tabs: {
        map: {
            label: "Mapa del recorrido",
            description: "Cada línea es un rol y cada parada es un hito. Selecciona una parada para ver qué pasó ahí."
        },
        evolution: {
            label: "Evolución de capacidades",
            description: "Cómo creció cada capacidad año a año, y dónde la quiero en 2030."
        },
        focus: {
            label: "Radar de enfoque",
            description: "Lo que está en foco hoy, lo que estoy fortaleciendo, lo que exploro y lo que quedó fuera de foco."
        },
        horizon: {
            label: "Hacia dónde voy",
            description: "Las próximas paradas después del grado, y cómo mi trabajo se conecta con los Objetivos de Desarrollo Sostenible.",
        },
    },
    linesShort: {
        education: "Formación",
        web: "Web",
        backend: "Backend",
        crm: "CRM",
        data: "Datos",
        devops: "DevOps",
        security: "Seguridad",
    },
    lines: {
        education: "Formación",
        web: "Web y full-stack",
        backend: "Backend e integraciones",
        crm: "CRM y automatización",
        data: "Datos y BI",
        devops: "DevOps y nube",
        security: "Seguridad",
    },
    areas: {
        foundations: "Bases de ingeniería",
        web: "Web y frontend",
        backend: "Backend y APIs",
        databases: "Bases de datos",
        crm: "CRM y automatización",
        data: "Datos y BI",
        devops: "DevOps y nube",
        security: "Seguridad",
        ai: "IA y ciencia de datos",
    },
    kinds: {education: "Formación", work: "Trabajo", project: "Proyecto", certification: "Certificación", goal: "Meta"},
    levels: ["Ninguno", "Aprendiendo", "Practicando", "Profesional", "Liderando"],
    today: "Hoy",
    planned: "Planeado",
    milestones: {
        inem: {
            short: "INEM",
            title: "Bachillerato con especialidad en informática",
            place: "I.E. INEM José Félix de Restrepo",
            summary: "Primer contacto con la lógica de programación, los algoritmos y el diseño web mientras terminaba el colegio.",
        },
        pascual: {
            short: "Pascual Bravo",
            title: "Técnico Auxiliar en Desarrollo de Software",
            place: "Institución Educativa Pascual Bravo",
            summary: "Lógica de programación, estructuras de datos y bases de datos relacionales, con pequeños proyectos en HTML, PHP, VB.NET, Java y Python.",
        },
        html: {
            title: "Primer certificado, de HTML",
            place: "Coursera",
            summary: "Introducción a HTML, la primera parada de la línea web."
        },
        firstPython: {
            title: "Primeros pasos en Python",
            place: "Universidad EIA · Universidad Tecnológica de Pereira",
            summary: "Introducción a la programación en Python y luego Fundamentos de Programación 1 y 2 en Misión TIC 2022.",
        },
        sena: {
            short: "SENA",
            title: "Técnico en Programación de Software",
            place: "SENA – Institución Universitaria Salazar y Herrera",
            summary: "Desarrollo web, bases de datos, control de versiones y modelado de datos, con aplicaciones web y herramientas de sistema en C#, PHP y MySQL.",
        },
        politecnico: {
            short: "Politécnico",
            title: "Ingeniería Informática",
            place: "Politécnico Colombiano Jaime Isaza Cadavid",
            summary: "Ingeniería de software, inteligencia artificial, visión por computador, redes y sistemas operativos. Último semestre en 2026.",
        },
        firstCommit: {
            title: "Primer commit en GitHub",
            place: "GitHub",
            summary: "26 de febrero de 2022: el inicio de un historial que hoy abarca diez organizaciones.",
        },
        testlab: {
            title: "Automatizaciones de datos",
            place: "TestLabData",
            summary: "Automatizaciones en Python para datos de campañas y reportes, 2022–2023."
        },
        quipux: {
            short: "Quipux",
            title: "Analista de Datos (Practicante)",
            place: "Quipux S.A.S",
            summary: "Rutinas ETL, reportes automatizados y tableros de KPI para procesos de recaudo y movilidad.",
        },
        skillCertificates: {
            title: "Certificados de habilidades",
            place: "HackerRank · Cámara de Comercio y Educación",
            summary: "SQL, Python, Java, CSS y resolución de problemas en HackerRank, más Excel profesional, entre mayo de 2022 y marzo de 2023.",
        },
        django: {
            title: "Django con Sapiencia",
            place: "Sapiencia · Comfenalco Antioquia",
            summary: "Dos cursos de Python con Django, Bootstrap y bases de datos, mi primer framework web en Python antes de FastAPI.",
        },
        muvu: {
            short: "MUV-U",
            title: "Desarrollador Backend & Analista de Datos",
            place: "MUV-U S.A.S",
            summary: "Reportes en Power BI con DAX, calidad de datos del CRM y automatizaciones para los equipos comercial y de operaciones.",
        },
        hacklab: {
            title: "Hacking ético gamificado",
            place: "HackerMentor · HACKLAB",
            summary: "Mi primera formación práctica en hacking ético, en un laboratorio gamificado.",
        },
        pythonSpecialist: {
            title: "IT Specialist – Python",
            place: "Certiport – Pearson VUE",
            summary: "Certificación de la industria en programación con Python."
        },
        platziRoute: {
            title: "Ruta de fundamentos en Platzi",
            place: "Platzi",
            summary: "Git y GitHub, ingeniería de software, JavaScript práctico, programación básica, fundamentos de Python y protocolos de IoT, entre noviembre y diciembre de 2023.",
        },
        enganchaTic: {
            title: "Engancha TIC 2.0",
            place: "Universidad de Antioquia",
            summary: "Cuatro certificaciones de habilidades digitales en la maratón de certificación que el MinTIC hizo con la Universidad de Antioquia, en ciencia de datos e IA, ciberseguridad, visualización de datos y programación web.",
        },
        greenSkills: {
            title: "Green Digital Skills",
            place: "INCO Academy",
            summary: "Sostenibilidad digital, o cómo las decisiones tecnológicas afectan el medio ambiente.",
        },
        biCertificates: {
            title: "Excel y Power BI con DAX",
            place: "Platzi",
            summary: "Excel avanzado, análisis de datos con Power BI, DAX y fundamentos de SEO con Google Search Console, de junio a septiembre de 2024.",
        },
        smartpot: {
            short: "SmartPot",
            title: "SmartPot",
            place: "SmartPotTech",
            summary: "Plataforma IoT para cultivos hidropónicos, con 11 repositorios y un equipo de cinco en el que lidero el desarrollo de firmware, API, asistente de IA, PWA e infraestructura.",
        },
        taurus: {
            title: "Prueba técnica de datos",
            place: "TaurusSebastian-s",
            summary: "De archivos CSV en bruto a una API de métricas en FastAPI y un tablero interactivo en React.",
        },
        adcom: {
            short: "ADCOM",
            title: "Desarrollador CRM & MarTech",
            place: "ADCOM GROUP",
            summary: "Automatización de Zoho CRM y más de 90 landing pages de admisiones conectadas a formularios y al CRM.",
        },
        peppercrm: {
            title: "PepperCRM",
            place: "PepperTechDev",
            summary: "Producto CRM hecho por un equipo de cuatro, donde escribí la mayor parte del backend con Spring Boot, Spring Security y JWT.",
        },
        tivenos: {
            short: "TIVENOS",
            title: "Líder de TI e Integraciones Backend",
            place: "TIVENOS",
            summary: "Más de 20 servicios de integración en FastAPI que conectan Zoho CRM con los sistemas académicos de más de 15 clientes educativos, con sus despliegues y su observabilidad.",
        },
        zohoToolkit: {
            title: "Operación masiva en Zoho",
            place: "ADCOM GROUP",
            summary: "Scripts y notebooks que cargan, vinculan y sincronizan grandes volúmenes de registros en el Zoho CRM de cada cliente.",
        },
        emailAutomations: {
            title: "Automatizaciones de correo",
            place: "ADCOM GROUP",
            summary: "El correo de resultados de dos marcas de lotería, que cada noche espera los sorteos que faltan, y correos de bienvenida y cumpleaños con el nombre de cada suscriptor.",
        },
        realEstateSite: {
            title: "Landing inmobiliaria",
            place: "ADCOM GROUP",
            summary: "Un sitio de captación que publica cada madrugada el inventario de Wasi de una inmobiliaria y guarda sus solicitudes en Supabase.",
        },
        networks: {
            title: "Redes con equipos reales",
            place: "Politécnico Colombiano Jaime Isaza Cadavid",
            summary: "Enrutamiento con RIPv2, OSPF y EIGRP, IPv6 de doble pila, SNMP y VoIP sobre routers Cisco físicos, además de Packet Tracer.",
        },
        aiCourses: {
            title: "Inteligencia artificial en la carrera",
            place: "Politécnico Colombiano Jaime Isaza Cadavid",
            summary: "Sistemas expertos, lógica difusa, algoritmos genéticos, visión por computador y computación evolutiva, con un modelo para SmartPot incluido.",
        },
        distributed: {
            title: "Programación distribuida y paralela",
            place: "Politécnico Colombiano Jaime Isaza Cadavid",
            summary: "Sockets e hilos, RMI y un sistema escolar con Spring Boot, FastAPI con GraphQL y React.",
        },
        landingPlatform: {
            title: "Plataforma de despliegue de landings",
            place: "ADCOM GROUP",
            summary: "Un workflow reutilizable y un Nginx por cliente que publican más de 100 landing pages sin reiniciar nada, con monitoreo diario.",
        },
        gopoli: {
            short: "GoPoli",
            title: "GoPoli",
            place: "Proyecto universitario · Politécnico JIC",
            summary: "Plataforma de viajes compartidos para estudiantes de mi universidad, donde soy el principal contribuidor."
        },
        observability: {
            title: "Observabilidad de las integraciones",
            place: "TIVENOS",
            summary: "Métricas, logs, trazas, sondas y alertas para más de 20 servicios, con Prometheus, Grafana, Loki y Tempo.",
        },
        emailSignatures: {
            title: "Generador de firmas de correo",
            place: "TIVENOS",
            summary: "Firmas para cinco marcas en tres temas, generadas desde plantillas y listas para Outlook, Gmail y Apple Mail.",
        },
        cyberDiploma: {
            short: "Diplomado",
            title: "Diplomado en Ciberseguridad",
            place: "Politécnico Colombiano Jaime Isaza Cadavid",
            summary: "Laboratorios con Kali Linux sobre el análisis de vulnerabilidades de un servicio FTP, un CTF desde el reconocimiento hasta la escalada de privilegios y una prueba controlada de disponibilidad en WordPress, además de un caso de ciberataque con su plan de protección y control de acceso por roles.",
        },
        portfolio: {
            title: "Este portafolio",
            place: "SebastianLopezO",
            summary: "Sitio bilingüe prerenderizado con vistas por rol, un asistente y validaciones contra producción después de cada despliegue.",
        },
        crmWidgets: {
            title: "Widgets de Zoho CRM",
            place: "TIVENOS",
            summary: "Cinco widgets dentro del CRM, con cotizador en PDF, matrícula en cinco pasos, captura de leads, citas y cambio de programa.",
        },
        graduation: {
            short: "Ingeniero",
            title: "Ingeniero Informático",
            place: "Politécnico Colombiano Jaime Isaza Cadavid",
            summary: "Grado previsto para marzo de 2027, para cerrar la carrera de ingeniería.",
        },
        dataScience: {
            short: "Ciencia de datos",
            title: "Especialización en Ciencia de Datos",
            place: "Planeada para 2027–2028",
            summary: "Estadística, aprendizaje automático e ingeniería de datos, para convertir los datos que ya integro en predicciones y decisiones.",
        },
        cybersecurity: {
            short: "Ciberseguridad",
            title: "Maestría en Ciberseguridad",
            place: "Planeada para 2028–2030",
            summary: "Seguridad de aplicaciones, de la nube y de los datos, junto con gobierno, para proteger los sistemas e integraciones que construyo.",
        },
        vision: {
            short: "Meta 2030",
            title: "Ingeniería de datos segura para la educación y los servicios públicos",
            place: "Meta para 2030",
            summary: "Diseñar plataformas de datos útiles, medibles y seguras desde el diseño para universidades e instituciones públicas.",
        },
    },
    map: {
        detail: "Ver la página",
        legendLabel: "Líneas",
        emphasisHint: "Selecciona una línea para resaltarla",
        allLines: "Todas las líneas",
        previousStop: "Parada anterior",
        nextStop: "Parada siguiente",
        listToggle: {show: "Ver como lista", hide: "Ocultar la lista"},
        activityLabel: "Días activos en GitHub",
        streakLabel: "{days}+ días seguidos",
        goTo: "Ir a la sección",
        certificates: "Certificados en esta parada",
    },
    evolution: {
        caption: "Nivel de cada capacidad por año, autoevaluado a partir de trabajos, proyectos y certificados. Desde 2027 son metas.",
        capability: "Capacidad",
        target: "Meta",
        evidence: "Hitos",
        noEvidence: "Sin hitos registrados este año",
        activeDays: "Días activos en GitHub",
        activeDaysNote: "Según el calendario de contribuciones de GitHub; 2026 cuenta hasta el 14 de octubre.",
        legend: "Nivel",
        previousYear: "Año anterior",
        nextYear: "Año siguiente",
    },
    radar: {
        caption: "Radar tecnológico personal. Mientras más cerca del centro, más foco recibe hoy.",
        rings: {
            core: {label: "Centro de foco", description: "Lo que uso y entrego cada semana."},
            growing: {label: "En crecimiento", description: "Lo que estoy fortaleciendo ahora, con proyectos reales."},
            exploring: {
                label: "Explorando",
                description: "Los próximos pasos, ligados a la especialización y la maestría."
            },
            paused: {label: "Fuera de foco", description: "Lo conozco, pero hoy no estoy invirtiendo en ello."},
        },
        quadrants: {
            build: "Construir e integrar",
            data: "Datos e IA",
            platforms: "Plataformas y operación",
            security: "Seguridad y calidad"
        },
        items: {
            fastapi: {name: "Python · FastAPI", note: "Mi stack diario para servicios de integración en producción."},
            zoho: {name: "Zoho CRM · Deluge", note: "Módulos, funciones, widgets e integraciones OAuth del CRM."},
            integrations: {
                name: "REST · SOAP · Webhooks",
                note: "Para conectar sistemas académicos, heredados y de marketing."
            },
            spring: {name: "Java · Spring Boot", note: "APIs de SmartPot, PepperCRM y GoPoli."},
            react: {name: "React · TypeScript", note: "PWAs, landing pages y widgets de CRM, al día para el trabajo full-stack."},
            jobs: {
                name: "Trabajos en segundo plano",
                note: "Procesos largos que responden 202, evitan duplicados con una clave de idempotencia y dejan su estado consultable."
            },
            graphql: {
                name: "GraphQL",
                note: "Lo usé con Strawberry en un proyecto de la carrera; lo considero para APIs con muchos consumidores."
            },
            events: {
                name: "Arquitectura orientada a eventos",
                note: "Colas y eventos para desacoplar integraciones a escala."
            },
            php: {name: "PHP · Laravel", note: "Lo usé en proyectos del colegio y del técnico; hoy no es mi foco."},
            dotnet: {name: "C# · VB.NET", note: "Donde empecé, con herramientas de escritorio."},
            sql: {name: "SQL", note: "Reportes, calidad de datos y analítica cada semana."},
            pandas: {name: "Python · Pandas", note: "Scripts de ETL, análisis y automatización."},
            bi: {name: "Power BI · Zoho Analytics", note: "Tableros con DAX y SQL para equipos de negocio."},
            ml: {
                name: "IA · scikit-learn",
                note: "Del sistema experto y la lógica difusa a los modelos del asistente de SmartPot; el centro de la especialización que planeo."
            },
            pipelines: {name: "Pipelines de datos", note: "Pasar de scripts a pipelines programados y monitoreados."},
            warehouse: {
                name: "PostgreSQL para análisis",
                note: "Snapshots del CRM en PostgreSQL para consultarlo con SQL sin tocar el CRM."
            },
            mlops: {name: "MLOps", note: "Desplegar y monitorear modelos como cualquier otro servicio."},
            llm: {
                name: "LLM · Apps RAG",
                note: "Qwen2 ajustado con LoRA y en un RAG local, y un agente con Claude y servidores MCP; lo siguiente son asistentes sobre los datos de cada organización."
            },
            vba: {name: "Excel · VBA", note: "Útil en su momento; hoy lo reemplazan Python y las herramientas de BI."},
            docker: {name: "Docker · Compose", note: "Cada servicio sale como una imagen endurecida."},
            actions: {name: "GitHub Actions · GHCR", note: "CI, publicación de imágenes y despliegues por SSH."},
            observability: {
                name: "Prometheus · Grafana",
                note: "Métricas, logs y trazas con Loki y Tempo, con alertas a Telegram."
            },
            linux: {name: "Linux · Nginx", note: "Servidores, proxies inversos y TLS."},
            networks: {
                name: "Redes · Cisco",
                note: "Enrutamiento, IPv6 y SNMP en routers Cisco reales, en la carrera."
            },
            iot: {name: "IoT · MQTT", note: "Sensores ESP32 que publican por MQTT con TLS en SmartPot."},
            kubernetes: {name: "Kubernetes", note: "Manifiestos para SmartPot; operar clústeres es el siguiente paso."},
            cloud: {name: "AWS · Azure", note: "Servicios gestionados en la nube, más allá de servidores propios."},
            hardening: {name: "Seguridad por defecto", note: "Contenedores sin root, CSP, HSTS y mínimo privilegio."},
            auth: {name: "OAuth 2.0 · JWT", note: "OAuth de Zoho y Spring Security con JWT."},
            secrets: {
                name: "Secretos y accesos",
                note: "Secretos cifrados con AES-256-GCM, usuarios de despliegue restringidos y llaves de host fijadas."
            },
            testing: {name: "Pruebas automatizadas", note: "PyTest, Vitest y Playwright en CI."},
            scanning: {name: "Escaneo de dependencias y código", note: "Dependabot y CodeQL en mis proyectos."},
            appsec: {name: "AppSec · OWASP", note: "Modelado de amenazas y revisiones de código seguro."},
            hacking: {
                name: "Hacking ético",
                note: "Empezó con HACKLAB; ahora lo practico en los laboratorios de Kali Linux del diplomado en ciberseguridad."
            },
            governance: {
                name: "ISO/IEC 27001",
                note: "Gestión de la seguridad para las instituciones a las que sirvo."
            },
        },
    },
    horizon: {
        intro:
            "Quiero profundizar donde se cruzan los datos y la seguridad, primero con una especialización en ciencia de datos y luego con una maestría en ciberseguridad, siempre con enfoque de ingeniería. En 2030 quiero construir plataformas de datos útiles, medibles y seguras desde el diseño.",
        goalsLabel: "Próximas paradas",
        gains: {
            graduation: ["Una base formal en ingeniería de software, redes e IA", "Cuatro años de práctica profesional, respaldados por el título"],
            dataScience: ["Estadística y diseño de experimentos", "Aprendizaje automático y MLOps", "Ingeniería de datos con pipelines, calidad y gobierno"],
            cybersecurity: ["Seguridad de aplicaciones y APIs (OWASP)", "Seguridad en la nube y en redes", "Gestión de riesgos e ISO/IEC 27001"],
            vision: ["Liderar plataformas de datos e integración", "Seguridad desde el diseño en cada entrega", "Impacto medible en la educación"],
        },
        sdgTitle: "Alineado con la Agenda 2030",
        sdgIntro: "Los Objetivos de Desarrollo Sostenible que mi trabajo ya toca y hacia donde apuntan mis planes. Selecciona uno para ver sus hitos.",
        sdgShort: "ODS",
        sdgs: {
            2: {
                name: "Hambre cero",
                contribution: "SmartPot monitorea y automatiza cultivos hidropónicos para producir alimentos con menos pérdidas."
            },
            4: {
                name: "Educación de calidad",
                contribution: "Integraciones para más de 15 instituciones educativas, embudos de admisión para universidades, GoPoli para estudiantes y mi propia formación."
            },
            8: {
                name: "Trabajo decente y crecimiento económico",
                contribution: "Automatizaciones que quitan trabajo manual a los equipos de ventas, operaciones y marketing."
            },
            9: {
                name: "Industria, innovación e infraestructura",
                contribution: "Servicios que mantienen sincronizados los sistemas académicos y Zoho CRM, la plataforma IoT de SmartPot y ETL para procesos de movilidad en Quipux."
            },
            11: {
                name: "Ciudades y comunidades sostenibles",
                contribution: "GoPoli comparte viajes entre estudiantes para reducir trayectos y costos."
            },
            13: {
                name: "Acción por el clima",
                contribution: "Por ahora, el certificado Green Digital Skills (INCO Academy, 2024)."
            },
            16: {
                name: "Paz, justicia e instituciones sólidas",
                contribution: "Seguridad y protección de datos para las instituciones, el foco de la maestría que planeo."
            },
        },
        related: "Hitos relacionados",
    },
};
