import en from "@/content/en";
import es from "@/content/es";
import {assistant as enCopy} from "@/content/en/assistant";
import {assistant as esCopy} from "@/content/es/assistant";
import {EXPERIENCE_YEARS} from "@/content/shared/profile";
import {createAssistant} from "@/lib/assistant/answer";
import {items as enCases} from "@/content/case-studies/en";
import {items as esCases} from "@/content/case-studies/es";
import {detailPages as enDetails} from "@/content/detail-pages/en";
import {detailPages as esDetails} from "@/content/detail-pages/es";
import type {RoleId} from "@/content/roles";
import {ROLE_IDS} from "@/content/roles";
import {detect} from "@/lib/assistant/intents";
import {normalize, terms, tokenize} from "@/lib/assistant/normalize";
import type {IntentId} from "@/types/assistant";

const askEn = createAssistant(en, enCopy);
const askEs = createAssistant(es, esCopy);

describe("normalize", () => {
    it("removes accents and protects compound terms", () => {
        expect(normalize("¿Cuántos AÑOS?")).toContain("anos");
        expect(tokenize("C# and CI/CD with Node.js")).toEqual(expect.arrayContaining(["csharp", "cicd", "nodejs"]));
        expect(tokenize("hoja de vida")).toEqual(["cv"]);
        expect(tokenize("Full Stack")).toEqual(["fullstack"]);
        expect(tokenize("Power BI")).toEqual(["powerbi"]);
    });

    it("maps both languages to the same terms", () => {
        expect(terms("certificaciones")).toEqual(terms("certifications"));
        expect(terms("integraciones")).toEqual(terms("integrations"));
        expect(terms("experiencia")).toEqual(terms("experience"));
        expect(terms("¿Qué proyectos tiene?")).toEqual(["project"]);
    });
});

