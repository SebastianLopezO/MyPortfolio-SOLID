import type {DetailPagesCopy} from "@/types/detail";

export const detailPages: DetailPagesCopy = {
    ui: {
        breadcrumb: "Ruta de navegación",
        eyebrow: {
            experience: "Experiencia",
            education: "Educación",
            certifications: "Certificación",
            organizations: "Organización en GitHub",
            services: "Servicio",
            reasons: "Razón para contratarme",
            metrics: "Métricas de GitHub"
        },
        all: {
            experience: "Toda la experiencia",
            education: "Toda la educación",
            certifications: "Todas las certificaciones",
            organizations: "Todas las organizaciones",
            services: "Todos los servicios",
            reasons: "Todas las razones",
            metrics: "Todas las métricas"
        },
        onThisPage: "En esta página",
        atAGlance: "En resumen",
        sections: {
            overview: "Resumen",
            positions: "Cargos",
            achievements: "Lo que hice",
            timeline: "Cronología",
            projects: "Proyectos",
            recommendations: "Recomendaciones",
            meanwhile: "Lo que estudiaba mientras tanto",
            stack: "Tecnologías",
            activity: "Actividad en GitHub",
            areas: "Áreas del programa",
            courses: "Materias y competencias",
            skills: "Lo que aprendí",
            learned: "Lo que aprendí",
            program: "El programa",
            profile: "Para qué forma",
            curriculum: "Plan de estudios",
            company: "Sobre la empresa",
            earned: "Cómo lo obtuve",
            built: "Lo que construí en el curso",
            adds: "Lo que aporta al perfil",
            applied: "Dónde se ve en mi trabajo",
            context: "En ese momento",
            issuer: "Quién la emite",
            sameStop: "En la misma parada de la trayectoria",
            role: "Mi papel",
            related: "Empleo o programa",
            repositories: "Repositorios públicos",
            metrics: "Métricas de la organización",
            scope: "Lo que incluye",
            provenIn: "Dónde ya lo hice",
            jobs: "En qué empleos",
            whyMe: "Por qué conmigo",
            quote: "En palabras de quien trabajó conmigo",
            practice: "Cómo se ve en mi trabajo",
            studies: "En qué estudios",
            services: "Servicios donde se nota",
        },
        facts: {
            title: "Cargo",
            company: "Empresa",
            program: "Programa",
            school: "Institución",
            period: "Periodo",
            place: "Lugar",
            status: "Estado",
            graduation: "Grado previsto",
            issuer: "Emisor",
            date: "Fecha",
            stop: "Parada en la trayectoria",
            visibility: "Visibilidad",
            repositories: "Repositorios",
            members: "Miembros",
            organization: "Organización en GitHub",
            duration: "Duración",
            roles: "Para los perfiles",
            quotedBy: "Lo escribió",
            relationship: "Relación",
        },
        hours: "{hours} horas",
        curriculumSlider: {previous: "Bloque anterior", next: "Bloque siguiente"},
        status: {current: "Actual", finished: "Terminado", inProgress: "En curso"},
        visibility: {public: "Pública", private: "Privada"},
        privateCode: "Su código es privado",
        activity: {
            commits: "{mine} de {people} commits",
            share: "{percent} de los commits hechos por personas",
            repositories: "commits míos en {count} de {total} repositorios",
            byYear: "Mis commits por año",
            note: "Commits en la rama principal de cada repositorio, con los merges y sin los bots, leídos en la API de GitHub el {date}. Suman todas las identidades de Git que he usado.",
        },
        events: {
            joined: "Entré a {company} como {title}",
            position: "Pasé al cargo de {title}",
            left: "Terminé mi etapa en {company}",
            project: "Empieza {name}",
            recommendation: "Recomendación de {author}",
            programStart: "Empecé {degree}",
            programEnd: "Terminé {degree}",
            graduation: "Grado previsto",
            certification: "Obtuve la certificación {title}",
        },
        timeline: {
            filter: "Filtrar la cronología",
            all: "Todo",
            kinds: {
                job: "Cargos",
                program: "Estudios",
                project: "Proyectos",
                recommendation: "Recomendaciones",
                certification: "Certificaciones",
                milestone: "Hitos",
            },
            showing: "{count} entradas en la cronología",
        },
        counts: {
            projects: {one: "1 proyecto", other: "{count} proyectos"},
            recommendations: {one: "1 recomendación", other: "{count} recomendaciones"},
            certifications: {one: "1 certificación", other: "{count} certificaciones"},
            repositories: {one: "1 repositorio", other: "{count} repositorios"},
            jobs: {one: "1 empleo", other: "{count} empleos"},
            programs: {one: "1 programa", other: "{count} programas"},
        },
        actions: {
            credential: "Ver credencial",
            openRepository: "Abrir el repositorio",
            openOrganization: "Abrir en GitHub",
            readPage: "Ver la página",
            previous: "Anterior",
            next: "Siguiente",
            talk: "Hablemos de este servicio",
            seeReasons: "Por qué contratarme",
        },
        workKinds: {project: "Proyecto", experience: "Experiencia"},
        contextIntro: "Cuando la obtuve, trabajaba o estudiaba aquí:",
        certificationGroups: {label: "Agrupar las certificaciones", issuer: "Por emisor", year: "Por año"},
        certificate: {
            title: "El certificado",
            caption: "Tal como lo publica {issuer}.",
            redacted: "El número de documento viene tapado en el original.",
            alt: "Certificado de «{title}» emitido por {issuer} a nombre de Sebastián López Osorno",
            enlarge: "abrir en tamaño completo",
            seoTail: "Certificado a nombre de Sebastián López Osorno.",
        },
        reasonSeoTail: "Lo respalda la recomendación de {author}.",
    },
    indexes: {
        experience: {
            title: "Experiencia profesional",
            subtitle: "Cuatro empresas desde 2022, de la práctica de datos al liderazgo de integraciones. En la página de cada una están los cargos, la cronología, los proyectos, las tecnologías y las recomendaciones de quienes trabajaron conmigo.",
            seo: {
                title: "Experiencia profesional · Sebastián López Osorno",
                description: "Los cargos, la cronología, los proyectos, las tecnologías y las recomendaciones de TIVENOS, ADCOM, MUV-U y Quipux, de 2022 a hoy.",
            },
        },
        education: {
            title: "Educación",
            subtitle: "La carrera de Ingeniería Informática, el diplomado en ciberseguridad y los programas técnicos que vinieron antes, cada uno con sus áreas, materias, proyectos y repositorios.",
            seo: {
                title: "Educación · Sebastián López Osorno",
                description: "Ingeniería Informática en el Politécnico Colombiano Jaime Isaza Cadavid, un diplomado en ciberseguridad y los programas técnicos del SENA, el Pascual Bravo y el INEM.",
            },
        },
        certifications: {
            title: "Certificaciones",
            subtitle: "{count} certificaciones de {issuers} emisores, de 2020 a 2024, por emisor o por año. Al abrir una se ve lo que aprendí, lo que le aporta al perfil, dónde se nota en mi trabajo y qué hacía cuando la obtuve.",
            seo: {
                title: "Certificaciones · Sebastián López Osorno",
                description: "IT Specialist en Python, Power BI y DAX, ciencia de datos, ciberseguridad, desarrollo web y fundamentos de programación, con lo que aporta cada una.",
            },
        },
        organizations: {
            title: "Organizaciones en GitHub",
            subtitle: "Las diez organizaciones donde está mi código, entre las de mis empleos y mi práctica, las de los productos que construí, la de una prueba técnica y una por cada etapa de estudio, cada una con mis commits por año.",
            seo: {
                title: "Organizaciones en GitHub · Sebastián López Osorno",
                description: "Diez organizaciones de GitHub con mi código, entre TIVENOS, ADCOM, SmartPot, GoPoli, PepperCRM, la carrera y los programas técnicos, con mis commits en cada una.",
            },
        },
        services: {
            title: "Servicios",
            subtitle: "Lo que puedo asumir para un equipo o una empresa: integraciones entre sistemas, Zoho CRM, web y landing pages, datos, automatización, infraestructura, observabilidad y consultoría técnica. Cada servicio tiene su página, con lo que incluye, los proyectos donde ya lo hice y los empleos donde lo hice.",
            seo: {
                title: "Servicios de integración, CRM y backend · Sebastián López Osorno",
                description: "Integraciones y backend, desarrollo en Zoho CRM, web, datos, automatización, infraestructura, observabilidad y consultoría, cada uno con los proyectos que lo prueban.",
            },
        },
        reasons: {
            title: "¿Por qué contratarme?",
            subtitle: "Once razones, cada una con lo que un jefe, un compañero o un colega escribió sobre trabajar conmigo, y con los proyectos, los empleos y los estudios donde se ve.",
            seo: {
                title: "Por qué contratarme · Sebastián López Osorno",
                description: "Once razones para contratarme, cada una con la recomendación de un jefe o un compañero y los proyectos, empleos y estudios donde se ve en mi trabajo.",
            },
        },
        metrics: {
            title: "Métricas de GitHub",
            subtitle: "Mi actividad en GitHub en cifras: contribuciones, commits, días activos, rachas y revisiones, las áreas a las que fueron mis commits, cómo creció la actividad cada año, los días en que trabajo y los editores que uso, con lo que cuenta cada cifra y lo que no.",
            seo: {
                title: "Métricas de GitHub · Sebastián López Osorno",
                description: "Contribuciones, commits, días activos, rachas y revisiones en GitHub desde 2022, por área, año, día de la semana y editor, con lo que significa cada cifra.",
            },
        },
    },
    experience: {
        tivenos: {
            tagline: "Integraciones, observabilidad y herramientas de CRM para universidades de Latinoamérica y España",
            intro: [
                "TIVENOS hace tecnología para el sector educativo. Implementa y opera Zoho CRM para universidades y escuelas de negocios de Latinoamérica y España, y conecta ese CRM con los sistemas académicos de cada institución.",
                "Entré en junio de 2025 como contratista independiente, en remoto, y hoy llevo las integraciones y la operación de TI del equipo.",
            ],
            company: {
                text: [
                    "TIVENOS se presenta como Solutions for Education. Trabaja con instituciones educativas de Iberoamérica en CRM, sistemas de información estudiantil, plataformas de aprendizaje, gestión de procesos, inteligencia de negocios, tercerización de procesos y retención estudiantil. Su sitio cuenta más de 100 instituciones, más de 170.000 estudiantes y proyectos en más de 16 países de Iberoamérica, Estados Unidos y el norte de África.",
                    "Mi trabajo está del lado del CRM y las integraciones de esa oferta, en los servicios que conectan Zoho CRM con el sistema académico de cada institución y en las herramientas que usan a diario los equipos de admisiones.",
                ],
                source: {label: "TIVENOS en tivenos.com", href: "https://tivenos.com/"},
            },
            positions: [
                {
                    title: "IT Manager · Desarrollador Backend CRM · Analista de Datos",
                    start: "2025-06",
                    end: null,
                    text: "Escribo y opero los servicios que mantienen sincronizados Zoho CRM y los sistemas académicos, construyo los widgets y formularios que usan los equipos de admisiones y analizo los datos del CRM con Zoho Analytics y SQL. También llevo la mesa de ayuda, los estándares de código y el manejo seguro de las credenciales.",
                },
            ],
            timeline: [],
            seo: {
                title: "IT Manager e integraciones en TIVENOS · Experiencia",
                description: "Servicios de integración en FastAPI para más de 15 instituciones, observabilidad con Prometheus y Grafana, widgets de Zoho CRM y la operación de TI, desde 2025.",
            },
        },
        adcom: {
            tagline: "CRM, MarTech y la plataforma que publica más de 100 landing pages",
            intro: [
                "ADCOM Group es una agencia de marketing de Medellín. Hace campañas de admisiones para universidades y campañas digitales para marcas de consumo, entre ellas marcas nacionales de lotería, y cada lead de esas campañas tiene que llegar a Zoho CRM con la campaña que lo trajo.",
                "Entré en febrero de 2025 al equipo MarTech como desarrollador de CRM y web. En junio de 2025 asumí además los servidores de la agencia y las integraciones con los sistemas de sus clientes, y después, la plataforma que publica sus landing pages.",
            ],
            company: {
                text: [
                    "ADCOM se presenta como una agencia de estrategia, performance y MarTech que une tecnología, storytelling y performance. Sus servicios van de la planeación estratégica y los medios digitales, con la atribución de cada lead, al marketing de datos, los sitios y las landing pages pensadas para campañas de alto tráfico, el contenido y la capacitación de empresas.",
                    "Trabajo del lado de la tecnología y los datos de esa oferta, en las landing pages y la plataforma que las publica, el CRM al que llega cada lead con la campaña que lo trajo y las integraciones con las plataformas de anuncios y los sistemas de los clientes.",
                ],
                source: {label: "ADCOM en adcom.group", href: "https://adcom.group/"},
            },
            positions: [
                {
                    title: "Desarrollador CRM · Desarrollador Web",
                    start: "2025-02",
                    end: "2025-06",
                    text: "Configuré módulos, flujos de trabajo y funciones en Deluge sobre Zoho CRM, integré WhatsApp, Meta Ads y Google Ads por API, construí aplicaciones internas en Zoho Creator y automaticé el contacto de leads con agentes de IA en Dapta.",
                },
                {
                    title: "Desarrollador CRM · MarTech Developer · CRM & Cloud Solutions Engineer",
                    start: "2025-06",
                    end: null,
                    text: "Al CRM se sumaron las integraciones con los sistemas académicos y comerciales de los clientes, la administración del VPS (SSH, SSL, Nginx, Docker y despliegues con GitHub Actions), servicios internos como Prometheus, Nagios y n8n, y la asesoría técnica a los equipos de desarrollo, mercadeo y analítica.",
                },
            ],
            timeline: [],
            seo: {
                title: "Desarrollador CRM y MarTech en ADCOM · Experiencia",
                description: "Zoho CRM, más de 90 landing pages de admisiones con su plataforma de despliegue, automatizaciones de correo y la administración de servidores, desde 2025.",
            },
        },
        muvu: {
            tagline: "Datos, CRM y servidores en una agencia de estudios en el exterior",
            intro: [
                "MUV-U es una agencia de estudios en el exterior. Trabajé allí de julio de 2023 a enero de 2025, en modalidad híbrida desde Sabaneta, mientras cursaba la carrera.",
                "Empecé con los datos, depurando el CRM y construyendo los reportes de Power BI de finanzas, ventas y mercadeo. El cargo fue creciendo hacia el CRM y el ecosistema Zoho, y después hacia la infraestructura de TI de la empresa y el soporte a sus usuarios.",
            ],
            company: {
                text: [
                    "MUV-U Estudios en el Exterior ayuda a estudiar y trabajar fuera del país, con cursos de inglés, formación vocacional y educación superior en Australia, Inglaterra, Dublín, Dubái y Malta. Ofrece asesoría gratuita, gestiona visas de estudio y da opciones de financiación, y su sitio dice que tiene el respaldo de CEIPA, Powered by Arizona State University.",
                    "Mi trabajo estuvo en los datos y los sistemas detrás de ese proceso, en el CRM donde vive el caso de cada estudiante, los reportes para finanzas, ventas y mercadeo y los servidores de la empresa.",
                ],
                source: {label: "MUV-U en muvu.com.co", href: "https://muvu.com.co/"},
            },
            positions: [
                {
                    title: "Desarrollador Backend · Analista de Datos · Analista CRM",
                    start: "2023-07",
                    end: "2025-01",
                    text: "Preparé y limpié los datos del CRM, construí los informes de Power BI, automaticé procesos del CRM, desarrollé componentes del sitio web y diseñé cómo entran los datos al CRM. Como analista de TI administré además los servidores de la empresa.",
                },
            ],
            timeline: [],
            seo: {
                title: "Datos, CRM y backend en MUV-U · Experiencia",
                description: "Reportes de Power BI con DAX, depuración y arquitectura de datos del CRM, automatización comercial y administración de servidores, de 2023 a 2025.",
            },
        },
        quipux: {
            tagline: "La primera práctica, con datos para el equipo de automatización del recaudo",
            intro: [
                "Quipux es una empresa colombiana de software para movilidad y tránsito; entre sus proyectos está el Sistema Inteligente de Movilidad de Medellín.",
                "Hice allí mi práctica de análisis de datos, de agosto de 2022 a mayo de 2023, en el equipo de automatización del recaudo. Fue mi primer trabajo en tecnología.",
            ],
            company: {
                text: [
                    "Quipux crea soluciones de gobierno electrónico con inteligencia artificial para ciudades inteligentes, de los trámites digitales para los ciudadanos a la seguridad vial, la gestión de datos y las estrategias de recaudo impulsadas por el marketing digital, las bases de datos y la IA. Tiene oficinas en Medellín, São Paulo y Abiyán.",
                    "Mi pasantía fue en ese trabajo de recaudo, en el equipo de automatización de cobranza, donde preparé los datos de las campañas y automaticé los reportes.",
                ],
                source: {label: "Quipux en quipux.com", href: "https://www.quipux.com/"},
            },
            positions: [
                {
                    title: "Analista de Datos (práctica)",
                    start: "2022-08",
                    end: "2023-05",
                    text: "Preparé y limpié grandes volúmenes de datos de las campañas, diseñé tableros de KPI e informes para la toma de decisiones y automaticé con Python los reportes y los cruces de archivos que antes se hacían a mano.",
                },
            ],
            timeline: [],
            seo: {
                title: "Práctica de análisis de datos en Quipux · Experiencia",
                description: "Rutinas ETL, tableros de KPI y automatizaciones en Python para el equipo de recaudo, de 2022 a 2023: mi primer trabajo en tecnología.",
            },
        },
    },
    education: {
        politecnico: {
            tagline: "La carrera completa, de los primeros algoritmos a los sistemas distribuidos y la inteligencia artificial",
            intro: [
                "Estudio Ingeniería Informática en el Politécnico Colombiano Jaime Isaza Cadavid, una institución pública de educación superior de Medellín. Empecé en 2022, curso el último semestre en 2026 y el grado está previsto para marzo de 2027.",
                "La carrera junta ciencias básicas, ingeniería de software, infraestructura, inteligencia artificial y gestión de proyectos. Desde el primer semestre guardo el trabajo de cada materia en un repositorio de la organización EngineeringSebastian-s. De la carrera salieron dos de mis productos, porque SmartPot nació como proyecto universitario y GoPoli como proyecto de clase.",
            ],
            areas: [
                {
                    title: "Inteligencia artificial y datos",
                    text: "Machine learning, computación evolutiva, visión por computador, web semántica y agentes inteligentes."
                },
                {
                    title: "Arquitectura y construcción de software",
                    text: "El ciclo de vida del software, del análisis al diseño y la construcción, la teoría de lenguajes y compiladores y el modelado de bases de datos relacionales.",
                },
                {
                    title: "Infraestructura y computación",
                    text: "Programación distribuida y paralela, sistemas operativos, arquitectura de hardware, electrónica digital y redes de comunicaciones.",
                },
                {
                    title: "Gestión de proyectos de TI",
                    text: "Formulación, evaluación y gestión de proyectos, con investigación de operaciones, modelos y simulación para tomar decisiones."
                },
                {
                    title: "Ciencias básicas",
                    text: "Matemáticas discretas, geometría vectorial, álgebra lineal, cálculo multivariable, ecuaciones diferenciales, análisis numérico, estadística aplicada y física.",
                },
            ],
            courses: [
                "Algoritmia y programación 1 a 4",
                "Semiótica informática",
                "Bases de datos 1 y 2",
                "Electrónica digital",
                "Arquitectura de hardware",
                "Sistemas operativos",
                "Diseño de software",
                "Taller de lenguajes de programación 1 y 2",
                "Teoría de lenguajes de programación y compiladores",
                "Teoría de la información",
                "Redes de comunicaciones",
                "Gestión de redes y servicios",
                "Programación distribuida y paralela",
                "Proyecto de construcción de software",
                "Inteligencia artificial",
                "Machine learning y computación evolutiva",
                "Visión por computador e inteligencia artificial",
                "Web semántica y agentes inteligentes",
                "Modelos y simulación",
                "Investigación de operaciones",
                "Formulación y evaluación de proyectos de TI",
                "Gestión de proyectos de TI",
                "Emprendimiento en TI",
                "Proyecto integrador",
                "Sistemas y organizaciones",
                "Finanzas básicas",
                "Metodología de la investigación",
                "Matemáticas discretas 1 y 2",
                "Geometría vectorial",
                "Álgebra lineal",
                "Cálculo multivariable",
                "Ecuaciones diferenciales",
                "Análisis numérico",
                "Estadística aplicada",
                "Física del movimiento",
                "Electricidad y magnetismo",
            ],
            program: {
                facts: [
                    {label: "Título que otorga", value: "Ingeniero Informático"},
                    {label: "Código SNIES", value: "3348"},
                    {label: "Duración", value: "10 semestres"},
                    {label: "Modalidad", value: "Presencial, en Medellín, Rionegro y Apartadó"},
                    {
                        label: "Registro calificado",
                        value: "Resolución 14380 del 11 de diciembre de 2019, por siete años"
                    },
                    {
                        label: "Acreditación de alta calidad",
                        value: "Resolución 21001 del 3 de noviembre de 2023, por cuatro años"
                    },
                ],
                profile: {
                    text: "El Politécnico describe a sus egresados como profesionales con capacidad de toma de decisiones, razonamiento crítico y analítico, trabajo en equipo y compromiso ético, que pueden desempeñarse en la industria del software o en cualquier organización que desarrolle o gestione proyectos informáticos.",
                    items: [
                        "Aplicar las ciencias de la computación para desarrollar soluciones informáticas",
                        "Analizar y construir software con estándares de calidad",
                        "Modelar y diseñar la arquitectura de proyectos informáticos",
                        "Innovar investigando alternativas tecnológicas",
                        "Administrar recursos equilibrando productividad, costo y calidad",
                        "Brindar soporte técnico",
                        "Gestionar servicios y plataformas de TI",
                    ],
                },
                curriculum: [
                    {
                        term: "Semestre 1",
                        items: [
                            "Introducción al área profesional",
                            "Algoritmos y programación 1",
                            "Lengua materna",
                            "Cálculo diferencial",
                            "Humanidades 1",
                            "Matemáticas discretas 1",
                        ],
                    },
                    {
                        term: "Semestre 2",
                        items: [
                            "Algoritmos y programación 2",
                            "Matemáticas discretas 2",
                            "Física del movimiento",
                            "Geometría vectorial",
                            "Cálculo integral",
                            "Deporte, arte y recreación",
                        ],
                    },
                    {
                        term: "Semestre 3",
                        items: [
                            "Algoritmos y programación 3",
                            "Taller de lenguajes de programación 1",
                            "Semiótica informática",
                            "Cálculo de varias variables",
                            "Electricidad y magnetismo",
                            "Álgebra lineal",
                            "Pedagogía constitucional",
                        ],
                    },
                    {
                        term: "Semestre 4",
                        items: [
                            "Algoritmos y programación 4",
                            "Análisis de software",
                            "Bases de datos 1",
                            "Ecuaciones diferenciales",
                            "Electrónica digital",
                        ],
                    },
                    {
                        term: "Semestre 5",
                        items: [
                            "Taller de lenguajes de programación 2",
                            "Diseño de software",
                            "Arquitectura de hardware",
                            "Teoría de lenguajes y compiladores",
                            "Estadística aplicada",
                        ],
                    },
                    {
                        term: "Semestre 6",
                        items: [
                            "Proyecto de construcción de software",
                            "Bases de datos 2",
                            "Sistemas operativos",
                            "Emprendimiento empresarial TI",
                            "Teoría de la información",
                            "Análisis numérico",
                        ],
                    },
                    {
                        term: "Semestre 7",
                        items: [
                            "Inteligencia artificial",
                            "Pruebas y gestión de la configuración",
                            "Sistemas y organizaciones",
                            "Redes de comunicación",
                            "Investigación de operaciones",
                            "Ecología",
                            "Metodología de la investigación",
                        ],
                    },
                    {
                        term: "Semestre 8",
                        items: [
                            "Programación distribuida y paralela",
                            "Proyecto integrador",
                            "Formulación y evaluación de proyectos de TI",
                            "Gestión de redes y servicios",
                            "Profundización 1",
                            "Modelos y simulación",
                            "Humanidades 2",
                        ],
                    },
                    {
                        term: "Semestre 9",
                        items: [
                            "Gestión de proyectos de TI",
                            "Profundización 2",
                            "Electiva 1",
                            "Electiva 2",
                            "Ética",
                        ],
                    },
                    {
                        term: "Semestre 10",
                        items: [
                            "Trabajo de grado",
                            "Profundización 3",
                            "Electiva 3",
                        ],
                    },
                ],
                source: {
                    label: "El programa en politecnicojic.edu.co",
                    href: "https://www.politecnicojic.edu.co/profesionales/75-ingenieria-informatica"
                },
            },
            timeline: [
                {
                    date: "2025-08",
                    text: "Redes con routers Cisco físicos, con enrutamiento RIPv2, OSPF y EIGRP, IPv6 de doble pila, SNMP y VoIP."
                },
                {
                    date: "2025-09",
                    text: "Empiezan las materias de inteligencia artificial, con sistemas expertos, lógica difusa, algoritmos genéticos, visión por computador y computación evolutiva."
                },
                {
                    date: "2025-09",
                    text: "Programación distribuida y paralela, con sockets e hilos, RMI y un sistema escolar en Spring Boot, FastAPI con GraphQL y React."
                },
                {date: "2026-09", text: "Último semestre, en paralelo con el diplomado en ciberseguridad."},
            ],
            seo: {
                title: "Ingeniería Informática en el Politécnico JIC · Educación",
                description: "La carrera de 2022 a 2026, con grado en marzo de 2027: áreas, materias, los proyectos que nacieron en ella y un repositorio por materia en GitHub.",
            },
        },
        cyberDiploma: {
            tagline: "Del reconocimiento a la respuesta a incidentes, en laboratorios controlados",
            intro: [
                "El Diplomado en Ciberseguridad Informática y Resiliencia Digital del Politécnico Colombiano Jaime Isaza Cadavid va de septiembre a diciembre de 2026, en paralelo con el último semestre de la carrera.",
                "Se evalúa con informes de laboratorio. Cada uno documenta un entorno controlado y autorizado, lo que se hizo paso a paso y los controles que lo habrían evitado. Los informes son públicos en el repositorio Cybersecurity de la organización de la carrera.",
            ],
            areas: [
                {
                    title: "Reconocimiento y vulnerabilidades",
                    text: "Nmap contra una máquina del laboratorio y el análisis de vsftpd 2.3.4 y su puerta trasera, dentro de una red aislada.",
                },
                {
                    title: "Un CTF de principio a fin",
                    text: "Del reconocimiento al acceso inicial y la escalada de privilegios, con una prueba controlada de disponibilidad."
                },
                {
                    title: "Respuesta a incidentes",
                    text: "Un caso de phishing y ransomware leído con la confidencialidad, la integridad y la disponibilidad, con control de acceso por roles y un plan de protección.",
                },
            ],
            courses: [],
            program: {
                facts: [
                    {
                        label: "Nombre en el Politécnico",
                        value: "Diplomado en Ciberseguridad: gestión, protección y resiliencia digital"
                    },
                    {label: "Duración", value: "120 horas"},
                    {label: "Modalidad", value: "Clases en vivo a distancia"},
                    {label: "Lo ofrece", value: "Educación Continua, Politécnico JIC"},
                    {
                        label: "Constancia",
                        value: "Por asistir al menos al 80 % de las horas y completar los ejercicios y prácticas"
                    },
                ],
                profile: {
                    text: "El Politécnico se propone formar a profesionales y estudiantes con competencias técnicas, analíticas y éticas para la gestión integral de la ciberseguridad, que identifiquen, prevengan y mitiguen riesgos digitales en organizaciones públicas, privadas y educativas.",
                    items: [
                        "Comprender los fundamentos conceptuales y estratégicos de la ciberseguridad",
                        "Analizar arquitecturas tecnológicas y superficies de ataque",
                        "Identificar amenazas, vulnerabilidades y riesgos digitales",
                        "Aplicar principios de criptografía y protección de la información",
                        "Implementar buenas prácticas de seguridad en sistemas, redes y la nube",
                        "Gestionar incidentes de seguridad y planes de continuidad",
                        "Interpretar el marco legal, normativo y ético de la ciberseguridad",
                        "Diseñar propuestas aplicadas de ciberseguridad en contextos reales",
                    ],
                },
                curriculum: [
                    {
                        term: "Módulo I · Fundamentos y arquitectura",
                        items: [
                            "Fundamentos y estrategias, de las amenazas y los actores maliciosos a la confidencialidad, integridad y disponibilidad",
                            "Arquitectura de sistemas y redes, con firewalls, VPN, segmentación y protocolos como TLS e IPsec",
                            "Políticas, controles y cultura de seguridad",
                        ],
                    },
                    {
                        term: "Módulo II · Regulación, desarrollo seguro y resiliencia",
                        items: [
                            "Cibercrimen y regulación en ciberseguridad, RGPD incluido",
                            "Desarrollo seguro y auditoría de seguridad, del ciclo de vida seguro a DevSecOps en pipelines de CI/CD",
                            "Gestión de incidentes y resiliencia digital según NIST y SANS",
                            "Cumplimiento y auditoría con ISO/IEC 27001, NIST, COBIT e ITIL",
                            "Seguridad en la nube y plataformas de datos distribuidas",
                        ],
                    },
                    {
                        term: "Módulo II · Inteligencia, reconocimiento y seguridad operativa",
                        items: [
                            "Inteligencia artificial aplicada a la ciberseguridad",
                            "Reconocimiento y OSINT",
                            "Reconocimiento activo y análisis de superficie de ataque con Nmap",
                            "Enumeración web",
                            "Normas de escritura académica (ICONTEC y APA)",
                        ],
                    },
                ],
                source: {
                    label: "El diplomado en politecnicojic.edu.co",
                    href: "https://www.politecnicojic.edu.co/diplomados/6566-diplomado-en-ciberseguridad-gestion-proteccion-y-resiliencia-digital"
                },
            },
            timeline: [],
            seo: {
                title: "Diplomado en ciberseguridad · Educación",
                description: "Laboratorios con Kali Linux en el Politécnico JIC, de septiembre a diciembre de 2026: Nmap, un CTF hasta la escalada de privilegios y respuesta a incidentes.",
            },
        },
        sena: {
            tagline: "El técnico en programación de software, en paralelo con el primer año de la carrera",
            intro: [
                "Hice el Técnico en Programación de Software del SENA con la Institución Universitaria Salazar y Herrera (IUSH) entre 2022 y 2023, mientras empezaba la carrera en el Politécnico.",
                "Es un programa por competencias para analizar el software, definir su arquitectura, diseñarlo, crear su base de datos y codificarlo. En él construí, en un equipo de dos, SitePersist, un sistema web en PHP y MySQL para reservar espacios y equipos de la universidad.",
            ],
            areas: [
                {
                    title: "Análisis y diseño",
                    text: "Analizar el software, definir la arquitectura del sistema y preparar el diseño antes de codificar."
                },
                {
                    title: "Bases de datos",
                    text: "Modelar los datos y crear las tablas y los objetos de la base de datos en MySQL."
                },
                {title: "Construcción", text: "Codificar en PHP y C#, con control de versiones en Git."},
                {title: "Sistemas", text: "Instalar y configurar sistemas operativos."},
            ],
            courses: [
                "Análisis de software",
                "Definición de la arquitectura del sistema",
                "Preparación de actividades de diseño",
                "Bases de datos",
                "Creación de tablas y objetos de bases de datos",
                "Interpretación de información técnica para la codificación",
                "Codificación de software en un lenguaje",
                "Instalación de sistemas operativos",
            ],
            program: {
                facts: [
                    {
                        label: "Programa del SENA",
                        value: "Programación de Software, código 233104, vigente desde agosto de 2019"
                    },
                    {label: "Título", value: "Técnico"},
                    {label: "Duración", value: "2.208 horas, 1.344 de formación y 864 de etapa productiva"},
                    {
                        label: "Ocupación",
                        value: "Técnico en asistencia y soporte de tecnologías de la información (ocupación 2331)"
                    },
                    {
                        label: "Productos del egresado",
                        value: "Bases de datos, código, interfaces gráficas y manuales de usuario"
                    },
                ],
                profile: {
                    text: "El SENA describe al técnico como capaz de codificar, implementar y dar soporte a aplicaciones de software con lenguajes de programación y sistemas gestores de bases de datos, como programador en empresas, en el soporte de las aplicaciones que ya usan o como independiente.",
                    items: [
                        "Fundamentos de programación",
                        "Bases de datos",
                        "Lenguajes y paradigmas de programación",
                        "Entornos y frameworks de desarrollo",
                    ],
                },
                curriculum: [
                    {
                        term: "Codificar la solución de software · 576 horas",
                        items: [
                            "Interpretar la información técnica del diseño",
                            "Crear las tablas y objetos de la base de datos",
                            "Codificar en el lenguaje y la plataforma elegidos",
                            "Verificar el software con pruebas unitarias",
                        ],
                    },
                    {
                        term: "Desplegar la solución de software · 96 horas",
                        items: [
                            "Planear el despliegue",
                            "Desplegar el software construido",
                            "Elaborar el manual de usuario",
                            "Verificar la implantación",
                        ],
                    },
                    {
                        term: "Inglés · 192 horas",
                        items: [
                            "Inglés oral y escrito para contextos sociales y laborales, según el Marco Común Europeo de Referencia",
                        ],
                    },
                    {
                        term: "Competencias transversales",
                        items: [
                            "Comunicación",
                            "Razonamiento cuantitativo",
                            "Emprendimiento",
                            "Derechos del trabajo, ética y cultura de paz",
                            "Protección ambiental y seguridad y salud en el trabajo",
                            "Ciencias naturales",
                            "Actividad física",
                            "Herramientas informáticas para manejar información",
                        ],
                    },
                ],
                source: {
                    label: "El diseño curricular del SENA (PDF)",
                    href: "https://inemjose.edu.co/colegio/newsite2021/wp-content/uploads/2022/12/PROGRAMACION-DE-SOFTWARE.pdf"
                },
            },
            timeline: [],
            seo: {
                title: "Técnico en Programación de Software · Educación",
                description: "El técnico del SENA con la IUSH, de 2022 a 2023: análisis, arquitectura, bases de datos y codificación, con SitePersist en PHP y MySQL y herramientas en C#.",
            },
        },
        pascual: {
            tagline: "La media técnica en desarrollo de software, en 2020 y 2021",
            intro: [
                "Hice el Técnico Auxiliar en Desarrollo de Software en la Institución Educativa Pascual Bravo en 2020 y 2021, en paralelo con el bachillerato en el INEM.",
                "El Instituto Técnico Industrial Pascual Bravo, en Robledo, nació en octubre de 1935 como Escuela de Artes y Oficios anexa a la Universidad de Antioquia. Hoy es un establecimiento oficial, aprobado para la enseñanza técnica industrial en 1978 y adscrito al Municipio de Medellín desde 2007, con una especialidad de sistemas en desarrollo de software.",
                "Ahí aprendí lógica de programación, estructuras de datos y bases de datos relacionales, con pequeños proyectos en HTML, PHP, Visual Basic .NET, Java y Python, y macros de Excel. Los proyectos que hice con mis compañeros están en la organización VocationalSebastian-s.",
            ],
            areas: [
                {
                    title: "Lógica y estructuras de datos",
                    text: "Los fundamentos de la programación, con algoritmos, estructuras de control y estructuras de datos."
                },
                {
                    title: "Bases de datos relacionales",
                    text: "Tablas, relaciones y consultas para guardar los datos de las primeras aplicaciones."
                },
                {
                    title: "Web y escritorio",
                    text: "HTML, CSS y PHP para sitios web; Visual Basic .NET, Java y Python para los primeros programas."
                },
                {
                    title: "Excel con macros",
                    text: "Macros en VBA, como el bingo y el conversor de colores que están en la organización del bachillerato técnico."
                },
            ],
            courses: [],
            program: {
                facts: [
                    {label: "Especialidad", value: "Técnica en Sistemas (Desarrollo de Software)"},
                    {label: "Líneas", value: "Programación, diseño digital y mantenimiento"},
                    {
                        label: "Recorrido",
                        value: "Exploración vocacional en sexto y séptimo, la especialidad de octavo a once"
                    },
                    {
                        label: "Aprobación oficial",
                        value: "Resolución 1293 del 20 de febrero de 1978, para la enseñanza técnica industrial"
                    },
                    {label: "Documento", value: "Proyecto integral del área, 2026"},
                ],
                profile: {
                    text: "El colegio se propone formar técnicos en sistemas mediante el trabajo conjunto de sus áreas académicas y técnicas, estudiantes que aprendan de forma permanente, ejerzan un pensamiento crítico e innovador y actúen con iniciativa en escenarios mediados por las TIC.",
                    items: [
                        "Analizar, diseñar y desarrollar soluciones de software",
                        "Profundizar en las herramientas de los sistemas de información",
                        "Participar en un proyecto de la vida real, trabajando con otros y evaluando su propio trabajo",
                        "Formar competencias ciudadanas, investigativas, tecnológicas y laborales",
                    ],
                },
                curriculum: [
                    {
                        term: "Grado octavo",
                        items: [
                            "Pensamiento computacional y arquitectura de hardware y software, 4 horas a la semana",
                            "Dibujo técnico, 2 horas a la semana",
                        ],
                    },
                    {
                        term: "Grado noveno",
                        items: [
                            "Lógica de programación y competencias digitales, 4 horas a la semana, con algoritmos en PSeInt",
                            "Dibujo técnico, 2 horas a la semana",
                        ],
                    },
                    {
                        term: "Grado décimo",
                        items: [
                            "Matemáticas discretas y estructuras de datos, 6 horas a la semana, con listas, pilas y árboles",
                            "Bases de datos, 2 horas a la semana, del modelo conceptual a las consultas SQL",
                            "Tratamiento y vectorización de imágenes en 2D, 2 horas a la semana",
                        ],
                    },
                    {
                        term: "Grado once",
                        items: [
                            "Programación orientada a objetos, diseño y desarrollo web, 6 horas a la semana, con UML, interfaces gráficas, HTML, CSS, JavaScript, un framework web y un ORM",
                            "Sistemas electrónicos y computacionales, 2 horas a la semana, con Linux y Windows",
                            "Modelado 3D, 2 horas a la semana",
                        ],
                    },
                ],
                source: {
                    label: "El documento de la especialidad, 2026 (PDF)",
                    href: "https://tecnicopascualbravo.edu.co/wp-content/uploads/2026/03/2026-SISTEMAS.pdf"
                },
            },
            timeline: [],
            seo: {
                title: "Técnico Auxiliar en Desarrollo de Software · Educación",
                description: "La media técnica en la I.E. Pascual Bravo, en 2020 y 2021: lógica, estructuras de datos, bases de datos, sitios en PHP y macros de Excel.",
            },
        },
        inem: {
            tagline: "El bachillerato con especialización en informática, donde escribí mis primeros algoritmos",
            intro: [
                "Estudié el bachillerato en la I.E. INEM José Félix de Restrepo, un colegio público de El Poblado, en Medellín, que empezó clases el 27 de abril de 1970. El colegio organiza el recorrido de sus estudiantes en cinco ramas (artes, comercial, promoción social, industrial y académica), y en décimo y once cada estudiante cursa una especialidad. Estudié allí de 2019 a 2021, con la especialidad en informática.",
                "En 2019 escribí ahí mis primeros algoritmos y diseñé mis primeras páginas web. Desde 2020 lo combiné con el técnico del Pascual Bravo, y los proyectos de esos años están en la organización VocationalSebastian-s.",
            ],
            areas: [],
            courses: [],
            program: {
                facts: [
                    {label: "Especialidad", value: "Programación de software (media técnica)"},
                    {label: "Plan de estudios", value: "Programación de Software del SENA, código 233104"},
                    {label: "Línea tecnológica", value: "Tecnologías de la información y las comunicaciones"},
                    {label: "Publicada por el colegio", value: "Diciembre de 2022"},
                ],
                profile: {
                    text: "El INEM publica su especialidad en programación de software con el diseño curricular del SENA, el programa 233104, el mismo que describe la página del técnico del SENA. Ese programa forma técnicos capaces de codificar, implementar y dar soporte a aplicaciones de software con lenguajes de programación y sistemas gestores de bases de datos.",
                    items: [],
                },
                curriculum: [
                    {
                        term: "Codificar la solución de software · 576 horas",
                        items: [
                            "Interpretar la información técnica del diseño",
                            "Crear las tablas y objetos de la base de datos",
                            "Codificar en el lenguaje y la plataforma elegidos",
                            "Verificar el software con pruebas unitarias",
                        ],
                    },
                    {
                        term: "Desplegar la solución de software · 96 horas",
                        items: [
                            "Planear el despliegue",
                            "Desplegar el software construido",
                            "Elaborar el manual de usuario",
                            "Verificar la implantación",
                        ],
                    },
                    {
                        term: "Inglés · 192 horas",
                        items: [
                            "Inglés oral y escrito para contextos sociales y laborales, según el Marco Común Europeo de Referencia",
                        ],
                    },
                ],
                source: {
                    label: "La especialidad en inemjose.edu.co",
                    href: "https://inemjose.edu.co/colegio/newsite2021/2022/12/27/software/"
                },
            },
            timeline: [],
            seo: {
                title: "Bachillerato con especialización en informática · Educación",
                description: "El bachillerato en el INEM José Félix de Restrepo, de 2019 a 2021, con especialización en informática, fundamentos de computación, algoritmia y diseño web.",
            },
        },
    },
    organizations: {
        tivenos: {
            tagline: "El código de TIVENOS, con integraciones, observabilidad, widgets, formularios y firmas de correo",
            intro: [
                "TIVENOS guarda aquí, en privado, el código de sus soluciones para universidades, desde los servicios que integran Zoho CRM con el sistema académico de cada institución y el stack de observabilidad hasta los widgets de Zoho CRM, los formularios de admisión, el servicio de snapshots del CRM y el de firmas de correo.",
                "El código es privado, como los datos de los clientes, y los proyectos que lo describen no nombran a ninguna institución.",
            ],
            role: "Escribo y mantengo la mayor parte de lo que hay aquí, como los servicios de integración en FastAPI, la observabilidad, los widgets, los formularios, las extracciones del CRM y las firmas de correo. También definí los estándares de código, seguridad y despliegue que comparten los servicios.",
            timeline: [],
            seo: {
                title: "TivenosEducation · Organización en GitHub",
                description: "La organización privada de TIVENOS, con servicios de integración, observabilidad, widgets y formularios para universidades, y mis commits desde 2025.",
            },
        },
        adcom: {
            tagline: "Más de 100 landing pages, la plataforma que las publica y las herramientas de CRM de la agencia",
            intro: [
                "La agencia guarda aquí, en privado, un repositorio por cada landing page de admisiones, los gateways de Nginx de cada cliente y la infraestructura que los publica, las herramientas de operación masiva sobre la API de Zoho y los servicios de resultados de las marcas de lotería.",
                "Todos los commits hechos por personas son míos. La cifra incluye los commits que el constructor visual de sitios hace en cada edición de una landing y los cambios que aplico con scripts a todas las landings a la vez.",
            ],
            role: "Construí y mantengo lo que hay aquí, desde las landing pages y la plataforma que las despliega hasta el monitoreo diario, las herramientas sobre la API de Zoho y los servicios de resultados.",
            timeline: [],
            seo: {
                title: "ADCOM-Group · Organización en GitHub",
                description: "La organización privada de la agencia, con más de 100 landing pages, su plataforma de despliegue y las herramientas sobre la API de Zoho, y mis commits desde 2025.",
            },
        },
        smartpot: {
            tagline: "La plataforma IoT para cultivos hidropónicos, del firmware a la PWA",
            intro: [
                "Aquí está todo SmartPot, en once repositorios públicos, del firmware de los sensores y el broker MQTT a la API en Spring Boot, el asistente de IA, la PWA y la infraestructura.",
                "SmartPot nació como un proyecto universitario en equipo y hoy está en vivo en smartpot.app.",
            ],
            role: "Lidero el desarrollo. Escribí la API, la PWA y buena parte de la infraestructura, y hago la mayoría de los commits de la organización.",
            timeline: [],
            seo: {
                title: "SmartPotTech · Organización en GitHub",
                description: "Once repositorios públicos de SmartPot, la plataforma IoT para cultivos hidropónicos, con firmware, broker MQTT, API, asistente de IA, PWA e infraestructura.",
            },
        },
        gopoli: {
            tagline: "Viajes compartidos para la comunidad del Politécnico, con app web, API y base de datos",
            intro: [
                "La organización de GoPoli guarda la app web en Next.js, la API en Spring Boot y la imagen de PostgreSQL, cada una con su repositorio, sus pruebas y su despliegue.",
                "Salieron del repositorio del proyecto de clase, que tenía la app en Flutter y su backend juntos. Al dividirlo reescribí la historia para que cada repositorio conservara sus propios commits.",
            ],
            role: "Soy el principal contribuidor. Dividí el repositorio original, escribí buena parte de la API y la app web, y armé el despliegue central que publica todo en el servidor.",
            timeline: [],
            seo: {
                title: "GoPoli · Organización en GitHub",
                description: "La organización de GoPoli, la plataforma de viajes compartidos del Politécnico, con la app web en Next.js, la API en Spring Boot y la base de datos en PostgreSQL.",
            },
        },
        peppertech: {
            tagline: "PepperCRM, un CRM construido en equipo con Spring Boot, React y MongoDB",
            intro: [
                "PepperCRM es un producto CRM que construimos en un equipo de cuatro durante 2025, con un backend en Spring Boot, Spring Security y JWT, una base en MongoDB Atlas y un frontend en React.",
            ],
            role: "Escribí la mayor parte del backend.",
            timeline: [],
            seo: {
                title: "PepperTechDev · Organización en GitHub",
                description: "La organización de PepperCRM, un CRM hecho en 2025 por un equipo de cuatro con Spring Boot, Spring Security, JWT, MongoDB y React.",
            },
        },
        engineering: {
            tagline: "La carrera de Ingeniería Informática, un repositorio por materia",
            intro: [
                "Desde el primer semestre guardo aquí la carrera, con un repositorio por materia o proyecto, de Algoritmia y programación 1 a los sistemas distribuidos, las redes con equipos Cisco y la inteligencia artificial.",
                "Desde 2026 también guarda los laboratorios del diplomado en ciberseguridad.",
            ],
            role: "La organización es mía y casi todos sus commits también; los demás son de compañeros en trabajos de grupo.",
            timeline: [],
            seo: {
                title: "EngineeringSebastian-s · Organización en GitHub",
                description: "37 repositorios públicos de la carrera de Ingeniería Informática y del diplomado en ciberseguridad, con mis commits de 2022 a hoy.",
            },
        },
        taurus: {
            tagline: "Una prueba técnica de datos con FastAPI, Pandas y React",
            intro: [
                "Taurus fue la prueba técnica de datos que hice en noviembre y diciembre de 2024: de archivos CSV en bruto a una API de métricas en FastAPI con Pandas y un tablero en React.",
            ],
            role: "Hice todo el proyecto, de los datos al tablero.",
            timeline: [],
            seo: {
                title: "TaurusSebastian-s · Organización en GitHub",
                description: "La prueba técnica de datos de 2024: archivos CSV en bruto convertidos en una API de métricas en FastAPI con Pandas y un tablero en React.",
            },
        },
        testlabdata: {
            tagline: "Las automatizaciones de datos de la práctica en Quipux",
            intro: [
                "Aquí, en privado, guardé los scripts y los notebooks de la práctica en Quipux, con depuración de bases de datos, seguimiento de campañas en varias ciudades, listas de exclusión de correo y SMS, y descargas y cruces de archivos automáticos.",
                "Casi todos mis commits los hice con la cuenta de GitHub de la empresa; la cifra de actividad los suma.",
            ],
            role: "Escribí casi todos los scripts y notebooks; los demás commits son de un compañero del equipo.",
            timeline: [],
            seo: {
                title: "TestLabData · Organización en GitHub",
                description: "La organización privada de la práctica en Quipux, con automatizaciones en Python para campañas, listas de exclusión y reportes, de 2022 a 2023.",
            },
        },
        technical: {
            tagline: "SitePersist y las herramientas en C# del técnico en programación",
            intro: [
                "Aquí están los proyectos del técnico en programación de software del SENA con la IUSH, como SitePersist, un sistema web en PHP y MySQL para reservar espacios y equipos de la universidad, su sitio de administración y dos herramientas en C#.",
            ],
            role: "Hice la mayor parte del código, en un equipo de dos.",
            timeline: [],
            seo: {
                title: "TechnicalSebastians · Organización en GitHub",
                description: "Los proyectos del técnico en programación de 2022: SitePersist en PHP y MySQL, su sitio de administración y herramientas en C#.",
            },
        },
        vocational: {
            tagline: "Los primeros proyectos, del bachillerato técnico",
            intro: [
                "Comparto esta organización con mis compañeros del bachillerato técnico, entre el INEM y el Pascual Bravo, con sitios en PHP, macros de Excel como un bingo y un conversor de colores, una calculadora para Android en Java y los primeros programas en Python.",
                "La mayoría de los commits son de 2021, cuando subí los proyectos, con los nombres de Git que usaba entonces.",
            ],
            role: "Subí los proyectos y la mayoría de sus commits son míos; otras personas del equipo también hicieron commits.",
            timeline: [],
            seo: {
                title: "VocationalSebastian-s · Organización en GitHub",
                description: "Los proyectos del bachillerato técnico, de 2021 y 2022: sitios en PHP, macros de Excel, una calculadora para Android y programas en Python.",
            },
        },
    },
    services: {
        integration: {seo: {title: "Integraciones y backend con FastAPI y Spring Boot · Servicios", description: "APIs a medida y conectores que unen Zoho CRM con sistemas académicos y legados por REST, SOAP, SQL Server o FTP, con la plataforma de TIVENOS como prueba."}},
        crm: {seo: {title: "Desarrollo y automatización en Zoho CRM · Servicios", description: "Módulos, flujos y funciones en Deluge, widgets dentro del registro, Zoho Creator y Analytics, cargas masivas con la Bulk API y formularios conectados al CRM."}},
        web: {seo: {title: "Desarrollo web y landing pages conectadas al CRM · Servicios", description: "Sitios y aplicaciones en React, Next.js y Vite, landing pages de campaña con UTM y eventos de conversión, SEO completo y rendimiento medido con Lighthouse."}},
        data: {seo: {title: "Inteligencia de negocios y datos con SQL y Power BI · Servicios", description: "Auditoría y limpieza de bases de datos, snapshots del CRM en PostgreSQL, tableros en Power BI y Zoho Analytics y reportes que se actualizan solos."}},
        automation: {seo: {title: "Automatización de procesos con n8n, Python y Deluge · Servicios", description: "Flujos en n8n, Zapier y Power Automate, scripts programados, correos masivos con Jinja2 y Amazon SES y documentos generados, con avisos cuando algo falla."}},
        infra: {seo: {title: "Infraestructura, Docker y despliegue continuo · Servicios", description: "VPS Linux con Nginx y SSL, imágenes Docker, CI/CD con GitHub Actions y despliegues sin reinicio para flotas de sitios, con usuarios de despliegue restringidos."}},
        observability: {seo: {title: "Observabilidad con Prometheus, Grafana y OpenTelemetry · Servicios", description: "Métricas, logs centralizados, trazas, sondas de disponibilidad y alertas a Telegram para saber qué falla en un servicio antes de que alguien lo reporte."}},
        consulting: {seo: {title: "Consultoría técnica y soporte de CRM · Servicios", description: "Diagnóstico de procesos, propuesta de arquitectura, documentación y estándares de logs, seguridad y despliegue, y soporte a los usuarios del CRM."}},
    },
    issuers: {
        certiport: {
            name: "Certiport – Pearson VUE",
            text: "Certiport, parte de Pearson VUE, administra exámenes de certificación en TI. IT Specialist es su línea para habilidades de TI de nivel inicial, con un examen por tecnología (Python, Java, HTML y CSS, bases de datos y redes, entre otras), que se presentan en centros autorizados.",
        },
        platzi: {
            name: "Platzi",
            text: "Platzi es una plataforma latinoamericana de educación en línea en tecnología, datos y negocios, fundada por Freddy Vega y Christian Van Der Henst, que firman sus diplomas. Empezó como Mejorando.la y pasó por Y Combinator en 2015. Sus cursos hacen parte de escuelas y rutas y terminan con un examen, y cada curso aprobado trae un diploma que enlaza a su verificación en el perfil público del estudiante.",
        },
        udea: {
            name: "Universidad de Antioquia",
            text: "Una universidad pública con sede principal en Medellín, fundada en 1803. Diseñó las pruebas de la maratón de certificaciones de Engancha TIC 2.0, el encuentro del Ministerio TIC para conectar el talento digital con el sector productivo. El evento se hizo en Medellín durante ExpoIngeniería, del 2 al 4 de noviembre de 2023, y la maratón siguió abierta hasta el 15 de diciembre. Quienes aprobaban recibían un certificado protegido con blockchain, y obtuve cuatro, en ciencia de datos e IA, ciberseguridad, visualización de datos y programación web.",
        },
        hackerrank: {
            name: "HackerRank",
            text: "HackerRank es una plataforma de práctica y evaluación de programación que usan las empresas para contratar. Sus certificados de habilidades se obtienen con una prueba cronometrada y se verifican con un enlace público.",
        },
        inco: {
            name: "INCO Academy",
            text: "INCO Academy ofrece el Green Digital Skills Certificate, un programa gratuito y en línea, con apoyo de Microsoft y LinkedIn, sobre sostenibilidad en las carreras digitales.",
        },
        sapiencia: {
            name: "Sapiencia · Comfenalco Antioquia",
            text: "Sapiencia es la agencia de educación postsecundaria de la Alcaldía de Medellín. Python-Django hizo parte de Talento Especializado, su proyecto para reducir el déficit de personal capacitado en las áreas de la industria 4.0 en Medellín, abierto a quienes hayan vivido en la ciudad el último año y aprobado al menos noveno grado. Comfenalco Antioquia, una caja de compensación familiar del departamento, certificó los dos niveles con la U.T. VIEW Foundation.",
        },
        hackermentor: {
            name: "HackerMentor",
            text: "HackerMentor emitió la credencial de HACKLAB, un programa de hacking ético gamificado, y la publica en Credsverse, donde cualquiera puede verificarla.",
        },
        camara: {
            name: "Cámara de Comercio y Educación",
            text: "Dictó la masterclass gratuita y en vivo de Excel profesional en junio de 2022 y emitió su certificado de participación.",
        },
        utp: {
            name: "Universidad Tecnológica de Pereira",
            text: "Una universidad pública de Pereira, en Risaralda. Operó el ciclo de fundamentos de programación de Misión TIC 2022, el programa del Ministerio TIC para formar programadores, y emitió un certificado por cada uno de sus dos módulos.",
        },
        eia: {
            name: "Universidad EIA",
            text: "Una universidad privada que nació como Escuela de Ingeniería de Antioquia, con sede principal en Envigado. Emitió el certificado de Introducción a la Programación en Python.",
        },
        coursera: {
            name: "Coursera",
            text: "Coursera es una plataforma de educación en línea con cursos de universidades y empresas. Su Coursera Project Network, que autorizó Introduction to HTML, publica proyectos guiados, lecciones prácticas cortas con el video del instructor junto a un espacio de trabajo en la nube. Sus certificados se verifican con un enlace público.",
        },
    },
};
