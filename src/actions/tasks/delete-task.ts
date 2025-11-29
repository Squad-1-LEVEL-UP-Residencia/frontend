"use server"

import { validationErrorHelper } from "@/data/helpers/validationErrorHelper"
import { useToken } from "@/hooks/use-token"

export async function deleteTask(id: number) {
	const token = await useToken()

	const baseUrl = process.env.NEXT_PUBLIC_API_URL
	const response = await fetch(`${baseUrl}/tasks/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})

	if (!response.ok) {
		const error = await response.json()
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

	console.log(response)

	return {
		success: true
	}
}
