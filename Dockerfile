FROM node:16
WORKDIR /home/server
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start"]