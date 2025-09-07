import { expect } from '@playwright/test';

import {
  programmesTestData,
  programmesExpectedItems,
} from '@utils/datafactory/programmes.tests';
import { test } from '@utils/fixtures';

test.describe('Programmes Dropdown Navigation', () => {
  test('should navigate to all programmes dropdown items', async ({
    page,
    basePage,
  }) => {
    await basePage.navigateToPath('/');

    for (const item of programmesTestData) {
      await test.step(`Test navigation to ${item.name}`, async () => {
        await basePage.navigateToPath('/');

        await basePage.programmesDropdown.click();

        await page.waitForSelector('[data-testid="subNav"]');

        const menuItem = page.getByRole('menuitem', { name: item.name });
        await menuItem.click();

        await basePage.verifyURL(item.path);

        if (item.expectedText) {
          await basePage.verifyPageContainsText(item.expectedText);
        }
      });
    }
  });

  test('should verify programmes dropdown menu items are visible', async ({
    page,
    basePage,
  }) => {
    await basePage.navigateToPath('/');

    await basePage.programmesDropdown.click();

    await page.waitForSelector('[data-testid="subNav"]');

    for (const itemName of programmesExpectedItems) {
      const menuItem = page.getByRole('menuitem', { name: itemName });
      await expect(menuItem).toBeVisible();
    }
  });

  test('should close dropdown when clicking outside', async ({
    page,
    basePage,
  }) => {
    await basePage.navigateToPath('/');

    await basePage.programmesDropdown.click();

    await page.waitForSelector('[data-testid="subNav"]');

    await page.click('body', { position: { x: 100, y: 100 } });

    await expect(
      page.getByRole('menuitem', { name: 'Our Programmes' }),
    ).not.toBeVisible();
  });
});
