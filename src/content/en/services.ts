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
    slider: {
        previousService: "Previous service",
        nextService: "Next service",
        previousBenefit: "Previous reason",
        nextBenefit: "Next reason"
    },
    items: {
        integration: {
            title: "Integration & Backend Engineering",
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
    benefitsTitle: "Why hire me?",
    benefitsSubtitle: "Eleven reasons, each with what a manager or a teammate wrote about working with me",
    benefits: {
        vision: {
            title: "From business need to architecture",
            description: "I start from the decision or process a team needs to change, then choose the architecture and split it into tasks.",
            evidence: {
                testimonial: "felipeCamacho",
                excerpt: "He translates business needs into architecture and concrete tasks, anticipates risks and prioritizes with good judgment.",
            },
        },
        costs: {
            title: "Less manual work",
            description: "I automate repetitive data entry and reporting with CRM workflows, n8n and scripts.",
            evidence: {
                testimonial: "jenniferTuso",
                excerpt: "He is very people-oriented and acts as a facilitator in the continuous improvement of both individual and team processes.",
            },
        },
        integration: {
            title: "Connected data",
            description: "I bring data scattered across spreadsheets, the CRM and web forms together, so every area works from the same records.",
            evidence: {
                testimonial: "tatianaDiaz",
                excerpt: "He also has strong data analysis skills, which allow proper traceability and follow-up of information.",
            },
        },
        autonomy: {
            title: "From question to production",
            description: "I take a problem from the first question to production, keep it running, and learn whatever tool it needs.",
            evidence: {
                testimonial: "lautaroBordoni",
                excerpt: "He is reliable, works steadily and can move his tasks forward without much follow-up.",
            },
        },
        versatility: {
            title: "I speak marketing, finance and IT",
            description: "I work with each team on its own terms, which helps when a project spans all three.",
            evidence: {
                testimonial: "kellyMejia",
                excerpt: "He is a diligent, proactive professional with a great ability to deliver solutions that meet the needs of each area.",
            },
        },
        calm: {
            title: "Calm when something breaks",
            description: "When a service fails, I find the cause in the logs, traces and metrics, fix it, and leave an alert so it shows up sooner next time.",
            evidence: {
                testimonial: "rodrigoSanchez",
                excerpt: "how he approaches problems: no drama, calmly and always looking for solutions",
            },
        },
        business: {
            title: "Technology that serves the business",
            description: "I judge a solution by what it changes for the business, whether that is leads reaching the CRM complete, reports nobody builds by hand or pages that load fast.",
            evidence: {
                testimonial: "danielRodriguez",
                excerpt: "excellent technical command of web development with a strategic vision",
            },
        },
        learning: {
            title: "I learn fast and teach what I learn",
            description: "I learn the tool the problem calls for, from Deluge to OpenTelemetry or an academic system's API, and leave it documented for the team.",
            evidence: {
                testimonial: "darwinCastano",
                excerpt: "He always has an insatiable curiosity to learn new things and guides us through the process.",
            },
        },
        detail: {
            title: "Careful with data",
            description: "I validate, remove duplicates and keep a record before loading or syncing data, because a mismatched record costs more than the check.",
            evidence: {
                testimonial: "emmanuelBerrio",
                excerpt: "His meticulous approach and attention to detail have been fundamental to our team's success.",
            },
        },
        team: {
            title: "I share what I know",
            description: "I review code, explain my decisions and write the documentation I would have liked to find.",
            evidence: {
                testimonial: "paulaVega",
                excerpt: "I highlight his willingness to help others and share his experience",
            },
        },
        initiative: {
            title: "I deliver more than was asked",
            description: "When I close a task I look at what surrounds it, such as the missing monitoring, the test that did not exist or the manual step that can be automated.",
            evidence: {
                testimonial: "danielaBolivar",
                excerpt: "you throw him one ball and he gives you back three",
            },
        },
    },
};
