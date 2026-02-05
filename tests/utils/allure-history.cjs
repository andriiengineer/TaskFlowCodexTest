const fs = require('fs');
const path = require('path');

const resultsDir = path.resolve(process.cwd(), 'allure-results');
const reportHistoryDir = path.resolve(process.cwd(), 'allure-report', 'history');
const resultsHistoryDir = path.resolve(resultsDir, 'history');

if (fs.existsSync(resultsDir)) {
  fs.rmSync(resultsDir, { recursive: true, force: true });
}
fs.mkdirSync(resultsDir, { recursive: true });

if (fs.existsSync(reportHistoryDir)) {
  fs.mkdirSync(resultsHistoryDir, { recursive: true });
  for (const file of fs.readdirSync(reportHistoryDir)) {
    fs.copyFileSync(path.join(reportHistoryDir, file), path.join(resultsHistoryDir, file));
  }
}
