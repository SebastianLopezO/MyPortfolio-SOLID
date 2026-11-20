import type {DetailPagesCopy} from "@/types/detail";

export const detailPages: DetailPagesCopy = {
    ui: {
        breadcrumb: "Breadcrumb",
        eyebrow: {
            experience: "Experience",
            education: "Education",
            certifications: "Certification",
            skills: "Technical skill",
            organizations: "GitHub organization",
            services: "Service",
            reasons: "Reason to hire me",
            metrics: "GitHub metrics"
        },
        all: {
            experience: "All experience",
            education: "All education",
            certifications: "All certifications",
            skills: "All skills",
            organizations: "All organizations",
            services: "All services",
            reasons: "All the reasons",
            metrics: "All metrics"
        },
        onThisPage: "On this page",
        atAGlance: "At a glance",
        sections: {
            overview: "Overview",
            positions: "Titles",
            achievements: "What I did",
            timeline: "Timeline",
            projects: "Projects",
            recommendations: "Recommendations",
            meanwhile: "What I was studying meanwhile",
            stack: "Technologies",
            activity: "GitHub activity",
            areas: "Areas of the program",
            courses: "Courses and competencies",
            skills: "What I learned",
            learned: "What I learned",
            program: "The program",
            profile: "What it trains for",
            curriculum: "Curriculum",
            company: "About the company",
            earned: "How I earned it",
            built: "What I built in the course",
            adds: "What it adds to the profile",
            applied: "Where it shows in my work",
            context: "At the time",
            issuer: "Who issues it",
            sameStop: "At the same stop of the journey",
            role: "My role",
            related: "Job or program",
            repositories: "Public repositories",
            metrics: "Organization metrics",
            scope: "What it covers",
            provenIn: "Where I already did it",
            jobs: "In which jobs",
            whyMe: "Why with me",
            quote: "In the words of someone who worked with me",
            practice: "How it shows in my work",
            studies: "In which studies",
            services: "Services where it shows",
            focus: "Focus",
            description: "What it is",
            uses: "What it is good for",
            tools: "Tools",
            education: "Education and certifications",
        },
        facts: {
            title: "Title",
            company: "Company",
            program: "Program",
            school: "Institution",
            period: "Period",
            place: "Location",
            status: "Status",
            graduation: "Expected graduation",
            issuer: "Issuer",
            date: "Date",
            stop: "Stop on the journey",
            visibility: "Visibility",
            repositories: "Repositories",
            members: "Members",
            organization: "GitHub organization",
            duration: "Duration",
            roles: "For the roles",
            quotedBy: "Written by",
            relationship: "Relationship",
            tools: "Tools",
        },
        hours: "{hours} hours",
        curriculumSlider: {previous: "Previous term", next: "Next term"},
        status: {current: "Current", finished: "Finished", inProgress: "In progress"},
        visibility: {public: "Public", private: "Private"},
        privateCode: "Its code is private",
        activity: {
            commits: "{mine} of {people} commits",
            share: "{percent} of the commits made by people",
            repositories: "commits of mine in {count} of {total} repositories",
            byYear: "My commits per year",
            note: "Commits on the default branch of every repository, merges included and bots left out, read from the GitHub API on {date}. They add up every Git identity I have used.",
        },
        events: {
            joined: "Joined {company} as {title}",
            position: "Became {title}",
            left: "Left {company}",
            project: "{name} begins",
            recommendation: "Recommendation from {author}",
            programStart: "Started the {degree}",
            programEnd: "Finished the {degree}",
            graduation: "Expected graduation",
            certification: "Earned the {title} certification",
        },
        timeline: {
            filter: "Filter the timeline",
            all: "All",
            kinds: {
                job: "Roles",
                program: "Studies",
                project: "Projects",
                recommendation: "Recommendations",
                certification: "Certifications",
                milestone: "Milestones",
            },
            showing: "{count} entries in the timeline",
        },
        counts: {
            projects: {one: "1 project", other: "{count} projects"},
            recommendations: {one: "1 recommendation", other: "{count} recommendations"},
            certifications: {one: "1 certification", other: "{count} certifications"},
            repositories: {one: "1 repository", other: "{count} repositories"},
            jobs: {one: "1 job", other: "{count} jobs"},
            programs: {one: "1 program", other: "{count} programs"},
        },
        actions: {
            credential: "View credential",
            openRepository: "Open the repository",
            openOrganization: "Open on GitHub",
            readPage: "Read the page",
            previous: "Previous",
            next: "Next",
            talk: "Let's talk about this service",
            seeReasons: "Why hire me",
            talkSkill: "Let's talk about a project like this",
        },
        workKinds: {project: "Project", experience: "Experience"},
        contextIntro: "When I earned it, I was working or studying here:",
        certificationGroups: {label: "Group the certifications", issuer: "By issuer", year: "By year"},
        certificate: {
            title: "The certificate",
            caption: "As {issuer} publishes it.",
            redacted: "The ID number is covered in the original.",
            alt: "Certificate of “{title}” issued by {issuer} to Sebastián López Osorno",
            enlarge: "open at full size",
            seoTail: "Issued to Sebastián López Osorno.",
        },
        reasonSeoTail: "Backed by the recommendation of {author}.",
    },
    indexes: {
        experience: {
            title: "Professional experience",
            subtitle: "Four companies since 2022, from a data internship to leading integrations. Each company's page has the titles, the timeline, the projects, the technologies and the recommendations of the people who worked with me.",
            seo: {
                title: "Professional experience · Sebastián López Osorno",
                description: "The titles, timeline, projects, technologies and recommendations of TIVENOS, ADCOM, MUV-U and Quipux, from 2022 to today.",
            },
        },
        education: {
            title: "Education",
            subtitle: "The Computer Engineering degree, the cybersecurity diploma and the technical programs that came before, each with its areas, courses, projects and repositories.",
            seo: {
                title: "Education · Sebastián López Osorno",
                description: "Computer Engineering at Politécnico Colombiano Jaime Isaza Cadavid, a cybersecurity diploma and the technical programs at SENA, Pascual Bravo and INEM.",
            },
        },
        certifications: {
            title: "Certifications",
            subtitle: "{count} certifications from {issuers} issuers, from 2020 to 2024, by issuer or by year. Each one opens to what I learned, what it adds to the profile, where it shows in my work and what I was doing when I earned it.",
            seo: {
                title: "Certifications · Sebastián López Osorno",
                description: "IT Specialist in Python, Power BI and DAX, data science, cybersecurity, web development and programming fundamentals, with what each one adds.",
            },
        },
        skills: {
            title: "Technical skills",
            subtitle: "Fifteen groups of tools, from the backend and the CRM to the foundations of my degree. Each one has its own page, with the focus I give it, what it is, what it is good for, all its tools and the projects, jobs, studies and services where it shows.",
            seo: {
                title: "Technical skills · Sebastián López Osorno",
                description: "Backend, Zoho CRM, data, DevOps, databases, frontend, cloud, security, AI and more: fifteen groups of tools, each with the projects that prove it.",
            },
        },
        organizations: {
            title: "GitHub organizations",
            subtitle: "The ten organizations that hold my code, from those of my jobs and my internship and those of the products I built to one for a technical test and one for each stage of my studies, each with my commits per year.",
            seo: {
                title: "GitHub organizations · Sebastián López Osorno",
                description: "Ten GitHub organizations with my code, across TIVENOS, ADCOM, SmartPot, GoPoli, PepperCRM, my degree and the technical programs, with my commits in each.",
            },
        },
        services: {
            title: "Services",
            subtitle: "What I can take on for a team or a company: integrations between systems, Zoho CRM, web and landing pages, data, automation, infrastructure, observability and technical consulting. Each service has its own page, with what it covers, the projects where I already did it and the jobs I did it in.",
            seo: {
                title: "Integration, CRM and backend services · Sebastián López Osorno",
                description: "Integrations and backend, Zoho CRM development, web, data, automation, infrastructure, observability and consulting, each with the projects that prove it.",
            },
        },
        reasons: {
            title: "Why hire me?",
            subtitle: "Eleven reasons, each with what a manager, a teammate or a colleague wrote about working with me, and with the projects, jobs and studies where it shows.",
            seo: {
                title: "Why hire me · Sebastián López Osorno",
                description: "Eleven reasons to hire me, each with a recommendation from a manager or a teammate and the projects, jobs and studies where it shows in my work.",
            },
        },
        metrics: {
            title: "GitHub metrics",
            subtitle: "My GitHub activity in numbers: contributions, commits, active days, streaks and reviews, the areas my commits went to, how the activity grew each year, the days I work and the editors I use, with what each figure says and what it does not.",
            seo: {
                title: "GitHub metrics · Sebastián López Osorno",
                description: "Contributions, commits, active days, streaks and reviews on GitHub since 2022, by area, year, weekday and editor, with what each figure means.",
            },
        },
    },
    experience: {
        tivenos: {
            tagline: "Integrations, observability and CRM tools for universities in Latin America and Spain",
            intro: [
                "TIVENOS builds technology for education. It implements and runs Zoho CRM for universities and business schools in Latin America and Spain, and connects that CRM to each institution's academic systems.",
                "I joined in June 2025 as an independent contractor, working remotely, and today I lead the integrations and the team's IT operations.",
            ],
            company: {
                text: [
                    "TIVENOS presents itself as Solutions for Education. It works with educational institutions in Ibero-America on CRM, student information systems, learning platforms, process management, business intelligence, process outsourcing and student retention. Its site counts more than 100 institutions, more than 170,000 students and projects in more than 16 countries, in Ibero-America, the United States and North Africa.",
                    "My work sits on the CRM and integration side of that offer, in the services that connect Zoho CRM with each institution's academic system and in the tools the admissions teams use every day.",
                ],
                source: {label: "TIVENOS on tivenos.com", href: "https://tivenos.com/"},
            },
            positions: [
                {
                    title: "IT Manager · Backend CRM Developer · Data Analyst",
                    start: "2025-06",
                    end: null,
                    text: "I write and run the services that keep Zoho CRM and the academic systems in sync, build the widgets and forms the admissions teams use and analyze the CRM data with Zoho Analytics and SQL. I also run the help desk, the coding standards and the safe handling of credentials.",
                },
            ],
            timeline: [],
            seo: {
                title: "IT Manager and integrations at TIVENOS · Experience",
                description: "FastAPI integration services for 15+ institutions, observability with Prometheus and Grafana, Zoho CRM widgets and IT operations, since 2025.",
            },
        },
        adcom: {
            tagline: "CRM, MarTech and the platform that publishes 100+ landing pages",
            intro: [
                "ADCOM Group is a marketing agency in Medellín. It runs admissions campaigns for universities and digital campaigns for consumer brands, national lottery brands among them, and every lead from those campaigns has to reach Zoho CRM with the campaign that brought it.",
                "I joined the MarTech team in February 2025 as a CRM and web developer. In June 2025 I also took over the agency's servers and the integrations with its clients' systems, and later the platform that publishes its landing pages.",
            ],
            company: {
                text: [
                    "ADCOM presents itself as a strategy, performance and MarTech agency that brings together technology, storytelling and performance. Its services go from strategic planning and digital media, with the attribution of every lead, to data marketing, websites and landing pages built for high-traffic campaigns, content, and training for companies.",
                    "I work on the technology and data side of that offer, in the landing pages and the platform that publishes them, the CRM where each lead arrives with the campaign that brought it, and the integrations with the ad platforms and the clients' systems.",
                ],
                source: {label: "ADCOM on adcom.group", href: "https://adcom.group/"},
            },
            positions: [
                {
                    title: "CRM Developer · Web Developer",
                    start: "2025-02",
                    end: "2025-06",
                    text: "I set up modules, workflows and Deluge functions on Zoho CRM, integrated WhatsApp, Meta Ads and Google Ads through their APIs, built internal apps on Zoho Creator and automated lead outreach with AI agents on Dapta.",
                },
                {
                    title: "CRM Developer · MarTech Developer · CRM & Cloud Solutions Engineer",
                    start: "2025-06",
                    end: null,
                    text: "On top of the CRM came the integrations with the clients' academic and commercial systems, running the VPS (SSH, SSL, Nginx, Docker and deployments with GitHub Actions), internal services such as Prometheus, Nagios and n8n, and technical advice to the development, marketing and analytics teams.",
                },
            ],
            timeline: [],
            seo: {
                title: "CRM and MarTech developer at ADCOM · Experience",
                description: "Zoho CRM, 90+ admissions landing pages with their deployment platform, email automations and server administration, since 2025.",
            },
        },
        muvu: {
            tagline: "Data, CRM and servers at a study abroad agency",
            intro: [
                "MUV-U is a study abroad agency. I worked there from July 2023 to January 2025, hybrid from Sabaneta, while studying for my degree.",
                "I started with the data, cleaning up the CRM and building the Power BI reports for finance, sales and marketing. The job grew toward the CRM and the Zoho ecosystem, and then toward the company's IT infrastructure and support for its users.",
            ],
            company: {
                text: [
                    "MUV-U Estudios en el Exterior helps people study and work abroad, with English courses, vocational training and higher education in Australia, England, Dublin, Dubai and Malta. It gives free advice, handles study visas and offers financing, and its site says it is backed by CEIPA, Powered by Arizona State University.",
                    "My work was on the data and systems behind that process, in the CRM where each student's case lives, the reports for finance, sales and marketing, and the company's servers.",
                ],
                source: {label: "MUV-U on muvu.com.co", href: "https://muvu.com.co/"},
            },
            positions: [
                {
                    title: "Backend Developer · Data Analyst · CRM Analyst",
                    start: "2023-07",
                    end: "2025-01",
                    text: "I prepared and cleaned the CRM data, built the Power BI reports, automated CRM processes, developed components for the company website and designed how data enters the CRM. As IT analyst I also ran the company's servers.",
                },
            ],
            timeline: [],
            seo: {
                title: "Data, CRM and backend at MUV-U · Experience",
                description: "Power BI reports with DAX, CRM data cleanup and architecture, sales automation and server administration, from 2023 to 2025.",
            },
        },
        quipux: {
            tagline: "The first internship, with data for the collections automation team",
            intro: [
                "Quipux is a Colombian software company for mobility and traffic; its projects include Medellín's Intelligent Mobility System.",
                "I did my data analysis internship there from August 2022 to May 2023, on the collections automation team. It was my first job in tech.",
            ],
            company: {
                text: [
                    "Quipux builds e-government solutions with artificial intelligence for smart cities, from digital procedures for citizens to road safety, data management and revenue collection strategies driven by digital marketing, databases and AI. It has offices in Medellín, São Paulo and Abidjan.",
                    "My internship was in that collection work, on the collections automation team, where I prepared the campaign data and automated the reports.",
                ],
                source: {label: "Quipux on quipux.com", href: "https://www.quipux.com/"},
            },
            positions: [
                {
                    title: "Data Analyst (internship)",
                    start: "2022-08",
                    end: "2023-05",
                    text: "I prepared and cleaned large volumes of campaign data, designed KPI dashboards and reports for decision making and automated with Python the reports and file cross-checks that used to be done by hand.",
                },
            ],
            timeline: [],
            seo: {
                title: "Data analysis internship at Quipux · Experience",
                description: "ETL routines, KPI dashboards and Python automations for the collections team, from 2022 to 2023: my first job in tech.",
            },
        },
    },
    education: {
        politecnico: {
            tagline: "The whole degree, from the first algorithms to distributed systems and artificial intelligence",
            intro: [
                "I study Computer Engineering at Politécnico Colombiano Jaime Isaza Cadavid, a public higher education institution in Medellín. I started in 2022, I'm in my last semester in 2026 and graduation is expected in March 2027.",
                "The degree combines basic sciences, software engineering, infrastructure, artificial intelligence and project management. Since the first semester I've kept the work of each course in a repository of the EngineeringSebastian-s organization. Two of my products came out of it, since SmartPot started as a university project and GoPoli as a class project.",
            ],
            areas: [
                {
                    title: "Artificial intelligence and data",
                    text: "Machine learning, evolutionary computing, computer vision, the semantic web and intelligent agents."
                },
                {
                    title: "Software architecture and construction",
                    text: "The software life cycle, from analysis to design and construction, the theory of languages and compilers and relational database modeling.",
                },
                {
                    title: "Infrastructure and computing",
                    text: "Distributed and parallel programming, operating systems, hardware architecture, digital electronics and communication networks.",
                },
                {
                    title: "IT project management",
                    text: "Formulating, evaluating and managing projects, with operations research, models and simulation for decision making."
                },
                {
                    title: "Basic sciences",
                    text: "Discrete mathematics, vector geometry, linear algebra, multivariable calculus, differential equations, numerical analysis, applied statistics and physics.",
                },
            ],
            courses: [
                "Algorithms and Programming 1 to 4",
                "Computer Semiotics",
                "Databases 1 and 2",
                "Digital Electronics",
                "Hardware Architecture",
                "Operating Systems",
                "Software Design",
                "Programming Languages Workshop 1 and 2",
                "Programming Languages and Compilers Theory",
                "Information Theory",
                "Communication Networks",
                "Network and Services Management",
                "Distributed and Parallel Programming",
                "Software Construction Project",
                "Artificial Intelligence",
                "Machine Learning and Evolutionary Computing",
                "Computer Vision and Artificial Intelligence",
                "Semantic Web and Intelligent Agents",
                "Models and Simulation",
                "Operations Research",
                "IT Project Formulation and Evaluation",
                "IT Project Management",
                "IT Entrepreneurship",
                "Integrative Project",
                "Systems and Organizations",
                "Basic Finance",
                "Research Methodology",
                "Discrete Mathematics 1 and 2",
                "Vector Geometry",
                "Linear Algebra",
                "Multivariable Calculus",
                "Differential Equations",
                "Numerical Analysis",
                "Applied Statistics",
                "Physics of Motion",
                "Electricity and Magnetism",
            ],
            program: {
                facts: [
                    {label: "Title awarded", value: "Ingeniero Informático"},
                    {label: "SNIES code", value: "3348"},
                    {label: "Length", value: "10 semesters"},
                    {label: "Mode", value: "On campus, in Medellín, Rionegro and Apartadó"},
                    {label: "Qualified registration", value: "Resolution 14380 of December 11, 2019, for seven years"},
                    {
                        label: "High-quality accreditation",
                        value: "Resolution 21001 of November 3, 2023, for four years"
                    },
                ],
                profile: {
                    text: "The Politécnico describes its graduates as professionals able to make decisions, with critical and analytical reasoning, teamwork and ethical commitment, ready to work in the software industry or in any organization that develops or manages IT projects.",
                    items: [
                        "Apply computer science to develop computing solutions",
                        "Analyze and build software to quality standards",
                        "Model and design the architecture of IT projects",
                        "Innovate by researching technological alternatives",
                        "Manage resources balancing productivity, cost and quality",
                        "Provide technical support",
                        "Manage IT services and platforms",
                    ],
                },
                curriculum: [
                    {
                        term: "Semester 1",
                        items: [
                            "Introduction to the Professional Field",
                            "Algorithms and Programming 1",
                            "Native Language",
                            "Differential Calculus",
                            "Humanities 1",
                            "Discrete Mathematics 1",
                        ],
                    },
                    {
                        term: "Semester 2",
                        items: [
                            "Algorithms and Programming 2",
                            "Discrete Mathematics 2",
                            "Physics of Motion",
                            "Vector Geometry",
                            "Integral Calculus",
                            "Sport, Art and Recreation",
                        ],
                    },
                    {
                        term: "Semester 3",
                        items: [
                            "Algorithms and Programming 3",
                            "Programming Languages Workshop 1",
                            "Computer Semiotics",
                            "Multivariable Calculus",
                            "Electricity and Magnetism",
                            "Linear Algebra",
                            "Constitutional Education",
                        ],
                    },
                    {
                        term: "Semester 4",
                        items: [
                            "Algorithms and Programming 4",
                            "Software Analysis",
                            "Databases 1",
                            "Differential Equations",
                            "Digital Electronics",
                        ],
                    },
                    {
                        term: "Semester 5",
                        items: [
                            "Programming Languages Workshop 2",
                            "Software Design",
                            "Hardware Architecture",
                            "Programming Languages and Compilers Theory",
                            "Applied Statistics",
                        ],
                    },
                    {
                        term: "Semester 6",
                        items: [
                            "Software Construction Project",
                            "Databases 2",
                            "Operating Systems",
                            "IT Entrepreneurship",
                            "Information Theory",
                            "Numerical Analysis",
                        ],
                    },
                    {
                        term: "Semester 7",
                        items: [
                            "Artificial Intelligence",
                            "Testing and Configuration Management",
                            "Systems and Organizations",
                            "Communication Networks",
                            "Operations Research",
                            "Ecology",
                            "Research Methodology",
                        ],
                    },
                    {
                        term: "Semester 8",
                        items: [
                            "Distributed and Parallel Programming",
                            "Integrative Project",
                            "IT Project Formulation and Evaluation",
                            "Network and Services Management",
                            "In-depth Study 1",
                            "Models and Simulation",
                            "Humanities 2",
                        ],
                    },
                    {
                        term: "Semester 9",
                        items: [
                            "IT Project Management",
                            "In-depth Study 2",
                            "Elective 1",
                            "Elective 2",
                            "Ethics",
                        ],
                    },
                    {
                        term: "Semester 10",
                        items: [
                            "Degree Project",
                            "In-depth Study 3",
                            "Elective 3",
                        ],
                    },
                ],
                source: {
                    label: "The program on politecnicojic.edu.co",
                    href: "https://www.politecnicojic.edu.co/profesionales/75-ingenieria-informatica"
                },
            },
            timeline: [
                {
                    date: "2025-08",
                    text: "Networks on physical Cisco routers, with RIPv2, OSPF and EIGRP routing, dual-stack IPv6, SNMP and VoIP."
                },
                {
                    date: "2025-09",
                    text: "The artificial intelligence courses begin, with expert systems, fuzzy logic, genetic algorithms, computer vision and evolutionary computing."
                },
                {
                    date: "2025-09",
                    text: "Distributed and parallel programming, with sockets and threads, RMI and a school system in Spring Boot, FastAPI with GraphQL and React."
                },
                {date: "2026-09", text: "Last semester, alongside the cybersecurity diploma."},
            ],
            seo: {
                title: "Computer Engineering at Politécnico JIC · Education",
                description: "The degree from 2022 to 2026, graduating in March 2027: areas, courses, the projects that came out of it and one GitHub repository per course.",
            },
        },
        cyberDiploma: {
            tagline: "From reconnaissance to incident response, in controlled labs",
            intro: [
                "The Diploma in Computer Cybersecurity and Digital Resilience at Politécnico Colombiano Jaime Isaza Cadavid runs from September to December 2026, alongside the last semester of the degree.",
                "It is graded through lab reports. Each one documents a controlled, authorized environment, what was done step by step and the controls that would have prevented it. The reports are public in the Cybersecurity repository of the degree's organization.",
            ],
            areas: [
                {
                    title: "Reconnaissance and vulnerabilities",
                    text: "Nmap against a lab machine and the analysis of vsftpd 2.3.4 and its backdoor, inside an isolated network."
                },
                {
                    title: "A CTF from start to finish",
                    text: "From reconnaissance to initial access and privilege escalation, with a controlled availability test."
                },
                {
                    title: "Incident response",
                    text: "A phishing and ransomware case read through confidentiality, integrity and availability, with role-based access control and a protection plan.",
                },
            ],
            courses: [],
            program: {
                facts: [
                    {
                        label: "Name at the Politécnico",
                        value: "Diplomado en Ciberseguridad: gestión, protección y resiliencia digital"
                    },
                    {label: "Length", value: "120 hours"},
                    {label: "Mode", value: "Live remote classes"},
                    {label: "Offered by", value: "Continuing education, Politécnico JIC"},
                    {
                        label: "Record",
                        value: "For attending at least 80% of the hours and completing the exercises and practices"
                    },
                ],
                profile: {
                    text: "The Politécnico sets out to give professionals and students the technical, analytical and ethical skills to manage cybersecurity as a whole, identifying, preventing and mitigating digital risks in public, private and educational organizations.",
                    items: [
                        "Understand the conceptual and strategic foundations of cybersecurity",
                        "Analyze technology architectures and attack surfaces",
                        "Identify digital threats, vulnerabilities and risks",
                        "Apply cryptography and information protection principles",
                        "Use good security practices in systems, networks and the cloud",
                        "Manage security incidents and continuity plans",
                        "Interpret the legal, regulatory and ethical framework of cybersecurity",
                        "Design applied cybersecurity proposals for real contexts",
                    ],
                },
                curriculum: [
                    {
                        term: "Module I · Fundamentals and architecture",
                        items: [
                            "Fundamentals and strategies, from today's threats and attackers to confidentiality, integrity and availability",
                            "Systems and network architecture, with firewalls, VPNs, segmentation and protocols such as TLS and IPsec",
                            "Security policies, controls and culture",
                        ],
                    },
                    {
                        term: "Module II · Regulation, secure development and resilience",
                        items: [
                            "Cybercrime and cybersecurity law, the GDPR included",
                            "Secure development and security audits, from the secure life cycle to DevSecOps in CI/CD pipelines",
                            "Incident management and digital resilience, following NIST and SANS",
                            "Compliance and audits with ISO/IEC 27001, NIST, COBIT and ITIL",
                            "Cloud security and distributed data platforms",
                        ],
                    },
                    {
                        term: "Module II · Intelligence, reconnaissance and operational security",
                        items: [
                            "Artificial intelligence applied to cybersecurity",
                            "Reconnaissance and OSINT",
                            "Active reconnaissance and attack surface analysis with Nmap",
                            "Web enumeration",
                            "Academic writing standards (ICONTEC and APA)",
                        ],
                    },
                ],
                source: {
                    label: "The diploma on politecnicojic.edu.co",
                    href: "https://www.politecnicojic.edu.co/diplomados/6566-diplomado-en-ciberseguridad-gestion-proteccion-y-resiliencia-digital"
                },
            },
            timeline: [],
            seo: {
                title: "Cybersecurity diploma · Education",
                description: "Labs with Kali Linux at Politécnico JIC, from September to December 2026: reconnaissance with Nmap, a CTF up to privilege escalation and incident response.",
            },
        },
        sena: {
            tagline: "The software programming technician program, alongside the first year of the degree",
            intro: [
                "I took the Software Programming Technician program from SENA with Institución Universitaria Salazar y Herrera (IUSH) from 2022 to 2023, while starting my degree at Politécnico.",
                "It is a competency-based program to analyze the software, define its architecture, design it, create its database and code it. In it I built SitePersist in a team of two, a PHP and MySQL web system to book the university's rooms and equipment.",
            ],
            areas: [
                {
                    title: "Analysis and design",
                    text: "Analyzing the software, defining the system architecture and preparing the design before coding."
                },
                {title: "Databases", text: "Modeling the data and creating the database tables and objects in MySQL."},
                {title: "Construction", text: "Coding in PHP and C#, with version control in Git."},
                {title: "Systems", text: "Installing and configuring operating systems."},
            ],
            courses: [
                "Software analysis",
                "Defining the system architecture",
                "Preparing design activities",
                "Databases",
                "Creating database tables and objects",
                "Interpreting technical information for coding",
                "Coding software in a language",
                "Installing operating systems",
            ],
            program: {
                facts: [
                    {label: "SENA program", value: "Programación de Software, code 233104, in force since August 2019"},
                    {label: "Title", value: "Técnico (technician)"},
                    {label: "Length", value: "2,208 hours, 1,344 of training and 864 in the productive stage"},
                    {label: "Occupation", value: "IT assistance and support technician (Colombian occupation 2331)"},
                    {
                        label: "What graduates produce",
                        value: "Databases, software code, user interfaces and user manuals"
                    },
                ],
                profile: {
                    text: "SENA describes the technician as able to code, implement and support software applications with programming languages and database management systems, as a programmer in companies, supporting the applications they already run, or as a freelancer.",
                    items: [
                        "Programming fundamentals",
                        "Databases",
                        "Programming languages and paradigms",
                        "Development environments and frameworks",
                    ],
                },
                curriculum: [
                    {
                        term: "Code the software solution · 576 hours",
                        items: [
                            "Interpret the design's technical information",
                            "Create the database tables and objects",
                            "Code in the chosen language and platform",
                            "Verify the software with unit tests",
                        ],
                    },
                    {
                        term: "Deploy the software solution · 96 hours",
                        items: [
                            "Plan the deployment",
                            "Deploy the built software",
                            "Write the user manual",
                            "Verify the implementation",
                        ],
                    },
                    {
                        term: "English · 192 hours",
                        items: [
                            "Spoken and written English for social and work settings, by the Common European Framework of Reference",
                        ],
                    },
                    {
                        term: "Shared competencies",
                        items: [
                            "Communication",
                            "Quantitative reasoning",
                            "Entrepreneurship",
                            "Labor rights, ethics and a culture of peace",
                            "Environmental protection and occupational health and safety",
                            "Natural sciences",
                            "Physical activity",
                            "IT tools for handling information",
                        ],
                    },
                ],
                source: {
                    label: "SENA's curriculum for the program (PDF)",
                    href: "https://inemjose.edu.co/colegio/newsite2021/wp-content/uploads/2022/12/PROGRAMACION-DE-SOFTWARE.pdf"
                },
            },
            timeline: [],
            seo: {
                title: "Software Programming Technician · Education",
                description: "The SENA technician program with IUSH, from 2022 to 2023: analysis, architecture, databases and coding, with SitePersist in PHP and MySQL and C# tools.",
            },
        },
        pascual: {
            tagline: "The technical track in software development, in 2020 and 2021",
            intro: [
                "I took the Assistant Software Development Technician program at Institución Educativa Pascual Bravo in 2020 and 2021, alongside high school at INEM.",
                "The Instituto Técnico Industrial Pascual Bravo, in Robledo, began in October 1935 as a school of arts and trades attached to the Universidad de Antioquia. Today it is a public school, approved for industrial technical education in 1978 and attached to the city of Medellín since 2007, with a systems specialty in software development.",
                "There I learned programming logic, data structures and relational databases, with small projects in HTML, PHP, Visual Basic .NET, Java and Python, and Excel macros. The projects I built with my classmates are in the VocationalSebastian-s organization.",
            ],
            areas: [
                {
                    title: "Logic and data structures",
                    text: "The basics of programming, with algorithms, control structures and data structures."
                },
                {
                    title: "Relational databases",
                    text: "Tables, relationships and queries to store the data of the first applications."
                },
                {
                    title: "Web and desktop",
                    text: "HTML, CSS and PHP for websites; Visual Basic .NET, Java and Python for the first programs."
                },
                {
                    title: "Excel with macros",
                    text: "VBA macros, such as the bingo and the color converter in the technical high school organization."
                },
            ],
            courses: [],
            program: {
                facts: [
                    {label: "Specialty", value: "Técnica en Sistemas (Desarrollo de Software)"},
                    {label: "Lines", value: "Programming, digital design and maintenance"},
                    {
                        label: "Path",
                        value: "Vocational exploration in sixth and seventh grade, the specialty from eighth to eleventh"
                    },
                    {
                        label: "Official approval",
                        value: "Resolution 1293 of February 20, 1978, for industrial technical education"
                    },
                    {label: "Document", value: "The specialty's area project, 2026"},
                ],
                profile: {
                    text: "The school sets out to train systems technicians through joint work between its academic and technical areas, students who keep learning, think critically and innovatively and act with initiative in settings mediated by technology.",
                    items: [
                        "Analyze, design and develop software solutions",
                        "Know the tools of information systems in depth",
                        "Take part in a real-life project, working with others and judging their own work",
                        "Build citizenship, research, technology and work skills",
                    ],
                },
                curriculum: [
                    {
                        term: "Grade 8",
                        items: [
                            "Computational thinking and hardware and software architecture, 4 hours a week",
                            "Technical drawing, 2 hours a week",
                        ],
                    },
                    {
                        term: "Grade 9",
                        items: [
                            "Programming logic and digital skills, 4 hours a week, with algorithms in PSeInt",
                            "Technical drawing, 2 hours a week",
                        ],
                    },
                    {
                        term: "Grade 10",
                        items: [
                            "Discrete mathematics and data structures, 6 hours a week, with lists, stacks and trees",
                            "Databases, 2 hours a week, from the conceptual model to SQL queries",
                            "Image processing and vectorization in 2D, 2 hours a week",
                        ],
                    },
                    {
                        term: "Grade 11",
                        items: [
                            "Object-oriented programming, design and web development, 6 hours a week, with UML, graphical interfaces, HTML, CSS, JavaScript, a web framework and an ORM",
                            "Electronic and computing systems, 2 hours a week, with Linux and Windows",
                            "3D modeling, 2 hours a week",
                        ],
                    },
                ],
                source: {
                    label: "The specialty's 2026 document (PDF)",
                    href: "https://tecnicopascualbravo.edu.co/wp-content/uploads/2026/03/2026-SISTEMAS.pdf"
                },
            },
            timeline: [],
            seo: {
                title: "Assistant Software Development Technician · Education",
                description: "The technical track at I.E. Pascual Bravo, in 2020 and 2021: logic, data structures, databases, PHP sites and Excel macros.",
            },
        },
        inem: {
            tagline: "High school with a computer science specialization, where I wrote my first algorithms",
            intro: [
                "I went to high school at I.E. INEM José Félix de Restrepo, a public school in El Poblado, Medellín, where classes began on April 27, 1970. The school organizes its students' path around five branches (arts, commercial, social promotion, industrial and academic), and in tenth and eleventh grade each student takes a specialty. I studied there from 2019 to 2021, with the computer science specialty.",
                "In 2019 I wrote my first algorithms there and designed my first web pages. From 2020 I combined it with the technician program at Pascual Bravo, and the projects of those years are in the VocationalSebastian-s organization.",
            ],
            areas: [],
            courses: [],
            program: {
                facts: [
                    {label: "Specialty", value: "Programación de software (technical secondary education)"},
                    {label: "Curriculum", value: "SENA's Programación de Software, code 233104"},
                    {label: "Technology line", value: "Information and communication technologies"},
                    {label: "Published by the school", value: "December 2022"},
                ],
                profile: {
                    text: "INEM publishes its software programming specialty with SENA's curriculum, program 233104, the same one the SENA technician's page describes. That program trains technicians to code, implement and support software applications with programming languages and database management systems.",
                    items: [],
                },
                curriculum: [
                    {
                        term: "Code the software solution · 576 hours",
                        items: [
                            "Interpret the design's technical information",
                            "Create the database tables and objects",
                            "Code in the chosen language and platform",
                            "Verify the software with unit tests",
                        ],
                    },
                    {
                        term: "Deploy the software solution · 96 hours",
                        items: [
                            "Plan the deployment",
                            "Deploy the built software",
                            "Write the user manual",
                            "Verify the implementation",
                        ],
                    },
                    {
                        term: "English · 192 hours",
                        items: [
                            "Spoken and written English for social and work settings, by the Common European Framework of Reference",
                        ],
                    },
                ],
                source: {
                    label: "The specialty on inemjose.edu.co",
                    href: "https://inemjose.edu.co/colegio/newsite2021/2022/12/27/software/"
                },
            },
            timeline: [],
            seo: {
                title: "High school with a computer science specialization · Education",
                description: "High school at INEM José Félix de Restrepo, from 2019 to 2021, with a computer science specialization in computing fundamentals, algorithms and web design.",
            },
        },
    },
    organizations: {
        tivenos: {
            tagline: "TIVENOS's code, with integrations, observability, widgets, forms and email signatures",
            intro: [
                "TIVENOS keeps the code of its solutions for universities here, privately, from the services that connect Zoho CRM to each institution's academic system and the observability stack to the Zoho CRM widgets, the admissions forms, the CRM snapshot service and the email signature service.",
                "The code is private, as is the clients' data, and the projects that describe it name no institution.",
            ],
            role: "I write and maintain most of what is here, such as the FastAPI integration services, the observability, the widgets, the forms, the CRM extracts and the email signatures. I also set the code, security and deployment standards the services share.",
            timeline: [],
            seo: {
                title: "TivenosEducation · GitHub organization",
                description: "TIVENOS's private organization, with integration services, observability, widgets and forms for universities, and my commits since 2025.",
            },
        },
        adcom: {
            tagline: "100+ landing pages, the platform that publishes them and the agency's CRM tools",
            intro: [
                "The agency keeps here, privately, one repository per admissions landing page, each client's Nginx gateway and the infrastructure that publishes them, the bulk operation tools on the Zoho API and the results services of the lottery brands.",
                "Every commit made by a person is mine. The figure includes the commits the visual site builder makes on every landing edit and the changes I apply with scripts to every landing at once.",
            ],
            role: "I built and maintain what is here, from the landing pages and the platform that deploys them to the daily monitoring, the Zoho API tools and the results services.",
            timeline: [],
            seo: {
                title: "ADCOM-Group · GitHub organization",
                description: "The agency's private organization, with 100+ landing pages, their deployment platform and the Zoho API tools, and my commits since 2025.",
            },
        },
        smartpot: {
            tagline: "The IoT platform for hydroponic crops, from the firmware to the PWA",
            intro: [
                "All of SmartPot is here, in eleven public repositories, from the sensor firmware and the MQTT broker to the Spring Boot API, the AI assistant, the PWA and the infrastructure.",
                "SmartPot started as a university team project and is now live at smartpot.app.",
            ],
            role: "I lead the development. I wrote the API, the PWA and much of the infrastructure, and I make most of the organization's commits.",
            timeline: [],
            seo: {
                title: "SmartPotTech · GitHub organization",
                description: "Eleven public repositories of SmartPot, the IoT platform for hydroponic crops, with firmware, MQTT broker, API, AI assistant, PWA and infrastructure.",
            },
        },
        gopoli: {
            tagline: "Ride sharing for the Politécnico community, with a web app, an API and a database",
            intro: [
                "GoPoli's organization holds the Next.js web app, the Spring Boot API and the PostgreSQL image, each with its own repository, tests and deployment.",
                "They came out of the class project's repository, which held the Flutter app and its backend together. When I split it, I rewrote the history so each repository kept its own commits.",
            ],
            role: "I'm the main contributor. I split the original repository, wrote much of the API and the web app, and set up the central deployment that publishes everything to the server.",
            timeline: [],
            seo: {
                title: "GoPoli · GitHub organization",
                description: "The organization of GoPoli, the Politécnico's ride-sharing platform, with a Next.js web app, a Spring Boot API and a PostgreSQL database.",
            },
        },
        peppertech: {
            tagline: "PepperCRM, a CRM built as a team with Spring Boot, React and MongoDB",
            intro: [
                "PepperCRM is a CRM product we built in a team of four during 2025, with a Spring Boot backend with Spring Security and JWT, a MongoDB Atlas database and a React frontend.",
            ],
            role: "I wrote most of the backend.",
            timeline: [],
            seo: {
                title: "PepperTechDev · GitHub organization",
                description: "The organization of PepperCRM, a CRM built in 2025 by a team of four with Spring Boot, Spring Security, JWT, MongoDB and React.",
            },
        },
        engineering: {
            tagline: "The Computer Engineering degree, one repository per course",
            intro: [
                "I've kept the degree here since the first semester, with one repository per course or project, from Algorithms and Programming 1 to distributed systems, networks on Cisco equipment and artificial intelligence.",
                "Since 2026 it also holds the cybersecurity diploma's labs.",
            ],
            role: "The organization is mine and so are almost all of its commits; the rest come from classmates in group assignments.",
            timeline: [],
            seo: {
                title: "EngineeringSebastian-s · GitHub organization",
                description: "37 public repositories of the Computer Engineering degree and the cybersecurity diploma, with my commits from 2022 to today.",
            },
        },
        taurus: {
            tagline: "A data technical test with FastAPI, Pandas and React",
            intro: [
                "Taurus was the data technical test I did in November and December 2024: from raw CSV files to a FastAPI metrics API with Pandas and a React dashboard.",
            ],
            role: "I built the whole project, from the data to the dashboard.",
            timeline: [],
            seo: {
                title: "TaurusSebastian-s · GitHub organization",
                description: "The 2024 data technical test, which turned raw CSV files into a FastAPI metrics API with Pandas and a React dashboard.",
            },
        },
        testlabdata: {
            tagline: "The data automations of the Quipux internship",
            intro: [
                "I kept the scripts and notebooks of the Quipux internship here, privately, with database cleanup, campaign tracking across several cities, email and SMS exclusion lists, and automatic downloads and file cross-checks.",
                "I made almost all my commits there with the company's GitHub account; the activity figure adds them up.",
            ],
            role: "I wrote almost all of the scripts and notebooks; the other commits come from a teammate.",
            timeline: [],
            seo: {
                title: "TestLabData · GitHub organization",
                description: "The private organization of the Quipux internship, with Python automations for campaigns, exclusion lists and reports, from 2022 to 2023.",
            },
        },
        technical: {
            tagline: "SitePersist and the C# tools of the programming technician program",
            intro: [
                "This holds the projects of the SENA and IUSH software programming technician program, such as SitePersist, a PHP and MySQL web system to book the university's rooms and equipment, its admin site and two C# tools.",
            ],
            role: "I wrote most of the code, in a team of two.",
            timeline: [],
            seo: {
                title: "TechnicalSebastians · GitHub organization",
                description: "The 2022 programming technician projects, with SitePersist in PHP and MySQL, its admin site, and C# tools such as VideoToAscii.",
            },
        },
        vocational: {
            tagline: "The first projects, from technical high school",
            intro: [
                "I share this organization with my technical high school classmates, between INEM and Pascual Bravo, with PHP sites, Excel macros such as a bingo and a color converter, an Android calculator in Java and the first Python programs.",
                "Most commits are from 2021, when I uploaded the projects, under the Git names I used back then.",
            ],
            role: "I uploaded the projects and most of their commits are mine; other people on the team made commits too.",
            timeline: [],
            seo: {
                title: "VocationalSebastian-s · GitHub organization",
                description: "The technical high school projects, from 2021 and 2022: PHP sites, Excel macros, an Android calculator and Python programs.",
            },
        },
    },
    skills: {
        backend: {
            focus: "Services that connect systems which were never meant to meet: APIs in FastAPI and Spring Boot that validate every field on the way in, run long jobs in the background and leave a trace of every run.",
            description: [
                "This is the group I work with most. At TIVENOS I run more than 20 FastAPI services that keep Zoho CRM in sync with the academic systems of more than 15 institutions, over REST, SOAP with WS-Security, SQL Server readers and webhooks. The CRM Snapshots, which take the Zoho modules to PostgreSQL, come from the same way of working.",
                "In Java the path was Spring Boot with JWT, in PepperCRM and GoPoli, and GraphQL with Strawberry next to REST in the Cambridge school practice. At ADCOM the hyper-personalized email combines FastAPI, asyncpg and Jinja2 templates.",
            ],
            uses: [
                "The CRM and the academic or accounting systems sharing data without anyone typing it in",
                "Long syncs that answer 202 Accepted and never leave the caller waiting",
                "Clear contracts with OpenAPI and validation with Pydantic before anything reaches the database",
                "Data exposed behind real authentication, with OAuth 2.0 or JWT",
            ],
            seo: {
                title: "Backend and APIs with FastAPI and Spring Boot · Technical skills",
                description: "FastAPI and Spring Boot services that integrate Zoho CRM with academic systems over REST, SOAP and SQL Server, with the projects and jobs where I use them.",
            },
        },
        crm: {
            focus: "Keeping the sales process inside Zoho: modules, workflows and Deluge functions that do the repetitive work, and connectors that bring in every lead wherever it comes from.",
            description: [
                "I started at MUV-U cleaning up the CRM and ended up in charge of the Zoho ecosystem. Today, at TIVENOS and ADCOM, I write Deluge functions, in-record widgets with the Zoho Extension Toolkit and bulk operations with the Bulk API.",
                "On the marketing side, the ADCOM admissions funnel ties together forms, Zoho Creator, Google Tag Manager and n8n, and the TIVENOS admission and scholarship forms take every application to the CRM without anyone typing it.",
            ],
            uses: [
                "Sales and admissions working in one place, with each contact's whole history",
                "Repetitive tasks handled by workflows and Deluge functions, not by hand",
                "Leads from forms, WhatsApp and campaigns reaching the CRM with their source",
                "Bulk loads, links and clean-ups that leave existing data intact",
            ],
            seo: {
                title: "Zoho CRM, Deluge and automation · Technical skills",
                description: "Zoho CRM, Creator, Analytics and Deluge, widgets, bulk operations with the Bulk API and automation with n8n, with the projects at TIVENOS, ADCOM and MUV-U.",
            },
        },
        data: {
            focus: "Turning scattered data into answers: extract it with SQL and Python, clean it with Pandas and explain it with a dashboard a business reader understands without help.",
            description: [
                "It began during my internship at Quipux, with Jupyter notebooks and Pandas that prepared the collection campaigns, and went on at MUV-U with Power BI and DAX reports. That is where I learned that a dashboard is only as good as the data behind it.",
                "At TIVENOS the CRM Snapshots pull the Zoho modules with the Bulk API into PostgreSQL to analyze them with SQL, and the Taurus technical test took a CSV all the way to a dashboard with FastAPI and React.",
            ],
            uses: [
                "Reports that refresh themselves instead of spreadsheets someone builds every week",
                "CRM data ready to join with SQL, without exporting it by hand",
                "Lists cleaned and matched with Pandas before a campaign or a load",
                "Power BI indicators with DAX measures the business reads on its own",
            ],
            seo: {
                title: "Data and BI with SQL, Python and Power BI · Technical skills",
                description: "SQL, Pandas, Jupyter, Power BI and DAX to go from scattered data to a dashboard, with the projects, jobs and certifications where I apply them.",
            },
        },
        devops: {
            focus: "Making a release a push, and making a failure raise an alert before a user notices: containers, CI/CD, and metrics, logs and traces in one place.",
            description: [
                "At ADCOM I built the platform that publishes more than 100 landing pages: each repository builds on GitHub Actions and ships with rsync to a server running Nginx, and a script applies the same change to every repository at once.",
                "At TIVENOS the services ship as images to GHCR, and the observability platform watches about twenty services with Prometheus, Grafana, Loki and Tempo, with alerts that reach Telegram. This portfolio is built, tested and published the same way.",
            ],
            uses: [
                "Repeatable deployments that do not depend on who runs them",
                "Alerts with context: the metric, the log and the trace of the same failure",
                "One change applied to dozens of repositories with a script, not one by one",
                "Linux servers with Nginx as a reverse proxy and TLS",
            ],
            seo: {
                title: "DevOps with Docker, CI/CD and Grafana · Technical skills",
                description: "Docker, GitHub Actions, Nginx and Linux to ship, and Prometheus, Grafana, Loki and Tempo to watch, with the ADCOM platform and the TIVENOS observability.",
            },
        },
        databases: {
            focus: "Choosing where each piece of data lives and modeling it for the query that will really be run, whether relational, document or in memory.",
            description: [
                "PostgreSQL is behind almost everything I build today: the CRM Snapshots, the integration platform and GoPoli. At TIVENOS I also read SQL Server from the academic systems, and at ADCOM the bulk operation tools take data from Oracle.",
                "I worked with MongoDB and Redis in PepperCRM, and with MySQL and MariaDB in the Taurus technical test. My degree, SENA and Pascual Bravo covered relational modeling, database objects and NoSQL.",
            ],
            uses: [
                "Models designed for the query that will be run, not for the form that fills them",
                "CRM copies in PostgreSQL to analyze without touching the production system",
                "Reading other teams' databases, such as SQL Server, without changing the source system",
                "A Redis cache for what is read often and changes rarely",
            ],
            seo: {
                title: "Databases: PostgreSQL, SQL Server and MongoDB · Technical skills",
                description: "PostgreSQL, SQL Server, MySQL, Oracle, MongoDB and Redis in integrations, CRM analysis and web products, with the projects and studies where I use them.",
            },
        },
        frontend: {
            focus: "Clear interfaces that take every field where it belongs: forms that validate, fast pages and widgets that live inside the tool the team already uses.",
            description: [
                "My frontend work almost always serves a process. At TIVENOS that means the admission and scholarship forms and the widgets inside Zoho CRM; at ADCOM, the admissions funnel in React and TypeScript.",
                "For whole products I use React, Next.js and Tailwind CSS, as in GoPoli and the real estate landing page with a synced inventory, and this portfolio is built with Astro and SolidJS.",
            ],
            uses: [
                "Forms that validate before sending and take every lead to the CRM with its source",
                "Fast, accessible pages, measured rather than assumed",
                "Tools inside the CRM so the team does not switch tabs",
                "Maps, PDFs and tables that solve one concrete task",
            ],
            seo: {
                title: "Frontend with React, TypeScript and Tailwind CSS · Technical skills",
                description: "React, TypeScript, Next.js, Vite and Tailwind CSS in forms, CRM widgets, landing pages and web products, with the projects and studies behind them.",
            },
        },
        cloud: {
            focus: "Using managed services where they really save work, and my own servers where they give more control for less money.",
            description: [
                "The ADCOM hyper-personalized email sends through Amazon SES and receives delivery events through Amazon SNS, and at TIVENOS the observability platform and the CRM Snapshots run on Azure.",
                "In my own and study projects I have published on Render, Netlify, MongoDB Atlas and Heroku, as with PepperCRM, FashionLine and SitePersist, which used a MySQL database on Azure at SENA.",
            ],
            uses: [
                "Transactional email at scale without running a mail server",
                "Demos published in minutes to show progress",
                "Managed databases, with backups and scaling, without administering the engine",
                "Choosing between cloud and VPS by cost, control and what the team can operate",
            ],
            seo: {
                title: "Cloud with Azure, AWS and managed hosting · Technical skills",
                description: "Azure, Amazon SES and SNS, MongoDB Atlas, Render, Netlify and VPS servers, with the ADCOM email and the TIVENOS observability as examples.",
            },
        },
        testing: {
            focus: "Making every change arrive with its test, and making the pipeline check it before a person does: unit, end-to-end and performance tests on every push.",
            description: [
                "In my degree I wrote the same CRUD test by test in six languages, with xUnit, pytest, Vitest, PHPUnit and the Rust and Go tooling, and that is where writing the test first stopped being a rule and became a habit.",
                "This portfolio runs Vitest, Playwright and Lighthouse CI on every change, and the ADCOM landing page platform measures its pages with Lighthouse. In SmartPot the API has more than 130 JUnit tests, and GoPoli goes through CodeQL.",
            ],
            uses: [
                "Changes made without fear, because a test warns when something breaks",
                "Performance and accessibility measured on every release",
                "Security flaws and vulnerable dependencies caught in the pipeline",
                "End-to-end tests that walk through what a real user does",
            ],
            seo: {
                title: "Testing with PyTest, JUnit, Vitest and Playwright · Technical skills",
                description: "TDD, unit and end-to-end tests and Lighthouse measurements in CI, with this portfolio, SmartPot, GoPoli and the practices of my degree.",
            },
        },
        languages: {
            focus: "Python and Java are my everyday languages, TypeScript and SQL are in almost everything, and I pick the rest by what the problem needs, not by habit.",
            description: [
                "Python runs the TIVENOS integrations and the ADCOM hyper-personalized email, which also has a part in Java with Spring Boot. Deluge is Zoho's language, and I write it almost every day.",
                "My degree and the technical programs added C, C++, C#, PHP, VB.NET and ARM assembly: the Computer Engineering repository has one per course, and the TDD practices repeated the same CRUD in six languages.",
            ],
            uses: [
                "Working in the language the team or the system already uses, not the one I like best",
                "Reading and maintaining code written in different languages",
                "Python or Bash scripts for what someone does by hand today",
                "Plain SQL when an ORM hides what the query does",
            ],
            seo: {
                title: "Languages: Python, Java and TypeScript · Technical skills",
                description: "Python, Java, TypeScript, JavaScript, SQL and Deluge at work, and C, C++, C#, PHP and ARM assembly in my degree, with the projects behind each one.",
            },
        },
        security: {
            focus: "Security by default: encrypted secrets, least access, authentication done right and a pipeline that checks the code and its dependencies.",
            description: [
                "At TIVENOS the integrations authenticate with OAuth 2.0 and speak SOAP with WS-Security, and I handle the secure management of the team's credentials. In PepperCRM authentication runs on Spring Security and JWT, and in GoPoli on JWT.",
                "GoPoli runs CodeQL and Dependabot, and the ADCOM landing page platform applies one Dependabot policy to more than a hundred repositories. The offensive side began with HACKLAB, and today I practice it in the Kali Linux labs of the cybersecurity diploma.",
            ],
            uses: [
                "Credentials and secrets kept out of the code, encrypted and with least access",
                "APIs that demand real authentication, with OAuth 2.0 or JWT",
                "Vulnerabilities in the code and its dependencies caught before release",
                "An offensive eye to find what an attacker would see first",
            ],
            seo: {
                title: "Security: OAuth, JWT, OWASP and ethical hacking · Technical skills",
                description: "OAuth 2.0, JWT, Spring Security, WS-Security, CodeQL, Dependabot and Kali Linux, with the TIVENOS integrations and the cybersecurity diploma.",
            },
        },
        ai: {
            focus: "Applying the technique the problem justifies, from a rule system to a neural network, and checking that it really improves something before keeping it.",
            description: [
                "In my degree I went through artificial intelligence from rules to agents: expert systems in CLIPS, fuzzy logic with scikit-fuzzy, scikit-learn models and a TensorFlow network that recognizes lettuce diseases in photos.",
                "In SmartPot the FastAPI and scikit-learn assistant diagnoses each crop with an expert system, fuzzy logic and models that forecast when a variable will leave its range. From Sentinel-1 radar images I built a dataset, and the two restoration models I tried did not improve the input, which is a result too.",
            ],
            uses: [
                "Classifying images or data when a fixed rule is no longer enough",
                "Explainable rule systems for decisions that need a justification",
                "Clean datasets, which are half the work of any model",
                "Checking that a model improves the outcome before it goes to production",
            ],
            seo: {
                title: "Machine learning and AI with scikit-learn · Technical skills",
                description: "Expert systems, fuzzy logic, scikit-learn and TensorFlow in computer vision and sensor data, with the projects of my degree and SmartPot.",
            },
        },
        iot: {
            focus: "Small devices that measure and publish, and a backend that listens: ESP32 with MicroPython, MQTT over TLS and the data reaching an API.",
            description: [
                "SmartPot is where it all comes together: ESP32 firmware in MicroPython that publishes the sensor readings over MQTT with TLS, a Mosquitto broker and a simulator that feeds the demo with real weather and no hardware.",
                "In my degree, the hardware architecture practices went through ESP32, Wokwi simulations and ARM assembly, and the IoT protocols course gave me the basics of MQTT.",
            ],
            uses: [
                "Measuring the physical world and getting the data into a dashboard or an API",
                "Lightweight messaging with MQTT for devices with little power and an unstable network",
                "Testing firmware in a simulator before touching the hardware",
                "Sensors connected to the same backend and observability as everything else",
            ],
            seo: {
                title: "IoT with ESP32, MicroPython and MQTT · Technical skills",
                description: "MicroPython firmware for ESP32, MQTT over TLS with Mosquitto and Wokwi simulations, with SmartPot and the practices of my degree as examples.",
            },
        },
        networks: {
            focus: "Understanding the path every packet takes: routing, addressing, VPNs and monitoring, so a network problem is never mistaken for a code problem.",
            description: [
                "In my degree I configured physical Cisco routers with RIPv2, OSPF, EIGRP and dual-stack IPv6, with SNMP monitoring and VoIP, besides Packet Tracer.",
                "At work it shows in everyday things: at TIVENOS the SQL Server readers reach the academic systems through a VPN, and the observability platform checks from the outside that every service answers.",
            ],
            uses: [
                "Telling whether a failure comes from the network, the DNS or the application",
                "Private VPN connections to systems that are not exposed to the internet",
                "Availability watched from the outside, the way a user sees it",
                "Well-planned networks with IPv6 and dynamic routing",
            ],
            seo: {
                title: "Networking with Cisco, OSPF, IPv6 and VPNs · Technical skills",
                description: "OSPF, EIGRP and IPv6 routing on Cisco routers, SNMP, VoIP and VPNs, with the practices of my degree and the TIVENOS integrations and probes.",
            },
        },
        tools: {
            focus: "A tidy workshop: Git with a history people can follow, a well-configured editor and the team's tools used the way the team uses them.",
            description: [
                "Git and GitHub are in everything I do: the code of my degree lives in an organization with one repository per course, and at ADCOM and TIVENOS deployments come out of GitHub Actions.",
                "I write in the JetBrains IDEs and in VS Code, review screens in Figma and keep track of my coding time with WakaTime, which shows which languages and editors it goes to.",
            ],
            uses: [
                "A change history that explains the why, not only the what",
                "Branches and code reviews the team can follow",
                "Everyday repetition automated from the editor or the terminal",
                "Going from a Figma design to code without losing details",
            ],
            seo: {
                title: "Developer tools: Git, GitHub and JetBrains · Technical skills",
                description: "Git, GitHub, GitLab, the JetBrains IDEs, VS Code, Figma, Jira and WakaTime, the everyday tools behind every project in this portfolio.",
            },
        },
        foundations: {
            focus: "The theory that explains why a program is fast or slow, correct or fragile: data structures, algorithms, automata, operating systems and applied math.",
            description: [
                "The Computer Engineering degree covered data structures, automata and formal languages, compilers, operating systems, computer architecture and distributed and parallel programming, and every course has its repository.",
                "That ground shows up in concrete projects, such as the Huffman compressor, which builds the tree, draws it and gives back the identical file, and in the numerical side: numerical analysis, statistics, operations research and simulation.",
            ],
            uses: [
                "Choosing the data structure that makes a query or a process fast",
                "Estimating the cost of an algorithm before it reaches production",
                "Understanding what happens underneath: memory, processes, concurrency and the network",
                "Modeling and simulating a problem before building the solution",
            ],
            seo: {
                title: "Computer science foundations and algorithms · Technical skills",
                description: "Data structures, algorithms, automata, compilers, operating systems, distributed programming and applied math from the Computer Engineering degree.",
            },
        },
    },
    services: {
        integration: {
            seo: {
                title: "Integrations and backend with FastAPI and Spring Boot · Services",
                description: "Custom APIs and connectors that join Zoho CRM with academic and legacy systems over REST, SOAP, SQL Server or FTP, proven on the TIVENOS integration platform."
            }
        },
        crm: {
            seo: {
                title: "Zoho CRM development and automation · Services",
                description: "Modules, workflows and Deluge functions, widgets inside the record, Zoho Creator and Analytics, bulk loads with the Bulk API and forms connected to the CRM."
            }
        },
        web: {
            seo: {
                title: "Web development and landing pages connected to the CRM · Services",
                description: "Sites and apps in React, Next.js and Vite, campaign landing pages with UTM capture and conversion events, full SEO and performance measured with Lighthouse."
            }
        },
        data: {
            seo: {
                title: "Business intelligence and data with SQL and Power BI · Services",
                description: "Database audits and cleanup, CRM snapshots in PostgreSQL, dashboards in Power BI and Zoho Analytics, and reports that update themselves."
            }
        },
        automation: {
            seo: {
                title: "Process automation with n8n, Python and Deluge · Services",
                description: "Workflows in n8n, Zapier and Power Automate, scheduled scripts, bulk email with Jinja2 and Amazon SES and generated documents, with alerts when something fails."
            }
        },
        infra: {
            seo: {
                title: "Infrastructure, Docker and continuous deployment · Services",
                description: "Linux VPS with Nginx and SSL, Docker images, CI/CD with GitHub Actions and zero-restart deploys for fleets of sites, with restricted deploy users."
            }
        },
        observability: {
            seo: {
                title: "Observability with Prometheus, Grafana and OpenTelemetry · Services",
                description: "Metrics, centralized logs, traces, uptime probes and Telegram alerts, to know what fails in a service before anyone reports it."
            }
        },
        consulting: {
            seo: {
                title: "Technical consulting and CRM support · Services",
                description: "Process diagnosis, architecture proposals, documentation and standards for logs, security and deployment, and support for the CRM's users."
            }
        },
    },
    issuers: {
        certiport: {
            name: "Certiport – Pearson VUE",
            text: "Certiport, part of Pearson VUE, runs IT certification exams. IT Specialist is its line for entry-level IT skills, with one exam per technology (Python, Java, HTML and CSS, databases and networking, among others), taken at authorized testing centers.",
        },
        platzi: {
            name: "Platzi",
            text: "Platzi is a Latin American online learning platform for technology, data and business, founded by Freddy Vega and Christian Van Der Henst, who sign its diplomas. It began as Mejorando.la and went through Y Combinator in 2015. Its courses belong to schools and learning paths and end with an exam, and every course passed comes with a diploma that links to its verification on the student's public profile.",
        },
        udea: {
            name: "Universidad de Antioquia",
            text: "A public university with its main campus in Medellín, founded in 1803. It designed the tests of the certification marathon of Engancha TIC 2.0, the Ministry of ICT's event to connect digital talent with companies. The event took place in Medellín during ExpoIngeniería, from November 2 to 4, 2023, and the marathon stayed open until December 15. Those who passed got a certificate secured with blockchain, and I earned four, in data science and AI, cybersecurity, data visualization and web programming.",
        },
        hackerrank: {
            name: "HackerRank",
            text: "HackerRank is a coding practice and assessment platform companies use for hiring. Its skill certificates are earned with a timed test and verified with a public link.",
        },
        inco: {
            name: "INCO Academy",
            text: "INCO Academy offers the Green Digital Skills Certificate, a free online program backed by Microsoft and LinkedIn on sustainability in digital careers.",
        },
        sapiencia: {
            name: "Sapiencia · Comfenalco Antioquia",
            text: "Sapiencia is the post-secondary education agency of the Medellín city government. Python-Django was part of Talento Especializado, its project to cut the shortage of trained people for industry 4.0 jobs in Medellín, open to people who have lived in the city for the last year and finished at least ninth grade. Comfenalco Antioquia, a family compensation fund of the department, certified the two levels with the U.T. VIEW Foundation.",
        },
        hackermentor: {
            name: "HackerMentor",
            text: "HackerMentor issued the credential for HACKLAB, a gamified ethical hacking program, and publishes it on Credsverse, where anyone can verify it.",
        },
        camara: {
            name: "Cámara de Comercio y Educación",
            text: "It gave the free live masterclass on professional Excel in June 2022 and issued its certificate of participation.",
        },
        utp: {
            name: "Universidad Tecnológica de Pereira",
            text: "A public university in Pereira, Risaralda. It ran the programming fundamentals cycle of Misión TIC 2022, the Ministry of ICT's program to train programmers, and issued a certificate for each of its two modules.",
        },
        eia: {
            name: "Universidad EIA",
            text: "A private university that began as the Antioquia School of Engineering, with its main campus in Envigado. It issued the Introduction to Python Programming certificate.",
        },
        coursera: {
            name: "Coursera",
            text: "Coursera is an online learning platform with courses from universities and companies. Its Coursera Project Network, which authorized Introduction to HTML, publishes guided projects, short hands-on lessons with the instructor's video beside a workspace in the cloud. Its certificates are verified with a public link.",
        },
    },
};
