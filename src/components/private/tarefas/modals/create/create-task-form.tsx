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
import { Select } from "@/components/private/ui/select"
import { Client } from "@/types/clients/client"
import { useClients } from "@/hooks/clients/use-clients"
import { List } from "@/types/lists/list"

interface CreateTaskFormProps {
	list_id: number
}

export function CreateTaskForm({ list_id }: CreateTaskFormProps) {
	const { data: clients, isLoading: isLoadingClients } = useClients()

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

			// Disparar evento para atualizar a lista
			// window.dispatchEvent(new CustomEvent("task:created", { detail: newTask }))

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
			<input type="hidden" {...register("list_id")} value={list_id} />
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
				<Label className="font-medium" htmlFor="client_id">
					Cliente
				</Label>
				<Select defaultValue="Selecione um cliente" id="client_id" {...register("client_id", { valueAsNumber: true })}>
					<option disabled={true}>Selecione um cliente</option>
					{isLoadingClients ? (
						<option disabled={true} value={undefined}>
							Carregando...
						</option>
					) : clients ? (
						clients.data.map((client: Client) => (
							<option key={client.id} value={client.id}>
								{client.companyName}
							</option>
						))
					) : null}
				</Select>
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
