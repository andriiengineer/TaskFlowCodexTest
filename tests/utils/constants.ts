export const COLUMNS = [
  { id: 'backlog', title: 'Backlog' },
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'review', title: 'Review' },
  { id: 'done', title: 'Done' }
] as const;

export type ColumnId = (typeof COLUMNS)[number]['id'];

export type TaskLabel = 'bug' | 'feature' | 'improvement' | 'urgent';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskStatus = ColumnId;
export type TaskAssignee = '' | 'SA' | 'JD' | 'AS';
