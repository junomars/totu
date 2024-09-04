FROM node
LABEL authors="juno"

WORKDIR /app

COPY totuClient/package.json package.json
COPY totuClient/package-lock.json package-lock.json

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]