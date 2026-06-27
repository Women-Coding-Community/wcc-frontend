import { expect } from '@playwright/test';
import { test } from '@utils/fixtures';
import { HomePage } from '@pages/home.page';
import { MentorshipPage } from '@pages/mentorship.page';

test('Validate "Become a Mentee" section and Find a Mentor button', async ({
  page,
  mentorshipPage,
  homePage,
}) => {
  // Navigate to Mentorship page
  await page.goto('/mentorship');

  await expect(mentorshipPage.sectionTitle).toBeVisible();
  await expect(mentorshipPage.description).toBeVisible();

  // List items
  const items = [
    'Want to start a career in software engineering',
    'Want to find a better job',
    'Want to be promoted at work',
    'Want to apply for a leadership position',
    'Need support in advancing your career',
  ];

  await expect(mentorshipPage.menteeListItems).toHaveText(items);

  await homePage.findMentorButton.click();
  await expect(page).toHaveURL(/\/mentorship\/mentors/);
});
