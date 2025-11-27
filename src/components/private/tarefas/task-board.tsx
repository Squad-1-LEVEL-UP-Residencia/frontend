"use client"

import { useState } from "react"
import { TaskCard } from "./task-card"
import { Plus } from "lucide-react"
import { Modal } from "@/components/private/ui/modal"
import type { Task } from "@/types/tasks/task"
import type { List } from "@/types/lists/list"
import { useLists } from "@/hooks/lists/use-lists"
import { deleteList, DeleteListFormData } from "@/actions/lists/delete-list"
import { updateList, UpdateListFormData } from "@/actions/lists/update-list"
import { moveTask, MoveTaskFormData } from "@/actions/tasks/move-task"
import toast from "react-hot-toast"
import { useMutation } from "@tanstack/react-query"
import { queryClient } from "@/lib/react-query"

export function TaskBoard() {
	const { data, error } = useLists()
	const [draggedTaskId, setDraggedTaskId] = useState<number | null>(null)
	const [draggedColumnId, setDraggedColumnId] = useState<number | null>(null)
	const [editingColumnId, setEditingColumnId] = useState<number | null>(null)
	const [editingColumnName, setEditingColumnName] = useState<string>("")
	const [dragOverTaskId, setDragOverTaskId] = useState<number | null>(null)

	const columns = data?.data || []

	// Mutation para mover tasks
	const { mutateAsync: moveTaskMutation } = useMutation({
		mutationFn: async ({ listId, position, taskId }: MoveTaskFormData) => {
			return await moveTask({ listId, position, taskId })
		},
		onSuccess: (res) => {
			queryClient.invalidateQueries({ queryKey: ["lists"] })
			if (res.status !== 200 && res.status !== 201) {
				toast.error(res.raw.message)
			} else {
				toast.success(res.raw.message)
			}
		},
		onError: (err) => {
			console.error(err)
			toast.error("Erro ao mover tarefa")
		}
	})

	const handleDragStart = (e: React.DragEvent, taskId: number) => {
		setDraggedTaskId(taskId)
		e.dataTransfer.effectAllowed = "move"
	}

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
		e.dataTransfer.dropEffect = "move"
	}

	const handleTaskDragOver = (e: React.DragEvent, taskId: number) => {
		e.preventDefault()
		e.stopPropagation()
		setDragOverTaskId(taskId)
	}

	const handleTaskDrop = async (e: React.DragEvent, targetTask: Task, targetListId: number) => {
		e.preventDefault()
		e.stopPropagation()
		setDragOverTaskId(null)

		if (!draggedTaskId) return

		// Encontrar a tarefa arrastada
		let draggedTask: Task | undefined
		let sourceListId: number | undefined
		for (const col of columns) {
			const task = col.tasks.find((t: Task) => t.id === draggedTaskId)
			if (task) {
				draggedTask = task
				sourceListId = col.id as number
				break
			}
		}

		if (!draggedTask || !sourceListId) {
			setDraggedTaskId(null)
			return
		}

		// Se for a mesma task, não fazer nada
		if (draggedTask.id === targetTask.id) {
			setDraggedTaskId(null)
			return
		}

		// Calcular nova posição baseada na task alvo
		const targetList = columns.find((col) => col.id === targetListId)
		if (!targetList || !targetList.tasks) {
			setDraggedTaskId(null)
			return
		}

		// Encontrar índices
		const draggedIndex = targetList.tasks.findIndex((t: Task) => t.id === draggedTask.id)
		const targetIndex = targetList.tasks.findIndex((t: Task) => t.id === targetTask.id)
		console.log("draggedTask", draggedTask, "targetTask", targetTask)
		// let newPosition: number

		// // Se está na mesma lista
		// if (sourceListId === targetListId) {
		// 	// Movendo para baixo (índice aumenta)
		// 	if (draggedIndex < targetIndex) {
		// 		// Inserir DEPOIS da task alvo
		// 		// Pegar position entre a task alvo e a próxima
		// 		if (targetIndex < targetList.tasks.length - 1) {
		// 			const targetPos = targetTask.position || (targetIndex + 1) * 100
		// 			const nextTask = targetList.tasks[targetIndex + 1]
		// 			const nextPos = nextTask.position || (targetIndex + 2) * 100
		// 			newPosition = Math.floor((targetPos + nextPos) / 2)

		// 			// Se não houver espaço, usar próxima position disponível
		// 			if (newPosition <= targetPos) {
		// 				newPosition = targetPos + 1
		// 			}
		// 		} else {
		// 			// É a última task, adicionar depois dela
		// 			const targetPos = targetTask.position || (targetIndex + 1) * 100
		// 			newPosition = targetPos + 100
		// 		}
		// 	}
		// 	// Movendo para cima (índice diminui)
		// 	else {
		// 		// Inserir ANTES da task alvo
		// 		// Pegar position entre a task anterior e a alvo
		// 		if (targetIndex > 0) {
		// 			const prevTask = targetList.tasks[targetIndex - 1]
		// 			const prevPos = prevTask.position || targetIndex * 100
		// 			const targetPos = targetTask.position || (targetIndex + 1) * 100
		// 			newPosition = Math.floor((prevPos + targetPos) / 2)

		// 			// Se não houver espaço, usar position intermediária
		// 			if (newPosition <= prevPos) {
		// 				newPosition = prevPos + 1
		// 			}
		// 		} else {
		// 			// É a primeira task, colocar antes dela
		// 			const targetPos = targetTask.position || 100
		// 			newPosition = Math.max(1, Math.floor(targetPos / 2))
		// 		}
		// 	}
		// }
		// // Movendo para outra lista
		// else {
		// 	// Inserir ANTES da task alvo
		// 	if (targetIndex > 0) {
		// 		const prevTask = targetList.tasks[targetIndex - 1]
		// 		const prevPos = prevTask.position || targetIndex * 100
		// 		const targetPos = targetTask.position || (targetIndex + 1) * 100
		// 		newPosition = Math.floor((prevPos + targetPos) / 2)

		// 		if (newPosition <= prevPos) {
		// 			newPosition = prevPos + 1
		// 		}
		// 	} else {
		// 		const targetPos = targetTask.position || 100
		// 		newPosition = Math.max(1, Math.floor(targetPos / 2))
		// 	}
		// }

		// // Garantir que position seja >= 1
		// newPosition = Math.max(1, newPosition)

		console.log("🎯 Movendo task:", {
			from: draggedIndex,
			to: targetIndex,
			draggedTask: draggedTask.title,
			targetTask: targetTask.title,
			position: targetTask.position
			// newPosition
		})

		// Mover a tarefa
		try {
			await moveTaskMutation({
				taskId: draggedTask.id,
				listId: targetList!.id as number,
				position: targetTask.position !== undefined ? targetTask.position : 0
			})
		} catch (error) {
			console.error("Erro ao mover task:", error)
		} finally {
			setDraggedTaskId(null)
		}
	}

	const handleDrop = async (e: React.DragEvent, targetColumnId: number) => {
		e.preventDefault()
		if (!draggedTaskId) return

		// Encontrar a tarefa arrastada
		let draggedTask: Task | undefined
		let sourceColumnId: number | undefined
		for (const col of columns) {
			const task = col.tasks.find((t: Task) => t.id === draggedTaskId)
			if (task) {
				draggedTask = task
				sourceColumnId = col.id as number
				break
			}
		}

		if (!draggedTask || !sourceColumnId) {
			setDraggedTaskId(null)
			return
		}

		try {
			await moveTaskMutation({
				listId: targetColumnId,
				position: draggedTask.position ?? 0,
				taskId: draggedTask.id
			})
		} catch (error) {
			console.error("Erro ao mover task:", error)
		} finally {
			setDraggedTaskId(null)
		}
	}

	const openCreateModal = (columnId: number) => {
		window.dispatchEvent(new CustomEvent("task:create-open", { detail: columnId }))
		Modal.handleOpen("create_task_modal")
	}

	const openViewModal = (task: Task) => {
		window.dispatchEvent(new CustomEvent("task:view-open", { detail: task }))
	}

	const openCreateListModal = () => {
		Modal.handleOpen("create_list_modal")
	}

	const { mutate: deleteListMutation, error: deleteListError } = useMutation({
		mutationFn: async (data: DeleteListFormData) => {
			const res = await deleteList({ id: data.id })
			if (res.success) {
				toast.success("Lista deletada com sucesso!")
				return data.id
			} else {
				console.log(deleteListError)
				toast.error("Erro ao deletar lista: " + (res.error || "Erro desconhecido"))
			}
		},
		onSuccess: (id) => {
			queryClient.setQueryData(["lists"], (old: any) => {
				if (!old || !old.data) return { data: [] }
				const newData = old.data.filter((list: List) => String(list.id) && String(list.id) !== id)
				return {
					...old,
					data: newData
				}
			})
		}
	})

	const deleteColumn = async (columnId: string) => {
		if (window.confirm("Tem certeza que deseja deletar esta lista? Todas as tarefas serão perdidas.")) {
			deleteListMutation({ id: columnId })
		}
	}

	const startEditingColumn = (columnId: number, currentName: string) => {
		setEditingColumnId(columnId)
		setEditingColumnName(currentName)
	}

	const cancelEditingColumn = () => {
		setEditingColumnId(null)
		setEditingColumnName("")
	}

	const { mutate: updateListMutation } = useMutation({
		mutationFn: async (data: UpdateListFormData) => {
			const res = await updateList({ id: data.id, name: data.name })
			if (res.success && res.list) {
				toast.success("Lista atualizada com sucesso!")
				return res
			} else {
				toast.error("Erro ao atualizar lista: " + (res.error || "Erro desconhecido"))
			}
		},
		onSuccess: (res) => {
			queryClient.setQueryData(["lists"], (old: any) => {
				if (!old || !old.data) return { data: [res!.list] }
				return { ...old, data: old.data.map((list: List) => (list.id === res!.list.id ? res!.list : list)) }
			})
			setEditingColumnId(null)
			setEditingColumnName("")
		}
	})

	const saveColumnName = async (columnId: number) => {
		if (!editingColumnName.trim()) {
			toast.error("Nome da lista não pode ser vazio")
			return
		}

		updateListMutation({ id: columnId, name: editingColumnName })
	}

	const handleColumnDragStart = (e: React.DragEvent, columnId: number) => {
		setDraggedColumnId(columnId)
		e.dataTransfer.effectAllowed = "move"
	}

	const handleColumnDragOver = (e: React.DragEvent) => {
		e.preventDefault()
		e.dataTransfer.dropEffect = "move"
	}

	const handleColumnDrop = async (e: React.DragEvent, targetColumnId: number) => {
		e.preventDefault()
		e.stopPropagation()
		if (!draggedColumnId || draggedColumnId === targetColumnId) {
			setDraggedColumnId(null)
			return
		}
		setDraggedColumnId(null)
	}

	if (error) {
		return <div className="flex items-center justify-center h-full">Erro ao carregar listas</div>
	}

	return (
		<div className="flex gap-6 h-full overflow-x-auto pb-4">
			{columns.length > 0 &&
				columns.map((column, index) => (
					<div
						key={column.id ?? `column-${index}`}
						onDragOver={handleColumnDragOver}
						onDrop={(e) => handleColumnDrop(e, column.id)}
						className={`flex-shrink-0 w-80 flex flex-col ${draggedColumnId === column.id ? "opacity-50" : ""}`}
					>
						<div
							draggable={editingColumnId !== column.id}
							onDragStart={(e) => handleColumnDragStart(e, column.id)}
							className="flex items-center justify-between mb-4 px-2 cursor-move"
						>
							<div className="flex items-center gap-2 flex-1">
								{editingColumnId === column.id ? (
									<div className="flex items-center gap-2 flex-1">
										<input
											type="text"
											value={editingColumnName}
											onChange={(e) => setEditingColumnName(e.target.value)}
											onKeyDown={(e) => {
												if (e.key === "Enter") saveColumnName(column.id)
												if (e.key === "Escape") cancelEditingColumn()
											}}
											className="flex-1 px-2 py-1 text-sm border border-indigo-primary rounded focus:outline-none"
											autoFocus
										/>
										<button
											onClick={() => saveColumnName(column.id)}
											className="p-1 text-green-600 hover:bg-green-50 rounded"
											title="Salvar"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<polyline points="20 6 9 17 4 12"></polyline>
											</svg>
										</button>
										<button
											onClick={cancelEditingColumn}
											className="p-1 text-red-600 hover:bg-red-50 rounded"
											title="Cancelar"
										>
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="16"
												height="16"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
											>
												<line x1="18" y1="6" x2="6" y2="18"></line>
												<line x1="6" y1="6" x2="18" y2="18"></line>
											</svg>
										</button>
									</div>
								) : (
									<>
										<h2 className="font-semibold text-lg text-text-primary">{column.name}</h2>
										<span className="px-2 py-0.5 text-xs font-medium rounded-full bg-grey-primary text-text-secondary">
											{Array.isArray(column.tasks) ? column.tasks.length : 0}
										</span>
									</>
								)}
							</div>
							{editingColumnId !== column.id && (
								<div className="flex items-center gap-1">
									<button
										onClick={(e) => {
											e.stopPropagation()
											startEditingColumn(column.id, column.name)
										}}
										className="p-1 text-text-secondary hover:text-indigo-primary hover:bg-indigo-50 rounded transition-colors"
										title="Editar lista"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
											<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
										</svg>
									</button>
									<button
										onClick={(e) => {
											e.stopPropagation()
											deleteColumn(column.id.toString())
										}}
										className="p-1 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded transition-colors"
										title="Deletar lista"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											strokeWidth="2"
											strokeLinecap="round"
											strokeLinejoin="round"
										>
											<path d="M3 6h18"></path>
											<path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
											<path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
										</svg>
									</button>
								</div>
							)}
						</div>

						{/* Tasks Container */}
						<div
							onDragOver={handleDragOver}
							onDrop={(e) => handleDrop(e, column.id as number)}
							className={`flex-1 flex flex-col gap-3 p-3 rounded-xl bg-background min-h-[200px]
                       ${draggedTaskId ? "border-2 border-dashed border-indigo-primary/50" : ""}`}
						>
							{column.tasks &&
								column.tasks.length > 0 &&
								column.tasks.map((task, idx) => (
									<TaskCard
										key={task.id ?? `task-${idx}`}
										task={task}
										listId={column.id}
										onCardClick={openViewModal}
										onDragStart={handleDragStart}
										onDragOver={handleTaskDragOver}
										onDrop={handleTaskDrop}
										isDraggedOver={dragOverTaskId === task.id}
									/>
								))}

							{/* Add Card Button */}
							<button
								onClick={() => openCreateModal(column.id)}
								className="flex items-center justify-center gap-2 p-3 rounded-xl
                         border border-dashed border-light-grey
                         text-text-secondary hover:text-indigo-primary hover:border-indigo-primary
                         transition-all duration-200"
							>
								<Plus width={16} height={16} />
								<span className="text-sm font-medium">Novo Card</span>
							</button>
						</div>
					</div>
				))}

			<div className="flex-shrink-0 w-80">
				<button
					onClick={openCreateListModal}
					className="w-full h-32 flex flex-col items-center justify-center gap-3 p-4 rounded-xl
                     border-2 border-dashed border-light-grey
                     text-text-secondary hover:text-indigo-primary hover:border-indigo-primary
                     bg-background hover:bg-gray-50
                     transition-all duration-200"
				>
					<Plus width={24} height={24} />
					<span className="text-sm font-semibold">Nova Lista</span>
				</button>
			</div>
		</div>
	)
}
