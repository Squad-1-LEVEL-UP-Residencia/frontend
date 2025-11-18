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

export type PaginatedRoles = {
	current_page: number
	data: Role[]
	first_page_url: string
	from: number
	last_page: number
	last_page_url: string
	links: Array<{ url: string | null; label: string; active: boolean }>
	next_page_url: string | null
	path: string
	per_page: number
	prev_page_url: string | null
	to: number
	total: number
}
