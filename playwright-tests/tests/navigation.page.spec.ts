import { expect } from '@playwright/test';

import {
  navTests,
  aboutUsMenuItems,
  mentorshipMenuItems,
  programmeMenuItems,
  footerSocialLinks,
} from '@utils/datafactory/nav.tests';
import { test } from '@utils/fixtures';

test.describe('Validate Navigation', () => {
  test('Validate all navigation menu items are visible', async ({
    basePage,
    page,
  }) => {
    await page.goto('/');
    await expect(basePage.homeLink).toBeVisible();
    await expect(basePage.mentorshipDropdown).toBeVisible();
    await expect(basePage.programmesDropdown).toBeVisible();
    await expect(basePage.eventsLink).toBeVisible();
    await expect(basePage.blogLink).toBeVisible();
    await expect(basePage.jobsLink).toBeVisible();
    await expect(basePage.aboutUsDropdown).toBeVisible();
  });

  navTests.forEach(
    ({ id, linkName, pathToStart, linkLocator, expectedURL, expectedText }) => {
      test(`${id}: Test "${linkName}" link navigation`, async ({
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

  test('NAV-005: Validate Find a Mentor button navigation', async ({
    basePage,
  }) => {
    await basePage.navigateToPath('/');
    await basePage.clickElement(basePage.findMentorButton);
    await basePage.verifyURL('/mentorship/mentors');
  });

  test('NAV-006: Validate logo click navigation', async ({
    basePage,
    homePage,
  }) => {
    await basePage.navigateToPath('/mentorship');
    await basePage.clickElement(basePage.logo);
    await expect(homePage.homeLink).toBeVisible();
  });

  test('NAV-007: Click and navigate through Mentorship dropdown items', async ({
    basePage,
  }) => {
    for (const { name, expectedURL } of mentorshipMenuItems) {
      await test.step(`Navigate to Mentorship > ${name}`, async () => {
        await basePage.navigateToPath('/');
        await basePage.clickElement(basePage.mentorshipDropdown);
        await basePage.clickElement(basePage.menuitem(name));
        await basePage.verifyURL(expectedURL);
      });
    }
  });

  test('NAV-009: Click and navigate through Programmes dropdown items', async ({
    basePage,
  }) => {
    for (const { name, expectedURL, expectedText } of programmeMenuItems) {
      await test.step(`Navigate to Programmes > ${name}`, async () => {
        await basePage.navigateToPath('/');
        await basePage.clickElement(basePage.programmesDropdown);
        await basePage.clickElement(basePage.menuitem(name));
        await basePage.verifyURL(expectedURL);
        await basePage.verifyPageContainsText(expectedText);
      });
    }
  });

  test('NAV-012: Click and navigate through About Us dropdown items', async ({
    basePage,
  }) => {
    for (const { name, expectedURL, expectedText } of aboutUsMenuItems) {
      await test.step(`Navigate to About Us > ${name}`, async () => {
        await basePage.navigateToPath('/');
        await basePage.clickElement(basePage.aboutUsDropdown);
        await basePage.clickElement(basePage.menuitem(name));
        await basePage.verifyURL(expectedURL);
        await basePage.verifyPageContainsText(expectedText);
      });
    }
  });

  test.describe('Footer Validation', () => {
    test.beforeEach(async ({ basePage }) => {
      await basePage.navigateToPath('/');
    });

    test('NAV-013: Validate footer logo and static text', async ({
      basePage,
    }) => {
      await expect(basePage.footerLogo).toBeVisible();
      await expect(basePage.footerNonProfitText).toBeVisible();
      await expect(basePage.footerCopyrightText).toBeVisible();
      await expect(basePage.footerFollowUsTitle).toBeVisible();
      await expect(basePage.footerFollowUsDescription).toBeVisible();
      await expect(basePage.footerTechnicalIssuesText).toBeVisible();
    });

    for (const { id, name, url } of footerSocialLinks) {
      test(`${id}: Validate footer ${name} link`, async ({ basePage }) => {
        await basePage.verifySocialLinkNavigation(name, url);
      });
    }
  });

  test.describe('NAV-020: Visual Test - Navigation Desktop', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test('VT-001-A: Navigation bar', { tag: '@visual' }, async ({ page }) => {
      await expect(page.getByRole('banner')).toHaveScreenshot(
        'nav-desktop.png',
      );
    });

    test(
      'VT-001-B: Mentorship dropdown expanded',
      { tag: '@visual' },
      async ({ page }) => {
        await page.getByRole('button', { name: 'Mentorship' }).click();
        await page.getByRole('menu').waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot(
          'nav-desktop-mentorship-dropdown.png',
        );
      },
    );

    test(
      'VT-001-C: Programmes dropdown expanded',
      { tag: '@visual' },
      async ({ page }) => {
        await page.getByRole('button', { name: 'Programmes' }).click();
        await page.getByRole('menu').waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot(
          'nav-desktop-programmes-dropdown.png',
        );
      },
    );

    test(
      'VT-001-D: About Us dropdown expanded',
      { tag: '@visual' },
      async ({ page }) => {
        await page.getByRole('button', { name: 'About Us' }).click();
        await page.getByRole('menu').waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot('nav-desktop-aboutus-dropdown.png');
      },
    );
  });

  test.describe('NAV-021: Visual Test - Navigation Mobile', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test.beforeEach(async ({ page }) => {
      await page.goto('/');
    });

    test(
      'VT-002-A: Mobile menu closed',
      { tag: '@visual' },
      async ({ page }) => {
        await expect(page.getByRole('banner')).toHaveScreenshot(
          'nav-mobile-closed.png',
        );
      },
    );

    test(
      'VT-002-B: Mobile drawer opened',
      { tag: '@visual' },
      async ({ page }) => {
        await page.getByRole('button', { name: 'menu' }).click();
        await page
          .getByRole('button', { name: 'Home' })
          .waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot('nav-mobile-drawer.png');
      },
    );

    test(
      'VT-002-C: Mobile submenu expanded',
      { tag: '@visual' },
      async ({ page }) => {
        await page.getByRole('button', { name: 'menu' }).click();
        await page
          .getByRole('button', { name: 'Home' })
          .waitFor({ state: 'visible' });
        await page.getByRole('button', { name: 'Mentorship' }).click();
        await page
          .getByRole('button', { name: 'Overview' })
          .waitFor({ state: 'visible' });
        await expect(page).toHaveScreenshot('nav-mobile-submenu.png');
      },
    );
  });
});
