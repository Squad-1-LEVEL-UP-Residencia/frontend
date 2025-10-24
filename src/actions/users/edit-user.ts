"use server"

import { env } from "@/lib/env"
import type { EditUserFormData } from "@/types/users/edit-user-schema"

export async function editUser({ id, name, email, role }: EditUserFormData) {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/users/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ userId: id, name, email, roleIds: [role] })
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
					raw: error
				}
			}

			return { error: error.message || "Erro ao criar usuário", status: response.status, success: false }
		}

		const data = await response.json()
		return {
			success: true,
			status: response.status,
			// user: {
			// 	id: data.id,
			// 	name: data.name,
			// 	email: data.email,
			// 	roles: data.roles,
			// 	createdAt: data.createdAt
			// },
			raw: data
		}
	} catch (error) {
		return { error: error instanceof Error ? error.message : "Erro desconhecido", success: false }
	}
}
