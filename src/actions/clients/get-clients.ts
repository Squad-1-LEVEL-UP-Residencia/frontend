"use server"

import { env } from "@/lib/env"
import { useToken } from "@/hooks/use-token"
import { Client } from "@/types/clients/client"

export async function getClients(page: number, search?: string) {
	const accessToken = await useToken()
	if (!accessToken) {
		return [] as Client[]
	}

	const api = env.NEXT_PUBLIC_API_URL
	const result = await fetch(`${api}/clients?page=${page}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`
		}
	})
	const data = await result.json()
	// console.log("Roles fetched:", data.data)

	if (!result.ok) {
		return [] as Client[]
	}
	if (data.clients && search) {
		const filteredClients = data.clients.filter(
			(client: Client) =>
				client.companyName.toLowerCase().includes(search.toLowerCase()) ||
				client.cnpj.toLowerCase().includes(search.toLowerCase()) ||
				client.email.toLowerCase().includes(search.toLowerCase())
		)
		return filteredClients as Client[]
	}

	return data.data as Client[]
}
