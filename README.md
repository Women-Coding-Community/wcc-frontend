<div style="display: flex; justify-content:center; padding-bottom: 50px">
  <img src="public/logo_white.png" alt="WCC Logo White" width="200" height="200">
</div>

# WCC Frontend Application

This is the FE application (NextJS) for Women Coding Community website.

## Requirements

- Node (18+)
- [Pnpm](https://pnpm.io/) (v9+)

If you don't have pnpm you can install it with npm running

```bash
npm install -g pnpm
```

## Installation

Install project dependencies

```bash
  pnpm install
```

## Development

You can run the application using

```bash
  pnpm dev
```

## Contribution

You can run these commands pre-commit, but the application uses husky which will run
checks before you can commit.

```bash
  pnpm lint:fix && pnpm format && pnpm type-check
```

TODO: add contribution rules in contribution.md
