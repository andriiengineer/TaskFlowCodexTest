import { test, expect } from './fixtures/base';
import { getTasks } from './utils/testApi';

test('filters by assignee and priority, search hides non-matching tasks', async ({ app }) => {
  const tasks = await getTasks(app.page);
  const saCount = tasks.filter(task => task.assignee === 'SA').length;
  const highCount = tasks.filter(task => task.priority === 'high').length;

  await app.filterByAssignee('SA');
  await expect(app.page.locator('.task-card')).toHaveCount(saCount);

  await app.filterByAssignee('');
  await app.filterByPriority('high');
  await expect(app.page.locator('.task-card')).toHaveCount(highCount);

  await app.clearFilters();
  await app.searchInput().fill('export');
  await expect(app.page.getByTestId('task-TASK-007')).toBeVisible();
  await expect(app.page.getByTestId('task-TASK-001')).not.toBeVisible();
});
