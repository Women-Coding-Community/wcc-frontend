# Skill: draft-pr

Gather branch context, analyse commits and changed files, then propose a pull request description that follows the project's PR template.

## When to apply

Run this workflow when the user asks to draft a PR description, prepare a pull request, or `/draft-pr`.

## Step 1 — Gather branch context

Run in parallel:

```bash
git branch --show-current                          # current branch name
git log --oneline main..HEAD                       # commits ahead of main
git diff --stat main...HEAD                        # changed files summary
git diff main...HEAD                               # full diff for analysis
```

If the branch has no commits ahead of `main`, tell the user there is nothing to propose and stop.

## Step 2 — Read the PR template

```bash
cat .github/PULL_REQUEST_TEMPLATE.md
```

Use the template structure as the exact skeleton for the output. Do not invent new sections or remove existing ones.

## Step 3 — Analyse the changes

From the commits and diff, determine:

- **What** changed — files touched, components added/modified, schemas updated, etc.
- **Why** — infer from commit messages and code context; if motivation is unclear, note it
- **Type** — map to one of the template checkboxes: Bug Fix, New Feature, Code Refactor, Documentation, Other
- **UI impact** — were any components, pages, or styles changed? If yes, mark the Screenshots section as required
- **Test coverage** — were tests added or updated? Which test files?

## Step 4 — Propose a PR title

Derive a concise PR title from the commits and changed files:

- Follow the same Conventional Commits style as the repo: `<type>: <description>`
- 50–72 characters, imperative mood, no trailing period
- If multiple commits exist, base the title on the overall intent

Present the proposed title to the user and ask for confirmation or edits before continuing.

## Step 5 — Ask about related issues and PRs

Before drafting the description, ask the user:

> Is there a related issue or pull request to link? (e.g. GitHub issue URL, issue number, or a related PR in another repo)

Wait for the user's answer. Accept:

- A GitHub issue URL (e.g. `https://github.com/org/repo/issues/123`)
- A GitHub PR URL from a related repo (e.g. `https://github.com/org/other-repo/pull/456`)
- A bare issue number (e.g. `#123`) — assume the current repo
- `none` or empty — write `N/A`

## Step 6 — Draft the PR description

Fill in every section of the template. Rules:

- **Description**: 3–6 sentences. Lead with the problem or motivation, then describe the solution. If a related backend PR or issue was provided, mention it naturally in the description (e.g. "Implements the frontend counterpart of <backend-pr-link>.").
- **Type**: Check only the boxes that apply. More than one is allowed.
- **Related Issue**: Use the issue/PR links provided by the user. If multiple, list all. If none, write `N/A`.
- **Screenshots**: If UI files were changed, write `⚠️ Screenshots required — add before/after images before opening the PR.` If no UI changes, write `N/A — no visual changes.`
- **Testing**: List what was tested: unit tests added/updated, manual testing steps performed. Reference specific test files when relevant.
- **Pull request checklist**: Pre-fill the checkboxes that can be confirmed from the diff (e.g. unit tests present); leave unchecked items the developer must verify manually.

Present the full draft to the user as a markdown code block so it can be copy-pasted directly into GitHub.

## Step 7 — Offer to open the PR

After presenting the draft, ask the user:

> Would you like me to open the PR now using `gh pr create`?

If yes, run:

```bash
gh pr create \
  --title "<subject from first commit or branch name>" \
  --body "$(cat <<'EOF'
<filled-in PR description>
EOF
)" \
  --base main \
  --repo Women-Coding-Community/wcc-frontend
```

## Rules

- Never fabricate issue numbers or PR links — only use what the user provides or what appears in commits/branch name
- Always propose the PR title and ask about related issues before drafting the description
- Always present the full draft before running `gh pr create`
- If the branch name suggests a ticket number (e.g. `feat/123-something`), pre-fill it in Related Issue but still ask the user to confirm
- Screenshots section must prompt the developer when any component, page, or style file was changed
