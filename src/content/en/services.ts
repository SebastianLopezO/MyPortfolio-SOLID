import type {Content} from "@/types/content";

export const services: Content["services"] = {
    title: "Services I Offer",
    subtitle: {
        general: "Work I can take on as an employee, contractor or freelancer, each with the project where I already did it",
        backend: "What I can build and run on the server side, with the project where I already did it",
        crm: "What I can do with the CRM and around it, with the project where I already did it",
        data: "What I can do with a team's data, with the project where I already did it",
        devops: "What I can deploy, watch and automate, with the project where I already did it",
        fullstack: "What I can take from the interface to the database, with the project where I already did it",
    },
    evidence: "Done in",
    items: {
        integration: {
            title: "Integration & Backend Engineering",
            tagline: "Every system talking to the CRM",
            description: "I connect the CRM with the systems already in place, so nobody types the same data twice.",
            points: [
                "Custom REST APIs in Python (FastAPI) and Java (Spring Boot)",
                "Integration with academic and legacy systems over REST, SOAP, SQL Server or files on FTP",
                "Background jobs with retries, idempotency and a status you can query",
                "Webhooks and connectors for WhatsApp, Meta Ads, Google Ads and forms",
                "OpenAPI documentation and automated tests",
            ],
        },
        crm: {
            title: "CRM Development & Automation (Zoho)",
            tagline: "Zoho working for the sales team",
            description: "I set up Zoho so the sales process lives in the CRM instead of spreadsheets.",
            points: [
                "Implementation and customization of Zoho CRM modules, fields, layouts and workflows",
                "Deluge functions and in-record widgets built with the Zoho Extension Toolkit",
                "Zoho Creator apps and Zoho Analytics dashboards",
                "Bulk loads, links and cleanups with the Bulk API",
                "Web forms connected to the CRM, with UTM capture and validation",
            ],
        },
        web: {
            title: "Web Development & Landing Pages",
            tagline: "Pages that take every lead to the CRM",
            description: "I build fast, bilingual, measurable websites and web apps connected to the CRM.",
            points: [
                "Apps in React, Next.js and Vite with TypeScript and Tailwind CSS",
                "Campaign landing pages with UTM capture, forms and conversion events",
                "Prerendered sites with complete SEO, Open Graph and structured data",
                "PWAs with maps (Leaflet and OSRM) and group chat",
                "Accessibility and performance measured with Lighthouse",
            ],
        },
        data: {
            title: "Business Intelligence & Data",
            tagline: "From scattered data to a dashboard",
            description: "I get data out of wherever it lives, clean it and turn it into dashboards and reports that update themselves.",
            points: [
                "Database audits, cleanup and deduplication",
                "CRM snapshots in PostgreSQL to analyze it with SQL",
                "Dashboards in Power BI (DAX) and Zoho Analytics",
                "Python and Pandas notebooks for analysis and campaign tracking",
                "Automated operational reports",
            ],
        },
        automation: {
            title: "Process Automation",
            tagline: "Fewer clicks, fewer mistakes",
            description: "I turn repetitive tasks into scheduled processes that warn you when something fails.",
            points: [
                "Workflows in n8n, Zapier and Power Automate, and Deluge functions",
                "Python scripts scheduled with cron or GitHub Actions",
                "Bulk email with Jinja2 templates and Amazon SES",
                "Generated documents, such as quote PDFs and email signatures",
                "Retries and alerts when a data source arrives late",
            ],
        },
        infra: {
            title: "Infrastructure & Deployment",
            tagline: "One push and the service is live",
            description: "I put each service in containers, with automatic deploys and a secure server.",
            points: [
                "Linux VPS administration, Nginx, SSL and ports",
                "Docker images, Compose and CI/CD with GitHub Actions",
                "Deploys without restarts for fleets of static sites",
                "Restricted deploy users and pinned host keys",
                "GHCR images with Dependabot and CodeQL",
            ],
        },
        observability: {
            title: "Observability & Reliability",
            tagline: "Every service in plain sight",
            description: "I instrument services to know what fails before anyone reports it.",
            points: [
                "Metrics with Prometheus and dashboards in Grafana",
                "Centralized logs with Loki and traces with OpenTelemetry and Tempo",
                "Uptime probes, certificate expiry checks and alert rules",
                "Alerts to Telegram and daily monitors that open issues",
                "Regular performance reviews with Lighthouse",
            ],
        },
        consulting: {
            title: "Technical Consulting & Support",
            tagline: "Choosing the technology with judgment",
            description: "I help business and IT teams decide on, document and run the technology they use.",
            points: [
                "Process assessment and architecture proposals",
                "Technical documentation, standards and good practices",
                "Logging, security and deployment standards for new services",
                "Help desk and support for CRM users",
                "Coordination between development, marketing and analytics",
            ],
        },
    },
    pageLink: "See each service",
    benefitsTitle: "Why hire me?",
    benefitsSubtitle: "Eleven reasons, each with what a manager or a teammate wrote about working with me",
    benefits: {
        vision: {
            title: "From business need to architecture",
            description: "I start from the decision or process a team needs to change, then choose the architecture and split it into tasks.",
            practice: "At TIVENOS the need was for Zoho CRM to know what each institution's academic system knows, and that became a platform of more than 20 FastAPI services. At ADCOM the admissions funnel started from knowing which campaign brings each lead, and at SmartPot I am the lead developer of a team of five, with the platform split into 11 repositories.",
            evidence: {
                testimonial: "felipeCamacho",
                excerpt: "He translates business needs into architecture and concrete tasks, anticipates risks and prioritizes with good judgment.",
            },
        },
        costs: {
            title: "Less manual work",
            description: "I automate repetitive data entry and reporting with CRM workflows, n8n and scripts.",
            practice: "At ADCOM I wrote the Python scripts and notebooks that run the bulk loads, links, tags and deletions in each client's Zoho CRM. At Quipux I automated with Python the reports and file cross-checks that used to be done by hand, and at TIVENOS the admissions forms take each application to the CRM without anyone typing it.",
            evidence: {
                testimonial: "jenniferTuso",
                excerpt: "He is very people-oriented and acts as a facilitator in the continuous improvement of both individual and team processes.",
            },
        },
        integration: {
            title: "Connected data",
            description: "I bring data scattered across spreadsheets, the CRM and web forms together, so every area works from the same records.",
            practice: "The TIVENOS integration services keep Zoho CRM in sync with the academic systems of more than 15 institutions, and the snapshots copy its modules to PostgreSQL to analyze them with SQL. At ADCOM the real estate landing page publishes, every night, the inventory the company already keeps in Wasi.",
            evidence: {
                testimonial: "tatianaDiaz",
                excerpt: "He also has strong data analysis skills, which allow proper traceability and follow-up of information.",
            },
        },
        autonomy: {
            title: "From question to production",
            description: "I take a problem from the first question to production, keep it running, and learn whatever tool it needs.",
            practice: "I am the only developer of the TIVENOS observability platform and of the platform that publishes more than 100 landing pages at ADCOM, and both run in production. I also built this site alone, from the first component to the server it runs on.",
            evidence: {
                testimonial: "lautaroBordoni",
                excerpt: "He is reliable, works steadily and can move his tasks forward without much follow-up.",
            },
        },
        versatility: {
            title: "I speak marketing, finance and IT",
            description: "I work with each team on its own terms, which helps when a project spans all three.",
            practice: "At MUV-U I built the Power BI reports for finance, sales and marketing. At ADCOM, a marketing agency, I built the admissions funnel and the emails of two lottery brands, and at Quipux I prepared the data of the collections team's campaigns.",
            evidence: {
                testimonial: "kellyMejia",
                excerpt: "He is a diligent, proactive professional with a great ability to deliver solutions that meet the needs of each area.",
            },
        },
        calm: {
            title: "Calm when something breaks",
            description: "When a service fails, I find the cause in the logs, traces and metrics, fix it, and leave an alert so it shows up sooner next time.",
            practice: "At TIVENOS I built the observability platform that watches the integration services, with metrics, logs, traces, probes and alerts in one place, and at ADCOM the landing page platform deploys without restarting anything. In the cybersecurity diploma I analyzed a cyberattack and wrote its response plan.",
            evidence: {
                testimonial: "rodrigoSanchez",
                excerpt: "how he approaches problems: no drama, calmly and always looking for solutions",
            },
        },
        business: {
            title: "Technology that serves the business",
            description: "I judge a solution by what it changes for the business, whether that is leads reaching the CRM complete, reports nobody builds by hand or pages that load fast.",
            practice: "At ADCOM more than 90 admissions landing pages send each lead to Zoho CRM with the campaign that brought it, and the real estate landing page takes requests for advice, contact and visits. At TIVENOS the CRM snapshots leave its data ready to analyze with SQL outside the CRM.",
            evidence: {
                testimonial: "danielRodriguez",
                excerpt: "excellent technical command of web development with a strategic vision",
            },
        },
        learning: {
            title: "I learn fast and teach what I learn",
            description: "I learn the tool the problem calls for, from Deluge to OpenTelemetry or an academic system's API, and leave it documented for the team.",
            practice: "In the degree I went from an expert system to a reactive agent, wrote the same CRUD test by test in six languages and trained a lettuce disease classifier with MobileNetV2. At TIVENOS I set up the observability platform with Prometheus, Loki, Tempo and OpenTelemetry.",
            evidence: {
                testimonial: "darwinCastano",
                excerpt: "He always has an insatiable curiosity to learn new things and guides us through the process.",
            },
        },
        detail: {
            title: "Careful with data",
            description: "I validate, remove duplicates and keep a record before loading or syncing data, because a mismatched record costs more than the check.",
            practice: "The CRM snapshots at TIVENOS log every run, and at ADCOM the bulk operations move large volumes of records in each client's Zoho CRM. At Quipux I cleaned the databases of the collections campaigns, and the Taurus technical test took CSV files to a metrics API.",
            evidence: {
                testimonial: "emmanuelBerrio",
                excerpt: "His meticulous approach and attention to detail have been fundamental to our team's success.",
            },
        },
        team: {
            title: "I share what I know",
            description: "I review code, explain my decisions and write the documentation I would have liked to find.",
            practice: "At SmartPot I am the lead developer of a team of five, at PepperCRM I wrote almost all of the backend for a team of four, and at GoPoli I am the main contributor. In the degree and in the SENA technician program the projects were done in teams of two and three.",
            evidence: {
                testimonial: "paulaVega",
                excerpt: "I highlight his willingness to help others and share his experience",
            },
        },
        initiative: {
            title: "I deliver more than was asked",
            description: "When I close a task I look at what surrounds it, such as the missing monitoring, the test that did not exist or the manual step that can be automated.",
            practice: "At TIVENOS, besides the integrations, I built the observability platform that watches them, an email signature generator for the group's five brands that looks the same in Outlook, Gmail and Apple Mail, and five widgets that live inside Zoho CRM.",
            evidence: {
                testimonial: "danielaBolivar",
                excerpt: "you throw him one ball and he gives you back three",
            },
        },
    },
    reasons: {
        pageLink: "See all eleven reasons",
        counter: "{current} of {total}",
        listLabel: "The eleven reasons",
    },
};
