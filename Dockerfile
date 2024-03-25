FROM node:20-alpine

WORKDIR /app

COPY ./ .

RUN npm ci

CMD ["npm", "run", "dockerfile:start"]