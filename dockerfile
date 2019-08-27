FROM node:10.16.0-alpine

RUN mkdir -p /app/rod-tile-api
WORKDIR /app/rod-tile-api

ARG PORT
ARG MONGODB_URL

ENV PORT=$PORT
ENV MONGODB_URL=$MONGODB_URL


COPY package.json /app/rod-tile-api
COPY package-lock.json /app/rod-tile-api

RUN npm install

COPY . /app/rod-tile-api
CMD ["npm","run","start"]