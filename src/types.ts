export type TaskPriority = 'urgent' | 'normal' | 'low';
export type TaskStatus = 'pending' | 'completed' | 'postponed' | 'problematic';

export interface Task {
  id: string;
  title: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: string;
  children?: Task[];
}