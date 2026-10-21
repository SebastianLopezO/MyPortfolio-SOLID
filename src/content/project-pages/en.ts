import type {ProjectPagesCopy} from "@/types/project";

export const projectPages: ProjectPagesCopy = {
    ui: {
        eyebrow: {product: "Product", work: "Work project", education: "Education project"},
        whatItDoes: "What it does",
        overview: "What it is about",
        howItWorks: "How it works",
        decisions: "Decisions and their costs",
        repositories: "Repositories",
        repositoriesNote: "Every public repository of the project, with what it holds.",
        stack: "Stack",
        screens: "Screens",
        organization: "GitHub organization",
        previous: "Previous project",
        next: "Next project",
        archiveFilter: "Filter the archive by organization",
        archiveAll: "All",
        related: {
            title: "Related",
            places: "Where it was built",
            experience: "Experience",
            program: "Program",
            organization: "GitHub organization",
            certifications: "Certifications that show here",
            siblings: "More projects from {place}",
        },
    },
    items: {
        peppercrm: {
            tagline: "A modular CRM for leads, tasks and communications, built as a team",
            role: "Lead backend developer",
            status: "Finished in 2025",
            overview: [
                "PepperCRM is a modular CRM to manage customers, sales and opportunities. It records leads, moves them through stages on a board, assigns tasks and keeps each customer's comments, files and emails. Four of us built it in the PepperTechDev organization between February and November 2025.",
                "I wrote almost all of the backend, from the Spring Boot API and its security to its integration with MongoDB and Redis and its deployment.",
            ],
            decisions: [
                {
                    title: "One module per part of the business",
                    problem: "A CRM brings together leads, tasks, comments, files and emails, and each part had to be testable and changeable on its own.",
                    solution: "Each part of the business is a module with its controller, service, validator and mapper.",
                    tradeoff: "adding a feature means touching more files.",
                },
                {
                    title: "A rate limit on the API",
                    problem: "A misconfigured client could flood the API.",
                    solution: "A filter caps how many requests the API accepts, on top of JWT and per-environment CORS.",
                },
            ],
            figures: {modules: "business modules in the API", apiCommits: "commits of mine in the API"},
            diagram: {
                title: "How PepperCRM fits together",
                caption: "The web app talks to the API, which stores in MongoDB, caches in Redis and sends email; the bottom row is delivery.",
                labels: {
                    web: "Web",
                    react: "React and Vite",
                    kanban: "Kanban board of leads",
                    forms: "Forms and tasks",
                    api: "API",
                    spring: "Spring Boot on Java 17",
                    security: "Spring Security, JWT and rate limiting",
                    modules: "Business modules",
                    data: "Data",
                    mongo: "MongoDB Atlas",
                    redis: "Redis cache",
                    mail: "Asynchronous mail service",
                    delivery: "Delivery",
                    images: "Images on Docker Hub",
                    render: "Deployment on Render",
                    kubernetes: "Kubernetes manifests",
                },
            },
            images: {
                kanban: "PepperCRM's real frontend with its repository's sample data, showing the task board with To Do, In Progress and Done columns, and the menu of leads, contacts, deals, products, vendors and quotes.",
            },
            seo: {
                title: "PepperCRM, a CRM in Spring Boot, React and MongoDB · Project",
                description: "A CRM built as a team, with a Spring Boot API with JWT and rate limiting, MongoDB Atlas, Redis, React with a kanban board and deployment on Render.",
            },
        },
        portfolio: {
            tagline: "A bilingual, prerendered portfolio with a view for every role",
            role: "Sole developer",
            status: "Live at sebastianlopezo.page",
            overview: [
                "This site is my resume built as a product. Each role view is a prerendered URL with its own copy, section order and figures, so whoever reads it finds what they are looking for first.",
                "Everything it says has a source. The figures come from the code, from GitHub or from the systems' configuration, and docs/content.md records how and when each one was measured.",
            ],
            decisions: [
                {
                    title: "Prerendering instead of a server",
                    problem: "A React app built in the browser arrives empty until its JavaScript runs.",
                    solution: "Every page is prerendered at build time, so it arrives complete without JavaScript and Nginx serves it as a static file.",
                    tradeoff: "every content change needs a new build and deployment.",
                },
                {
                    title: "Each section in its own chunk",
                    problem: "With every section in one file, the startup JavaScript would go over its budget.",
                    solution: "The hero hydrates first and the rest arrives in pieces, which keeps the startup JavaScript within its budget.",
                    tradeoff: "a short wait before each section responds.",
                },
                {
                    title: "An assistant without outside services",
                    problem: "An assistant wired to an outside service could contradict the page and would send the questions to third parties.",
                    solution: "It answers by searching the site's own content, so it never contradicts the page or sends questions to third parties.",
                    tradeoff: "it only knows what the page knows.",
                },
            ],
            figures: {views: "role views", languages: "languages"},
            diagram: {
                title: "From content to page",
                caption: "The typed content is prerendered at build time; the browser hydrates each section on its own.",
                labels: {
                    content: "Content",
                    facts: "Facts with their source",
                    copy: "Spanish and English copy per role",
                    stats: "Daily GitHub stats",
                    build: "Build",
                    vite: "Vite and TypeScript",
                    prerender: "Prerendering of every route",
                    budgets: "JavaScript, CSS and HTML budgets",
                    browser: "Browser",
                    sections: "Sections that load on their own",
                    roles: "Six role views",
                    assistant: "Local assistant",
                    delivery: "Delivery",
                    image: "Unprivileged Nginx image on GHCR",
                    deploy: "Docker Compose on the server",
                    checks: "Playwright and Lighthouse against production",
                },
            },
            images: {
                home: "This portfolio's real home page in the full-stack view, with availability, name, role, summary and the profile switcher.",
                project: "A real project page of this portfolio, the lettuce disease detector's, with its metrics board, its facts and its figures.",
            },
            seo: {
                title: "MyPortfolio, this portfolio in React and TypeScript · Project",
                description: "A bilingual prerendered portfolio with role views, a page per project, GitHub figures refreshed on every build and a local assistant.",
            },
        },
        taurus: {
            tagline: "From CSV files to a metrics API and an interactive dashboard",
            role: "Sole developer",
            status: "Finished in 2024",
            overview: [
                "A data technical test I solved in three repositories, one per layer, for loading and analyzing the CSV files, a metrics API and a dashboard to explore the metrics.",
            ],
            decisions: [
                {
                    title: "One layer per repository",
                    problem: "The technical test had three parts, loading and analyzing the CSV files, a metrics API and a dashboard.",
                    solution: "Each layer lives in its own repository, so each part could be tested on its own.",
                    tradeoff: "coordinating three repositories in a short test.",
                },
            ],
            figures: {repositories: "repositories"},
            diagram: {
                title: "From files to dashboard",
                caption: "Data flows left to right, from CSV to the database, from the database to the API and from the API to the dashboard.",
                labels: {
                    data: "Data",
                    csv: "The test's CSV files",
                    mysql: "MySQL and MariaDB",
                    notebook: "Exploratory analysis in Pandas",
                    api: "API",
                    fastapi: "FastAPI with async SQLAlchemy",
                    queries: "Queries by tenant, agent and state",
                    ui: "Dashboard",
                    react: "React and TypeScript",
                    grid: "AG Grid table",
                    charts: "Plotly.js charts",
                },
            },
            images: {
                tables: "Taurus's real frontend with sample data, showing the AG Grid aggregate tables of quotes, new business, conversion and premiums by tenant and by agent.",
                charts: "Taurus's real Plotly.js charts with sample data, showing the quote conversion rate by tenant, by agent and by region.",
            },
            seo: {
                title: "Taurus technical test: from CSV to a dashboard · Project",
                description: "Loading CSV into MySQL, analysis in Pandas, a FastAPI metrics API and a React dashboard with AG Grid and Plotly.",
            },
        },
        observability: {
            tagline: "Metrics, logs, traces, probes and alerts for 20+ services",
            role: "Sole developer",
            status: "In production",
            overview: [
                "With 20+ integration services in production, I needed to know when one failed without waiting for a team to report it. This repository holds everything for that, from what is measured and where it is stored to how it is seen and who gets told.",
                "I built it in June 2026 and it runs next to the services it watches.",
            ],
            decisions: [
                {
                    title: "Probes from outside on top of metrics from inside",
                    problem: "A service's metrics say nothing when the service is down or its domain does not answer.",
                    solution: "The 18 probes check each service from outside, the way a user would.",
                    tradeoff: "more configuration to maintain whenever a new service arrives.",
                },
                {
                    title: "The Docker socket behind a proxy",
                    problem: "Promtail needs to discover the containers, but the full Docker socket would give it control over the server.",
                    solution: "A read-only proxy lets it see the containers without changing anything.",
                },
                {
                    title: "Alerts to Telegram",
                    problem: "Alerts had to reach the phone without paying for an on-call service.",
                    solution: "A bot sends the alerts to a Telegram chat.",
                    tradeoff: "depending on a bot and a chat that need looking after.",
                },
            ],
            figures: {
                jobs: "Prometheus jobs",
                probes: "uptime probes",
                alerts: "alert rules",
                dashboards: "Grafana dashboards"
            },
            diagram: {
                title: "From signal to alert",
                caption: "Signals flow left to right; the bottom row is how the stack runs.",
                labels: {
                    targets: "What is watched",
                    services: "Instrumented FastAPI services",
                    probes: "Blackbox Exporter probes",
                    hosts: "Containers, machines and Nginx",
                    collection: "Collection",
                    prometheus: "Prometheus with 26 jobs",
                    loki: "Loki with Promtail",
                    tempo: "Tempo with OpenTelemetry",
                    people: "Who finds out",
                    dashboards: "4 Grafana dashboards",
                    rules: "12 alert rules",
                    telegram: "Alerts on Telegram",
                    operation: "Operation",
                    compose: "Docker Compose next to the services",
                    proxy: "Read-only proxy of the Docker socket",
                    retention: "15 days of retention",
                },
            },
            images: {
                dashboard: "Recreation of the Grafana dashboard of the integration services, with 26 Prometheus jobs, 18 uptime probes, 12 alert rules, requests and latency per service, the state of each probe and recent Loki logs.",
                trace: "Recreation of a Tempo trace of a POST /leads request, with validation, credentials, the CRM's 429 answer and its retry after 400 ms, the call to the academic system and the job saved in PostgreSQL.",
            },
            seo: {
                title: "Observability platform for production services · Project",
                description: "Prometheus with 26 jobs, 18 uptime probes, Loki, Tempo and Grafana with 4 dashboards and 12 alert rules that reach Telegram.",
            },
        },
        crmWidgets: {
            tagline: "Five sales processes inside the Zoho CRM record where they happen",
            role: "Sole developer",
            status: "In use",
            overview: [
                "Each widget brings a sales process to a button inside the Zoho CRM record where it happens, such as quotes and enrollment on the opportunity, lead capture on the campaign and appointments in its list of events.",
                "All of them are packaged with Zoho Extension Toolkit and talk to the CRM through its SDK; the ones that need more logic are written in React with Vite.",
            ],
            decisions: [
                {
                    title: "Calculate in the browser, write at the end",
                    problem: "Trying quote scenarios against the CRM would leave half-written records.",
                    solution: "The quote builder does every calculation in the browser and only writes to the CRM when the advisor confirms.",
                    tradeoff: "replicating in JavaScript rules that also live in the CRM.",
                },
                {
                    title: "Create before closing",
                    problem: "If a program change fails halfway, the opportunity can be lost.",
                    solution: "The widget creates the new opportunity, then closes the original and finally leaves the record.",
                },
                {
                    title: "When in doubt, block",
                    problem: "When the appointments widget cannot confirm a role, a campus or a scope, it could assign an opportunity to the wrong person.",
                    solution: "It blocks the action and shows the reason on screen.",
                },
            ],
            figures: {widgets: "widgets", steps: "enrollment steps in PeopleSoft"},
            diagram: {
                title: "Where the widgets live and what they talk to",
                caption: "Each widget opens from a CRM record and works through the SDK, Deluge functions or the academic system.",
                labels: {
                    crm: "Where they live",
                    deals: "Opportunities",
                    campaigns: "Campaigns",
                    events: "Appointments (CRM events)",
                    widgets: "Widgets",
                    pricing: "Quote builder with PDF",
                    enrollment: "Enrollment assistant",
                    capture: "Lead capture",
                    appointments: "Appointment management",
                    change: "Program change",
                    backends: "What they talk to",
                    sdk: "Zoho widget SDK",
                    deluge: "Deluge functions",
                    sis: "PeopleSoft Campus Solutions",
                    delivery: "Delivery",
                    zet: "Zoho Extension Toolkit",
                    vite: "Vite with a local certificate",
                    qa: "Tests with jsdom",
                },
            },
            images: {
                quoter: "Recreation of the price quoter inside a CRM deal, with payment plan, scholarship, partner discount and a promotion cut by the 80% cap, the breakdown of each payment and the buttons for the PDF and for applying the quote.",
                enrollment: "Recreation of the enrollment widget, with the check, run and result pages, the five steps against the academic system with their timings and an example of a translated error with access to the original text.",
            },
            seo: {
                title: "Zoho CRM widgets to quote, enroll and book appointments · Project",
                description: "Five widgets inside Zoho CRM, with a quote builder with PDF, an enrollment assistant for PeopleSoft, lead capture, appointments and program changes.",
            },
        },
        admissionsForms: {
            tagline: "From the institution's website to the CRM, without typing the application twice",
            role: "Sole developer",
            status: "In use",
            overview: [
                "To apply, an applicant fills in forms on the institution's website. These forms create their record in Zoho CRM, update the opportunity with the full application and upload their documents, through each institution's integration services.",
                "Each institution has its own, with its offering, its fields and its brand, and the shared script solves what all of them repeat, which is the UTM parameters and the cascading offering.",
            ],
            decisions: [
                {
                    title: "Go through the integration service",
                    problem: "Each institution has its own rules for validating and saving an application.",
                    solution: "The forms call the institution's API, which validates, normalizes and saves to the CRM. Each institution's rules live in one place.",
                    tradeoff: "one more piece to maintain.",
                },
                {
                    title: "The offering comes from the API",
                    problem: "With lists written into the HTML, every new program would mean editing the form.",
                    solution: "The selects fill from the service's academic hierarchy, so a new program shows up on its own.",
                },
            ],
            figures: {forms: "web forms", institutions: "institutions with forms"},
            diagram: {
                title: "From the form to the CRM",
                caption: "The form calls the institution's integration service, which writes to Zoho.",
                labels: {
                    site: "Institution's website",
                    steps: "Multi-page registration and application",
                    documents: "Document upload",
                    global: "Shared script of the CRM's forms",
                    services: "Integration services",
                    api: "Each institution's API",
                    hierarchy: "Academic hierarchy",
                    files: "File intake",
                    crm: "Zoho",
                    leads: "Leads",
                    deals: "Opportunities",
                    workdrive: "Documents in Zoho WorkDrive",
                },
            },
            images: {
                program: "Recreation of the Program step of an admission form, with six cascading lists (unit, level, mode, schedule, term and program) and the summary of the application with the verified phone number.",
                documents: "Recreation of the form's last step, with documents uploaded, one in progress and one pending, and what happens on submit, which is the application folder, the updated deal and the thank-you page.",
            },
            seo: {
                title: "Admissions and scholarship web forms connected to the CRM · Project",
                description: "Multi-page forms that register the applicant, complete the application and upload documents to Zoho through the integration services.",
            },
        },
        crmSnapshots: {
            tagline: "Zoho CRM modules in PostgreSQL, ready to analyze",
            role: "Sole developer",
            status: "In production",
            overview: [
                "To analyze the CRM with SQL, the service exports each module with Zoho's Bulk Read API and loads it into PostgreSQL. Each run empties the module's table and fills it again, so the database always holds the latest copy.",
                "It started in 2025 as one script per module and in 2026 became a FastAPI service with authentication and metrics.",
            ],
            decisions: [
                {
                    title: "Bulk exports instead of queries",
                    problem: "The regular API makes you page through a module record by record.",
                    solution: "The Bulk Read API delivers a whole module in one file.",
                    tradeoff: "waiting for Zoho to prepare the export.",
                },
                {
                    title: "One record per run",
                    problem: "Without a record, knowing how fresh each copy is means reading the logs.",
                    solution: "Every export leaves a row with the module, the date and the status.",
                },
            ],
            figures: {modules: "modules of one institution"},
            diagram: {
                title: "From the CRM to PostgreSQL",
                caption: "Data flows from Zoho to the service and from the service to PostgreSQL.",
                labels: {
                    zoho: "Zoho CRM",
                    bulk: "Bulk Read API per module",
                    zip: "ZIP exports with CSV",
                    service: "Service",
                    api: "FastAPI API",
                    auth: "Key authentication",
                    metrics: "Prometheus metrics",
                    warehouse: "PostgreSQL",
                    postgres: "One table per module",
                    log: "A record of every run",
                    analysis: "Queries and dashboards",
                },
            },
            images: {
                sql: "Recreation of a SQL client on the snapshot database, with one table per CRM module, a query on the run log and another of deals by stage, with the latest snapshot of each module completed.",
            },
            seo: {
                title: "Zoho CRM snapshots in PostgreSQL · Project",
                description: "A FastAPI service that exports Zoho CRM modules with the Bulk Read API and loads them into PostgreSQL for analysis, with a record of every run.",
            },
        },
        landingPlatform: {
            tagline: "A push to a landing page, and the page live without restarting anything",
            role: "Sole developer",
            status: "In production",
            overview: [
                "The agency publishes its clients' landing pages under each client's domain, one path per program or campaign. This platform is everything between a push to a landing page and the live page, from the build and the publication to the server and the monitoring.",
                "The landing pages are edited with a visual builder or by hand, and both paths end in the same workflow.",
            ],
            decisions: [
                {
                    title: "Publish files instead of images",
                    problem: "If each landing page traveled inside an image, publishing it would mean rebuilding the image and restarting the container.",
                    solution: "Each landing page is uploaded as static files into a folder the client's Nginx already mounts.",
                    tradeoff: "an Nginx configuration change still goes through git and a reload.",
                },
                {
                    title: "A confined deploy user",
                    problem: "The credential CI deploys with could leak.",
                    solution: "The CI user has no shell and rrsync confines it to its folder, so a leaked credential does not open the server.",
                },
                {
                    title: "The HTML is never precompressed",
                    problem: "Google Tag Manager is injected on the server with sub_filter, which does not work on files that are already compressed.",
                    solution: "Only JS, CSS, SVG and JSON are precompressed, and the HTML is left uncompressed on disk.",
                },
            ],
            figures: {repositories: "landing page repositories", gateways: "Nginx gateways, one per client"},
            diagram: {
                title: "From push to live page",
                caption: "Every change goes from the repository to GitHub Actions and from there to the VPS; the bottom row watches all of it.",
                labels: {
                    repos: "Repositories",
                    landings: "106 landing pages in React and Vite",
                    builder: "Changes from a visual builder or by hand",
                    caller: "A minimal workflow in each landing page",
                    ci: "GitHub Actions",
                    build: "Install, build and base path",
                    compress: "gzip and WebP",
                    rsync: "Two-phase rsync with a restricted user",
                    server: "VPS",
                    gateways: "One Nginx per client in Docker",
                    readonly: "Landing pages mounted read-only",
                    tags: "Google Tag Manager injected on the server",
                    watch: "Monitoring",
                    monitor: "Daily monitor that opens issues",
                    lighthouse: "Weekly Lighthouse",
                    rollback: "Documented rollback paths",
                },
            },
            images: {
                deploy: "Recreation of a run of a landing page's deploy workflow, with install, build, check, compression, SSH with a pinned host key, two-phase rsync and the check that the public site serves the commit.",
                monitor: "Recreation of the daily monitor's issue, with one landing page with Google Tag Manager loaded twice and another with a pending deploy, what to check in each case and the comments from earlier days.",
            },
            seo: {
                title: "Deployment platform for 100+ landing pages · Project",
                description: "A reusable workflow, rsync with a restricted user, one Nginx per client, daily monitoring and weekly Lighthouse for 106 landing page repositories.",
            },
        },
        emailAutomations: {
            tagline: "Emails that send themselves, with each subscriber's name and segment",
            role: "Sole developer",
            status: "In production",
            overview: [
                "These automations build and send the emails of the lottery brands the agency serves, the results email every night through Amazon SES and the ones a subscriber event triggers, such as a welcome or a birthday.",
                "The results email is built from the official API and waits for the draws published late. Recipients come from Zoho Analytics, each email carries the person's name and segment, and the delivery events come back to PostgreSQL. The results are also exposed by a Spring Boot API with Thymeleaf templates.",
            ],
            decisions: [
                {
                    title: "Wait for late draws, with a limit",
                    problem: "The API publishes some draws more than an hour late.",
                    solution: "The script compares with previous weeks to know what is missing and the pipeline retries for an hour and a half; then it sends what was published instead of delaying the email.",
                },
                {
                    title: "Templates that hold only variables",
                    problem: "A design change must never alter a figure, and an IDE formatter broke a template once.",
                    solution: "The design lives in the template and the data comes from the script. The template carries markers that switch the formatter off, and the script reports the exact line if something breaks.",
                },
                {
                    title: "A subject with the date",
                    problem: "With a fixed subject, Gmail threads every day's send into one conversation.",
                    solution: "The subject carries the date, so each day arrives as a new email.",
                },
                {
                    title: "One template a day, each person's data at send time",
                    problem: "Each email carries the recipient's name.",
                    solution: "The template leaves the name as a variable and Amazon SES fills it with each recipient's data when sending, so the HTML is built only once a day.",
                },
            ],
            figures: {brands: "lottery brands with a results email", attempts: "attempts before sending"},
            diagram: {
                title: "From the API to the inbox",
                caption: "The nightly pipeline reads the API, takes the recipients from Zoho Analytics and sends; the delivery events come back to PostgreSQL.",
                labels: {
                    source: "Source",
                    api: "Official results API",
                    history: "Paginated history of previous days",
                    analytics: "Recipients from Zoho Analytics",
                    pipeline: "Nightly pipeline",
                    cron: "Cron on the server",
                    template: "Jinja2 template that holds only variables",
                    retries: "Retries every 10 minutes",
                    delivery: "Delivery and measurement",
                    ses: "Amazon SES",
                    events: "Delivery events through Amazon SNS",
                    postgres: "PostgreSQL",
                },
            },
            images: {
                email: "Recreation of a fictional lottery's daily results email in an inbox, with one email per day, the date in the subject and the results of eight draws.",
            },
            seo: {
                title: "Hyper-personalized email at scale · Project",
                description: "Results emails through Amazon SES that wait for late draws, plus welcome and birthday emails, with each subscriber's name and segment.",
            },
        },
        zohoToolkit: {
            tagline: "Bulk loads, links and syncs in each client's CRM",
            role: "Sole developer",
            status: "In use",
            overview: [
                "Each of the agency's clients keeps large volumes of records in Zoho CRM that sometimes need to be loaded, fixed, linked or deleted at once. This toolkit holds the scripts and notebooks that do it per client, on Zoho's bulk API.",
                "It also includes small integrations a client needed, such as syncing its Oracle database with the CRM or copying its properties' photos to another platform.",
            ],
            decisions: [
                {
                    title: "Jobs that can be resumed",
                    problem: "A large load can break halfway.",
                    solution: "The load is split into batches and every job is polled until it finishes; if something breaks, it resumes from the last batch instead of starting over.",
                },
                {
                    title: "One folder per client",
                    problem: "A change for one client must never touch another's data.",
                    solution: "Each client has its own folder with its own scripts.",
                    tradeoff: "repeating some code across folders.",
                },
            ],
            figures: {clients: "clients with their own toolkit"},
            diagram: {
                title: "From a CSV to a client's CRM",
                caption: "Inputs go through bulk jobs that can be resumed before they reach their target.",
                labels: {
                    inputs: "Inputs",
                    csv: "Each client's CSV files",
                    oracle: "One client's Oracle database",
                    notebooks: "Preparation notebooks",
                    jobs: "Operations",
                    bulk: "Bulk Write API in batches",
                    resume: "Resumable jobs",
                    links: "Links, tags and deletions",
                    targets: "Targets",
                    crm: "Each client's Zoho CRM",
                    sms: "SMS sends with codes",
                    realEstate: "One client's real estate platform",
                },
            },
            images: {
                notebook: "Recreation of a Jupyter notebook that bulk-loads leads. It cleans a CSV, creates the Bulk Write API job, waits with a resume point, sums up created, updated and failed records, and links and tags them.",
            },
            seo: {
                title: "Bulk operations toolkit for Zoho CRM · Project",
                description: "Python scripts and notebooks on Zoho's Bulk Write API, with resumable loads, links, tags, deletions from CSV and syncs.",
            },
        },
        realEstateSite: {
            tagline: "The inventory the agency already keeps in Wasi, published every day on its own site",
            role: "Sole developer; interface built with Lovable",
            status: "In production",
            overview: [
                "A real estate agency with most of its inventory in Bogotá and nearby towns keeps its properties in Wasi, its real estate software. This site shows them with filters and a page per property, and takes requests for advice, contact and visits.",
                "The interface, the calculators and the request form were built with Lovable. The sync with the Wasi API and the workflows that schedule it and deploy the site are separate code in the same repository. The photos reach Wasi from Zoho CRM through a service of the Zoho toolkit.",
            ],
            decisions: [
                {
                    title: "An index for the listing, a file per property",
                    problem: "The listing and the filters need only 25 fields of each property.",
                    solution: "The script writes an index with the keys stated once and leaves each property's full record in its own file, which the site requests when the property's page opens.",
                },
                {
                    title: "Publish only what is available",
                    problem: "In Wasi, a sold or rented property stays active until someone unpublishes it.",
                    solution: "The sync asks only for available properties and filters again in case the API ignores the parameter.",
                },
                {
                    title: "Deploy only when something changed",
                    problem: "The sync runs every day, even when the inventory has not changed, and a push made with the workflow's own token does not trigger the deployment.",
                    solution: "The workflow compares the index, the amenities and the details folder and commits only when something changed; then it starts the deployment itself.",
                },
            ],
            figures: {properties: "properties available in October 2026", calculators: "financial calculators"},
            diagram: {
                title: "From Wasi to the site",
                caption: "The sync that runs every day before dawn writes the data the site reads; requests go to Supabase.",
                labels: {
                    source: "Source",
                    wasi: "Wasi API",
                    zoho: "Photos that arrive from Zoho CRM",
                    sync: "Daily sync",
                    schedule: "GitHub Actions workflow at 3 a.m.",
                    index: "Columnar index of 25 fields",
                    details: "One file per property",
                    site: "Site",
                    listing: "Listing with filters",
                    detail: "Page of each property",
                    tools: "Mortgage, buying and yield calculators",
                    leads: "Requests",
                    forms: "Advice, contact and visit",
                    edge: "Supabase Edge Function",
                    postgres: "PostgreSQL",
                },
            },
            images: {
                listing: "Recreation of a fictional agency's listing, with filters by operation, type, city and price, cards with badges and the summary of the last sync with Wasi.",
                detail: "Recreation of a fictional property's page with its gallery, its facts, the loan calculator and the form to book a visit.",
            },
            seo: {
                title: "Real estate landing with an inventory synced from Wasi · Project",
                description: "A lead capture site that publishes a real estate agency's Wasi inventory every day, with filters, calculators and requests stored in Supabase.",
            },
        },
        collectionAutomation: {
            tagline: "Campaign tracking and database cleanup during the data internship",
            role: "Data analyst intern",
            status: "Archived in 2023",
            overview: [
                "During the Quipux internship I worked in the revenue-collection automation team. These 18 repositories hold what I wrote for that daily work, across campaign tracking, database cleanup and exclusion lists.",
                "They are private and have been archived since 2023.",
            ],
            decisions: [
                {
                    title: "One repository per task",
                    problem: "The daily work left many different scripts for campaign tracking, database cleanup and exclusion lists.",
                    solution: "Each script lives in its own repository, easy to find and to run on its own.",
                    tradeoff: "sharing no code between them.",
                },
            ],
            figures: {repositories: "internship repositories"},
            diagram: {
                title: "From files to campaign",
                caption: "Input files go through notebooks and scripts that produce the tracking, the exclusions and each campaign's files.",
                labels: {
                    inputs: "Inputs",
                    downloads: "Automatic downloads",
                    purchased: "Purchased databases",
                    lists: "Send statuses",
                    notebooks: "Processing",
                    pandas: "Pandas notebooks",
                    filters: "Filters and splitters",
                    joins: "Joins and concatenations",
                    outputs: "Outputs",
                    tracking: "Daily tracking per city",
                    exclusions: "Email and SMS exclusion lists",
                    campaigns: "Each campaign's files",
                },
            },
            images: {
                notebook: "Recreation of a notebook that tracks collection campaigns by matching a purchased database against the email and SMS exclusion lists, counting who can be contacted and summing up, per campaign, how many paid.",
            },
            seo: {
                title: "Collection campaign automation in Python · Project",
                description: "Pandas notebooks and batch scripts from my Quipux internship, with daily campaign tracking, database cleanup and email and SMS exclusion lists.",
            },
        },
        engineering: {
            tagline: "The whole degree, one repository per course",
            role: "Student",
            status: "Final semester, graduating in March 2027",
            overview: [
                "Since my first semester I keep every course in a repository of the EngineeringSebastian-s organization. They are not connected to each other, since each one solves its course's problem, and together they trace the degree, from PSeInt pseudocode to distributed systems, networks on real Cisco routers and artificial intelligence.",
                "The newest repositories are portfolios with their README, their modules per assessment and how to run them.",
            ],
            decisions: [],
            figures: {
                repositories: "repositories, one per course or project",
                commits: "commits of mine in the organization"
            },
            diagram: {
                title: "The areas of the degree",
                caption: "Each area groups the courses whose repositories are listed further down.",
                labels: {
                    foundations: "Foundations",
                    algorithms: "Algorithms and marathons",
                    structures: "Data structures",
                    automata: "Automata and compilers",
                    systems: "Systems",
                    os: "Operating systems",
                    networks: "Networks on Cisco hardware",
                    distributed: "Distributed and parallel programming",
                    software: "Software",
                    databases: "SQL and NoSQL databases",
                    testing: "Testing and TDD",
                    patterns: "Design patterns",
                    ai: "AI and data",
                    learning: "Machine learning and symbolic AI",
                    vision: "Computer vision",
                    simulation: "Modeling and simulation",
                },
            },
            images: {
                vision: "The real confusion matrix of the lettuce disease detector, from the computer vision course, next to its per-class metrics.",
                radar: "Three real outputs of the radar guide, with the Sentinel-1 image unfiltered, with the Lee filter and clustered with K-Means.",
            },
            seo: {
                title: "Computer Engineering, course by course on GitHub · Project",
                description: "37 repositories from the degree, across distributed systems, Cisco networks, AI, computer vision, test-driven development, databases and data structures.",
            },
        },
        cybersecurityLabs: {
            tagline: "From reconnaissance to controls, in controlled environments",
            role: "Student",
            status: "In progress, until December 2026",
            overview: [
                "Politécnico's cybersecurity diploma, from September to December 2026, is assessed through lab reports. Each one documents a controlled, authorized environment, what was done step by step and the controls that would have prevented it.",
                "The reports are in Markdown, Word and PDF, with Mermaid diagrams and numbered screenshots of every step.",
            ],
            decisions: [
                {
                    title: "Authorized environments only",
                    problem: "Every lab applies attack techniques, and they can only run where there is authorization.",
                    solution: "Every test runs against a lab machine, isolated on a Docker network or on localhost, and stops once there is enough evidence, with no persistence and no lateral movement.",
                },
            ],
            figures: {labs: "labs", evidence: "screenshots in the reports"},
            diagram: {
                title: "The three labs",
                caption: "Each lab moves from reconnaissance or analysis to defensive controls.",
                labels: {
                    lab1: "Lab 1",
                    recon: "Reconnaissance with Nmap",
                    ftp: "vsftpd 2.3.4 and its backdoor",
                    safety: "Isolated network and safety rules",
                    lab2: "Lab 2",
                    incident: "Phishing and ransomware case",
                    cia: "Confidentiality, integrity and availability",
                    access: "Role-based access control and a secure cloud",
                    lab3: "Lab 3",
                    ctf: "CTF from reconnaissance to initial access",
                    escalation: "Privilege escalation",
                    availability: "Controlled availability test",
                },
            },
            images: {
                recon: "The first lab's real terminal, with the Nmap scan of all 65,535 ports that finds port 21 open with vsftpd 2.3.4.",
                incident: "The second lab's real visual summary, with the attack chain of a fictional company, from phishing to ransomware, and its impact on confidentiality, integrity and availability.",
            },
            seo: {
                title: "Cybersecurity labs with Kali Linux · Project",
                description: "Three diploma reports on reconnaissance with Nmap, a CTF up to privilege escalation and the analysis of a ransomware attack with its response plan.",
            },
        },
        technical: {
            tagline: "A booking system for the university, built by a team of two",
            role: "Team developer",
            status: "Finished in 2023",
            overview: [
                "In the software programming technician program (SENA with Institución Universitaria Salazar y Herrera) I built SitePersist with one teammate, a web system to book the university's spaces and equipment.",
                "Its README documents the problem, the goals, the scope, the state of the art and the proposal. The organization also holds two tools in C#.",
            ],
            decisions: [],
            figures: {repositories: "repositories"},
            diagram: {
                title: "How SitePersist works",
                caption: "The community requests, the administrator manages and everything lands in MySQL.",
                labels: {
                    people: "Users",
                    community: "Academic community and outside visitors",
                    admin: "Administrators",
                    app: "SitePersist",
                    requests: "Booking requests",
                    gallery: "Gallery of spaces",
                    inventory: "Equipment inventory",
                    data: "Data and deployment",
                    mysql: "MySQL",
                    hosting: "PHP with Composer on Heroku",
                },
            },
            images: {
                sitepersist: "SitePersist's real home page served locally with PHP, with the buttons to sign in as a user or an administrator.",
                ascii: "Two real frames of VideoToAscii's animations next to the three steps from the video to the console.",
            },
            seo: {
                title: "SitePersist and the programming technician's projects · Project",
                description: "A PHP and MySQL web system to book university spaces, with its admin site, and C# tools from the SENA – IUSH technician program.",
            },
        },
        vocational: {
            tagline: "The first projects, in PHP, Excel, Java and Python",
            role: "Team student",
            status: "Finished in 2021",
            overview: [
                "My first programming projects, from technical high school between I.E. INEM José Félix de Restrepo and Institución Educativa Pascual Bravo. I uploaded them in 2021 and 2022 to an organization I share with my teammates.",
                "They are PHP websites, Excel macros and my first programs in Java and Python.",
            ],
            decisions: [],
            figures: {repositories: "repositories"},
            images: {
                company: "The Company Dream's real home page served locally with PHP, showing the menu and the promise of a free digital payroll to start a business.",
            },
            seo: {
                title: "Technical high school projects · Project",
                description: "The first projects, with PHP websites, a bingo game and a color converter in Excel with macros, an Android calculator and Python programs.",
            },
        },
        lettuceDiseases: {
            tagline: "Healthy lettuce, weeds and six diseases, and an evaluation that does not hide the small classes",
            role: "Sole developer",
            status: "Finished in July 2026",
            overview: [
                "The fifth guide of Computer Vision and Artificial Intelligence asked for an image classifier. I built it on Kaggle's Lettuce Diseases dataset, because SmartPot grows lettuce in hydroponics and a model like this can warn when a leaf gets sick.",
                "The model starts from a pretrained MobileNetV2 and trains a new head for the eight classes. The repository keeps the training history, the confusion matrix, the per-class report and the evaluation metrics."
            ],
            decisions: [
                {
                    title: "Transfer learning instead of a network from scratch",
                    problem: "Some diseases have few images, and a network trained from scratch had little to learn their features from.",
                    solution: "MobileNetV2 already carries filters trained on millions of photos and is light enough to consider running next to the crop; the model only trains a new head for the eight classes.",
                },
                {
                    title: "Report recall per class next to accuracy",
                    problem: "The 97.9% accuracy rests on the two large classes, with more than 1,100 images each.",
                    solution: "The per-class report shows that the model still gets the diseases wrong often, which is what matters for a crop.",
                }
            ],
            figures: {
                accuracy: "accuracy on 2,337 test images",
                recall: "average recall per class"
            },
            images: {
                board: "The model's real confusion matrix next to its metrics, with 97.9% accuracy, 65.7% average recall per class and the recall of each of the eight classes."
            },
            seo: {
                title: "Lettuce disease detector with MobileNetV2 · Project",
                description: "An image classifier for SmartPot with 97.9% accuracy on 2,337 images, and a per-class recall that shows how far it still is from catching the diseases."
            }
        },
        radarImaging: {
            tagline: "From radar noise to a dataset, and two models that did not beat the input",
            role: "Sole developer",
            status: "Finished in May 2026",
            overview: [
                "Guides three and four of Computer Vision work with synthetic aperture radar. Radar sees through clouds, but its images carry speckle, a multiplicative noise that makes it hard to tell water, vegetation and buildings apart.",
                "In guide three I prepared ten Sentinel-1 images of a port area. I rescaled them, filtered them with Lee, clustered them with K-Means and built a dataset of noisy and reference pairs. In guide four I compared networks for scene classification and tried two restoration models on those pairs."
            ],
            decisions: [
                {
                    title: "A reference made from the same images",
                    problem: "There is no noise-free version of a radar image to measure against.",
                    solution: "Aligning and averaging ten dates of the same place lowers the speckle, because it changes between passes and the terrain does not, and leaves a reference.",
                },
                {
                    title: "Publish that the restoration did not work",
                    problem: "The autoencoder lowered PSNR from 25.80 to 22.66 dB, and SwinIR, pretrained on optical photos, from 19.91 to 19.64 dB.",
                    solution: "The report keeps those numbers instead of picking only the images that look better.",
                }
            ],
            figures: {
                images: "Sentinel-1 images in the series",
                accuracy: "ResNet50 accuracy on scene classification"
            },
            images: {
                filtering: "Three real outputs of the guide, which are the rescaled radar image, the same image with the Lee filter and the three-class K-Means clustering that separates water, vegetation and buildings.",
                restoration: "A real noisy patch, its averaged reference and the SwinIR output, next to the PSNR, SSIM and ENL of the autoencoder and of SwinIR, which ended below the input."
            },
            seo: {
                title: "Sentinel-1 radar: filtering, clustering and restoration · Project",
                description: "Lee filtering, K-Means and a patch dataset on ten Sentinel-1 images, and two restoration models whose metrics ended below the input."
            }
        },
        schoolServices: {
            tagline: "One data model served over REST and over GraphQL",
            role: "Developer in a team of three",
            status: "Finished in December 2025",
            overview: [
                "Distributed and Parallel Programming asked for a web system for a school's buildings and staff. The model has areas, offices, classrooms and employees, and tells administrative staff apart from permanent and contract teachers.",
                "The core is a REST API in Spring Boot. On top sits a FastAPI service with Strawberry that offers the same data as GraphQL, and a React frontend consumes the REST API."
            ],
            decisions: [
                {
                    title: "GraphQL as a layer on top, without touching the API",
                    problem: "If the GraphQL service read the database, the logic and validations would live in two places.",
                    solution: "The GraphQL service calls the REST API with httpx, so the logic and validations live in one place.",
                    tradeoff: "one more HTTP call per query.",
                },
                {
                    title: "In-memory H2",
                    problem: "The API had to start without installing anything for the demo.",
                    solution: "An in-memory H2 database.",
                    tradeoff: "the data is lost on restart, which is fine for a course delivery and not for a real school.",
                }
            ],
            figures: {
                resources: "resources with full CRUD",
                commits: "of the project's 22 commits"
            },
            images: {
                employees: "The project's real frontend with sample data, showing the school's staff list with each person's document, area, office, employee type and teacher type.",
                report: "The staff per area report in the real frontend, with sample data, adding up totals, permanent and contract teachers, and administrative staff."
            },
            seo: {
                title: "Cambridge School with Spring Boot, GraphQL and React · Project",
                description: "A Spring Boot REST API to run a school, a GraphQL layer in FastAPI and Strawberry on top of it, and a React 19 frontend."
            }
        },
        fashionLine: {
            tagline: "A store in three containers, the API with JWT, MongoDB and React",
            role: "Sole developer",
            status: "Finished in December 2024",
            overview: [
                "The second exam of NoSQL Databases asked for a full application on MongoDB. FashionLine handles a clothing store's inventory, with products that have a description, price, stock, category and size.",
                "The API is in Spring Boot with JWT security, the frontend in React and TypeScript, and each part has its Dockerfile and its deployment guide in the repository."
            ],
            decisions: [
                {
                    title: "A custom image for the local database",
                    problem: "Getting data into the local environment would mean restoring backups.",
                    solution: "The MongoDB image copies an initialization script that creates the database with test data.",
                },
                {
                    title: "Environment variables instead of fixed properties",
                    problem: "The same API had to run against the local database and against Atlas.",
                    solution: "The API builds with a profile that ignores the .env file and reads the connection from the environment, so the same image serves both.",
                    tradeoff: "the build skips the tests that expected the fixed configuration.",
                }
            ],
            figures: {
                images: "Docker images on Docker Hub"
            },
            images: {
                products: "FashionLine's real frontend with sample data, with the product table showing price, category, size, stock and the edit and delete buttons.",
                home: "FashionLine's real home page, with its icon and the store's description."
            },
            seo: {
                title: "FashionLine: Spring Boot, JWT, MongoDB and React in Docker · Project",
                description: "A fashion store's inventory, with a Spring Boot API with JWT on MongoDB Atlas, a React frontend and three Docker images."
            }
        },
        tddPolyglot: {
            tagline: "Write the test first, six times",
            role: "Main developer, with 31 of the assignment's 33 commits",
            status: "Finished in September 2026",
            overview: [
                "The first assignment of Testing and Configuration Management asked for the JUnit 5 exercises, a unit testing exercise and a CRUD built with TDD in three languages other than Java and Kotlin. I delivered six, the three required ones in C#, Python and React, plus PHP, Rust and Go.",
                "Since all six solve the same problem, the only thing that changes between them is the language and its testing ecosystem. In total there are eight projects and 137 test cases, 111 of them in the CRUDs."
            ],
            decisions: [
                {
                    title: "Fix the problem to compare languages",
                    problem: "Six implementations cannot be compared if each one solves something different.",
                    solution: "All six share the same model and the same test names (should_behavior_condition), so a Rust test can be read next to its Python counterpart, case by case.",
                },
                {
                    title: "Docker so the demo does not depend on the classroom computer",
                    problem: "Installing six SDKs on the classroom computer was the biggest risk.",
                    solution: "With Docker Compose each suite runs in its language's official image, and the presentation shows the recorded runs when no server is up.",
                }
            ],
            figures: {
                tests: "test cases",
                languages: "suites in containers"
            },
            images: {
                results: "The assignment's real page, with the table of test cases per project, from the JUnit 5 calculators to the CRUDs in C#, Python, React, PHP, Rust and Go.",
                model: "The six-language CRUD section of the real page, with the shared functional model and the button that runs each suite locally or in Docker."
            },
            seo: {
                title: "TDD in six languages with Docker · Project",
                description: "A CRUD written with TDD in C#, Python, React, PHP, Rust and Go, plus JUnit 5 in Java and Kotlin, with eight suites and 137 cases that run in Docker."
            }
        },
        aiTechniques: {
            tagline: "Four ways for a program to decide, from an expert system to an agent",
            role: "In a pair for the workshops; sole developer of the agent",
            status: "Finished in April 2026",
            overview: [
                "The Artificial Intelligence repository holds the course's four quizzes, each with its own paradigm, which are symbolic AI, evolutionary computing, supervised learning and agents. I did the first two in a pair.",
                "The last two use SmartPot as the case, with models that decide when to ventilate or correct pH and a reactive agent that looks at the current sensor reading and answers with actions, without memory of earlier readings."
            ],
            decisions: [
                {
                    title: "Rules in a separate knowledge base",
                    problem: "If each crop's ranges lived in the agent's logic, adding a crop would mean changing it.",
                    solution: "Each crop's ideal ranges live in a configuration dictionary and the agent only compares against them; adding a crop means adding its ranges.",
                },
                {
                    title: "A dashboard to test the agent",
                    problem: "Testing the agent required the sensors to be connected.",
                    solution: "The dashboard's sliders simulate the sensors, so temperature or pH can be pushed out of range to see at once which actions fire.",
                }
            ],
            figures: {
                modules: "modules, one per paradigm"
            },
            images: {
                agent: "The agent's real Streamlit dashboard with lettuce selected, showing three anomalies detected and the actions it fires, such as turning on the fans and the water cooler and diluting the solution.",
                rules: "The lower part of the real dashboard, with the crop's status, the agent's actions and temperature and humidity against their ideal range."
            },
            seo: {
                title: "Artificial intelligence: from expert system to agent · Project",
                description: "The course's four modules, with CLIPS and fuzzy logic for candlesticks, genetic algorithms, models for SmartPot and a reactive agent in Streamlit."
            }
        },
        dataCompressor: {
            tagline: "Compress with a tree and get the same text back",
            role: "Sole developer",
            status: "Finished in June 2024",
            overview: [
                "One of the Hardware Architecture projects was a data compressor. DataCompressor implements Huffman coding in Python, with a PyQt5 desktop interface and each file's tree drawn with Graphviz.",
                "The .slo format stores the tree next to the encoded data, so the same program decompresses with no other information and the result matches the original byte for byte."
            ],
            decisions: [
                {
                    title: "Store the tree inside the file",
                    problem: "Without the tree there is no way to read the codes.",
                    solution: "The tree goes at the start of the .slo, so every file is self-contained.",
                    tradeoff: "a few extra bytes on small files.",
                },
                {
                    title: "Compare it with 7-Zip and RAR",
                    problem: "Huffman only shortens frequent characters, and that does not show without something to compare against.",
                    solution: "The same text ends at 23,219 bytes with 7-Zip and 25,136 with RAR, because the filler text repeats sentences and those formats store each repetition once. The comparison makes Huffman's limit plain.",
                }
            ],
            figures: {
                ratio: "of the original size with Huffman"
            },
            images: {
                board: "The real Huffman tree the program drew with Graphviz, next to the sizes of the same text original, compressed with Huffman, with RAR and with 7-Zip, and decompressed."
            },
            seo: {
                title: "Huffman compressor in Python with PyQt5 and Graphviz · Project",
                description: "A desktop app that compresses text with Huffman to 53.3% of its size, draws the tree and decompresses identically, compared with 7-Zip and RAR."
            }
        },
        carSpace: {
            tagline: "A parking lot you book from the browser",
            role: "Prototype developer",
            status: "Finished in December 2022",
            overview: [
                "CarSpace was a project for an early-semester course, the prototype of an app to find and book a spot in a parking lot.",
                "It is a static site. The screens show the whole flow, from the home page to the spot map and the area statistics, without a server that stores the bookings."
            ],
            decisions: [
                {
                    title: "Shared parts with jQuery",
                    problem: "Eight files of the site carry the same header, footer and metadata.",
                    solution: "Those parts live in separate files that jQuery inserts into each page, so a menu change happens once.",
                }
            ],
            figures: {
                spots: "spots on the reservations map",
                pages: "prototype screens"
            },
            images: {
                home: "CarSpace's real home page, served locally, showing the menu, the sign-in button and the aerial photo of a parking lot by the sea.",
                reservations: "The real reservations screen, with the 32 spots from A-1 to D-8 and the location, date and estimated time on the left."
            },
            seo: {
                title: "CarSpace, a parking reservation prototype · Project",
                description: "A web prototype in HTML, CSS, JavaScript and Bootstrap to book one of 32 parking spots and see each area's statistics."
            }
        },
        sitePersist: {
            tagline: "Book a university room or device from any device",
            role: "Developer in a team of two",
            status: "Finished in November 2022",
            overview: [
                "The project of SENA's programming technician program with IUSH started from a problem at the university, whose room booking system was hard to use for the community and for outside visitors.",
                "SitePersist is the site where the community browses spaces and equipment and makes requests; AdminSitePersist is where the staff handles them. Both share the MySQL database."
            ],
            decisions: [
                {
                    title: "Two sites instead of one with roles",
                    problem: "A change to the admin side should not put the site the community uses at risk.",
                    solution: "The admin side is a separate site, AdminSitePersist, and both share the MySQL database; each one is published and changed without risking the other.",
                    tradeoff: "repeating the connection and some styles in both repositories.",
                }
            ],
            figures: {
                commits: "of the 306 commits across both repositories"
            },
            images: {
                home: "SitePersist's real home page served locally with PHP, explaining what the system is, with the buttons to sign in as a user or an administrator and a photo of the university campus."
            },
            seo: {
                title: "SitePersist, space reservations in PHP and MySQL · Project",
                description: "A PHP and MySQL web system to book IUSH's spaces and equipment, with its admin site, published on Heroku with MySQL on Azure."
            }
        },
        videoToAscii: {
            tagline: "A video turned into text that moves in the console",
            role: "Sole developer",
            status: "Finished in December 2022",
            overview: [
                "VideoToAscii is one of the projects in the technician program's organization. It joins three small pieces, two in Python and one in C#.",
                "Python does the image work, splitting the frames and turning them into characters. The C# console only reads the text file and shows one frame after another."
            ],
            decisions: [
                {
                    title: "A text file between the two parts",
                    problem: "Python and C# share no code.",
                    solution: "The converter writes the frames to a .txt separated by break and the console reads it. Any converter can produce an animation the console understands.",
                }
            ],
            figures: {
                animations: "converted animations"
            },
            images: {
                board: "Two real frames of the repository's animations, Saturn with ascii_wizard and the running figure with ascii_magic, next to the three steps from the video to the console."
            },
            seo: {
                title: "VideoToAscii: video to ASCII animation in Python and C# · Project",
                description: "Python with OpenCV splits a video's frames and converts them to ASCII; a C# console on .NET 6 plays them as an animation."
            }
        },
        companyDream: {
            tagline: "A free payroll so a new business can get started",
            role: "Developer in a team of three",
            status: "Finished in November 2021",
            overview: [
                "The Company Dream was a project of the technical high school at Pascual Bravo, a fictional company that offers anyone starting a business a free digital payroll.",
                "The site presents the company in Spanish and English, and behind the sign-in it has the form to record each person's payroll."
            ],
            decisions: [
                {
                    title: "One folder per language",
                    problem: "The site had to be in Spanish and English.",
                    solution: "Each language is a copy of the site in its own folder, the simplest thing to publish.",
                    tradeoff: "every change is made twice.",
                }
            ],
            figures: {
                commits: "of the project's 278 commits",
                languages: "site languages"
            },
            images: {
                home: "The Company Dream's real home page served locally with PHP, showing the menu and the promise of a free digital payroll to start a business.",
                login: "The real sign-in screen, with the email and password form and the link to sign up."
            },
            seo: {
                title: "The Company Dream, digital payroll in PHP and MySQL · Project",
                description: "A technical high school project, a site in Spanish and English with sign-up and a payroll form in PHP and MySQL, on Heroku."
            }
        },
    },
};
