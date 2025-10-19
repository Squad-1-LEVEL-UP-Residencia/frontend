"use server"

import { env } from "@/lib/env"
import { useToken } from "@/hooks/use-token"

export async function getPermissions() {
	const accessToken = await useToken()
	if (!accessToken) {
		return { permissions: [] } as { permissions: [] }
	}

	const api = env.NEXT_PUBLIC_API_URL
	const result = await fetch(`${api}/roles/permissions`, {
		next: {
			tags: ["permissions"],
			revalidate: 300
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
		return { permissions: [] } as { permissions: [] }
	}
	return data
}
