import type {JourneyCopy} from "@/types/journey";

export const journey: JourneyCopy = {
    title: "My Journey",
    subtitle: {
        general: "From school projects to production systems, and where I am heading",
        backend: "From my first Python and Java programs to an integration platform in production, and where I am heading",
        crm: "From data analysis to running the CRM of several institutions and campaigns, and where I am heading",
        data: "From my first spreadsheets to snapshots, dashboards and models, and on to a data science specialization",
        devops: "From uploading files by hand to fleets that deploy and watch themselves, and on to a cybersecurity master's",
        fullstack: "From my first HTML pages to complete web products built in teams, and where I am heading",
    },
    tabsLabel: "Journey views",
    tabs: {
        map: {
            label: "Journey map",
            description: "Each line is a role and each stop is a milestone. Select a stop to see what happened there."
        },
        evolution: {
            label: "Capability evolution",
            description: "How each capability grew year by year, and where I want it by 2030."
        },
        focus: {
            label: "Focus radar",
            description: "What is in focus now, what is growing, what I am exploring and what is out of focus."
        },
        horizon: {
            label: "Where I'm heading",
            description: "The next stops after graduating, and how my work connects to the UN Sustainable Development Goals.",
        },
    },
    linesShort: {
        education: "Education",
        web: "Web",
        backend: "Backend",
        crm: "CRM",
        data: "Data",
        devops: "DevOps",
        security: "Security",
    },
    lines: {
        education: "Education",
        web: "Web & full-stack",
        backend: "Backend & integrations",
        crm: "CRM & automation",
        data: "Data & BI",
        devops: "DevOps & cloud",
        security: "Security",
    },
    areas: {
        foundations: "Engineering foundations",
        web: "Web & frontend",
        backend: "Backend & APIs",
        databases: "Databases",
        crm: "CRM & automation",
        data: "Data & BI",
        devops: "DevOps & cloud",
        security: "Security",
        ai: "AI & data science",
    },
    kinds: {education: "Education", work: "Work", project: "Project", certification: "Certification", goal: "Goal"},
    levels: ["None", "Learning", "Practicing", "Professional", "Leading"],
    today: "Today",
    planned: "Planned",
    milestones: {
        inem: {
            short: "INEM",
            title: "High school with a computer science specialization",
            place: "I.E. INEM José Félix de Restrepo",
            summary: "First contact with programming logic, algorithms and web design while finishing school.",
        },
        pascual: {
            short: "Pascual Bravo",
            title: "Assistant Software Development Technician",
            place: "Institución Educativa Pascual Bravo",
            summary: "Programming logic, data structures and relational databases, with small projects in HTML, PHP, VB.NET, Java and Python.",
        },
        html: {
            title: "First certificate, in HTML",
            place: "Coursera",
            summary: "Introduction to HTML, the first stop of the web line."
        },
        firstPython: {
            title: "First steps in Python",
            place: "Universidad EIA · Universidad Tecnológica de Pereira",
            summary: "Introduction to programming in Python, then Programming Fundamentals 1 and 2 in Misión TIC 2022.",
        },
        sena: {
            short: "SENA",
            title: "Software Programming Technician",
            place: "SENA – Institución Universitaria Salazar y Herrera",
            summary: "Web development, databases, version control and data modeling, with web apps and system tools in C#, PHP and MySQL.",
        },
        politecnico: {
            short: "Politécnico",
            title: "Computer Engineering",
            place: "Politécnico Colombiano Jaime Isaza Cadavid",
            summary: "Software engineering, artificial intelligence, computer vision, networks and operating systems. Final semester in 2026.",
        },
        firstCommit: {
            title: "First commit on GitHub",
            place: "GitHub",
            summary: "February 26, 2022: the start of a history that now spans ten organizations.",
        },
        testlab: {
            title: "Data automations",
            place: "TestLabData",
            summary: "Python automations for campaign and reporting data, 2022–2023."
        },
        quipux: {
            short: "Quipux",
            title: "Data Analyst (Internship)",
            place: "Quipux S.A.S",
            summary: "ETL routines, automated reports and KPI dashboards for revenue collection and mobility processes.",
        },
        skillCertificates: {
            title: "Skill certificates",
            place: "HackerRank · Cámara de Comercio y Educación",
            summary: "SQL, Python, Java, CSS and problem solving on HackerRank, plus professional Excel, between May 2022 and March 2023.",
        },
        django: {
            title: "Django with Sapiencia",
            place: "Sapiencia · Comfenalco Antioquia",
            summary: "Two Python courses with Django, Bootstrap and databases, my first Python web framework before FastAPI.",
        },
        muvu: {
            short: "MUV-U",
            title: "Backend Developer & Data Analyst",
            place: "MUV-U S.A.S",
            summary: "Power BI reports with DAX, CRM data quality and automations for the commercial and operations teams.",
        },
        hacklab: {
            title: "Gamified ethical hacking",
            place: "HackerMentor · HACKLAB",
            summary: "My first hands-on ethical hacking training, in a gamified lab."
        },
        pythonSpecialist: {
            title: "IT Specialist – Python",
            place: "Certiport – Pearson VUE",
            summary: "Industry certification in Python programming."
        },
        platziRoute: {
            title: "Fundamentals path on Platzi",
            place: "Platzi",
            summary: "Git and GitHub, software engineering, practical JavaScript, basic programming, Python fundamentals and IoT protocols, between November and December 2023.",
        },
        enganchaTic: {
            title: "Engancha TIC 2.0",
            place: "Universidad de Antioquia",
            summary: "Four digital skills certifications from the certification marathon that MinTIC ran with Universidad de Antioquia, in data science and AI, cybersecurity, data visualization and web programming.",
        },
        greenSkills: {
            title: "Green Digital Skills",
            place: "INCO Academy",
            summary: "Digital sustainability, or how technology choices affect the environment.",
        },
        biCertificates: {
            title: "Excel and Power BI with DAX",
            place: "Platzi",
            summary: "Advanced Excel, data analysis with Power BI, DAX and SEO fundamentals with Google Search Console, from June to September 2024.",
        },
        smartpot: {
            short: "SmartPot",
            title: "SmartPot",
            place: "SmartPotTech",
            summary: "IoT platform for hydroponic crops, with 11 repositories and a team of five in which I lead development across firmware, API, AI assistant, PWA and infrastructure.",
        },
        taurus: {
            title: "Data technical assessment",
            place: "TaurusSebastian-s",
            summary: "From raw CSV files to a FastAPI metrics API and an interactive React dashboard.",
        },
        adcom: {
            short: "ADCOM",
            title: "CRM & MarTech Developer",
            place: "ADCOM GROUP",
            summary: "Zoho CRM automation and 90+ admissions landing pages connected to forms and the CRM.",
        },
        peppercrm: {
            title: "PepperCRM",
            place: "PepperTechDev",
            summary: "CRM product built by a team of four, where I wrote most of the backend with Spring Boot, Spring Security and JWT.",
        },
        tivenos: {
            short: "TIVENOS",
            title: "IT Manager & Backend Integration Lead",
            place: "TIVENOS",
            summary: "20+ FastAPI integration services that connect Zoho CRM with the academic systems of 15+ education clients, with their deploys and observability.",
        },
        zohoToolkit: {
            title: "Bulk operations in Zoho",
            place: "ADCOM GROUP",
            summary: "Scripts and notebooks that load, link and sync large volumes of records in each client's Zoho CRM.",
        },
        emailAutomations: {
            title: "Email automations",
            place: "ADCOM GROUP",
            summary: "The results email of two lottery brands, which waits every night for the missing draws, plus welcome and birthday emails with each subscriber's name.",
        },
        realEstateSite: {
            title: "Real estate landing",
            place: "ADCOM GROUP",
            summary: "A lead capture site that publishes a real estate agency's Wasi inventory every day before dawn and stores its requests in Supabase.",
        },
        networks: {
            title: "Networks on real hardware",
            place: "Politécnico Colombiano Jaime Isaza Cadavid",
            summary: "Routing with RIPv2, OSPF and EIGRP, dual-stack IPv6, SNMP and VoIP on physical Cisco routers, plus Packet Tracer.",
        },
        aiCourses: {
            title: "Artificial intelligence in the degree",
            place: "Politécnico Colombiano Jaime Isaza Cadavid",
            summary: "Expert systems, fuzzy logic, genetic algorithms, computer vision and evolutionary computation, including a model for SmartPot.",
        },
        distributed: {
            title: "Distributed and parallel programming",
            place: "Politécnico Colombiano Jaime Isaza Cadavid",
            summary: "Sockets and threads, RMI and a school system built with Spring Boot, FastAPI with GraphQL and React.",
        },
        landingPlatform: {
            title: "Landing page deployment platform",
            place: "ADCOM GROUP",
            summary: "A reusable workflow and one Nginx per client that publish more than 100 landing pages without restarting anything, with daily monitoring.",
        },
        gopoli: {
            short: "GoPoli",
            title: "GoPoli",
            place: "University project · Politécnico JIC",
            summary: "Ride-sharing platform for students of my university, where I am the main contributor."
        },
        observability: {
            title: "Observability for the integrations",
            place: "TIVENOS",
            summary: "Metrics, logs, traces, probes and alerts for more than 20 services, with Prometheus, Grafana, Loki and Tempo.",
        },
        emailSignatures: {
            title: "Email signature generator",
            place: "TIVENOS",
            summary: "Signatures for five brands in three themes, generated from templates and ready for Outlook, Gmail and Apple Mail.",
        },
        cyberDiploma: {
            short: "Diploma",
            title: "Diploma in Cybersecurity",
            place: "Politécnico Colombiano Jaime Isaza Cadavid",
            summary: "Kali Linux labs on the vulnerability analysis of an FTP service, a CTF from reconnaissance to privilege escalation and a controlled availability test on WordPress, plus a cyberattack case with its protection plan and role-based access control.",
        },
        portfolio: {
            title: "This portfolio",
            place: "SebastianLopezO",
            summary: "Prerendered bilingual site with role views, an assistant and checks against production after every deploy.",
        },
        crmWidgets: {
            title: "Zoho CRM widgets",
            place: "TIVENOS",
            summary: "Five widgets inside the CRM, with a quoter with PDF, five-step enrollment, lead capture, appointments and program change.",
        },
        graduation: {
            short: "Engineer",
            title: "Computer Engineer",
            place: "Politécnico Colombiano Jaime Isaza Cadavid",
            summary: "Graduation planned for March 2027, closing the engineering degree.",
        },
        dataScience: {
            short: "Data science",
            title: "Specialization in Data Science",
            place: "Planned for 2027–2028",
            summary: "Statistics, machine learning and data engineering, to turn the data I already integrate into predictions and decisions.",
        },
        cybersecurity: {
            short: "Cybersecurity",
            title: "Master's in Cybersecurity",
            place: "Planned for 2028–2030",
            summary: "Application, cloud and data security, plus governance, to protect the systems and integrations I build.",
        },
        vision: {
            short: "2030 goal",
            title: "Secure data engineering for education and public services",
            place: "Goal for 2030",
            summary: "Design data platforms that are useful, measurable and secure by default for universities and public institutions.",
        },
    },
    map: {
        detail: "Open the page",
        legendLabel: "Lines",
        emphasisHint: "Select a line to highlight it",
        allLines: "All lines",
        previousStop: "Previous stop",
        nextStop: "Next stop",
        listToggle: {show: "Show as a list", hide: "Hide the list"},
        goTo: "Go to the section",
        certificates: "Certificates at this stop",
    },
    evolution: {
        caption: "Capability levels by year, self-assessed from jobs, projects and certificates. From 2027 on they are targets.",
        capability: "Capability",
        target: "Target",
        evidence: "Milestones",
        noEvidence: "No milestone recorded this year",
        activeDays: "Active days on GitHub",
        activeDaysNote: "From the GitHub contribution calendar; 2026 counts until October 14.",
        legend: "Level",
        previousYear: "Previous year",
        nextYear: "Next year",
    },
    radar: {
        caption: "Personal technology radar. The closer to the center, the more focus it gets today.",
        rings: {
            core: {label: "Core focus", description: "What I use and deliver with every week."},
            growing: {label: "Growing", description: "What I am strengthening now, with real projects."},
            exploring: {label: "Exploring", description: "Next steps, tied to my specialization and master's plans."},
            paused: {label: "Out of focus", description: "I know it, but I am not investing in it now."},
        },
        quadrants: {
            build: "Build & integrate",
            data: "Data & AI",
            platforms: "Platforms & operations",
            security: "Security & quality"
        },
        items: {
            fastapi: {name: "Python · FastAPI", note: "My daily stack for integration services in production."},
            zoho: {name: "Zoho CRM · Deluge", note: "CRM modules, functions, widgets and OAuth integrations."},
            integrations: {name: "REST · SOAP · Webhooks", note: "Connecting academic, legacy and marketing systems."},
            spring: {name: "Java · Spring Boot", note: "APIs for SmartPot, PepperCRM and GoPoli."},
            react: {
                name: "React · TypeScript",
                note: "The SmartPot and GoPoli PWAs, plus the TypeScript of this portfolio, kept sharp for full-stack work."
            },
            jobs: {
                name: "Background jobs",
                note: "Long processes that answer 202, avoid duplicates with an idempotency key and leave a status to query."
            },
            graphql: {
                name: "GraphQL",
                note: "I used it with Strawberry in a degree project; I consider it for APIs with many consumers."
            },
            events: {name: "Event-driven architecture", note: "Queues and events to decouple integrations at scale."},
            php: {name: "PHP · Laravel", note: "Used in school and technician projects; not my focus now."},
            dotnet: {name: "C# · VB.NET", note: "Where I started, with desktop tools."},
            sql: {name: "SQL", note: "Reporting, data quality and analytics every week."},
            pandas: {name: "Python · Pandas", note: "ETL, analysis and automation scripts."},
            bi: {name: "Power BI · Zoho Analytics", note: "Dashboards with DAX and SQL for business teams."},
            ml: {
                name: "AI · scikit-learn",
                note: "From the expert system and fuzzy logic to the models of SmartPot's assistant; the core of my planned specialization."
            },
            pipelines: {name: "Data pipelines", note: "Moving from scripts to scheduled, monitored pipelines."},
            warehouse: {
                name: "PostgreSQL for analysis",
                note: "CRM snapshots in PostgreSQL to query it with SQL without touching the CRM."
            },
            mlops: {name: "MLOps", note: "Deploying and monitoring models like any other service."},
            llm: {
                name: "LLM · RAG apps",
                note: "Qwen2 fine-tuned with LoRA and in a local RAG pipeline, and an agent with Claude and MCP servers; next are assistants grounded in each organization's own data."
            },
            vba: {name: "Excel · VBA", note: "Useful in the past, now replaced by Python and BI tools."},
            docker: {name: "Docker · Compose", note: "Every service ships as a hardened image."},
            actions: {name: "GitHub Actions · GHCR", note: "CI, image publishing and SSH deploys."},
            observability: {
                name: "Prometheus · Grafana",
                note: "Metrics, logs and traces with Loki and Tempo, with alerts to Telegram."
            },
            linux: {name: "Linux · Nginx", note: "Servers, reverse proxies and TLS."},
            networks: {name: "Networks · Cisco", note: "Routing, IPv6 and SNMP on real Cisco routers, in the degree."},
            iot: {name: "IoT · MQTT", note: "ESP32 sensors that publish over MQTT with TLS in SmartPot."},
            kubernetes: {name: "Kubernetes", note: "Manifests for SmartPot; running clusters is the next step."},
            cloud: {name: "AWS · Azure", note: "Managed cloud services beyond self-hosted servers."},
            hardening: {name: "Secure defaults", note: "Non-root containers, CSP, HSTS and least privilege."},
            auth: {name: "OAuth 2.0 · JWT", note: "Zoho OAuth and Spring Security with JWT."},
            secrets: {
                name: "Secrets and access",
                note: "Secrets encrypted with AES-256-GCM, restricted deploy users and pinned host keys."
            },
            testing: {name: "Automated testing", note: "PyTest, Vitest and Playwright in CI."},
            scanning: {name: "Dependency & code scanning", note: "Dependabot and CodeQL in my projects."},
            appsec: {name: "AppSec · OWASP", note: "Threat modeling and secure code reviews."},
            hacking: {
                name: "Ethical hacking",
                note: "Started with HACKLAB; now practiced in the Kali Linux labs of my cybersecurity diploma."
            },
            governance: {name: "ISO/IEC 27001", note: "Security management for the institutions I serve."},
        },
    },
    horizon: {
        intro:
            "I want to go deeper where data and security meet, first with a specialization in data science and then with a master's in cybersecurity, always with an engineering approach. By 2030 I want to build data platforms that are useful, measurable and secure by default.",
        goalsLabel: "Next stops",
        gains: {
            graduation: ["A formal base in software engineering, networks and AI", "Four years of professional practice, backed by the degree"],
            dataScience: ["Statistics and experimental design", "Machine learning and MLOps", "Data engineering with pipelines, quality and governance"],
            cybersecurity: ["Application and API security (OWASP)", "Cloud and network security", "Risk management and ISO/IEC 27001"],
            vision: ["Lead data and integration platforms", "Security by design in every delivery", "Measurable impact on education"],
        },
        sdgTitle: "Aligned with the 2030 Agenda",
        sdgIntro: "The Sustainable Development Goals my work already touches, and where my plans point. Select one to see its milestones.",
        sdgShort: "SDG",
        sdgs: {
            2: {
                name: "Zero Hunger",
                contribution: "SmartPot monitors and automates hydroponic crops to grow food with fewer losses."
            },
            4: {
                name: "Quality Education",
                contribution: "Integrations for 15+ education institutions, admissions funnels for universities, GoPoli for students, and my own studies."
            },
            8: {
                name: "Decent Work and Economic Growth",
                contribution: "Automations that remove manual work from sales, operations and marketing teams."
            },
            9: {
                name: "Industry, Innovation and Infrastructure",
                contribution: "Services that keep academic systems and Zoho CRM in sync, the SmartPot IoT platform, and ETL for mobility processes at Quipux."
            },
            11: {
                name: "Sustainable Cities and Communities",
                contribution: "GoPoli shares rides between students to cut trips and costs."
            },
            13: {
                name: "Climate Action",
                contribution: "So far, the Green Digital Skills certificate (INCO Academy, 2024)."
            },
            16: {
                name: "Peace, Justice and Strong Institutions",
                contribution: "Security and data protection for institutions, the focus of my master's plan."
            },
        },
        related: "Related milestones",
    },
};
