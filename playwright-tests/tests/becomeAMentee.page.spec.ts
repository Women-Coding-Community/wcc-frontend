import { expect } from '@playwright/test';
import { test } from '@utils/fixtures';
import { HomePage } from '@pages/home.page';
import { MentorshipPage } from '@pages/mentorship.page';

test('Validate "Become a Mentee" section and Find a Mentor button', async ({
  page,
}) => {
  // Navigate to Mentorship page
  await page.goto('/mentorship');

  // "Become a Mentee" section
  const { sectionTitle, description, menteeListItems } = new MentorshipPage(
    page,
  );

  await expect(sectionTitle).toBeVisible();
  await expect(description).toBeVisible();

  // List items
  const items = [
    'Want to start a career in software engineering',
    'Want to find a better job',
    'Want to be promoted at work',
    'Want to apply for a leadership position',
    'Need support in advancing your career',
  ];

  await expect(menteeListItems).toHaveText(items);

  // Validate "Find a mentor" button
  const { findMentorButton } = new HomePage(page);
  await findMentorButton.click();

  // Verify redirection
  await expect(page).toHaveURL(/\/mentorship\/mentors/);
});
