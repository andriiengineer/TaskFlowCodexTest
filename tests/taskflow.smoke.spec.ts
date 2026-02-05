import { test, expect } from './fixtures/base';
import { COLUMNS } from './utils/constants';
import { getTasks } from './utils/testApi';
import { setAllureGroup, setAllureMeta, step } from './utils/allure';

test.describe('Board', () => {
  test.beforeEach(() => {
    setAllureGroup('Board', 'Smoke');
  });

  test('loads board with correct column counts', async ({ app }) => {
    setAllureMeta({
      epic: 'TaskFlow',
      feature: 'Board',
      story: 'Initial render',
      severity: 'critical',
      owner: 'qa',
      tags: ['smoke', 'board']
    });

  const tasks = await getTasks(app.page);
  const counts = tasks.reduce<Record<string, number>>((acc, task) => {
    acc[task.status] = (acc[task.status] ?? 0) + 1;
    return acc;
  }, {});

    await step('Verify header elements', async () => {
      await expect(app.page.getByTestId('logo')).toBeVisible();
      await expect(app.page.getByTestId('project-name')).toBeVisible();
    });

    await step('Validate column counts', async () => {
      for (const column of COLUMNS) {
        await expect(app.board.columnBody(column.id)).toBeVisible();
        await expect(app.board.columnCount(column.id)).toHaveText(String(counts[column.id] ?? 0));
      }
    });

    await step('Validate total tasks count', async () => {
      await expect(app.page.getByTestId('all-tasks-count')).toHaveText(String(tasks.length));
    });
  });
});
