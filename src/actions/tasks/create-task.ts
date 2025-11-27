"use server"

import { validationErrorHelper } from "@/data/helpers/validationErrorHelper"
import { useToken } from "@/hooks/use-token"
import { CreateTaskFormData } from "@/types/tasks/create-task-schema"
import { Task } from "@/types/tasks/task"

export async function createTask(formData: CreateTaskFormData) {
	const token = await useToken()

	const baseUrl = process.env.NEXT_PUBLIC_API_URL
	const response = await fetch(`${baseUrl}/tasks`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			list_id: formData.list_id,
			client_id: formData.client_id,
			title: formData.title,
			description: formData.description,
			status: formData.status,
			priority: formData.priority,
			start_date: formData.start_date,
			end_date: formData.end_date
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
		task: data.task as Task,
		raw: data
	}
}
