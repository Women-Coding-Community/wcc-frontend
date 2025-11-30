import { Locator, Page } from '@playwright/test';

import { BasePage } from '@pages/base.page';

export class HomePage extends BasePage {
  readonly becomeMentorSectionTitle: Locator;
  readonly becomeMentorSectionDescription: Locator;
  readonly joinAsMentorBtn: Locator;

  readonly volunteerSectionTitle: Locator;
  readonly volunteerSectionDescription: Locator;
  readonly learnMoreVolunteerBtn: Locator;
  readonly findMentorButton: Locator;

  readonly heroTitle: Locator;
  readonly heroSubtitle: Locator;
  readonly joinSlackButton: Locator;

  constructor(page: Page) {
    super(page);

    // Become a Mentor section locators
    this.becomeMentorSectionTitle = page.getByRole('heading', {
      name: 'Become a Mentor',
      exact: true,
    });
    this.becomeMentorSectionDescription = page.getByRole('heading', {
      name: 'Ready to empower and be empowered in tech? Become a mentor! Expand your network, give back, share expertise, and discover new perspectives.',
      exact: true,
    });
    this.joinAsMentorBtn = page.getByRole('link', { name: 'Join as a mentor' });

    // Volunteer section locators
    this.volunteerSectionTitle = page.getByRole('heading', {
      name: 'Do you want to volunteer with us?',
      exact: true,
    });
    this.volunteerSectionDescription = page.locator(
      'p.MuiTypography-root.MuiTypography-body1.css-11xjirw-MuiTypography-root',
    );
    this.learnMoreVolunteerBtn = page.getByRole('link', {
      name: 'Learn more about volunteering',
    });

    this.findMentorButton = page.getByRole('button', { name: 'Find a mentor' });

    this.heroTitle = page
      .getByTestId('hero-container')
      .getByRole('heading', { name: 'Women Coding Community' });
    this.heroSubtitle = page.getByRole('heading', {
      name: 'Empowering Women in Their Tech Careers',
    });
    this.joinSlackButton = page.getByRole('link', { name: 'Join our Slack' });
  }
}
