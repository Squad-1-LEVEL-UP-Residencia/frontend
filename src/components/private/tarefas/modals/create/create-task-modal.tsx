"use client"

import { Modal } from "@/components/private/ui/modal"
import { Title } from "@/components/private/ui/title"
import { CreateTaskForm } from "./create-task-form"
import { useEffect, useState } from "react"
import type { TaskStatus } from "@/types/tasks/task"

export function CreateTaskModal() {
	const [columnId, setColumnId] = useState<number | null>(null)

	useEffect(() => {
		const handler = (e: Event) => {
			const detail = (e as CustomEvent<number>).detail
			setColumnId(detail ?? null)
		}

		window.addEventListener("task:create-open", handler as EventListener)
		return () => window.removeEventListener("task:create-open", handler as EventListener)
	}, [])

	return (
		<Modal id="create_task_modal" variant="lg" hasCloseButton>
			<div className="flex flex-col gap-6">
				<Title variant="sm">Criar novo card</Title>
				<CreateTaskForm list_id={columnId!} />
			</div>
		</Modal>
	)
}
