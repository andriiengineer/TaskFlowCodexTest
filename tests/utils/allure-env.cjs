const fs = require('fs');
const path = require('path');

const resultsDir = path.resolve(process.cwd(), 'allure-results');
fs.mkdirSync(resultsDir, { recursive: true });

const envFile = path.join(resultsDir, 'environment.properties');
const env = [
  `BaseURL=${process.env.BASE_URL || 'http://localhost:8080'}`,
  `Browser=Chromium`,
  `Platform=${process.platform}`,
  `Node=${process.version}`
].join('\n');
fs.writeFileSync(envFile, env);

const categories = [
  {
    name: 'Assertion Failures',
    matchedStatuses: ['failed'],
    messageRegex: '.*expect\\(.*\\).*'
  },
  {
    name: 'Timeouts',
    matchedStatuses: ['failed', 'broken'],
    messageRegex: '.*Timeout.*'
  },
  {
    name: 'UI Issues',
    matchedStatuses: ['failed'],
    messageRegex: '.*locator.*|.*element\\(s\\) not found.*'
  },
  {
    name: 'Network Issues',
    matchedStatuses: ['failed', 'broken'],
    messageRegex: '.*net::.*|.*Request failed.*|.*ERR_.*'
  },
  {
    name: 'Flaky',
    matchedStatuses: ['broken', 'failed'],
    flaky: true
  }
];
fs.writeFileSync(path.join(resultsDir, 'categories.json'), JSON.stringify(categories, null, 2));
