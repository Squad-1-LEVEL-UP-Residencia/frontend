"use server"

import { env } from "@/lib/env"
import { useToken } from "@/hooks/use-token"

export async function getUsers(search?: string) {
	const accessToken = await useToken()
	if (!accessToken) {
		return null
	}

	const api = env.NEXT_PUBLIC_API_URL
	const result = await fetch(`${api}/users`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`
		}
	})

	if (!result.ok) {
		return null
	}

	const users = await result.json()

	if (search) {
		return users.filter((user: { name: string; email: string }) => {
			const lowerSearch = search.toLowerCase()
			return user.name.toLowerCase().includes(lowerSearch) || user.email.toLowerCase().includes(lowerSearch)
		})
	}

	return users
}
