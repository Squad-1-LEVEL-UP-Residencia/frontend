"use client"

import { Role } from "@/data/roles/role"
import { Button } from "../../ui/button"
import { Input } from "../../ui/input"
import { ModalFooter } from "../../ui/modal"
import { useRoles } from "@/hooks/use-roles"

export function CreateUserForm() {
	const { data: roles, isLoading } = useRoles()
	return (
		<>
			{/* TODO react hook form */}
			<form className="flex flex-col gap-4">
				<label className="font-medium" htmlFor="name">
					Nome
				</label>
				<Input id="name" variant="no-placeholder" />
				<label className="font-medium" htmlFor="email">
					Email
				</label>
				<Input id="email" type="email" variant="no-placeholder" />
				<label className="font-medium" htmlFor="cargo">
					Cargo
				</label>
				<select defaultValue="Selecione um cargo" id="cargo" className="select-primary">
					<option disabled={true}>Selecione um cargo</option>
					{isLoading ? (
						<option disabled={true} value={undefined}>
							Carregando...
						</option>
					) : roles ? (
						roles.roles.map((role: Role) => <option value={role.id}>{role.name}</option>)
					) : null}
				</select>
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
