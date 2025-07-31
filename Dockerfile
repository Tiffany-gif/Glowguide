# Use nginx as base image for serving static files
FROM nginx:alpine

# Copy the application files to nginx html directory
COPY glowguide.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/
COPY config.js /usr/share/nginx/html/

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8080
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]