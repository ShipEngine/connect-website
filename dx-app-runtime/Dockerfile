FROM node:12-alpine as build

WORKDIR /code

COPY .npmrc tsconfig.json package.json package-lock.json /code/
RUN npm ci

COPY src /code/src
RUN npm run build

FROM node:12-alpine as run
WORKDIR /code
COPY package.json package-lock.json .npmrc ./
RUN npm install --production
COPY --from=build ./code/dist ./dist

CMD ["npm", "start"]
