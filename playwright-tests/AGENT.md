# AGENT.md — playwright-tests

This file provides guidance to Claude Code when working inside `playwright-tests/`. It extends the root `AGENT.md` — read that first for platform context, tech stack, and git conventions.

---

## E2E Test Commands

```bash
pnpm test:e2e                           # All E2E tests, excludes @visual
pnpm test:e2e:docker                    # Run E2E in Docker
pnpm test:e2e:docker:update             # Update visual snapshots (always use Docker for this)

npx playwright test <file>              # Run a specific spec file
npx playwright test --grep "MENT-003"   # Run by test name/ID
npx playwright test --grep @visual      # Run only visual tests
npx playwright test --ui                # Interactive UI mode
npx playwright show-report              # Open last HTML report
```

---

## Playwright Config

- **Base URL:** `http://localhost:3000` (or `BASE_URL` env var)
- **Browser:** Chromium, viewport 1280×720
- **Test dir:** `playwright-tests/tests/`
- **Snapshot dir:** `playwright-tests/screenshots/`
- **Web server:** auto-starts `pnpm dev` locally; skipped on CI
- **Retries:** 0 local, 2 on CI
- **Workers:** unlimited local, 1 on CI
- **Trace:** on first retry

---

## Directory Structure

```
playwright-tests/
├── tests/             # Spec files (*.page.spec.ts)
├── pages/             # Page Object Models (extend BasePage)
├── utils/
│   ├── fixtures.ts    # Custom Playwright fixtures (provides page object instances)
│   └── datafactory/   # Test data arrays (nav items, social links, etc.)
├── docs/              # Test plans and case details
│   ├── test_plan.md               # Overview table of all test cases + status
│   ├── test_details_navigation.md
│   ├── test_details_home_page.md
│   └── test_details_mentorship.md
└── screenshots/       # Visual regression snapshots (committed to repo)
```

---

## Test Architecture

```
Test Spec (*.page.spec.ts)
        ↓
  Custom Fixtures (fixtures.ts)   ← provides page object instances
        ↓
  Page Object (extends BasePage)
        ↓
  BasePage (common locators + helper methods)
```

---

## Testing Patterns

### Imports

Always import `test` from the custom fixtures, `expect` from Playwright:

```typescript
import { expect } from '@playwright/test';
import { test } from '@utils/fixtures';
```

### Test Structure

```typescript
test.describe('Validate Mentorship Page', () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.navigateToPath('/mentorship');
  });

  test('MENT-003: Find a Mentor', async ({ mentorshipPage, basePage }) => {
    await basePage.clickElement(basePage.findMentorButton);

    await basePage.verifyURL('/mentorship/mentors');
    await expect(mentorshipPage.mentorsPageTitle).toBeVisible();
    await expect(mentorshipPage.mentorNames.first()).toBeVisible();
  });
});
```

### Loops with test.step

When a test iterates over a data set, use a single `test` with a `for...of` loop and `test.step` per item — do not generate multiple tests with `forEach`:

```typescript
test('NAV-004: Mentorship Dropdown Navigation', async ({ basePage }) => {
  for (const { name, expectedURL } of mentorshipMenuItems) {
    await test.step(`Navigate to Mentorship > ${name}`, async () => {
      await basePage.navigateToPath('/');
      await basePage.clickElement(basePage.mentorshipDropdown);
      await basePage.clickElement(basePage.menuitem(name));
      await basePage.verifyURL(expectedURL);
    });
  }
});
```

### Assertions

Use Playwright's built-in web-first assertions — they auto-wait:

```typescript
await expect(locator).toBeVisible();
await expect(locator).toHaveText('exact text');
await expect(locator).toContainText('partial');
await expect(locator).toHaveCount(3);
await expect(locator).not.toBeEmpty();
await expect(locator).toHaveURL('/path');
```

### Visual Tests

Tag visual tests with `@visual` so they are excluded from `pnpm test:e2e` and run separately:

