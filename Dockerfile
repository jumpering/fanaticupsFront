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
# Copiar certificados desde host
RUN mkdir -p /etc/nginx/ssl
COPY cert/_.fanaticups.org_private_key.key /etc/nginx/ssl
COPY cert/bundle.crt /etc/nginx/ssl

#Copiar la configuración personalizada de nginx 
COPY default.conf /etc/nginx/nginx.conf

# Exponer el puerto 80 para que nginx pueda servir la aplicación
EXPOSE 80
EXPOSE 443