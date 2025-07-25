import { Page, Locator, test, expect } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly logo: Locator;
  readonly homeLink: Locator;
  readonly mentorshipDropdown: Locator;
  readonly programmesDropdown: Locator;
  readonly eventsLink: Locator;
  readonly blogLink: Locator;
  readonly jobsLink: Locator;
  readonly aboutUsDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.getByRole('img', { name: 'Logo' });
    this.homeLink = page.getByRole('button', { name: 'Home' });
    this.mentorshipDropdown = page.getByRole('button', { name: 'Mentorship' });
    this.programmesDropdown = page.getByRole('button', { name: 'Programmes' });
    this.eventsLink = page.getByRole('button', { name: 'Events' });
    this.blogLink = page.getByRole('button', { name: 'Blog' });
    this.jobsLink = page.getByRole('button', { name: 'Jobs' });
    this.aboutUsDropdown = page.getByRole('button', { name: 'About Us' });
  }

  async navigateToPath(path: string) {
    await test.step(`Navigate to path: ${path}`, async () => {
      await this.page.goto(path);
      await this.page.waitForLoadState('networkidle');
    });
  }

  async clickElement(elementLocator: Locator) {
    await test.step(`Click the "${elementLocator}" link`, async () => {
      await elementLocator.click();
    });
  }

  async verifyURL(expectedURL: string) {
    await test.step(`Verify URL is "${expectedURL}"`, async () => {
      await expect(this.page).toHaveURL(expectedURL);
    });
  }

  async verifyPageContainsText(expectedText: string) {
    await test.step(`Verify page contains text "${expectedText}"`, async () => {
      await expect(
        this.page.getByText(expectedText, { exact: true }),
      ).toBeVisible();
    });
  }
}
