import { test, expect } from './fixtures/base';
import { getSelectedTasks, getTaskByTitle } from './utils/testApi';
import { setAllureMeta } from './utils/allure';

test('multi-select and context menu duplicate', async ({ app }) => {
  setAllureMeta({
    epic: 'TaskFlow',
    feature: 'Selection & Context Menu',
    story: 'Multi-select and duplicate',
    severity: 'normal',
    owner: 'qa',
    tags: ['selection', 'context-menu']
  });

  await app.selectTask('TASK-001');
  await app.selectTask('TASK-002', true);

  await expect.poll(async () => (await getSelectedTasks(app.page)).length).toBe(2);
  await expect(app.selectionCount()).toHaveText('2 selected');

  // Context menu actions work only for a single selected task
  await app.page.getByTestId('selection-info').getByRole('button', { name: 'Clear' }).click();
  await app.selectTask('TASK-001');
  await app.openContextMenu('TASK-001');
  await app.contextMenu.duplicate().click();

  const duplicate = await getTaskByTitle(app.page, 'Fix login page responsive issues (Copy)');
  expect(duplicate).toBeTruthy();
  await expect(app.board.taskCard(duplicate!.id)).toBeVisible();

  await app.page.keyboard.press('Escape');
  await expect.poll(async () => (await getSelectedTasks(app.page)).length).toBe(0);
});

test('drag and drop and keyboard shortcuts', async ({ app }) => {
  setAllureMeta({
    epic: 'TaskFlow',
    feature: 'Interactions',
    story: 'Drag & shortcuts',
    severity: 'normal',
    owner: 'qa',
    tags: ['drag', 'keyboard']
  });

  await app.board.dragTaskToColumn('TASK-005', 'done');
  await app.board.expectTaskInColumn('TASK-005', 'done');

  const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
  await app.page.keyboard.down(modifier);
  await app.page.keyboard.press('k');
  await app.page.keyboard.up(modifier);
  await expect(app.searchInput()).toBeFocused();

  await app.page.keyboard.press('Escape');
  await app.page.keyboard.press('n');
  await app.modal.expectOpen();
  await app.page.keyboard.press('Escape');
  await app.modal.expectClosed();

  await app.selectTask('TASK-002');
  await app.page.keyboard.press('e');
  await app.modal.expectOpen();
  await expect(app.modal.title()).toContainText('Edit TASK-002');
  await app.page.keyboard.press('Escape');
  await app.modal.expectClosed();
});
