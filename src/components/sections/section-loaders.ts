import type {Component} from "solid-js";
import {loadSectionCopies} from "@/content/sections";
import type {Lang, SectionCopyKey, SectionId} from "@/types/content";

/** One chunk per home section; the build renders them in place instead (islands/server.tsx). */
const LOADERS: Record<SectionId, () => Promise<Component>> = {
    about: () => import("./AboutSection").then((module) => module.AboutSection),
    journey: () => import("./JourneySection").then((module) => module.JourneySection),
    services: () => import("./ServicesSection").then((module) => module.ServicesSection),
    experience: () => import("./ExperienceSection").then((module) => module.ExperienceSection),
    skills: () => import("./SkillsSection").then((module) => module.SkillsSection),
    projects: () => import("./ProjectsSection").then((module) => module.ProjectsSection),
    certifications: () => import("./CertificationsSection").then((module) => module.CertificationsSection),
    metrics: () => import("./MetricsSection").then((module) => module.MetricsSection),
    resume: () => import("./ResumeSection").then((module) => module.ResumeSection),
    testimonials: () => import("./TestimonialsSection").then((module) => module.TestimonialsSection),
    contact: () => import("./ContactSection").then((module) => module.ContactSection),
};

/**
 * The copy each section reads, its own and the ones it borrows (the services name projects and recommendations, the
 * jobs their projects). The journey ships its text with its code (content/journey-copy.ts).
 */
const COPIES: Record<SectionId, readonly SectionCopyKey[]> = {
    about: ["about"],
    journey: [],
    services: ["services", "testimonials", "projects"],
    experience: ["experience", "projects"],
    skills: ["skills"],
    projects: ["projects"],
    certifications: ["certifications"],
    metrics: ["metrics"],
    resume: ["resume"],
    testimonials: ["testimonials"],
    contact: ["contact"],
};

/** A section's code once its copy has arrived too, so it renders, and hydrates, without waiting for anything else. */
export const loadSection = (id: SectionId, lang: Lang) =>
    Promise.all([LOADERS[id](), loadSectionCopies(COPIES[id], lang)]).then(([component]) => ({default: component}));
