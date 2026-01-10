FROM mcr.microsoft.com/playwright:v1.57.0-noble

WORKDIR /app

ENV CI=true

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY src ./src
COPY public ./public
COPY playwright-tests ./playwright-tests
COPY next.config.mjs tsconfig.json jest.config.ts jest.setup.js ./
