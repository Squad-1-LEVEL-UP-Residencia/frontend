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
import { useMutation } from "@tanstack/react-query"
import { createTask } from "@/actions/tasks/create-task"
import { useEffect } from "react"
import { queryClient } from "@/lib/react-query"

interface CreateTaskFormProps {
	list_id: number
}

export function CreateTaskForm({ list_id }: CreateTaskFormProps) {
	const { data: clients, isLoading: isLoadingClients } = useClients()

	useEffect(() => {
		setValue("list_id", Number(list_id), { shouldValidate: true })
	}, [list_id])

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
		reset
	} = useForm<CreateTaskFormData>({
		resolver: zodResolver(createTaskSchema),
		defaultValues: {
			list_id: list_id
		}
	})

	const { mutateAsync: createTaskMutation } = useMutation({
		mutationFn: createTask,
		onSuccess: (data) => {
			console.log(data)
			queryClient.setQueryData(["lists"], (old: any) => {
				console.log("Cache antigo (old):", old) // Verifique se existe 'old.data' ou se é apenas um array
				console.log("Resposta da API (data):", data) // Verifique se 'data.task' existe mesmo
				if (!old || !old.data) return
				const updatedData = old.data.map((list: List) => {
					if (list.id === list_id && data.success && data.task) {
						const tasks = Array.isArray(list.tasks) ? [data.task, ...list.tasks] : [data.task]
						return { ...list, tasks }
					}
					return list
				})
				return { ...old, data: updatedData }
			})

			const modal = document.getElementById("create_list_modal") as HTMLDialogElement
			modal?.close()
		},
		onError: (error) => {
			toast.error("Erro ao criar tarefa")
			console.error(error)
		}
	})

	const onSubmit = async (data: CreateTaskFormData) => {
		try {
			data.list_id = list_id
			await createTaskMutation(data)
			toast.success("Tarefa criada com sucesso!")
			reset()

			// // Fechar modal
			const modal = document.getElementById("create_task_modal") as HTMLDialogElement
			modal?.close()
		} catch (error) {
			toast.error("Erro ao criar tarefa")
			console.error(error)
		}
	}
	const onInvalid = (errors: any) => {
		console.log("erros de validação no submit:", errors)
		console.log(list_id, typeof list_id)
	}
	return (
		<form id="create-task-form" onSubmit={handleSubmit(onSubmit, onInvalid)} className="flex flex-col gap-4">
			{/* Nome da tarefa */}

			<input type="hidden" {...register("list_id", { valueAsNumber: true })} />

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
					) : clients && clients.data.length > 0 ? (
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
