import { expect } from '@playwright/test';

import { test } from '@utils/fixtures';

test.describe('Validate Mentorship Page', () => {
  test('MENT-002: Register as Mentor', async ({ homePage, basePage }) => {
    await basePage.navigateToPath('/');
    await basePage.clickElement(homePage.joinAsMentorBtn);

    await basePage.verifyURL('/mentorship/mentor-registration');
    await basePage.verifyPageContainsText('Welcome to the MentorRegistrationPage');
  });

  test('MENT-003: Find a Mentor', async ({ mentorshipPage, basePage }) => {
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

  test.describe('Feedback Section', () => {
    test.beforeEach(async ({ basePage }) => {
      await basePage.navigateToPath('/mentorship');
    });

    test('MENT-004: Verify title and cards are correctly displayed', async ({
      mentorshipPage,
    }) => {
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

    test('MENT-005: Show More button displays additional cards and text expansion works', async ({
      mentorshipPage,
      basePage,
    }) => {
      await test.step('Verify initial state shows 3 cards', async () => {
        await mentorshipPage.verifyFeedbackSectionInitialState();
        await expect(mentorshipPage.getTestimonialCard(3).card).not.toBeVisible();
      });

      await test.step('Click Show More to display additional cards', async () => {
        await basePage.clickElement(mentorshipPage.showMoreButton);
        await expect(mentorshipPage.getTestimonialCard(3).card).toBeVisible();
      });

      await test.step('Verify text expansion on Write-a-lot card', async () => {
        const cardWithLongText = mentorshipPage.getCardByAuthor(
          'Jane, Mentor 2024',
        );
        await cardWithLongText.toContainText('...');
        await cardWithLongText.expandText();
        await cardWithLongText.notToContainText('...');
        await cardWithLongText.collapseText();
        await cardWithLongText.toContainText('...');
      });
    });
  });

  test('MENT-006: Visual Test - FAQ Page', { tag: '@visual' }, async ({
    page,
  }) => {
    await page.goto('/mentorship/faqs');
    await expect(page).toHaveScreenshot('faq-page.png', { fullPage: true });
  });
});
