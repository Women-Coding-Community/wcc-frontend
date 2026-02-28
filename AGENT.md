# AGENT.md — wcc-frontend

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Platform Goal

**Women Coding Community (WCC)** is a not-for-profit organisation with the mission of empowering women in their tech careers through education, mentorship, community building, and career services.

The platform supports this by providing:

- **Mentorship Programme** — connecting women with industry mentors for long-term and ad-hoc guidance
- **Events** — online and in-person events, workshops, and conferences
- **Programmes** — Book Club, CV Clinic, Mock Interviews, LeetCode practice, Study Groups
- **Community** — Slack community, volunteer opportunities, blog, job board
- **Resources** — mentor resources, code of conduct, FAQs

The primary user journeys are:
1. A **mentee** finding and applying for a mentor
2. An experienced professional **becoming a mentor**
3. A community member **discovering events and programmes**
4. A potential **volunteer** learning how to contribute

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14.2.3 (SSR via `getServerSideProps`) |
| Language | TypeScript 5.x (strict mode) |
| UI | Material-UI (MUI) v5 |
| Package Manager | **pnpm** (required — do not use npm or yarn) |
| Node | 20+ |
| Unit Tests | Jest 29 + Testing Library |
| E2E Tests | Playwright Test v1.57 |
| Linting | ESLint + Prettier |
| Git Hooks | Husky (pre-commit: lint:fix → format → type-check) |

---

## Build and Development Commands

**Start dev server:**
```bash
pnpm dev                        # http://localhost:3000
```

**Build:**
```bash
pnpm build                      # Production build
```

**Quality checks:**
```bash
pnpm lint:fix                   # Auto-fix ESLint issues
pnpm format                     # Prettier format all files
pnpm type-check                 # TypeScript check (no emit)
```

**Unit tests (Jest):**
```bash
pnpm test                       # Run all Jest unit tests
```

**E2E tests (Playwright):**
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

## Directory Structure

```
wcc-frontend/
├── src/
│   ├── components/        # Reusable UI components (30+)
│   │   └── forms/         # Form components (TextField, CheckboxGroup, etc.)
│   ├── pages/             # Next.js pages (SSR)
│   │   ├── index.tsx      # Home page (/)
│   │   ├── mentorship/    # /mentorship/* routes
│   │   ├── about-us/      # /about-us/* routes
│   │   ├── programmes/    # /programmes/* routes
│   │   └── events/, blog/, jobs/
│   ├── lib/
│   │   ├── api.ts         # Axios API client with JSON fallback
│   │   └── responses/     # Mock JSON data (fallback when API is unavailable)
│   ├── schemas/           # Zod validation schemas
│   ├── utils/
│   │   ├── types.ts       # All TypeScript interfaces
│   │   ├── helpers.ts     # Text formatting utilities
│   │   ├── staticContent.ts
│   │   └── theme-utils.ts
│   └── theme.ts           # MUI theme
│
├── playwright-tests/
│   ├── tests/             # Spec files (*.page.spec.ts)
│   ├── pages/             # Page Object Models
│   ├── utils/
│   │   ├── fixtures.ts    # Custom Playwright fixtures
│   │   └── datafactory/   # Test data (nav items, social links, etc.)
│   ├── docs/              # Test plans and case details (*.md)
│   └── screenshots/       # Visual regression snapshots (committed to repo)
│
├── playwright.config.ts
├── jest.config.ts
├── tsconfig.json
└── .env.local             # API_BASE_URL, API_KEY
```

---

## Path Aliases (tsconfig.json)

```typescript
@components       → src/components       (barrel export via index.tsx)
@utils/*          → src/utils/* or playwright-tests/utils/*
@schemas/*        → src/schemas/*
@public/*         → public/*
@pages/*          → playwright-tests/pages/*   (page objects only)
```

---

## Architecture

### Data Flow

```
Next.js Page (getServerSideProps)
        ↓
  lib/api.ts (axios)
        ↓
  WCC Backend API          ← falls back to lib/responses/*.json if API unavailable
        ↓
  Component renders
```

### Playwright Test Architecture

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

### Using test.step

Wrap logical sub-steps with `test.step` for clear reporting. BasePage helper methods already do this internally — use them instead of writing raw `test.step` in specs:

