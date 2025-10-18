import { CreateRoleModal } from "@/components/private/cargos/create/create-role-modal"
import { DeleteRoleModal } from "@/components/private/cargos/delete/delete-role-modal"
import { EditRoleModal } from "@/components/private/cargos/edit/edit-role-modal"
import { RolesList } from "@/components/private/cargos/roles-list"
import { Button } from "@/components/private/ui/button"
import { ModalTrigger } from "@/components/private/ui/modal"
import { PageContainer } from "@/components/private/ui/page-container"
import { PageHeader } from "@/components/private/ui/page-header"
import { SearchBar } from "@/components/private/ui/page-search-bar/searchbar"
import { TitleSection } from "@/components/private/ui/title-section"
import { Plus } from "lucide-react"
import { Suspense } from "react"

export default function CargosNewPage() {
	return (
		<PageContainer>
			<PageHeader>
				<TitleSection title="Cargos" paragraph="Gerencie os Cargos" />

				<ModalTrigger id="add_role_modal">
					<Button outline={false} color="indigo" className="gap-2 px-4">
						<Plus /> Adicionar Cargo
					</Button>
				</ModalTrigger>
			</PageHeader>

			<SearchBar placeholder={"Pesquisar cargos"} />
			<Suspense fallback={<div>Loading...</div>}>
				<RolesList />
			</Suspense>

			<CreateRoleModal />
			<EditRoleModal />
			<DeleteRoleModal />
		</PageContainer>
	)
}
