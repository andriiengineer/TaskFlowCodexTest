import { expect, type Locator, type Page } from '@playwright/test';

export class ContextMenu {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  root(): Locator {
    return this.page.getByTestId('context-menu');
  }

  edit(): Locator {
    return this.page.getByTestId('context-edit');
  }

  duplicate(): Locator {
    return this.page.getByTestId('context-duplicate');
  }

  moveToTodo(): Locator {
    return this.page.getByTestId('context-move-todo');
  }

  moveToProgress(): Locator {
    return this.page.getByTestId('context-move-progress');
  }

  moveToDone(): Locator {
    return this.page.getByTestId('context-move-done');
  }

  delete(): Locator {
    return this.page.getByTestId('context-delete');
  }

  async expectOpen(): Promise<void> {
    await expect(this.root()).toHaveClass(/active/);
  }
}
