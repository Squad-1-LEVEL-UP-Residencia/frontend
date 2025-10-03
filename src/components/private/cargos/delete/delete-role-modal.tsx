import { Modal, ModalFooter } from "../../ui/modal"
import { Title } from "../../ui/title"
import { Paragraph } from "../../ui/paragraph"
import { Button } from "../../ui/button"

export function DeleteRoleModal() {
	return (
		<Modal id="delete_role_modal" hasCloseButton className="flex flex-col gap-16">
			<Title variant="sm">Remover cargo</Title>
			<Paragraph>Tem certeza que deseja remover este cargo? Esta ação não pode ser desfeita.</Paragraph>
			<ModalFooter>
				<Button outline={true} className="min-w-20 px-4">
					Cancelar
				</Button>
				<Button color="danger" outline={false} className="min-w-20 px-4" onClick={() => console.log("deletar cargo")}>
					Remover
				</Button>
			</ModalFooter>
		</Modal>
	)
}
