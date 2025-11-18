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

export type PaginatedUsers = {
	current_page: number
	data: User[]
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
