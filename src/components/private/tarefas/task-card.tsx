"use client"

import { Task, TaskChecklistItem } from "@/types/tasks/task"
import { Avatar } from "@/components/private/ui/avatar"
import { Link, Paperclip, MessageSquare, CheckSquare } from "lucide-react"
import { ModalTrigger } from "@/components/private/ui/modal"

interface TaskCardProps {
	task: Task
	onCardClick: (task: Task) => void
	onDragStart: (e: React.DragEvent, taskId: number) => void
	onDragOver?: (e: React.DragEvent, taskId: number) => void
	onDrop?: (e: React.DragEvent, task: Task, listId: number) => void
	listId: number
	isDraggedOver?: boolean
}

const priorityColors = {
	0: "bg-green-100 text-green-700 border-green-200",
	1: "bg-yellow-100 text-yellow-700 border-yellow-200",
	2: "bg-red-100 text-red-700 border-red-200"
}

const priorityLabels = {
	0: "Baixa",
	1: "Média",
	2: "Alta"
}

export function TaskCard({ task, onCardClick, onDragStart, onDragOver, onDrop, listId, isDraggedOver }: TaskCardProps) {
	const allChecklistItems: TaskChecklistItem[] = Array.isArray(task.checklists)
		? task.checklists.reduce((acc: TaskChecklistItem[], checklist: any) => {
				if (Array.isArray(checklist.items)) acc.push(...checklist.items)
				return acc
		  }, [])
		: []

	const completedChecklist = allChecklistItems.filter((item: TaskChecklistItem) => item.is_completed).length
	const totalChecklist = allChecklistItems.length
	const progressPercent = totalChecklist > 0 ? (completedChecklist / totalChecklist) * 100 : 0

	return (
		<ModalTrigger id="view_task_modal">
			<div
				draggable
				onDragStart={(e) => onDragStart(e, task.id)}
				onDragOver={(e) => onDragOver?.(e, task.id)}
				onDrop={(e) => onDrop?.(e, task, listId)}
				onClick={() => onCardClick(task)}
				className={`bg-white rounded-xl border border-light-grey p-4 cursor-pointer
				   hover:shadow-md hover:border-indigo-primary/30
				   transition-all duration-200 ease-in-out
				   active:cursor-grabbing
				   ${isDraggedOver ? "border-2 border-indigo-primary border-dashed" : ""}`}
			>
				{/* Título */}
				<h3 className="font-semibold text-base text-text-primary mb-2">{task.title}</h3>

				{/* Tags */}
				{Array.isArray(task.tags) && task.tags.length > 0 && (
					<div className="flex flex-wrap gap-1 mb-3">
						{task.tags.map((tag, index) => (
							<span
								key={index}
								className="px-2 py-0.5 text-xs font-medium rounded-full
						   bg-blue-primary/10 text-blue-primary border border-blue-primary/20"
							>
								{tag}
							</span>
						))}
					</div>
				)}

				{/* Prioridade */}
				<div className="mb-3">
					<span className={`px-2 py-1 text-xs font-medium rounded-md border ${priorityColors[task.priority ?? 0]}`}>
						{priorityLabels[task.priority ?? 0]}
					</span>
				</div>

				{/* Progress bar (se tem checklist) */}
				{totalChecklist > 0 && (
					<div className="mb-3">
						<div className="flex items-center gap-2 mb-1">
							<CheckSquare width={14} height={14} className="text-text-secondary" />
							<span className="text-xs text-text-secondary font-medium">
								{completedChecklist}/{totalChecklist}
							</span>
						</div>
						<div className="w-full bg-grey-primary rounded-full h-1.5">
							<div
								className="bg-indigo-primary h-1.5 rounded-full transition-all duration-300"
								style={{ width: `${progressPercent}%` }}
							/>
						</div>
					</div>
				)}

				{/* Bottom section - Icons and Members */}
				<div className="flex items-center justify-between mt-3 pt-3 border-t border-light-grey">
					{/* Icons */}
					<div className="flex items-center gap-3">
						{Array.isArray(task.links) && task.links.length > 0 && (
							<div className="flex items-center gap-1 text-text-secondary">
								<Paperclip width={14} height={14} />
								<span className="text-xs">{task.links.length}</span>
							</div>
						)}
						{Array.isArray(task.comments) && task.comments.length > 0 && (
							<div className="flex items-center gap-1 text-text-secondary">
								<MessageSquare width={14} height={14} />
								<span className="text-xs">{task.comments.length}</span>
							</div>
						)}
					</div>

					{/* Members */}
					{Array.isArray(task.members) && task.members.length > 0 && (
						<div className="flex -space-x-2">
							{task.members.slice(0, 3).map((member) => (
								<div key={member.id} className="ring-2 ring-white rounded-full" title={member.name}>
									<Avatar name={member.name} />
								</div>
							))}
							{task.members.length > 3 && (
								<div
									className="w-8 h-8 rounded-full bg-grey-primary border-2 border-white
								flex items-center justify-center text-xs font-medium text-text-secondary"
								>
									+{task.members.length - 3}
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</ModalTrigger>
	)
}
