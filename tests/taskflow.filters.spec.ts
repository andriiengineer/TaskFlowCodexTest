import { test, expect } from './fixtures/base';
import { getTasks } from './utils/testApi';
import { setAllureGroup, setAllureMeta, step } from './utils/allure';

test.describe('Filtering & Search', () => {
  test.beforeEach(() => {
    setAllureGroup('Filtering & Search', 'Core filters');
  });

  test('filters by assignee and priority, search hides non-matching tasks', async ({ app }) => {
    setAllureMeta({
      epic: 'TaskFlow',
      feature: 'Filtering & Search',
      story: 'Filter by assignee/priority and search',
      severity: 'normal',
      owner: 'qa',
      tags: ['filter', 'search']
    });

    const tasks = await getTasks(app.page);
    const saCount = tasks.filter(task => task.assignee === 'SA').length;
    const highCount = tasks.filter(task => task.priority === 'high').length;

    await step('Filter by assignee SA', async () => {
      await app.filterByAssignee('SA');
      await expect(app.page.locator('.task-card')).toHaveCount(saCount);
    });

    await step('Filter by high priority', async () => {
      await app.filterByAssignee('');
      await app.filterByPriority('high');
      await expect(app.page.locator('.task-card')).toHaveCount(highCount);
    });

    await step('Search by keyword "export"', async () => {
      await app.clearFilters();
      await app.searchInput().fill('export');
      await expect(app.page.getByTestId('task-TASK-007')).toBeVisible();
      await expect(app.page.getByTestId('task-TASK-001')).not.toBeVisible();
    });
  });
});
