export type Permission = {
	id: string
	name: string
	description?: string
}

export type Role = {
	id: string // UUID
	name: string
	description: string
	isSystemRole: boolean
	isActive: boolean
	createdAt: string // ISO datetime
	permissions: Permission[]
}
