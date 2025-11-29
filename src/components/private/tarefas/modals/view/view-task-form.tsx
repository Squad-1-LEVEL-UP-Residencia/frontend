"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { editTaskSchema, type EditTaskFormData } from "@/types/tasks/edit-task-schema"
import { Input } from "@/components/private/ui/input"
import { Label } from "@/components/private/ui/label"
import { Select } from "@/components/private/ui/select"
import { SpanError } from "@/components/private/ui/span-error"
import { Button } from "@/components/private/ui/button"
import { ModalFooter } from "@/components/private/ui/modal"
import { Avatar } from "@/components/private/ui/avatar"
import { Bot, Calendar, Plus, Paperclip, Trash2Icon, ExternalLink } from "lucide-react"
import toast from "react-hot-toast"
import type { Task, TaskChecklistItem } from "@/types/tasks/task"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"
import { closeModal } from "@/data/helpers/closeModal"
import { updateTask } from "@/actions/tasks/update-task"
import { UpdateTaskFormData, updateTaskSchema } from "@/types/tasks/update-task-schema"

interface ViewTaskFormProps {
	task: Task
}

const statusLabels = {
	todo: "A Fazer",
	doing: "Fazendo",
	done: "Concluído"
}

const priorityLabels = {
	0: "Baixa",
	1: "Média",
	2: "Alta"
}

