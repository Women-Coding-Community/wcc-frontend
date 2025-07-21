import { expect } from '@playwright/test';

import { navTests } from '@utils/datafactory/nav.tests';
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

test.describe('Navigation Links', () => {
  navTests.forEach(
    ({
      id,
      linkName: linkName,
      pathToStart,
      linkLocator: linkLocator,
      expectedURL,
      expectedText,
    }) => {
      test(`${id}: Test "${linkName}" Link Navigation`, async ({
        page,
        landingPage,
      }) => {
        await test.step(`Navigate to starting path: ${pathToStart}`, async () => {
          await page.goto(pathToStart);
        });

        await test.step(`Click the "${linkName}" link`, async () => {
          await linkLocator(landingPage).click();
        });

        await test.step(`Verify URL is "${expectedURL}"`, async () => {
          await expect(page).toHaveURL(expectedURL);
        });

        if (expectedText) {
          await test.step(`Verify page contains text "${expectedText}"`, async () => {
            await expect(
              page.getByText(expectedText, { exact: true }),
            ).toBeVisible();
          });
        }
      });
    },
  );
});