```typescript
test(
  'MENT-005: Visual Test - FAQ Page',
  { tag: '@visual' },
  async ({ page }) => {
    await page.goto('/mentorship/faqs');
    await expect(page).toHaveScreenshot('faq-page.png', { fullPage: true });
  },
);
```

Always update snapshots via Docker: `pnpm test:e2e:docker:update`

---

## Conventions

### Locator Priority (most to least preferred)

1. `getByRole()` — primary, most accessible and resilient
2. `getByTestId()` — for components that have `data-testid` attributes
3. `getByAltText()` — for images
4. `getByText()` — for non-interactive visible text
5. CSS selectors / XPath — avoid unless nothing else works

### Page Object Rules

- All page objects extend `BasePage`
- Declare all locators as `readonly` in the constructor
- Use scoped locators where possible (e.g. `feedbackArea.getByTestId('feedback-card')`)
- Expose component sub-objects (e.g. `TestimonialCard`) as methods that return a typed object — not raw locators
- Helper methods should use `test.step()` internally for reporting

### Test Organisation Rules

- One `test.describe` block per page/feature
- Use `test.beforeEach` for navigation shared across all tests in a describe block
- Do not navigate inside individual tests when `beforeEach` already handles it
- Each test should cover one user goal, not multiple unrelated assertions
- Use a single test with a `for...of` loop (not `forEach`) for data-driven checks

---

## Common Tasks

### Add a new page object

1. Create `playwright-tests/pages/{name}.page.ts`
2. Extend `BasePage`, declare all locators as `readonly` in the constructor
3. Add the fixture to `playwright-tests/utils/fixtures.ts`
4. Import and use in spec files via the fixture

```typescript
// playwright-tests/pages/events.page.ts
import { Locator, Page } from '@playwright/test';
import { BasePage } from '@pages/base.page';

export class EventsPage extends BasePage {
  readonly pageTitle: Locator;

  constructor(page: Page) {
    super(page);
    this.pageTitle = page.getByRole('heading', { name: 'Events' });
  }
}
```

### Add a new test case

1. Check `playwright-tests/docs/` for the test plan and specific test case details
2. Identify the test ID (e.g. `HP-003`)
3. Add the test to the relevant `*.page.spec.ts` file
4. Add any new locators to the corresponding page object
5. Update the status in `playwright-tests/docs/test_plan.md` and the detail file from ⏳ to ✅

### Add a new spec file

1. Create `playwright-tests/tests/{name}.page.spec.ts`
2. Create the matching page object in `playwright-tests/pages/{name}.page.ts`
3. Register the fixture in `playwright-tests/utils/fixtures.ts`
4. Create test documentation in `playwright-tests/docs/test_details_{name}.md`
5. Add the new test cases to `playwright-tests/docs/test_plan.md`

---

## Component Notes

### FeedbackCard — Testimonials (`/mentorship`)

- `data-testid="feedback-area"` — section wrapper
- `data-testid="feedback-card"` — individual cards
- `data-testid="feedback-show-more"` — show more/less button
- `data-testid="feedback-card-text"` — card body text
- `data-testid="feedback-card-author"` — card author line
- Button text: `+ Show more` / `- Show less`
- Author format regex: `/^.+,\s*(Mentee|Mentor)\s+\d{4}$/`

### MentorProfileCard (`src/components/MentorProfileCard.tsx`)

- Always shows: **Presentation** tab, **Skills & Support Areas** tab
- Conditionally shows: **Reviews** tab (only if `mentor.feedbackSection?.feedbacks` exists), **Resources** tab (only if `mentor.resources?.length > 0`)
- Do not assert Reviews/Resources tabs without confirming the test data includes them

### MentorBanner (`data-testid="mentor-banner"`)

- Home page "Become a Mentor" section
- "Join as a mentor" link → `/mentorship/mentor-registration`

### Navigation header

- "Find a mentor" button (`getByRole('button', { name: 'Find a mentor' })`) — present on every page, navigates directly to `/mentorship/mentors`
- "Mentorship" button opens a dropdown with sub-pages

---

## Test IDs & Status

Full details in `playwright-tests/docs/`.
