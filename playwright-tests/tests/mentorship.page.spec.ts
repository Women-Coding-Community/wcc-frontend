import { expect } from '@playwright/test';

import { test } from '@utils/fixtures';

test.describe('Mentorship Feedback Section', () => {
  test('MENT-004: Verify title and cards are correctly displayed', async ({
    mentorshipPage,
    basePage,
  }) => {
    await basePage.navigateToPath('/mentorship');
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

  test('MENT-005: Verify Show More button displays additional cards and text expansion works', async ({
    mentorshipPage,
    basePage,
  }) => {
    await test.step('Navigate to mentorship page and verify initial state', async () => {
      await basePage.navigateToPath('/mentorship');
      await mentorshipPage.verifyFeedbackSectionInitialState();

      await expect(mentorshipPage.getTestimonialCard(3).card).not.toBeVisible();
    });

    await test.step('Click Show More button to display additional cards', async () => {
      await basePage.clickElement(mentorshipPage.showMoreButton);

      await expect(mentorshipPage.getTestimonialCard(3).card).toBeVisible();
    });

    await test.step('Verify text expansion on Write-a-lot card', async () => {
      const writeALotCard = mentorshipPage.getCardByAuthor(
        'Write-a-lot, Mentor 2024',
      );

      await writeALotCard.toContainText('...');
      await writeALotCard.expandText();
      await writeALotCard.notToContainText('...');
      await writeALotCard.collapseText();
      await writeALotCard.toContainText('...');
    });
  });
});

test('Verify FAQ Page Outline', { tag: '@visual' }, async ({ page }) => {
  await page.goto('/mentorship/faqs');
  await expect(page).toHaveScreenshot('faq-page.png', { fullPage: true });
});
