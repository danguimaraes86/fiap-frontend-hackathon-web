export interface Task {
  id: string
  userId: string

  // Informações básicas
  title: string
  description: string | null

  // Organização
  status: TaskStatus
  priority: TaskPriority

  // Prazos
  dueDate: string | null
  startDate: string | null

  // Tracking
  createdAt: string
  updatedAt: string
  completedAt: string | null
}

export const TASK_STATUSES = {
  PENDING: { value: 'pending', label: 'Pendente' },
  IN_PROGRESS: { value: 'in_progress', label: 'Em Progresso' },
  COMPLETED: { value: 'completed', label: 'Concluída' },
  CANCELLED: { value: 'cancelled', label: 'Cancelada' }
} as const
export type TaskStatus = typeof TASK_STATUSES[keyof typeof TASK_STATUSES]['value']

export const TASK_PRIORITIES = {
  LOW: { value: 'low', label: 'Baixa' },
  MEDIUM: { value: 'medium', label: 'Média' },
  HIGH: { value: 'high', label: 'Alta' },
  URGENT: { value: 'urgent', label: 'Urgente' }
} as const
export type TaskPriority = typeof TASK_PRIORITIES[keyof typeof TASK_PRIORITIES]['value']
