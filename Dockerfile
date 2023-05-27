# Dockerfile
FROM node:16

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

WORKDIR /app/public
RUN npm install

EXPOSE 3000

CMD ["node", "../src/app.js"]