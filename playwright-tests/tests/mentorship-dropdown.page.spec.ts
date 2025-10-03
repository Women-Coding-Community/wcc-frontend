import { MentorshipDropdownPage } from '@pages/mentorship-dropdown.page';
import { expect} from '@playwright/test';

import { test } from '@utils/fixtures';

test('should display complete navigation menu', async ({
  page,
  landingPage,
}) => {
  await page.goto('/');
  await expect(landingPage.homeLink).toBeVisible();
  await expect(landingPage.mentorshipDropdown).toBeVisible();
});
test('test for mentorship dropdown and showing submenu', async ({
  page,
  landingPage,
}) => {
  await page.goto('/');
  await landingPage.mentorshipDropdown.click();
  const expectedTexts = [
    'Overview',
    'Mentors',
    'Study Groups',
    'Mentor Registration',
    'Mentee Registration',
    'Resources',
    'Code of Conduct',
    'FAQs',
    'Long-Term Timeline',
    'Ad-Hoc Timeline',
  ];
   
});

 
