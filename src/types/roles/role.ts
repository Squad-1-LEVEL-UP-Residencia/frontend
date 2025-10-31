import { Permission } from "./permission"

export type Role = {
	id: string // UUID
	name: string
	description: string
	isSystemRole: boolean
	isActive: boolean
	createdAt: string // ISO datetime
	permissions: Permission[]
}
