"use server"

import { env } from "@/lib/env"
import { useToken } from "@/hooks/use-token"
import { Client, PaginatedClients } from "@/types/clients/client"

export async function getClients(page: number, search?: string) {
	const accessToken = await useToken()
	if (!accessToken) {
		return {} as PaginatedClients
	}

	const api = env.NEXT_PUBLIC_API_URL
	const result = await fetch(`${api}/clients?page=${page}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`
		}
	})
	const response = await result.json()
	// console.log("Roles fetched:", data.data)

	if (!result.ok) {
		return {} as PaginatedClients
	}
	console.log("Clients fetched:", response.data)

	if (response.data && search) {
		const filteredClients = response.data.filter(
			(client: Client) =>
				client.companyName.toLowerCase().includes(search.toLowerCase()) ||
				client.cnpj.toLowerCase().includes(search.toLowerCase()) ||
				client.email.toLowerCase().includes(search.toLowerCase())
		)
		response.data = filteredClients
	}

	return response as PaginatedClients
}
