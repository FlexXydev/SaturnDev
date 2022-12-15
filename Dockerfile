FROM node

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 8888

CMD ["node", "."]