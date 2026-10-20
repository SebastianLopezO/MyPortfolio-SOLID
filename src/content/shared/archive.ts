import type {Lang} from "@/types/content";

export type ArchiveOrg =
    | "EngineeringSebastian-s"
    | "TechnicalSebastians"
    | "VocationalSebastian-s"
    | "SmartPotTech"
    | "GoPoli"
    | "PepperTechDev"
    | "TaurusSebastian-s"
    | "SebastianLopezO";

export interface ArchiveEntry {
    org: ArchiveOrg;
    name: string;
    year: number;
    stack: string;
    /** Only what the repository's files show it contains; a README or description that claims more does not count. */
    note: Record<Lang, string>;
}

const note = (es: string, en: string) => ({es, en});

/**
 * Every public repository with work of Sebastián's, newest first within each organization (`gh repo list`,
 * 2026-10-15; notes checked against the files on 2026-10-19). Forks, empty repositories (or ones holding only project
 * templates) and organization profiles are left out; private repositories never appear.
 */
export const archive: ArchiveEntry[] = [
    {
        org: "EngineeringSebastian-s", name: "Cybersecurity", year: 2026, stack: "Kali Linux, Nmap, Hydra, Docker",
        note: note(
            "Informes de laboratorio del diplomado en ciberseguridad, con el análisis de vulnerabilidades de un servicio FTP, un CTF hasta la escalada de privilegios y la respuesta a un caso de ciberataque.",
            "Lab reports of the cybersecurity diploma, with the vulnerability analysis of an FTP service, a CTF up to privilege escalation and the response to a cyberattack case.",
        ),
    },
    {
        org: "EngineeringSebastian-s", name: "PGC", year: 2026, stack: "Java, Kotlin, C#, Python, PHP, Rust, Go, React",
        note: note(
            "Pruebas y gestión de la configuración, con CRUDs escritos con TDD en seis lenguajes, 111 pruebas además de los ejercicios de JUnit y un script que corre las ocho suites en Docker.",
            "Testing and configuration management, with CRUDs written test first in six languages, 111 tests on top of the JUnit exercises and a script that runs all eight suites in Docker.",
        ),
    },
    {
        org: "EngineeringSebastian-s",
        name: "EvolutionaryComputation",
        year: 2026,
        stack: "Python, Jupyter, scikit-learn",
        note: note(
            "Machine learning con clasificadores de género musical, vinos e iris, regresión de precios de vivienda, accidentes de tránsito, fine-tuning y un detector de imágenes propio.",
            "Machine learning with music genre, wine and iris classifiers, housing price regression, traffic accidents, fine-tuning and a custom image detector.",
        ),
    },
    {
        org: "EngineeringSebastian-s", name: "ModelsAndSimulations", year: 2026, stack: "Python, Jupyter, SciPy",
        note: note(
            "Transformada inversa para generar variables exponenciales a partir de 200 números uniformes de random.org y de un generador pseudoaleatorio, con pruebas de uniformidad y de rachas y gráficos de frecuencia.",
            "Inverse transform to generate exponential variates from 200 uniform numbers from random.org and from a pseudo-random generator, with uniformity and runs tests and frequency charts.",
        ),
    },
    {
        org: "EngineeringSebastian-s", name: "ComputerVisionIA", year: 2026, stack: "Python, Jupyter",
        note: note(
            "Visión por computador en cinco guías, sobre convoluciones y color, un modelo de visión detrás de una API, agrupamiento de radar Sentinel-1, aprendizaje profundo y detección de enfermedades en lechuga.",
            "Computer vision in five guides, on convolutions and color, a vision model behind an API, Sentinel-1 radar clustering, deep learning and lettuce disease detection.",
        ),
    },
    {
        org: "EngineeringSebastian-s",
        name: "PDYP",
        year: 2025,
        stack: "Java, Spring Boot, Python, FastAPI, GraphQL, React",
        note: note(
            "En programación distribuida y paralela, un bingo multijugador por sockets TCP con hilos, un sistema escolar en Spring Boot con una capa GraphQL en FastAPI y React, y un Sudoku que resuelve por RMI.",
            "In distributed and parallel programming, a multiplayer bingo over TCP sockets with threads, a school system in Spring Boot with a GraphQL layer in FastAPI and React, and a Sudoku solved over RMI.",
        ),
    },
    {
        org: "EngineeringSebastian-s", name: "IA", year: 2025, stack: "Python, CLIPS, scikit-fuzzy, scikit-learn",
        note: note(
            "Inteligencia artificial en cuatro módulos, con un sistema experto en CLIPS, lógica difusa, algoritmos genéticos para colorear imágenes y modelos de clasificación para SmartPot.",
            "Artificial intelligence in four modules, with a CLIPS expert system, fuzzy logic, genetic algorithms that colorize images and classification models for SmartPot.",
        ),
    },
    {
        org: "EngineeringSebastian-s", name: "Redes2", year: 2025, stack: "Cisco IOS, Wireshark, SNMP",
        note: note(
            "Gestión de redes sobre routers Cisco reales, con RIPv2, OSPF y EIGRP, IPv6 con DHCPv6 y EIGRPv6, monitoreo por SNMP y capturas de tráfico en Wireshark.",
            "Network management on real Cisco routers, with RIPv2, OSPF and EIGRP, IPv6 with DHCPv6 and EIGRPv6, SNMP monitoring and Wireshark traffic captures.",
        ),
    },
    {
        org: "EngineeringSebastian-s", name: "Redes1", year: 2025, stack: "Cisco Packet Tracer",
        note: note(
            "Comunicación de redes, con topologías en Packet Tracer y la optimización del direccionamiento IP de una red.",
            "Communication networks, with Packet Tracer topologies and the IP addressing plan of a network.",
        ),
    },
    {
        org: "EngineeringSebastian-s", name: "Sudoku", year: 2025, stack: "Java, Spring Boot, Thymeleaf, RMI",
        note: note(
            "Sudoku web en Spring Boot y Thymeleaf con un servicio de backtracking expuesto por RMI.",
            "A web Sudoku in Spring Boot and Thymeleaf with a backtracking solver exposed over RMI.",
        ),
    },
    {
        org: "EngineeringSebastian-s", name: "ProgrammingMarathon2025", year: 2025, stack: "Python",
        note: note(
            "Un reto de la maratón de programación de 2025 resuelto en Python, que busca un palíndromo sumando cada número con su reverso.",
            "A challenge from the 2025 programming marathon solved in Python, which looks for a palindrome by adding each number to its reverse.",
        ),
    },
    {
        org: "EngineeringSebastian-s", name: "Automatas", year: 2025, stack: "Java, Graphviz",
        note: note(
            "Simulador de autómatas finitos deterministas que evalúa cadenas y dibuja el autómata con Graphviz.",
            "Deterministic finite automata simulator that evaluates strings and draws the automaton with Graphviz.",
        ),
    },
    {
        org: "EngineeringSebastian-s", name: "DB2", year: 2024, stack: "MongoDB, Spring Boot, React, Docker",
        note: note(
            "Bases de datos NoSQL, con agregaciones en MongoDB y una tienda full-stack con API en Spring Boot y JWT, frontend en React y los tres servicios en Docker Compose.",
            "NoSQL databases, with MongoDB aggregations and a full-stack store with a Spring Boot API and JWT, a React frontend and all three services in Docker Compose.",
        ),
    },
    {
        org: "EngineeringSebastian-s", name: "TLP2", year: 2024, stack: "Java, Spring Boot, Thymeleaf, Supabase, React",
        note: note(
            "Lenguajes de programación 2: backends en Spring Boot con seguridad, JPA sobre MySQL, H2 y Supabase, vistas en Thymeleaf y un frontend en React.",
            "Programming languages 2: Spring Boot backends with security, JPA on MySQL, H2 and Supabase, Thymeleaf views and a React frontend.",
        ),
    },
    {
        org: "EngineeringSebastian-s", name: "DesignPatterns", year: 2024, stack: "JavaScript",
        note: note("Patrones de diseño implementados en JavaScript, con su quiz.", "Design patterns implemented in JavaScript, with their quiz."),
    },
    {
        org: "EngineeringSebastian-s", name: "SistemasOperativos", year: 2024, stack: "Python, Bash, Java, Linux",
        note: note(
            "Sistemas operativos en Linux, con administración de usuarios, grupos y permisos, filtrado de archivos con awk, un laboratorio de semáforos en Python y un simulador de planificación round robin en Java y en Python.",
            "Operating systems on Linux, with user, group and permission administration, file filtering with awk, a semaphores lab in Python and a round-robin scheduling simulator in Java and in Python.",
        ),
    },
    {
        org: "EngineeringSebastian-s", name: "ARQH", year: 2024, stack: "Python, MicroPython, ARM Assembly, ESP32",
        note: note(
            "Arquitectura de hardware, con un compresor de Huffman, ensamblador ARM en QtARMSim y un ESP32 en Wokwi con MicroPython y un bot de Telegram.",
            "Hardware architecture, with a Huffman compressor, ARM assembly in QtARMSim and an ESP32 in Wokwi with MicroPython and a Telegram bot.",
        ),
    },
    {
        org: "EngineeringSebastian-s", name: "ElectronicaDigital", year: 2024, stack: "CircuitMaker",
        note: note("Circuitos de electrónica digital simulados en CircuitMaker.", "Digital electronics circuits simulated in CircuitMaker."),
    },
    {
        org: "EngineeringSebastian-s", name: "AP4", year: 2024, stack: "Java",
        note: note(
            "Algoritmos y programación 4: conjuntos, algoritmos de ordenamiento y expresiones regulares.",
            "Algorithms and programming 4: sets, sorting algorithms and regular expressions.",
        ),
    },
    {
        org: "EngineeringSebastian-s", name: "Grafos", year: 2023, stack: "Java",
        note: note("Grafos, de la materia de estructuras de datos.", "Graphs, from the data structures course."),
    },
    {
        org: "EngineeringSebastian-s", name: "Arboles", year: 2023, stack: "Java",
        note: note("Árboles, de la materia de estructuras de datos.", "Trees, from the data structures course."),
    },
    {
        org: "EngineeringSebastian-s", name: "MatricesDispersas", year: 2023, stack: "Java",
        note: note("Matrices dispersas, de la materia de estructuras de datos.", "Sparse matrices, from the data structures course."),
    },
    {
        org: "EngineeringSebastian-s", name: "AP3", year: 2023, stack: "Java",
        note: note("Algoritmos y programación 3.", "Algorithms and programming 3."),
    },
    {
        org: "EngineeringSebastian-s", name: "TLP1", year: 2023, stack: "Java, Swing, EJB",
        note: note(
            "Lenguajes de programación 1: programación orientada a objetos, interfaces en Swing, serialización y EJB.",
            "Programming languages 1: object-oriented programming, Swing interfaces, serialization and EJB.",
        ),
    },
    {
        org: "EngineeringSebastian-s", name: "Polinomios", year: 2023, stack: "Java",
        note: note("Polinomios, de la materia de estructuras de datos.", "Polynomials, from the data structures course."),
    },
    {
        org: "EngineeringSebastian-s", name: "SistemaDeNotas", year: 2023, stack: "Java",
        note: note("Un sistema de notas en Java.", "A grading system in Java."),
    },
    {
        org: "EngineeringSebastian-s", name: "TorresDeHanoi", year: 2023, stack: "Java, HTML, CSS",
        note: note("Las torres de Hanói resueltas por recursión.", "The towers of Hanoi solved by recursion."),
    },
    {
        org: "EngineeringSebastian-s", name: "ProyectoListas", year: 2023, stack: "Python",
        note: note("Listas enlazadas en Python, con su salida en HTML.", "Linked lists in Python, with HTML output."),
    },
    {
        org: "EngineeringSebastian-s", name: "ProyectoDeListas", year: 2023, stack: "Java",
        note: note(
            "Una lista doblemente enlazada circular con inserción ordenada, búsqueda, reemplazo y borrado.",
            "A circular doubly linked list with sorted insertion, search, replacement and deletion.",
        ),
    },
    {
        org: "EngineeringSebastian-s", name: "AP2", year: 2023, stack: "Java",
        note: note(
            "Algoritmos y programación 2: listas simples, dobles y circulares, pilas, matrices y polinomios.",
            "Algorithms and programming 2: singly, doubly and circular linked lists, stacks, matrices and polynomials.",
        ),
    },
    {
        org: "EngineeringSebastian-s", name: "AP1", year: 2023, stack: "PSeInt, C++",
        note: note("Algoritmos y programación 1: pseudocódigo en PSeInt, diagramas y ejercicios.", "Algorithms and programming 1: PSeInt pseudocode, diagrams and exercises."),
    },
    {
        org: "EngineeringSebastian-s", name: "SemioticaInformatica", year: 2022, stack: "HTML, Bootstrap, jQuery",
        note: note("Semiótica informática, con prácticas de interfaces en Bootstrap y jQuery.", "Computer semiotics, with interface practices in Bootstrap and jQuery."),
    },
    {
        org: "EngineeringSebastian-s", name: "CarSpace", year: 2022, stack: "HTML, CSS, JavaScript",
        note: note(
            "Prototipo web de un servicio de parqueaderos, con reservas, estadísticas, configuración y perfil de usuario.",
            "Web prototype of a parking service, with bookings, statistics, settings and user profile.",
        ),
    },
    {
        org: "EngineeringSebastian-s", name: "Car-Space", year: 2022, stack: "HTML, JavaScript",
        note: note("Primera versión del sitio de CarSpace, con beneficios, características, suscripciones y equipo.", "First version of the CarSpace site, with benefits, features, plans and team."),
    },
    {
        org: "TechnicalSebastians", name: "AdminSitePersist", year: 2022, stack: "PHP, MySQL",
        note: note("Sitio de administración de SitePersist, donde se gestionan las solicitudes y el inventario.", "SitePersist's admin site, where requests and the inventory are managed."),
    },
    {
        org: "TechnicalSebastians", name: "CalculadoraNasa", year: 2022, stack: "C#, .NET",
        note: note("Una calculadora de consola en C# sobre .NET 6.", "A console calculator in C# on .NET 6."),
    },
    {
        org: "TechnicalSebastians", name: "VideoToAscii", year: 2022, stack: "C#, Python",
        note: note("Convierte un video en una animación de caracteres ASCII.", "Turns a video into an ASCII character animation."),
    },
    {
        org: "TechnicalSebastians", name: "SitePersist", year: 2022, stack: "PHP, MySQL, JavaScript",
        note: note(
            "Sistema web para reservar espacios y equipos de la IUSH desde cualquier dispositivo, con galería e inventario.",
            "A web system to book IUSH spaces and equipment from any device, with a gallery and an inventory.",
        ),
    },
    {
        org: "VocationalSebastian-s", name: "BitMapConvertColor", year: 2022, stack: "Visual Basic .NET, Excel",
        note: note("Macros de Excel en Visual Basic que convierten los colores de un mapa de bits.", "Excel macros in Visual Basic that convert the colors of a bitmap."),
    },
    {
        org: "VocationalSebastian-s", name: "BingoExcel", year: 2022, stack: "Visual Basic .NET, Excel",
        note: note("Un bingo construido en Excel con macros de VBA.", "A bingo game built in Excel with VBA macros."),
    },
    {
        org: "VocationalSebastian-s", name: "CalculadoraJava", year: 2022, stack: "Java, Android",
        note: note("Una calculadora para Android en Java.", "An Android calculator in Java."),
    },
    {
        org: "VocationalSebastian-s", name: "GuiaPython", year: 2022, stack: "Python, Jupyter",
        note: note("Una guía de Python en un notebook de Jupyter.", "A Python guide in a Jupyter notebook."),
    },
    {
        org: "VocationalSebastian-s", name: "PositionHorse", year: 2022, stack: "Python",
        note: note("Calcula los movimientos de un caballo de ajedrez.", "Computes the moves of a chess knight."),
    },
    {
        org: "VocationalSebastian-s", name: "DimensionCube", year: 2022, stack: "PHP, HTML, CSS",
        note: note("Un sitio web en PHP con música, imágenes y páginas de error.", "A PHP website with music, images and error pages."),
    },
    {
        org: "VocationalSebastian-s", name: "TheCompanyDream", year: 2021, stack: "PHP, HTML, CSS, JavaScript",
        note: note("Sitio web en PHP de una empresa ficticia, hecho en equipo en el bachillerato técnico.", "A PHP website for a fictional company, built as a team in technical high school."),
    },
    {
        org: "SmartPotTech", name: "SmartPot-Broker", year: 2026, stack: "Mosquitto, Docker",
        note: note("Broker MQTT de SmartPot, un Mosquitto con TLS y una cuenta por cultivo.", "SmartPot's MQTT broker, a Mosquitto with TLS and one account per crop."),
    },
    {
        org: "SmartPotTech", name: "SmartPot-Mail", year: 2025, stack: "Mailpit, Docker",
        note: note("Mailpit de SmartPot con SMTP autenticado y bandeja protegida.", "SmartPot's Mailpit with authenticated SMTP and a protected inbox."),
    },
    {
        org: "SmartPotTech", name: "SmartPot-Cache", year: 2025, stack: "Redis, Docker",
        note: note("Redis endurecido de SmartPot.", "SmartPot's hardened Redis."),
    },
    {
        org: "SmartPotTech", name: "SmartPot-DB", year: 2024, stack: "MongoDB, Docker",
        note: note("MongoDB endurecido de SmartPot, con validadores y datos de demostración.", "SmartPot's hardened MongoDB, with validators and demo data."),
    },
    {
        org: "SmartPotTech", name: "SmartPot-AI", year: 2024, stack: "Python, FastAPI, scikit-learn",
        note: note("Asistente de IA de SmartPot, con sistema experto, lógica difusa, machine learning y un agente reactivo.", "SmartPot's AI assistant, with an expert system, fuzzy logic, machine learning and a reactive agent."),
    },
    {
        org: "SmartPotTech", name: "SmartPot-DataGenerator", year: 2024, stack: "Python, MQTT",
        note: note("Simulador de cultivos virtuales por MQTT con clima real, día y noche o medidores manuales.", "A simulator of virtual crops over MQTT with real weather, day and night, or manual gauges."),
    },
    {
        org: "SmartPotTech", name: "SmartPot-Proxy", year: 2024, stack: "Python, FastAPI",
        note: note("Proxy HTTPS original de los dispositivos, archivado al llegar el broker MQTT.", "The devices' original HTTPS proxy, archived when the MQTT broker replaced it."),
    },
    {
        org: "SmartPotTech", name: "SmartPot-API", year: 2024, stack: "Java, Spring Boot, MongoDB",
        note: note("API REST y puente MQTT de SmartPot en Spring Boot 4 y Java 21.", "SmartPot's REST API and MQTT bridge in Spring Boot 4 and Java 21."),
    },
    {
        org: "SmartPotTech", name: "SmartPot-Web", year: 2024, stack: "React, TypeScript, Vite, Tailwind CSS",
        note: note("PWA de SmartPot para monitorear y controlar cultivos hidropónicos.", "SmartPot's PWA to monitor and control hydroponic crops."),
    },
    {
        org: "SmartPotTech", name: "SmartPot-IoT", year: 2024, stack: "MicroPython, ESP32, MQTT",
        note: note("Firmware en MicroPython del dispositivo de un cultivo real (ESP32 o Wokwi) con MQTT sobre TLS.", "MicroPython firmware for a real crop's device (ESP32 or Wokwi) with MQTT over TLS."),
    },
    {
        org: "GoPoli", name: "GoPoli-Web", year: 2026, stack: "Next.js, TypeScript, Leaflet",
        note: note("PWA de GoPoli en Next.js 16: viajes compartidos entre estudiantes del Politécnico.", "GoPoli's PWA in Next.js 16: ride sharing between Politécnico students."),
    },
    {
        org: "GoPoli", name: "GoPoli-API", year: 2026, stack: "Java, Spring Boot, JWT",
        note: note("API REST de GoPoli en Spring Boot 4: cuentas, viajes compartidos, chat y agenda.", "GoPoli's REST API in Spring Boot 4: accounts, shared rides, chat and schedule."),
    },
    {
        org: "GoPoli", name: "GoPoli-DB", year: 2026, stack: "PostgreSQL",
        note: note("PostgreSQL 16 de GoPoli, con el esquema, los catálogos y datos de demostración opcionales.", "GoPoli's PostgreSQL 16: schema, catalogs and optional demo data."),
    },
    {
        org: "GoPoli", name: "GoPoli-Mobile", year: 2026, stack: "Flutter, Dart",
        note: note("App original de GoPoli en Flutter, archivada cuando llegó la PWA.", "GoPoli's original Flutter app, archived when the PWA replaced it."),
    },
    {
        org: "PepperTechDev", name: "PepperCRM-API", year: 2025, stack: "Java, Spring Boot, MongoDB, JWT",
        note: note("API de PepperCRM con autenticación, leads, tareas, etiquetas, archivos y correos, documentada con Swagger.", "PepperCRM's API with authentication, leads, tasks, tags, files and email, documented with Swagger."),
    },
    {
        org: "PepperTechDev", name: "PepperCRM-Web", year: 2025, stack: "React, Vite, Tailwind CSS",
        note: note("App web de PepperCRM con tablero kanban, leads y tareas.", "PepperCRM's web app with a kanban board, leads and tasks."),
    },
    {
        org: "PepperTechDev", name: "PepperCRM-DB", year: 2025, stack: "MongoDB, Docker",
        note: note("Imagen de MongoDB de PepperCRM.", "PepperCRM's MongoDB image."),
    },
    {
        org: "PepperTechDev", name: "PepperCRM-Cache", year: 2025, stack: "Redis, Docker",
        note: note("Imagen de Redis de PepperCRM.", "PepperCRM's Redis image."),
    },
    {
        org: "PepperTechDev", name: "PepperCRM-Mail", year: 2025, stack: "Docker",
        note: note("Servicio de correo de PepperCRM para los entornos locales.", "PepperCRM's mail service for local environments."),
    },
    {
        org: "TaurusSebastian-s", name: "Taurus-FastAPI", year: 2024, stack: "Python, FastAPI, SQLAlchemy",
        note: note("API de métricas de la prueba técnica, agrupadas por cliente, agente y estado.", "The technical test's metrics API, grouped by tenant, agent and state."),
    },
    {
        org: "TaurusSebastian-s", name: "Taurus-Frontend", year: 2024, stack: "React, TypeScript, AG Grid, Plotly.js",
        note: note("Tablero en React con una grilla de AG Grid y gráficas de Plotly.", "A React dashboard with an AG Grid table and Plotly charts."),
    },
    {
        org: "TaurusSebastian-s", name: "Taurus-DataAnalysis", year: 2024, stack: "Python, Pandas, MySQL",
        note: note("Carga de los CSV a MySQL y análisis exploratorio en un notebook.", "Loading the CSV files into MySQL and exploratory analysis in a notebook."),
    },
    {
        org: "SebastianLopezO", name: "SebastianLopezO", year: 2022, stack: "Markdown, GitHub Actions",
        note: note(
            "Mi perfil de GitHub, con el README, las hojas de vida en Markdown y los workflows que regeneran cada día las métricas que usa este sitio.",
            "My GitHub profile, with the README, the resumes in Markdown and the workflows that regenerate the metrics this site uses every day.",
        ),
    },
    {
        org: "SebastianLopezO",
        name: "FCC-data-analysis-with-python",
        year: 2024,
        stack: "Python, Pandas, NumPy, Matplotlib",
        note: note(
            "Proyectos de la certificación de análisis de datos con Python de freeCodeCamp.",
            "Projects of freeCodeCamp's data analysis with Python certification.",
        ),
    },
    {
        org: "SebastianLopezO", name: "PythonDjango", year: 2022, stack: "Python, Django",
        note: note("Proyectos del curso de Python con Django.", "Projects of the Python and Django course."),
    },
];

export const archiveOrgUrl = (org: ArchiveOrg) => `https://github.com/${org}`;

export const archiveUrl = (entry: ArchiveEntry) => `${archiveOrgUrl(entry.org)}/${entry.name}`;

export const archiveOf = (org: ArchiveOrg) => archive.filter((entry) => entry.org === org);
