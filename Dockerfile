FROM mcr.microsoft.com/playwright:v1.57.0-noble

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm install -g pnpm
ENV CI=true

RUN pnpm install

RUN npx playwright install chromium
