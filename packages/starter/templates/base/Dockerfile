# This file is moved to the root directory before building the image

# base node image
FROM node:22-bookworm-slim AS base

# set ARGS
ARG NPM_TOKEN

# set for base and all layer that inherit from it
ENV NODE_ENV production

# Install openssl for Prisma
RUN apt-get update && apt-get install -y ca-certificates fuse3 openssl && apt-get clean

# Install all node_modules, including dev dependencies
FROM base AS deps

WORKDIR /myapp

COPY package.json package-lock.json .npmrc ./
RUN echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" > .npmrc
RUN npm install --include=dev --force

# Setup production node_modules
FROM base AS production-deps

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules
COPY package.json package-lock.json .npmrc ./
# RUN npm prune --omit=dev

# Build the app
FROM base AS build

WORKDIR /myapp

COPY --from=deps /myapp/node_modules /myapp/node_modules

COPY prisma .
RUN npx prisma generate

COPY . .
RUN npm run build

# Finally, build the production image with minimal footprint
FROM base

WORKDIR /myapp

COPY --from=production-deps /myapp/node_modules /myapp/node_modules
COPY --from=build /myapp/generated /myapp/generated

COPY --from=build /myapp/server-build /myapp/server-build
COPY --from=build /myapp/build /myapp/build
COPY --from=build /myapp/public /myapp/public
COPY --from=build /myapp/package.json /myapp/package.json
COPY --from=build /myapp/prisma /myapp/prisma

COPY . .

CMD ["npm", "start"]
