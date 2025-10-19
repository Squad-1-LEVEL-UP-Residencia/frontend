"use client"

import { Role } from "@/types/roles/role"
import { Button } from "@/components/private/ui/button"
import { Input } from "@/components/private/ui/input"
import { ModalFooter } from "@/components/private/ui/modal"
import { useRoles } from "@/hooks/roles/use-roles"
import { SpanError } from "@/components/private/ui/span-error"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreateUserFormData, createUserSchema } from "@/types/auth/registerSchema"
import { createUser } from "@/actions/users/create-user"
import toast from "react-hot-toast"
import { queryClient } from "@/types/react-query"
import { Label } from "@/components/private/ui/label"

export function CreateUserForm() {
	const { data: roles, isLoading } = useRoles()

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<CreateUserFormData>({
		resolver: zodResolver(createUserSchema)
	})

	async function handleCreateUser({ cargo, email, name }: CreateUserFormData) {
		const created = await createUser({ name, email, cargo })
		if (created.success === true) {
			toast.success("Usuário criado com sucesso!")
			queryClient.invalidateQueries({ queryKey: ["users"] })
		} else {
			toast.error(created.error)
		}
		console.log("Created user:", created)
	}

	return (
		<>
			<form id="create-user-form" className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreateUser)}>
				<Label className="font-medium" htmlFor="name">
					Nome
				</Label>
				<Input id="name" variant="no-placeholder" {...register("name")} />
				{errors.name && <SpanError>{errors.name.message as string}</SpanError>}

				<Label className="font-medium" htmlFor="email">
					Email
				</Label>
				<Input id="email" type="email" variant="no-placeholder" {...register("email")} />
				{errors.email && <SpanError>{errors.email.message as string}</SpanError>}

				<Label className="font-medium" htmlFor="cargo">
					Cargo
				</Label>
				<select defaultValue="Selecione um cargo" id="cargo" className="select-primary" {...register("cargo")}>
					<option disabled={true}>Selecione um cargo</option>
					{isLoading ? (
						<option disabled={true} value={undefined}>
							Carregando...
						</option>
					) : roles ? (
						roles.roles.map((role: Role) => (
							<option key={role.id} value={role.id}>
								{role.name}
							</option>
						))
					) : null}
				</select>
				{errors.cargo && <SpanError>{errors.cargo.message as string}</SpanError>}
			</form>
			<ModalFooter>
				<>
					{/* <form method="dialog"> */}
					<Button outline={true} className="min-w-20 px-4">
						Cancelar
					</Button>
					{/* </form> */}
					<Button color="indigo" type="submit" outline={false} className="min-w-20 px-4" form="create-user-form">
						Cadastrar
					</Button>
				</>
			</ModalFooter>
		</>
	)
}
