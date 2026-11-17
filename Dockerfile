# syntax=docker/dockerfile:1
# Three stages: dependencies, build and runtime. Only the prerendered site and the nginx configuration reach the
# final image; Node, pnpm, the sources and node_modules stay behind. Base images are pinned by digest so a rebuild
# uses the same bytes; Dependabot moves the digests.

FROM node:24-alpine@sha256:06d7adf3e0ef61a13f1d28682726366f97a15aa1888c934d3ecec86c33918b53 AS deps

ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0 \
    CI=true \
    PNPM_HOME=/home/node/.local/share/pnpm

RUN corepack enable

# Dependencies install and the build run as the image's unprivileged node user, so a package script cannot
# write outside /app or the pnpm store.
USER node
WORKDIR /app

COPY --chown=node:node package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/home/node/.local/share/pnpm/store,uid=1000,gid=1000 \
    pnpm install --frozen-lockfile

FROM deps AS build

COPY --chown=node:node . .

ARG SITE_URL=https://sebastianlopezo.page
# The build precompresses every text asset (.gz next to the file) for nginx's gzip_static.
RUN SITE_URL=$SITE_URL pnpm build

# nginx serves the .br files the build writes next to each text file once it has ngx_brotli's static module. The module
# is built here against the source of the very nginx the runtime runs: this stage starts from the same image, so the
# versions match even when Dependabot moves it, and with nginx's own configure arguments, which a module must share to
# load. Only the static module is built; it serves files and needs no Brotli library. The nginx source must carry a
# signature from one of the nginx developers' keys (nginx.org/en/pgp_keys.html), and git checks ngx_brotli against its
# commit hash.
FROM nginxinc/nginx-unprivileged:1.31.7-alpine-slim@sha256:a8cb0f33d51fa107c96fd2bd3a71aaf564ec131e9d2bdf8700944f0ed8b170d7 AS brotli

USER root
ARG NGX_BROTLI_COMMIT=a71f9312c2deb28875acc7bacfdd5695a111aa53
ARG NGINX_SIGNERS="43387825DDB1BB97EC36BA5D007C8D7C15D87369 D6786CE303D9A9022998DC6CC8464D549AF75C0A 13C82A63B603576156E30A4EA0EA981B66B0D967 7338973069ED3F443F4D37DFA64FD5B17ADB39A8"
WORKDIR /build
RUN apk add --no-cache curl gcc git gnupg libc-dev linux-headers make openssl-dev pcre2-dev zlib-dev \
    && version="$(nginx -v 2>&1 | sed 's#^.*/##')" \
    && curl -fsSLO "https://nginx.org/download/nginx-$version.tar.gz" \
    && curl -fsSLO "https://nginx.org/download/nginx-$version.tar.gz.asc" \
    && for key in arut pluknet thresh sb; do curl -fsSL "https://nginx.org/keys/$key.key" | gpg --batch --quiet --import; done \
    && signer="$(gpg --batch --status-fd 1 --verify "nginx-$version.tar.gz.asc" "nginx-$version.tar.gz" 2>/dev/null | awk '$2 == "VALIDSIG" {print $NF}')" \
    && case " $NGINX_SIGNERS " in *" ${signer:-none} "*) ;; *) echo "nginx-$version is not signed by a known nginx key" >&2; exit 1 ;; esac \
    && git init -q ngx_brotli \
    && git -C ngx_brotli fetch -q --depth 1 https://github.com/google/ngx_brotli.git "$NGX_BROTLI_COMMIT" \
    && git -C ngx_brotli checkout -q FETCH_HEAD \
    && tar xzf "nginx-$version.tar.gz" \
    && cd "nginx-$version" \
    && eval "./configure $(nginx -V 2>&1 | sed -n 's/^configure arguments: //p') --add-dynamic-module=../ngx_brotli/static" \
    && make -j"$(nproc)" modules \
    && cp objs/ngx_http_brotli_static_module.so /build/

FROM nginxinc/nginx-unprivileged:1.31.7-alpine-slim@sha256:a8cb0f33d51fa107c96fd2bd3a71aaf564ec131e9d2bdf8700944f0ed8b170d7 AS runtime

LABEL org.opencontainers.image.title="MyPortfolio" \
      org.opencontainers.image.description="Bilingual prerendered portfolio of Sebastián López Osorno served by unprivileged nginx" \
      org.opencontainers.image.source="https://github.com/SebastianLopezO/MyPortfolio" \
      org.opencontainers.image.url="https://sebastianlopezo.page"

# Alpine publishes security fixes faster than the base image is rebuilt (pcre2, which nginx's regex locations use,
# was one of them), and CI fails on fixable HIGH or CRITICAL findings, so the runtime takes them at build time.
USER root
RUN apk upgrade --no-cache

COPY --chown=0:0 --from=brotli /build/ngx_http_brotli_static_module.so /usr/lib/nginx/modules/
RUN sed -i '1i load_module modules/ngx_http_brotli_static_module.so;' /etc/nginx/nginx.conf

# Files are owned by root and only readable by the nginx user (uid 101), so the server cannot change what it serves.
COPY --chown=0:0 nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --chown=0:0 nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --chown=0:0 --from=build /app/dist /usr/share/nginx/html

USER 101:101
EXPOSE 8080
STOPSIGNAL SIGQUIT

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
    CMD wget -q -O /dev/null http://127.0.0.1:8080/health || exit 1
