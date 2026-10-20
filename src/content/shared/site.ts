export const SITE_URL = __SITE_URL__.replace(/\/$/, "");

export const BUILD_DATE = __BUILD_DATE__;

export const BUILD_YEAR = Number(BUILD_DATE.slice(0, 4));

export const absoluteUrl = (path: string) => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
