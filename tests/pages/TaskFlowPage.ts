import { expect, type Locator, type Page } from '@playwright/test';
import { Board } from '../components/Board';
import { ContextMenu } from '../components/ContextMenu';
import { TaskModal, type TaskFormData } from '../components/TaskModal';
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
    await this.page.goto('/');
    await this.board.root().waitFor();
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
    await this.newTaskButton().click();
    await this.modal.expectOpen();
  }

  async openEditTaskModal(taskId: string): Promise<void> {
    await this.board.taskCard(taskId).dblclick();
    await this.modal.expectOpen();
    await expect(this.modal.title()).toContainText(`Edit ${taskId}`);
  }

  async createTask(data: TaskFormData): Promise<void> {
    await this.openNewTaskModal();
    await this.modal.fill(data);
    await this.modal.saveButton().click();
    await this.modal.expectClosed();
  }

  async editTask(taskId: string, data: TaskFormData): Promise<void> {
    await this.openEditTaskModal(taskId);
    await this.modal.fill(data);
    await this.modal.saveButton().click();
    await this.modal.expectClosed();
  }

  async selectTask(taskId: string, multi = false): Promise<void> {
    if (multi) {
      const modifier = process.platform === 'darwin' ? 'Meta' : 'Control';
      await this.board.taskCard(taskId).click({ modifiers: [modifier] });
      return;
    }
    await this.board.taskCard(taskId).click();
  }

  async openContextMenu(taskId: string): Promise<void> {
    await this.board.taskCard(taskId).click({ button: 'right' });
    await this.contextMenu.expectOpen();
  }

  async confirmDelete(): Promise<void> {
    await expect(this.deleteModal()).toHaveClass(/active/);
    await this.deleteConfirm().click();
    await expect(this.deleteModal()).not.toHaveClass(/active/);
  }

  async filterByAssignee(value: TaskAssignee): Promise<void> {
    await this.page.getByTestId('filter-assignee').selectOption(value);
  }

  async filterByPriority(value: TaskPriority | ''): Promise<void> {
    await this.page.getByTestId('filter-priority').selectOption(value);
  }

  async clearFilters(): Promise<void> {
    await this.filterByAssignee('');
    await this.filterByPriority('');
  }
}
