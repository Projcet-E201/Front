# Builder
FROM node:18.16.0 as builder

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# Runner
FROM nginx:stable-alpine as runner

# Copy nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built files
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
