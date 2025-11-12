import { ClientsList } from "@/components/private/clientes/clients-list"
import { CreateClientModal } from "@/components/private/clientes/modals/create/create-client-modal"
import { DeleteClientModal } from "@/components/private/clientes/modals/delete/delete-client-modal"
import { EditClientModal } from "@/components/private/clientes/modals/edit/edit-client-modal"
import { ClientsSearch } from "@/components/private/clientes/clients-search"
import { Button } from "@/components/private/ui/button"
import { ModalTrigger } from "@/components/private/ui/modal"
import { PageContainer } from "@/components/private/ui/page-container"
import { PageHeader } from "@/components/private/ui/page-header"
import { TitleSection } from "@/components/private/ui/title-section"
import { Plus } from "lucide-react"
import { Suspense } from "react"

export default function Clients() {
	return (
		<PageContainer>
			<PageHeader>
				<TitleSection title="Clientes" paragraph="Gerenciar clientes" />

				<ModalTrigger id="create_client_modal">
					<Button outline={false} color="indigo" className="gap-2 px-4">
						<Plus /> Adicionar cliente
					</Button>
				</ModalTrigger>
			</PageHeader>
			<ClientsSearch />

			<Suspense fallback={<div>Carregando...</div>}>
				<ClientsList />
			</Suspense>

			<CreateClientModal />
			<EditClientModal />
			<DeleteClientModal />
		</PageContainer>
	)
}
