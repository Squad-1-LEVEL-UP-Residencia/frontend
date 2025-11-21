"use client"

import { Modal } from "@/components/private/ui/modal"
import { Title } from "@/components/private/ui/title"
import { CreateListForm } from "./create-list-form"

export function CreateListModal() {
	return (
		<Modal id="create_list_modal" variant="sm" hasCloseButton>
			<Title variant="sm">Criar nova lista</Title>
			<CreateListForm />
		</Modal>
	)
}
