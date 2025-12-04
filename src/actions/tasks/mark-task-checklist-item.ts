"use server"

import { validationErrorHelper } from "@/data/helpers/validationErrorHelper"
import { useToken } from "@/hooks/use-token"

export interface MarkTaskChecklistItemData {
	taskId: number
	checklistId: number
	itemId: number
	is_completed: boolean
}

export async function markTaskChecklistItem(data: MarkTaskChecklistItemData) {
	const token = await useToken()

	const baseUrl = process.env.NEXT_PUBLIC_API_URL
	const response = await fetch(
		`${baseUrl}/tasks/${data.taskId}/checklists/${data.checklistId}/item/${data.itemId}/toggle`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({
				is_completed: data.is_completed
			})
		}
	)

	const contentType = response.headers.get("content-type")
	if (!response.ok) {
		let error
		try {
			error = await response.json()
		} catch (e) {
			console.error("[addTaskChecklist] Erro ao fazer parse da resposta de erro:", e)
			return {
				success: false,
				error: `Erro no servidor (${response.status})`,
				status: response.status,
				raw: null
			}
		}
		const { error: errorTitle, validationErrors, raw, details } = validationErrorHelper(error)

		console.log(error)
		return {
			success: false,
			error: errorTitle,
			details: validationErrors && details,
			status: response.status,
			raw
		}
	}

	// Tratar resposta de sucesso
	try {
		return {
			success: true,
			status: response.status,
			message: "Item marcado como completo com sucesso"
		}
	} catch (e) {
		console.error("[addTaskChecklist] Erro ao fazer parse da resposta de sucesso:", e)
		return {
			success: false,
			error: "Erro ao processar resposta do servidor",
			status: response.status,
			raw: null
		}
	}
}
