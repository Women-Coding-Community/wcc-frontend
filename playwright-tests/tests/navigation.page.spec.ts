import {
  navTests,
  aboutUsMenuItems,
  footerSocialLinks,
} from '@utils/datafactory/nav.tests';
import { test } from '@utils/fixtures';
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

test('@NAV-005: Validate Find a mentor Button', async ({
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

test.describe('Footer Validation', () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigateToPath('/');
  });

  test('NAV-013 Validate footer logo and static text', async ({ basePage }) => {
    await expect(basePage.footerLogo).toBeVisible();
    await expect(basePage.footerNonProfitText).toBeVisible();
    await expect(basePage.footerCopyrightText).toBeVisible();
    await expect(basePage.footerFollowUsTitle).toBeVisible();
    await expect(basePage.footerFollowUsDescription).toBeVisible();
    await expect(basePage.footerTechnicalIssuesText).toBeVisible();
  });

  for (const { id, name, url, opensInNewTab = false } of footerSocialLinks) {
    test(`@${id}: Validate footer ${name} link`, async ({ basePage }) => {
      await basePage.verifySocialLinkNavigation(name, url, opensInNewTab);
    });
  }
});
