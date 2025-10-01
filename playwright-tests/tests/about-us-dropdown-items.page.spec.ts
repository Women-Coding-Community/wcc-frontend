import { test } from '@utils/fixtures';
import { aboutUsMenuItems } from '@utils/datafactory/about-us-dropdown-items.tests';

test.describe('About Us Dropdown Navigation', () => {
  test('NAV-012: Click and navigate through About Us dropdown items', async ({
    basePage,
  }) => {
    for (const { name, expectedURL, expectedText } of aboutUsMenuItems) {
      await basePage.navigateToPath('/');
      await basePage.clickElement(basePage.aboutUsDropdown);
      await basePage.clickElement(basePage.menuitem(name));
      await basePage.verifyURL(expectedURL);
      await basePage.verifyPageContainsText(expectedText);
    }
  });
});
