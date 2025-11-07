"use server"

import { env } from "@/lib/env"
import { useToken } from "@/hooks/use-token"

export async function getMe() {
	const accessToken = await useToken()
	if (!accessToken) {
		return null
	}

	const api = env.NEXT_PUBLIC_API_URL
	const result = await fetch(`${api}/auth/me`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${accessToken}`
		}
	})

	if (!result.ok) {
		const errorText = await result.text()
		console.log("Erro ao buscar o usuário")
		console.log(result)
		return {
			ok: false,
			status: result.status,
			error: errorText
		}
	}

	const me = await result.json()
	console.log("Usuário encontrado:", me)
	return { ok: true, status: result.status, data: me }
}
