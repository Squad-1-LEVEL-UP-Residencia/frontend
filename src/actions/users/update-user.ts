"use server"

import { useToken } from "@/hooks/use-token"
import { env } from "@/lib/env"
import { z } from "zod"

const updateUserSchema = z.object({
	id: z.uuid("ID inválido"),
	name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres").optional(),
	email: z.email("Email inválido").optional(),
	role_id: z.coerce.number().optional()
})

type UpdateUserSchema = z.infer<typeof updateUserSchema>

export async function updateUser({ id, name, email, role_id }: UpdateUserSchema) {
	try {
		const token = await useToken()
		console.log({ id, name, email, role_id })
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/users/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify({ name, email, role_id })
		})

		if (!response.ok) {
			const error = await response.json()
			console.log(error)
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

			return { error: error.message || "Erro ao editar usuário", status: response.status, success: false }
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
