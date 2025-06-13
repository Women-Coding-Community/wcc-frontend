import { Locator, Page } from '@playwright/test';

import { BasePage } from './base.page';

export class LandingPage extends BasePage {
  readonly heroTitle: Locator;
  readonly heroSubtitle: Locator;
  readonly joinSlackButton: Locator;
  readonly heroImage: Locator;
  readonly opportunitiesTitle: Locator;
  readonly opportunitiesDescription: Locator;

  constructor(page: Page) {
    super(page);
    this.heroTitle = page
      .getByTestId('hero-container')
      .getByRole('heading', { name: 'Women Coding Community' });
    this.heroSubtitle = page.getByRole('heading', {
      name: 'Empowering Women in Their Tech Careers',
    });
    this.joinSlackButton = page.getByRole('link', { name: 'Join our Slack' });
    this.heroImage = page
      .getByTestId('hero-container')
      .getByRole('img', { name: 'There are two women talking' });
    this.opportunitiesTitle = page.getByRole('heading', {
      name: 'Opportunities and Programmes',
    });
    this.opportunitiesDescription = page.getByText(
      /Join our community and unlock endless opportunities/i,
    );
  }
}
