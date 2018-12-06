FROM node:10.12.0-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
COPY package.json /app

# If you are building your code for production
# RUN npm install --only=production
RUN npm install

# Bundle app source
COPY . /app

CMD [ "npm", "start" ]

EXPOSE 3000