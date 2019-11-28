# Pull base image.
FROM node:10.15
RUN npm cache clean --force
WORKDIR /usr/src
COPY . .
RUN npm install
RUN npm run build
EXPOSE 5000
CMD npm run deploy