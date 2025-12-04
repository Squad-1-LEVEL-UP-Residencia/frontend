"use client"

import { Modal } from "@/components/private/ui/modal"
import { Title } from "@/components/private/ui/title"
import { ViewTaskForm } from "./view-task-form"
import { useEffect, useState } from "react"
import type { Task } from "@/types/tasks/task"
import { DeleteTaskModal } from "../delete/delete-task-modal"
import Image from "next/image"
import Link from "next/link"

export function ViewTaskModal() {
	const [task, setTask] = useState<Task | null>(null)

	useEffect(() => {
		const handler = (e: Event) => {
			const detail = (e as CustomEvent<Task>).detail
			setTask(detail ?? null)
		}
		window.addEventListener("task:view-open", handler as EventListener)
		return () => window.removeEventListener("task:view-open", handler as EventListener)
	}, [])

	return (
		<>
			<Modal id="view_task_modal" variant="lg" hasCloseButton className="max-w-6xl">
				<div className="flex flex-col gap-2">
					<div className="flex items-center gap-2">
						<Title variant="sm">{task?.client?.companyName}</Title>
						<Link href={task?.client.agentUrl || "#"} target="_blank">
							<Image src={"/chatgpt.png"} alt={"ChatGPT"} width={25} height={25} />
						</Link>
					</div>
					{task && <ViewTaskForm task={task} />}
				</div>
			</Modal>
			<DeleteTaskModal />
		</>
	)
}
