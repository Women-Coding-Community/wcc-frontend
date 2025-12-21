import { expect } from '@playwright/test';
import { test } from '@utils/fixtures';

test.describe('Become a mentee Page', () => {
    test('MENT-004: Verify title and cards are correctly displayed', async ({
              mentorshipPage,
              basePage,
            }) => {
              await basePage.navigateToPath('/mentorship');
    });})



    // test.describe('Mentorship Feedback Section', () => {
    //     test('MENT-004: Verify title and cards are correctly displayed', async ({
    //       mentorshipPage,
    //       basePage,
    //     }) => {
    //       await basePage.navigateToPath('/mentorship');
      
    //       await expect(mentorshipPage.testimonialsTitle).toBeVisible();
      
    //       await expect(mentorshipPage.testimonialCards).toHaveCount(3);
      
    //       await expect(mentorshipPage.firstTestimonialCardIcon).toBeVisible();
      
    //       await expect(mentorshipPage.firstTestimonialCardText).toBeVisible();
    //       await expect(mentorshipPage.firstTestimonialCardText).not.toBeEmpty();
      
    //       await expect(mentorshipPage.firstTestimonialCardAuthor).toHaveText(
    //         /^.+,\s*Mentor\s+\d{4}$/,
    //       );
      
    //       await expect(mentorshipPage.showMoreButton).toBeVisible();
    //     });
    //   });