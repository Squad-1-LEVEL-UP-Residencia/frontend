"use server"

import { type CreateUserFormData } from "@/data/auth/registerSchema"
import { env } from "@/lib/env"
import { revalidateTag } from "next/cache"

export async function createUser({ name, email, cargo }: CreateUserFormData) {
	try {
		const response = await fetch(`${env.NEXT_PUBLIC_API_URL}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ name, email, cargo, password: "Senha@123" })
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

			return { error: error.message || "Erro ao criar usuário", status: response.status, success: false }
		}
		revalidateTag("users")
		const data = await response.json()
		return {
			success: true,
			status: response.status,
			user: {
				id: data.id,
				name: data.name,
				email: data.email,
				roles: data.roles,
				createdAt: data.createdAt
			},
			raw: data
		}
	} catch (error) {
		return { error: error instanceof Error ? error.message : "Erro desconhecido", success: false }
	}
}
