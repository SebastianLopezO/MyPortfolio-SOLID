import type {HighlightId, SectionId, SkillGroupId} from "@/types/content";
import type {ProjectCategory, ProjectId} from "@/types/project";

export const ROLE_IDS = ["backend", "crm", "data", "devops", "fullstack"] as const;

export type RoleId = (typeof ROLE_IDS)[number];

export type ProfileKey = RoleId | "general";

export const isRoleId = (value: unknown): value is RoleId => ROLE_IDS.includes(value as RoleId);

/** Copy written once for each view: the general profile and every role. */
export type ByProfile<T> = Record<ProfileKey, T>;

export const forProfile = <T>(value: ByProfile<T>, role: RoleId | null): T => value[role ?? "general"];

export interface RoleConfig {
    sectionOrder: SectionId[];
    topStack: string[];
    highlights: HighlightId[];
    skillGroupOrder: SkillGroupId[];
    /** The project the projects section opens with, then the category tab it shows first. */
    featuredProject: ProjectId;
    projectCategory: ProjectCategory;
    keywords: string[];
    focusTech: string[];
}

export const GENERAL: RoleConfig = {
    sectionOrder: ["about", "experience", "projects", "journey", "skills", "testimonials", "services", "certifications", "resume", "metrics", "contact"],
    topStack: ["Python · FastAPI", "Java · Spring Boot", "Zoho CRM · Deluge", "SQL · Power BI", "PostgreSQL · MongoDB", "React · TypeScript", "Docker · GitHub Actions", "Prometheus · Grafana"],
    highlights: ["years", "integrations", "clients", "landingPages", "recommendations", "contributions", "certifications", "streak"],
    skillGroupOrder: ["backend", "crm", "data", "devops", "databases", "frontend", "cloud", "testing", "languages", "security", "ai", "iot", "networks", "tools", "foundations"],
    featuredProject: "smartpot",
    projectCategory: "work",
    keywords: ["backend", "integration", "crm", "zoho", "data", "devops", "full stack"],
    focusTech: [],
};

