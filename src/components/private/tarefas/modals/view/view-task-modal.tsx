"use client"

import { Modal } from "@/components/private/ui/modal"
import { Title } from "@/components/private/ui/title"
import { ViewTaskForm } from "./view-task-form"
import { useEffect, useState } from "react"
import type { Task } from "@/types/tasks/task"

export function ViewTaskModal() {
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<Task>).detail
      setTask(detail ?? null)
    }
    window.addEventListener("task:view-open", handler as EventListener)
    return () => window.removeEventListener("task:view-open", handler as EventListener)
  }, [])

  return (
    <Modal id="view_task_modal" variant="lg" hasCloseButton className="max-w-6xl">
      <div className="flex flex-col gap-6">
        <Title variant="sm">Detalhes da Tarefa</Title>
        {task && <ViewTaskForm task={task} />}
      </div>
    </Modal>
  )
}