```typescript
// Prefer this (BasePage helpers include test.step internally)
await basePage.verifyURL('/mentorship/mentors');
await basePage.verifyPageContainsText('Meet Our Mentors');

// Use test.step directly only for multi-action custom steps not covered by helpers
await test.step('Expand first testimonial card', async () => {
  await card.expandText();
  await card.toContainText('full text');
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
await expect(locator).toMatchAriaSnapshot(`- link:\n  - /url: https://...`);
```

### Visual Tests

Tag visual tests with `@visual` so they are excluded from `pnpm test:e2e` and run separately:

```typescript
test('MENT-006: Visual Test - FAQ Page', { tag: '@visual' }, async ({ page }) => {
  await page.goto('/mentorship/faqs');
  await expect(page).toHaveScreenshot('faq-page.png', { fullPage: true });
});
```

Always update snapshots via Docker: `pnpm test:e2e:docker:update`

---

## Important Conventions

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

---

## Common Development Tasks

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

1. Check `playwright-tests/docs/` for the test plan and the specific test case details
2. Identify the test ID (e.g. `HP-003`)
3. Add the test to the relevant `*.page.spec.ts` file
4. Add any new locators to the corresponding page object
5. Update the status in `playwright-tests/docs/` from Pending to Done

### Add a new spec file

1. Create `playwright-tests/tests/{name}.page.spec.ts`
2. Create the matching page object in `playwright-tests/pages/{name}.page.ts`
3. Register the fixture in `playwright-tests/utils/fixtures.ts`
4. Create test documentation in `playwright-tests/docs/test_details_{name}.md`

---

## Key Pages & Routes

| Route | Page file | Notes |
|---|---|---|
| `/` | `pages/index.tsx` | Landing page |
| `/mentorship` | `pages/mentorship/index.tsx` | FeedbackSection with show more/less |
| `/mentorship/mentors` | `pages/mentorship/mentors.tsx` | Mentor cards with tabs |
| `/mentorship/mentor-registration` | `pages/mentorship/mentor-registration.tsx` | Placeholder |
| `/mentorship/faqs` | `pages/mentorship/faqs.tsx` | FAQ accordion |
| `/about-us/volunteer` | `pages/about-us/volunteer.tsx` | |
| `/events` | `pages/events/index.tsx` | |
| `/programmes/book-club` | `pages/programmes/book-club.tsx` | |

---

## Important Component Notes

### MentorProfileCard (`src/components/MentorProfileCard.tsx`)
- Always shows: **Presentation** tab, **Skills & Support Areas** tab
- Conditionally shows: **Reviews** tab (only if `mentor.feedbackSection?.feedbacks` exists), **Resources** tab (only if `mentor.resources?.length > 0`)
- Do not assert Reviews/Resources tabs without confirming the test data includes them

### FeedbackCard — Testimonials (`/mentorship`)
- `data-testid="feedback-area"` — section wrapper
- `data-testid="feedback-card"` — individual cards
- `data-testid="feedback-show-more"` — show more/less button
- `data-testid="feedback-card-text"` — card body text
- `data-testid="feedback-card-author"` — card author line
- Button text: `+ Show more` / `- Show less`
- Author format regex: `/^.+,\s*(Mentee|Mentor)\s+\d{4}$/`

### MentorBanner (`data-testid="mentor-banner"`)
- Home page "Become a Mentor" section
- "Join as a mentor" link → `/mentorship/mentor-registration`

### Navigation header
- "Find a mentor" button (`getByRole('button', { name: 'Find a mentor' })`) — present on every page, navigates directly to `/mentorship/mentors`
- "Mentorship" button opens a dropdown with sub-pages

---

## Test IDs & Status

Full details in `playwright-tests/docs/`. Summary:

| ID | Title | Status |
|---|---|---|
| HP-001 | Join Slack button | ✅ Done |
| HP-002 | Opportunities & Programmes section | ✅ Done |
| HP-003 | Hero section | ⏳ Pending |
| HP-005 | Volunteer section | ✅ Done |
| MENT-002 | Register as Mentor | ✅ Done |
| MENT-003 | Find a Mentor | ✅ Done |
| MENT-004 | Browse Mentorship Feedback | ✅ Done |
| MENT-005 | Visual: Mentor Grid | ⏳ Not implemented |
| MENT-006 | Visual: FAQ Page | ✅ Done |
| NAV-001–019 | Navigation tests | ✅ Done |
| NAV-020/021 | Nav edge cases | ⏳ Pending |

---

## Environment Variables

```bash
# .env.local
API_BASE_URL=https://wcc-backend-dev.fly.dev/api/cms/v1
API_KEY=dev-key
```

`lib/api.ts` falls back to `lib/responses/*.json` when the API is unavailable.

---

## Git Commit Conventions

**IMPORTANT: Do NOT include AI attribution in commit messages.**

- ❌ Never add "Generated with Claude Code" or similar lines
- ❌ Never add "Co-Authored-By: Claude" tags
- ✅ Use conventional commit prefixes: `feat:`, `fix:`, `test:`, `docs:`, `refactor:`, `chore:`
- ✅ Keep messages concise, focused on the "why" not the "what"

**Example:**
```
feat: add MENT-003 find a mentor test case

Implements navigation via the header Find a mentor button and verifies
mentor cards display name, image, programming languages and tabs.
```

**Branch naming:** `feature/`, `fix/`, `test/` prefixes. PR target is always `main`.

**Pre-commit hook** (runs automatically): `pnpm lint:fix && pnpm format && pnpm type-check`

**Visual snapshots** are committed to `playwright-tests/screenshots/`. Always regenerate via Docker to avoid OS-level rendering differences.
