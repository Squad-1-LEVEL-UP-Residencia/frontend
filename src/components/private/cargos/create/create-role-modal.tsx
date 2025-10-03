import { Modal, ModalFooter } from "../../ui/modal"
import { Title } from "../../ui/title"
import { Button } from "../../ui/button"

export function CreateRoleModal() {
	return (
		<Modal id="add_role_modal">
			<form className="space-y-4">
				<div className="flex items-center justify-between">
					<Title variant="sm">Adicionar novo cargo</Title>
				</div>
				<input
					autoFocus
					placeholder="Nome do cargo"
					required
					className="w-full rounded-lg border border-mid-grey/40 bg-white-primary px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-primary/30"
				/>
			</form>
			<ModalFooter>
				<Button outline={true} className="min-w-20 px-4">
					Cancelar
				</Button>
				<Button color="indigo" outline={false} className="min-w-20 px-4">
					Cadastrar
				</Button>
			</ModalFooter>
		</Modal>
	)
}
