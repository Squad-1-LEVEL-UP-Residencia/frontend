export interface DashboardData {
	// Adicione aqui os campos que o backend retornará
	// Exemplo:
	totalTasks?: number
	completedTasks?: number
	pendingTasks?: number
	tasksByUser?: TasksByUser[]
	tasksByList?: TasksByList[]
	recentActivity?: RecentActivity[]
}

export interface TasksByUser {
	userId: string
	userName: string
	taskCount: number
	completedCount?: number
	pendingCount?: number
}

export interface TasksByList {
	listId: string
	listName: string
	taskCount: number
	completedCount?: number
	pendingCount?: number
}

export interface RecentActivity {
	id: string
	type: string
	description: string
	user: string
	createdAt: string
}
