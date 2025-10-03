"use client"

import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { ModalFooter } from "../../ui/modal"

export function CreateUserForm() {
	return (
		<>
			<form className="flex flex-col gap-4">
				<label className="font-medium" htmlFor="name">
					Nome
				</label>
				<Input id="name" variant="no-placeholder" />
				<label className="font-medium" htmlFor="email">
					Email
				</label>
				<Input id="email" type="email" variant="no-placeholder" />
			</form>
			<ModalFooter>
				<Button outline={true} className="min-w-20 px-4">
					Cancelar
				</Button>
				<Button color="indigo" outline={false} className="min-w-20 px-4" onClick={() => console.log("criar usuario")}>
					Cadastrar
				</Button>
			</ModalFooter>
		</>
	)
}
