FROM node:16-alpine

# Replicate the configuration present in package.json
ENV PORT="80"

WORKDIR /usr/app

COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

RUN npm install

CMD node app.js
