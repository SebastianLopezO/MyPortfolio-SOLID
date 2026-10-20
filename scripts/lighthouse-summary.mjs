import {appendFileSync, readFileSync} from "node:fs";

const dir = process.argv[2] ?? ".lighthouseci/production";
const title = process.argv[3] ?? "Lighthouse (mobile)";
const manifest = JSON.parse(readFileSync(`${dir}/manifest.json`, "utf8"));
const score = (value) => (value === undefined ? "–" : Math.round(value * 100));
const rows = manifest.filter((run) => run.isRepresentativeRun).map(({url, summary, jsonPath}) => {
    const audits = JSON.parse(readFileSync(jsonPath, "utf8")).audits;
    const metric = (id) => audits[id]?.displayValue ?? "–";
    return `| ${new URL(url).pathname}${new URL(url).search} | ${score(summary.performance)} | ${score(summary.accessibility)} | ${score(summary["best-practices"])} | ${score(summary.seo)} | ${metric("first-contentful-paint")} | ${metric("largest-contentful-paint")} | ${metric("total-blocking-time")} | ${metric("cumulative-layout-shift")} |`;
});
const table = [
    "| Page | Performance | Accessibility | Best practices | SEO | FCP | LCP | TBT | CLS |",
    "|---|---|---|---|---|---|---|---|---|",
    ...rows,
].join("\n");
console.log(table);
if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `## ${title}\n\n${table}\n`);
