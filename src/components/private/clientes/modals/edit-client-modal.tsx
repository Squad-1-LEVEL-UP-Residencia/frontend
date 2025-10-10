"use client"

import { Modal } from "../../ui/modal"
import { Title } from "../../ui/title"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"

export function EditClientModal() {
	return (
		<Modal id="edit_client_modal" hasCloseButton className="flex flex-col gap-16">
			<Title variant="sm">Editar cliente</Title>
			<form className="flex flex-col gap-4">
				<label className="font-medium" htmlFor="companyName">
					Empresa
				</label>
				<Input id="companyName" variant={"no-placeholder"} />
				<label className="font-medium" htmlFor="email">
					E-mail
				</label>
				<Input id="email" type="email" variant={"no-placeholder"} />
				<label className="font-medium" htmlFor="primaryContact">
					Contato
				</label>
				<Input id="primaryContact" variant={"no-placeholder"} />
				<label className="font-medium" htmlFor="phone">
					Telefone
				</label>
				<Input id="phone" variant={"no-placeholder"} />
				<label className="font-medium" htmlFor="address">
					Endereço
				</label>
				<Input id="address" variant={"no-placeholder"} />
				<label className="font-medium" htmlFor="cnpj">
					CNPJ
				</label>
				<Input id="cnpj" variant={"no-placeholder"} />
				<Button color="indigo" outline={false} className="min-w-20 px-4" type="submit">
					Salvar alterações
				</Button>
			</form>
		</Modal>
	)
}
