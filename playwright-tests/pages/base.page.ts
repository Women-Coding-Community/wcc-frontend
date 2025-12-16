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
  readonly menuitem: (itemTitle: string) => Locator;

  // Footer locators
  readonly footerLogo: Locator;
  readonly footerNonProfitText: Locator;
  readonly footerCopyrightText: Locator;
  readonly footerFollowUsTitle: Locator;
  readonly footerFollowUsDescription: Locator;
  readonly footerSocialLinks: { [key: string]: Locator };
  readonly footerTechnicalIssuesText: Locator;

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
    this.menuitem = (itemTitle: string) =>
      page.getByRole('menuitem', { name: itemTitle });

    // Footer locators initialization
    this.footerLogo = page.getByAltText('Woman Coding Community');
    this.footerNonProfitText = page.getByText(
      'Women Coding Community is a not-for-profit organisation.',
    );
    this.footerCopyrightText = page.getByText('© 2024 Women Coding Community');
    this.footerFollowUsTitle = page.getByText('Follow Us', { exact: true });
    this.footerFollowUsDescription = page.getByText(
      'Join us on social media and stay tuned.',
      { exact: true },
    );
    this.footerTechnicalIssuesText = page.getByText(
      'Experiencing Technical Issues?',
    );

    this.footerSocialLinks = {
      LinkedIn: page.getByTestId('LinkedInIcon'),
      GitHub: page.getByTestId('GitHubIcon'),
      Instagram: page.getByTestId('InstagramIcon'),
      Email: page.getByTestId('EmailIcon'),
      Slack: page.locator('a[href*="join.slack.com"]').last(),
      'Send us a report': page.getByText('Send us a report', { exact: true }),
    };
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

  async verifySocialLinkNavigation(
    socialPlatform: string,
    expectedURL: string | RegExp,
    opensInNewTab: boolean,
  ) {
    const locator = this.footerSocialLinks[socialPlatform];
    await expect(locator).toBeVisible();

    if (opensInNewTab === true) {
      // Handle new tab navigation
      const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page'),
        this.clickElement(locator),
      ]);
      await expect(newPage).toHaveURL(expectedURL);
    } else {
      // Handle same tab navigation
      await this.clickElement(locator);
      await expect(this.page).toHaveURL(expectedURL);
    }
  }
}
