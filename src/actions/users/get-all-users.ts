"use server"

import { env } from "@/lib/env"
import { useToken } from "@/hooks/use-token"
import { User } from "@/types/users/user"

export async function getAllUsers(search?: string) {
	const accessToken = await useToken()
	if (!accessToken) {
		return [] as User[]
	}

	const api = env.NEXT_PUBLIC_API_URL
	const result = await fetch(`${api}/all-users`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`
		}
	})

	if (!result.ok) {
		return [] as User[]
	}

	const response = await result.json()
	// API retorna { data: User[] } — precisamos devolver o array `data`

	return (response.users ?? []) as User[]
}
