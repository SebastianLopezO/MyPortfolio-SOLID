# Deployment

The site ships as a static, prerendered build inside an unprivileged nginx image published to GHCR.
The production server only pulls images; it never builds.

```
push to main ─► CI (lint, tests, build, e2e, Lighthouse, Docker smoke test)
            └─► Publish Docker Image ─► ghcr.io/sebastianlopezo/myportfolio:{latest, sha-xxxxxxx, x.y.z}
                                    └─► Deploy to Production (SSH + docker compose)
```

## Image

| Item         | Value                                                                                                                                                        |
|--------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Stages       | `deps` installs with pnpm, `build` prerenders and precompresses, `runtime` copies only `dist` and the nginx configuration                                    |
| Build user   | `node` (uid 1000): package scripts cannot write outside `/app` and the pnpm store                                                                            |
| Base         | `node:22-alpine` for the first two stages, `nginxinc/nginx-unprivileged:1.31.5-alpine-slim` for the runtime, both pinned by digest (Dependabot updates them) |
| Runtime user | uid 101; the served files belong to root, so nginx can read them and not change them                                                                         |
| Size         | ~30 MB                                                                                                                                                       |
| Port         | `8080`                                                                                                                                                       |
| Health       | `GET /health` → `{"status":"UP"}` (also used by the Docker `HEALTHCHECK`)                                                                                    |
| Tags         | `latest` (main), `sha-<7 chars>` (every build), `x.y.z` and `x.y` (tags `vX.Y.Z`)                                                                            |
| Supply chain | SBOM and maximum provenance attestations on every push, and a keyless cosign signature of the digest in each registry                                        |
| Scanning     | CI runs Trivy on the image and fails on fixable HIGH or CRITICAL vulnerabilities                                                                             |

`nginx/default.conf` serves the prerendered pages and mirrors the routing rules of `scripts/serve-dist.mjs`:

| Request                               | Response                                                                             |
|---------------------------------------|--------------------------------------------------------------------------------------|
| `/`                                   | `302` to `/es` when `Accept-Language` starts with `es`, otherwise `/en` (query kept) |
| `/en`, `/es/backend`, …               | `200` from `<path>/index.html`, `Cache-Control: no-cache`                            |
| `/path/`                              | `301` to `/path` (query kept)                                                        |
| unknown path                          | `404` with the bilingual `404.html`                                                  |
| any method other than `GET` or `HEAD` | `405`; request bodies are capped at 1 KB and slow clients time out after 10 s        |
| `/assets/*`                           | `Cache-Control: public, max-age=31536000, immutable`                                 |
| images, PDFs                          | `Cache-Control: public, max-age=604800`                                              |
| `robots.txt`, `sitemap.xml`           | `Cache-Control: public, max-age=3600`                                                |

Pre-compressed `.br` and `.gz` files are served with `brotli_static` and `gzip_static`, also to a reverse proxy
that asks over HTTP/1.0 (`gzip_http_version 1.0`, `gzip_proxied any`): Brotli to the browsers that accept it, about
a quarter smaller than gzip on the pages, and gzip to the rest. `brotli_static` comes from ngx_brotli's static
module, which the Dockerfile builds against the source of the image's own nginx (signed by an nginx developer's
key) and loads in `nginx.conf`; the host needs nothing for it. Every response carries the headers in
`nginx/security-headers.conf` (CSP, HSTS, `nosniff`, `SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy`, COOP).

