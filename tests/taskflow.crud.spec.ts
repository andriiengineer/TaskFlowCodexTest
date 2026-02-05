import { test, expect } from './fixtures/base';
import { getTaskByTitle } from './utils/testApi';
import { getTomorrow } from './utils/date';
import { setAllureGroup, setAllureMeta, step } from './utils/allure';
import { TAGS } from './utils/tags';

test.describe('Task CRUD', () => {
  test.beforeEach(() => {
    setAllureGroup('Task CRUD', 'Primary flow');
  });

  test(`create, edit, delete with undo/redo ${TAGS.regression}`, async ({ app }) => {
    setAllureMeta({
      epic: 'TaskFlow',
      feature: 'Task CRUD',
      story: 'Create/Edit/Delete',
      severity: 'critical',
      owner: 'Andrii Samoilenko',
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

    await step('Validate updated title and priority', async () => {
      await expect(app.board.taskTitle(taskId)).toHaveText(`${title} v2`);
      await expect(app.board.taskPriority(taskId)).toContainText('low');
    });

    await step('Delete task via keyboard', async () => {
      await app.selectTask(taskId);
      await app.page.keyboard.press('Delete');
      await app.confirmDelete();
    });

    await step('Verify task is removed', async () => {
      await expect(app.page.getByTestId(`task-${taskId}`)).toHaveCount(0);
    });

    await step('Undo deletion', async () => {
      await app.undoButton().click();
      await expect(app.board.taskCard(taskId)).toBeVisible();
    });

    await step('Redo deletion', async () => {
      await app.redoButton().click();
      await expect(app.page.getByTestId(`task-${taskId}`)).toHaveCount(0);
    });
  });
});
