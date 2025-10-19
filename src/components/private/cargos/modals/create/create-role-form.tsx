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
import { getPermissions } from "@/actions/roles/get-permissions"
import { useQuery } from "@tanstack/react-query"

export function CreateRoleForm() {
	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors }
	} = useForm<CreateRoleFormData>({
		resolver: zodResolver(createRoleSchema)
	})

	const { data, isLoading } = useQuery({
		queryKey: ["permissions"],
		queryFn: getPermissions,
		staleTime: 1000 * 60 * 5
	})

	const permissions = data?.permissions || []
	// console.log(data)
	const selectedPermissions = watch("permissions") || []

	function handleTogglePermission(permissionId: string) {
		const updated = selectedPermissions.includes(permissionId)
			? selectedPermissions.filter((id: string) => id !== permissionId)
			: [...selectedPermissions, permissionId]
		setValue("permissions", updated)
	}

	async function handleCreateRole({ name, permissions }: CreateRoleFormData) {
		const created = await createRole({ name, permissions })
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
				{permissions && (
					<div className="flex flex-col gap-2">
						{permissions.map((perm: Permission) => (
							<label key={perm.id} className="flex items-center gap-2">
								<input
									type="checkbox"
									checked={selectedPermissions.includes(perm.id)}
									onChange={() => handleTogglePermission(perm.id)}
								/>
								<span>{perm.description}</span>
							</label>
						))}
					</div>
				)}
			</form>
			<ModalFooter>
				<Button outline={true} className="min-w-20 px-4">
					Cancelar
				</Button>
				<Button color="indigo" form="create-role-form" type="submit" outline={false} className="min-w-20 px-4">
					Cadastrar
				</Button>
			</ModalFooter>
		</>
	)
}
