import { navTests, aboutUsMenuItems } from '@utils/datafactory/nav.tests';
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

test.describe('Footer Validation', () => {
test('NAV-013 Validate footer logo and static text', async ({
basePage,
  }) => {
    await basePage.navigateToPath('/');
    await expect(basePage.footerLogo).toBeVisible();
    await expect(basePage.footerNonProfitText).toBeVisible();
    await expect(basePage.footerCopyrightText).toBeVisible();
    await expect(basePage.footerFollowUsTitle).toBeVisible();
    await expect(basePage.footerFollowUsDescription).toBeVisible();
    await expect(basePage.footerTechnicalIssuesText).toBeVisible();
  });

  const footerSocialLinks = [
    {
      id: 'NAV-014',
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/womencodingcommunity',
      opensInNewTab: false,
    },
    {
      id: 'NAV-015',
      name: 'Twitter', 
      url: 'https://x.com/WCC_Community',
      opensInNewTab: false,
    },
    {
      id: 'NAV-016',
      name: 'GitHub',
      url: 'https://github.com/WomenCodingCommunity',
      opensInNewTab: false,
    },
    {
      id: 'NAV-017',
      name: 'Instagram',
      url: 'https://www.instagram.com/women_coding_community/',
      opensInNewTab: false,
    },
    { 
      id: 'NAV-018',
      name: 'Slack',
      url: 'https://womencodingcommunity.slack.com/signup#/domain-signup',
      opensInNewTab: false,
    },
    {
      id: 'NAV-019',
      name: 'Email',
      url: 'mailto:london@womencodingcommunity.com',
      opensInNewTab: false,
    },
    {
      id: 'NAV-020',
      name: 'Send us a report',
      url: 'https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2FWomen-Coding-Community%2FWomenCodingCommunity.github.io%2Fissues%2Fnew%3Ftemplate%3Dbug_report.md%26title%3Dbug%2520title',
      opensInNewTab: true,
    }
  ];

  for (const { id, name, url, opensInNewTab } of footerSocialLinks) {
    test(`${id}: Validate footer ${name} link`, async ({
      basePage, 
    }) => {
      await basePage.navigateToPath('/');
      await basePage.verifySocialLinkNavigation(name, url, opensInNewTab);
    });
  }
});