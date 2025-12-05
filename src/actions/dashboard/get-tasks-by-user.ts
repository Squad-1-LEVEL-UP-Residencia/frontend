"use server"

import { useToken } from "@/hooks/use-token"
import { env } from "@/lib/env"

export interface TasksByUser {
	userId: number
	userName: string
	taskCount: number
}

export async function getTasksByUser() {
	const token = await useToken()
	if (!token) {
		return []
	}

	const api = env.NEXT_PUBLIC_API_URL
	const result = await fetch(`${api}/dashboard/tasks-by-user`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})

	if (!result.ok) {
		console.error("Erro ao buscar tarefas por usuário")
		return []
	}

	const response = await result.json()
	return response.data as TasksByUser[]
}
