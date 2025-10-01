import { Modal } from "../../ui/modal"
import { Title } from "../../ui/title"
import { EditUserForm } from "./edit-user-form"

export function EditUserModal() {
	return (
		<Modal id="edit_user_modal" hasCancelButton className="flex flex-col gap-16">
			<Title variant="sm">Editar usuário</Title>
			<EditUserForm />
		</Modal>
	)
}
