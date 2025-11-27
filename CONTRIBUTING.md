# How to contribute

We are really glad you're reading this, because we need volunteer developers and testers to help this project grow.

If you haven't already, come find us in [Slack](https://bit.ly/WCC-slack-invite), join the Slack channel [#i_want_to_help](https://womencodingcommunity.slack.com/archives/C06VB8BNL86), and say hi :wave:

Or fill out [this form](https://docs.google.com/forms/d/e/1FAIpQLSew81KejeMqOhgb5-D5nTWWL3jHfkfG1VBpMBX6IXk1m-9YMw/viewform) and we contact you to enter Slack.

We want you working on things you're excited about. Check the open issues and let us know in Slack what you want to work on.

## How to submit a PR?

**1.** Start by making a Fork
of [wcc-frontend](https://github.com/Women-Coding-Community/frontend) repository.
Click on <a href="https://github.com/Women-Coding-Community/frontend/fork">
<img src="https://i.imgur.com/G4z1kEe.png" height="21" width="21"></a>
Fork symbol in the top right corner.

**2.** Clone your new fork of the repository in the terminal/CLI on your computer with the following
command:

```bash
git clone https://github.com/<your-github-username>/wcc-frontend
```

**3.** Create a branch on your fork, do your awesome stuff :star2:

**4.** Once you're happy with your changes, submit a pull request to the original repository. More information can be found in the [GitHub Docs](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)


## Testing

Despite unit tests, we use [Playwright](https://playwright.dev/) for testing the frontend with mocked data. You can find these tests under [this folder](./playwright-tests/tests/).

Both test suites (`test:e2e` for Playwright and `test` for Unit tests) run on the pipeline in all open PRs thanks to the configured [Github Actions](.github/workflows/pull_request.yml).

See our [Test Plan](./playwright-tests/docs/test_plan.md) for details on the progress on testing.

We invite you to contribute to the following areas:
* Application development;
* Planning new tests;
* Test cases implementation;
* Defects reporting;
