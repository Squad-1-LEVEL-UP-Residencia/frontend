"use server"

import { validationErrorHelper } from "@/data/helpers/validationErrorHelper"
import { useToken } from "@/hooks/use-token"
import { Task } from "@/types/tasks/task"
import { z } from "zod"

const moveTaskSchema = z.object({
	listId: z.number().min(1),
	position: z.number().min(0),
	taskId: z.number().min(1)
})

export type MoveTaskFormData = z.infer<typeof moveTaskSchema>

export async function moveTask(formData: MoveTaskFormData) {
	const token = await useToken()

	const baseUrl = process.env.NEXT_PUBLIC_API_URL
	const response = await fetch(`${baseUrl}/tasks/${formData.taskId}/move`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({
			listId: formData.listId,
			position: formData.position
		})
	})

	if (!response.ok) {
		console.log(response)
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
