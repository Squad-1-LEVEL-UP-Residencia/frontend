import { Client } from "../clients/client"
import { List } from "../lists/list"
import { User } from "../users/user"

export enum DEFAULT_TASK_STATUSES {
	pending = "pending",
	doing = "pending",
	done = "pending"
}

export type TaskStatus = (typeof DEFAULT_TASK_STATUSES)[keyof typeof DEFAULT_TASK_STATUSES]

export type TaskPriority = 0 | 1 | 2

export interface TaskMember {
	id: number
	name: string
}

export interface TaskLink {
	id: number
	title: string
	url: string
	uploadedAt: Date
}

export interface TaskComment {
	id: number
	task_id?: number
	user_id: string
	author: string
	author_role: string
	content: string
	created_at: string
	updated_at?: string
	deleted_at?: string | null
}

export interface TaskChecklist {
	id: number
	task_id?: number
	title: string
	created_at?: string
	updated_at?: string
	deleted_at?: string | null
	items: TaskChecklistItem[]
}

export interface TaskChecklistItem {
	id: number
	checklist_id?: number
	description?: string
	is_completed?: boolean
	created_at?: string
	updated_at?: string
	deleted_at?: string | null
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
	start_date?: Date
	end_date?: Date
	members?: User[]
	links?: TaskLink[]
	comments?: TaskComment[]
	checklists?: TaskChecklist[]
	progress?: number
	client: Client
	list: List
	createdAt: Date
	updatedAt: Date
}
