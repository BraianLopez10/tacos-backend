FROM node:12.18.3-alpine3.10

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY ./package.json ./

COPY ./package-lock.json ./

RUN npm install

COPY . .

CMD ["npm", "start" ]
