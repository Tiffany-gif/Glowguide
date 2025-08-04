FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY glowguide.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY config.js /usr/share/nginx/html/

COPY nginx.conf /etc/nginx/nginx.conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"] 