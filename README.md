# bounty-lab

Bench repository for the Tivra **Revenue Streams** bounty pipeline. Test-only.

Everything here exists to prove that the agent can run the full GitHub
contribution cycle (clone → branch → code + tests → commit → PR → review →
merge) without touching a third party's repository.

## What is proven here

| Phase | Evidence |
|---|---|
| Clone | `git clone https://github.com/mhiroash/bounty-lab.git` |
| Branch | `feat/slugify-helper` |
| Commit | `92403cf6d5166002ca8a23e653451d66734ddc81` |
| Pull request | [#2](https://github.com/mhiroash/bounty-lab/pull/2) — `mergeable_state: clean` |
| Review | `pull_request_review_write` (COMMENT — GitHub refuses self-APPROVE) |
| Merge | squash → `36f2ec5f59c512a8a950cb4e25ee4bc5397daa35` |
| Verification | `node --test` on `main` → 7 pass / 0 fail |

The issue used as the work item is [#1](https://github.com/mhiroash/bounty-lab/issues/1);
the PR's `Closes #1` closed it automatically.

## Layout

```
src/slugify.js        the "fix" produced for issue #1
test/slugify.test.js  its tests, using the built-in node:test runner
```

## Running the tests

```bash
node --test
```

No dependencies. Node 18+ (uses `node:test` and `node:assert/strict`).

## The operating procedure

The full SOP lives outside this repo at
`/workspace/revenue-streams/pipeline-bounty.md` (TASK-2026-10-15-006).
