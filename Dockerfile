FROM node:22.13.0-alpine

WORKDIR /app

COPY package* ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
