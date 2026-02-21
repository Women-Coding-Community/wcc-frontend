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

  test('HP-002: Opportunities and Programmes section', async ({
    homePage,
    basePage,
    page,
  }) => {
    await expect(homePage.mainHeading).toBeVisible();
    await expect(homePage.mainText).toBeVisible();
    await homePage.clickElement(homePage.mentorshipLink);
    await basePage.verifyURL('/mentorship');
    await page.goto('/');
    await homePage.clickElement(homePage.eventsLink);
    await basePage.verifyURL('/events');
    await page.goto('/');
    await homePage.clickElement(homePage.bookClubLink);
    await basePage.verifyURL('/programmes/book-club');
    await page.goto('/');
    await homePage.clickElement(homePage.CvClinicLink);
    await basePage.verifyURL('/programmes/cv-clinic');
    await page.goto('/');
    await homePage.clickElement(homePage.mockInterviewsLink);
    await homePage.verifyURL('/programmes/interviews');
    await page.goto('/');
    await homePage.clickElement(homePage.leetCodeLink);
    await homePage.verifyURL('/programmes/leetcode');
  });

  test('HP-003: Verify Events Card information and CTA link', async ({
    page,
    homePage,
  }) => {
    await test.step('Verify events section is visible', async () => {
      await homePage.eventsSection.verifySectionVisible();
    });

    await test.step('Verify event card displays all required information', async () => {
      const eventCard = homePage.eventsSection.getEventCard(0);
      await eventCard.verifyCardStructure();
    });

    await test.step('Verify CTA button opens external link', async () => {
      const eventCard = homePage.eventsSection.getEventCard(0);
      const newPage = await eventCard.clickCtaAndWaitForNewPage();

      const url = newPage.url();
      const isValidDomain =
        url.includes('github.com') || url.includes('meetup.com');
      expect(isValidDomain).toBeTruthy();

      await newPage.close();
      await page.bringToFront();
    });

    await test.step('Verify "View all events" link navigates to events page', async () => {
      await homePage.eventsSection.clickViewAllEventsLink();
      await homePage.verifyURL('/events');
    });
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
    await expect(homePage.volunteerSectionDescription).toBeVisible();
    await expect(homePage.learnMoreVolunteerBtn).toBeVisible();
    await basePage.clickElement(homePage.learnMoreVolunteerBtn);

    await basePage.verifyURL('/about-us/volunteer');
    await basePage.verifyPageContainsText('Welcome to the VolunteerPage');
  });
});
