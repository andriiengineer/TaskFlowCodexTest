import { expect, type Locator, type Page } from '@playwright/test';
import type { TaskAssignee, TaskLabel, TaskPriority, TaskStatus } from '../utils/constants';

export type TaskFormData = {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  assignee?: TaskAssignee;
  dueDate?: string;
  labels?: TaskLabel[];
};

export class TaskModal {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  root(): Locator {
    return this.page.getByTestId('task-modal');
  }

  title(): Locator {
    return this.page.getByTestId('modal-title');
  }

  titleInput(): Locator {
    return this.page.getByTestId('task-title-input');
  }

  descriptionInput(): Locator {
    return this.page.getByTestId('task-description-input');
  }

  statusSelect(): Locator {
    return this.page.getByTestId('task-status-select');
  }

  prioritySelect(): Locator {
    return this.page.getByTestId('task-priority-select');
  }

  assigneeSelect(): Locator {
    return this.page.getByTestId('task-assignee-select');
  }

  dueDateInput(): Locator {
    return this.page.getByTestId('task-due-date-input');
  }

  labelCheckbox(label: TaskLabel): Locator {
    return this.page.getByTestId(`label-${label}-checkbox`);
  }

  saveButton(): Locator {
    return this.page.getByTestId('modal-save-btn');
  }

  cancelButton(): Locator {
    return this.page.getByTestId('modal-cancel-btn');
  }

  async expectOpen(): Promise<void> {
    await expect(this.root()).toHaveClass(/active/);
  }

  async expectClosed(): Promise<void> {
    await expect(this.root()).not.toHaveClass(/active/);
  }

  async fill(form: TaskFormData): Promise<void> {
    await this.titleInput().fill(form.title);

    if (form.description !== undefined) {
      await this.descriptionInput().fill(form.description);
    }

    if (form.status) {
      await this.statusSelect().selectOption(form.status);
    }

    if (form.priority) {
      await this.prioritySelect().selectOption(form.priority);
    }

    if (form.assignee !== undefined) {
      await this.assigneeSelect().selectOption(form.assignee);
    }

    if (form.dueDate) {
      await this.dueDateInput().fill(form.dueDate);
    }

    if (form.labels) {
      const allLabels: TaskLabel[] = ['bug', 'feature', 'improvement', 'urgent'];
      for (const label of allLabels) {
        await this.labelCheckbox(label).setChecked(form.labels.includes(label));
      }
    }
  }
}
