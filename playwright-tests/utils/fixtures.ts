import { test as base } from '@playwright/test';

import { BasePage } from '@pages/base.page';
import { HomePage } from '@pages/home.page';

// Declare the types of your fixtures.
type PageObjectFixtures = {
  basePage: BasePage;
  homePage: HomePage;
};

export const test = base.extend<PageObjectFixtures>({
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});
