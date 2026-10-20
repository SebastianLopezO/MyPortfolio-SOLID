import type {Content} from "@/types/content";
import {about} from "./about";
import {certifications} from "./certifications";
import {contact} from "./contact";
import {experience} from "./experience";
import {metrics} from "./metrics";
import {projects} from "./projects";
import {resume} from "./resume";
import {services} from "./services";
import {skills} from "./skills";
import startup from "./startup";
import {testimonials} from "./testimonials";

/** Every piece of copy in one object, for the prerender, the assistant and the tests. */
const content = {
    ...startup,
    about,
    experience,
    services,
    skills,
    projects,
    certifications,
    testimonials,
    resume,
    metrics,
    contact,
} satisfies Content;

export default content;
