import type {SkillGroupFacts} from "@/types/content";

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
