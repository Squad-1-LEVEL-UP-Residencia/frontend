export type Permission = {
	id: number
	slug: string
	label: string
	details: string | null
	created_at: string
	updated_at: string
	deleted_at: string | null
	pivot: {
		role_id: number
		permission_id: number
	}
}
