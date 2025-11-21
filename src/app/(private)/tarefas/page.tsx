import { PageContainer } from "@/components/private/ui/page-container"
import { PageHeader } from "@/components/private/ui/page-header"
import { TitleSection } from "@/components/private/ui/title-section"
import { TaskBoard } from "@/components/private/tarefas/task-board"
import { CreateTaskModal } from "@/components/private/tarefas/modals/create/create-task-modal"
import { ViewTaskModal } from "@/components/private/tarefas/modals/view/view-task-modal"
import { CreateListModal } from "@/components/private/tarefas/modals/create-list/create-list-modal"

export default function Tasks() {
	return (
		<PageContainer>
			<PageHeader>
				<TitleSection title="Tarefas" paragraph="Gerencie todas as tarefas do projeto no estilo Kanban" />
			</PageHeader>

			<div className="flex-1 overflow-auto">
				<TaskBoard />
			</div>

			<CreateTaskModal />
			<ViewTaskModal />
			<CreateListModal />
		</PageContainer>
	)
}
