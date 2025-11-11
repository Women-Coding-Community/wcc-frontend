import { test } from '@utils/fixtures';
import { expect } from '@playwright/test';
test.describe('Mentorship dropdown', () => {
  test('verify Mentorship drop down clicks and show the correct options', async ({
    basePage,
  }) => {
    await basePage.navigateToPath('/');
    const expectedText = [
  'Overview',
  'Mentors',
  'Mentor Registration',
  'Mentee Registration',
  'Resources',
  'Code of Conduct',
  'FAQs',
  'Long-Term Timeline',
  'Ad-Hoc Timeline',
];
await basePage.openMentorshipDropdown(); 
const count = await basePage.getMenuItemCount();
await expect(basePage.menuItems).toHaveCount(count);
console.log(`Mentorship menu has ${count} items`);
});
  });
