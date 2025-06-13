import { test as base } from '@playwright/test';

import { BasePage } from '../pages/base.page';
import { LandingPage } from '../pages/landing.page';

// Declare the types of your fixtures.
type PageObjectFixtures = {
  landingPage: LandingPage;
  basePage: BasePage;
};

export const test = base.extend<PageObjectFixtures>({
  landingPage: async ({ page }, use) => {
    const landingPage = new LandingPage(page);
    await use(landingPage);
  },
  basePage: async ({ page }, use) => {
    const basePage = new BasePage(page);
    await use(basePage);
  },
});
