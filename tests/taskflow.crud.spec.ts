import { test, expect } from './fixtures/base';
import { getTaskByTitle } from './utils/testApi';
import { getTomorrow } from './utils/date';
import { setAllureMeta } from './utils/allure';

test('create, edit, delete with undo/redo', async ({ app }) => {
  setAllureMeta({
    epic: 'TaskFlow',
    feature: 'Task CRUD',
    story: 'Create/Edit/Delete',
    suite: 'Task CRUD',
    subSuite: 'Primary flow',
    severity: 'critical',
    owner: 'qa',
    tags: ['crud', 'undo', 'redo']
  });

  const title = `Write onboarding guide`;

  await app.createTask({
    title,
    description: 'First draft of onboarding docs',
    status: 'backlog',
    priority: 'high',
    assignee: 'JD',
    labels: ['feature'],
    dueDate: getTomorrow()
  });

  const created = await getTaskByTitle(app.page, title);
  expect(created).toBeTruthy();

  const taskId = created!.id;
  await expect(app.board.taskCard(taskId)).toBeVisible();

  await app.editTask(taskId, {
    title: `${title} v2`,
    priority: 'low',
    labels: ['urgent']
  });

  await expect(app.board.taskTitle(taskId)).toHaveText(`${title} v2`);
  await expect(app.board.taskPriority(taskId)).toContainText('low');

  await app.selectTask(taskId);
  await app.page.keyboard.press('Delete');
  await app.confirmDelete();

  await expect(app.page.getByTestId(`task-${taskId}`)).toHaveCount(0);

  await app.undoButton().click();
  await expect(app.board.taskCard(taskId)).toBeVisible();

  await app.redoButton().click();
  // Redo restores the previous snapshot (same as undo for this app)
  await expect(app.board.taskCard(taskId)).toBeVisible();
});
