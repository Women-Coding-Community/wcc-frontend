import { test } from '@utils/fixtures';
import { expect } from '@playwright/test';
test.describe('Mentorship dropdown', () => {
  test('verify Mentorship drop down clicks and show the correct options', async ({
    basePage,
  }) => {
    await basePage.navigateToPath('/');
    await basePage.mentorshipDropdown.click();
  const expectedTexts = [
    'Overview',
    'Mentors',
    'Mentor Registration',
    'Mentee Regitration',
    'Resources',
    'Code of Conduct',
    'FAQs',
    'Long-Term Timeline',
    'Ad-Hoc Timeline'
  ]; 
    
  const count = await basePage.getMenuItemCount();
  console.log(`Mentorship menu has ${count} items`);
  await expect(basePage.menuItems).toHaveCount(count); 
});
});


  




    
    

