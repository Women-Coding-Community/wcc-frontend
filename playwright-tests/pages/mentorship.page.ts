import { Locator, Page } from '@playwright/test';

import { BasePage } from '@pages/base.page';

export class MentorshipPage extends BasePage {
  // Main section locators
  readonly testimonialsTitle: Locator;

  constructor(page: Page) {
    super(page);

    this.testimonialsTitle = page.getByRole('heading', {
      name: 'What do participants think about our Mentorship Programme?',
      exact: true,
    });
  }

  getAllTestimonialCards(): Locator {
    return this.page.locator('h6.MuiTypography-subtitle2').locator('..');
  }

  // Get a specific testimonial card by index
  getTestimonialCard(index: number): Locator {
    return this.getAllTestimonialCards().nth(index);
  }

  getTestimonialText(index: number): Locator {
    return this.getTestimonialCard(index).locator('p.MuiTypography-body2');
  }

  getTestimonialAuthor(index: number): Locator {
    return this.getTestimonialCard(index).locator('h6.MuiTypography-subtitle2');
  }

  getTestimonialQuoteIcon(index: number): Locator {
    return this.getTestimonialCard(index).locator('svg').first();
  }

  // Count the number of visible testimonial cards
  async getVisibleCardCount(): Promise<number> {
    return await this.getAllTestimonialCards().count();
  }
}
