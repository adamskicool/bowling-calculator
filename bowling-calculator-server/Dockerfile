FROM node:10
WORKDIR /app

COPY package.json /app
RUN npm install
COPY . /app

CMD node dist/app.js

EXPOSE 5000