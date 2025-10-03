"use client"

import { Button } from "../../ui/button"
import { Modal, ModalFooter } from "../../ui/modal"
import { Paragraph } from "../../ui/paragraph"
import { Title } from "../../ui/title"

export function DeleteUserModal() {
	return (
		<Modal id="delete_user_modal" hasCloseButton className="flex flex-col gap-16">
			<Title variant="sm">Remover usuário</Title>
			<Paragraph>Tem certeza que deseja remover este usuário? Esta ação não pode ser desfeita.</Paragraph>
			<ModalFooter>
				<Button outline={true} className="min-w-20 px-4">
					Cancelar
				</Button>
				<Button color="danger" outline={false} className="min-w-20 px-4" onClick={() => console.log("deletar usuario")}>
					Remover
				</Button>
			</ModalFooter>
		</Modal>
	)
}
