"use client"

import { Modal } from "../../ui/modal"
import { Title } from "../../ui/title"
import { CreateUserForm } from "./create-user-form"

export function CreateUserModal() {
	return (
		<Modal id="create_user_modal" hasCloseButton className="flex flex-col gap-16">
			<Title variant="sm">Adicionar novo usuário</Title>
			<CreateUserForm />
		</Modal>
	)
}
