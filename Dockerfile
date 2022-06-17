FROM node:15
WORKDIR /home/server
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "node", "build/server.js" ]