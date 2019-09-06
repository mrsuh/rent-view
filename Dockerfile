FROM node:10.16

COPY . /app
RUN sh /app/bin/build.sh

EXPOSE 9080

CMD ["node", "/app/src/app.js"]
