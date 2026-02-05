# TaskFlowCodexTest

Playwright + TypeScript tests for TaskFlow with Allure reporting and GitHub Pages publishing.

[![Allure Report](https://github.com/andriiengineer/TaskFlowCodexTest/actions/workflows/allure-pages.yml/badge.svg)](https://github.com/andriiengineer/TaskFlowCodexTest/actions/workflows/allure-pages.yml)

Allure dashboard: https://andriiengineer.github.io/TaskFlowCodexTest/

---

## Quick Links
- Local run
- Allure report
- CI run
- Project structure

---

## Local Run

### Install
```bash
npm install
npx playwright install
```

### Run tests
```bash
npm test
```

### Run Allure locally
```bash
npm run test:allure
npm run allure:report
npm run allure:open
```

---

## Results and Reports

### GitHub Actions (Allure on Pages)
1. Open Actions → Playwright Allure (Manual)
2. Choose test_suite: all / smoke / regression / flaky
3. Open the Allure dashboard link above

### Local artifacts
- Playwright HTML report: `playwright-report/`
- Allure report: `allure-report/`

---

## What Is Covered
- Board rendering and column counts
- Task CRUD
- Undo/Redo
- Context menu actions
- Multi-select and bulk delete
- Filters and search
- Drag and drop
- Keyboard shortcuts
- Due date badges (Today/Tomorrow/Overdue)

---

## Project Structure
- Tests: `tests/`
- Page Objects: `tests/pages/`
- Components: `tests/components/`
- Utilities: `tests/utils/`
- Config: `playwright.config.ts`

---

## Useful Commands
```bash
npm run test:ui
npm run test:headed
npm run test:debug
npx playwright test -g @smoke
npx playwright test -g @regression
```

---

## FAQ

<details>
<summary>How do I change the base URL?</summary>

```bash
BASE_URL=http://localhost:8080 npm test
```
</details>

<details>
<summary>How does Allure history work?</summary>

The workflow and local script copy `allure-report/history` into `allure-results/history` before each run so trends are preserved.
</details>

---

## Notes
- The local server runs via:
  `python3 -m http.server 8080 --directory app`
