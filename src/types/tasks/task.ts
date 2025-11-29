import { Client } from "../clients/client"
import { List } from "../lists/list"

export const DEFAULT_TASK_STATUSES = {
	pending: "todo",
	doing: "doing",
	done: "done"
} as const

export type TaskStatus = (typeof DEFAULT_TASK_STATUSES)[keyof typeof DEFAULT_TASK_STATUSES]

export type TaskPriority = 0 | 1 | 2

export interface TaskMember {
	id: number
	name: string
	avatar?: string
}

export interface TaskAttachment {
	id: number
	name: string
	url: string
	uploadedAt: Date
}

export interface TaskComment {
	id: number
	author: TaskMember
	content: string
	createdAt: Date
}

export interface TaskChecklistItem {
	id: number
	content: string
	completed: boolean
}

export interface Task {
	id: number
	client_id: number
	list_id: number
	title: string
	description?: string
	status: TaskStatus
	priority: TaskPriority
	tags?: string[]
	position?: number
	campaign?: string
	start_date?: Date
	end_date?: Date
	members?: TaskMember[]
	attachments?: TaskAttachment[]
	comments?: TaskComment[]
	checklist?: TaskChecklistItem[]
	progress?: number
	client: Client
	list: List
	createdAt: Date
	updatedAt: Date
}
