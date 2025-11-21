"use client"

import { Modal } from "@/components/private/ui/modal"
import { Title } from "@/components/private/ui/title"
import { CreateTaskForm } from "./create-task-form"
import { useEffect, useState } from "react"
import type { TaskStatus } from "@/types/tasks/task"

export function CreateTaskModal() {
	const [columnStatus, setColumnStatus] = useState<TaskStatus>("todo")

	useEffect(() => {
		const handler = (e: Event) => {
			const detail = (e as CustomEvent<TaskStatus>).detail
			setColumnStatus(detail ?? "todo")
		}
		window.addEventListener("task:create-open", handler as EventListener)
		return () => window.removeEventListener("task:create-open", handler as EventListener)
	}, [])

	return (
		<Modal id="create_task_modal" variant="lg" hasCloseButton>
			<div className="flex flex-col gap-6">
				<Title variant="sm">Criar novo card</Title>
				<CreateTaskForm columnStatus={columnStatus} />
			</div>
		</Modal>
	)
}
