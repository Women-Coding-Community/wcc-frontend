import { navTests } from '@utils/datafactory/nav.tests';
import { test } from '@utils/fixtures';
import { expect } from '@playwright/test';
import { MentorshipDropdownPage } from '../pages/mentorshipdropdown.page'
test.describe('Validate Navigation Menu', () => {
  navTests.forEach(
    ({
      id,
      linkName: linkName,
      pathToStart,
      linkLocator: linkLocator,
      expectedURL,
      expectedText,
    }) => {
      test(`${id}: Test "${linkName}" Link Navigation`, async ({
        landingPage,
        basePage,

        }) => {
        await basePage.navigateToPath(pathToStart);
        await basePage.clickElement(linkLocator(landingPage));
        await basePage.verifyURL(expectedURL);
        if (expectedText) {
          await basePage.verifyPageContainsText(expectedText);
        }
      });
    },
  );
  test('test for mentorship dropdown and showing submenu', async ({
  page,
  basePage,
  mentorshipDropdownPage,
}) => {
  await page.goto('/');
  await basePage.mentorshipDropdown.click();
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
  const itemCount = await mentorshipDropdownPage.countMentorshipItems();
    console.log(`Found ${itemCount} submenu items under “Mentorship” menu.`);

});

});
