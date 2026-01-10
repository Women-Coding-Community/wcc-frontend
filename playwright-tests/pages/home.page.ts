import { expect, Locator, Page } from '@playwright/test';

import { BasePage } from '@pages/base.page';

export class EventCard extends BasePage {
  readonly card: Locator;

  constructor(page: Page, card: Locator) {
    super(page);
    this.card = card;
  }

  async verifyCardStructure(): Promise<void> {
    await expect(this.card).toBeVisible();

    const eventType = this.card.getByTestId('event-card-type');
    await expect(eventType).toHaveText(/^[A-Z_]+$/);

    const eventDate = this.card.getByTestId('event-card-date');
    await expect(eventDate).toHaveText(
      /\w+[^\d]*\d{4}[^-]*-[^\d]*\d{1,2}:\d{2}/,
    );

    const eventTitle = this.card.getByTestId('event-card-title');
    await expect(eventTitle).not.toBeEmpty();

    const eventSpeaker = this.card.getByTestId('event-card-speaker');
    await expect(eventSpeaker).toHaveText(/^Speaker:\s+.+$/);

    const eventDescription = this.card.getByTestId('event-card-description');
    await expect(eventDescription).not.toBeEmpty();

    const eventImage = this.card.getByTestId('event-card-image');
    await expect(eventImage).toBeVisible();

    const eventCTA = this.card.getByTestId('event-card-cta');
    await expect(eventCTA).not.toBeEmpty();
  }
}

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
  readonly mainHeading: Locator;
  readonly mainText: Locator;
  readonly mentorshipLink: Locator;
  readonly eventsLink: Locator;
  readonly bookClubLink: Locator;
  readonly CvClinicLink: Locator;
  readonly mockInterviewsLink: Locator;
  readonly leetCodeLink: Locator;
  readonly joinSlackButton: Locator;

  readonly eventsSection: Locator;

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
    this.mainHeading = page.getByRole('heading', {
      name: 'Opportunities and Programmes',
    });
    this.mainText = page.getByRole('heading', {
      name: 'Join our community and unlock',
    });
    this.mentorshipLink = page.getByRole('link', { name: 'Mentorship' });
    this.eventsLink = page.getByRole('link', {
      name: 'Online and in-person Events',
    });
    this.bookClubLink = page.getByRole('link', { name: 'Book Club' });
    this.CvClinicLink = page.getByRole('link', { name: 'CV clinic' });
    this.mockInterviewsLink = page.getByRole('link', {
      name: 'Mock interviews',
    });
    this.leetCodeLink = page.getByRole('link', { name: 'Leetcode' });

    this.joinSlackButton = page.getByRole('link', { name: 'Join our Slack' });

    this.eventsSection = page.getByTestId('events-section');
  }

  /**
   * Gets an EventCard instance by index
   * @param index - Zero-based index of the event card
   */
  getEventCard(index: number): EventCard {
    const cards = this.eventsSection.getByTestId('event-card');
    return new EventCard(this.page, cards.nth(index));
  }

  /**
   * Gets an EventCard by matching title text
   * @param titleText - The event title to search for
   */
  getEventCardByTitle(titleText: string): EventCard {
    const card = this.eventsSection
      .getByTestId('event-card')
      .filter({
        has: this.page
          .getByTestId('event-card-title')
          .filter({ hasText: titleText }),
      })
      .first();
    return new EventCard(this.page, card);
  }

  async verifyEventsSectionVisible(): Promise<void> {
    const sectionTitle = this.eventsSection.getByTestId('events-section-title');
    const viewAllLink = this.eventsSection.getByTestId('events-view-all-link');

    await expect(this.eventsSection).toBeVisible();
    await expect(sectionTitle).toBeVisible();
    await expect(viewAllLink).toBeVisible();
  }

  async clickViewAllEventsLink(): Promise<void> {
    const viewAllLink = this.eventsSection.getByTestId('events-view-all-link');
    await viewAllLink.click();
  }
}
