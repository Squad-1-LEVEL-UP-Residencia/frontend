"use client"

import { useState, useEffect } from "react"
import { TaskCard } from "./task-card"
import { Plus } from "lucide-react"
import { Modal } from "@/components/private/ui/modal"
import type { Task, TaskStatus } from "@/types/tasks/task"
import type { List } from "@/types/lists/list"
import { useLists } from "@/hooks/lists/use-lists"

export function TaskBoard() {
	const { data, isLoading, error } = useLists(1)
	const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)
	const [draggedColumnId, setDraggedColumnId] = useState<string | null>(null)

	const columns = data?.data || []

	// Funções de manipulação agora disparam ações de API

	const handleDragStart = (e: React.DragEvent, taskId: string) => {
		setDraggedTaskId(taskId)
		e.dataTransfer.effectAllowed = "move"
	}

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
		e.dataTransfer.dropEffect = "move"
	}

	const handleDrop = async (e: React.DragEvent, targetColumnId: TaskStatus) => {
		e.preventDefault()
		if (!draggedTaskId) return

		// Encontrar a tarefa arrastada
		let draggedTask: Task | undefined
		let sourceColumnId: TaskStatus | undefined
		for (const col of columns) {
			const task = col.tasks.find((t: Task) => t.id === draggedTaskId)
			if (task) {
				draggedTask = task
				sourceColumnId = col.id as TaskStatus
				break
			}
		}
		if (!draggedTask || !sourceColumnId || sourceColumnId === targetColumnId) {
			setDraggedTaskId(null)
			return
		}
		// Disparar ação de atualização na API
		// Exemplo: await updateTaskStatus(draggedTaskId, targetColumnId)
		setDraggedTaskId(null)
	}

	const openCreateModal = (columnId: TaskStatus) => {
		window.dispatchEvent(new CustomEvent("task:create-open", { detail: columnId }))
		Modal.handleOpen("create_task_modal")
	}

	const openViewModal = (task: Task) => {
		window.dispatchEvent(new CustomEvent("task:view-open", { detail: task }))
	}

	const openCreateListModal = () => {
		Modal.handleOpen("create_list_modal")
	}

	const deleteColumn = async (columnId: string) => {
		if (window.confirm("Tem certeza que deseja deletar esta lista? Todas as tarefas serão perdidas.")) {
			// Disparar ação de exclusão na API
			// Exemplo: await deleteList(columnId)
		}
	}

	const handleColumnDragStart = (e: React.DragEvent, columnId: string) => {
		setDraggedColumnId(columnId)
		e.dataTransfer.effectAllowed = "move"
	}

	const handleColumnDragOver = (e: React.DragEvent) => {
		e.preventDefault()
		e.dataTransfer.dropEffect = "move"
	}

	const handleColumnDrop = async (e: React.DragEvent, targetColumnId: string) => {
		e.preventDefault()
		e.stopPropagation()
		if (!draggedColumnId || draggedColumnId === targetColumnId) {
			setDraggedColumnId(null)
			return
		}
		// Disparar ação de reordenação na API se necessário
		// Exemplo: await reorderList(draggedColumnId, targetColumnId)
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
							draggable
							onDragStart={(e) => handleColumnDragStart(e, column.id)}
							className="flex items-center justify-between mb-4 px-2 cursor-move"
						>
							<div className="flex items-center gap-2">
								<h2 className="font-semibold text-lg text-text-primary">{column.name}</h2>
								<span className="px-2 py-0.5 text-xs font-medium rounded-full bg-grey-primary text-text-secondary">
									{Array.isArray(column.tasks) ? column.tasks.length : 0}
								</span>
							</div>
						</div>

						{/* Tasks Container */}
						<div
							onDragOver={handleDragOver}
							onDrop={(e) => handleDrop(e, column.id as TaskStatus)}
							className={`flex-1 flex flex-col gap-3 p-3 rounded-xl bg-background min-h-[200px]
                       ${draggedTaskId ? "border-2 border-dashed border-indigo-primary/50" : ""}`}
						>
							{column.tasks &&
								column.tasks.length > 0 &&
								column.tasks.map((task, idx) => (
									<TaskCard
										key={task.id ?? `task-${idx}`}
										task={task}
										onCardClick={openViewModal}
										onDragStart={handleDragStart}
									/>
								))}

							{/* Add Card Button */}
							<button
								onClick={() => openCreateModal(column.id as TaskStatus)}
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
