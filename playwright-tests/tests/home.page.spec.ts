import { expect } from '@playwright/test';

import { test } from '@utils/fixtures';

import { HomePage } from '../pages/home.page';

test.describe('Become Mentor section', () => {
  test('verify title and description and navigate to registration', async ({
    page,
  }) => {
    const home = new HomePage(page);

    await home.goto();
    await home.scrollToBecomeMentor();

    await expect(home.sectionTitle).toBeVisible();
    await expect(home.sectionTitle).toHaveText('Become a Mentor');

    await expect(home.sectionDescription).toBeVisible();
    await expect(home.sectionDescription).not.toHaveText(
      /Ready to empower and be empowered in tech\? Become a Mentor! Expand your network, give back, share expertise, and discover new perspectives\.$/,
    );

    await expect(home.joinAsMentorBtn).toBeVisible();
    await home.clickJoinAsMentor();

    await expect(page).toHaveURL(/\/mentorship\/mentor-registration$/);
    await expect(home.mentorRegistrationPageTitle).toBeVisible();
    await expect(home.mentorRegistrationPageTitle).toHaveText(
      'Welcome to the MentorRegistrationPage',
    );
  });
});
