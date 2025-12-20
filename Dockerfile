FROM mcr.microsoft.com/playwright:v1.57.0-noble

RUN mkdir /app
WORKDIR /app
COPY . /app

ENV CI=true

RUN npm install -g pnpm \
    pnpm install \
    npx playwright install chromium
