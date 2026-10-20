import {build} from "vite";
import {refreshGithubStats} from "./github-stats.ts";

process.env.BUILD_DATE ??= new Date().toISOString().slice(0, 10);

// CI and the Docker image build with the latest GitHub figures; a local build keeps the committed snapshot.
if (process.env.CI) await refreshGithubStats();

await build();
await build({
    logLevel: "warn",
    build: {ssr: "src/entry-server.tsx", outDir: "dist-ssr", copyPublicDir: false, emptyOutDir: true},
});
await import("./prerender.ts");
