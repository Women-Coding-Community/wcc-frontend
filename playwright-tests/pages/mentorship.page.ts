import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base.page';

// Component object for individual testimonial cards
export class TestimonialCard extends BasePage {
  readonly card: Locator;
  readonly icon: Locator;
  readonly text: Locator;
  readonly author: Locator;

  constructor(page: Page, card: Locator) {
    super(page);
    this.card = card;
    this.icon = card.locator('svg');
    this.text = card.getByTestId('feedback-card-text');
    this.author = card.getByTestId('feedback-card-author');
  }

  async toContainText(text: string): Promise<void> {
    await expect(this.text).toContainText(text);
  }

  async notToContainText(text: string): Promise<void> {
    await expect(this.text).not.toContainText(text);
  }

  async expandText(): Promise<void> {
    await this.card
      .getByRole('button', { name: 'Show more', exact: true })
      .click();
  }

  async collapseText(): Promise<void> {
    await this.card
      .getByRole('button', { name: 'Show less', exact: true })
      .click();
  }
}

export class MentorshipPage extends BasePage {
  readonly testimonialsTitle: Locator;
  readonly feedbackArea: Locator;
  readonly testimonialCards: Locator;
  readonly showMoreButton: Locator;

  // Mentors listing page locators
  readonly mentorsPageTitle: Locator;
  readonly mentorNames: Locator;
  readonly mentorImages: Locator;
  readonly programmingLanguagesLabel: Locator;
  readonly presentationTab: Locator;
  readonly skillsAndSupportTab: Locator;

  constructor(page: Page) {
    super(page);

    this.testimonialsTitle = page.getByRole('heading', {
      name: 'What do participants think about our Mentorship Programme?',
      exact: true,
    });

    this.feedbackArea = page.getByTestId('feedback-area');
    this.testimonialCards = this.feedbackArea.getByTestId('feedback-card');
    this.showMoreButton = this.feedbackArea.getByTestId('feedback-show-more');

    this.mentorsPageTitle = page.getByRole('heading', { name: 'Meet Our Mentors' });
    this.mentorNames = page.locator('h6');
    this.mentorImages = page.getByAltText('Mentor Profile Picture Description');
    this.programmingLanguagesLabel = page.getByText('Programming languages:').first();
    this.presentationTab = page.getByRole('tab', { name: 'Presentation' }).first();
    this.skillsAndSupportTab = page.getByRole('tab', { name: 'Skills & Support Areas' }).first();
  }

  getTestimonialCard(index: number): TestimonialCard {
    return new TestimonialCard(this.page, this.testimonialCards.nth(index));
  }

  async verifyFeedbackSectionInitialState(): Promise<void> {
    await expect(this.testimonialsTitle).toBeVisible();
    await expect(this.testimonialCards.first()).toBeVisible();
    await expect(this.showMoreButton).toBeVisible();
    await expect(this.showMoreButton).toBeEnabled();
  }

  //'Write-a-lot, Mentor 2024'
  getCardByAuthor(authorText: string): TestimonialCard {
    const cardLocator = this.testimonialCards
      .filter({
        has: this.page.getByText(authorText, { exact: true }),
      })
      .first();

    return new TestimonialCard(this.page, cardLocator);
  }
}
