# bounty-lab

Hands-off DevSecOps agent for the GitLab Duo Agent Platform.
Submission for the **GitLab Transcend Hackathon — Life After Code**, category
**Best Hands-off Agent**. The repository is a small, self-contained Node.js
project whose only purpose is to give the agent a real codebase to operate on:
review a merge request, open a merge request, run the pipeline, remediate a
security finding and report, with a human gate only before production.

## What the agent does

The automation is defined in two places:

- `.gitlab/duo/flows/slugify-automation-v1.yml` — the Duo Agent Platform flow:
  two agent components (`review_mr` → `open_mr`) with two routers and two local
  prompts. `review_mr` reads the changed files of a merge request and reports
  concrete findings; `open_mr` opens a merge request using the review output as
  its description. No human input between the two steps.
- `.gitlab-ci.yml` — the pipeline that runs on every change: `lint` → `unit-test`
  → `security-scan` → `duo-agent-automation`. The last stage authenticates to
  GitLab with a masked CI/CD variable and triggers the flow.

`.gitlab/duo/agent-config.yml` describes the full agent chain
(review → fix → security remediation → deploy → monitor) and the write-path
allow/deny lists that keep an agent from editing CI config, prompts or
dependencies.

## The code under test

`src/slugify.js` converts arbitrary text into a URL-safe slug: lowercase,
non-alphanumeric runs collapsed to one hyphen, leading/trailing hyphens
stripped, accented characters normalised to their ASCII base (`ção` → `cao`),
empty input yields an empty string, non-string input throws `TypeError`.

## Running the tests

```bash
node --test
```

Seven tests, no dependencies. Node 20+ (uses the built-in `node:test` runner
and `node:assert/strict`).

## Running the flow

The flow itself runs on the GitLab Duo Agent Platform, not in this repository.
`scripts/duo-agent-run.js` is the CI entry point: it checks that the flow file
is present and parseable and writes `reports/duo-agent-summary.json`; the actual
agent execution happens on the platform.

## License

MIT — see [LICENSE](LICENSE).
