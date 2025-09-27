import { SearchBar } from "@/components/private/ui/page-search-bar/searchbar"
import { TitleSection } from "@/components/private/ui/title-section"
import { UsersList } from "@/components/private/usuarios/users-list"
import { Suspense } from "react"

export default function Users() {
	return (
		<div className="flex flex-col gap-6 w-full h-full">
			<TitleSection
				title="Usuários"
				paragraph="Gerencie os membros da sua equipe"
			/>
			<SearchBar placeholder="Pesquisar usuários..." />
			{/* Lista de usuários - Exemplo estático */}
			<Suspense fallback={<div>Carregando...</div>}>
				<UsersList />
			</Suspense>
		</div>
	)
}
