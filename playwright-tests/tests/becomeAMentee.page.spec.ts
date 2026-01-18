import { expect } from '@playwright/test';
import { test } from '@utils/fixtures';

test('Validate "Become a Mentee" section and Find a Mentor button', async ({
  page,
}) => {
  // Navigate to Mentorship page
  await page.goto('/mentorship');

  // Scroll to "Become a Mentee" section
  const sectionTitle = page.getByRole('heading', {
    level: 4,
    name: /Become a Mentee/i,
  });
  await sectionTitle.scrollIntoViewIfNeeded();

  // Validate title
  await expect(sectionTitle).toBeVisible();

  // Validate description text
  const description = page.getByRole('heading', {
    level: 5,
    name: /You should become a mentee if you:/i,
  });
  await expect(description).toBeVisible();

  // List items
  const items = [
    'Want to start a career in software engineering',
    'Want to find a better job',
    'Want to be promoted at work',
    'Want to apply for a leadership position',
    'Need support in advancing your career',
  ];

  for (const item of items) {
    await expect(page.getByText(item)).toBeVisible();
  }

  // Validate "Find a mentor" button
  const findMentorButton = page.getByRole('button', {
    name: 'Find a mentor',
  });
  await expect(findMentorButton).toBeVisible();
  await expect(findMentorButton).toBeEnabled();
  await findMentorButton.click();

  // Verify redirection
  await expect(page).toHaveURL(/\/mentorship\/mentors/);
});
