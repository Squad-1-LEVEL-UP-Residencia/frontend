"use server"

import { validationErrorHelper } from "@/data/helpers/validationErrorHelper"
import { useToken } from "@/hooks/use-token"

export interface updateTaskChecklistItemData {
	taskId: number
	checklistId: number
	description: string
	itemId: number
}

export async function updateTaskChecklistItem(data: updateTaskChecklistItemData) {
	const token = await useToken()

	const baseUrl = process.env.NEXT_PUBLIC_API_URL
	const response = await fetch(`${baseUrl}/tasks/${data.taskId}/checklists/${data.checklistId}/item/${data.itemId}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			description: data.description
		})
	})

	const contentType = response.headers.get("content-type")

	if (!response.ok) {
		let error
		try {
			error = await response.json()
		} catch (e) {
			console.error("[updateTaskChecklistItem] Erro ao fazer parse da resposta de erro:", e)
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
		if (!contentType || !contentType.includes("application/json")) {
			const textResponse = await response.text()
			console.error("[updateTaskChecklistItem] Resposta não é JSON:", textResponse.substring(0, 200))
			return {
				success: false,
				error: "Endpoint retornou resposta inválida (esperado JSON)",
				status: response.status,
				raw: null
			}
		}

		const responseData = await response.json()
		return {
			success: true,
			status: response.status,
			data: responseData,
			raw: responseData
		}
	} catch (e) {
		console.error("[updateTaskChecklistItem] Erro ao fazer parse da resposta de sucesso:", e)
		return {
			success: false,
			error: "Erro ao processar resposta do servidor",
			status: response.status,
			raw: null
		}
	}
}
