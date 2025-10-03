import { test as base } from '@playwright/test';

import { BasePage } from '@pages/base.page';
import { HomePage } from '@pages/home.page';
import { LandingPage } from '@pages/landing.page';
import { MentorshipDropdownPage } from '@pages/mentorship-dropdown.page';

// Declare the types of your fixtures.
type PageObjectFixtures = {
  landingPage: LandingPage;
  basePage: BasePage;
  homePage: HomePage;
  mentorshipDropdownPage: MentorshipDropdownPage;

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
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },

  mentorshipDropdownPage: async ({ page }, use) => {
    const mentorshipDropdownPage = new MentorshipDropdownPage(page);
    await use(mentorshipDropdownPage);
  },

});
