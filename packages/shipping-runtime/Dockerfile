FROM node:14-alpine as build

WORKDIR /code
COPY package.json tsconfig.docker.json ./
COPY src ./src
RUN yarn --non-interactive

RUN ./node_modules/.bin/tsc --project tsconfig.docker.json

FROM node:14-alpine as run

RUN set -ex; \
    apk update; \
    apk add --no-cache bash ca-certificates tini;

ARG GIT_SHA
ENV GIT_SHA ${GIT_SHA:-unknown}

ARG GIT_BRANCH
ENV GIT_BRANCH ${GIT_BRANCH:-unknown}

WORKDIR /code

COPY --from=build /code/package.json ./package.json
COPY --from=build /code/lib ./lib
COPY --from=build /code/node_modules ./node_modules

ENTRYPOINT ["/sbin/tini", "--", "/usr/local/bin/node"]

CMD ["/code/lib/server.js"]
