export type TaskStatus = string

export const DEFAULT_TASK_STATUSES = {
  TODO: "todo",
  DOING: "doing",
  DONE: "done"
} as const

export type TaskPriority = "low" | "medium" | "high"

export interface TaskMember {
  id: string
  name: string
  avatar?: string
}

export interface TaskAttachment {
  id: string
  name: string
  url: string
  uploadedAt: Date
}

export interface TaskComment {
  id: string
  author: TaskMember
  content: string
  createdAt: Date
}

export interface TaskChecklistItem {
  id: string
  content: string
  completed: boolean
}

export interface Task {
  id: string
  title: string
  description: string
  chatGptLink?: string
  status: TaskStatus
  priority: TaskPriority
  tags: string[]
  campaign?: string
  dueDate?: Date
  members: TaskMember[]
  attachments: TaskAttachment[]
  comments: TaskComment[]
  checklist: TaskChecklistItem[]
  progress: number
  createdAt: Date
  updatedAt: Date
}

export interface TaskColumn {
  id: string
  title: string
  tasks: Task[]
  isDefault?: boolean
}
