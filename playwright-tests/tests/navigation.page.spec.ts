import { navTests } from '@utils/datafactory/nav.tests';
import { test } from '@utils/fixtures';

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
});
