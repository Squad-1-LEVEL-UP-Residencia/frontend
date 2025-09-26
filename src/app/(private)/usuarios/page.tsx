import { Container } from "@/components/private/ui/container"
import { SearchBar } from "@/components/private/ui/page-search-bar/searchbar"
import { TitleSection } from "@/components/private/ui/title-section"

export default function Users() {
	return (
		<div className="flex flex-col gap-6 w-full h-full">
			<TitleSection
				title="Usuários"
				paragraph="Gerencie os membros da sua equipe"
			/>
			<SearchBar />
			{/* Criar componente Container para a base */}
			{/* Lista de usuários - Exemplo estático */}
			<Container variant="page">
				<ul>
					<li>Fulanin de tal</li>
					<li>Beltrano de tal</li>
					<li>Ciclano de tal</li>
					<li>Fulano de tal</li>
				</ul>
			</Container>
		</div>
	)
}
