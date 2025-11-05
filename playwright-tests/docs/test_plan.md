# Test Plan

This is an overview of the playwright tests planned for this repository.

**Want to let us know you'll be working in one of these in the future?** Open a PR to edit this file changing the `Assigned to` column with your name and Github link. Start a conversation with [@nora-weisser](https://github.com/nora-weisser) on the issue assigned in case you have questions.

**Want to add/modify one of the tests in the list?** Open a PR with your editing, sharing details in another page, and add [@nora-weisser](https://github.com/nora-weisser) as a reviewer, so she can also link the new/modified test with an issue.

## Navigation Menu

| Test Case ID | Status | Assigned to  | Issue  | Pull Request |
| ------------ | ------ | ------------ | ------ | ------------ |
| [NAV-001](./test_details_navigation.md#nav-001) | Done :white_check_mark:  |  |  | |
| [NAV-002](./test_details_navigation.md#nav-002) | Done :white_check_mark:  |  |  | |
| [NAV-003](./test_details_navigation.md#nav-003) | Done :white_check_mark:  |  |  | |
| [NAV-004](./test_details_navigation.md#nav-004) | Done :white_check_mark:  |  |  | |
| [NAV-005](./test_details_navigation.md#nav-005) | Done :white_check_mark:  |  | [NAV-005: Validate Find a mentor Button](https://github.com/Women-Coding-Community/wcc-frontend/issues/101) | |
| [NAV-006](./test_details_navigation.md#nav-006) | Pending :x:              |  | [NAV-006: Validate Logo Click Navigation](https://github.com/Women-Coding-Community/wcc-frontend/issues/102) | |
| [NAV-007](./test_details_navigation.md#nav-007) | Pending :x:              | [@Purnima](https://github.com/?) | [NAV-007: Validate Mentorship Dropdown Hover](https://github.com/Women-Coding-Community/wcc-frontend/issues/103) | |
| [NAV-008](./test_details_navigation.md#nav-008) | Pending :x:              | [@Mioara](https://github.com/Mioara82) | [NAV-008: Validate Mentorship Dropdown Items Navigation](https://github.com/Women-Coding-Community/wcc-frontend/issues/104) | |
| [NAV-009](./test_details_navigation.md#nav-009) | Pending :x:              | [@Purnima](https://github.com/?) | [NAV-009: Validate Programmes Dropdown Hover](https://github.com/Women-Coding-Community/wcc-frontend/issues/105) | |
| [NAV-010](./test_details_navigation.md#nav-010) | Pending :x:              | [@Isabel](https://github.com/117Isabell) | [NAV-010: Validate Programmes Dropdown Items Navigation](https://github.com/Women-Coding-Community/wcc-frontend/issues/106) | |
| [NAV-011](./test_details_navigation.md#nav-011) | Pending :x:              | [@Purnima](https://github.com/?) | [NAV-011: Validate About Us Dropdown Hover](https://github.com/Women-Coding-Community/wcc-frontend/issues/107) | |
| [NAV-012](./test_details_navigation.md#nav-012) | Done :white_check_mark:  |  |  | |


## Home Page

| Test Case ID | Title                        | Description                                               | Expected Result                                             |
| ------------ | ---------------------------- | --------------------------------------------------------- | ----------------------------------------------------------- |
| HP-001       | "Join our Slack" button      | Click on the "Join our Slack" button.                     | User is redirected to the Slack invitation page.            |
| HP-002       | Opportunities and Programmes | Verify Title and Description. Click on each program link  | Each link redirects to the respective program page.         |
| HP-003       | Latest Events Section        | Verify Events Card information                            | Event details pages are displayed with correct information. |
| HP-004       | Event Registration Link      | Click on the "View meetup event" link.                    | User is redirected to the event registration page.          |
| HP-005       | Become a Mentor              | Verify Description and the Title, click on Join as Mentor | User is redirected to Mentor Registration Page.             |
| HP-006       | Volunteer Section            | Verify Description and Title, click on the button         | User is redirected to Volunteer Page.                       |

## Mentorship Overview

| Test Case ID | Title                        | Description                                                                       | Expected Result                                                           |
| ------------ | ---------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| MENT-001     | Page Accessibility           | Navigate to https://www.womencodingcommunity.com/mentorship.                      | The page loads successfully                                               |
| MENT-002     | Content Visibility           | Scroll through the page to check for the presence and visibility of each section. | All sections are present, properly formatted. Right content is displayed. |
| MENT-003     | Mentor Application Link      | Click on the "Join as a mentor" link.                                             | User is redirected to the mentor application form.                        |
| MENT-004     | Mentee Application Link      | Click on the "Check our mentors" link.                                            | User is redirected to the mentors listing page.                           |
| MENT-005     | Feedback Section             | Verify title and cards                                                            | All cards and title are displayed correctly.                              |
| MENT-006     | Show more, Show less buttons | Click on Show more button                                                         | Space with the cards is expanded, show less button is displayed.          |
