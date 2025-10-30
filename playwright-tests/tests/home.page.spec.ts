import { expect } from '@playwright/test';
import { test } from '@utils/fixtures';

test.describe('Validate Home Page', () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigateToPath('/');
  });

  test('HP-001: Join Slack button navigates to Slack invite in the new page', async ({
    page,
    homePage,
  }) => {
    await page.goto('/');
    const newPagePromise = page.waitForEvent('popup');
    await homePage.joinSlackButton.click();
    const newPage = await newPagePromise;

    await newPage.waitForLoadState();
    expect(newPage.url()).toContain('slack.com');
    await expect(newPage).toHaveTitle(/Slack/i);
  });

  test('HP-004: Become Mentor section', async ({ homePage, basePage }) => {
    await expect(homePage.becomeMentorSectionTitle).toBeVisible();
    await expect(homePage.becomeMentorSectionDescription).toBeVisible();
    await expect(homePage.joinAsMentorBtn).toBeVisible();
    await basePage.clickElement(homePage.joinAsMentorBtn);

    await basePage.verifyURL('/mentorship/mentor-registration');
    await basePage.verifyPageContainsText(
      'Welcome to the MentorRegistrationPage',
    );
  });

  test('HP-005: Volunteer section', async ({ homePage, basePage }) => {
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
