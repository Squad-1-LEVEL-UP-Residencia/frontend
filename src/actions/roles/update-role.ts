"use server"

import { validationErrorHelper } from "@/data/helpers/validationErrorHelper"
import { useToken } from "@/hooks/use-token"
import { EditRoleFormData } from "@/types/roles/edit-role-schema"
import { Role } from "@/types/roles/role"

export async function updateRole(id: number, { name, description, permissions }: EditRoleFormData) {
	const token = await useToken()
	console.log("caiu aq")
	const baseUrl = process.env.NEXT_PUBLIC_API_URL
	const response = await fetch(`${baseUrl}/roles/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			name,
			description,
			permissions: permissions
		})
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

	const data = await response.json()
	return {
		success: true,
		status: response.status,
		raw: data
	}
}
