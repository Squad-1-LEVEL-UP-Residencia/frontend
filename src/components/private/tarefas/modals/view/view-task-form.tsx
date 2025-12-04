"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { editTaskSchema, type EditTaskFormData } from "@/types/tasks/edit-task-schema"
import { Input } from "@/components/private/ui/input"
import { Label } from "@/components/private/ui/label"
import { Select } from "@/components/private/ui/select"
import { SpanError } from "@/components/private/ui/span-error"
import { Button } from "@/components/private/ui/button"
import { Modal, ModalFooter, ModalTrigger } from "@/components/private/ui/modal"
import { Avatar } from "@/components/private/ui/avatar"
import { Bot, Calendar, Plus, Trash2Icon, ExternalLink, MessageSquare } from "lucide-react"
import toast from "react-hot-toast"
import type { Task, TaskChecklist, TaskChecklistItem, TaskComment } from "@/types/tasks/task"
import { useEffect, useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"
import { closeModal } from "@/data/helpers/closeModal"
import { updateTask } from "@/actions/tasks/update-task"
import { UpdateTaskFormData, updateTaskSchema } from "@/types/tasks/update-task-schema"
import { addTaskMember } from "@/actions/tasks/add-task-member"
import { addTaskChecklist } from "@/actions/tasks/add-task-checklist"
import { addTaskLink } from "@/actions/tasks/add-task-link"
import { addTaskComment } from "@/actions/tasks/add-task-comment"
import { getUsers } from "@/actions/users/get-users"
import { check, set } from "zod"
import { addTaskChecklistItem } from "@/actions/tasks/add-task-checklist-item"
import { deleteTaskChecklistItem } from "@/actions/tasks/delete-task-checklist-item"
import { deleteTaskChecklist } from "@/actions/tasks/delete-task-checklist"
import { markTaskChecklistItem } from "@/actions/tasks/mark-task-checklist-item"
import { useUsers } from "@/hooks/users/use-users"
import { SearchBar } from "@/components/private/ui/page-search-bar/searchbar"
import { useSearchParams } from "next/navigation"
import { useAvailableMembers } from "@/hooks/task/elements/useAvailableMembers"

interface ViewTaskFormProps {
	task: Task
}

const statusLabels = {
	pending: "A Fazer",
	doing: "Fazendo",
	done: "Concluído"
}

const priorityLabels = {
	0: "Baixa",
	1: "Média",
	2: "Alta"
}

export function ViewTaskForm({ task }: ViewTaskFormProps) {
	const [checklists, setChecklists] = useState<TaskChecklist[]>(Array.isArray(task.checklists) ? task.checklists : [])
	const [newLinkUrl, setNewLinkUrl] = useState("")
	const [newComment, setNewComment] = useState("")
	const [availableUsers, setAvailableUsers] = useState<any[]>([])
	const [userSearch, setUserSearch] = useState("")

	const { data: usersData, isLoading: isLoadingUsers, refetch: refetchUsers } = useAvailableMembers(task.id)

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
			status: task.status || "pending",
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
		setChecklists(Array.isArray(task.checklists) ? task.checklists : [])
	}, [task, reset])

	useEffect(() => {
		setAvailableUsers(
			usersData?.filter(
				(user) =>
					user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
					user.email.toLowerCase().includes(userSearch.toLowerCase())
			) || []
		)
	}, [usersData, userSearch, task.members])

	//??? Mutations
	const { mutateAsync: editTaskMutation } = useMutation({
		mutationFn: updateTask,
		onSuccess: (data) => {
			console.log(data)
			queryClient.invalidateQueries({ queryKey: ["lists"] })
			closeModal("view_task_modal")
			toast.success("Tarefa atualizada com sucesso!")
			reset()
		},
		onError: (error) => {
			toast.error("Erro ao editar tarefa" + error.message)
			closeModal("view_task_modal")
			console.error(error)
			reset()
		}
	})

	const { mutateAsync: addMemberMutation } = useMutation({
		mutationFn: addTaskMember,
		onSuccess: (data) => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ["lists"] })
				toast.success("Membro adicionado com sucesso!")
			} else {
				toast.error(data.error || "Erro ao adicionar membro")
			}
		},
		onError: (error) => {
			toast.error("Erro ao adicionar membro: " + error.message)
		}
	})

	const { mutateAsync: addChecklistMutation } = useMutation({
		mutationFn: addTaskChecklist,
		onSuccess: (data) => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ["lists"] })
				toast.success("Item adicionado à checklist!")
				console.log(data.data.checklist)
				setChecklists((prev) => [...prev, data.data.checklist])
			} else {
				toast.error(data.error || "Erro ao adicionar item")
			}
		},
		onError: (error) => {
			toast.error("Erro ao adicionar item: " + error.message)
		}
	})

	const { mutateAsync: addChecklistItemMutation } = useMutation({
		mutationFn: addTaskChecklistItem,
		onSuccess: (data) => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ["lists"] })
				toast.success("Item adicionado à checklist!")
				const newItem: TaskChecklistItem = data.data.item
				setChecklists((prev) => {
					return prev.map((checklist) => {
						if (checklist.id === newItem.checklist_id) {
							return {
								...checklist,
								items: [...(checklist.items || []), newItem]
							}
						}
						return checklist
					})
				})
			} else {
				toast.error(data.error || "Erro ao adicionar item")
			}
		},
		onError: (error) => {
			toast.error("Erro ao adicionar item: " + error.message)
		}
	})

	const { mutateAsync: removeChecklistMutation } = useMutation({
		mutationFn: deleteTaskChecklist,
		onSuccess: (data, variables) => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ["lists"] })
				toast.success("Item removido da checklist!")
				setChecklists((prev) => prev.filter((item) => item.id !== variables.checklistId))
			} else {
				toast.error(data.error || "Erro ao remover item")
			}
		},
		onError: (error) => {
			toast.error("Erro ao remover item: " + error.message)
		}
	})

	const { mutateAsync: removeChecklistItemMutation } = useMutation({
		mutationFn: deleteTaskChecklistItem,
		onSuccess: (data, variables) => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ["lists"] })
				toast.success("Item removido da checklist!")
				setChecklists((prev) =>
					prev.map((checklist) => ({
						...checklist,
						items: checklist.items?.filter((item) => item.id !== variables.itemId)
					}))
				)
			} else {
				toast.error(data.error || "Erro ao remover item")
			}
		},
		onError: (error) => {
			toast.error("Erro ao remover item: " + error.message)
		}
	})

	const { mutateAsync: markChecklistItemMutation } = useMutation({
		mutationFn: markTaskChecklistItem,
		onSuccess: (data, variables) => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ["lists"] })
				toast.success("Item marcado como completo com sucesso!")
				setChecklists((prev) =>
					prev.map((checklist) => ({
						...checklist,
						items: (checklist.items || []).map((it) =>
							it.id === variables.itemId ? { ...it, is_completed: !it.is_completed } : it
						)
					}))
				)
			} else {
				toast.error(data.error || "Erro ao remover item")
			}
		},
		onError: (error) => {
			toast.error("Erro ao remover item: " + error.message)
		}
	})

	const { mutateAsync: addLinkMutation } = useMutation({
		mutationFn: addTaskLink,
		onSuccess: (data) => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ["lists"] })
				toast.success("Link adicionado com sucesso!")
				setNewLinkUrl("")
			} else {
				toast.error(data.error || "Erro ao adicionar link")
			}
		},
		onError: (error) => {
			toast.error("Erro ao adicionar link: " + error.message)
		}
	})

	const { mutateAsync: addCommentMutation } = useMutation({
		mutationFn: addTaskComment,
		onSuccess: (data) => {
			if (data.success) {
				queryClient.invalidateQueries({ queryKey: ["lists"] })
				toast.success("Comentário adicionado com sucesso!")
				setNewComment("")
			} else {
				toast.error(data.error || "Erro ao adicionar comentário")
			}
		},
		onError: (error) => {
			toast.error("Erro ao adicionar comentário: " + error.message)
		}
	})

	//??? handlers

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
		window.dispatchEvent(new CustomEvent("task:delete-open", { detail: task }))
	}

	const toggleChecklistItem = (itemId: number, checklistId: number, is_completed: boolean) => {
		markChecklistItemMutation({
			taskId: task.id,
			checklistId: checklistId,
			itemId: itemId,
			is_completed: is_completed
		})
	}

	const addChecklist = async (title: string) => {
		if (!title.trim()) return
		try {
			addChecklistMutation({
				taskId: task.id,
				title: title
			})
		} catch (error) {
			toast.error("Erro ao adicionar checklist")
		}
	}

	const addChecklistItem = async (checklistId: number, description: string) => {
		if (!description.trim()) return

		try {
			await addChecklistItemMutation({
				taskId: task.id,
				checklistId: checklistId,
				description: description
			})
		} catch (error) {
			console.error("Erro ao adicionar item da checklist:", error)
		}
	}

	const removeChecklist = (checklistId: number) => {
		removeChecklistMutation({
			taskId: task.id,
			checklistId: checklistId
		})
	}

	const removeChecklistItem = (checklistId: number, itemId: number) => {
		removeChecklistItemMutation({
			taskId: task.id,
			checklistId: checklistId,
			itemId: itemId
		})
	}

	const loadUsers = async () => {
		try {
			await refetchUsers()
		} catch (error) {
			console.error("Erro ao carregar usuários:", error)
			toast.error("Erro ao carregar usuários")
		} finally {
			// setIsLoadingUsers(false)
		}
	}

	const handleOpenAddMember = () => {
		loadUsers()
		Modal.handleOpen("add_member_modal")
	}

	const handleAddMember = async (userId: number) => {
		try {
			await addMemberMutation({
				taskId: task.id,
				userId
			})
			closeModal("add_member_modal")
		} catch (error) {
			console.error("Erro ao adicionar membro:", error)
		}
	}

	const handleAddLink = async () => {
		if (!newLinkUrl.trim()) {
			toast.error("URL é obrigatória")
			return
		}

		try {
			await addLinkMutation({
				taskId: task.id,
				url: newLinkUrl
			})
		} catch (error) {
			console.error("Erro ao adicionar link:", error)
		}
	}

	const handleAddComment = async () => {
		if (!newComment.trim()) {
			toast.error("Comentário não pode estar vazio")
			return
		}

		try {
			await addCommentMutation({
				taskId: task.id,
				content: newComment
			})
		} catch (error) {
			console.error("Erro ao adicionar comentário:", error)
		}
	}

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
								onClick={handleOpenAddMember}
								className="flex items-center gap-1 px-3 py-1.5 border border-light-grey rounded-lg
								 text-sm text-text-secondary hover:bg-background transition-colors"
							>
								<Plus width={16} height={16} />
								Adicionar
							</button>
						</div>
					</div>

					{/* Links */}
					<div className="flex flex-col gap-2">
						<Label>Links</Label>
						<div className="flex flex-col gap-2">
							{Array.isArray(task.links) &&
								task.links.map((link: any) => (
									<div key={link.id} className="flex items-center gap-2 px-3 py-2 bg-background rounded-lg">
										<ExternalLink width={16} height={16} className="text-text-secondary" />
										<a
											href={link.url}
											target="_blank"
											rel="noopener noreferrer"
											className="text-sm flex-1 text-indigo-primary hover:underline"
										>
											{link.title || link.url}
										</a>
									</div>
								))}
							<div className="flex gap-2">
								<Input
									variant="no-placeholder"
									placeholder="URL do link..."
									value={newLinkUrl}
									onChange={(e) => setNewLinkUrl(e.target.value)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											e.preventDefault()
											handleAddLink()
										}
									}}
								/>
								<Button outline type="button" color="indigo" onClick={handleAddLink}>
									<Plus width={16} height={16} />
								</Button>
							</div>
						</div>
					</div>

					{/* Checklist */}

					{/* o foreach de checklists começa aqui */}
					{checklists &&
						checklists.map((checklist) => {
							let progressBar: number =
								checklist.items.length > 0
									? Math.round(
											(checklist.items.filter((item) => item.is_completed).length / checklist.items.length) * 100
									  )
									: 0
							let description: string = ""
							return (
								<div key={checklist.id} className="flex flex-col gap-3">
									<div className="flex items-center justify-between">
										<Label className="pointer-events-none">
											<div className="flex gap-2">
												<span>{checklist.title} </span>

												<button
													type="button"
													onClick={() => removeChecklist(checklist.id)}
													className="pointer-events-auto transition-colors curosr-pointer text-red-primary hover:text-red-600"
												>
													<Trash2Icon width={14} height={14} />
												</button>
											</div>
										</Label>

										<span className="text-sm text-text-secondary font-medium">
											{checklist.items.filter((item) => item.is_completed).length}/{checklist.items.length} (
											{progressBar}%)
										</span>
									</div>

									{/* Progress bar */}
									{checklists.length > 0 && (
										<div className="w-full bg-grey-primary rounded-full h-2">
											<div
												className="bg-indigo-primary h-2 rounded-full transition-all duration-300"
												style={{ width: `${progressBar}%` }}
											/>
										</div>
									)}

									{/* Checklist items */}
									<div className="flex flex-col gap-2">
										{/* foreach de checklist.items  */}
										{checklist.items.length > 0 &&
											checklist.items.map((item) => (
												<div key={item.id} className="flex items-center gap-2 group">
													<input
														type="checkbox"
														checked={item.is_completed}
														onChange={() => toggleChecklistItem(item.id, checklist.id, !item.is_completed)}
														className="w-4 h-4 rounded border border-zinc-950 bg-white accent:bg-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white"
													/>
													<span
														className={`text-sm flex-1 ${
															item.is_completed ? "line-through text-text-secondary" : "text-text-primary"
														}`}
													>
														{item.description}
													</span>
													<button
														type="button"
														onClick={() => removeChecklistItem(checklist.id, item.id)}
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
											onChange={(e) => (description = e.target.value)}
											className="text-sm italic placeholder:text-text-secondary bg-background/50 border border-dashed border-light-grey px-3 py-2 rounded-lg"
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													e.preventDefault()
													addChecklistItem(checklist.id, description)
													e.currentTarget.value = ""
												}
											}}
										/>
										<Button
											outline
											type="button"
											color="indigo"
											onClick={() => addChecklistItem(checklist.id, description)}
										>
											<Plus width={16} height={16} />
										</Button>
									</div>
								</div>
							)
						})}

					{/* Add new checklist */}
					<div className="flex gap-2 mt-8">
						<Input variant="no-placeholder" placeholder="Adicionar uma nova checklist..." />
						<Button
							outline
							type="button"
							color="indigo"
							onClick={(e) => {
								const input = (e.currentTarget.previousSibling as HTMLInputElement)!
								addChecklist(input.value)
								input.value = ""
							}}
						>
							<Plus width={16} height={16} />
						</Button>
					</div>
				</div>

				{/* Coluna Lateral (Direita) */}
				<div className="w-80 flex flex-col gap-4">
					{/* Status */}
					<div className="flex flex-col gap-2">
						<Label htmlFor="status">Status</Label>
						<Select id="status" {...register("status")} defaultValue={task.status ?? "pending"}>
							{Object.entries(statusLabels).map(([value, label]) => (
								<option key={value} value={value}>
									{label}
								</option>
							))}
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
						<Label>Comentários</Label>
						<div className="flex flex-col gap-3 max-h-60 overflow-y-auto">
							{Array.isArray(task.comments) &&
								task.comments.map((comment: TaskComment) => (
									<div key={comment.id} className="flex gap-2">
										<Avatar name={comment.author || "Usuário sem nome"} />
										<div className="flex-1 flex flex-col gap-1">
											<div className="flex items-center gap-2">
												<span className="text-sm font-medium">
													{comment.author || "Usuário sem nome"} - {comment.author_role || "Desconhecido"}
												</span>
												<span className="text-xs text-text-secondary">
													{comment.created_at ? new Date(comment.created_at).toLocaleDateString("pt-BR") : ""}
												</span>
											</div>
											<p className="text-sm text-text-primary bg-background px-3 py-2 rounded-lg">{comment.content}</p>
										</div>
									</div>
								))}
						</div>
						<div className="flex flex-col gap-2">
							<textarea
								placeholder="Escrever um comentário..."
								value={newComment}
								onChange={(e) => setNewComment(e.target.value)}
								className="w-full rounded-xl border border-light-grey px-3 py-2
								   text-sm text-text-primary placeholder:text-text-secondary
								   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
								   resize-none min-h-[60px]"
							/>
							<Button outline type="button" color="indigo" onClick={handleAddComment}>
								<MessageSquare width={16} height={16} />
								Adicionar Comentário
							</Button>
						</div>
					</div>
				</div>
			</form>

			{/* Footer buttons */}
			<ModalFooter className="col-span-2">
				<ModalTrigger id="delete_task_modal">
					<Button outline type="submit" color="danger" onClick={handleDeleteTask}>
						Excluir tarefa
					</Button>
				</ModalTrigger>

				{/*<div className="flex gap-2">
				 */}
				<Button
					type="button"
					outline
					color="transparent"
					onClick={() => {
						reset()
						queryClient.invalidateQueries({ queryKey: ["lists"] })
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

			{/* Modal de adicionar membro */}
			<Modal id="add_member_modal" variant="sm">
				<div className="flex flex-col gap-4">
					<h3 className="text-lg font-semibold">Adicionar Membro</h3>

					{isLoadingUsers ? (
						<div className="flex items-center justify-center py-8">
							<span className="text-text-secondary">Carregando usuários...</span>
						</div>
					) : (
						<div className="flex flex-col gap-2 max-h-96 overflow-y-auto">
							<SearchBar
								placeholder={"Buscar usuário..."}
								noFilter
								className="shadow-none"
								onSearch={(q) => setUserSearch(q)}
								search={userSearch}
							/>

							{availableUsers.length === 0 ? (
								<div className="text-center py-4 text-text-secondary">Nenhum usuário disponível</div>
							) : (
								availableUsers.map((user) => (
									<button
										key={user.id}
										type="button"
										onClick={() => handleAddMember(user.id)}
										className="flex items-center gap-3 px-4 py-3 border border-light-grey rounded-lg
											hover:bg-background transition-colors text-left"
									>
										<Avatar name={user.name} />
										<div className="flex flex-col">
											<span className="text-sm font-medium">{user.name}</span>
											<span className="text-xs text-text-secondary">{user.email}</span>
										</div>
									</button>
								))
							)}
						</div>
					)}

					<div className="flex justify-end gap-2">
						<Button type="button" outline color="transparent" onClick={() => closeModal("add_member_modal")}>
							Cancelar
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	)
}
