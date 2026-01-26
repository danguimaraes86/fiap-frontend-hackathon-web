export interface Task {
  id: string
  userId: string

  // Informações básicas
  title: string
  description?: string

  // Organização
  status: TaskStatus
  priority: TaskPriority
  order: number

  // Prazos
  dueDate?: string
  startDate?: string

  // Tracking
  createdAt: string
  updatedAt: string
  completedAt?: string
}

export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled'
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'
