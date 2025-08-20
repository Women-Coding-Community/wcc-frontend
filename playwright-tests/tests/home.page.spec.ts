import { expect } from '@playwright/test';

import { test } from '@utils/fixtures';

test.describe('Become Mentor section', () => {
  test('verify title and description and navigate to registration', async ({
    homePage,
    basePage,
  }) => {

    await basePage.navigateToPath('/');
    await homePage.scrollToBecomeMentor();

    await expect(homePage.sectionTitle).toBeVisible();

    await expect(homePage.sectionDescription).toBeVisible();

    await expect(homePage.joinAsMentorBtn).toBeVisible();
    await basePage.clickElement(homePage.joinAsMentorBtn);

    await basePage.verifyURL("/mentorship/mentor-registration");
    await basePage.verifyPageContainsText(
      'Welcome to the MentorRegistrationPage',
    );
  });
});
