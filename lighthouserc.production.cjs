const site = (process.env.SITE_URL || "https://sebastianlopezo.page").replace(/\/$/, "");
const views = ["", "/backend", "/crm", "/data", "/devops", "/fullstack"];

module.exports = {
    ci: {
        collect: {
            url: [
                ...["en", "es"].flatMap((lang) => views.map((view) => `${site}/${lang}${view}`)),
                `${site}/en/data?locked=true`,
                `${site}/en/projects`,
                `${site}/es/projects/smartpot`,
                `${site}/en/projects/integration-platform`,
            ],
            numberOfRuns: 3,
            settings: {chromeFlags: "--no-sandbox --headless=new"},
        },
        assert: {
            assertions: {
                "categories:performance": ["warn", {minScore: 0.95}],
                "categories:accessibility": ["error", {minScore: 1}],
                "categories:best-practices": ["error", {minScore: 1}],
                "categories:seo": ["error", {minScore: 1}],
            },
        },
        upload: {target: "filesystem", outputDir: ".lighthouseci/production"},
    },
};