export const ROLES: Record<RoleId, RoleConfig> = {
    backend: {
        sectionOrder: ["experience", "projects", "journey", "skills", "about", "services", "certifications", "testimonials", "resume", "metrics", "contact"],
        topStack: ["Python · FastAPI", "Java · Spring Boot", "REST · SOAP · Webhooks", "PostgreSQL · SQL Server", "MongoDB · Redis", "OAuth 2.0 · JWT", "Docker · GHCR", "OpenTelemetry · Prometheus"],
        highlights: ["years", "integrations", "clients", "apiTests", "commits", "repositories", "smartpotCommits", "probes"],
        skillGroupOrder: ["backend", "databases", "languages", "devops", "testing", "security", "cloud", "crm", "data", "frontend", "iot", "ai", "networks", "tools", "foundations"],
        featuredProject: "integrationPlatform",
        projectCategory: "work",
        keywords: ["backend", "api", "fastapi", "spring boot", "java", "python", "rest", "soap", "server", "microservices", "database", "postgresql", "mongodb"],
        focusTech: ["Python", "FastAPI", "Java", "Spring Boot", "Spring Security", "Django", "Node.js", "Laravel", "REST", "SOAP", "Webhooks", "JWT", "OpenAPI", "Swagger", "PostgreSQL", "MySQL", "MariaDB", "SQL Server", "MongoDB", "Redis", "SQLite", "Thymeleaf", "PyTest", "JUnit", "Postman", "Flask", "Pydantic", "SQLAlchemy", "asyncpg", "Jinja2", "GraphQL", "OAuth 2.0", "Oracle", "H2", "AES-256-GCM", "WS-Security", "TDD"],
    },
    crm: {
        sectionOrder: ["experience", "projects", "journey", "services", "skills", "testimonials", "about", "certifications", "resume", "metrics", "contact"],
        topStack: ["Zoho CRM", "Deluge", "Zoho Creator", "Zoho Analytics", "Zoho Forms", "Zoho CRM widgets", "REST APIs · Webhooks", "WhatsApp · Meta Ads · Google Ads"],
        highlights: ["years", "clients", "integrations", "landingPages", "forms", "widgets", "recommendations", "certifications"],
        skillGroupOrder: ["crm", "backend", "data", "frontend", "databases", "cloud", "languages", "devops", "testing", "ai", "security", "iot", "networks", "tools", "foundations"],
        featuredProject: "martech",
        projectCategory: "work",
        keywords: ["crm", "zoho", "deluge", "creator", "integration", "martech", "automation", "salesforce", "hubspot", "widgets"],
        focusTech: ["Zoho CRM", "Zoho Creator", "Zoho Analytics", "Zoho Forms", "Zoho One", "Deluge", "Dapta", "n8n", "Zapier", "CRM", "WhatsApp API", "Meta Ads", "Google Ads", "Webhooks", "REST", "Zoho WorkDrive", "Zoho CRM Bulk API", "Zoho Extension Toolkit", "Google Tag Manager", "Typeform", "Shopify", "Power Automate", "UiPath", "Google Apps Script", "Google Analytics 4"],
    },
    data: {
        sectionOrder: ["experience", "projects", "journey", "skills", "certifications", "services", "about", "testimonials", "resume", "metrics", "contact"],
        topStack: ["SQL", "Python · Pandas", "Power BI · DAX", "Zoho Analytics", "PostgreSQL", "ETL · Jupyter", "scikit-learn", "Excel · VBA"],
        highlights: ["years", "clients", "integrations", "certifications", "codingHours", "contributions", "repositories", "recommendations"],
        skillGroupOrder: ["data", "databases", "languages", "ai", "crm", "backend", "cloud", "devops", "testing", "frontend", "iot", "security", "networks", "tools", "foundations"],
        featuredProject: "crmSnapshots",
        projectCategory: "work",
        keywords: ["data", "analyst", "analytics", "bi", "power bi", "dax", "sql", "etl", "dashboards", "reports", "pandas"],
        focusTech: ["SQL", "Python", "Pandas", "NumPy", "Power BI", "DAX", "Zoho Analytics", "Excel", "ETL", "Matplotlib", "Plotly", "AG Grid", "Data Visualization", "scikit-learn", "Jupyter", "PostgreSQL", "MySQL", "MariaDB", "SQL Server", "Statistics", "NLP", "TinyML", "RAG pipelines", "SciPy", "Tableau", "VBA", "Anaconda", "D3.js", "Google Analytics 4", "Oracle", "R", "TensorFlow", "Hugging Face", "Streamlit", "scikit-fuzzy", "Numerical Analysis", "Operations Research"],
    },
    devops: {
        sectionOrder: ["experience", "projects", "journey", "skills", "services", "about", "certifications", "testimonials", "resume", "metrics", "contact"],
        topStack: ["Docker · Compose", "GitHub Actions", "GHCR", "Nginx · Linux", "Prometheus · Grafana", "Loki · Tempo", "OpenTelemetry", "Bash · Certbot"],
        highlights: ["years", "integrations", "landingPages", "probes", "alertRules", "streak", "organizations", "repositories"],
        skillGroupOrder: ["devops", "cloud", "security", "networks", "backend", "databases", "languages", "testing", "iot", "crm", "data", "frontend", "ai", "tools", "foundations"],
        featuredProject: "observability",
        projectCategory: "work",
        keywords: ["devops", "docker", "kubernetes", "ci/cd", "deploy", "infrastructure", "observability", "linux", "platform", "sre", "containers", "github actions", "nginx", "prometheus", "grafana"],
        focusTech: ["Docker", "Docker Compose", "GitHub Actions", "GHCR", "Nginx", "Linux", "Azure", "Kubernetes", "OpenTelemetry", "Prometheus", "Grafana", "Loki", "Tempo", "SSL/Certbot", "Bash", "CodeQL", "Dependabot", "Git", "GitHub", "SSG", "MQTT", "GitLab CI/CD", "Docker Hub", "Promtail", "Blackbox Exporter", "cAdvisor", "Node Exporter", "Nagios", "rsync", "Amazon SES", "Amazon SNS", "Hostinger VPS", "Kali Linux", "Wireshark", "Cisco IOS", "VPN", "Let's Encrypt", "OWASP"],
    },
    fullstack: {
        sectionOrder: ["experience", "projects", "journey", "skills", "about", "services", "testimonials", "certifications", "resume", "metrics", "contact"],
        topStack: ["React · TypeScript", "Next.js", "Vite · Tailwind CSS", "Spring Boot", "FastAPI", "PostgreSQL · MongoDB", "Leaflet · OSRM", "Vitest · Playwright"],
        highlights: ["years", "landingPages", "smartpotCommits", "apiTests", "forms", "widgets", "contributions", "repositories"],
        skillGroupOrder: ["frontend", "backend", "databases", "languages", "testing", "devops", "cloud", "crm", "data", "iot", "ai", "security", "networks", "tools", "foundations"],
        featuredProject: "gopoli",
        projectCategory: "product",
        keywords: ["full stack", "frontend", "react", "typescript", "next.js", "web", "ui", "pwa"],
        focusTech: ["React", "TypeScript", "JavaScript", "Next.js", "Vite", "Tailwind CSS", "HTML", "CSS", "Leaflet", "OSRM", "Thymeleaf", "Web Development", "Spring Boot", "FastAPI", "Node.js", "Vitest", "Figma", "AG Grid", "Plotly", "Bootstrap", "jQuery", "PWA", "Select2", "SweetAlert2", "jsPDF", "WordPress", "Playwright", "Lighthouse", "Firebase", "Netlify", "Render"],
    },
};

export const roleConfig = (role: RoleId | null): RoleConfig => (role ? ROLES[role] : GENERAL);
