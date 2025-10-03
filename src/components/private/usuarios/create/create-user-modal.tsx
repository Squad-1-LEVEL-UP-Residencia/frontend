"use client"

import { Button } from "../../ui/button"
import { Modal, ModalFooter } from "../../ui/modal"
import { Title } from "../../ui/title"
import { CreateUserForm } from "./create-user-form"

export function CreateUserModal() {
	return (
		<Modal id="create_user_modal" hasCancelButton className="flex flex-col gap-16">
			<Title variant="sm">Adicionar novo usuário</Title>
			<CreateUserForm />
			<ModalFooter>
				<Button outline={true} className="min-w-20 px-4">
					Cancelar
				</Button>
				<Button color="indigo" outline={false} className="min-w-20 px-4" onClick={() => console.log("criar usuario")}>
					Cadastrar
				</Button>
			</ModalFooter>
		</Modal>
	)
}
