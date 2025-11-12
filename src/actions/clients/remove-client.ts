"use server"

import { useToken } from "@/hooks/use-token"
import { env } from "@/lib/env"

type DeleteClientFormData = { id: number }

export async function removeClient({ id }: DeleteClientFormData) {
	try {
		const token = await useToken()

		const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/clients/${id}`, {
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
				error: err?.message || "Erro ao remover cliente"
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
