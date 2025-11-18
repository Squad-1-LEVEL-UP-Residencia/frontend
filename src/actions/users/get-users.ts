"use server"

import { env } from "@/lib/env"
import { useToken } from "@/hooks/use-token"
import { PaginatedUsers, User } from "@/types/users/user"

export async function getUsers(page: number, search?: string) {
	const accessToken = await useToken()
	if (!accessToken) {
		return {} as PaginatedUsers
	}

	const api = env.NEXT_PUBLIC_API_URL
	const result = await fetch(`${api}/users?page=${page}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`
		}
	})

	if (!result.ok) {
		return {} as PaginatedUsers
	}

	const response = await result.json()
	console.log("Users fetched:", response.data)
	if (response.data && search) {
		console.log("Filtering users with search:", search)
		const filteredUsers = response.data.filter(
			(user: User) =>
				user.name.toLowerCase().includes(search.toLocaleLowerCase()) ||
				user.email.toLowerCase().includes(search.toLocaleLowerCase())
		)

		response.data = filteredUsers
	}

	return response as PaginatedUsers
}