> The CSP runs no inline script it does not name by its SHA-256 hash, and no `eval`. The pages carry three inline
> scripts (the role lock in `index.html`, the hydration loader from `scripts/prerender.ts`, which reads the entry's
> hashed name from its `data-entry` attribute so its own text never changes, and the root's language redirect); the
> build tests fail with the hash to add if one of them changes, even by a reformat. Solid's `HydrationScript` is not
> rendered: the client entry (`src/main.tsx`) sets the empty hydration state it would leave, so hydrating adds no
> inline script to allow. The GTM container holds only the
> Google tag. A Custom HTML tag or a Custom JavaScript variable added to it would need `'unsafe-inline'` or
> `'unsafe-eval'` back, so check its browser console after publishing a container version.

## Server setup (once)

1. Install Docker Engine with the Compose plugin.
2. Create a deploy user that can run Docker (member of the `docker` group, or with passwordless `sudo`) and add
   the public half of the deploy key to its `~/.ssh/authorized_keys`.
3. Point the host reverse proxy to the container. The previous image listened on port 80; this one is published on
   `127.0.0.1` at `PORTFOLIO_PORT` from the server's `.env` (8080 unless it says otherwise, so check it first):

   ```nginx
   upstream portfolio {
       server 127.0.0.1:8080;
       keepalive 16;
       # Under the container's keepalive_timeout (15s), so nginx never reuses a connection the container closed.
       keepalive_timeout 10s;
   }

   server {
       # The site asks nothing more of the host: compression and security headers come from the container. HTTP/2
       # stays the host's call, since before nginx 1.25.1 it switches every site on the address and port at once.
       listen 443 ssl;
       server_name sebastianlopezo.page;
       server_tokens off;

       ssl_certificate     /etc/letsencrypt/live/sebastianlopezo.page/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/sebastianlopezo.page/privkey.pem;

       location / {
           proxy_pass http://portfolio;
           # nginx proxies with HTTP/1.0 and closes the connection after each request unless told otherwise.
           proxy_http_version 1.1;
           proxy_set_header Connection "";
           proxy_set_header Host $host;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

   Then check and reload it with `sudo nginx -t && sudo systemctl reload nginx`. `server_tokens off` keeps the
   nginx version out of the `Server` header and the error pages.

4. Add the repository secrets below. Without the required ones the deploy job is skipped with a notice.

| Secret                                                  | Required                     | Purpose                                                                                                 |
|---------------------------------------------------------|------------------------------|---------------------------------------------------------------------------------------------------------|
| `SERVER_HOST`                                           | yes                          | Server address                                                                                          |
| `SERVER_PORT`                                           | yes                          | SSH port                                                                                                |
| `SERVER_USER`                                           | yes                          | Deploy user                                                                                             |
| `SERVER_KEY`                                            | yes                          | Private SSH key of the deploy user                                                                      |
| `DEPLOY_PATH`                                           | yes                          | Folder that holds `compose.yaml` and `.env`, e.g. `/opt/myportfolio`                                    |
| `SERVER_KNOWN_HOSTS`                                    | recommended                  | Output of `ssh-keyscan -p <port> <host>`; without it the key is trusted on first use                    |
| `GHCR_READ_TOKEN`                                       | while the package is private | Token with `read:packages`, used for `docker login ghcr.io` during the deploy and logged out afterwards |
| `GHCR_USER`                                             | no                           | Owner of that token (defaults to the repository owner)                                                  |
| `ENV_FILE`                                              | no                           | Extra lines for `.env`, e.g. `PORTFOLIO_PORT=8080` (see `.env.example`)                                 |
| `DOCKER_USERNAME`, `DOCKER_PASSWORD`, `DOCKER_APP_NAME` | no                           | Also publish the image to Docker Hub                                                                    |

The optional repository variable `SITE_URL` changes the URL checked after each deploy (default
`https://sebastianlopezo.page`).

## How a deploy runs

1. `compose.yaml` and a temporary `.env` with `PORTFOLIO_TAG=sha-<commit>` are copied to a private staging folder.
2. A lock file prevents overlapping deploys.
3. `docker compose pull` and `docker compose up -d --remove-orphans --wait` replace the container once the new one
   is healthy; old images are pruned.
4. The staging folder and the registry login are removed, and the workflow checks that `/en` answers with `200`.

The container runs as uid 101 with a read-only root filesystem, `no-new-privileges`, all capabilities dropped, a
16 MB `tmpfs` for `/tmp` mounted `noexec,nosuid,nodev`, 0.5 CPU, 128 MB of memory and 64 processes. It listens only on
`127.0.0.1`; the host's reverse proxy terminates TLS, and the site sends HSTS with `preload`.

To check that an image was built and signed by this repository's workflow:

```bash
cosign verify ghcr.io/sebastianlopezo/myportfolio:latest \
  --certificate-identity-regexp '^https://github.com/SebastianLopezO/MyPortfolio/' \
  --certificate-oidc-issuer https://token.actions.githubusercontent.com
```

## Production checks

**Production Checks** (`.github/workflows/production.yml`) runs after every deploy, every Monday and on demand, against
`SITE_URL`:

| Job                | What it verifies                                                                                                                                                                                                                                    |
|--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Routes and Headers | The 12 pages answer `200`, `/health`, the language redirect with its query, the trailing-slash `301`, the `404`, sitemap, robots, the resume PDF, the security headers, gzip and Brotli on the HTML, and compression on the first script            |
| Browser Tests      | The whole Playwright suite with `BASE_URL` set to production: hydration without console errors, role switching and lock, the assistant, and the layout checks (no horizontal overflow, complete ASCII art and loaded photo at 360, 768 and 1440 px) |
| Lighthouse         | Mobile Lighthouse (median of three runs) on the 12 pages and a locked link. Accessibility, best practices and SEO must be 100; performance warns below 95. The scores are written to the job summary                                                |

## Rollback

Run **Deploy to Production** manually and set `tag` to a previous `sha-xxxxxxx` tag (or a version). Leaving it empty
deploys `latest`.

## Running it locally

```bash
docker build -t myportfolio .
docker run --rm --read-only --user 101:101 --tmpfs /tmp:uid=101,gid=101,mode=0700,size=16m,noexec,nosuid,nodev \
  --cap-drop ALL --security-opt no-new-privileges:true -p 127.0.0.1:8080:8080 myportfolio
```

Or pull the published image with the same compose file used in production:

```bash
cp .env.example .env
docker compose up -d --wait
```
