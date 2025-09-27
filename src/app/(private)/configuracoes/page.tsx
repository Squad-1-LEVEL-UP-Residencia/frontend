import { Container } from "@/components/private/ui/container"
import { PageContainer } from "@/components/private/ui/page-container"
import { SearchBar } from "@/components/private/ui/page-search-bar/searchbar"
import { Title } from "@/components/private/ui/title"
import { TitleSection } from "@/components/private/ui/title-section"

export default function Settings() {
	return (
		<PageContainer>
			<TitleSection title="Configurações" paragraph="Gerenciar configurações" />
			<SearchBar placeholder="Pesquisar configurações..." />
			<Container variant="page">
				<Title>Pagina de configurações</Title>
			</Container>
		</PageContainer>
	)
}
