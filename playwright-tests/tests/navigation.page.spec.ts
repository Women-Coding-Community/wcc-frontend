import { navTests } from '@utils/datafactory/nav.tests';
import { test } from '@utils/fixtures';
import { aboutUsMenuItems } from '@utils/datafactory/nav.tests';
import { expect } from '@playwright/test';

test('should display complete navigation menu', async ({ page, homePage }) => {
  await page.goto('/');
  await expect(homePage.homeLink).toBeVisible();
  await expect(homePage.mentorshipDropdown).toBeVisible();
  await expect(homePage.programmesDropdown).toBeVisible();
  await expect(homePage.eventsLink).toBeVisible();
  await expect(homePage.blogLink).toBeVisible();
  await expect(homePage.jobsLink).toBeVisible();
  await expect(homePage.aboutUsDropdown).toBeVisible();
});

navTests.forEach(
  ({
    id,
    linkName: linkName,
    pathToStart,
    linkLocator: linkLocator,
    expectedURL,
    expectedText,
  }) => {
    test(`${id}: Test "${linkName}" Link Menu Tabs Navigation`, async ({
      homePage,
      basePage,
    }) => {
      await basePage.navigateToPath(pathToStart);
      await basePage.clickElement(linkLocator(homePage));
      await basePage.verifyURL(expectedURL);
      if (expectedText) {
        await basePage.verifyPageContainsText(expectedText);
      }
    });
  },
);

test('NAV-005: Validate Find a mentor Button', async ({
  basePage,
  homePage,
}) => {
  await basePage.navigateToPath('/');
  await basePage.clickElement(homePage.findMentorButton);
  await basePage.verifyURL('/mentorship/mentors');
});

test('NAV-012: Click and navigate through About Us dropdown items', async ({
  basePage,
}) => {
  for (const { name, expectedURL, expectedText } of aboutUsMenuItems) {
    await basePage.navigateToPath('/');
    await basePage.clickElement(basePage.aboutUsDropdown);
    await basePage.clickElement(basePage.menuitem(name));
    await basePage.verifyURL(expectedURL);
    await basePage.verifyPageContainsText(expectedText);
  }
});
