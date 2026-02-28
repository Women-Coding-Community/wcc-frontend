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
    const newPagePromise = page.waitForEvent('popup');
    await homePage.joinSlackButton.click();
    const newPage = await newPagePromise;

    expect(newPage.url()).toContain('womencodingcommunity.slack.com');
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
    await basePage.verifyPageContainsText('Mentorship Programme');
    await page.goto('/');
    await homePage.clickElement(homePage.eventsLink);
    await basePage.verifyURL('/events');
    await basePage.verifyPageContainsText('Welcome to the EventsPage');
    await page.goto('/');
    await homePage.clickElement(homePage.bookClubLink);
    await basePage.verifyURL('/programmes/book-club');
    await basePage.verifyPageContainsText('Welcome to the BookClubPage');
    await page.goto('/');
    await homePage.clickElement(homePage.CvClinicLink);
    await basePage.verifyURL('/programmes/cv-clinic');
    await basePage.verifyPageContainsText('404 - Not found'); // not implemented yet
    await page.goto('/');
    await homePage.clickElement(homePage.mockInterviewsLink);
    await homePage.verifyURL('/programmes/interviews');
    await basePage.verifyPageContainsText('404 - Not found'); // not implemented yet
    await page.goto('/');
    await homePage.clickElement(homePage.leetCodeLink);
    await homePage.verifyURL('/programmes/leetcode');
    await basePage.verifyPageContainsText('404 - Not found'); // not implemented yet
  });

  test('HP-005: Volunteer section', async ({ homePage, basePage }) => {
    await basePage.clickElement(homePage.learnMoreVolunteerBtn);

    await basePage.verifyURL('/about-us/volunteer');
    await basePage.verifyPageContainsText('Welcome to the VolunteerPage');
  });
});
