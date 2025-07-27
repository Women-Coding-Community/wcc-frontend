import { expect } from '@playwright/test';

import { test } from '@utils/fixtures';

test('should display complete navigation menu', async ({
  page,
  landingPage,
}) => {
  await page.goto('/');
  await expect(landingPage.homeLink).toBeVisible();
  await expect(landingPage.mentorshipDropdown).toBeVisible();
  await expect(landingPage.programmesDropdown).toBeVisible();
  await expect(landingPage.eventsLink).toBeVisible();
  await expect(landingPage.blogLink).toBeVisible();
  await expect(landingPage.jobsLink).toBeVisible();
  await expect(landingPage.aboutUsDropdown).toBeVisible();
});

test('Join Slack button navigates to Slack invite in the new page', async ({
  page,
  landingPage,
}) => {
  await page.goto('/');
  const newPagePromise = page.waitForEvent('popup');
  await landingPage.joinSlackButton.click();
  const newPage = await newPagePromise;

  await newPage.waitForLoadState();
  expect(newPage.url()).toContain('slack.com');
  await expect(newPage).toHaveTitle(/Slack/i);
});
