"use client"

import { Button } from "@/components/private/ui/button"
import { Modal, ModalFooter } from "@/components/private/ui/modal"
import { Paragraph } from "@/components/private/ui/paragraph"
import { Title } from "@/components/private/ui/title"
import { useEffect, useState } from "react"
import { User } from "@/types/users/user"
import { useMutation } from "@tanstack/react-query"
import { removeUser } from "@/actions/users/remove-user"
import { queryClient } from "@/lib/react-query"
import toast from "react-hot-toast"
import { closeModal } from "@/data/helpers/closeModal"
import { Task } from "@/types/tasks/task"
import { deleteTask } from "@/actions/tasks/delete-task"

export function DeleteTaskModal() {
	const [task, setTask] = useState<Task | null>(null)

	useEffect(() => {
		const handler = (e: Event) => {
			const detail = (e as CustomEvent<Task>).detail
			setTask(detail ?? null)
		}
		window.addEventListener("task:delete-open", handler as EventListener)
		return () => window.removeEventListener("task:delete-open", handler as EventListener)
	}, [])

	const { mutateAsync: deleteTaskMutation, isPending } = useMutation({
		mutationFn: async () => {
			if (!task) return { success: false, error: "Tarefa não informada" }
			return deleteTask(task.id)
		},
		onSuccess: (res) => {
			if (res.success) {
				toast.success("Tarefa removida com sucesso!")
				queryClient.invalidateQueries({ queryKey: ["lists"] })
				closeModal("delete_task_modal")
				closeModal("view_task_modal")
			} else {
				toast.error(res.error ?? "Erro ao remover tarefa")
				closeModal("delete_task_modal")
			}
		}
	})

	async function deleteUser() {
		await deleteTaskMutation()

		queryClient.invalidateQueries({ queryKey: ["users"] })
	}

	return (
		<Modal id="delete_task_modal" hasCloseButton className="flex flex-col gap-16">
			<Title variant="sm">Remover tarefa</Title>
			<Paragraph>
				Tem certeza que deseja remover {task?.title ?? "esta tarefa"}? Esta ação não pode ser desfeita.
			</Paragraph>

			<ModalFooter>
				<Button
					outline={true}
					type="button"
					onClick={() => closeModal("delete_task_modal")}
					className="min-w-20 px-4"
					disabled={isPending}
				>
					Cancelar
				</Button>
				<Button
					color="danger"
					outline={false}
					className="min-w-20 px-4"
					disabled={isPending}
					onClick={() => deleteUser()}
				>
					{isPending ? "Removendo..." : "Remover"}
				</Button>
			</ModalFooter>
		</Modal>
	)
}
