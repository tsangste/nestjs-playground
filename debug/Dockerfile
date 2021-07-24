FROM node:14.17.0-slim

ENV APPDIR /usr/app

RUN mkdir -p ${APPDIR}

WORKDIR ${APPDIR}

COPY package.json .
COPY package-lock.json .

RUN npm install

CMD ["npm", "run", "start:debug"]
