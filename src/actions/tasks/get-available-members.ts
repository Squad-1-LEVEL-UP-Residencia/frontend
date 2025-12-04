"use server"

import { env } from "@/lib/env"
import { useToken } from "@/hooks/use-token"
import { User } from "@/types/users/user"

export async function getAvailableMembers(taskId: number) {
	const accessToken = await useToken()
	if (!accessToken) {
		return [] as User[]
	}

	const api = env.NEXT_PUBLIC_API_URL
	const result = await fetch(`${api}/tasks/${taskId}/available-members`, {
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
	console.log("Users fetched:", response.available_members)

	return response.available_members as User[]
}
