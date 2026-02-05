import { expect, type Locator, type Page } from '@playwright/test';
import { dragAndDrop } from '../utils/drag';
import type { ColumnId } from '../utils/constants';

export class Board {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  root(): Locator {
    return this.page.getByTestId('kanban-board');
  }

  columnBody(columnId: ColumnId): Locator {
    return this.page.getByTestId(`column-${columnId}-body`);
  }

  columnCount(columnId: ColumnId): Locator {
    return this.page.getByTestId(`column-${columnId}-count`);
  }

  taskCard(taskId: string): Locator {
    return this.page.getByTestId(`task-${taskId}`);
  }

  taskTitle(taskId: string): Locator {
    return this.page.getByTestId(`task-${taskId}-title`);
  }

  taskPriority(taskId: string): Locator {
    return this.page.getByTestId(`task-${taskId}-priority`);
  }

  async expectTaskInColumn(taskId: string, columnId: ColumnId): Promise<void> {
    await expect(this.columnBody(columnId).getByTestId(`task-${taskId}`)).toBeVisible();
  }

  async dragTaskToColumn(taskId: string, columnId: ColumnId): Promise<void> {
    await this.taskCard(taskId).scrollIntoViewIfNeeded();
    await this.columnBody(columnId).scrollIntoViewIfNeeded();
    await dragAndDrop(this.taskCard(taskId), this.columnBody(columnId));
  }
}
