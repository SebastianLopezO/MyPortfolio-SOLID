import {AssistantLauncher} from "@/components/assistant/AssistantLauncher";
import {SiteFooter} from "@/components/layout/SiteFooter";
import {SkipLink} from "@/components/layout/SkipLink";
import {WhatsAppButton} from "@/components/layout/WhatsAppButton";
import {AboutSection} from "@/components/sections/AboutSection";
import {CertificationsSection} from "@/components/sections/CertificationsSection";
import {ContactSection} from "@/components/sections/ContactSection";
import {ExperienceSection} from "@/components/sections/ExperienceSection";
import {HeroSection} from "@/components/sections/HeroSection";
import {HighlightsStrip} from "@/components/sections/HighlightsStrip";
import {JourneySection} from "@/components/sections/JourneySection";
import {MetricsSection} from "@/components/sections/MetricsSection";
import {ProjectsSection} from "@/components/sections/ProjectsSection";
import {ResumeSection} from "@/components/sections/ResumeSection";
import {ServicesSection} from "@/components/sections/ServicesSection";
import {SkillsSection} from "@/components/sections/SkillsSection";
import {TestimonialsSection} from "@/components/sections/TestimonialsSection";
import {caseStudyCopy} from "@/content/case-studies";
import {registerDetailCopy} from "@/content/detail-copy";
import {detailPages as enDetails} from "@/content/detail-pages/en";
import {detailPages as esDetails} from "@/content/detail-pages/es";
import en from "@/content/en";
import es from "@/content/es";
import {registerProjectsCopy} from "@/content/project-copy";
import {projectPages as enPages} from "@/content/project-pages/en";
import {projectPages as esPages} from "@/content/project-pages/es";
import {registerSectionCopies} from "@/content/sections";
import {NotFoundPage} from "@/views/NotFoundPage";
import {Boot} from "./parts/boot";
import {DetailBodyPart} from "./parts/detail-body";
import {HeaderPart} from "./parts/header";
import {ProjectBodyPart} from "./parts/project-body";
import {registerServerParts} from "./registry";

// Imported by the pages at build time only: every part and every copy is at hand, so nothing waits on a chunk.
registerServerParts({
    boot: Boot,
    skip: SkipLink,
    header: HeaderPart,
    hero: HeroSection,
    highlights: HighlightsStrip,
    footer: SiteFooter,
    whatsapp: WhatsAppButton,
    assistant: AssistantLauncher,
    notFound: NotFoundPage,
    projectBody: ProjectBodyPart,
    detailBody: DetailBodyPart,
    "section:about": AboutSection,
    "section:journey": JourneySection,
    "section:services": ServicesSection,
    "section:experience": ExperienceSection,
    "section:skills": SkillsSection,
    "section:projects": ProjectsSection,
    "section:certifications": CertificationsSection,
    "section:metrics": MetricsSection,
    "section:resume": ResumeSection,
    "section:testimonials": TestimonialsSection,
    "section:contact": ContactSection,
}, {en, es});
registerSectionCopies(en);
registerSectionCopies(es);
registerProjectsCopy("en", {cases: caseStudyCopy.en, pages: enPages});
registerProjectsCopy("es", {cases: caseStudyCopy.es, pages: esPages});
registerDetailCopy("en", enDetails);
registerDetailCopy("es", esDetails);
