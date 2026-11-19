import type {AssistantCopy} from "@/types/assistant";

const list = (items: string[]) =>
    items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} y ${items[items.length - 1]}`;

export const assistant: AssistantCopy = {
    title: "Asistente de perfil",
    subtitle: "Respuestas construidas con este portafolio. Sin servicios de IA.",
    close: "Cerrar asistente",
    placeholder: "Pregunta por experiencia, proyectos, formación…",
    send: "Enviar",
    inputLabel: "Tu pregunta",
    you: "Tú",
    assistant: "Asistente",
    welcome:
        "¡Hola! Respondo con lo que dice este portafolio sobre la experiencia, los proyectos, la formación, las certificaciones, los servicios y la disponibilidad de Sebastián. Prueba con una de estas preguntas o abre «Más preguntas».",
    suggestionsLabel: "Preguntas sugeridas",
    inHisWords: (text) => `En sus palabras: «${text}»`,
    suggestions: {
        general: ["¿Quién es Sebastián?", "¿Cuántos años de experiencia tiene?", "¿Qué servicios ofrece?", "¿Por qué contratarlo?", "¿Está disponible?"],
        backend: ["¿Qué trabajo backend ha hecho?", "¿Qué APIs ha integrado?", "¿Qué bases de datos usa?", "¿Qué hace en TIVENOS?", "¿Está disponible?"],
        crm: ["¿Qué ha construido con Zoho CRM?", "¿Qué integraciones ha hecho?", "¿A cuántos clientes ha atendido?", "¿Qué hace en ADCOM?", "¿Está disponible?"],
        data: ["¿Qué trabajo de datos ha hecho?", "¿Qué herramientas de BI usa?", "¿Qué certificaciones de Power BI tiene?", "¿Qué hizo en MUV-U?", "¿Está disponible?"],
        devops: ["¿Cómo despliega sus servicios?", "¿Qué stack de observabilidad usa?", "¿Ha usado Kubernetes?", "¿Qué experiencia tiene en ciberseguridad?", "¿Está disponible?"],
        fullstack: ["¿Qué frontends ha construido?", "¿Qué es SmartPot?", "¿Qué es GoPoli?", "¿Cómo está hecho este sitio?", "¿Está disponible?"],
    },
    followUps: {
        greeting: ["¿Quién es Sebastián?", "¿Qué servicios ofrece?", "¿Por qué contratarlo?"],
        about: ["¿Cómo ha sido su trayectoria?", "¿Dónde trabaja actualmente?", "¿Cuál es su stack?"],
        experienceYears: ["¿Dónde trabaja actualmente?", "¿Cómo ha sido su trayectoria?", "¿En qué sectores ha trabajado?"],
        currentRole: ["¿Qué hace en TIVENOS?", "¿Qué hace en ADCOM?", "¿Ha liderado equipos?"],
        company: ["¿Qué dicen sus colegas?", "¿En qué sectores ha trabajado?", "¿Cuántos años de experiencia tiene?"],
        roleFit: ["¿Por qué contratarlo?", "¿Está disponible?", "¿Cuál es su stack?"],
        availability: ["¿Dónde vive?", "¿Qué servicios ofrece?", "¿Puedo descargar su hoja de vida?"],
        location: ["¿Está disponible?", "¿Qué idiomas habla?"],
        education: ["¿Qué estudió en el SENA?", "¿Qué hace en el diplomado?", "¿Qué planes tiene?"],
        program: ["¿Qué certificaciones tiene?", "¿Qué planes tiene?", "¿Qué proyectos tiene?"],
        plans: ["¿Qué hace en el diplomado?", "¿Qué experiencia tiene en ciberseguridad?"],
        security: ["¿Qué planes tiene?", "¿Cómo despliega sus servicios?"],
        languages: ["¿Dónde vive?", "¿Está disponible?"],
        projects: ["¿Qué es SmartPot?", "¿Qué es GoPoli?", "¿Qué son los widgets de Zoho CRM?"],
        project: ["¿Qué proyectos tiene?", "¿En qué organizaciones de GitHub está?"],
        certifications: ["¿Tiene certificación en Python?", "¿Qué certificaciones de Power BI tiene?", "¿Qué estudió?"],
        testimonials: ["¿Por qué contratarlo?", "¿Cómo trabaja?"],
        resume: ["¿Está disponible?", "¿Qué idiomas habla?"],
        githubStats: ["¿En qué organizaciones de GitHub está?", "¿Cuántas horas programa?"],
        organizations: ["¿Cuántos commits tiene en GitHub?", "¿Qué es SmartPot?"],
        coding: ["¿Usa inteligencia artificial?", "¿Cuántos commits tiene en GitHub?"],
        clients: ["¿Qué hace en TIVENOS?", "¿Qué hace en ADCOM?"],
        industries: ["¿Qué hizo en Quipux?", "¿Qué hizo en MUV-U?"],
        services: ["¿Por qué contratarlo?", "¿Cuánto cobra?", "¿Está disponible?"],
        whyHire: ["¿Cómo trabaja?", "¿Qué dicen sus colegas?", "¿Está disponible?"],
        workStyle: ["¿Ha liderado equipos?", "¿Por qué contratarlo?"],
        journey: ["¿Qué hizo en Quipux?", "¿Qué planes tiene?"],
        leadership: ["¿Qué hace en TIVENOS?", "¿Qué es SmartPot?"],
        ai: ["¿Qué es SmartPot?", "¿Cuántas horas programa?"],
        site: ["¿Cómo funciona este asistente?", "¿Cuál es su stack?"],
        stack: ["¿Encaja en un rol backend?", "¿Usa inteligencia artificial?", "¿Qué certificaciones tiene?"],
        salary: ["¿Está disponible?", "¿Qué servicios ofrece?"],
        search: ["¿Quién es Sebastián?", "¿Qué proyectos tiene?"],
        fallback: ["¿Quién es Sebastián?", "¿Qué servicios ofrece?", "¿Cuál es su stack?"],
    },
    catalog: {
        open: "Más preguntas",
        close: "Menos preguntas",
        groups: [
            {
                title: "Perfil",
                questions: ["¿Quién es Sebastián?", "¿Cómo ha sido su trayectoria?", "¿Cómo trabaja?", "¿Por qué contratarlo?", "¿Ha liderado equipos?"],
            },
            {
                title: "Experiencia",
                questions: [
                    "¿Cuántos años de experiencia tiene?",
                    "¿Dónde trabaja actualmente?",
                    "¿Qué hace en TIVENOS?",
                    "¿Qué hace en ADCOM?",
                    "¿Qué hizo en MUV-U?",
                    "¿Qué hizo en Quipux?",
                    "¿En qué sectores ha trabajado?",
                    "¿A cuántos clientes ha atendido?",
                ],
            },
            {
                title: "Proyectos",
                questions: ["¿Qué proyectos tiene?", "¿Qué es SmartPot?", "¿Qué es GoPoli?", "¿Qué es PepperCRM?", "¿Qué son los widgets de Zoho CRM?"],
            },
            {
                title: "Habilidades",
                questions: [
                    "¿Cuál es su stack?",
                    "¿Encaja en un rol backend?",
                    "¿Qué herramientas de BI usa?",
                    "¿Cómo despliega sus servicios?",
                    "¿Usa inteligencia artificial?",
                    "¿Qué experiencia tiene en ciberseguridad?",
                ],
            },
            {
                title: "Formación",
                questions: [
                    "¿Qué estudió?",
                    "¿Qué estudió en el SENA?",
                    "¿Qué hace en el diplomado?",
                    "¿Qué certificaciones tiene?",
                    "¿Tiene certificación en Python?",
                    "¿Qué planes tiene?",
                ],
            },
            {
                title: "GitHub",
                questions: ["¿Cuántos commits tiene en GitHub?", "¿En qué organizaciones de GitHub está?", "¿Cuántas horas programa?"]
            },
            {
                title: "Contratación",
                questions: [
                    "¿Está disponible?",
                    "¿Qué servicios ofrece?",
                    "¿Dónde vive?",
                    "¿Qué idiomas habla?",
                    "¿Cuánto cobra?",
                    "¿Puedo descargar su hoja de vida?",
                    "¿Qué dicen sus colegas?",
                ],
            },
            {title: "Este sitio", questions: ["¿Cómo está hecho este sitio?", "¿Cómo funciona este asistente?"]},
        ],
    },
    links: {
        about: "Sobre mí",
        journey: "Mi trayectoria",
        services: "Servicios",
        reasons: "Por qué contratarme",
        experience: "Experiencia",
        skills: "Habilidades",
        projects: "Proyectos",
        certifications: "Certificaciones",
        metrics: "Métricas de GitHub",
        resume: "Hoja de vida",
        testimonials: "Recomendaciones",
        contact: "Contacto",
        roleView: "Abrir la vista del rol",
        downloadCv: "Descargar CV",
        whatsapp: "Escribir por WhatsApp",
        email: "Escribir un correo",
    },
    pages: {
        experience: "Toda la experiencia",
        education: "Toda la educación",
        certifications: "Todas las certificaciones",
        organizations: "Organizaciones en GitHub",
        services: "Servicios",
        reasons: "Por qué contratarme",
        metrics: "Métricas de GitHub",
        projects: "Todos los proyectos",
    },
    answers: {
        greeting: () =>
            "¡Hola! Pregúntame por su experiencia, proyectos, formación, servicios o cómo contactarlo. Abajo hay preguntas sugeridas, y en «Más preguntas» están todas las que sé responder.",
        about: ({years, currentJobs}) =>
            `Sebastián López Osorno es desarrollador backend y de integraciones en Medellín, Colombia, y cursa el último semestre de Ingeniería Informática. Lleva más de ${years.replace("+", "")} años logrando que sistemas que no se hablan entre sí compartan datos confiables, y hoy trabaja en ${list(currentJobs.map((job) => job.company))}.`,
        salary: () =>
            "La remuneración depende del rol, el alcance y el tipo de contrato, así que Sebastián prefiere conversarlo directamente. Escríbele y te responderá pronto.",
        experienceYears: ({years, currentJobs}) =>
            `Sebastián tiene más de ${years.replace("+", "")} años de experiencia. Empezó en agosto de 2022 como practicante de análisis de datos y hoy trabaja en ${list(currentJobs.map((job) => job.company))}.`,
        currentRole: ({currentJobs}) =>
            `Actualmente trabaja como ${list(currentJobs.map((job) => `${job.title} en ${job.company}`))}.`,
        company: ({
                      company,
                      title,
                      period,
                      summary
                  }) => `${title} en ${company} (${period}). En sus palabras: «${summary}»`,
        roleFit: ({role, stack, company, example}) =>
            `${role} es uno de sus perfiles principales. Trabaja con ${list(stack)}. Por ejemplo, en ${company}: «${example}»`,
        availability: () =>
            "Está abierto a nuevas oportunidades, en remoto o híbrido desde Medellín, Colombia. La forma más rápida de contactarlo es WhatsApp o correo.",
        location: () => "Vive en Medellín, Colombia (UTC−5) y trabaja en remoto. Está abierto a roles remotos o híbridos.",
        education: () =>
            "Cursa el último semestre de Ingeniería Informática en el Politécnico Colombiano Jaime Isaza Cadavid (grado en marzo de 2027), donde también hace el Diplomado en Ciberseguridad de septiembre a diciembre de 2026. Es Técnico en Programación de Software del SENA – IUSH, y antes hizo la media técnica en el Pascual Bravo y el bachillerato en el INEM.",
        program: ({degree, school, period, tagline}) => `${degree}, ${school} (${period}). ${tagline}.`,
        plans: () =>
            "Después de graduarse como Ingeniero Informático en marzo de 2027, planea una especialización en ciencia de datos (2027–2028) y luego una maestría en ciberseguridad (2028–2030), siempre con enfoque de ingeniería. Para 2030 quiere construir plataformas de datos seguras desde el diseño para la educación y las instituciones públicas, alineadas con la Agenda 2030.",
        security: () =>
            "Cursa el Diplomado en Ciberseguridad Informática y Resiliencia Digital (septiembre a diciembre de 2026), con laboratorios de reconocimiento con Nmap, un CTF hasta la escalada de privilegios y respuesta a incidentes. Tiene las certificaciones de hacking ético HACKLAB y de Ciberseguridad de la Universidad de Antioquia, y en su trabajo publica imágenes Docker endurecidas detrás de Nginx con SSL.",
        languages: () => "Habla español (nativo), inglés (competencia profesional de trabajo) y portugués básico.",
        projects: () =>
            "Sus proyectos principales son SmartPot, una plataforma IoT para cultivos hidropónicos donde es el desarrollador líder; GoPoli, una PWA de viajes compartidos para universitarios; y PepperCRM, un producto CRM donde escribió la mayor parte del backend. El portafolio tiene una página para cada uno de sus veinte proyectos.",
        project: ({name, summary}) => `${name}. En sus palabras: «${summary}»`,
        certifications: ({certifications, issuers}) =>
            `Tiene ${certifications} certificaciones de ${issuers} emisores, entre ellas IT Specialist – Python (Certiport), DAX y Power BI (Platzi) y Data Science & AI (Universidad de Antioquia). Cada una tiene su página con lo que aprendió y dónde se ve en su trabajo.`,
        certificationMatch: ({titles}) =>
            `Sí. Tiene ${titles.length === 1 ? "la certificación" : "las certificaciones"} ${list(titles)}.`,
        testimonials: ({testimonials}) =>
            `Tiene ${testimonials} recomendaciones en LinkedIn de supervisores y compañeros, que destacan su confiabilidad, su capacidad para resolver problemas y su visión de negocio.`,
        resume: () => "Puedes descargar su hoja de vida en PDF, en una versión ATS compacta o en una extendida.",
        githubStats: ({contributions, commits, repositories, streak, asOf}) =>
            `Entre febrero de 2022 y ${asOf} hizo ${contributions} contribuciones en GitHub, ${commits} de ellas commits, en ${repositories} repositorios. Su racha de días seguidos con contribuciones superó los ${streak} días y seguía activa.`,
        organizations: ({organizations}) =>
            `Su código está en ${organizations} organizaciones de GitHub. Las de TIVENOS, ADCOM y su práctica en Quipux son privadas, y las demás son las de SmartPot, GoPoli y PepperCRM, la de una prueba técnica de datos y una por cada etapa de estudio. Estas son las que más commits suyos tienen.`,
        coding: ({codingHours, topLanguages, commits}) =>
            `WakaTime registra ${codingHours} horas de programación; los lenguajes con más horas son ${list(topLanguages)}, y GitHub cuenta ${commits} commits suyos desde febrero de 2022.`,
        clients: ({integrations, clients, landingPages}) =>
            `En TIVENOS lidera ${integrations} servicios de integración para ${clients} clientes educativos de Latinoamérica y España, y en ADCOM GROUP ha entregado ${landingPages} landing pages y micrositios de admisiones.`,
        industries: () =>
            "Ha trabajado en cuatro sectores. En la educación superior hace las integraciones de admisiones de las universidades en TIVENOS y sus campañas en ADCOM, donde también trabaja con marcas de consumo y de lotería. MUV-U es del sector de los estudios en el exterior, y Quipux, del de la movilidad y el recaudo.",
        services: ({services}) =>
            `Sus ${services.length} servicios son ${list(services)}. Cada uno enlaza a los proyectos donde ya lo hizo.`,
        whyHire: () =>
            "Estas son tres razones que dan quienes han trabajado con él, cada una con una frase textual de su recomendación en LinkedIn.",
        leadership: () =>
            "Sí. En TIVENOS es el IT Manager, así que lleva la operación de TI y la mesa de ayuda del equipo, y definió los estándares de código, seguridad y despliegue que comparten los servicios. En SmartPot lidera el desarrollo de una plataforma hecha por un equipo de cinco, y en ADCOM asesora a los equipos de desarrollo, mercadeo y analítica.",
        ai: () =>
            "Desarrolla IA desde la carrera, donde hizo un sistema experto en CLIPS, lógica difusa y algoritmos genéticos (en pareja) y un agente reactivo. En SmartPot desarrolló un asistente que combina reglas expertas con modelos de scikit-learn para pronosticar cuándo un cultivo se sale de rango, y en ADCOM, agentes de IA en Dapta que contactan leads. Con modelos de lenguaje ajustó Qwen2.5 con LoRA y armó un pipeline RAG con Qwen2 cuantizado y un agente en n8n con Claude y servidores MCP propios. En el día a día dirige agentes de código como Claude Code con reglas escritas por proyecto, y lo que entregan pasa por las mismas pruebas y la misma CI que cualquier otro cambio. Lo siguiente es llevar esos modelos a los datos que hoy integra.",
        site: ({pages}) =>
            `Este portafolio está hecho con Astro 7, SolidJS, TypeScript y Tailwind CSS 4, prerenderizado en ${pages} páginas en español e inglés y servido por nginx en una imagen Docker. Este asistente responde con el contenido del sitio. Reconoce la intención de la pregunta y, si no la reconoce, busca en el texto del portafolio, todo en el navegador y sin servicios de IA.`,
        stack: ({topStack}) =>
            `Su stack principal es ${list(topStack)}. También trabaja con PostgreSQL, MongoDB, Redis, React, TypeScript, Prometheus y Grafana.`,
        search: () => "Esto es lo que encontré en su perfil.",
        fallback: () =>
            "No tengo esa información en el portafolio. Puedes preguntar por su experiencia, sus proyectos, su formación o su disponibilidad, abrir «Más preguntas» o escribirle directamente.",
    },
};
