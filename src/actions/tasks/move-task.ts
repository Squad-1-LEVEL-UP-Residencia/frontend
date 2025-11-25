"use server"

import { env } from "@/lib/env"
import { useToken } from "@/hooks/use-token"

export interface MoveTaskData {
	taskId: string
	listId: string
	position: number
}

export interface MoveTaskResponse {
	success: boolean
	error?: string
	task?: any
}

export async function moveTask(data: MoveTaskData): Promise<MoveTaskResponse> {
	const accessToken = await useToken()
	if (!accessToken) {
		return { success: false, error: "Não autorizado" }
	}

	const api = env.NEXT_PUBLIC_API_URL

	try {
		const result = await fetch(`${api}/tasks/${data.taskId}/move`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${accessToken}`
			},
			body: JSON.stringify({
				list_id: data.listId,
				position: data.position
			})
		})

		const response = await result.json()

		if (!result.ok) {
			return { success: false, error: response.message || "Erro ao mover tarefa" }
		}

		return { success: true, task: response.data }
	} catch (error) {
		console.error("Error moving task:", error)
		return { success: false, error: "Erro ao mover tarefa" }
	}
}
