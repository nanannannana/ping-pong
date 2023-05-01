FROM node:16-alpine
WORKDIR /var/app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3001
CMD node dist/main.js
