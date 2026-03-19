# CLAUDE.md — wcc-frontend

## Project

Next.js 14 frontend for the Women Coding Community website. Uses TypeScript, MUI, React Hook Form, and Zod.

Package manager: **pnpm** (>=9). Node >=20 required.

## Common commands

```bash
pnpm dev          # start dev server
pnpm test         # run Jest unit tests
pnpm lint         # ESLint check
pnpm lint:fix     # ESLint auto-fix
pnpm format       # Prettier format all files
pnpm type-check   # TypeScript check (no emit)
pnpm test:e2e     # Playwright e2e (non-visual)
```

## Pre-commit hook

`.husky/pre-commit` runs `pnpm test` automatically before every commit. All tests must pass or the commit is blocked. Never skip hooks with `--no-verify`.

## Code style

Formatting is enforced by **Prettier** (`eslint-plugin-prettier`) and **ESLint** as a single pipeline — violations are hard errors.

### Prettier (`.prettierrc`)

| Option          | Value   |
| --------------- | ------- |
| `singleQuote`   | `true`  |
| `semi`          | `true`  |
| `trailingComma` | `"all"` |
| `printWidth`    | `80`    |
| `tabWidth`      | `2`     |

### ESLint (`.eslintrc.json`)

- Import order enforced: builtin → external → internal → parent → sibling → index, alphabetized, newline between groups.
- Unused imports are a hard error (`unused-imports/no-unused-imports`).
- Unused vars are a warning; prefix with `_` to suppress.
- `no-console` is a warning.
- `prettier/prettier` is a hard error.

## Testing conventions

- Use `globalThis.fetch` (not `global.fetch`) when mocking fetch in tests — `globalThis` is the cross-platform ECMAScript standard.
- Test files live in `__tests__/` directories alongside the code they test.
- Use Jest + `@testing-library/react` for unit/component tests.
- Use Playwright for e2e tests (in `playwright-tests/`; excluded from ESLint).

## AI Skills and Workflows

This project includes custom AI skills (workflows) for common development tasks. These are available in both `.ai/skills/` (canonical definitions) and `.claude/skills/` (Claude Code adapters).

### Available Skills

**Code Review & Quality:**

- `/commit` — Safe commit workflow with sensitive data detection and conventional commit messages
- `/pre-commit-review` — Run `pnpm lint:fix && pnpm format && pnpm type-check`, then review local changes with severity levels and inline suggestions
- `/pr-review` — Review GitHub PRs with inline comments on exact changed lines

**Issue Management:**

- `/wcc-create-issue` — Create GitHub issues in Women-Coding-Community/wcc-frontend with proper project board fields
- `/wcc-smart-issue` — Create rich GitHub issues with user stories, acceptance criteria, test scenarios, and code examples from the codebase

### Skill Locations

- `.ai/skills/` — Canonical skill definitions (agent-agnostic)
- `.claude/skills/` — Claude Code skill adapters

### Usage

Skills are invoked by typing `/` followed by the skill name (e.g., `/commit`, `/pr-review`). They follow the patterns and conventions defined in this project.

## Git Commit Conventions

**IMPORTANT: DO NOT include AI attribution in commit messages**

When creating commits:

- ❌ **NEVER** add "Generated with Claude Code" or similar AI attribution lines
- ❌ **NEVER** add "Co-Authored-By: Claude" or AI co-author tags
- ✅ Use standard conventional commit format: `feat:`, `fix:`, `docs:`, etc.
- ✅ Keep commit messages concise and focused on the "why" rather than the "what"
- ✅ Follow the existing commit style in the repository

**Pre-commit checklist:**

1. Run `pnpm test` — all tests must pass (enforced by pre-commit hook)
2. Run `pnpm lint` — fix any linting errors
3. Run `pnpm type-check` — fix any TypeScript errors

**Example of correct commit message:**

```
feat: add skill validation to mentee registration form

Implement Zod schema validation for skills array to ensure mentees
select at least one skill during registration.
```
