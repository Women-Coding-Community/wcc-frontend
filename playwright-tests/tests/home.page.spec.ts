import { expect } from '@playwright/test';

import { test } from '@utils/fixtures';

// Tests for Become a Mentor Section on Home Page
test.describe('Become Mentor section', () => {
  test('verify title and description and navigate to registration', async ({
    homePage,
    basePage,
  }) => {
    await basePage.navigateToPath('/');

    await expect(homePage.becomeMentorSectionTitle).toBeVisible();
    await expect(homePage.becomeMentorSectionDescription).toBeVisible();
    await expect(homePage.joinAsMentorBtn).toBeVisible();
    await basePage.clickElement(homePage.joinAsMentorBtn);

    await basePage.verifyURL('/mentorship/mentor-registration');
    await basePage.verifyPageContainsText(
      'Welcome to the MentorRegistrationPage',
    );
  });
});

// Tests for Volunteer section on Home Page
test.describe('Volunteer section', () => {
  test('verify title and description and navigate to volunteer page', async ({
    homePage,
    basePage,
  }) => {
    await basePage.navigateToPath('/');

    await expect(homePage.volunteerSectionTitle).toBeVisible();
    await expect(homePage.volunteerSectionDescription).toHaveText(
      'Empowering women in their tech careers through education, mentorship, community building, and career services is our mission. We provide workshops and events, connect members with industry mentors, foster a supportive community through meetups and conferences, and raise awareness for more inclusive industry practices.',
    );
    await expect(homePage.learnMoreVolunteerBtn).toBeVisible();
    await basePage.clickElement(homePage.learnMoreVolunteerBtn);

    await basePage.verifyURL('/about-us/volunteer');
    await basePage.verifyPageContainsText('Welcome to the VolunteerPage');
  });
});
