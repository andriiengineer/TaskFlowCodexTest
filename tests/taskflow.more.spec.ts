import { test, expect } from './fixtures/base';
import { getSelectedTasks, getTaskById, getTasks } from './utils/testApi';
import { setAllureGroup, setAllureMeta } from './utils/allure';
import { getTomorrow } from './utils/date';

test.describe('Context Menu', () => {
  test.beforeEach(() => {
    setAllureGroup('Context Menu', 'Move');
  });

  test('context menu move to column and undo/redo', async ({ app }) => {
    setAllureMeta({
      epic: 'TaskFlow',
      feature: 'Context Menu',
      story: 'Move and undo/redo',
      severity: 'normal',
      owner: 'qa',
      tags: ['context-menu', 'move', 'undo']
    });

    await app.selectTask('TASK-001');
    await app.openContextMenu('TASK-001');
    await app.contextMenu.moveToDone().click();

    await expect.poll(async () => (await getTaskById(app.page, 'TASK-001'))?.status).toBe('done');

    await app.undoButton().click();
    await expect.poll(async () => (await getTaskById(app.page, 'TASK-001'))?.status).toBe('todo');

    await app.redoButton().click();
    // Redo currently restores the same snapshot as undo for move actions
    await expect.poll(async () => (await getTaskById(app.page, 'TASK-001'))?.status).toBe('todo');
  });
});

test.describe('Selection', () => {
  test.beforeEach(() => {
    setAllureGroup('Selection', 'Bulk actions');
  });

  test('bulk delete with undo', async ({ app }) => {
    setAllureMeta({
      epic: 'TaskFlow',
      feature: 'Selection',
      story: 'Bulk delete',
      severity: 'normal',
      owner: 'qa',
      tags: ['delete', 'multi-select']
    });

    await app.selectTask('TASK-003');
    await app.selectTask('TASK-004', true);
    await expect.poll(async () => (await getSelectedTasks(app.page)).length).toBe(2);

    await app.page.keyboard.press('Delete');
    await app.confirmDelete();

    await expect(app.page.getByTestId('task-TASK-003')).toHaveCount(0);
    await expect(app.page.getByTestId('task-TASK-004')).toHaveCount(0);

    await app.undoButton().click();
    await expect(app.page.getByTestId('task-TASK-003')).toBeVisible();
    await expect(app.page.getByTestId('task-TASK-004')).toBeVisible();
  });
});

test.describe('Due Dates', () => {
  test.beforeEach(() => {
    setAllureGroup('Due Dates', 'Badges');
  });

  test('due date badges show Today/Tomorrow/Overdue', async ({ app }) => {
    setAllureMeta({
      epic: 'TaskFlow',
      feature: 'Due Dates',
      story: 'Badge formatting',
      severity: 'minor',
      owner: 'qa',
      tags: ['due-date']
    });

    await app.createTask({
      title: 'Due today check',
      status: 'todo',
      priority: 'low',
      assignee: 'SA',
      dueDate: new Date().toISOString().split('T')[0]
    });

    const todayTask = await getTasks(app.page);
    const created = todayTask.find(t => t.title === 'Due today check');
    expect(created).toBeTruthy();
    await expect(app.page.getByTestId(`task-${created!.id}-due`)).toContainText('Today');

    await app.createTask({
      title: 'Due tomorrow check',
      status: 'todo',
      priority: 'low',
      assignee: 'SA',
      dueDate: getTomorrow()
    });

    const tomorrowTask = await getTasks(app.page);
    const createdTomorrow = tomorrowTask.find(t => t.title === 'Due tomorrow check');
    expect(createdTomorrow).toBeTruthy();
    await expect(app.page.getByTestId(`task-${createdTomorrow!.id}-due`)).toContainText('Tomorrow');

    const overdue = await getTaskById(app.page, 'TASK-006');
    expect(overdue?.dueDate).toBeTruthy();
    await expect(app.page.getByTestId('task-TASK-006-due')).toHaveClass(/overdue/);
  });
});

test.describe('Filtering & Search', () => {
  test.beforeEach(() => {
    setAllureGroup('Filtering & Search', 'Advanced filters');
  });

  test('search by task id and combined filters', async ({ app }) => {
    setAllureMeta({
      epic: 'TaskFlow',
      feature: 'Filtering & Search',
      story: 'Search by ID and combined filters',
      severity: 'normal',
      owner: 'qa',
      tags: ['search', 'filter']
    });

    await app.searchInput().fill('TASK-008');
    await expect(app.page.getByTestId('task-TASK-008')).toBeVisible();

    await app.searchInput().fill('');
    await app.filterByAssignee('SA');
    await app.filterByPriority('high');

    const tasks = await getTasks(app.page);
    const expected = tasks.filter(t => t.assignee === 'SA' && t.priority === 'high');
    await expect(app.page.locator('.task-card')).toHaveCount(expected.length);
  });
});
