import { Locator, Page } from '@playwright/test';

import { BasePage } from '@pages/base.page';

export class MentorshipPage extends BasePage {
  readonly testimonialsTitle: Locator;
  readonly testimonialCards: Locator;
  readonly firstTestimonialCard: Locator;
  readonly firstTestimonialCardIcon: Locator;
  readonly firstTestimonialCardText: Locator;
  readonly firstTestimonialCardAuthor: Locator;
  readonly showMoreButton: Locator;

  readonly thirdTestimonialCard: Locator;
  readonly thirdTestimonialCardText: Locator;
  readonly thirdCardShowMoreButton: Locator;
  readonly thirdCardShowLessButton: Locator;

  constructor(page: Page) {
    super(page);

    this.testimonialsTitle = page.getByRole('heading', {
      name: 'What do participants think about our Mentorship Programme?',
      exact: true,
    });

    this.testimonialCards = page.locator('.MuiBox-root.css-70gggt');
    this.firstTestimonialCard = this.testimonialCards.first();
    this.firstTestimonialCardIcon = this.firstTestimonialCard.locator('svg');
    this.firstTestimonialCardText = this.firstTestimonialCard.locator(
      'p.MuiTypography-body2',
    );
    this.firstTestimonialCardAuthor = this.firstTestimonialCard.locator(
      'h6.MuiTypography-subtitle2',
    );

    this.showMoreButton = page.getByRole('button', {
      name: '+ Show more',
      exact: true,
    });

    this.thirdTestimonialCard = this.testimonialCards.nth(2);
    this.thirdTestimonialCardText = this.thirdTestimonialCard.locator(
      'p.MuiTypography-body2',
    );
    this.thirdCardShowMoreButton = this.thirdTestimonialCard.locator(
      'button:has-text("Show more")',
    );
    this.thirdCardShowLessButton = this.thirdTestimonialCard.locator(
      'button:has-text("Show less")',
    );
  }
}
