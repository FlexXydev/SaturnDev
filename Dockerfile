FROM node

WORKDIR /app

COPY . .

VOLUME ["/app/logs"]

RUN npm install

EXPOSE 8080

CMD ["node", "."]