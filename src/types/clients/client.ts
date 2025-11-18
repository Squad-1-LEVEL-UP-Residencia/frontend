export interface Client {
	id: number
	companyName: string
	cnpj: string
	address: string
	primaryContact: string
	phone: string
	email: string
	avatarUrl?: string
	agentUrl?: string
	created_at: string
	updated_at: string
	deleted_at: string | null
}

export type PaginatedClients = {
	current_page: number
	data: Client[]
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