const fixtures: [string, IntentId, RoleId | null][] = [
    ["How many years of experience does he have?", "experienceYears", null],
    ["¿Cuántos años de experiencia tiene?", "experienceYears", null],
    ["What is his seniority?", "experienceYears", null],
    ["Where does he work now?", "currentRole", null],
    ["¿Dónde trabaja actualmente?", "currentRole", null],
    ["What is his tech stack?", "stack", null],
    ["¿Cuál es su stack?", "stack", null],
    ["Which programming languages does he use?", "stack", null],
    ["Is he a good fit for a backend role?", "roleFit", "backend"],
    ["¿Encaja en un rol backend?", "roleFit", "backend"],
    ["What has he built with Zoho CRM?", "roleFit", "crm"],
    ["¿Qué herramientas de BI usa?", "roleFit", "data"],
    ["Which BI tools does he use?", "roleFit", "data"],
    ["How does he deploy services?", "roleFit", "devops"],
    ["¿Ha usado Kubernetes?", "roleFit", "devops"],
    ["Which frontends has he built?", "roleFit", "fullstack"],
    ["Can he work as a full stack developer?", "roleFit", "fullstack"],
    ["Is he available?", "availability", null],
    ["¿Está disponible?", "availability", null],
    ["How can I contact him?", "availability", null],
    ["¿Cuál es su correo?", "availability", null],
    ["Where does he live?", "location", null],
    ["¿Trabaja en remoto?", "location", null],
    ["What did he study?", "education", null],
    ["¿Cuándo se gradúa de la universidad?", "education", null],
    ["What are his plans after graduating?", "plans", null],
    ["¿Qué maestría quiere estudiar?", "plans", null],
    ["Will he study cybersecurity?", "plans", null],
    ["What languages does he speak?", "languages", null],
    ["¿Habla inglés?", "languages", null],
    ["What are his projects?", "projects", null],
    ["What is SmartPot?", "projects", null],
    ["¿Qué es GoPoli?", "projects", null],
    ["Which certifications does he have?", "certifications", null],
    ["¿Qué certificados tiene?", "certifications", null],
    ["What do his colleagues say about him?", "testimonials", null],
    ["¿Tiene recomendaciones?", "testimonials", null],
    ["Can I download his resume?", "resume", null],
    ["¿Dónde está su hoja de vida?", "resume", null],
    ["How many commits does he have on GitHub?", "githubStats", null],
    ["¿Cuántos repositorios tiene?", "githubStats", null],
    ["How many clients has he served?", "clients", null],
    ["¿A cuántos clientes ha atendido?", "clients", null],
    ["What is his salary expectation?", "salary", null],
    ["¿Cuánto cobra?", "salary", null],
    ["Hello", "greeting", null],
    ["Hola, buenos días", "greeting", null],
    ["Who is Sebastián?", "about", null],
    ["¿Quién es Sebastián?", "about", null],
    ["Tell me about him", "about", null],
    ["What services does he offer?", "services", null],
    ["¿Qué servicios ofrece?", "services", null],
    ["Why hire him?", "whyHire", null],
    ["¿Por qué contratarlo?", "whyHire", null],
    ["¿Cuáles son sus fortalezas?", "whyHire", null],
    ["How does he work?", "workStyle", null],
    ["¿Cómo trabaja?", "workStyle", null],
    ["What has his career been like?", "journey", null],
    ["¿Cómo ha sido su trayectoria?", "journey", null],
    ["Has he led teams?", "leadership", null],
    ["¿Ha liderado equipos?", "leadership", null],
    ["Which industries has he worked in?", "industries", null],
    ["¿En qué sectores ha trabajado?", "industries", null],
    ["Which GitHub organizations is he in?", "organizations", null],
    ["¿En qué organizaciones de GitHub está?", "organizations", null],
    ["How many hours does he code?", "coding", null],
    ["¿Cuántas horas programa?", "coding", null],
    ["Does he use AI?", "ai", null],
    ["¿Usa inteligencia artificial?", "ai", null],
    ["What is his cybersecurity experience?", "security", null],
    ["¿Qué experiencia tiene en ciberseguridad?", "security", null],
    ["How was this site built?", "site", null],
    ["¿Cómo funciona este asistente?", "site", null],
    ["What does he do at TIVENOS?", "company", null],
    ["¿Qué hizo en MUV-U?", "company", null],
    ["¿Qué hizo en Quipux?", "company", null],
    ["What did he study at SENA?", "program", null],
    ["¿Qué hace en el diplomado?", "program", null],
    ["What are the Zoho CRM widgets?", "projects", null],
    ["Does he have a Python certification?", "certifications", null],
];

describe("intent detection", () => {
    it.each(fixtures)("%s → %s", (query, intent, role) => {
        const detection = detect(query, null);
        expect(detection.intents[0]).toBe(intent);
        if (role) expect(detection.role).toBe(role);
    });

    it("keeps leads, the CRM records, apart from leading people", () => {
        expect(detect("How does he capture leads in Zoho CRM?", null).intents).not.toContain("leadership");
    });

    it("names the job, the program and the project a question is about", () => {
        expect(detect("¿Qué proyectos hizo en ADCOM?", null)).toMatchObject({intents: ["company"], company: "adcom"});
        expect(detect("What did he study at SENA?", null).program).toBe("sena");
        expect(detect("What are the Zoho CRM widgets?", null).project).toBe("crmWidgets");
    });

    it("never combines salary with other intents", () => {
        expect(detect("Is he available and what is his salary?", null).intents).toEqual(["salary"]);
    });

    it("prefers the active role on ties", () => {
        expect(detect("Which APIs has he integrated?", "crm").role).toBe("crm");
        expect(detect("Which APIs has he integrated?", "backend").role).toBe("backend");
    });

    it("uses the active role for generic fit questions", () => {
        const detection = detect("Is he a good fit for this role?", "data");
        expect(detection.intents).toContain("roleFit");
        expect(detection.role).toBe("data");
    });
});

