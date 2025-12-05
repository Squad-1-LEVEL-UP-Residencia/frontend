"use server"

import { useToken } from "@/hooks/use-token"
import { env } from "@/lib/env"

export interface TasksByList {
	listId: number
	listName: string
	taskCount: number
}

export async function getTasksByList(userId?: number) {
	const token = await useToken()
	if (!token) {
		return []
	}

	const api = env.NEXT_PUBLIC_API_URL
	const url = userId
		? `${api}/dashboard/tasks-by-list?userId=${userId}`
		: `${api}/dashboard/tasks-by-list`

	const result = await fetch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})

	if (!result.ok) {
		console.error("Erro ao buscar tarefas por lista")
		return []
	}

	const response = await result.json()
	return response.data as TasksByList[]
}
