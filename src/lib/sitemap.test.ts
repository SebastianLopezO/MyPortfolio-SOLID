import {buildRobots, buildSitemap} from "@/lib/sitemap";

describe("sitemap and robots", () => {
    it("lists the profile, project and detail pages in both languages as plain XML", () => {
        const sitemap = buildSitemap();
        expect(sitemap.match(/<url>/g)).toHaveLength(182);
        expect(sitemap).toContain("<loc>https://sebastianlopezo.page/es/data</loc>");
        expect(sitemap).toContain("<loc>https://sebastianlopezo.page/es/projects/smartpot</loc>");
        expect(sitemap).toContain("<loc>https://sebastianlopezo.page/es/projects/gopoli</loc>");
        expect(sitemap).toContain("<loc>https://sebastianlopezo.page/en/projects/landing-platform</loc>");
        expect(sitemap).toContain("<loc>https://sebastianlopezo.page/es/experience/muv-u</loc>");
        expect(sitemap).toContain("<loc>https://sebastianlopezo.page/en/certifications/it-specialist-python</loc>");
        expect(sitemap).toContain("<lastmod>2026-10-03</lastmod>");
        expect(sitemap).not.toContain("http://www.w3.org/1999/xhtml");
        expect(sitemap).not.toContain("<xhtml:link");
    });

    it("dates each page by the day it last changed", () => {
        const sitemap = buildSitemap((path) => (path === "/es/projects/smartpot" ? "2026-09-12" : "2026-10-03"));
        const smartpot = sitemap.split("<url>").find((entry) => entry.includes("<loc>https://sebastianlopezo.page/es/projects/smartpot</loc>"))!;
        expect(smartpot).toContain("<lastmod>2026-09-12</lastmod>");
        expect(sitemap.match(/<lastmod>2026-09-12<\/lastmod>/g)).toHaveLength(1);
    });

    it("lists the screens of each project and the certificate of each certification", () => {
        const sitemap = buildSitemap();
        const smartpot = sitemap.split("<url>").find((entry) => entry.includes("<loc>https://sebastianlopezo.page/en/projects/smartpot</loc>"))!;
        expect(smartpot.match(/<image:loc>/g)).toHaveLength(3);
        expect(smartpot).toMatch(/<image:loc>https:\/\/sebastianlopezo\.page\/[^<]+\.webp<\/image:loc>/);
        expect(sitemap).toContain("<image:loc>https://sebastianlopezo.page/certificates/hacklab-1035.webp</image:loc>");
        const profile = sitemap.split("<url>").find((entry) => entry.includes("<loc>https://sebastianlopezo.page/en</loc>"))!;
        expect(profile).not.toContain("<image:image>");
    });

    it("points crawlers to the sitemap", () => {
        expect(buildRobots()).toContain("Sitemap: https://sebastianlopezo.page/sitemap.xml");
    });
});
