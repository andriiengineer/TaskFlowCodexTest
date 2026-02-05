export {};

declare global {
  interface Window {
    __TEST_API__: {
      getTasks: () => Array<{
        id: string;
        title: string;
        description: string;
        status: string;
        priority: string;
        assignee: string;
        labels: string[];
        dueDate: string | null;
      }>;
      getTaskById: (id: string) => unknown;
      getSelectedTasks: () => string[];
      getHistoryLength: () => number;
      getHistoryIndex: () => number;
    };
  }
}
