"use server"

import { validationErrorHelper } from "@/data/helpers/validationErrorHelper"
import { useToken } from "@/hooks/use-token"

export interface RemoveLinkData {
	taskId: number
	linkId: number
}

export async function deleteTaskLink(data: RemoveLinkData) {
	const token = await useToken()

	const baseUrl = process.env.NEXT_PUBLIC_API_URL
	const response = await fetch(`${baseUrl}/tasks/${data.taskId}/links/${data.linkId}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})

	if (!response.ok) {
		let error
		try {
			error = await response.json()
		} catch (e) {
			console.error("[removeLink] Erro ao fazer parse da resposta de erro:", e)
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
			message: "Membro removido com sucesso"
		}
	} catch (e) {
		console.error("[removeLink] Erro ao fazer parse da resposta de sucesso:", e)
		return {
			success: false,
			error: "Erro ao processar resposta do servidor",
			status: response.status,
			raw: null
		}
	}
}
