"use server"

import { env } from "@/lib/env"
import { useToken } from "@/hooks/use-token"
import { Permission } from "@/types/roles/permission"

export async function getPermissions(): Promise<Permission[]> {
	const accessToken = await useToken()
	if (!accessToken) {
		return [] as Permission[]
	}

	const api = env.NEXT_PUBLIC_API_URL
	const result = await fetch(`${api}/roles/permissions`, {
		// next: {
		// 	tags: ["permissions"],
		// 	revalidate: 300
		// },
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`
		},
		cache: "force-cache"
	})
	const data = await result.json()

	console.log("PERMISSIONS DATA:", data)
	if (!result.ok) {
		return [] as Permission[]
	}
	return data as Permission[]
}
