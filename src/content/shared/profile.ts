import {BUILD_DATE} from "@/content/shared/site";

export const CAREER_START = "2022-08";

export const yearsBetween = (start: string, end: string) => {
    const [startYear, startMonth] = start.split("-").map(Number);
    const [endYear, endMonth] = end.split("-").map(Number);
    return Math.floor((endYear * 12 + endMonth - (startYear * 12 + startMonth)) / 12);
};

export const EXPERIENCE_YEARS = yearsBetween(CAREER_START, BUILD_DATE);

export const YEARS = `${EXPERIENCE_YEARS}+`;

export const profile = {
    name: "Sebastián López Osorno",
    shortName: "Sebastián López O",
    givenName: "Sebastián",
    familyName: "López Osorno",
    initials: "SL",
    email: "sebastianlopezosorno2005@gmail.com",
    phone: {
        display: "+57 300 232 9213",
        e164: "+573002329213",
        whatsapp: "573002329213",
    },
    location: {
        city: "Medellín",
        region: "Antioquia",
        country: "Colombia",
        countryCode: "CO",
    },
    twitter: "@sebastianlopo_",
    github: "https://github.com/SebastianLopezO",
    linkedin: "https://www.linkedin.com/in/sebastianlopezosorno/",
} as const;

export const socialLinks = [
    {id: "github", label: "GitHub", href: profile.github},
    {id: "linkedin", label: "LinkedIn", href: profile.linkedin},
    {
        id: "stackoverflow",
        label: "Stack Overflow",
        href: "https://stackoverflow.com/users/20429376/sebasti%c3%a1n-l%c3%b3pez-osorno"
    },
    {id: "hackerrank", label: "HackerRank", href: "https://www.hackerrank.com/profile/sebastianlopezo1"},
    {id: "gitlab", label: "GitLab", href: "https://gitlab.com/sebastianlopezo"},
    {id: "dockerhub", label: "Docker Hub", href: "https://hub.docker.com/u/sebastian190030"},
    {id: "platzi", label: "Platzi", href: "https://platzi.com/p/SebastianLopezO/"},
    {id: "freecodecamp", label: "freeCodeCamp", href: "https://www.freecodecamp.org/sebastianlopezo"},
    {id: "devto", label: "Dev.to", href: "https://dev.to/sebastianlopezo"},
    {id: "codepen", label: "CodePen", href: "https://codepen.io/sebastianlopezo"},
    {id: "replit", label: "Replit", href: "https://replit.com/@sebastianlopezo"},
    {id: "wakatime", label: "WakaTime", href: "https://wakatime.com/@SebastianLopezO"},
] as const;
