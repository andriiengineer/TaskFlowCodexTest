import { test, expect } from './fixtures/base';
import { COLUMNS } from './utils/constants';
import { getTasks } from './utils/testApi';

test('loads board with correct column counts', async ({ app }) => {
  const tasks = await getTasks(app.page);
  const counts = tasks.reduce<Record<string, number>>((acc, task) => {
    acc[task.status] = (acc[task.status] ?? 0) + 1;
    return acc;
  }, {});

  await expect(app.page.getByTestId('logo')).toBeVisible();
  await expect(app.page.getByTestId('project-name')).toBeVisible();

  for (const column of COLUMNS) {
    await expect(app.board.columnBody(column.id)).toBeVisible();
    await expect(app.board.columnCount(column.id)).toHaveText(String(counts[column.id] ?? 0));
  }

  await expect(app.page.getByTestId('all-tasks-count')).toHaveText(String(tasks.length));
});
