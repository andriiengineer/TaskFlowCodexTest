import type { Page } from '@playwright/test';
import type { Task } from './testApi';

export async function resetState(page: Page): Promise<void> {
  await page.waitForFunction(() => typeof window.__TEST_API__ !== 'undefined');
  await page.evaluate(() => (window.__TEST_API__ as { resetState: () => void }).resetState());
}

export async function seedTasks(page: Page, tasks: Task[]): Promise<void> {
  await page.waitForFunction(() => typeof window.__TEST_API__ !== 'undefined');
  await page.evaluate(seed => (window.__TEST_API__ as { seedTasks: (tasks: Task[]) => void }).seedTasks(seed), tasks);
}
