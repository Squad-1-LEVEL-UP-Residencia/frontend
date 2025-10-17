"use server"

import { env } from "@/lib/env"
import { useToken } from "@/hooks/use-token"

export async function getUsers() {
	const accessToken = await useToken()
	if (!accessToken) {
		return null
	}

	const api = env.NEXT_PUBLIC_API_URL
	const result = await fetch(`${api}/users`, {
		next: {
			tags: ["users"]
		},
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`
		},
		cache: "force-cache"
	})

	if (!result.ok) {
		return null
	}

	const users = await result.json()

	return users
}
