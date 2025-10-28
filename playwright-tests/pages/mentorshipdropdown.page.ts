import { Locator, Page } from '@playwright/test';

import { BasePage } from '@pages/base.page';

export class MentorshipDropdownPage extends BasePage {
  readonly mentorshipMenu: Locator;
  readonly mentorshipSubItems: Locator;

  
  constructor(page: Page) {
    super(page);
    this.mentorshipMenu = page.locator('nav >> text=Mentorship');
    this.mentorshipSubItems = page.locator('nav >> text=Mentorship >> .. >> ul li');
  }
  async goto() {
    await this.page.goto('/');
  }

  async openMentorshipMenu() {
    await this.mentorshipDropdown.click();
  }
   async countMentorshipItems(): Promise<number> {
    return await this.mentorshipSubItems.count();
  }
}