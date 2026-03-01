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

| Layer           | Technology                                         |
| --------------- | -------------------------------------------------- |
| Framework       | Next.js 14.2.3 (SSR via `getServerSideProps`)      |
| Language        | TypeScript 5.x (strict mode)                       |
| UI              | Material-UI (MUI) v5                               |
| Package Manager | **pnpm** (required — do not use npm or yarn)       |
| Node            | 20+                                                |
| Unit Tests      | Jest 29 + Testing Library                          |
| E2E Tests       | Playwright Test v1.57                              |
| Linting         | ESLint + Prettier                                  |
| Git Hooks       | Husky (pre-commit: lint:fix → format → type-check) |

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

**E2E tests (Playwright) — see `playwright-tests/AGENT.md` for full details:**

```bash
pnpm test:e2e                   # All E2E tests, excludes @visual
pnpm test:e2e:docker            # Run E2E in Docker
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
├── playwright-tests/      # E2E tests — see playwright-tests/AGENT.md
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

---

## Key Pages & Routes

| Route                             | Page file                                  | Notes                               |
| --------------------------------- | ------------------------------------------ | ----------------------------------- |
| `/`                               | `pages/index.tsx`                          | Landing page                        |
| `/mentorship`                     | `pages/mentorship/index.tsx`               | FeedbackSection with show more/less |
| `/mentorship/mentors`             | `pages/mentorship/mentors.tsx`             | Mentor cards with tabs              |
| `/mentorship/mentor-registration` | `pages/mentorship/mentor-registration.tsx` | Placeholder                         |
| `/mentorship/faqs`                | `pages/mentorship/faqs.tsx`                | FAQ accordion                       |
| `/about-us/volunteer`             | `pages/about-us/volunteer.tsx`             |                                     |
| `/events`                         | `pages/events/index.tsx`                   |                                     |
| `/programmes/book-club`           | `pages/programmes/book-club.tsx`           |                                     |

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
