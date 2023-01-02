FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --only=production

COPY ./ ./ 

EXPOSE 5000
CMD [ "node", "bin/www.js" ]
