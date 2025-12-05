// Tipos que representam o payload do backend (snake_case)
export interface DashboardData {
	// Campos conforme o backend (snake_case)
	user_id?: string
	user_name?: string
	total_tasks?: number
	tasks_by_list?: TasksByListApi[]
	// Observação: se quiser usar camelCase no frontend, converta aqui ao receber os dados
}

export interface TasksByListApi {
	list_id: number
	list_name: string
	count: number
}

// Tipos opcionais em camelCase para uso no frontend, caso queira mapear
export interface TasksByList {
	listId: string
	listName: string
	taskCount: number
	completedCount?: number
	pendingCount?: number
}

export interface TasksByUser {
	userId: string
	userName: string
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
