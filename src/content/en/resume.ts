import type {Content} from "@/types/content";

export const resume: Content["resume"] = {
    title: "My Resume",
    subtitle: {
        general: "Choose the version that fits your process. The compact one suits job portals, the extended one a technical interview and the designed one reading on screen",
        backend: "For a backend role, the extended version brings the integration platform, each project's APIs and their tests; the compact one passes any job portal",
        crm: "For a CRM role, the extended version details the Zoho integrations, the widgets and the campaign landing pages; the compact one passes any job portal",
        data: "For a data role, the extended version adds the Power BI reports, the snapshot service and the BI certifications",
        devops: "For a DevOps role, the extended version brings every achievement of every job, with the deploys, containers and observability",
        fullstack: "For a full-stack role, the extended version walks through the web products end to end; the designed one shows the profile on one page",
    },
    download: "Download PDF",
    open: "Open document",
    previewAlt: "Preview of the first page of the resume",
    includesTitle: "What it includes",
    pages: {one: "1 page", other: "{count} pages"},
    firstPage: "Page 1 of {count}",
    updated: "Updated on {date}",
    versions: {
        ats: {
            label: "ATS (compact)",
            description: "Concise version, ready for applicant tracking systems.",
            format: "PDF with selectable text",
            includes: [
                "Two pages in a single column with selectable text",
                "Profile, experience, skills and education",
                "Keywords for backend, CRM, data and DevOps roles",
            ],
        },
        atsLong: {
            label: "ATS (extended)",
            description: "With the full detail of every role, certification and project.",
            format: "PDF with selectable text",
            includes: [
                "Five pages with every role and achievement",
                "Projects, certifications and courses",
                "Same plain format, readable by any tracking system",
            ],
        },
        designed: {
            label: "Designed CV",
            description: "Visual version for direct reading.",
            format: "PDF designed in Canva",
            includes: [
                "Visual layout designed in Canva",
                "Made for reading on screen or printing",
                "Opens in Google Drive",
            ],
        },
    },
};
