import {createReadStream, existsSync, statSync} from "node:fs";
import {createServer} from "node:http";
import {extname, join, normalize, resolve} from "node:path";

const root = resolve(process.argv[2] ?? "dist");
const port = Number(process.env.PORT ?? 4173);
const host = process.env.HOST ?? "127.0.0.1";

const TYPES = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json",
    ".xml": "application/xml",
    ".txt": "text/plain; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".webp": "image/webp",
    ".avif": "image/avif",
    ".ico": "image/x-icon",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".pdf": "application/pdf",
};

const isFile = (path) => existsSync(path) && statSync(path).isFile();

const cacheControl = (pathname, file) => {
    if (pathname.startsWith("/assets/")) return "public, max-age=31536000, immutable";
    if (file.endsWith(".html")) return "no-cache";
    return "public, max-age=3600";
};

const send = (request, response, file, status = 200) => {
    const gzip = `${file}.gz`;
    const compressed = /\bgzip\b/.test(request.headers["accept-encoding"] ?? "") && isFile(gzip);
    response.writeHead(status, {
        "Content-Type": TYPES[extname(file)] ?? "application/octet-stream",
        "Cache-Control": cacheControl(new URL(request.url, "http://localhost").pathname, file),
        Vary: "Accept-Encoding",
        ...(compressed && {"Content-Encoding": "gzip"}),
    });
    if (request.method === "HEAD") return response.end();
    createReadStream(compressed ? gzip : file).pipe(response);
};

const server = createServer((request, response) => {
    const url = new URL(request.url, "http://localhost");
    const {pathname, search} = url;

    if (pathname === "/health") {
        response.writeHead(200, {"Content-Type": "application/json"});
        return response.end('{"status":"UP"}');
    }

    if (pathname === "/") {
        const lang = /^es\b/i.test(request.headers["accept-language"] ?? "") ? "es" : "en";
        response.writeHead(302, {Location: `/${lang}${search}`});
        return response.end();
    }

    if (pathname.length > 1 && pathname.endsWith("/")) {
        response.writeHead(301, {Location: `${pathname.replace(/\/+$/, "")}${search}`});
        return response.end();
    }

    const target = normalize(join(root, decodeURIComponent(pathname)));
    if (!target.startsWith(root)) {
        response.writeHead(400);
        return response.end();
    }

    for (const candidate of [target, join(target, "index.html")]) {
        if (isFile(candidate)) return send(request, response, candidate);
    }
    return send(request, response, join(root, "404.html"), 404);
});

server.listen(port, host, () => console.log(`Serving ${root} on http://${host}:${port}`));
