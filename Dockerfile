FROM node:12.16.2 as builder

WORKDIR /app
COPY /package.json /package-lock.json  /app/
RUN npm install @angular/cli@latest -g
RUN cd /app && npm install --silent
COPY .  /app

RUN cd /app && npm run build

FROM nginx:1.16.1
RUN rm -rf /etc/nginx/conf.d
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/storage /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
