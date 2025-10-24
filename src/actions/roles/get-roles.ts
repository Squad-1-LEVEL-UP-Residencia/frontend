"use server"

import { env } from "@/lib/env"
import { useToken } from "@/hooks/use-token"
import { Role } from "@/types/roles/role"

export async function getRoles(search?: string) {
	const accessToken = await useToken()
	if (!accessToken) {
		return [] as Role[]
	}

	const api = env.NEXT_PUBLIC_API_URL
	const result = await fetch(`${api}/roles`, {
		next: {
			revalidate: 300
		},
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`
		}
	})
	const data = await result.json()
	if (!result.ok) {
		return [] as Role[]
	}

	if (data.roles && search) {
		const filteredRoles = data.roles.filter(
			(role: Role) =>
				role.name.toLowerCase().includes(search.toLowerCase()) ||
				role.description.toLowerCase().includes(search.toLowerCase())
		)
		return filteredRoles as Role[]
	}

	return data.roles as Role[]
}
