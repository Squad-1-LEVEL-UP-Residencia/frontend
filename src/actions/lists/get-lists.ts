"use server"

import { env } from "@/lib/env"
import { useToken } from "@/hooks/use-token"
import { PaginatedLists, List } from "@/types/lists/list"

export async function getLists(page: number, search?: string) {
	const accessToken = await useToken()
	if (!accessToken) {
		return {} as PaginatedLists
	}

	const api = env.NEXT_PUBLIC_API_URL
	const result = await fetch(`${api}/lists?page=${page}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`
		}
	})
	const response = await result.json()
	// console.log("Roles fetched:", data.data)

	if (!result.ok) {
		return {} as PaginatedLists
	}
	console.log("Lists fetched:", response.data)

	if (response.data && search) {
		const filteredLists = response.data.filter((list: List) => list.title.toLowerCase().includes(search.toLowerCase()))
		response.data = filteredLists
	}

	return response as PaginatedLists
}
