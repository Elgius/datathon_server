FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .


ARG KEY

ENV KEY=$KEY

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]