import { test as base, expect } from '@playwright/test';
import { TaskFlowPage } from '../pages/TaskFlowPage';
import { attachArtifactsOnFailure, attachConsoleLogs, startConsoleCapture } from '../utils/allure';

type Fixtures = {
  app: TaskFlowPage;
};

export const test = base.extend<Fixtures>({
  app: async ({ page }, use) => {
    const app = new TaskFlowPage(page);
    await app.goto();
    await use(app);
  }
});

test.beforeEach(async ({ page }) => {
  startConsoleCapture(page);
});

test.afterEach(async ({ page }, testInfo) => {
  attachConsoleLogs(page);
  await attachArtifactsOnFailure(page, testInfo);
});

export { expect };
