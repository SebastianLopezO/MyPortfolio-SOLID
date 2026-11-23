import type {Content} from "@/types/content";
import {EXPERIENCE_YEARS} from "@/content/shared/profile";

const SEEKING = "remote or hybrid";

export const about: Content["about"] = {
    title: "About me",
    subtitle: {
        general: "Practical curiosity, autonomy, and the craft of building systems from the inside out",
        backend: "Curiosity about what happens underneath every request, queue, and database",
        crm: "Curiosity about how teams actually work and how systems can remove friction",
        data: "Curiosity about where every number comes from before anyone trusts a figure",
        devops: "Curiosity about how systems run, fail, and recover in production",
        fullstack: "Curiosity about linking internal architecture with what people touch on screen",
    },
    quote: "In the digital world we can write the rules from scratch and dig as deep as a problem asks.",
    intro: `I have been coding for around seven years from Medellín and working in tech for over ${EXPERIENCE_YEARS}, driven mostly by the same itch: understanding how something works inside before relying on it. Accepting a tool as a black box bores me, and watching people copy the same data by hand when software could handle it bothers me. That is why I learn on my own, working directly on real problems until every layer makes sense.`,
    homePillars: [
        {
            title: "Practical curiosity",
            text: "I learn straight on a real problem, opening the docs and testing until the mechanics underneath click.",
        },
        {
            title: "No narrow boxes",
            text: "In software we set our own rules, so I step down into whichever layer a case calls for without boxing myself in.",
        },
        {
            title: "Grounded autonomy",
            text: "When a piece is missing I research, test locally, and carry the solution until it runs on its own.",
        },
        {
            title: "Natural adaptability",
            text: "Switching languages, industries, or tools takes less friction once you know the fundamentals underneath.",
        },
    ],
    story: {
        general: [
            "To me, technology works as a space with no fixed walls: you can build your own tools, cross disciplines, and go as deep into any piece as the case calls for. When something pushes back, I pull the process apart, read the spec or protocol, and test locally until I own it. That habit lets me adapt quickly to new languages, industries, and teams without losing engineering judgment.",
            "I started coding in 2019 during technical high school, and in 2022 entered university alongside my first job in data analysis. Since then I have moved across BI, CRM, backend, web development, infrastructure, and integration leadership, picking up each new stack when a concrete problem asked for it.",
        ],
        backend: [
            "When an issue sits behind an API or a sync job, I like going down to the real mechanics: contracts, state, retries, and what happens when a network drops halfway through. Picking up a new language or protocol on my own became second nature, because the fundamentals under the server repeat even when the syntax changes.",
            "My server-side work started with Python scripts cleaning data and grew into external integrations, product APIs in Spring Boot, and 20+ FastAPI services in production combining REST, SOAP with WS-Security, background queues, and idempotency.",
        ],
        crm: [
            "When I step into a sales or admissions workflow, I start by listening to the people using it every day. I want to know which field is missing, where manual entry repeats, and what automation removes steps instead of adding more screens. A CRM earns its keep when it backs the real operation quietly.",
            "I reached CRM work by cleaning databases so commercial reports could be trusted, moved into Deluge automations and attribution-ready landing pages, and now integrate Zoho CRM with academic systems across 15+ institutions while building custom widgets inside the record.",
        ],
        data: [
            "I have a hard time trusting a number if I have not seen where it came from. Before building a dashboard or model, I check the raw sources, hunt down duplicates, and ask which decision depends on that figure. I would rather learn whatever query, metric, or language it takes so the data stays honest.",
            "I started in data with ETL routines, automated Python reports, and collections KPI dashboards; later I built Power BI reports for finance, sales, and marketing, and today I pair SQL in Zoho Analytics with bulk CRM snapshots loaded into PostgreSQL.",
        ],
        devops: [
            "I feel much better knowing how something deploys, where its logs land, and how it alerts if it breaks at three in the morning. Whenever an infrastructure layer feels opaque, I test it locally and make it automated and repeatable so the team can stop fighting fires.",
            "My infrastructure work began with internal servers and user support, moved on to a Docker and Nginx VPS deploying 100+ landing pages without restarts, and now covers hardened GHCR images and a Prometheus, Loki, Tempo, and Grafana stack sending alerts to Telegram.",
        ],
        fullstack: [
            "I like walking the whole stretch between the database and the screen, because a shortcut on one end always shows up on the other. I care about internal structure as much as speed, loading states, and the details someone notices the first time they open an app.",
            "I started building PHP and MySQL web apps in high school and technical college, moved to Spring Boot and React at university, and since 2024 I have led the SmartPot IoT platform and contributed to GoPoli in Next.js alongside production forms and widgets.",
        ],
    },
    versatility: "Moving across data, CRM, backend, frontend, servers, and security lets me speak plainly with marketing, finance, admissions, or IT without a translator and turn loose requests into concrete engineering tasks.",
    ai: [
        "With artificial intelligence I walked the full stretch, from building components by hand to directing AI tools in daily engineering. At university I built, with a classmate, a CLIPS expert system, fuzzy logic with scikit-fuzzy, and genetic algorithms, plus a reactive agent of my own for switching actuators. Later I brought expert rules and scikit-learn forecasting into SmartPot to catch crop drift early, and worked with conversational agents in Dapta for automated lead outreach.",
        "I work with language models at both ends of the scale. On the compact side, I fine-tuned Qwen2.5-1.5B with LoRA and built a local RAG pipeline on a quantized Qwen2-0.5B model with a FAISS index that runs on modest hardware offline. On the larger side, I built an n8n agent powered by Claude talking to three custom Python MCP servers, alongside work with GPT, Gemini, and open models via Ollama.",
        "In day-to-day development I direct coding agents, Claude Code among them, under written engineering rules covering architecture boundaries, commit standards, and required tests. Every proposal gets human review and runs through the exact same CI as hand-written code. Having built AI systems from the inside is what lets me choose what to delegate, spot shaky output fast, and stay firmly in charge of the design.",
    ],
    ambition: "What I want to build next brings together two areas I already work in daily: putting language models and safe RAG pipelines on top of each organization's real data, with clear privacy, traceability, and controls from the start. Academically, I finish the cybersecurity diploma in December 2026 and graduate as a Computer Engineer in March 2027, followed by a data science specialization and a master's in cybersecurity.",
    closing: {
        general: `What drives me most is giving teams back hours lost to manual entry and making sure their data reflects reality. I am looking for a backend or integrations role where that judgment counts, ${SEEKING}.`,
        backend: `What matters most to me is data arriving complete and on time across systems, with no hand-copying in between. I am looking for a Python or Java backend role where I design services and own them in production, ${SEEKING}.`,
        crm: `What matters most to me is every advisor seeing what actually happened with an applicant or client inside the CRM, without typing it twice. I am looking for a CRM, Zoho, or automation role where the CRM anchors daily operations, ${SEEKING}.`,
        data: `What matters most to me is finance, sales, and marketing deciding from the same verifiable figure. I am looking for a data or BI role where analysis leads to real decisions, ${SEEKING}.`,
        devops: `What matters most to me is that the teams relying on a service are never the first to find out it went down. I am looking for a DevOps or platform role, ${SEEKING}.`,
        fullstack: `What matters most to me is a product working just as well for the person using it as for whoever maintains it months later. I am looking for a full-stack role with React and TypeScript, ${SEEKING}.`,
    },
    page: {
        lead: "The rest of this portfolio already lays out dates, roles, projects, and repositories. This page explains what sits underneath: how I think, what triggers my curiosity, why I chose each study or certificate, and where I want to take my work.",
        glance: {
            baseLabel: "Based in",
            base: "Medellín, Colombia (UTC−5)",
            spanLabel: "Time in craft",
            span: `~7 years coding · ${EXPERIENCE_YEARS}+ working`,
            driveLabel: "Core drive",
            drive: "Practical curiosity and self-directed learning",
            focusLabel: "Next frontier",
            focus: "Trustworthy data, applied AI, and security",
            lensLabel: "Active lens",
            generalLens: "Switch to general view",
            talkCta: "Let's talk",
            resumeCta: "View resume",
            backHomeCta: "Back to home summary",
        },
        sections: {
            worldview: "Building our own digital world",
            curiosity: "Curiosity, tastes, and how I learn",
            choices: "Why I chose my studies and certificates",
            approach: "How I work, adapt, and use AI",
            horizon: "What moves me and what I want to learn",
            explore: "Explore the rest of the portfolio",
        },
        worldview: {
            paragraphs: [
                "What hooked me from my first lines of code is that digital space runs on different rules than the physical world. Outside, most limits come prebuilt; inside a machine we act like small gods building our own digital world from scratch, setting its structures, flows, interfaces, and logic. Every system out there began in someone's head, which means it can also be opened up, understood down to the gears, and rebuilt better.",
                "Having a canvas of open-ended possibilities right in front of me is what keeps me moving. Locking myself into one narrow specialty has always felt unnatural: real problems cross layers every day, and in software you can always dig into each piece until you understand it properly. One day the root cause sits in a web form, the next in a messy schema, a tight server, or a missing permission rule. Having the freedom to walk straight down to that layer is something I genuinely enjoy.",
                "That choice comes with a clear trade-off: when you do not hide behind a single title, you have to earn real depth in every room you walk into. I am fine with that bargain. I would rather read a dense spec on a Saturday than spend months repeating the same template without knowing what runs underneath.",
            ],
            principles: [
                {
                    title: "No black boxes",
                    text: "When a library, protocol, or model affects the outcome, I pop the hood until I see how it behaves.",
                },
                {
                    title: "Simple holds up longer",
                    text: "I reach for native capabilities and extend what already works before piling on extra layers.",
                },
                {
                    title: "Depth on demand",
                    text: "Breadth earns its value when you can dive all the way into the specific case in front of you.",
                },
                {
                    title: "Zero mechanical drudgery",
                    text: "Whenever someone repeats the same clicks every morning, there is usually a workflow waiting to be automated.",
                },
            ],
            skillsTitle: "Fifteen groups of tools",
            skillsText: "How that breadth turns into real technologies, each with its focus and the projects proving it.",
            metricsTitle: "My coding rhythm in figures",
            metricsText: "How my commits break down across areas, years, active days, and tracked hours.",
        },
        curiosity: {
            paragraphs: [
                "My learning style has always been hands-on and self-directed. Reading a hundred abstract pages puts me to sleep; I learn when I have a concrete question or something I want to see running. When I got curious about how classic compression shrinks a file, I coded my own Huffman compressor and compared its output byte for byte against real archive formats. When I wanted to feel how different languages behave under testing, I wrote the same CRUD across six languages with TDD to see where each one gets in the way and where it fits best.",
                "I also enjoy crossing worlds that rarely sit together: microcontrollers and sensors talking to a web app, statistics on real datasets, or quantized language models running locally just to see how far they stretch under a gigabyte of RAM. Working from Medellín between a daily laptop and a desktop machine for experiments, most of what I know came from poking at ideas on my own until they stopped feeling like magic.",
                "Over time I noticed which problems actually give me energy: getting isolated systems to share reliable data, watching a physical sensor report live readings to a screen, or designing a calm interface that hides messy machinery underneath. Nearly every personal or university project in this portfolio started from one of those questions.",
            ],
            projectsHeading: "Projects born from that curiosity",
            projectsCta: "See all projects",
            organizationsCta: "See all 10 GitHub organizations",
        },
        choices: {
            paragraphs: [
                "I have never treated studying as collecting badges for a wall. Every degree, technical track, and certificate came from either a real gap I hit in my work or a subject I wanted to understand with structure. In high school I picked the technical track because I wanted to write real software before college, and later I ran a programming technician program alongside my first year of Computer Engineering so practice stayed anchored next to theory.",
                "I chose Computer Engineering at a public university in Medellín for the heavy foundations short tutorials leave out: data structures, compilers, operating systems, networking on physical routers, artificial intelligence, and applied math. That bedrock is what lets me open dense documentation for an unfamiliar system and find my footing fast.",
                "Certifications followed the same filter. I took SQL, Python, advanced Excel, Power BI, and DAX right when I was cleaning real databases and building dashboards people used for financial and commercial decisions; IoT communication protocols when wiring up ESP32 boards and sensors; SEO when shipping my own sites; and Green Digital Skills because I wanted to understand the environmental cost of the infrastructure we run. In my final semester I added the cybersecurity diploma out of practical responsibility: when you build APIs, servers, and integrations carrying data for thousands of people, knowing how systems get audited and broken changes how you design them from day one.",
            ],
            programsHeading: "The five programs behind my formal training",
            certsHeading: "Four certificates and why each one mattered",
            certsIntro: "Each credential filled a real gap or structured an active interest; open any of them to see what it covered and where it was applied.",
            educationCta: "See all education and courses",
            certsCta: "See all 29 certifications",
        },
        approach: {
            paragraphs: [
                "My work approach starts with a plain question: what real headache is the person on the other side dealing with? I am comfortable talking plainly with marketing, finance, admissions, or infrastructure teams, turning loose requests into concrete steps, and shipping systems that keep running without constant babysitting. When something breaks in production, I cut the noise, check logs, metrics, and traces with a cool head, and leave behind an alert or test so it does not surprise us twice.",
                "Adapting fast has less to do with rare talent and more to do with method: spot the familiar pattern hiding under the new tool, spin up a small sandbox where mistakes are cheap, and write down what worked so the team spends half the time. People who have worked with me usually point to that mix of calm under pressure, autonomy, and willingness to share what I learn.",
            ],
            aiHeading: "With artificial intelligence: from building it to directing it",
            reasonsHeading: "How teammates and managers describe working with me",
            experienceCta: "See where this ran in production",
            servicesCta: "See the services I offer",
        },
        horizon: {
            paragraphs: [
                "What drives me day to day stays tangible: giving people back hours lost to repetitive tasks, turning scattered records into data an organization can trust, and leaving clean code someone else can maintain without pain. Teaching and documenting motivate me too; a large share of what I know came from people who took time to explain how things worked.",
            ],
            learningHeading: "What I want to dig deeper into next",
            learningItems: [
                "Assistants and RAG pipelines over institutional data with strict access controls and clear traceability",
                "Event-driven architectures, queues, and distributed services designed for real load spikes",
                "Defensive security, threat modeling (OWASP), and running production clusters on Kubernetes",
                "Applied data science and MLOps to carry models from local experiments into steady production",
            ],
        },
        explore: {
            intro: "If you want to go from how I think to the concrete proof, each door below opens a different side of the work.",
            items: [
                {
                    key: "experience",
                    title: "Professional experience",
                    description: "Roles, timelines, projects, and outcomes where this mindset ran in production.",
                },
                {
                    key: "projects",
                    title: "Projects and case studies",
                    description: "Products, client work, and university labs with architecture decisions and screens.",
                },
                {
                    key: "journey",
                    title: "Journey and 2030 horizon",
                    description: "The full map since 2019, capability growth, tech radar, and upcoming milestones.",
                },
                {
                    key: "skills",
                    title: "Technical skills",
                    description: "Fifteen tool groups explained by focus, practical use, and the work that proves them.",
                },
                {
                    key: "education",
                    title: "Education and coursework",
                    description: "The full curriculum, technical programs, and repositories across every stage.",
                },
                {
                    key: "services",
                    title: "Services",
                    description: "Eight areas I can take on inside a team or as a technical consultant.",
                },
                {
                    key: "reasons",
                    title: "Eleven reasons to hire me",
                    description: "Each trait backed word for word by recommendations from managers and teammates.",
                },
                {
                    key: "metrics",
                    title: "GitHub metrics",
                    description: "Verified activity across areas, years, active days, streaks, and tracked coding hours.",
                },
            ],
        },
    },
    terminal: {
        label: "ASCII portrait in a terminal",
        command: "$ cat mindset.txt",
        logCommand: "cat journey.log",
        entries: [
            {year: "2019", text: "INEM: first algorithms and web design", roles: ["fullstack"]},
            {year: "2020", text: "Pascual Bravo: software development technician", roles: ["fullstack", "backend"]},
            {
                year: "2022",
                text: "Politécnico and SENA: engineering and a programming technician degree",
                roles: ["backend", "fullstack"],
            },
            {year: "2022", text: "Quipux: data analysis internship", roles: ["data"]},
            {year: "2023", text: "MUV-U: CRM, Power BI and servers", roles: ["crm", "data", "devops"]},
            {
                year: "2024",
                text: "SmartPot: lead developer of the IoT platform",
                roles: ["backend", "fullstack", "devops"],
            },
            {year: "2025", text: "ADCOM: CRM, MarTech and 100+ landing pages", roles: ["crm", "fullstack"]},
            {
                year: "2025",
                text: "TIVENOS: IT Manager and integration lead",
                roles: ["backend", "crm", "data", "devops"],
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
