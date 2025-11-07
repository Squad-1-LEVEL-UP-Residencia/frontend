export type User = {
	id: string
	role_id: number
	name: string
	email: string
	email_verified_at: string | null
	avatar_url?: string
	created_at: string
	updated_at: string
	// role: Array<string> //Estranho ser um array mas tem q ver com os cara do back
}
