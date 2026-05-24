---
name: wcc-smart-issue
description: Interactively create a well-structured GitHub issue (bug or feature) for Women-Coding-Community/wcc-frontend with Scrum user story, acceptance criteria, test scenarios, and code examples derived from the codebase. Adds the issue to the Frontend Platform project board.
argument-hint: '[title] or describe the issue interactively'
allowed-tools: Bash(gh *), Grep, Glob, Read
---

# WCC Smart Issue Creator

Create a richly structured GitHub issue using Scrum conventions, with acceptance criteria and test scenarios auto-generated from the title and requirements. Searches the codebase for relevant code examples to include in the issue body.

> **Critical**: Always use `Women-Coding-Community/wcc-frontend` as the repo. Never create issues in `dricazenck/wcc-frontend` (that is the user's fork).

## Load project configuration

Load [project-config.md](../wcc-create-issue/project-config.md) before starting — it contains all field IDs, option IDs, labels, and milestones.

---

## Step 1 — Determine issue type and title

If `$ARGUMENTS` was provided, use it as the issue title and infer the type from the prefix (`feat:` → feature, `bug:` / `fix:` → bug). Otherwise ask:

> **What type of issue is this?**
>
> 1. Feature / Enhancement
> 2. Bug Report

Then ask for the issue **title** (with the appropriate prefix):

- Feature: `feat: <short description>`
- Bug: `bug: <short description>`

---

## Step 2 — Gather requirements interactively

Ask the user for the core requirements in plain language. Prompt:

> Describe the requirement(s) in a few sentences. What should be implemented (or fixed)? Who is the user? What is the expected outcome?

Keep asking clarifying questions until you have enough to write clear ACs. At minimum collect:

- The **actor** (who benefits: e.g. admin user, community member, API consumer)
- The **goal** (what they want to achieve)
- The **benefit** (why it matters / what problem it solves)
- For bugs: **steps to reproduce**, **current behavior**, **expected behavior**, **impact level**

---

## Step 3 — Search codebase for relevant code

Use `Grep` and `Glob` to find code relevant to the issue. Focus on:

- Pages in `src/pages/`
- Components in `src/components/`
- API hooks/services in `src/services/` or `src/api/`
- Schemas and validation in `src/schemas/`
- Utilities in `src/utils/`
- Existing tests in `src/**/__tests__/` or `*.test.tsx` files
- Playwright e2e tests in `playwright-tests/`

Use the findings to:

1. Identify the **exact files and components** most likely to change
2. Extract a short **code snippet** (5–20 lines) as a "relevant code" reference
3. Suggest a **possible solution approach** aligned with existing patterns (Pages → Components → Hooks/Services)

---

## Step 4 — Generate the issue body

### For a Feature issue

Build the body using this template (fill in all sections):

````markdown
## User Story

As a **[actor]**, I want **[goal]**, so that **[benefit]**.

## Context

[2–4 sentences explaining why this feature is needed, the problem it solves, and any relevant background.]

## Requirements

- [Bullet-point list of concrete requirements derived from the conversation]

## Acceptance Criteria

> Written in Gherkin / Given-When-Then format. Each AC maps to one observable behaviour.

- [ ] **AC1** — Given [precondition], when [action], then [expected outcome]
- [ ] **AC2** — Given [precondition], when [action], then [expected outcome]
- [ ] **AC3** — Given [precondition], when [action], then [expected outcome]
<!-- Add more ACs as needed — aim for 3–6 -->

## Test Scenarios

> Cover both happy paths and edge/error cases.

**Unit Tests**

- [ ] `[ComponentName].test.tsx` — Given [setup], when [component renders/action occurs], then [assertion] (e.g. renders correct elements, calls handler)
- [ ] `[ComponentName].test.tsx` — Given [invalid props/state], when [component renders], then [error handling works correctly]

**E2E Tests (Playwright)**

- [ ] `[feature].spec.ts` — Given [page state], when [user interaction], then [expected UI state/navigation]
- [ ] `[feature].spec.ts` — Given [error condition], when [user action], then [error message displayed]

## Possible Solution

[Describe the suggested implementation approach referencing the Next.js architecture (Pages → Components → Hooks/Services). Include which files/components are likely to change.]

**Relevant existing code:**

```typescript
// File: src/[path]/[ComponentName].tsx
[Short code snippet showing the relevant pattern to follow or extend]
```
````

## Dependencies

[Other issues or PRs this depends on, or "None"]

````

---

### For a Bug issue

Build the body using this template:

```markdown
## Bug Description

[Clear, concise description of the bug and its impact.]

## Steps to Reproduce

1. [Step 1]
2. [Step 2]
3. [Step 3 — observe the bug]

## Current Behaviour

[What actually happens]

## Expected Behaviour

[What should happen instead]

## Impact

- [ ] Critical — blocks core functionality
- [ ] Major — degrades a key feature
- [ ] Minor — cosmetic or edge-case issue

## Acceptance Criteria

> The bug is fixed when ALL of the following are true:

- [ ] **AC1** — Given [reproduction precondition], when [action], then [correct behaviour observed]
- [ ] **AC2** — Given [the fix is applied], when [edge case], then [no regression in related functionality]
- [ ] **AC3** — [Any additional observable fix criterion]

## Test Scenarios

**Regression Tests (must be added)**
- [ ] `[ComponentName].test.tsx` — Given [bug trigger condition], when [action/render], then [correct result — not the bug]
- [ ] `[feature].spec.ts` (E2E) — Given [scenario that triggered bug], when [user interaction], then [correct UI behavior]

## Possible Root Cause & Solution

[Describe where in the code the bug likely lives, what is causing it, and how to fix it. Reference relevant files.]

**Relevant existing code:**

```typescript
// File: src/[path]/[ComponentName].tsx
[Code snippet showing the likely buggy area]
````

## Related Issues/PRs

[Link any related issues or "None"]

````

---

## Step 5 — Preview and confirm

Show the full generated issue body to the user and ask:

> Does this look good? Reply **yes** to create the issue, or describe changes and I'll revise.

Iterate until the user approves.

---

## Step 6 — Gather project board fields

Ask for (or infer from context):

| Field     | Required | Default / Options                                              |
|-----------|----------|----------------------------------------------------------------|
| Labels    | Yes      | `enhancement`+tech label for features; `bug`+tech label for bugs |
| Epic      | Yes      | From Epics table in project-config.md                          |
| Status    | Yes      | `Todo`                                                         |
| Priority  | No       | Suggest based on impact (bugs with critical impact → P0/P1)    |
| Size      | No       | Suggest based on scope of changes                              |
| Milestone | No       | `MVP` or `Phase 2`                                             |

---

## Step 7 — Create the issue

```bash
ISSUE_URL=$(gh issue create \
  --repo Women-Coding-Community/wcc-frontend \
  --title "<title>" \
  --body "<body>" \
  --label "<label1>,<label2>" \
  [--milestone "<MVP or Phase 2>"])
echo "$ISSUE_URL"
````

---

## Step 8 — Add to project board and set fields

### 8a — Get issue node ID

```bash
ISSUE_NUMBER=$(echo "$ISSUE_URL" | grep -o '[0-9]*$')
ISSUE_ID=$(gh api "repos/Women-Coding-Community/wcc-frontend/issues/$ISSUE_NUMBER" --jq '.node_id')
```

### 8b — Add issue to project

```bash
ITEM_ID=$(gh api graphql \
  -f query='mutation($pid:ID!,$cid:ID!){addProjectV2ItemById(input:{projectId:$pid,contentId:$cid}){item{id}}}' \
  -f pid="PVT_kwDOChRKeM4Ahm6k" \
  -f cid="$ISSUE_ID" \
  --jq '.data.addProjectV2ItemById.item.id')
```

### 8c — Set project fields

Use this mutation for each field. Replace `FIELD_ID` and `OPTION_ID` with values from project-config.md:

```bash
gh api graphql \
  -f query='mutation($pid:ID!,$iid:ID!,$fid:ID!,$val:String!){updateProjectV2ItemFieldValue(input:{projectId:$pid,itemId:$iid,fieldId:$fid,value:{singleSelectOptionId:$val}}){projectV2Item{id}}}' \
  -f pid="PVT_kwDOChRKeM4Ahm6k" \
  -f iid="$ITEM_ID" \
  -f fid="<FIELD_ID>" \
  -f val="<OPTION_ID>" > /dev/null
```

Always set at minimum: **Status** and **Epic**. Set Priority and Size only if provided.

---

## Step 9 — Confirm

Output:

```
Issue created: <ISSUE_URL>
Added to project board with:
  Epic: <epic name>
  Status: <status name>
  Priority: <priority name or "not set">
  Size: <size name or "not set">
  Milestone: <milestone name or "none">
```

---

## Error handling

- If `gh issue create` fails: report the error and stop — do not attempt project board steps.
- If project mutations fail: report which step failed; the issue already exists and can be added manually.
- If the user provides an invalid epic/label/milestone: list valid options from project-config.md and ask again.
- If codebase search yields no results: note "no directly relevant code found" and suggest the likely package/layer to look in based on the issue type.

---

## Quality guidelines for generated content

**User Stories** — Must follow the format: _"As a [specific role], I want [specific capability], so that [measurable benefit]."_ Avoid vague roles like "user" — use "admin user", "community member", "API consumer", etc.

**Acceptance Criteria** — Each AC must be:

- Observable (can be verified without reading the code)
- Atomic (tests exactly one thing)
- Written in Given/When/Then format
- Inclusive of at least one negative/error path AC

**Test Scenarios** — Must include:

- At least one unit test scenario per component/hook/utility touched
- At least one E2E test scenario per user flow touched
- File names that follow the project convention (`[ComponentName].test.tsx` for unit/component tests, `[feature].spec.ts` for E2E)
- Test descriptions using Given-When-Then format

**Code Examples** — Must:

- Come from actual files found via Grep/Glob (never invented)
- Be the shortest excerpt that illustrates the relevant pattern
- Include the file path as a comment above the snippet
