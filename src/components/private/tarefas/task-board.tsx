"use client"

import { useState, useEffect } from "react"
import { TaskCard } from "./task-card"
import { Plus } from "lucide-react"
import { Modal } from "@/components/private/ui/modal"
import type { Task, TaskColumn, TaskStatus } from "@/types/tasks/task"

const initialColumns: TaskColumn[] = [
  {
    id: "todo",
    title: "A Fazer",
    tasks: []
  },
  {
    id: "doing",
    title: "Fazendo",
    tasks: []
  },
  {
    id: "done",
    title: "Concluído",
    tasks: []
  }
]

// Mock data para demonstração
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Criar página de login",
    description: "Desenvolver interface de autenticação com validação de formulário",
    status: "todo",
    priority: "high",
    tags: ["Frontend", "UI"],
    campaign: "MVP Sistema",
    dueDate: new Date("2025-11-10"),
    members: [
      { id: "1", name: "João Silva" },
      { id: "2", name: "Maria Santos" }
    ],
    attachments: [],
    comments: [],
    checklist: [
      { id: "1", content: "Criar formulário", completed: true },
      { id: "2", content: "Adicionar validação", completed: false },
      { id: "3", content: "Integrar com API", completed: false }
    ],
    progress: 33,
    chatGptLink: "https://chat.openai.com/example",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "2",
    title: "Implementar dashboard",
    description: "Criar dashboard com gráficos e métricas",
    status: "doing",
    priority: "medium",
    tags: ["Frontend", "Charts"],
    members: [
      { id: "1", name: "João Silva" }
    ],
    attachments: [
      { id: "1", name: "mockup.png", url: "#", uploadedAt: new Date() }
    ],
    comments: [
      {
        id: "1",
        author: { id: "1", name: "João Silva" },
        content: "Começando implementação",
        createdAt: new Date()
      }
    ],
    checklist: [],
    progress: 50,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "3",
    title: "Revisar código do backend",
    description: "Code review das APIs criadas",
    status: "done",
    priority: "low",
    tags: ["Backend", "Review"],
    members: [],
    attachments: [],
    comments: [],
    checklist: [],
    progress: 100,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

export function TaskBoard() {
  const [columns, setColumns] = useState<TaskColumn[]>(initialColumns)
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null)

  // Inicializar com mock data
  useEffect(() => {
    const newColumns = initialColumns.map(col => ({
      ...col,
      tasks: mockTasks.filter(task => task.status === col.id)
    }))
    setColumns(newColumns)
  }, [])

  // Escutar eventos de criação, atualização e exclusão
  useEffect(() => {
    const handleTaskCreated = (e: Event) => {
      const newTask = (e as CustomEvent<Task>).detail
      setColumns(prev =>
        prev.map(col =>
          col.id === newTask.status
            ? { ...col, tasks: [...col.tasks, newTask] }
            : col
        )
      )
    }

    const handleTaskUpdated = (e: Event) => {
      const updatedTask = (e as CustomEvent<Task>).detail
      setColumns(prev =>
        prev.map(col => ({
          ...col,
          tasks: col.tasks
            .filter(t => t.id !== updatedTask.id)
            .concat(col.id === updatedTask.status ? [updatedTask] : [])
        }))
      )
    }

    const handleTaskDeleted = (e: Event) => {
      const taskId = (e as CustomEvent<string>).detail
      setColumns(prev =>
        prev.map(col => ({
          ...col,
          tasks: col.tasks.filter(t => t.id !== taskId)
        }))
      )
    }

    window.addEventListener("task:created", handleTaskCreated as EventListener)
    window.addEventListener("task:updated", handleTaskUpdated as EventListener)
    window.addEventListener("task:deleted", handleTaskDeleted as EventListener)

    return () => {
      window.removeEventListener("task:created", handleTaskCreated as EventListener)
      window.removeEventListener("task:updated", handleTaskUpdated as EventListener)
      window.removeEventListener("task:deleted", handleTaskDeleted as EventListener)
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
      const task = col.tasks.find(t => t.id === draggedTaskId)
      if (task) {
        draggedTask = task
        sourceColumnId = col.id
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
    setColumns(prev =>
      prev.map(col => {
        if (col.id === sourceColumnId) {
          return { ...col, tasks: col.tasks.filter(t => t.id !== draggedTaskId) }
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

  return (
    <div className="flex gap-6 h-full overflow-x-auto pb-4">
      {columns.map((column) => (
        <div
          key={column.id}
          className="flex-shrink-0 w-80 flex flex-col"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          {/* Column Header */}
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold text-lg text-text-primary">
                {column.title}
              </h2>
              <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-grey-primary text-text-secondary">
                {column.tasks.length}
              </span>
            </div>
          </div>

          {/* Tasks Container */}
          <div
            className={`flex-1 flex flex-col gap-3 p-3 rounded-xl bg-background min-h-[200px]
                       ${draggedTaskId ? 'border-2 border-dashed border-indigo-primary/50' : ''}`}
          >
            {column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onCardClick={openViewModal}
                onDragStart={handleDragStart}
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
    </div>
  )
}
