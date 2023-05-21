# Use an official Node.js image as the base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json yarn.lock /app/

# Install project dependencies
RUN yarn install

# Copy the rest of the application code to the container
COPY . /app

# Build the project
RUN yarn build

# Set the command to run the application
CMD [ "yarn", "start" ]
