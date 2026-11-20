import type {
    CertificationId,
    EducationId,
    ExperienceId,
    ServiceId,
    SkillGroupFacts,
    SkillGroupId
} from "@/types/content";
import type {ProjectId} from "@/types/project";

/**
 * Every tool comes from the work, the coursework or the badges of the GitHub profile README
 * (SebastianLopezO/SebastianLopezO); docs/content.md lists the sources.
 */
export const skillGroups: SkillGroupFacts[] = [
    {
        id: "backend",
        items: [
            "FastAPI", "Spring Boot", "Spring Security", "Django", "Flask", "Node.js", "Laravel", "REST", "SOAP/WSDL (Zeep)", "GraphQL (Strawberry)",
            "Webhooks", "JWT", "OAuth 2.0", "OpenAPI", "Swagger", "Pydantic", "SQLAlchemy", "asyncpg", "Jinja2", "Thymeleaf",
        ],
    },
    {
        id: "crm",
        items: [
            "Zoho CRM", "Zoho Creator", "Zoho Analytics", "Zoho Forms", "Zoho WorkDrive", "Zoho One", "Zoho CRM Bulk API", "Zoho Extension Toolkit", "Deluge",
            "WhatsApp API", "Meta Ads", "Google Ads", "Google Tag Manager", "Typeform", "Shopify", "Dapta", "n8n", "Zapier", "Power Automate", "UiPath",
            "Google Apps Script",
        ],
    },
    {
        id: "data",
        items: [
            "SQL", "Pandas", "NumPy", "SciPy", "Power BI", "DAX", "Zoho Analytics", "Tableau", "Excel", "VBA", "ETL", "Jupyter", "Anaconda", "Matplotlib",
            "Plotly", "D3.js", "Google Analytics 4",
        ],
    },
    {
        id: "devops",
        items: [
            "Docker", "Docker Compose", "GitHub Actions", "GitLab CI/CD", "GHCR", "Docker Hub", "Nginx", "Linux", "Kubernetes", "OpenTelemetry", "Prometheus",
            "Grafana", "Loki", "Promtail", "Tempo", "Blackbox Exporter", "cAdvisor", "Node Exporter", "Nagios", "rsync", "SSL/Certbot", "Bash",
        ],
    },
    {
        id: "cloud",
        items: ["Azure", "Amazon SES", "Amazon SNS", "Hostinger VPS", "Firebase", "MongoDB Atlas", "Redis Cloud", "Render", "Netlify", "Heroku", "GitHub Pages"],
    },
    {
        id: "frontend",
        items: [
            "React", "TypeScript", "Next.js", "Vite", "Tailwind CSS", "HTML", "CSS", "Bootstrap", "jQuery", "PWA", "Leaflet", "Select2", "SweetAlert2",
            "jsPDF", "WordPress", "Bricks Builder",
        ],
    },
    {
        id: "databases",
        items: ["PostgreSQL", "MySQL", "MariaDB", "SQL Server", "Oracle", "MongoDB", "Redis", "SQLite", "H2"]
    },
    {
        id: "languages",
        items: ["Python", "Java", "TypeScript", "JavaScript", "SQL", "Deluge", "PHP", "C", "C++", "C#", "VB.NET", "R", "ARM Assembly", "Bash"]
    },
    {
        id: "security",
        items: ["OWASP", "Kali Linux", "Wireshark", "Spring Security", "JWT", "AES-256-GCM", "WS-Security", "CodeQL", "Dependabot", "Let's Encrypt"],
    },
    {
        id: "networks",
        items: ["Cisco IOS", "Packet Tracer", "OSPF", "EIGRP", "RIPv2", "IPv6", "DHCPv6", "SNMP", "PRTG", "VoIP (Issabel)", "VPN"],
    },
    {id: "iot", items: ["ESP32", "MicroPython", "MQTT", "Mosquitto", "Arduino", "Wokwi", "Thonny"]},
    {
        id: "ai",
        items: ["CLIPS", "scikit-fuzzy", "Genetic algorithms", "scikit-learn", "TensorFlow", "Hugging Face", "AI agents", "MCP servers", "Qwen2", "LoRA", "RAG pipelines", "FAISS", "Ollama", "LLM APIs", "NLP", "TinyML", "Streamlit", "Claude Code"],
    },
    {
        id: "testing",
        items: ["PyTest", "JUnit", "Vitest", "Playwright", "Lighthouse", "Postman", "TDD", "CodeQL", "Dependabot"]
    },
    {
        id: "tools",
        items: ["Git", "GitHub", "GitLab", "Jira", "Confluence", "Figma", "PyCharm", "IntelliJ IDEA", "WebStorm", "DataGrip", "VS Code", "Qt", "WakaTime", "Replit", "GeoGebra"],
    },
    {
        id: "foundations",
        items: [
            "Data Structures", "Algorithms", "Automata Theory", "Formal Languages", "Compiler Design", "Operating Systems", "Computer Architecture",
            "Distributed and Parallel Programming", "Networking", "Numerical Analysis", "Statistics", "Operations Research", "Modeling and Simulation",
        ],
    },
];

