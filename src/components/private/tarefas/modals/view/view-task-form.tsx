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

interface ViewTaskFormProps {
	task: Task
}

const statusLabels = {
	todo: "A Fazer",
	doing: "Fazendo",
	done: "Concluído"
}

const priorityLabels = {
	low: "Baixa",
	medium: "Média",
	high: "Alta"
}

export function ViewTaskForm({ task }: ViewTaskFormProps) {
	const [checklist, setChecklist] = useState<TaskChecklistItem[]>(task.checklist)
	const [newChecklistItem, setNewChecklistItem] = useState("")

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<EditTaskFormData>({
		resolver: zodResolver(editTaskSchema),
		defaultValues: {
			title: task.title,
			description: task.description,
			status: task.status,
			priority: task.priority,
			campaign: task.campaign || "",
			start_date: task.start_date ? new Date(task.start_date).toISOString().split("T")[0] : "",
			end_date: task.end_date ? new Date(task.end_date).toISOString().split("T")[0] : "",
			tags: task.tags,
			members: task.members.map((m) => m.id),
			checklist: task.checklist
		}
	})

	useEffect(() => {
		reset({
			title: task.title,
			description: task.description,
			status: task.status,
			priority: task.priority,
			campaign: task.campaign || "",
			start_date: task.start_date ? new Date(task.start_date).toISOString().split("T")[0] : "",
			end_date: task.end_date ? new Date(task.end_date).toISOString().split("T")[0] : "",
			tags: task.tags,
			members: task.members.map((m) => m.id),
			checklist: task.checklist
		})
		setChecklist(task.checklist)
	}, [task, reset])

	const onSubmit = async (data: EditTaskFormData) => {
		try {
			// Aqui você fará a atualização real da tarefa via server action ou API
			const updatedTask = {
				...task,
				...data,
				checklist,
				updatedAt: new Date()
			}

			// Disparar evento para atualizar a lista
			window.dispatchEvent(new CustomEvent("task:updated", { detail: updatedTask }))

			toast.success("Tarefa atualizada com sucesso!")

			// Fechar modal
			const modal = document.getElementById("view_task_modal") as HTMLDialogElement
			modal?.close()
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

	const toggleChecklistItem = (itemId: string) => {
		setChecklist((prev) => prev.map((item) => (item.id === itemId ? { ...item, completed: !item.completed } : item)))
	}

	const addChecklistItem = () => {
		if (!newChecklistItem.trim()) return

		const newItem: TaskChecklistItem = {
			id: crypto.randomUUID(),
			content: newChecklistItem,
			completed: false
		}

		setChecklist((prev) => [...prev, newItem])
		setNewChecklistItem("")
	}

	const removeChecklistItem = (itemId: string) => {
		setChecklist((prev) => prev.filter((item) => item.id !== itemId))
	}

	const completedCount = checklist.filter((item) => item.completed).length
	const progressPercent = checklist.length > 0 ? (completedCount / checklist.length) * 100 : 0

	return (
		<div className="flex flex-col gap-4">
			<form id="view-task-form" onSubmit={handleSubmit(onSubmit)} className="flex gap-6">
				{/* Coluna Principal (Esquerda) */}
				<div className="flex-1 flex flex-col gap-6">
					{/* Título */}
					<div className="flex flex-col gap-2">
						<Label htmlFor="title">Título da Tarefa</Label>
						<Input id="title" variant="no-placeholder" className="text-xl font-semibold" {...register("title")} />
						{errors.title && <SpanError>{errors.title.message}</SpanError>}
					</div>

					{/* Status, Campanha e Datas */}
					<div className="flex items-center gap-4 text-sm text-text-secondary">
						{task.campaign && (
							<span>
								em <span className="font-medium text-text-primary">{task.campaign}</span>
							</span>
						)}
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
							{task.members.map((member) => (
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
							{task.attachments.map((attachment) => (
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
							{Object.entries(statusLabels).map(([value, label]) => (
								<option key={value} value={value}>
									{label}
								</option>
							))}
						</Select>
					</div>

					{/* Prioridade */}
					<div className="flex flex-col gap-2">
						<Label htmlFor="priority">Prioridade</Label>
						<Select id="priority" {...register("priority")}>
							{Object.entries(priorityLabels).map(([value, label]) => (
								<option key={value} value={value}>
									{label}
								</option>
							))}
						</Select>
					</div>

					{/* Campanha */}
					<div className="flex flex-col gap-2">
						<Label htmlFor="campaign">Campanha/Projeto</Label>
						<Input id="campaign" variant="no-placeholder" placeholder="Nome da campanha" {...register("campaign")} />
					</div>

					{/* Datas de início e fim */}
					<div className="flex flex-col gap-2">
						<Label htmlFor="start_date">Data de Início</Label>
						<Input id="start_date" type="date" variant="no-placeholder" {...register("start_date")} />
					</div>
					<div className="flex flex-col gap-2">
						<Label htmlFor="end_date">Data de Fim</Label>
						<Input id="end_date" type="date" variant="no-placeholder" {...register("end_date")} />
					</div>

					{/* Comentários e Atividade */}
					<div className="flex flex-col gap-3 mt-4">
						<Label>Atividade</Label>
						<div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
							{task.comments.map((comment) => (
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
						<textarea
							placeholder="Escrever um comentário..."
							className="w-full rounded-xl border border-light-grey px-3 py-2
                       text-sm text-text-primary placeholder:text-text-secondary
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                       resize-none min-h-[60px]"
						/>
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
						const modal = document.getElementById("view_task_modal") as HTMLDialogElement
						modal?.close()
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
