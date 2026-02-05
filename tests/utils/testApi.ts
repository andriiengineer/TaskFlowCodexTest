import type { Page } from '@playwright/test';
import type { TaskAssignee, TaskLabel, TaskPriority, TaskStatus } from './constants';

type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: TaskAssignee;
  labels: TaskLabel[];
  dueDate: string | null;
};

export async function getTasks(page: Page): Promise<Task[]> {
  return page.evaluate(() => (window.__TEST_API__ as { getTasks: () => Task[] }).getTasks());
}

export async function getTaskById(page: Page, id: string): Promise<Task | undefined> {
  return page.evaluate(taskId => (window.__TEST_API__ as { getTaskById: (id: string) => Task | undefined }).getTaskById(taskId), id);
}

export async function getTaskByTitle(page: Page, title: string): Promise<Task | undefined> {
  return page.evaluate(taskTitle => {
    const tasks = (window.__TEST_API__ as { getTasks: () => Task[] }).getTasks();
    return tasks.find(t => t.title === taskTitle);
  }, title);
}

export async function getSelectedTasks(page: Page): Promise<string[]> {
  return page.evaluate(() => (window.__TEST_API__ as { getSelectedTasks: () => string[] }).getSelectedTasks());
}

export async function getHistoryState(page: Page): Promise<{ length: number; index: number }> {
  return page.evaluate(() => {
    const api = window.__TEST_API__ as { getHistoryLength: () => number; getHistoryIndex: () => number };
    return { length: api.getHistoryLength(), index: api.getHistoryIndex() };
  });
}

export type { Task };
