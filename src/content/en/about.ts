import type {Content} from "@/types/content";
import {EXPERIENCE_YEARS} from "@/content/shared/profile";

const SEEKING = "remote or hybrid";

export const about: Content["about"] = {
    title: "The Engineer's Mindset",
    subtitle: {
        general: "From data analyst in 2022 to integration lead today",
        backend: "From data scripts in 2022 to 20+ services in production",
        crm: "From cleaning up a CRM in 2023 to building its widgets and integrations",
        data: "From ETL routines in 2022 to dashboards and CRM extracts today",
        devops: "From running servers in 2023 to watching 20+ services today",
        fullstack: "From PHP sites in high school to PWAs in React and Next.js",
    },
    quote: "Engineering is the art of understanding complex systems.",
    intro: `I'm Sebastián López Osorno, a developer from Medellín, Colombia, in my final semester of Computer Engineering. For more than ${EXPERIENCE_YEARS} years I've been getting systems that don't talk to each other to share data people can trust.`,
    story: {
        general: [
            "I started programming in 2019 at INEM, and during technical high school, between INEM and Pascual Bravo, I built PHP sites and Excel macros. In 2022 I started university, and that same year came my first job in tech, a data internship at Quipux. It left me with the habit of checking, before I build an integration, which decision depends on its data.",
            "At MUV-U the job grew with me. I started cleaning up the CRM and building the Power BI reports, and ended up in charge of the Zoho ecosystem, the servers and user support. In 2025 came ADCOM and TIVENOS. At TIVENOS I'm now IT Manager and run the integrations that connect Zoho CRM with the academic systems of 15+ institutions, and much of what I use there, such as SOAP with WS-Security or Prometheus and Grafana, I learned when a specific problem called for it.",
        ],
        backend: [
            "My backend work started with Python scripts that cleaned revenue-collection data at Quipux. At MUV-U I moved on to integrating services with the company website, and then came product APIs, such as SmartPot's in Spring Boot with 130+ tests, and almost all of PepperCRM's backend in a team of four.",
            "Today I run 20+ FastAPI services at TIVENOS, and most of the work sits in the systems on the other side. One that only spoke SOAP with WS-Security led me to learn Zeep, and a catalog that took minutes to sync became a background job that answers 202 Accepted and leaves a record of every run in the CRM.",
        ],
        crm: [
            "I came to CRM through data. At MUV-U I had to clean up the CRM so sales analysis could be trusted, and from there I moved on to automating its repetitive tasks. At ADCOM I went all in on Zoho CRM, with Deluge, Zoho Creator and admissions landing pages that put every lead in the CRM with the campaign that brought it.",
            "At TIVENOS I integrate Zoho CRM with the academic systems of 15+ institutions and build its widgets. The work starts with the process, with knowing who the advisor is talking to, which piece of data is missing and when they need it. Sometimes the answer is a Deluge function; sometimes a widget, like the quote builder that calculates installments in the browser, or an integration with the academic system.",
        ],
        data: [
            "I started in data as an intern at Quipux, with ETL routines, automated reports and KPI dashboards for revenue collection, plus Python scripts to track campaigns and clean up databases. At MUV-U I built the Power BI reports for finance, sales and marketing, and later designed how data enters the CRM.",
            "Before I build a dashboard I want to know which decision it supports and where each figure comes from. At TIVENOS I write Zoho Analytics dashboards in SQL and run bulk extracts of the CRM into PostgreSQL to analyze it outside of it. The next step is to formalize it with a specialization in data science.",
        ],
        devops: [
            "My infrastructure work started at MUV-U, with the company's servers and support for its users. At ADCOM I set up a VPS with Docker, Nginx and SSL, and later the deployment of the landing pages, with a user without a shell that uploads the files through rsync without restarting anything.",
            "At TIVENOS I publish 20+ services to GHCR. Since I needed to hear about a failure before a team reported it, I built the stack that watches them, with metrics in Prometheus, logs in Loki, traces in Tempo and Grafana alerts that reach Telegram.",
        ],
        fullstack: [
            "I started with HTML and PHP sites at Pascual Bravo and PHP and MySQL applications at SENA. At university I moved to Spring Boot and React, and since 2024 I've led SmartPot, where I wrote the API, the PWA and much of the infrastructure; in 2026 came GoPoli, with Next.js.",
            "I care that the person using a product never has to think about how it works inside, so I work on both sides, the API and its database as much as the screen with its loading states and its accessibility. In GoPoli that meant a map with routes and a chat for every trip; in SmartPot, a PWA that shows what each sensor measures and lets the assistant act.",
        ],
    },
    versatility: "Along that path I've worked on almost every side of a tech team, from data, CRM and backend to frontend, servers and, at TIVENOS, technical coordination. It lets me understand what marketing, finance or IT ask for without anyone translating it for me, and turn it into concrete tasks.",
    ai: [
        "With artificial intelligence I took the same path, from building it to directing it. At university I built, with a classmate, an expert system in CLIPS, fuzzy logic with scikit-fuzzy and genetic algorithms, and on my own a reactive agent that decides which actuators to switch on; at SmartPot, an assistant with expert rules, fuzzy logic and scikit-learn models that forecasts when a crop will leave its range and proposes actions applied in bulk; and at ADCOM, lead contact with AI agents in Dapta.",
        "I work with language models at both scales. On the small side, I fine-tuned Qwen2.5-1.5B with LoRA and built a RAG pipeline with a quantized Qwen2-0.5B and a FAISS index, meant to run on modest hardware. On the large side, I built an n8n agent that answers with Claude and queries three MCP servers I wrote in Python, and I've worked with GPT, with Gemini and with open models running locally through Ollama.",
        "In daily development I direct coding agents, Claude Code among them, with engineering judgment. Before delegating I write down each project's rules, from commit authorship to what is never touched in production; then I review every proposal and run it through the same tests and the same CI as any other change. Having built these systems from the inside is what lets me decide what to delegate, spot when an answer doesn't hold up and use AI to save work without giving up the design.",
    ],
    ambition: "Next is bringing those language models to the data I integrate today, with assistants that answer from each organization's own information. On the academic side, I finish the cybersecurity diploma in December 2026, graduate in March 2027, and then come a specialization in data science and a master's in cybersecurity.",
    closing: {
        general: `What I care about most is taking hours of data entry off admissions, sales and finance teams, and making the CRM reflect what actually happened. I'm looking for a backend or integration role where that counts, ${SEEKING}.`,
        backend: `What I care about most is data arriving complete and on time from one system to another, so nobody has to copy it by hand. I'm looking for a backend role in Python or Java where I design the services and also answer for them in production, ${SEEKING}.`,
        crm: `What I care about most is every advisor seeing in the CRM what actually happened with their applicant or client, without typing it twice. I'm looking for a CRM, Zoho or automation role where the CRM is at the center of the sales operation, ${SEEKING}.`,
        data: `What I care about most is finance, sales and marketing deciding with the same figure. I'm looking for a data or BI role where analysis ends in a decision, ${SEEKING}.`,
        devops: `What I care about most is that the teams depending on a service are never the first to find out it went down. I'm looking for a DevOps or platform role, ${SEEKING}.`,
        fullstack: `What I care about most is a product working as well for the people who use it as for the people who maintain it. I'm looking for a full-stack role with React and TypeScript, ${SEEKING}.`,
    },
    terminal: {
        label: "ASCII portrait and the journey in a terminal",
        logCommand: "cat journey.log",
        entries: [
            {year: "2019", text: "INEM: first algorithms and web design", roles: ["fullstack"]},
            {year: "2020", text: "Pascual Bravo: software development technician", roles: ["fullstack", "backend"]},
            {
                year: "2022",
                text: "Politécnico and SENA: engineering and a programming technician degree",
                roles: ["backend", "fullstack"]
            },
            {year: "2022", text: "Quipux: data analysis internship", roles: ["data"]},
            {year: "2023", text: "MUV-U: CRM, Power BI and servers", roles: ["crm", "data", "devops"]},
            {
                year: "2024",
                text: "SmartPot: lead developer of the IoT platform",
                roles: ["backend", "fullstack", "devops"]
            },
            {year: "2025", text: "ADCOM: CRM, MarTech and 100+ landing pages", roles: ["crm", "fullstack"]},
            {
                year: "2025",
                text: "TIVENOS: IT Manager and integration lead",
                roles: ["backend", "crm", "data", "devops"]
            },
            {year: "2026", text: "GoPoli: ride-sharing PWA", roles: ["fullstack", "backend"]},
            {year: "2026", text: "Cybersecurity diploma", roles: ["devops"]},
        ],
    },
    educationTitle: "Education",
    educationPage: "See the program",
    educationIndex: "All education, with its courses and projects",
    courseworkLink: "Lab reports on GitHub",
    organizationLink: "GitHub organization",
    repositories: "repositories",
    languagesTitle: "Languages",
    languages: [
        {name: "Spanish", level: "Native"},
        {name: "English", level: "Professional working proficiency"},
        {name: "Portuguese", level: "Elementary"},
    ],
    education: {
        cyberDiploma: {
            degree: "Diploma in Cybersecurity",
            note: "In progress · Sep – Dec 2026",
            skills: ["Kali Linux", "Nmap", "Ethical hacking", "Vulnerability analysis", "CTF", "Privilege escalation", "Incident response", "Role-based access control"],
        },
        politecnico: {
            degree: "Bachelor's in Computer Engineering",
            note: "Final semester · Graduation Mar 2027",
            skills: [
                "Software engineering",
                "Artificial intelligence",
                "Machine learning",
                "Computer vision",
                "Evolutionary computing",
                "Semantic web and agents",
                "Distributed and parallel programming",
                "Cisco networks and IPv6",
                "Operating systems",
                "Hardware architecture",
                "Compilers and automata",
                "Data structures",
                "SQL and NoSQL databases",
                "Testing and TDD",
                "Modeling and simulation",
                "Operations research",
                "Numerical analysis",
                "Applied statistics",
                "IT project management",
            ],
        },
        sena: {
            degree: "Software Programming Technician",
            skills: [
                "Software analysis",
                "Systems architecture",
                "Software design",
                "Web development",
                "PHP and MySQL",
                "C#",
                "Database objects",
                "Data modeling",
                "Version control",
                "Operating system installation",
            ],
        },
        pascual: {
            degree: "Assistant Software Development Technician",
            skills: ["Programming logic", "Data structures", "Relational databases", "PHP", "HTML and CSS", "Visual Basic .NET", "Excel with VBA", "Java", "Python"],
        },
        inem: {
            degree: "High School with Computer Science Specialization",
            skills: ["Computing fundamentals", "Algorithms", "Web design"],
        },
    },
};
