# TaskFlowCodexTest

## Prerequisites
- Node.js 18+
- Python 3 (for the local static server)

## Install
```bash
npm install
npx playwright install
```

## Run tests
```bash
npm test
```

## Allure report (history + retries)
```bash
npm run test:allure
npm run allure:report
npm run allure:open
```

Notes:
- `test:allure` copies `allure-report/history` into `allure-results/history` before the run, so trends are preserved.
- Allure shows retry attempts automatically (Playwright `retries` setting).
- Environment and categories are written to `allure-results` before the run for richer dashboards.

## Notes
- The Playwright config starts a local server using:
  `python3 -m http.server 8080 --directory app`
- You can override the base URL with:
  `BASE_URL=http://localhost:8080 npm test`
