"use client"

import { Modal, ModalFooter } from "@/components/private/ui/modal"
import { Title } from "@/components/private/ui/title"
import { Paragraph } from "@/components/private/ui/paragraph"
import { Button } from "@/components/private/ui/button"

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
