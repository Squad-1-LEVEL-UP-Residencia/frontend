"use server"

import { env } from "@/lib/env"
import { getToken } from "@/hooks/get-token"
import { Role } from "@/data/roles/role"

export async function getRoles() {
	const accessToken = await getToken()
	if (!accessToken) {
		return undefined
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
		return undefined
	}

	// const roles: Role[] = data
	const roles = data
	console.log(roles)
	return roles
}
