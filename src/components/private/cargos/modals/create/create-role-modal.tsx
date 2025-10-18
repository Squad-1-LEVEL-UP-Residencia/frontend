import { Modal } from "@/components/private/ui/modal"
import { Title } from "@/components/private/ui/title"
import { CreateRoleForm } from "./create-role-form"

export function CreateRoleModal() {
	return (
		<Modal id="add_role_modal" hasCloseButton className="flex flex-col gap-16">
			<Title variant="sm">Adicionar novo cargo</Title>
			<CreateRoleForm />
		</Modal>
	)
}
