# AI agent guide for this repo (explanation-first)

This repository contains Playwright end-to-end tests written in JavaScript for Sauce Demo.

Policy: explanation-first, then code
- Default response style: Start with a brief explanation (what/why), then provide code or edits.
- Inline chat: If the user selects text in the editor, still give 1–2 sentences of context before proposing a change.
- When the user asks for “code only,” skip the prose and output just the edit/snippet.
- Prefer minimal diffs when editing files; avoid unrelated refactors.

Project at a glance
- Test runner: @playwright/test (JavaScript, CommonJS)
- Key folders: tests/ (specs), pages/ (Page Objects), fixtures/ (test data)
- Reports/artifacts: test-results/ and playwright-report/ (ignored by Git)
- Config: playwright.config.js (loads dotenv; baseURL from env or package.json config)
- Scripts (npm run ...): test, test:headed, test:ui, test:debug, report

Conventions and patterns
- Page Object Model: put UI flows in pages/*.js; tests import and use them.
- Stable selectors: prefer getByRole(...) or [data-test="..."] over CSS classes.
- Navigation: rely on use.baseURL; tests can page.goto('/') instead of full URLs.
- Artifacts: keep traces/screenshots/videos on failure or retry (see config). 

Editing rules for agents
- Keep file casing and paths consistent: tests/*.spec.js; pages/NamePage.js.
- Do not introduce TypeScript or ESM without being asked; stick to CommonJS require/module.exports.
- Respect existing reporters and timeouts unless the user requests changes.
- If you detect duplicate imports or misnamed files, propose a fix with a short rationale first.

How to run (Windows PowerShell)
- npm run test — run the suite headless across configured projects
- npm run test:headed — local debug in a browser window
- npm run test:ui — Playwright UI mode (filter, debug, watch)
- npm run test:debug — inspector for step-through
- npm run report — open the last HTML report

Environment/config
- dotenv is loaded in config; prefer using process.env for secrets and BASE_URL.
- BASE_URL precedence: env BASE_URL, then package.json config.baseUrl, then https://www.saucedemo.com.

When to ask clarifying questions
- Ambiguous flows (e.g., which user role or checkout path).
- Flakiness trade-offs (selector strategy, waits, retries).
- Cross-browser scope or CI timing limits.

Deliverable expectations
- For new tests: include at least one happy path and one negative case when relevant.
- For fixes: include a brief note explaining the root cause and why the change is safe.
