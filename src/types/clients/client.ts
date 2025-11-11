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
