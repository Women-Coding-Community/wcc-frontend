---
name: draft-pr
description: Analyse commits and changed files on the current branch against main, then propose a pull request description following the project PR template. Use when asked to draft a PR, prepare a pull request description, or /draft-pr.
---

> **Scope**: Local — wcc-frontend only

# Draft PR

> **Canonical runbook**: `.ai/skills/draft-pr.md`
> This file is the Claude Code adapter. The workflow logic is defined in the canonical skill
> so it can be shared with other agents (Codex, Copilot, Cursor). Any changes to the workflow
> should be made in `.ai/skills/draft-pr.md` first.

## Workflow

1. Gather branch context — run in parallel:
   - `git branch --show-current` — current branch name
   - `git log --oneline main..HEAD` — commits ahead of main
   - `git diff --stat main...HEAD` — changed files summary
   - `git diff main...HEAD` — full diff for analysis

   If there are no commits ahead of `main`, tell the user there is nothing to propose and stop.

2. Read the PR template:
   - `cat .github/PULL_REQUEST_TEMPLATE.md`

3. Analyse the changes to determine:
   - What changed and why (infer from commit messages and diff)
   - PR type: Bug Fix / New Feature / Code Refactor / Documentation / Other
   - Whether any UI files (components, pages, styles) were changed → Screenshots required
   - Which tests were added or updated

4. Propose a PR title derived from the commits and branch:
   - Format: `<type>: <description>` — 50–72 chars, imperative mood, no trailing period
   - Present it to the user and ask for confirmation or edits before continuing.

5. Ask about related issues and PRs before drafting:

   > Is there a related issue or pull request to link? (e.g. GitHub issue URL, issue number, or a related PR in another repo)

   Accept: full GitHub URLs, bare issue numbers (`#123`), or `none`. Wait for the answer.

6. Draft the PR description filling in **every section** of the template:
   - **Description**: 3–6 sentences — start with the problem/motivation, then the solution. If a related backend PR or issue was provided, mention it naturally (e.g. "Implements the frontend counterpart of <link>.").
   - **Type**: Check all boxes that apply.
   - **Related Issue**: Use links/numbers provided by the user. List all if multiple. `N/A` if none.
   - **Screenshots**: If any `.tsx`, `.css`, or page file was changed → `⚠️ Screenshots required — add before/after images before opening the PR.` Otherwise → `N/A — no visual changes.`
   - **Testing**: List unit tests added/updated (with file paths) and manual testing steps.
   - **Pull request checklist**: Pre-check items confirmed from the diff; leave the rest for the developer.

   Present the full draft inside a markdown code block so the user can copy-paste it directly into GitHub.

7. After presenting the draft, ask:

   > Would you like me to open the PR now using `gh pr create`?

   If yes:

   ```bash
   gh pr create \
     --title "<derived from commits or branch name>" \
     --body "$(cat <<'EOF'
   <filled-in PR description>
   EOF
   )" \
     --base main \
     --repo Women-Coding-Community/wcc-frontend
   ```

## Rules

- Never fabricate issue numbers or PR links — only use what the user provides or what appears in commits/branch name
- Always propose the title and ask about related issues **before** drafting the description
- If the branch name contains a ticket/issue number (e.g. `feat/123-something`), pre-fill it but still ask the user to confirm
- Always show the full draft to the user beforeit w running `gh pr create`
- Screenshots section must prompt the developer whenever any `.tsx`, `.css`, or page file was changed
