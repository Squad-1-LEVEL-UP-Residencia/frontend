"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { createTaskSchema, type CreateTaskFormData } from "@/types/tasks/create-task-schema"
import { Input } from "@/components/private/ui/input"
import { Label } from "@/components/private/ui/label"
import { SpanError } from "@/components/private/ui/span-error"
import { Button } from "@/components/private/ui/button"
import { ModalFooter } from "@/components/private/ui/modal"
import { Bot } from "lucide-react"
import toast from "react-hot-toast"
import type { TaskStatus } from "@/types/tasks/task"

interface CreateTaskFormProps {
	columnStatus: TaskStatus
}

export function CreateTaskForm({ columnStatus }: CreateTaskFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<CreateTaskFormData>({
		resolver: zodResolver(createTaskSchema)
	})

	const onSubmit = async (data: CreateTaskFormData) => {
		try {
			// Aqui você fará a criação real da tarefa via server action ou API
			// Por enquanto, vamos simular e disparar evento
			const newTask = {
				id: crypto.randomUUID(),
				title: data.title,
				description: data.description,
				chatGptLink: data.chatGptLink,
				status: columnStatus,
				priority: "medium" as const,
				tags: [],
				members: [],
				attachments: [],
				comments: [],
				checklist: [],
				progress: 0,
				createdAt: new Date(),
				updatedAt: new Date()
			}

			// Disparar evento para atualizar a lista
			window.dispatchEvent(new CustomEvent("task:created", { detail: newTask }))

			toast.success("Tarefa criada com sucesso!")
			reset()

			// Fechar modal
			const modal = document.getElementById("create_task_modal") as HTMLDialogElement
			modal?.close()
		} catch (error) {
			toast.error("Erro ao criar tarefa")
			console.error(error)
		}
	}

	return (
		<form id="create-task-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			{/* Nome da tarefa */}
			<div className="flex flex-col gap-2">
				<Label htmlFor="title">Nome da tarefa</Label>
				<Input id="title" variant="no-placeholder" placeholder="Nome da tarefa" {...register("title")} />
				{errors.title && <SpanError>{errors.title.message}</SpanError>}
			</div>

			{/* Descrição */}
			<div className="flex flex-col gap-2">
				<Label htmlFor="description">Descrição</Label>
				<textarea
					id="description"
					placeholder="Adicione uma descrição"
					className="w-full rounded-xl border border-light-grey px-4 py-2
                     text-sm text-text-primary placeholder:text-text-secondary
                     focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                     resize-none min-h-[100px]"
					{...register("description")}
				/>
				{errors.description && <SpanError>{errors.description.message}</SpanError>}
			</div>

			{/* Link ChatGPT */}
			<div className="flex flex-col gap-2">
				<Label htmlFor="chatGptLink">Link ChatGPT</Label>
				<div className="relative">
					<div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">
						<Bot width={18} height={18} />
					</div>
					<Input
						id="chatGptLink"
						variant="no-placeholder"
						placeholder="Link Chat"
						className="pl-10"
						{...register("chatGptLink")}
					/>
				</div>
				{errors.chatGptLink && <SpanError>{errors.chatGptLink.message}</SpanError>}
			</div>

			{/* Footer buttons */}
			<ModalFooter>
				<Button
					type="button"
					outline
					color="transparent"
					onClick={() => {
						const modal = document.getElementById("create_task_modal") as HTMLDialogElement
						modal?.close()
					}}
				>
					Cancelar
				</Button>
				<Button outline={false} type="submit" color="indigo" form="create-task-form">
					Criar tarefa
				</Button>
			</ModalFooter>
		</form>
	)
}
