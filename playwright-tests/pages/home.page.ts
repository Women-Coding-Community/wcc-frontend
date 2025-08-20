import { Locator, Page } from '@playwright/test';

import { BasePage } from '@pages/base.page';

export class HomePage extends BasePage {
  readonly becomeMentorSection: Locator;
  readonly sectionTitle: Locator;
  readonly sectionDescription: Locator;
  readonly joinAsMentorBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.becomeMentorSection = page.getByTestId('mentor-banner');
    this.sectionTitle = page.getByRole('heading', {
      name: 'Become a Mentor', exact: true 
    });
    this.sectionDescription = page.getByRole('heading', {
      name: 'Ready to empower and be empowered in tech? Become a mentor! Expand your network, give back, share expertise, and discover new perspectives.', exact: true
    });
    this.joinAsMentorBtn = page.getByRole('link', { name: 'Join as a mentor' });
  }

  async scrollToBecomeMentor() {
    await this.becomeMentorSection.scrollIntoViewIfNeeded();
  }
}
