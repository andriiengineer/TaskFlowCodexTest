import { expect, type Locator, type Page } from '@playwright/test';
import { Board } from '../components/Board';
import { ContextMenu } from '../components/ContextMenu';
import { TaskModal, type TaskFormData } from '../components/TaskModal';
import { step } from '../utils/allure';
import type { TaskAssignee, TaskPriority, TaskStatus } from '../utils/constants';

export class TaskFlowPage {
  readonly page: Page;
  readonly board: Board;
  readonly modal: TaskModal;
  readonly contextMenu: ContextMenu;

  constructor(page: Page) {
    this.page = page;
    this.board = new Board(page);
    this.modal = new TaskModal(page);
    this.contextMenu = new ContextMenu(page);
  }

  async goto(): Promise<void> {
    await step('Open TaskFlow', async () => {
      await this.page.goto('/');
      await this.board.root().waitFor();
    });
  }

  searchInput(): Locator {
    return this.page.getByTestId('search-input');
  }

  newTaskButton(): Locator {
    return this.page.getByTestId('new-task-btn');
  }

  undoButton(): Locator {
    return this.page.getByTestId('undo-btn');
  }

  redoButton(): Locator {
    return this.page.getByTestId('redo-btn');
  }

  selectionInfo(): Locator {
    return this.page.getByTestId('selection-info');
  }

  selectionCount(): Locator {
    return this.page.getByTestId('selection-count');
  }

  deleteModal(): Locator {
    return this.page.getByTestId('delete-modal');
  }

  deleteConfirm(): Locator {
    return this.page.getByTestId('delete-confirm-btn');
  }

  async openNewTaskModal(): Promise<void> {
    await step('Open New Task modal', async () => {
      await this.newTaskButton().click();
      await this.modal.expectOpen();
    });
  }

  async openEditTaskModal(taskId: string): Promise<void> {
    await step(`Open Edit Task modal for ${taskId}`, async () => {
      await this.board.taskCard(taskId).dblclick();
      await this.modal.expectOpen();
      await expect(this.modal.title()).toContainText(`Edit ${taskId}`);
    });
  }

  async createTask(data: TaskFormData): Promise<void> {
    await step(`Create task: ${data.title}`, async () => {
      await this.openNewTaskModal();
      await this.modal.fill(data);
      await this.modal.saveButton().click();
      await this.modal.expectClosed();
    });
  }

  async editTask(taskId: string, data: TaskFormData): Promise<void> {
    await step(`Edit task ${taskId}`, async () => {
      await this.openEditTaskModal(taskId);
      await this.modal.fill(data);
      await this.modal.saveButton().click();
      await this.modal.expectClosed();
    });
  }

  async selectTask(taskId: string, multi = false): Promise<void> {
    await step(`Select task ${taskId}${multi ? ' (multi)' : ''}`, async () => {
      if (multi) {
        const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
        await this.board.taskCard(taskId).click({ modifiers: [modifier] });
        return;
      }
      await this.board.taskCard(taskId).click();
    });
  }

  async openContextMenu(taskId: string): Promise<void> {
    await step(`Open context menu for ${taskId}`, async () => {
      await this.board.taskCard(taskId).click({ button: 'right' });
      await this.contextMenu.expectOpen();
    });
  }

  async confirmDelete(): Promise<void> {
    await step('Confirm delete', async () => {
      await expect(this.deleteModal()).toHaveClass(/active/);
      await this.deleteConfirm().click();
      await expect(this.deleteModal()).not.toHaveClass(/active/);
    });
  }

  async filterByAssignee(value: TaskAssignee): Promise<void> {
    await step(`Filter by assignee: ${value || 'All'}`, async () => {
      await this.page.getByTestId('filter-assignee').selectOption(value);
    });
  }

  async filterByPriority(value: TaskPriority | ''): Promise<void> {
    await step(`Filter by priority: ${value || 'All'}`, async () => {
      await this.page.getByTestId('filter-priority').selectOption(value);
    });
  }

  async clearFilters(): Promise<void> {
    await step('Clear filters', async () => {
      await this.filterByAssignee('');
      await this.filterByPriority('');
    });
  }
}
