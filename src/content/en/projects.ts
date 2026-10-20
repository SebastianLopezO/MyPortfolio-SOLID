import type {Content} from "@/types/content";

export const projects: Content["projects"] = {
    title: "Projects & Organizations",
    subtitle: {
        general: "Products, work and coursework, with what I have built and where the code lives",
        backend: "The APIs, integrations and services I have built, from production to university",
        crm: "CRM funnels, widgets and automations, and the products behind them",
        data: "Data pipelines, extracts and analysis, at work and at university",
        devops: "The deployment, observability and infrastructure platforms I built and run",
        fullstack: "Complete products, from the database to the screen",
    },
    featured: "Featured project",
    categoriesLabel: "Kinds of project",
    categories: {
        product: {
            label: "Products",
            description: "Products built in a team or on my own, with their code and, when there is one, their demo."
        },
        work: {
            label: "Work",
            description: "What I built at the companies where I work and have worked. The code is private and clients stay anonymous; each page explains the architecture."
        },
        education: {
            label: "Education",
            description: "The degree, the diploma, the technical program and high school, one repository at a time."
        },
    },
    slider: {previous: "Previous project", next: "Next project"},
    readProject: "View the project",
    privateCode: "Private code",
    recreation: "Recreated with fictional data",
    organizationsTitle: "GitHub Organizations",
    organizationsSubtitle: "Where my code lives, across work, products and education",
    organizationPage: "See activity",
    organizationsIndex: "All organizations, with my commits in each",
    repositories: "repositories",
    members: "members",
    private: "Private",
    showMetrics: "Show metrics",
    techExplorer: {
        hint: "Pick a technology to see the projects that use it.",
        usedIn: "Projects with {tech} ({count})",
        noOther: "No other project in the portfolio uses {tech}.",
        none: "No project in the portfolio uses {tech}.",
    },
    items: {
        smartpot: {
            name: "SmartPot",
            context: "SmartPotTech · university team project",
            summary: "IoT platform that monitors and automates hydroponic crops, split into 11 repositories and built by a team of five in which I'm the lead developer.",
            screen: "SmartPot overview with average crop health, crops online, alerts and the assistant's suggested actions for all crops",
            highlights: [
                {
                    text: "MicroPython firmware for the ESP32 that publishes sensor readings over MQTT with TLS, plus a simulator that feeds the demo with real weather and no hardware.",
                    roles: ["backend", "devops"]
                },
                {
                    text: "Spring Boot 4 API on Java 21 with MongoDB, Redis, JWT and OpenAPI, 130+ JUnit tests, which checks who owns each crop and each device.",
                    roles: ["backend"]
                },
                {
                    text: "FastAPI and scikit-learn assistant that diagnoses each crop with an expert system, fuzzy logic and models that forecast when a reading will leave its range.",
                    roles: ["data", "backend"]
                },
                {
                    text: "React 19 and TypeScript PWA, built with Vite 8 and Tailwind 4, that shows each reading against its ideal range and lets the assistant act.",
                    roles: ["fullstack"]
                },
                {
                    text: "Hardened images on GHCR, Kubernetes manifests and a production deployment with Docker Compose and GitHub Actions; in September 2026 I rebuilt the platform after production went down.",
                    roles: ["devops"]
                },
                {
                    text: "I wrote 2,273 of the 2,446 non-automated commits across the 11 repositories (93%).",
                    roles: ["backend", "fullstack"]
                },
            ],
        },
        gopoli: {
            name: "GoPoli",
            context: "GoPoli · university team project",
            summary: "Ride-sharing platform for students at Politécnico Colombiano Jaime Isaza Cadavid, where I'm the main contributor.",
            screen: "GoPoli in the browser during a trip, with the route drawn over the map of Medellín and the trip in progress panel beside the side menu",
            highlights: [
                {
                    text: "Next.js 16 PWA with Leaflet maps, OSRM routes that fall back to a straight line when the router fails, and a chat for every trip.",
                    roles: ["fullstack"]
                },
                {
                    text: "Spring Boot 4 REST API with JWT and BCrypt, with business rules in small, tested policy classes.",
                    roles: ["backend"]
                },
                {
                    text: "A PostgreSQL 16 image that owns the schema, which the API validates against and refuses to start on a mismatch.",
                    roles: ["backend"]
                },
                {
                    text: "I split the original repository into one per component, keeping each one's history, and scanned the whole history for leaked secrets.",
                    roles: ["devops", "backend"]
                },
                {
                    text: "Every image ships to GHCR with an SBOM and provenance, and one central workflow deploys over SSH and checks /health from outside, alongside CI, CodeQL and Dependabot.",
                    roles: ["devops"]
                },
                {
                    text: "41 tests in the API, 18 in the web app and a 31-step smoke test.",
                    roles: ["backend", "fullstack"]
                },
            ],
        },
        peppercrm: {
            name: "PepperCRM",
            context: "PepperTechDev · team product",
            summary: "A CRM built by a team of four to manage leads, tasks and communications, where I wrote almost all of the backend.",
            screen: "PepperCRM's real frontend with its repository's sample data, showing the task board with To Do, In Progress and Done columns, and the menu of leads, contacts, deals, products, vendors and quotes.",
            highlights: [
                {
                    text: "Spring Boot API on Java 17 organized by business modules such as users, leads, tasks, tags, comments, files, messages and email.",
                    roles: ["backend", "crm"]
                },
                {
                    text: "Security with Spring Security and JWT, a rate-limiting filter and CORS configured per environment.",
                    roles: ["backend"]
                },
                {
                    text: "MongoDB Atlas as the database, Redis as the cache and an asynchronous mail service for notifications.",
                    roles: ["backend"]
                },
                {
                    text: "React and Vite frontend with a kanban board to move leads between stages, plus task management.",
                    roles: ["fullstack", "crm"]
                },
                {
                    text: "Swagger documentation, images on Docker Hub deployed to Render through a deploy hook, and Kubernetes manifests in progress.",
                    roles: ["devops"]
                },
                {text: "I wrote 152 of the 154 commits people made to the API.", roles: ["backend"]},
            ],
        },
        portfolio: {
            name: "MyPortfolio",
            context: "Personal project",
            summary: "This site is a bilingual React and TypeScript portfolio with prerendered pages, a view per role, a page for every project and an assistant that answers in the browser.",
            screen: "This portfolio's real home page in the full-stack view, with availability, name, role, summary and the profile switcher.",
            highlights: [
                {
                    text: "Static prerendering of every view and every project, with per-route SEO, structured data, a sitemap and Open Graph images.",
                    roles: ["fullstack"]
                },
                {
                    text: "Each section loads its code and its copy separately, under budgets that CI checks for the startup JavaScript, the weight of each chunk and what the first paint needs.",
                    roles: ["fullstack", "devops"]
                },
                {
                    text: "Six role views that rewrite the copy, reorder the sections and bring forward what each profile looks for.",
                    roles: ["fullstack"]
                },
                {
                    text: "The GitHub figures come, on every CI build, from the stats my profile repository generates every day.",
                    roles: ["devops", "data"]
                },
                {
                    text: "An unprivileged Nginx image on GHCR, deployed with Docker Compose, and production checks with Playwright and Lighthouse after every deployment.",
                    roles: ["devops"]
                },
                {
                    text: "An assistant that answers questions about my profile by searching the site's own content, without calling any outside service.",
                    roles: ["fullstack"]
                },
            ],
        },
        taurus: {
            name: "Taurus Technical Test",
            context: "TaurusSebastian-s · technical test",
            summary: "A data technical test I took from raw CSV files to a metrics API and an interactive dashboard.",
            screen: "Taurus's real frontend with sample data, showing the AG Grid aggregate tables of quotes, new business, conversion and premiums by tenant and by agent.",
            highlights: [
                {
                    text: "Loading the CSV files into MySQL and MariaDB, with exploratory analysis in Pandas inside a notebook.",
                    roles: ["data"]
                },
                {
                    text: "FastAPI metrics API with async SQLAlchemy that groups the data by tenant, agent and state.",
                    roles: ["backend", "data"]
                },
                {
                    text: "React and TypeScript dashboard with an AG Grid table to explore the records.",
                    roles: ["fullstack"]
                },
                {text: "Plotly.js charts to compare the metrics of each group.", roles: ["data", "fullstack"]},
            ],
        },
        integrationPlatform: {
            name: "Integration Platform",
            context: "TIVENOS · education technology",
            summary: "20+ FastAPI services that keep Zoho CRM in sync with the academic systems of 15+ institutions in Latin America and Spain.",
            screen: "Recreation of an integration service's OpenAPI documentation, with the form and CRM routes, the academic offer, the catalogs and the background jobs, and an example 202 response with its idempotency key.",
            highlights: [
                {
                    text: "One service per institution on a shared standard, with logic-free routers, controllers that normalize the data and a single access layer for each external system.",
                    roles: ["backend"]
                },
                {
                    text: "Connects PeopleSoft Campus Solutions over SOAP with WS-Security, SQL Server databases behind a VPN, CSV files over FTP, REST APIs and webhooks.",
                    roles: ["backend", "crm"]
                },
                {
                    text: "Long syncs answer 202 Accepted, run in the background and leave a record of every run in the CRM with its outcome and duration.",
                    roles: ["backend", "crm"]
                },
                {
                    text: "The newest services use idempotency keys, staggered retries when Zoho answers 429, jobs persisted in PostgreSQL and secrets encrypted with AES-256-GCM.",
                    roles: ["backend", "devops"]
                },
                {
                    text: "Every service ships as a hardened image on GHCR and stays watched with traces, metrics, logs and alerts that reach Telegram.",
                    roles: ["devops"]
                },
            ],
        },
        observability: {
            name: "Observability Platform",
            context: "TIVENOS · infrastructure",
            summary: "The stack that watches the integration services and the servers they run on, with metrics, logs, traces, probes and alerts in one place.",
            screen: "Recreation of the Grafana dashboard of the integration services, with 26 Prometheus jobs, 18 uptime probes, 12 alert rules, requests and latency per service, the state of each probe and recent Loki logs.",
            highlights: [
                {
                    text: "Prometheus scrapes 26 jobs across the instrumented FastAPI services, the containers through cAdvisor, the machines through Node Exporter and Nginx through its exporter.",
                    roles: ["devops"]
                },
                {
                    text: "18 Blackbox Exporter probes check from outside that every service and every domain answers, and that their TLS certificates are not about to expire.",
                    roles: ["devops"]
                },
                {
                    text: "Promtail ships the container logs to Loki through a read-only proxy of the Docker socket, and Tempo receives the services' OpenTelemetry traces.",
                    roles: ["devops", "backend"]
                },
                {
                    text: "Grafana holds 4 dashboards (Docker, FastAPI, machine and Nginx) and 12 alert rules, among them 500 errors in the integrations, containers restarting in a loop, disk and CPU, which reach Telegram.",
                    roles: ["devops"]
                },
                {
                    text: "Everything runs in Docker Compose next to the services, with 15 days of retention in Prometheus.",
                    roles: ["devops"]
                },
            ],
        },
        crmWidgets: {
            name: "Zoho CRM Widgets",
            context: "TIVENOS · tools for sales teams",
            summary: "Five widgets that live inside Zoho CRM to build quotes, enroll, capture leads, book appointments and change programs without leaving the record.",
            screen: "Recreation of the price quoter inside a CRM deal, with payment plan, scholarship, partner discount and a promotion cut by the 80% cap, the breakdown of each payment and the buttons for the PDF and for applying the quote.",
            highlights: [
                {
                    text: "A quote builder that simulates the payment plan in the browser, applies discounts within their cap, generates the investment plan PDF and only writes to the CRM on confirmation.",
                    roles: ["crm", "fullstack"]
                },
                {
                    text: "A React enrollment assistant that runs, in order, the five Deluge functions that talk to PeopleSoft Campus Solutions, validates the data before each step and translates the academic system's errors.",
                    roles: ["crm", "fullstack", "backend"]
                },
                {
                    text: "Lead capture from a campaign, one by one or as a bulk import with a template, column mapping and a review before importing.",
                    roles: ["crm"]
                },
                {
                    text: "Appointment management on the CRM's events to create, reschedule, cancel and record the outcome, with business permissions that block the action when they cannot confirm a role.",
                    roles: ["crm"]
                },
                {
                    text: "Program changes create the new opportunity before closing the old one and leave a record, with staggered retries against the API limits.",
                    roles: ["crm", "backend"]
                },
            ],
        },
        admissionsForms: {
            name: "Admissions and Scholarship Web Forms",
            context: "TIVENOS · forms for institutional websites",
            summary: "Forms that institutions publish on their websites so an applicant can register, complete the application and upload documents, connected to the CRM through the integration services.",
            screen: "Recreation of the Program step of an admission form, with six cascading lists (unit, level, mode, schedule, term and program) and the summary of the application with the verified phone number.",
            highlights: [
                {
                    text: "A multi-page flow that goes from lead registration to the full application that updates the opportunity, document upload and a thank-you page.",
                    roles: ["fullstack", "crm"]
                },
                {
                    text: "Cascading selects that load each institution's offering (unit, level, modality, schedule, term and program) from the academic hierarchy API.",
                    roles: ["fullstack", "backend"]
                },
                {
                    text: "A shared script for the CRM's web forms that keeps the UTM parameters in hidden fields and preselects the program from the URL.",
                    roles: ["crm", "data"]
                },
                {
                    text: "Versions for undergraduate, graduate and continuing education, plus scholarship and family-relationship forms for the processes that need them.",
                    roles: ["crm", "fullstack"]
                },
                {
                    text: "Validation in the browser, clear messages with SweetAlert2 and search in long lists with Select2.",
                    roles: ["fullstack"]
                },
            ],
        },
        crmSnapshots: {
            name: "CRM Snapshots",
            context: "TIVENOS · data",
            summary: "A service that bulk-copies Zoho CRM modules into PostgreSQL so they can be analyzed with SQL outside the CRM, and logs every run.",
            screen: "Recreation of a SQL client on the snapshot database, with one table per CRM module, a query on the run log and another of deals by stage, with the latest snapshot of each module completed.",
            highlights: [
                {
                    text: "Uses Zoho's Bulk Read API to request each module's export, wait for the ZIP file, unpack it and load the CSV into PostgreSQL.",
                    roles: ["data", "backend"]
                },
                {
                    text: "Covers the modules an institution's analysis needs, among them leads, deals, contacts, campaigns, notes and users.",
                    roles: ["data", "crm"]
                },
                {
                    text: "Every run lands in a log table with the module, the date, the client and its status.",
                    roles: ["data"]
                },
                {
                    text: "The current version is a FastAPI API with key authentication and Prometheus metrics, deployed in Docker.",
                    roles: ["backend", "devops"]
                },
            ],
        },
        emailSignatures: {
            name: "Email Signatures",
            context: "TIVENOS · internal tool",
            summary: "A signature generator for the group's five brands that looks the same in Outlook, Gmail and Apple Mail.",
            screen: "Recreation of the signature generator with a fictional brand and person, with the form on the left and the signature inside an email, the text logo, the contact details and the badge.",
            highlights: [
                {
                    text: "A FastAPI and Jinja2 service with a form, a catalog per brand and theme, an .htm download for Outlook and a batch mode that turns a CSV into a ZIP with one signature per person.",
                    roles: ["fullstack", "backend"]
                },
                {
                    text: "Every logo ships twice, as a hosted image for modern clients and as the brand name in text for desktop Outlook, which renders with Word.",
                    roles: ["fullstack"]
                },
                {
                    text: "The fallback name is measured with an Arial Bold width table and shrinks one pixel at a time until it fits its column.",
                    roles: ["fullstack"]
                },
                {
                    text: "An audit renders every combination of brand, theme and badge and fails on anything an email client would break.",
                    roles: ["backend"]
                },
            ],
        },
        martech: {
            name: "University Admissions Funnel",
            context: "ADCOM · marketing agency",
            summary: "More than 90 admissions landing pages for five higher-education institutions that send every lead to Zoho CRM with the campaign that brought it.",
            screen: "Recreation of an admissions landing page for a fictional university with its form, next to the UTM fields that travel with the lead, the Zoho Forms post, the conversion event and the redirect to the thank-you page.",
            highlights: [
                {
                    text: "React, TypeScript and Vite landing pages that capture UTM parameters, block double submissions, post to Zoho Forms and send the conversion event to Google Tag Manager.",
                    roles: ["fullstack", "crm"]
                },
                {
                    text: "WhatsApp, Meta Ads and Google Ads connected to the CRM through webhooks and REST, with Deluge functions and Zoho Creator apps for the sales teams.",
                    roles: ["crm"]
                },
                {text: "Lead contact with AI agents in Dapta.", roles: ["crm"]},
                {
                    text: "On postgraduate pages, the form asks for the applicant's level of studies and the answer reaches the CRM with the lead.",
                    roles: ["crm", "fullstack"]
                },
                {
                    text: "One Nginx gateway per client serves each program's page under its own path, on the institution's domain.",
                    roles: ["fullstack"]
                },
            ],
        },
        landingPlatform: {
            name: "Landing Page Deployment Platform",
            context: "ADCOM · infrastructure",
            summary: "The infrastructure that publishes, watches and maintains 100+ landing pages for several clients on one VPS, without restarting anything on each deployment.",
            screen: "Recreation of a run of a landing page's deploy workflow, with install, build, check, compression, SSH with a pinned host key, two-phase rsync and the check that the public site serves the commit.",
            highlights: [
                {
                    text: "Each landing page calls a reusable GitHub Actions workflow that installs, builds, checks the base path, gzips the files, generates WebP images and uploads the result with rsync in two phases.",
                    roles: ["devops", "fullstack"]
                },
                {
                    text: "The deployment logs in as a user without a shell, confined with rrsync and with a pinned host key, and each client's Nginx mounts its landing pages read-only.",
                    roles: ["devops"]
                },
                {
                    text: "A single Nginx block serves any registered landing page, with assets immutable for a year, uncached HTML, WebP by negotiation and the Google Tag Manager tags injected on the server.",
                    roles: ["devops", "fullstack"]
                },
                {
                    text: "Scripts that apply one change to all 106 repositories (deploy workflow, Dependabot policy, environment files) and generate each client's Nginx configuration.",
                    roles: ["devops"]
                },
                {
                    text: "A daily monitor checks HTTP status, the HTML, a single Google Tag Manager tag, compression, caching, pending deployments and certificates, and opens an issue when something fails; Lighthouse measures the main landing pages every week.",
                    roles: ["devops"]
                },
                {
                    text: "Commit markers to push without deploying, and documented rollback paths for a landing page, for a client's Nginx and for the repositories' history.",
                    roles: ["devops"]
                },
            ],
        },
        emailAutomations: {
            name: "Hyper-Personalized Email at Scale",
            context: "ADCOM · lottery brands",
            summary: "Nightly results for two lottery brands plus welcome and birthday emails, each one carrying the name and segment of the person who receives it.",
            screen: "Recreation of a fictional lottery's daily results email in an inbox, with one email per day, the date in the subject and the results of eight draws.",
            highlights: [
                {
                    text: "A Python script queries the results API, fills a Jinja2 template that holds only variables and writes the HTML ready for the Amazon SES template.",
                    roles: ["backend"]
                },
                {
                    text: "Emails that a subscriber event triggers, such as the welcome and the birthday greeting.",
                    roles: ["crm", "backend"]
                },
                {
                    text: "Recipients come from a Zoho Analytics view through its bulk export API; each email carries the person's name and segment, and a column of the file can assign another template.",
                    roles: ["data", "crm"]
                },
                {
                    text: "When a draw is not published yet, the script exits with its own code and the pipeline retries every 10 minutes, up to 9 times, before sending what was published.",
                    roles: ["backend", "devops"]
                },
                {
                    text: "Sending spreads the emails across several workers with a per-second limit and, when Amazon SES asks to slow down, waits a random time that grows with each attempt.",
                    roles: ["backend"]
                },
                {
                    text: "It notices when the history's pagination returns repeated rows and asks for the day again with other page sizes until it is complete.",
                    roles: ["backend", "data"]
                },
                {
                    text: "The email weighs 55 to 75 KB, under the size at which Gmail clips it, and the subject carries the date so Gmail does not thread every day's send together.",
                    roles: ["fullstack"]
                },
                {
                    text: "A FastAPI receiver with asyncpg stores in PostgreSQL the delivery events Amazon SNS reports for each email.",
                    roles: ["backend", "data"]
                },
                {
                    text: "A Spring Boot API with Thymeleaf exposes the same results as JSON and as an HTML template.",
                    roles: ["backend"]
                },
            ],
        },
        zohoToolkit: {
            name: "Zoho Bulk Operations Toolkit",
            context: "ADCOM · CRM automation",
            summary: "Python scripts and notebooks that move large volumes of records in each client's Zoho CRM, across loads, links, tags, deletions and syncs.",
            screen: "Recreation of a Jupyter notebook that bulk-loads leads. It cleans a CSV, creates the Bulk Write API job, waits with a resume point, sums up created, updated and failed records, and links and tags them.",
            highlights: [
                {
                    text: "Splits the CSV files, uploads them as ZIP to the Bulk Write API, creates the jobs, checks their status and resumes them if something breaks.",
                    roles: ["crm", "data", "backend"]
                },
                {
                    text: "Links, tags and deletes records in bulk from a CSV, and prepares imports in Jupyter notebooks.",
                    roles: ["crm", "data"]
                },
                {text: "Syncs the customers of one client's Oracle database with its CRM.", roles: ["crm", "backend"]},
                {
                    text: "Assigns codes and prepares a campaign's SMS sends, and analyzes the segments before each send.",
                    roles: ["crm", "data"]
                },
                {
                    text: "A Flask service copies each property's photos from Zoho CRM to one client's real estate platform.",
                    roles: ["crm", "backend"]
                },
            ],
        },
        realEstateSite: {
            name: "Real Estate Landing with a Synced Inventory",
            context: "ADCOM · real estate agency",
            summary: "A real estate agency's lead capture site, which shows the properties the company already keeps in Wasi, synced every day before dawn, and takes requests for advice, contact and visits.",
            screen: "Recreation of a fictional agency's listing, with filters by operation, type, city and price, cards with badges and the summary of the last sync with Wasi.",
            highlights: [
                {
                    text: "Every day before dawn, a GitHub Actions workflow downloads the inventory from the Wasi API, publishes only the available properties and, when something changed, commits and starts the deployment.",
                    roles: ["devops", "backend"]
                },
                {
                    text: "The listing and its filters read a columnar index of 25 fields per property; each property's full record lives in its own file, fetched when its page opens.",
                    roles: ["fullstack", "backend"]
                },
                {text: "When a property leaves Wasi, the next sync deletes its detail file.", roles: ["backend"]},
                {
                    text: "Requests for advice, contact and visits reach a Supabase Edge Function that validates them and stores them in PostgreSQL.",
                    roles: ["fullstack", "backend"]
                },
                {
                    text: "Mortgage and buying capacity calculators with the fixed installment of a French amortization, and a yield calculator that takes vacancy and building fees out of the rent.",
                    roles: ["fullstack"]
                },
                {
                    text: "It ships to the agency's VPS with the same deployment workflow as the admissions landing pages.",
                    roles: ["devops"]
                },
            ],
        },
        collectionAutomation: {
            name: "Collection Campaign Automation",
            context: "Quipux · data internship",
            summary: "The scripts and notebooks I wrote during the internship to track the campaigns of the revenue-collection area and clean up its databases.",
            screen: "Recreation of a notebook that tracks collection campaigns by matching a purchased database against the email and SMS exclusion lists, counting who can be contacted and summing up, per campaign, how many paid.",
            highlights: [
                {text: "Pandas notebooks for the daily tracking of the campaigns in several cities.", roles: ["data"]},
                {text: "Cleaning and joining purchased databases before using them in a campaign.", roles: ["data"]},
                {text: "Email and SMS exclusion lists updated with every send.", roles: ["data", "crm"]},
                {
                    text: "Automatic downloads, filters and file splitters with Python and batch scripts, and generating and fixing the files of each campaign.",
                    roles: ["data", "devops"]
                },
                {text: "The analysis of the 2023 collection payments.", roles: ["data"]},
            ],
        },
        engineering: {
            name: "Computer Engineering",
            context: "Politécnico Colombiano Jaime Isaza Cadavid · 2022 – 2027",
            summary: "The whole degree in one GitHub organization, with a repository per course, from the first pseudocode to distributed systems, networks on Cisco hardware, artificial intelligence and computer vision.",
            screen: "The real confusion matrix of the lettuce disease detector, from the computer vision course, next to its per-class metrics.",
            highlights: [
                {
                    text: "In distributed and parallel programming, a multiplayer bingo over TCP sockets with threads, a school system in Spring Boot with a GraphQL layer in FastAPI and React, and a Sudoku solved over RMI.",
                    roles: ["backend", "fullstack"]
                },
                {
                    text: "In artificial intelligence and data, a CLIPS expert system, fuzzy logic, genetic algorithms, music, wine and image classifiers, and lettuce disease detection with computer vision.",
                    roles: ["data"]
                },
                {
                    text: "In networks and systems, real Cisco routers with OSPF, EIGRP and IPv6, SNMP monitoring, memory and scheduling algorithms on Linux, and ARM assembly.",
                    roles: ["devops"]
                },
                {
                    text: "In software engineering, test-driven development in six languages (111 tests), design patterns, SQL and NoSQL databases, and a full-stack store with Spring Boot, React and MongoDB in Docker Compose.",
                    roles: ["backend", "fullstack"]
                },
                {
                    text: "In the foundations, algorithms, data structures (lists, trees, graphs and sparse matrices), automata drawn with Graphviz and programming marathons.",
                    roles: ["backend"]
                },
            ],
        },
        cybersecurityLabs: {
            name: "Cybersecurity Labs",
            context: "Cybersecurity Diploma · Politécnico JIC · 2026",
            summary: "Three lab reports from the diploma, from reconnaissance with Nmap to privilege escalation, and the analysis of a cyberattack with its response plan.",
            screen: "The first lab's real terminal, with the Nmap scan of all 65,535 ports that finds port 21 open with vsftpd 2.3.4.",
            highlights: [
                {
                    text: "Lab 1: reconnaissance of a vulnerable machine on an isolated Docker network, with Nmap scans from less to more detail until vsftpd 2.3.4 shows up, and research into its backdoor.",
                    roles: ["devops"]
                },
                {
                    text: "Lab 2: the analysis of a phishing attack that ends in double-extortion ransomware, its threats and vulnerabilities, the confidentiality, integrity and availability principles, a role-based access control matrix and a secure cloud architecture.",
                    roles: ["devops"]
                },
                {
                    text: "Lab 3: a complete CTF, from reconnaissance and an information leak to authorized brute force with Hydra and privilege escalation, plus a controlled availability test on WordPress with ApacheBench and wrk.",
                    roles: ["devops", "backend"]
                },
                {
                    text: "Controls aligned with ISO/IEC 27001, the NIST CSF and the SP 800-61 and SP 800-34 guides, and with Colombia's data protection law.",
                    roles: ["devops"]
                },
                {
                    text: "Each report documents its safety conditions, its environment and its evidence with numbered screenshots; the third one verifies its outputs with SHA-256.",
                    roles: ["devops"]
                },
            ],
        },
        technical: {
            name: "Software Programming Technician",
            context: "SENA – IUSH · 2022 – 2023",
            summary: "The technical program's projects, built in a team of two, from a web system to book university spaces to tools in C#.",
            screen: "SitePersist's real home page served locally with PHP, with the buttons to sign in as a user or an administrator.",
            highlights: [
                {
                    text: "SitePersist, a PHP and MySQL web system to book IUSH spaces and equipment from any device, with a gallery and an inventory.",
                    roles: ["fullstack", "backend"]
                },
                {
                    text: "Its admin site, where requests and the inventory are managed, published on Heroku.",
                    roles: ["fullstack"]
                },
                {
                    text: "The documentation of the problem, the goals, the state of the art and the proposal behind the system.",
                    roles: ["fullstack"]
                },
                {
                    text: "VideoToAscii, which turns a video into an ASCII character animation, and a console calculator in C# on .NET 6.",
                    roles: ["backend"]
                },
            ],
        },
        vocational: {
            name: "Technical High School",
            context: "Pascual Bravo and INEM · 2019 – 2021",
            summary: "The first projects, built in teams during technical high school, with PHP websites, Excel macros and small programs in Java and Python.",
            screen: "The Company Dream's real home page served locally with PHP, showing the menu and the promise of a free digital payroll to start a business.",
            highlights: [
                {
                    text: "PHP, HTML and CSS websites, among them one for a fictional company built as a team and one with a login and a panel to manage prices.",
                    roles: ["fullstack"]
                },
                {
                    text: "A bingo game and a bitmap color converter built in Excel with Visual Basic macros.",
                    roles: ["data"]
                },
                {
                    text: "An Android calculator in Java and a Python program that computes the moves of a chess knight.",
                    roles: ["fullstack", "backend"]
                },
                {text: "A Python guide in a Jupyter notebook.", roles: ["data"]},
            ],
        },
        lettuceDiseases: {
            name: "Lettuce Disease Detector",
            context: "Computer Engineering · Computer vision · 2026",
            summary: "An image classifier built on MobileNetV2 that tells healthy lettuce, weeds and six diseases apart, meant for SmartPot, with an evaluation that shows where it fails.",
            screen: "The model's real confusion matrix next to its metrics, with 97.9% accuracy, 65.7% average recall per class and the recall of each of the eight classes.",
            highlights: [
                {
                    text: "MobileNetV2 with transfer learning on Kaggle's Lettuce Diseases dataset, with eight classes.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "97.9% accuracy on 2,337 test images, with the confusion matrix and the per-class report kept in the repository.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "Average recall per class is 65.7%, because the six diseases have between 6 and 30 test images each and the model gets between a third and two thirds of them right.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "A Python package with training, evaluation and prediction scripts, set up with uv and tested on its configuration and dataset.",
                    roles: [
                        "data",
                        "backend"
                    ]
                },
                {
                    text: "It exports the model and its artifacts so it can be wired to SmartPot's crops later.",
                    roles: [
                        "data"
                    ]
                }
            ]
        },
        radarImaging: {
            name: "Sentinel-1 Radar Imaging",
            context: "Computer Engineering · Computer vision · 2026",
            summary: "Ten radar images of a coastal area, filtered, clustered with K-Means and turned into a dataset, plus two restoration models that could not improve on the input.",
            screen: "Three real outputs of the guide, which are the rescaled radar image, the same image with the Lee filter and the three-class K-Means clustering that separates water, vegetation and buildings.",
            highlights: [
                {
                    text: "Ten monthly Sentinel-1 images in VV polarization, from May 2025 to February 2026, rescaled and filtered with a 7 × 7 Lee filter.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "K-Means with k = 3 and k = 4 on the filtered and unfiltered images, and a water versus land mask built from the clusters.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "The ten dates, aligned and averaged, make a noise-free reference; 512 × 512 patches are cut from each pair for training.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "In scene classification, ResNet50 with transfer learning reached 99.58% accuracy, while a sequential CNN trained from scratch overfit and collapsed to a single class.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "An autoencoder and SwinIR to reduce speckle, which both lowered PSNR and SSIM against the input, and the report says so.",
                    roles: [
                        "data"
                    ]
                }
            ]
        },
        schoolServices: {
            name: "Cambridge School: REST, GraphQL and React",
            context: "Computer Engineering · Distributed programming · 2025",
            summary: "A school's areas, offices, classrooms and staff in a Spring Boot API, with a GraphQL layer in FastAPI on top and a React frontend.",
            screen: "The project's real frontend with sample data, showing the school's staff list with each person's document, area, office, employee type and teacher type.",
            highlights: [
                {
                    text: "A REST API in Spring Boot 3 with Java 21, JPA and H2: CRUD for areas, offices, classrooms and staff, and a report of staff per area.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "Each employee belongs to an area and has an office; they can be administrative staff or teachers, and teachers are either permanent or contractors.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "A GraphQL layer with FastAPI and Strawberry that calls the REST API with httpx and exposes queries and mutations over the same data.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "A React 19 and Vite frontend with lists, forms and the report, connected to the API with Axios.",
                    roles: [
                        "fullstack"
                    ]
                },
                {
                    text: "Built in a team of three, where 18 of the project's 22 commits are mine.",
                    roles: [
                        "backend",
                        "fullstack"
                    ]
                }
            ]
        },
        fashionLine: {
            name: "FashionLine: Inventory on MongoDB",
            context: "Computer Engineering · NoSQL databases · 2024",
            summary: "A fashion store's inventory, with a Spring Boot API with JWT on MongoDB, a React frontend and all three parts packaged as Docker images.",
            screen: "FashionLine's real frontend with sample data, with the product table showing price, category, size, stock and the edit and delete buttons.",
            highlights: [
                {
                    text: "A Spring Boot REST API with Spring Data MongoDB, documented with Swagger, with products searchable by name, size and category.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "Sign-in with Spring Security and JWT; the frontend stores the token, verifies it on load and sends it with every request.",
                    roles: [
                        "backend",
                        "fullstack"
                    ]
                },
                {
                    text: "A React, TypeScript and Vite frontend with the product table and its create, edit and delete actions.",
                    roles: [
                        "fullstack"
                    ]
                },
                {
                    text: "Three Docker images published on Docker Hub, for the API, the MongoDB database with a script that loads initial data, and the frontend.",
                    roles: [
                        "devops"
                    ]
                },
                {
                    text: "In production, the database on MongoDB Atlas, the API on Render and the frontend on Netlify.",
                    roles: [
                        "devops"
                    ]
                }
            ]
        },
        tddPolyglot: {
            name: "TDD in Six Languages",
            context: "Computer Engineering · Testing and configuration management · 2026",
            summary: "The same CRUD written test by test in C#, Python, React, PHP, Rust and Go, plus the JUnit 5 exercises, in eight suites and 137 test cases that run in Docker.",
            screen: "The assignment's real page, with the table of test cases per project, from the JUnit 5 calculators to the CRUDs in C#, Python, React, PHP, Rust and Go.",
            highlights: [
                {
                    text: "A playlist CRUD built with TDD in six languages, which are C# with xUnit, Python with pytest, React with Vitest, PHP with PHPUnit, and Rust and Go with their own test tools.",
                    roles: [
                        "backend",
                        "fullstack"
                    ]
                },
                {
                    text: "All six share the model, with a validated entity, an in-memory repository, ids assigned by the repository and two kinds of error, and tests named the same way everywhere.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "The JUnit 5 guide exercises in Java and Kotlin, and unit versus integration tests with Mockito.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "A docker-compose file with one service per language that runs the eight suites without installing any SDK.",
                    roles: [
                        "devops"
                    ]
                },
                {
                    text: "A presentation page with the code, the tests and their runs, which can also run each suite live, locally or in Docker.",
                    roles: [
                        "fullstack",
                        "devops"
                    ]
                }
            ]
        },
        aiTechniques: {
            name: "Artificial Intelligence: From Rules to an Agent",
            context: "Computer Engineering · Artificial intelligence · 2025 – 2026",
            summary: "The course's four modules, with an expert system and a fuzzy one for candlestick charts, genetic algorithms, models for SmartPot and a reactive agent with its dashboard.",
            screen: "The agent's real Streamlit dashboard with lettuce selected, showing three anomalies detected and the actions it fires, such as turning on the fans and the water cooler and diluting the solution.",
            highlights: [
                {
                    text: "An expert system in CLIPS, called from Python with clipspy and with a Tkinter interface, that recognizes bullish and bearish engulfing patterns in two candlesticks.",
                    roles: [
                        "data",
                        "backend"
                    ]
                },
                {
                    text: "A fuzzy logic system with scikit-fuzzy that uses the candle sizes and the engulfing difference to recommend investing a little, a normal amount or a lot.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "Genetic algorithms that rebuild an image's color from its grayscale version, and that optimize a skydiver's jump to land on a given point.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "For SmartPot, a logistic regression that controls the fans and a neural network that doses pH, with desktop and Streamlit versions.",
                    roles: [
                        "data"
                    ]
                },
                {
                    text: "A reactive agent with a Streamlit dashboard that compares each reading with the crop's ranges, tomato or lettuce, and decides which actuators to turn on.",
                    roles: [
                        "data",
                        "backend"
                    ]
                }
            ]
        },
        dataCompressor: {
            name: "Huffman Compressor",
            context: "Computer Engineering · Hardware architecture · 2024",
            summary: "A desktop app that compresses text with Huffman coding, draws the tree with Graphviz and gives back the identical file on decompression.",
            screen: "The real Huffman tree the program drew with Graphviz, next to the sizes of the same text original, compressed with Huffman, with RAR and with 7-Zip, and decompressed.",
            highlights: [
                {
                    text: "A PyQt5 window where a .txt file is dropped to compress it, or a .slo file to decompress it.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "It counts each character's frequency, builds the Huffman tree, generates the codes and writes the result in binary with the tree inside the file.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "It draws each file's tree with Graphviz, and an installer ships the Graphviz binaries and adds them to the PATH.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "With a 3,215,616-byte text, the .slo weighs 1,712,850 bytes (53.3%) and decompresses identical to the original.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "The course repository also holds ESP32 exercises with MicroPython, Wokwi simulations and ARM assembly in QtARMSim.",
                    roles: [
                        "backend"
                    ]
                }
            ]
        },
        carSpace: {
            name: "CarSpace: Parking Reservations",
            context: "Computer Engineering · Early semesters · 2022",
            summary: "The web prototype of a parking app, with a home page, sign-in, a map of 32 spots to book and statistics for each area.",
            screen: "CarSpace's real home page, served locally, showing the menu, the sign-in button and the aerial photo of a parking lot by the sea.",
            highlights: [
                {
                    text: "A site in HTML, CSS and JavaScript with Bootstrap 5 and jQuery, with shared headers and footers loaded into each page.",
                    roles: [
                        "fullstack"
                    ]
                },
                {
                    text: "A reservations screen with 32 spots, from A-1 to D-8, plus location, date and estimated time.",
                    roles: [
                        "fullstack"
                    ]
                },
                {
                    text: "Statistics per area on how busy it is, traffic congestion, its rating and the users' comments.",
                    roles: [
                        "fullstack"
                    ]
                },
                {
                    text: "Features, settings, user and team pages, on top of the home page and sign-in.",
                    roles: [
                        "fullstack"
                    ]
                }
            ]
        },
        sitePersist: {
            name: "SitePersist: Space Reservations",
            context: "Software Programming Technician · SENA – IUSH · 2022",
            summary: "A PHP and MySQL web system to book the spaces and equipment of Institución Universitaria Salazar y Herrera, with a separate admin site.",
            screen: "SitePersist's real home page served locally with PHP, explaining what the system is, with the buttons to sign in as a user or an administrator and a photo of the university campus.",
            highlights: [
                {
                    text: "A site for the community with sign-up, sign-in, spaces by building, equipment, and requests for bookings and loans.",
                    roles: [
                        "fullstack"
                    ]
                },
                {
                    text: "A separate admin site, AdminSitePersist, with its CRUD and history pages.",
                    roles: [
                        "fullstack",
                        "backend"
                    ]
                },
                {
                    text: "PHP with Composer and MySQL; locally with XAMPP and in the cloud with Heroku and a MySQL database on Azure.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "A README that documents the problem, goals, scope, state of the art and proposal, and a diagram of the Git workflow and the deployment.",
                    roles: [
                        "fullstack"
                    ]
                },
                {
                    text: "Built in a team of two, where 282 of the 306 commits across both repositories are mine.",
                    roles: [
                        "fullstack"
                    ]
                }
            ]
        },
        videoToAscii: {
            name: "VideoToAscii",
            context: "Software Programming Technician · SENA – IUSH · 2022",
            summary: "It turns a video into a character animation. Python splits the frames and converts them to ASCII, and a C# console plays them back.",
            screen: "Two real frames of the repository's animations, Saturn with ascii_wizard and the running figure with ascii_magic, next to the three steps from the video to the console.",
            highlights: [
                {
                    text: "An OpenCV script that opens the video and saves each frame as an image.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "Two converters, with ascii_wizard and with ascii_magic, that turn each frame into 150-column text and separate frames with a break line.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "A C# console on .NET 6 that asks for the file and the milliseconds per frame, and plays it in a loop, clearing the screen.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "Seventeen converted animations in the repository, from 4 to 211 frames, among them Saturn, a donut and a rocket.",
                    roles: [
                        "backend"
                    ]
                }
            ]
        },
        companyDream: {
            name: "The Company Dream: Digital Payroll",
            context: "Technical high school · Pascual Bravo · 2021",
            summary: "The site of a fictional company that offers entrepreneurs a free digital payroll, in Spanish and English, with sign-up and a payroll form in PHP and MySQL.",
            screen: "The Company Dream's real home page served locally with PHP, showing the menu and the promise of a free digital payroll to start a business.",
            highlights: [
                {
                    text: "A site in PHP, HTML, CSS and JavaScript with Spanish and English versions.",
                    roles: [
                        "fullstack"
                    ]
                },
                {
                    text: "User sign-up and sign-in on MySQL with PDO.",
                    roles: [
                        "backend",
                        "fullstack"
                    ]
                },
                {
                    text: "A payroll form with base salary, days worked, health, pension, and overtime, night and holiday shifts, saved in the payroll table.",
                    roles: [
                        "backend"
                    ]
                },
                {
                    text: "Published on Heroku with Composer and Apache.",
                    roles: [
                        "fullstack"
                    ]
                },
                {
                    text: "Built in a team of three, where 236 of the 278 commits are mine, most of them between September and November 2021.",
                    roles: [
                        "fullstack"
                    ]
                }
            ]
        },
    },
    organizations: {
        tivenos: "Integration services, observability, Zoho CRM widgets, admissions forms, CRM snapshots and email signatures for an education technology partner.",
        adcom: "Admissions landing pages and the platform that deploys them, Zoho automations, results services and email metrics for the agency's clients.",
        smartpot: "IoT platform for hydroponic crops, with firmware, broker, API, AI assistant, PWA and infrastructure.",
        gopoli: "Ride-sharing platform for university students, with a PWA, an API and a database.",
        peppertech: "PepperCRM, a CRM product built with Spring Boot, React and MongoDB.",
        engineering: "The Computer Engineering degree course by course, with AI, computer vision, networks, operating systems, distributed systems and data structures.",
        taurus: "Data technical test with FastAPI, Pandas and React.",
        testlabdata: "Python data automations from the Quipux internship, for campaigns and reports (2022 – 2023).",
        technical: "Projects of the Software Programming Technician program (SENA – IUSH), with web apps and tools in PHP, MySQL and C#.",
        vocational: "Technical high school projects (Pascual Bravo and INEM) with HTML, PHP, VB.NET, Java and Python.",
    },
};
