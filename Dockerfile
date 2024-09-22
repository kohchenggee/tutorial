FROM node:20-alpine 

WORKDIR /app

COPY package*.json ./

RUN npm add --global nx@latest
RUN npm install

COPY . .
