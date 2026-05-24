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
  test.skip('NAV-001: Primary Navigation Links', async ({
    homePage,
    basePage,
  }) => {
    for (const {
      linkName,
      pathToStart,
      linkLocator,
      expectedURL,
      expectedText,
    } of navTests) {
      await test.step(`Navigate to "${linkName}"`, async () => {
        await basePage.navigateToPath(pathToStart);
        await basePage.clickElement(linkLocator(homePage));
        await basePage.verifyURL(expectedURL);
        if (expectedText) {
          await basePage.verifyPageContainsText(expectedText);
        }
      });
    }
  });

  test('NAV-003: Validate logo click navigation', async ({
    basePage,
    homePage,
  }) => {
    await basePage.navigateToPath('/mentorship');
    await basePage.clickElement(basePage.logo);
    await expect(homePage.homeLink).toBeVisible();
  });

  test('NAV-004: Click and navigate through Mentorship dropdown items', async ({
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

  test.skip('NAV-005: Click and navigate through Programmes dropdown items', async ({
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

  test.skip('NAV-006: Click and navigate through About Us dropdown items', async ({
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

    test('NAV-008: Validate footer social links', async ({ basePage }) => {
      for (const { name, url } of footerSocialLinks) {
        await test.step(`Validate footer ${name} link`, async () => {
          await basePage.verifySocialLinkNavigation(name, url);
        });
      }
    });
  });

  test.skip('NAV-009: Visual Test - Navigation Desktop', () => {
    test.beforeEach(async ({ basePage }) => {
      await basePage.navigateToPath('/');
    });

    test.skip(
      'VT-001-A: Navigation bar',
      { tag: '@visual' },
      async ({ page }) => {
        await expect(page.getByRole('banner')).toHaveScreenshot(
          'nav-desktop.png',
        );
      },
    );

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

  test.describe('NAV-010: Visual Test - Navigation Mobile', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test.beforeEach(async ({ basePage }) => {
      await basePage.navigateToPath('/');
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

    test.skip(
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

    test.skip(
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
