import type {Content} from "@/types/content";

export const metrics: Content["metrics"] = {
    title: "Métricas de GitHub",
    subtitle: {
        general: "Lo que hay detrás de los números de mi GitHub",
        backend: "Lo que hay detrás de los números en servicios, integraciones y su mantenimiento",
        crm: "Lo que hay detrás de los números en integraciones de CRM y campañas",
        data: "Lo que hay detrás de los números en horas de Python, notebooks y datos",
        devops: "Lo que hay detrás de los números en flotas de repositorios, despliegues y monitoreo",
        fullstack: "Lo que hay detrás de los números en productos web de punta a punta",
    },
    intro: {
        general: "Un commit no es el trabajo, pero deja rastro de él. Abajo está dónde fueron mis commits, cuánto tiempo pasé frente al editor y cómo creció la actividad desde 2022, con lo que cada cifra cuenta y lo que no.",
        backend: "La mayor parte de mi tiempo frente al editor se va en Python, en los servicios en FastAPI que conectan el CRM con los sistemas académicos. Sus commits son la segunda franja de abajo.",
        crm: "Casi tres de cada cinco commits están en trabajo de CRM y marketing, entre las landings que llevan cada lead al CRM y los servicios que lo sincronizan con los sistemas de cada institución.",
        data: "Las horas cuentan otra historia que los commits. Python se lleva más de un tercio del tiempo que WakaTime registró, entre servicios, notebooks de Jupyter y scripts de datos.",
        devops: "Buena parte de los commits sale de mantener flotas, con el mismo workflow, la misma configuración de Dependabot o el mismo ajuste aplicado con un script a más de cien repositorios de landings. Por eso los commits por lenguaje y las horas no coinciden.",
        fullstack: "TypeScript encabeza los commits porque es el lenguaje principal de las landings, de las webs de SmartPot y GoPoli y de este portafolio; las horas muestran cuánto tiempo se lleva el backend en Python y Java.",
    },
    asOf: "Datos del {date}, actualizados en cada despliegue",
    pageLink: "Ver todas las métricas y lo que cuentan",
    labels: {
        contributions: "contribuciones desde febrero de 2022",
        commits: "commits desde febrero de 2022",
        activeDays: "días con al menos una contribución",
        streak: "días seguidos con contribuciones, y sigue",
        pullRequests: "pull requests abiertos",
        reviews: "pull requests revisados",
        repos: "repositorios con contribuciones mías",
        organizations: "organizaciones en las que soy miembro",
    },
    areas: {
        title: "Dónde están los commits",
        note: "Commits en la rama principal de los repositorios que puedo consultar con la API de GitHub, contados el {date}, que suman {commits} en {repositories} repositorios. La cifra de commits de arriba sale del conteo de contribuciones de GitHub y es mayor que esta suma.",
        commits: "commits",
        repositories: "repositorios",
        items: {
            landings: {
                name: "Landing pages de admisiones",
                detail: "Las landings de las campañas de la agencia. Incluyen los commits automáticos del constructor visual y los cambios que apliqué con un script a toda la flota.",
            },
            integrations: {
                name: "Servicios de integración",
                detail: "Los servicios en FastAPI que conectan Zoho CRM con los sistemas académicos de cada institución.",
            },
            smartpot: {
                name: "SmartPot",
                detail: "El proyecto universitario de IoT, con firmware, API, web, modelos e infraestructura.",
            },
            coursework: {
                name: "Materias de la carrera",
                detail: "Un repositorio por materia o proyecto de Ingeniería Informática.",
            },
            signatures: {
                name: "Firmas de correo",
                detail: "El generador de firmas de correo de TIVENOS.",
            },
            other: {
                name: "Lo demás",
                detail: "Infraestructura y herramientas de la agencia, formularios, widgets y observabilidad de TIVENOS, productos en equipo, pruebas técnicas, este portafolio y repositorios personales.",
            },
        },
    },
    languages: {
        title: "Horas frente a commits",
        note: "Participación de cada lenguaje en los commits de GitHub y en las {hours} horas que WakaTime registró en mis editores.",
        byCommits: "commits",
        byHours: "horas",
        why: "No miden lo mismo. El conteo por lenguaje asigna cada commit al lenguaje principal de su repositorio, y un cambio aplicado a toda la flota de landings suma un commit por repositorio, casi todos en TypeScript. WakaTime mide el tiempo frente al editor, y ahí pesan los servicios y los notebooks en Python.",
    },
    years: {
        title: "Año por año",
        note: "Contribuciones de cada año y los días con al menos una.",
        activeDays: "{active} de {days} días con actividad",
        partial: "hasta el {date}",
    },
    habits: {
        weekdaysTitle: "Contribuciones por día de la semana",
        weekdays: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
        editorsTitle: "Editores (WakaTime)",
        reviews: "De los {reviews} pull requests que revisé, {dependabot} eran actualizaciones de dependencias abiertas por Dependabot.",
        repositories: "{contributed} repositorios con commits míos, {private} de ellos privados.",
        more: "{created} repositorios creados y {issues} issues abiertos desde febrero de 2022.",
    },
    load: "Cargar las tarjetas detalladas de GitHub",
    imagesTitle: "Tarjetas detalladas",
    imageAlts: {
        streak: "Tarjeta de racha con las contribuciones totales, la racha actual y la racha más larga",
        stats: "Tarjeta de estadísticas de GitHub con commits, pull requests, issues y rango",
        activity: "Contribuciones por día en los últimos 50 días",
        wakatime: "Tiempo de programación por lenguaje según WakaTime",
        topLangs: "Lenguajes más usados por tamaño de código en los repositorios",
        account: "Resumen de la cuenta de GitHub con actividad, comunidad y repositorios",
        languages: "Lenguajes más usados por líneas de código",
        calendar: "Calendario de contribuciones y rachas de commits",
        followup: "Estado de issues y pull requests",
    },
};
