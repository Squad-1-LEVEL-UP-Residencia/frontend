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

	const columns = data?.lists || []

	if (isLoading) {
		return <div className="flex items-center justify-center h-full">Carregando...</div>
	}

	if (error) {
		return <div className="flex items-center justify-center h-full">Erro ao carregar listas</div>
	}

	// Escutar eventos de criação, atualização e exclusão
	useEffect(() => {
		const handleTaskCreated = (e: Event) => {
			const newTask = (e as CustomEvent<Task>).detail
			setColumns((prev) => {
				if (!Array.isArray(prev)) return prev
				return prev.map((col) => (col.id === newTask.status ? { ...col, tasks: [...(col.tasks || []), newTask] } : col))
			})
		}

		const handleTaskUpdated = (e: Event) => {
			const updatedTask = (e as CustomEvent<Task>).detail
			setColumns((prev) => {
				if (!Array.isArray(prev)) return prev
				return prev.map((col) => ({
					...col,
					tasks: (col.tasks || [])
						.filter((t) => t.id !== updatedTask.id)
						.concat(col.id === updatedTask.status ? [updatedTask] : [])
				}))
			})
		}

		const handleTaskDeleted = (e: Event) => {
			const taskId = (e as CustomEvent<string>).detail
			setColumns((prev) => {
				if (!Array.isArray(prev)) return prev
				return prev.map((col) => ({
					...col,
					tasks: (col.tasks || []).filter((t) => t.id !== taskId)
				}))
			})
		}

		const handleColumnCreated = (e: Event) => {
			const newColumn = (e as CustomEvent<List>).detail
			setColumns((prev) => {
				if (!Array.isArray(prev)) return prev
				return [...prev, newColumn]
			})
		}

		window.addEventListener("task:created", handleTaskCreated as EventListener)
		window.addEventListener("task:updated", handleTaskUpdated as EventListener)
		window.addEventListener("task:deleted", handleTaskDeleted as EventListener)
		window.addEventListener("column:created", handleColumnCreated as EventListener)

		return () => {
			window.removeEventListener("task:created", handleTaskCreated as EventListener)
			window.removeEventListener("task:updated", handleTaskUpdated as EventListener)
			window.removeEventListener("task:deleted", handleTaskDeleted as EventListener)
			window.removeEventListener("column:created", handleColumnCreated as EventListener)
		}
	}, [])

	const handleDragStart = (e: React.DragEvent, taskId: string) => {
		setDraggedTaskId(taskId)
		e.dataTransfer.effectAllowed = "move"
	}

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
		e.dataTransfer.dropEffect = "move"
	}

	const handleDrop = (e: React.DragEvent, targetColumnId: TaskStatus) => {
		e.preventDefault()

		if (!draggedTaskId) return

		// Encontrar a tarefa arrastada
		let draggedTask: Task | undefined
		let sourceColumnId: TaskStatus | undefined

		for (const col of columns) {
			const task = col.tasks.find((t) => t.id === draggedTaskId)
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

		// Atualizar o status da tarefa
		const updatedTask = { ...draggedTask, status: targetColumnId }

		// Atualizar as colunas
		setColumns((prev) =>
			prev.map((col) => {
				if (col.id === sourceColumnId) {
					return { ...col, tasks: col.tasks.filter((t) => t.id !== draggedTaskId) }
				}
				if (col.id === targetColumnId) {
					return { ...col, tasks: [...col.tasks, updatedTask] }
				}
				return col
			})
		)

		setDraggedTaskId(null)

		// Aqui você pode disparar uma action para salvar no backend
		// updateTaskStatus(draggedTaskId, targetColumnId)
	}

	const openCreateModal = (columnId: TaskStatus) => {
		window.dispatchEvent(new CustomEvent("task:create-open", { detail: columnId }))
		Modal.handleOpen("create_task_modal")
	}

	const openViewModal = (task: Task) => {
		window.dispatchEvent(new CustomEvent("task:view-open", { detail: task }))
	}

	const openCreateColumnModal = () => {
		Modal.handleOpen("create_column_modal")
	}

	const deleteColumn = (columnId: string) => {
		if (window.confirm("Tem certeza que deseja deletar esta lista? Todas as tarefas serão perdidas.")) {
			setColumns((prev) => prev.filter((col) => col.id !== columnId))
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

	const handleColumnDrop = (e: React.DragEvent, targetColumnId: string) => {
		e.preventDefault()
		e.stopPropagation()

		if (!draggedColumnId || draggedColumnId === targetColumnId) {
			setDraggedColumnId(null)
			return
		}

		const draggedIndex = columns.findIndex((col) => col.id === draggedColumnId)
		const targetIndex = columns.findIndex((col) => col.id === targetColumnId)

		if (draggedIndex === -1 || targetIndex === -1) {
			setDraggedColumnId(null)
			return
		}

		const newColumns = [...columns]
		const [draggedColumn] = newColumns.splice(draggedIndex, 1)
		newColumns.splice(targetIndex, 0, draggedColumn)

		setColumns(newColumns)
		setDraggedColumnId(null)
	}

	if (!columns || columns.length === 0) {
		return <div className="flex items-center justify-center h-full">Carregando...</div>
	}

	return (
		<div className="flex gap-6 h-full overflow-x-auto pb-4">
			{columns.map((column, index) => (
				<div
					key={column.id}
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
							<h2 className="font-semibold text-lg text-text-primary">{column.title}</h2>
							<span className="px-2 py-0.5 text-xs font-medium rounded-full bg-grey-primary text-text-secondary">
								{column.tasks.length}
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
							column.tasks.map((task) => (
								<TaskCard key={task.id} task={task} onCardClick={openViewModal} onDragStart={handleDragStart} />
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
					onClick={openCreateColumnModal}
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
