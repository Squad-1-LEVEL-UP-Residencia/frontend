"use server"

import { validationErrorHelper } from "@/data/helpers/validationErrorHelper"
import { useToken } from "@/hooks/use-token"
import { CreateRoleFormData } from "@/types/roles/create-role-schema"
import { Role } from "@/types/roles/role"
import { revalidateTag } from "next/cache"
import toast from "react-hot-toast"
import { success } from "zod"

export async function createRole({}: CreateRoleFormData) {
	const token = await useToken()

	const baseUrl = process.env.NEXT_PUBLIC_API_URL
	const response = await fetch(`${baseUrl}/roles`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({})
	})

	if (!response.ok) {
		const error = await response.json()
		const { error: errorTitle, validationErrors, raw } = validationErrorHelper(error)

		console.log(validationErrors)
		return {
			success: false,
			error: errorTitle,
			errors: validationErrors,
			status: response.status,
			raw
		}
	}

	revalidateTag("roles")
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
