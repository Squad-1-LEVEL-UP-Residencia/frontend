import { Modal } from "@/components/private/ui/modal"
import { Title } from "@/components/private/ui/title"
import { EditUserForm } from "./edit-user-form"

export function EditUserModal() {
	return (
		<Modal id="edit_user_modal" className="flex flex-col gap-16">
			<Title variant="sm">Editar usuário</Title>
			<EditUserForm />
		</Modal>
	)
}
