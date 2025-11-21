"use server"

import { useToken } from "@/hooks/use-token"
import { env } from "@/lib/env"

type DeleteListFormData = { id: string }

export async function deleteList({ id }: DeleteListFormData) {
	try {
		const token = await useToken()

		const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/lists/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		})

		if (!res.ok) {
			const err = await res.json().catch(() => ({}))
			return {
				success: false,
				status: res.status,
				error: err?.message || "Erro ao remover lista"
			}
		}

		return { success: true, status: res.status }
	} catch (e) {
		return {
			success: false,
			error: e instanceof Error ? e.message : "Erro desconhecido"
		}
	}
}
