import type {Content} from "@/types/content";

export const experience: Content["experience"] = {
    title: "Professional Experience",
    subtitle: {
        general: "What I have built and run in production since 2022",
        backend: "The services, APIs and integrations I have built and run since 2022",
        crm: "CRM, automation and integrations at four companies since 2022",
        data: "From a data internship to the dashboards and extracts I maintain today",
        devops: "The servers, deployments and monitoring I have been in charge of",
        fullstack: "Products, interfaces and APIs I have built since 2022",
    },
    current: "Current",
    relevanceNote: "Sorted by relevance to the {role} profile; matching achievements are highlighted.",
    matches: "{count} of {total} relevant",
    projects: "Projects at this company",
    detail: "Read the full experience",
    items: {
        tivenos: {
            title: "IT Manager & Backend Integration Lead",
            summary: {
                general: "Backend and integration lead for an education technology partner that runs Zoho CRM for universities across Latin America and Spain.",
                backend: "I design and run the FastAPI services that connect Zoho CRM with the academic systems of 15+ institutions, from the contract with each system to its deployment and monitoring.",
                crm: "I'm the technical bridge between Zoho CRM and the academic systems of 15+ universities, with integrations, widgets, forms and dashboards for their admissions teams.",
                data: "I keep the admissions data of 15+ institutions in sync between Zoho CRM and their academic systems, and bring it to Zoho Analytics dashboards and to PostgreSQL for analysis.",
                devops: "I publish 20+ services as images on GHCR, deploy them with GitHub Actions to Linux servers and an Azure VM, and watch them with Prometheus, Grafana, Loki and Tempo.",
                fullstack: "Besides the services, I build what people use, such as Zoho CRM widgets, admissions and scholarship forms for the institutions' websites and the email signature service.",
            },
            bullets: [
                {
                    text: "Own 20+ FastAPI integration services (Python, uv, PostgreSQL) that keep Zoho CRM in sync with the academic systems of 15+ education clients in Latin America and Spain, so applicants, payments and enrollments move between both sides without manual entry.",
                    roles: ["backend", "crm"],
                },
                {
                    text: "Integrate student information systems and legacy platforms through REST, SOAP/WS-Security (Zeep), SQL Server readers over VPN, FTP exchanges and webhooks, using Zoho OAuth and the Bulk API. Long syncs run as background jobs that answer 202 Accepted and log every run in the CRM.",
                    roles: ["backend", "crm"],
                },
                {
                    text: "The integration APIs read files, expose each institution's academic hierarchy (units, levels, modalities and programs), receive forms with attachments and sync Zoho WorkDrive, CRM and Forms.",
                    roles: ["backend", "crm"],
                },
                {
                    text: "Ship every service as a hardened Docker image on GHCR, deployed with Docker Compose through GitHub Actions on Linux servers, an Azure VM among them, behind Nginx with SSL.",
                    roles: ["devops", "backend"],
                },
                {
                    text: "Built the observability stack, with OpenTelemetry traces from the FastAPI services to Tempo, metrics in Prometheus, logs in Loki, and Grafana with 4 dashboards, 18 uptime probes and 12 alert rules sent to Telegram.",
                    roles: ["devops"],
                },
                {
                    text: "Built five Zoho CRM widgets with JavaScript, React and the Zoho widget SDK. They include a quote builder that calculates installments and generates the investment plan PDF, an assistant that walks an enrollment through the five PeopleSoft steps, lead capture with bulk import, appointment management and program changes.",
                    roles: ["crm", "fullstack"],
                },
                {
                    text: "Built web forms for admissions, scholarships and family relationships that institutions publish on their websites. They create the lead, update the opportunity, upload documents through the integration services and load the academic offering in cascading selects.",
                    roles: ["fullstack", "crm"],
                },
                {
                    text: "Wrote the snapshot service that bulk-copies Zoho CRM modules into PostgreSQL with the Bulk API, so they can be analyzed outside the CRM.",
                    roles: ["data", "backend"],
                },
                {
                    text: "Built the email signature service (FastAPI and Jinja2) for the group's five brands, with one standard design that renders the same in Outlook, Gmail and Apple Mail.",
                    roles: ["fullstack", "backend"],
                },
                {
                    text: "Design Zoho Analytics dashboards written in SQL and Deluge automations for admissions and sales teams.",
                    roles: ["data", "crm"],
                },
                {
                    text: "Manage IT operations and the team's help desk (tickets, debugging and support), and defined the coding, security and deployment standards the services share.",
                    roles: ["devops", "backend"],
                },
            ],
        },
        adcom: {
            title: "CRM & MarTech Developer",
            summary: {
                general: "CRM and MarTech developer for a marketing agency focused on higher education and consumer brands. I joined in February 2025 as a CRM and web developer, and since June 2025 I also manage the servers that host the agency's internal tools and landing pages.",
                backend: "I write the services behind the agency's campaigns, such as results APIs in Spring Boot, the email automations (nightly results, welcome and birthday), a delivery event receiver and automations on the Zoho API.",
                crm: "I automate Zoho CRM and Zoho Creator for the agency's clients and connect their funnels, so landing pages, forms, WhatsApp, Meta Ads and Google Ads reach the CRM with their source.",
                data: "I prepare each client's bulk loads and data cleanup in Zoho, measure email sends in PostgreSQL and bring every lead to the CRM with the source marketing needs to compare channels.",
                devops: "I run the agency's VPS and the platform that deploys 100+ landing pages, with one Nginx per client, deployments through GitHub Actions and rsync, daily monitoring and a weekly Lighthouse run.",
                fullstack: "I built and maintain 90+ admissions landing pages in React and TypeScript, their forms connected to Zoho and the platform that publishes them.",
            },
            bullets: [
                {
                    text: "Configure Zoho CRM modules, workflows and custom Deluge functions to automate sales and admissions operations.",
                    roles: ["crm"],
                },
                {
                    text: "Built 90+ admissions landing pages and microsites for higher-education campaigns, connected to Zoho Forms and Zoho CRM to capture and route leads.",
                    roles: ["fullstack", "crm"],
                },
                {
                    text: "Built the platform that publishes the landing pages. A reusable GitHub Actions workflow builds each one, checks its path, compresses the files and uploads them with rsync to the VPS, where one Nginx per client serves it without rebuilding images or restarting anything.",
                    roles: ["devops", "fullstack"],
                },
                {
                    text: "Maintain the 100+ landing page repositories with scripts that apply one change to all of them, a daily monitor that checks HTTP status, Google Tag Manager, compression, caching, pending deployments and certificates, and a weekly Lighthouse run on the main landing pages.",
                    roles: ["devops"],
                },
                {
                    text: "Integrate WhatsApp, Meta Ads, Google Ads, Typeform and Shopify with Zoho CRM through REST APIs and webhooks, plus serverless automations on the Zoho API.",
                    roles: ["crm", "backend"],
                },
                {
                    text: "Wrote the bulk operation tools on the Zoho API, with resumable batch loads, links, tags and deletions from CSV, and a client sync between one client's Oracle database and its CRM.",
                    roles: ["crm", "data", "backend"],
                },
                {
                    text: "Developed results APIs and an HTML template generator with Spring Boot and Thymeleaf for national lottery brands.",
                    roles: ["backend", "fullstack"],
                },
                {
                    text: "Automated the emails of the lottery brands. A Python script with Jinja2 builds the nightly results email from the results API and Amazon SES sends it once every draw is in, while the welcome and birthday emails carry the name and segment of the person who receives them.",
                    roles: ["backend", "data"],
                },
                {
                    text: "Built a FastAPI receiver that stores the delivery events of the results emails (Amazon SNS) in PostgreSQL, to measure every send.",
                    roles: ["backend", "data"],
                },
                {
                    text: "Built a real estate agency's lead capture site. A GitHub Actions workflow publishes the inventory of its Wasi account every day before dawn, and requests for advice, contact and visits land in Supabase.",
                    roles: ["fullstack", "devops"],
                },
                {
                    text: "Automated lead contact with AI agents in Dapta and built internal applications in Zoho Creator.",
                    roles: ["crm"],
                },
                {
                    text: "Administer a VPS with Docker, Nginx, SSL, Prometheus, Nagios and n8n that hosts internal tools and automations.",
                    roles: ["devops"],
                },
                {
                    text: "Advise the development, marketing and analytics teams on API integrations, automation flows and data architecture.",
                    roles: ["crm", "data"],
                },
            ],
        },
        muvu: {
            title: "Backend Developer & Data Analyst",
            summary: {
                general: "Data, CRM and backend work for the commercial and operations teams of a study-abroad agency.",
                backend: "I developed components and integrations for the main website of a study-abroad agency and designed how its data entered the CRM.",
                crm: "I was the CRM and Zoho ecosystem analyst of a study-abroad agency. I cleaned up its data and automated the sales team's repetitive work.",
                data: "I built the Power BI reports that the finance, sales and marketing teams of a study-abroad agency used to make decisions, from CRM data I cleaned myself.",
                devops: "Besides the data and CRM work, I ran the servers and IT infrastructure of a study-abroad agency and supported its users.",
                fullstack: "I developed components for the website of a study-abroad agency and service integrations, alongside the data and CRM work.",
            },
            bullets: [
                {
                    text: "Built Power BI reports with DAX for the finance, sales and marketing areas, which supported their strategic decisions.",
                    roles: ["data"],
                },
                {
                    text: "Audited, cleaned and validated CRM data to enable reliable commercial analysis.",
                    roles: ["data", "crm"],
                },
                {
                    text: "Led the automation of repetitive CRM operations to reduce the manual workload of the sales team.",
                    roles: ["crm"],
                },
                {
                    text: "Designed the incoming-data architecture to capture, normalize and transform information inside the CRM.",
                    roles: ["data", "backend"],
                },
                {
                    text: "Developed web components and service integrations for the company's main web platform, which improved its usability and performance.",
                    roles: ["fullstack", "backend"],
                },
                {
                    text: "Grew from data analyst to CRM and Zoho ecosystem analyst, and later IT analyst as well.",
                    roles: ["crm", "devops"],
                },
                {
                    text: "Administered the company's server infrastructure and supported internal users.",
                    roles: ["devops"],
                },
            ],
        },
        quipux: {
            title: "Data Analyst (Internship)",
            summary: {
                general: "Data analysis internship in the revenue-collection automation team.",
                backend: "My first internship, with Python and SQL scripts that cleaned, joined and loaded data for the revenue-collection automation team.",
                crm: "A data internship where I prepared the contact databases and campaigns of the revenue-collection area, with their email and SMS exclusion lists.",
                data: "A data analysis internship with ETL routines, KPI dashboards, tracking notebooks and automated reports for revenue collection and mobility.",
                devops: "A data internship where I automated downloads and repetitive processes with Python and batch scripts.",
                fullstack: "A data analysis internship in revenue collection, my first job in tech, across cleanup, ETL and dashboards.",
            },
            bullets: [
                {
                    text: "Built ETL routines to clean, transform and load data for managerial reports.",
                    roles: ["data"],
                },
                {
                    text: "Automated data processes and periodic reports with Python scripts and BI tools.",
                    roles: ["data", "backend"],
                },
                {
                    text: "Designed dashboards to monitor KPIs in revenue collection and mobility processes.",
                    roles: ["data"],
                },
                {
                    text: "Implemented data extraction and cleaning routines with SQL on relational databases.",
                    roles: ["data"],
                },
                {
                    text: "Wrote Python notebooks with Pandas for the daily tracking of the area's campaigns in several cities and to clean up purchased databases.",
                    roles: ["data"],
                },
                {
                    text: "Maintained the campaigns' email and SMS exclusion lists and automated file downloads, filters and joins to generate them without manual work.",
                    roles: ["data", "crm"],
                },
            ],
        },
    },
};
