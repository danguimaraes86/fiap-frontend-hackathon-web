export interface Task {
  id: string
  userId: string

  // Informações básicas
  title: string
  description: string | null

  // Organização
  status: TaskStatus

  // Prazos
  dueDate: string | null

  // Tracking
  createdAt: string
  updatedAt: string
  completedAt: string | null
}

export const TASK_STATUSES = {
  PENDING: {
    value: 'pending',
    label: 'Pendente',
    class: 'status-pending',
  },
  IN_PROGRESS: {
    value: 'in_progress',
    label: 'Em Progresso',
    class: 'status-in-progress',
  },
  COMPLETED: {
    value: 'completed',
    label: 'Concluída',
    class: 'status-completed',
  }
} as const
export type TaskStatus = typeof TASK_STATUSES[keyof typeof TASK_STATUSES]['value']

export function getTaskStatusInfo(status: TaskStatus) {
  return Object.values(TASK_STATUSES).find(s => s.value === status) ??
    { value: status, label: status, class: '#5d5f5f' }
}
