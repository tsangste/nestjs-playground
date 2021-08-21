FROM node:14.17.5-alpine

ENV APPDIR /usr/app

RUN mkdir -p ${APPDIR}

WORKDIR ${APPDIR}

COPY package.json .
COPY package-lock.json .

RUN npm ci

CMD ["npm", "run", "start:debug"]
