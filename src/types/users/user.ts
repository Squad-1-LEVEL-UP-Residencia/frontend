import { Paginated } from "../global/paginated"
import { Role } from "../roles/role"

export type User = {
	id: string
	role_id: number
	name: string
	email: string
	email_verified_at: string | null
	avatar_url?: string
	created_at: string
	updated_at: string
	deleted_at: string | null
	role: Role
}

export interface PaginatedUsers extends Paginated {
	data: User[]
}
