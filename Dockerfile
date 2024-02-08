# FROM node:20-alpine as angular

# WORKDIR /usr/app
# COPY ./ /usr/app

# RUN npm install
# RUN npm run build

# FROM httpd:alpine3.17

# WORKDIR /usr/local/apache2/htdocs
# COPY --from=angular /dist/fanaticups-front .
# CMD [ "npm","start" ]

FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

FROM nginx:alpine
COPY --from=node /app/dist/fanaticups-front /usr/share/nginx/html
# Copiar la configuración personalizada de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80 para que nginx pueda servir la aplicación
EXPOSE 80