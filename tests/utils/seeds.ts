import type { Task } from './testApi';

export const seeds = {
  minimal: [
    {
      id: 'TASK-001',
      title: 'Minimal task',
      description: 'Minimal seed',
      status: 'todo',
      priority: 'medium',
      assignee: 'SA',
      labels: ['feature'],
      dueDate: null
    }
  ] as Task[],
  allColumns: [
    {
      id: 'TASK-001',
      title: 'Backlog seed',
      description: 'Seed in backlog',
      status: 'backlog',
      priority: 'low',
      assignee: '',
      labels: ['improvement'],
      dueDate: null
    },
    {
      id: 'TASK-002',
      title: 'Todo seed',
      description: 'Seed in todo',
      status: 'todo',
      priority: 'high',
      assignee: 'SA',
      labels: ['bug'],
      dueDate: null
    },
    {
      id: 'TASK-003',
      title: 'In progress seed',
      description: 'Seed in progress',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'JD',
      labels: ['feature'],
      dueDate: null
    },
    {
      id: 'TASK-004',
      title: 'Review seed',
      description: 'Seed in review',
      status: 'review',
      priority: 'medium',
      assignee: 'AS',
      labels: ['improvement'],
      dueDate: null
    },
    {
      id: 'TASK-005',
      title: 'Done seed',
      description: 'Seed in done',
      status: 'done',
      priority: 'low',
      assignee: 'SA',
      labels: ['feature'],
      dueDate: null
    }
  ] as Task[],
  dueDates: [
    {
      id: 'TASK-001',
      title: 'Due today',
      description: 'Due today seed',
      status: 'todo',
      priority: 'low',
      assignee: 'SA',
      labels: ['feature'],
      dueDate: new Date().toISOString().split('T')[0]
    },
    {
      id: 'TASK-002',
      title: 'Due tomorrow',
      description: 'Due tomorrow seed',
      status: 'todo',
      priority: 'medium',
      assignee: 'JD',
      labels: ['bug'],
      dueDate: (() => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d.toISOString().split('T')[0];
      })()
    },
    {
      id: 'TASK-003',
      title: 'Overdue',
      description: 'Overdue seed',
      status: 'todo',
      priority: 'high',
      assignee: 'AS',
      labels: ['urgent'],
      dueDate: (() => {
        const d = new Date();
        d.setDate(d.getDate() - 1);
        return d.toISOString().split('T')[0];
      })()
    }
  ] as Task[]
};
