import { Locator, Page } from '@playwright/test';

import { BasePage } from '@pages/base.page';

export class LandingPage extends BasePage {
  readonly heroTitle: Locator;
  readonly heroSubtitle: Locator;
  readonly joinSlackButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heroTitle = page
      .getByTestId('hero-container')
      .getByRole('heading', { name: 'Women Coding Community' });
    this.heroSubtitle = page.getByRole('heading', {
      name: 'Empowering Women in Their Tech Careers',
    });
    this.joinSlackButton = page.getByRole('link', { name: 'Join our Slack' });
  }
}
