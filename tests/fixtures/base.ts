import { test as base, expect } from '@playwright/test';
import { TaskFlowPage } from '../pages/TaskFlowPage';

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

export { expect };
