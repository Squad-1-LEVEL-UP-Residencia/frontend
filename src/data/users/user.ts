export type User = {
	id: string
	name: string
	email: string
	avatarUrl?: string
	role: Array<string> //Estranho ser um array mas tem q ver com os cara do back
}
