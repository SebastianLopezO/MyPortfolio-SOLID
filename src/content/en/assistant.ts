import type {AssistantCopy} from "@/types/assistant";

const list = (items: string[]) =>
    items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

export const assistant: AssistantCopy = {
    title: "Profile assistant",
    subtitle: "Answers built from this portfolio. No AI service involved.",
    close: "Close assistant",
    placeholder: "Ask about experience, projects, education…",
    send: "Send",
    inputLabel: "Your question",
    you: "You",
    assistant: "Assistant",
    welcome:
        "Hi! I answer with what this portfolio says about Sebastián's experience, projects, education, certifications, services and availability. Try one of these questions or open \"More questions\".",
    suggestionsLabel: "Suggested questions",
    inHisWords: (text) => `In his words: "${text}"`,
    suggestions: {
        general: ["Who is Sebastián?", "How many years of experience does he have?", "What services does he offer?", "Why hire him?", "Is he available?"],
        backend: ["What backend work has he done?", "Which APIs has he integrated?", "Which databases does he use?", "What does he do at TIVENOS?", "Is he available?"],
        crm: ["What has he built with Zoho CRM?", "Which integrations has he done?", "How many clients has he served?", "What does he do at ADCOM?", "Is he available?"],
        data: ["What data work has he done?", "Which BI tools does he use?", "Which Power BI certifications does he have?", "What did he do at MUV-U?", "Is he available?"],
        devops: ["How does he deploy services?", "What observability stack does he use?", "Has he used Kubernetes?", "What is his cybersecurity experience?", "Is he available?"],
        fullstack: ["Which frontends has he built?", "What is SmartPot?", "What is GoPoli?", "How was this site built?", "Is he available?"],
    },
    followUps: {
        greeting: ["Who is Sebastián?", "What services does he offer?", "Why hire him?"],
        about: ["What has his career been like?", "Where does he work now?", "What is his tech stack?"],
        experienceYears: ["Where does he work now?", "What has his career been like?", "Which industries has he worked in?"],
        currentRole: ["What does he do at TIVENOS?", "What does he do at ADCOM?", "Has he led teams?"],
        company: ["What do his colleagues say?", "Which industries has he worked in?", "How many years of experience does he have?"],
        roleFit: ["Why hire him?", "Is he available?", "What is his tech stack?"],
        availability: ["Where does he live?", "What services does he offer?", "Can I download his resume?"],
        location: ["Is he available?", "What languages does he speak?"],
        education: ["What did he study at SENA?", "What is he doing in the diploma?", "What are his plans?"],
        program: ["Which certifications does he have?", "What are his plans?", "What are his projects?"],
        plans: ["What is he doing in the diploma?", "What is his cybersecurity experience?"],
        security: ["What are his plans?", "How does he deploy services?"],
        languages: ["Where does he live?", "Is he available?"],
        projects: ["What is SmartPot?", "What is GoPoli?", "What are the Zoho CRM widgets?"],
        project: ["What are his projects?", "Which GitHub organizations is he in?"],
        certifications: ["Does he have a Python certification?", "Which Power BI certifications does he have?", "What did he study?"],
        testimonials: ["Why hire him?", "How does he work?"],
        resume: ["Is he available?", "What languages does he speak?"],
        githubStats: ["Which GitHub organizations is he in?", "How many hours does he code?"],
        organizations: ["How many commits does he have on GitHub?", "What is SmartPot?"],
        coding: ["Does he use AI?", "How many commits does he have on GitHub?"],
        clients: ["What does he do at TIVENOS?", "What does he do at ADCOM?"],
        industries: ["What did he do at Quipux?", "What did he do at MUV-U?"],
        services: ["Why hire him?", "How much does he charge?", "Is he available?"],
        whyHire: ["How does he work?", "What do his colleagues say?", "Is he available?"],
        workStyle: ["Has he led teams?", "Why hire him?"],
        journey: ["What did he do at Quipux?", "What are his plans?"],
        leadership: ["What does he do at TIVENOS?", "What is SmartPot?"],
        ai: ["What is SmartPot?", "How many hours does he code?"],
        site: ["How does this assistant work?", "What is his tech stack?"],
        stack: ["Is he a good fit for a backend role?", "Does he use AI?", "Which certifications does he have?"],
        salary: ["Is he available?", "What services does he offer?"],
        search: ["Who is Sebastián?", "What are his projects?"],
        fallback: ["Who is Sebastián?", "What services does he offer?", "What is his tech stack?"],
    },
    catalog: {
        open: "More questions",
        close: "Fewer questions",
        groups: [
            {
                title: "Profile",
                questions: ["Who is Sebastián?", "What has his career been like?", "How does he work?", "Why hire him?", "Has he led teams?"]
            },
            {
                title: "Experience",
                questions: [
                    "How many years of experience does he have?",
                    "Where does he work now?",
                    "What does he do at TIVENOS?",
                    "What does he do at ADCOM?",
                    "What did he do at MUV-U?",
                    "What did he do at Quipux?",
                    "Which industries has he worked in?",
                    "How many clients has he served?",
                ],
            },
            {
                title: "Projects",
                questions: ["What are his projects?", "What is SmartPot?", "What is GoPoli?", "What is PepperCRM?", "What are the Zoho CRM widgets?"]
            },
            {
                title: "Skills",
                questions: [
                    "What is his tech stack?",
                    "Is he a good fit for a backend role?",
                    "Which BI tools does he use?",
                    "How does he deploy services?",
                    "Does he use AI?",
                    "What is his cybersecurity experience?",
                ],
            },
            {
                title: "Education",
                questions: [
                    "What did he study?",
                    "What did he study at SENA?",
                    "What is he doing in the diploma?",
                    "Which certifications does he have?",
                    "Does he have a Python certification?",
                    "What are his plans?",
                ],
            },
            {
                title: "GitHub",
                questions: ["How many commits does he have on GitHub?", "Which GitHub organizations is he in?", "How many hours does he code?"]
            },
            {
                title: "Hiring",
                questions: [
                    "Is he available?",
                    "What services does he offer?",
                    "Where does he live?",
                    "What languages does he speak?",
                    "How much does he charge?",
                    "Can I download his resume?",
                    "What do his colleagues say?",
                ],
            },
            {title: "This site", questions: ["How was this site built?", "How does this assistant work?"]},
        ],
    },
    links: {
        about: "About",
        journey: "My journey",
        services: "Services",
        reasons: "Why hire me",
        experience: "Experience",
        skills: "Skills",
        projects: "Projects",
        certifications: "Certifications",
        metrics: "GitHub metrics",
        resume: "Resume",
        testimonials: "Recommendations",
        contact: "Contact",
        roleView: "Open the role view",
        downloadCv: "Download CV",
        whatsapp: "Write on WhatsApp",
        email: "Send an email",
    },
    pages: {
        experience: "All experience",
        education: "All education",
        certifications: "All certifications",
        skills: "All technical skills",
        organizations: "GitHub organizations",
        services: "Services",
        reasons: "Why hire me",
        metrics: "GitHub metrics",
        projects: "All projects",
    },
    answers: {
        greeting: () =>
            "Hi! Ask me about his experience, projects, education, services or how to reach him. Suggested questions are below, and \"More questions\" lists every one I can answer.",
        about: ({years, currentJobs}) =>
            `Sebastián López Osorno is a backend and integration developer in Medellín, Colombia, in the last semester of a Computer Engineering degree. For ${years} years he has been getting systems that don't talk to each other to share data people can trust, and today he works at ${list(currentJobs.map((job) => job.company))}.`,
        salary: () =>
            "Compensation depends on the role, scope and type of contract, so Sebastián prefers to discuss it directly. Write to him and he will reply soon.",
        experienceYears: ({years, currentJobs}) =>
            `Sebastián has ${years} years of experience. He started in August 2022 as a data analysis intern and today works at ${list(currentJobs.map((job) => job.company))}.`,
        currentRole: ({currentJobs}) => `He currently works as ${list(currentJobs.map((job) => `${job.title} at ${job.company}`))}.`,
        company: ({
                      company,
                      title,
                      period,
                      summary
                  }) => `${title} at ${company} (${period}). In his words: "${summary}"`,
        roleFit: ({role, stack, company, example}) =>
            `${role} is one of his main profiles. He works with ${list(stack)}. For example, at ${company}: "${example}"`,
        availability: () =>
            "He is open to new opportunities, remote or hybrid from Medellín, Colombia. The fastest way to reach him is WhatsApp or email.",
        location: () => "He lives in Medellín, Colombia (UTC−5) and works remotely. He is open to remote or hybrid roles.",
        education: () =>
            "He is in the last semester of Computer Engineering at Politécnico Colombiano Jaime Isaza Cadavid (graduating in March 2027), where he is also taking the Cybersecurity Diploma from September to December 2026. He holds a Software Programming Technician degree from SENA – IUSH, and before that did the technical track at Pascual Bravo and high school at INEM.",
        program: ({degree, school, period, tagline}) => `${degree}, ${school} (${period}). ${tagline}.`,
        plans: () =>
            "After graduating as a Computer Engineer in March 2027, he plans a data science specialization (2027–2028) and then a master's in cybersecurity (2028–2030), always with an engineering focus. By 2030 he wants to build secure-by-design data platforms for education and public institutions, aligned with the 2030 Agenda.",
        security: () =>
            "He is taking the Diploma in Computer Cybersecurity and Digital Resilience (September to December 2026), with labs on reconnaissance with Nmap, a CTF up to privilege escalation and incident response. He holds the HACKLAB ethical hacking and the Universidad de Antioquia cybersecurity certifications, and at work he ships hardened Docker images behind Nginx with SSL.",
        languages: () => "He speaks Spanish (native), English (professional working proficiency) and basic Portuguese.",
        projects: () =>
            "His main projects are SmartPot, an IoT platform for hydroponic crops where he is the lead developer; GoPoli, a ride-sharing PWA for university students; and PepperCRM, a CRM product where he wrote most of the backend. The portfolio has a page for each of his twenty projects.",
        project: ({name, summary}) => `${name}. In his words: "${summary}"`,
        certifications: ({certifications, issuers}) =>
            `He holds ${certifications} certifications from ${issuers} issuers, including IT Specialist – Python (Certiport), DAX and Power BI (Platzi) and Data Science & AI (Universidad de Antioquia). Each has its own page with what he learned and where it shows in his work.`,
        certificationMatch: ({titles}) => `Yes. He holds the ${list(titles)} ${titles.length === 1 ? "certification" : "certifications"}.`,
        testimonials: ({testimonials}) =>
            `He has ${testimonials} LinkedIn recommendations from supervisors and teammates, highlighting his reliability, problem solving and business sense.`,
        resume: () => "You can download his resume as a PDF, in a compact ATS version or an extended one.",
        githubStats: ({contributions, commits, repositories, streak, asOf}) =>
            `From February 2022 to ${asOf} he made ${contributions} contributions on GitHub, ${commits} of them commits, across ${repositories} repositories. His streak of consecutive days with contributions passed ${streak} days and was still going.`,
        organizations: ({organizations}) =>
            `His code lives in ${organizations} GitHub organizations. TIVENOS's, ADCOM's and his Quipux internship's are private, and the rest are SmartPot's, GoPoli's and PepperCRM's, one for a data technical test and one for each stage of his studies. These hold the most commits of his.`,
        coding: ({codingHours, topLanguages, commits}) =>
            `WakaTime has tracked ${codingHours} hours of coding; the languages with the most hours are ${list(topLanguages)}, and GitHub counts ${commits} commits of his since February 2022.`,
        clients: ({integrations, clients, landingPages}) =>
            `At TIVENOS he leads ${integrations} integration services for ${clients} education clients across Latin America and Spain, and at ADCOM GROUP he has delivered ${landingPages} admissions landing pages and microsites.`,
        industries: () =>
            "He has worked in four industries. In higher education he builds the universities' admissions integrations at TIVENOS and their campaigns at ADCOM, where he also works with consumer and lottery brands. MUV-U is in study abroad, and Quipux in mobility and collections.",
        services: ({services}) => `His ${services.length} services are ${list(services)}. Each one links to the projects where he has already done it.`,
        whyHire: () => "Here are three reasons people who worked with him give, each with a sentence quoted word for word from their LinkedIn recommendation.",
        leadership: () =>
            "Yes. At TIVENOS he is the IT Manager, so he runs the team's IT operations and help desk, and he set the code, security and deployment standards the services share. At SmartPot he leads the development of a platform built by a team of five, and at ADCOM he advises the development, marketing and analytics teams.",
        ai: () =>
            "He has built AI since university, where he made an expert system in CLIPS, fuzzy logic and genetic algorithms (with a classmate) and a reactive agent. At SmartPot he developed an assistant that combines expert rules with scikit-learn models to forecast when a crop will leave its range, and at ADCOM, AI agents in Dapta that contact leads. With language models he fine-tuned Qwen2.5 with LoRA and built a RAG pipeline on a quantized Qwen2 and an n8n agent with Claude and MCP servers of his own. Day to day he directs coding agents such as Claude Code with written rules per project, and what they deliver goes through the same tests and CI as any other change. Next is bringing those models to the data he integrates today.",
        site: ({pages}) =>
            `This portfolio is built with Astro 7, SolidJS, TypeScript and Tailwind CSS 4, prerendered as ${pages} pages in English and Spanish and served by nginx in a Docker image. This assistant answers from the site's content. It recognizes what the question asks and, when it can't, searches the portfolio's text, all in the browser and with no AI service.`,
        stack: ({topStack}) => `His core stack is ${list(topStack)}. He also works with PostgreSQL, MongoDB, Redis, React, TypeScript, Prometheus and Grafana.`,
        search: () => "Here is what I found in his profile.",
        fallback: () =>
            "I don't have that information in the portfolio. You can ask about his experience, projects, education or availability, open \"More questions\" or write to him directly.",
    },
};
