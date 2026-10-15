FROM node:24-alpine
WORKDIR /app
COPY server/server.mjs /app/server.mjs
ENV PORT=3000 BIBLIO_DATA_DIR=/data
VOLUME ["/data"]
EXPOSE 3000
CMD ["node", "server.mjs"]
