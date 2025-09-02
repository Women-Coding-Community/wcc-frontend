import { test, expect } from '@playwright/test';

import { BasePage } from '@pages/base.page';

test.describe('Programmes Dropdown Navigation', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test('should navigate to all programmes dropdown items', async ({ page }) => {
    await basePage.navigateToPath('/');

    const programmesItems: Array<{
      name: string;
      path: string;
      expectedText: string | null;
    }> = [
      {
        name: 'Our Programmes',
        path: '/programmes',
        expectedText: 'Welcome to the ProgrammesPage',
      },
      {
        name: 'Book Club',
        path: '/programmes/book-club',
        expectedText: 'Welcome to the BookClubPage',
      },
      {
        name: 'Study Groups',
        path: '/programmes/study-groups',
        expectedText: null,
      },
      {
        name: 'Interview Preparation',
        path: '/programmes/interview-preparation',
        expectedText: 'Welcome to the InterviewPreparationPage',
      },
    ];

    for (const item of programmesItems) {
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
  }) => {
    await basePage.navigateToPath('/');

    await basePage.programmesDropdown.click();

    await page.waitForSelector('[data-testid="subNav"]');

    const expectedItems = [
      'Our Programmes',
      'Book Club',
      'Study Groups',
      'Interview Preparation',
    ];

    for (const itemName of expectedItems) {
      const menuItem = page.getByRole('menuitem', { name: itemName });
      await expect(menuItem).toBeVisible();
    }
  });

  test('should close dropdown when clicking outside', async ({ page }) => {
    await basePage.navigateToPath('/');

    await basePage.programmesDropdown.click();

    await page.waitForSelector('[data-testid="subNav"]');

    await page.click('body', { position: { x: 100, y: 100 } });

    await expect(
      page.getByRole('menuitem', { name: 'Our Programmes' }),
    ).not.toBeVisible();
  });
});
