"use server"

import { useToken } from "@/hooks/use-token"
import { env } from "@/lib/env"

export async function deleteRole(id: number) {
	try {
		const token = await useToken()

		const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/roles/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			}
		})

		if (!res.ok) {
			// console.log(res)
			const err = await res.json().catch(() => ({}))
			return {
				success: false,
				status: res.status,
				error: err?.message || "Erro ao remover usuário"
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
