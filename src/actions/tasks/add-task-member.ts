"use server"

import { validationErrorHelper } from "@/data/helpers/validationErrorHelper"
import { useToken } from "@/hooks/use-token"

export interface AddTaskMemberData {
	taskId: number
	userId: number
}

export async function addTaskMember(data: AddTaskMemberData) {
	const token = await useToken()

	const baseUrl = process.env.NEXT_PUBLIC_API_URL
	const response = await fetch(`${baseUrl}/tasks/${data.taskId}/members`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			user_id: data.userId
		})
	})

	console.log(`[addTaskMember] Response status: ${response.status}`)

	// Verificar o content-type da resposta
	const contentType = response.headers.get("content-type")
	console.log(`[addTaskMember] Content-Type: ${contentType}`)

	if (!response.ok) {
		let error
		try {
			error = await response.json()
		} catch (e) {
			console.error("[addTaskMember] Erro ao fazer parse da resposta de erro:", e)
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
		// Verificar se a resposta é JSON
		if (!contentType || !contentType.includes("application/json")) {
			const textResponse = await response.text()
			console.error("[addTaskMember] Resposta não é JSON:", textResponse.substring(0, 200))
			return {
				success: false,
				error: "Endpoint retornou resposta inválida (esperado JSON)",
				status: response.status,
				raw: null
			}
		}

		const responseData = await response.json()
		console.log("[addTaskMember] Sucesso:", responseData)
		return {
			success: true,
			status: response.status,
			data: responseData,
			raw: responseData
		}
	} catch (e) {
		console.error("[addTaskMember] Erro ao fazer parse da resposta de sucesso:", e)
		return {
			success: false,
			error: "Erro ao processar resposta do servidor",
			status: response.status,
			raw: null
		}
	}
}
