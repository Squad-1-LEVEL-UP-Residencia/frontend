"use server"

import { useToken } from "@/hooks/use-token"
import { env } from "@/lib/env"

type UpdateListFormData = {
	id: string
	name: string
}

export async function updateList(formData: UpdateListFormData) {
	try {
		const token = await useToken()
		const { id, ...listData } = formData

		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/lists/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(listData)
		})

		if (!response.ok) {
			const error = await response.json()
			// Tratamento específico para erros de validação
			if (error.errors && typeof error.errors === "object") {
				const validationErrors = Object.entries(error.errors)
					.map(([field, messages]) => `${field}: ${(messages as string[]).join(", ")}`)
					.join(" | ")

				return {
					error: error.title || "Erro de validação",
					status: response.status,
					validationErrors,
					raw: error,
					success: false
				}
			}

			return { error: error.message || "Erro ao editar lista", status: response.status, success: false }
		}

		const data = await response.json()
		return {
			success: true,
			status: response.status,
			raw: data
		}
	} catch (error) {
		return { error: error instanceof Error ? error.message : "Erro desconhecido", success: false }
	}
}
