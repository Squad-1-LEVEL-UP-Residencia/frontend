"use client"

import { Button } from "@/components/private/ui/button"
import { Modal } from "@/components/private/ui/modal"
import { SearchBar } from "@/components/private/ui/page-search-bar/searchbar"
import { TitleSection } from "@/components/private/ui/title-section"
import { UsersList } from "@/components/private/usuarios/users-list"
import { Plus } from "lucide-react"
import { Suspense } from "react"

export default function Users() {
	const handleOpenModal = () => {
		const dialog = document?.getElementById(
			"my_modal_5"
		) as HTMLDialogElement | null
		dialog?.showModal()
	}

	return (
		<div className="flex flex-col gap-6 w-full h-full">
			{/* envelopar isso e o botao numa div */}
			<div className="flex items-center justify-between">
				<TitleSection
					title="Usuários"
					paragraph="Gerencie os membros da sua equipe"
				/>
				<Modal hasCancelButton variant="sm">
					<h1>receba</h1>
				</Modal>
				<Button
					variant="secondary"
					color="indigo"
					onClick={() => handleOpenModal()}
					className="gap-2 px-4"
				>
					<Plus /> Adicionar Usuário
				</Button>
			</div>

			<SearchBar placeholder="Pesquisar usuários..." />
			{/* Lista de usuários - Exemplo estático */}
			<Suspense fallback={<div>Carregando...</div>}>
				<UsersList />
			</Suspense>
		</div>
	)
}
