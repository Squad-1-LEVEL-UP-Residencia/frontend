"use server"

import { validationErrorHelper } from "@/data/helpers/validationErrorHelper"
import { useToken } from "@/hooks/use-token"
import { EditRoleFormData } from "@/types/roles/edit-role-schema"
import { Role } from "@/types/roles/role"

export async function updateRole(id: string, { name, description, isActive, permissions }: EditRoleFormData) {
	const token = await useToken()

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
			isActive,
			permissionIds: permissions
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
		role: {
			id: data.id,
			name: data.name,
			description: data.description,
			isSystemRole: data.isSystemRole,
			isActive: data.isActive,
			createdAt: data.createdAt,
			permissions: data.permissions
		} as Role,
		raw: data
	}
}
