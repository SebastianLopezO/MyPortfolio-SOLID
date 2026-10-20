import type {Lang, ResumeId} from "@/types/content";

export interface ResumeVersion {
    id: ResumeId;
    files: Record<Lang, string>;
    preview: Record<Lang, string>;
    previewHeight: number;
    external: boolean;
    /** Pages of the PDF, counted from the files (the designed one from its Drive copy) on 2026-10-16. */
    pages: number;
    /** The day the PDFs were rendered, when the site builds them (scripts/render-resumes.mjs). */
    updated?: string;
}

export const resumeVersions: ResumeVersion[] = [
    {
        id: "ats",
        files: {en: "/cv/Sebastian-Lopez-Osorno-ATS-EN.pdf", es: "/cv/Sebastian-Lopez-Osorno-ATS-ES.pdf"},
        preview: {en: "/cv/previews/ats-en", es: "/cv/previews/ats-es"},
        previewHeight: 1242,
        external: false,
        pages: 2,
        updated: "2026-10-15",
    },
    {
        id: "atsLong",
        files: {en: "/cv/Sebastian-Lopez-Osorno-ATS-Long-EN.pdf", es: "/cv/Sebastian-Lopez-Osorno-ATS-Long-ES.pdf"},
        preview: {en: "/cv/previews/ats-long-en", es: "/cv/previews/ats-long-es"},
        previewHeight: 1242,
        external: false,
        pages: 5,
        updated: "2026-10-15",
    },
    {
        id: "designed",
        files: {
            en: "https://drive.google.com/file/d/10czuGeKwLX0BG3HTMvFDsQQck8W3GUmh/view",
            es: "https://drive.google.com/file/d/1pmHqe91duxnTnBWO50zPptxnqwRU9KUe/view",
        },
        preview: {en: "/cv/previews/designed-en", es: "/cv/previews/designed-es"},
        previewHeight: 1358,
        external: true,
        pages: 1,
    },
];
