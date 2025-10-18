"use server"

import { env } from "@/lib/env"
import { useToken } from "@/hooks/use-token"
import { Role } from "@/types/roles/role"

export async function getRoles() {
	const accessToken = await useToken()
	if (!accessToken) {
		return { roles: [] } as { roles: Role[] }
	}

	const api = env.NEXT_PUBLIC_API_URL
	const result = await fetch(`${api}/roles`, {
		next: {
			tags: ["roles"]
		},
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`
		},
		cache: "force-cache"
	})
	const data = await result.json()
	if (!result.ok) {
		return { roles: [] } as { roles: Role[] }
	}

	// const roles: Role[] = data
	return data
}
