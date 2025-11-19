import { Button } from "@/components/private/ui/button"
import { ModalTrigger } from "@/components/private/ui/modal"
import { PageContainer } from "@/components/private/ui/page-container"
import { PageHeader } from "@/components/private/ui/page-header"
import { TitleSection } from "@/components/private/ui/title-section"
import { CreateUserModal } from "@/components/private/usuarios/modals/create/create-user-modal"
import { DeleteUserModal } from "@/components/private/usuarios/modals/delete/delete-user-modal"
import { EditUserModal } from "@/components/private/usuarios/modals/edit/edit-user-modal"
import ViewUserModal from "@/components/private/usuarios/modals/view/view-user-modal"
import { UsersList } from "@/components/private/usuarios/users-list"
import { UserSearch } from "@/components/private/usuarios/users-search"
import { Plus } from "lucide-react"
import { Suspense } from "react"

export default function Users() {
	return (
		<PageContainer>
			<PageHeader>
				<TitleSection title="Usuários" paragraph="Gerencie os membros da sua equipe" />

				<ModalTrigger id="create_user_modal">
					<Button outline={false} color="indigo" className="gap-2 px-4">
						<Plus /> Adicionar Usuário
					</Button>
				</ModalTrigger>
			</PageHeader>

			<Suspense fallback={<div>Carregando...</div>}>
				<UserSearch />

				<UsersList />
			</Suspense>

			<CreateUserModal />
			<EditUserModal />
			<DeleteUserModal />
			<ViewUserModal />
		</PageContainer>
	)
}
