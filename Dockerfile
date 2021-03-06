FROM node:8.2.1-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package-lock.json ./
RUN npm install

# Bundle app source
COPY . .

RUN mkdir ./rsvp

EXPOSE 8080
CMD [ "npm", "start" ]
