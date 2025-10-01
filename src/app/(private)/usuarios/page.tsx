import { Button } from "@/components/private/ui/button"
import { ModalTrigger } from "@/components/private/ui/modal"
import { SearchBar } from "@/components/private/ui/page-search-bar/searchbar"
import { TitleSection } from "@/components/private/ui/title-section"
import { CreateUserModal } from "@/components/private/usuarios/create-user-modal"
import { UsersList } from "@/components/private/usuarios/users-list"
import { Plus } from "lucide-react"
import { Suspense } from "react"

export default function Users() {
	return (
		<div className="flex flex-col gap-6 w-full h-full">
			<div className="flex items-center justify-between">
				<TitleSection title="Usuários" paragraph="Gerencie os membros da sua equipe" />

				<ModalTrigger id="my_modal_user">
					<Button outline={false} color="indigo" className="gap-2 px-4">
						<Plus /> Adicionar Usuário
					</Button>
				</ModalTrigger>
			</div>

			<SearchBar placeholder="Pesquisar usuários..." />
			{/* Lista de usuários - Exemplo estático */}
			<Suspense fallback={<div>Carregando...</div>}>
				<UsersList />
			</Suspense>

			{/* Modal de cadastro de usuario */}
			<CreateUserModal />
		</div>
	)
}
