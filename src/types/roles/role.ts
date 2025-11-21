import { Paginated } from "../global/paginated"
import { Permission } from "./permission"

export type Role = {
	id: number
	slug: string
	name: string
	description: string
	is_system_role: boolean
	created_at: string
	updated_at: string
	deleted_at: string | null
	permissions: Permission[]
}

export interface PaginatedRoles extends Paginated {
	data: Role[]
}
