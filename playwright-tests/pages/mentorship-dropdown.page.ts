import { Locator, Page } from '@playwright/test';

import { BasePage } from '@pages/base.page';

export class MentorshipDropdownPage extends BasePage {
  readonly mentorshipDropdown: Locator;
  readonly overviewMenu: Locator;
  readonly mentorsMenu: Locator;
  readonly studyGroupsMenu: Locator;
  readonly mentorRegistrationMenu: Locator;
  readonly menteeRegistrationMenu: Locator;
  readonly resourcesMenu: Locator;
  readonly codeofconductMenu: Locator;
  readonly faqMenu: Locator;
  readonly longtermtimelineMenu: Locator;
  readonly adhoctimelineMenu: Locator;
  readonly menuitem: (itemTitle: string) => Locator;

  constructor(page: Page) {
    super(page);
    this.mentorshipDropdown = page.getByRole('button', { name: 'Mentorship' });
    this.overviewMenu = page.getByRole('menuitem', { name: 'Overview' });
    this.mentorsMenu = page.getByRole('menuitem', { name: 'Mentors' });
    this.studyGroupsMenu = page.getByRole('menuitem', { name: 'Study Groups' });
    this.mentorRegistrationMenu = page.getByRole('menuitem', {
      name: 'Mentor Registration',
    });
    this.menteeRegistrationMenu = page.getByRole('menuitem', {
      name: 'Mentee Registration',
    });
    this.resourcesMenu = page.getByRole('menuitem', { name: 'Resources' });
    this.codeofconductMenu = page.getByRole('menuitem', {
      name: 'Code Of Conduct',
    });
    this.faqMenu = page.getByRole('menuitem', { name: 'FAQ' });
    this.longtermtimelineMenu = page.getByRole('menuitem', {
      name: 'Long-Term Timeline',
    });
    this.adhoctimelineMenu = page.getByRole('menuitem', {
      name: 'Ad-Hoc Timeline',
    });
    this.menuitem = (itemTitle: string) => page.getByRole('menuitem', { name: itemTitle });
  }
  async goto() {
    await this.page.goto('/');
  }

  async openMentorshipMenu() {
    await this.mentorshipDropdown.click();
  }
}


