"use server"

import { env } from "@/lib/env"
import { useToken } from "@/hooks/use-token"
import { PaginatedRoles, Role } from "@/types/roles/role"

export async function getRoles(page: number, search?: string) {
	const accessToken = await useToken()
	if (!accessToken) {
		return {} as PaginatedRoles
	}

	const api = env.NEXT_PUBLIC_API_URL
	const result = await fetch(`${api}/roles?page=${page}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`
		}
	})
	const response = await result.json()

	if (!result.ok) {
		return {} as PaginatedRoles
	}
	if (response.data && search) {
		const filteredRoles = response.data.filter(
			(role: Role) =>
				role.name.toLowerCase().includes(search.toLowerCase()) || role.slug.toLowerCase().includes(search.toLowerCase())
		)
		response.data = filteredRoles
	}

	return response as PaginatedRoles
}
