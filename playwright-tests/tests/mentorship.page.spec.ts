import { expect } from '@playwright/test';

import { test } from '@utils/fixtures';

test.describe('Validate Mentorship Page', () => {
  test('MENT-001: Register as Mentor', async ({ homePage, basePage }) => {
    await basePage.navigateToPath('/');
    await basePage.clickElement(homePage.joinAsMentorBtn);

    await basePage.verifyURL('/mentorship/mentor-registration');
    await basePage.verifyPageContainsText(
      'Welcome to the MentorRegistrationPage',
    );
  });

  test('MENT-002: Find a Mentor', async ({ mentorshipPage, basePage }) => {
    await basePage.navigateToPath('/mentorship');
    await basePage.clickElement(basePage.findMentorButton);

    await basePage.verifyURL('/mentorship/mentors');
    await expect(mentorshipPage.mentorsPageTitle).toBeVisible();
    await expect(mentorshipPage.mentorNames.first()).toBeVisible();
    await expect(mentorshipPage.mentorImages.first()).toBeVisible();
    await expect(mentorshipPage.programmingLanguagesLabel).toBeVisible();
    // Presentation tab is selected by default
    await expect(mentorshipPage.presentationTab).toBeVisible();
    await expect(mentorshipPage.skillsAndSupportTab).toBeVisible();
    // Note: Reviews and Resources tabs are conditional on mentor data
  });

  test('MENT-003: Browse Mentorship Feedback', async ({
    mentorshipPage,
    basePage,
  }) => {
    await basePage.navigateToPath('/mentorship');

    await test.step('Verify testimonials section and initial card display', async () => {
      await expect(mentorshipPage.testimonialsTitle).toBeVisible();
      await expect(mentorshipPage.testimonialCards).toHaveCount(3);

      const firstCard = mentorshipPage.getTestimonialCard(0);
      await expect(firstCard.icon).toBeVisible();
      await expect(firstCard.text).toBeVisible();
      await expect(firstCard.text).not.toBeEmpty();
      await expect(firstCard.author).toHaveText(
        /^.+,\s*(Mentee|Mentor)\s+\d{4}$/,
      );

      await expect(mentorshipPage.showMoreButton).toBeVisible();
    });

    await test.step('Show More button reveals additional cards', async () => {
      await expect(
        mentorshipPage.getTestimonialCard(3).card,
      ).not.toBeVisible();
      await basePage.clickElement(mentorshipPage.showMoreButton);
      await expect(mentorshipPage.getTestimonialCard(3).card).toBeVisible();
    });

    await test.step('Text expansion works on long cards', async () => {
      const cardWithLongText =
        mentorshipPage.getCardByAuthor('Jane, Mentor 2024');
      await cardWithLongText.toContainText('...');
      await cardWithLongText.expandText();
      await cardWithLongText.notToContainText('...');
      await cardWithLongText.collapseText();
      await cardWithLongText.toContainText('...');
    });
  });

  test(
    'MENT-005: Visual Test - FAQ Page',
    { tag: '@visual' },
    async ({ page }) => {
      await page.goto('/mentorship/faqs');
      await expect(page).toHaveScreenshot('faq-page.png', { fullPage: true });
    },
  );
});
