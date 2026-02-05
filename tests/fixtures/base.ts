import { test as base, expect } from '@playwright/test';
import { TaskFlowPage } from '../pages/TaskFlowPage';
import { attachArtifactsOnFailure, attachConsoleLogs, attachNetworkLogs, startConsoleCapture, startNetworkCapture } from '../utils/allure';
import { resetState } from '../utils/state';

type Fixtures = {
  app: TaskFlowPage;
};

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    const app = new TaskFlowPage(page);
    await app.goto();
    await resetState(page);
    await use(app);
  }
});

test.beforeEach(async ({ page }) => {
  startConsoleCapture(page);
  startNetworkCapture(page);
});

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    attachConsoleLogs(page);
    attachNetworkLogs(page);
  }
  await attachArtifactsOnFailure(page, testInfo);
});

export { expect };
