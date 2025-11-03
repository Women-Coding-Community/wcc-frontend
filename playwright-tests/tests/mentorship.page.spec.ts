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

    // Verify initially 3 testimonial cards are displayed
    const initialCardCount = await mentorshipPage.getVisibleCardCount();
    expect(initialCardCount).toBe(3); 

    // Verify Show More button is present on the page
    await expect(mentorshipPage.showMoreButton).toBeVisible(); 

    // Verify the first card has all required elements with correct format
    await expect(mentorshipPage.getTestimonialQuoteIcon(0)).toBeVisible();

    await expect(mentorshipPage.getTestimonialText(0)).toBeVisible();
    await expect(mentorshipPage.getTestimonialText(0)).not.toBeEmpty();

    await expect(mentorshipPage.getTestimonialAuthor(0)).toHaveText(/^.+,\s*Mentor\s+\d{4}$/);
  
  });
});
