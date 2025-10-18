"use client"

import { Modal, ModalFooter } from "@/components/private/ui/modal"
import { Title } from "@/components/private/ui/title"
import { Button } from "@/components/private/ui/button"

export function EditRoleModal() {
	return (
		<Modal id="edit_role_modal" className="flex flex-col gap-16">
			<Title variant="sm">Editar cargo</Title>
			<form className="flex flex-col gap-4">
				<label className="font-medium" htmlFor="role_name">
					Nome do cargo
				</label>
				<input
					id="role_name"
					type="text"
					placeholder="Nome do cargo"
					className="w-full rounded-lg border border-mid-grey/40 bg-white-primary px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-primary/30"
				/>
			</form>
			<ModalFooter>
				<Button outline={true} className="min-w-20 px-4">
					Cancelar
				</Button>
				<Button color="indigo" outline={false} className="min-w-20 px-4" onClick={() => console.log("editar cargo")}>
					Salvar
				</Button>
			</ModalFooter>
		</Modal>
	)
}
