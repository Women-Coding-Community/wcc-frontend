<div style="display: flex; justify-content:center; padding-bottom: 50px">
  <img src="public/logo_white.png" alt="WCC Logo White" width="200" height="200">
</div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Issues][issues-shield]][issues-url]
[![Stargazers][stars-shield]][stars-url]

[contributors-shield]: https://img.shields.io/github/contributors/women-coding-community/wcc-frontend.svg
[contributors-url]: https://github.com/women-coding-community/wcc-frontend/pulse/contributors
[forks-shield]: https://img.shields.io/github/forks/women-coding-community/wcc-frontend.svg
[forks-url]: https://github.com/women-coding-community/wcc-frontend/network/members
[issues-shield]: https://img.shields.io/github/issues/women-coding-community/wcc-frontend.svg
[issues-url]: https://github.com/women-coding-community/wcc-frontend/issues
[stars-shield]: https://img.shields.io/github/stars/women-coding-community/wcc-frontend.svg
[stars-url]: https://github.com/women-coding-community/wcc-frontend/stargazers

# WCC Frontend Application

This is the FE application (NextJS) for Women Coding Community website.

## How to contribute?

See our [Contributing](./CONTRIBUTING.md) page.

## Requirements for running on your machine

- Node (20+)
- [Pnpm](https://pnpm.io/) (v9+)

If you don't have node, go to [their downloads page](https://nodejs.org/en/download).

If you don't have pnpm you can install it with npm running

```bash
npm install -g pnpm@9
```

Then, install project dependencies

```bash
  pnpm install
```

Next, create an `.env.local` file in your root folder. In this file please paste the following:

```
API_BASE_URL=https://wcc-backend.fly.local/api/cms/v1
API_KEY={your_local_api_key}
```

This will allow your local to connect to the backend, if you don't yet have an API_KEY please send a message via our dedicated Slack channel. This will never be committed to the github repository.

Now you can run the application using

```bash
  pnpm dev
```

You can run also these commands pre-commit for your peace of mind. The application uses husky, which will run these same checks before you can commit.

```bash
  pnpm lint:fix && pnpm format && pnpm type-check
```