export function ViewTaskForm({ task }: ViewTaskFormProps) {
	const [checklist, setChecklist] = useState<TaskChecklistItem[]>(Array.isArray(task.checklist) ? task.checklist : [])
	const [newChecklistItem, setNewChecklistItem] = useState("")
	console.log(task.client_id, task.list_id)
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<UpdateTaskFormData>({
		resolver: zodResolver(updateTaskSchema),
		defaultValues: {
			id: task.id,
			title: task.title,
			client_id: task.client_id,
			list_id: task.list_id,
			description: task.description,
			status: task.status || "todo",
			priority: task.priority,
			start_date: task.start_date ? new Date(task.start_date).toISOString().slice(0, 10) : undefined,
			end_date: task.end_date ? new Date(task.end_date).toISOString().slice(0, 10) : undefined
		}
	})

	useEffect(() => {
		reset({
			id: task.id,
			title: task.title,
			client_id: task.client_id,
			list_id: task.list_id,
			description: task.description || "",
			status: task.status,
			priority: task.priority,
			start_date: task.start_date ? new Date(task.start_date).toISOString().slice(0, 10) : undefined,
			end_date: task.end_date ? new Date(task.end_date).toISOString().slice(0, 10) : undefined
		})
		setChecklist(Array.isArray(task.checklist) ? task.checklist : [])
	}, [task, reset])

	const { mutateAsync: editTaskMutation } = useMutation({
		mutationFn: updateTask,
		onSuccess: (data) => {
			console.log(data)
			queryClient.invalidateQueries({ queryKey: ["lists"] })
			closeModal("view_task_modal")
			reset()
			toast.success("Tarefa atualizada com sucesso!")
		},
		onError: (error) => {
			toast.error("Erro ao editar tarefa")
			closeModal("view_task_modal")
			console.error(error)
			reset()
		}
	})

	const onSubmit = async (data: UpdateTaskFormData) => {
		try {
			console.log(data)
			await editTaskMutation(data)
		} catch (error) {
			toast.error("Erro ao atualizar tarefa")
			console.error(error)
		}
	}

	const handleDeleteTask = () => {
		if (confirm("Tem certeza que deseja excluir esta tarefa?")) {
			window.dispatchEvent(new CustomEvent("task:deleted", { detail: task.id }))
			toast.success("Tarefa excluída com sucesso!")
			const modal = document.getElementById("view_task_modal") as HTMLDialogElement
			modal?.close()
		}
	}

	const toggleChecklistItem = (itemId: number) => {
		setChecklist((prev) => prev.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item)))
	}

	const addChecklistItem = () => {
		if (!newChecklistItem.trim()) return

		const newItem: TaskChecklistItem = {
			id: crypto.getRandomValues(new Uint32Array(1))[0],
			content: newChecklistItem,
			completed: false
		}

		setChecklist((prev) => [...prev, newItem])
		setNewChecklistItem("")
	}

	const removeChecklistItem = (itemId: number) => {
		setChecklist((prev) => prev.filter((item) => item.id !== itemId))
	}

	const completedCount = Array.isArray(checklist) ? checklist.filter((item) => item.completed).length : 0
	const progressPercent =
		Array.isArray(checklist) && checklist.length > 0 ? (completedCount / checklist.length) * 100 : 0

	return (
		<div className="flex flex-col gap-4">
			<form
				id="view-task-form"
				onSubmit={handleSubmit(onSubmit, (errs) => {
					console.log("Validation errors:", errs)
				})}
				className="flex gap-6"
			>
				{/* Coluna Principal (Esquerda) */}
				<div className="flex-1 flex flex-col gap-6">
					<input type="hidden" {...register("list_id", { valueAsNumber: true })} />
					<input type="hidden" {...register("client_id", { valueAsNumber: true })} />
					<input type="hidden" {...register("id", { valueAsNumber: true })} />
					{/* Título */}
					<div className="flex flex-col gap-2">
						<Label htmlFor="title">Título da Tarefa</Label>
						<Input id="title" variant="no-placeholder" className="text-xl font-semibold" {...register("title")} />
						{errors.title && <SpanError>{errors.title.message}</SpanError>}
					</div>

					{/* Status, Campanha e Datas */}
					<div className="flex items-center gap-4 text-sm text-text-secondary">
						{task.start_date && (
							<div className="flex items-center gap-1">
								<Calendar width={14} height={14} />
								<span>Início: {new Date(task.start_date).toLocaleDateString("pt-BR")}</span>
							</div>
						)}
						{task.end_date && (
							<div className="flex items-center gap-1">
								<Calendar width={14} height={14} />
								<span>Fim: {new Date(task.end_date).toLocaleDateString("pt-BR")}</span>
							</div>
						)}
					</div>

					{/* Descrição */}
					<div className="flex flex-col gap-2">
						<Label htmlFor="description">Descrição</Label>
						<textarea
							id="description"
							className="w-full rounded-xl border border-light-grey px-4 py-2
                       text-sm text-text-primary placeholder:text-text-secondary
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                       resize-none min-h-[120px]"
							{...register("description")}
						/>
						{errors.description && <SpanError>{errors.description.message}</SpanError>}
					</div>

					{/* Removido campo Link ChatGPT */}

					{/* Membros */}
					<div className="flex flex-col gap-2">
						<Label>Membros</Label>
						<div className="flex items-center gap-2 flex-wrap">
							{Array.isArray(task.members) &&
								task.members.map((member) => (
									<div key={member.id} className="flex items-center gap-2 px-3 py-1.5 bg-background rounded-lg">
										<Avatar name={member.name} />
										<span className="text-sm font-medium">{member.name}</span>
									</div>
								))}
							<button
								type="button"
								className="flex items-center gap-1 px-3 py-1.5 border border-light-grey rounded-lg
								 text-sm text-text-secondary hover:bg-background transition-colors"
							>
								<Plus width={16} height={16} />
								Adicionar
							</button>
						</div>
					</div>

					{/* Anexos */}
					<div className="flex flex-col gap-2">
						<Label>Anexos</Label>
						<div className="flex flex-col gap-2">
							{Array.isArray(task.attachments) &&
								task.attachments.map((attachment) => (
									<div key={attachment.id} className="flex items-center gap-2 px-3 py-2 bg-background rounded-lg">
										<Paperclip width={16} height={16} className="text-text-secondary" />
										<span className="text-sm flex-1">{attachment.name}</span>
									</div>
								))}
							<button
								type="button"
								className="flex items-center gap-1 px-3 py-2 border border-dashed border-light-grey rounded-lg
								 text-sm text-text-secondary hover:bg-background transition-colors justify-center"
							>
								<Plus width={16} height={16} />
								Adicionar anexo
							</button>
						</div>
					</div>

					{/* Checklist */}
					<div className="flex flex-col gap-3">
						<div className="flex items-center justify-between">
							<Label>Checklist</Label>
							<span className="text-sm text-text-secondary font-medium">
								{completedCount}/{checklist.length} ({Math.round(progressPercent)}%)
							</span>
						</div>

						{/* Progress bar */}
						{checklist.length > 0 && (
							<div className="w-full bg-grey-primary rounded-full h-2">
								<div
									className="bg-indigo-primary h-2 rounded-full transition-all duration-300"
									style={{ width: `${progressPercent}%` }}
								/>
							</div>
						)}

						{/* Checklist items */}
						<div className="flex flex-col gap-2">
							{checklist.map((item) => (
								<div key={item.id} className="flex items-center gap-2 group">
									<input
										type="checkbox"
										checked={item.completed}
										onChange={() => toggleChecklistItem(item.id)}
										className="w-4 h-4 rounded border-zinc-950 text-indigo-primary
                             focus:ring-2 focus:ring-indigo-500"
									/>
									<span
										className={`text-sm flex-1 ${
											item.completed ? "line-through text-text-secondary" : "text-text-primary"
										}`}
									>
										{item.content}
									</span>
									<button
										type="button"
										onClick={() => removeChecklistItem(item.id)}
										className="opacity-0 group-hover:opacity-100 transition-opacity text-red-primary hover:text-red-600"
									>
										<Trash2Icon width={14} height={14} />
									</button>
								</div>
							))}
						</div>

						{/* Add new item */}
						<div className="flex gap-2">
							<Input
								variant="no-placeholder"
								placeholder="Adicionar item..."
								value={newChecklistItem}
								onChange={(e) => setNewChecklistItem(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault()
										addChecklistItem()
									}
								}}
							/>
							<Button outline type="button" color="indigo" onClick={addChecklistItem}>
								<Plus width={16} height={16} />
							</Button>
						</div>
					</div>
				</div>

				{/* Coluna Lateral (Direita) */}
				<div className="w-80 flex flex-col gap-4">
					{/* Status */}
					<div className="flex flex-col gap-2">
						<Label htmlFor="status">Status</Label>
						<Select id="status" {...register("status")}>
							{/* {Object.entries(statusLabels).map(([value, label]) => ( */}
							<option key={"todo"} value={"todo"}>
								Fazer
							</option>
							{/* ))} */}
						</Select>
						{errors.status && <SpanError>{errors.status.message}</SpanError>}
					</div>

					{/* Prioridade */}
					<div className="flex flex-col gap-2">
						<Label htmlFor="priority">Prioridade</Label>
						<Select id="priority" {...register("priority", { valueAsNumber: true })}>
							{/* {Object.entries(priorityLabels).map(([value, label]) => ( */}
							<option key={"0"} value={0}>
								{0}
							</option>
							<option key={"1"} value={1}>
								{1}
							</option>
							<option key={"2"} value={2}>
								{2}
							</option>
							{/* ))} */}
						</Select>
						{errors.priority && <SpanError>{errors.priority.message}</SpanError>}
					</div>

					{/* Campanha */}

					{/* Datas de início e fim */}
					<div className="flex flex-col gap-2">
						<Label htmlFor="start_date">Data de Início</Label>
						<Input
							id="start_date"
							type="date"
							variant="no-placeholder"
							{...register("start_date")}
							defaultValue={task.start_date ? new Date(task.start_date).toISOString().slice(0, 10) : ""}
						/>
						{errors.start_date && <SpanError>{errors.start_date.message}</SpanError>}
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="end_date">Data de Fim</Label>
						<Input
							id="end_date"
							type="date"
							variant="no-placeholder"
							{...register("end_date")}
							defaultValue={task.end_date ? new Date(task.end_date).toISOString().slice(0, 10) : ""}
						/>
						{errors.end_date && <SpanError>{errors.end_date.message}</SpanError>}
					</div>

					{/* Comentários e Atividade */}
					<div className="flex flex-col gap-3 mt-4">
						<Label>Atividade</Label>
						<div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
							{Array.isArray(task.comments) &&
								task.comments.map((comment) => (
									<div key={comment.id} className="flex gap-2">
										<Avatar name={comment.author.name} />
										<div className="flex-1 flex flex-col gap-1">
											<div className="flex items-center gap-2">
												<span className="text-sm font-medium">{comment.author.name}</span>
												<span className="text-xs text-text-secondary">
													{new Date(comment.createdAt).toLocaleDateString("pt-BR")}
												</span>
											</div>
											<p className="text-sm text-text-primary bg-background px-3 py-2 rounded-lg">{comment.content}</p>
										</div>
									</div>
								))}
						</div>
						{/* <textarea
							placeholder="Escrever um comentário..."
							className="w-full rounded-xl border border-light-grey px-3 py-2
							   text-sm text-text-primary placeholder:text-text-secondary
							   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
							   resize-none min-h-[60px]"
						/> */}
					</div>
				</div>
			</form>

			{/* Footer buttons */}
			<ModalFooter className="col-span-2">
				<Button outline type="button" color="danger" onClick={handleDeleteTask}>
					Excluir tarefa
				</Button>
				{/*<div className="flex gap-2">
				 */}
				<Button
					type="button"
					outline
					color="transparent"
					onClick={() => {
						reset()
						closeModal("view_task_modal")
					}}
				>
					Cancelar
				</Button>
				<Button outline type="submit" color="indigo" form="view-task-form">
					Salvar alterações
				</Button>
				{/* </div> */}
			</ModalFooter>
		</div>
	)
}
