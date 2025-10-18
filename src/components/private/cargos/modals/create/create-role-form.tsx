"use client"

import { Button } from "@/components/private/ui/button"
import { Input } from "@/components/private/ui/input"
import { ModalFooter } from "@/components/private/ui/modal"
import { SpanError } from "@/components/private/ui/span-error"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import { CreateRoleFormData, createRoleSchema } from "@/types/roles/create-role-schema"
// import { createRole } from "@/actions/roles/create-role"
import { queryClient } from "@/types/react-query"
import { createRole } from "@/actions/roles/create-role"

export function CreateRoleForm() {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<CreateRoleFormData>({
		resolver: zodResolver(createRoleSchema)
	})

	async function handleCreateRole({ name }: CreateRoleFormData) {
		const created = await createRole({ name })
		if (created.success === true) {
			toast.success("Cargo criado com sucesso!")
			queryClient.invalidateQueries({ queryKey: ["roles"] })
		} else {
			toast.error(`Erro ao criar o cargo: ${created.error}`)
		}
		toast.success("Cargo criado com sucesso! (mock)")
	}

	return (
		<>
			<form id="create-role-form" className="flex flex-col gap-4" onSubmit={handleSubmit(handleCreateRole)}>
				<label className="font-medium" htmlFor="name">
					Nome do cargo
				</label>
				<Input id="name" variant="no-placeholder" {...register("name")} />
				{errors.name && <SpanError>{errors.name.message as string}</SpanError>}
			</form>
			<ModalFooter>
				<Button outline={true} className="min-w-20 px-4">
					Cancelar
				</Button>
				<Button color="indigo" type="submit" outline={false} className="min-w-20 px-4" form="create-role-form">
					Cadastrar
				</Button>
			</ModalFooter>
		</>
	)
}
