import { Button } from "@/components/private/ui/button"
import { Modal, ModalTrigger } from "@/components/private/ui/modal"
import { SearchBar } from "@/components/private/ui/page-search-bar/searchbar"
import { TitleSection } from "@/components/private/ui/title-section"
import { UsersList } from "@/components/private/usuarios/users-list"
import { Plus } from "lucide-react"
import { Suspense } from "react"

export default function Users() {
	return (
		<div className="flex flex-col gap-6 w-full h-full">
			<div className="flex items-center justify-between">
				<TitleSection
					title="Usuários"
					paragraph="Gerencie os membros da sua equipe"
				/>
				{/* TODO acho q pode ser apenas o modal trigger */}
				<ModalTrigger>
					<Button variant="secondary" color="indigo" className="gap-2 px-4">
						<Plus /> Adicionar Usuário
					</Button>
				</ModalTrigger>
			</div>

			<SearchBar placeholder="Pesquisar usuários..." />
			{/* Lista de usuários - Exemplo estático */}
			<Suspense fallback={<div>Carregando...</div>}>
				<UsersList />
			</Suspense>

			<Modal hasCancelButton>
				<h1>receba</h1>
			</Modal>
		</div>
	)
}
