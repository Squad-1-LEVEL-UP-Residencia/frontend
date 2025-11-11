"use client"

import { Modal } from "../../ui/modal"
import { Title } from "../../ui/title"
import { CreateClientForm } from "./create-client-form"

export function CreateClientModal() {
	return (
		<Modal id="create_client_modal" hasCloseButton className="flex flex-col gap-16">
			<Title variant="sm">Adicionar novo cliente</Title>
			<CreateClientForm />
		</Modal>
	)
}
