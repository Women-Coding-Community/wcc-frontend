#!/bin/bash

UPDATE_SNAPSHOTS=false

if [ "$1" == "update" ]; then
  UPDATE_SNAPSHOTS=true
fi

if [ "$UPDATE_SNAPSHOTS" == true ]; then
  echo "Running Playwright tests with snapshot update..."
  docker run --rm \
    -v $(pwd)/playwright-tests/screenshots:/app/playwright-tests/screenshots \
    -v $(pwd)/playwright-report:/app/playwright-report \
    wcc-playwright pnpm playwright test --update-snapshots
else
  echo "Running Playwright tests without snapshot update..."
  docker run --rm \
    -v $(pwd)/playwright-tests/screenshots:/app/playwright-tests/screenshots \
    -v $(pwd)/playwright-report:/app/playwright-report \
    wcc-playwright pnpm playwright test
fi