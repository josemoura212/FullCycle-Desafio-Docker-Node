FROM node:15

WORKDIR /usr/src/app

RUN npm install express --save
RUN npm install mysql --save

COPY ./index.js .

EXPOSE 3000

CMD ["node", "index.js"]

