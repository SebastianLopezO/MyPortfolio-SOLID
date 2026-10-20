import {CERTIFICATION_SLUG} from "@/content/shared/detail-links";
import {variantWidths} from "@/lib/image-widths";
import type {CaseImageFacts} from "@/types/case-study";
import type {CertificationId} from "@/types/content";

interface CertificateSource {
    width: number;
    height: number;
    /** The original covers the national ID number with a black box. */
    redacted?: boolean;
}

/**
 * The certificate itself, as its issuer publishes it (assets-src/certificates): the Drive PDFs rendered from their first
 * page, the HackerRank, Platzi, INCO and Certifier credentials captured from their public pages (October 2026). The
 * Coursera certificate comes from the PDF its LinkedIn entry links, because Coursera's own record answers with a missing
 * page. Five Platzi diplomas have no image because Platzi's own page no longer loads it, so those keep only their link.
 */
const sources: Partial<Record<CertificationId, CertificateSource>> = {
    itSpecialistPython: {width: 1920, height: 1484},
    daxPowerBi: {width: 864, height: 667},
    powerBiAnalysis: {width: 864, height: 667},
    dataScienceAi: {width: 1920, height: 1330, redacted: true},
    cybersecurity: {width: 1920, height: 1330, redacted: true},
    problemSolving: {width: 1600, height: 1200},
    excelMastery: {width: 864, height: 667},
    excelDataAnalysis: {width: 864, height: 667},
    searchConsoleSeo: {width: 864, height: 667},
    greenDigitalSkills: {width: 1920, height: 1468},
    dataVisualization: {width: 1920, height: 1330, redacted: true},
    webProgramming: {width: 1920, height: 1330, redacted: true},
    djangoTwo: {width: 1920, height: 1484, redacted: true},
    basicProgramming: {width: 864, height: 667},
    hacklab: {width: 1035, height: 1464},
    javaBasic: {width: 1600, height: 1200},
    css: {width: 1600, height: 1200},
    pythonDjango: {width: 1920, height: 1484, redacted: true},
    pythonBasic: {width: 1600, height: 1200},
    excelProfessional: {width: 1920, height: 1358},
    sqlBasic: {width: 1600, height: 1200},
    html: {width: 1920, height: 1484},
    programmingFundamentals: {width: 1920, height: 1484, redacted: true},
    pythonEia: {width: 1920, height: 1080},
};

export const certificateImage = (id: CertificationId): (CaseImageFacts & { redacted: boolean }) | undefined => {
    const source = sources[id];
    if (!source) return undefined;
    return {
        id,
        base: `/certificates/${CERTIFICATION_SLUG[id]}`,
        widths: variantWidths(source.width),
        width: source.width,
        height: source.height,
        redacted: source.redacted ?? false,
    };
};

export const CERTIFICATE_IMAGE_IDS = Object.keys(sources) as CertificationId[];
