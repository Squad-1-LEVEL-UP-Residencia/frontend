"use server"

import { env } from "@/lib/env"
import { useToken } from "@/hooks/use-token"
import { DashboardData } from "@/types/dashboard/dashboard"

export async function getDashboardData(userId?: string) {
	const accessToken = await useToken()
	if (!accessToken) {
		return [] as DashboardData[]
	}

	const api = env.NEXT_PUBLIC_API_URL

	// Constrói a URL com a query string se userId for fornecido
	const queryParams = userId ? `?user=${userId}` : ""
	const url = `${api}/dashboard/tasks-count-per-user-by-list${queryParams}`

	const result = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`
		}
	})

	if (!result.ok) {
		console.error("Failed to fetch dashboard data:", result.statusText)
		return [] as DashboardData[]
	}

	const response = await result.json()
	return response.data as DashboardData[]
}
