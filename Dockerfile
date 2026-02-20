FROM mcr.microsoft.com/playwright:v1.57.0-noble AS base

WORKDIR /app
ENV CI=true
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY src ./src
COPY public ./public
COPY next.config.mjs tsconfig.json jest.config.ts jest.setup.js playwright.config.ts ./

# ---- Next.js app stage ----
FROM base AS nextjs
RUN pnpm next build
EXPOSE 3000
CMD ["pnpm", "next", "start"]

# ---- Playwright stage ----
FROM base AS playwright
COPY playwright-tests ./playwright-tests
USER pwuser