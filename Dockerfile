FROM mcr.microsoft.com/playwright:v1.57.0-noble

RUN mkdir /app
WORKDIR /app
COPY . /app

RUN npm install -g pnpm

RUN npx playwright install chromium