describe("answers", () => {
    it("states the years of experience in both languages", () => {
        expect(askEn("How many years of experience?", {
            role: null,
            locked: false
        }).text).toContain(`${EXPERIENCE_YEARS}+ years`);
        expect(askEs("¿Cuántos años de experiencia?", {
            role: null,
            locked: false
        }).text).toContain(`más de ${EXPERIENCE_YEARS} años`);
    });

    it("quotes a real experience bullet when answering role fit", () => {
        const answer = askEn("Is he a good fit for a backend role?", {role: null, locked: false});
        const bullets = Object.values(en.experience.items).flatMap((item) => item.bullets.map((bullet) => bullet.text));
        expect(bullets.some((bullet) => answer.text.includes(bullet))).toBe(true);
        expect(answer.links.map((link) => link.href)).toContain("/en/backend");
    });

    it("never links to another role view when the profile is locked", () => {
        const answer = askEs("¿Encaja en un rol de datos?", {role: "backend", locked: true});
        expect(answer.intents).toContain("roleFit");
        // The only pages it may open keep the lock: projects and detail pages, never another role. The view itself is
        // added when a link is followed (lib/role-links.ts).
        for (const link of answer.links.filter((item) => item.kind === "route")) expect(link.href).toMatch(/^\/es\/[\w/-]+\?locked=true$/);
    });

    it("finds specific technologies through retrieval", () => {
        const answer = askEn("Has he used Kubernetes?", {role: null, locked: false});
        expect([answer.text, ...answer.details].join(" ")).toMatch(/Kubernetes/);
    });

    it("searches the profile when no intent matches", () => {
        const answer = askEn("Tell me about WebSockets and Zeep", {role: null, locked: false});
        expect(answer.intents).toEqual(["search"]);
        expect(answer.details.join(" ")).toMatch(/Zeep/);
    });

    it("falls back to contact for unknown questions", () => {
        const answer = askEs("¿Cuál es su comida favorita?", {role: null, locked: false});
        expect(answer.intents).toEqual(["fallback"]);
        expect(answer.links.map((link) => link.href)).toContain("#contact");
    });

    it("redirects salary questions to a direct conversation", () => {
        const answer = askEn("How much does he charge per hour?", {role: null, locked: false});
        expect(answer.intents).toEqual(["salary"]);
        expect(answer.links.some((link) => link.href.startsWith("https://wa.me/573002329213"))).toBe(true);
    });

    it("links the resume download in the page language", () => {
        expect(askEs("Quiero su hoja de vida", {
            role: null,
            locked: false
        }).links[0].href).toBe("/cv/Sebastian-Lopez-Osorno-ATS-ES.pdf");
    });

    it("describes a named project", () => {
        const answer = askEn("What is GoPoli?", {role: null, locked: false});
        expect(answer.text.startsWith("GoPoli. In his words:")).toBe(true);
        expect(answer.details.length).toBeGreaterThan(0);
    });

    it("finds the admissions funnel and the email automations by what they do", () => {
        expect(askEn("Tell me about the admissions funnel", {
            role: null,
            locked: false
        }).text.startsWith("University Admissions Funnel.")).toBe(true);
        expect(askEs("¿Hizo correos de cumpleaños?", {
            role: null,
            locked: false
        }).text.startsWith("Correo hiperpersonalizado a escala.")).toBe(true);
    });
});

describe("assistant with case studies", () => {
    const ask = createAssistant(en, enCopy, enCases);

    it("answers from a case study and links to its page, keeping the lock", () => {
        const answer = ask("How do you integrate PeopleSoft over SOAP?", {role: "backend", locked: true});
        expect(answer.links.map((link) => link.href)).toContain("/en/projects/integration-platform?locked=true");
    });

    it("links search answers to the case study, with the lock only when the profile is locked", () => {
        const general = ask("How do signatures render in desktop Outlook?", {role: null, locked: false});
        expect(general.links.map((link) => link.href)).toContain("/en/projects/email-signatures");
        const locked = createAssistant(es, esCopy, esCases)("¿Cómo se ven las firmas en Outlook de escritorio?", {
            role: "backend",
            locked: true
        });
        expect(locked.links.map((link) => link.href)).toContain("/es/projects/email-signatures?locked=true");
    });
});

