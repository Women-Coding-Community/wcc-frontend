import { test } from '@utils/fixtures';
import { mentorshipMenuItems } from '@utils/datafactory/mentorship-dropdown-items.tests';

test.describe('Mentorship Dropdown Navigation', () => {
  test('NAV-008: Click and navigate through mentorship dropdown items', async ({
    basePage,
  }) => {
    for (const {
      name,
      expectedURL,
      expectedText,
      useLocator,
    } of mentorshipMenuItems) {
      await basePage.navigateToPath('/');
      await basePage.clickElement(basePage.mentorshipDropdown);
      await basePage.clickElement(basePage.menuitem(name));
      await basePage.verifyURL(expectedURL);
      if (useLocator) {
        await basePage.verifyLocatorContainsText(
          basePage.mentorCard,
          expectedText,
        );
      } else {
        await basePage.verifyPageContainsText(expectedText);
      }
    }
  });
});
