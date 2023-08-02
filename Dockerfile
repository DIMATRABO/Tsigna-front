# Build Stage
FROM node:14 AS build

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

# Serve Stage
FROM node:14 AS serve

# Install serve
RUN yarn global add serve

# Copy build directory from build stage
COPY --from=build /app/build /app

WORKDIR /app

EXPOSE 5000

CMD ["serve", "-p", "5000", "-s", "."]