describe("assistant with the detail pages", () => {
    const ask = createAssistant(en, enCopy, enCases, enDetails);
    const askSpanish = createAssistant(es, esCopy, esCases, esDetails);
    const general = {role: null, locked: false};

    it("answers every suggested, follow-up and catalog question without falling back", () => {
        for (const [copy, assistant] of [[enCopy, ask], [esCopy, askSpanish]] as const) {
            const questions = new Set([
                ...ROLE_IDS.flatMap((role) => copy.suggestions[role]),
                ...copy.suggestions.general,
                ...Object.values(copy.followUps).flat(),
                ...copy.catalog.groups.flatMap((group) => group.questions),
            ]);
            expect(questions.size).toBeGreaterThan(40);
            for (const question of questions) {
                const answer = assistant(question!, general);
                expect(answer.intents, question).not.toContain("fallback");
                expect(answer.text.length, question).toBeGreaterThan(20);
            }
        }
    });

    it("tells a job and links its page", () => {
        const answer = ask("What does he do at ADCOM?", {role: "crm", locked: true});
        expect(answer.text).toMatch(/^CRM & MarTech Developer at ADCOM GROUP \(Feb 2025 – Present\)\. In his words: "/);
        expect(answer.details).toHaveLength(3);
        expect(answer.links[0]).toEqual({
            kind: "route",
            label: "ADCOM GROUP",
            href: "/en/experience/adcom?locked=true"
        });
    });

    it("tells a program with its areas and links its page and coursework", () => {
        const answer = askSpanish("¿Qué estudió en el SENA?", general);
        expect(answer.text).toMatch(/^Técnico en Programación de Software, SENA/);
        expect(answer.details[0]).toMatch(/^Análisis y diseño:/);
        expect(answer.links.map((link) => link.href)).toEqual(["/es/education/programming-technician", "/es/projects/programming-technician"]);
    });

    it("lists the certifications that match a topic and links their pages", () => {
        const answer = ask("Does he have a Python certification?", general);
        expect(answer.text).toMatch(/^Yes\. He holds the .*IT Specialist – Python.* certifications?\.$/);
        expect(answer.links.filter((link) => link.href.startsWith("/en/certifications/")).length).toBeGreaterThanOrEqual(2);
        expect(answer.links.map((link) => link.href)).toContain("/en/certifications");
    });

    it("quotes the recommendations behind the reasons to hire", () => {
        const answer = askSpanish("¿Por qué contratarlo?", general);
        expect(answer.details).toHaveLength(3);
        for (const detail of answer.details) expect(detail).toMatch(/: “.+” \(.+\)$/);
    });

    it("counts the organizations and lists the busiest", () => {
        const answer = ask("Which GitHub organizations is he in?", general);
        expect(answer.text).toContain("10 GitHub organizations");
        expect(answer.details[0]).toBe("ADCOM-Group: 9,671 / 9,671 commits");
        expect(answer.links.map((link) => link.href)).toContain("/en/organizations");
    });

    it("explains the site with its page count and links the project", () => {
        const answer = askSpanish("¿Cómo está hecho este sitio?", general);
        expect(answer.text).toContain("186 páginas");
        expect(answer.links.map((link) => link.href)).toContain("/es/projects/portfolio");
    });

    it("tells how he works and how he got here from the about text of the role view", () => {
        expect(ask("How does he work?", {
            role: "data",
            locked: false
        }).text).toBe(`In his words: "${en.about.story.data[0]}"`);
        expect(askSpanish("¿Cómo ha sido su trayectoria?", general).text).toBe(`En sus palabras: «${es.about.story.general[1]}»`);
    });

    it("offers follow-up questions about the same topic, never the one just asked", () => {
        const answer = ask("Who is Sebastián?", general);
        expect(answer.followUps).toEqual(enCopy.followUps.about);
        expect(ask("Where does he work now?", general).followUps).not.toContain("Where does he work now?");
    });

    it("links search results to the detail pages they come from", () => {
        const answer = askSpanish("¿Vio teoría de compiladores?", general);
        expect(answer.links.map((link) => link.href)).toContain("/es/education/computer-engineering");
    });
});
