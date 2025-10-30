import { expect } from '@playwright/test';

import { test } from '@utils/fixtures';

// MENT-004: Verify title and testimonial cards are displayed correctly
test.describe('Mentorship Feedback Section', () => {
  test('MENT-004: Verify title and cards are correctly displayed', async ({
    mentorshipPage,
    basePage,
  }) => {
    await basePage.navigateToPath('/mentorship');

    await expect(mentorshipPage.testimonialsTitle).toBeVisible();
    await expect(mentorshipPage.testimonialsTitle).toHaveText(
      'What do participants think about our Mentorship Programme?',
    );

    const initialCardCount = await mentorshipPage.getVisibleCardCount();
    expect(initialCardCount).toBe(3);

    // Verify the first three cards match expected testimonials from test data
    await expect(mentorshipPage.getTestimonialQuoteIcon(0)).toBeVisible();
    await expect(mentorshipPage.getTestimonialText(0)).toContainText(
      'It is great to be able to share my experience as a newbie in Tech',
    );
    await expect(mentorshipPage.getTestimonialAuthor(0)).toHaveText(
      'Lucy, Mentor 2024',
    );

    await expect(mentorshipPage.getTestimonialQuoteIcon(1)).toBeVisible();
    await expect(mentorshipPage.getTestimonialText(1)).toContainText(
      'I am exciting with this mentorship program',
    );
    await expect(mentorshipPage.getTestimonialAuthor(1)).toHaveText(
      'Ana Smith, Mentor 2024',
    );

    await expect(mentorshipPage.getTestimonialQuoteIcon(2)).toBeVisible();
    await expect(mentorshipPage.getTestimonialText(2)).toContainText(
      'My mentor has done an excellent job accommodating me',
    );
    await expect(mentorshipPage.getTestimonialAuthor(2)).toHaveText(
      'Jane, Mentor 2024',
    );
  });
});
