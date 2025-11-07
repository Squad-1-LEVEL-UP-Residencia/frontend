import { Permission } from "./permission"

export type Role = {
	id: number
	slug: string
	name: string
	is_system_role: boolean
	created_at: string
	updated_at: string
	deleted_at: string | null
	permissions: Permission[]
}
