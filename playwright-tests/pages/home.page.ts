import { Locator, Page } from '@playwright/test';

import { BasePage } from '@pages/base.page';

export class HomePage extends BasePage {
  readonly becomeMentorSection: Locator;
  readonly sectionTitle: Locator;
  readonly sectionDescription: Locator;
  readonly joinAsMentorBtn: Locator;
  readonly mentorRegistrationPageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.becomeMentorSection = page.getByTestId('mentor-banner');
    this.sectionTitle = page.getByRole('heading', {
      name: 'Become a Mentor',
      exact: true,
    });
    this.sectionDescription = page.getByRole('heading', {
      name: /Ready to empower and be empowered in tech/i,
    });
    this.joinAsMentorBtn = page.getByRole('link', { name: 'Join as a mentor' });
    this.mentorRegistrationPageTitle = page.getByRole('heading', {
      name: 'Welcome to the MentorRegistrationPage',
    });
  }

  async goto() {
    await this.page.goto('/');
  }

  async scrollToBecomeMentor() {
    await this.becomeMentorSection.scrollIntoViewIfNeeded();
  }

  async clickJoinAsMentor() {
    await this.joinAsMentorBtn.click();
  }
}
