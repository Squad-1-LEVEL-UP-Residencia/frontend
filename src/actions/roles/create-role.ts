"use server"

import { CreateRoleFormData } from "@/types/roles/create-role-schema"

export async function createRole({}: CreateRoleFormData) {
	const baseUrl = process.env.NEXT_PUBLIC_API_URL
	const res = await fetch(`${baseUrl}/roles`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({})

		//revalidateTag
	})
}