/** Every group in the order the general view shows them, which its pages follow from one to the next. */
export const SKILL_IDS: SkillGroupId[] = [
    "backend", "crm", "data", "devops", "databases", "frontend", "cloud", "testing", "languages", "security", "ai", "iot", "networks", "tools", "foundations",
];

/**
 * Where each group shows in the work, linked from its page: the projects and jobs whose stacks use its tools (or, for
 * the foundations, the coursework behind them), the programs and certificates that taught it, and the services it
 * serves. Its copy (content/detail-pages/{en,es}.ts) may name these and nothing else.
 */
export const skillWork: Record<SkillGroupId, {
    projects: ProjectId[];
    experience: ExperienceId[];
    education: EducationId[];
    certifications: CertificationId[];
    services: ServiceId[];
}> = {
    backend: {
        projects: ["integrationPlatform", "peppercrm", "emailAutomations", "crmSnapshots", "gopoli", "schoolServices"],
        experience: ["tivenos", "adcom"],
        education: ["politecnico", "sena"],
        certifications: ["djangoTwo", "pythonDjango", "softwareEngineering"],
        services: ["integration", "automation", "consulting"],
    },
    crm: {
        projects: ["martech", "crmWidgets", "admissionsForms", "zohoToolkit", "integrationPlatform", "crmSnapshots"],
        experience: ["tivenos", "adcom", "muvu"],
        education: [],
        certifications: [],
        services: ["crm", "automation", "integration"],
    },
    data: {
        projects: ["crmSnapshots", "collectionAutomation", "taurus", "zohoToolkit", "lettuceDiseases"],
        experience: ["muvu", "quipux", "tivenos"],
        education: ["politecnico"],
        certifications: ["daxPowerBi", "powerBiAnalysis", "dataVisualization", "excelMastery", "excelDataAnalysis", "sqlBasic"],
        services: ["data", "automation"],
    },
    devops: {
        projects: ["observability", "landingPlatform", "integrationPlatform", "portfolio", "smartpot", "peppercrm"],
        experience: ["tivenos", "adcom"],
        education: ["politecnico"],
        certifications: ["gitGithub"],
        services: ["infra", "observability"],
    },
    databases: {
        projects: ["integrationPlatform", "crmSnapshots", "gopoli", "peppercrm", "taurus", "zohoToolkit"],
        experience: ["tivenos", "adcom"],
        education: ["politecnico", "sena", "pascual"],
        certifications: ["sqlBasic"],
        services: ["data", "integration"],
    },
    frontend: {
        projects: ["gopoli", "realEstateSite", "martech", "admissionsForms", "portfolio", "crmWidgets"],
        experience: ["adcom", "tivenos"],
        education: ["sena", "pascual", "inem"],
        certifications: ["webProgramming", "practicalJavascript", "css", "html"],
        services: ["web"],
    },
    cloud: {
        projects: ["emailAutomations", "observability", "crmSnapshots", "peppercrm", "fashionLine", "sitePersist"],
        experience: ["tivenos", "adcom"],
        education: ["sena"],
        certifications: [],
        services: ["infra", "observability"],
    },
    testing: {
        projects: ["tddPolyglot", "portfolio", "smartpot", "gopoli", "landingPlatform", "lettuceDiseases"],
        experience: ["adcom"],
        education: ["politecnico"],
        certifications: ["softwareEngineering"],
        services: ["infra", "web"],
    },
    languages: {
        projects: ["engineering", "tddPolyglot", "integrationPlatform", "emailAutomations", "technical", "vocational"],
        experience: ["tivenos", "adcom", "muvu", "quipux"],
        education: ["politecnico", "sena", "pascual"],
        certifications: ["itSpecialistPython", "javaBasic", "practicalJavascript", "webProgramming", "pythonFundamentals"],
        services: ["integration", "consulting"],
    },
    security: {
        projects: ["cybersecurityLabs", "integrationPlatform", "gopoli", "peppercrm", "landingPlatform", "smartpot"],
        experience: ["tivenos"],
        education: ["cyberDiploma", "politecnico"],
        certifications: ["cybersecurity", "hacklab"],
        services: ["infra", "integration"],
    },
    ai: {
        projects: ["aiTechniques", "lettuceDiseases", "radarImaging", "smartpot", "engineering"],
        experience: [],
        education: ["politecnico"],
        certifications: ["dataScienceAi"],
        services: ["data", "consulting"],
    },
    iot: {
        projects: ["smartpot", "engineering"],
        experience: [],
        education: ["politecnico"],
        certifications: ["iotProtocols"],
        services: ["integration"],
    },
    networks: {
        projects: ["engineering", "integrationPlatform", "observability"],
        experience: ["tivenos"],
        education: ["politecnico", "cyberDiploma"],
        certifications: [],
        services: ["infra", "observability"],
    },
    tools: {
        projects: ["portfolio", "landingPlatform", "engineering", "smartpot"],
        experience: ["tivenos", "adcom"],
        education: ["politecnico", "sena"],
        certifications: ["gitGithub"],
        services: ["consulting"],
    },
    foundations: {
        projects: ["engineering", "dataCompressor", "aiTechniques", "radarImaging"],
        experience: [],
        education: ["politecnico", "sena", "inem"],
        certifications: ["problemSolving", "programmingFundamentals", "basicProgramming"],
        services: ["consulting"],
    },
};
