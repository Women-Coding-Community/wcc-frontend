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
