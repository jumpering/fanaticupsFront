FROM node:20-alpine as angular

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install
RUN npm run build

FROM httpd:alpine3.17

WORKDIR /usr/local/apache2/htdocs
COPY --from=angular /dist/fanaticups-front .
CMD [ "npm","start" ]